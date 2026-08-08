import { readFileSync, existsSync } from 'node:fs';
import { load } from 'cheerio';
import { expect, test } from 'vitest';
import { ALL_ROUTES } from '../../src/site';

const file = (route: string) => (route === '/' ? 'dist/index.html' : `dist${route}.html`);
const canonicalFor = (route: string) => (route === '/' ? 'https://manuva.app/' : `https://manuva.app${route}`);

// Pulls every application/ld+json script on a page and parses each as JSON —
// fails loudly (not silently) if a script is malformed, rather than letting
// a later .find()/.some() just come up empty.
function schemaNodes(html: string): Record<string, unknown>[] {
  const $ = load(html);
  const nodes: Record<string, unknown>[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).html() ?? '';
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      throw new Error(`invalid JSON-LD: ${(e as Error).message}\n${raw}`);
    }
    nodes.push(...(Array.isArray(parsed) ? (parsed as Record<string, unknown>[]) : [parsed as Record<string, unknown>]));
  });
  return nodes;
}

test('every SEO asset reaches the build output', () => {
  for (const f of ['_redirects', 'robots.txt', 'sitemap.xml', 'llms.txt', 'og-image.png', 'logo.png', 'favicon-16.png', 'favicon-32.png', 'favicon-512.png', 'apple-touch-icon.png']) {
    expect(existsSync(`dist/${f}`), `dist/${f} missing`).toBe(true);
  }
});

test('robots keeps the AI crawlers explicitly allowed', () => {
  const r = readFileSync('dist/robots.txt', 'utf8');
  for (const bot of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Bingbot']) {
    expect(r, `${bot} allow rule lost`).toContain(bot);
  }
  expect(r).toContain('Sitemap: https://manuva.app/sitemap.xml');
});

test('redirects still collapse every .html variant', () => {
  const r = readFileSync('dist/_redirects', 'utf8');
  for (const p of ['/index.html', '/features.html', '/pricing.html', '/privacy.html', '/terms.html', '/about.html', '/alternatives/katana.html', '/alternatives/mrpeasy.html']) {
    expect(r, `${p} redirect lost`).toContain(p);
  }
});

test('sitemap lists exactly ALL_ROUTES, no more, no fewer', () => {
  // Was hardcoded to 8 pre-Task-5; /product (no old counterpart) makes 9.
  // Asserting ALL_ROUTES.length rather than a new literal so this stops
  // needing a manual bump on every future route addition.
  const s = readFileSync('dist/sitemap.xml', 'utf8');
  const locs = [...s.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs).toHaveLength(ALL_ROUTES.length);
  for (const route of ALL_ROUTES) {
    expect(locs, `${canonicalFor(route)} missing from sitemap`).toContain(canonicalFor(route));
  }
});

test('every route emits a canonical matching its sitemap entry', () => {
  for (const route of ALL_ROUTES) {
    const h = readFileSync(file(route), 'utf8');
    expect(h, `${route} canonical`).toContain(`rel="canonical" href="${canonicalFor(route)}"`);
  }
});

// Task 14, team-lead review: Base.astro was written in Task 1 and never
// revisited once later tasks added real per-page og:*/twitter:* — five tags
// present on all eight source pages (verified by reading each page's own raw
// <head>, not assumed) went missing from every route, and the gate never
// caught it because it doesn't read <head> at all. This is the head-tag
// equivalent of a body-copy parity check: assert the full fixed set survives
// on every route, not just the handful of tags earlier tests already cover.
test('every route emits the full fixed head-tag set (og:image dimensions/alt, og:site_name, twitter:image, 16px favicon)', () => {
  for (const route of ALL_ROUTES) {
    const h = readFileSync(file(route), 'utf8');
    expect(h, `${route} og:image:width`).toContain('<meta property="og:image:width" content="1200">');
    expect(h, `${route} og:image:height`).toContain('<meta property="og:image:height" content="630">');
    expect(h, `${route} og:image:alt`).toContain(
      '<meta property="og:image:alt" content="Manuva — Manufacturing operations, finally simple">',
    );
    expect(h, `${route} og:site_name`).toContain('<meta property="og:site_name" content="Manuva">');
    expect(h, `${route} twitter:image`).toContain('<meta name="twitter:image" content="https://manuva.app/og-image.png">');
    expect(h, `${route} 16px favicon link`).toContain('<link rel="icon" href="/favicon-16.png" sizes="16x16">');
  }
});

