const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { readAiConfig, writeAiConfig } = require('../../scripts/workbench/config');

test('writeAiConfig preserves unrelated .env keys and readAiConfig masks the key', () => {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'workbench-config-'));
  fs.writeFileSync(path.join(projectRoot, '.env'), [
    'OTHER_SETTING=keep-me',
    'ZHIPUAI_API_KEY=old-key',
    'ZHIPUAI_MODEL=old-model'
  ].join('\n'), 'utf-8');

  writeAiConfig(projectRoot, {
    apiKey: 'zhipu-secret-123456',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    model: 'glm-4.5-flash'
  });

  const content = fs.readFileSync(path.join(projectRoot, '.env'), 'utf-8');
  assert.match(content, /OTHER_SETTING=keep-me/);
  assert.match(content, /ZHIPUAI_API_KEY=zhipu-secret-123456/);
  assert.match(content, /ZHIPUAI_BASE_URL=https:\/\/open\.bigmodel\.cn\/api\/paas\/v4/);
  assert.match(content, /ZHIPUAI_MODEL=glm-4\.5-flash/);

  const config = readAiConfig(projectRoot, {});
  assert.equal(config.provider, 'zhipu');
  assert.equal(config.hasApiKey, true);
  assert.equal(config.maskedApiKey, '************3456');
  assert.equal(config.apiKey, undefined);
  assert.equal(config.model, 'glm-4.5-flash');
});

test('publish workflow uses Zhipu secrets instead of legacy provider names', () => {
  const workflow = fs.readFileSync(path.join(__dirname, '..', '..', '.github', 'workflows', 'publish.yml'), 'utf-8');
  const legacyProviderPattern = new RegExp(['DEEP', 'SEEK'].join(''), 'i');

  assert.match(workflow, /ZHIPUAI_API_KEY/);
  assert.match(workflow, /ZHIPUAI_BASE_URL/);
  assert.match(workflow, /ZHIPUAI_MODEL/);
  assert.doesNotMatch(workflow, legacyProviderPattern);
});
