const fs = require('fs');
const path = require('path');
const { contentHash, uniqueBy } = require('./text');
const { readCanonicalDataset } = require('./persist');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function comparableText(value) {
  return String(value || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

function sameLocalizedValue(a, b) {
  if (!a?.value || !b?.value) return false;
  return a.language === b.language && comparableText(a.value) === comparableText(b.value);
}

function isLocalValue(value) {
  return Boolean(value?.value) && value.source !== 'upstream';
}

function isLocalTaxonomyItem(item) {
  return Boolean(item?.value) && item.source !== 'upstream' && item.source !== 'derived';
}

function preserveLocalizedField(currentField, previousField, options = {}) {
  if (!currentField || !previousField) return;

  const originalMatches = sameLocalizedValue(currentField.original, previousField.original);
  const previousOriginalIsLocal = isLocalValue(previousField.original);

  if (previousOriginalIsLocal) {
    currentField.original = clone(previousField.original);
  }

  if (!originalMatches && !previousOriginalIsLocal && !options.preserveLocalTranslations) return;

  currentField.translations = currentField.translations || {};
  for (const [language, value] of Object.entries(previousField.translations || {})) {
    if (!isLocalValue(value)) continue;
    currentField.translations[language] = clone(value);
  }
}

function taxonomyTranslationKey(item) {
  return `${item.translationOf || ''}:${item.language || ''}`;
}

function preserveTaxonomyTranslations(currentPrompt, previousPrompt, fieldName) {
  const currentItems = Array.isArray(currentPrompt[fieldName]) ? currentPrompt[fieldName] : [];
  const previousItems = Array.isArray(previousPrompt[fieldName]) ? previousPrompt[fieldName] : [];
  const currentSourceIds = new Set(currentItems.filter(item => !item.translationOf).map(item => item.id));
  const localTranslations = previousItems
    .filter(item => item.translationOf && currentSourceIds.has(item.translationOf) && isLocalTaxonomyItem(item))
    .map(clone);

  if (!localTranslations.length) return;

  const localKeys = new Set(localTranslations.map(taxonomyTranslationKey));
  currentPrompt[fieldName] = uniqueBy(
    [
      ...currentItems.filter(item => !(item.translationOf && localKeys.has(taxonomyTranslationKey(item)))),
      ...localTranslations
    ],
    item => item.translationOf ? taxonomyTranslationKey(item) : item.id || `${item.language}:${item.value}`
  );
}

function assetMatchKey(asset) {
  return asset?.upstreamUrl || asset?.upstreamPath || asset?.id || '';
}

function shouldPreserveAsset(asset) {
  if (!asset || typeof asset !== 'object') return false;
  if (asset.status && asset.status !== 'pending') return true;
  return Boolean(asset.cachedAt || asset.failedAt || asset.bytes || asset.contentType || asset.error);
}

function preserveAssets(currentPrompt, previousPrompt) {
  const currentAssets = Array.isArray(currentPrompt.assets) ? currentPrompt.assets : [];
  const previousAssets = Array.isArray(previousPrompt.assets) ? previousPrompt.assets : [];
  const previousByKey = new Map();

  for (const asset of previousAssets) {
    const key = assetMatchKey(asset);
    if (key) previousByKey.set(key, asset);
  }

  currentPrompt.assets = currentAssets.map(asset => {
    const previous = previousByKey.get(assetMatchKey(asset));
    if (!shouldPreserveAsset(previous)) return asset;

    const preserved = { ...asset };
    for (const field of ['localPath', 'status', 'bytes', 'contentType', 'cachedAt', 'failedAt', 'error']) {
      if (previous[field] !== undefined) preserved[field] = clone(previous[field]);
    }
    return preserved;
  });
}

function preserveCuration(currentPrompt, previousPrompt) {
  const overrides = previousPrompt.curation?.overrides;
  if (!Array.isArray(overrides) || overrides.length === 0) return;

  currentPrompt.curation = currentPrompt.curation || { overrides: [] };
  currentPrompt.curation.overrides = uniqueBy(
    [...(currentPrompt.curation.overrides || []), ...overrides.map(clone)],
    item => item.id || `${item.fieldPath || ''}:${item.language || ''}:${item.value || ''}`
  );
}

function preserveClassification(currentPrompt, previousPrompt) {
  if (!previousPrompt.classification) return;
  currentPrompt.classification = clone(previousPrompt.classification);
}

function preservePrompt(currentPrompt, previousPrompt, options = {}) {
  preserveLocalizedField(currentPrompt.promptText, previousPrompt.promptText, options);
  preserveLocalizedField(currentPrompt.title, previousPrompt.title, options);
  preserveLocalizedField(currentPrompt.description, previousPrompt.description, options);
  preserveTaxonomyTranslations(currentPrompt, previousPrompt, 'categories');
  preserveTaxonomyTranslations(currentPrompt, previousPrompt, 'tags');
  preserveAssets(currentPrompt, previousPrompt);
  preserveCuration(currentPrompt, previousPrompt);
  preserveClassification(currentPrompt, previousPrompt);
  return currentPrompt;
}

function sourceIdentityKeys(prompt) {
  const keys = [];
  for (const source of prompt.sources || []) {
    const sourceKey = source.sourceKey || '';
    const repo = source.repo || '';
    const url = source.url || '';
    const originalId = source.originalId || '';

    if (url && originalId) keys.push(`source-url-id:${sourceKey}:${repo}:${url}:${originalId}`);
    if (url) keys.push(`source-url:${sourceKey}:${repo}:${url}`);
    if (originalId) keys.push(`source-id:${sourceKey}:${repo}:${originalId}`);
  }
  return Array.from(new Set(keys));
}

function buildUniqueIndex(items, keyFn) {
  const index = new Map();
  const ambiguous = new Set();

  for (const item of items || []) {
    for (const key of keyFn(item)) {
      if (!key) continue;
      if (ambiguous.has(key)) continue;
      if (index.has(key)) {
        index.delete(key);
        ambiguous.add(key);
        continue;
      }
      index.set(key, item);
    }
  }

  return index;
}

function hasSharedSourceIdentity(currentPrompt, previousPrompt) {
  const previousKeys = new Set(sourceIdentityKeys(previousPrompt));
  return sourceIdentityKeys(currentPrompt).some(key => previousKeys.has(key));
}

function extensionForAsset(asset) {
  const value = asset?.upstreamUrl || asset?.upstreamPath || asset?.localPath || '';
  const pathname = (() => {
    try { return new URL(value).pathname; } catch { return String(value || ''); }
  })();
  const ext = path.extname(pathname).toLowerCase();
  return ext && ext.length <= 6 ? ext : '.jpg';
}

function rekeyAssetsForPrompt(prompt) {
  prompt.assets = (prompt.assets || []).map((asset, index) => {
    const key = asset.upstreamUrl || asset.upstreamPath || `${prompt.id}:${index}`;
    const assetKey = contentHash(key).slice(0, 12);
    return {
      ...asset,
      id: `asset_${contentHash(`${prompt.id}:${asset.upstreamUrl || asset.upstreamPath || index}`).slice(0, 16)}`,
      localPath: asset.localPath || `public/assets/${prompt.id}/${assetKey}${extensionForAsset(asset)}`
    };
  });
}

function adoptPreviousIdentity(currentPrompt, previousPrompt) {
  if (!previousPrompt?.id || currentPrompt.id === previousPrompt.id) return;
  const currentId = currentPrompt.id;
  currentPrompt.id = previousPrompt.id;
  currentPrompt.assets = (currentPrompt.assets || []).map(asset => ({
    ...asset,
    localPath: asset.localPath
      ? String(asset.localPath).replace(`/assets/${currentId}/`, `/assets/${previousPrompt.id}/`).replace(`public/assets/${currentId}/`, `public/assets/${previousPrompt.id}/`)
      : asset.localPath
  }));
  rekeyAssetsForPrompt(currentPrompt);
}

function findPreviousPrompt(currentPrompt, indexes, usedPreviousIds = new Set()) {
  const byId = indexes.byId.get(currentPrompt.id);
  if (byId && !usedPreviousIds.has(byId.id)) {
    return {
      prompt: byId,
      preserveLocalTranslations: hasSharedSourceIdentity(currentPrompt, byId)
    };
  }

  for (const key of sourceIdentityKeys(currentPrompt)) {
    const bySource = indexes.bySource.get(key);
    if (bySource && !usedPreviousIds.has(bySource.id)) {
      return {
        prompt: bySource,
        preserveLocalTranslations: true
      };
    }
  }

  return null;
}

function preserveCanonicalData(currentDataset, previousDataset) {
  if (!currentDataset?.prompts?.length || !previousDataset?.prompts?.length) return currentDataset;

  const indexes = {
    byId: new Map(previousDataset.prompts.map(prompt => [prompt.id, prompt])),
    bySource: buildUniqueIndex(previousDataset.prompts, sourceIdentityKeys)
  };
  const usedPreviousIds = new Set();
  const reservedCurrentIds = new Set(currentDataset.prompts.map(prompt => prompt.id).filter(Boolean));

  currentDataset.prompts = currentDataset.prompts.map(prompt => {
    const match = findPreviousPrompt(prompt, indexes, usedPreviousIds);
    if (!match) return prompt;
    usedPreviousIds.add(match.prompt.id);
    if (prompt.id === match.prompt.id || !reservedCurrentIds.has(match.prompt.id)) {
      reservedCurrentIds.delete(prompt.id);
      adoptPreviousIdentity(prompt, match.prompt);
      reservedCurrentIds.add(prompt.id);
    }
    return preservePrompt(prompt, match.prompt, {
      preserveLocalTranslations: match.preserveLocalTranslations
    });
  });

  return currentDataset;
}

function readPreviousCanonical(projectRoot) {
  const filePath = path.join(projectRoot, 'data', 'canonical', 'prompts.json');
  if (!fs.existsSync(filePath)) return null;
  return readCanonicalDataset(filePath);
}

function preserveCanonicalDataFromDisk(projectRoot, currentDataset) {
  const previousDataset = readPreviousCanonical(projectRoot);
  return previousDataset ? preserveCanonicalData(currentDataset, previousDataset) : currentDataset;
}

function retainMissingCanonicalPrompts(currentDataset, previousDataset) {
  if (!currentDataset?.prompts || !previousDataset?.prompts?.length) return currentDataset;
  const currentIds = new Set(currentDataset.prompts.map(prompt => prompt.id).filter(Boolean));
  const retained = [];

  for (const previousPrompt of previousDataset.prompts) {
    if (!previousPrompt?.id || currentIds.has(previousPrompt.id)) continue;
    retained.push(clone(previousPrompt));
    currentIds.add(previousPrompt.id);
  }

  if (retained.length) {
    currentDataset.prompts.push(...retained);
  }

  return currentDataset;
}

module.exports = {
  preserveCanonicalData,
  preserveCanonicalDataFromDisk,
  readPreviousCanonical,
  retainMissingCanonicalPrompts,
  preserveLocalizedField,
  preservePrompt,
  sourceIdentityKeys
};
