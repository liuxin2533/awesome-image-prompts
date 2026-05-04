const { spawn } = require('child_process');
const { defaultProjectRoot } = require('./config');

const SUPPORTED_TRANSLATION_LANGUAGES = new Set(['en', 'zh-CN']);

function normalizeLimit(value) {
  if (value === undefined || value === null || value === '') return null;
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error('Action limit must be a positive integer.');
  }
  return String(number);
}

function buildActionCommand(type, body = {}) {
  if (type === 'issue') {
    return buildIssueActionCommand(body.issue);
  }

  if (type === 'translate') {
    const language = body.language;
    if (!SUPPORTED_TRANSLATION_LANGUAGES.has(language)) {
      throw new Error(`Unsupported language: ${language}`);
    }
    const args = ['translate', '--', '--missing', '--lang', language];
    const limit = normalizeLimit(body.limit);
    if (limit) args.push('--limit', limit);
    return { command: 'pnpm', args };
  }

  if (type === 'mirror-assets') {
    const args = ['assets:mirror', '--', '--missing'];
    const limit = normalizeLimit(body.limit);
    if (limit) args.push('--limit', limit);
    return { command: 'pnpm', args };
  }

  if (type === 'workflow') {
    return {
      command: 'pnpm',
      args: ['workflow', '--', '--mode', 'local', '--target-languages', 'en,zh-CN', '--catalog-languages', 'en,zh-CN', '--strict']
    };
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

function buildIssueActionCommand(issue = {}) {
  if (!issue.promptId) throw new Error('Cannot fix a single issue without a prompt id.');

  if (issue.code === 'missing_translation') {
    const language = inferTranslationLanguage(issue);
    if (!SUPPORTED_TRANSLATION_LANGUAGES.has(language)) {
      throw new Error(`Unsupported language: ${language}`);
    }
    if (!issue.fieldPath) throw new Error('Cannot fix a translation issue without a field path.');
    return {
      command: 'pnpm',
      args: ['translate', '--', '--missing', '--lang', language, '--prompt-id', issue.promptId, '--field-path', issue.fieldPath]
    };
  }

  if (issue.code === 'asset_not_cached') {
    const assetId = assetIdFromFieldPath(issue.fieldPath);
    if (!assetId) throw new Error('Cannot fix an asset issue without an asset id.');
    return {
      command: 'pnpm',
      args: ['assets:mirror', '--', '--missing', '--prompt-id', issue.promptId, '--asset-id', assetId]
    };
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
  const runCommand = options.runCommand || runSpawnedCommand;
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
      args: commandSpec.args,
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
  createActionRunner,
  runSpawnedCommand
};
