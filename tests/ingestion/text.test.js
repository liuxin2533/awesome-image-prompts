const test = require('node:test');
const assert = require('node:assert/strict');

const {
  dedupePromptText,
  stablePromptId,
  contentHash,
  normalizeLanguageCode,
  slugify
} = require('../../scripts/ingestion/core/text');

test('dedupePromptText trims and lowercases without changing internal whitespace', () => {
  assert.equal(dedupePromptText('  Hello   WORLD\nPrompt  '), 'hello   world\nprompt');
});

test('stablePromptId is deterministic and based on the dedupe key', () => {
  assert.equal(stablePromptId('  PROMPT Text  '), stablePromptId('prompt text'));
  assert.match(stablePromptId('prompt text'), /^prompt_[a-f0-9]{20}$/);
  assert.equal(contentHash('prompt text').length, 64);
});

test('normalizeLanguageCode returns canonical BCP 47-like language tags', () => {
  assert.equal(normalizeLanguageCode('zh'), 'zh-CN');
  assert.equal(normalizeLanguageCode('zh-cn'), 'zh-CN');
  assert.equal(normalizeLanguageCode('zh-tw'), 'zh-TW');
  assert.equal(normalizeLanguageCode('en-us'), 'en');
  assert.equal(normalizeLanguageCode('ja-jp'), 'ja');
  assert.equal(normalizeLanguageCode('ko-KR'), 'ko');
  assert.equal(normalizeLanguageCode('es-419'), 'es');
  assert.equal(normalizeLanguageCode('pt-BR'), 'pt');
  assert.equal(normalizeLanguageCode('pt-PT'), 'pt');
});

test('languageFromReadme supports underscore, hyphen, and dot locale separators', () => {
  const { languageFromReadme } = require('../../scripts/ingestion/sources/utils');

  assert.equal(languageFromReadme('README.md'), 'en');
  assert.equal(languageFromReadme('README_zh-CN.md'), 'zh-CN');
  assert.equal(languageFromReadme('README-ja.md'), 'ja');
  assert.equal(languageFromReadme('README.ko.md'), 'ko');
});

test('slugify keeps stable readable identifiers', () => {
  assert.equal(slugify('Poster & Illustration Cases'), 'poster-illustration-cases');
  assert.equal(slugify('信息图 可视化'), 'category');
});
