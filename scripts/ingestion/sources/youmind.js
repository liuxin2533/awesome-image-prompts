const fs = require('fs');
const path = require('path');
const {
  extractFencedCodeAfterLabel,
  extractHtmlImages,
  extractSubsection,
  splitHeadingSections
} = require('../core/markdown');
const { normalizeLanguageCode } = require('../core/text');
const {
  fetchUrl,
  inferImageRole,
  languageFromReadme,
  parseDateLoose,
  readUtf8
} = require('./utils');

const CONFIG = {
  sourceKey: 'youmind',
  name: 'YouMind',
  repo: 'YouMind-OpenLab/awesome-gpt-image-2',
  branch: 'main',
  rawBaseUrl: 'https://raw.githubusercontent.com/YouMind-OpenLab/awesome-gpt-image-2/main',
  readmeFiles: [
    'README.md',
    'README_zh.md',
    'README_zh-TW.md',
    'README_ja-JP.md',
    'README_ko-KR.md',
    'README_th-TH.md',
    'README_vi-VN.md',
    'README_hi-IN.md',
    'README_es-ES.md',
    'README_es-419.md',
    'README_de-DE.md',
    'README_fr-FR.md',
    'README_it-IT.md',
    'README_pt-BR.md',
    'README_pt-PT.md',
    'README_tr-TR.md'
  ]
};

function detailLine(content, labels) {
  const labelGroup = labels.map(label => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`^- \\*\\*(?:${labelGroup}):\\*\\*\\s*(.+)$`, 'im');
  const match = String(content || '').match(regex);
  return match ? match[1].trim() : null;
}

function parseAuthor(content) {
  const raw = detailLine(content, ['Author', '作者']);
  if (!raw) return [];
  const match = raw.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (match) return [{ name: match[1], url: match[2] }];
  return [{ name: raw, url: null }];
}

function parseSourceUrl(content) {
  const raw = detailLine(content, ['Source', '来源']);
  if (!raw) return null;
  const match = raw.match(/\[[^\]]+\]\(([^)]+)\)/);
  return match ? match[1] : raw;
}

function parsePublished(content) {
  return parseDateLoose(detailLine(content, ['Published', '发布时间']));
}

function parseSourceLanguages(content) {
  const raw = detailLine(content, ['Languages', '语言']);
  return raw ? raw.split(',').map(item => item.trim()).filter(Boolean) : [];
}

function deriveCategoryFromTitle(title) {
  const prefix = String(title || '').split(/\s+-\s+|\s+\/\s+/)[0].trim();
  return prefix || 'General';
}

function parseLanguageReadme(language, content) {
  const normalizedLanguage = normalizeLanguageCode(language);
  const sections = splitHeadingSections(content, /^###\s+No\.\s+\d+:/);

  return sections.map(section => {
    const headingMatch = section.heading.match(/^###\s+No\.\s+(\d+):\s*(.+)$/);
    if (!headingMatch) return null;
    const promptFence = extractFencedCodeAfterLabel(section.content, ['Prompt', '提示词']);
    if (!promptFence?.code) return null;

    const title = headingMatch[2].trim();
    const sourceUrl = parseSourceUrl(section.content);
    const images = extractHtmlImages(section.content);
    const assetSignature = images.map(image => image.src).join('|');

    return {
      number: Number(headingMatch[1]),
      key: assetSignature || sourceUrl || `${normalizedLanguage}:${section.startIndex}:${title}`,
      sourceUrl,
      localized: {
        [normalizedLanguage]: {
          title,
          description: extractSubsection(section.content, ['Description', '描述']),
          promptText: promptFence.code
        }
      },
      sourceCategory: deriveCategoryFromTitle(title),
      reference: {
        sourceKey: CONFIG.sourceKey,
        repo: CONFIG.repo,
        url: sourceUrl || `https://github.com/${CONFIG.repo}`,
        originalId: sourceUrl || `no-${headingMatch[1]}-${section.line}`,
        authors: parseAuthor(section.content),
        locations: [{ file: `README:${normalizedLanguage}`, line: section.line }],
        sourceLanguages: parseSourceLanguages(section.content)
      },
      assets: images.map((image, index) => ({
        role: inferImageRole({ ...image, alt: `generated ${image.alt || ''}` }),
        upstreamPath: image.src,
        upstreamUrl: image.src,
        alt: image.alt,
        index
      })),
      addedAt: parsePublished(section.content)
    };
  }).filter(Boolean);
}

function parseYouMind({ readmes }) {
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
          sourceCategories: [{
            value: item.sourceCategory,
            language: language === 'en' ? 'en' : normalizeLanguageCode(language),
            source: 'derived',
            sourceKey: CONFIG.sourceKey
          }],
          tags: [],
          references: [item.reference],
          assets: item.assets,
          addedAt: item.addedAt
        });
      }

      const record = byKey.get(item.key);
      Object.assign(record.localized, item.localized);
      if (!record.assets.length && item.assets.length) record.assets = item.assets;
      if (!record.addedAt && item.addedAt) record.addedAt = item.addedAt;
    }
  }

  return Array.from(byKey.values());
}

function loadLocal(projectRoot) {
  const upstreamDir = path.join(projectRoot, 'upstream', 'youmind');
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
      // Missing upstream locale files are expected.
    }
  }
  return { readmes };
}

async function load({ projectRoot, mode }) {
  return mode === 'remote' ? loadRemote() : loadLocal(projectRoot);
}

module.exports = {
  CONFIG,
  parseYouMind,
  load
};
