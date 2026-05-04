const { uniqueBy } = require('./text');

function comparableText(value) {
  return String(value || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

function mergeLocalizedField(target, incoming) {
  if (!target.original?.value && incoming.original?.value) {
    target.original = incoming.original;
  }

  const originalText = comparableText(target.original?.value);
  target.translations = target.translations || {};
  for (const [language, value] of Object.entries(incoming.translations || {})) {
    if (!target.translations[language]?.value && value?.value) {
      if (originalText && comparableText(value.value) === originalText) continue;
      target.translations[language] = value;
    }
  }
}

function mergeArrayBy(target, incoming, keyFn) {
  target.push(...incoming);
  return uniqueBy(target, keyFn);
}

function mergePrompts(prompts) {
  const byDedupeKey = new Map();

  for (const prompt of prompts || []) {
    const key = prompt.dedupeKey;
    if (!byDedupeKey.has(key)) {
      byDedupeKey.set(key, {
        ...prompt,
        promptText: { original: prompt.promptText.original, translations: { ...(prompt.promptText.translations || {}) } },
        title: { original: prompt.title.original, translations: { ...(prompt.title.translations || {}) } },
        description: { original: prompt.description.original, translations: { ...(prompt.description.translations || {}) } },
        categories: [...(prompt.categories || [])],
        tags: [...(prompt.tags || [])],
        sources: [...(prompt.sources || [])],
        assets: [...(prompt.assets || [])],
        curation: { overrides: [...(prompt.curation?.overrides || [])] }
      });
      continue;
    }

    const existing = byDedupeKey.get(key);
    mergeLocalizedField(existing.promptText, prompt.promptText);
    mergeLocalizedField(existing.title, prompt.title);
    mergeLocalizedField(existing.description, prompt.description);

    existing.categories = mergeArrayBy(
      existing.categories,
      prompt.categories || [],
      item => `${item.language}:${item.value.toLowerCase()}:${item.source}`
    );
    existing.tags = mergeArrayBy(
      existing.tags,
      prompt.tags || [],
      item => `${item.language}:${item.value.toLowerCase()}`
    );
    existing.sources = mergeArrayBy(
      existing.sources,
      prompt.sources || [],
      item => `${item.sourceKey || ''}:${item.originalId || ''}:${item.url || ''}`
    );
    existing.assets = mergeArrayBy(
      existing.assets,
      prompt.assets || [],
      item => `${item.upstreamUrl || ''}:${item.upstreamPath || ''}:${item.localPath || ''}`
    );
    existing.updatedAt = new Date().toISOString();
  }

  return Array.from(byDedupeKey.values());
}

module.exports = { mergePrompts };
