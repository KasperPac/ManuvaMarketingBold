import { readFileSync } from 'node:fs';
import { load } from 'cheerio';
import { expect, test } from 'vitest';

const pages = [['privacy', 'dist/privacy.html'], ['terms', 'dist/terms.html']] as const;

// Representative body-text sample, one distinctive sentence/fragment per
// clause, pulled from actual <p>/<li> prose (never a heading) — round 1's
// suite could lose every <p>, <li>, <table> and <div> of clause copy on both
// pages and still fail only one test (review demonstrated this by stripping
// the built pages and re-running). Scoped to <main> so the site-wide footer
// (which repeats "Pac Technologies Pty Ltd") can't satisfy these by proxy.
const PRIVACY_CLAUSE_BODY: readonly [string, string][] = [
  ['1', 'This Privacy Policy explains how Manuva collects, uses, discloses, stores, and protects personal information.'],
  ['2', 'Records of your activity and actions within the platform (activity logs)'],
  ['3', 'Your activity logs are not used for marketing or profiling.'],
  ['4', 'All service providers are contractually required to maintain confidentiality and security of your information.'],
  ['5', 'Activity logs are retained for 12 months and used for security audits, troubleshooting, and compliance verification.'],
  ['6', 'You can request correction of information that is inaccurate, incomplete, or out-of-date.'],
  ['7', 'passwords are hashed with bcrypt and random salts'],
  ['8', 'a new version of this policy will be published and become effective before launch'],
  ['9', 'If you believe Manuva has breached the Australian Privacy Principles, you have the right to lodge a complaint.'],
  ['10', 'Sensitive information'],
];

const TERMS_CLAUSE_BODY: readonly [string, string][] = [
  ['1', 'You accept these Terms when you sign up for, access, or pay for the Service.'],
  ['2', 'The Service evolves over time.'],
  ['3', 'We offer a 14-day free trial.'],
  ['4', 'GST is included for Australian customers and shown separately on invoices.'],
  ['5', 'The Customer retains all rights, title, and interest in Customer Data.'],
  ['6', 'This licence does not extend to Customer Data.'],
  ['7', 'Probe, scan, or test the vulnerability of the Service without prior written authorisation.'],
  ['8', 'Primary processing of Customer Data takes place in Australia.'],
  ['9', 'Manuva uses commercially reasonable efforts to make the Service available 24×7.'],
  ['10', 'Support covers questions about how to use the Service, defect reports, and operational issues.'],
  ['11', 'There is no mid-term refund — see Section 4.'],
  ['12', 'Confidentiality obligations survive termination indefinitely for trade secrets, and for three years for other Confidential Information.'],
  ['13', 'Beta and Preview features are excluded from all warranties, express or implied, to the maximum extent permitted by law.'],
  ['14', 'This indemnity is conditional on the Customer'],
  ['15', 'breach of confidentiality (Section 12);'],
  ['16', 'These Terms are governed by the laws of Victoria, Australia.'],
  ['17', 'Continued use of the Service after the effective date of a material change constitutes acceptance of the updated Terms.'],
  ['18', 'Nothing in these Terms creates a partnership, joint venture, agency, fiduciary, or employment relationship between the parties.'],
  ['19', 'the period during which the Customer has an active subscription to the Service'],
];

function mainOf(path: string): string {
  const h = readFileSync(path, 'utf8');
  return h.slice(h.indexOf('<main'), h.indexOf('</main>'));
}

test.each(pages)('%s uses no colour field behind long-form copy', (_n, path) => {
  const body = mainOf(path);
  expect(body).not.toMatch(/background:var\(--field-(cobalt|flare|amber|violet|mint|aqua|lime|ink)\)/);
});

// Not just "the string 'site-doc' appears somewhere" (round 1's version,
// satisfied by the class name alone regardless of what's inside it) — checks
// the wrapper is actually the immediate child of <main> and has real content
// nested inside, matching the readable-measure claim to a structural fact.
test.each(pages)('%s constrains the measure for readability', (_n, path) => {
  const body = mainOf(path);
  expect(body).toMatch(/<main[^>]*>\s*<article class="site-doc">/);
  expect(body.length).toBeGreaterThan(20000);
});

// Scoped to <main> — the site-wide footer (Footer.astro) repeats "Pac
// Technologies Pty Ltd" and CONTACT_EMAIL (hello@manuva.app) on every page,
// so an unscoped check here passes on any route regardless of what the
// legal body itself says. The body's own entity statement and its own
// contact routing (privacy@/support@/legal@, not hello@ — see the task
// report) are what this needs to guard.
test('privacy names the operating entity in its own body text, not just the footer', () => {
  const body = mainOf('dist/privacy.html');
  expect(body).toContain('Pac Technologies Pty Ltd (ABN 99 113 680 443; ACN 113 680 443)');
  expect(body).toContain('privacy@manuva.app');
});

test('terms names the operating entity in its own body text, not just the footer', () => {
  const body = mainOf('dist/terms.html');
  expect(body).toContain('Pac Technologies Pty Ltd (ABN 99 113 680 443; ACN 113 680 443)');
  expect(body).toContain('support@manuva.app');
  expect(body).toContain('legal@manuva.app');
});

test('privacy clause bodies survive intact — one representative fragment per clause', () => {
  const body = mainOf('dist/privacy.html');
  for (const [clause, text] of PRIVACY_CLAUSE_BODY) {
    expect(body, `clause ${clause} body text missing: "${text}"`).toContain(text);
  }
});

test('terms clause bodies survive intact — one representative fragment per clause', () => {
  const body = mainOf('dist/terms.html');
  for (const [clause, text] of TERMS_CLAUSE_BODY) {
    expect(body, `clause ${clause} body text missing: "${text}"`).toContain(text);
  }
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
// was aligned deliberately; it must keep its exact 6-item count. Round 1
// checked all six items were present but never asserted the list's length —
// a seventh item slipped in (e.g. a duplicate or an unrelated addition)
// would have passed. $('#liability > ul > li').length pins the count itself.
test('terms carve-out list under §15 keeps its exact 6 items', () => {
  const h = readFileSync('dist/terms.html', 'utf8');
  const $ = load(h);
  expect($('#liability > ul > li').length).toBe(6);
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
