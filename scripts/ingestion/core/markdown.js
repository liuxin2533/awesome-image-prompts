function lineForIndex(markdown, index) {
  return String(markdown || '').slice(0, Math.max(0, index)).split(/\r?\n/).length;
}

function splitHeadingSections(markdown, headingPattern) {
  const text = String(markdown || '');
  const source = headingPattern instanceof RegExp ? headingPattern.source : String(headingPattern);
  const baseFlags = headingPattern instanceof RegExp ? headingPattern.flags : '';
  const flags = Array.from(new Set(`${baseFlags}gm`.split(''))).join('');
  const regex = new RegExp(source, flags);
  const headings = [];

  let match;
  while ((match = regex.exec(text))) {
    const lineEnd = text.indexOf('\n', match.index);
    const heading = text.slice(match.index, lineEnd === -1 ? text.length : lineEnd).replace(/\r$/, '');
    headings.push({
      line: lineForIndex(text, match.index),
      index: match.index,
      heading
    });
  }

  return headings.map((heading, i) => {
    const next = headings[i + 1];
    return {
      heading: heading.heading,
      line: heading.line,
      startIndex: heading.index,
      endIndex: next ? next.index : text.length,
      content: text.slice(heading.index, next ? next.index : text.length)
    };
  });
}

function extractFencedCodeAfterLabel(markdown, labels) {
  const text = String(markdown || '');
  const wanted = (labels || []).map(label => String(label).toLowerCase());
  const lines = text.split(/\r?\n/);
  let searchFrom = 0;
  let offset = 0;

  for (const line of lines) {
    const lower = line.toLowerCase();
    if (wanted.some(label => lower.includes(label.toLowerCase()))) {
      searchFrom = offset + line.length;
      break;
    }
    offset += line.length + 1;
  }

  const after = text.slice(searchFrom);
  const match = after.match(/```([^\n\r`]*)\r?\n?([\s\S]*?)```/);
  if (!match) return null;

  return {
    lang: match[1].trim(),
    code: match[2].trim(),
    index: searchFrom + match.index
  };
}

function extractMarkdownImages(markdown) {
  const images = [];
  const regex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;
  while ((match = regex.exec(String(markdown || '')))) {
    images.push({ alt: match[1], src: match[2], index: match.index });
  }
  return images;
}

function getAttr(tag, attr) {
  const regex = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, 'i');
  const match = tag.match(regex);
  return match ? match[1] : null;
}

function extractHtmlImages(markdown) {
  const images = [];
  const regex = /<img\b[^>]*>/gi;
  let match;
  while ((match = regex.exec(String(markdown || '')))) {
    const tag = match[0];
    const src = getAttr(tag, 'src');
    if (!src) continue;
    images.push({
      src,
      alt: getAttr(tag, 'alt') || '',
      width: getAttr(tag, 'width'),
      index: match.index
    });
  }
  return images;
}

function extractMarkdownLinks(markdown) {
  const links = [];
  const regex = /(?<!!)\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;
  while ((match = regex.exec(String(markdown || '')))) {
    links.push({ text: match[1], href: match[2], index: match.index });
  }
  return links;
}

function extractSubsection(markdown, headingLabels) {
  const lines = String(markdown || '').split(/\r?\n/);
  const labels = (headingLabels || []).map(label => String(label).toLowerCase());
  let start = -1;

  for (let i = 0; i < lines.length; i++) {
    const lower = lines[i].toLowerCase();
    if (lines[i].startsWith('####') && labels.some(label => lower.includes(label))) {
      start = i + 1;
      break;
    }
  }

  if (start === -1) return '';

  const collected = [];
  for (let i = start; i < lines.length; i++) {
    if (lines[i].startsWith('####')) break;
    collected.push(lines[i]);
  }

  return collected.join('\n').trim();
}

module.exports = {
  splitHeadingSections,
  extractFencedCodeAfterLabel,
  extractMarkdownImages,
  extractHtmlImages,
  extractMarkdownLinks,
  extractSubsection,
  lineForIndex
};
