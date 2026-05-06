const test = require('node:test');
const assert = require('node:assert/strict');

const { parseEvolink } = require('../../scripts/ingestion/sources/evolink');
const { parseFreestylefly } = require('../../scripts/ingestion/sources/freestylefly');
const { parseYouMind } = require('../../scripts/ingestion/sources/youmind');
const { parseZeroLu } = require('../../scripts/ingestion/sources/zerolu');

test('parseEvolink extracts cases, metadata, localized prompt text, and output assets', () => {
  const en = [
    '## E-commerce Cases',
    '### Case 113: [Luxury Perfume](https://x.com/a/status/1) (by [@maker](https://x.com/maker))',
    '| <img src="./images/poster_case113/output.jpg" width="300" alt="Output image"> |',
    '**Prompt:**',
    '```',
    'MAKE A PRODUCT PHOTO',
    '```'
  ].join('\n');
  const zh = en.replace('Luxury Perfume', '奢华香水').replace('MAKE A PRODUCT PHOTO', '制作产品照片');
  const records = parseEvolink({
    readmes: { en, 'zh-CN': zh },
    metadata: {
      records: [
        {
          tweet_url: 'https://x.com/a/status/1',
          category: 'E-commerce Cases',
          case_anchor: '#case-113-luxury-perfume',
          added_at: '2026-04-22T18:00:00+08:00'
        }
      ]
    }
  });

  assert.equal(records.length, 1);
  assert.equal(records[0].localized.en.title, 'Luxury Perfume');
  assert.equal(records[0].localized['zh-CN'].promptText, '制作产品照片');
  assert.equal(records[0].sourceCategories[0].value, 'E-commerce Cases');
  assert.equal(records[0].assets[0].role, 'output');
});

test('parseEvolink applies metadata only to the matching case when source URLs repeat', () => {
  const sharedUrl = 'https://x.com/AlwaveNazca/status/2048147643809865950';
  const en = [
    '## Poster & Illustration Cases',
    `### Case 144: [Luxury Chronograph Watch Ad](${sharedUrl}) (by [@AlwaveNazca](https://x.com/AlwaveNazca))`,
    '| <img src="./images/poster_case144/output.jpg" width="300" alt="Output image"> |',
    '**Prompt:**',
    '```',
    'MAKE A LUXURY WATCH AD',
    '```',
    '',
    `### Case 145: [Neon Nike Lumina Ad Poster](${sharedUrl}) (by [@AlwaveNazca](https://x.com/AlwaveNazca))`,
    '| <img src="./images/poster_case145/output.jpg" width="300" alt="Output image"> |',
    '**Prompt:**',
    '```',
    'MAKE A NEON NIKE POSTER',
    '```'
  ].join('\n');

  const records = parseEvolink({
    readmes: { en },
    metadata: {
      records: [
        {
          tweet_url: sharedUrl,
          category: 'Poster & Illustration Cases',
          case_anchor: '#case-144-luxury-chronograph-watch-ad',
          image_dir: 'images/poster_case144',
          added_at: '2026-04-22T18:00:00+08:00'
        }
      ]
    }
  });

  const watch = records.find(record => record.localized.en.title === 'Luxury Chronograph Watch Ad');
  const nike = records.find(record => record.localized.en.title === 'Neon Nike Lumina Ad Poster');

  assert.equal(watch.originalId, 'case-144-luxury-chronograph-watch-ad');
  assert.equal(watch.addedAt, '2026-04-22T18:00:00+08:00');
  assert.equal(nike.originalId, 'case-145');
  assert.equal(nike.addedAt, null);
  assert.equal(nike.assets[0].upstreamPath, './images/poster_case145/output.jpg');
});

