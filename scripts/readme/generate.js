#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { ensureDir, readJson } = require('../ingestion/core/persist');
const { PUBLIC_LANGUAGES, parseLanguageList } = require('../i18n/languages');

const SITE_URL = 'https://gptimages.dev';
const COVER_IMAGE = 'images/awesome-image-prompts-cover.jpg';
const WEBSITE_PREVIEW_IMAGE = 'images/gptimages-gallery-preview.png';

const LANGUAGE_FILES = {
  en: 'README.md',
  'zh-CN': 'README_zh-CN.md'
};

const LANGUAGE_NAMES = {
  en: { en: 'English', 'zh-CN': '英文' },
  de: { en: 'German', de: 'Deutsch', 'zh-CN': '德语' },
  es: { en: 'Spanish', es: 'Español', 'zh-CN': '西班牙语' },
  fr: { en: 'French', fr: 'Français', 'zh-CN': '法语' },
  hi: { en: 'Hindi', hi: 'हिन्दी', 'zh-CN': '印地语' },
  it: { en: 'Italian', it: 'Italiano', 'zh-CN': '意大利语' },
  ja: { en: 'Japanese', ja: '日本語', 'zh-CN': '日语' },
  ko: { en: 'Korean', ko: '한국어', 'zh-CN': '韩语' },
  pt: { en: 'Portuguese', pt: 'Português', 'zh-CN': '葡萄牙语' },
  ru: { en: 'Russian', ru: 'Русский', 'zh-CN': '俄语' },
  th: { en: 'Thai', th: 'ไทย', 'zh-CN': '泰语' },
  tr: { en: 'Turkish', tr: 'Türkçe', 'zh-CN': '土耳其语' },
  vi: { en: 'Vietnamese', vi: 'Tiếng Việt', 'zh-CN': '越南语' },
  'zh-CN': { en: 'Simplified Chinese', 'zh-CN': '简体中文' },
  'zh-TW': { en: 'Traditional Chinese', 'zh-CN': '繁体中文', 'zh-TW': '繁體中文' }
};

const LABELS = {
  en: {
    title: 'awesome-image-prompts',
    intro: 'A curated, normalized, multilingual catalog of high-quality GPT image prompts collected from open-source projects.',
    tagline: 'A versionable prompt catalog for ingestion, cleanup, translation, classification, and publishing.',
    repositoryCopy: 'This repository contains upstream README parsers, canonical prompt shards, validation reports, localized catalog exports, and generated collection docs.',
    website: 'Website',
    websiteCopy: `Use [gptimages.dev](${SITE_URL}) to browse, search, filter, and copy these prompts. The site is built on this catalog and is the fastest way to explore prompt patterns by category, language, and source.`,
    catalogSnapshot: 'Catalog Snapshot',
    generated: 'Generated',
    total: 'Total prompts',
    languages: 'Languages',
    publicData: 'Public data',
    contents: 'Collections',
    prompts: 'Prompts',
    featured: 'Featured Prompts',
    featuredIntro: 'A compact sample from the catalog. Open any collection to read the complete prompt text.',
    featureMatrix: 'What You Get',
    feature: 'Feature',
    details: 'Details',
    websitePreviewAlt: 'GptImages.dev prompt gallery preview',
    coverAlt: 'awesome-image-prompts generated cover',
    openWebsite: 'Open gptimages.dev',
    visualGallery: 'Visual gallery',
    visualGalleryCopy: 'Image-led browsing with real GPT image outputs.',
    copyReady: 'Copy-ready prompts',
    copyReadyCopy: 'Reusable prompt text is preserved in collection documents.',
    sourceAttribution: 'Source attribution',
    sourceAttributionCopy: 'Every catalog item keeps upstream repository references.',
    multilingualCatalog: 'Multilingual catalog',
    multilingualCatalogCopy: 'Localized README and JSON outputs use available translations and fall back to the default prompt text when needed.',
    category: 'Category',
    categories: 'Categories',
    tags: 'Tags',
    source: 'Source',
    prompt: 'Prompt',
    count: 'Count',
    open: 'Open',
    dataContract: 'Data Contract',
    upstreamSources: 'Upstream Sources',
    websiteData: 'Machine-readable catalog data is available under `data/catalog/`.',
    fullCatalog: 'Every prompt body is generated into the collection documents below. The root README stays compact while the split files keep the full catalog easy to navigate.',
    collectionIntro: `This file contains every prompt assigned to this collection. For visual browsing and quick copying, open [gptimages.dev](${SITE_URL}).`,
    backToReadme: 'Back to README',
    uncategorized: 'Uncategorized',
    badgeWebsite: 'Website',
    badgeDataset: 'Dataset',
    badgePrompts: 'Prompts',
    badgeLanguages: 'Languages',
    badgeAwesome: 'Awesome',
    badgeCatalog: 'Catalog',
    badgeCollections: 'Collections',
    badgeSources: 'Sources',
    badgeWorkbench: 'Workbench',
    badgeLicense: 'License',
    currentLanguage: 'Current',
    viewLanguage: 'View',
    dataDirectory: 'Data Directory',
    dataDirectoryIntro: 'The `data/` directory is the source of truth for this repository. Human and AI edits live in canonical shards; publishable website data is generated from those shards.',
    dataPath: 'Path',
    dataPurpose: 'Purpose',
    canonicalData: 'Per-prompt canonical JSON shards. These preserve stable ids, upstream references, translations, assets, categories, and local edits.',
    catalogData: 'Localized public JSON exports consumed by websites and downstream tools.',
    reportData: 'Current validation, warning, and maintenance report for the workbench.',
    runData: 'Extraction run history with added, updated, unchanged, warning, and error counts.',
    quickStart: 'Quick Start',
    quickStartIntro: 'Use pnpm scripts for repeatable ingestion, validation, export, README generation, and local review.',
    command: 'Command',
    purpose: 'Purpose',
    installDeps: 'Install dependencies.',
    ingestSource: 'Parse configured upstream repositories, merge records, and preserve existing local edits.',
    validateData: 'Validate canonical prompt data and refresh the current report.',
    translateData: 'Fill missing translations with the configured AI provider.',
    classifyData: 'Map upstream categories into canonical categories and surface unresolved cases.',
    mirrorAssets: 'Mirror missing remote assets into the local asset cache.',
    exportCatalog: 'Export localized JSON catalog files from canonical data.',
    generateReadme: 'Regenerate README files and split collection documents.',
    startWorkbench: 'Start the local maintenance workbench.',
    runTests: 'Run the ingestion, catalog, workbench, and README test suite.',
    workbenchUsage: 'After `pnpm workbench`, open `http://127.0.0.1:4173` to review warnings, batch translate, classify, export catalog data, and regenerate README files.',
    contribute: 'How to Contribute',
    contributeIntro: 'Contributions are welcome when they keep the catalog stable, traceable, and reviewable.',
    contributors: 'Contributors',
    contributorsCopy: 'Thanks to everyone who adds adapters, improves taxonomy rules, translates prompts, validates upstream changes, or reviews catalog quality.',
    license: 'License',
    licenseCopy: 'Prompt text, preview images, and upstream metadata keep their original upstream ownership and license terms. Repository scripts and generated catalog structure are provided for cataloging and educational use; please keep source attribution when reusing the data.'
  },
  'zh-CN': {
    title: 'awesome-image-prompts',
    intro: '一个从多个开源项目整理、标准化并支持多语言的高质量 GPT 图像提示词目录。',
    tagline: '一个可版本化维护的提示词目录，用于采集、清洗、翻译、分类和发布。',
    repositoryCopy: '本仓库包含上游 README 解析器、canonical 提示词分片、校验报告、本地化 catalog 导出和自动生成的分类文档。',
    website: '网站',
    websiteCopy: `你可以在 [gptimages.dev](${SITE_URL}) 浏览、搜索、筛选和复制这些提示词。网站基于本目录数据构建，更适合按分类、语言和来源快速查找可用的图像生成 prompt。`,
    catalogSnapshot: '目录概览',
    generated: '生成时间',
    total: '提示词总数',
    languages: '语言',
    publicData: '公开数据',
    contents: '分类集合',
    prompts: '提示词',
    featured: '精选提示词',
    featuredIntro: '这里展示一部分精选条目；打开任意分类文档即可查看完整提示词正文。',
    featureMatrix: '目录能力',
    feature: '能力',
    details: '说明',
    websitePreviewAlt: 'GptImages.dev 提示词画廊预览',
    coverAlt: 'awesome-image-prompts 生成封面',
    openWebsite: '打开 gptimages.dev',
    visualGallery: '可视化画廊',
    visualGalleryCopy: '用真实 GPT 图像输出作为浏览入口。',
    copyReady: '可复制提示词',
    copyReadyCopy: '可复用的 prompt 正文保留在分类文档中。',
    sourceAttribution: '来源署名',
    sourceAttributionCopy: '每条目录数据都会保留上游仓库来源。',
    multilingualCatalog: '多语言目录',
    multilingualCatalogCopy: 'README 与 JSON 输出会优先使用已有翻译，缺失时回退到默认 prompt 文本。',
    category: '分类',
    categories: '分类',
    tags: '标签',
    source: '来源',
    prompt: '提示词',
    count: '数量',
    open: '打开',
    dataContract: '数据结构',
    upstreamSources: '上游来源',
    websiteData: '机器可读的公开目录数据位于 `data/catalog/`。',
    fullCatalog: '每一条提示词正文都会生成到下面的分类文档中；根 README 保持简洁，拆分文件保留完整目录，方便浏览。',
    collectionIntro: `本文档包含归入此分类的全部提示词。如需可视化浏览和快速复制，可以打开 [gptimages.dev](${SITE_URL})。`,
    backToReadme: '返回 README',
    uncategorized: '未分类',
    badgeWebsite: '网站',
    badgeDataset: '数据集',
    badgePrompts: '提示词',
    badgeLanguages: '语言',
    badgeAwesome: 'Awesome',
    badgeCatalog: 'Catalog',
    badgeCollections: '分类',
    badgeSources: '来源',
    badgeWorkbench: '工作台',
    badgeLicense: '协议',
    currentLanguage: '当前',
    viewLanguage: '查看',
    dataDirectory: '数据目录',
    dataDirectoryIntro: '`data/` 目录是本仓库的数据源头。人工和 AI 修正保存在 canonical 分片里；面向网站和下游工具的公开数据由这些分片导出。',
    dataPath: '路径',
    dataPurpose: '用途',
    canonicalData: '按 prompt 拆分的 canonical JSON 数据，保留稳定 id、上游引用、翻译、资产、分类和本地修正。',
    catalogData: '从 canonical 数据导出的多语言公开 JSON catalog，供网站和下游工具使用。',
    reportData: '当前校验、警告和维护报告，供工作台展示和处理。',
    runData: '提取运行记录，包含新增、更新、无变化、警告和错误数量。',
    quickStart: '快速开始',
    quickStartIntro: '使用 pnpm 脚本完成可重复的采集、校验、导出、README 生成和本地审核。',
    command: '命令',
    purpose: '作用',
    installDeps: '安装依赖。',
    ingestSource: '解析已配置的上游仓库，合并数据，并保留已有本地修正。',
    validateData: '校验 canonical prompt 数据并刷新当前报告。',
    translateData: '使用已配置的 AI 服务补齐缺失翻译。',
    classifyData: '把上游分类映射到 canonical 分类，并暴露无法归类的问题。',
    mirrorAssets: '把缺失的远程资产镜像到本地资产缓存。',
    exportCatalog: '从 canonical 数据导出多语言 JSON catalog。',
    generateReadme: '重新生成 README 和拆分后的分类文档。',
    startWorkbench: '启动本地维护工作台。',
    runTests: '运行 ingestion、catalog、workbench 和 README 测试。',
    workbenchUsage: '执行 `pnpm workbench` 后，打开 `http://127.0.0.1:4173`，可以处理警告、批量翻译、分类归类、导出 catalog，并重新生成 README。',
    contribute: '如何贡献',
    contributeIntro: '欢迎提交贡献，但请确保 catalog 保持稳定、可追踪、可审核。',
    contributors: '贡献者',
    contributorsCopy: '感谢所有接入适配器、改进分类规则、翻译提示词、校验上游变更和审核数据质量的人。',
    license: '协议',
    licenseCopy: '提示词正文、预览图片和上游元数据保留其原始上游归属和协议。本仓库脚本与生成的 catalog 结构用于目录整理和学习用途；复用数据时请保留来源署名。'
  }
};

