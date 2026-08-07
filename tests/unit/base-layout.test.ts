import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Base from '../../src/layouts/Base.astro';

const render = () =>
  AstroContainer.create().then((c) =>
    c.renderToString(Base, {
      props: {
        title: 'Manuva — MRP for Shopify manufacturers',
        description: 'Inventory, BOMs, work orders and stock control.',
        canonical: 'https://manuva.app/',
      },
      slots: { default: '<p>body content</p>' },
    }),
  );

test('links every design-system token file in styles.css order', async () => {
  const html = await render();
  const links = [...html.matchAll(/_ds\/tokens\/([a-z-]+\.css)/g)].map((m) => m[1]);
  expect(links).toEqual([
    'fonts.css', 'colors.css', 'themes.css', 'typography.css', 'spacing.css',
    'shape.css', 'marketing.css', 'responsive.css', 'motion.css', 'base.css',
  ]);
});

test('never links the design system aggregate entry point', async () => {
  // styles.css @imports fonts.css, which is the file we must be able to swap.
  const html = await render();
  expect(html).not.toMatch(/_ds\/styles\.css/);
});

test('emits title, description and canonical', async () => {
  const html = await render();
  expect(html).toContain('<title>Manuva — MRP for Shopify manufacturers</title>');
  expect(html).toContain('name="description" content="Inventory, BOMs, work orders and stock control."');
  expect(html).toContain('rel="canonical" href="https://manuva.app/"');
});

test('canonical never carries a trailing slash except on root', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Base, {
    props: { title: 't', description: 'd', canonical: 'https://manuva.app/features' },
    slots: { default: '<p>x</p>' },
  });
  expect(html).toContain('href="https://manuva.app/features"');
  expect(html).not.toContain('href="https://manuva.app/features/"');
});

test('provides a skip link as the first focusable element', async () => {
  const html = await render();
  expect(html).toMatch(/<a[^>]+href="#main"[^>]*>\s*Skip to content\s*<\/a>/);
});
