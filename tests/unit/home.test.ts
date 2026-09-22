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

test('no two adjacent folds share a hue', () => {
  // data-fold marks fold-level colour only. Tiles are exempt: a tile grid is one
  // composed unit with paper between every tile, so its hues never "touch". Threshold
  // covers the marquee's own data-fold too (cobalt, lime, aqua, amber, violet, ink,
  // flare = 7) — this and the old "marquee included" variant were the same assertion
  // with two different length floors, collapsed into one (team-lead review, round 2).
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  expect(folds.length, 'page should declare its folds').toBeGreaterThan(4);
  for (let i = 1; i < folds.length; i++) {
    expect(folds[i], `${folds[i]} repeats at fold ${i}`).not.toBe(folds[i - 1]);
  }
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
  expect(h1).toContain('var(--field-lime)');
  expect(h1).not.toMatch(/color:\s*var\(--field-lime\)/);
});

test('the marquee declares its fold so adjacency checks can see it', () => {
  expect(html()).toMatch(/data-fold="lime"/);
});

test('lime never touches mint again', () => {
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  for (let i = 1; i < folds.length; i++) {
    const pair = [folds[i - 1], folds[i]].sort().join('+');
    expect(pair, `greens touching at fold ${i}`).not.toBe('lime+mint');
  }
});

// The band was ink until navy came off the marketing site. What the test is
// actually protecting is the position — hero, then marquee, then the explainer
// as the page's second beat — so that survives the hue change; the hue itself
// is now guarded by the no-navy test in field-separation.test.ts, which covers
// every route rather than this one line.
test('the explainer band is the third fold, directly after hero and marquee', () => {
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  expect(folds.slice(0, 2)).toEqual(['cobalt', 'lime']);
  expect(folds[2]).toBe('violet');
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
  expect(h).toContain('/features#reports');
});
