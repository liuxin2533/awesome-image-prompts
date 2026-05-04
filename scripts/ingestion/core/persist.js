const fs = require('fs');
const path = require('path');
const { uniqueBy } = require('./text');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

function sourceCount(prompts) {
  const counts = {};
  for (const prompt of prompts || []) {
    for (const source of prompt.sources || []) {
      const key = source.repo || source.sourceKey || 'unknown';
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  return counts;
}

function languageSet(prompts) {
  const set = new Set();
  for (const prompt of prompts || []) {
    for (const field of [prompt.promptText, prompt.title, prompt.description]) {
      if (field?.original?.language) set.add(field.original.language);
      for (const language of Object.keys(field?.translations || {})) set.add(language);
    }
    for (const category of prompt.categories || []) if (category.language) set.add(category.language);
    for (const tag of prompt.tags || []) if (tag.language) set.add(tag.language);
  }
  return Array.from(set).sort();
}

function buildCategories(prompts) {
  const categories = [];
  for (const prompt of prompts || []) categories.push(...(prompt.categories || []));
  return uniqueBy(categories, item => `${item.language}:${String(item.value).toLowerCase()}:${item.source}:${item.translationOf || ''}`)
    .sort((a, b) => String(a.value).localeCompare(String(b.value)));
}

function buildAssets(prompts) {
  return (prompts || []).flatMap(prompt => (prompt.assets || []).map(asset => ({ ...asset, promptId: prompt.id })));
}

function toCompatibilityPrompt(prompt) {
  const firstSource = prompt.sources?.[0] || {};
  const firstAsset = prompt.assets?.[0] || {};

  return {
    id: prompt.id,
    title: prompt.title?.original?.value || 'Untitled',
    titleTranslations: Object.fromEntries(
      Object.entries(prompt.title?.translations || {}).map(([language, value]) => [language, value.value])
    ),
    originalText: prompt.promptText?.original?.value || '',
    textTranslations: Object.fromEntries(
      Object.entries(prompt.promptText?.translations || {}).map(([language, value]) => [language, value.value])
    ),
    description: prompt.description?.original?.value || '',
    descriptionTranslations: Object.fromEntries(
      Object.entries(prompt.description?.translations || {}).map(([language, value]) => [language, value.value])
    ),
    categories: (prompt.categories || []).map(category => category.value),
    categoryTranslations: {},
    tags: (prompt.tags || []).map(tag => tag.value),
    tagTranslations: {},
    source: {
      repo: firstSource.repo,
      url: firstSource.url,
      originalId: firstSource.originalId
    },
    sourceReferences: prompt.sources || [],
    author: firstSource.authors?.[0]?.name || 'Unknown',
    authorUrl: firstSource.authors?.[0]?.url || null,
    imageUrl: firstAsset.upstreamUrl || null,
    localImagePaths: (prompt.assets || []).map(asset => asset.localPath),
    assets: prompt.assets || [],
    extraFields: {
      canonicalId: prompt.id,
      sourceCount: (prompt.sources || []).length,
      contentHash: prompt.contentHash
    },
    addedAt: prompt.addedAt,
    updatedAt: prompt.updatedAt
  };
}

function buildCompatibilityDataset(prompts) {
  return {
    generatedAt: new Date().toISOString(),
    totalCount: (prompts || []).length,
    sourceCount: sourceCount(prompts || []),
    data: (prompts || []).map(toCompatibilityPrompt)
  };
}

function refreshDatasetMetadata(dataset) {
  dataset.generatedAt = new Date().toISOString();
  dataset.totalCount = dataset.prompts.length;
  dataset.languages = languageSet(dataset.prompts);
  dataset.sourceCount = sourceCount(dataset.prompts);
  return dataset;
}

function writeDerivedData(projectRoot, dataset, report = null) {
  refreshDatasetMetadata(dataset);

  const dataDir = path.join(projectRoot, 'data');
  const canonicalDir = path.join(dataDir, 'canonical');
  const reportsDir = path.join(dataDir, 'reports');
  const categories = buildCategories(dataset.prompts);

  writeJson(path.join(canonicalDir, 'prompts.json'), dataset);
  writeJson(path.join(canonicalDir, 'categories.json'), {
    schemaVersion: dataset.schemaVersion,
    generatedAt: dataset.generatedAt,
    categories
  });
  writeJson(path.join(canonicalDir, 'assets.json'), {
    schemaVersion: dataset.schemaVersion,
    generatedAt: dataset.generatedAt,
    assets: buildAssets(dataset.prompts)
  });

  writeJson(path.join(dataDir, 'prompts.json'), buildCompatibilityDataset(dataset.prompts));
  writeJson(path.join(dataDir, 'categories.json'), {
    categories: categories.map(category => category.value),
    categoryTranslations: {},
    lastUpdated: dataset.generatedAt
  });

  if (report) {
    writeJson(path.join(reportsDir, 'latest.json'), report.toJSON());
    ensureDir(reportsDir);
    fs.writeFileSync(path.join(reportsDir, 'latest.md'), `${report.toMarkdown()}\n`, 'utf-8');
  }
}

module.exports = {
  ensureDir,
  readJson,
  writeJson,
  sourceCount,
  languageSet,
  buildCategories,
  buildAssets,
  buildCompatibilityDataset,
  refreshDatasetMetadata,
  writeDerivedData
};

