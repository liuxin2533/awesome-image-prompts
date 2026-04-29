/**
 * YouMind-OpenLab 仓库清洗脚本
 *
 * 支持两种模式：
 * 1. 本地模式：从 upstream/youmind 目录读取
 * 2. 远程模式：从 GitHub Raw URL 获取数据
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { v4: uuidv4 } = require('uuid');

// 路径配置
const UPSTREAM_DIR = path.join(__dirname, '../../upstream/youmind');
const OUTPUT_DIR = path.join(__dirname, '../../data');

// 配置
const CONFIG = {
  name: 'YouMind',
  repo: 'YouMind-OpenLab/awesome-gpt-image-2',
  branch: 'main',

  // 远程模式：直接从 GitHub 获取
  useRemote: process.env.USE_REMOTE === 'true',

  // 远程文件路径
  readmeUrl: 'https://raw.githubusercontent.com/YouMind-OpenLab/awesome-gpt-image-2/main/README.md',

  // 图片基础 URL
  imageBaseUrl: 'https://cms-assets.youmind.com'
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
function inferCategories(title) {
  const categories = [];
  const lowerTitle = title.toLowerCase();

  // Use Cases
  if (lowerTitle.includes('profile') || lowerTitle.includes('avatar') || (lowerTitle.includes('portrait') && !lowerTitle.includes('group'))) {
    categories.push('Portrait');
  }
  if (lowerTitle.includes('social media')) {
    categories.push('Social Media');
  }
  if (lowerTitle.includes('infographic') || lowerTitle.includes('edu visual')) {
    categories.push('Infographic');
  }
  if (lowerTitle.includes('youtube thumbnail')) {
    categories.push('YouTube Thumbnail');
  }
  if (lowerTitle.includes('comic') || lowerTitle.includes('storyboard')) {
    categories.push('Comic');
  }
  if (lowerTitle.includes('product marketing')) {
    categories.push('Product Marketing');
  }
  if (lowerTitle.includes('e-commerce') || lowerTitle.includes('ecommerce')) {
    categories.push('E-commerce');
  }
  if (lowerTitle.includes('game asset')) {
    categories.push('Game Asset');
  }
  if (lowerTitle.includes('poster') || lowerTitle.includes('flyer')) {
    categories.push('Poster');
  }
  if (lowerTitle.includes('app') || lowerTitle.includes('web design')) {
    categories.push('UI & Social Media');
  }

  // Style
  if (lowerTitle.includes('photography') || lowerTitle.includes('photo')) {
    categories.push('Photography');
  }
  if (lowerTitle.includes('cinematic') || lowerTitle.includes('film still')) {
    categories.push('Cinematic');
  }
  if (lowerTitle.includes('anime') || lowerTitle.includes('manga')) {
    categories.push('Anime');
  }
  if (lowerTitle.includes('illustration') || lowerTitle.includes('illustrated')) {
    categories.push('Illustration');
  }
  if (lowerTitle.includes('sketch') || lowerTitle.includes('line art')) {
    categories.push('Sketch');
  }
  if (lowerTitle.includes('3d render') || (lowerTitle.includes('3d') && !lowerTitle.includes('2d'))) {
    categories.push('3D Render');
  }
  if (lowerTitle.includes('chibi') || lowerTitle.includes('q-style')) {
    categories.push('Chibi');
  }
  if (lowerTitle.includes('isometric')) {
    categories.push('Isometric');
  }
  if (lowerTitle.includes('pixel art')) {
    categories.push('Pixel Art');
  }
  if (lowerTitle.includes('oil painting')) {
    categories.push('Oil Painting');
  }
  if (lowerTitle.includes('watercolor') || lowerTitle.includes('watercolour')) {
    categories.push('Watercolor');
  }
  if (lowerTitle.includes('ink') || lowerTitle.includes('chinese style')) {
    categories.push('Ink');
  }
  if (lowerTitle.includes('retro') || lowerTitle.includes('vintage')) {
    categories.push('Retro');
  }
  if (lowerTitle.includes('cyberpunk') || lowerTitle.includes('sci-fi')) {
    categories.push('Cyberpunk');
  }
  if (lowerTitle.includes('minimalism') || lowerTitle.includes('minimalist')) {
    categories.push('Minimalism');
  }

  if (categories.length === 0) {
    categories.push('General');
  }

  return categories;
}

// 从标题提取标签
function extractTags(title) {
  const tags = [];
  const lowerTitle = title.toLowerCase();
  const keywords = ['anime', 'cyberpunk', 'vintage', 'luxury', 'minimal', 'editorial', 'cinematic',
    'hyper-realistic', 'surrealist', '3d', 'watercolor', 'pixel art', 'portrait', 'landscape',
    'product', 'poster', 'character', 'fashion', 'food', 'architecture', 'surreal', 'fantasy',
    'photography', 'illustration', 'sketch'];

  keywords.forEach(keyword => {
    if (lowerTitle.includes(keyword)) {
      tags.push(keyword);
    }
  });

  return tags.length > 0 ? tags : ['General'];
}

// 创建标准 prompt 对象
function createStandardPrompt(promptNum, title, description, promptText, author, authorUrl, sourceUrl, publishedDate, languages, imageUrls, isFeatured) {
  const id = uuidv4();

  const localImagePaths = imageUrls.map((_, index) => `images/${id}/${index}.jpg`);

  return {
    id: id,
    title: title,
    originalText: promptText,
    textTranslations: {},
    categories: inferCategories(title),
    categoryTranslations: {},
    tags: extractTags(title),
    tagTranslations: {},
    source: {
      repo: CONFIG.repo,
      url: sourceUrl,
      originalId: `prompt-${promptNum}`
    },
    author: author,
    authorUrl: authorUrl,
    imageUrl: imageUrls.length > 0 ? imageUrls[0] : null,
    localImagePaths: localImagePaths,
    extraFields: {
      promptNumber: promptNum,
      description: description,
      isFeatured: isFeatured,
      languages: languages,
      imageUrls: imageUrls
    },
    addedAt: publishedDate || new Date().toISOString()
  };
}

// 解析日期
function parseDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toISOString();
  } catch {
    return null;
  }
}

// 从块中提取 prompt 信息
function extractFromBlock(block) {
  const titleMatch = block.match(/### No\.\s*(\d+):\s*([^\n]+)/);
  if (!titleMatch) return null;

  const num = parseInt(titleMatch[1]);
  const title = titleMatch[2].trim();
  const isFeatured = block.includes('Featured');

  const descMatch = block.match(/#### 📖 Description\r?\n\r?\n([\s\S]*?)(?=\r?\n#### 📝 Prompt)/);
  const description = descMatch ? descMatch[1].trim() : '';

  const promptMatch = block.match(/#### 📝 Prompt\r?\n\r?\n```\r?\n?([\s\S]*?)```/);
  const promptText = promptMatch ? promptMatch[1].trim() : '';

  if (!promptText) return null;

  const imageMatches = block.matchAll(/<img src="(https:\/\/cms-assets\.youmind\.com\/[^"]+)"/g);
  const imageUrls = Array.from(imageMatches).map(m => m[1]);

  const authorMatch = block.match(/\*\*Author:\*\*\s*\[([^\]]+)\]\(([^)]+)\)/);
  const author = authorMatch ? authorMatch[1] : 'Unknown';
  const authorUrl = authorMatch ? authorMatch[2] : null;

  const sourceMatch = block.match(/\*\*Source:\*\*\s*\[([^\]]+)\]\(([^)]+)\)/);
  const sourceUrl = sourceMatch ? sourceMatch[2] : null;

  const publishedMatch = block.match(/\*\*Published:\*\*\s*(.+)/);
  const publishedDate = publishedMatch ? parseDate(publishedMatch[1].trim()) : null;

  const langMatch = block.match(/\*\*Languages:\*\*\s*(.+)/);
  const languages = langMatch ? langMatch[1].trim().split(',').map(l => l.trim()) : [];

  return {
    num,
    title,
    description,
    promptText,
    author,
    authorUrl,
    sourceUrl,
    publishedDate,
    languages,
    isFeatured
  };
}

// 主函数
async function scrape() {
  console.log('开始清洗 YouMind-OpenLab 仓库...\n');
  console.log(`模式: ${CONFIG.useRemote ? '远程' : '本地'}\n`);

  let content;

  if (CONFIG.useRemote) {
    console.log('从 GitHub 获取 README...\n');

    try {
      content = await fetchUrl(CONFIG.readmeUrl);
      console.log(`README 大小: ${(content.length / 1024).toFixed(1)} KB`);
    } catch (error) {
      console.error('获取失败:', error.message);
      process.exit(1);
    }
  } else {
    const readmePath = path.join(UPSTREAM_DIR, 'README.md');
    if (!fs.existsSync(readmePath)) {
      console.error('本地文件不存在，请先克隆上游仓库');
      process.exit(1);
    }
    content = fs.readFileSync(readmePath, 'utf-8');
  }

  const prompts = [];

  // 找到所有 ### No. 的位置
  const promptMatches = [...content.matchAll(/### No\.\s*(\d+):/g)];
  console.log(`找到 ${promptMatches.length} 个 prompts\n`);

  for (let i = 0; i < promptMatches.length; i++) {
    const start = promptMatches[i].index;
    const end = i < promptMatches.length - 1 ? promptMatches[i + 1].index : content.length;
    const block = content.substring(start, end);

    const data = extractFromBlock(block);

    if (data) {
      const prompt = createStandardPrompt(
        data.num,
        data.title,
        data.description,
        data.promptText,
        data.author,
        data.authorUrl,
        data.sourceUrl,
        data.publishedDate,
        data.languages,
        [],
        data.isFeatured
      );
      prompts.push(prompt);
    }
  }

  console.log(`解析到 ${prompts.length} 条 prompts\n`);

  // 保存标准数据
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, 'youmind.json');
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