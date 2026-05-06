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

const LOCALE_SUFFIXES = ['', '_zh-CN', '_zh-TW', '_de', '_es', '_fr', '_ja', '_ko', '_pt', '_ru', '_tr'];

const CASE_GROUPS = [
  { slug: 'ecommerce', category: 'E-commerce Cases' },
  { slug: 'ad-creative', category: 'Ad Creative Cases' },
  { slug: 'portrait', category: 'Portrait & Photography Cases' },
  { slug: 'poster', category: 'Poster & Illustration Cases' },
  { slug: 'character', category: 'Character Design Cases' },
  { slug: 'ui', category: 'UI & Social Media Mockup Cases' },
  { slug: 'comparison', category: 'Comparison & Community Examples' }
];

CONFIG.caseFiles = CASE_GROUPS.flatMap(group => LOCALE_SUFFIXES.map(suffix => `cases/${group.slug}${suffix}.md`));

function categoryForIndex(markdown, index) {
  const before = String(markdown || '').slice(0, index);
  const matches = [...before.matchAll(/^##\s+(.+)$/gm)];
  const heading = matches.length ? matches[matches.length - 1][1].trim() : 'Uncategorized';
  return heading.replace(/\s*Cases\s*$/i, ' Cases');
}

function categoryFromCaseFile(filePath) {
  const base = path.basename(filePath || '', '.md');
  const group = CASE_GROUPS.find(item => base === item.slug || base.startsWith(`${item.slug}_`));
  return group?.category || null;
}

function languageFromCaseFile(filePath) {
  const base = path.basename(filePath || '', '.md');
  const group = CASE_GROUPS.find(item => base === item.slug || base.startsWith(`${item.slug}_`));
  if (!group) return 'und';
  if (base === group.slug) return 'en';
  return normalizeLanguageCode(base.slice(group.slug.length + 1));
}

function parseReadme(language, content, options = {}) {
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
    const category = options.category || categoryForIndex(content, section.startIndex);
    const locationFile = options.file || `README:${language}`;

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
        locations: [{ file: locationFile, line: section.line }]
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

function caseNumberFromAnchor(anchor) {
  const match = String(anchor || '').match(/^#?case-(\d+)(?:\b|-)/i);
  return match ? Number(match[1]) : null;
}

function normalizeAssetPath(value) {
  return String(value || '')
    .replace(/\\/g, '/')
    .replace(/^\.\//, '')
    .replace(/\/+$/, '');
}

function metadataImageDirMatchesAssets(meta, assets) {
  const imageDir = normalizeAssetPath(meta?.image_dir);
  if (!imageDir) return false;
  return assets.some(asset => {
    const assetPath = normalizeAssetPath(asset.upstreamPath);
    const assetDir = assetPath.replace(/\/[^/]*$/, '');
    return assetDir === imageDir;
  });
}

function findMatchingMetadata(item, metaRecords) {
  const candidates = metaRecords.filter(entry => entry?.tweet_url === item.sourceUrl);
  if (!candidates.length) return null;

  return candidates.find(entry => caseNumberFromAnchor(entry.case_anchor) === item.caseNumber)
    || candidates.find(entry => metadataImageDirMatchesAssets(entry, item.assets))
    || candidates.find(entry => !entry.case_anchor && !entry.image_dir)
    || null;
}

function documentEntries(readmes, caseFiles) {
  if (Array.isArray(caseFiles) && caseFiles.length) {
    return caseFiles
      .filter(file => file?.content)
      .map(file => ({
        language: normalizeLanguageCode(file.language || languageFromCaseFile(file.path)),
        content: file.content,
        file: file.path,
        category: file.category || categoryFromCaseFile(file.path)
      }));
  }

  return Object.entries(readmes || {}).map(([language, content]) => ({
    language: normalizeLanguageCode(language),
    content,
    file: `README:${language}`,
    category: null
  }));
}

function keyForItem(item) {
  if (item.sourceUrl) return `${item.sourceUrl}#case-${item.caseNumber}`;
  return item.assets[0]?.upstreamPath || `case-${item.caseNumber}:${item.ordinal}`;
}

function assetCollisionKey(asset) {
  return normalizeAssetPath(asset.upstreamUrl || asset.upstreamPath);
}

function newestRecord(records) {
  const dated = records
    .map(record => ({ record, time: Date.parse(record.addedAt || '') }))
    .filter(item => Number.isFinite(item.time));
  if (dated.length !== records.length) return null;
  return dated.sort((left, right) => right.time - left.time)[0]?.record || null;
}

function dropAmbiguousDuplicateAssets(records) {
  const ownersByAsset = new Map();

  for (const record of records) {
    for (const asset of record.assets || []) {
      const key = assetCollisionKey(asset);
      if (!key) continue;
      if (!ownersByAsset.has(key)) ownersByAsset.set(key, []);
      ownersByAsset.get(key).push({ record, asset });
    }
  }

  for (const owners of ownersByAsset.values()) {
    const uniqueRecords = [...new Set(owners.map(owner => owner.record))];
    if (uniqueRecords.length < 2) continue;
    const keeper = newestRecord(uniqueRecords);
    for (const { record, asset } of owners) {
      if (keeper && record === keeper) continue;
      record.assets = record.assets.filter(candidate => candidate !== asset);
    }
  }

  return records;
}

function parseEvolink({ readmes, caseFiles, metadata = { records: [] } }) {
  const byKey = new Map();
  const metaRecords = Array.isArray(metadata.records) ? metadata.records : [];

  for (const document of documentEntries(readmes, caseFiles)) {
    for (const item of parseReadme(document.language, document.content, document)) {
      const key = keyForItem(item);
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

      const meta = findMatchingMetadata(item, metaRecords);
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

  return dropAmbiguousDuplicateAssets(Array.from(byKey.values()));
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
  const caseFiles = [];
  for (const file of CONFIG.caseFiles) {
    const filePath = path.join(upstreamDir, file);
    if (fs.existsSync(filePath)) {
      caseFiles.push({
        path: file.replace(/\\/g, '/'),
        language: languageFromCaseFile(file),
        category: categoryFromCaseFile(file),
        content: readUtf8(filePath)
      });
    }
  }
  const metaPath = path.join(upstreamDir, 'data', 'ingested_tweets.json');
  const metadata = fs.existsSync(metaPath) ? JSON.parse(readUtf8(metaPath)) : { records: [] };
  return { readmes, caseFiles, metadata };
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
  const caseFiles = [];
  for (const file of CONFIG.caseFiles) {
    try {
      caseFiles.push({
        path: file,
        language: languageFromCaseFile(file),
        category: categoryFromCaseFile(file),
        content: await fetchUrl(`${CONFIG.rawBaseUrl}/${file}`)
      });
    } catch {
      // Missing upstream locale files are expected.
    }
  }
  const metadata = JSON.parse(await fetchUrl(`${CONFIG.rawBaseUrl}/data/ingested_tweets.json`));
  return { readmes, caseFiles, metadata };
}

async function load({ projectRoot, mode }) {
  return mode === 'remote' ? loadRemote() : loadLocal(projectRoot);
}

module.exports = {
  CONFIG,
  parseEvolink,
  load
};
