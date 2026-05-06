#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { normalizeLanguageCode } = require('./core/text');
const { readCanonicalDataset, writeCanonicalDataset, writeJson } = require('./core/persist');

const CATEGORY_RULES_VERSION = '2026-05-06';

const DEFAULT_CATEGORY_RULES = {
  schemaVersion: CATEGORY_RULES_VERSION,
  categories: [
    {
      id: 'poster-illustration',
      title: { en: 'Poster & Illustration', 'zh-CN': '海报与插画' },
      keywords: ['poster', 'illustration', 'anime', 'movie poster', '海报', '插画', '古风', '节气', '电影海报']
    },
    {
      id: 'product-marketing',
      title: { en: 'Product & Marketing', 'zh-CN': '产品与营销' },
      keywords: ['product', 'marketing', 'e-commerce', 'ecommerce', 'amazon', '商品', '产品', '营销', '电商', '详情页', '主图', '口红', '咖啡机']
    },
    {
      id: 'ui-social-media',
      title: { en: 'UI & Social Media', 'zh-CN': 'UI 与社交媒体' },
      keywords: ['ui', 'interface', 'social', 'mockup', 'youtube', 'thumbnail', '界面', '小红书', '抖音', '社交', '主页']
    },
    {
      id: 'photography-portrait',
      title: { en: 'Photography & Portrait', 'zh-CN': '摄影与人像' },
      keywords: ['photography', 'portrait', 'photo', 'camera', '摄影', '人像', '写真', '写实']
    },
    {
      id: 'infographic-education',
      title: { en: 'Infographic & Education', 'zh-CN': '信息图与教育' },
      keywords: ['infographic', 'diagram', 'chart', 'map', 'education', '信息图', '可视化', '图谱', '拆解', '课本', '报告', '技术']
    },
    {
      id: 'character-design',
      title: { en: 'Character Design', 'zh-CN': '角色设计' },
      keywords: ['character', 'mascot', 'card', 'profile', '角色', '人物', '吉祥物', '卡牌', '圣斗士']
    },
    {
      id: 'brand-logo',
      title: { en: 'Brand & Logo', 'zh-CN': '品牌与标志' },
      keywords: ['brand', 'logo', 'identity', '品牌', '标志', '徽标']
    },
    {
      id: 'comic-story',
      title: { en: 'Comic & Story', 'zh-CN': '漫画与叙事' },
      keywords: ['comic', 'story', 'manga', '漫画', '分镜', '故事']
    },
    {
      id: 'game-entertainment',
      title: { en: 'Game & Entertainment', 'zh-CN': '游戏与娱乐' },
      keywords: ['game', 'gameplay', 'gaming', 'league of legends', 'gta', 'minecraft', 'rust', 'hitman', 'among us', 'counter-strike', 'terraria', 'pixel art', 'black myth', 'wukong', '游戏', '娱乐', '英雄联盟', '黑神话', '悟空', '我的世界', '像素风'],
      aliases: ['Game & Entertainment', '游戏与娱乐', '遊戲與娛樂', 'ゲーム・エンターテインメント', '게임과 엔터테인먼트', 'Jeu et divertissement', 'Spiele und Unterhaltung', 'Juegos y entretenimiento']
    },
    {
      id: 'video-animation-collage',
      title: { en: 'Video, Animation & Collage', 'zh-CN': '视频、动画与拼贴' },
      keywords: ['movie collage', 'film collage', 'animation collage', 'collage', '拼贴'],
      aliases: ['Video, Animation & Collage', '视频、动画与拼贴', '影片、動畫與拼貼', '動画・アニメーション・コラージュ', '영상, 애니메이션, 콜라주', 'Vidéo, animation et collage', 'Video, Animation und Collage', 'Video, animación y collage']
    },
    {
      id: 'architecture-interior',
      title: { en: 'Architecture & Interior', 'zh-CN': '建筑与空间' },
      keywords: ['architecture', 'interior', 'building', 'room', '建筑', '室内', '空间']
    },
    {
      id: 'general',
      title: { en: 'General', 'zh-CN': '通用' },
      keywords: []
    }
  ]
};

