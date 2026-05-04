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

function collectionDefinition(slug) {
  return COLLECTIONS.find(collection => collection.slug === slug) || COLLECTIONS[COLLECTIONS.length - 1];
}

function collectionTitle(slug, language = 'en') {
  const collection = collectionDefinition(slug);
  return collection.title[language] || collection.title.en;
}

function collectionSlug(prompt) {
  if (prompt?.collection?.slug) return prompt.collection.slug;

  const haystack = [
    prompt?.title,
    prompt?.description,
    ...(prompt?.categories || []),
    ...(prompt?.tags || [])
  ].join(' ').toLowerCase();

  const match = COLLECTIONS.find(collection =>
    collection.slug !== 'general'
    && collection.keywords.some(keyword => haystack.includes(keyword.toLowerCase()))
  );

  return match?.slug || 'general';
}

function collectionForPrompt(prompt, language = 'en') {
  const slug = collectionSlug(prompt);
  return {
    slug,
    title: collectionTitle(slug, language)
  };
}

module.exports = {
  COLLECTIONS,
  collectionDefinition,
  collectionForPrompt,
  collectionSlug,
  collectionTitle
};
