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

test('every domain blurb is a literal substring of its declared source, not recombined vocabulary', () => {
  // Review round 3, I4: the original version of this test only checked that
  // each individual word of length > 5 appeared SOMEWHERE in the source —
  // a bag-of-words membership check. Any recombination of words already
  // present in llms.txt/features.html (an invented blurb built from
  // recycled vocabulary, e.g. "Multi-warehouse stocktake with bin/aisle
  // ledger tracking") would pass that version even though it was never
  // written by anyone at the source. The blurbs really are exact lifts —
  // that was established by a reviewer reading them, which belongs in the
  // suite, not just in a report. This version asserts the actual claim:
  // the whole blurb (normalised for case and whitespace only — no
  // word-level reconstruction) is a literal run of text from the source.
  const sources = {
    'llms.txt': oldSrc('llms.txt').toLowerCase().replace(/\s+/g, ' '),
    'features.html': oldSrc('features.html').toLowerCase().replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' '),
  };
  for (const d of DOMAINS) {
    // Strip a single trailing period (added to every llms.txt-sourced blurb
    // to read as a complete sentence; the source's own bullet fragments
    // don't end in one) — harmless for the one features.html blurb, whose
    // own sentence does end in a period in the source: a shorter substring
    // is still found wherever the longer one is.
    const normalized = d.blurb.toLowerCase().replace(/\s+/g, ' ').replace(/\.$/, '');
    expect(sources[d.source], `${d.name}: not a literal substring of ${d.source}`).toContain(normalized);
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

test('Production, Purchasing and Audit render with no image — no proxy screenshot standing in for a screen that was never captured', () => {
  // Review round 3, C1: Production joined this list. Its own poster had
  // been a crop of the dashboard's Orders queue (sales orders) — a real
  // screenshot, but not of production, the exact defect this rule exists
  // to catch. Corrected in domains.ts rather than excused as "close enough".
  const withoutPoster = DOMAINS.filter((d) => !d.poster).map((d) => d.slug);
  expect(withoutPoster).toEqual(['production', 'purchasing', 'audit']);
  const h = html();
  // Exactly one <figure class="site-video"> per domain that has a poster —
  // none for the three that don't.
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
  // Broadened to match video.test.ts's own guard (review round 3 minor):
  // (src|href) only checks two attribute names, so e.g. a stray
  // poster="https://img.youtube.com/..." would slip past this version
  // while still being a real pre-click YouTube reference. Any attribute
  // value containing "youtu" is the actual invariant.
  expect(html()).not.toMatch(/="[^"]*youtu[^"]*"/);
});

test('the head values are present and authored deliberately', () => {
  const h = html();
  expect(h).toMatch(/<title>[^<]+<\/title>/);
  expect(h).toContain('rel="canonical" href="https://manuva.app/product"');
  expect(h).toContain('twitter:description');
});
