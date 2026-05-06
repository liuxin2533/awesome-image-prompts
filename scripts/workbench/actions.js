const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { defaultProjectRoot } = require('./config');

const SUPPORTED_TRANSLATION_LANGUAGES = new Set(['en', 'zh-CN']);
const WORKBENCH_REPORT_LANGUAGES = ['en', 'zh-CN'];
const WORKBENCH_TRANSLATION_CONCURRENCY = 2;

function reportLanguageArgs() {
  return ['--target-languages', WORKBENCH_REPORT_LANGUAGES.join(',')];
}

function normalizeLimit(value) {
  if (value === undefined || value === null || value === '') return null;
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error('Action limit must be a positive integer.');
  }
  return String(number);
}

function pathValue(env = process.env) {
  return env.Path || env.PATH || '';
}

function resolveWindowsPnpmCli(env = process.env) {
  for (const directory of pathValue(env).split(path.delimiter).filter(Boolean)) {
    const commandPath = path.join(directory, 'pnpm.cmd');
    if (!fs.existsSync(commandPath)) continue;

    const cliPath = path.join(directory, 'node_modules', 'pnpm', 'bin', 'pnpm.cjs');
    if (fs.existsSync(cliPath)) return cliPath;
  }

  return null;
}

function createPackageScriptCommand(args, options = {}) {
  const platform = options.platform || process.platform;
  if (platform !== 'win32') return { command: 'pnpm', args };

  const cliPath = resolveWindowsPnpmCli(options.env || process.env);
  if (!cliPath) {
    throw new Error('Unable to locate pnpm CLI. Make sure pnpm is installed and available on PATH.');
  }

  return {
    command: options.execPath || process.execPath,
    args: [cliPath, ...args],
    displayArgs: args
  };
}

function buildActionCommand(type, body = {}, options = {}) {
  if (type === 'issue') {
    return buildIssueActionCommand({ ...(body.issue || {}), categoryId: body.categoryId }, options);
  }

  if (type === 'translate') {
    const language = body.language;
    if (!SUPPORTED_TRANSLATION_LANGUAGES.has(language)) {
      throw new Error(`Unsupported language: ${language}`);
    }
    const args = [
      'translate',
      '--',
      '--missing',
      '--lang',
      language,
      '--refresh-report',
      ...reportLanguageArgs(),
      '--concurrency',
      String(WORKBENCH_TRANSLATION_CONCURRENCY)
    ];
    const limit = normalizeLimit(body.limit);
    if (limit) args.push('--limit', limit);
    return createPackageScriptCommand(args, options);
  }

  if (type === 'mirror-assets') {
    const args = ['assets:mirror', '--', '--missing', '--refresh-report', ...reportLanguageArgs()];
    const limit = normalizeLimit(body.limit);
    if (limit) args.push('--limit', limit);
    return createPackageScriptCommand(args, options);
  }

  if (type === 'refresh-report') {
    return createPackageScriptCommand(['report:refresh', '--', ...reportLanguageArgs()], options);
  }

  if (type === 'classify') {
    return createPackageScriptCommand(['classify', '--', '--refresh-report', ...reportLanguageArgs()], options);
  }

  if (type === 'workflow') {
    return createPackageScriptCommand([
      'workflow',
      '--',
      '--mode',
      'local',
      '--target-languages',
      'en,zh-CN',
      '--catalog-languages',
      'en,zh-CN',
      '--strict'
    ], options);
  }

  throw new Error(`Unsupported action: ${type}`);
}

function inferTranslationLanguage(issue) {
  const commandMatch = String(issue?.resolutionCommand || '').match(/--lang\s+([^\s]+)/);
  if (commandMatch) return commandMatch[1];
  const fieldMatch = String(issue?.fieldPath || '').match(/(?:^|\.)(zh-CN|en)(?:$|\.)/);
  return fieldMatch ? fieldMatch[1] : null;
}

function assetIdFromFieldPath(fieldPath) {
  const match = String(fieldPath || '').match(/^assets\.([^.]+)\.localPath$/);
  return match ? match[1] : null;
}

