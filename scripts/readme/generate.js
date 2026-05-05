#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { ensureDir, readJson } = require('../ingestion/core/persist');

const SITE_URL = 'https://gptimages.dev';

const LANGUAGE_FILES = {
  en: 'README.md',
  'zh-CN': 'README_zh-CN.md'
};

const LANGUAGE_NAMES = {
  en: { en: 'English', 'zh-CN': '英文' },
  'zh-CN': { en: 'Simplified Chinese', 'zh-CN': '简体中文' }
};

const LABELS = {
  en: {
    title: 'awesome-image-prompts',
    intro: 'A curated, normalized, multilingual catalog of high-quality GPT image prompts collected from open-source projects.',
    tagline: 'Reusable GPT image prompt patterns, normalized for GitHub, JSON, and gptimages.dev.',
    repositoryCopy: 'The Markdown files in this repository are generated from the standardized public catalog data, so the GitHub docs, JSON exports, and website experience stay aligned.',
    website: 'Website',
    websiteCopy: `Use [gptimages.dev](${SITE_URL}) to browse, search, filter, and copy these prompts. The site is built on this catalog and is the fastest way to explore prompt patterns by category, language, and source.`,
    catalogSnapshot: 'Catalog Snapshot',
    generated: 'Generated',
    total: 'Total prompts',
    languages: 'Languages',
    publicData: 'Public data',
    contents: 'Collections',
    prompts: 'Prompts',
    featured: 'Featured Prompts',
    featuredIntro: 'A compact sample from the catalog. Open any collection to read the complete prompt text.',
    category: 'Category',
    categories: 'Categories',
    tags: 'Tags',
    source: 'Source',
    prompt: 'Prompt',
    count: 'Count',
    open: 'Open',
    dataContract: 'Data Contract',
    upstreamSources: 'Upstream Sources',
    websiteData: 'Machine-readable catalog data is available under `data/catalog/`.',
    fullCatalog: 'Every prompt body is generated into the collection documents below. The root README stays compact while the split files keep the full catalog easy to navigate.',
    collectionIntro: `This file contains every prompt assigned to this collection. For visual browsing and quick copying, open [gptimages.dev](${SITE_URL}).`,
    backToReadme: 'Back to README',
    uncategorized: 'Uncategorized',
    badgeWebsite: 'Website',
    badgeDataset: 'Dataset',
    badgePrompts: 'Prompts',
    badgeLanguages: 'Languages'
  },
  'zh-CN': {
    title: 'awesome-image-prompts',
    intro: '一个从多个开源项目整理、标准化并支持多语言的高质量 GPT 图像提示词目录。',
    tagline: '可复用的 GPT 图像提示词模式，统一生成 GitHub 文档、JSON 数据和 gptimages.dev 网站内容。',
    repositoryCopy: '本仓库中的 Markdown 文档由标准化公开目录数据自动生成，确保 GitHub 文档、JSON 导出文件和网站体验保持一致。',
    website: '网站',
    websiteCopy: `你可以在 [gptimages.dev](${SITE_URL}) 浏览、搜索、筛选和复制这些提示词。网站基于本目录数据构建，更适合按分类、语言和来源快速查找可用的图像生成 prompt。`,
    catalogSnapshot: '目录概览',
    generated: '生成时间',
    total: '提示词总数',
    languages: '语言',
    publicData: '公开数据',
    contents: '分类集合',
    prompts: '提示词',
    featured: '精选提示词',
    featuredIntro: '这里展示一部分精选条目；打开任意分类文档即可查看完整提示词正文。',
    category: '分类',
    categories: '分类',
    tags: '标签',
    source: '来源',
    prompt: '提示词',
    count: '数量',
    open: '打开',
    dataContract: '数据结构',
    upstreamSources: '上游来源',
    websiteData: '机器可读的公开目录数据位于 `data/catalog/`。',
    fullCatalog: '每一条提示词正文都会生成到下面的分类文档中；根 README 保持简洁，拆分文件保留完整目录，方便浏览。',
    collectionIntro: `本文档包含归入此分类的全部提示词。如需可视化浏览和快速复制，可以打开 [gptimages.dev](${SITE_URL})。`,
    backToReadme: '返回 README',
    uncategorized: '未分类',
    badgeWebsite: '网站',
    badgeDataset: '数据集',
    badgePrompts: '提示词',
    badgeLanguages: '语言'
  }
};

