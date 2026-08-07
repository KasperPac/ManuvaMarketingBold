import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const html = () => readFileSync('dist/about.html', 'utf8');

test('names the operating company', () => {
  expect(html()).toContain('Pac Technologies Pty Ltd');
});

test('keeps all three source group headings', () => {
  const h = html();
  for (const heading of [
    'One system covering the whole shop floor',
    'The principles behind the product',
    'Who runs Manuva',
  ]) {
    expect(h, `missing: ${heading}`).toContain(heading);
  }
});

test('invents no team members or company facts', () => {
  const h = html();
  expect(h).not.toMatch(/lorem|placeholder|Jane Doe|John Smith|TBD|coming soon/i);
});

test('the head carries the old page\'s real title and description, not an invented one', () => {
  const h = html();
  expect(h).toContain('<title>About Manuva — Manufacturing Operations Software</title>');
  expect(h).toContain(
    'Manuva is manufacturing operations software for Shopify-first product brands, operated by Pac Technologies Pty Ltd in Sydney, Australia.',
  );
});

// Base.astro gates the whole twitter:card/title/description triple on
// twitterDescription being supplied — omitting it silently drops the card
// entirely (Task 10 fix round 2). The old page has a real Twitter card.
test('ships a twitter card (twitterDescription was supplied)', () => {
  const h = html();
  expect(h).toContain('name="twitter:card" content="summary_large_image"');
  expect(h).toContain('name="twitter:title" content="About Manuva — Manufacturing Operations Software"');
  expect(h).toContain('name="twitter:description"');
});

test('keeps all six operating principles', () => {
  const h = html();
  for (const title of [
    'Flat pricing, no per-seat tax',
    'Live, not batch',
    'Built around real workflows',
    'Days, not quarters',
    'Your data is yours',
    'Quarterly competitor checks',
  ]) {
    expect(h, `missing principle: ${title}`).toContain(title);
  }
});

test('states the real company facts: HQ, launch year, sectors, contact, app', () => {
  const h = html();
  expect(h).toContain('Sydney');
  expect(h).toContain('2026');
  expect(h).toContain('hello@manuva.app');
  expect(h).toContain('app.manuva.app');
  expect(h).toMatch(/Shopify.*WooCommerce.*Amazon.*Etsy/);
});

test('closing CTA carries the real trial terms', () => {
  const h = html();
  expect(h).toContain('See Manuva in action');
  expect(h).toMatch(/14-day free trial, full Pro access\. No credit card required\. Set up in a day\./);
});

// The old page's closing cta-section has two buttons, "Start free trial" and
// "Book a demo" (→ /#contact) — both live on CtaBand itself (Task 14,
// team-lead review: a first pass hardcoded CtaBand's second action to "Talk
// to us", a phrase that appears on none of the eight source pages, silently
// losing "Book a demo" here and on three other routes). Earlier this was
// relocated into the hero as a workaround since CtaBand couldn't hold it;
// that workaround is gone along with the bug that required it, so this
// checks the real closing band specifically, not just page-wide presence.
test('the closing CTA band carries both "Start free trial" and "Book a demo" → /#contact', () => {
  const h = html();
  const band = h.slice(h.indexOf('site-cta-heading'));
  expect(band).toContain('Start free trial');
  expect(band).toContain('Book a demo');
  expect(band).toContain('href="/#contact"');
});

test('no two adjacent folds share a hue', () => {
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  expect(folds.length, 'page should declare its folds').toBeGreaterThan(1);
  for (let i = 1; i < folds.length; i++) {
    expect(folds[i], `${folds[i]} repeats at fold ${i}`).not.toBe(folds[i - 1]);
  }
});

// Field sequence per the task brief: mint hero -> paper -> ink principles -> flare CTA.
test('hero is mint, principles are ink, closing CTA is flare', () => {
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  expect(folds[0]).toBe('mint');
  expect(folds).toContain('ink');
  expect(folds[folds.length - 1]).toBe('flare');
});

// Rule: never set an absolute ink inside a <Field>, never opacity-mute text
// on a field — a field's section already carries color:var(--on-*) and
// children should inherit it.
test('no data-fold section sets an absolute ink colour on itself', () => {
  const h = html();
  const sections = [...h.matchAll(/<[^>]+data-fold="[a-z]+"[^>]*>/g)].map((m) => m[0]);
  expect(sections.length).toBeGreaterThan(0);
  for (const tag of sections) {
    expect(tag).not.toMatch(/color:#[0-9a-fA-F]{3,6}/);
  }
});
