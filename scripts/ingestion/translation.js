#!/usr/bin/env node

const path = require('path');
const { Report } = require('./core/report');
const { normalizeLanguageCode, slugify, contentHash } = require('./core/text');
const { readCanonicalDataset, writeDerivedData } = require('./core/persist');
const { loadProjectEnv } = require('../workbench/config');
const { refreshCurrentReport } = require('./report-current');

const FIELD_NAMES = ['promptText', 'title', 'description', 'categories', 'tags'];
const DEFAULT_REAL_PROVIDER_DELAY_MS = 300;
const DEFAULT_REAL_PROVIDER_RETRIES = 3;
const DEFAULT_REAL_PROVIDER_CONCURRENCY = 2;
const DEFAULT_RETRY_BASE_DELAY_MS = 1000;

function defaultProjectRoot() {
  return path.join(__dirname, '..', '..');
}

function getPrimaryValue(field) {
  return field?.original?.value ? field.original : null;
}

function hasFieldTranslation(field, language) {
  if (!field?.original?.value) return true;
  if (field.original.language === language) return true;
  return Boolean(field.translations?.[language]?.value);
}

function fieldTranslationTasks(prompt, language, fields) {
  const tasks = [];
  for (const fieldName of ['promptText', 'title', 'description']) {
    if (!fields.includes(fieldName)) continue;
    const field = prompt[fieldName];
    if (!field?.original?.value) continue;
    if (hasFieldTranslation(field, language)) continue;
    tasks.push({
      type: 'localizedField',
      prompt,
      fieldName,
      sourceLanguage: field.original.language,
      text: field.original.value,
      targetLanguage: language,
      fieldPath: `${fieldName}.translations.${language}`
    });
  }
  return tasks;
}

function taxonomyTranslationTasks(prompt, language, fields) {
  const tasks = [];
  const taxonomyFields = [
    ['categories', 'category'],
    ['tags', 'tag']
  ];

  for (const [fieldName, type] of taxonomyFields) {
    if (!fields.includes(fieldName)) continue;
    for (const item of prompt[fieldName] || []) {
      if (!item.value || item.language === language) continue;
      if (item.translationOf) continue;
      if (item.taxonomy === 'canonical') continue;
      const exists = (prompt[fieldName] || []).some(candidate =>
        candidate.language === language && candidate.translationOf === item.id
      );
      if (exists) continue;
      tasks.push({
        type,
        prompt,
        fieldName,
        item,
        sourceLanguage: item.language,
        text: item.value,
        targetLanguage: language,
        fieldPath: `${fieldName}.${item.id}.${language}`
      });
    }
  }

  return tasks;
}

function buildTasks(dataset, languages, fields, filters = {}) {
  const normalizedLanguages = languages.map(normalizeLanguageCode);
  const normalizedFields = fields && fields.length ? fields : FIELD_NAMES;
  const tasks = [];

  for (const prompt of dataset.prompts || []) {
    if (filters.promptId && prompt.id !== filters.promptId) continue;
    for (const language of normalizedLanguages) {
      tasks.push(...fieldTranslationTasks(prompt, language, normalizedFields));
      tasks.push(...taxonomyTranslationTasks(prompt, language, normalizedFields));
    }
  }

  if (!filters.fieldPath) return tasks;
  return tasks.filter(task => task.fieldPath === filters.fieldPath);
}

function applyTranslation(task, translatedText) {
  const value = String(translatedText || '').trim();
  if (!value) return false;

  if (task.type === 'localizedField') {
    task.prompt[task.fieldName].translations = task.prompt[task.fieldName].translations || {};
    task.prompt[task.fieldName].translations[task.targetLanguage] = {
      language: task.targetLanguage,
      value,
      source: 'ai',
      translatedAt: new Date().toISOString()
    };
    return true;
  }

  const sourceItem = task.item;
  task.prompt[task.fieldName].push({
    id: `${sourceItem.id || slugify(sourceItem.value, task.type)}-${task.targetLanguage.toLowerCase()}-${contentHash(value).slice(0, 8)}`,
    value,
    language: task.targetLanguage,
    source: 'ai',
    translationOf: sourceItem.id || null,
    translatedAt: new Date().toISOString()
  });
  return true;
}

function parseNonNegativeInteger(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback;
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : fallback;
}

