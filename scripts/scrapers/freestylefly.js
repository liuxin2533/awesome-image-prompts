/**
 * freestylefly 仓库清洗脚本
 *
 * 支持两种模式：
 * 1. 本地模式：从 upstream/freestylefly 目录读取
 * 2. 远程模式：从 GitHub Raw URL 获取数据
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { v4: uuidv4 } = require('uuid');

// 路径配置
const UPSTREAM_DIR = path.join(__dirname, '../../upstream/freestylefly');
const OUTPUT_DIR = path.join(__dirname, '../../data');

// 配置
const CONFIG = {
  name: 'freestylefly',
  repo: 'freestylefly/awesome-gpt-image-2',
  branch: 'main',

  // 远程模式：直接从 GitHub 获取
  useRemote: process.env.USE_REMOTE === 'true',

  // 远程文件路径
  galleryFiles: [
    'docs/gallery-part-1.md',
    'docs/gallery-part-2.md'
  ],

  // 图片基础 URL
  imageBaseUrl: 'https://raw.githubusercontent.com/freestylefly/awesome-gpt-image-2/main'
};

// 从 URL 下载内容
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

// 从标题推断分类
function inferCategory(title) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes('ui') || lowerTitle.includes('界面')) {
    return 'UI & Social Media';
  }
  if (lowerTitle.includes('信息图') || lowerTitle.includes('可视化') || lowerTitle.includes('图表')) {
    return 'Infographic';
  }
  if (lowerTitle.includes('海报') || lowerTitle.includes('版式')) {
    return 'Poster & Illustration';
  }
  if (lowerTitle.includes('电商') || lowerTitle.includes('商品') || lowerTitle.includes('产品')) {
    return 'E-commerce';
  }
  if (lowerTitle.includes('品牌') || lowerTitle.includes('标志') || lowerTitle.includes('logo')) {
    return 'Brand & Logo';
  }
  if (lowerTitle.includes('建筑') || lowerTitle.includes('空间') || lowerTitle.includes('室内')) {
    return 'Architecture';
  }
  if (lowerTitle.includes('摄影') || lowerTitle.includes('写实') || lowerTitle.includes('照片')) {
    return 'Photography';
  }
  if (lowerTitle.includes('插画') || lowerTitle.includes('艺术')) {
    return 'Illustration';
  }
  if (lowerTitle.includes('人物') || lowerTitle.includes('角色') || lowerTitle.includes('人设')) {
    return 'Character Design';
  }

  return 'Poster & Illustration'; // 默认分类
}

// 从标题提取标签
function extractTags(title) {
  const tags = [];
  const lowerTitle = title.toLowerCase();
  const keywords = ['anime', 'cyberpunk', 'vintage', 'luxury', 'minimal', 'editorial', 'cinematic',
    'hyper-realistic', 'surrealist', '3d', 'watercolor', 'pixel art', 'portrait', 'landscape',
    'product', 'poster', 'character', 'fashion', 'food', 'architecture', 'surreal', 'fantasy',
    'realistic', '写实', '插画', '海报', 'UI', '信息图', '摄影'];

  keywords.forEach(keyword => {
    if (lowerTitle.includes(keyword) || title.includes(keyword)) {
      tags.push(keyword);
    }
  });

  return tags.length > 0 ? tags : ['General'];
}

// 创建标准 prompt 对象
function createStandardPrompt(caseNum, title, source, promptText, imagePath) {
  const id = uuidv4();

  const localImagePaths = [`images/${id}/0.jpg`];

  // 构建图片 URL
  let imageUrl = null;
  if (imagePath) {
    const cleanPath = imagePath.replace(/^\.\.\//, '');
    imageUrl = `${CONFIG.imageBaseUrl}/${cleanPath}`;
  }

  return {
    id: id,
    title: title,
    originalText: promptText,
    textTranslations: {},
    categories: [inferCategory(title)],
    categoryTranslations: {},
    tags: extractTags(title),
    tagTranslations: {},
    source: {
      repo: CONFIG.repo,
      url: 'https://github.com/freestylefly/awesome-gpt-image-2',
      originalId: `case-${caseNum}`,
      originalImagePaths: imagePath ? [imagePath] : []
    },
    author: extractAuthor(source),
    authorUrl: null,
    imageUrl: imageUrl,
    localImagePaths: localImagePaths,
    extraFields: {
      caseNumber: caseNum,
      source: source
    },
    addedAt: new Date().toISOString()
  };
}

// 从来源提取作者
function extractAuthor(source) {
  if (!source) return 'Unknown';
  const match = source.match(/小红书号(\S+)/);
  return match ? match[1] : 'Unknown';
}

// 主函数
async function scrape() {
  console.log('开始清洗 freestylefly 仓库...\n');
  console.log(`模式: ${CONFIG.useRemote ? '远程' : '本地'}\n`);

  const prompts = [];
  let allContent = '';

  if (CONFIG.useRemote) {
    console.log('从 GitHub 获取数据...\n');

    for (const galleryFile of CONFIG.galleryFiles) {
      const url = `https://raw.githubusercontent.com/${CONFIG.repo}/${CONFIG.branch}/${galleryFile}`;
      console.log(`  获取 ${galleryFile}...`);

      try {
        const content = await fetchUrl(url);
        allContent += content + '\n';
        console.log(`    大小: ${(content.length / 1024).toFixed(1)} KB`);
      } catch (error) {
        console.error(`    获取失败: ${error.message}`);
      }
    }
  } else {
    // 本地模式
    for (const galleryFile of CONFIG.galleryFiles) {
      const filePath = path.join(UPSTREAM_DIR, galleryFile);
      if (fs.existsSync(filePath)) {
        allContent += fs.readFileSync(filePath, 'utf-8') + '\n';
      }
    }
  }

  // 按 *** 分割案例
  const cases = allContent.split('***');

  for (const block of cases) {
    if (!block.trim()) continue;

    // 提取案例编号
    const caseMatch = block.match(/### 例 (\d+)：(.+)/);
    if (!caseMatch) continue;

    const caseNum = parseInt(caseMatch[1]);
    const title = caseMatch[2].trim();

    // 提取图片路径
    const imageMatch = block.match(/!\[.*?\]\((\.\.\/data\/images\/case(\d+)\.jpg)\)/);
    const imagePath = imageMatch ? `data/images/case${caseMatch[1]}.jpg` : null;

    // 提取来源
    const sourceMatch = block.match(/\*\*来源：\*\*\s*(.+)/);
    const source = sourceMatch ? sourceMatch[1].trim() : '未提供';

    // 提取提示词
    const promptMatch = block.match(/\*\*提示词：\*\*\s*```text\s*([\s\S]*?)```/);
    const promptText = promptMatch ? promptMatch[1].trim() : null;

    if (!promptText) {
      console.log(`案例 ${caseNum} 缺少提示词，跳过`);
      continue;
    }

    prompts.push(createStandardPrompt(caseNum, title, source, promptText, imagePath));
  }

  console.log(`\n解析到 ${prompts.length} 条有效 prompts\n`);

  // 保存标准数据
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, 'freestylefly.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    source: CONFIG.repo,
    generatedAt: new Date().toISOString(),
    count: prompts.length,
    data: prompts
  }, null, 2), 'utf-8');

  console.log(`标准数据已保存到: ${outputPath}`);

  // 打印示例
  console.log('\n--- 示例数据 (第1条) ---');
  if (prompts.length > 0) {
    console.log(JSON.stringify(prompts[0], null, 2));
  }

  return prompts;
}

// 运行
scrape().catch(console.error);