function buildIssueActionCommand(issue = {}, options = {}) {
  if (!issue.promptId) throw new Error('Cannot fix a single issue without a prompt id.');

  if (issue.code === 'missing_translation') {
    const language = inferTranslationLanguage(issue);
    if (!SUPPORTED_TRANSLATION_LANGUAGES.has(language)) {
      throw new Error(`Unsupported language: ${language}`);
    }
    if (!issue.fieldPath) throw new Error('Cannot fix a translation issue without a field path.');
    return createPackageScriptCommand([
      'translate',
      '--',
      '--missing',
      '--lang',
      language,
      '--refresh-report',
      ...reportLanguageArgs(),
      '--prompt-id',
      issue.promptId,
      '--field-path',
      issue.fieldPath
    ], options);
  }

  if (issue.code === 'asset_not_cached') {
    const assetId = assetIdFromFieldPath(issue.fieldPath);
    if (!assetId) throw new Error('Cannot fix an asset issue without an asset id.');
    return createPackageScriptCommand([
      'assets:mirror',
      '--',
      '--missing',
      '--refresh-report',
      ...reportLanguageArgs(),
      '--prompt-id',
      issue.promptId,
      '--asset-id',
      assetId
    ], options);
  }

  if (issue.code === 'unclassified_category') {
    if (!issue.categoryId) throw new Error('Cannot fix a classification issue without a category id.');
    return createPackageScriptCommand([
      'classify',
      '--',
      '--prompt-id',
      issue.promptId,
      '--category',
      issue.categoryId,
      '--refresh-report',
      ...reportLanguageArgs()
    ], options);
  }

  throw new Error(`No automatic fix is available for ${issue.code || 'this issue'}.`);
}

function appendBoundedLog(record, line, maxLogLines) {
  for (const item of String(line || '').split(/\r?\n/).filter(Boolean)) {
    record.logs.push(item);
    if (record.logs.length > maxLogLines) record.logs.shift();
  }
}

function publicRecord(record) {
  if (!record) return null;
  const { promise, ...rest } = record;
  return { ...rest, logs: [...rest.logs] };
}

function packageScriptArgs(commandSpec) {
  const args = commandSpec.displayArgs || commandSpec.args || [];
  if (String(args[0] || '').endsWith('pnpm.cjs')) return args.slice(1);
  return args;
}

function projectOptions(args, commandSpec) {
  if (!commandSpec.cwd) return args;
  return { ...args, projectRoot: commandSpec.cwd };
}

function logReportRefresh(onLog, summary) {
  onLog(`Report refreshed: ${summary.error} error(s), ${summary.warning} warning(s), ${summary.info} info.`);
}

function formatTranslationProgress(event) {
  const prefix = `[${event.index}/${event.total}]`;
  const field = `${event.fieldPath} (${event.promptId})`;
  if (event.type === 'start') return `${prefix} 开始 ${field}`;
  if (event.type === 'success') return `${prefix} 完成 ${field}`;
  if (event.type === 'failure') return `${prefix} 失败 ${field}: ${event.error}`;
  return `${prefix} ${field}`;
}

async function runPackageScriptInProcess(commandSpec, onLog) {
  const args = packageScriptArgs(commandSpec);
  const scriptName = args[0];

  if (scriptName === 'translate') {
    const { parseArgs, translateMissing } = require('../ingestion/translation');
    const { refreshCurrentReport } = require('../ingestion/report-current');
    const parsed = projectOptions(parseArgs(args), commandSpec);
    parsed.onProgress = event => onLog(formatTranslationProgress(event));
    const result = await translateMissing(parsed);
    onLog(`Translation tasks: ${result.taskCount}; translated: ${result.translatedCount}; failed: ${result.failedCount}.`);
    if (parsed.refreshReport) {
      const refreshed = refreshCurrentReport({
        projectRoot: parsed.projectRoot,
        targetLanguages: parsed.targetLanguages
      });
      logReportRefresh(onLog, refreshed.report.toJSON().summary);
    }
    return { exitCode: 0 };
  }

  if (scriptName === 'assets:mirror') {
    const { parseArgs, mirrorMissingAssets } = require('../ingestion/assets');
    const { refreshCurrentReport } = require('../ingestion/report-current');
    const parsed = projectOptions(parseArgs(args), commandSpec);
    const result = await mirrorMissingAssets(parsed);
    onLog(`Asset tasks: ${result.candidateCount}; cached: ${result.cachedCount}; failed: ${result.failedCount}; skipped: ${result.skippedCount}.`);
    if (parsed.refreshReport) {
      const refreshed = refreshCurrentReport({
        projectRoot: parsed.projectRoot,
        targetLanguages: parsed.targetLanguages
      });
      logReportRefresh(onLog, refreshed.report.toJSON().summary);
    }
    return { exitCode: 0 };
  }

  if (scriptName === 'report:refresh') {
    const { parseArgs, refreshCurrentReport } = require('../ingestion/report-current');
    const parsed = projectOptions(parseArgs(args), commandSpec);
    const result = refreshCurrentReport({
      projectRoot: parsed.projectRoot,
      targetLanguages: parsed.targetLanguages
    });
    logReportRefresh(onLog, result.report.toJSON().summary);
    return { exitCode: parsed.strict && result.report.hasErrors ? 1 : 0 };
  }

  if (scriptName === 'classify') {
    const { parseArgs, assignPromptCategory, classifyCanonical } = require('../ingestion/classification');
    const { refreshCurrentReport } = require('../ingestion/report-current');
    const parsed = projectOptions(parseArgs(args.slice(1)), commandSpec);
    const actionOptions = { ...parsed, refreshReport: false };
    const result = parsed.promptId || parsed.categoryId
      ? assignPromptCategory(actionOptions)
      : classifyCanonical(actionOptions);
    if (result.prompt) {
      onLog(`Classified ${result.prompt.id} as ${result.category.id}.`);
    } else {
      onLog(`Classification: ${result.classifiedCount} classified, ${result.needsReviewCount} need review.`);
    }
    if (parsed.refreshReport) {
      const refreshed = refreshCurrentReport({
        projectRoot: parsed.projectRoot,
        targetLanguages: parsed.targetLanguages
      });
      logReportRefresh(onLog, refreshed.report.toJSON().summary);
    }
    return { exitCode: 0 };
  }

  if (scriptName === 'workflow') {
    const { parseArgs, runWorkflow } = require('../workflow');
    const parsed = projectOptions(parseArgs(args), commandSpec);
    const result = await runWorkflow(parsed);
    const summary = result.ingest.report?.toJSON?.().summary || {};
    onLog(`Ingested ${result.ingest.dataset.totalCount} prompt(s).`);
    onLog(`Report: ${summary.error || 0} error(s), ${summary.warning || 0} warning(s), ${summary.info || 0} info.`);
    if (result.translation) {
      onLog(`Translation: ${result.translation.translatedCount} translated, ${result.translation.failedCount} failed.`);
    }
    if (result.assets) {
      onLog(`Assets: ${result.assets.cachedCount} cached, ${result.assets.failedCount} failed.`);
    }
    onLog(`Catalog export: ${result.catalog.manifest.totalCount} prompt(s), ${result.catalog.manifest.languages.join(', ')}.`);
    onLog(`README: ${result.readmes.files.join(', ')}.`);
    return { exitCode: 0 };
  }

  throw new Error(`Unsupported package script: ${scriptName || '(missing)'}.`);
}

