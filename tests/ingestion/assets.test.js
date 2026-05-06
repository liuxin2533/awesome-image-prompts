const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { mirrorMissingAssets, parseArgs } = require('../../scripts/ingestion/assets');
const { readCanonicalDataset } = require('../../scripts/ingestion/core/persist');

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

function datasetFixture() {
  return {
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-04T00:00:00.000Z',
    totalCount: 1,
    languages: ['en'],
    sourceCount: {},
    prompts: [
      {
        id: 'prompt_bbbbbbbbbbbbbbbbbbbb',
        contentHash: 'b'.repeat(64),
        dedupeKey: 'asset prompt',
        promptText: { original: { language: 'en', value: 'Asset prompt', source: 'upstream' }, translations: {} },
        title: { original: { language: 'en', value: 'Asset', source: 'upstream' }, translations: {} },
        description: { original: null, translations: {} },
        categories: [],
        tags: [],
        sources: [],
        assets: [
          {
            id: 'asset_1',
            role: 'output',
            upstreamUrl: 'https://example.com/image.jpg',
            upstreamPath: null,
            localPath: 'public/assets/prompt_bbbbbbbbbbbbbbbbbbbb/image.jpg',
            status: 'pending'
          }
        ],
        curation: { overrides: [] },
        addedAt: null,
        updatedAt: '2026-05-04T00:00:00.000Z'
      }
    ]
  };
}

test('mirrorMissingAssets downloads pending assets and updates canonical status', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'assets-mirror-'));
  writeJson(path.join(projectRoot, 'data/canonical/prompts.json'), datasetFixture());

  const result = await mirrorMissingAssets({
    projectRoot,
    fetchAsset: async url => {
      assert.equal(url, 'https://example.com/image.jpg');
      return {
        bytes: Buffer.from('image-bytes'),
        contentType: 'image/jpeg'
      };
    }
  });

  assert.equal(result.cachedCount, 1);
  const localPath = path.join(projectRoot, 'public/assets/prompt_bbbbbbbbbbbbbbbbbbbb/image.jpg');
  assert.equal(fs.readFileSync(localPath, 'utf-8'), 'image-bytes');

  const dataset = readCanonicalDataset(projectRoot);
  const asset = dataset.prompts[0].assets[0];
  assert.equal(asset.status, 'cached');
  assert.equal(asset.bytes, 11);
  assert.equal(asset.contentType, 'image/jpeg');

  const assets = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/canonical/assets.json'), 'utf-8'));
  assert.equal(assets.assets[0].status, 'cached');
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/prompts.json')), false);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/categories.json')), false);
});

test('mirrorMissingAssets records failed downloads without aborting tolerant runs', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'assets-failed-'));
  writeJson(path.join(projectRoot, 'data/canonical/prompts.json'), datasetFixture());

  const result = await mirrorMissingAssets({
    projectRoot,
    fetchAsset: async () => {
      throw new Error('network unavailable');
    }
  });

  assert.equal(result.failedCount, 1);
  const dataset = readCanonicalDataset(projectRoot);
  assert.equal(dataset.prompts[0].assets[0].status, 'failed');
  assert.match(dataset.prompts[0].assets[0].error, /network unavailable/);
});

test('mirrorMissingAssets can target one prompt asset by prompt id and asset id', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'assets-one-'));
  const first = datasetFixture();
  const secondPrompt = JSON.parse(JSON.stringify(first.prompts[0]));
  secondPrompt.id = 'prompt_cccccccccccccccccccc';
  secondPrompt.assets[0].id = 'asset_2';
  secondPrompt.assets[0].upstreamUrl = 'https://example.com/second.jpg';
  secondPrompt.assets[0].localPath = 'public/assets/prompt_cccccccccccccccccccc/second.jpg';
  first.prompts.push(secondPrompt);
  writeJson(path.join(projectRoot, 'data/canonical/prompts.json'), first);

  const fetched = [];
  const result = await mirrorMissingAssets({
    projectRoot,
    promptId: secondPrompt.id,
    assetId: 'asset_2',
    fetchAsset: async url => {
      fetched.push(url);
      return {
        bytes: Buffer.from('second-image'),
        contentType: 'image/jpeg'
      };
    }
  });

  assert.equal(result.candidateCount, 1);
  assert.deepEqual(fetched, ['https://example.com/second.jpg']);
  assert.equal(fs.existsSync(path.join(projectRoot, first.prompts[0].assets[0].localPath)), false);
  assert.equal(fs.readFileSync(path.join(projectRoot, secondPrompt.assets[0].localPath), 'utf-8'), 'second-image');
});

test('mirrorMissingAssets does not overwrite the latest validation report', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'assets-report-'));
  writeJson(path.join(projectRoot, 'data/canonical/prompts.json'), datasetFixture());
  writeJson(path.join(projectRoot, 'data/reports/latest.json'), {
    generatedAt: '2026-05-04T00:00:00.000Z',
    summary: { error: 0, warning: 7, info: 0 },
    issues: [{ severity: 'warning', code: 'asset_not_cached' }]
  });

  await mirrorMissingAssets({
    projectRoot,
    fetchAsset: async () => ({
      bytes: Buffer.from('image-bytes'),
      contentType: 'image/jpeg'
    })
  });

  const latestReport = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/reports/latest.json'), 'utf-8'));
  assert.equal(latestReport.summary.warning, 7);
  assert.equal(latestReport.issues[0].code, 'asset_not_cached');
});

test('assets parseArgs accepts targeted refresh report flags', () => {
  const args = parseArgs(['--missing', '--prompt-id', 'prompt_one', '--asset-id', 'asset_1', '--refresh-report', '--target-languages', 'en,zh-CN']);

  assert.equal(args.promptId, 'prompt_one');
  assert.equal(args.assetId, 'asset_1');
  assert.equal(args.refreshReport, true);
  assert.deepEqual(args.targetLanguages, ['en', 'zh-CN']);
});
