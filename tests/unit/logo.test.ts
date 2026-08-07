import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Logo from '../../src/components/ds/Logo.astro';

const render = (props: Record<string, unknown> = {}) =>
  AstroContainer.create().then((c) => c.renderToString(Logo, { props }));

test('uses a mask so the mark takes the colour of its field', async () => {
  // filter: invert() only works on dark and breaks on amber or lime.
  const html = await render();
  expect(html).toContain('mask-image');
  expect(html).toContain('background-color:currentColor');
  expect(html).not.toContain('invert(');
});

test('defaults to the lockup at its correct ratio', async () => {
  const html = await render({ height: 24 });
  // 2189.357 / 482.347 = 4.5388… → 24 × ratio = 108.93
  expect(html).toMatch(/width:108\.9\d*px/);
  expect(html).toContain('height:24px');
});

test('sizes the mark on its own ratio', async () => {
  const html = await render({ variant: 'mark', height: 24 });
  // 741.242 / 482.347 = 1.5367… → 36.88
  expect(html).toMatch(/width:36\.8\d*px/);
});

test('sizes the wordmark on its own ratio', async () => {
  const html = await render({ variant: 'wordmark', height: 24 });
  // 1361.115 / 243.403 = 5.5924… → 134.22
  expect(html).toMatch(/width:134\.2\d*px/);
});

test('carries an accessible name', async () => {
  const html = await render();
  expect(html).toContain('role="img"');
  expect(html).toContain('aria-label="Manuva"');
});
