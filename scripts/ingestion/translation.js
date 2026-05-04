#!/usr/bin/env node

const path = require('path');
const { Report } = require('./core/report');
const { normalizeLanguageCode, slugify, contentHash } = require('./core/text');
const { readJson, writeDerivedData } = require('./core/persist');

const FIELD_NAMES = ['promptText', 'title', 'description', 'categories', 'tags'];

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

function buildTasks(dataset, languages, fields) {
  const normalizedLanguages = languages.map(normalizeLanguageCode);
  const normalizedFields = fields && fields.length ? fields : FIELD_NAMES;
  const tasks = [];

  for (const prompt of dataset.prompts || []) {
    for (const language of normalizedLanguages) {
      tasks.push(...fieldTranslationTasks(prompt, language, normalizedFields));
      tasks.push(...taxonomyTranslationTasks(prompt, language, normalizedFields));
    }
  }

  return tasks;
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

function createDeepSeekProvider(options = {}) {
  const apiKey = options.apiKey || process.env.DEEPSEEK_API_KEY || process.env.AI_TRANSLATION_API_KEY;
  const model = options.model || process.env.DEEPSEEK_MODEL || process.env.AI_TRANSLATION_MODEL || 'deepseek-chat';
  const baseUrl = (options.baseUrl || process.env.DEEPSEEK_BASE_URL || process.env.AI_TRANSLATION_BASE_URL || 'https://api.deepseek.com').replace(/\/$/, '');

  if (!apiKey) {
    throw new Error('Missing DEEPSEEK_API_KEY or AI_TRANSLATION_API_KEY for translation.');
  }

  return async function deepSeekProvider(request) {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
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
      throw new Error(`Translation API failed with ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content?.trim() || '';
  };
}

async function translateMissing(options = {}) {
  const projectRoot = options.projectRoot || defaultProjectRoot();
  const datasetPath = path.join(projectRoot, 'data', 'canonical', 'prompts.json');
  const dataset = options.dataset || readJson(datasetPath);
  const languages = options.languages?.length ? options.languages : ['zh-CN'];
  const fields = options.fields?.length ? options.fields : FIELD_NAMES;
  const report = options.report || new Report();
  const limit = Number.isFinite(options.limit) ? options.limit : Infinity;
  const dryRun = Boolean(options.dryRun);
  const provider = options.provider || (dryRun ? async () => '' : createDeepSeekProvider(options.providerOptions));

  const tasks = buildTasks(dataset, languages, fields).slice(0, limit);
  let translatedCount = 0;
  let failedCount = 0;

  for (const task of tasks) {
    try {
      if (!dryRun) {
        const translated = await provider({
          promptId: task.prompt.id,
          fieldPath: task.fieldPath,
          sourceLanguage: task.sourceLanguage,
          targetLanguage: task.targetLanguage,
          text: task.text
        });
        if (applyTranslation(task, translated)) translatedCount++;
      }
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
    }
  }

  report.info({
    code: 'translation_completed',
    message: `Translated ${translatedCount} item(s); ${failedCount} failed; ${tasks.length} task(s) considered.`,
    suggestedAction: failedCount ? 'Review translation_failed warnings.' : 'Run validate to refresh the report.'
  });

  if (!dryRun && !options.dataset) {
    writeDerivedData(projectRoot, dataset, report);
  }

  if (options.strict && failedCount > 0) {
    const error = new Error(`Translation failed for ${failedCount} item(s).`);
    error.report = report.toJSON();
    throw error;
  }

  return { dataset, report, taskCount: tasks.length, translatedCount, failedCount };
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
    limit: Infinity
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
    }
  }

  return args;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const result = await translateMissing(args);
  console.log(`Translation tasks: ${result.taskCount}; translated: ${result.translatedCount}; failed: ${result.failedCount}.`);
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
  createDeepSeekProvider,
  parseArgs,
  main
};
