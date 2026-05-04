const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const staticRoot = path.join(__dirname, '..', '..', 'scripts', 'workbench', 'static');

test('workbench static UI explains operations in Chinese while keeping warning and error machine labels available', () => {
  const html = fs.readFileSync(path.join(staticRoot, 'index.html'), 'utf-8');
  const app = fs.readFileSync(path.join(staticRoot, 'app.js'), 'utf-8');

  assert.match(html, /提示词目录工作台/);
  assert.match(html, /修正所选问题/);
  assert.match(html, /刷新当前报告/);
  assert.match(html, /操作说明/);
  assert.match(app, /全部 severity/);
  assert.match(app, /单条修正/);
  assert.match(app, /warning/);
  assert.match(app, /error/);
});