const COLLECTIONS = [
  {
    slug: 'poster-illustration',
    title: { en: 'Poster & Illustration', 'zh-CN': '海报与插画' },
    keywords: ['poster', 'illustration', 'anime', '海报', '插画', '古风', '节气', '电影海报']
  },
  {
    slug: 'product-marketing',
    title: { en: 'Product & Marketing', 'zh-CN': '产品与营销' },
    keywords: ['product', 'marketing', 'e-commerce', 'amazon', '商品', '产品', '营销', '电商', '详情页', '主图', '口红', '咖啡机']
  },
  {
    slug: 'ui-social-media',
    title: { en: 'UI & Social Media', 'zh-CN': 'UI 与社交媒体' },
    keywords: ['ui', 'interface', 'social', 'mockup', 'youtube', 'thumbnail', '界面', '小红书', '抖音', '社交', '主页']
  },
  {
    slug: 'photography-portrait',
    title: { en: 'Photography & Portrait', 'zh-CN': '摄影与人像' },
    keywords: ['photography', 'portrait', 'photo', 'camera', '摄影', '人像', '写真', '写实']
  },
  {
    slug: 'infographic-education',
    title: { en: 'Infographic & Education', 'zh-CN': '信息图与教育' },
    keywords: ['infographic', 'diagram', 'chart', 'map', 'education', '信息图', '可视化', '图谱', '拆解', '课本', '报告', '技术']
  },
  {
    slug: 'character-design',
    title: { en: 'Character Design', 'zh-CN': '角色设计' },
    keywords: ['character', 'mascot', 'card', 'profile', '角色', '人物', '吉祥物', '卡牌', '圣斗士']
  },
  {
    slug: 'brand-logo',
    title: { en: 'Brand & Logo', 'zh-CN': '品牌与标志' },
    keywords: ['brand', 'logo', 'identity', '品牌', '标志', '徽标']
  },
  {
    slug: 'comic-story',
    title: { en: 'Comic & Story', 'zh-CN': '漫画与叙事' },
    keywords: ['comic', 'story', 'manga', '漫画', '分镜', '故事']
  },
  {
    slug: 'architecture-interior',
    title: { en: 'Architecture & Interior', 'zh-CN': '建筑与空间' },
    keywords: ['architecture', 'interior', 'building', 'room', '建筑', '室内', '空间']
  },
  {
    slug: 'general',
    title: { en: 'General', 'zh-CN': '通用' },
    keywords: []
  }
];

function labelsFor(language) {
  return LABELS[language] || LABELS.en;
}

function readmeFileName(language) {
  return LANGUAGE_FILES[language] || `README_${language}.md`;
}

function languageName(language, displayLanguage = 'en') {
  return LANGUAGE_NAMES[language]?.[displayLanguage] || LANGUAGE_NAMES[language]?.en || language;
}

function languageLinks(language, languages = Object.keys(LANGUAGE_FILES)) {
  return languages
    .map(item => `[${languageName(item, language)}](${readmeFileName(item)})`)
    .join(' / ');
}

function badgeSegment(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/-/g, '--');
}

function shield(label, message, color, href) {
  const image = `https://img.shields.io/badge/${badgeSegment(label)}-${badgeSegment(message)}-${color}`;
  return `[![${label}: ${message}](${image})](${href})`;
}

function sectionAnchor(title) {
  return `#${String(title || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')}`;
}

