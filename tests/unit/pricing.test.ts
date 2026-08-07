import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

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

test('the feature matrix carries all 43 rows across its 9 category groups', () => {
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
});
