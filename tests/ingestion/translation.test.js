const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { parseArgs, translateMissing } = require('../../scripts/ingestion/translation');

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

test('translation parseArgs accepts report resolution command flags', () => {
  const args = parseArgs(['--missing', '--lang', 'zh-CN', '--field', 'title,tags', '--limit', '12']);

  assert.equal(args.missingOnly, true);
  assert.deepEqual(args.languages, ['zh-CN']);
  assert.deepEqual(args.fields, ['title', 'tags']);
  assert.equal(args.limit, 12);
});
