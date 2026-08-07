import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Nav from '../../src/components/site/Nav.astro';
import Footer from '../../src/components/site/Footer.astro';
import { ALL_ROUTES } from '../../src/site';

const renderNav = () => AstroContainer.create().then((c) => c.renderToString(Nav));
const renderFooter = () => AstroContainer.create().then((c) => c.renderToString(Footer));

const hrefsIn = (html: string) =>
  [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

test('every nav link points at a route that exists', async () => {
  const internal = hrefsIn(await renderNav()).filter((h) => h.startsWith('/') && h !== '#main');
  expect(internal.length, 'nav rendered no internal links to check').toBeGreaterThan(0);
  for (const href of internal) {
    expect(ALL_ROUTES, `${href} is not a real route`).toContain(href);
  }
});

test('every footer link points at a route that exists', async () => {
  const internal = hrefsIn(await renderFooter()).filter((h) => h.startsWith('/'));
  expect(internal.length, 'footer rendered no internal links to check').toBeGreaterThan(0);
  for (const href of internal) {
    expect(ALL_ROUTES, `${href} is not a real route`).toContain(href);
  }
});

test('footer never links the six routes the reference layouts invented', async () => {
  const html = (await renderFooter()) + (await renderNav());
  for (const dead of ['Docs', 'Careers', 'Changelog', 'Status', 'Support', 'Customers']) {
    expect(html, `${dead} is not a page that exists`).not.toContain(`>${dead}<`);
  }
});

test('CTAs point at the app, not a placeholder', async () => {
  const html = await renderNav();
  expect(html).toContain('https://app.manuva.app');
  expect(html).not.toContain('href="#"');
});

test('nav exposes the responsive hooks the design system defines', async () => {
  const html = await renderNav();
  expect(html).toContain('mv-nav-links');
  expect(html).toContain('mv-nav-burger');
});

test('burger controls the drawer and reports its state', async () => {
  const html = await renderNav();
  expect(html).toMatch(/aria-expanded="false"/);
  expect(html).toMatch(/aria-controls="site-drawer"/);
  expect(html).toMatch(/aria-label="(Open )?[Mm]enu"/);
});
