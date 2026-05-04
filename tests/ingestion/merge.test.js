const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizeRawRecord } = require('../../scripts/ingestion/core/normalize');
const { mergePrompts } = require('../../scripts/ingestion/core/merge');
const { Report } = require('../../scripts/ingestion/core/report');

function rawRecord(sourceKey, promptText, overrides = {}) {
  return {
    sourceKey,
    repo: `${sourceKey}/repo`,
    originalId: `${sourceKey}-1`,
    localized: {
      en: {
        title: `${sourceKey} title`,
        description: `${sourceKey} description`,
        promptText
      }
    },
    sourceCategories: [{ value: 'Poster', language: 'en', source: 'upstream' }],
    tags: [{ value: 'Cinematic', language: 'en', source: 'derived' }],
    references: [
      {
        sourceKey,
        repo: `${sourceKey}/repo`,
        url: `https://example.com/${sourceKey}`,
        originalId: `${sourceKey}-1`,
        authors: [{ name: sourceKey, url: null }],
        locations: [{ file: 'README.md', line: 1 }]
      }
    ],
    assets: [
      {
        role: 'output',
        upstreamUrl: `https://example.com/${sourceKey}.jpg`,
        upstreamPath: 'images/output.jpg',
        alt: 'output'
      }
    ],
    addedAt: '2026-04-22T18:00:00+08:00',
    ...overrides
  };
}

test('mergePrompts deduplicates only exact trim/lowercase prompt matches', () => {
  const first = normalizeRawRecord(rawRecord('a', '  SAME Prompt  '));
  const second = normalizeRawRecord(rawRecord('b', 'same prompt'));
  const third = normalizeRawRecord(rawRecord('c', 'same  prompt'));

  const merged = mergePrompts([first, second, third]);

  assert.equal(merged.length, 2);
  assert.equal(merged[0].sources.length, 2);
  assert.equal(merged[0].promptText.original.value, 'SAME Prompt');
  assert.equal(merged[1].sources.length, 1);
});

test('normalizeRawRecord preserves upstream translations and marks missing target languages', () => {
  const report = new Report();
  const prompt = normalizeRawRecord(rawRecord('youmind', 'Prompt', {
    localized: {
      en: { title: 'English title', description: 'English description', promptText: 'Prompt' },
      'zh-CN': { title: '中文标题', description: '中文描述', promptText: '提示词' }
    }
  }), { targetLanguages: ['en', 'zh-CN', 'ja-JP'], report });

  assert.equal(prompt.title.translations['zh-CN'].value, '中文标题');
  assert.equal(prompt.promptText.translations['zh-CN'].source, 'upstream');
  assert.equal(report.issues.some(issue => issue.code === 'missing_translation' && issue.fieldPath === 'promptText.translations.ja-JP'), true);
});

test('Report serializes human and machine readable actionable issues', () => {
  const report = new Report();
  report.warn({
    code: 'asset_not_cached',
    message: 'Asset has not been mirrored',
    fieldPath: 'assets.0.localPath',
    location: { file: 'README.md', line: 20 },
    suggestedAction: 'Run asset mirroring.',
    resolutionCommand: 'pnpm assets:mirror --missing'
  });

  assert.equal(report.toJSON().summary.warning, 1);
  assert.match(report.toMarkdown(), /pnpm assets:mirror --missing/);
});

