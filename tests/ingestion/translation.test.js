const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { createZhipuProvider, parseArgs, translateMissing } = require('../../scripts/ingestion/translation');
const { loadProjectEnv } = require('../../scripts/workbench/config');

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

function promptFixture() {
  return {
    id: 'prompt_aaaaaaaaaaaaaaaaaaaa',
    contentHash: 'a'.repeat(64),
    dedupeKey: 'make a poster',
    promptText: {
      original: { language: 'en', value: 'Make a poster', source: 'upstream' },
      translations: {}
    },
    title: {
      original: { language: 'en', value: 'Poster', source: 'upstream' },
      translations: {}
    },
    description: {
      original: { language: 'en', value: 'A poster prompt', source: 'upstream' },
      translations: {}
    },
    categories: [
      { id: 'poster', value: 'Poster', language: 'en', source: 'upstream', sourceKey: 'fixture' }
    ],
    tags: [
      { id: 'cinematic', value: 'Cinematic', language: 'en', source: 'derived' }
    ],
    sources: [],
    assets: [],
    curation: { overrides: [] },
    addedAt: null,
    updatedAt: '2026-05-04T00:00:00.000Z'
  };
}

test('translateMissing fills missing field, category, and tag translations with ai source', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'translate-missing-'));
  writeJson(path.join(projectRoot, 'data/canonical/prompts.json'), {
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-04T00:00:00.000Z',
    totalCount: 1,
    languages: ['en'],
    sourceCount: {},
    prompts: [promptFixture()]
  });

  const calls = [];
  const result = await translateMissing({
    projectRoot,
    languages: ['zh-CN'],
    provider: async request => {
      calls.push(request);
      return `[${request.targetLanguage}] ${request.text}`;
    }
  });

  assert.equal(result.translatedCount, 5);
  assert.equal(calls.length, 5);

  const dataset = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/canonical/prompts.json'), 'utf-8'));
  const prompt = dataset.prompts[0];

  assert.equal(prompt.promptText.translations['zh-CN'].value, '[zh-CN] Make a poster');
  assert.equal(prompt.promptText.translations['zh-CN'].source, 'ai');
  assert.equal(prompt.title.translations['zh-CN'].value, '[zh-CN] Poster');
  assert.equal(prompt.description.translations['zh-CN'].value, '[zh-CN] A poster prompt');
  assert.equal(prompt.categories.some(category => category.language === 'zh-CN' && category.source === 'ai' && category.translationOf === 'poster'), true);
  assert.equal(prompt.tags.some(tag => tag.language === 'zh-CN' && tag.source === 'ai' && tag.translationOf === 'cinematic'), true);
});

test('translateMissing skips existing upstream translations unless force is true', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'translate-skip-'));
  const prompt = promptFixture();
  prompt.title.translations['zh-CN'] = { language: 'zh-CN', value: '上游标题', source: 'upstream' };
  writeJson(path.join(projectRoot, 'data/canonical/prompts.json'), {
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-04T00:00:00.000Z',
    totalCount: 1,
    languages: ['en', 'zh-CN'],
    sourceCount: {},
    prompts: [prompt]
  });

  await translateMissing({
    projectRoot,
    languages: ['zh-CN'],
    fields: ['title'],
    provider: async () => 'AI title'
  });

  const dataset = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/canonical/prompts.json'), 'utf-8'));
  assert.equal(dataset.prompts[0].title.translations['zh-CN'].value, '上游标题');
  assert.equal(dataset.prompts[0].title.translations['zh-CN'].source, 'upstream');
});

test('translateMissing can target one prompt field by prompt id and field path', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'translate-one-'));
  const first = promptFixture();
  const second = promptFixture();
  second.id = 'prompt_bbbbbbbbbbbbbbbbbbbb';
  second.contentHash = 'b'.repeat(64);
  second.dedupeKey = 'make another poster';
  second.title.original.value = 'Second poster';

  writeJson(path.join(projectRoot, 'data/canonical/prompts.json'), {
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-04T00:00:00.000Z',
    totalCount: 2,
    languages: ['en'],
    sourceCount: {},
    prompts: [first, second]
  });

  const calls = [];
  const result = await translateMissing({
    projectRoot,
    languages: ['zh-CN'],
    promptId: second.id,
    fieldPath: 'title.translations.zh-CN',
    provider: async request => {
      calls.push(request);
      return '第二个标题';
    }
  });

  assert.equal(result.taskCount, 1);
  assert.equal(result.translatedCount, 1);
  assert.equal(calls[0].promptId, second.id);
  assert.equal(calls[0].fieldPath, 'title.translations.zh-CN');

  const dataset = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/canonical/prompts.json'), 'utf-8'));
  assert.equal(dataset.prompts[0].title.translations['zh-CN'], undefined);
  assert.equal(dataset.prompts[1].title.translations['zh-CN'].value, '第二个标题');
});

