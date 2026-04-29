/**
 * README 生成脚本
 *
 * 根据清洗后的标准数据生成 README.md
 */

const fs = require('fs');
const path = require('path');

// 路径配置
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const OUTPUT_DIR = PROJECT_ROOT;

// 配置
const CONFIG = {
  title: 'Awesome Image Prompts',
  description: 'A curated collection of high-quality image generation prompts from various sources.',
  website: 'https://gptimages.dev',
  github: 'https://github.com/YOUR_USERNAME/awesome-image-prompts',
  license: 'CC BY 4.0',
  logo: './images/logo.png'
};

// 分类中文映射（可扩展）
const CATEGORY_I18N = {
  'Portrait & Photography': { 'en': 'Portrait & Photography', 'zh': '人像与摄影' },
  'Poster & Illustration': { 'en': 'Poster & Illustration', 'zh': '海报与插画' },
  'Character Design': { 'en': 'Character Design', 'zh': '角色设计' },
  'E-commerce': { 'en': 'E-commerce', 'zh': '电商' },
  'UI & Social Media': { 'en': 'UI & Social Media', 'zh': 'UI 与社交媒体' },
  'Ad Creative': { 'en': 'Ad Creative', 'zh': '广告创意' },
  'Comparison & Community': { 'en': 'Comparison & Community', 'zh': '对比与社区' }
};

// 生成 shields
function generateShields(promptCount) {
  return `[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-Live-orange)](${CONFIG.website})
[![Stars](https://img.shields.io/github/stars/YOUR_USERNAME/awesome-image-prompts?style=social)](${CONFIG.github})
[![Prompts](https://img.shields.io/badge/Prompts-${promptCount}-blue)]()`;
}

// 生成 News 部分 - 根据实际数据统计
function generateNews(data) {
  const lines = ['## News\n'];

  // 按日期分组
  const dateGroups = {};
  data.forEach(prompt => {
    const date = prompt.addedAt.split('T')[0]; // YYYY-MM-DD
    if (!dateGroups[date]) {
      dateGroups[date] = { total: 0, categories: {} };
    }
    dateGroups[date].total++;

    const category = prompt.categories[0];
    if (!dateGroups[date].categories[category]) {
      dateGroups[date].categories[category] = 0;
    }
    dateGroups[date].categories[category]++;
  });

  // 按日期排序（最新的在前）
  const sortedDates = Object.keys(dateGroups).sort((a, b) => new Date(b) - new Date(a));

  // 生成 news 条目（最多显示最近 7 天）
  const recentDates = sortedDates.slice(0, 7);

  // 获取数据来源信息
  const sources = [...new Set(data.map(p => p.source.repo))];

  recentDates.forEach(date => {
    const group = dateGroups[date];
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // 分类统计文字
    const categoryStats = Object.entries(group.categories)
      .map(([cat, count]) => `${count} ${cat}`)
      .join(', ');

    lines.push(`- **${dateStr}:** Added ${group.total} new prompt ${group.total === 1 ? 'case' : 'cases'} (${categoryStats})`);
  });

  // 添加数据来源信息
  lines.push('');
  lines.push(`> Data sources: ${sources.join(', ')}`);

  return lines.join('\n');
}

// 生成分类导航
function generateCategoryNav(data) {
  const lines = ['## 📑 Menu\n'];

  lines.push('- [🍌 Introduction](#-introduction)');
  lines.push('- [📰 News](#-news)');
  lines.push('- [📑 Menu](#-menu)');

  // 统计每个分类的数量
  const categoryCount = {};
  data.forEach(prompt => {
    prompt.categories.forEach(cat => {
      if (!categoryCount[cat]) {
        categoryCount[cat] = 0;
      }
      categoryCount[cat]++;
    });
  });

  // 按数量排序
  const sortedCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1]);

  lines.push('');

  // 生成分类链接（指向 docs 子 README）
  sortedCategories.forEach(([category, count]) => {
    const anchor = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const categoryFile = `docs/${anchor}.md`;
    lines.push(`- [${category}](${categoryFile}) (${count})`);
  });

  return lines.join('\n');
}

// 生成案例列表
function generateCases(data) {
  const lines = [];

  // 按分类分组
  const categoryGroups = {};
  data.forEach(prompt => {
    const category = prompt.categories[0] || 'Uncategorized';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(prompt);
  });

  // 按分类输出
  const sortedCategories = Object.keys(categoryGroups).sort();

  sortedCategories.forEach(category => {
    const anchor = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    lines.push(`## ${category}\n`);
    lines.push(`[Back to Menu](#-menu)\n`);

    const prompts = categoryGroups[category];
    prompts.forEach((prompt, index) => {
      const id = prompt.id;
      const title = prompt.title;
      const author = prompt.author;
      const authorUrl = prompt.authorUrl;
      const url = prompt.source.url;
      const imageUrl = prompt.imageUrl;
      const localImage = prompt.localImagePaths[0] || '';

      // 生成 anchor
      const promptAnchor = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+$/, '')
        .substring(0, 50);

      lines.push(`<!-- ${category} Case ${index + 1}: ${title} (by @${author}) -->`);
      lines.push(`### ${category} Case ${index + 1}: [${title}](${url}) (by [@${author}](${authorUrl}))`);
      lines.push('');
      lines.push('| Output |');
      lines.push('| :----: |');

      // 使用上游图片 URL（本地图片尚未下载）
      const imgSrc = imageUrl || `https://via.placeholder.com/300x200?text=${encodeURIComponent(title)}`;
      lines.push(`| <img src="${imgSrc}" width="300" alt="${title}"> |`);
      lines.push('');

      // 提取前100个字符作为 prompt 预览
      const promptPreview = prompt.originalText.length > 200
        ? prompt.originalText.substring(0, 200) + '...'
        : prompt.originalText;

      lines.push('**Prompt:**');
      lines.push('');
      lines.push('```');
      lines.push(promptPreview);
      lines.push('```');
      lines.push('');
      lines.push(`[View Details](${localImage ? localImage.replace('images/', '#') : '#'}) | [Original](${url})`);
      lines.push('');
      lines.push('---');
      lines.push('');
    });
  });

  return lines.join('\n');
}

