#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Report } = require('./core/report');
const { validateDataset } = require('./core/schema');
const { emitMissingTranslationIssues } = require('./core/normalize');
const { ensureDir, readCanonicalDataset, writeJson } = require('./core/persist');
const { emitClassificationIssues } = require('./classification');

function defaultProjectRoot() {
  return path.join(__dirname, '..', '..');
}

function parseList(value, fallback = []) {
  if (Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean);
  if (!value) return fallback;
  return String(value).split(/[,\s]+/).map(item => item.trim()).filter(Boolean);
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

function writeReport(projectRoot, report) {
  const reportsDir = path.join(projectRoot, 'data', 'reports');
  writeJson(path.join(reportsDir, 'latest.json'), report.toJSON());
  ensureDir(reportsDir);
  fs.writeFileSync(path.join(reportsDir, 'latest.md'), `${report.toMarkdown()}\n`, 'utf-8');
}

function refreshCurrentReport(options = {}) {
  const projectRoot = options.projectRoot || defaultProjectRoot();
  const targetLanguages = options.targetLanguages?.length
    ? options.targetLanguages
    : parseList(process.env.TARGET_LANGUAGES, ['en', 'zh-CN']);
  const dataset = options.dataset || readCanonicalDataset(path.join(projectRoot, 'data', 'canonical', 'prompts.json'));
  const report = options.report || new Report();

  for (const prompt of dataset.prompts || []) {
    emitMissingTranslationIssues(prompt, targetLanguages, report);
  }
  emitClassificationIssues(dataset, report);
  emitAssetIssues(dataset, report);
  report.merge(validateDataset(dataset));

  if (!options.dataset && options.write !== false) {
    writeReport(projectRoot, report);
  }

  return { dataset, report };
}

function parseArgs(argv) {
  const args = {
    projectRoot: defaultProjectRoot(),
    targetLanguages: parseList(process.env.TARGET_LANGUAGES, ['en', 'zh-CN']),
    strict: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--project-root') {
      args.projectRoot = path.resolve(argv[++i]);
    } else if (arg === '--target-languages' || arg === '--target-langs' || arg === '--langs') {
      args.targetLanguages = parseList(argv[++i]);
    } else if (arg === '--strict') {
      args.strict = true;
    }
  }

  return args;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const result = refreshCurrentReport({
    projectRoot: args.projectRoot,
    targetLanguages: args.targetLanguages
  });
  const summary = result.report.toJSON().summary;
  console.log(`Report refreshed: ${summary.error} error(s), ${summary.warning} warning(s), ${summary.info} info.`);

  if (args.strict && result.report.hasErrors) {
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.stack || error.message);
    process.exit(1);
  });
}

module.exports = {
  emitAssetIssues,
  parseArgs,
  refreshCurrentReport,
  writeReport
};
