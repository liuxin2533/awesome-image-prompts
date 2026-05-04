const fs = require('fs');
const path = require('path');
const https = require('https');
const { normalizeLanguageCode } = require('../core/text');

function readUtf8(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve, reject);
        return;
      }
      if (res.statusCode >= 400) {
        reject(new Error(`GET ${url} failed with ${res.statusCode}`));
        return;
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function languageFromReadme(filename) {
  const base = path.basename(filename);
  if (base === 'README.md') return 'en';
  const match = base.match(/^README[_-]([^.]+)\.md$/i);
  if (!match) return 'und';
  return normalizeLanguageCode(match[1]);
}

function absolutizeGithubRaw(baseUrl, assetPath) {
  if (!assetPath) return null;
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  const clean = assetPath.replace(/^\.\//, '').replace(/^\.\.\//, '');
  return `${baseUrl.replace(/\/$/, '')}/${clean}`;
}

function inferImageRole(image) {
  const haystack = `${image.alt || ''} ${image.src || ''}`.toLowerCase();
  if (haystack.includes('output') || haystack.includes('generated') || haystack.includes('case')) return 'output';
  if (haystack.includes('input')) return 'input';
  if (haystack.includes('reference')) return 'reference';
  return 'unknown';
}

function parseMarkdownLink(value) {
  const match = String(value || '').match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!match) return null;
  return { text: match[1], href: match[2] };
}

function parseDateLoose(value) {
  if (!value) return null;
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) return date.toISOString();
  return String(value).trim();
}

module.exports = {
  readUtf8,
  fileExists,
  fetchUrl,
  languageFromReadme,
  absolutizeGithubRaw,
  inferImageRole,
  parseMarkdownLink,
  parseDateLoose
};

