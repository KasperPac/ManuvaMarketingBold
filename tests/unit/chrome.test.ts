import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Nav from '../../src/components/site/Nav.astro';
import Footer from '../../src/components/site/Footer.astro';
import { ALL_ROUTES } from '../../src/site';

const renderNav = () => AstroContainer.create().then((c) => c.renderToString(Nav));
const renderFooter = () => AstroContainer.create().then((c) => c.renderToString(Footer));

const hrefsIn = (html: string) =>
  [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

// The Features mega menu links deep: /features#boms and nine siblings. The
// route half still has to be real, which is what this checks after splitting
// the fragment off. That the fragment itself resolves to a live id is a
// separate, stronger check that already exists in the e2e suite ("every
// cross-page '/path#id' anchor resolves to a real id on its target route") and
// runs against the built pages, where the ids actually are — a container-
// rendered Nav has no way to know what /features contains.
test('every nav link points at a route that exists', async () => {
  const internal = hrefsIn(await renderNav()).filter((h) => h.startsWith('/') && h !== '#main');
  expect(internal.length, 'nav rendered no internal links to check').toBeGreaterThan(0);
  for (const href of internal) {
    const route = href.split('#')[0];
    expect(ALL_ROUTES, `${href} is not a real route`).toContain(route);
  }
});

// The menu is the reason the check above had to relax, so assert it is actually
// there — otherwise a future change that empties FEATURE_LINKS would leave the
// relaxed check passing on nothing.
test('the features menu lists every feature area and is hidden until opened', async () => {
  const html = await renderNav();
  const { FEATURE_LINKS } = await import('../../src/site');
  for (const f of FEATURE_LINKS) {
    expect(html, `menu is missing ${f.label}`).toContain(`href="${f.href}"`);
  }
  expect(html).toContain('aria-expanded="false"');
  expect(html).toContain('aria-controls="site-nav-features"');
  expect(html).toMatch(/id="site-nav-features"[^>]*hidden/);
});

test('every footer link points at a route that exists', async () => {
  const internal = hrefsIn(await renderFooter()).filter((h) => h.startsWith('/'));
  expect(internal.length, 'footer rendered no internal links to check').toBeGreaterThan(0);
  for (const href of internal) {
    // Same treatment as the nav check above: a fragment is not a different
    // route. The footer's feature column links to /features#<domain>, and the
    // anchors themselves are covered by the cross-page anchor test.
    const route = href.split('#')[0];
    expect(ALL_ROUTES, `${href} is not a real route`).toContain(route);
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
