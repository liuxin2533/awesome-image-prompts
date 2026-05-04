const test = require('node:test');
const assert = require('node:assert/strict');

const { parseArgs, runWorkflow } = require('../../scripts/workflow');

test('workflow parseArgs supports ingestion, translation, assets, and catalog export options', () => {
  const args = parseArgs([
    '--mode', 'remote',
    '--sources', 'evolink,youmind',
    '--target-languages', 'en,zh-CN',
    '--translate',
    '--translation-languages', 'zh-CN,ja',
    '--mirror-assets',
    '--catalog-languages', 'en,zh-CN,ja',
    '--strict'
  ]);

  assert.equal(args.mode, 'remote');
  assert.deepEqual(args.sources, ['evolink', 'youmind']);
  assert.deepEqual(args.targetLanguages, ['en', 'zh-CN']);
  assert.equal(args.translate, true);
  assert.deepEqual(args.translationLanguages, ['zh-CN', 'ja']);
  assert.equal(args.mirrorAssets, true);
  assert.deepEqual(args.catalogLanguages, ['en', 'zh-CN', 'ja']);
  assert.equal(args.strict, true);
});

test('workflow parseArgs accepts PowerShell comma coercion for language lists', () => {
  const args = parseArgs([
    '--target-languages', 'en zh-CN',
    '--catalog-languages', 'en zh-CN ja'
  ]);

  assert.deepEqual(args.targetLanguages, ['en', 'zh-CN']);
  assert.deepEqual(args.catalogLanguages, ['en', 'zh-CN', 'ja']);
});

test('runWorkflow executes the full publishing sequence with injectable steps', async () => {
  const calls = [];
  const result = await runWorkflow({
    projectRoot: 'project',
    mode: 'local',
    sources: ['evolink'],
    targetLanguages: ['en', 'zh-CN'],
    translate: true,
    translationLanguages: ['zh-CN'],
    mirrorAssets: true,
    catalogLanguages: ['en', 'zh-CN'],
    strict: true,
    steps: {
      runIngest: async options => {
        calls.push(['ingest', options.mode, options.sources, options.targetLanguages, options.strict]);
        return { dataset: { totalCount: 3 }, report: { toJSON: () => ({ summary: { error: 0, warning: 1, info: 0 } }) } };
      },
      translateMissing: async options => {
        calls.push(['translate', options.languages, options.strict]);
        return { taskCount: 4, translatedCount: 4, failedCount: 0 };
      },
      mirrorMissingAssets: async options => {
        calls.push(['assets', options.strict]);
        return { candidateCount: 2, cachedCount: 2, failedCount: 0 };
      },
      exportCatalogData: async options => {
        calls.push(['catalog', options.languages, options.defaultLanguage]);
        return { manifest: { totalCount: 3, languages: ['en', 'zh-CN'] } };
      },
      generateReadmes: async options => {
        calls.push(['readme', options.languages]);
        return { files: ['README.md', 'README_zh-CN.md'] };
      }
    }
  });

  assert.deepEqual(calls, [
    ['ingest', 'local', ['evolink'], ['en', 'zh-CN'], true],
    ['translate', ['zh-CN'], true],
    ['assets', true],
    ['catalog', ['en', 'zh-CN'], 'en'],
    ['readme', ['en', 'zh-CN']]
  ]);
  assert.equal(result.ingest.dataset.totalCount, 3);
  assert.equal(result.catalog.manifest.totalCount, 3);
});
