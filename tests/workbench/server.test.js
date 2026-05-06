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

test('workbench server exposes editable canonical category rules', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'workbench-server-categories-'));

  await withServer({ projectRoot }, async baseUrl => {
    const response = await fetch(`${baseUrl}/api/categories`);
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.equal(payload.categories.some(category => category.id === 'poster-illustration'), true);
    assert.equal(payload.categories.some(category => category.title['zh-CN'] === '海报与插画'), true);
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
      body: JSON.stringify({ language: 'xx' })
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

test('workbench server exposes current and latest action records for refreshed pages', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'workbench-server-current-action-'));
  let release;
  const runner = createActionRunner({
    projectRoot,
    runCommand: async (_commandSpec, onLog) => {
      onLog('[批次 1/2] 开始 20 项（任务 1-20/40）');
      await new Promise(resolve => {
        release = resolve;
      });
      onLog('[批次 1/2] 完成 20 项，累计 20/40');
      return { exitCode: 0 };
    }
  });

  await withServer({ projectRoot, runner }, async baseUrl => {
    const accepted = await fetch(`${baseUrl}/api/actions/workflow`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.equal(accepted.status, 202);
    const action = await accepted.json();

    const current = await (await fetch(`${baseUrl}/api/actions/current`)).json();
    assert.equal(current.id, action.id);
    assert.equal(current.status, 'running');
    assert.equal(current.logs.includes('[批次 1/2] 开始 20 项（任务 1-20/40）'), true);

    release();
    const finished = await runner.wait(action.id);
    assert.equal(finished.status, 'succeeded');

    const currentAfterFinish = await (await fetch(`${baseUrl}/api/actions/current`)).json();
    assert.equal(currentAfterFinish, null);

    const latest = await (await fetch(`${baseUrl}/api/actions/latest`)).json();
    assert.equal(latest.id, action.id);
    assert.equal(latest.status, 'succeeded');
    assert.equal(latest.logs.includes('[批次 1/2] 完成 20 项，累计 20/40'), true);
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
    assert.deepEqual(action.args, ['translate', '--', '--missing', '--lang', 'zh-CN', '--refresh-report', '--target-languages', 'en,zh-CN', '--prompt-id', 'prompt_single', '--field-path', 'title.translations.zh-CN']);
  });
});

test('workbench server passes selected category when fixing a classification issue', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'workbench-server-classify-issue-'));
  writeJson(path.join(projectRoot, 'data/reports/latest.json'), {
    generatedAt: '2026-05-06T00:00:00.000Z',
    issues: [
      {
        severity: 'warning',
        code: 'unclassified_category',
        message: 'Prompt needs category review.',
        promptId: 'prompt_needs_category',
        fieldPath: 'classification.categoryId',
        resolutionCommand: 'pnpm classify -- --prompt-id prompt_needs_category --category <category-id>'
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
      body: JSON.stringify({ index: 0, categoryId: 'poster-illustration' })
    });
    assert.equal(accepted.status, 202);
    const action = await accepted.json();
    assert.equal(action.type, 'issue');
    assert.deepEqual(action.args, ['classify', '--', '--prompt-id', 'prompt_needs_category', '--category', 'poster-illustration', '--refresh-report', '--target-languages', 'en,zh-CN']);
  });
});
