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

test('trial is 30 days with full Pro access and no card', () => {
  const h = html();
  expect(h).toMatch(/30[\s-]day/i);
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
    'Simple pricing for manufacturing teams. One price per tier, no per-seat fees, no usage meters. Start free for 30 days.',
  );
});

test('the feature matrix has all 41 data rows across its 9 categories, with specific verdicts intact', () => {
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
  // 1 header row ("Feature" + 4 tier names) + 41 data rows + 9 category-divider
  // rows (colspan label, 0 verdicts each) = 51. Was 43 data rows until
  // 2026-09-22, when API access and Multiple Shopify stores came out —
  // neither is built. Bin / aisle locations stays: bin_aisle, bin_bay and
  // bin_sub_location ship, gated by the binManagement plan flag. Only
  // per-bin stock *balances* are missing, which the row never claimed.
  expect(rows.length, 'total extracted table rows').toBe(51);

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

// The billing toggle shipped as decoration and nobody noticed until the author
// clicked it: two <span>s inside an aria-hidden wrapper, with no script on the
// page at all. It looked interactive, invited a click, did nothing, and screen
// readers skipped it entirely. These assert the markup half of the fix; the
// behaviour half is driven for real in tests/e2e/pricing.spec.ts, because a
// static-HTML test cannot tell an inert control from a working one — which is
// exactly how this got through the first time.
test('the billing toggle is a real control, not a picture of one', () => {
  const h = html();
  const region = h.slice(h.indexOf('class="toggle"'), h.indexOf('class="toggle"') + 900);
  expect(region, 'toggle is still spans').toContain('<button');
  expect(region, 'toggle is still hidden from assistive tech').not.toContain('aria-hidden');
  expect(region).toContain('data-billing="annual"');
  expect(region).toContain('data-billing="monthly"');
  expect(region).toContain('aria-pressed');
});

test('both billing figures ship in the markup so the toggle needs no fetch', () => {
  const h = html();
  for (const [annual, monthly] of [['$99', '$119'], ['$249', '$299'], ['$499', '$599']]) {
    expect(h, `missing annual ${annual}`).toContain(`data-annual="${annual}"`);
    expect(h, `missing monthly ${monthly}`).toContain(`data-monthly="${monthly}"`);
  }
});

// Annual is what the old page's default toggle state rendered, and the parity
// gate compares against that. If the server ever rendered monthly first, the
// gate would fail on figures that are correct but in the wrong default.
test('the server renders the annual figures, not the monthly ones', () => {
  const h = html();
  const shown = [...h.matchAll(/<span class="num(?: word)?" data-annual="[^"]*" data-monthly="[^"]*">([^<]+)</g)].map((m) => m[1]);
  expect(shown).toEqual(['$99', '$249', '$499', 'Custom']);
});
