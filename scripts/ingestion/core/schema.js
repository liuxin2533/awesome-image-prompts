const { isBcp47Like } = require('./text');

function issue({ severity = 'error', code, message, fieldPath, location, suggestedAction, resolutionCommand }) {
  return { severity, code, message, fieldPath, location: location || null, suggestedAction, resolutionCommand };
}

function validateLocalizedValue(value, fieldPath, issues) {
  if (!value || typeof value !== 'object') {
    issues.push(issue({
      code: 'missing_localized_value',
      message: `${fieldPath} must be an object.`,
      fieldPath,
      suggestedAction: 'Fix the normalizer so it emits a localized value object.'
    }));
    return;
  }

  if (!isBcp47Like(value.language)) {
    issues.push(issue({
      code: 'invalid_language',
      message: `${fieldPath}.language must be a BCP 47 language tag.`,
      fieldPath: `${fieldPath}.language`,
      suggestedAction: 'Normalize language codes before writing canonical data.'
    }));
  }
}

function validatePrompt(prompt) {
  const issues = [];

  if (!prompt || typeof prompt !== 'object') {
    return [issue({
      code: 'invalid_prompt',
      message: 'Prompt must be an object.',
      fieldPath: '$',
      suggestedAction: 'Fix the source plugin or normalizer.'
    })];
  }

  if (!/^prompt_[a-f0-9]{12,64}$/.test(prompt.id || '')) {
    issues.push(issue({
      code: 'invalid_prompt_id',
      message: 'Prompt id must be a stable hash id.',
      fieldPath: 'id',
      suggestedAction: 'Regenerate the id from the normalized prompt text.'
    }));
  }

  if (Object.hasOwn(prompt, 'contentHash') && !/^[a-f0-9]{64}$/.test(prompt.contentHash || '')) {
    issues.push(issue({
      code: 'invalid_content_hash',
      message: 'contentHash must be a sha256 hex digest.',
      fieldPath: 'contentHash',
      suggestedAction: 'Regenerate contentHash from the normalized prompt text.'
    }));
  }

  const promptValue = prompt.promptText?.original?.value;
  if (!promptValue || !String(promptValue).trim()) {
    issues.push(issue({
      code: 'missing_prompt_text',
      message: 'Prompt original text is required.',
      fieldPath: 'promptText.original.value',
      suggestedAction: 'Fix the parser so it extracts the prompt code fence.'
    }));
  } else {
    validateLocalizedValue(prompt.promptText.original, 'promptText.original', issues);
  }

  if (!prompt.title?.original?.value) {
    issues.push(issue({
      severity: 'warning',
      code: 'missing_title',
      message: 'Prompt title is missing.',
      fieldPath: 'title.original.value',
      suggestedAction: 'Fix the parser or add a curation override for the title.'
    }));
  } else {
    validateLocalizedValue(prompt.title.original, 'title.original', issues);
  }

  if (!Array.isArray(prompt.sources) || prompt.sources.length === 0) {
    issues.push(issue({
      code: 'missing_source',
      message: 'At least one source reference is required.',
      fieldPath: 'sources',
      suggestedAction: 'Fix the source plugin so it emits source references.'
    }));
  }

  if (!Array.isArray(prompt.categories)) {
    issues.push(issue({
      severity: 'warning',
      code: 'invalid_categories',
      message: 'categories must be an array.',
      fieldPath: 'categories',
      suggestedAction: 'Fix the normalizer category mapping.'
    }));
  }

  if (!Array.isArray(prompt.assets)) {
    issues.push(issue({
      severity: 'warning',
      code: 'invalid_assets',
      message: 'assets must be an array.',
      fieldPath: 'assets',
      suggestedAction: 'Fix the normalizer asset mapping.'
    }));
  }

  return issues;
}

function validateDataset(dataset) {
  const issues = [];
  const ids = new Map();
  const prompts = dataset?.prompts || dataset?.data || [];

  prompts.forEach((prompt, index) => {
    for (const promptIssue of validatePrompt(prompt)) {
      issues.push({ ...promptIssue, promptId: prompt?.id || null, index });
    }

    if (prompt?.id) {
      if (ids.has(prompt.id)) {
        issues.push(issue({
          code: 'duplicate_prompt_id',
          message: `Duplicate prompt id ${prompt.id}.`,
          fieldPath: `prompts.${index}.id`,
          suggestedAction: 'Investigate hash collision or merge duplicate prompt records.'
        }));
      } else {
        ids.set(prompt.id, index);
      }
    }
  });

  return issues;
}

function assertDataset(dataset) {
  const issues = validateDataset(dataset).filter(item => item.severity === 'error');
  if (issues.length) {
    const error = new Error(`Dataset validation failed with ${issues.length} error(s).`);
    error.issues = issues;
    throw error;
  }
}

module.exports = {
  validatePrompt,
  validateDataset,
  assertDataset
};
