const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { runIngest } = require('../../scripts/ingestion/cli');

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}

test('runIngest writes canonical data, reports, and compatibility prompts', async () => {
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
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/reports/latest.md')), true);
  assert.equal(result.report.issues.some(issue => issue.code === 'asset_not_cached'), true);

  const compatibility = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/prompts.json'), 'utf-8'));
  assert.equal(compatibility.totalCount, 2);
  assert.equal(compatibility.data[0].sourceReferences.length >= 1, true);
});
