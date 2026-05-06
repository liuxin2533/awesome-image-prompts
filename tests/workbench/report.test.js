const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { readReport, summarizeReport } = require('../../scripts/workbench/report');

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
        severity: 'warning',
        code: 'unclassified_category',
        message: 'Prompt needs category review.',
        promptId: 'prompt_e',
        fieldPath: 'classification.categoryId',
        resolutionCommand: 'pnpm classify -- --prompt-id prompt_e --category <category-id>'
      },
      {
        severity: 'warning',
        code: 'unclassified_category',
        message: 'Prompt needs category review.',
        promptId: 'prompt_f',
        fieldPath: 'classification.categoryId',
        resolutionCommand: 'pnpm classify -- --prompt-id prompt_f --category <category-id>'
      },
      {
        severity: 'error',
        code: 'invalid_prompt',
        message: 'Prompt is invalid.',
        sourceKey: 'fixture'
      }
    ]
  });

  assert.deepEqual(summary.summary, { error: 1, warning: 6, info: 0 });
  assert.equal(summary.grouped.byCode.missing_translation, 3);
  assert.equal(summary.grouped.byCode.asset_not_cached, 1);
  assert.equal(summary.grouped.byCode.unclassified_category, 2);
  assert.equal(summary.grouped.byResolutionCommand['pnpm translate -- --missing --lang zh-CN'], 2);
  assert.equal(summary.grouped.byResolutionAction.translate, 3);
  assert.equal(summary.grouped.byResolutionAction.classify, 2);
  assert.equal(summary.grouped.translationByLanguage['zh-CN'], 2);
  assert.equal(summary.grouped.translationByLanguage.en, 1);
  assert.equal(summary.grouped.translationByField.title, 1);
  assert.equal(summary.grouped.translationByField.category, 1);
  assert.equal(summary.grouped.translationByField.promptText, 1);
  assert.equal(summary.grouped.assetIssueCount, 1);
  assert.deepEqual(summary.filters.codes, ['asset_not_cached', 'invalid_prompt', 'missing_translation', 'unclassified_category']);
  assert.deepEqual(summary.filters.severities, ['error', 'warning']);
  assert.deepEqual(summary.filters.resolutionActions, [
    { value: 'classify', label: '人工归类', count: 2 },
    { value: 'manual', label: '人工处理', count: 1 },
    { value: 'mirror-assets', label: '镜像资源', count: 1 },
    { value: 'translate', label: '补齐翻译', count: 3 }
  ]);
  assert.equal(summary.filters.resolutionCommands.filter(command => command.includes('--prompt-id')).length, 2);
  assert.equal(summary.issues.length, 7);
  assert.equal(summary.issues[4].resolutionAction, 'classify');
  assert.equal(summary.issues[4].resolutionActionLabel, '人工归类');
});

test('readReport includes latest extraction run summary for the workbench dashboard', () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'workbench-report-run-'));
  fs.mkdirSync(path.join(projectRoot, 'data/reports'), { recursive: true });
  fs.mkdirSync(path.join(projectRoot, 'data/runs'), { recursive: true });
  fs.writeFileSync(path.join(projectRoot, 'data/reports/latest.json'), JSON.stringify({
    generatedAt: '2026-05-06T00:00:00.000Z',
    issues: []
  }), 'utf-8');
  fs.writeFileSync(path.join(projectRoot, 'data/runs/latest.json'), JSON.stringify({
    id: 'run_20260506T000000000Z',
    summary: { added: 2, updated: 1, unchanged: 3, removed: 0, total: 6, error: 0, warning: 4, info: 0 }
  }), 'utf-8');

  const report = readReport(projectRoot);

  assert.equal(report.latestRun.id, 'run_20260506T000000000Z');
  assert.equal(report.latestRun.summary.added, 2);
  assert.equal(report.latestRun.summary.updated, 1);
});
