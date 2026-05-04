#!/usr/bin/env node

const fs = require('fs');
const http = require('http');
const path = require('path');
const { createZhipuProvider } = require('../ingestion/translation');
const { createActionRunner } = require('./actions');
const { defaultProjectRoot, loadProjectEnv, readAiConfig, writeAiConfig } = require('./config');
const { readReport } = require('./report');

const STATIC_DIR = path.join(__dirname, 'static');

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store'
  });
  response.end(JSON.stringify(payload, null, 2));
}

function sendText(response, statusCode, text, contentType = 'text/plain; charset=utf-8') {
  response.writeHead(statusCode, {
    'content-type': contentType,
    'cache-control': 'no-store'
  });
  response.end(text);
}

function contentTypeFor(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8';
  if (filePath.endsWith('.css')) return 'text/css; charset=utf-8';
  if (filePath.endsWith('.js')) return 'text/javascript; charset=utf-8';
  return 'application/octet-stream';
}

function safeStaticPath(urlPath) {
  const pathname = urlPath === '/' ? '/index.html' : urlPath;
  const fullPath = path.resolve(STATIC_DIR, `.${pathname}`);
  if (!(fullPath === STATIC_DIR || fullPath.startsWith(STATIC_DIR + path.sep))) return null;
  return fullPath;
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf-8'));
}

function createWorkbenchServer(options = {}) {
  const projectRoot = options.projectRoot || defaultProjectRoot();
  const runner = options.runner || createActionRunner({ projectRoot });

  return http.createServer(async (request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1');

    try {
      if (request.method === 'GET' && url.pathname === '/api/report') {
        return sendJson(response, 200, readReport(projectRoot));
      }

      if (request.method === 'GET' && url.pathname === '/api/config') {
        return sendJson(response, 200, readAiConfig(projectRoot));
      }

      if (request.method === 'POST' && url.pathname === '/api/config/ai') {
        const body = await readJsonBody(request);
        return sendJson(response, 200, writeAiConfig(projectRoot, body));
      }

      if (request.method === 'POST' && url.pathname === '/api/config/test') {
        loadProjectEnv(projectRoot);
        const provider = createZhipuProvider();
        await provider({
          sourceLanguage: 'en',
          targetLanguage: 'zh-CN',
          fieldPath: 'config.test',
          text: 'Connection test'
        });
        return sendJson(response, 200, { ok: true, provider: 'zhipu', model: readAiConfig(projectRoot).model });
      }

      if (request.method === 'POST' && url.pathname.startsWith('/api/actions/')) {
        const type = url.pathname.slice('/api/actions/'.length);
        const body = await readJsonBody(request);
        if (type === 'issue') {
          const report = readReport(projectRoot);
          if (!Number.isInteger(body.index) || body.index < 0 || body.index >= report.issues.length) {
            return sendJson(response, 400, { error: 'Issue index is invalid.' });
          }
          const record = runner.start('issue', { issue: report.issues[body.index] });
          return sendJson(response, 202, record);
        }
        const record = runner.start(type, body);
        return sendJson(response, 202, record);
      }

      if (request.method === 'GET' && url.pathname.startsWith('/api/actions/')) {
        const id = url.pathname.slice('/api/actions/'.length);
        const record = runner.get(id);
        return record ? sendJson(response, 200, record) : sendJson(response, 404, { error: 'Action not found.' });
      }

      if (request.method === 'GET') {
        const filePath = safeStaticPath(url.pathname);
        if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
          return sendJson(response, 404, { error: 'Not found.' });
        }
        return sendText(response, 200, fs.readFileSync(filePath, 'utf-8'), contentTypeFor(filePath));
      }

      return sendJson(response, 405, { error: 'Method not allowed.' });
    } catch (error) {
      return sendJson(response, error.statusCode || 400, { error: error.message });
    }
  });
}

function main() {
  const port = Number(process.env.WORKBENCH_PORT || 4173);
  const host = '127.0.0.1';
  const server = createWorkbenchServer();
  server.listen(port, host, () => {
    console.log(`Workbench: http://${host}:${port}`);
  });
}

if (require.main === module) {
  main();
}

module.exports = {
  createWorkbenchServer,
  main
};
