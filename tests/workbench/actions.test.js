const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  buildActionCommand,
  buildIssueActionCommand,
  createActionRunner,
  createPackageScriptCommand
} = require('../../scripts/workbench/actions');

test('buildActionCommand only creates whitelisted maintenance commands', () => {
  const options = { platform: 'linux' };

  assert.deepEqual(buildActionCommand('translate', { language: 'zh-CN', limit: 12 }, options), {
    command: 'pnpm',
    args: ['translate', '--', '--missing', '--lang', 'zh-CN', '--refresh-report', '--target-languages', 'en,zh-CN', '--limit', '12']
  });
  assert.deepEqual(buildActionCommand('translate', { language: 'en' }, options), {
    command: 'pnpm',
    args: ['translate', '--', '--missing', '--lang', 'en', '--refresh-report', '--target-languages', 'en,zh-CN']
  });
  assert.deepEqual(buildActionCommand('mirror-assets', { limit: 5 }, options), {
    command: 'pnpm',
    args: ['assets:mirror', '--', '--missing', '--refresh-report', '--target-languages', 'en,zh-CN', '--limit', '5']
  });
  assert.deepEqual(buildActionCommand('refresh-report', {}, options), {
    command: 'pnpm',
    args: ['report:refresh', '--', '--target-languages', 'en,zh-CN']
  });
  assert.deepEqual(buildActionCommand('workflow', {}, options), {
    command: 'pnpm',
    args: ['workflow', '--', '--mode', 'local', '--target-languages', 'en,zh-CN', '--catalog-languages', 'en,zh-CN', '--strict']
  });
});

test('buildActionCommand rejects unsupported actions, languages, and limits', () => {
  assert.throws(() => buildActionCommand('shell', { command: 'git status' }), /Unsupported action/);
  assert.throws(() => buildActionCommand('translate', { language: 'fr' }), /Unsupported language/);
  assert.throws(() => buildActionCommand('translate', { language: 'en', limit: 0 }), /positive integer/);
});

test('buildIssueActionCommand creates single-issue translation and asset commands', () => {
  const options = { platform: 'linux' };

  assert.deepEqual(buildIssueActionCommand({
    code: 'missing_translation',
    promptId: 'prompt_one',
    fieldPath: 'title.translations.zh-CN',
    resolutionCommand: 'pnpm translate -- --missing --lang zh-CN'
  }, options), {
    command: 'pnpm',
    args: ['translate', '--', '--missing', '--lang', 'zh-CN', '--refresh-report', '--target-languages', 'en,zh-CN', '--prompt-id', 'prompt_one', '--field-path', 'title.translations.zh-CN']
  });

  assert.deepEqual(buildIssueActionCommand({
    code: 'asset_not_cached',
    promptId: 'prompt_two',
    fieldPath: 'assets.asset_123.localPath'
  }, options), {
    command: 'pnpm',
    args: ['assets:mirror', '--', '--missing', '--refresh-report', '--target-languages', 'en,zh-CN', '--prompt-id', 'prompt_two', '--asset-id', 'asset_123']
  });
});

test('createPackageScriptCommand resolves pnpm to its Node CLI on Windows', () => {
  const packageRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'workbench-pnpm-'));
  const cliPath = path.join(packageRoot, 'node_modules', 'pnpm', 'bin', 'pnpm.cjs');
  fs.mkdirSync(path.dirname(cliPath), { recursive: true });
  fs.writeFileSync(path.join(packageRoot, 'pnpm.cmd'), '@echo off\n', 'utf-8');
  fs.writeFileSync(cliPath, '#!/usr/bin/env node\n', 'utf-8');

  assert.deepEqual(createPackageScriptCommand(['translate', '--', '--missing'], {
    env: { Path: packageRoot },
    execPath: 'C:\\node\\node.exe',
    platform: 'win32'
  }), {
    command: 'C:\\node\\node.exe',
    args: [cliPath, 'translate', '--', '--missing'],
    displayArgs: ['translate', '--', '--missing']
  });
});

test('buildIssueActionCommand rejects unsupported issue types and missing identifiers', () => {
  assert.throws(() => buildIssueActionCommand({ code: 'invalid_prompt', promptId: 'prompt_one' }), /No automatic fix/);
  assert.throws(() => buildIssueActionCommand({ code: 'missing_translation', fieldPath: 'title.translations.zh-CN' }), /prompt id/);
  assert.throws(() => buildIssueActionCommand({ code: 'asset_not_cached', promptId: 'prompt_one', fieldPath: 'assets.localPath' }), /asset id/);
});

test('createActionRunner serializes action execution and keeps bounded logs', async () => {
  let release;
  const runner = createActionRunner({
    maxLogLines: 2,
    runCommand: async (_commandSpec, onLog) => {
      onLog('first log');
      onLog('second log');
      onLog('third log');
      await new Promise(resolve => {
        release = resolve;
      });
      return { exitCode: 0 };
    }
  });

  const first = runner.start('workflow', {});
  assert.equal(first.status, 'running');
  assert.equal(runner.get(first.id).status, 'running');

  assert.throws(() => runner.start('workflow', {}), error => {
    assert.equal(error.statusCode, 409);
    assert.match(error.message, /already running/);
    return true;
  });

  release();
  const finished = await runner.wait(first.id);

  assert.equal(finished.status, 'succeeded');
  assert.equal(finished.exitCode, 0);
  assert.deepEqual(finished.logs, ['second log', 'third log']);
});
