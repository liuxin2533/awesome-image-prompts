const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { runIngest } = require('../../scripts/ingestion/cli');
const { readCanonicalDataset } = require('../../scripts/ingestion/core/persist');

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}

test('runIngest writes canonical data and reports only', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'awesome-image-prompts-'));

  write(path.join(projectRoot, 'upstream/evolink/README.md'), [
    '## E-commerce Cases',
    '### Case 1: [A](https://x.com/a/status/1) (by [@a](https://x.com/a))',
    '| <img src="./images/case1/output.jpg" width="300" alt="Output image"> |',
    '**Prompt:**',
    '```',
    'Same Prompt',
    '```'
  ].join('\n'));
  write(path.join(projectRoot, 'upstream/evolink/data/ingested_tweets.json'), JSON.stringify({
    records: [{ tweet_url: 'https://x.com/a/status/1', category: 'E-commerce Cases', added_at: '2026-04-22T18:00:00+08:00' }]
  }));

  write(path.join(projectRoot, 'upstream/freestylefly/docs/gallery-part-1.md'), [
    '### 例 1：信息图可视化设计',
    '![Alt](../data/images/case1.jpg)',
    '**来源：** [@a](https://x.com/a)',
    '**提示词：**',
    '```text',
    ' same prompt ',
    '```'
  ].join('\n'));

  write(path.join(projectRoot, 'upstream/freestylefly/docs/gallery-part-2.md'), '');
  write(path.join(projectRoot, 'upstream/youmind/README.md'), [
    '### No. 1: Unique',
    '#### 📖 Description',
    'Unique description',
    '#### 📝 Prompt',
    '```',
    'Unique prompt',
    '```',
    '#### 🖼️ Generated Images',
    '<img src="https://cms-assets.youmind.com/media/u.jpg" width="700" alt="Unique - Image 1">',
    '#### 📌 Details',
    '- **Author:** [u](https://x.com/u)',
    '- **Source:** [Twitter Post](https://x.com/u/status/1)',
    '- **Published:** April 20, 2026',
    '- **Languages:** en'
  ].join('\n'));

  const result = await runIngest({
    projectRoot,
    mode: 'local',
    sources: ['evolink', 'freestylefly', 'youmind'],
    targetLanguages: ['en', 'zh-CN'],
    strict: false
  });

  assert.equal(result.dataset.totalCount, 2);
  assert.equal(result.dataset.prompts.find(prompt => prompt.promptText.original.value === 'Same Prompt').sources.length, 2);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/canonical/prompts.json')), true);
  const manifest = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/canonical/prompts.json'), 'utf-8'));
  assert.equal(Object.hasOwn(manifest.prompts[0], 'promptText'), false);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/canonical', manifest.prompts[0].file)), true);
  const canonical = readCanonicalDataset(projectRoot);
  const prompt = canonical.prompts.find(item => item.promptText.original.value === 'Same Prompt');
  assert.equal(Object.hasOwn(prompt, 'dedupeKey'), false);
  assert.equal(Object.hasOwn(prompt, 'contentHash'), false);
  assert.match(prompt.updatedAt, /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(Object.hasOwn(prompt, 'tags'), false);
  assert.equal(Object.hasOwn(prompt, 'curation'), false);
  assert.equal(prompt.assets.some(asset => Object.hasOwn(asset, 'sourceKey')), false);
  assert.equal(Object.hasOwn(result.dataset.prompts[0], 'dedupeKey'), true);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/canonical/categories.json')), true);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/canonical/assets.json')), true);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/canonical/sources.json')), true);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/reports/latest.md')), true);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/runs/latest.json')), true);
  const latestRun = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/runs/latest.json'), 'utf-8'));
  assert.equal(latestRun.summary.added, 2);
  assert.equal(latestRun.summary.updated, 0);
  assert.equal(latestRun.summary.unchanged, 0);
  assert.equal(result.report.issues.some(issue => issue.code === 'asset_not_cached'), true);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/prompts.json')), false);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/categories.json')), false);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/evolink.json')), false);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/freestylefly.json')), false);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/youmind.json')), false);
});

