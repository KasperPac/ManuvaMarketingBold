import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Button from '../../src/components/ds/Button.astro';

const render = (props: Record<string, unknown> = {}, slot = 'Start free') =>
  AstroContainer.create().then((c) =>
    c.renderToString(Button, { props, slots: { default: slot } }),
  );

test('renders a button element by default', async () => {
  const html = await render();
  expect(html).toMatch(/^<button/);
  expect(html).toContain('Start free');
});

test('renders a real anchor when asked, so CTAs are links', async () => {
  const html = await render({ as: 'a', href: 'https://app.manuva.app' });
  expect(html).toMatch(/^<a/);
  expect(html).toContain('href="https://app.manuva.app"');
});

test('pill shape uses the pill radius token', async () => {
  const html = await render({ shape: 'pill' });
  expect(html).toContain('var(--radius-pill)');
});

test('default shape uses the large radius token', async () => {
  const html = await render();
  expect(html).toContain('var(--radius-lg)');
});

test('every size maps to a control height token', async () => {
  for (const [size, token] of Object.entries({
    sm: '--control-sm', md: '--control-md', lg: '--control-lg', xl: '--control-xl',
  })) {
    const html = await render({ size });
    expect(html, `${size} → ${token}`).toContain(`var(${token})`);
  }
});

test('exposes the variant for CSS hooks', async () => {
  const html = await render({ variant: 'ink' });
  expect(html).toContain('data-variant="ink"');
  expect(html).toContain('var(--bg-ink)');
});

test('hardcodes no colour value', async () => {
  const html = await render({ variant: 'primary' });
  expect(html).not.toMatch(/#[0-9a-fA-F]{3,6}/);
});

test('spreads unknown attributes onto the root', async () => {
  const html = await render({ as: 'a', href: '#', 'data-testid': 'cta' });
  expect(html).toContain('data-testid="cta"');
});

test('merges a caller-supplied style with its own computed style, rather than replacing it', async () => {
  const html = await render({ shape: 'pill', style: 'background:red' });
  expect(html, 'caller declaration').toContain('background:red');
  expect(html, 'own geometry').toContain('var(--radius-pill)');
  // Order matters, not just presence: the caller's declaration must land after
  // Button's own so it wins on conflicting properties (CSS: last one wins).
  // A `toContain`-only check can't tell a correct merge from a reversed one.
  expect(html.indexOf('var(--radius-pill)')).toBeLessThan(html.indexOf('background:red'));
});