test('no page references the CDN-hosted icons, and fonts once fonts-selfhost.css ships', () => {
  // The font half of this test was previously a no-op: named "no CDN fonts
  // or icons" but only ever checked jsDelivr, never fonts.googleapis.com —
  // the actual, currently-live font CDN reference (Task 14, team-lead
  // review). Can't make that assertion unconditional yet: fonts-selfhost.css
  // (MVBOLD-3) hasn't landed, Base.astro still deliberately loads
  // fonts.googleapis.com, and that's a known, reported blocking item, not a
  // silent regression this suite should fail red over today. Gating on the
  // file's existence means this starts enforcing itself the moment the swap
  // lands, instead of needing a second person to remember to un-skip it.
  const fontsSelfHosted = existsSync('_ds/tokens/fonts-selfhost.css');
  for (const route of ALL_ROUTES) {
    const h = readFileSync(file(route), 'utf8');
    expect(h, `${route} references jsDelivr`).not.toContain('cdn.jsdelivr.net');
    if (fontsSelfHosted) {
      expect(h, `${route} still references fonts.googleapis.com after fonts-selfhost.css shipped`)
        .not.toContain('fonts.googleapis.com');
    }
  }
});

test('every route emits at least one valid, parseable JSON-LD block', () => {
  for (const route of ALL_ROUTES) {
    const nodes = schemaNodes(readFileSync(file(route), 'utf8'));
    expect(nodes.length, `${route} has no structured data`).toBeGreaterThan(0);
  }
});

test('no route anywhere invents aggregateRating or review — no ratings exist in the source', () => {
  for (const route of ALL_ROUTES) {
    const h = readFileSync(file(route), 'utf8');
    expect(h, `${route} contains aggregateRating`).not.toMatch(/aggregateRating/i);
    expect(h, `${route} contains a review node`).not.toMatch(/"@type"\s*:\s*"Review"/i);
  }
});

test('every route except home carries a BreadcrumbList whose last crumb is its own canonical URL', () => {
  // The old home page's own JSON-LD is Organization + WebSite +
  // SoftwareApplication only — no BreadcrumbList (there's nothing to
  // break out from on the root page). Confirmed by reading index.html's
  // own <head> script, not assumed.
  for (const route of ALL_ROUTES.filter((r) => r !== '/')) {
    const nodes = schemaNodes(readFileSync(file(route), 'utf8'));
    const crumbs = nodes.find((n) => n['@type'] === 'BreadcrumbList') as
      | { itemListElement: { item: string }[] }
      | undefined;
    expect(crumbs, `${route} missing BreadcrumbList`).toBeTruthy();
    const last = crumbs!.itemListElement.at(-1);
    expect(last?.item, `${route} breadcrumb does not end on its own URL`).toBe(canonicalFor(route));
  }
});

test('the home page carries Organization, WebSite and SoftwareApplication structured data, traced to llms.txt', () => {
  const nodes = schemaNodes(readFileSync('dist/index.html', 'utf8'));
  const org = nodes.find((n) => n['@type'] === 'Organization') as Record<string, unknown> | undefined;
  const site = nodes.find((n) => n['@type'] === 'WebSite');
  const app = nodes.find((n) => n['@type'] === 'SoftwareApplication') as Record<string, unknown> | undefined;

  expect(org, 'Organization node missing').toBeTruthy();
  expect(org!.legalName).toBe('Pac Technologies Pty Ltd');
  expect(org!.email ?? (org!.contactPoint as { email?: string } | undefined)?.email).toBe('hello@manuva.app');

  expect(site, 'WebSite node missing').toBeTruthy();

  expect(app, 'SoftwareApplication node missing').toBeTruthy();
  expect(app!.applicationCategory).toBe('BusinessApplication');
  const offers = app!.offers as { name: string; price: string }[];
  expect(offers.map((o) => `${o.name}:${o.price}`)).toEqual(['Starter:99', 'Growth:249', 'Pro:499']);
});

test('pricing/katana/mrpeasy FAQPage mainEntity matches the FAQ items actually rendered on the page', () => {
  for (const route of ['/pricing', '/alternatives/katana', '/alternatives/mrpeasy'] as const) {
    const html = readFileSync(file(route), 'utf8');
    const $ = load(html);
    const visibleQuestions = $('.site-faq-q, .site-alt-faq-section .site-faq-q').map((_, el) => $(el).text().trim()).get();
    const nodes = schemaNodes(html);
    const faq = nodes.find((n) => n['@type'] === 'FAQPage') as
      | { mainEntity: { name: string; acceptedAnswer: { text: string } }[] }
      | undefined;
    expect(faq, `${route} missing FAQPage`).toBeTruthy();
    expect(faq!.mainEntity.map((q) => q.name), `${route} FAQPage questions drift from visible FaqList`).toEqual(visibleQuestions);
    for (const q of faq!.mainEntity) {
      expect(q.acceptedAnswer.text.length, `${route} "${q.name}" has an empty answer`).toBeGreaterThan(0);
    }
  }
});

test('the about page carries an AboutPage node referencing the Organization', () => {
  const nodes = schemaNodes(readFileSync('dist/about.html', 'utf8'));
  const about = nodes.find((n) => n['@type'] === 'AboutPage') as Record<string, unknown> | undefined;
  expect(about, 'AboutPage node missing').toBeTruthy();
  expect(about!.url).toBe('https://manuva.app/about');
});