function parsePositiveInteger(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback;
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function defaultSleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shouldRetryTranslation(error) {
  const status = Number(error?.status);
  if (status === 429) return true;
  if (status >= 500 && status <= 599) return true;
  return !Number.isInteger(status);
}

async function translateWithRetry(task, provider, options) {
  let lastError = null;

  for (let attempt = 0; attempt <= options.retries; attempt++) {
    try {
      return await provider({
        promptId: task.prompt.id,
        fieldPath: task.fieldPath,
        sourceLanguage: task.sourceLanguage,
        targetLanguage: task.targetLanguage,
        text: task.text
      });
    } catch (error) {
      lastError = error;
      if (attempt >= options.retries || !shouldRetryTranslation(error)) break;
      await options.sleep(options.retryBaseDelayMs * (2 ** attempt));
    }
  }

  throw lastError;
}

async function translateBatchWithRetry(items, provider, options) {
  let lastError = null;

  for (let attempt = 0; attempt <= options.retries; attempt++) {
    try {
      return await provider({ items });
    } catch (error) {
      lastError = error;
      if (attempt >= options.retries || !shouldRetryTranslation(error)) break;
      await options.sleep(options.retryBaseDelayMs * (2 ** attempt));
    }
  }

  throw lastError;
}

function extractJsonPayload(value) {
  const text = String(value || '').trim();
  const fenceMatch = text.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fenceMatch) return fenceMatch[1].trim();

  const arrayStart = text.indexOf('[');
  const arrayEnd = text.lastIndexOf(']');
  if (arrayStart >= 0 && arrayEnd > arrayStart) return text.slice(arrayStart, arrayEnd + 1);

  const objectStart = text.indexOf('{');
  const objectEnd = text.lastIndexOf('}');
  if (objectStart >= 0 && objectEnd > objectStart) return text.slice(objectStart, objectEnd + 1);

  return text;
}

function normalizeBatchTranslationResponse(response) {
  const payload = typeof response === 'string' ? JSON.parse(extractJsonPayload(response)) : response;
  const items = Array.isArray(payload)
    ? payload
    : payload?.translations || payload?.results || payload?.items;

  if (!Array.isArray(items)) {
    throw new Error('Batch translation response must be a JSON array.');
  }

  return items.map(item => {
    const id = item?.id;
    const text = item?.text ?? item?.translation ?? item?.value;
    if (!id) throw new Error('Batch translation item is missing id.');
    if (typeof text !== 'string' || !text.trim()) {
      throw new Error(`Batch translation item ${id} is missing text.`);
    }
    return { id: String(id), text };
  });
}

function createZhipuProvider(options = {}) {
  const env = options.env || process.env;
  const fetchImpl = options.fetch || fetch;
  const apiKey = options.apiKey || env.ZHIPUAI_API_KEY || env.AI_TRANSLATION_API_KEY;
  const model = options.model || env.ZHIPUAI_MODEL || env.AI_TRANSLATION_MODEL || 'glm-4.5-flash';
  const baseUrl = (options.baseUrl || env.ZHIPUAI_BASE_URL || env.AI_TRANSLATION_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4').replace(/\/$/, '');

  if (!apiKey) {
    throw new Error('Missing ZHIPUAI_API_KEY or AI_TRANSLATION_API_KEY for translation.');
  }

  return async function zhipuProvider(request) {
    const response = await fetchImpl(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        stream: false,
        messages: [
          {
            role: 'system',
            content: [
              'You translate image generation prompt datasets.',
              'Preserve placeholders, JSON shape, markdown punctuation, parameter names, and quoted literals.',
              'Return only the translated text. Do not add explanations.'
            ].join(' ')
          },
          {
            role: 'user',
            content: `Translate from ${request.sourceLanguage} to ${request.targetLanguage}.\nField: ${request.fieldPath}\n\n${request.text}`
          }
        ]
      })
    });

    if (!response.ok) {
      const error = new Error(`Translation API failed with ${response.status}: ${await response.text()}`);
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || '';
  };
}