function makeLabels(overrides) {
  return { ...LABELS.en, ...overrides };
}

Object.assign(LABELS, {
  de: makeLabels({
    intro: 'Ein kuratierter, normalisierter und mehrsprachiger Katalog hochwertiger GPT-Bildprompts aus Open-Source-Projekten.',
    tagline: 'Wiederverwendbare GPT-Bildprompt-Muster, normalisiert für GitHub, JSON und gptimages.dev.',
    repositoryCopy: 'Die Markdown-Dateien in diesem Repository werden aus den standardisierten öffentlichen Katalogdaten erzeugt, damit GitHub-Dokumente, JSON-Exporte und Website synchron bleiben.',
    website: 'Website',
    websiteCopy: `Nutze [gptimages.dev](${SITE_URL}), um diese Prompts zu durchsuchen, zu filtern und zu kopieren. Die Website basiert auf diesem Katalog und ist der schnellste Weg, Prompt-Muster nach Kategorie, Sprache und Quelle zu erkunden.`,
    catalogSnapshot: 'Katalogübersicht',
    generated: 'Generiert',
    total: 'Prompts gesamt',
    languages: 'Sprachen',
    publicData: 'Öffentliche Daten',
    contents: 'Sammlungen',
    prompts: 'Prompts',
    featured: 'Ausgewählte Prompts',
    featuredIntro: 'Eine kompakte Auswahl aus dem Katalog. Öffne eine Sammlung, um den vollständigen Prompt-Text zu lesen.',
    category: 'Kategorie',
    categories: 'Kategorien',
    tags: 'Tags',
    source: 'Quelle',
    prompt: 'Prompt',
    count: 'Anzahl',
    open: 'Öffnen',
    dataContract: 'Datenschema',
    upstreamSources: 'Upstream-Quellen',
    websiteData: 'Maschinenlesbare Katalogdaten liegen unter `data/catalog/`.',
    fullCatalog: 'Jeder Prompt-Text wird in die Sammlungsdokumente unten geschrieben. Das Root-README bleibt kompakt, während die geteilten Dateien den vollständigen Katalog leicht navigierbar halten.',
    collectionIntro: `Diese Datei enthält alle Prompts dieser Sammlung. Für visuelles Browsen und schnelles Kopieren öffne [gptimages.dev](${SITE_URL}).`,
    backToReadme: 'Zurück zum README',
    uncategorized: 'Nicht kategorisiert',
    badgeDataset: 'Datensatz',
    badgeLanguages: 'Sprachen'
  }),
  es: makeLabels({
    intro: 'Un catálogo seleccionado, normalizado y multilingüe de prompts GPT de imagen de alta calidad recopilados de proyectos open source.',
    tagline: 'Patrones reutilizables de prompts GPT de imagen, normalizados para GitHub, JSON y gptimages.dev.',
    repositoryCopy: 'Los archivos Markdown de este repositorio se generan desde los datos públicos estandarizados del catálogo, para que la documentación de GitHub, los JSON exportados y la web estén alineados.',
    website: 'Sitio web',
    websiteCopy: `Usa [gptimages.dev](${SITE_URL}) para explorar, buscar, filtrar y copiar estos prompts. El sitio se basa en este catálogo y es la forma más rápida de descubrir patrones por categoría, idioma y fuente.`,
    catalogSnapshot: 'Resumen del catálogo',
    generated: 'Generado',
    total: 'Prompts totales',
    languages: 'Idiomas',
    publicData: 'Datos públicos',
    contents: 'Colecciones',
    featured: 'Prompts destacados',
    featuredIntro: 'Una muestra compacta del catálogo. Abre cualquier colección para leer el texto completo del prompt.',
    category: 'Categoría',
    categories: 'Categorías',
    tags: 'Etiquetas',
    source: 'Fuente',
    count: 'Cantidad',
    open: 'Abrir',
    dataContract: 'Contrato de datos',
    upstreamSources: 'Fuentes upstream',
    websiteData: 'Los datos del catálogo legibles por máquina están en `data/catalog/`.',
    fullCatalog: 'Cada prompt completo se genera en los documentos de colección de abajo. El README raíz se mantiene compacto y los archivos divididos conservan el catálogo completo fácil de navegar.',
    collectionIntro: `Este archivo contiene todos los prompts asignados a esta colección. Para navegar visualmente y copiar rápido, abre [gptimages.dev](${SITE_URL}).`,
    backToReadme: 'Volver al README',
    uncategorized: 'Sin categoría',
    badgeWebsite: 'Sitio',
    badgeDataset: 'Datos',
    badgeLanguages: 'Idiomas'
  }),
  fr: makeLabels({
    intro: 'Un catalogue sélectionné, normalisé et multilingue de prompts GPT d’image de haute qualité issus de projets open source.',
    tagline: 'Des modèles réutilisables de prompts GPT d’image, normalisés pour GitHub, JSON et gptimages.dev.',
    repositoryCopy: 'Les fichiers Markdown de ce dépôt sont générés depuis les données publiques standardisées du catalogue afin de garder alignés les docs GitHub, les exports JSON et le site.',
    website: 'Site web',
    websiteCopy: `Utilisez [gptimages.dev](${SITE_URL}) pour parcourir, rechercher, filtrer et copier ces prompts. Le site repose sur ce catalogue et reste le moyen le plus rapide d’explorer les modèles par catégorie, langue et source.`,
    catalogSnapshot: 'Aperçu du catalogue',
    generated: 'Généré',
    total: 'Prompts au total',
    languages: 'Langues',
    publicData: 'Données publiques',
    contents: 'Collections',
    featured: 'Prompts sélectionnés',
    featuredIntro: 'Un échantillon compact du catalogue. Ouvrez une collection pour lire le texte complet des prompts.',
    category: 'Catégorie',
    categories: 'Catégories',
    source: 'Source',
    count: 'Nombre',
    open: 'Ouvrir',
    dataContract: 'Contrat de données',
    upstreamSources: 'Sources amont',
    websiteData: 'Les données du catalogue lisibles par machine sont disponibles dans `data/catalog/`.',
    fullCatalog: 'Chaque corps de prompt est généré dans les documents de collection ci-dessous. Le README racine reste compact tandis que les fichiers séparés gardent le catalogue complet facile à parcourir.',
    collectionIntro: `Ce fichier contient tous les prompts affectés à cette collection. Pour une navigation visuelle et une copie rapide, ouvrez [gptimages.dev](${SITE_URL}).`,
    backToReadme: 'Retour au README',
    uncategorized: 'Non classé',
    badgeWebsite: 'Site',
    badgeDataset: 'Données',
    badgeLanguages: 'Langues'
  }),
  hi: makeLabels({
    intro: 'ओपन-सोर्स परियोजनाओं से एकत्र किए गए उच्च गुणवत्ता वाले GPT इमेज प्रॉम्प्ट का चुना हुआ, मानकीकृत और बहुभाषी कैटलॉग।',
    tagline: 'GitHub, JSON और gptimages.dev के लिए मानकीकृत, दोबारा उपयोग किए जा सकने वाले GPT इमेज प्रॉम्प्ट पैटर्न।',
    repositoryCopy: 'इस रिपॉजिटरी की Markdown फाइलें मानकीकृत सार्वजनिक कैटलॉग डेटा से बनती हैं, ताकि GitHub docs, JSON exports और वेबसाइट एक जैसी रहें।',
    website: 'वेबसाइट',
    websiteCopy: `इन प्रॉम्प्ट को ब्राउज़, खोज, फ़िल्टर और कॉपी करने के लिए [gptimages.dev](${SITE_URL}) खोलें। साइट इसी कैटलॉग पर आधारित है और category, language और source के हिसाब से prompt patterns देखने का सबसे तेज़ तरीका है।`,
    catalogSnapshot: 'कैटलॉग सारांश',
    generated: 'जनरेट किया गया',
    total: 'कुल प्रॉम्प्ट',
    languages: 'भाषाएँ',
    publicData: 'सार्वजनिक डेटा',
    contents: 'कलेक्शन',
    featured: 'चुने हुए प्रॉम्प्ट',
    featuredIntro: 'कैटलॉग से एक छोटा नमूना। पूरा prompt text पढ़ने के लिए कोई भी collection खोलें।',
    category: 'कैटेगरी',
    categories: 'कैटेगरी',
    tags: 'टैग',
    source: 'स्रोत',
    count: 'संख्या',
    open: 'खोलें',
    dataContract: 'डेटा कॉन्ट्रैक्ट',
    upstreamSources: 'Upstream स्रोत',
    websiteData: 'Machine-readable catalog data `data/catalog/` में उपलब्ध है।',
    fullCatalog: 'हर prompt body नीचे दिए गए collection documents में लिखी जाती है। Root README compact रहता है और split files पूरा catalog आसानी से navigable रखती हैं।',
    collectionIntro: `इस फाइल में इस collection के सभी prompts हैं। Visual browsing और quick copy के लिए [gptimages.dev](${SITE_URL}) खोलें।`,
    backToReadme: 'README पर वापस',
    uncategorized: 'बिना कैटेगरी',
    badgeWebsite: 'वेबसाइट',
    badgeDataset: 'डेटासेट',
    badgeLanguages: 'भाषाएँ'
  }),
  it: makeLabels({
    intro: 'Un catalogo curato, normalizzato e multilingue di prompt GPT per immagini di alta qualità raccolti da progetti open source.',
    tagline: 'Pattern riutilizzabili di prompt GPT per immagini, normalizzati per GitHub, JSON e gptimages.dev.',
    repositoryCopy: 'I file Markdown in questo repository sono generati dai dati pubblici standardizzati del catalogo, così documentazione GitHub, export JSON e sito restano allineati.',
    website: 'Sito web',
    websiteCopy: `Usa [gptimages.dev](${SITE_URL}) per sfogliare, cercare, filtrare e copiare questi prompt. Il sito è basato su questo catalogo ed è il modo più rapido per esplorare pattern per categoria, lingua e fonte.`,
    catalogSnapshot: 'Panoramica del catalogo',
    generated: 'Generato',
    total: 'Prompt totali',
    languages: 'Lingue',
    publicData: 'Dati pubblici',
    contents: 'Collezioni',
    featured: 'Prompt in evidenza',
    featuredIntro: 'Un campione compatto del catalogo. Apri una collezione per leggere il testo completo del prompt.',
    category: 'Categoria',
    categories: 'Categorie',
    source: 'Fonte',
    count: 'Conteggio',
    open: 'Apri',
    dataContract: 'Contratto dati',
    upstreamSources: 'Fonti upstream',
    websiteData: 'I dati machine-readable del catalogo sono disponibili in `data/catalog/`.',
    fullCatalog: 'Ogni corpo del prompt viene generato nei documenti di collezione sotto. Il README principale resta compatto, mentre i file separati mantengono navigabile il catalogo completo.',
    collectionIntro: `Questo file contiene tutti i prompt assegnati a questa collezione. Per navigare visivamente e copiare rapidamente, apri [gptimages.dev](${SITE_URL}).`,
    backToReadme: 'Torna al README',
    uncategorized: 'Senza categoria',
    badgeWebsite: 'Sito',
    badgeLanguages: 'Lingue'
  }),
  ja: makeLabels({
    intro: 'オープンソースプロジェクトから収集した高品質な GPT 画像プロンプトを、正規化して多言語で整理したカタログです。',
    tagline: 'GitHub、JSON、gptimages.dev 向けに正規化された、再利用しやすい GPT 画像プロンプトのパターン集。',
    repositoryCopy: 'このリポジトリの Markdown ファイルは標準化された公開カタログデータから生成されるため、GitHub ドキュメント、JSON エクスポート、Web サイトの内容が揃います。',
    website: 'Web サイト',
    websiteCopy: `これらのプロンプトを閲覧、検索、絞り込み、コピーするには [gptimages.dev](${SITE_URL}) を使ってください。このサイトはこのカタログを基にしており、カテゴリ、言語、ソース別に prompt patterns を探す最速の方法です。`,
    catalogSnapshot: 'カタログ概要',
    generated: '生成日時',
    total: 'プロンプト総数',
    languages: '言語',
    publicData: '公開データ',
    contents: 'コレクション',
    featured: '注目プロンプト',
    featuredIntro: 'カタログからのコンパクトなサンプルです。任意のコレクションを開くと、完全なプロンプト本文を読めます。',
    category: 'カテゴリ',
    categories: 'カテゴリ',
    tags: 'タグ',
    source: 'ソース',
    count: '件数',
    open: '開く',
    dataContract: 'データ仕様',
    upstreamSources: '上流ソース',
    websiteData: '機械可読なカタログデータは `data/catalog/` にあります。',
    fullCatalog: '各プロンプト本文は下のコレクション文書に生成されます。ルート README はコンパクトに保ち、分割ファイルで完全なカタログを見やすくしています。',
    collectionIntro: `このファイルには、このコレクションに分類されたすべてのプロンプトが含まれます。視覚的に閲覧して素早くコピーするには [gptimages.dev](${SITE_URL}) を開いてください。`,
    backToReadme: 'README に戻る',
    uncategorized: '未分類',
    badgeWebsite: 'Web サイト',
    badgeDataset: 'データセット',
    badgeLanguages: '言語'
  }),
  ko: makeLabels({
    intro: '오픈 소스 프로젝트에서 수집한 고품질 GPT 이미지 프롬프트를 정규화하고 다국어로 정리한 카탈로그입니다.',
    tagline: 'GitHub, JSON, gptimages.dev에 맞게 정규화된 재사용 가능한 GPT 이미지 프롬프트 패턴.',
    repositoryCopy: '이 저장소의 Markdown 파일은 표준화된 공개 카탈로그 데이터에서 생성되어 GitHub 문서, JSON 내보내기, 웹사이트 경험이 함께 유지됩니다.',
    website: '웹사이트',
    websiteCopy: `이 프롬프트를 탐색, 검색, 필터링, 복사하려면 [gptimages.dev](${SITE_URL})를 사용하세요. 이 사이트는 이 카탈로그를 기반으로 하며 카테고리, 언어, 출처별 prompt patterns를 살펴보는 가장 빠른 방법입니다.`,
    catalogSnapshot: '카탈로그 요약',
    generated: '생성 시각',
    total: '전체 프롬프트',
    languages: '언어',
    publicData: '공개 데이터',
    contents: '컬렉션',
    featured: '추천 프롬프트',
    featuredIntro: '카탈로그의 작은 샘플입니다. 컬렉션을 열면 전체 prompt text를 읽을 수 있습니다.',
    category: '카테고리',
    categories: '카테고리',
    tags: '태그',
    source: '출처',
    count: '개수',
    open: '열기',
    dataContract: '데이터 계약',
    upstreamSources: '상위 소스',
    websiteData: '기계가 읽을 수 있는 카탈로그 데이터는 `data/catalog/`에 있습니다.',
    fullCatalog: '각 prompt body는 아래 컬렉션 문서로 생성됩니다. 루트 README는 간결하게 유지하고, 분리된 파일로 전체 카탈로그를 쉽게 탐색할 수 있게 합니다.',
    collectionIntro: `이 파일에는 이 컬렉션에 속한 모든 프롬프트가 포함됩니다. 시각적으로 탐색하고 빠르게 복사하려면 [gptimages.dev](${SITE_URL})를 여세요.`,
    backToReadme: 'README로 돌아가기',
    uncategorized: '미분류',
    badgeWebsite: '웹사이트',
    badgeDataset: '데이터셋',
    badgeLanguages: '언어'
  }),
  pt: makeLabels({
    intro: 'Um catálogo curado, normalizado e multilíngue de prompts GPT de imagem de alta qualidade coletados de projetos open source.',
    tagline: 'Padrões reutilizáveis de prompts GPT de imagem, normalizados para GitHub, JSON e gptimages.dev.',
    repositoryCopy: 'Os arquivos Markdown deste repositório são gerados a partir dos dados públicos padronizados do catálogo, mantendo alinhados os docs do GitHub, os exports JSON e a experiência do site.',
    website: 'Site',
    websiteCopy: `Use [gptimages.dev](${SITE_URL}) para navegar, pesquisar, filtrar e copiar estes prompts. O site é baseado neste catálogo e é a forma mais rápida de explorar padrões por categoria, idioma e fonte.`,
    catalogSnapshot: 'Resumo do catálogo',
    generated: 'Gerado',
    total: 'Total de prompts',
    languages: 'Idiomas',
    publicData: 'Dados públicos',
    contents: 'Coleções',
    featured: 'Prompts em destaque',
    featuredIntro: 'Uma amostra compacta do catálogo. Abra qualquer coleção para ler o texto completo do prompt.',
    category: 'Categoria',
    categories: 'Categorias',
    source: 'Fonte',
    count: 'Contagem',
    open: 'Abrir',
    dataContract: 'Contrato de dados',
    upstreamSources: 'Fontes upstream',
    websiteData: 'Os dados machine-readable do catálogo estão em `data/catalog/`.',
    fullCatalog: 'Cada corpo de prompt é gerado nos documentos de coleção abaixo. O README raiz fica compacto enquanto os arquivos divididos mantêm o catálogo completo fácil de navegar.',
    collectionIntro: `Este arquivo contém todos os prompts atribuídos a esta coleção. Para navegação visual e cópia rápida, abra [gptimages.dev](${SITE_URL}).`,
    backToReadme: 'Voltar ao README',
    uncategorized: 'Sem categoria',
    badgeWebsite: 'Site',
    badgeLanguages: 'Idiomas'
  }),
  ru: makeLabels({
    intro: 'Отобранный, нормализованный и многоязычный каталог качественных GPT-промптов для изображений, собранных из open source проектов.',
    tagline: 'Переиспользуемые шаблоны GPT-промптов для изображений, нормализованные для GitHub, JSON и gptimages.dev.',
    repositoryCopy: 'Markdown-файлы в этом репозитории создаются из стандартизированных публичных данных каталога, чтобы документация GitHub, JSON-экспорты и сайт оставались согласованными.',
    website: 'Сайт',
    websiteCopy: `Используйте [gptimages.dev](${SITE_URL}), чтобы просматривать, искать, фильтровать и копировать эти промпты. Сайт построен на этом каталоге и быстрее всего помогает изучать patterns по категориям, языкам и источникам.`,
    catalogSnapshot: 'Сводка каталога',
    generated: 'Создано',
    total: 'Всего промптов',
    languages: 'Языки',
    publicData: 'Публичные данные',
    contents: 'Коллекции',
    featured: 'Избранные промпты',
    featuredIntro: 'Небольшая выборка из каталога. Откройте любую коллекцию, чтобы прочитать полный текст промпта.',
    category: 'Категория',
    categories: 'Категории',
    tags: 'Теги',
    source: 'Источник',
    prompt: 'Промпт',
    count: 'Количество',
    open: 'Открыть',
    dataContract: 'Контракт данных',
    upstreamSources: 'Upstream-источники',
    websiteData: 'Машиночитаемые данные каталога доступны в `data/catalog/`.',
    fullCatalog: 'Полный текст каждого промпта генерируется в документы коллекций ниже. Корневой README остается компактным, а разделенные файлы делают полный каталог удобным для навигации.',
    collectionIntro: `Этот файл содержит все промпты этой коллекции. Для визуального просмотра и быстрого копирования откройте [gptimages.dev](${SITE_URL}).`,
    backToReadme: 'Назад к README',
    uncategorized: 'Без категории',
    badgeWebsite: 'Сайт',
    badgeDataset: 'Данные',
    badgePrompts: 'Промпты',
    badgeLanguages: 'Языки'
  }),
  th: makeLabels({
    intro: 'แคตตาล็อกพรอมป์ GPT สำหรับภาพคุณภาพสูงที่คัดสรร ทำมาตรฐาน และรองรับหลายภาษา รวบรวมจากโปรเจกต์โอเพนซอร์ส',
    tagline: 'รูปแบบพรอมป์ GPT สำหรับภาพที่นำกลับมาใช้ได้ ทำมาตรฐานสำหรับ GitHub, JSON และ gptimages.dev',
    repositoryCopy: 'ไฟล์ Markdown ในรีโพนี้ถูกสร้างจากข้อมูลแคตตาล็อกสาธารณะที่ทำมาตรฐานแล้ว เพื่อให้เอกสาร GitHub, JSON export และเว็บไซต์สอดคล้องกัน',
    website: 'เว็บไซต์',
    websiteCopy: `ใช้ [gptimages.dev](${SITE_URL}) เพื่อเรียกดู ค้นหา กรอง และคัดลอกพรอมป์เหล่านี้ เว็บไซต์นี้สร้างจากแคตตาล็อกนี้และเป็นวิธีที่เร็วที่สุดในการสำรวจ prompt patterns ตามหมวดหมู่ ภาษา และแหล่งที่มา`,
    catalogSnapshot: 'ภาพรวมแคตตาล็อก',
    generated: 'สร้างเมื่อ',
    total: 'พรอมป์ทั้งหมด',
    languages: 'ภาษา',
    publicData: 'ข้อมูลสาธารณะ',
    contents: 'คอลเลกชัน',
    featured: 'พรอมป์แนะนำ',
    featuredIntro: 'ตัวอย่างย่อจากแคตตาล็อก เปิดคอลเลกชันใดก็ได้เพื่ออ่านข้อความพรอมป์ฉบับเต็ม',
    category: 'หมวดหมู่',
    categories: 'หมวดหมู่',
    tags: 'แท็ก',
    source: 'แหล่งที่มา',
    count: 'จำนวน',
    open: 'เปิด',
    dataContract: 'สัญญาข้อมูล',
    upstreamSources: 'แหล่ง upstream',
    websiteData: 'ข้อมูลแคตตาล็อกแบบ machine-readable อยู่ใน `data/catalog/`',
    fullCatalog: 'เนื้อหาพรอมป์ทุกชุดจะถูกสร้างไว้ในเอกสารคอลเลกชันด้านล่าง README หลักยังคงกะทัดรัด ขณะที่ไฟล์แยกช่วยให้นำทางทั้งแคตตาล็อกได้ง่าย',
    collectionIntro: `ไฟล์นี้มีพรอมป์ทั้งหมดในคอลเลกชันนี้ หากต้องการเรียกดูแบบภาพและคัดลอกอย่างรวดเร็ว ให้เปิด [gptimages.dev](${SITE_URL})`,
    backToReadme: 'กลับไป README',
    uncategorized: 'ไม่จัดหมวดหมู่',
    badgeWebsite: 'เว็บไซต์',
    badgeDataset: 'ชุดข้อมูล',
    badgeLanguages: 'ภาษา'
  }),
  tr: makeLabels({
    intro: 'Open source projelerden toplanan yüksek kaliteli GPT görsel promptlarının seçilmiş, normalize edilmiş ve çok dilli kataloğu.',
    tagline: 'GitHub, JSON ve gptimages.dev için normalize edilmiş, tekrar kullanılabilir GPT görsel prompt kalıpları.',
    repositoryCopy: 'Bu repodaki Markdown dosyaları standartlaştırılmış herkese açık katalog verilerinden üretilir; böylece GitHub dokümanları, JSON exportları ve web deneyimi aynı çizgide kalır.',
    website: 'Web sitesi',
    websiteCopy: `Bu promptları gezmek, aramak, filtrelemek ve kopyalamak için [gptimages.dev](${SITE_URL}) kullanın. Site bu katalog üzerine kuruludur ve prompt patterns'ı kategori, dil ve kaynağa göre keşfetmenin en hızlı yoludur.`,
    catalogSnapshot: 'Katalog özeti',
    generated: 'Oluşturulma',
    total: 'Toplam prompt',
    languages: 'Diller',
    publicData: 'Herkese açık veri',
    contents: 'Koleksiyonlar',
    featured: 'Öne çıkan promptlar',
    featuredIntro: 'Katalogdan kompakt bir örnek. Tam prompt metnini okumak için herhangi bir koleksiyonu açın.',
    category: 'Kategori',
    categories: 'Kategoriler',
    tags: 'Etiketler',
    source: 'Kaynak',
    count: 'Sayı',
    open: 'Aç',
    dataContract: 'Veri sözleşmesi',
    upstreamSources: 'Upstream kaynaklar',
    websiteData: 'Machine-readable katalog verisi `data/catalog/` altında bulunur.',
    fullCatalog: 'Her prompt gövdesi aşağıdaki koleksiyon dokümanlarına yazılır. Kök README kompakt kalır; bölünmüş dosyalar tam kataloğu kolay gezilebilir tutar.',
    collectionIntro: `Bu dosya bu koleksiyona atanmış tüm promptları içerir. Görsel gezinti ve hızlı kopyalama için [gptimages.dev](${SITE_URL}) açın.`,
    backToReadme: 'README’ye dön',
    uncategorized: 'Kategorisiz',
    badgeWebsite: 'Site',
    badgeDataset: 'Veri',
    badgePrompts: 'Promptlar',
    badgeLanguages: 'Diller'
  }),
  vi: makeLabels({
    intro: 'Một catalog đa ngôn ngữ đã được tuyển chọn và chuẩn hóa gồm các prompt GPT tạo hình ảnh chất lượng cao, thu thập từ các dự án open source.',
    tagline: 'Các mẫu prompt GPT tạo hình ảnh có thể tái sử dụng, được chuẩn hóa cho GitHub, JSON và gptimages.dev.',
    repositoryCopy: 'Các file Markdown trong repository này được tạo từ dữ liệu catalog công khai đã chuẩn hóa, giúp tài liệu GitHub, JSON export và trải nghiệm website luôn đồng bộ.',
    website: 'Website',
    websiteCopy: `Dùng [gptimages.dev](${SITE_URL}) để duyệt, tìm kiếm, lọc và sao chép các prompt này. Website được xây trên catalog này và là cách nhanh nhất để khám phá prompt patterns theo danh mục, ngôn ngữ và nguồn.`,
    catalogSnapshot: 'Tổng quan catalog',
    generated: 'Đã tạo',
    total: 'Tổng số prompt',
    languages: 'Ngôn ngữ',
    publicData: 'Dữ liệu công khai',
    contents: 'Bộ sưu tập',
    featured: 'Prompt nổi bật',
    featuredIntro: 'Một mẫu ngắn từ catalog. Mở bất kỳ bộ sưu tập nào để đọc toàn bộ nội dung prompt.',
    category: 'Danh mục',
    categories: 'Danh mục',
    tags: 'Thẻ',
    source: 'Nguồn',
    count: 'Số lượng',
    open: 'Mở',
    dataContract: 'Hợp đồng dữ liệu',
    upstreamSources: 'Nguồn upstream',
    websiteData: 'Dữ liệu catalog dạng machine-readable có trong `data/catalog/`.',
    fullCatalog: 'Mỗi nội dung prompt được tạo vào các tài liệu bộ sưu tập bên dưới. README gốc giữ ngắn gọn, còn các file tách riêng giúp duyệt catalog đầy đủ dễ hơn.',
    collectionIntro: `File này chứa mọi prompt thuộc bộ sưu tập này. Để duyệt trực quan và sao chép nhanh, mở [gptimages.dev](${SITE_URL}).`,
    backToReadme: 'Quay lại README',
    uncategorized: 'Chưa phân loại',
    badgeDataset: 'Dataset',
    badgeLanguages: 'Ngôn ngữ'
  }),
  'zh-TW': makeLabels({
    intro: '一個從多個開源專案整理、標準化並支援多語言的高品質 GPT 圖像提示詞目錄。',
    tagline: '可重用的 GPT 圖像提示詞模式，統一生成 GitHub 文件、JSON 資料和 gptimages.dev 網站內容。',
    repositoryCopy: '本倉庫中的 Markdown 文件由標準化公開目錄資料自動生成，確保 GitHub 文件、JSON 匯出檔和網站體驗保持一致。',
    website: '網站',
    websiteCopy: `你可以在 [gptimages.dev](${SITE_URL}) 瀏覽、搜尋、篩選和複製這些提示詞。網站基於本目錄資料建置，更適合按分類、語言和來源快速查找可用的圖像生成 prompt。`,
    catalogSnapshot: '目錄概覽',
    generated: '生成時間',
    total: '提示詞總數',
    languages: '語言',
    publicData: '公開資料',
    contents: '分類集合',
    prompts: '提示詞',
    featured: '精選提示詞',
    featuredIntro: '這裡展示一部分精選條目；開啟任意分類文件即可查看完整提示詞正文。',
    category: '分類',
    categories: '分類',
    tags: '標籤',
    source: '來源',
    prompt: '提示詞',
    count: '數量',
    open: '開啟',
    dataContract: '資料結構',
    upstreamSources: '上游來源',
    websiteData: '機器可讀的公開目錄資料位於 `data/catalog/`。',
    fullCatalog: '每一條提示詞正文都會生成到下面的分類文件中；根 README 保持簡潔，拆分文件保留完整目錄，方便瀏覽。',
    collectionIntro: `本文檔包含歸入此分類的全部提示詞。如需可視化瀏覽和快速複製，可以開啟 [gptimages.dev](${SITE_URL})。`,
    backToReadme: '返回 README',
    uncategorized: '未分類',
    badgeWebsite: '網站',
    badgeDataset: '資料集',
    badgePrompts: '提示詞',
    badgeLanguages: '語言'
  })
});

