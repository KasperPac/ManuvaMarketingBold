import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';
import { extractTables } from '../../scripts/parity/extract.js';

const html = () => readFileSync('dist/pricing.html', 'utf8');

test('every plan price is exactly right', () => {
  const h = html();
  for (const price of ['$99', '$1,188', '$119', '$249', '$2,988', '$299', '$499', '$5,988', '$599']) {
    expect(h, `${price} missing`).toContain(price);
  }
});

test('states flat per-account pricing, the core differentiator', () => {
  expect(html()).toMatch(/flat/i);
  expect(html()).not.toMatch(/per seat pricing|priced per user/i);
});

test('trial is 14 days with full Pro access and no card', () => {
  const h = html();
  expect(h).toMatch(/14[\s-]day/i);
  expect(h).toMatch(/no credit card/i);
});

test('ships both the matrix and its below-720 card fallback', () => {
  const h = html();
  expect(h).toContain('mv-matrix');
  expect(h).toContain('mv-matrix-cards');
});

test('no colour field sits behind the matrix', () => {
  const h = html();
  const matrixStart = h.indexOf('mv-matrix');
  const section = h.slice(Math.max(0, matrixStart - 2000), matrixStart);
  expect(section).not.toMatch(/background:var\(--field-(cobalt|flare|amber|violet|mint|aqua|lime)\)/);
});

test('FAQ answers are real content, not stubs', () => {
  const h = html();
  expect(h).not.toMatch(/lorem|TBD|placeholder/i);
  expect(h).toMatch(/A location is any physical place/i);
});

test('the head carries the old page\'s real title and description, not an invented one', () => {
  const h = html();
  expect(h).toContain('<title>Pricing — Manuva</title>');
  expect(h).toContain(
    'Simple pricing for manufacturing teams. One price per tier, no per-seat fees, no usage meters. Start free for 14 days.',
  );
});

test('the feature matrix has all 43 data rows across its 9 categories, with specific verdicts intact', () => {
  const h = html();
  for (const category of [
    'Plan Limits',
    'Shopify Integration',
    'Inventory Management',
    'BOM &amp; Manufacturing',
    'Purchasing',
    'Costing &amp; Finance',
    'Reports',
    'Capacity &amp; Staffing',
    'Platform &amp; Support',
  ]) {
    expect(h, `${category} missing`).toContain(category);
  }

  // Category labels alone would pass against a matrix missing half its rows —
  // this counts the actual extracted rows and checks specific verdicts, using
  // the same extractTables() the parity gate's table tier runs on.
  const rows = extractTables(h);
  // 1 header row ("Feature" + 4 tier names) + 43 data rows + 9 category-divider
  // rows (colspan label, 0 verdicts each) = 53.
  expect(rows.length, 'total extracted table rows').toBe(53);

  const byName = new Map(rows.map((r) => [r.name.toLowerCase(), r.verdicts]));
  // Starter is the only tier without BOM versioning — a row a bare label check
  // would never catch if it silently dropped or flipped to a check for all four.
  expect(byName.get('bom versioning + draft/publish')).toEqual([
    '[none]', '[icon:check]', '[icon:check]', '[icon:check]',
  ]);
  // Enterprise is the only tier with a dedicated account manager.
  expect(byName.get('dedicated account manager')).toEqual([
    '[none]', '[none]', '[none]', '[icon:check]',
  ]);
});