function createZhipuBatchProvider(options = {}) {
  const env = options.env || process.env;
  const fetchImpl = options.fetch || fetch;
  const apiKey = options.apiKey || env.ZHIPUAI_API_KEY || env.AI_TRANSLATION_API_KEY;
  const model = options.model || env.ZHIPUAI_MODEL || env.AI_TRANSLATION_MODEL || 'glm-4.5-flash';
  const baseUrl = (options.baseUrl || env.ZHIPUAI_BASE_URL || env.AI_TRANSLATION_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4').replace(/\/$/, '');

  if (!apiKey) {
    throw new Error('Missing ZHIPUAI_API_KEY or AI_TRANSLATION_API_KEY for translation.');
  }

  return async function zhipuBatchProvider(request) {
    const items = (request.items || []).map(item => ({
      id: item.id,
      sourceLanguage: item.sourceLanguage,
      targetLanguage: item.targetLanguage,
      fieldPath: item.fieldPath,
      text: item.text
    }));

    const response = await fetchImpl(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        stream: false,
        messages: [
          {
            role: 'system',
            content: [
              'You translate image generation prompt datasets in batches.',
              'Preserve placeholders, JSON shape, markdown punctuation, parameter names, and quoted literals.',
              'Return only JSON: an array of objects with id and text. Keep every id unchanged.'
            ].join(' ')
          },
          {
            role: 'user',
            content: [
              'Translate each item to its targetLanguage.',
              'Return every item exactly once as [{"id":"...","text":"..."}].',
              '',
              JSON.stringify(items, null, 2)
            ].join('\n')
          }
        ]
      })
    });

    if (!response.ok) {
      const error = new Error(`Translation API failed with ${response.status}: ${await response.text()}`);
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    return normalizeBatchTranslationResponse(data.choices?.[0]?.message?.content || '');
  };
}