test('runIngest preserves local canonical translations and cached assets for existing prompts', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'awesome-image-prompts-preserve-'));

  write(path.join(projectRoot, 'upstream/evolink/README.md'), [
    '## Poster Cases',
    '### Case 1: [Poster](https://x.com/a/status/1) (by [@a](https://x.com/a))',
    '| <img src="./images/case1/output.jpg" width="300" alt="Output image"> |',
    '**Prompt:**',
    '```',
    'Make a poster',
    '```'
  ].join('\n'));
  write(path.join(projectRoot, 'upstream/evolink/data/ingested_tweets.json'), JSON.stringify({
    records: [{ tweet_url: 'https://x.com/a/status/1', category: 'Poster Cases' }]
  }));

  await runIngest({
    projectRoot,
    mode: 'local',
    sources: ['evolink'],
    targetLanguages: ['en', 'zh-CN'],
    strict: false
  });

  const canonicalPath = path.join(projectRoot, 'data/canonical/prompts.json');
  const before = readCanonicalDataset(projectRoot);
  const prompt = before.prompts[0];
  prompt.promptText.translations['zh-CN'] = {
    language: 'zh-CN',
    value: '制作一张海报',
    source: 'ai',
    translatedAt: '2026-05-05T00:00:00.000Z'
  };
  prompt.title.translations['zh-CN'] = {
    language: 'zh-CN',
    value: '海报',
    source: 'ai',
    translatedAt: '2026-05-05T00:00:00.000Z'
  };
  prompt.categories.push({
    id: 'poster-cases-zh-cn',
    value: '海报案例',
    language: 'zh-CN',
    source: 'ai',
    translationOf: prompt.categories[0].id,
    translatedAt: '2026-05-05T00:00:00.000Z'
  });
  prompt.assets[0].status = 'cached';
  prompt.assets[0].bytes = 1234;
  prompt.assets[0].contentType = 'image/jpeg';
  prompt.assets[0].cachedAt = '2026-05-05T00:00:00.000Z';
  const { writeCanonicalDataset } = require('../../scripts/ingestion/core/persist');
  writeCanonicalDataset(projectRoot, before);

  await runIngest({
    projectRoot,
    mode: 'local',
    sources: ['evolink'],
    targetLanguages: ['en', 'zh-CN'],
    strict: false
  });

  const after = readCanonicalDataset(projectRoot);
  const preserved = after.prompts[0];
  assert.deepEqual(after.languages, ['en', 'zh-CN']);
  assert.equal(preserved.promptText.translations['zh-CN'].value, '制作一张海报');
  assert.equal(preserved.promptText.translations['zh-CN'].source, 'ai');
  assert.equal(preserved.title.translations['zh-CN'].value, '海报');
  assert.equal(
    preserved.categories.some(category =>
      category.language === 'zh-CN' &&
      category.source === 'ai' &&
      category.translationOf === prompt.categories[0].id &&
      category.value === '海报案例'
    ),
    true
  );
  assert.equal(preserved.assets[0].status, 'cached');
  assert.equal(preserved.assets[0].bytes, 1234);

  const assets = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/canonical/assets.json'), 'utf-8'));
  assert.equal(assets.assets[0].status, 'cached');
});

test('runIngest preserves canonical id and local translations when upstream text changes for the same source', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'awesome-image-prompts-preserve-change-'));

  write(path.join(projectRoot, 'upstream/evolink/README.md'), [
    '## Poster Cases',
    '### Case 1: [Original Poster](https://x.com/a/status/1) (by [@a](https://x.com/a))',
    '**Prompt:**',
    '```',
    'Make a poster',
    '```'
  ].join('\n'));
  write(path.join(projectRoot, 'upstream/evolink/data/ingested_tweets.json'), JSON.stringify({
    records: [{ tweet_url: 'https://x.com/a/status/1', category: 'Poster Cases' }]
  }));

  await runIngest({
    projectRoot,
    mode: 'local',
    sources: ['evolink'],
    targetLanguages: ['en', 'zh-CN'],
    strict: false
  });

  const canonicalPath = path.join(projectRoot, 'data/canonical/prompts.json');
  const before = readCanonicalDataset(projectRoot);
  const originalId = before.prompts[0].id;
  const originalUpdatedAt = before.prompts[0].updatedAt;
  before.prompts[0].promptText.translations['zh-CN'] = {
    language: 'zh-CN',
    value: '制作一张海报',
    source: 'ai',
    translatedAt: '2026-05-05T00:00:00.000Z'
  };
  before.prompts[0].title.translations['zh-CN'] = {
    language: 'zh-CN',
    value: '原始海报',
    source: 'ai',
    translatedAt: '2026-05-05T00:00:00.000Z'
  };
  const { writeCanonicalDataset } = require('../../scripts/ingestion/core/persist');
  writeCanonicalDataset(projectRoot, before);

  write(path.join(projectRoot, 'upstream/evolink/README.md'), [
    '## Poster Cases',
    '### Case 1: [Updated Poster](https://x.com/a/status/1) (by [@a](https://x.com/a))',
    '**Prompt:**',
    '```',
    'Make a better poster',
    '```'
  ].join('\n'));

  await runIngest({
    projectRoot,
    mode: 'local',
    sources: ['evolink'],
    targetLanguages: ['en', 'zh-CN'],
    strict: false
  });

  const after = readCanonicalDataset(projectRoot);
  assert.equal(after.prompts[0].id, originalId);
  assert.notEqual(after.prompts[0].updatedAt, originalUpdatedAt);
  assert.equal(after.prompts[0].promptText.original.value, 'Make a better poster');
  assert.equal(after.prompts[0].promptText.translations['zh-CN'].value, '制作一张海报');
  assert.equal(after.prompts[0].title.original.value, 'Updated Poster');
  assert.equal(after.prompts[0].title.translations['zh-CN'].value, '原始海报');

  const latestRun = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/runs/latest.json'), 'utf-8'));
  assert.equal(latestRun.summary.added, 0);
  assert.equal(latestRun.summary.updated, 1);
  assert.equal(latestRun.summary.unchanged, 0);
});

