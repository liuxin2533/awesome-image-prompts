#!/usr/bin/env node

const path = require('path');

const { runIngest } = require('./ingestion/cli');
const { translateMissing } = require('./ingestion/translation');
const { mirrorMissingAssets } = require('./ingestion/assets');
const { exportCatalogData } = require('./catalog/export');
const { generateReadmes } = require('./readme/generate');
const { parseLanguageList } = require('./i18n/languages');

function projectRoot() {
  return path.join(__dirname, '..');
}

function parseList(value, fallback = []) {
  return parseLanguageList(value, fallback);
}

function envFlag(name, fallback = false) {
  const value = process.env[name];
  if (value === undefined) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
}

function parseNumber(value, fallback = Infinity) {
  if (value === undefined || value === null || value === '') return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function parseArgs(argv) {
  const targetLanguages = parseList(process.env.TARGET_LANGUAGES, ['en', 'zh-CN']);
  const args = {
    projectRoot: projectRoot(),
    mode: process.env.USE_REMOTE === 'true' ? 'remote' : 'local',
    sources: [],
    targetLanguages,
    defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
    translate: envFlag('ENABLE_TRANSLATION', false),
    translationLanguages: parseList(process.env.TRANSLATION_LANGUAGES, targetLanguages.filter(language => language !== 'en')),
    translationLimit: parseNumber(process.env.TRANSLATION_LIMIT),
    mirrorAssets: envFlag('MIRROR_ASSETS', false),
    assetLimit: parseNumber(process.env.ASSET_LIMIT),
    catalogLanguages: parseList(process.env.CATALOG_LANGUAGES || process.env.SITE_LANGUAGES, targetLanguages),
    strict: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--project-root') {
      args.projectRoot = path.resolve(argv[++i]);
    } else if (arg === '--mode') {
      args.mode = argv[++i];
    } else if (arg === '--source' || arg === '--sources') {
      args.sources = parseList(argv[++i]);
    } else if (arg === '--target-languages' || arg === '--target-langs') {
      args.targetLanguages = parseList(argv[++i]);
    } else if (arg === '--default-language') {
      args.defaultLanguage = argv[++i];
    } else if (arg === '--translate') {
      args.translate = true;
    } else if (arg === '--no-translate') {
      args.translate = false;
    } else if (arg === '--translation-languages' || arg === '--translation-langs') {
      args.translationLanguages = parseList(argv[++i]);
    } else if (arg === '--translation-limit') {
      args.translationLimit = parseNumber(argv[++i]);
    } else if (arg === '--mirror-assets') {
      args.mirrorAssets = true;
    } else if (arg === '--no-mirror-assets') {
      args.mirrorAssets = false;
    } else if (arg === '--asset-limit') {
      args.assetLimit = parseNumber(argv[++i]);
    } else if (arg === '--catalog-languages' || arg === '--catalog-langs' || arg === '--site-languages' || arg === '--site-langs') {
      args.catalogLanguages = parseList(argv[++i]);
    } else if (arg === '--strict') {
      args.strict = true;
    }
  }

  args.siteLanguages = args.catalogLanguages;
  return args;
}

async function runWorkflow(options = {}) {
  const steps = options.steps || {
    runIngest,
    translateMissing,
    mirrorMissingAssets,
    exportCatalogData,
    generateReadmes
  };
  const root = options.projectRoot || projectRoot();
  const targetLanguages = options.targetLanguages?.length ? options.targetLanguages : ['en', 'zh-CN'];
  const catalogLanguages = options.catalogLanguages?.length
    ? options.catalogLanguages
    : options.siteLanguages?.length
      ? options.siteLanguages
      : targetLanguages;
  const translationLanguages = options.translationLanguages?.length
    ? options.translationLanguages
    : targetLanguages.filter(language => language !== (options.defaultLanguage || 'en'));

  const ingest = await steps.runIngest({
    projectRoot: root,
    mode: options.mode || 'local',
    sources: options.sources || [],
    targetLanguages,
    strict: Boolean(options.strict)
  });

  let translation = null;
  if (options.translate) {
    translation = await steps.translateMissing({
      projectRoot: root,
      languages: translationLanguages,
      strict: Boolean(options.strict),
      limit: Number.isFinite(options.translationLimit) ? options.translationLimit : Infinity
    });
  }

  let assets = null;
  if (options.mirrorAssets) {
    assets = await steps.mirrorMissingAssets({
      projectRoot: root,
      strict: Boolean(options.strict),
      limit: Number.isFinite(options.assetLimit) ? options.assetLimit : Infinity
    });
  }

  const catalog = await steps.exportCatalogData({
    projectRoot: root,
    languages: catalogLanguages,
    defaultLanguage: options.defaultLanguage || 'en'
  });

  const readmes = await steps.generateReadmes({
    projectRoot: root,
    languages: catalogLanguages
  });

  return {
    ingest,
    translation,
    assets,
    catalog,
    readmes
  };
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const result = await runWorkflow(args);
  const summary = result.ingest.report?.toJSON?.().summary || {};

  console.log(`Ingested ${result.ingest.dataset.totalCount} prompt(s).`);
  console.log(`Report: ${summary.error || 0} error(s), ${summary.warning || 0} warning(s), ${summary.info || 0} info.`);
  if (result.translation) {
    console.log(`Translation: ${result.translation.translatedCount} translated, ${result.translation.failedCount} failed.`);
  }
  if (result.assets) {
    console.log(`Assets: ${result.assets.cachedCount} cached, ${result.assets.failedCount} failed.`);
  }
  console.log(`Catalog export: ${result.catalog.manifest.totalCount} prompt(s), ${result.catalog.manifest.languages.join(', ')}.`);
  console.log(`README: ${result.readmes.files.join(', ')}.`);
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.stack || error.message);
    if (error.report) console.error(JSON.stringify(error.report.summary, null, 2));
    process.exit(1);
  });
}

module.exports = {
  parseArgs,
  runWorkflow,
  main
};