function chunkItems(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function batchTaskId(index) {
  return `task_${String(index + 1).padStart(6, '0')}`;
}

function batchRequestItem(entry) {
  const task = entry.task;
  return {
    id: entry.id,
    promptId: task.prompt.id,
    fieldPath: task.fieldPath,
    sourceLanguage: task.sourceLanguage,
    targetLanguage: task.targetLanguage,
    text: task.text
  };
}

async function translateMissing(options = {}) {
  const projectRoot = options.projectRoot || defaultProjectRoot();
  const datasetPath = path.join(projectRoot, 'data', 'canonical', 'prompts.json');
  const dataset = options.dataset || readCanonicalDataset(datasetPath);
  const languages = options.languages?.length ? options.languages : ['zh-CN'];
  const fields = options.fields?.length ? options.fields : FIELD_NAMES;
  const report = options.report || new Report();
  const limit = Number.isFinite(options.limit) ? options.limit : Infinity;
  const dryRun = Boolean(options.dryRun);
  const batchSize = parsePositiveInteger(options.batchSize, 1);
  const useBatch = batchSize > 1 && (dryRun || options.batchProvider || !options.provider);
  if (!dryRun && ((useBatch && !options.batchProvider) || (!useBatch && !options.provider))) {
    loadProjectEnv(projectRoot);
  }
  const env = options.env || process.env;
  const usesRealProvider = !dryRun && ((useBatch && !options.batchProvider) || (!useBatch && !options.provider));
  const delayMs = parseNonNegativeInteger(options.delayMs ?? env.TRANSLATION_DELAY_MS, usesRealProvider ? DEFAULT_REAL_PROVIDER_DELAY_MS : 0);
  const retries = parseNonNegativeInteger(options.retries ?? env.TRANSLATION_RETRIES, usesRealProvider ? DEFAULT_REAL_PROVIDER_RETRIES : 0);
  const retryBaseDelayMs = parseNonNegativeInteger(options.retryBaseDelayMs ?? env.TRANSLATION_RETRY_BASE_DELAY_MS, DEFAULT_RETRY_BASE_DELAY_MS);
  const concurrency = parsePositiveInteger(options.concurrency ?? env.TRANSLATION_CONCURRENCY, usesRealProvider ? DEFAULT_REAL_PROVIDER_CONCURRENCY : 1);
  const sleep = options.sleep || defaultSleep;
  const provider = useBatch ? null : (options.provider || (dryRun ? async () => '' : createZhipuProvider(options.providerOptions)));
  const batchProvider = useBatch ? (options.batchProvider || (dryRun ? async () => [] : createZhipuBatchProvider(options.providerOptions))) : null;
  const onProgress = typeof options.onProgress === 'function' ? options.onProgress : () => {};

  const tasks = buildTasks(dataset, languages, fields, {
    promptId: options.promptId,
    fieldPath: options.fieldPath
  }).slice(0, limit);
  let translatedCount = 0;
  let failedCount = 0;
  let batchCount = 0;
  let nextTaskIndex = 0;

  function taskProgress(task, index) {
    return {
      index: index + 1,
      total: tasks.length,
      promptId: task.prompt.id,
      fieldPath: task.fieldPath,
      targetLanguage: task.targetLanguage
    };
  }

  function batchProgress(entries, batchIndex, batchTotal) {
    const languages = Array.from(new Set(entries.map(entry => entry.task.targetLanguage))).join(',');
    const firstIndex = entries[0]?.index ?? 0;
    const lastIndex = entries[entries.length - 1]?.index ?? firstIndex;
    return {
      batchIndex: batchIndex + 1,
      batchTotal,
      batchSize: entries.length,
      taskStartIndex: firstIndex + 1,
      taskEndIndex: lastIndex + 1,
      total: tasks.length,
      targetLanguage: languages,
      translatedCount,
      failedCount
    };
  }

  async function runTask(task, index) {
    const progress = taskProgress(task, index);
    onProgress({ type: 'start', ...progress, translatedCount, failedCount });

    try {
      if (!dryRun) {
        const translated = await translateWithRetry(task, provider, { retries, retryBaseDelayMs, sleep });
        if (applyTranslation(task, translated)) translatedCount++;
        if (delayMs > 0 && index < tasks.length - 1) await sleep(delayMs);
      }
      onProgress({ type: 'success', ...progress, translatedCount, failedCount });
    } catch (error) {
      failedCount++;
      report.warn({
        code: 'translation_failed',
        message: `Translation failed for ${task.prompt.id}: ${error.message}`,
        promptId: task.prompt.id,
        fieldPath: task.fieldPath,
        suggestedAction: 'Check translation provider credentials, rate limits, or retry this field.',
        resolutionCommand: `pnpm translate -- --missing --lang ${task.targetLanguage}`
      });
      onProgress({ type: 'failure', ...progress, translatedCount, failedCount, error: error.message });
    }
  }

  async function runBatch(entries, batchIndex, batchTotal) {
    batchCount++;
    const batch = batchProgress(entries, batchIndex, batchTotal);
    onProgress({ type: 'batch-start', ...batch });

    for (const entry of entries) {
      onProgress({ type: 'start', ...taskProgress(entry.task, entry.index), translatedCount, failedCount });
    }

    try {
      if (!dryRun) {
        const requestItems = entries.map(batchRequestItem);
        const translatedItems = normalizeBatchTranslationResponse(await translateBatchWithRetry(requestItems, batchProvider, { retries, retryBaseDelayMs, sleep }));
        const translatedById = new Map(translatedItems.map(item => [item.id, item.text]));
        const missing = requestItems.filter(item => !String(translatedById.get(item.id) || '').trim());
        if (missing.length) {
          throw new Error(`Batch translation response missing ${missing.length} item(s).`);
        }

        for (const entry of entries) {
          if (applyTranslation(entry.task, translatedById.get(entry.id))) translatedCount++;
        }
        const lastIndex = entries[entries.length - 1]?.index ?? tasks.length - 1;
        if (delayMs > 0 && lastIndex < tasks.length - 1) await sleep(delayMs);
      }

      for (const entry of entries) {
        onProgress({ type: 'success', ...taskProgress(entry.task, entry.index), translatedCount, failedCount });
      }
      onProgress({ type: 'batch-success', ...batchProgress(entries, batchIndex, batchTotal) });
    } catch (error) {
      failedCount += entries.length;
      const languages = Array.from(new Set(entries.map(entry => entry.task.targetLanguage))).join(',');
      report.warn({
        code: 'translation_batch_failed',
        message: `Translation batch ${batchIndex + 1} failed for ${entries.length} item(s): ${error.message}`,
        suggestedAction: 'Check translation provider credentials, rate limits, response JSON, or retry this batch.',
        resolutionCommand: `pnpm translate -- --missing --lang ${languages}`
      });
      for (const entry of entries) {
        onProgress({ type: 'failure', ...taskProgress(entry.task, entry.index), translatedCount, failedCount, error: error.message });
      }
      onProgress({ type: 'batch-failure', ...batchProgress(entries, batchIndex, batchTotal), error: error.message });
    }
  }

  async function runWorker() {
    while (nextTaskIndex < tasks.length) {
      const index = nextTaskIndex++;
      await runTask(tasks[index], index);
    }
  }

  if (useBatch) {
    const entries = tasks.map((task, index) => ({ id: batchTaskId(index), task, index }));
    const batches = chunkItems(entries, batchSize);
    for (let index = 0; index < batches.length; index++) {
      await runBatch(batches[index], index, batches.length);
    }
  } else {
    await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, runWorker));
  }

  report.info({
    code: 'translation_completed',
    message: `Translated ${translatedCount} item(s); ${failedCount} failed; ${tasks.length} task(s) considered; ${batchCount} batch(es).`,
    suggestedAction: failedCount ? 'Review translation warnings.' : 'Run validate to refresh the report.'
  });

  if (!dryRun && !options.dataset) {
    writeDerivedData(projectRoot, dataset);
  }

  if (options.strict && failedCount > 0) {
    const error = new Error(`Translation failed for ${failedCount} item(s).`);
    error.report = report.toJSON();
    throw error;
  }

  return { dataset, report, taskCount: tasks.length, translatedCount, failedCount, batchCount };
}

