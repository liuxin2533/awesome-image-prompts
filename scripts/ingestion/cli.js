#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { normalizeRawRecord } = require('./core/normalize');
const { mergePrompts } = require('./core/merge');
const { Report } = require('./core/report');
const { validateDataset } = require('./core/schema');
const { uniqueBy } = require('./core/text');

const evolink = require('./sources/evolink');
const freestylefly = require('./sources/freestylefly');
const youmind = require('./sources/youmind');

const SCHEMA_VERSION = '2026-05-04';

const SOURCES = {
  evolink: {
    config: evolink.CONFIG,
    load: evolink.load,
    parse: evolink.parseEvolink
  },
  freestylefly: {
    config: freestylefly.CONFIG,
    load: freestylefly.load,
    parse: freestylefly.parseFreestylefly
  },
  youmind: {
    config: youmind.CONFIG,
    load: youmind.load,
    parse: youmind.parseYouMind
  }
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

function sourceCount(prompts) {
  const counts = {};
  for (const prompt of prompts) {
    for (const source of prompt.sources || []) {
      counts[source.repo || source.sourceKey || 'unknown'] = (counts[source.repo || source.sourceKey || 'unknown'] || 0) + 1;
    }
  }
  return counts;
}

function languageSet(prompts) {
  const set = new Set();
  for (const prompt of prompts) {
    for (const field of [prompt.promptText, prompt.title, prompt.description]) {
      if (field?.original?.language) set.add(field.original.language);
      for (const language of Object.keys(field?.translations || {})) set.add(language);
    }
  }
  return Array.from(set).sort();
}

function buildCategories(prompts) {
  const categories = [];
  for (const prompt of prompts) categories.push(...(prompt.categories || []));
  return uniqueBy(categories, item => `${item.language}:${item.value.toLowerCase()}:${item.source}`)
    .sort((a, b) => a.value.localeCompare(b.value));
}

function buildAssets(prompts) {
  return prompts.flatMap(prompt => (prompt.assets || []).map(asset => ({ ...asset, promptId: prompt.id })));
}

function writeOutputs(projectRoot, dataset, sourceDatasets, report) {
  const canonicalDir = path.join(projectRoot, 'data', 'canonical');
  const reportsDir = path.join(projectRoot, 'data', 'reports');

  writeJson(path.join(canonicalDir, 'prompts.json'), dataset);
  writeJson(path.join(canonicalDir, 'sources.json'), {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: dataset.generatedAt,
    sources: Object.values(SOURCES).map(source => ({
      key: source.config.sourceKey,
      name: source.config.name,
      repo: source.config.repo,
      count: sourceDatasets[source.config.sourceKey]?.length || 0
    }))
  });
  writeJson(path.join(canonicalDir, 'categories.json'), {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: dataset.generatedAt,
    categories: buildCategories(dataset.prompts)
  });
  writeJson(path.join(canonicalDir, 'assets.json'), {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: dataset.generatedAt,
    assets: buildAssets(dataset.prompts)
  });

  writeJson(path.join(reportsDir, 'latest.json'), report.toJSON());
  ensureDir(reportsDir);
  fs.writeFileSync(path.join(reportsDir, 'latest.md'), `${report.toMarkdown()}\n`, 'utf-8');
}

function emitAssetIssues(dataset, report) {
  for (const prompt of dataset.prompts || []) {
    for (const asset of prompt.assets || []) {
      if (!asset.upstreamUrl) continue;
      if (asset.status === 'cached') continue;
      report.warn({
        code: 'asset_not_cached',
        message: `Asset ${asset.id} for ${prompt.id} is not cached locally.`,
        promptId: prompt.id,
        fieldPath: `assets.${asset.id}.localPath`,
        suggestedAction: 'Mirror missing assets before publishing website previews.',
        resolutionCommand: 'pnpm assets:mirror -- --missing'
      });
    }
  }
}

async function loadAndParseSource(sourceKey, options, report) {
  const source = SOURCES[sourceKey];
  if (!source) {
    report.error({
      code: 'unknown_source',
      message: `Unknown source "${sourceKey}".`,
      sourceKey,
      suggestedAction: 'Use one of the configured source keys.',
      resolutionCommand: `pnpm ingest -- --source ${Object.keys(SOURCES).join(',')}`
    });
    return [];
  }

  try {
    const loaded = await source.load({ projectRoot: options.projectRoot, mode: options.mode });
    const records = source.parse(loaded);
    if (records.length === 0) {
      report.warn({
        code: 'source_empty',
        message: `${sourceKey} produced no records.`,
        sourceKey,
        suggestedAction: 'Check upstream files or source plugin parsing rules.',
        resolutionCommand: `pnpm ingest -- --source ${sourceKey}`
      });
    }
    return records;
  } catch (error) {
    report.error({
      code: 'source_parse_failed',
      message: `${sourceKey} failed: ${error.message}`,
      sourceKey,
      suggestedAction: 'Fix source loading/parsing or rerun in local mode with upstream fixtures.',
      resolutionCommand: `pnpm ingest -- --source ${sourceKey} --mode local`
    });
    return [];
  }
}

async function runIngest(options = {}) {
  const projectRoot = options.projectRoot || path.join(__dirname, '..', '..');
  const mode = options.mode || (process.env.USE_REMOTE === 'true' ? 'remote' : 'local');
  const selectedSources = options.sources?.length ? options.sources : Object.keys(SOURCES);
  const targetLanguages = options.targetLanguages || (process.env.TARGET_LANGUAGES || 'en,zh-CN').split(',').map(item => item.trim()).filter(Boolean);
  const strict = Boolean(options.strict);
  const report = options.report || new Report();

  const rawBySource = {};
  const normalizedBySource = {};
  const allNormalized = [];

  for (const sourceKey of selectedSources) {
    const rawRecords = await loadAndParseSource(sourceKey, { projectRoot, mode }, report);
    rawBySource[sourceKey] = rawRecords;

    const sourceNormalized = rawRecords.map(record => normalizeRawRecord(record, { targetLanguages, report }));
    normalizedBySource[sourceKey] = mergePrompts(sourceNormalized);
    allNormalized.push(...sourceNormalized);
  }

  const prompts = mergePrompts(allNormalized)
    .sort((a, b) => {
      const aTime = a.addedAt ? new Date(a.addedAt).getTime() : 0;
      const bTime = b.addedAt ? new Date(b.addedAt).getTime() : 0;
      return bTime - aTime || a.id.localeCompare(b.id);
    });

  const dataset = {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    totalCount: prompts.length,
    languages: languageSet(prompts),
    sourceCount: sourceCount(prompts),
    prompts
  };

  emitAssetIssues(dataset, report);
  report.merge(validateDataset(dataset));
  writeOutputs(projectRoot, dataset, normalizedBySource, report);

  if (strict && report.hasErrors) {
    const error = new Error('Strict ingestion failed. See data/reports/latest.md.');
    error.report = report.toJSON();
    throw error;
  }

  return { dataset, report, rawBySource, normalizedBySource };
}

function parseArgs(argv) {
  const args = {
    command: 'ingest',
    sources: [],
    mode: process.env.USE_REMOTE === 'true' ? 'remote' : 'local',
    strict: false,
    projectRoot: path.join(__dirname, '..', '..'),
    targetLanguages: (process.env.TARGET_LANGUAGES || 'en,zh-CN').split(',').map(item => item.trim()).filter(Boolean)
  };

  const rest = [...argv];
  if (rest[0] && !rest[0].startsWith('-')) args.command = rest.shift();

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === '--source' || arg === '--sources') {
      args.sources = rest[++i].split(',').map(item => item.trim()).filter(Boolean);
    } else if (arg === '--mode') {
      args.mode = rest[++i];
    } else if (arg === '--strict') {
      args.strict = true;
    } else if (arg === '--project-root') {
      args.projectRoot = path.resolve(rest[++i]);
    } else if (arg === '--target-languages' || arg === '--langs') {
      args.targetLanguages = rest[++i].split(',').map(item => item.trim()).filter(Boolean);
    }
  }

  return args;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const options = {
    projectRoot: args.projectRoot,
    mode: args.mode,
    sources: args.sources,
    targetLanguages: args.targetLanguages,
    strict: args.strict || args.command === 'validate'
  };

  const result = await runIngest(options);
  const summary = result.report.toJSON().summary;
  console.log(`Ingested ${result.dataset.totalCount} canonical prompts from ${Object.keys(result.rawBySource).length} source(s).`);
  console.log(`Report: ${summary.error} error(s), ${summary.warning} warning(s), ${summary.info} info.`);
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.message);
    if (error.report) {
      console.error(JSON.stringify(error.report.summary, null, 2));
    }
    process.exit(1);
  });
}

module.exports = {
  SOURCES,
  runIngest,
  parseArgs,
  main
};
