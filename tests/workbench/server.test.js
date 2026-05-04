const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { createActionRunner } = require('../../scripts/workbench/actions');
const { createWorkbenchServer } = require('../../scripts/workbench/server');

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

async function withServer(handler, callback) {
  const server = createWorkbenchServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  try {
    await callback(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

test('workbench server exposes report and masked config endpoints', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'workbench-server-'));
  writeJson(path.join(projectRoot, 'data/reports/latest.json'), {
    generatedAt: '2026-05-04T00:00:00.000Z',
    issues: [
      {
        severity: 'warning',
        code: 'missing_translation',
        message: 'title missing zh-CN translation',
        fieldPath: 'title.translations.zh-CN',
        resolutionCommand: 'pnpm translate -- --missing --lang zh-CN'
      }
    ]
  });
  fs.writeFileSync(path.join(projectRoot, '.env'), 'ZHIPUAI_API_KEY=secret-abcdef\nZHIPUAI_MODEL=glm-test\n', 'utf-8');

  await withServer({ projectRoot }, async baseUrl => {
    const report = await (await fetch(`${baseUrl}/api/report`)).json();
    assert.equal(report.summary.warning, 1);
    assert.equal(report.grouped.translationByLanguage['zh-CN'], 1);

    const config = await (await fetch(`${baseUrl}/api/config`)).json();
    assert.equal(config.hasApiKey, true);
    assert.equal(config.maskedApiKey, '*********cdef');
    assert.equal(config.apiKey, undefined);
    assert.equal(config.model, 'glm-test');
  });
});

test('workbench server saves AI config and rejects unsupported actions', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'workbench-server-actions-'));
  const runner = createActionRunner({
    projectRoot,
    runCommand: async () => ({ exitCode: 0 })
  });

  await withServer({ projectRoot, runner }, async baseUrl => {
    const saved = await fetch(`${baseUrl}/api/config/ai`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        apiKey: 'zhipu-secret',
        baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
        model: 'glm-4.5-flash'
      })
    });
    assert.equal(saved.status, 200);
    assert.match(fs.readFileSync(path.join(projectRoot, '.env'), 'utf-8'), /ZHIPUAI_API_KEY=zhipu-secret/);

    const rejected = await fetch(`${baseUrl}/api/actions/translate`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ language: 'fr' })
    });
    assert.equal(rejected.status, 400);

    const accepted = await fetch(`${baseUrl}/api/actions/translate`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ language: 'en', limit: 1 })
    });
    assert.equal(accepted.status, 202);
    const action = await accepted.json();
    assert.equal(action.type, 'translate');
    assert.equal(action.args.includes('en'), true);
  });
});

test('workbench server runs a single report issue by index', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'workbench-server-issue-'));
  writeJson(path.join(projectRoot, 'data/reports/latest.json'), {
    generatedAt: '2026-05-04T00:00:00.000Z',
    issues: [
      {
        severity: 'warning',
        code: 'missing_translation',
        message: 'title missing zh-CN translation',
        promptId: 'prompt_single',
        fieldPath: 'title.translations.zh-CN',
        resolutionCommand: 'pnpm translate -- --missing --lang zh-CN'
      }
    ]
  });

  const commands = [];
  const runner = createActionRunner({
    projectRoot,
    runCommand: async commandSpec => {
      commands.push(commandSpec);
      return { exitCode: 0 };
    }
  });

  await withServer({ projectRoot, runner }, async baseUrl => {
    const accepted = await fetch(`${baseUrl}/api/actions/issue`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ index: 0 })
    });
    assert.equal(accepted.status, 202);
    const action = await accepted.json();
    assert.equal(action.type, 'issue');
    assert.deepEqual(action.args, ['translate', '--', '--missing', '--lang', 'zh-CN', '--refresh-report', '--prompt-id', 'prompt_single', '--field-path', 'title.translations.zh-CN']);
  });
});
