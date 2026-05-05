const test = require('node:test');
const assert = require('node:assert/strict');

const { validatePrompt, validateDataset } = require('../../scripts/ingestion/core/schema');

function validPrompt(overrides = {}) {
  return {
    id: 'prompt_1234567890abcdef1234',
    contentHash: 'a'.repeat(64),
    dedupeKey: 'a prompt',
    promptText: {
      original: { language: 'en', value: 'A Prompt', source: 'upstream' },
      translations: {
        'zh-CN': { value: '一个提示词', source: 'upstream' }
      }
    },
    title: {
      original: { language: 'en', value: 'Title', source: 'upstream' },
      translations: {}
    },
    description: {
      original: null,
      translations: {}
    },
    categories: [
      { id: 'poster', value: 'Poster', language: 'en', source: 'upstream' }
    ],
    tags: [],
    sources: [
      {
        sourceKey: 'fixture',
        repo: 'owner/repo',
        url: 'https://example.com/source',
        originalId: 'case-1',
        authors: [{ name: 'author', url: 'https://example.com/author' }],
        locations: [{ file: 'README.md', line: 10 }]
      }
    ],
    assets: [
      {
        id: 'asset_1',
        role: 'output',
        upstreamUrl: 'https://example.com/image.jpg',
        localPath: 'public/assets/prompt_1234567890abcdef1234/0.jpg',
        status: 'pending'
      }
    ],
    curation: { overrides: [] },
    addedAt: '2026-04-22T18:00:00+08:00',
    updatedAt: '2026-05-04T00:00:00.000Z',
    ...overrides
  };
}

test('validatePrompt accepts a complete canonical prompt', () => {
  assert.deepEqual(validatePrompt(validPrompt()), []);
});

test('validatePrompt accepts compact canonical prompts without internal optional fields', () => {
  const prompt = validPrompt();
  delete prompt.contentHash;
  delete prompt.dedupeKey;
  delete prompt.tags;
  delete prompt.curation;
  delete prompt.addedAt;
  delete prompt.updatedAt;
  delete prompt.assets[0].sourceKey;

  assert.deepEqual(validatePrompt(prompt), []);
});

test('validatePrompt reports actionable missing critical fields', () => {
  const issues = validatePrompt(validPrompt({ promptText: { original: { language: 'en', value: '', source: 'upstream' }, translations: {} } }));
  assert.equal(issues.length, 1);
  assert.equal(issues[0].fieldPath, 'promptText.original.value');
  assert.equal(issues[0].severity, 'error');
  assert.match(issues[0].suggestedAction, /parser/i);
});

test('validateDataset detects duplicate stable ids', () => {
  const first = validPrompt();
  const second = validPrompt();
  const issues = validateDataset({ schemaVersion: '2026-05-04', prompts: [first, second] });
  assert.equal(issues.length, 1);
  assert.equal(issues[0].code, 'duplicate_prompt_id');
});
