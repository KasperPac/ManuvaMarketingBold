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

test('panel merges a caller-supplied style with its own, rather than emitting a duplicate style attribute', async () => {
  const html = await render(Panel, { field: 'cobalt', style: 'padding:99px' });
  expect(html, 'caller declaration').toContain('padding:99px');
  expect(html, 'panel radius').toContain('var(--radius-panel)');
  // A duplicate `style="..."` attribute parses with the first occurrence winning
  // and the second silently dropped — that would discard the caller's style
  // entirely rather than merge it.
  expect(html.match(/style="/g)?.length, 'exactly one style attribute').toBe(1);
  // Order matters, not just presence: the caller's declaration must land after
  // Panel's own so it wins on conflicting properties.
  expect(html.indexOf('var(--radius-panel)')).toBeLessThan(html.indexOf('padding:99px'));
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
  // Order matters, not just presence: the field's declarations must land after
  // Button's own computed style so they win on conflicting properties.
  expect(html.indexOf('var(--radius-pill)')).toBeLessThan(html.indexOf('var(--field-lime)'));
});

// Task 9: a ghost pill's translucent styling used to live in a `.site-pill-ghost`
// CSS class, which can never win against Button's own inline style="..." — every
// shipped usage rendered as the plain "ink" variant instead of a ghost. The fix
// composes the ghost look into the SAME inline style string Button already writes
// (the same channel `field` uses above), so this guards the same class of bug
// Task 5's style-merge regression tests guard: presence isn't enough, the ghost
// declarations must come after (and therefore win over) Button's own.
test('a ghost pill composes its translucent styling into the inline style, not a dead CSS class', async () => {
  const html = await render(Pill, { href: 'https://app.manuva.app', ghost: true }, 'Book a demo');
  expect(html, 'inherits ink from the surrounding field').toContain('color:inherit');
  // Task 14: the fill mixes toward black, not currentColor — on a white-ink
  // field (cobalt, violet), mixing currentColor (white) into the background
  // lightens it, which measured below AA for the white text on top of it
  // (axe: 3.19-3.9:1 depending on field). The ring is unaffected: it's a
  // decorative outline, held to non-text 3:1 contrast, so tinting it from
  // currentColor is still correct and still adapts to whichever ink is in
  // scope.
  expect(html, 'translucent fill mixes toward black').toContain('color-mix(in srgb, black 14%, transparent)');
  expect(html, 'translucent ring derived from currentColor').toContain('color-mix(in srgb, currentColor 40%, transparent)');
  expect(html, 'button geometry').toContain('var(--radius-pill)');
  expect(html, 'no leftover class hook').not.toContain('site-pill-ghost');
  // Order matters, not just presence: the ghost declarations must land after
  // Button's own computed style (which unconditionally sets color/background
  // for the ink variant) so they win on conflicting properties.
  expect(html.indexOf('var(--radius-pill)')).toBeLessThan(html.indexOf('color:inherit'));
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

// Field.astro used to destructure only `field`/`class`, with no `...rest`
// spread — an `id` passed in (e.g. a section anchor target) was silently
// dropped, so any in-page `href="#that-id"` pointed at nothing. Panel.astro
// already spread `...rest` for the same reason; Field didn't (Task 9 review).
test('an id passed to Field reaches the DOM, so in-page anchors can target it', async () => {
  const html = await render(Field, { field: 'violet', id: 'lot-tracking' });
  expect(html).toContain('id="lot-tracking"');
});

test('Tile never declares a fold — a tile grid is one composed unit, exempt from the rule', async () => {
  const html = await render(Tile, { field: 'cobalt', title: 'Inventory' });
  expect(html).not.toContain('data-fold');
});
