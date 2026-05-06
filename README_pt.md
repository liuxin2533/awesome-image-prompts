<div align="center">

# awesome-image-prompts

Padrões reutilizáveis de prompts GPT de imagem, normalizados para GitHub, JSON e gptimages.dev.

<img src="images/awesome-image-prompts-cover.jpg" alt="awesome-image-prompts generated cover" width="960">

[![Awesome: Image Prompts](https://img.shields.io/badge/Awesome-Image_Prompts-red)](https://github.com/sindresorhus/awesome) [![Catalog: canonical + JSON](https://img.shields.io/badge/Catalog-canonical_+_JSON-informational)](data/) [![Prompts: 1013](https://img.shields.io/badge/Prompts-1013-blue)](#coleções) [![Collections: 10](https://img.shields.io/badge/Collections-10-purple)](#coleções) [![Sources: 4](https://img.shields.io/badge/Sources-4-yellow)](#fontes-upstream) [![Workbench: local](https://img.shields.io/badge/Workbench-local-orange)](#quick-start) [![License: see upstream](https://img.shields.io/badge/License-see_upstream-lightgrey)](#license) [![Idiomas: 15](https://img.shields.io/badge/Idiomas-15-green)](README_pt.md)

[![German: View](https://img.shields.io/badge/German-View-lightgrey)](README_de.md) [![English: View](https://img.shields.io/badge/English-View-lightgrey)](README.md) [![Spanish: View](https://img.shields.io/badge/Spanish-View-lightgrey)](README_es.md) [![French: View](https://img.shields.io/badge/French-View-lightgrey)](README_fr.md) [![Hindi: View](https://img.shields.io/badge/Hindi-View-lightgrey)](README_hi.md) [![Italian: View](https://img.shields.io/badge/Italian-View-lightgrey)](README_it.md) [![Japanese: View](https://img.shields.io/badge/Japanese-View-lightgrey)](README_ja.md) [![Korean: View](https://img.shields.io/badge/Korean-View-lightgrey)](README_ko.md) [![Português: Current](https://img.shields.io/badge/Português-Current-brightgreen)](README_pt.md) [![Russian: View](https://img.shields.io/badge/Russian-View-lightgrey)](README_ru.md) [![Thai: View](https://img.shields.io/badge/Thai-View-lightgrey)](README_th.md) [![Turkish: View](https://img.shields.io/badge/Turkish-View-lightgrey)](README_tr.md) [![Vietnamese: View](https://img.shields.io/badge/Vietnamese-View-lightgrey)](README_vi.md) [![Simplified Chinese: View](https://img.shields.io/badge/Simplified_Chinese-View-lightgrey)](README_zh-CN.md) [![Traditional Chinese: View](https://img.shields.io/badge/Traditional_Chinese-View-lightgrey)](README_zh-TW.md)

</div>

<p align="center">
  Um catálogo curado, normalizado e multilíngue de prompts GPT de imagem de alta qualidade coletados de projetos open source.<br>
  Os arquivos Markdown deste repositório são gerados a partir dos dados públicos padronizados do catálogo, mantendo alinhados os docs do GitHub, os exports JSON e a experiência do site.
</p>

<a id="site"></a>

## ✨ Site

<p align="center">
  <a href="https://gptimages.dev"><img src="https://img.shields.io/badge/Site-gptimages.dev-black" alt="Site: gptimages.dev"></a>
</p>

<p align="center">
  <a href="https://gptimages.dev">
    <img src="images/gptimages-gallery-preview.png" alt="GptImages.dev prompt gallery preview" width="960">
  </a>
</p>

Use [gptimages.dev](https://gptimages.dev) para navegar, pesquisar, filtrar e copiar estes prompts. O site é baseado neste catálogo e é a forma mais rápida de explorar padrões por categoria, idioma e fonte.

<p align="center"><a href="https://gptimages.dev"><strong>Open gptimages.dev</strong></a></p>

<a id="resumo-do-catálogo"></a>

## 📊 Resumo do catálogo

<div align="center">

<table>
<tr>
<td align="center"><strong>1,013</strong><br><sub>Total de prompts</sub></td>
<td align="center"><strong>10</strong><br><sub>Coleções</sub></td>
<td align="center"><strong>4</strong><br><sub>Fontes upstream</sub></td>
<td align="center"><strong>15</strong><br><sub>Idiomas</sub></td>
</tr>
</table>

</div>

- Gerado: 2026-05-06T16:38:26.826Z
- Idiomas: [![German: View](https://img.shields.io/badge/German-View-lightgrey)](README_de.md) [![English: View](https://img.shields.io/badge/English-View-lightgrey)](README.md) [![Spanish: View](https://img.shields.io/badge/Spanish-View-lightgrey)](README_es.md) [![French: View](https://img.shields.io/badge/French-View-lightgrey)](README_fr.md) [![Hindi: View](https://img.shields.io/badge/Hindi-View-lightgrey)](README_hi.md) [![Italian: View](https://img.shields.io/badge/Italian-View-lightgrey)](README_it.md) [![Japanese: View](https://img.shields.io/badge/Japanese-View-lightgrey)](README_ja.md) [![Korean: View](https://img.shields.io/badge/Korean-View-lightgrey)](README_ko.md) [![Português: Current](https://img.shields.io/badge/Português-Current-brightgreen)](README_pt.md) [![Russian: View](https://img.shields.io/badge/Russian-View-lightgrey)](README_ru.md) [![Thai: View](https://img.shields.io/badge/Thai-View-lightgrey)](README_th.md) [![Turkish: View](https://img.shields.io/badge/Turkish-View-lightgrey)](README_tr.md) [![Vietnamese: View](https://img.shields.io/badge/Vietnamese-View-lightgrey)](README_vi.md) [![Simplified Chinese: View](https://img.shields.io/badge/Simplified_Chinese-View-lightgrey)](README_zh-CN.md) [![Traditional Chinese: View](https://img.shields.io/badge/Traditional_Chinese-View-lightgrey)](README_zh-TW.md)
- Dados públicos: Os dados machine-readable do catálogo estão em `data/catalog/`.
- Prompts: Cada corpo de prompt é gerado nos documentos de coleção abaixo. O README raiz fica compacto enquanto os arquivos divididos mantêm o catálogo completo fácil de navegar.

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

<a id="coleções"></a>

## 🧭 Coleções

<div align="center">

<table>
<tr>
<th align="center">Categoria</th>
<th align="center">Contagem</th>
<th align="center">Abrir</th>
</tr>
<tr>
<td align="center"><a href="docs/pt/poster-illustration.md">Poster &amp; Illustration</a></td>
<td align="center">363</td>
<td align="center"><a href="docs/pt/poster-illustration.md">Abrir →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/pt/ui-social-media.md">UI &amp; Social Media</a></td>
<td align="center">196</td>
<td align="center"><a href="docs/pt/ui-social-media.md">Abrir →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/pt/photography-portrait.md">Photography &amp; Portrait</a></td>
<td align="center">179</td>
<td align="center"><a href="docs/pt/photography-portrait.md">Abrir →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/pt/product-marketing.md">Product &amp; Marketing</a></td>
<td align="center">104</td>
<td align="center"><a href="docs/pt/product-marketing.md">Abrir →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/pt/infographic-education.md">Infographic &amp; Education</a></td>
<td align="center">78</td>
<td align="center"><a href="docs/pt/infographic-education.md">Abrir →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/pt/character-design.md">Character Design</a></td>
<td align="center">31</td>
<td align="center"><a href="docs/pt/character-design.md">Abrir →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/pt/comic-story.md">Comic &amp; Story</a></td>
<td align="center">19</td>
<td align="center"><a href="docs/pt/comic-story.md">Abrir →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/pt/general.md">General</a></td>
<td align="center">17</td>
<td align="center"><a href="docs/pt/general.md">Abrir →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/pt/architecture-interior.md">Architecture &amp; Interior</a></td>
<td align="center">15</td>
<td align="center"><a href="docs/pt/architecture-interior.md">Abrir →</a></td>
</tr>
<tr>
<td align="center"><a href="docs/pt/brand-logo.md">Brand &amp; Logo</a></td>
<td align="center">11</td>
<td align="center"><a href="docs/pt/brand-logo.md">Abrir →</a></td>
</tr>
</table>

</div>

<a id="prompts-em-destaque"></a>

## 🌟 Prompts em destaque

Uma amostra compacta do catálogo. Abra qualquer coleção para ler o texto completo do prompt.

<div align="center">

<table>
<tr>
<td align="center" width="33%">
<a href="docs/pt/ui-social-media.md#prompt-abc95efc8feb9f8cc5c6"><img src="https://raw.githubusercontent.com/EvoLinkAI/awesome-gpt-image-2-API-and-Prompts/main/images/ui_case130/output.jpg" alt="Annotated Coffee Table Mood Board" width="220"></a><br>
<strong><a href="docs/pt/ui-social-media.md#prompt-abc95efc8feb9f8cc5c6">Annotated Coffee Table Mood Board</a></strong><br>
<sub>UI &amp; Social Media</sub>
</td>
<td align="center" width="33%">
<a href="docs/pt/poster-illustration.md#prompt-0093b22034fc6d702ece"><img src="https://cms-assets.youmind.com/media/1777971065784_6h37nn_HHgpXB-aQAAHvgY.jpg" alt="Banda desenhada / Storyboard - Cena de Infiltração Sci-Fi Chuvosa" width="220"></a><br>
<strong><a href="docs/pt/poster-illustration.md#prompt-0093b22034fc6d702ece">Banda desenhada / Storyboard - Cena de Infiltração Sci-Fi Chuvosa</a></strong><br>
<sub>Poster &amp; Illustration</sub>
</td>
<td align="center" width="33%">
<a href="docs/pt/photography-portrait.md#prompt-01ea4ab521639902beef"><img src="https://cms-assets.youmind.com/media/1777971054862_xeljaa_HHe4mOIbwAAALoS.jpg" alt="Perfil / Avatar - Retrato de Dupla Exposição em Tons Carmesim" width="220"></a><br>
<strong><a href="docs/pt/photography-portrait.md#prompt-01ea4ab521639902beef">Perfil / Avatar - Retrato de Dupla Exposição em Tons Carmesim</a></strong><br>
<sub>Photography &amp; Portrait</sub>
</td>
</tr>
<tr>
<td align="center" width="33%">
<a href="docs/pt/poster-illustration.md#prompt-02a3e51e87b0ecc220fc"><img src="https://cms-assets.youmind.com/media/1777971056453_rklwmd_HHgZvdFbUAAA7Cf.jpg" alt="Ativo de Jogo - Interface de Lobby de Jogo de Cartas de Anime" width="220"></a><br>
<strong><a href="docs/pt/poster-illustration.md#prompt-02a3e51e87b0ecc220fc">Ativo de Jogo - Interface de Lobby de Jogo de Cartas de Anime</a></strong><br>
<sub>Poster &amp; Illustration</sub>
</td>
<td align="center" width="33%">
<a href="docs/pt/photography-portrait.md#prompt-02dd9304d0c16ac57f17"><img src="https://cms-assets.youmind.com/media/1777971024582_llazmr_HHggiOjWAAEzY8_.jpg" alt="Perfil / Avatar - Série de Fotos &quot;Garota das Uvas de Verão&quot;" width="220"></a><br>
<strong><a href="docs/pt/photography-portrait.md#prompt-02dd9304d0c16ac57f17">Perfil / Avatar - Série de Fotos "Garota das Uvas de Verão"</a></strong><br>
<sub>Photography &amp; Portrait</sub>
</td>
<td align="center" width="33%">
<a href="docs/pt/poster-illustration.md#prompt-0325b44927db2112e613"><img src="https://cms-assets.youmind.com/media/1777971052498_xam4k1_HHetetIa4AAJKk4.jpg" alt="Banda desenhada / Storyboard - Cena de Camiseta com Cachorro no Campo em Estilo Anime" width="220"></a><br>
<strong><a href="docs/pt/poster-illustration.md#prompt-0325b44927db2112e613">Banda desenhada / Storyboard - Cena de Camiseta com Cachorro no Campo em Estilo Anime</a></strong><br>
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

<a id="contrato-de-dados"></a>

## 📦 Contrato de dados

- `data/catalog/manifest.json`
- `data/catalog/prompts.<lang>.json`
- `data/catalog/search.<lang>.json`
- `data/catalog/taxonomy.json`

<a id="fontes-upstream"></a>

## 🔗 Fontes upstream

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
