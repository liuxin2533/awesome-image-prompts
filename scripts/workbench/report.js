const fs = require('fs');
const path = require('path');
const { defaultProjectRoot } = require('./config');

const TRANSLATION_LANGUAGES = ['de', 'en', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'ru', 'th', 'tr', 'vi', 'zh-CN', 'zh-TW'];
const RESOLUTION_ACTION_LABELS = {
  classify: '人工归类',
  manual: '人工处理',
  'mirror-assets': '镜像资源',
  translate: '补齐翻译',
  'other-command': '其他命令'
};

function increment(target, key, amount = 1) {
  if (!key) return;
  target[key] = (target[key] || 0) + amount;
}

function sortedKeys(object) {
  return Object.keys(object).sort((a, b) => a.localeCompare(b));
}

function inferTranslationLanguage(issue) {
  const commandMatch = String(issue.resolutionCommand || '').match(/--lang\s+([^\s]+)/);
  if (commandMatch) return commandMatch[1];
  const fieldPath = String(issue.fieldPath || '');
  const pattern = TRANSLATION_LANGUAGES.map(language => language.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const fieldMatch = fieldPath.match(new RegExp(`(?:^|\\.)(?:translations\\.)?(${pattern})(?:$|\\.)`));
  return fieldMatch ? fieldMatch[1] : null;
}

function inferTranslationField(issue) {
  const fieldPath = String(issue.fieldPath || '');
  if (fieldPath.startsWith('categories.')) return 'category';
  if (fieldPath.startsWith('tags.')) return 'tag';
  return fieldPath.split('.')[0] || 'field';
}

function inferResolutionAction(issue) {
  const code = issue.code || '';
  const command = String(issue.resolutionCommand || '');
  if (code === 'missing_translation' || command.includes('pnpm translate')) return 'translate';
  if (code === 'asset_not_cached' || code === 'asset_mirror_failed' || command.includes('assets:mirror')) return 'mirror-assets';
  if (code === 'unclassified_category' || command.includes('pnpm classify')) return 'classify';
  if (command) return 'other-command';
  return 'manual';
}

function resolutionActionOptions(counts) {
  return sortedKeys(counts).map(value => ({
    value,
    label: RESOLUTION_ACTION_LABELS[value] || value,
    count: counts[value]
  }));
}

function summarizeReport(report) {
  const issues = Array.isArray(report?.issues) ? report.issues : [];
  const summary = { error: 0, warning: 0, info: 0 };
  const byCode = {};
  const byResolutionCommand = {};
  const byResolutionAction = {};
  const translationByLanguage = {};
  const translationByField = {};
  const severities = {};
  const codes = {};
  let assetIssueCount = 0;

  for (const issue of issues) {
    const severity = issue.severity || 'error';
    summary[severity] = (summary[severity] || 0) + 1;
    increment(severities, severity);
    increment(codes, issue.code || 'issue');
    increment(byCode, issue.code || 'issue');
    increment(byResolutionCommand, issue.resolutionCommand || '');
    increment(byResolutionAction, inferResolutionAction(issue));

    if (issue.code === 'missing_translation') {
      increment(translationByLanguage, inferTranslationLanguage(issue));
      increment(translationByField, inferTranslationField(issue));
    }

    if (issue.code === 'asset_not_cached' || issue.code === 'asset_mirror_failed') {
      assetIssueCount++;
    }
  }

  const indexedIssues = issues.map((issue, index) => {
    const resolutionAction = inferResolutionAction(issue);
    return {
      index,
      ...issue,
      resolutionAction,
      resolutionActionLabel: RESOLUTION_ACTION_LABELS[resolutionAction] || resolutionAction
    };
  });

  return {
    generatedAt: report?.generatedAt || null,
    summary,
    grouped: {
      byCode,
      byResolutionCommand,
      byResolutionAction,
      translationByLanguage,
      translationByField,
      assetIssueCount
    },
    filters: {
      severities: sortedKeys(severities),
      codes: sortedKeys(codes),
      resolutionCommands: sortedKeys(byResolutionCommand).filter(Boolean),
      resolutionActions: resolutionActionOptions(byResolutionAction)
    },
    issues: indexedIssues
  };
}

function reportPath(projectRoot = defaultProjectRoot()) {
  return path.join(projectRoot, 'data', 'reports', 'latest.json');
}

function latestRunPath(projectRoot = defaultProjectRoot()) {
  return path.join(projectRoot, 'data', 'runs', 'latest.json');
}

function readLatestRun(projectRoot = defaultProjectRoot()) {
  const filePath = latestRunPath(projectRoot);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function readReport(projectRoot = defaultProjectRoot()) {
  const filePath = reportPath(projectRoot);
  const latestRun = readLatestRun(projectRoot);
  if (!fs.existsSync(filePath)) {
    return { ...summarizeReport({ generatedAt: null, issues: [] }), latestRun };
  }
  return { ...summarizeReport(JSON.parse(fs.readFileSync(filePath, 'utf-8'))), latestRun };
}

module.exports = {
  latestRunPath,
  readReport,
  readLatestRun,
  reportPath,
  summarizeReport
};
