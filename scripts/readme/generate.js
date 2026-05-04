#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { ensureDir, readJson } = require('../ingestion/core/persist');

const LANGUAGE_FILES = {
  en: 'README.md',
  'zh-CN': 'README_zh-CN.md'
};

const LABELS = {
  en: {
    title: 'awesome-image-prompts',
    intro: 'A curated, normalized, multilingual catalog of high-quality GPT image prompts collected from open-source projects.',
    generated: 'Generated',
    total: 'Total prompts',
    languages: 'Public data',
    contents: 'Collections',
    prompts: 'Prompts',
    featured: 'Featured Prompts',
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
    fullCatalog: 'The full catalog is split into collection documents to keep this README readable.',
    backToReadme: 'Back to README'
  },
  'zh-CN': {
    title: 'awesome-image-prompts',
    intro: '一个从多个开源项目整理、标准化并支持多语言的高质量 GPT 图像提示词目录。',
    generated: '生成时间',
    total: '提示词总数',
    languages: '公开数据',
    contents: '分类集合',
    prompts: '提示词',
    featured: '精选提示词',
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
    fullCatalog: '完整提示词已按分类拆分到子文档，避免 README 过大。',
    backToReadme: '返回 README'
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
  return language === 'zh-CN' ? `docs/zh-CN/${slug}.md` : `docs/${slug}.md`;
}

function docsFilePath(projectRoot, language, slug) {
  return path.join(projectRoot, ...docsPath(language, slug).split('/'));
}

function renderPrompt(prompt, index, labels, options = {}) {
  const lines = [];
  const title = prompt.title || `Prompt ${index + 1}`;
  const sourceUrl = firstSourceUrl(prompt);
  const categories = (prompt.categories || []).join(', ') || 'Uncategorized';
  const tags = (prompt.tags || []).join(', ');

  lines.push(`${options.headingLevel || '###'} ${index + 1}. ${title}`);
  lines.push('');

  if (prompt.previewImage) {
    lines.push(`![${title}](${prompt.previewImage})`);
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
  const lines = [];

  lines.push(`# ${labels.title}`);
  lines.push('');
  lines.push(labels.intro);
  lines.push('');
  lines.push(`- ${labels.generated}: ${dataset.exportedAt || dataset.generatedAt || new Date().toISOString()}`);
  lines.push(`- ${labels.total}: ${dataset.totalCount || prompts.length}`);
  lines.push(`- ${labels.languages}: ${labels.websiteData}`);
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

  prompts.slice(0, 12).forEach((prompt, index) => {
    lines.push(`<a id="${promptAnchor(prompt, index)}"></a>`);
    lines.push('');
    lines.push(`### ${index + 1}. ${prompt.title || `Prompt ${index + 1}`}`);
    lines.push('');
    if (prompt.previewImage) {
      lines.push(`![${prompt.title || `Prompt ${index + 1}`}](${prompt.previewImage})`);
      lines.push('');
    }
    if (prompt.description) {
      lines.push(prompt.description);
      lines.push('');
    }
    lines.push(`- **${labels.categories}:** ${(prompt.categories || []).join(', ') || 'Uncategorized'}`);
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

  lines.push(`# ${collectionTitle(slug, language)}`);
  lines.push('');
  lines.push(`[${labels.backToReadme}](${language === 'zh-CN' ? '../../README_zh-CN.md' : '../README.md'})`);
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
    const fileName = LANGUAGE_FILES[language];
    if (!fileName) continue;
    const dataset = readDataset(projectRoot, language);
    const outputPath = path.join(projectRoot, fileName);
    ensureDir(path.dirname(outputPath));
    fs.writeFileSync(outputPath, buildReadme(dataset, { language }), 'utf-8');
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
