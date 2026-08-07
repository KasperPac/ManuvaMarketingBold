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

test('the product section is the screenshot, not a mocked data table', () => {
  const h = html();
  expect(h).toContain('screen-dashboard.png');
  expect(h).not.toContain('mv-cell');
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
  // composed unit with paper between every tile, so its hues never "touch".
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  expect(folds.length, 'page should declare its folds').toBeGreaterThan(2);
  for (let i = 1; i < folds.length; i++) {
    expect(folds[i], `${folds[i]} repeats at fold ${i}`).not.toBe(folds[i - 1]);
  }
});
