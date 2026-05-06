const path = require('path');
const {
  contentHash,
  dedupePromptText,
  normalizeLanguageCode,
  slugify,
  stablePromptId,
  uniqueBy
} = require('./text');

function localizedValue(language, value, source = 'upstream') {
  return {
    language: normalizeLanguageCode(language),
    value: String(value || '').trim(),
    source
  };
}

function comparableText(value) {
  return String(value || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

function pickPrimaryLanguage(localized, preferred) {
  const normalized = {};
  for (const [language, value] of Object.entries(localized || {})) {
    normalized[normalizeLanguageCode(language)] = value;
  }

  const wanted = normalizeLanguageCode(preferred || 'en');
  if (normalized[wanted]?.promptText) return wanted;
  if (normalized.en?.promptText) return 'en';
  return Object.keys(normalized).find(language => normalized[language]?.promptText) || Object.keys(normalized)[0] || 'und';
}

function fieldFromLocalized(localized, fieldName, primaryLanguage) {
  const originalSource = localized[primaryLanguage] || {};
  const originalValue = originalSource[fieldName] ? localizedValue(primaryLanguage, originalSource[fieldName], 'upstream') : null;
  const originalText = comparableText(originalValue?.value);
  const translations = {};

  for (const [language, values] of Object.entries(localized)) {
    const normalizedLanguage = normalizeLanguageCode(language);
    if (normalizedLanguage === primaryLanguage) continue;
    if (!values?.[fieldName]) continue;
    if (originalText && comparableText(values[fieldName]) === originalText) continue;
    translations[normalizedLanguage] = localizedValue(normalizedLanguage, values[fieldName], 'upstream');
  }

  return { original: originalValue, translations };
}

function normalizeCategory(category) {
  const language = normalizeLanguageCode(category.language || 'en');
  const value = String(category.value || '').trim();
  return {
    id: category.id || slugify(value, `category_${contentHash(`${language}:${value}`).slice(0, 10)}`),
    value,
    language,
    source: category.source || 'upstream',
    sourceKey: category.sourceKey || null
  };
}

function normalizeTag(tag) {
  const language = normalizeLanguageCode(tag.language || 'en');
  const value = String(tag.value || '').trim();
  return {
    id: tag.id || slugify(value, `tag_${contentHash(`${language}:${value}`).slice(0, 10)}`),
    value,
    language,
    source: tag.source || 'derived'
  };
}

function extensionForUrl(url) {
  const pathname = (() => {
    try { return new URL(url).pathname; } catch { return String(url || ''); }
  })();
  const ext = path.extname(pathname).toLowerCase();
  return ext && ext.length <= 6 ? ext : '.jpg';
}

function normalizeAsset(asset, promptId, index) {
  const ext = extensionForUrl(asset.upstreamUrl || asset.upstreamPath);
  const assetKey = contentHash(asset.upstreamUrl || asset.upstreamPath || `${promptId}:${index}`).slice(0, 12);
  return {
    id: `asset_${contentHash(`${promptId}:${asset.upstreamUrl || asset.upstreamPath || index}`).slice(0, 16)}`,
    role: asset.role || 'unknown',
    upstreamUrl: asset.upstreamUrl || null,
    upstreamPath: asset.upstreamPath || null,
    localPath: asset.localPath || `public/assets/${promptId}/${assetKey}${ext}`,
    alt: asset.alt || '',
    status: asset.status || 'pending',
    sourceKey: asset.sourceKey || null
  };
}

function emitMissingTranslationIssues(prompt, targetLanguages, report) {
  if (!report || !Array.isArray(targetLanguages) || targetLanguages.length === 0) return;

  const translatable = [
    ['promptText', prompt.promptText],
    ['title', prompt.title],
    ['description', prompt.description]
  ];

  for (const target of targetLanguages.map(normalizeLanguageCode)) {
    for (const [field, value] of translatable) {
      if (!value?.original?.value) continue;
      if (value.original.language === target) continue;
      if (value.translations?.[target]?.value) continue;
      report.warn({
        code: 'missing_translation',
        message: `${field} is missing ${target} translation.`,
        promptId: prompt.id,
        fieldPath: `${field}.translations.${target}`,
        suggestedAction: `Run translation for ${target}.`,
        resolutionCommand: `pnpm translate -- --missing --lang ${target}`
      });
    }

    for (const [fieldName, items] of [['categories', prompt.categories], ['tags', prompt.tags]]) {
      for (const item of items || []) {
        if (!item?.value || item.language === target) continue;
        if (item.translationOf) continue;
        if (item.taxonomy === 'canonical') continue;
        const exists = (items || []).some(candidate => candidate.language === target && candidate.translationOf === item.id);
        if (exists) continue;
        report.warn({
          code: 'missing_translation',
          message: `${fieldName} item "${item.value}" is missing ${target} translation.`,
          promptId: prompt.id,
          fieldPath: `${fieldName}.${item.id}.${target}`,
          suggestedAction: `Run translation for ${target}.`,
          resolutionCommand: `pnpm translate -- --missing --lang ${target}`
        });
      }
    }
  }
}

function normalizeRawRecord(raw, options = {}) {
  const localized = {};
  for (const [language, values] of Object.entries(raw.localized || {})) {
    localized[normalizeLanguageCode(language)] = values || {};
  }

  const primaryLanguage = pickPrimaryLanguage(localized, raw.primaryLanguage);
  const originalPrompt = String(localized[primaryLanguage]?.promptText || '').trim();
  const dedupeKey = dedupePromptText(originalPrompt);
  const id = stablePromptId(originalPrompt);
  const now = new Date().toISOString();

  const sourceCategories = uniqueBy((raw.sourceCategories || []).filter(item => item?.value).map(normalizeCategory), item => `${item.language}:${item.value.toLowerCase()}:${item.source}`);

  const prompt = {
    id,
    contentHash: contentHash(dedupeKey),
    dedupeKey,
    promptText: fieldFromLocalized(localized, 'promptText', primaryLanguage),
    title: fieldFromLocalized(localized, 'title', primaryLanguage),
    description: fieldFromLocalized(localized, 'description', primaryLanguage),
    sourceCategories,
    categories: [...sourceCategories],
    tags: uniqueBy((raw.tags || []).filter(item => item?.value).map(normalizeTag), item => `${item.language}:${item.value.toLowerCase()}`),
    sources: raw.references && raw.references.length ? raw.references : [{
      sourceKey: raw.sourceKey,
      repo: raw.repo,
      url: raw.url || null,
      originalId: raw.originalId || null,
      authors: raw.authors || [],
      locations: raw.locations || []
    }],
    assets: (raw.assets || []).map((asset, index) => normalizeAsset(asset, id, index)),
    curation: { overrides: [] },
    addedAt: raw.addedAt || null,
    updatedAt: now
  };

  emitMissingTranslationIssues(prompt, options.targetLanguages, options.report);
  return prompt;
}

module.exports = {
  normalizeRawRecord,
  normalizeAsset,
  emitMissingTranslationIssues,
  localizedValue
};