test('parseEvolink keeps different cases separate when upstream image paths collide', () => {
  const sharedImage = 'https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-prompts/main/images/poster_case169/output.jpg';
  const en = [
    '## Ad Creative Cases',
    '### Case 169: [Luxury chocolate campaign system](https://x.com/SPEEDAI07/status/2049459155086500321) (by [@SPEEDAI07](https://x.com/SPEEDAI07))',
    `| <img src="${sharedImage}" width="300" alt="Output image"> |`,
    '**Prompt:**',
    '```',
    'Create a premium chocolate advertisement.',
    '```',
    '',
    '## Poster & Illustration Cases',
    '### Case 169: [Topographic Letter Satellite Panels](https://x.com/madpencil_/status/2049080259476349218) (by [@madpencil_](https://x.com/madpencil_))',
    `| <img src="${sharedImage}" width="300" alt="Output image"> |`,
    '**Prompt:**',
    '```',
    'Create satellite panels spelling MADPENCIL.',
    '```'
  ].join('\n');

  const records = parseEvolink({
    readmes: { en },
    metadata: {
      records: [
        {
          tweet_url: 'https://x.com/madpencil_/status/2049080259476349218',
          category: 'Poster & Illustration Cases',
          case_anchor: '#case-169-topographic-letter-satellite-panels-by-madpencil',
          image_dir: 'images/poster_case169',
          added_at: '2026-04-28T18:00:00+08:00'
        },
        {
          tweet_url: 'https://x.com/SPEEDAI07/status/2049459155086500321',
          category: 'Ad Creative Cases',
          case_anchor: '#case-169-luxury-chocolate-campaign-system-by-speedai07',
          image_dir: 'images/poster_case169',
          added_at: '2026-04-29T21:10:00+08:00'
        }
      ]
    }
  });

  const chocolate = records.find(record => record.localized.en.title === 'Luxury chocolate campaign system');
  const topographic = records.find(record => record.localized.en.title === 'Topographic Letter Satellite Panels');

  assert.equal(records.length, 2);
  assert.equal(chocolate.assets.length, 1);
  assert.equal(topographic.assets.length, 0);
  assert.equal(topographic.localized.en.promptText, 'Create satellite panels spelling MADPENCIL.');
});

test('parseEvolink drops collided image paths when collision metadata is incomplete', () => {
  const sharedImage = './images/poster_case169/output.jpg';
  const en = [
    '## Ad Creative Cases',
    '### Case 169: [Luxury chocolate campaign system](https://x.com/SPEEDAI07/status/2049459155086500321) (by [@SPEEDAI07](https://x.com/SPEEDAI07))',
    `| <img src="${sharedImage}" width="300" alt="Output image"> |`,
    '**Prompt:**',
    '```',
    'Create a premium chocolate advertisement.',
    '```',
    '',
    '## Poster & Illustration Cases',
    '### Case 169: [Topographic Letter Satellite Panels](https://x.com/madpencil_/status/2049080259476349218) (by [@madpencil_](https://x.com/madpencil_))',
    `| <img src="${sharedImage}" width="300" alt="Output image"> |`,
    '**Prompt:**',
    '```',
    'Create satellite panels spelling MADPENCIL.',
    '```'
  ].join('\n');

  const records = parseEvolink({
    readmes: { en },
    metadata: {
      records: [
        {
          tweet_url: 'https://x.com/madpencil_/status/2049080259476349218',
          category: 'Poster & Illustration Cases',
          case_anchor: '#case-169-topographic-letter-satellite-panels-by-madpencil',
          image_dir: 'images/poster_case169',
          added_at: '2026-04-28T18:00:00+08:00'
        }
      ]
    }
  });

  assert.equal(records.length, 2);
  assert.equal(records[0].assets.length, 0);
  assert.equal(records[1].assets.length, 0);
});

test('parseEvolink reads split case files with their file category and location', () => {
  const poster = [
    '# Poster & Illustration Cases',
    '### Case 169: [Topographic Letter Satellite Panels](https://x.com/madpencil_/status/2049080259476349218) (by [@madpencil_](https://x.com/madpencil_))',
    '| <img src="./images/poster_case169/output.jpg" width="300" alt="Output image"> |',
    '**Prompt:**',
    '```',
    'Create satellite panels spelling MADPENCIL.',
    '```'
  ].join('\n');

  const records = parseEvolink({
    caseFiles: [
      {
        path: 'cases/poster.md',
        language: 'en',
        category: 'Poster & Illustration Cases',
        content: poster
      }
    ],
    metadata: { records: [] }
  });

  assert.equal(records.length, 1);
  assert.equal(records[0].sourceCategories[0].value, 'Poster & Illustration Cases');
  assert.equal(records[0].references[0].locations[0].file, 'cases/poster.md');
});

