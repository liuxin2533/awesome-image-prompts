const fs = require('fs');
const path = require('path');
const {
  extractFencedCodeAfterLabel,
  extractHtmlImages,
  extractMarkdownImages,
  extractMarkdownLinks,
  splitHeadingSections
} = require('../core/markdown');
const { normalizeLanguageCode } = require('../core/text');
const {
  absolutizeGithubRaw,
  fetchUrl,
  inferImageRole,
  languageFromReadme,
  readUtf8
} = require('./utils');

const CONFIG = {
  sourceKey: 'zerolu',
  name: 'ZeroLu',
  repo: 'ZeroLu/awesome-gpt-image',
  branch: 'main',
  rawBaseUrl: 'https://raw.githubusercontent.com/ZeroLu/awesome-gpt-image/main',
  readmeFiles: [
    'README.md',
    'README.zh-CN.md',
    'README.zh-TW.md',
    'README.ja.md',
    'README.ko.md',
    'README.fr.md',
    'README.de.md',
    'README.es.md'
  ]
};

const PROMPT_LABELS = [
  'Prompt:',
  '提示词:',
  '提示詞:',
  'プロンプト:',
  '프롬프트:'
];

const SOURCE_LABEL_PATTERN = '(?:Source|来源|來源|出典|출처|Quelle|Fuente)';

