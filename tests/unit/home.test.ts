import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const html = () => readFileSync('dist/index.html', 'utf8');

test('states the trial correctly', () => {
  const h = html();
  expect(h).toMatch(/30[\s-]day/i);
  expect(h).not.toMatch(/14[\s-]day free trial/i);
  expect(h).not.toMatch(/free forever/i);
});

test('carries the beta-tester strip', () => {
  expect(html()).toMatch(/a free month of Pro/i);
});

test('ships none of the invented reference figures', () => {
  const h = html();
  for (const invented of ['1,240', '830 factories', '$339,410']) {
    expect(h, `${invented} was invented in the reference layout`).not.toContain(invented);
  }
});

// Superseded by Task 3: this test used to assert the dashboard screenshot's
// presence in the page's second beat. That screenshot moved to /product —
// the section it lived in is now the explainer video band (see the
// ink-band tests below) — so asserting its presence here would directly
// contradict 'the dashboard screenshot has left the home page for /product'.
// The `mv-cell` invariant (never a mocked data table standing in for a real
// screenshot) still holds project-wide, so it's kept rather than dropped.
test('the home page never falls back to a mocked data table', () => {
  expect(html()).not.toContain('mv-cell');
});

test('CTAs point at the app', () => {
  expect(html()).toContain('https://app.manuva.app');
});

test('lime is never used as a text colour', () => {
  const h = html();
  expect(h).not.toMatch(/color:\s*var\(--field-lime\)/);
  expect(h).not.toMatch(/color:\s*#C8FF2E/i);
});

test('the page rotates fields rather than repeating one', () => {
  // Was 'no two adjacent folds share a hue', reading data-fold — which the
  // new build does not emit, so it asserted nothing. Adjacency itself is now
  // field-separation.test.ts's job, and it asserts separation rather than
  // mere difference. What is left for this file is the rotation: a page that
  // reaches for the same field over and over has stopped rotating.
  const fields = [...html().matchAll(/class="[^"]*mv-field-([a-z]+)/g)].map((m) => m[1]);
  expect(fields.length, 'page should declare its fields').toBeGreaterThan(4);
  expect(new Set(fields).size, 'too few distinct fields to read as a rotation').toBeGreaterThan(3);
});


test('the hero leads with the design system punchline', () => {
  const h = html();
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  expect(h1).toContain('Make it.');
  expect(h1).toContain('Track it.');
  expect(h1).toContain('Ship it.');
});

test('the keyword line survives as the lede, not the h1', () => {
  const h = html();
  expect(h).toContain('Manufacturing operations,');
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  expect(h1).not.toContain('Manufacturing operations');
});

test('title and description are still byte-identical to the old page', () => {
  const h = html();
  expect(h).toContain('<title>Manuva — Manufacturing operations, finally simple</title>');
  expect(h).toContain(
    'Inventory, BOMs, work orders, and stock control — connected, live, and built for the floor. The simpler alternative to legacy MRP for Shopify manufacturers.',
  );
});

test('lime highlights the middle clause as a background, never as text colour', () => {
  const h = html();
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  // The highlight is the .hl class now instead of an inline background. The
  // rule is the same one: lime carries the clause as a background, and never
  // as the text colour.
  expect(h1).toMatch(/<span class="hl[^"]*">/);
  expect(h1).not.toMatch(/color:\s*var\(--field-lime\)/);
  const css = readFileSync('src/styles/site.css', 'utf8');
  const hl = css.match(/^\.hl\{([^}]*)\}/m);
  expect(hl, '.hl rule not found').toBeTruthy();
  expect(hl![1]).toMatch(/background:\s*var\(--field-lime\)/);
  expect(hl![1]).not.toMatch(/(^|;)\s*color:\s*var\(--field-lime\)/);
});

test('the marquee is still the lime rule under the hero', () => {
  // Was: it declares data-fold so adjacency checks can see it. The new build
  // marks fields by class, and field-separation.test.ts exempts the marquee
  // by name — it is the design's own lime rule directly under the cobalt
  // hero. So what is worth asserting here is that it is still there.
  const h = html();
  expect(h).toMatch(/<div class="marquee"/);
  const css = readFileSync('src/styles/site.css', 'utf8');
  expect(css).toMatch(/^\.marquee\{[^}]*background:var\(--field-lime\)/m);
});


test('lime never touches mint again', () => {
  const fields = [...html().matchAll(/class="[^"]*mv-field-([a-z]+)/g)].map((m) => m[1]);
  expect(fields.length, 'page should declare its fields').toBeGreaterThan(4);
  for (let i = 1; i < fields.length; i++) {
    const pair = [fields[i - 1], fields[i]].sort().join('+');
    expect(pair, `greens touching at position ${i}`).not.toBe('lime+mint');
  }
});


// The band was ink until navy came off the marketing site. What the test is
// actually protecting is the position — hero, then marquee, then the explainer
// as the page's second beat — so that survives the hue change; the hue itself
// is now guarded by the no-navy test in field-separation.test.ts, which covers
// every route rather than this one line.
test('the explainer sits third, directly after hero and marquee', () => {
  const h = html();
  const hero = h.indexOf('class="hero tall mv-field-cobalt"');
  const marquee = h.indexOf('<div class="marquee"');
  const explainer = h.indexOf('See it in 32 seconds');
  const stage = h.indexOf('<section class="stage"');
  expect(hero).toBeGreaterThan(-1);
  expect(marquee).toBeGreaterThan(hero);
  expect(explainer).toBeGreaterThan(marquee);
  expect(stage).toBeGreaterThan(explainer);
});


// Was "self-hosted and preloads nothing". The explainer moved to YouTube, so
// the property being protected changed shape: there is no longer a file to
// avoid preloading, and what matters instead is that the facade ships as static
// markup and reaches no third party until someone clicks. The load-time half of
// that is asserted per route in tests/e2e/routes.spec.ts, which watches real
// requests; this covers the markup.
test('the explainer is a click-to-load facade, not an embedded player', () => {
  const h = html();
  expect(h).toContain('data-youtube-id="Vr4rkatHggA"');
  expect(h, 'an iframe in the static markup would load YouTube on page load').not.toContain('<iframe');
  expect(h, 'the self-hosted asset is gone').not.toContain('/video/explainer.mp4');
  expect(h, 'the poster still has to render before any click').toContain('/video/explainer-poster.jpg');
});

test('the dashboard screenshot has left the home page for /product', () => {
  expect(html()).not.toContain('screen-dashboard.png');
});

// Was "the other two product shots stay where they are" — they no longer do.
// The amber/violet showcase split that carried them was replaced by the
// highlighted-feature panel (author's call), so all three product shots now
// live on /product and none is on the home page. Asserting absence rather than
// deleting the test: the shots leaving home was a deliberate decision, and a
// silent reappearance here would mean someone restored the old split.
test('no product screenshot remains on the home page', () => {
  const h = html();
  for (const shot of ['screen-dashboard.png', 'screen-variant.png', 'screen-components.png']) {
    expect(h, `${shot} is back on the home page`).not.toContain(shot);
  }
});

// The highlight that replaced the split must actually be there, or the test
// above is satisfied by simply having removed the section and put nothing back.
test('the highlighted latest feature replaced the showcase split', () => {
  const h = html();
  // Was the lot-tracking panel until 2026-09-22; lot tracking is not built,
  // so the highlight names the reports suite instead.
  expect(h).toContain('Operational intelligence, not last week&#39;s spreadsheet.');
  // #reports was one of the nine areas; reporting is the domain that
  // absorbed it.
  expect(h).toContain('/features#reporting');
});
