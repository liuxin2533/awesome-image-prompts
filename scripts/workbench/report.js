const fs = require('fs');
const path = require('path');
const { defaultProjectRoot } = require('./config');

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
  const fieldMatch = fieldPath.match(/(?:^|\.)(zh-CN|en)(?:$|\.)/);
  return fieldMatch ? fieldMatch[1] : null;
}

function inferTranslationField(issue) {
  const fieldPath = String(issue.fieldPath || '');
  if (fieldPath.startsWith('categories.')) return 'category';
  if (fieldPath.startsWith('tags.')) return 'tag';
  return fieldPath.split('.')[0] || 'field';
}

function summarizeReport(report) {
  const issues = Array.isArray(report?.issues) ? report.issues : [];
  const summary = { error: 0, warning: 0, info: 0 };
  const byCode = {};
  const byResolutionCommand = {};
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

    if (issue.code === 'missing_translation') {
      increment(translationByLanguage, inferTranslationLanguage(issue));
      increment(translationByField, inferTranslationField(issue));
    }

    if (issue.code === 'asset_not_cached' || issue.code === 'asset_mirror_failed') {
      assetIssueCount++;
    }
  }

  const indexedIssues = issues.map((issue, index) => ({ index, ...issue }));

  return {
    generatedAt: report?.generatedAt || null,
    summary,
    grouped: {
      byCode,
      byResolutionCommand,
      translationByLanguage,
      translationByField,
      assetIssueCount
    },
    filters: {
      severities: sortedKeys(severities),
      codes: sortedKeys(codes),
      resolutionCommands: sortedKeys(byResolutionCommand).filter(Boolean)
    },
    issues: indexedIssues
  };
}

function reportPath(projectRoot = defaultProjectRoot()) {
  return path.join(projectRoot, 'data', 'reports', 'latest.json');
}

function readReport(projectRoot = defaultProjectRoot()) {
  const filePath = reportPath(projectRoot);
  if (!fs.existsSync(filePath)) {
    return summarizeReport({ generatedAt: null, issues: [] });
  }
  return summarizeReport(JSON.parse(fs.readFileSync(filePath, 'utf-8')));
}

module.exports = {
  readReport,
  reportPath,
  summarizeReport
};