function runSpawnedCommand(commandSpec, onLog) {
  return new Promise((resolve, reject) => {
    const child = spawn(commandSpec.command, commandSpec.args, {
      cwd: commandSpec.cwd,
      env: process.env,
      shell: false
    });

    child.stdout.on('data', chunk => onLog(chunk.toString()));
    child.stderr.on('data', chunk => onLog(chunk.toString()));
    child.on('error', reject);
    child.on('close', exitCode => resolve({ exitCode }));
  });
}

function createActionRunner(options = {}) {
  const projectRoot = options.projectRoot || defaultProjectRoot();
  const runCommand = options.runCommand || runPackageScriptInProcess;
  const maxLogLines = options.maxLogLines || 200;
  const records = new Map();
  let runningId = null;
  let nextId = 1;

  function start(type, body = {}) {
    if (runningId) {
      const error = new Error('An action is already running.');
      error.statusCode = 409;
      throw error;
    }

    const commandSpec = { ...buildActionCommand(type, body), cwd: projectRoot };
    const id = `action_${String(nextId++).padStart(4, '0')}`;
    const record = {
      id,
      type,
      command: commandSpec.command,
      args: commandSpec.displayArgs || commandSpec.args,
      status: 'running',
      startedAt: new Date().toISOString(),
      finishedAt: null,
      exitCode: null,
      logs: []
    };

    records.set(id, record);
    runningId = id;
    record.promise = (async () => {
      try {
        const result = await runCommand(commandSpec, line => appendBoundedLog(record, line, maxLogLines));
        record.exitCode = Number.isInteger(result?.exitCode) ? result.exitCode : 0;
        record.status = record.exitCode === 0 ? 'succeeded' : 'failed';
      } catch (error) {
        record.status = 'failed';
        record.exitCode = Number.isInteger(error.exitCode) ? error.exitCode : 1;
        appendBoundedLog(record, error.message, maxLogLines);
      } finally {
        record.finishedAt = new Date().toISOString();
        runningId = null;
      }
      return publicRecord(record);
    })();

    return publicRecord(record);
  }

  async function wait(id) {
    const record = records.get(id);
    if (!record) return null;
    return record.promise || publicRecord(record);
  }

  function get(id) {
    return publicRecord(records.get(id));
  }

  function current() {
    return runningId ? get(runningId) : null;
  }

  return {
    current,
    get,
    start,
    wait
  };
}

module.exports = {
  buildActionCommand,
  buildIssueActionCommand,
  createPackageScriptCommand,
  createActionRunner,
  runPackageScriptInProcess,
  runSpawnedCommand
};
