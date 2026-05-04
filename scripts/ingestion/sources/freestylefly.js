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
        localized: {
          'zh-CN': {
            title,
            promptText: promptFence.code
          }
        },
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

