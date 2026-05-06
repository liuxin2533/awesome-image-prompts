const path = require('path');
const { contentHash } = require('./text');
const { ensureDir, readJson, writeJson } = require('./persist');

function stableJson(value) {
  if (Array.isArray(value)) return value.map(stableJson);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort((a, b) => a.localeCompare(b))
      .map(key => [key, stableJson(value[key])])
  );
}

function upstreamLocalizedField(field) {
  const values = [];
  if (field?.original?.value) values.push(field.original);
  for (const value of Object.values(field?.translations || {})) {
    if (value?.source === 'upstream' && value.value) values.push(value);
  }
  return values.map(value => ({
    language: value.language || 'und',
    value: String(value.value || '').trim(),
    source: value.source || 'unknown'
  }));
}

function compactTaxonomy(items) {
  return (items || [])
    .filter(item => item?.value && item.source !== 'ai' && item.source !== 'manual')
    .map(item => ({
      id: item.id || null,
      value: String(item.value || '').trim(),
      language: item.language || 'und',
      source: item.source || 'unknown',
      sourceKey: item.sourceKey || null,
      translationOf: item.translationOf || null
    }));
}

function compactSources(sources) {
  return (sources || []).map(source => ({
    sourceKey: source.sourceKey || null,
    repo: source.repo || null,
    url: source.url || null,
    originalId: source.originalId || null
  }));
}

function compactAssets(assets) {
  return (assets || []).map(asset => ({
    role: asset.role || 'unknown',
    upstreamUrl: asset.upstreamUrl || null,
    upstreamPath: asset.upstreamPath || null,
    alt: asset.alt || ''
  }));
}

function promptUpstreamFingerprint(prompt) {
  return contentHash(JSON.stringify(stableJson({
    promptText: upstreamLocalizedField(prompt.promptText),
    title: upstreamLocalizedField(prompt.title),
    description: upstreamLocalizedField(prompt.description),
    sourceCategories: compactTaxonomy(prompt.sourceCategories || []),
    tags: compactTaxonomy(prompt.tags || []),
    sources: compactSources(prompt.sources || []),
    assets: compactAssets(prompt.assets || [])
  })));
}

function previousById(previousDataset) {
  return new Map((previousDataset?.prompts || []).filter(prompt => prompt?.id).map(prompt => [prompt.id, prompt]));
}

function applyPromptUpdateTimestamps(previousDataset, currentDataset, options = {}) {
  const now = options.now || new Date().toISOString();
  const previous = previousById(previousDataset);

  for (const prompt of currentDataset?.prompts || []) {
    const oldPrompt = previous.get(prompt.id);
    if (!oldPrompt) {
      prompt.updatedAt = prompt.updatedAt || now;
      continue;
    }

    if (promptUpstreamFingerprint(oldPrompt) === promptUpstreamFingerprint(prompt)) {
      prompt.updatedAt = oldPrompt.updatedAt || prompt.updatedAt || now;
    } else {
      prompt.updatedAt = now;
    }
  }

  return currentDataset;
}

function summarizeExtractionRun(options = {}) {
  const previousDataset = options.previousDataset || { prompts: [] };
  const currentDataset = options.currentDataset || { prompts: [] };
  const previous = previousById(previousDataset);
  const currentIds = new Set();
  const summary = {
    added: 0,
    updated: 0,
    unchanged: 0,
    removed: 0,
    total: (currentDataset.prompts || []).length,
    error: 0,
    warning: 0,
    info: 0
  };

  for (const prompt of currentDataset.prompts || []) {
    currentIds.add(prompt.id);
    const oldPrompt = previous.get(prompt.id);
    if (!oldPrompt) {
      summary.added++;
    } else if (promptUpstreamFingerprint(oldPrompt) === promptUpstreamFingerprint(prompt)) {
      summary.unchanged++;
    } else {
      summary.updated++;
    }
  }

  for (const prompt of previousDataset.prompts || []) {
    if (prompt?.id && !currentIds.has(prompt.id)) summary.removed++;
  }

  const reportSummary = options.report?.toJSON?.().summary || {};
  summary.error = reportSummary.error || 0;
  summary.warning = reportSummary.warning || 0;
  summary.info = reportSummary.info || 0;

  const startedAt = options.startedAt || new Date().toISOString();
  const finishedAt = options.finishedAt || new Date().toISOString();

  return {
    id: options.id || `run_${startedAt.replace(/[-:.]/g, '').replace('T', 'T')}`,
    startedAt,
    finishedAt,
    mode: options.mode || null,
    sources: options.sources || [],
    summary
  };
}

function runHistoryDir(projectRoot) {
  return path.join(projectRoot, 'data', 'runs');
}

function writeRunRecord(projectRoot, runRecord) {
  const dir = runHistoryDir(projectRoot);
  ensureDir(dir);
  writeJson(path.join(dir, 'latest.json'), runRecord);
  writeJson(path.join(dir, `${runRecord.id}.json`), runRecord);
  return runRecord;
}

function readLatestRunRecord(projectRoot) {
  const filePath = path.join(runHistoryDir(projectRoot), 'latest.json');
  try {
    return readJson(filePath);
  } catch {
    return null;
  }
}

module.exports = {
  applyPromptUpdateTimestamps,
  promptUpstreamFingerprint,
  readLatestRunRecord,
  summarizeExtractionRun,
  writeRunRecord
};
