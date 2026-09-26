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

test('lays out on a named grid component, not hand-rolled column counts', () => {
  // Was .nlist two/three, which the features moved off when each one became a
  // card. The half that matters is unchanged: the column counts live on a
  // named component in the stylesheet, declared at the site's own
  // breakpoints, and no page writes repeat(N, 1fr) into its own markup and
  // re-invents the responsive contract.
  const h = html();
  expect(h, 'the features grid is a named component').toMatch(/class="(fcards|nlist[^"]*(two|three))"/);
  expect(h, 'no inline column count in the markup')
    .not.toMatch(/style="[^"]*grid-template-columns:\s*repeat\(/);

  // And it declares a two- and a three-column form, each inside one of the
  // site's two documented breakpoints rather than at a width of its own.
  const css = readFileSync('src/styles/site.css', 'utf8');
  const rules = [...css.matchAll(/@media\(min-width:(\d+)px\)\{([\s\S]*?\.fcards\{[^}]*\})/g)]
    .map((m) => ({ at: Number(m[1]), body: m[2].slice(m[2].lastIndexOf('.fcards{')) }));
  const steps = rules.filter((r) => r.body.includes('grid-template-columns'));
  expect(steps.map((r) => r.at).sort((a, b) => a - b), 'column steps')
    .toEqual([721, 1100]);
  expect(steps.find((r) => r.at === 721)!.body).toContain('repeat(2');
  expect(steps.find((r) => r.at === 1100)!.body).toContain('repeat(3');
});




test('every domain arrives on its own field, in the rotation order', () => {
  // Was 'no two adjacent folds share a hue', reading data-fold, which this
  // build does not emit — so it asserted nothing at all. Adjacency belongs to
  // field-separation.test.ts now (and it caught a real lime-on-aqua seam at
  // the foot of this page the moment it could see the new markers). What is
  // this file's own is that all six domains are there and none repeats a
  // field.
  const fields = [...html().matchAll(/<section class="dom mv-field-([a-z]+)"/g)].map((m) => m[1]);
  expect(fields.length, 'the six domain sections should each declare a field').toBe(6);
  expect(new Set(fields).size, 'two domains share a field').toBe(6);
});


// Field.astro used to drop any `id` prop (no `...rest` spread), so the two
// sections wrapped in <Field> never got their anchor id — the domain grid's
// #costing tile pointed at nothing.
// Nothing else checked this (not the gate, which strips <nav> chrome; not
// the other tests, which check heading text, not ids), so it shipped past
// review once already (Task 9 code review, fix round 1).
test('every in-page anchor link resolves to a real id on the page', () => {
  const h = html();
  const hrefs = [...h.matchAll(/href="#([a-zA-Z0-9-]+)"/g)].map((m) => m[1]);
  expect(hrefs.length, 'page should have in-page anchor links to check').toBeGreaterThan(0);
  const ids = new Set([...h.matchAll(/\sid="([a-zA-Z0-9-]+)"/g)].map((m) => m[1]));
  for (const href of hrefs) {
    expect(ids, `href="#${href}" has no matching id anywhere on the page`).toContain(href);
  }
});

test('the six domain links target the six real section ids', () => {
  // Nine areas became six domains (MVBOLD-17). The legacy anchors are kept as
  // a redirect map in site.ts so the old /features#boms links still land.
  const h = html();
  for (const id of ['inventory', 'purchasing', 'production', 'sales', 'planning', 'reporting']) {
    expect(h, `id="${id}" missing`).toContain(`id="${id}"`);
    expect(h, `href="#${id}" missing`).toContain(`href="#${id}"`);
  }
});

