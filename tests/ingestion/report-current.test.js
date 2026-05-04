const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { refreshCurrentReport } = require('../../scripts/ingestion/report-current');

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
}

function promptFixture(overrides = {}) {
  return {
    id: overrides.id || 'prompt_aaaaaaaaaaaaaaaaaaaa',
    contentHash: overrides.contentHash || 'a'.repeat(64),
    dedupeKey: overrides.dedupeKey || 'make a poster',
    promptText: {
      original: { language: 'en', value: 'Make a poster', source: 'upstream' },
      translations: {}
    },
    title: {
      original: { language: 'en', value: 'Poster', source: 'upstream' },
      translations: overrides.titleTranslations || {}
    },
    description: {
      original: { language: 'en', value: 'A poster prompt', source: 'upstream' },
      translations: {}
    },
    categories: [
      { id: 'poster', value: 'Poster', language: 'en', source: 'upstream', sourceKey: 'fixture' },
      ...(overrides.categories || [])
    ],
    tags: [],
    sources: [{ sourceKey: 'fixture', repo: 'fixture/repo', url: null, originalId: null, authors: [], locations: [] }],
    assets: overrides.assets || [],
    curation: { overrides: [] },
    addedAt: null,
    updatedAt: '2026-05-04T00:00:00.000Z'
  };
}

test('refreshCurrentReport validates current canonical data without re-ingesting sources', () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'report-current-'));
  writeJson(path.join(projectRoot, 'data/canonical/prompts.json'), {
    schemaVersion: '2026-05-04',
    generatedAt: '2026-05-04T00:00:00.000Z',
    totalCount: 2,
    languages: ['en', 'zh-CN'],
    sourceCount: {},
    prompts: [
      promptFixture(),
      promptFixture({
        id: 'prompt_bbbbbbbbbbbbbbbbbbbb',
        contentHash: 'b'.repeat(64),
        dedupeKey: 'make another poster',
        titleTranslations: {
          'zh-CN': { language: 'zh-CN', value: '海报', source: 'ai' }
        },
        categories: [
          { id: 'poster-zh-cn', value: '海报', language: 'zh-CN', source: 'ai', translationOf: 'poster' }
        ],
        assets: [{
          id: 'asset_1',
          role: 'output',
          upstreamUrl: 'https://example.com/image.jpg',
          localPath: 'public/assets/prompt_bbbbbbbbbbbbbbbbbbbb/image.jpg',
          status: 'pending'
        }]
      })
    ]
  });

  const result = refreshCurrentReport({ projectRoot, targetLanguages: ['en', 'zh-CN'] });
  const report = result.report.toJSON();

  assert.equal(report.summary.error, 0);
  assert.equal(report.issues.some(issue => issue.code === 'missing_translation' && issue.promptId === 'prompt_aaaaaaaaaaaaaaaaaaaa'), true);
  assert.equal(report.issues.some(issue => issue.code === 'asset_not_cached' && issue.promptId === 'prompt_bbbbbbbbbbbbbbbbbbbb'), true);

  const written = JSON.parse(fs.readFileSync(path.join(projectRoot, 'data/reports/latest.json'), 'utf-8'));
  assert.equal(written.summary.warning, report.summary.warning);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/reports/latest.md')), true);
});
