/**
 * 数据处理工作流脚本
 *
 * 功能：
 * 1. 清洗所有仓库的数据（支持本地/远程模式）
 * 2. 合并数据
 * 3. 生成 README
 * 4. 生成分类子文件
 *
 * 运行方式：
 * - 本地模式: node scripts/workflow.js
 * - 远程模式: USE_REMOTE=true node scripts/workflow.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 路径配置
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const SCRAPERS_DIR = path.join(PROJECT_ROOT, 'scripts/scrapers');

// 仓库配置
const SCRAPERS = [
  { name: 'evolink', scraper: 'evolink.js' },
  { name: 'freestylefly', scraper: 'freestylefly.js' },
  { name: 'youmind', scraper: 'youmind.js' }
];

// 需要生成多语言 README 的脚本
const I18N_SCRIPTS = [
  { name: 'translate-categories', script: 'translate-categories.js' },
  { name: 'generate-readme-i18n', script: 'generate-readme-i18n.js' }
];

// 配置
const CONFIG = {
  title: 'Awesome Image Prompts',
  description: 'A curated collection of high-quality image generation prompts.',
  website: 'https://gptimages.dev',
  github: 'https://github.com/liuxin2533/awesome-image-prompts',
  license: 'CC BY 4.0',
  logo: './images/logo.png'
};

// ==================== 步骤 1: 清洗数据 ====================

function scrapeAll() {
  console.log('\n========== 步骤 1: 清洗数据 ==========\n');

  for (const repo of SCRAPERS) {
    console.log(`\n🧹 清洗数据: ${repo.name}\n`);

    const scraperPath = path.join(SCRAPERS_DIR, repo.scraper);

    if (!fs.existsSync(scraperPath)) {
      console.error(`  ❌ 清洗脚本不存在: ${scraperPath}`);
      continue;
    }

    try {
      execSync(`node "${scraperPath}"`, {
        cwd: PROJECT_ROOT,
        stdio: 'inherit'
      });
      console.log(`  ✅ ${repo.name} 清洗完成`);
    } catch (error) {
      console.error(`  ❌ ${repo.name} 清洗失败`);
    }
  }
}

// ==================== 步骤 2: 合并数据 ====================

function mergeData() {
  console.log('\n========== 步骤 2: 合并数据 ==========\n');

  const dataFiles = fs.readdirSync(DATA_DIR)
    .filter(f => f.endsWith('.json') && f !== 'categories.json' && f !== 'prompts.json')
    .map(f => path.join(DATA_DIR, f));

  console.log(`找到 ${dataFiles.length} 个数据文件`);

  let allPrompts = [];
  let totalBySource = {};

  dataFiles.forEach(file => {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    if (data.data && Array.isArray(data.data)) {
      allPrompts = allPrompts.concat(data.data);
      const source = data.source || 'unknown';
      totalBySource[source] = (totalBySource[source] || 0) + data.data.length;
    }
  });

  console.log(`合并后共 ${allPrompts.length} 条 prompts\n`);
  console.log('来源统计:');
  Object.entries(totalBySource).forEach(([source, count]) => {
    console.log(`  - ${source}: ${count}`);
  });

  const mergedData = {
    generatedAt: new Date().toISOString(),
    totalCount: allPrompts.length,
    sourceCount: totalBySource,
    data: allPrompts
  };

  const mergedPath = path.join(DATA_DIR, 'prompts.json');
  fs.writeFileSync(mergedPath, JSON.stringify(mergedData, null, 2), 'utf-8');
  console.log(`\n合并数据已保存: ${mergedPath}`);

  return allPrompts;
}

// ==================== 步骤 3: 提取分类 ====================

function extractCategories(prompts) {
  console.log('\n========== 步骤 3: 提取分类 ==========\n');

  const categorySet = new Set();
  prompts.forEach(p => {
    if (p.categories && Array.isArray(p.categories)) {
      p.categories.forEach(c => categorySet.add(c));
    }
  });

  const allCategories = Array.from(categorySet).sort();
  console.log(`发现 ${allCategories.length} 个分类`);

  const categoriesFile = path.join(DATA_DIR, 'categories.json');
  const config = {
    categories: allCategories,
    lastUpdated: new Date().toISOString()
  };

  fs.writeFileSync(categoriesFile, JSON.stringify(config, null, 2), 'utf-8');
  console.log(`分类配置已更新`);

  console.log('\n--- 分类列表 ---');
  allCategories.forEach((cat, i) => {
    console.log(`  ${i + 1}. ${cat}`);
  });

  return allCategories;
}

// ==================== 步骤 4: 生成 README ====================

function generateReadme(prompts, categories) {
  console.log('\n========== 步骤 4: 生成 README ==========\n');

  const readme = generateReadmeContent(prompts, categories);
  const readmePath = path.join(PROJECT_ROOT, 'README.md');
  fs.writeFileSync(readmePath, readme, 'utf-8');
  console.log(`README 已生成: ${readmePath}`);
}

function generateReadmeContent(prompts, categories) {
  const promptCount = prompts.length;
  const authorCount = new Set(prompts.map(p => p.author)).size;
  const sourceCount = new Set(prompts.map(p => p.source?.repo)).size;

  const shields = `[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](LICENSE)
[![Website](https://img.shields.io/badge/Website-Live-orange)](${CONFIG.website})
[![Stars](https://img.shields.io/github/stars/liuxin2533/awesome-image-prompts?style=social)](${CONFIG.github})
[![Prompts](https://img.shields.io/badge/Prompts-${promptCount}-blue)]()`;

  const news = generateNewsSection(prompts);
  const categoryNav = generateCategoryNav(categories, prompts);

  const stats = `## 📊 Statistics

| Metric | Value |
|--------|-------|
| Total Prompts | ${promptCount} |
| Categories | ${categories.length} |
| Authors | ${authorCount} |
| Data Sources | ${sourceCount} |

**Categories:** ${categories.join(', ')}`;

  const cases = generateCasesSection(prompts);

  const sources = [...new Set(prompts.map(p => p.source?.repo))];
  const acknowledgments = `## 🙏 Acknowledgments

This project wouldn't be possible without the amazing work from:
${sources.map(s => `- [${s}](https://github.com/${s})`).join('\n')}`;

  return `<div align="center">

<a href="${CONFIG.website}"><img src="${CONFIG.logo}" alt="Project logo" width="200"></a>

${shields}

</div>

## 🍌 Introduction

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

<a href='${CONFIG.website}'><img src='https://img.shields.io/badge/🚀 Visit Website-${CONFIG.website}-black' height="25"></a>

${news}

${categoryNav}

${stats}

---

${cases}

${acknowledgments}

## 📄 License

This project is licensed under [CC BY 4.0](LICENSE).

---

*Generated on ${new Date().toISOString()}*
`;
}

function generateNewsSection(prompts) {
  const lines = ['## News\n'];

  const dateGroups = {};
  prompts.forEach(prompt => {
    const date = prompt.addedAt?.split('T')[0];
    if (!date) return;

    if (!dateGroups[date]) {
      dateGroups[date] = { total: 0, categories: {} };
    }
    dateGroups[date].total++;

    (prompt.categories || []).forEach(cat => {
      if (!dateGroups[date].categories[cat]) {
        dateGroups[date].categories[cat] = 0;
      }
      dateGroups[date].categories[cat]++;
    });
  });

  const sortedDates = Object.keys(dateGroups).sort((a, b) => new Date(b) - new Date(a));
  const recentDates = sortedDates.slice(0, 7);

  const sources = [...new Set(prompts.map(p => p.source?.repo))];

  recentDates.forEach(date => {
    const group = dateGroups[date];
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const categoryStats = Object.entries(group.categories)
      .map(([cat, count]) => `${count} ${cat}`)
      .join(', ');

    lines.push(`- **${dateStr}:** Added ${group.total} new prompt ${group.total === 1 ? 'case' : 'cases'} (${categoryStats})`);
  });

  lines.push('');
  lines.push(`> Data sources: ${sources.join(', ')}`);

  return lines.join('\n');
}

function generateCategoryNav(categories, prompts) {
  const lines = ['## 📑 Menu\n'];

  lines.push('- [🍌 Introduction](#-introduction)');
  lines.push('- [📰 News](#-news)');
  lines.push('- [📑 Menu](#-menu)');
  lines.push('');

  const categoryCount = {};
  prompts.forEach(p => {
    (p.categories || []).forEach(cat => {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });
  });

  const sortedCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1]);

  sortedCategories.forEach(([category, count]) => {
    const anchor = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const categoryFile = `docs/${anchor}.md`;
    lines.push(`- [${category}](${categoryFile}) (${count})`);
  });

  return lines.join('\n');
}

function generateCasesSection(prompts) {
  const lines = [];

  const categoryGroups = {};
  prompts.forEach(prompt => {
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
    lines.push(`[Back to Menu](#-menu)\n`);

    const categoryPrompts = categoryGroups[category];
    categoryPrompts.forEach((prompt, index) => {
      const title = prompt.title || 'Untitled';
      const author = prompt.author || 'Unknown';
      const authorUrl = prompt.authorUrl || '#';
      const url = prompt.source?.url || '#';
      const imageUrl = prompt.imageUrl;

      lines.push(`### ${category} Case ${index + 1}: [${title}](${url}) (by [@${author}](${authorUrl}))`);
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
        lines.push('**Prompt:**');
        lines.push('');
        lines.push('```');
        lines.push(promptPreview);
        lines.push('```');
        lines.push('');
      }

      lines.push('[Original](' + url + ')');
      lines.push('');
      lines.push('---');
      lines.push('');
    });
  });

  return lines.join('\n');
}

// ==================== 步骤 5: 生成分类子文件 ====================

function generateCategoryDocs(prompts, categories) {
  console.log('\n========== 步骤 5: 生成分类子文件 ==========\n');

  const docsDir = path.join(PROJECT_ROOT, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const categoryGroups = {};
  prompts.forEach(prompt => {
    const category = (prompt.categories || [])[0] || 'Other';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(prompt);
  });

  Object.entries(categoryGroups).forEach(([category, categoryPrompts]) => {
    const anchor = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const lines = [`# ${category}\n\n`, `Total: ${categoryPrompts.length} prompts\n\n`];
    lines.push('[Back to README](../README.md)\n\n');
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

    const filePath = path.join(docsDir, `${anchor}.md`);
    fs.writeFileSync(filePath, lines.join(''), 'utf-8');
    console.log(`  ✅ docs/${anchor}.md (${categoryPrompts.length} cases)`);
  });

  console.log(`\n生成了 ${Object.keys(categoryGroups).length} 个分类文件`);
}

// ==================== 主函数 ====================

async function main() {
  console.log('\n========================================');
  console.log('   Awesome Image Prompts - 数据处理工作流');
  console.log('========================================\n');

  console.log(`模式: ${process.env.USE_REMOTE === 'true' ? '远程' : '本地'}`);

  const startTime = Date.now();

  try {
    // 步骤 1: 清洗数据
    scrapeAll();

    // 步骤 2: 合并数据
    const allPrompts = mergeData();

    // 步骤 3: 提取分类
    const allCategories = extractCategories(allPrompts);

    // 步骤 4: 生成 README（英文单语言版本）
    generateReadme(allPrompts, allCategories);

    // 步骤 5: 生成分类子文件
    generateCategoryDocs(allPrompts, allCategories);

    // 步骤 6: 翻译分类（如果配置了 API Key）
    if (process.env.DEEPSEEK_API_KEY) {
      await runI18nScript('translate-categories');
    }

    // 步骤 7: 生成多语言 README
    runI18nScript('generate-readme-i18n');

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n========================================');
    console.log(`   ✅ 工作流完成！耗时: ${duration}s`);
    console.log('========================================\n');

  } catch (error) {
    console.error('\n❌ 工作流失败:', error);
    process.exit(1);
  }
}

// 运行 i18n 脚本
function runI18nScript(name) {
  const scriptConfig = I18N_SCRIPTS.find(s => s.name === name);
  if (!scriptConfig) return;

  const scriptPath = path.join(__dirname, scriptConfig.script);
  console.log(`\n========== 运行 ${name} ==========\n`);

  try {
    execSync(`node "${scriptPath}"`, {
      cwd: PROJECT_ROOT,
      stdio: 'inherit',
      env: { ...process.env }
    });
    console.log(`  ✅ ${name} 完成`);
  } catch (error) {
    console.error(`  ❌ ${name} 失败`);
  }
}

// 运行
main();