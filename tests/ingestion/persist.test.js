const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  compactCanonicalDataset,
  readCanonicalDataset,
  writeCanonicalDataset
} = require('../../scripts/ingestion/core/persist');

test('compactCanonicalDataset omits internal and empty prompt fields before writing canonical data while keeping update timestamps', () => {
  const compact = compactCanonicalDataset({
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-05T00:00:00.000Z',
    totalCount: 1,
    languages: ['en'],
    sourceCount: { fixture: 1 },
    prompts: [
      {
        id: 'prompt_1234567890abcdef1234',
        contentHash: 'a'.repeat(64),
        dedupeKey: 'a prompt',
        promptText: {
          original: { language: 'en', value: 'A prompt', source: 'upstream' },
          translations: {}
        },
        title: {
          original: { language: 'en', value: 'Title', source: 'upstream' },
          translations: {}
        },
        description: {
          original: null,
          translations: {}
        },
        categories: [],
        tags: [],
        sources: [],
        assets: [
          {
            id: 'asset_1',
            role: 'output',
            upstreamUrl: 'https://example.com/image.jpg',
            upstreamPath: './image.jpg',
            localPath: 'public/assets/prompt_1234567890abcdef1234/image.jpg',
            alt: 'Output image',
            status: 'pending',
            sourceKey: null
          }
        ],
        curation: { overrides: [] },
        addedAt: null,
        updatedAt: '2026-05-05T00:00:00.000Z'
      }
    ]
  });

  const prompt = compact.prompts[0];
  assert.equal(Object.hasOwn(prompt, 'dedupeKey'), false);
  assert.equal(Object.hasOwn(prompt, 'contentHash'), false);
  assert.equal(prompt.updatedAt, '2026-05-05T00:00:00.000Z');
  assert.equal(Object.hasOwn(prompt, 'addedAt'), false);
  assert.equal(Object.hasOwn(prompt, 'tags'), false);
  assert.equal(Object.hasOwn(prompt, 'curation'), false);
  assert.equal(Object.hasOwn(prompt.assets[0], 'sourceKey'), false);
});

test('writeCanonicalDataset stores prompts as per-prompt shards and reads them back', () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'awesome-image-prompts-shards-'));
  const dataset = {
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-05T00:00:00.000Z',
    totalCount: 1,
    languages: ['en'],
    sourceCount: { fixture: 1 },
    prompts: [
      {
        id: 'prompt_1234567890abcdef1234',
        promptText: {
          original: { language: 'en', value: 'A prompt', source: 'upstream' },
          translations: {
            'zh-CN': { language: 'zh-CN', value: '一个提示词', source: 'ai' }
          }
        },
        title: {
          original: { language: 'en', value: 'Title', source: 'upstream' },
          translations: {}
        },
        description: { original: null, translations: {} },
        categories: [],
        sources: [],
        assets: [],
        updatedAt: '2026-05-05T00:00:00.000Z'
      }
    ]
  };

  writeCanonicalDataset(projectRoot, dataset);

  const manifest = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/canonical/prompts.json'), 'utf-8'));
  assert.deepEqual(manifest.prompts, [
    { id: 'prompt_1234567890abcdef1234', file: 'prompts/prompt_1234567890abcdef1234.json' }
  ]);
  assert.equal(Object.hasOwn(manifest.prompts[0], 'promptText'), false);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/canonical/prompts/prompt_1234567890abcdef1234.json')), true);

  const hydrated = readCanonicalDataset(projectRoot);
  assert.equal(hydrated.prompts[0].promptText.translations['zh-CN'].value, '一个提示词');
  assert.equal(Object.hasOwn(hydrated.prompts[0], 'updatedAt'), true);
});
