#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Report } = require('./core/report');
const { ensureDir, readJson, writeDerivedData } = require('./core/persist');
const { refreshCurrentReport } = require('./report-current');

function defaultProjectRoot() {
  return path.join(__dirname, '..', '..');
}

async function fetchRemoteAsset(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GET ${url} failed with ${response.status}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  return {
    bytes,
    contentType: response.headers.get('content-type') || 'application/octet-stream'
  };
}

function assetCandidates(dataset, options = {}) {
  const force = Boolean(options.force);
  const onlyMissing = options.missing !== false;
  const candidates = [];

  for (const prompt of dataset.prompts || []) {
    if (options.promptId && prompt.id !== options.promptId) continue;
    for (const asset of prompt.assets || []) {
      if (options.assetId && asset.id !== options.assetId) continue;
      if (!asset.upstreamUrl) continue;
      if (onlyMissing && asset.status === 'cached' && !force) continue;
      candidates.push({ prompt, asset });
    }
  }

  return candidates;
}

function workspacePath(projectRoot, relativePath) {
  const root = path.resolve(projectRoot);
  const full = path.resolve(projectRoot, relativePath);
  if (!(full === root || full.startsWith(root + path.sep))) {
    throw new Error(`Refusing to write asset outside project root: ${relativePath}`);
  }
  return full;
}

async function mirrorMissingAssets(options = {}) {
  const projectRoot = options.projectRoot || defaultProjectRoot();
  const datasetPath = path.join(projectRoot, 'data', 'canonical', 'prompts.json');
  const dataset = options.dataset || readJson(datasetPath);
  const fetchAsset = options.fetchAsset || fetchRemoteAsset;
  const report = options.report || new Report();
  const force = Boolean(options.force);
  const dryRun = Boolean(options.dryRun);
  const strict = Boolean(options.strict);
  const limit = Number.isFinite(options.limit) ? options.limit : Infinity;
  const candidates = assetCandidates(dataset, {
    force,
    missing: options.missing,
    promptId: options.promptId,
    assetId: options.assetId
  }).slice(0, limit);

  let cachedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const { prompt, asset } of candidates) {
    try {
      const localFullPath = workspacePath(projectRoot, asset.localPath);
      if (!force && fs.existsSync(localFullPath)) {
        const stat = fs.statSync(localFullPath);
        asset.status = 'cached';
        asset.bytes = stat.size;
        asset.cachedAt = asset.cachedAt || new Date().toISOString();
        cachedCount++;
        continue;
      }

      if (dryRun) {
        skippedCount++;
        continue;
      }

      const result = await fetchAsset(asset.upstreamUrl, asset);
      const bytes = Buffer.isBuffer(result) ? result : result.bytes;
      if (!Buffer.isBuffer(bytes)) {
        throw new Error('fetchAsset must return a Buffer or { bytes: Buffer }.');
      }

      ensureDir(path.dirname(localFullPath));
      fs.writeFileSync(localFullPath, bytes);

      asset.status = 'cached';
      asset.bytes = bytes.length;
      asset.contentType = result.contentType || asset.contentType || 'application/octet-stream';
      asset.cachedAt = new Date().toISOString();
      delete asset.error;
      prompt.updatedAt = new Date().toISOString();
      cachedCount++;
    } catch (error) {
      failedCount++;
      asset.status = 'failed';
      asset.error = error.message;
      asset.failedAt = new Date().toISOString();
      report.warn({
        code: 'asset_mirror_failed',
        message: `Failed to mirror asset for ${prompt.id}: ${error.message}`,
        promptId: prompt.id,
        fieldPath: `assets.${asset.id}`,
        suggestedAction: 'Retry asset mirroring after checking the upstream URL and network access.',
        resolutionCommand: 'pnpm assets:mirror -- --missing'
      });
    }
  }

  report.info({
    code: 'asset_mirror_completed',
    message: `Cached ${cachedCount} asset(s); ${failedCount} failed; ${skippedCount} skipped; ${candidates.length} considered.`,
    suggestedAction: failedCount ? 'Review asset_mirror_failed warnings.' : 'Run validate to refresh the report.'
  });

  if (!dryRun && !options.dataset) {
    writeDerivedData(projectRoot, dataset);
  }

  if (strict && failedCount > 0) {
    const error = new Error(`Asset mirroring failed for ${failedCount} asset(s).`);
    error.report = report.toJSON();
    throw error;
  }

  return { dataset, report, candidateCount: candidates.length, cachedCount, skippedCount, failedCount };
}

function parseArgs(argv) {
  const args = {
    projectRoot: defaultProjectRoot(),
    force: false,
    dryRun: false,
    strict: false,
    missing: true,
    limit: Infinity,
    refreshReport: false
  };
  const rest = [...argv];
  if (rest[0] && !rest[0].startsWith('-')) rest.shift();

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === '--project-root') {
      args.projectRoot = path.resolve(rest[++i]);
    } else if (arg === '--force') {
      args.force = true;
    } else if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (arg === '--strict') {
      args.strict = true;
    } else if (arg === '--all') {
      args.missing = false;
    } else if (arg === '--limit') {
      args.limit = Number(rest[++i]);
    } else if (arg === '--prompt-id') {
      args.promptId = rest[++i];
    } else if (arg === '--asset-id') {
      args.assetId = rest[++i];
    } else if (arg === '--refresh-report') {
      args.refreshReport = true;
    }
  }

  return args;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const result = await mirrorMissingAssets(args);
  console.log(`Asset tasks: ${result.candidateCount}; cached: ${result.cachedCount}; failed: ${result.failedCount}; skipped: ${result.skippedCount}.`);
  if (args.refreshReport) {
    const refreshed = refreshCurrentReport({ projectRoot: args.projectRoot });
    const summary = refreshed.report.toJSON().summary;
    console.log(`Report refreshed: ${summary.error} error(s), ${summary.warning} warning(s), ${summary.info} info.`);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.message);
    if (error.report) console.error(JSON.stringify(error.report.summary, null, 2));
    process.exit(1);
  });
}

module.exports = {
  fetchRemoteAsset,
  assetCandidates,
  mirrorMissingAssets,
  parseArgs,
  main
};
