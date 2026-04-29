/**
 * 分类翻译脚本
 *
 * 使用 DeepSeek API 将非英文分类翻译成英文
 * 支持增量翻译，只翻译新出现的分类
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

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
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: `Translate the following category name to English. Only return the English translation, nothing else.\n\nCategory: ${category}`
            }
          ],
          temperature: 0.3,
          max_tokens: 50
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          },
          timeout: 30000
        }
      );

      const translation = response.data.choices[0].message.content.trim();
      console.log(`  翻译: "${category}" -> "${translation}"`);
      return translation;
    } catch (error) {
      console.error(`  翻译失败 (尝试 ${i + 1}/${retries}):`, error.message);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
  return category; // 翻译失败返回原文
}

// 批量翻译分类
async function translateCategories(categories, existingTranslations = {}) {
  const translations = { ...existingTranslations };
  const toTranslate = categories.filter(c => !translations[c] && !isEnglish(c));

  if (toTranslate.length === 0) {
    console.log('没有需要翻译的新分类');
    return translations;
  }

  if (!hasApiKey()) {
    console.log('未配置 DeepSeek API Key，跳过翻译');
    console.log('需要翻译的分类:', toTranslate);
    return translations;
  }

  console.log(`\n开始翻译 ${toTranslate.length} 个分类...\n`);

  for (const category of toTranslate) {
    const translation = await translateCategory(category);
    translations[category] = translation;
    // 添加延迟避免 API 限流
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return translations;
}

// 判断是否为英文（简单检测）
function isEnglish(text) {
  // 检查是否包含中文字符
  const chineseRegex = /[一-龥㐀-䶿]/;
  if (chineseRegex.test(text)) return false;

  // 检查是否包含日文字符
  const japaneseRegex = /[぀-ゟ゠-ヿ]/;
  if (japaneseRegex.test(text)) return false;

  // 检查是否包含韩文字符
  const koreanRegex = /[가-힯]/;
  if (koreanRegex.test(text)) return false;

  // 其他非ASCII字符
  const nonAscii = text.split('').filter(c => c.charCodeAt(0) > 127);
  if (nonAscii.length > text.length * 0.3) return false;

  return true;
}

// 从清洗后的数据中提取所有分类
function extractAllCategories(dataFiles) {
  const categories = new Set();

  dataFiles.forEach(file => {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    if (data.data && Array.isArray(data.data)) {
      data.data.forEach(prompt => {
        if (prompt.categories && Array.isArray(prompt.categories)) {
          prompt.categories.forEach(cat => categories.add(cat));
        }
      });
    }
  });

  return Array.from(categories);
}

// 主函数
async function main() {
  console.log('=== 分类翻译脚本 ===\n');

  // 读取当前分类配置
  let config;
  try {
    config = JSON.parse(fs.readFileSync(CATEGORIES_FILE, 'utf-8'));
  } catch (error) {
    config = {
      categories: [],
      sourceCategories: {},
      translatedCategories: {},
      lastUpdated: null
    };
  }

  // 查找所有清洗后的数据文件
  const dataFiles = fs.readdirSync(DATA_DIR)
    .filter(f => f.endsWith('.json') && f !== 'categories.json' && f !== 'prompts.json')
    .map(f => path.join(DATA_DIR, f));

  console.log(`找到 ${dataFiles.length} 个数据文件`);

  // 提取所有分类
  const allCategories = extractAllCategories(dataFiles);
  console.log(`发现 ${allCategories.length} 个分类\n`);

  // 显示非英文分类
  const nonEnglish = allCategories.filter(c => !isEnglish(c));
  console.log('非英文分类:', nonEnglish.length > 0 ? nonEnglish : '无');

  // 翻译新分类
  const translations = await translateCategories(allCategories, config.translatedCategories);

  // 更新配置
  config.translatedCategories = translations;
  config.lastUpdated = new Date().toISOString();

  // 合并所有英文分类
  const englishCategories = allCategories.map(c => {
    if (isEnglish(c)) return c;
    return translations[c] || c;
  });

  // 去重并排序
  config.categories = [...new Set(englishCategories)].sort();

  // 保存配置
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(config, null, 2), 'utf-8');
  console.log(`\n分类配置已更新: ${CATEGORIES_FILE}`);
  console.log(`当前共有 ${config.categories.length} 个分类`);

  // 显示分类列表
  console.log('\n--- 分类列表 ---');
  config.categories.forEach((cat, i) => {
    console.log(`  ${i + 1}. ${cat}`);
  });

  return config;
}

// 运行
main().catch(console.error);