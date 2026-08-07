import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const pages = [['privacy', 'dist/privacy.html'], ['terms', 'dist/terms.html']] as const;

test.each(pages)('%s uses no colour field behind long-form copy', (_n, path) => {
  const h = readFileSync(path, 'utf8');
  const body = h.slice(h.indexOf('<main'), h.indexOf('</main>'));
  expect(body).not.toMatch(/background:var\(--field-(cobalt|flare|amber|violet|mint|aqua|lime|ink)\)/);
});

test.each(pages)('%s constrains the measure for readability', (_n, path) => {
  expect(readFileSync(path, 'utf8')).toContain('site-doc');
});

test.each(pages)('%s names the operating entity and contact', (_n, path) => {
  const h = readFileSync(path, 'utf8');
  expect(h).toContain('Pac Technologies');
  expect(h).toContain('hello@manuva.app');
});

test('terms keeps its clause numbering intact', () => {
  const h = readFileSync('dist/terms.html', 'utf8');
  expect(h).toMatch(/\b15\b/);
});

// Base.astro gates the whole twitter:card/title/description triple on
// twitterDescription being supplied (Task 10 fix round 2) — both old pages
// carry a real Twitter card, per the team-lead's brief for this task.
test.each(pages)('%s ships a twitter card (twitterDescription was supplied)', (_n, path) => {
  const h = readFileSync(path, 'utf8');
  expect(h).toContain('name="twitter:card" content="summary_large_image"');
  expect(h).toContain('name="twitter:description"');
});

// Head values specified verbatim by the team lead for this task.
test('privacy head carries its real title and description', () => {
  const h = readFileSync('dist/privacy.html', 'utf8');
  expect(h).toContain('<title>Privacy Policy — Manuva</title>');
  expect(h).toContain(
    'How Manuva collects, uses, discloses, and protects personal information in accordance with the Australian Privacy Principles.',
  );
});

test('terms head carries its real title and description', () => {
  const h = readFileSync('dist/terms.html', 'utf8');
  expect(h).toContain('<title>Terms of Service — Manuva</title>');
  expect(h).toContain(
    'The agreement between Manuva (operated by Pac Technologies Pty Ltd) and customers who use the Manuva platform.',
  );
});

// Clause numbering end-to-end: every h2 "N. Heading" must appear once, in
// order 1..10 (privacy) / 1..19 (terms) — a shifted or dropped number here
// changes what a cross-reference elsewhere in the document points at.
test('privacy clause numbers run 1 to 10 with no gaps or repeats', () => {
  const h = readFileSync('dist/privacy.html', 'utf8');
  const nums = [...h.matchAll(/<h2[^>]*>(\d+)\./g)].map((m) => Number(m[1]));
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('terms clause numbers run 1 to 19 with no gaps or repeats', () => {
  const h = readFileSync('dist/terms.html', 'utf8');
  const nums = [...h.matchAll(/<h2[^>]*>(\d+)\./g)].map((m) => Number(m[1]));
  expect(nums).toEqual(Array.from({ length: 19 }, (_, i) => i + 1));
});

// Terms §15's carve-out list — the source repo's own spec notes this list
// was aligned deliberately; it must keep its exact 6-item count.
test('terms carve-out list under §15 keeps its exact 6 items', () => {
  const h = readFileSync('dist/terms.html', 'utf8');
  for (const item of [
    'breach of confidentiality (Section 12)',
    'the IP indemnity in Section 14',
    'gross negligence or wilful misconduct',
    'death or personal injury caused by negligence',
    'fraud or fraudulent misrepresentation',
    'any liability that cannot lawfully be limited under the Australian Consumer Law',
  ]) {
    expect(h, `missing carve-out: ${item}`).toContain(item);
  }
});

// TOC is real page content per team-lead ruling (an in-document nav aid, not
// site chrome) — the copy-parity gate strips every <nav> on both sides of
// the comparison, so it cannot see a TOC that silently drops an entry.
// Nothing else on the page checks this, same reasoning as Task 9's own
// anchor-integrity test (features.test.ts), which this follows.
test.each(pages)('%s every in-page anchor link resolves to a real id on the page', (_n, path) => {
  const h = readFileSync(path, 'utf8');
  const hrefs = [...h.matchAll(/href="#([a-zA-Z0-9-]+)"/g)].map((m) => m[1]);
  expect(hrefs.length, 'page should have in-page anchor links to check').toBeGreaterThan(0);
  const ids = new Set([...h.matchAll(/\sid="([a-zA-Z0-9-]+)"/g)].map((m) => m[1]));
  for (const href of hrefs) {
    expect(ids, `href="#${href}" has no matching id anywhere on the page`).toContain(href);
  }
});

// h.indexOf('</nav>') alone would find the SITE nav's own closing tag (Base's
// <Nav />, which appears earlier in the document than site-doc-toc) rather
// than this TOC's — the second argument anchors the search to start looking
// only after the TOC opens.
test('privacy TOC has exactly 10 entries, one per clause', () => {
  const h = readFileSync('dist/privacy.html', 'utf8');
  const tocStart = h.indexOf('site-doc-toc');
  const toc = h.slice(tocStart, h.indexOf('</nav>', tocStart));
  const tocLinks = [...toc.matchAll(/<li><a href="#/g)];
  const clauseNums = [...h.matchAll(/<h2[^>]*>(\d+)\./g)];
  expect(tocLinks.length).toBe(10);
  expect(tocLinks.length).toBe(clauseNums.length);
});

test('terms TOC has exactly 19 entries, one per clause', () => {
  const h = readFileSync('dist/terms.html', 'utf8');
  const tocStart = h.indexOf('site-doc-toc');
  const toc = h.slice(tocStart, h.indexOf('</nav>', tocStart));
  const tocLinks = [...toc.matchAll(/<li><a href="#/g)];
  const clauseNums = [...h.matchAll(/<h2[^>]*>(\d+)\./g)];
  expect(tocLinks.length).toBe(19);
  expect(tocLinks.length).toBe(clauseNums.length);
});
