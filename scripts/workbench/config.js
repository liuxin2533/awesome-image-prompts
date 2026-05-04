const fs = require('fs');
const path = require('path');

function defaultProjectRoot() {
  return path.join(__dirname, '..', '..');
}

function parseEnv(content) {
  const values = {};
  for (const rawLine of String(content || '').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const index = line.indexOf('=');
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if (!key) continue;
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    values[key] = value;
  }
  return values;
}

function envPath(projectRoot = defaultProjectRoot()) {
  return path.join(projectRoot, '.env');
}

function serializeEnv(values) {
  return `${Object.entries(values).map(([key, value]) => `${key}=${value}`).join('\n')}\n`;
}

function loadProjectEnv(projectRoot = defaultProjectRoot(), targetEnv = process.env) {
  const filePath = envPath(projectRoot);
  if (!fs.existsSync(filePath)) return targetEnv;
  const values = parseEnv(fs.readFileSync(filePath, 'utf-8'));
  for (const [key, value] of Object.entries(values)) {
    if (!targetEnv[key]) targetEnv[key] = value;
  }
  return targetEnv;
}

function maskApiKey(apiKey) {
  if (!apiKey) return null;
  const value = String(apiKey);
  const suffix = value.slice(-4);
  const visibleMaskLength = Math.min(12, Math.max(4, value.length - suffix.length));
  return `${'*'.repeat(visibleMaskLength)}${suffix}`;
}

function readEnvFile(projectRoot = defaultProjectRoot()) {
  const filePath = envPath(projectRoot);
  return fs.existsSync(filePath) ? parseEnv(fs.readFileSync(filePath, 'utf-8')) : {};
}

function readAiConfig(projectRoot = defaultProjectRoot(), runtimeEnv = process.env) {
  const fileEnv = readEnvFile(projectRoot);
  const env = { ...fileEnv, ...Object.fromEntries(Object.entries(runtimeEnv || {}).filter(([, value]) => value)) };
  const apiKey = env.ZHIPUAI_API_KEY || env.AI_TRANSLATION_API_KEY || '';
  return {
    provider: 'zhipu',
    hasApiKey: Boolean(apiKey),
    maskedApiKey: maskApiKey(apiKey),
    baseUrl: env.ZHIPUAI_BASE_URL || env.AI_TRANSLATION_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4',
    model: env.ZHIPUAI_MODEL || env.AI_TRANSLATION_MODEL || 'glm-4.5-flash'
  };
}

function writeAiConfig(projectRoot = defaultProjectRoot(), config = {}) {
  const values = readEnvFile(projectRoot);
  if (config.apiKey !== undefined) values.ZHIPUAI_API_KEY = String(config.apiKey || '').trim();
  if (config.baseUrl !== undefined) values.ZHIPUAI_BASE_URL = String(config.baseUrl || '').trim() || 'https://open.bigmodel.cn/api/paas/v4';
  if (config.model !== undefined) values.ZHIPUAI_MODEL = String(config.model || '').trim() || 'glm-4.5-flash';
  fs.writeFileSync(envPath(projectRoot), serializeEnv(values), 'utf-8');
  return readAiConfig(projectRoot, {});
}

module.exports = {
  defaultProjectRoot,
  envPath,
  loadProjectEnv,
  maskApiKey,
  parseEnv,
  readAiConfig,
  readEnvFile,
  serializeEnv,
  writeAiConfig
};
