const test = require('node:test');
const assert = require('node:assert/strict');

const {
  splitHeadingSections,
  extractFencedCodeAfterLabel,
  extractMarkdownImages,
  extractHtmlImages,
  extractMarkdownLinks,
  lineForIndex
} = require('../../scripts/ingestion/core/markdown');

const markdown = [
  '# Title',
  '',
  '## Category',
  '',
  '### Case 1: [A](https://example.com/a) (by [@me](https://x.com/me))',
  '| <img src="./images/a.jpg" width="300" alt="Output image"> |',
  '**Prompt:**',
  '```text',
  'Keep CASE',
  '```',
  '',
  '### Case 2: B',
  '![Alt](../data/images/case2.jpg)',
  '**提示词：**',
  '```json',
  '{"prompt":"中文"}',
  '```'
].join('\n');

test('splitHeadingSections returns sections with heading metadata and line numbers', () => {
  const sections = splitHeadingSections(markdown, /^###\s+/);
  assert.equal(sections.length, 2);
  assert.equal(sections[0].heading, '### Case 1: [A](https://example.com/a) (by [@me](https://x.com/me))');
  assert.equal(sections[0].line, 5);
});

test('extractFencedCodeAfterLabel reads the first fence after a label', () => {
  const sections = splitHeadingSections(markdown, /^###\s+/);
  assert.equal(extractFencedCodeAfterLabel(sections[0].content, ['Prompt']).code, 'Keep CASE');
  assert.equal(extractFencedCodeAfterLabel(sections[1].content, ['提示词']).lang, 'json');
});

test('image and link helpers parse Markdown and HTML forms', () => {
  assert.equal(extractHtmlImages(markdown)[0].src, './images/a.jpg');
  assert.equal(extractMarkdownImages(markdown)[0].src, '../data/images/case2.jpg');
  assert.equal(extractMarkdownLinks(markdown)[0].href, 'https://example.com/a');
});

test('extractMarkdownImages supports escaped brackets and multiline alt text', () => {
  const imageMarkdown = [
    '![\\[CORE TASK\\]',
    'Transform the provided input image](../data/images/case78.jpg)'
  ].join('\n');

  const images = extractMarkdownImages(imageMarkdown);

  assert.equal(images.length, 1);
  assert.equal(images[0].alt, '[CORE TASK]\nTransform the provided input image');
  assert.equal(images[0].src, '../data/images/case78.jpg');
});

test('lineForIndex returns one-based line numbers', () => {
  assert.equal(lineForIndex(markdown, markdown.indexOf('Case 2')), 12);
});
