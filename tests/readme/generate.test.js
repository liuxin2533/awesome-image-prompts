const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  buildReadme,
  collectionSlug,
  fenceCode,
  generateReadmes
} = require('../../scripts/readme/generate');

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

function samplePrompts(language = 'en') {
  return {
    generatedAt: '2026-05-04T12:00:00.000Z',
    language,
    totalCount: 2,
    prompts: [
      {
        id: 'prompt_alpha',
        title: language === 'zh-CN' ? '柠檬海报' : 'Lemon Poster',
        description: language === 'zh-CN' ? '清新的海报。' : 'A fresh poster.',
        promptText: 'Create a lemon poster.',
        categories: [language === 'zh-CN' ? '海报' : 'Poster'],
        collection: {
          slug: 'poster-illustration',
          title: language === 'zh-CN' ? '海报与插画' : 'Poster & Illustration'
        },
        tags: ['lemon'],
        previewImage: 'https://example.com/lemon.jpg',
        sourceUrls: ['https://github.com/acme/source#alpha'],
        sourceRepos: ['acme/source']
      },
      {
        id: 'prompt_beta',
        title: language === 'zh-CN' ? '相机界面' : 'Camera UI',
        description: '',
        promptText: 'Design a camera UI with ``` inline fence.',
        categories: [language === 'zh-CN' ? '界面' : 'UI'],
        collection: {
          slug: 'ui-social-media',
          title: language === 'zh-CN' ? 'UI 与社交媒体' : 'UI & Social Media'
        },
        tags: [],
        previewImage: '',
        sourceUrls: [],
        sourceRepos: ['acme/source']
      }
    ]
  };
}

test('fenceCode chooses a safe markdown fence length', () => {
  assert.equal(fenceCode('hello'), '```text\nhello\n```');
  assert.equal(fenceCode('has ``` fence'), '````text\nhas ``` fence\n````');
});

test('fenceCode strips trailing whitespace from generated markdown lines', () => {
  assert.equal(fenceCode('alpha   \nbeta\t '), '```text\nalpha\nbeta\n```');
});

test('buildReadme renders every prompt with preview, source, and prompt body', () => {
  const markdown = buildReadme(samplePrompts('en'), { language: 'en' });

  assert.match(markdown, /# awesome-image-prompts/);
  assert.match(markdown, /Total prompts: 2/);
  assert.match(markdown, /\| Poster & Illustration \| 1 \| \[Open\]\(docs\/poster-illustration\.md\) \|/);
  assert.match(markdown, /\| UI & Social Media \| 1 \| \[Open\]\(docs\/ui-social-media\.md\) \|/);
  assert.match(markdown, /Lemon Poster/);
  assert.match(markdown, /!\[Lemon Poster\]\(https:\/\/example\.com\/lemon\.jpg\)/);
  assert.doesNotMatch(markdown, /````text\nDesign a camera UI with ``` inline fence\.\n````/);
});

test('collectionSlug falls back to stable display groups from categories', () => {
  assert.equal(collectionSlug({ categories: ['Product Marketing'] }), 'product-marketing');
  assert.equal(collectionSlug({ categories: ['RAG 技术详解图'] }), 'infographic-education');
  assert.equal(collectionSlug({ categories: ['Unknown'] }), 'general');
});

test('generateReadmes writes English and Simplified Chinese readmes from public data', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'readme-generate-'));
  writeJson(path.join(projectRoot, 'data/catalog/prompts.en.json'), samplePrompts('en'));
  writeJson(path.join(projectRoot, 'data/catalog/prompts.zh-CN.json'), samplePrompts('zh-CN'));

  const result = await generateReadmes({ projectRoot, languages: ['en', 'zh-CN'] });

  assert.deepEqual(result.files.sort(), [
    'README.md',
    'README_zh-CN.md',
    'docs/poster-illustration.md',
    'docs/ui-social-media.md',
    'docs/zh-CN/poster-illustration.md',
    'docs/zh-CN/ui-social-media.md'
  ].sort());
  assert.match(fs.readFileSync(path.join(projectRoot, 'README.md'), 'utf-8'), /Lemon Poster/);
  assert.match(fs.readFileSync(path.join(projectRoot, 'README_zh-CN.md'), 'utf-8'), /柠檬海报/);
  assert.match(fs.readFileSync(path.join(projectRoot, 'docs/poster-illustration.md'), 'utf-8'), /Create a lemon poster\./);
  assert.match(fs.readFileSync(path.join(projectRoot, 'docs/zh-CN/ui-social-media.md'), 'utf-8'), /相机界面/);
});