test('parseFreestylefly extracts Chinese gallery cases and derived categories', () => {
  const content = [
    '### 例 1：信息图可视化设计',
    '',
    '![城市生命系统图谱](../data/images/case1.jpg)',
    '',
    '**来源：** [@maker](https://x.com/maker)',
    '',
    '**提示词：**',
    '```text',
    'Vertical infographic prompt',
    '```'
  ].join('\n');

  const records = parseFreestylefly({ files: [{ path: 'docs/gallery-part-1.md', content }] });

  assert.equal(records.length, 1);
  assert.equal(records[0].localized['zh-CN'].title, '信息图可视化设计');
  assert.equal(records[0].localized['zh-CN'].promptText, 'Vertical infographic prompt');
  assert.equal(records[0].sourceCategories[0].source, 'derived');
  assert.equal(records[0].references[0].authors[0].name, 'maker');
});

test('parseFreestylefly splits labeled Chinese and English prompt sections', () => {
  const content = [
    '### 例 213：金瓶梅古风开放世界游戏截图',
    '',
    '![金瓶梅古风开放世界游戏截图](../data/images/case213.jpg)',
    '',
    '**来源：** op7418',
    '',
    '**提示词：**',
    '```text',
    '[中文]',
    '帮我生成一个以《金瓶梅》为主题的古代 ARPG MMO 开放世界游戏的截图',
    '',
    '[English]',
    'Help me generate a screenshot of an ancient ARPG MMO open-world game themed around Jin Ping Mei.',
    '```'
  ].join('\n');

  const records = parseFreestylefly({ files: [{ path: 'docs/gallery-part-2.md', content }] });

  assert.equal(records.length, 1);
  assert.equal(
    records[0].localized['zh-CN'].promptText,
    '帮我生成一个以《金瓶梅》为主题的古代 ARPG MMO 开放世界游戏的截图'
  );
  assert.equal(
    records[0].localized.en.promptText,
    'Help me generate a screenshot of an ancient ARPG MMO open-world game themed around Jin Ping Mei.'
  );
});

test('parseFreestylefly keeps structured bracket headings when they are not language labels', () => {
  const content = [
    '### 例 78：图像生成案例图',
    '',
    '![\\[CORE TASK\\]',
    'Transform the provided input image](../data/images/case78.jpg)',
    '',
    '**来源：** [@maker](https://x.com/maker)',
    '',
    '**提示词：**',
    '```text',
    '[CORE TASK]',
    'Transform the provided input image into a pose-and-light analysis sheet.',
    '',
    '[NEGATIVE]',
    'Do not create a finished character illustration.',
    '```'
  ].join('\n');

  const records = parseFreestylefly({ files: [{ path: 'docs/gallery-part-1.md', content }] });

  assert.equal(records.length, 1);
  assert.equal(records[0].localized.en, undefined);
  assert.match(records[0].localized['zh-CN'].promptText, /^\[CORE TASK\]/);
  assert.equal(records[0].assets.length, 1);
  assert.equal(records[0].assets[0].upstreamPath, '../data/images/case78.jpg');
});

test('parseFreestylefly does not split a single language label without a paired translation', () => {
  const content = [
    '### 例 999：单语言英文标签提示词',
    '',
    '![单语言英文标签提示词](../data/images/case999.jpg)',
    '',
    '**来源：** maker',
    '',
    '**提示词：**',
    '```text',
    '[English]',
    'Only one labeled section exists.',
    '```'
  ].join('\n');

  const records = parseFreestylefly({ files: [{ path: 'docs/gallery-part-2.md', content }] });

  assert.equal(records.length, 1);
  assert.equal(records[0].localized.en, undefined);
  assert.equal(records[0].localized['zh-CN'].promptText, '[English]\nOnly one labeled section exists.');
});

