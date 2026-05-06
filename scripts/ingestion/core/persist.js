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

function canonicalPromptsFile(projectRoot) {
  return path.join(projectRoot, 'data', 'canonical', 'prompts.json');
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

function compactAsset(asset) {
  const compacted = { ...(asset || {}) };
  if (compacted.sourceKey === null || compacted.sourceKey === undefined) delete compacted.sourceKey;
  return compacted;
}

function compactPrompt(prompt) {
  const compacted = {
    ...(prompt || {}),
    assets: (prompt.assets || []).map(compactAsset)
  };

  delete compacted.contentHash;
  delete compacted.dedupeKey;

  if (compacted.addedAt === null || compacted.addedAt === undefined) delete compacted.addedAt;
  if (Array.isArray(compacted.tags) && compacted.tags.length === 0) delete compacted.tags;
  if (Array.isArray(compacted.sourceCategories) && compacted.sourceCategories.length === 0) delete compacted.sourceCategories;
  if (Array.isArray(compacted.curation?.overrides) && compacted.curation.overrides.length === 0) delete compacted.curation;

  return compacted;
}

function compactCanonicalDataset(dataset) {
  return {
    ...(dataset || {}),
    prompts: (dataset.prompts || []).map(compactPrompt)
  };
}

function promptShardRelativePath(prompt) {
  return `prompts/${prompt.id}.json`;
}

function isPromptManifestEntry(prompt) {
  return Boolean(prompt?.id && prompt?.file && !prompt.promptText);
}

function hydrateCanonicalDataset(dataset, canonicalDir) {
  if (!Array.isArray(dataset?.prompts)) return dataset;
  if (!dataset.prompts.every(isPromptManifestEntry)) return dataset;

  return {
    ...dataset,
    prompts: dataset.prompts.map(entry => {
      const fullPath = path.resolve(canonicalDir, entry.file);
      const root = path.resolve(canonicalDir);
      if (!(fullPath === root || fullPath.startsWith(root + path.sep))) {
        throw new Error(`Refusing to read prompt shard outside canonical dir: ${entry.file}`);
      }
      return readJson(fullPath);
    })
  };
}

function readCanonicalDataset(projectRootOrFile) {
  const filePath = String(projectRootOrFile || '').endsWith('.json')
    ? projectRootOrFile
    : canonicalPromptsFile(projectRootOrFile);
  const dataset = readJson(filePath);
  return hydrateCanonicalDataset(dataset, path.dirname(filePath));
}

function refreshDatasetMetadata(dataset) {
  dataset.generatedAt = new Date().toISOString();
  dataset.totalCount = dataset.prompts.length;
  dataset.languages = languageSet(dataset.prompts);
  dataset.sourceCount = sourceCount(dataset.prompts);
  return dataset;
}

function cleanupPromptShards(promptDir, expectedFiles) {
  if (!fs.existsSync(promptDir)) return;
  for (const entry of fs.readdirSync(promptDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    const fullPath = path.join(promptDir, entry.name);
    if (expectedFiles.has(fullPath)) continue;
    try {
      fs.rmSync(fullPath, { force: true });
    } catch {
      // A stale shard is harmless if it is no longer referenced by prompts.json.
    }
  }
}

function writeCanonicalDataset(projectRoot, dataset) {
  refreshDatasetMetadata(dataset);
  const outputDataset = compactCanonicalDataset(dataset);
  const canonicalDir = path.join(projectRoot, 'data', 'canonical');
  const promptDir = path.join(canonicalDir, 'prompts');
  ensureDir(promptDir);

  const expectedFiles = new Set();
  const manifestPrompts = [];
  for (const prompt of outputDataset.prompts || []) {
    const relativeFile = promptShardRelativePath(prompt);
    const fullPath = path.join(canonicalDir, relativeFile);
    expectedFiles.add(fullPath);
    writeJson(fullPath, prompt);
    manifestPrompts.push({ id: prompt.id, file: relativeFile });
  }

  cleanupPromptShards(promptDir, expectedFiles);
  writeJson(path.join(canonicalDir, 'prompts.json'), {
    ...outputDataset,
    prompts: manifestPrompts
  });

  return outputDataset;
}

function writeDerivedData(projectRoot, dataset, report = null) {
  const canonicalDir = path.join(projectRoot, 'data', 'canonical');
  const reportsDir = path.join(projectRoot, 'data', 'reports');
  const outputDataset = writeCanonicalDataset(projectRoot, dataset);
  const categories = buildCategories(outputDataset.prompts);

  writeJson(path.join(canonicalDir, 'categories.json'), {
    schemaVersion: outputDataset.schemaVersion,
    generatedAt: outputDataset.generatedAt,
    categories
  });
  writeJson(path.join(canonicalDir, 'assets.json'), {
    schemaVersion: outputDataset.schemaVersion,
    generatedAt: outputDataset.generatedAt,
    assets: buildAssets(outputDataset.prompts)
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
  readCanonicalDataset,
  writeJson,
  writeCanonicalDataset,
  sourceCount,
  languageSet,
  buildCategories,
  buildAssets,
  compactCanonicalDataset,
  refreshDatasetMetadata,
  writeDerivedData
};
