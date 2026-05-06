const test = require('node:test');
const assert = require('node:assert/strict');
const childProcess = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { Report } = require('../../scripts/ingestion/core/report');
const { writeCanonicalDataset, readCanonicalDataset } = require('../../scripts/ingestion/core/persist');
const {
  assignPromptCategory,
  classifyDataset,
  readCategoryRules
} = require('../../scripts/ingestion/classification');

function promptFixture(overrides = {}) {
  return {
    id: overrides.id || 'prompt_aaaaaaaaaaaaaaaaaaaa',
    promptText: {
      original: { language: 'en', value: overrides.promptText || 'Make a product poster', source: 'upstream' },
      translations: {}
    },
    title: {
      original: { language: 'en', value: overrides.title || 'Product Poster', source: 'upstream' },
      translations: {}
    },
    description: { original: null, translations: {} },
    sourceCategories: overrides.sourceCategories || [
      { id: 'poster-cases', value: 'Poster Cases', language: 'en', source: 'upstream', sourceKey: 'fixture' }
    ],
    categories: overrides.categories || [
      { id: 'poster-cases', value: 'Poster Cases', language: 'en', source: 'upstream', sourceKey: 'fixture' }
    ],
    tags: overrides.tags || [],
    sources: [{ sourceKey: 'fixture', repo: 'fixture/repo', url: `https://example.com/${overrides.id || 'a'}`, originalId: overrides.id || 'a' }],
    assets: [],
    curation: { overrides: [] },
    addedAt: null,
    updatedAt: '2026-05-05T00:00:00.000Z'
  };
}

test('classifyDataset maps upstream categories into canonical taxonomy and warns when review is needed', () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'classification-rules-'));
  const report = new Report();
  const dataset = {
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-05T00:00:00.000Z',
    totalCount: 2,
    languages: ['en'],
    sourceCount: { fixture: 2 },
    prompts: [
      promptFixture({ id: 'prompt_poster0000000000' }),
      promptFixture({
        id: 'prompt_unknown000000000',
        title: 'Mystery',
        promptText: 'Something opaque',
        sourceCategories: [{ id: 'misc', value: 'Misc', language: 'en', source: 'upstream', sourceKey: 'fixture' }],
        categories: [{ id: 'misc', value: 'Misc', language: 'en', source: 'upstream', sourceKey: 'fixture' }],
        tags: []
      })
    ]
  };

  const result = classifyDataset(dataset, { projectRoot, report });

  assert.equal(result.classifiedCount, 1);
  assert.equal(result.needsReviewCount, 1);
  assert.equal(dataset.prompts[0].classification.status, 'classified');
  assert.equal(dataset.prompts[0].classification.categoryId, 'poster-illustration');
  assert.equal(dataset.prompts[0].categories.some(category => category.id === 'poster-illustration'), true);
  assert.equal(dataset.prompts[0].sourceCategories[0].value, 'Poster Cases');
  assert.equal(dataset.prompts[1].classification.status, 'needs_review');
  assert.equal(dataset.prompts[1].categories.length, 0);
  assert.equal(report.issues.some(issue => issue.code === 'unclassified_category' && issue.promptId === 'prompt_unknown000000000'), true);
});

test('assignPromptCategory stores manual classification without losing upstream source categories', () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'classification-assign-'));
  const dataset = {
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-05T00:00:00.000Z',
    totalCount: 1,
    languages: ['en'],
    sourceCount: { fixture: 1 },
    prompts: [
      promptFixture({
        id: 'prompt_unknown000000000',
        title: 'Unknown',
        sourceCategories: [{ id: 'misc', value: 'Misc', language: 'en', source: 'upstream', sourceKey: 'fixture' }],
        categories: []
      })
    ]
  };
  writeCanonicalDataset(projectRoot, dataset);

  const result = assignPromptCategory({
    projectRoot,
    promptId: 'prompt_unknown000000000',
    categoryId: 'product-marketing',
    refreshReport: false,
    now: '2026-05-06T00:00:00.000Z'
  });

  assert.equal(result.prompt.classification.source, 'manual');
  assert.equal(result.prompt.classification.categoryId, 'product-marketing');
  assert.equal(result.prompt.categories.some(category => category.id === 'product-marketing'), true);
  assert.equal(result.prompt.sourceCategories[0].value, 'Misc');

  const saved = readCanonicalDataset(projectRoot);
  assert.equal(saved.prompts[0].classification.categoryId, 'product-marketing');
  assert.equal(saved.prompts[0].classification.classifiedAt, '2026-05-06T00:00:00.000Z');
});

test('readCategoryRules returns editable canonical categories', () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'classification-read-rules-'));
  const rules = readCategoryRules(projectRoot);

  assert.equal(rules.categories.some(category => category.id === 'poster-illustration'), true);
  assert.equal(rules.categories.some(category => category.title['zh-CN'] === '海报与插画'), true);
  assert.equal(rules.categories.some(category => category.id === 'game-entertainment'), true);
  assert.equal(rules.categories.some(category => category.id === 'video-animation-collage'), true);
});

test('classification CLI refreshes report without circular dependency failure', t => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'classification-cli-refresh-'));
  const dataset = {
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-05T00:00:00.000Z',
    totalCount: 1,
    languages: ['en'],
    sourceCount: { fixture: 1 },
    prompts: [promptFixture({ id: 'prompt_poster0000000000' })]
  };
  writeCanonicalDataset(projectRoot, dataset);

  let output = '';
  try {
    output = childProcess.execFileSync(process.execPath, [
      path.join(__dirname, '..', '..', 'scripts', 'ingestion', 'classification.js'),
      '--project-root',
      projectRoot,
      '--refresh-report',
      '--target-languages',
      'en,zh-CN'
    ], { encoding: 'utf-8' });
  } catch (error) {
    if (error.code === 'EPERM') {
      t.skip('Current sandbox blocks child-process Node execution.');
      return;
    }
    throw error;
  }

  assert.match(output, /Classification: 1 classified, 0 need review/);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/reports/latest.json')), true);
});
