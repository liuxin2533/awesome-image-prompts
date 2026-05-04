const test = require('node:test');
const assert = require('node:assert/strict');

const {
  collectionForPrompt,
  collectionSlug
} = require('../../scripts/catalog/collections');

test('collectionSlug maps prompts to stable display collections', () => {
  assert.equal(collectionSlug({ categories: ['Product Marketing'] }), 'product-marketing');
  assert.equal(collectionSlug({ categories: ['RAG 技术详解图'] }), 'infographic-education');
  assert.equal(collectionSlug({ categories: ['Unknown'] }), 'general');
});

test('collectionForPrompt returns localized collection metadata', () => {
  assert.deepEqual(collectionForPrompt({ categories: ['UI'] }, 'zh-CN'), {
    slug: 'ui-social-media',
    title: 'UI 与社交媒体'
  });
});