const COLLECTIONS = [
  {
    slug: 'poster-illustration',
    title: { en: 'Poster & Illustration', 'zh-CN': '海报与插画' },
    keywords: ['poster', 'illustration', 'anime', '海报', '插画', '古风', '节气', '电影海报']
  },
  {
    slug: 'product-marketing',
    title: { en: 'Product & Marketing', 'zh-CN': '产品与营销' },
    keywords: ['product', 'marketing', 'e-commerce', 'amazon', '商品', '产品', '营销', '电商', '详情页', '主图', '口红', '咖啡机']
  },
  {
    slug: 'ui-social-media',
    title: { en: 'UI & Social Media', 'zh-CN': 'UI 与社交媒体' },
    keywords: ['ui', 'interface', 'social', 'mockup', 'youtube', 'thumbnail', '界面', '小红书', '抖音', '社交', '主页']
  },
  {
    slug: 'photography-portrait',
    title: { en: 'Photography & Portrait', 'zh-CN': '摄影与人像' },
    keywords: ['photography', 'portrait', 'photo', 'camera', '摄影', '人像', '写真', '写实']
  },
  {
    slug: 'infographic-education',
    title: { en: 'Infographic & Education', 'zh-CN': '信息图与教育' },
    keywords: ['infographic', 'diagram', 'chart', 'map', 'education', '信息图', '可视化', '图谱', '拆解', '课本', '报告', '技术']
  },
  {
    slug: 'character-design',
    title: { en: 'Character Design', 'zh-CN': '角色设计' },
    keywords: ['character', 'mascot', 'card', 'profile', '角色', '人物', '吉祥物', '卡牌', '圣斗士']
  },
  {
    slug: 'brand-logo',
    title: { en: 'Brand & Logo', 'zh-CN': '品牌与标志' },
    keywords: ['brand', 'logo', 'identity', '品牌', '标志', '徽标']
  },
  {
    slug: 'comic-story',
    title: { en: 'Comic & Story', 'zh-CN': '漫画与叙事' },
    keywords: ['comic', 'story', 'manga', '漫画', '分镜', '故事']
  },
  {
    slug: 'architecture-interior',
    title: { en: 'Architecture & Interior', 'zh-CN': '建筑与空间' },
    keywords: ['architecture', 'interior', 'building', 'room', '建筑', '室内', '空间']
  },
  {
    slug: 'general',
    title: { en: 'General', 'zh-CN': '通用' },
    keywords: []
  }
];