function renderHeader(dataset, labels, language, languages) {
  const total = dataset.totalCount || dataset.prompts?.length || 0;
  const lines = [];

  lines.push('<div align="center">');
  lines.push('');
  lines.push(`# ${labels.title}`);
  lines.push('');
  lines.push(labels.tagline);
  lines.push('');
  lines.push([
    shield(labels.badgeWebsite, 'gptimages.dev', 'black', SITE_URL),
    shield(labels.badgeDataset, 'JSON', 'orange', 'data/catalog/'),
    shield(labels.badgePrompts, total, 'blue', sectionAnchor(labels.contents)),
    shield(labels.badgeLanguages, languages.length, 'green', readmeFileName(language))
  ].join(' '));
  lines.push('');
  lines.push(languageLinks(language, languages));
  lines.push('');
  lines.push('</div>');

  return lines.join('\n');
}

function escapeAttribute(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderPreviewImage(url, alt, width) {
  return `<img src="${escapeAttribute(url)}" alt="${escapeAttribute(alt)}" width="${width}">`;
}

function collectionDefinition(slug) {
  return COLLECTIONS.find(collection => collection.slug === slug) || COLLECTIONS[COLLECTIONS.length - 1];
}

function collectionTitle(slug, language = 'en') {
  const collection = collectionDefinition(slug);
  return collection.title[language] || collection.title.en;
}

function collectionSlug(prompt) {
  if (prompt.collection?.slug) return prompt.collection.slug;

  const haystack = [
    prompt.title,
    prompt.description,
    ...(prompt.categories || []),
    ...(prompt.tags || [])
  ].join(' ').toLowerCase();

  const match = COLLECTIONS.find(collection =>
    collection.slug !== 'general'
    && collection.keywords.some(keyword => haystack.includes(keyword.toLowerCase()))
  );

  return match?.slug || 'general';
}

function fenceCode(value) {
  const text = String(value || '')
    .trim()
    .split(/\r?\n/)
    .map(line => line.replace(/[ \t]+$/g, ''))
    .join('\n');
  const longest = Math.max(3, ...Array.from(text.matchAll(/`+/g)).map(match => match[0].length + 1));
  const fence = '`'.repeat(longest);
  return `${fence}text\n${text}\n${fence}`;
}

function firstSourceUrl(prompt) {
  return prompt.sourceUrls?.[0] || prompt.sources?.find(source => source.url)?.url || null;
}

function sourceLabel(prompt) {
  return prompt.sourceRepos?.[0] || prompt.sources?.[0]?.repo || prompt.sources?.[0]?.sourceKey || 'upstream';
}

function promptAnchor(prompt, index) {
  const id = String(prompt.id || '').replace(/^prompt_/, '');
  return id ? `prompt-${id}` : `prompt-${index + 1}`;
}

function categorySummary(prompts) {
  const counts = new Map();
  for (const prompt of prompts || []) {
    const slug = collectionSlug(prompt);
    counts.set(slug, (counts.get(slug) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug));
}

function docsPath(language, slug) {
  return language === 'en' ? `docs/${slug}.md` : `docs/${language}/${slug}.md`;
}

function docsFilePath(projectRoot, language, slug) {
  return path.join(projectRoot, ...docsPath(language, slug).split('/'));
}

function renderPrompt(prompt, index, labels, options = {}) {
  const lines = [];
  const title = prompt.title || `Prompt ${index + 1}`;
  const sourceUrl = firstSourceUrl(prompt);
  const categories = (prompt.categories || []).join(', ') || labels.uncategorized;
  const tags = (prompt.tags || []).join(', ');

  lines.push(`${options.headingLevel || '###'} ${index + 1}. ${title}`);
  lines.push('');

  if (prompt.previewImage) {
    lines.push(renderPreviewImage(prompt.previewImage, title, options.imageWidth || 480));
    lines.push('');
  }

  if (prompt.description) {
    lines.push(prompt.description);
    lines.push('');
  }

  lines.push(`- **${labels.categories}:** ${categories}`);
  if (tags) lines.push(`- **${labels.tags}:** ${tags}`);
  if (sourceUrl) {
    lines.push(`- **${labels.source}:** [${sourceLabel(prompt)}](${sourceUrl})`);
  } else {
    lines.push(`- **${labels.source}:** ${sourceLabel(prompt)}`);
  }
  lines.push('');
  lines.push(`**${labels.prompt}:**`);
  lines.push('');
  lines.push(fenceCode(prompt.promptText || ''));
  lines.push('');

  return lines.join('\n');
}

function buildReadme(dataset, options = {}) {
  const language = options.language || dataset.language || 'en';
  const labels = labelsFor(language);
  const prompts = dataset.prompts || [];
  const languages = options.languages?.length ? options.languages : dataset.languages || Object.keys(LANGUAGE_FILES);
  const lines = [];

  lines.push(renderHeader(dataset, labels, language, languages));
  lines.push('');
  lines.push(labels.intro);
  lines.push('');
  lines.push(labels.repositoryCopy);
  lines.push('');
  lines.push(`## ${labels.website}`);
  lines.push('');
  lines.push(labels.websiteCopy);
  lines.push('');
  lines.push(`## ${labels.catalogSnapshot}`);
  lines.push('');
  lines.push(`- ${labels.generated}: ${dataset.exportedAt || dataset.generatedAt || new Date().toISOString()}`);
  lines.push(`- ${labels.total}: ${dataset.totalCount || prompts.length}`);
  lines.push(`- ${labels.languages}: ${languageLinks(language, languages)}`);
  lines.push(`- ${labels.publicData}: ${labels.websiteData}`);
  lines.push(`- ${labels.prompts}: ${labels.fullCatalog}`);
  lines.push('');

  lines.push(`## ${labels.contents}`);
  lines.push('');
  lines.push(`| ${labels.category} | ${labels.count} | ${labels.open} |`);
  lines.push('| --- | ---: | --- |');
  for (const item of categorySummary(prompts)) {
    lines.push(`| ${collectionTitle(item.slug, language)} | ${item.count} | [${labels.open}](${docsPath(language, item.slug)}) |`);
  }
  lines.push('');
  lines.push(`## ${labels.featured}`);
  lines.push('');
  lines.push(labels.featuredIntro);
  lines.push('');

  prompts.slice(0, 12).forEach((prompt, index) => {
    lines.push(`<a id="${promptAnchor(prompt, index)}"></a>`);
    lines.push('');
    lines.push(`### ${index + 1}. ${prompt.title || `Prompt ${index + 1}`}`);
    lines.push('');
    if (prompt.previewImage) {
      lines.push(renderPreviewImage(prompt.previewImage, prompt.title || `Prompt ${index + 1}`, 360));
      lines.push('');
    }
    if (prompt.description) {
      lines.push(prompt.description);
      lines.push('');
    }
    lines.push(`- **${labels.categories}:** ${(prompt.categories || []).join(', ') || labels.uncategorized}`);
    lines.push(`- **${labels.source}:** ${firstSourceUrl(prompt) ? `[${sourceLabel(prompt)}](${firstSourceUrl(prompt)})` : sourceLabel(prompt)}`);
    lines.push(`- **${labels.prompt}:** [${labels.open}](${docsPath(language, collectionSlug(prompt))}#${promptAnchor(prompt, index)})`);
    lines.push('');
  });

  lines.push(`## ${labels.dataContract}`);
  lines.push('');
  lines.push('- `data/catalog/manifest.json`');
  lines.push('- `data/catalog/prompts.<lang>.json`');
  lines.push('- `data/catalog/search.<lang>.json`');
  lines.push('- `data/catalog/taxonomy.json`');
  lines.push('');
  lines.push(`## ${labels.upstreamSources}`);
  lines.push('');
  for (const source of sourceSummary(prompts)) {
    lines.push(`- ${source.repo}: ${source.count}`);
  }

  return `${lines.join('\n').replace(/\n{4,}/g, '\n\n\n').trim()}\n`;
}

function sourceSummary(prompts) {
  const counts = new Map();
  for (const prompt of prompts || []) {
    for (const repo of prompt.sourceRepos || []) {
      counts.set(repo, (counts.get(repo) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([repo, count]) => ({ repo, count }))
    .sort((a, b) => b.count - a.count || a.repo.localeCompare(b.repo));
}

function groupPrompts(prompts) {
  const groups = new Map();
  for (const prompt of prompts || []) {
    const slug = collectionSlug(prompt);
    if (!groups.has(slug)) groups.set(slug, []);
    groups.get(slug).push(prompt);
  }
  return Array.from(groups.entries())
    .map(([slug, items]) => ({ slug, prompts: items }))
    .sort((a, b) => collectionTitle(a.slug).localeCompare(collectionTitle(b.slug)));
}

function buildCollectionDoc(dataset, slug, prompts, options = {}) {
  const language = options.language || dataset.language || 'en';
  const labels = labelsFor(language);
  const lines = [];
  const readmePath = language === 'en' ? '../README.md' : `../../${readmeFileName(language)}`;

  lines.push(`# ${collectionTitle(slug, language)}`);
  lines.push('');
  lines.push(`[${labels.backToReadme}](${readmePath})`);
  lines.push('');
  lines.push(labels.collectionIntro);
  lines.push('');
  lines.push(`- ${labels.total}: ${prompts.length}`);
  lines.push(`- ${labels.generated}: ${dataset.exportedAt || dataset.generatedAt || new Date().toISOString()}`);
  lines.push('');
  lines.push(`## ${labels.prompts}`);
  lines.push('');

  prompts.forEach((prompt, index) => {
    lines.push(`<a id="${promptAnchor(prompt, index)}"></a>`);
    lines.push('');
    lines.push(renderPrompt(prompt, index, labels, { headingLevel: '###' }));
  });

  return `${lines.join('\n').replace(/\n{4,}/g, '\n\n\n').trim()}\n`;
}

function readDataset(projectRoot, language) {
  return readJson(path.join(projectRoot, 'data', 'catalog', `prompts.${language}.json`));
}

async function generateReadmes(options = {}) {
  const projectRoot = options.projectRoot || path.join(__dirname, '..', '..');
  const languages = options.languages?.length ? options.languages : ['en', 'zh-CN'];
  const files = [];

  for (const language of languages) {
    const fileName = readmeFileName(language);
    const dataset = readDataset(projectRoot, language);
    const outputPath = path.join(projectRoot, fileName);
    ensureDir(path.dirname(outputPath));
    fs.writeFileSync(outputPath, buildReadme(dataset, { language, languages }), 'utf-8');
    files.push(fileName);

    for (const group of groupPrompts(dataset.prompts || [])) {
      const docPath = docsFilePath(projectRoot, language, group.slug);
      ensureDir(path.dirname(docPath));
      fs.writeFileSync(docPath, buildCollectionDoc(dataset, group.slug, group.prompts, { language }), 'utf-8');
      files.push(docsPath(language, group.slug));
    }
  }

  return { files };
}

function parseList(value, fallback = []) {
  if (!value) return fallback;
  return String(value).split(/[,\s]+/).map(item => item.trim()).filter(Boolean);
}

function parseArgs(argv) {
  const args = {
    projectRoot: path.join(__dirname, '..', '..'),
    languages: parseList(process.env.README_LANGUAGES, ['en', 'zh-CN'])
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--project-root') {
      args.projectRoot = path.resolve(argv[++i]);
    } else if (arg === '--languages' || arg === '--langs') {
      args.languages = parseList(argv[++i]);
    }
  }

  return args;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const result = await generateReadmes(args);
  console.log(`Generated ${result.files.join(', ')}.`);
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.stack || error.message);
    process.exit(1);
  });
}

module.exports = {
  buildReadme,
  buildCollectionDoc,
  collectionSlug,
  fenceCode,
  generateReadmes,
  parseArgs,
  main
};
