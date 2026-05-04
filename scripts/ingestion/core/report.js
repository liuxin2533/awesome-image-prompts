class Report {
  constructor() {
    this.issues = [];
  }

  add(severity, details) {
    this.issues.push({
      severity,
      code: details.code || 'issue',
      message: details.message || '',
      sourceKey: details.sourceKey || null,
      promptId: details.promptId || null,
      fieldPath: details.fieldPath || null,
      location: details.location || null,
      suggestedAction: details.suggestedAction || '',
      resolutionCommand: details.resolutionCommand || ''
    });
  }

  error(details) {
    this.add('error', details);
  }

  warn(details) {
    this.add('warning', details);
  }

  info(details) {
    this.add('info', details);
  }

  merge(issues) {
    for (const item of issues || []) {
      this.add(item.severity || 'error', item);
    }
  }

  get hasErrors() {
    return this.issues.some(issue => issue.severity === 'error');
  }

  toJSON() {
    const summary = { error: 0, warning: 0, info: 0 };
    for (const issue of this.issues) {
      summary[issue.severity] = (summary[issue.severity] || 0) + 1;
    }
    return {
      generatedAt: new Date().toISOString(),
      summary,
      issues: this.issues
    };
  }

  toMarkdown() {
    const json = this.toJSON();
    const lines = [
      '# Ingestion Report',
      '',
      `Generated: ${json.generatedAt}`,
      '',
      '## Summary',
      '',
      `- Errors: ${json.summary.error}`,
      `- Warnings: ${json.summary.warning}`,
      `- Info: ${json.summary.info}`,
      ''
    ];

    if (this.issues.length === 0) {
      lines.push('No issues found.');
      return lines.join('\n');
    }

    lines.push('## Issues', '');
    this.issues.forEach((issue, index) => {
      lines.push(`### ${index + 1}. [${issue.severity}] ${issue.code}`);
      lines.push('');
      lines.push(issue.message);
      lines.push('');
      if (issue.sourceKey) lines.push(`- Source: ${issue.sourceKey}`);
      if (issue.promptId) lines.push(`- Prompt: ${issue.promptId}`);
      if (issue.fieldPath) lines.push(`- Field: \`${issue.fieldPath}\``);
      if (issue.location?.file) {
        lines.push(`- Location: \`${issue.location.file}${issue.location.line ? `:${issue.location.line}` : ''}\``);
      }
      if (issue.suggestedAction) lines.push(`- Suggested action: ${issue.suggestedAction}`);
      if (issue.resolutionCommand) lines.push(`- Resolution command: \`${issue.resolutionCommand}\``);
      lines.push('');
    });

    return lines.join('\n');
  }
}

module.exports = { Report };

