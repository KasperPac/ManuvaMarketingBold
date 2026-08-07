import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Field from '../../src/components/site/Field.astro';
import Panel from '../../src/components/site/Panel.astro';
import Tile from '../../src/components/site/Tile.astro';
import Pill from '../../src/components/site/Pill.astro';
import Marquee from '../../src/components/site/Marquee.astro';
import { FIELDS } from '../../src/site';

const render = (C: any, props: Record<string, unknown> = {}, slot = 'content') =>
  AstroContainer.create().then((c) => c.renderToString(C, { props, slots: { default: slot } }));

test('every field pairs its background with its own ink', async () => {
  for (const field of FIELDS) {
    const html = await render(Field, { field });
    expect(html, `${field} background`).toContain(`var(--field-${field})`);
    expect(html, `${field} ink`).toContain(`var(--on-${field})`);
  }
});

test('panels pair background and ink too', async () => {
  const html = await render(Panel, { field: 'cobalt' });
  expect(html).toContain('var(--field-cobalt)');
  expect(html).toContain('var(--on-cobalt)');
});

test('panels use the panel radius token, tiles the tile radius token', async () => {
  expect(await render(Panel, { field: 'cobalt' })).toContain('var(--radius-panel)');
  expect(await render(Tile, { field: 'mint', title: 'Logistics' })).toContain('var(--radius-tile)');
});

test('primitives hardcode no colour, radius or spacing value', async () => {
  for (const [C, props] of [
    [Field, { field: 'ink' }],
    [Panel, { field: 'amber' }],
    [Tile, { field: 'aqua', title: 'Audit' }],
  ] as const) {
    const html = await render(C, props);
    expect(html).not.toMatch(/#[0-9a-fA-F]{3,6}/);
    expect(html).not.toMatch(/:\s*\d+px/);
  }
});

test('pill CTAs are real anchors at pill shape', async () => {
  const html = await render(Pill, { href: 'https://app.manuva.app' }, 'Start free');
  expect(html).toMatch(/^<a/);
  expect(html).toContain('var(--radius-pill)');
  expect(html).toContain('https://app.manuva.app');
});

test('a field-scoped pill keeps its field colours and the button pill radius together', async () => {
  const html = await render(Pill, { href: 'https://app.manuva.app', field: 'lime' }, 'Start free');
  expect(html, 'field background').toContain('var(--field-lime)');
  expect(html, 'field ink').toContain('var(--on-lime)');
  expect(html, 'button geometry').toContain('var(--radius-pill)');
});

test('marquee duplicates its words so the loop is seamless', async () => {
  const words = ['Yield % on every BOM line', '14-day free trial'];
  const html = await render(Marquee, { words });
  const hits = html.split('14-day free trial').length - 1;
  expect(hits).toBe(2);
});

test('marquee is decorative and hidden from screen readers on the duplicate', async () => {
  const html = await render(Marquee, { words: ['a phrase'] });
  expect(html).toContain('aria-hidden="true"');
});

test('marquee uses the design system track class so reduced motion stops it', async () => {
  const html = await render(Marquee, { words: ['a phrase'] });
  expect(html).toContain('mv-marquee-track');
});

test('Field declares its fold so hue adjacency can be checked', async () => {
  expect(await render(Field, { field: 'ink' })).toContain('data-fold="ink"');
});

test('Tile never declares a fold — a tile grid is one composed unit, exempt from the rule', async () => {
  const html = await render(Tile, { field: 'cobalt', title: 'Inventory' });
  expect(html).not.toContain('data-fold');
});
