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

test('a domain with a poster but no video renders a still and no play control', () => {
  // Post-review ruling: Purchasing and Audit have no matching screenshot
  // among the three that exist, so they render no poster and no <Video> at
  // all — not every domain lacking a youtubeId renders a still anymore,
  // only the ones that also carry a poster.
  const withPosterNoVideo = DOMAINS.filter((d) => d.poster && !d.youtubeId);
  expect(withPosterNoVideo.length).toBeGreaterThan(0);
  const h = html();
  const stills = (h.match(/data-mode="still"/g) || []).length;
  expect(stills).toBe(withPosterNoVideo.length);
});

test('Purchasing and Audit render with no image — no proxy screenshot standing in for a screen that was never captured', () => {
  const withoutPoster = DOMAINS.filter((d) => !d.poster).map((d) => d.slug);
  expect(withoutPoster).toEqual(['purchasing', 'audit']);
  const h = html();
  // Exactly one <figure class="site-video"> per domain that has a poster —
  // none for the two that don't.
  const videoFigures = (h.match(/class="site-video"/g) || []).length;
  expect(videoFigures).toBe(DOMAINS.filter((d) => d.poster).length);
});

test('no domain card shows a visible caption — its own heading already names it', () => {
  // Post-review ruling: title still feeds the play button's accessible
  // name (Video.astro's `caption={false}`), but nothing on this page
  // should render <figcaption class="site-video-caption">.
  expect(html()).not.toContain('site-video-caption');
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
