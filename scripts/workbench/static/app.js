const state = {
  report: null,
  issues: [],
  selectedIssue: null,
  currentActionId: null
};

const $ = selector => document.querySelector(selector);

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
      <td>${issue.severity || ''}</td>
      <td>${issue.code || ''}</td>
      <td>${issue.promptId || ''}</td>
      <td>${issue.fieldPath || ''}</td>
      <td>${issue.message || ''}</td>
    `;
    row.addEventListener('click', () => {
      state.selectedIssue = issue;
      $('#issue-detail').textContent = JSON.stringify(issue, null, 2);
      renderIssues();
    });
    tbody.append(row);
  }

  $('#issue-count').textContent = `${shown.length} shown`;
}

async function loadReport() {
  state.report = await requestJson('/api/report');
  state.issues = state.report.issues || [];
  renderMetrics(state.report);
  setOptions($('#filter-severity'), state.report.filters.severities, 'All severities');
  setOptions($('#filter-code'), state.report.filters.codes, 'All codes');
  setOptions($('#filter-resolution'), state.report.filters.resolutionCommands, 'All commands');
  renderIssues();
}

async function loadConfig() {
  const config = await requestJson('/api/config');
  $('#ai-base-url').value = config.baseUrl;
  $('#ai-model').value = config.model;
  $('#config-status').textContent = config.hasApiKey ? `Key configured: ${config.maskedApiKey}` : 'No API key configured.';
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
  $('#config-status').textContent = config.hasApiKey ? `Saved: ${config.maskedApiKey}` : 'Config saved without an API key.';
}

async function testConfig() {
  $('#config-status').textContent = 'Testing Zhipu connection...';
  const result = await requestJson('/api/config/test', { method: 'POST' });
  $('#config-status').textContent = result.ok ? `Connection OK: ${result.model}` : 'Connection test failed.';
}

async function pollAction(id) {
  const record = await requestJson(`/api/actions/${id}`);
  $('#run-log').textContent = [
    `${record.type} ${record.status}${record.exitCode === null ? '' : ` (exit ${record.exitCode})`}`,
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
  for (const button of document.querySelectorAll('[data-action]')) {
    button.addEventListener('click', () => startAction(button).catch(showError));
  }
  await Promise.all([loadReport(), loadConfig()]);
}

init().catch(showError);