// 生成统计信息
function generateStats(data) {
  const total = data.length;
  const categories = [...new Set(data.flatMap(p => p.categories))];
  const authors = [...new Set(data.map(p => p.author))];
  const sources = [...new Set(data.map(p => p.source.repo))];

  return `## 📊 Statistics

| Metric | Value |
|--------|-------|
| Total Prompts | ${total} |
| Categories | ${categories.length} |
| Authors | ${authors.length} |
| Data Sources | ${sources.length} |

**Categories:** ${categories.join(', ')}`;
}

// 生成完整的 README
function generateReadme(data, categoryGroups) {
  const promptCount = data.length;

  const readme = `<div align="center">

<a href="${CONFIG.website}"><img src="${CONFIG.logo}" alt="Project logo" width="200"></a>

${generateShields(promptCount)}

</div>

## 🍌 Introduction

Welcome to the **Awesome Image Prompts** repository! 🤗

This repository curates high-quality image generation prompts from various open-source projects, providing a unified collection for AI image generation enthusiasts.

**Features:**
- Unified data format across multiple sources
- Multi-language support (English, 中文, etc.)
- Categorized prompts for easy discovery
- High-quality examples with images

If you find this useful, consider giving it a star. ⭐

> [!NOTE]
> This repository is auto-generated and updated daily via GitHub Actions.

<a href='${CONFIG.website}'><img src='https://img.shields.io/badge/🚀 Visit Website-${CONFIG.website}-black' height="25"></a>

${generateNews(data)}

${generateCategoryNav(data)}

${generateStats(data)}

---

${generateCases(data)}

## 🙏 Acknowledgments

This project wouldn't be possible without the amazing work from:
- [EvoLinkAI/awesome-gpt-image-2-prompts](https://github.com/EvoLinkAI/awesome-gpt-image-2-prompts)

## 📄 License

This project is licensed under [CC BY 4.0](LICENSE).

---

*Generated on ${new Date().toISOString()}*
`;

  return readme;
}

// 主函数
function main() {
  console.log('开始生成 README...\n');

  // 读取标准数据
  const dataFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  console.log(`找到 ${dataFiles.length} 个数据文件: ${dataFiles.join(', ')}`);

  // 合并所有数据
  let allData = [];

  dataFiles.forEach(file => {
    const filePath = path.join(DATA_DIR, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    allData = allData.concat(jsonData.data || []);
    console.log(`加载 ${file}: ${jsonData.count || 0} 条数据`);
  });

  console.log(`\n总共加载 ${allData.length} 条 prompts\n`);

  // 按分类分组（用于生成 README 和子文件）
  const categoryGroups = {};
  allData.forEach(prompt => {
    const category = prompt.categories[0] || 'Uncategorized';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(prompt);
  });

  // 生成 README
  const readme = generateReadme(allData, categoryGroups);

  // 保存
  const outputPath = path.join(OUTPUT_DIR, 'README.md');
  fs.writeFileSync(outputPath, readme, 'utf-8');

  console.log(`README 已生成: ${outputPath}`);

  // 同时生成分类子文件到 docs 目录
  const docsDir = path.join(OUTPUT_DIR, 'docs');

  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  Object.entries(categoryGroups).forEach(([category, prompts]) => {
    const anchor = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const categoryReadme = `# ${category}\n\n`;
    const lines = [];

    prompts.forEach((prompt, index) => {
      const title = prompt.title;
      const author = prompt.author;
      const url = prompt.source.url;
      const imageUrl = prompt.imageUrl;

      lines.push(`## ${title} (by @${author})\n`);
      lines.push(`[Source](${url}) | [View Image](${imageUrl || '#'})\n`);

      if (imageUrl) {
        lines.push(`<img src="${imageUrl}" width="300" alt="${title}">\n`);
      }

      lines.push('```');
      lines.push(prompt.originalText.substring(0, 500) + (prompt.originalText.length > 500 ? '...' : ''));
      lines.push('```\n');
      lines.push('---\n');
    });

    const categoryContent = categoryReadme + lines.join('\n');
    const categoryPath = path.join(docsDir, `${anchor}.md`);
    fs.writeFileSync(categoryPath, categoryContent, 'utf-8');
    console.log(`生成分类文件: docs/${anchor}.md (${prompts.length} cases)`);
  });

  console.log('\n生成完成!');
}

// 运行
main();