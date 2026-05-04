const test = require('node:test');
const assert = require('node:assert/strict');

const { parseEvolink } = require('../../scripts/ingestion/sources/evolink');
const { parseFreestylefly } = require('../../scripts/ingestion/sources/freestylefly');
const { parseYouMind } = require('../../scripts/ingestion/sources/youmind');

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
