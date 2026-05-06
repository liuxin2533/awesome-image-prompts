const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  exportCatalogData,
  parseArgs,
  resolveAssetUrl,
  selectLocalizedValue,
  selectLocalizedTaxonomy
} = require('../../scripts/catalog/export');

const ALL_PUBLIC_LANGUAGES = ['de', 'en', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'ru', 'th', 'tr', 'vi', 'zh-CN', 'zh-TW'];

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function localized(language, value, source = 'upstream') {
  return { language, value, source };
}

function sampleDataset() {
  return {
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-04T12:00:00.000Z',
    totalCount: 2,
    languages: ['en', 'zh-CN'],
    sourceCount: { 'owner/repo': 2 },
    prompts: [
      {
        id: 'prompt_alpha',
        title: {
          original: localized('en', 'Glass Lemon Poster'),
          translations: { 'zh-CN': localized('zh-CN', '玻璃柠檬海报', 'ai') }
        },
        description: {
          original: localized('en', 'A fresh citrus poster.'),
          translations: { 'zh-CN': localized('zh-CN', '清新的柑橘海报。', 'ai') }
        },
        promptText: {
          original: localized('en', 'Create a glossy lemon drink poster.'),
          translations: { 'zh-CN': localized('zh-CN', '创建一张有光泽的柠檬饮品海报。', 'ai') }
        },
        categories: [
          { id: 'poster', value: 'Poster', language: 'en', source: 'upstream' },
          { id: 'poster-zh-cn', value: '海报', language: 'zh-CN', source: 'ai', translationOf: 'poster' }
        ],
        tags: [
          { id: 'lemon', value: 'lemon', language: 'en', source: 'upstream' },
          { id: 'lemon-zh-cn', value: '柠檬', language: 'zh-CN', source: 'ai', translationOf: 'lemon' }
        ],
        assets: [
          {
            id: 'asset_alpha',
            role: 'output',
            status: 'pending',
            upstreamUrl: 'https://example.com/lemon.jpg',
            localPath: 'public/assets/prompt_alpha/lemon.jpg',
            alt: 'Lemon output'
          }
        ],
        sources: [
          {
            sourceKey: 'demo',
            repo: 'owner/repo',
            url: 'https://github.com/owner/repo#alpha',
            authors: [{ name: 'Ada', url: 'https://example.com/ada' }]
          }
        ],
        addedAt: '2026-05-01T00:00:00.000Z',
        updatedAt: '2026-05-02T00:00:00.000Z'
      },
      {
        id: 'prompt_beta',
        title: {
          original: localized('en', 'Clay Camera UI'),
          translations: {}
        },
        description: { original: null, translations: {} },
        promptText: {
          original: localized('en', 'Design a camera interface in clay style.'),
          translations: {}
        },
        categories: [{ id: 'ui', value: 'UI', language: 'en', source: 'upstream' }],
        tags: [],
        assets: [
          {
            id: 'asset_beta',
            role: 'output',
            status: 'cached',
            upstreamUrl: 'https://example.com/camera.jpg',
            localPath: 'public/assets/prompt_beta/camera.jpg',
            alt: 'Camera output'
          }
        ],
        sources: [{ sourceKey: 'demo', repo: 'owner/repo', url: 'https://github.com/owner/repo#beta' }],
        addedAt: '2026-05-03T00:00:00.000Z',
        updatedAt: '2026-05-03T00:00:00.000Z'
      }
    ]
  };
}

test('selectLocalizedValue prefers exact language and reports fallback metadata', () => {
  const field = {
    original: localized('en', 'Original title'),
    translations: { 'zh-CN': localized('zh-CN', '中文标题', 'ai') }
  };

  assert.deepEqual(selectLocalizedValue(field, 'zh-CN'), {
    language: 'zh-CN',
    value: '中文标题',
    source: 'ai',
    isFallback: false
  });

  assert.deepEqual(selectLocalizedValue(field, 'ja', ['zh-CN', 'en']), {
    language: 'zh-CN',
    value: '中文标题',
    source: 'ai',
    isFallback: true
  });
});

test('selectLocalizedValue strips workbench field labels from AI output', () => {
  const field = {
    original: localized('en', 'Original title'),
    translations: {
      'zh-CN': localized('zh-CN', 'Field: title.translations.zh-CN\n\n中文标题', 'ai')
    }
  };

  assert.deepEqual(selectLocalizedValue(field, 'zh-CN'), {
    language: 'zh-CN',
    value: '中文标题',
    source: 'ai',
    isFallback: false
  });
});

test('selectLocalizedTaxonomy groups translations by canonical id', () => {
  const values = [
    { id: 'poster', value: 'Poster', language: 'en', source: 'upstream' },
    { id: 'poster-zh-cn', value: '海报', language: 'zh-CN', source: 'ai', translationOf: 'poster' }
  ];

  assert.deepEqual(selectLocalizedTaxonomy(values, 'zh-CN'), ['海报']);
  assert.deepEqual(selectLocalizedTaxonomy(values, 'ja', ['en']), ['Poster']);
});

test('selectLocalizedTaxonomy strips workbench field labels from taxonomy values', () => {
  const values = [
    { id: 'poster', value: 'Poster', language: 'en', source: 'upstream' },
    {
      id: 'poster-zh-cn',
      value: 'Field: categories.poster.zh-CN\n\n海报',
      language: 'zh-CN',
      source: 'ai',
      translationOf: 'poster'
    }
  ];

  assert.deepEqual(selectLocalizedTaxonomy(values, 'zh-CN'), ['海报']);
});