test('parseFreestylefly preserves language-specific placeholders around bilingual labels', () => {
  const content = [
    '### 例 297：手写食谱变身杂志级跨页',
    '',
    '![手写食谱变身杂志级跨页](../data/images/case297.jpg)',
    '',
    '**来源：** maker',
    '',
    '**提示词：**',
    '```text',
    '[中文]',
    '手写食谱生成专业食谱页面。',
    '',
    '[INSERT_RECIPE_LINK]',
    '',
    '[English]',
    'Generate a professional cookbook page from a handwritten recipe.',
    '',
    '[INSERT_RECIPE_LINK]',
    '```'
  ].join('\n');

  const records = parseFreestylefly({ files: [{ path: 'docs/gallery-part-2.md', content }] });

  assert.match(records[0].localized['zh-CN'].promptText, /\[INSERT_RECIPE_LINK\]$/);
  assert.match(records[0].localized.en.promptText, /\[INSERT_RECIPE_LINK\]$/);
  assert.doesNotMatch(records[0].localized['zh-CN'].promptText, /\[English\]/);
});

test('parseYouMind aligns language variants by source URL and does not collapse repeated No headings', () => {
  const en = [
    '## Featured Prompts',
    '### No. 1: Featured One',
    '#### 📖 Description',
    '',
    'Featured description',
    '',
    '#### 📝 Prompt',
    '```',
    'Featured prompt',
    '```',
    '#### 🖼️ Generated Images',
    '<img src="https://cms-assets.youmind.com/media/a.jpg" width="700" alt="Featured One - Image 1">',
    '#### 📌 Details',
    '- **Author:** [Maker](https://x.com/maker)',
    '- **Source:** [Twitter Post](https://x.com/maker/status/1)',
    '- **Published:** April 19, 2026',
    '- **Languages:** en',
    '',
    '## All Prompts',
    '### No. 1: All One',
    '#### 📖 Description',
    '',
    'All description',
    '',
    '#### 📝 Prompt',
    '```',
    'All prompt',
    '```',
    '#### 🖼️ Generated Images',
    '<img src="https://cms-assets.youmind.com/media/b.jpg" width="700" alt="All One - Image 1">',
    '#### 📌 Details',
    '- **Author:** [Other](https://x.com/other)',
    '- **Source:** [Twitter Post](https://x.com/other/status/2)',
    '- **Published:** April 20, 2026',
    '- **Languages:** en'
  ].join('\n');

  const zh = en
    .replace('Featured One', '精选一')
    .replace('Featured description', '精选描述')
    .replace('Featured prompt', '精选提示词')
    .replace('All One', '全部一')
    .replace('All description', '全部描述')
    .replace('All prompt', '全部提示词')
    .replace('- **Author:**', '- **作者:**')
    .replaceAll('- **Source:**', '- **来源:**')
    .replaceAll('- **Published:**', '- **发布时间:**');

  const records = parseYouMind({ readmes: { en, 'zh-CN': zh } });

  assert.equal(records.length, 2);
  assert.equal(records[0].localized.en.title, 'Featured One');
  assert.equal(records[0].localized['zh-CN'].title, '精选一');
  assert.equal(records[1].localized.en.title, 'All One');
  assert.equal(records[1].localized['zh-CN'].promptText, '全部提示词');
});

