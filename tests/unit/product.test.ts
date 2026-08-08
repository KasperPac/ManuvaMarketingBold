import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { expect, test } from 'vitest';
import { DOMAINS } from '../../src/content/domains';

const html = () => readFileSync('dist/product.html', 'utf8');
const oldSrc = (p: string) =>
  execFileSync('git', ['-C', 'C:/dev/ManuvaMarketing', 'show', `origin/master:${p}`],
    { encoding: 'utf8', maxBuffer: 32e6 });

test('all five domains render', () => {
  expect(DOMAINS).toHaveLength(5);
  const h = html();
  // Astro correctly HTML-escapes text content, so a raw "&" in a domain
  // name (Inventory & stock control / Purchasing & suppliers, both taken
  // verbatim from llms.txt's own headings) never appears literally in the
  // rendered output — it renders as "&amp;". A literal toContain(d.name)
  // can never pass for either, regardless of the page; the fix is in the
  // comparison, not the sourced name.
  for (const d of DOMAINS) {
    expect(h, `${d.name} missing`).toContain(d.name.replace(/&/g, '&amp;'));
  }
});

test('Logistics does not appear — it has no source', () => {
  // Zero occurrences in llms.txt, features.html and index.html. Present only in
  // the design system's invented DOMAINS array. Author's ruling: drop it.
  expect(html()).not.toMatch(/logistics/i);
  expect(DOMAINS.map((d) => d.slug)).not.toContain('logistics');
});

test('every domain blurb traces to its declared source', () => {
  const sources = {
    'llms.txt': oldSrc('llms.txt').toLowerCase(),
    'features.html': oldSrc('features.html').toLowerCase().replace(/<[^>]*>/g, ' '),
  };
  for (const d of DOMAINS) {
    // Every content word of length > 5 must appear somewhere in the declared source.
    const words = d.blurb.toLowerCase().match(/[a-z]{6,}/g) || [];
    const missing = words.filter((w) => !sources[d.source].includes(w));
    expect(missing, `${d.name}: ${missing.join(', ')} not in ${d.source}`).toEqual([]);
  }
});

test('none of the design system\'s invented blurbs return', () => {
  const h = html();
  for (const invented of [
    'counted once, true everywhere',
    'you can actually reuse',
    'on one board',
    'that mean something',
    'from a single screen',
    'kept forever',
  ]) {
    expect(h, `invented: ${invented}`).not.toContain(invented);
  }
});

test('all three product screenshots appear', () => {
  const h = html();
  for (const s of ['screen-dashboard.png', 'screen-variant.png', 'screen-components.png']) {
    expect(h, s).toContain(s);
  }
});

test('a domain without a video renders a still and no play control', () => {
  const withoutVideo = DOMAINS.filter((d) => !d.youtubeId);
  expect(withoutVideo.length).toBeGreaterThan(0);
  const h = html();
  const stills = (h.match(/data-mode="still"/g) || []).length;
  expect(stills).toBe(withoutVideo.length);
});

test('no page markup references youtube before a click', () => {
  expect(html()).not.toMatch(/(src|href)="[^"]*youtu/);
});

test('the head values are present and authored deliberately', () => {
  const h = html();
  expect(h).toMatch(/<title>[^<]+<\/title>/);
  expect(h).toContain('rel="canonical" href="https://manuva.app/product"');
  expect(h).toContain('twitter:description');
});
