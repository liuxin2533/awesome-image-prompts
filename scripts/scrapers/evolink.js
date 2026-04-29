/**
 * EvoLinkAI 仓库清洗脚本
 *
 * 支持两种模式：
 * 1. 本地模式：从 upstream/evolink 目录读取
 * 2. 远程模式：从 GitHub Raw URL 获取数据
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { v4: uuidv4 } = require('uuid');

// 路径配置
const UPSTREAM_DIR = path.join(__dirname, '../../upstream/evolink');
const OUTPUT_DIR = path.join(__dirname, '../../data');

// 配置
const CONFIG = {
  name: 'EvoLinkAI',
  repo: 'EvoLinkAI/awesome-gpt-image-2-prompts',
  branch: 'main',

  // 远程模式：直接从 GitHub 获取
  useRemote: process.env.USE_REMOTE === 'true',

  // 远程文件路径
  readmeUrl: 'https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/README.md',
  jsonUrl: 'https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/data/ingested_tweets.json',

  // 图片基础 URL
  imageBaseUrl: 'https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main'
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

// 分类标准化
function normalizeCategory(category) {
  const categoryMap = {
    'Portrait & Photography Cases': 'Portrait & Photography',
    'Poster & Illustration Cases': 'Poster & Illustration',
    'Character Design Cases': 'Character Design',
    'E-commerce Cases': 'E-commerce',
    'UI & Social Media Mockup Cases': 'UI & Social Media',
    'Ad Creative Cases': 'Ad Creative',
    'Comparison & Community Examples': 'Comparison & Community'
  };
  return categoryMap[category] || category;
}

// 从标题提取标签
function extractTags(title) {
  const tags = [];
  const lowerTitle = title.toLowerCase();
  const keywords = ['anime', 'cyberpunk', 'vintage', 'luxury', 'minimal', 'editorial', 'cinematic',
    'hyper-realistic', 'surrealist', '3d', 'watercolor', 'pixel art', 'portrait', 'landscape',
    'product', 'poster', 'character', 'fashion', 'food', 'architecture', 'surreal', 'fantasy'];

  keywords.forEach(keyword => {
    if (lowerTitle.includes(keyword)) {
      tags.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    }
  });

  return tags.length > 0 ? tags : ['General'];
}

// 创建标准 prompt 对象
function createStandardPrompt(data, promptText, imagePaths, title) {
  const id = uuidv4();

  // 转换图片路径格式
  const localImagePaths = imagePaths.map((_, index) => `images/${id}/${index}.jpg`);

  // 构建上游图片 URL
  let imageUrl = null;
  if (imagePaths.length > 0) {
    const firstImage = imagePaths[0];
    // 处理路径格式：./images/xxx -> images/xxx
    const cleanPath = firstImage.replace(/^\.\//, '');
    imageUrl = `${CONFIG.imageBaseUrl}/${cleanPath}`;
  }

  return {
    id: id,
    title: title,
    originalText: promptText,
    textTranslations: {},
    categories: [normalizeCategory(data.category)],
    categoryTranslations: {},
    tags: extractTags(title),
    tagTranslations: {},
    source: {
      repo: CONFIG.repo,
      url: data.tweet_url,
      originalId: data.case_anchor,
      originalImagePaths: imagePaths
    },
    author: data.author_handle,
    authorUrl: data.author_handle ? `https://x.com/${data.author_handle}` : null,
    imageUrl: imageUrl,
    localImagePaths: localImagePaths,
    extraFields: {
      readmeFile: data.readme_file,
      caseAnchor: data.case_anchor
    },
    addedAt: data.added_at
  };
}

// 主函数
async function scrape() {
  console.log('开始清洗 EvoLinkAI 仓库...\n');
  console.log(`模式: ${CONFIG.useRemote ? '远程' : '本地'}\n`);

  let metaData, readmeContent;

  if (CONFIG.useRemote) {
    console.log('从 GitHub 获取数据...\n');

    try {
      console.log('  获取 README...');
      readmeContent = await fetchUrl(CONFIG.readmeUrl);
      console.log(`  README 大小: ${(readmeContent.length / 1024).toFixed(1)} KB`);

      console.log('  获取 JSON 元数据...');
      const jsonContent = await fetchUrl(CONFIG.jsonUrl);
      metaData = JSON.parse(jsonContent);
      console.log(`  元数据条数: ${metaData.records.length}`);
    } catch (error) {
      console.error('远程获取失败:', error.message);
      process.exit(1);
    }
  } else {
    // 本地模式
    const metaPath = path.join(UPSTREAM_DIR, 'data/ingested_tweets.json');
    const readmePath = path.join(UPSTREAM_DIR, 'README.md');

    if (!fs.existsSync(metaPath) || !fs.existsSync(readmePath)) {
      console.error('本地文件不存在，请先克隆上游仓库');
      console.log('运行: git clone --depth 1 https://github.com/EvoLinkAI/awesome-gpt-image-2-prompts.git upstream/evolink');
      process.exit(1);
    }

    metaData = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    readmeContent = fs.readFileSync(readmePath, 'utf-8');

    console.log(`读取到 ${metaData.records.length} 条元数据`);
  }

  // 解析 README 中的 prompts
  const prompts = [];
  const caseBlocks = readmeContent.split(/<!-- Case \d+:/);

  for (const block of caseBlocks) {
    if (!block.trim()) continue;

    const headerMatch = block.match(/### Case \d+:\s*\[([^\]]+)\]\(([^)]+)\)\s*\(by\s*\[@([^\]]+)\]/);
    if (!headerMatch) continue;

    const title = headerMatch[1];
    const tweetUrl = headerMatch[2];
    const author = headerMatch[3];

    // 提取所有图片路径
    const imageMatches = block.matchAll(/<img src="(\.\/images\/[^"]+)"/g);
    const imagePaths = Array.from(imageMatches).map(m => m[1]);

    // 提取 Prompt
    const promptMatch = block.match(/\*\*Prompt:\*\*\s*```\s*([\s\S]*?)```/);
    const promptText = promptMatch ? promptMatch[1].trim() : null;

    if (!promptText) continue;

    // 查找元数据
    const meta = metaData.records.find(r => r.tweet_url === tweetUrl);

    const record = {
      tweet_url: tweetUrl,
      author_handle: author,
      title: title,
      category: meta?.category || 'Unknown',
      readme_file: meta?.readme_file || 'README.md',
      case_anchor: meta?.case_anchor || '',
      image_dir: meta?.image_dir || '',
      added_at: meta?.added_at || new Date().toISOString()
    };

    prompts.push(createStandardPrompt(record, promptText, imagePaths, title));
  }

  console.log(`\n解析到 ${prompts.length} 条有效 prompts\n`);

  // 保存标准数据
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, 'evolink.json');
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