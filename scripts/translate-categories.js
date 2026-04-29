/**
 * 分类翻译脚本
 *
 * 使用 DeepSeek API 将非英文分类翻译成英文
 * 支持增量翻译，只翻译新出现的分类
 *
 * 运行方式:
 * - 本地: node scripts/translate-categories.js
 * - 远程: USE_REMOTE=true node scripts/translate-categories.js
 * - 指定 API Key: DEEPSEEK_API_KEY=xxx node scripts/translate-categories.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// 路径配置
const PROJECT_ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(PROJECT_ROOT, 'data');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');

// DeepSeek API 配置
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 检查是否配置了 API Key
function hasApiKey() {
  return !!DEEPSEEK_API_KEY;
}

// 翻译单个分类
async function translateCategory(category, retries = 3) {
  if (isEnglish(category)) {
    return category;
  }

  for (let i = 0; i < retries; i++) {
    try {
      const response = await postJson(DEEPSEEK_API_URL, {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: `Translate the following category name to English. Only return the English translation, nothing else.\n\nCategory: ${category}`
          }
        ],
        temperature: 0.3,
        max_tokens: 50
      }, DEEPSEEK_API_KEY);

      const translation = response.choices[0].message.content.trim();
      console.log(`  翻译: "${category}" -> "${translation}"`);
      return translation;
    } catch (error) {
      console.error(`  翻译失败 (尝试 ${i + 1}/${retries}):`, error.message);
      if (i < retries - 1) {
        await sleep(1000 * (i + 1));
      }
    }
  }
  return category; // 翻译失败返回原文
}

// HTTP POST 请求
function postJson(url, data, apiKey) {
  return new Promise((resolve, reject) => {
    const dataStr = JSON.stringify(data);

    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(dataStr)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`JSON parse error: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(dataStr);
    req.end();
  });
}

// 延迟函数
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 判断是否为英文
function isEnglish(text) {
  // 检查是否包含中文字符
  const chineseRegex = /[一-鿿]/;
  if (chineseRegex.test(text)) return false;

  // 检查是否包含日文字符
  const japaneseRegex = /[぀-ゟ゠-ヿ]/;
  if (japaneseRegex.test(text)) return false;

  // 检查是否包含韩文字符
  const koreanRegex = /[가-힯]/;
  if (koreanRegex.test(text)) return false;

  // 检查是否包含其他非 ASCII 字符（俄语等）
  const nonAscii = text.split('').filter(c => c.charCodeAt(0) > 127);
  if (nonAscii.length > text.length * 0.3) return false;

  return true;
}

// 从 prompts.json 提取所有分类
function extractCategoriesFromPrompts() {
  const promptsFile = path.join(DATA_DIR, 'prompts.json');

  if (!fs.existsSync(promptsFile)) {
    console.error('prompts.json 不存在，请先运行工作流');
    return [];
  }

  const data = JSON.parse(fs.readFileSync(promptsFile, 'utf-8'));
  const categorySet = new Set();

  data.data.forEach(prompt => {
    if (prompt.categories && Array.isArray(prompt.categories)) {
      prompt.categories.forEach(cat => categorySet.add(cat));
    }
  });

  return Array.from(categorySet);
}

// 主函数
async function main() {
  console.log('=== 分类翻译脚本 ===\n');

  // 检查 API Key
  if (!hasApiKey()) {
    console.log('⚠️ 未配置 DEEPSEEK_API_KEY，跳过翻译');
    console.log('   请设置环境变量: DEEPSEEK_API_KEY=your_key node scripts/translate-categories.js\n');

    // 只显示需要翻译的分类
    const allCategories = extractCategoriesFromPrompts();
    const nonEnglish = allCategories.filter(c => !isEnglish(c));

    console.log('当前分类数量:', allCategories.length);
    console.log('非英文分类数量:', nonEnglish.length);
    console.log('\n非英文分类:');
    nonEnglish.forEach(cat => console.log(`  - ${cat}`));

    return;
  }

  // 读取现有分类配置
  let config = {
    categories: [],
    translatedCategories: {},
    lastUpdated: null
  };

  if (fs.existsSync(CATEGORIES_FILE)) {
    try {
      config = JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf-8'));
    } catch (e) {
      // 忽略
    }
  }

  // 提取所有分类
  const allCategories = extractCategoriesFromPrompts();
  console.log(`发现 ${allCategories.length} 个分类\n`);

  // 显示非英文分类
  const nonEnglish = allCategories.filter(c => !isEnglish(c));
  console.log('非英文分类:');
  nonEnglish.forEach(cat => console.log(`  - ${cat}`));
  console.log('');

  // 翻译非英文分类
  if (nonEnglish.length === 0) {
    console.log('✓ 所有分类已是英文，无需翻译');
    return;
  }

  console.log(`开始翻译 ${nonEnglish.length} 个分类...\n`);

  for (const category of nonEnglish) {
    if (!config.translatedCategories[category]) {
      const translation = await translateCategory(category);
      config.translatedCategories[category] = translation;
      await sleep(500); // 避免 API 限流
    }
  }

  // 更新所有分类的翻译
  config.categories = allCategories.map(cat => {
    if (isEnglish(cat)) return cat;
    return config.translatedCategories[cat] || cat;
  });

  config.lastUpdated = new Date().toISOString();

  // 保存配置
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(config, null, 2), 'utf-8');
  console.log(`\n✓ 分类配置已更新: ${CATEGORIES_FILE}`);

  // 显示翻译结果
  console.log('\n--- 翻译结果 ---');
  Object.entries(config.translatedCategories).forEach(([orig, trans]) => {
    console.log(`  ${orig} -> ${trans}`);
  });

  // 同时更新 prompts.json 中的 categoryTranslations
  updatePromptsCategoryTranslations(config.translatedCategories);
}

// 更新 prompts.json 中的 categoryTranslations
function updatePromptsCategoryTranslations(translations) {
  const promptsFile = path.join(DATA_DIR, 'prompts.json');

  if (!fs.existsSync(promptsFile)) return;

  const data = JSON.parse(fs.readFileSync(promptsFile, 'utf-8'));

  data.data.forEach(prompt => {
    if (prompt.categories && Array.isArray(prompt.categories)) {
      prompt.categories.forEach(cat => {
        if (!isEnglish(cat) && translations[cat]) {
          if (!prompt.categoryTranslations) {
            prompt.categoryTranslations = {};
          }
          prompt.categoryTranslations[cat] = translations[cat];
        }
      });
    }
  });

  fs.writeFileSync(promptsFile, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✓ 已更新 prompts.json 中的翻译`);
}

// 运行
main().catch(console.error);