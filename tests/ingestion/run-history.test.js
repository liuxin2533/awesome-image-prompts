const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  applyPromptUpdateTimestamps,
  summarizeExtractionRun,
  writeRunRecord,
  readLatestRunRecord
} = require('../../scripts/ingestion/core/run-history');

function promptFixture(overrides = {}) {
  return {
    id: overrides.id || 'prompt_aaaaaaaaaaaaaaaaaaaa',
    promptText: {
      original: { language: 'en', value: overrides.promptText || 'Make a poster', source: 'upstream' },
      translations: overrides.promptTranslations || {}
    },
    title: {
      original: { language: 'en', value: overrides.title || 'Poster', source: 'upstream' },
      translations: {}
    },
    description: { original: null, translations: {} },
    sourceCategories: overrides.sourceCategories || [
      { id: 'poster', value: 'Poster Cases', language: 'en', source: 'upstream', sourceKey: 'fixture' }
    ],
    categories: overrides.categories || [
      { id: 'poster-illustration', value: 'Poster & Illustration', language: 'en', source: 'derived' }
    ],
    tags: [],
    sources: [{ sourceKey: 'fixture', repo: 'fixture/repo', url: 'https://example.com/poster', originalId: 'poster' }],
    assets: [],
    updatedAt: overrides.updatedAt || '2026-05-05T00:00:00.000Z'
  };
}

test('applyPromptUpdateTimestamps preserves unchanged prompt timestamps and updates changed prompts', () => {
  const previousDataset = {
    prompts: [
      promptFixture({ id: 'prompt_same000000000000', updatedAt: '2026-05-01T00:00:00.000Z' }),
      promptFixture({ id: 'prompt_changed00000000', promptText: 'Old prompt', updatedAt: '2026-05-01T00:00:00.000Z' })
    ]
  };
  const currentDataset = {
    prompts: [
      promptFixture({ id: 'prompt_same000000000000', updatedAt: '2026-05-06T00:00:00.000Z' }),
      promptFixture({ id: 'prompt_changed00000000', promptText: 'New prompt', updatedAt: '2026-05-06T00:00:00.000Z' }),
      promptFixture({ id: 'prompt_new0000000000000', updatedAt: '2026-05-06T00:00:00.000Z' })
    ]
  };

  applyPromptUpdateTimestamps(previousDataset, currentDataset, { now: '2026-05-06T00:00:00.000Z' });

  assert.equal(currentDataset.prompts[0].updatedAt, '2026-05-01T00:00:00.000Z');
  assert.equal(currentDataset.prompts[1].updatedAt, '2026-05-06T00:00:00.000Z');
  assert.equal(currentDataset.prompts[2].updatedAt, '2026-05-06T00:00:00.000Z');
});

test('summarizeExtractionRun records added, updated, unchanged, removed, warning, and error counts', () => {
  const previousDataset = {
    prompts: [
      promptFixture({ id: 'prompt_same000000000000' }),
      promptFixture({ id: 'prompt_changed00000000', promptText: 'Old prompt' }),
      promptFixture({ id: 'prompt_removed00000000' })
    ]
  };
  const currentDataset = {
    prompts: [
      promptFixture({ id: 'prompt_same000000000000' }),
      promptFixture({ id: 'prompt_changed00000000', promptText: 'New prompt' }),
      promptFixture({ id: 'prompt_new0000000000000' })
    ]
  };
  const report = {
    toJSON() {
      return { summary: { error: 1, warning: 2, info: 3 } };
    }
  };

  const run = summarizeExtractionRun({
    previousDataset,
    currentDataset,
    report,
    startedAt: '2026-05-06T00:00:00.000Z',
    finishedAt: '2026-05-06T00:00:01.000Z',
    mode: 'local',
    sources: ['fixture']
  });

  assert.deepEqual(run.summary, {
    added: 1,
    updated: 1,
    unchanged: 1,
    removed: 1,
    total: 3,
    error: 1,
    warning: 2,
    info: 3
  });
  assert.deepEqual(run.sources, ['fixture']);
  assert.equal(run.mode, 'local');
});

test('writeRunRecord writes latest run and timestamped run history', () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'run-history-'));
  const run = {
    id: 'run_20260506T000000000Z',
    startedAt: '2026-05-06T00:00:00.000Z',
    finishedAt: '2026-05-06T00:00:01.000Z',
    summary: { added: 1, updated: 0, unchanged: 0, removed: 0, total: 1, error: 0, warning: 0, info: 0 }
  };

  writeRunRecord(projectRoot, run);

  assert.equal(fs.existsSync(path.join(projectRoot, 'data/runs/latest.json')), true);
  assert.equal(fs.existsSync(path.join(projectRoot, 'data/runs/run_20260506T000000000Z.json')), true);
  assert.deepEqual(readLatestRunRecord(projectRoot).summary, run.summary);
});
