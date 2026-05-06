const PUBLIC_LANGUAGES = ['de', 'en', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'ru', 'th', 'tr', 'vi', 'zh-CN', 'zh-TW'];

function unique(items) {
  return Array.from(new Set((items || []).map(item => String(item).trim()).filter(Boolean)));
}

function parseLanguageList(value, fallback = PUBLIC_LANGUAGES) {
  if (Array.isArray(value)) {
    const items = unique(value);
    return items.some(item => /^(all|\*|public)$/i.test(item))
      ? [...PUBLIC_LANGUAGES]
      : items;
  }

  if (!value) return [...fallback];

  const items = unique(String(value).split(/[,\s]+/));
  return items.some(item => /^(all|\*|public)$/i.test(item))
    ? [...PUBLIC_LANGUAGES]
    : items;
}

function languageCsv(languages = PUBLIC_LANGUAGES) {
  return parseLanguageList(languages).join(',');
}

module.exports = {
  PUBLIC_LANGUAGES,
  languageCsv,
  parseLanguageList
};