test('parseZeroLu extracts localized README prompt sections, sources, categories, and assets', () => {
  const en = [
    '## 📷 Photography & Photorealism',
    'Prompts for creating ultra-realistic scenes.',
    '',
    '### Convenience Store Night Scene',
    '| Nano Banana 2 | GPT-Image |',
    '|:-------------:|:---------:|',
    '| ![Nano Banana 2](https://pbs.twimg.com/media/a.jpg) | <img width="500" alt="GPT Image" src="https://pbs.twimg.com/media/b.jpg" /> |',
    '',
    '**Prompt:**',
    '```text',
    'Create an ultra-realistic urban street group photo at a convenience store entrance at 10 PM summer night.',
    '```',
    '*Source: [卡尔的AI沃茨](https://mp.weixin.qq.com/s/example)*'
  ].join('\n');
  const zh = [
    '## 📷 摄影与照片级写实',
    '用于生成超真实场景。',
    '',
    '### 便利店夜景',
    '| Nano Banana 2 | GPT-Image |',
    '|:-------------:|:---------:|',
    '| ![Nano Banana 2](https://pbs.twimg.com/media/a.jpg) | <img width="500" alt="GPT Image" src="https://pbs.twimg.com/media/b.jpg" /> |',
    '',
    '**提示词:**',
    '```text',
    '在夏夜晚上 10 点的便利店门口，生成一张超写实的城市街头多人合影。',
    '```',
    '*来源: [卡尔的AI沃茨](https://mp.weixin.qq.com/s/example)*'
  ].join('\n');

  const records = parseZeroLu({ readmes: { en, 'zh-CN': zh } });

  assert.equal(records.length, 1);
  assert.equal(records[0].localized.en.title, 'Convenience Store Night Scene');
  assert.equal(records[0].localized['zh-CN'].title, '便利店夜景');
  assert.match(records[0].localized.en.promptText, /convenience store/);
  assert.match(records[0].localized['zh-CN'].promptText, /便利店门口/);
  assert.equal(records[0].sourceCategories.some(category => category.value === '📷 Photography & Photorealism'), true);
  assert.equal(records[0].sourceCategories.some(category => category.value === '📷 摄影与照片级写实'), true);
  assert.equal(records[0].assets.length, 2);
  assert.equal(records[0].assets[0].upstreamUrl, 'https://pbs.twimg.com/media/a.jpg');
  assert.equal(records[0].references.length, 1);
  assert.equal(records[0].references[0].locations.length, 2);
  assert.equal(records[0].references[0].url, 'https://mp.weixin.qq.com/s/example');
});

test('parseZeroLu keeps original prompt notes and useful English translations without dropping non-English originals', () => {
  const readme = [
    '## 🎮 Game & Entertainment',
    '',
    '### Japanese Social Game Gacha Screen',
    '<img width="500" alt="Japanese Social Game Gacha Screen" src="https://pbs.twimg.com/media/gacha.jpg" />',
    '',
    '**Prompt:**',
    '```text',
    '日本のソシャゲのガチャ画面を生成して、',
    '```',
    '**English Translation:** Generate a Japanese social game gacha screen.',
    '**Source:** [@the_wheel_2024](https://x.com/the_wheel_2024/status/2046519658166317160)',
    '',
    '### 2003 Digital Camera Family Snapshot',
    '<img width="500" alt="2003 Digital Camera Family Snapshot" src="https://pbs.twimg.com/media/family.jpg" />',
    '',
    '**Prompt:**',
    '```text',
    'Generate a photo from 2003, shot with a digital camera, of five-year-old me with my mom and dad.',
    '```',
    '**English Translation:** Original prompt: `生成一张 2003 年，用数码相机拍摄的，5 岁的我和爸爸妈妈的照片。`',
    '**Source:** [@pangyusio](https://x.com/pangyusio/status/2046991223395950810)'
  ].join('\n');

  const records = parseZeroLu({ readmes: { en: readme } });
  const gacha = records.find(record => record.localized.en.title === 'Japanese Social Game Gacha Screen');
  const family = records.find(record => record.localized.en.title === '2003 Digital Camera Family Snapshot');

  assert.equal(gacha.localized.en.promptText, 'Generate a Japanese social game gacha screen.');
  assert.equal(gacha.localized.ja.promptText, '日本のソシャゲのガチャ画面を生成して、');
  assert.equal(family.localized.en.promptText, 'Generate a photo from 2003, shot with a digital camera, of five-year-old me with my mom and dad.');
  assert.equal(family.localized['zh-CN'].promptText, '生成一张 2003 年，用数码相机拍摄的，5 岁的我和爸爸妈妈的照片。');
});
