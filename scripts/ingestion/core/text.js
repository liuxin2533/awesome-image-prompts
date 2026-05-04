const crypto = require('crypto');

const LANGUAGE_ALIASES = {
  zh: 'zh-CN',
  cn: 'zh-CN',
  'zh-cn': 'zh-CN',
  'zh-hans': 'zh-CN',
  'zh-tw': 'zh-TW',
  'zh-hant': 'zh-TW',
  en: 'en',
  'en-us': 'en-US',
  ja: 'ja',
  jp: 'ja-JP',
  'ja-jp': 'ja-JP',
  ko: 'ko',
  'ko-kr': 'ko-KR'
};

function dedupePromptText(text) {
  return String(text || '').trim().toLowerCase();
}

function contentHash(text) {
  return crypto.createHash('sha256').update(String(text || '')).digest('hex');
}

function stablePromptId(promptText, length = 20) {
  return `prompt_${contentHash(dedupePromptText(promptText)).slice(0, length)}`;
}

function normalizeLanguageCode(code) {
  if (!code) return 'und';
  const raw = String(code).trim().replace('_', '-');
  const lower = raw.toLowerCase();
  if (LANGUAGE_ALIASES[lower]) return LANGUAGE_ALIASES[lower];

  const parts = lower.split('-').filter(Boolean);
  if (parts.length === 0) return 'und';
  if (parts.length === 1) return parts[0];

  return [
    parts[0],
    ...parts.slice(1).map(part => part.length === 2 ? part.toUpperCase() : part)
  ].join('-');
}

function isBcp47Like(code) {
  return /^[a-z]{2,3}(?:-[A-Z]{2}|-[A-Za-z0-9]{3,8})*$/.test(String(code || ''));
}

function slugify(value, fallback = 'category') {
  const ascii = String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

  return ascii || fallback;
}

function uniqueBy(items, keyFn) {
  const seen = new Set();
  const result = [];
  for (const item of items || []) {
    const key = keyFn(item);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

module.exports = {
  dedupePromptText,
  contentHash,
  stablePromptId,
  normalizeLanguageCode,
  isBcp47Like,
  slugify,
  uniqueBy
};