function labelsFor(language) {
  return LABELS[language] || LABELS.en;
}

function readmeFileName(language) {
  return LANGUAGE_FILES[language] || `README_${language}.md`;
}

function languageName(language, displayLanguage = 'en') {
  return LANGUAGE_NAMES[language]?.[displayLanguage] || LANGUAGE_NAMES[language]?.en || language;
}

function languageLinks(language, languages = PUBLIC_LANGUAGES) {
  return languages
    .map(item => `[${languageName(item, language)}](${readmeFileName(item)})`)
    .join(' / ');
}

function languageBadges(language, languages = PUBLIC_LANGUAGES, labels = LABELS.en) {
  return languages
    .map(item => {
      const isCurrent = item === language;
      const message = isCurrent ? labels.currentLanguage : labels.viewLanguage;
      const color = isCurrent ? 'brightgreen' : 'lightgrey';
      return shield(languageName(item, language), message, color, readmeFileName(item));
    })
    .join(' ');
}

function badgeSegment(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/-/g, '--');
}

function shieldImageUrl(label, message, color) {
  return `https://img.shields.io/badge/${badgeSegment(label)}-${badgeSegment(message)}-${color}`;
}

function shield(label, message, color, href) {
  const image = shieldImageUrl(label, message, color);
  return `[![${label}: ${message}](${image})](${href})`;
}