test('runIngest keeps unchanged prompt updatedAt stable and reports unchanged count', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'awesome-image-prompts-unchanged-'));

  write(path.join(projectRoot, 'upstream/evolink/README.md'), [
    '## Poster Cases',
    '### Case 1: [Poster](https://x.com/a/status/1) (by [@a](https://x.com/a))',
    '**Prompt:**',
    '```',
    'Make a stable poster',
    '```'
  ].join('\n'));
  write(path.join(projectRoot, 'upstream/evolink/data/ingested_tweets.json'), JSON.stringify({
    records: [{ tweet_url: 'https://x.com/a/status/1', category: 'Poster Cases' }]
  }));

  await runIngest({
    projectRoot,
    mode: 'local',
    sources: ['evolink'],
    targetLanguages: ['en', 'zh-CN'],
    strict: false
  });
  const before = readCanonicalDataset(projectRoot);
  const originalUpdatedAt = before.prompts[0].updatedAt;

  await runIngest({
    projectRoot,
    mode: 'local',
    sources: ['evolink'],
    targetLanguages: ['en', 'zh-CN'],
    strict: false
  });

  const after = readCanonicalDataset(projectRoot);
  assert.equal(after.prompts[0].updatedAt, originalUpdatedAt);

  const latestRun = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/runs/latest.json'), 'utf-8'));
  assert.equal(latestRun.summary.added, 0);
  assert.equal(latestRun.summary.updated, 0);
  assert.equal(latestRun.summary.unchanged, 1);
});

test('runIngest retains existing canonical prompts when adding a different upstream source', async () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'awesome-image-prompts-retain-'));

  write(path.join(projectRoot, 'upstream/evolink/README.md'), [
    '## Poster Cases',
    '### Case 1: [Poster](https://x.com/a/status/1) (by [@a](https://x.com/a))',
    '**Prompt:**',
    '```',
    'Make a retained poster',
    '```'
  ].join('\n'));
  write(path.join(projectRoot, 'upstream/evolink/data/ingested_tweets.json'), JSON.stringify({
    records: [{ tweet_url: 'https://x.com/a/status/1', category: 'Poster Cases' }]
  }));

  await runIngest({
    projectRoot,
    mode: 'local',
    sources: ['evolink'],
    targetLanguages: ['en', 'zh-CN'],
    strict: false
  });
  const before = readCanonicalDataset(projectRoot);
  const retainedId = before.prompts[0].id;
  before.prompts[0].promptText.translations['zh-CN'] = {
    language: 'zh-CN',
    value: '制作一张会保留的海报',
    source: 'ai',
    translatedAt: '2026-05-05T00:00:00.000Z'
  };
  const { writeCanonicalDataset } = require('../../scripts/ingestion/core/persist');
  writeCanonicalDataset(projectRoot, before);

  write(path.join(projectRoot, 'upstream/youmind/README.md'), [
    '### No. 1: New Source',
    '#### 📖 Description',
    'New source description',
    '#### 📝 Prompt',
    '```',
    'Make a new upstream prompt',
    '```',
    '#### 🖼️ Generated Images',
    '<img src="https://cms-assets.youmind.com/media/new.jpg" width="700" alt="New - Image 1">',
    '#### 📌 Details',
    '- **Author:** [u](https://x.com/u)',
    '- **Source:** [Twitter Post](https://x.com/u/status/2)',
    '- **Published:** April 21, 2026',
    '- **Languages:** en'
  ].join('\n'));

  await runIngest({
    projectRoot,
    mode: 'local',
    sources: ['youmind'],
    targetLanguages: ['en', 'zh-CN'],
    strict: false
  });

  const after = readCanonicalDataset(projectRoot);
  const retained = after.prompts.find(prompt => prompt.id === retainedId);
  assert.equal(after.totalCount, 2);
  assert.equal(retained.promptText.original.value, 'Make a retained poster');
  assert.equal(retained.promptText.translations['zh-CN'].value, '制作一张会保留的海报');

  const latestRun = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/runs/latest.json'), 'utf-8'));
  assert.equal(latestRun.summary.added, 1);
  assert.equal(latestRun.summary.updated, 0);
  assert.equal(latestRun.summary.unchanged, 1);
  assert.equal(latestRun.summary.removed, 0);
});
