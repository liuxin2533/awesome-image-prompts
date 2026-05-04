const fs = require('fs');
const path = require('path');
const {
  extractFencedCodeAfterLabel,
  extractMarkdownImages,
  splitHeadingSections
} = require('../core/markdown');
const {
  absolutizeGithubRaw,
  fetchUrl,
  inferImageRole,
  parseMarkdownLink,
  readUtf8
} = require('./utils');

const CONFIG = {
  sourceKey: 'freestylefly',
  name: 'freestylefly',
  repo: 'freestylefly/awesome-gpt-image-2',
  branch: 'main',
  rawBaseUrl: 'https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main',
  galleryFiles: ['docs/gallery-part-1.md', 'docs/gallery-part-2.md']
};

function extractSource(sectionContent) {
  const match = sectionContent.match(/\*\*来源：\*\*\s*(.+)/);
  const raw = match ? match[1].trim() : '未提供';
  const link = parseMarkdownLink(raw);

  if (link) {
    return {
      raw,
      authors: [{ name: link.text.replace(/^@/, '').replace(/\\/g, ''), url: link.href }]
    };
  }

  const xhsMatch = raw.match(/小红书号\s*([^\s]+)/);
  if (xhsMatch) {
    return {
      raw,
      authors: [{ name: xhsMatch[1].replace(/\\/g, ''), url: null }]
    };
  }

  return { raw, authors: raw === '未提供' ? [] : [{ name: raw.replace(/\\/g, ''), url: null }] };
}

function derivedCategories(title) {
  return [{
    value: title,
    language: 'zh-CN',
    source: 'derived',
    sourceKey: CONFIG.sourceKey
  }];
}

function languageFromPromptLabel(label) {
  const normalized = String(label || '').trim().toLowerCase();
  if (normalized === '中文' || normalized === 'chinese') return 'zh-CN';
  if (normalized === '英文' || normalized === 'english') return 'en';
  return null;
}

function splitLabeledPromptText(promptText) {
  const text = String(promptText || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  const labelPattern = /^[ \t]*\[(中文|Chinese|英文|English)\][ \t]*$/gim;
  const matches = [...text.matchAll(labelPattern)];
  if (!matches.length) return null;
  if (text.slice(0, matches[0].index).trim()) return null;

  const sections = {};
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const language = languageFromPromptLabel(match[1]);
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? text.length;
    const value = text.slice(start, end).trim();
    if (language && value && !sections[language]) {
      sections[language] = value;
    }
  }

  return Object.keys(sections).length ? sections : null;
}

function buildLocalizedPrompt(title, promptText) {
  const splitPrompt = splitLabeledPromptText(promptText);
  if (!splitPrompt) {
    return {
      'zh-CN': {
        title,
        promptText
      }
    };
  }

  const localized = {};
  for (const [language, value] of Object.entries(splitPrompt)) {
    localized[language] = { promptText: value };
  }

  if (localized['zh-CN']) {
    localized['zh-CN'].title = title;
  } else {
    localized['zh-CN'] = { title, promptText };
  }

  return localized;
}

function parseFreestylefly({ files }) {
  const records = [];

  for (const file of files || []) {
    const sections = splitHeadingSections(file.content, /^###\s+例\s+\d+：/);
    for (const section of sections) {
      const headingMatch = section.heading.match(/^###\s+例\s+(\d+)：(.+)$/);
      if (!headingMatch) continue;

      const caseNumber = Number(headingMatch[1]);
      const title = headingMatch[2].trim();
      const promptFence = extractFencedCodeAfterLabel(section.content, ['提示词', 'Prompt']);
      if (!promptFence?.code) continue;

      const source = extractSource(section.content);
      const images = extractMarkdownImages(section.content);

      records.push({
        sourceKey: CONFIG.sourceKey,
        repo: CONFIG.repo,
        originalId: `case-${caseNumber}`,
        primaryLanguage: 'zh-CN',
        localized: buildLocalizedPrompt(title, promptFence.code),
        sourceCategories: derivedCategories(title),
        tags: [],
        references: [{
          sourceKey: CONFIG.sourceKey,
          repo: CONFIG.repo,
          url: `https://github.com/${CONFIG.repo}#case-${caseNumber}`,
          originalId: `case-${caseNumber}`,
          authors: source.authors,
          locations: [{ file: file.path, line: section.line }],
          rawSource: source.raw
        }],
        assets: images.map((image, index) => ({
          role: inferImageRole(image),
          upstreamPath: image.src,
          upstreamUrl: absolutizeGithubRaw(CONFIG.rawBaseUrl, image.src),
          alt: image.alt,
          index
        })),
        addedAt: null
      });
    }
  }

  return records;
}

function loadLocal(projectRoot) {
  const upstreamDir = path.join(projectRoot, 'upstream', 'freestylefly');
  return {
    files: CONFIG.galleryFiles
      .map(file => ({ path: file, filePath: path.join(upstreamDir, file) }))
      .filter(item => fs.existsSync(item.filePath))
      .map(item => ({ path: item.path, content: readUtf8(item.filePath) }))
  };
}

async function loadRemote() {
  const files = [];
  for (const file of CONFIG.galleryFiles) {
    files.push({
      path: file,
      content: await fetchUrl(`${CONFIG.rawBaseUrl}/${file}`)
    });
  }
  return { files };
}

async function load({ projectRoot, mode }) {
  return mode === 'remote' ? loadRemote() : loadLocal(projectRoot);
}

module.exports = {
  CONFIG,
  parseFreestylefly,
  load
};
