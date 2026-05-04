#!/usr/bin/env node

const path = require('path');

const { ensureDir, readJson, writeJson } = require('../ingestion/core/persist');
const { uniqueBy } = require('../ingestion/core/text');
const { collectionForPrompt } = require('./collections');

const DEFAULT_CATALOG_LANGUAGES = ['en', 'zh-CN'];

function compact(items) {
  return (items || []).filter(item => item !== null && item !== undefined && item !== '');
}

function unique(items) {
  return Array.from(new Set(compact(items).map(item => String(item))));
}

function parseList(value, fallback = []) {
  if (Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean);
  if (!value) return fallback;
  return String(value).split(/[,\s]+/).map(item => item.trim()).filter(Boolean);
}

function languageFallbacks(language, fallbackLanguages = ['en']) {
  return unique([language, ...fallbackLanguages, 'en']).filter(item => item !== 'und');
}

function localizedCandidates(field) {
  if (!field || typeof field !== 'object') return [];
  return compact([
    field.original,
    ...Object.values(field.translations || {})
  ]).filter(item => item && typeof item.value === 'string' && item.value.trim());
}

function selectLocalizedValue(field, language, fallbackLanguages = ['en']) {
  const candidates = localizedCandidates(field);
  if (candidates.length === 0) {
    return {
      language,
      value: '',
      source: 'missing',
      isFallback: true
    };
  }

  const desiredLanguages = languageFallbacks(language, fallbackLanguages);
  for (const desiredLanguage of desiredLanguages) {
    const translation = field?.translations?.[desiredLanguage];
    if (translation?.value) {
      return {
        language: translation.language || desiredLanguage,
        value: translation.value,
        source: translation.source || 'unknown',
        isFallback: desiredLanguage !== language
      };
    }

    if (field?.original?.language === desiredLanguage && field.original.value) {
      return {
        language: field.original.language,
        value: field.original.value,
        source: field.original.source || 'upstream',
        isFallback: desiredLanguage !== language
      };
    }
  }

  const first = candidates[0];
  return {
    language: first.language || 'und',
    value: first.value,
    source: first.source || 'unknown',
    isFallback: first.language !== language
  };
}

function taxonomyKey(item) {
  return item.translationOf || item.id || `${item.language || 'und'}:${String(item.value || '').toLowerCase()}`;
}

