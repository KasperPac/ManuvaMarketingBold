import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const html = () => readFileSync('dist/index.html', 'utf8');

test('states the trial correctly', () => {
  const h = html();
  expect(h).toMatch(/14[\s-]day/i);
  expect(h).not.toMatch(/30[\s-]day free trial/i);
  expect(h).not.toMatch(/free forever/i);
});

test('carries the beta-tester strip', () => {
  expect(html()).toMatch(/3 months of Pro/i);
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

test('the explainer band sits on ink directly after the hero', () => {
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  expect(folds.slice(0, 3)).toEqual(['cobalt', 'lime', 'ink']);
});

test('the explainer is self-hosted and preloads nothing', () => {
  const h = html();
  expect(h).toContain('/video/explainer.mp4');
  expect(h).toContain('preload="none"');
});

test('the dashboard screenshot has left the home page for /product', () => {
  expect(html()).not.toContain('screen-dashboard.png');
});

test('the other two product shots stay where they are', () => {
  const h = html();
  expect(h).toContain('screen-variant.png');
  expect(h).toContain('screen-components.png');
});
