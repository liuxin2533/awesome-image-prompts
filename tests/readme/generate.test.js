const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  buildCollectionDoc,
  buildReadme,
  collectionSlug,
  fenceCode,
  generateReadmes,
  parseArgs
} = require('../../scripts/readme/generate');

const ALL_PUBLIC_LANGUAGES = ['de', 'en', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'ru', 'th', 'tr', 'vi', 'zh-CN', 'zh-TW'];

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

test('buildReadme renders a professional catalog entry point with website and collection links', () => {
  const markdown = buildReadme(samplePrompts('en'), { language: 'en' });

  assert.match(markdown, /# awesome-image-prompts/);
  assert.match(markdown, /<div align="center">/);
  assert.match(markdown, /images\/awesome-image-prompts-cover\.jpg/);
  assert.match(markdown, /img\.shields\.io\/badge\/Website-gptimages\.dev-black/);
  assert.match(markdown, /img\.shields\.io\/badge\/Prompts-2-blue/);
  assert.match(markdown, /img\.shields\.io\/badge\/Collections-2-purple/);
  assert.match(markdown, /img\.shields\.io\/badge\/Workbench-local-orange/);
  assert.match(markdown, /img\.shields\.io\/badge\/License-see_upstream-lightgrey/);
  assert.match(markdown, /img\.shields\.io\/badge\/English-Current-brightgreen/);
  assert.match(markdown, /img\.shields\.io\/badge\/Simplified_Chinese-View-lightgrey/);
  assert.match(markdown, /images\/gptimages-gallery-preview\.png/);
  assert.ok(markdown.indexOf('images/awesome-image-prompts-cover.jpg') < markdown.indexOf('## ✨ Website'));
  assert.ok(markdown.indexOf('## ✨ Website') < markdown.indexOf('images/gptimages-gallery-preview.png'));
  assert.match(markdown, /<table>/);
  assert.match(markdown, /<td align="center">/);
  assert.match(markdown, /## ✨ Website/);
  assert.match(markdown, /## 📊 Catalog Snapshot/);
  assert.match(markdown, /## 🗂️ Data Directory/);
  assert.match(markdown, /## 🧭 Collections/);
  assert.match(markdown, /## 🌟 Featured Prompts/);
  assert.match(markdown, /## ⚡ Quick Start/);
  assert.match(markdown, /## 🤝 How to Contribute/);
  assert.match(markdown, /## 👥 Contributors/);
  assert.match(markdown, /## 📄 License/);
  assert.match(markdown, /🖼️/);
  assert.match(markdown, /✍️/);
  assert.match(markdown, /🔗/);
  assert.match(markdown, /🌐/);
  assert.match(markdown, /https:\/\/gptimages\.dev/);
  assert.match(markdown, /browse, search, filter, and copy/);
  assert.doesNotMatch(markdown.split('## ✨ Website')[0], /gptimages\.dev/);
  assert.match(markdown, /<strong>2<\/strong><br><sub>Total prompts<\/sub>/);
  assert.match(markdown, /Every prompt body is generated into the collection documents below/);
  assert.match(markdown, /`data\/canonical\/prompts\/`/);
  assert.match(markdown, /`data\/catalog\/`/);
  assert.match(markdown, /`data\/reports\/current\.json`/);
  assert.match(markdown, /`pnpm ingest`/);
  assert.match(markdown, /`pnpm workbench`/);
  assert.match(markdown, /http:\/\/127\.0\.0\.1:4173/);
  assert.match(markdown, /<td align="center"><a href="docs\/poster-illustration\.md">Poster &amp; Illustration<\/a><\/td>/);
  assert.match(markdown, /<td align="center"><a href="docs\/ui-social-media\.md">UI &amp; Social Media<\/a><\/td>/);
  assert.doesNotMatch(markdown, /\| Poster & Illustration \|/);
  assert.match(markdown, /Lemon Poster/);
  assert.match(markdown, /<img src="https:\/\/example\.com\/lemon\.jpg" alt="Lemon Poster" width="220">/);
  assert.doesNotMatch(markdown, /!\[Lemon Poster\]\(https:\/\/example\.com\/lemon\.jpg\)/);
  assert.doesNotMatch(markdown, /````text\nDesign a camera UI with ``` inline fence\.\n````/);
});

test('buildReadme renders localized Chinese site copy', () => {
  const markdown = buildReadme(samplePrompts('zh-CN'), { language: 'zh-CN' });

  assert.match(markdown, /https:\/\/gptimages\.dev/);
  assert.match(markdown, /img\.shields\.io\/badge\/网站-gptimages\.dev-black/);
  assert.match(markdown, /\]\(#分类集合\)/);
  assert.match(markdown, /## ✨ 网站/);
  assert.match(markdown, /images\/awesome-image-prompts-cover\.jpg/);
  assert.match(markdown, /images\/gptimages-gallery-preview\.png/);
  assert.match(markdown, /浏览、搜索、筛选和复制/);
  assert.doesNotMatch(markdown.split('## ✨ 网站')[0], /gptimages\.dev/);
  assert.match(markdown, /## ⚡ 快速开始/);
  assert.match(markdown, /`pnpm workbench`/);
  assert.match(markdown, /每一条提示词正文都会生成到下面的分类文档中/);
  assert.match(markdown, /<td align="center"><a href="docs\/zh-CN\/poster-illustration\.md">海报与插画<\/a><\/td>/);
});

test('buildReadme renders localized Japanese introduction while prompt content can fall back', () => {
  const dataset = samplePrompts('ja');
  const markdown = buildReadme(dataset, { language: 'ja', languages: ['en', 'ja'] });
  const collection = buildCollectionDoc(dataset, 'poster-illustration', [dataset.prompts[0]], { language: 'ja' });

  assert.match(markdown, /GPT 画像プロンプト/);
  assert.match(markdown, /閲覧、検索、絞り込み、コピー/);
  assert.match(markdown, /<strong>2<\/strong><br><sub>プロンプト総数<\/sub>/);
  assert.match(markdown, /img\.shields\.io\/badge\/日本語-Current-brightgreen/);
  assert.match(collection, /Create a lemon poster\./);
  assert.doesNotMatch(markdown, /A curated, normalized, multilingual catalog/);
});

test('buildCollectionDoc constrains prompt preview images', () => {
  const dataset = samplePrompts('en');
  const markdown = buildCollectionDoc(dataset, 'poster-illustration', [dataset.prompts[0]], { language: 'en' });

  assert.match(markdown, /<img src="https:\/\/example\.com\/lemon\.jpg" alt="Lemon Poster" width="480">/);
  assert.doesNotMatch(markdown, /!\[Lemon Poster\]\(https:\/\/example\.com\/lemon\.jpg\)/);
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
  assert.match(fs.readFileSync(path.join(projectRoot, 'README.md'), 'utf-8'), /images\/gptimages-gallery-preview\.png/);
  assert.match(fs.readFileSync(path.join(projectRoot, 'README.md'), 'utf-8'), /images\/awesome-image-prompts-cover\.jpg/);
  assert.match(fs.readFileSync(path.join(projectRoot, 'README_zh-CN.md'), 'utf-8'), /柠檬海报/);
  assert.match(fs.readFileSync(path.join(projectRoot, 'docs/poster-illustration.md'), 'utf-8'), /Create a lemon poster\./);
  assert.match(fs.readFileSync(path.join(projectRoot, 'docs/zh-CN/ui-social-media.md'), 'utf-8'), /相机界面/);
});

test('readme generation expands all languages and writes localized introduction files', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'readme-all-languages-'));
  for (const language of ALL_PUBLIC_LANGUAGES) {
    writeJson(path.join(projectRoot, 'data/catalog', `prompts.${language}.json`), samplePrompts(language));
  }

  assert.deepEqual(parseArgs(['--languages', 'all']).languages, ALL_PUBLIC_LANGUAGES);

  const result = await generateReadmes({ projectRoot, languages: 'all' });

  assert.equal(result.files.includes('README_ja.md'), true);
  assert.equal(result.files.includes('README_zh-TW.md'), true);
  assert.match(fs.readFileSync(path.join(projectRoot, 'README_ja.md'), 'utf-8'), /GPT 画像プロンプト/);
  assert.match(fs.readFileSync(path.join(projectRoot, 'README_zh-TW.md'), 'utf-8'), /GPT 圖像提示詞/);
});
