import { load } from 'cheerio';

export function normalise(text) {
  return text
    .replace(/ /g, ' ')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractText(html) {
  const $ = load(html);
  $('script, style, noscript, header, nav, footer, svg').remove();
  const root = $('main').length ? $('main') : $('body');
  return normalise(root.text());
}

export function toPhrases(text) {
  return text
    .split(/(?<=[.!?:])\s+|\s*[|•]\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 25);
}
