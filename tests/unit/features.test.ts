import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const html = () => readFileSync('dist/features.html', 'utf8');

test('keeps all ten source sections as h2s', () => {
  const h2s = [...html().matchAll(/<h2[^>]*>(.*?)<\/h2>/gs)].map((m) => m[1]);
  expect(h2s.length).toBeGreaterThanOrEqual(10);
});

test('every source section heading survives', () => {
  const h = html();
  for (const heading of [
    'Build, version, and run BOMs',
    'Every order, from sale to shipment',
    'Stock counts you can actually trust',
    'Trace every finished good back to the lot',
    'Purchase orders that close the loop',
    'Run the floor without a whiteboard',
    'Plan production around the people',
    'Know your margin before the job starts',
    'Operational intelligence',
    'Built around your Shopify store',
  ]) {
    expect(h, `missing: ${heading}`).toContain(heading);
  }
});

test('uses collapse utilities rather than fixed column counts', () => {
  const h = html();
  expect(h).toMatch(/mv-cols-[2346]/);
  expect(h).not.toMatch(/grid-template-columns:\s*repeat\(\d,\s*1fr\)/);
});

test('no two adjacent folds share a hue', () => {
  // See Task 7 — data-fold marks fold-level colour; the six-tile grid is exempt.
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  expect(folds.length, 'page should declare its folds').toBeGreaterThan(2);
  for (let i = 1; i < folds.length; i++) {
    expect(folds[i], `${folds[i]} repeats at fold ${i}`).not.toBe(folds[i - 1]);
  }
});