function stripMarkdown(value) {
  return String(value || '')
    .replace(/^#+\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function categoryForIndex(markdown, index) {
  const before = String(markdown || '').slice(0, index);
  const matches = [...before.matchAll(/^##\s+(.+)$/gm)];
  if (!matches.length) return 'General';
  return stripMarkdown(matches[matches.length - 1][1]);
}

function sectionTitle(section) {
  return stripMarkdown(section.heading.replace(/^###\s+/, ''));
}

function extractImages(sectionContent) {
  return [...extractMarkdownImages(sectionContent), ...extractHtmlImages(sectionContent)]
    .sort((a, b) => a.index - b.index);
}

function sourceLine(sectionContent) {
  const regex = new RegExp(`(?:\\*\\*|\\*)${SOURCE_LABEL_PATTERN}\\s*:\\s*(?:\\*\\*)?\\s*([^\\n]+)`, 'i');
  const match = String(sectionContent || '').match(regex);
  return match ? match[1].trim().replace(/\*+\s*$/, '').trim() : '';
}

function preferredSourceUrl(rawSource) {
  const links = extractMarkdownLinks(rawSource);
  if (!links.length) return null;
  return links.find(link => /https?:\/\/(?:x|twitter)\.com\/[^)\s]+\/status\//i.test(link.href))?.href
    || links[0].href;
}

function authorsFromSource(rawSource) {
  return extractMarkdownLinks(rawSource).map(link => ({
    name: link.text.replace(/^@/, ''),
    url: link.href
  }));
}

function extractLabeledText(sectionContent, label) {
  const lines = String(sectionContent || '').split(/\r?\n/);
  const labelRegex = new RegExp(`^\\s*\\*\\*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*:\\*\\*\\s*(.*)$`, 'i');
  const collected = [];
  let collecting = false;

  for (const line of lines) {
    const match = line.match(labelRegex);
    if (match) {
      collecting = true;
      if (match[1]) collected.push(match[1]);
      continue;
    }

    if (!collecting) continue;
    if (/^\s*(?:\*\*[^*]+:\*\*|###\s+|---\s*$)/.test(line)) break;
    collected.push(line);
  }

  return collected.join('\n').trim();
}

function extractComment(sectionContent) {
  return extractLabeledText(sectionContent, 'Comment');
}

function extractEnglishTranslation(sectionContent) {
  const raw = extractLabeledText(sectionContent, 'English Translation');
  if (!raw) return null;

  const originalMatch = raw.match(/^Original prompt:\s*`([^`]+)`\s*$/i);
  if (originalMatch) {
    return {
      type: 'original',
      language: guessPromptLanguage(originalMatch[1], 'zh-CN'),
      value: originalMatch[1].trim()
    };
  }

  if (/^Original prompt is/i.test(raw)) return null;

  return {
    type: 'english',
    language: 'en',
    value: raw.replace(/\s+/g, ' ').trim()
  };
}

function guessPromptLanguage(text, fallback) {
  const value = String(text || '');
  if (/[\u3040-\u30ff]/.test(value)) return 'ja';
  if (/[\uac00-\ud7af]/.test(value)) return 'ko';
  if (/[\u4e00-\u9fff]/.test(value)) return 'zh-CN';
  return normalizeLanguageCode(fallback || 'en');
}

function buildLocalized(language, title, promptText, comment, englishTranslation) {
  const localized = {};
  const normalizedLanguage = normalizeLanguageCode(language);
  const detectedLanguage = guessPromptLanguage(promptText, normalizedLanguage);

  localized[normalizedLanguage] = {
    title,
    promptText
  };
  if (comment) localized[normalizedLanguage].description = comment;

  if (normalizedLanguage === 'en' && detectedLanguage !== 'en') {
    localized[detectedLanguage] = {
      promptText
    };

    if (englishTranslation?.type === 'english' && englishTranslation.value) {
      localized.en.promptText = englishTranslation.value;
    }
  }

  if (normalizedLanguage === 'en' && englishTranslation?.type === 'original') {
    localized[englishTranslation.language] = {
      ...(localized[englishTranslation.language] || {}),
      promptText: englishTranslation.value
    };
  }

  return localized;
}

function assetSignature(images) {
  return images.map(image => image.src).join('|');
}

function parseLanguageReadme(language, content) {
  const records = [];
  const sections = splitHeadingSections(content, /^###\s+/);

  for (const section of sections) {
    const promptFence = extractFencedCodeAfterLabel(section.content, PROMPT_LABELS);
    if (!promptFence?.code) continue;

    const images = extractImages(section.content);
    if (!images.length) continue;

    const title = sectionTitle(section);
    const rawSource = sourceLine(section.content);
    const sourceUrl = preferredSourceUrl(rawSource);
    const comment = extractComment(section.content);
    const englishTranslation = extractEnglishTranslation(section.content);
    const category = categoryForIndex(content, section.startIndex);
    const key = assetSignature(images) || sourceUrl || `${normalizeLanguageCode(language)}:${section.startIndex}:${title}`;

    records.push({
      key,
      title,
      sourceUrl,
      rawSource,
      category,
      language: normalizeLanguageCode(language),
      localized: buildLocalized(language, title, promptFence.code, comment, englishTranslation),
      reference: {
        sourceKey: CONFIG.sourceKey,
        repo: CONFIG.repo,
        url: sourceUrl || `https://github.com/${CONFIG.repo}`,
        originalId: sourceUrl || key,
        authors: authorsFromSource(rawSource),
        locations: [{ file: `README:${normalizeLanguageCode(language)}`, line: section.line }],
        rawSource
      },
      assets: images.map((image, index) => ({
        role: inferImageRole({ ...image, alt: image.alt || title }),
        upstreamPath: image.src,
        upstreamUrl: absolutizeGithubRaw(CONFIG.rawBaseUrl, image.src),
        alt: image.alt || title,
        index
      }))
    });
  }

  return records;
}

function mergeReference(target, incoming) {
  const existing = target.references.find(reference =>
    reference.url === incoming.url || reference.originalId === incoming.originalId
  );

  if (!existing) {
    target.references.push(incoming);
    return;
  }

  const locationKeys = new Set((existing.locations || []).map(location => `${location.file}:${location.line}`));
  for (const location of incoming.locations || []) {
    const key = `${location.file}:${location.line}`;
    if (locationKeys.has(key)) continue;
    existing.locations = existing.locations || [];
    existing.locations.push(location);
    locationKeys.add(key);
  }

  const authorKeys = new Set((existing.authors || []).map(author => `${author.name}:${author.url || ''}`));
  for (const author of incoming.authors || []) {
    const key = `${author.name}:${author.url || ''}`;
    if (authorKeys.has(key)) continue;
    existing.authors = existing.authors || [];
    existing.authors.push(author);
    authorKeys.add(key);
  }
}

function parseZeroLu({ readmes }) {
  const byKey = new Map();

  for (const [language, content] of Object.entries(readmes || {})) {
    for (const item of parseLanguageReadme(language, content)) {
      if (!byKey.has(item.key)) {
        byKey.set(item.key, {
          sourceKey: CONFIG.sourceKey,
          repo: CONFIG.repo,
          originalId: item.reference.originalId,
          primaryLanguage: 'en',
          localized: {},
          sourceCategories: [],
          tags: [],
          references: [],
          assets: item.assets,
          addedAt: null
        });
      }

      const record = byKey.get(item.key);
      Object.assign(record.localized, item.localized);
      if (!record.assets.length && item.assets.length) record.assets = item.assets;
      mergeReference(record, item.reference);
      if (item.category && !record.sourceCategories.some(category => category.value === item.category && category.language === item.language)) {
        record.sourceCategories.push({
          value: item.category,
          language: item.language,
          source: 'derived',
          sourceKey: CONFIG.sourceKey
        });
      }
    }
  }

  return Array.from(byKey.values());
}

function loadLocal(projectRoot) {
  const upstreamDir = path.join(projectRoot, 'upstream', 'zerolu');
  const readmes = {};
  for (const file of CONFIG.readmeFiles) {
    const filePath = path.join(upstreamDir, file);
    if (fs.existsSync(filePath)) {
      readmes[languageFromReadme(file)] = readUtf8(filePath);
    }
  }
  return { readmes };
}

async function loadRemote() {
  const readmes = {};
  for (const file of CONFIG.readmeFiles) {
    try {
      readmes[languageFromReadme(file)] = await fetchUrl(`${CONFIG.rawBaseUrl}/${file}`);
    } catch {
      // Missing localized README files are expected.
    }
  }
  return { readmes };
}

async function load({ projectRoot, mode }) {
  return mode === 'remote' ? loadRemote() : loadLocal(projectRoot);
}

module.exports = {
  CONFIG,
  parseZeroLu,
  load
};
