<div align="center">

# awesome-image-prompts

A versionable prompt catalog for ingestion, cleanup, translation, classification, and publishing.

<img src="images/awesome-image-prompts-cover.jpg" alt="awesome-image-prompts generated cover" width="960">

[![Awesome: Image Prompts](https://img.shields.io/badge/Awesome-Image_Prompts-red)](https://github.com/sindresorhus/awesome) [![Catalog: canonical + JSON](https://img.shields.io/badge/Catalog-canonical_+_JSON-informational)](data/) [![Prompts: 1013](https://img.shields.io/badge/Prompts-1013-blue)](#collections) [![Collections: 10](https://img.shields.io/badge/Collections-10-purple)](#collections) [![Sources: 4](https://img.shields.io/badge/Sources-4-yellow)](#upstream-sources) [![Workbench: local](https://img.shields.io/badge/Workbench-local-orange)](#quick-start) [![License: see upstream](https://img.shields.io/badge/License-see_upstream-lightgrey)](#license) [![Languages: 15](https://img.shields.io/badge/Languages-15-green)](README.md)

[![German: View](https://img.shields.io/badge/German-View-lightgrey)](README_de.md) [![English: Current](https://img.shields.io/badge/English-Current-brightgreen)](README.md) [![Spanish: View](https://img.shields.io/badge/Spanish-View-lightgrey)](README_es.md) [![French: View](https://img.shields.io/badge/French-View-lightgrey)](README_fr.md) [![Hindi: View](https://img.shields.io/badge/Hindi-View-lightgrey)](README_hi.md) [![Italian: View](https://img.shields.io/badge/Italian-View-lightgrey)](README_it.md) [![Japanese: View](https://img.shields.io/badge/Japanese-View-lightgrey)](README_ja.md) [![Korean: View](https://img.shields.io/badge/Korean-View-lightgrey)](README_ko.md) [![Portuguese: View](https://img.shields.io/badge/Portuguese-View-lightgrey)](README_pt.md) [![Russian: View](https://img.shields.io/badge/Russian-View-lightgrey)](README_ru.md) [![Thai: View](https://img.shields.io/badge/Thai-View-lightgrey)](README_th.md) [![Turkish: View](https://img.shields.io/badge/Turkish-View-lightgrey)](README_tr.md) [![Vietnamese: View](https://img.shields.io/badge/Vietnamese-View-lightgrey)](README_vi.md) [![Simplified Chinese: View](https://img.shields.io/badge/Simplified_Chinese-View-lightgrey)](README_zh-CN.md) [![Traditional Chinese: View](https://img.shields.io/badge/Traditional_Chinese-View-lightgrey)](README_zh-TW.md)

</div>

<p align="center">
  A curated, normalized, multilingual catalog of high-quality GPT image prompts collected from open-source projects.<br>
  This repository contains upstream README parsers, canonical prompt shards, validation reports, localized catalog exports, and generated collection docs.
</p>

<a id="website"></a>

## ✨ Website

<p align="center">
  <a href="https://gptimages.dev"><img src="https://img.shields.io/badge/Website-gptimages.dev-black" alt="Website: gptimages.dev"></a>
</p>

<p align="center">
  <a href="https://gptimages.dev">
    <img src="images/gptimages-gallery-preview.png" alt="GptImages.dev prompt gallery preview" width="960">
  </a>
</p>

Use [gptimages.dev](https://gptimages.dev) to browse, search, filter, and copy these prompts. The site is built on this catalog and is the fastest way to explore prompt patterns by category, language, and source.

<p align="center"><a href="https://gptimages.dev"><strong>Open gptimages.dev</strong></a></p>

<a id="catalog-snapshot"></a>

## 📊 Catalog Snapshot

<div align="center">

<table>
<tr>
<td align="center"><strong>1,013</strong><br><sub>Total prompts</sub></td>
<td align="center"><strong>10</strong><br><sub>Collections</sub></td>
<td align="center"><strong>4</strong><br><sub>Upstream Sources</sub></td>
<td align="center"><strong>15</strong><br><sub>Languages</sub></td>
</tr>
</table>

</div>

- Generated: 2026-05-06T16:38:26.254Z
- Languages: [![German: View](https://img.shields.io/badge/German-View-lightgrey)](README_de.md) [![English: Current](https://img.shields.io/badge/English-Current-brightgreen)](README.md) [![Spanish: View](https://img.shields.io/badge/Spanish-View-lightgrey)](README_es.md) [![French: View](https://img.shields.io/badge/French-View-lightgrey)](README_fr.md) [![Hindi: View](https://img.shields.io/badge/Hindi-View-lightgrey)](README_hi.md) [![Italian: View](https://img.shields.io/badge/Italian-View-lightgrey)](README_it.md) [![Japanese: View](https://img.shields.io/badge/Japanese-View-lightgrey)](README_ja.md) [![Korean: View](https://img.shields.io/badge/Korean-View-lightgrey)](README_ko.md) [![Portuguese: View](https://img.shields.io/badge/Portuguese-View-lightgrey)](README_pt.md) [![Russian: View](https://img.shields.io/badge/Russian-View-lightgrey)](README_ru.md) [![Thai: View](https://img.shields.io/badge/Thai-View-lightgrey)](README_th.md) [![Turkish: View](https://img.shields.io/badge/Turkish-View-lightgrey)](README_tr.md) [![Vietnamese: View](https://img.shields.io/badge/Vietnamese-View-lightgrey)](README_vi.md) [![Simplified Chinese: View](https://img.shields.io/badge/Simplified_Chinese-View-lightgrey)](README_zh-CN.md) [![Traditional Chinese: View](https://img.shields.io/badge/Traditional_Chinese-View-lightgrey)](README_zh-TW.md)
- Public data: Machine-readable catalog data is available under `data/catalog/`.
- Prompts: Every prompt body is generated into the collection documents below. The root README stays compact while the split files keep the full catalog easy to navigate.

<a id="data-directory"></a>

## 🗂️ Data Directory

The `data/` directory is the source of truth for this repository. Human and AI edits live in canonical shards; publishable website data is generated from those shards.

<div align="center">

<table>
<tr>
<th align="center">Path</th>
<th align="center">Purpose</th>
</tr>
<tr>
<td align="center">`data/canonical/prompts/`</td>
<td align="center">Per-prompt canonical JSON shards. These preserve stable ids, upstream references, translations, assets, categories, and local edits.</td>
</tr>
<tr>
<td align="center">`data/catalog/`</td>
<td align="center">Localized public JSON exports consumed by websites and downstream tools.</td>
</tr>
<tr>
<td align="center">`data/reports/current.json`</td>
<td align="center">Current validation, warning, and maintenance report for the workbench.</td>
</tr>
<tr>
<td align="center">`data/runs/`</td>
<td align="center">Extraction run history with added, updated, unchanged, warning, and error counts.</td>
</tr>
</table>

</div>

<a id="collections"></a>

## 🧭 Collections

<div align="center">

<table>
<tr>
<th align="center">Category</th>
<th align="center">Count</th>
<th align="center">Open</th>
</tr>
<tr>
<td align="center"><a href="docs/poster-illustration.md">Poster &amp; Illustration</a></td>
<td align="center">364</td>
<td align="center"><a href="docs/poster-illustration.md">Open →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/ui-social-media.md">UI &amp; Social Media</a></td>
<td align="center">200</td>
<td align="center"><a href="docs/ui-social-media.md">Open →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/photography-portrait.md">Photography &amp; Portrait</a></td>
<td align="center">174</td>
<td align="center"><a href="docs/photography-portrait.md">Open →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/product-marketing.md">Product &amp; Marketing</a></td>
<td align="center">104</td>
<td align="center"><a href="docs/product-marketing.md">Open →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/infographic-education.md">Infographic &amp; Education</a></td>
<td align="center">79</td>
<td align="center"><a href="docs/infographic-education.md">Open →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/character-design.md">Character Design</a></td>
<td align="center">30</td>
<td align="center"><a href="docs/character-design.md">Open →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/comic-story.md">Comic &amp; Story</a></td>
<td align="center">19</td>
<td align="center"><a href="docs/comic-story.md">Open →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/general.md">General</a></td>
<td align="center">17</td>
<td align="center"><a href="docs/general.md">Open →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/architecture-interior.md">Architecture &amp; Interior</a></td>
<td align="center">15</td>
<td align="center"><a href="docs/architecture-interior.md">Open →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/brand-logo.md">Brand &amp; Logo</a></td>
<td align="center">11</td>
<td align="center"><a href="docs/brand-logo.md">Open →</a></td>
</tr>
</table>

</div>

<a id="featured-prompts"></a>

## 🌟 Featured Prompts

A compact sample from the catalog. Open any collection to read the complete prompt text.

<div align="center">

<table>
<tr>
<td align="center" width="33%">
<a href="docs/ui-social-media.md#prompt-abc95efc8feb9f8cc5c6"><img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-API-and-Prompts/main/images/ui_case130/output.jpg" alt="Annotated Coffee Table Mood Board" width="220"></a><br>
<strong><a href="docs/ui-social-media.md#prompt-abc95efc8feb9f8cc5c6">Annotated Coffee Table Mood Board</a></strong><br>
<sub>UI &amp; Social Media</sub>
</td>
<td align="center" width="33%">
<a href="docs/poster-illustration.md#prompt-0093b22034fc6d702ece"><img src="https://cms-assets.youmind.com/media/1777971065784_6h37nn_HHgpXB-aQAAHvgY.jpg" alt="Comic / Storyboard - Rainy Sci-Fi Infiltration Scene" width="220"></a><br>
<strong><a href="docs/poster-illustration.md#prompt-0093b22034fc6d702ece">Comic / Storyboard - Rainy Sci-Fi Infiltration Scene</a></strong><br>
<sub>Poster &amp; Illustration</sub>
</td>
<td align="center" width="33%">
<a href="docs/photography-portrait.md#prompt-01ea4ab521639902beef"><img src="https://cms-assets.youmind.com/media/1777971054862_xeljaa_HHe4mOIbwAAALoS.jpg" alt="Profile / Avatar - Crimson Moody Double Exposure Portrait" width="220"></a><br>
<strong><a href="docs/photography-portrait.md#prompt-01ea4ab521639902beef">Profile / Avatar - Crimson Moody Double Exposure Portrait</a></strong><br>
<sub>Photography &amp; Portrait</sub>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="docs/poster-illustration.md#prompt-02a3e51e87b0ecc220fc"><img src="https://cms-assets.youmind.com/media/1777971056453_rklwmd_HHgZvdFbUAAA7Cf.jpg" alt="Game Asset - Anime Card Game Lobby UI" width="220"></a><br>
<strong><a href="docs/poster-illustration.md#prompt-02a3e51e87b0ecc220fc">Game Asset - Anime Card Game Lobby UI</a></strong><br>
<sub>Poster &amp; Illustration</sub>
</td>
<td align="center" width="33%">
<a href="docs/photography-portrait.md#prompt-02dd9304d0c16ac57f17"><img src="https://cms-assets.youmind.com/media/1777971024582_llazmr_HHggiOjWAAEzY8_.jpg" alt="Profile / Avatar - Summer Grape Girl Photo Series" width="220"></a><br>
<strong><a href="docs/photography-portrait.md#prompt-02dd9304d0c16ac57f17">Profile / Avatar - Summer Grape Girl Photo Series</a></strong><br>
<sub>Photography &amp; Portrait</sub>
</td>
<td align="center" width="33%">
<a href="docs/poster-illustration.md#prompt-0325b44927db2112e613"><img src="https://cms-assets.youmind.com/media/1777971052498_xam4k1_HHetetIa4AAJKk4.jpg" alt="Comic / Storyboard - Anime Countryside Dog Walk T-Shirt Scene" width="220"></a><br>
<strong><a href="docs/poster-illustration.md#prompt-0325b44927db2112e613">Comic / Storyboard - Anime Countryside Dog Walk T-Shirt Scene</a></strong><br>
<sub>Poster &amp; Illustration</sub>
</td>
</tr>
</table>

</div>

<a id="what-you-get"></a>

## 🧰 What You Get

<div align="center">

<table>
<tr>
<th align="center">Feature</th>
<th align="center">Details</th>
</tr>
<tr>
<td align="center">🖼️ Visual gallery</td>
<td align="center">Image-led browsing with real GPT image outputs.</td>
</tr>
<tr>
<td align="center">✍️ Copy-ready prompts</td>
<td align="center">Reusable prompt text is preserved in collection documents.</td>
</tr>
<tr>
<td align="center">🔗 Source attribution</td>
<td align="center">Every catalog item keeps upstream repository references.</td>
</tr>
<tr>
<td align="center">🌐 Multilingual catalog</td>
<td align="center">Localized README and JSON outputs use available translations and fall back to the default prompt text when needed.</td>
</tr>
</table>

</div>

<a id="data-contract"></a>

## 📦 Data Contract

- `data/catalog/manifest.json`
- `data/catalog/prompts.<lang>.json`
- `data/catalog/search.<lang>.json`
- `data/catalog/taxonomy.json`

<a id="upstream-sources"></a>

## 🔗 Upstream Sources

- freestylefly/awesome-gpt-image-2: 372
- EvoLinkAI/awesome-gpt-image-2-prompts: 362
- YouMind-OpenLab/awesome-gpt-image-2: 222
- ZeroLu/awesome-gpt-image: 79

<a id="quick-start"></a>

## ⚡ Quick Start

Use pnpm scripts for repeatable ingestion, validation, export, README generation, and local review.

<div align="center">

<table>
<tr>
<th align="center">Command</th>
<th align="center">Purpose</th>
</tr>
<tr>
<td align="center">`pnpm install`</td>
<td align="center">Install dependencies.</td>
</tr>
<tr>
<td align="center">`pnpm ingest`</td>
<td align="center">Parse configured upstream repositories, merge records, and preserve existing local edits.</td>
</tr>
<tr>
<td align="center">`pnpm validate`</td>
<td align="center">Validate canonical prompt data and refresh the current report.</td>
</tr>
<tr>
<td align="center">`pnpm translate -- --language zh-CN`</td>
<td align="center">Fill missing translations with the configured AI provider.</td>
</tr>
<tr>
<td align="center">`pnpm classify`</td>
<td align="center">Map upstream categories into canonical categories and surface unresolved cases.</td>
</tr>
<tr>
<td align="center">`pnpm assets:mirror`</td>
<td align="center">Mirror missing remote assets into the local asset cache.</td>
</tr>
<tr>
<td align="center">`pnpm catalog:export -- --languages all`</td>
<td align="center">Export localized JSON catalog files from canonical data.</td>
</tr>
<tr>
<td align="center">`pnpm readme:generate -- --languages all`</td>
<td align="center">Regenerate README files and split collection documents.</td>
</tr>
<tr>
<td align="center">`pnpm workbench`</td>
<td align="center">Start the local maintenance workbench.</td>
</tr>
<tr>
<td align="center">`pnpm test`</td>
<td align="center">Run the ingestion, catalog, workbench, and README test suite.</td>
</tr>
</table>

</div>

After `pnpm workbench`, open `http://127.0.0.1:4173` to review warnings, batch translate, classify, export catalog data, and regenerate README files.

<a id="how-to-contribute"></a>

## 🤝 How to Contribute

Contributions are welcome when they keep the catalog stable, traceable, and reviewable.

- Add or adjust upstream parsers under `scripts/ingestion/sources/`.
- Keep canonical ids stable and preserve existing human or AI translations.
- Run `pnpm test` before submitting generated catalog or README changes.
- Include source attribution for every imported prompt and preview asset.

<a id="contributors"></a>

## 👥 Contributors

Thanks to everyone who adds adapters, improves taxonomy rules, translates prompts, validates upstream changes, or reviews catalog quality.

<a id="license"></a>

## 📄 License

Prompt text, preview images, and upstream metadata keep their original upstream ownership and license terms. Repository scripts and generated catalog structure are provided for cataloging and educational use; please keep source attribution when reusing the data.
