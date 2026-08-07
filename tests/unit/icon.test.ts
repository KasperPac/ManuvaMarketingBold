import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Icon from '../../src/components/ds/Icon.astro';

const render = (props: Record<string, unknown>) =>
  AstroContainer.create().then((c) => c.renderToString(Icon, { props }));

test('inlines the glyph as an svg, not a network reference', async () => {
  const html = await render({ name: 'package' });
  expect(html).toContain('<svg');
  expect(html).not.toContain('cdn.jsdelivr.net');
  expect(html).not.toContain('mask-image');
  expect(html).not.toContain('<img');
});

test('inherits currentColor so it takes the colour of its field', async () => {
  const html = await render({ name: 'package' });
  expect(html).toContain('currentColor');
});

test('applies the requested size to both dimensions', async () => {
  const html = await render({ name: 'factory', size: 30 });
  expect(html).toMatch(/width="30"/);
  expect(html).toMatch(/height="30"/);
});

test('is hidden from assistive technology', async () => {
  const html = await render({ name: 'truck' });
  expect(html).toContain('aria-hidden="true"');
});

test('carries the glyph name as data-icon, matching the design system original', async () => {
  // The design system's own Icon.jsx stamps data-icon={name} on its span. This port swapped
  // the CSS-mask span for an inlined SVG but dropped that attribute in the process, which made
  // the icon's identity invisible to anything inspecting the markup (e.g. the copy-parity gate,
  // which tokenises data-icon/data-lucide elements so a table-cell checkmark is comparable text
  // instead of vanishing as an empty element).
  const html = await render({ name: 'check' });
  expect(html).toContain('data-icon="check"');
});

test('renders each fixed domain glyph', async () => {
  const domains = ['package', 'layers', 'factory', 'shopping-cart', 'receipt', 'truck', 'history', 'settings-2'];
  for (const name of domains) {
    const html = await render({ name });
    expect(html, `${name} should render`).toContain('<svg');
  }
});

test('fails loudly on an unknown glyph rather than rendering nothing', async () => {
  await expect(render({ name: 'not-a-real-glyph' })).rejects.toThrow(/not-a-real-glyph/);
});