function shieldHtml(label, message, color, href) {
  const image = shieldImageUrl(label, message, color);
  return `<a href="${escapeAttribute(href)}"><img src="${escapeAttribute(image)}" alt="${escapeAttribute(`${label}: ${message}`)}"></a>`;
}

function anchorId(title) {
  return String(title || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function sectionAnchor(title) {
  return `#${anchorId(title)}`;
}

function renderSectionHeading(emoji, title) {
  return `<a id="${escapeAttribute(anchorId(title))}"></a>\n\n## ${emoji} ${title}`;
}

function renderHeader(dataset, labels, language, languages) {
  const total = dataset.totalCount || dataset.prompts?.length || 0;
  const collections = categorySummary(dataset.prompts || []).length;
  const sources = sourceSummary(dataset.prompts || []).length;
  const lines = [];

  lines.push('<div align="center">');
  lines.push('');
  lines.push(`# ${labels.title}`);
  lines.push('');
  lines.push(labels.tagline);
  lines.push('');
  lines.push(`<img src="${COVER_IMAGE}" alt="${escapeAttribute(labels.coverAlt)}" width="960">`);
  lines.push('');
  lines.push([
    shield(labels.badgeAwesome, 'Image Prompts', 'red', 'https://github.com/sindresorhus/awesome'),
    shield(labels.badgeCatalog, 'canonical + JSON', 'informational', 'data/'),
    shield(labels.badgePrompts, total, 'blue', sectionAnchor(labels.contents)),
    shield(labels.badgeCollections, collections, 'purple', sectionAnchor(labels.contents)),
    shield(labels.badgeSources, sources, 'yellow', sectionAnchor(labels.upstreamSources)),
    shield(labels.badgeWorkbench, 'local', 'orange', sectionAnchor(labels.quickStart)),
    shield(labels.badgeLicense, 'see upstream', 'lightgrey', sectionAnchor(labels.license)),
    shield(labels.badgeLanguages, languages.length, 'green', readmeFileName(language))
  ].join(' '));
  lines.push('');
  lines.push(languageBadges(language, languages, labels));
  lines.push('');
  lines.push('</div>');

  return lines.join('\n');
}

function escapeAttribute(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderPreviewImage(url, alt, width) {
  return `<img src="${escapeAttribute(url)}" alt="${escapeAttribute(alt)}" width="${width}">`;
}

function renderWebsitePreview(labels) {
  return [
    '<p align="center">',
    `  ${shieldHtml(labels.badgeWebsite, 'gptimages.dev', 'black', SITE_URL)}`,
    '</p>',
    '',
    '<p align="center">',
    `  <a href="${SITE_URL}">`,
    `    ${renderPreviewImage(WEBSITE_PREVIEW_IMAGE, labels.websitePreviewAlt, 960)}`,
    '  </a>',
    '</p>'
  ].join('\n');
}

function renderCenteredTable(headers, rows) {
  const lines = ['<div align="center">', '', '<table>'];

  if (headers?.length) {
    lines.push('<tr>');
    for (const header of headers) {
      lines.push(`<th align="center">${header}</th>`);
    }
    lines.push('</tr>');
  }

  for (const row of rows) {
    lines.push('<tr>');
    for (const cell of row) {
      lines.push(`<td align="center">${cell}</td>`);
    }
    lines.push('</tr>');
  }

  lines.push('</table>');
  lines.push('');
  lines.push('</div>');
  return lines.join('\n');
}

function formatCount(value) {
  return Number(value || 0).toLocaleString('en-US');
}

function collectionDefinition(slug) {
  return COLLECTIONS.find(collection => collection.slug === slug) || COLLECTIONS[COLLECTIONS.length - 1];
}

function collectionTitle(slug, language = 'en') {
  const collection = collectionDefinition(slug);
  return collection.title[language] || collection.title.en;
}

function collectionSlug(prompt) {
  if (prompt.collection?.slug) return prompt.collection.slug;

  const haystack = [
    prompt.title,
    prompt.description,
    ...(prompt.categories || []),
    ...(prompt.tags || [])
  ].join(' ').toLowerCase();

  const match = COLLECTIONS.find(collection =>
    collection.slug !== 'general'
    && collection.keywords.some(keyword => haystack.includes(keyword.toLowerCase()))
  );

  return match?.slug || 'general';
}

function fenceCode(value) {
  const text = String(value || '')
    .trim()
    .split(/\r?\n/)
    .map(line => line.replace(/[ \t]+$/g, ''))
    .join('\n');
  const longest = Math.max(3, ...Array.from(text.matchAll(/`+/g)).map(match => match[0].length + 1));
  const fence = '`'.repeat(longest);
  return `${fence}text\n${text}\n${fence}`;
}

function firstSourceUrl(prompt) {
  return prompt.sourceUrls?.[0] || prompt.sources?.find(source => source.url)?.url || null;
}

function sourceLabel(prompt) {
  return prompt.sourceRepos?.[0] || prompt.sources?.[0]?.repo || prompt.sources?.[0]?.sourceKey || 'upstream';
}

function promptAnchor(prompt, index) {
  const id = String(prompt.id || '').replace(/^prompt_/, '');
  return id ? `prompt-${id}` : `prompt-${index + 1}`;
}

function categorySummary(prompts) {
  const counts = new Map();
  for (const prompt of prompts || []) {
    const slug = collectionSlug(prompt);
    counts.set(slug, (counts.get(slug) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug));
}

function docsPath(language, slug) {
  return language === 'en' ? `docs/${slug}.md` : `docs/${language}/${slug}.md`;
}

function docsFilePath(projectRoot, language, slug) {
  return path.join(projectRoot, ...docsPath(language, slug).split('/'));
}

function renderStatsTable(dataset, prompts, labels, languages) {
  const total = dataset.totalCount || prompts.length;
  const collectionCount = categorySummary(prompts).length;
  const sourceCount = sourceSummary(prompts).length;
  const cell = (value, label) => `<strong>${escapeHtml(formatCount(value))}</strong><br><sub>${escapeHtml(label)}</sub>`;

  return renderCenteredTable([], [[
    cell(total, labels.total),
    cell(collectionCount, labels.contents),
    cell(sourceCount, labels.upstreamSources),
    cell(languages.length, labels.languages)
  ]]);
}

function renderCollectionsTable(prompts, labels, language) {
  const rows = categorySummary(prompts).map(item => {
    const href = docsPath(language, item.slug);
    return [
      `<a href="${escapeAttribute(href)}">${escapeHtml(collectionTitle(item.slug, language))}</a>`,
      escapeHtml(formatCount(item.count)),
      `<a href="${escapeAttribute(href)}">${escapeHtml(labels.open)} →</a>`
    ];
  });

  return renderCenteredTable([
    escapeHtml(labels.category),
    escapeHtml(labels.count),
    escapeHtml(labels.open)
  ], rows);
}

function renderFeaturedGallery(prompts, labels, language) {
  const visualPrompts = prompts.filter(prompt => prompt.previewImage).slice(0, 6);
  const featured = visualPrompts.length ? visualPrompts : prompts.slice(0, 6);
  const lines = ['<div align="center">', '', '<table>'];

  for (let i = 0; i < featured.length; i += 3) {
    lines.push('<tr>');
    for (const prompt of featured.slice(i, i + 3)) {
      const originalIndex = Math.max(0, prompts.indexOf(prompt));
      const title = prompt.title || `Prompt ${originalIndex + 1}`;
      const href = `${docsPath(language, collectionSlug(prompt))}#${promptAnchor(prompt, originalIndex)}`;
      const collection = collectionTitle(collectionSlug(prompt), language);
      const image = prompt.previewImage
        ? `<a href="${escapeAttribute(href)}">${renderPreviewImage(prompt.previewImage, title, 220)}</a><br>`
        : '';

      lines.push('<td align="center" width="33%">');
      lines.push(image);
      lines.push(`<strong><a href="${escapeAttribute(href)}">${escapeHtml(title)}</a></strong><br>`);
      lines.push(`<sub>${escapeHtml(collection)}</sub>`);
      lines.push('</td>');
    }
    lines.push('</tr>');
  }

  lines.push('</table>');
  lines.push('');
  lines.push('</div>');
  return lines.join('\n');
}

function renderFeatureMatrix(labels) {
  return renderCenteredTable([
    escapeHtml(labels.feature),
    escapeHtml(labels.details)
  ], [
    [`🖼️ ${escapeHtml(labels.visualGallery)}`, escapeHtml(labels.visualGalleryCopy)],
    [`✍️ ${escapeHtml(labels.copyReady)}`, escapeHtml(labels.copyReadyCopy)],
    [`🔗 ${escapeHtml(labels.sourceAttribution)}`, escapeHtml(labels.sourceAttributionCopy)],
    [`🌐 ${escapeHtml(labels.multilingualCatalog)}`, escapeHtml(labels.multilingualCatalogCopy)]
  ]);
}

function renderDataDirectory(labels) {
  return [
    labels.dataDirectoryIntro,
    '',
    renderCenteredTable([
      escapeHtml(labels.dataPath),
      escapeHtml(labels.dataPurpose)
    ], [
      ['`data/canonical/prompts/`', escapeHtml(labels.canonicalData)],
      ['`data/catalog/`', escapeHtml(labels.catalogData)],
      ['`data/reports/current.json`', escapeHtml(labels.reportData)],
      ['`data/runs/`', escapeHtml(labels.runData)]
    ])
  ].join('\n');
}

function renderQuickStart(labels) {
  const rows = [
    ['`pnpm install`', labels.installDeps],
    ['`pnpm ingest`', labels.ingestSource],
    ['`pnpm validate`', labels.validateData],
    ['`pnpm translate -- --language zh-CN`', labels.translateData],
    ['`pnpm classify`', labels.classifyData],
    ['`pnpm assets:mirror`', labels.mirrorAssets],
    ['`pnpm catalog:export -- --languages all`', labels.exportCatalog],
    ['`pnpm readme:generate -- --languages all`', labels.generateReadme],
    ['`pnpm workbench`', labels.startWorkbench],
    ['`pnpm test`', labels.runTests]
  ].map(([command, purpose]) => [command, escapeHtml(purpose)]);

  return [
    labels.quickStartIntro,
    '',
    renderCenteredTable([
      escapeHtml(labels.command),
      escapeHtml(labels.purpose)
    ], rows),
    '',
    labels.workbenchUsage
  ].join('\n');
}

function renderContributing(labels) {
  return [
    labels.contributeIntro,
    '',
    '- Add or adjust upstream parsers under `scripts/ingestion/sources/`.',
    '- Keep canonical ids stable and preserve existing human or AI translations.',
    '- Run `pnpm test` before submitting generated catalog or README changes.',
    '- Include source attribution for every imported prompt and preview asset.'
  ].join('\n');
}

function renderPrompt(prompt, index, labels, options = {}) {
  const lines = [];
  const title = prompt.title || `Prompt ${index + 1}`;
  const sourceUrl = firstSourceUrl(prompt);
  const categories = (prompt.categories || []).join(', ') || labels.uncategorized;
  const tags = (prompt.tags || []).join(', ');

  lines.push(`${options.headingLevel || '###'} ${index + 1}. ${title}`);
  lines.push('');

  if (prompt.previewImage) {
    lines.push(renderPreviewImage(prompt.previewImage, title, options.imageWidth || 480));
    lines.push('');
  }

  if (prompt.description) {
    lines.push(prompt.description);
    lines.push('');
  }

  lines.push(`- **${labels.categories}:** ${categories}`);
  if (tags) lines.push(`- **${labels.tags}:** ${tags}`);
  if (sourceUrl) {
    lines.push(`- **${labels.source}:** [${sourceLabel(prompt)}](${sourceUrl})`);
  } else {
    lines.push(`- **${labels.source}:** ${sourceLabel(prompt)}`);
  }
  lines.push('');
  lines.push(`**${labels.prompt}:**`);
  lines.push('');
  lines.push(fenceCode(prompt.promptText || ''));
  lines.push('');

  return lines.join('\n');
}

function buildReadme(dataset, options = {}) {
  const language = options.language || dataset.language || 'en';
  const labels = labelsFor(language);
  const prompts = dataset.prompts || [];
  const languages = options.languages?.length ? options.languages : dataset.languages || Object.keys(LANGUAGE_FILES);
  const lines = [];

  lines.push(renderHeader(dataset, labels, language, languages));
  lines.push('');
  lines.push('<p align="center">');
  lines.push(`  ${escapeHtml(labels.intro)}<br>`);
  lines.push(`  ${escapeHtml(labels.repositoryCopy)}`);
  lines.push('</p>');
  lines.push('');
  lines.push(renderSectionHeading('✨', labels.website));
  lines.push('');
  lines.push(renderWebsitePreview(labels));
  lines.push('');
  lines.push(labels.websiteCopy);
  lines.push('');
  lines.push(`<p align="center"><a href="${SITE_URL}"><strong>${escapeHtml(labels.openWebsite)}</strong></a></p>`);
  lines.push('');
  lines.push(renderSectionHeading('📊', labels.catalogSnapshot));
  lines.push('');
  lines.push(renderStatsTable(dataset, prompts, labels, languages));
  lines.push('');
  lines.push(`- ${labels.generated}: ${dataset.exportedAt || dataset.generatedAt || new Date().toISOString()}`);
  lines.push(`- ${labels.languages}: ${languageBadges(language, languages, labels)}`);
  lines.push(`- ${labels.publicData}: ${labels.websiteData}`);
  lines.push(`- ${labels.prompts}: ${labels.fullCatalog}`);
  lines.push('');
  lines.push(renderSectionHeading('🗂️', labels.dataDirectory));
  lines.push('');
  lines.push(renderDataDirectory(labels));
  lines.push('');

  lines.push(renderSectionHeading('🧭', labels.contents));
  lines.push('');
  lines.push(renderCollectionsTable(prompts, labels, language));
  lines.push('');
  lines.push(renderSectionHeading('🌟', labels.featured));
  lines.push('');
  lines.push(labels.featuredIntro);
  lines.push('');
  lines.push(renderFeaturedGallery(prompts, labels, language));
  lines.push('');
  lines.push(renderSectionHeading('🧰', labels.featureMatrix));
  lines.push('');
  lines.push(renderFeatureMatrix(labels));
  lines.push('');
  lines.push(renderSectionHeading('📦', labels.dataContract));
  lines.push('');
  lines.push('- `data/catalog/manifest.json`');
  lines.push('- `data/catalog/prompts.<lang>.json`');
  lines.push('- `data/catalog/search.<lang>.json`');
  lines.push('- `data/catalog/taxonomy.json`');
  lines.push('');
  lines.push(renderSectionHeading('🔗', labels.upstreamSources));
  lines.push('');
  for (const source of sourceSummary(prompts)) {
    lines.push(`- ${source.repo}: ${source.count}`);
  }
  lines.push('');
  lines.push(renderSectionHeading('⚡', labels.quickStart));
  lines.push('');
  lines.push(renderQuickStart(labels));
  lines.push('');
  lines.push(renderSectionHeading('🤝', labels.contribute));
  lines.push('');
  lines.push(renderContributing(labels));
  lines.push('');
  lines.push(renderSectionHeading('👥', labels.contributors));
  lines.push('');
  lines.push(labels.contributorsCopy);
  lines.push('');
  lines.push(renderSectionHeading('📄', labels.license));
  lines.push('');
  lines.push(labels.licenseCopy);

  return `${lines.join('\n').replace(/\n{4,}/g, '\n\n\n').trim()}\n`;
}

function sourceSummary(prompts) {
  const counts = new Map();
  for (const prompt of prompts || []) {
    for (const repo of prompt.sourceRepos || []) {
      counts.set(repo, (counts.get(repo) || 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([repo, count]) => ({ repo, count }))
    .sort((a, b) => b.count - a.count || a.repo.localeCompare(b.repo));
}

function groupPrompts(prompts) {
  const groups = new Map();
  for (const prompt of prompts || []) {
    const slug = collectionSlug(prompt);
    if (!groups.has(slug)) groups.set(slug, []);
    groups.get(slug).push(prompt);
  }
  return Array.from(groups.entries())
    .map(([slug, items]) => ({ slug, prompts: items }))
    .sort((a, b) => collectionTitle(a.slug).localeCompare(collectionTitle(b.slug)));
}

function buildCollectionDoc(dataset, slug, prompts, options = {}) {
  const language = options.language || dataset.language || 'en';
  const labels = labelsFor(language);
  const lines = [];
  const readmePath = language === 'en' ? '../README.md' : `../../${readmeFileName(language)}`;

  lines.push(`# ${collectionTitle(slug, language)}`);
  lines.push('');
  lines.push(`[${labels.backToReadme}](${readmePath})`);
  lines.push('');
  lines.push(labels.collectionIntro);
  lines.push('');
  lines.push(`- ${labels.total}: ${prompts.length}`);
  lines.push(`- ${labels.generated}: ${dataset.exportedAt || dataset.generatedAt || new Date().toISOString()}`);
  lines.push('');
  lines.push(`## ${labels.prompts}`);
  lines.push('');

  prompts.forEach((prompt, index) => {
    lines.push(`<a id="${promptAnchor(prompt, index)}"></a>`);
    lines.push('');
    lines.push(renderPrompt(prompt, index, labels, { headingLevel: '###' }));
  });

  return `${lines.join('\n').replace(/\n{4,}/g, '\n\n\n').trim()}\n`;
}

function readDataset(projectRoot, language) {
  return readJson(path.join(projectRoot, 'data', 'catalog', `prompts.${language}.json`));
}

async function generateReadmes(options = {}) {
  const projectRoot = options.projectRoot || path.join(__dirname, '..', '..');
  const languages = parseLanguageList(options.languages, PUBLIC_LANGUAGES);
  const files = [];

  for (const language of languages) {
    const fileName = readmeFileName(language);
    const dataset = readDataset(projectRoot, language);
    const outputPath = path.join(projectRoot, fileName);
    ensureDir(path.dirname(outputPath));
    fs.writeFileSync(outputPath, buildReadme(dataset, { language, languages }), 'utf-8');
    files.push(fileName);

    for (const group of groupPrompts(dataset.prompts || [])) {
      const docPath = docsFilePath(projectRoot, language, group.slug);
      ensureDir(path.dirname(docPath));
      fs.writeFileSync(docPath, buildCollectionDoc(dataset, group.slug, group.prompts, { language }), 'utf-8');
      files.push(docsPath(language, group.slug));
    }
  }

  return { files };
}

function parseList(value, fallback = []) {
  return parseLanguageList(value, fallback);
}

function parseArgs(argv) {
  const args = {
    projectRoot: path.join(__dirname, '..', '..'),
    languages: parseList(process.env.README_LANGUAGES, PUBLIC_LANGUAGES)
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--project-root') {
      args.projectRoot = path.resolve(argv[++i]);
    } else if (arg === '--languages' || arg === '--langs') {
      args.languages = parseList(argv[++i]);
    }
  }

  return args;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const result = await generateReadmes(args);
  console.log(`Generated ${result.files.join(', ')}.`);
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.stack || error.message);
    process.exit(1);
  });
}

module.exports = {
  buildReadme,
  buildCollectionDoc,
  collectionSlug,
  fenceCode,
  generateReadmes,
  parseArgs,
  main
};
