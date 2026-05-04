const fs = require('fs');
const path = require('path');
const {
  extractFencedCodeAfterLabel,
  extractHtmlImages,
  splitHeadingSections
} = require('../core/markdown');
const { normalizeLanguageCode } = require('../core/text');
const {
  absolutizeGithubRaw,
  fetchUrl,
  languageFromReadme,
  readUtf8,
  inferImageRole
} = require('./utils');

const CONFIG = {
  sourceKey: 'evolink',
  name: 'EvoLinkAI',
  repo: 'EvoLinkAI/awesome-gpt-image-2-prompts',
  branch: 'main',
  rawBaseUrl: 'https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main',
  readmeFiles: [
    'README.md',
    'README_zh-CN.md',
    'README_zh-TW.md',
    'README_de.md',
    'README_es.md',
    'README_fr.md',
    'README_ja.md',
    'README_ko.md',
    'README_pt.md',
    'README_ru.md',
    'README_tr.md'
  ]
};

function categoryForIndex(markdown, index) {
  const before = String(markdown || '').slice(0, index);
  const matches = [...before.matchAll(/^##\s+(.+)$/gm)];
  const heading = matches.length ? matches[matches.length - 1][1].trim() : 'Uncategorized';
  return heading.replace(/\s*Cases\s*$/i, ' Cases');
}

function parseReadme(language, content) {
  const sections = splitHeadingSections(content, /^###\s+Case\s+\d+:/);
  return sections.map((section, ordinal) => {
    const headingMatch = section.heading.match(/^###\s+Case\s+(\d+):\s*\[([^\]]+)\]\(([^)]+)\)\s*\(by\s*\[@([^\]]+)\]\(([^)]+)\)\)/);
    if (!headingMatch) return null;
    const promptFence = extractFencedCodeAfterLabel(section.content, ['Prompt', '提示词']);
    if (!promptFence?.code) return null;

    const images = extractHtmlImages(section.content);
    const caseNumber = Number(headingMatch[1]);
    const sourceUrl = headingMatch[3];
    const author = headingMatch[4];
    const authorUrl = headingMatch[5];
    const category = categoryForIndex(content, section.startIndex);

    return {
      caseNumber,
      ordinal,
      sourceUrl,
      category,
      localized: {
        [normalizeLanguageCode(language)]: {
          title: headingMatch[2].trim(),
          promptText: promptFence.code
        }
      },
      reference: {
        sourceKey: CONFIG.sourceKey,
        repo: CONFIG.repo,
        url: sourceUrl,
        originalId: `case-${caseNumber}`,
        authors: [{ name: author, url: authorUrl }],
        locations: [{ file: `README:${language}`, line: section.line }]
      },
      assets: images.map((image, index) => ({
        role: inferImageRole(image),
        upstreamPath: image.src,
        upstreamUrl: absolutizeGithubRaw(CONFIG.rawBaseUrl, image.src),
        alt: image.alt,
        index
      }))
    };
  }).filter(Boolean);
}

function parseEvolink({ readmes, metadata = { records: [] } }) {
  const byKey = new Map();
  const metaRecords = Array.isArray(metadata.records) ? metadata.records : [];

  for (const [language, content] of Object.entries(readmes || {})) {
    for (const item of parseReadme(language, content)) {
      const key = item.assets[0]?.upstreamPath || `${item.sourceUrl || 'case'}:${item.ordinal}`;
      if (!byKey.has(key)) {
        byKey.set(key, {
          sourceKey: CONFIG.sourceKey,
          repo: CONFIG.repo,
          originalId: `case-${item.caseNumber}`,
          primaryLanguage: 'en',
          localized: {},
          sourceCategories: [],
          tags: [],
          references: [item.reference],
          assets: item.assets,
          addedAt: null
        });
      }

      const record = byKey.get(key);
      Object.assign(record.localized, item.localized);

      const meta = metaRecords.find(entry => entry.tweet_url === item.sourceUrl);
      const category = meta?.category || item.category;
      if (category && !record.sourceCategories.some(existing => existing.value === category)) {
        record.sourceCategories.push({
          value: category,
          language: 'en',
          source: meta?.category ? 'upstream' : 'derived',
          sourceKey: CONFIG.sourceKey
        });
      }
      if (meta?.case_anchor) record.originalId = meta.case_anchor.replace(/^#/, '') || record.originalId;
      if (meta?.added_at) record.addedAt = meta.added_at;
    }
  }

  return Array.from(byKey.values());
}

function loadLocal(projectRoot) {
  const upstreamDir = path.join(projectRoot, 'upstream', 'evolink');
  const readmes = {};
  for (const file of CONFIG.readmeFiles) {
    const filePath = path.join(upstreamDir, file);
    if (fs.existsSync(filePath)) {
      readmes[languageFromReadme(file)] = readUtf8(filePath);
    }
  }
  const metaPath = path.join(upstreamDir, 'data', 'ingested_tweets.json');
  const metadata = fs.existsSync(metaPath) ? JSON.parse(readUtf8(metaPath)) : { records: [] };
  return { readmes, metadata };
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
  const metadata = JSON.parse(await fetchUrl(`${CONFIG.rawBaseUrl}/data/ingested_tweets.json`));
  return { readmes, metadata };
}

async function load({ projectRoot, mode }) {
  return mode === 'remote' ? loadRemote() : loadLocal(projectRoot);
}

module.exports = {
  CONFIG,
  parseEvolink,
  load
};
