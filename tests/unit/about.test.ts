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
  expect(h).toMatch(/30-day free trial, full Pro access\. No credit card required\. Set up in a day\./);
});

// The old page's closing cta-section has two buttons, "Start free trial" and
// "Book a demo" (→ /#contact) — both live on CtaBand itself (Task 14,
// team-lead review: a first pass hardcoded CtaBand's second action to "Talk
// to us", a phrase that appears on none of the eight source pages, silently
// losing "Book a demo" here and on three other routes). Earlier this was
// relocated into the hero as a workaround since CtaBand couldn't hold it;
// that workaround is gone along with the bug that required it, so this
// checks the real closing band specifically, not just page-wide presence.
// Target moved from /#contact to /about#contact: the contact section left the
// home page (author's call) and was relocated to this page rather than deleted,
// because six links across the site plus the Organization schema pointed at it.
test('the closing CTA band carries both "Start free trial" and "Book a demo" -> /about#contact', () => {
  const h = html();
  // The band is .outro now rather than the old .site-cta. Its two actions and
  // their target are the old page's own: "Book a demo" points at
  // /about#contact, a self-link here, because that is the anchor six other
  // CTAs across the site use and this page owns it.
  const band = h.slice(h.indexOf('class="outro'));
  expect(band).toContain('Start free trial');
  expect(band).toContain('Book a demo');
  expect(band).toContain('href="/about#contact"');
});


// This page now owns the anchor those six links target.
test('the relocated contact section lives here', () => {
  const h = html();
  expect(h).toContain('id="contact"');
  expect(h).toContain('Get in touch');
  expect(h).toContain('We reply within one business day');
});

test('no two adjacent fields share a hue', () => {
  const fields = [...html().matchAll(/class="[^"]*mv-field-([a-z]+)/g)].map((m) => m[1]);
  expect(fields.length, 'page should declare its fields').toBeGreaterThan(2);
  for (let i = 1; i < fields.length; i++) {
    // The ink section declares the field twice — once on the section and once
    // on the .cut inside it, which is how a shape cut arrives.
    if (fields[i] === fields[i - 1] && fields[i] === 'ink') continue;
    expect(fields[i], `${fields[i]} repeats at position ${i}`).not.toBe(fields[i - 1]);
  }
});


// Was "mint hero -> paper -> ink principles -> flare CTA". The principles
// section is paper: navy came off the marketing site (author's call), and the
// six principle items are long-form body copy, which the loud-layer rules keep
// off any colour field — so it did not move to another hue, it dropped to
// paper. Same reasoning still holds for "what we build" (prose) and the
// company block (data).
//
// violet was added on the contact block. The page was running two fields —
// hero and closing CTA, both chrome — against the home page's six, which is
// what made the interior of the site read as a different product. The contact
// block is four short lines and a button: the one section here that can carry
// a field without breaking a loud-layer rule.
// ink was added on the principles in MVBOLD-14: the page's dark anchor band.
// It is also the one field the loud-layer rules tolerate behind body copy —
// all three reference layouts in _ds/ui_kits/marketing/ set prose on ink. The
// principles were on ink before the "navy is off the marketing site" call took
// them off; this puts them back.
test('hero is mint, principles are the ink anchor, contact is violet, CTA is flare', () => {
  // Read off the field classes, which is how the new build marks a field —
  // data-fold is not emitted any more, so this asserted nothing at all.
  // The contact block is a violet CARD on paper rather than a violet fold:
  // the closing field follows it directly and two fields may not touch. It
  // is still the violet in the sequence, which is what this test is for.
  const fields = [...html().matchAll(/class="[^"]*mv-field-([a-z]+)/g)].map((m) => m[1]);
  expect(fields[0]).toBe('mint');
  expect(fields[fields.length - 1]).toBe('flare');
  expect(fields).toEqual(['mint', 'ink', 'ink', 'violet', 'flare']);
});


// Rule: never set an absolute ink inside a <Field>, never opacity-mute text
// on a field — a field's section already carries color:var(--on-*) and
// children should inherit it.
test('no field section sets an absolute ink colour on itself', () => {
  // A field already carries color:var(--on-*) and children inherit it.
  // Setting an absolute ink inside one is how body copy shipped at 1.4:1 on a
  // colour field, which a token-name read cannot catch.
  const h = html();
  const sections = [...h.matchAll(/<section class="[^"]*mv-field-[a-z]+[^"]*"[^>]*>/g)].map((m) => m[0]);
  expect(sections.length).toBeGreaterThan(0);
  for (const tag of sections) {
    expect(tag, `${tag} sets its own colour`).not.toMatch(/style="[^"]*(^|;)\s*color:\s*(#|rgb|var\(--ink)/);
  }
});