function selectLocalizedTaxonomy(items, language, fallbackLanguages = ['en']) {
  const groups = new Map();
  for (const item of items || []) {
    if (!item?.value) continue;
    const key = taxonomyKey(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }

  const values = [];
  const desiredLanguages = languageFallbacks(language, fallbackLanguages);
  for (const groupItems of groups.values()) {
    let selected = null;
    for (const desiredLanguage of desiredLanguages) {
      selected = groupItems.find(item => item.language === desiredLanguage);
      if (selected) break;
    }
    values.push((selected || groupItems[0]).value);
  }

  return unique(values);
}

function normalizeAssetPath(localPath) {
  return String(localPath || '').replace(/\\/g, '/').replace(/^\/+/, '');
}

function joinUrl(baseUrl, relativePath) {
  if (!baseUrl || !relativePath) return null;
  return `${String(baseUrl).replace(/\/$/, '')}/${normalizeAssetPath(relativePath)}`;
}

function resolveAssetUrl(asset, options = {}) {
  if (!asset) return null;
  if (asset.status === 'cached' && asset.localPath) {
    return joinUrl(options.assetBaseUrl, asset.localPath) || asset.upstreamUrl || normalizeAssetPath(asset.localPath);
  }
  return asset.upstreamUrl || null;
}

function firstPreviewAsset(assets, options = {}) {
  return (assets || []).find(asset => asset.role === 'output' && resolveAssetUrl(asset, options))
    || (assets || []).find(asset => resolveAssetUrl(asset, options))
    || null;
}

function toCatalogAsset(asset, options = {}) {
  const url = resolveAssetUrl(asset, options);
  return {
    id: asset.id,
    role: asset.role || 'output',
    url,
    upstreamUrl: asset.upstreamUrl || null,
    localPath: asset.localPath || null,
    status: asset.status || 'pending',
    alt: asset.alt || ''
  };
}

function toCatalogPrompt(prompt, language, options = {}) {
  const fallbackLanguages = options.fallbackLanguages || [options.defaultLanguage || 'en'];
  const title = selectLocalizedValue(prompt.title, language, fallbackLanguages);
  const description = selectLocalizedValue(prompt.description, language, fallbackLanguages);
  const promptText = selectLocalizedValue(prompt.promptText, language, fallbackLanguages);
  const categories = selectLocalizedTaxonomy(prompt.categories, language, fallbackLanguages);
  const tags = selectLocalizedTaxonomy(prompt.tags, language, fallbackLanguages);
  const collection = collectionForPrompt({ ...prompt, title: title.value, description: description.value, categories, tags }, language);
  const assets = (prompt.assets || []).map(asset => toCatalogAsset(asset, options)).filter(asset => asset.url);
  const previewImage = resolveAssetUrl(firstPreviewAsset(prompt.assets || [], options), options);
  const authors = uniqueBy(
    (prompt.sources || []).flatMap(source => source.authors || []),
    author => `${author.name || ''}:${author.url || ''}`
  ).filter(author => author.name || author.url);
  const sourceUrls = unique((prompt.sources || []).map(source => source.url));
  const sourceRepos = unique((prompt.sources || []).map(source => source.repo || source.sourceKey));

  const searchText = unique([
    title.value,
    description.value,
    promptText.value,
    ...categories,
    ...tags,
    ...authors.map(author => author.name),
    ...sourceRepos
  ]).join(' ').toLowerCase();

  return {
    id: prompt.id,
    language,
    title: title.value || 'Untitled',
    description: description.value,
    promptText: promptText.value,
    collection,
    categories,
    tags,
    previewImage,
    assets,
    authors,
    sources: (prompt.sources || []).map(source => ({
      sourceKey: source.sourceKey || null,
      repo: source.repo || null,
      url: source.url || null,
      originalId: source.originalId || null
    })),
    sourceUrls,
    sourceRepos,
    sourceCount: (prompt.sources || []).length,
    addedAt: prompt.addedAt || null,
    updatedAt: prompt.updatedAt || null,
    localization: {
      title,
      description,
      promptText
    },
    searchText
  };
}

function buildSearchIndex(prompts, language) {
  return {
    generatedAt: new Date().toISOString(),
    language,
    index: prompts.map(prompt => ({
      id: prompt.id,
      title: prompt.title,
      categories: prompt.categories,
      tags: prompt.tags,
      text: prompt.searchText
    }))
  };
}

function sortedLocaleValues(values, language) {
  return unique(values).sort((a, b) => {
    try {
      return a.localeCompare(b, language);
    } catch (_error) {
      return a.localeCompare(b);
    }
  });
}

function buildTaxonomy(catalogDatasets, languages) {
  const categories = {};
  const tags = {};
  const collections = {};
  const authors = {};
  const sourceRepos = {};

  for (const language of languages) {
    const prompts = catalogDatasets[language] || [];
    collections[language] = sortedLocaleValues(prompts.map(prompt => prompt.collection?.title), language);
    categories[language] = sortedLocaleValues(prompts.flatMap(prompt => prompt.categories), language);
    tags[language] = sortedLocaleValues(prompts.flatMap(prompt => prompt.tags), language);
    authors[language] = sortedLocaleValues(prompts.flatMap(prompt => prompt.authors.map(author => author.name)), language);
    sourceRepos[language] = sortedLocaleValues(prompts.flatMap(prompt => prompt.sourceRepos), language);
  }

  return {
    generatedAt: new Date().toISOString(),
    languages,
    collections,
    categories,
    tags,
    authors,
    sourceRepos
  };
}

function buildManifest({ dataset, languages, defaultLanguage, taxonomyFile }) {
  const promptFiles = {};
  const searchFiles = {};
  for (const language of languages) {
    promptFiles[language] = `prompts.${language}.json`;
    searchFiles[language] = `search.${language}.json`;
  }

  return {
    schemaVersion: dataset.schemaVersion,
    generatedAt: new Date().toISOString(),
    defaultLanguage,
    languages,
    totalCount: dataset.prompts.length,
    sourceCount: dataset.sourceCount || {},
    files: {
      prompts: promptFiles,
      search: searchFiles,
      taxonomy: taxonomyFile
    }
  };
}

async function exportCatalogData(options = {}) {
  const projectRoot = options.projectRoot || path.join(__dirname, '..', '..');
  const canonicalFile = options.canonicalFile || path.join(projectRoot, 'data/canonical/prompts.json');
  const outputDir = options.outputDir || path.join(projectRoot, 'data/catalog');
  const dataset = options.dataset || readJson(canonicalFile);
  const languages = unique([
    options.defaultLanguage || 'en',
    ...parseList(options.languages, parseList(process.env.CATALOG_LANGUAGES || process.env.SITE_LANGUAGES, DEFAULT_CATALOG_LANGUAGES))
  ]);
  const defaultLanguage = options.defaultLanguage || languages[0] || 'en';
  const catalogDatasets = {};
  const assetBaseUrl = options.assetBaseUrl || process.env.PUBLIC_ASSET_BASE_URL || process.env.ASSET_BASE_URL || '';

  ensureDir(outputDir);

  for (const language of languages) {
    const fallbackLanguages = unique([defaultLanguage, ...languages]).filter(item => item !== language);
    const prompts = (dataset.prompts || []).map(prompt => toCatalogPrompt(prompt, language, {
      defaultLanguage,
      fallbackLanguages,
      assetBaseUrl
    }));

    catalogDatasets[language] = prompts;
    writeJson(path.join(outputDir, `prompts.${language}.json`), {
      schemaVersion: dataset.schemaVersion,
      generatedAt: dataset.generatedAt,
      exportedAt: new Date().toISOString(),
      language,
      defaultLanguage,
      totalCount: prompts.length,
      prompts
    });

    writeJson(path.join(outputDir, `search.${language}.json`), buildSearchIndex(prompts, language));
  }

  writeJson(path.join(outputDir, 'prompts.json'), {
    schemaVersion: dataset.schemaVersion,
    generatedAt: dataset.generatedAt,
    exportedAt: new Date().toISOString(),
    language: defaultLanguage,
    defaultLanguage,
    totalCount: catalogDatasets[defaultLanguage].length,
    prompts: catalogDatasets[defaultLanguage]
  });

  const taxonomy = buildTaxonomy(catalogDatasets, languages);
  writeJson(path.join(outputDir, 'taxonomy.json'), taxonomy);

  const manifest = buildManifest({
    dataset,
    languages,
    defaultLanguage,
    taxonomyFile: 'taxonomy.json'
  });
  writeJson(path.join(outputDir, 'manifest.json'), manifest);

  return {
    manifest,
    taxonomy,
    catalogDatasets
  };
}

function parseArgs(argv) {
  const args = {
    projectRoot: path.join(__dirname, '..', '..'),
    languages: parseList(process.env.CATALOG_LANGUAGES || process.env.SITE_LANGUAGES, DEFAULT_CATALOG_LANGUAGES),
    defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
    outputDir: null,
    assetBaseUrl: process.env.PUBLIC_ASSET_BASE_URL || process.env.ASSET_BASE_URL || ''
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--project-root') {
      args.projectRoot = path.resolve(argv[++i]);
    } else if (arg === '--languages' || arg === '--langs') {
      args.languages = parseList(argv[++i]);
    } else if (arg === '--default-language') {
      args.defaultLanguage = argv[++i];
    } else if (arg === '--output-dir') {
      args.outputDir = path.resolve(argv[++i]);
    } else if (arg === '--asset-base-url') {
      args.assetBaseUrl = argv[++i];
    }
  }

  return args;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const result = await exportCatalogData(args);
  console.log(`Exported ${result.manifest.totalCount} prompts for ${result.manifest.languages.join(', ')}.`);
  console.log(`Catalog data: ${path.relative(args.projectRoot, args.outputDir || path.join(args.projectRoot, 'data/catalog'))}`);
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.stack || error.message);
    process.exit(1);
  });
}

module.exports = {
  DEFAULT_CATALOG_LANGUAGES,
  exportCatalogData,
  resolveAssetUrl,
  selectLocalizedTaxonomy,
  selectLocalizedValue,
  toCatalogPrompt,
  buildSearchIndex,
  buildTaxonomy,
  parseArgs,
  main
};