test('resolveAssetUrl uses cached local assets only after they are mirrored', () => {
  assert.equal(resolveAssetUrl({
    status: 'pending',
    upstreamUrl: 'https://example.com/upstream.jpg',
    localPath: 'public/assets/prompt/image.jpg'
  }), 'https://example.com/upstream.jpg');

  assert.equal(resolveAssetUrl({
    status: 'cached',
    upstreamUrl: 'https://example.com/upstream.jpg',
    localPath: 'public/assets/prompt/image.jpg'
  }, {
    assetBaseUrl: 'https://raw.githubusercontent.com/acme/awesome-image-prompts/main'
  }), 'https://raw.githubusercontent.com/acme/awesome-image-prompts/main/public/assets/prompt/image.jpg');

  assert.equal(resolveAssetUrl({
    status: 'cached',
    upstreamUrl: 'https://example.com/upstream.jpg',
    localPath: 'public/assets/prompt/image.jpg'
  }), 'https://example.com/upstream.jpg');
});

test('catalog export parseArgs accepts comma or whitespace separated language lists', () => {
  assert.deepEqual(parseArgs(['--languages', 'en zh-CN', '--default-language', 'en']).languages, ['en', 'zh-CN']);
  assert.deepEqual(parseArgs(['--languages', 'en,zh-CN,ja']).languages, ['en', 'zh-CN', 'ja']);
});

test('catalog export expands all languages and keeps prompt fallback metadata', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'catalog-all-languages-'));
  writeJson(path.join(projectRoot, 'data/canonical/prompts.json'), sampleDataset());

  assert.deepEqual(parseArgs(['--languages', 'all']).languages, ALL_PUBLIC_LANGUAGES);

  const result = await exportCatalogData({
    projectRoot,
    languages: 'all',
    defaultLanguage: 'en'
  });

  assert.deepEqual(result.manifest.languages, ALL_PUBLIC_LANGUAGES);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/catalog/prompts.ja.json')), true);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/catalog/search.ru.json')), true);

  const jaPrompts = readJson(path.join(projectRoot, 'data/catalog/prompts.ja.json'));
  assert.equal(jaPrompts.prompts[0].title, 'Glass Lemon Poster');
  assert.equal(jaPrompts.prompts[0].promptText, 'Create a glossy lemon drink poster.');
  assert.equal(jaPrompts.prompts[0].localization.promptText.language, 'en');
  assert.equal(jaPrompts.prompts[0].localization.promptText.isFallback, true);
  assert.equal(jaPrompts.prompts[0].hasPromptTextTranslation, false);
});

test('exportCatalogData writes localized datasets, search indexes, and taxonomy', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'catalog-export-'));
  writeJson(path.join(projectRoot, 'data/canonical/prompts.json'), sampleDataset());

  const result = await exportCatalogData({
    projectRoot,
    languages: ['en', 'zh-CN'],
    defaultLanguage: 'en',
    assetBaseUrl: 'https://raw.githubusercontent.com/acme/awesome-image-prompts/main'
  });

  assert.equal(result.manifest.totalCount, 2);
  assert.deepEqual(result.manifest.languages, ['en', 'zh-CN']);

  const zhPrompts = readJson(path.join(projectRoot, 'data/catalog/prompts.zh-CN.json'));
  assert.equal(zhPrompts.prompts[0].title, '玻璃柠檬海报');
  assert.equal(zhPrompts.prompts[0].categories[0], '海报');
  assert.equal(zhPrompts.prompts[0].previewImage, 'https://example.com/lemon.jpg');
  assert.equal(zhPrompts.prompts[1].title, 'Clay Camera UI');
  assert.equal(zhPrompts.prompts[1].previewImage, 'https://raw.githubusercontent.com/acme/awesome-image-prompts/main/public/assets/prompt_beta/camera.jpg');
  assert.equal(zhPrompts.prompts[1].localization.title.isFallback, true);
  assert.equal(zhPrompts.prompts[1].localization.promptText.isFallback, true);
  assert.equal(zhPrompts.prompts[1].hasPromptTextTranslation, false);
  assert.deepEqual(zhPrompts.prompts[1].availableLanguages.promptText, ['en']);
  assert.equal(zhPrompts.prompts[0].hasPromptTextTranslation, true);

  const enSearch = readJson(path.join(projectRoot, 'data/catalog/search.en.json'));
  assert.equal(enSearch.index.length, 2);
  assert.match(enSearch.index.find(item => item.id === 'prompt_alpha').text, /glass lemon poster/);
  assert.match(enSearch.index.find(item => item.id === 'prompt_alpha').text, /poster/);

  const taxonomy = readJson(path.join(projectRoot, 'data/catalog/taxonomy.json'));
  assert.deepEqual(taxonomy.categories['zh-CN'], ['海报', 'UI']);
  assert.deepEqual(taxonomy.tags['zh-CN'], ['柠檬']);

  const manifest = readJson(path.join(projectRoot, 'data/catalog/manifest.json'));
  assert.equal(manifest.defaultLanguage, 'en');
  assert.equal(manifest.files.prompts['zh-CN'], 'prompts.zh-CN.json');
  assert.equal(manifest.files.search.en, 'search.en.json');
});
