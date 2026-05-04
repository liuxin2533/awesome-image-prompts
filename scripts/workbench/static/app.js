const state = {
  report: null,
  issues: [],
  selectedIssue: null,
  currentActionId: null
};

const $ = selector => document.querySelector(selector);

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

async function requestJson(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || `Request failed: ${response.status}`);
  return payload;
}

function setOptions(select, values, label) {
  select.innerHTML = '';
  select.append(new Option(label, ''));
  for (const value of values || []) select.append(new Option(value, value));
}

function canAutoFix(issue) {
  return issue.code === 'missing_translation' || issue.code === 'asset_not_cached';
}

function actionMeaning(issue) {
  if (issue.code === 'missing_translation') return '用智谱 AI 只补齐这一条缺失翻译。';
  if (issue.code === 'asset_not_cached') return '只下载并缓存这一条资源。';
  return '这类问题需要人工处理，当前没有自动修正。';
}

function renderMetrics(report) {
  $('#metric-errors').textContent = report.summary.error || 0;
  $('#metric-warnings').textContent = report.summary.warning || 0;
  $('#metric-info').textContent = report.summary.info || 0;
  $('#metric-generated').textContent = report.generatedAt ? new Date(report.generatedAt).toLocaleString() : '-';
}

function issueMatches(issue) {
  const text = $('#filter-text').value.trim().toLowerCase();
  const severity = $('#filter-severity').value;
  const code = $('#filter-code').value;
  const resolution = $('#filter-resolution').value;

  if (severity && issue.severity !== severity) return false;
  if (code && issue.code !== code) return false;
  if (resolution && issue.resolutionCommand !== resolution) return false;
  if (!text) return true;

  return [issue.message, issue.promptId, issue.fieldPath, issue.sourceKey, issue.resolutionCommand]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(text);
}

function renderIssues() {
  const tbody = $('#issues');
  const shown = state.issues.filter(issueMatches);
  tbody.innerHTML = '';

  for (const issue of shown) {
    const row = document.createElement('tr');
    row.className = state.selectedIssue === issue ? 'selected' : '';
    row.innerHTML = `
      <td>${escapeHtml(issue.severity || '')}</td>
      <td>${escapeHtml(issue.code || '')}</td>
      <td>${escapeHtml(issue.promptId || '')}</td>
      <td>${escapeHtml(issue.fieldPath || '')}</td>
      <td>${escapeHtml(issue.message || '')}</td>
      <td><button class="row-fix" type="button" ${canAutoFix(issue) ? '' : 'disabled'}>单条修正</button></td>
    `;
    const selectIssue = () => {
      state.selectedIssue = issue;
      $('#issue-detail').textContent = `${actionMeaning(issue)}\n\n${JSON.stringify(issue, null, 2)}`;
      $('#fix-selected').disabled = !canAutoFix(issue);
      renderIssues();
    };
    row.addEventListener('click', selectIssue);
    row.querySelector('.row-fix').addEventListener('click', event => {
      event.stopPropagation();
      selectIssue();
      fixIssue(issue).catch(showError);
    });
    tbody.append(row);
  }

  $('#issue-count').textContent = `显示 ${shown.length} 条`;
}

async function loadReport() {
  state.report = await requestJson('/api/report');
  state.issues = state.report.issues || [];
  renderMetrics(state.report);
  setOptions($('#filter-severity'), state.report.filters.severities, '全部 severity');
  setOptions($('#filter-code'), state.report.filters.codes, '全部 code');
  setOptions($('#filter-resolution'), state.report.filters.resolutionCommands, '全部处理命令');
  renderIssues();
}

async function loadConfig() {
  const config = await requestJson('/api/config');
  $('#ai-base-url').value = config.baseUrl;
  $('#ai-model').value = config.model;
  $('#config-status').textContent = config.hasApiKey ? `已配置 Key：${config.maskedApiKey}` : '还没有配置 API Key。';
}

async function saveConfig() {
  const apiKey = $('#ai-key').value.trim();
  const payload = {
    baseUrl: $('#ai-base-url').value.trim(),
    model: $('#ai-model').value.trim()
  };
  if (apiKey) payload.apiKey = apiKey;
  const config = await requestJson('/api/config/ai', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  $('#ai-key').value = '';
  $('#config-status').textContent = config.hasApiKey ? `已保存：${config.maskedApiKey}` : '已保存配置，但还没有 API Key。';
}

async function testConfig() {
  $('#config-status').textContent = '正在测试智谱连接...';
  const result = await requestJson('/api/config/test', { method: 'POST' });
  $('#config-status').textContent = result.ok ? `连接正常：${result.model}` : '连接测试失败。';
}

async function pollAction(id) {
  const record = await requestJson(`/api/actions/${id}`);
  $('#run-log').textContent = [
    `操作：${record.type}，状态：${record.status}${record.exitCode === null ? '' : `，退出码：${record.exitCode}`}`,
    '',
    ...(record.logs || [])
  ].join('\n');
  if (record.status === 'running') {
    setTimeout(() => pollAction(id).catch(showError), 1200);
  } else if (record.type === 'workflow' && record.status === 'succeeded') {
    await loadReport();
  }
}

async function startAction(button) {
  const action = button.dataset.action;
  const payload = {};
  if (button.dataset.language) payload.language = button.dataset.language;
  const limit = $('#action-limit').value.trim();
  if (limit) payload.limit = Number(limit);
  const record = await requestJson(`/api/actions/${action}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload)
  });
  state.currentActionId = record.id;
  await pollAction(record.id);
}

async function fixIssue(issue) {
  if (!canAutoFix(issue)) {
    throw new Error('这类问题暂时没有自动修正操作。');
  }
  const record = await requestJson('/api/actions/issue', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ index: issue.index })
  });
  state.currentActionId = record.id;
  $('#run-log').textContent = `已开始单条修正：${issue.code}`;
  await pollAction(record.id);
}

function showError(error) {
  $('#run-log').textContent = error.message;
}

async function init() {
  for (const input of ['#filter-text', '#filter-severity', '#filter-code', '#filter-resolution']) {
    $(input).addEventListener('input', renderIssues);
  }
  $('#refresh').addEventListener('click', () => loadReport().catch(showError));
  $('#save-config').addEventListener('click', () => saveConfig().catch(showError));
  $('#test-config').addEventListener('click', () => testConfig().catch(showError));
  $('#fix-selected').addEventListener('click', () => {
    if (state.selectedIssue) fixIssue(state.selectedIssue).catch(showError);
  });
  for (const button of document.querySelectorAll('[data-action]')) {
    button.addEventListener('click', () => startAction(button).catch(showError));
  }
  await Promise.all([loadReport(), loadConfig()]);
}

init().catch(showError);
