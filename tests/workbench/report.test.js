const test = require('node:test');
const assert = require('node:assert/strict');

const { summarizeReport } = require('../../scripts/workbench/report');

test('summarizeReport groups severities, codes, translation languages, and asset issues', () => {
  const summary = summarizeReport({
    generatedAt: '2026-05-04T00:00:00.000Z',
    issues: [
      {
        severity: 'warning',
        code: 'missing_translation',
        message: 'title missing zh-CN translation',
        promptId: 'prompt_a',
        fieldPath: 'title.translations.zh-CN',
        resolutionCommand: 'pnpm translate -- --missing --lang zh-CN'
      },
      {
        severity: 'warning',
        code: 'missing_translation',
        message: 'category missing zh-CN translation',
        promptId: 'prompt_b',
        fieldPath: 'categories.poster.zh-CN',
        resolutionCommand: 'pnpm translate -- --missing --lang zh-CN'
      },
      {
        severity: 'warning',
        code: 'missing_translation',
        message: 'prompt text missing en translation',
        promptId: 'prompt_c',
        fieldPath: 'promptText.translations.en',
        resolutionCommand: 'pnpm translate -- --missing --lang en'
      },
      {
        severity: 'warning',
        code: 'asset_not_cached',
        message: 'Asset is not cached locally.',
        promptId: 'prompt_d',
        fieldPath: 'assets.asset_a.localPath',
        resolutionCommand: 'pnpm assets:mirror -- --missing'
      },
      {
        severity: 'error',
        code: 'invalid_prompt',
        message: 'Prompt is invalid.',
        sourceKey: 'fixture'
      }
    ]
  });

  assert.deepEqual(summary.summary, { error: 1, warning: 4, info: 0 });
  assert.equal(summary.grouped.byCode.missing_translation, 3);
  assert.equal(summary.grouped.byCode.asset_not_cached, 1);
  assert.equal(summary.grouped.byResolutionCommand['pnpm translate -- --missing --lang zh-CN'], 2);
  assert.equal(summary.grouped.translationByLanguage['zh-CN'], 2);
  assert.equal(summary.grouped.translationByLanguage.en, 1);
  assert.equal(summary.grouped.translationByField.title, 1);
  assert.equal(summary.grouped.translationByField.category, 1);
  assert.equal(summary.grouped.translationByField.promptText, 1);
  assert.equal(summary.grouped.assetIssueCount, 1);
  assert.deepEqual(summary.filters.codes, ['asset_not_cached', 'invalid_prompt', 'missing_translation']);
  assert.deepEqual(summary.filters.severities, ['error', 'warning']);
  assert.equal(summary.issues.length, 5);
});