function parseArgs(argv) {
  const parseList = value => String(value || '').split(/[,\s]+/).map(item => item.trim()).filter(Boolean);
  const args = {
    languages: [],
    fields: [],
    projectRoot: defaultProjectRoot(),
    dryRun: false,
    missingOnly: true,
    strict: false,
    limit: Infinity,
    delayMs: undefined,
    retries: undefined,
    retryBaseDelayMs: undefined,
    concurrency: undefined,
    batchSize: undefined,
    refreshReport: false,
    targetLanguages: []
  };

  const rest = [...argv];
  if (rest[0] && !rest[0].startsWith('-')) rest.shift();

  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (arg === '--lang' || arg === '--langs' || arg === '--language') {
      args.languages = parseList(rest[++i]);
    } else if (arg === '--field' || arg === '--fields') {
      args.fields = parseList(rest[++i]);
    } else if (arg === '--project-root') {
      args.projectRoot = path.resolve(rest[++i]);
    } else if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (arg === '--missing') {
      args.missingOnly = true;
    } else if (arg === '--strict') {
      args.strict = true;
    } else if (arg === '--limit') {
      args.limit = Number(rest[++i]);
    } else if (arg === '--delay-ms') {
      args.delayMs = Number(rest[++i]);
    } else if (arg === '--retries') {
      args.retries = Number(rest[++i]);
    } else if (arg === '--retry-base-delay-ms') {
      args.retryBaseDelayMs = Number(rest[++i]);
    } else if (arg === '--concurrency') {
      args.concurrency = Number(rest[++i]);
    } else if (arg === '--batch-size') {
      args.batchSize = Number(rest[++i]);
    } else if (arg === '--prompt-id') {
      args.promptId = rest[++i];
    } else if (arg === '--field-path') {
      args.fieldPath = rest[++i];
    } else if (arg === '--refresh-report') {
      args.refreshReport = true;
    } else if (arg === '--target-languages' || arg === '--target-langs' || arg === '--langs') {
      args.targetLanguages = parseList(rest[++i]);
    }
  }

  return args;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const result = await translateMissing(args);
  const batchSummary = result.batchCount ? `; batches: ${result.batchCount}` : '';
  console.log(`Translation tasks: ${result.taskCount}${batchSummary}; translated: ${result.translatedCount}; failed: ${result.failedCount}.`);
  if (args.refreshReport) {
    const refreshed = refreshCurrentReport({ projectRoot: args.projectRoot, targetLanguages: args.targetLanguages });
    const summary = refreshed.report.toJSON().summary;
    console.log(`Report refreshed: ${summary.error} error(s), ${summary.warning} warning(s), ${summary.info} info.`);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.message);
    if (error.report) console.error(JSON.stringify(error.report.summary, null, 2));
    process.exit(1);
  });
}

module.exports = {
  FIELD_NAMES,
  buildTasks,
  translateMissing,
  createZhipuBatchProvider,
  createZhipuProvider,
  parseArgs,
  main
};
