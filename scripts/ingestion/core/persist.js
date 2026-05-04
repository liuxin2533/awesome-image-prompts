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

function refreshDatasetMetadata(dataset) {
  dataset.generatedAt = new Date().toISOString();
  dataset.totalCount = dataset.prompts.length;
  dataset.languages = languageSet(dataset.prompts);
  dataset.sourceCount = sourceCount(dataset.prompts);
  return dataset;
}

function writeDerivedData(projectRoot, dataset, report = null) {
  refreshDatasetMetadata(dataset);

  const canonicalDir = path.join(projectRoot, 'data', 'canonical');
  const reportsDir = path.join(projectRoot, 'data', 'reports');
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
  refreshDatasetMetadata,
  writeDerivedData
};
