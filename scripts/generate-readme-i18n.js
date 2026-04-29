/**
 * README 多语言生成脚本
 *
 * 生成英文、中文（简体）两个版本的 README
 * 以及对应的分类子文件
 *
 * 运行方式:
 * - node scripts/generate-readme-i18n.js
 * - USE_REMOTE=true node scripts/generate-readme-i18n.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 路径配置
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const DOCS_DIR = path.join(PROJECT_ROOT, 'docs');

// 支持的语言
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' }
];

// 配置
const CONFIG = {
  title: 'Awesome Image Prompts',
  titleZh: '优质图像提示词合集',
  description: 'A curated collection of high-quality image generation prompts from various open-source projects.',
  descriptionZh: '来自多个开源项目的优质图像生成提示词精选合集',
  website: 'https://gptimages.dev',
  github: 'https://github.com/liuxin2533/awesome-image-prompts'
};

// 从 URL 获取内容（用于远程模式）
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (res2) => {
          let data = '';
          res2.on('data', chunk => data += chunk);
          res2.on('end', () => resolve(data));
        }).on('error', reject);
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// 读取 prompts.json
function loadPrompts() {
  const promptsFile = path.join(DATA_DIR, 'prompts.json');

  if (!fs.existsSync(promptsFile)) {
    console.error('prompts.json 不存在，请先运行工作流');
    return null;
  }

  return JSON.parse(fs.readFileSync(promptsFile, 'utf-8'));
}

// 生成 README 头部（多语言切换）
function generateHeader(lang) {
  const l = lang === 'zh-CN';

  const title = l ? CONFIG.titleZh : CONFIG.title;
  const desc = l ? CONFIG.descriptionZh : CONFIG.description;

  const langLinks = LANGUAGES.map(lg =>
    lg.code === lang
      ? `[![${lg.name}](https://img.shields.io/badge/${lg.name}-Current-brightgreen)](README${lg.code === 'en' ? '' : '_' + lg.code}.md)`
      : `[![${lg.name}](https://img.shields.io/badge/${lg.name}-Click%20to%20View-lightgrey)](README${lg.code === 'en' ? '' : '_' + lg.code}.md)`
  ).join(' ');

  return `<div align="center">

# ${title}

${langLinks}

${desc}

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-Live-orange)](${CONFIG.website})
[![Stars](https://img.shields.io/github/stars/liuxin2533/awesome-image-prompts?style=social)](${CONFIG.github})

</div>

---
`;
}

// 生成 Introduction
function generateIntroduction(lang) {
  const l = lang === 'zh-CN';

  if (l) {
    return `## 🍌 项目介绍

欢迎来到 **Awesome Image Prompts** 仓库！🤗

本仓库汇集了来自多个开源项目的高质量图像生成提示词，为 AI 图像生成爱好者提供统一的知识库。

**特点：**
- 统一的数据格式
- 多语言支持
- 分类清晰，便于探索
- 高质量示例图片

如果你觉得有用，请给个 Star。⭐

> [!NOTE]
> 本仓库通过 GitHub Actions 每日自动同步更新。

[👉 访问网站](${CONFIG.website})
`;
  } else {
    return `## 🍌 Introduction

Welcome to the **Awesome Image Prompts** repository! 🤗

This repository curates high-quality image generation prompts from various open-source projects, providing a unified collection for AI image generation enthusiasts.

**Features:**
- Unified data format across multiple sources
- Multi-language support
- Categorized prompts for easy discovery
- High-quality examples with images

If you find this useful, consider giving it a star. ⭐

> [!NOTE]
> This repository is auto-generated and updated daily via GitHub Actions.

[👉 Visit Website](${CONFIG.website})
`;
  }
}

// 生成 News
function generateNews(prompts, lang) {
  const l = lang === 'zh-CN';
  const lines = [l ? '## 📰 更新日志\n' : '## 📰 News\n'];

  const dateGroups = {};
  prompts.data.forEach(p => {
    const date = p.addedAt?.split('T')[0];
    if (!date) return;

    if (!dateGroups[date]) {
      dateGroups[date] = { total: 0, categories: {} };
    }
    dateGroups[date].total++;

    (p.categories || []).forEach(cat => {
      dateGroups[date].categories[cat] = (dateGroups[date].categories[cat] || 0) + 1;
    });
  });

  const sortedDates = Object.keys(dateGroups).sort((a, b) => new Date(b) - new Date(a));
  const recentDates = sortedDates.slice(0, 7);

  const sources = [...new Set(prompts.data.map(p => p.source?.repo))];

  recentDates.forEach(date => {
    const group = dateGroups[date];
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString(l ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const categoryStats = Object.entries(group.categories)
      .map(([cat, count]) => `${count} ${cat}`)
      .join(', ');

    const addedText = l ? '新增' : 'Added';
    const casesText = group.total === 1 ? (l ? '条' : 'case') : (l ? '条' : 'cases');

    lines.push(`- **${dateStr}:** ${addedText} ${group.total} ${casesText} (${categoryStats})`);
  });

  lines.push('');
  lines.push(`> ${l ? '数据来源' : 'Data sources'}: ${sources.join(', ')}`);

  return lines.join('\n');
}

// 生成分类导航
function generateMenu(prompts, lang) {
  const l = lang === 'zh-CN';
  const lines = [l ? '## 📑 目录\n' : '## 📑 Menu\n'];

  lines.push(`- [🍌 ${l ? '项目介绍' : 'Introduction'}](#-${l ? '项目介绍' : 'introduction'})`);
  lines.push(`- [📰 ${l ? '更新日志' : 'News'}](#-${l ? '更新日志' : 'news'})`);
  lines.push(`- [📑 ${l ? '目录' : 'Menu'}](#-${l ? '目录' : 'menu'})`);
  lines.push('');

  const categoryCount = {};
  prompts.data.forEach(p => {
    (p.categories || []).forEach(cat => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });
  });

  const sortedCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1]);

  sortedCategories.forEach(([category, count]) => {
    const anchor = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const categoryFile = l ? `docs/${anchor}.md` : `docs/${anchor}.md`;
    lines.push(`- [${category}](${categoryFile}) (${count})`);
  });

  return lines.join('\n');
}

// 生成统计
function generateStats(prompts, lang) {
  const l = lang === 'zh-CN';

  const promptCount = prompts.data.length;
  const authorCount = new Set(prompts.data.map(p => p.author)).size;
  const sourceCount = new Set(prompts.data.map(p => p.source?.repo)).size;
  const categoryCount = new Set(prompts.data.flatMap(p => p.categories || [])).size;

  const totalText = l ? '提示词总数' : 'Total Prompts';
  const categoriesText = l ? '分类数量' : 'Categories';
  const authorsText = l ? '作者数量' : 'Authors';
  const sourcesText = l ? '数据来源' : 'Data Sources';

  return `## 📊 ${l ? '统计信息' : 'Statistics'}

| ${l ? '指标' : 'Metric'} | ${l ? '数值' : 'Value'} |
|--------|-------|
| ${totalText} | ${promptCount} |
| ${categoriesText} | ${categoryCount} |
| ${authorsText} | ${authorCount} |
| ${sourcesText} | ${sourceCount} |`;
}

// 生成案例列表
function generateCases(prompts, lang) {
  const l = lang === 'zh-CN';
  const lines = [];

  const categoryGroups = {};
  prompts.data.forEach(prompt => {
    const category = (prompt.categories || [])[0] || 'Other';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(prompt);
  });

  const sortedCategories = Object.keys(categoryGroups).sort();

  sortedCategories.forEach(category => {
    const anchor = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    lines.push(`## ${category}\n`);
    lines.push(`[${l ? '返回目录' : 'Back to Menu'}](#-${l ? '目录' : 'menu'})\n`);

    const categoryPrompts = categoryGroups[category];
    categoryPrompts.forEach((prompt, index) => {
      const title = prompt.title || 'Untitled';
      const author = prompt.author || 'Unknown';
      const authorUrl = prompt.authorUrl || '#';
      const url = prompt.source?.url || '#';
      const imageUrl = prompt.imageUrl;

      lines.push(`### ${category} ${index + 1}: [${title}](${url}) (by [@${author}](${authorUrl}))`);
      lines.push('');
      lines.push('| Output |');
      lines.push('| :----: |');

      const imgSrc = imageUrl || 'https://via.placeholder.com/300x200?text=No+Image';
      lines.push(`| <img src="${imgSrc}" width="300" alt="${title}"> |`);
      lines.push('');

      const promptPreview = prompt.originalText?.length > 300
        ? prompt.originalText.substring(0, 300) + '...'
        : prompt.originalText || '';

      if (promptPreview) {
        lines.push(`**Prompt:**`);
        lines.push('');
        lines.push('```');
        lines.push(promptPreview);
        lines.push('```');
        lines.push('');
      }

      lines.push(`[${l ? '原始来源' : 'Original'}](${url})`);
      lines.push('');
      lines.push('---');
      lines.push('');
    });
  });

  return lines.join('\n');
}

// 生成 Acknowledgments
function generateAcknowledgments(lang) {
  const l = lang === 'zh-CN';

  const sources = [
    'EvoLinkAI/awesome-gpt-image-2-prompts',
    'freestylefly/awesome-gpt-image-2',
    'YouMind-OpenLab/awesome-gpt-image-2'
  ];

  return l ? `## 🙏 致谢

本项目离不开以下优秀仓库的支持：
${sources.map(s => `- [${s}](https://github.com/${s})`).join('\n')}

## 📄 许可证

本项目采用 [CC BY 4.0](LICENSE) 许可证。

---
*最后更新: ${new Date().toISOString()}*` : `## 🙏 Acknowledgments

This project wouldn't be possible without the amazing work from:
${sources.map(s => `- [${s}](https://github.com/${s})`).join('\n')}

## 📄 License

This project is licensed under [CC BY 4.0](LICENSE).

---
*Generated on ${new Date().toISOString()}*`;
}

// 生成完整的 README
function generateReadme(prompts, lang) {
  const header = generateHeader(lang);
  const intro = generateIntroduction(lang);
  const news = generateNews(prompts, lang);
  const menu = generateMenu(prompts, lang);
  const stats = generateStats(prompts, lang);
  const cases = generateCases(prompts, lang);
  const ack = generateAcknowledgments(lang);

  return `${header}

${intro}

${news}

${menu}

${stats}

---

${cases}

${ack}`;
}

// 生成分类子文件（多语言）
function generateCategoryDocs(prompts, lang) {
  const l = lang === 'zh-CN';

  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }

  const categoryGroups = {};
  prompts.data.forEach(prompt => {
    const category = (prompt.categories || [])[0] || 'Other';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(prompt);
  });

  Object.entries(categoryGroups).forEach(([category, categoryPrompts]) => {
    const anchor = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const lines = [`# ${category}\n\n`];

    lines.push(`${l ? '共' : 'Total'}: ${categoryPrompts.length} ${l ? '条提示词' : 'prompts'}\n\n`);
    lines.push(`[${l ? '返回 README' : 'Back to README'}](../README${lang === 'en' ? '' : '_' + lang}.md)\n\n`);
    lines.push('---\n\n');

    categoryPrompts.forEach((prompt, index) => {
      const title = prompt.title || 'Untitled';
      const author = prompt.author || 'Unknown';
      const url = prompt.source?.url || '#';
      const imageUrl = prompt.imageUrl;

      lines.push(`## ${index + 1}. ${title}\n`);
      lines.push(`By @${author} | [Source](${url})\n`);

      if (imageUrl) {
        lines.push(`\n<img src="${imageUrl}" width="400" alt="${title}">\n`);
      }

      if (prompt.originalText) {
        lines.push('\n```\n');
        lines.push(prompt.originalText.substring(0, 500) + (prompt.originalText.length > 500 ? '...' : ''));
        lines.push('\n```\n');
      }

      lines.push('\n---\n\n');
    });

    const filePath = path.join(DOCS_DIR, `${anchor}.md`);
    fs.writeFileSync(filePath, lines.join(''), 'utf-8');
    console.log(`  ✅ docs/${anchor}.md (${categoryPrompts.length} cases)`);
  });

  console.log(`\n生成了 ${Object.keys(categoryGroups).length} 个分类文件`);
}

// 主函数
function main() {
  console.log('\n========================================');
  console.log('   README 多语言生成');
  console.log('========================================\n');

  const prompts = loadPrompts();
  if (!prompts) {
    console.error('加载数据失败');
    return;
  }

  console.log(`加载 ${prompts.data.length} 条 prompts\n`);

  // 生成英文 README
  console.log('生成英文 README...');
  const enReadme = generateReadme(prompts, 'en');
  fs.writeFileSync(path.join(PROJECT_ROOT, 'README.md'), enReadme, 'utf-8');
  console.log('  ✅ README.md (English)\n');

  // 生成中文 README
  console.log('生成中文 README...');
  const zhReadme = generateReadme(prompts, 'zh-CN');
  fs.writeFileSync(path.join(PROJECT_ROOT, 'README_zh-CN.md'), zhReadme, 'utf-8');
  console.log('  ✅ README_zh-CN.md (简体中文)\n');

  // 生成分类子文件
  console.log('生成分类文档...');
  generateCategoryDocs(prompts, 'en');
  generateCategoryDocs(prompts, 'zh-CN');

  console.log('\n========================================');
  console.log('   ✅ 多语言 README 生成完成！');
  console.log('========================================\n');
}

// 运行
main();