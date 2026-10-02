import { readFileSync } from 'node:fs';
import { load } from 'cheerio';
import { expect, test } from 'vitest';
import { ALL_ROUTES, MORE_VERBS, TRADES } from '../../src/site';

// Rotating words (MVBOLD-36). Manufacturing is one of the trades Manuva
// serves, so the tagline's verb and the trade named in four places rotate on
// a timer (Motion.astro). The markup carries each list in data-rotate and is
// written with the list's first word: that is what search engines, screen
// readers, no-JS and motion-off visitors get.

const file = (route: string) => (route === '/' ? 'dist/index.html' : `dist${route}.html`);
const page = (route: string) => load(readFileSync(file(route), 'utf8'));
const text = (s: string) => s.replace(/\s+/g, ' ').trim();
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const ADJ = TRADES.map((t) => t.adj);
const NOUN = TRADES.map((t) => t.noun);

test('the home tagline\'s verb rotates making, selling, creating, crafting, and only on the calm room', () => {
  const $ = page('/');
  const r = $('.hero.dave h1 .hl [data-rotate]');
  expect(r.length).toBe(1);
  expect(r.attr('data-rotate')).toBe(MORE_VERBS.join('|'));
  expect(r.attr('data-rotate-when')).toBe('calm');
  expect(r.text()).toBe('making');
  expect(text($('.hero.dave h1').text())).toBe('Less chaos. More making.');
});

test('the home eyebrow names each trade', () => {
  const $ = page('/');
  const r = $('.hero.dave .eyebrow [data-rotate]');
  expect(r.attr('data-rotate')).toBe(NOUN.join('|'));
  expect(text($('.hero.dave .eyebrow').text())).toBe('MRP for Shopify manufacturers');
});

test('the /features headline rotates the trade inside its highlight', () => {
  const $ = page('/features');
  const r = $('.hero h1 .hl [data-rotate]');
  expect(r.attr('data-rotate')).toBe(ADJ.join('|'));
  expect(text($('.hero h1').text())).toBe('Everything you need to run manufacturing operations');
});

test('the /about headline rotates the trade on its own first line', () => {
  const $ = page('/about');
  const r = $('.hero h1 [data-rotate]');
  expect(r.attr('data-rotate')).toBe(ADJ.map(cap).join('|'));
  expect(r.hasClass('rot-line'), 'its own line, so a shorter trade cannot pull the next words up').toBe(true);
  expect(text($('.hero h1').text())).toBe('Manufacturing operations software, built for product brands that ship.');
});

for (const route of ALL_ROUTES) {
  test(`${route}: the footer tagline rotates the trade`, () => {
    const $ = page(route);
    const r = $('.site-foot .legal [data-rotate]');
    expect(r.attr('data-rotate')).toBe(ADJ.map(cap).join('|'));
    expect(text(r.parent().text())).toBe('Manufacturing operations, finally simple.');
  });
}

test('titles and descriptions keep the words the pages are written with', () => {
  // Search engines index the markup; only the screen rotates.
  const $ = page('/');
  expect($('title').text()).toBe('Manuva — Manufacturing operations, finally simple');
  expect($('meta[name="description"]').attr('content')).toContain('Shopify manufacturers');
});