test('translateMissing does not overwrite the latest validation report', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'translate-report-'));
  writeJson(path.join(projectRoot, 'data/canonical/prompts.json'), {
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-04T00:00:00.000Z',
    totalCount: 1,
    languages: ['en'],
    sourceCount: {},
    prompts: [promptFixture()]
  });
  writeJson(path.join(projectRoot, 'data/reports/latest.json'), {
    generatedAt: '2026-05-04T00:00:00.000Z',
    summary: { error: 0, warning: 12, info: 0 },
    issues: [{ severity: 'warning', code: 'existing_validation_issue' }]
  });

  await translateMissing({
    projectRoot,
    languages: ['zh-CN'],
    fields: ['title'],
    provider: async () => '海报'
  });

  const latestReport = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/reports/latest.json'), 'utf-8'));
  assert.equal(latestReport.summary.warning, 12);
  assert.equal(latestReport.issues[0].code, 'existing_validation_issue');
});

test('translation parseArgs accepts report resolution command flags', () => {
  const args = parseArgs(['--missing', '--lang', 'zh-CN', '--field', 'title,tags', '--limit', '12', '--refresh-report', '--target-languages', 'en,zh-CN']);

  assert.equal(args.missingOnly, true);
  assert.deepEqual(args.languages, ['zh-CN']);
  assert.deepEqual(args.fields, ['title', 'tags']);
  assert.equal(args.limit, 12);
  assert.equal(args.refreshReport, true);
  assert.deepEqual(args.targetLanguages, ['en', 'zh-CN']);
});

test('createZhipuProvider sends OpenAI-compatible chat completions to Zhipu', async () => {
  const calls = [];
  const provider = createZhipuProvider({
    env: {
      ZHIPUAI_API_KEY: 'zhipu-secret',
      ZHIPUAI_BASE_URL: 'https://zhipu.local/api/paas/v4',
      ZHIPUAI_MODEL: 'glm-test'
    },
    fetch: async (url, init) => {
      calls.push({ url, init, body: JSON.parse(init.body) });
      return {
        ok: true,
        json: async () => ({ choices: [{ message: { content: '  translated text  ' } }] })
      };
    }
  });

  const translated = await provider({
    sourceLanguage: 'en',
    targetLanguage: 'zh-CN',
    fieldPath: 'title.translations.zh-CN',
    text: 'Poster prompt'
  });

  assert.equal(translated, 'translated text');
  assert.equal(calls[0].url, 'https://zhipu.local/api/paas/v4/chat/completions');
  assert.equal(calls[0].init.headers.authorization, 'Bearer zhipu-secret');
  assert.equal(calls[0].body.model, 'glm-test');
  assert.equal(calls[0].body.stream, false);
  assert.equal(calls[0].body.messages[0].role, 'system');
  assert.match(calls[0].body.messages[1].content, /Translate from en to zh-CN/);
});

test('createZhipuProvider falls back to generic AI translation settings', async () => {
  const provider = createZhipuProvider({
    env: {
      AI_TRANSLATION_API_KEY: 'fallback-secret',
      AI_TRANSLATION_BASE_URL: 'https://fallback.local/v4',
      AI_TRANSLATION_MODEL: 'fallback-model'
    },
    fetch: async (url, init) => {
      assert.equal(url, 'https://fallback.local/v4/chat/completions');
      assert.equal(init.headers.authorization, 'Bearer fallback-secret');
      assert.equal(JSON.parse(init.body).model, 'fallback-model');
      return {
        ok: true,
        json: async () => ({ choices: [{ message: { content: 'Fallback result' } }] })
      };
    }
  });

  assert.equal(await provider({ sourceLanguage: 'en', targetLanguage: 'zh-CN', fieldPath: 'title', text: 'Poster' }), 'Fallback result');
});

test('loadProjectEnv reads local .env without overwriting existing process values', () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'zhipu-env-'));
  fs.writeFileSync(path.join(projectRoot, '.env'), [
    'ZHIPUAI_API_KEY=from-file',
    'ZHIPUAI_MODEL=glm-from-file',
    'AI_TRANSLATION_MODEL=generic-from-file'
  ].join('\n'), 'utf-8');

  const env = { ZHIPUAI_API_KEY: 'from-process' };
  loadProjectEnv(projectRoot, env);

  assert.equal(env.ZHIPUAI_API_KEY, 'from-process');
  assert.equal(env.ZHIPUAI_MODEL, 'glm-from-file');
  assert.equal(env.AI_TRANSLATION_MODEL, 'generic-from-file');
});
