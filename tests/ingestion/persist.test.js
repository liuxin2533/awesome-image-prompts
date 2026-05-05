const test = require('node:test');
const assert = require('node:assert/strict');

const { compactCanonicalDataset } = require('../../scripts/ingestion/core/persist');

test('compactCanonicalDataset omits internal and empty prompt fields before writing canonical data', () => {
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
  assert.equal(Object.hasOwn(prompt, 'updatedAt'), false);
  assert.equal(Object.hasOwn(prompt, 'addedAt'), false);
  assert.equal(Object.hasOwn(prompt, 'tags'), false);
  assert.equal(Object.hasOwn(prompt, 'curation'), false);
  assert.equal(Object.hasOwn(prompt.assets[0], 'sourceKey'), false);
});