function defaultProjectRoot() {
  return path.join(__dirname, '..', '..');
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function categoryRulesPath(projectRoot = defaultProjectRoot()) {
  return path.join(projectRoot, 'data', 'canonical', 'category-rules.json');
}

function normalizeRules(rules) {
  const source = rules && Array.isArray(rules.categories) ? rules : DEFAULT_CATEGORY_RULES;
  return {
    schemaVersion: source.schemaVersion || CATEGORY_RULES_VERSION,
    categories: source.categories
      .filter(category => category?.id && category?.title)
      .map(category => ({
        id: String(category.id),
        title: { ...(category.title || {}) },
        keywords: (category.keywords || []).map(item => String(item).trim()).filter(Boolean),
        aliases: (category.aliases || []).map(item => String(item).trim()).filter(Boolean)
      }))
  };
}

function readCategoryRules(projectRoot = defaultProjectRoot()) {
  const filePath = categoryRulesPath(projectRoot);
  if (!fs.existsSync(filePath)) return normalizeRules(DEFAULT_CATEGORY_RULES);
  return normalizeRules(JSON.parse(fs.readFileSync(filePath, 'utf-8')));
}

function writeCategoryRules(projectRoot, rules) {
  const normalized = normalizeRules(rules);
  writeJson(categoryRulesPath(projectRoot), normalized);
  return normalized;
}

function categoryById(rules, categoryId) {
  return (rules.categories || []).find(category => category.id === categoryId) || null;
}

function categoryItems(category, source = 'derived') {
  const languages = Object.keys(category.title || {}).map(normalizeLanguageCode);
  const primaryLanguage = languages.includes('en') ? 'en' : languages[0] || 'en';
  const primaryValue = category.title[primaryLanguage] || category.title.en || category.id;
  const items = [{
    id: category.id,
    value: primaryValue,
    language: primaryLanguage,
    source,
    taxonomy: 'canonical'
  }];

  for (const [language, value] of Object.entries(category.title || {})) {
    const normalizedLanguage = normalizeLanguageCode(language);
    if (normalizedLanguage === primaryLanguage || !value) continue;
    items.push({
      id: `${category.id}-${normalizedLanguage.toLowerCase()}`,
      value,
      language: normalizedLanguage,
      source,
      taxonomy: 'canonical',
      translationOf: category.id
    });
  }

  return items;
}

function localizedText(field) {
  return [
    field?.original?.value,
    ...Object.values(field?.translations || {}).map(item => item?.value)
  ].filter(Boolean);
}

function promptHaystack(prompt) {
  return [
    ...localizedText(prompt.title),
    ...localizedText(prompt.description),
    ...localizedText(prompt.promptText),
    ...(prompt.sourceCategories || prompt.categories || []).map(item => item?.value),
    ...(prompt.tags || []).map(item => item?.value)
  ].join(' ').toLowerCase();
}

function matchCategory(prompt, rules) {
  const haystack = promptHaystack(prompt);
  const candidates = [];

  for (const category of rules.categories || []) {
    if (category.id === 'general') continue;
    const matches = [...(category.aliases || []), ...(category.keywords || [])]
      .map(keyword => keyword.toLowerCase())
      .filter(keyword => keyword && haystack.includes(keyword));
    if (matches.length > 0) {
      candidates.push({ category, score: matches.length, matchedBy: matches });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0] || null;
}

function applyCategory(prompt, category, options = {}) {
  const now = options.now || new Date().toISOString();
  const source = options.source || 'rule';
  const previousClassification = prompt.classification || {};
  prompt.categories = categoryItems(category, source === 'manual' ? 'manual' : 'derived');
  prompt.classification = {
    status: 'classified',
    categoryId: category.id,
    source,
    confidence: source === 'manual' ? 1 : options.confidence || 0.7,
    matchedBy: options.matchedBy || [],
    classifiedAt: previousClassification.status === 'classified'
      && previousClassification.categoryId === category.id
      && previousClassification.source === source
      ? previousClassification.classifiedAt || now
      : now
  };
  return prompt;
}

function markNeedsReview(prompt, options = {}) {
  const previousClassification = prompt.classification || {};
  prompt.categories = [];
  prompt.classification = {
    status: 'needs_review',
    categoryId: null,
    source: 'none',
    confidence: 0,
    reason: options.reason || 'no_rule_match',
    classifiedAt: previousClassification.status === 'needs_review'
      ? previousClassification.classifiedAt || options.now || new Date().toISOString()
      : options.now || new Date().toISOString()
  };
  return prompt;
}

function classifyPrompt(prompt, rules, options = {}) {
  const manualCategoryId = prompt.classification?.source === 'manual' ? prompt.classification.categoryId : null;
  if (manualCategoryId) {
    const manualCategory = categoryById(rules, manualCategoryId);
    if (manualCategory) {
      return applyCategory(prompt, manualCategory, {
        ...options,
        source: 'manual',
        confidence: 1,
        matchedBy: prompt.classification.matchedBy || []
      });
    }
  }

  const match = matchCategory(prompt, rules);
  if (!match) return markNeedsReview(prompt, options);

  return applyCategory(prompt, match.category, {
    ...options,
    source: 'rule',
    confidence: Math.min(1, 0.6 + match.score * 0.1),
    matchedBy: match.matchedBy
  });
}

function warnUnclassified(prompt, report) {
  if (!report || prompt.classification?.status !== 'needs_review') return;
  const sourceCategories = (prompt.sourceCategories || [])
    .map(category => category.value)
    .filter(Boolean)
    .join(', ');
  report.warn({
    code: 'unclassified_category',
    message: sourceCategories
      ? `Prompt category could not be mapped from upstream categories: ${sourceCategories}.`
      : 'Prompt category could not be inferred from upstream data.',
    promptId: prompt.id,
    fieldPath: 'classification.categoryId',
    suggestedAction: 'Choose a canonical category in the workbench.',
    resolutionCommand: `pnpm classify -- --prompt-id ${prompt.id} --category <category-id>`
  });
}

function emitClassificationIssues(dataset, report) {
  for (const prompt of dataset.prompts || []) {
    warnUnclassified(prompt, report);
  }
}

function classifyDataset(dataset, options = {}) {
  const rules = options.rules || readCategoryRules(options.projectRoot || defaultProjectRoot());
  let classifiedCount = 0;
  let needsReviewCount = 0;

  for (const prompt of dataset.prompts || []) {
    if (!Array.isArray(prompt.sourceCategories)) {
      prompt.sourceCategories = Array.isArray(prompt.categories) ? clone(prompt.categories) : [];
    }
    classifyPrompt(prompt, rules, options);
    if (prompt.classification?.status === 'classified') classifiedCount++;
    if (prompt.classification?.status === 'needs_review') {
      needsReviewCount++;
      warnUnclassified(prompt, options.report);
    }
  }

  return { dataset, rules, classifiedCount, needsReviewCount };
}

function assignPromptCategory(options = {}) {
  const projectRoot = options.projectRoot || defaultProjectRoot();
  const promptId = options.promptId;
  const categoryId = options.categoryId;
  if (!promptId) throw new Error('A prompt id is required.');
  if (!categoryId) throw new Error('A category id is required.');

  const rules = readCategoryRules(projectRoot);
  const category = categoryById(rules, categoryId);
  if (!category) throw new Error(`Unknown category id: ${categoryId}`);

  const dataset = readCanonicalDataset(projectRoot);
  const prompt = (dataset.prompts || []).find(item => item.id === promptId);
  if (!prompt) throw new Error(`Prompt not found: ${promptId}`);
  if (!Array.isArray(prompt.sourceCategories)) {
    prompt.sourceCategories = Array.isArray(prompt.categories) ? clone(prompt.categories) : [];
  }
  applyCategory(prompt, category, { source: 'manual', now: options.now });
  writeCanonicalDataset(projectRoot, dataset);

  if (options.refreshReport) {
    const { refreshCurrentReport } = require('./report-current');
    refreshCurrentReport({
      projectRoot,
      targetLanguages: options.targetLanguages
    });
  }

  return { dataset, prompt, category };
}

function classifyCanonical(options = {}) {
  const projectRoot = options.projectRoot || defaultProjectRoot();
  const dataset = readCanonicalDataset(projectRoot);
  const result = classifyDataset(dataset, { projectRoot, now: options.now });
  writeCanonicalDataset(projectRoot, dataset);

  if (options.refreshReport) {
    const { refreshCurrentReport } = require('./report-current');
    refreshCurrentReport({
      projectRoot,
      targetLanguages: options.targetLanguages
    });
  }

  return result;
}

function parseList(value, fallback = []) {
  if (Array.isArray(value)) return value.map(item => String(item).trim()).filter(Boolean);
  if (!value) return fallback;
  return String(value).split(/[,\s]+/).map(item => item.trim()).filter(Boolean);
}

function parseArgs(argv) {
  const args = {
    projectRoot: defaultProjectRoot(),
    promptId: null,
    categoryId: null,
    refreshReport: false,
    targetLanguages: parseList(process.env.TARGET_LANGUAGES, ['en', 'zh-CN'])
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--project-root') {
      args.projectRoot = path.resolve(argv[++i]);
    } else if (arg === '--prompt-id') {
      args.promptId = argv[++i];
    } else if (arg === '--category' || arg === '--category-id') {
      args.categoryId = argv[++i];
    } else if (arg === '--refresh-report') {
      args.refreshReport = true;
    } else if (arg === '--target-languages' || arg === '--target-langs') {
      args.targetLanguages = parseList(argv[++i]);
    }
  }

  return args;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.promptId || args.categoryId) {
    const result = assignPromptCategory(args);
    console.log(`Classified ${result.prompt.id} as ${result.category.id}.`);
    return;
  }

  const result = classifyCanonical(args);
  console.log(`Classification: ${result.classifiedCount} classified, ${result.needsReviewCount} need review.`);
}

module.exports = {
  DEFAULT_CATEGORY_RULES,
  assignPromptCategory,
  categoryItems,
  classifyCanonical,
  classifyDataset,
  classifyPrompt,
  emitClassificationIssues,
  parseArgs,
  readCategoryRules,
  writeCategoryRules
};

if (require.main === module) {
  main().catch(error => {
    console.error(error.stack || error.message);
    process.exit(1);
  });
}
