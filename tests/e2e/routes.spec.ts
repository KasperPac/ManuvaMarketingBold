import { test, expect } from '@playwright/test';
import { ALL_ROUTES } from '../../src/site';

for (const route of ALL_ROUTES) {
  test(`${route} responds 200`, async ({ request }) => {
    const res = await request.get(route);
    expect(res.status()).toBe(200);
  });
}

test('no internal link 301s — every href is already canonical', async ({ page, request }) => {
  const seen = new Set<string>();
  for (const route of ALL_ROUTES) {
    await page.goto(route);
    const hrefs = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')!));
    for (const href of hrefs) seen.add(href.split('#')[0]);
  }
  for (const href of [...seen].filter(Boolean)) {
    const res = await request.get(href, { maxRedirects: 0 });
    expect(res.status(), `${href} should not redirect`).toBe(200);
  }
});

test('legacy .html paths still 301 to clean URLs', async ({ request }) => {
  // Netlify applies _redirects; astro preview does not, so this asserts the
  // rule file is present and well-formed rather than the live behaviour.
  const res = await request.get('/_redirects');
  const body = await res.text();
  expect(body).toContain('/features.html');
  expect(body).toContain('301');
});

// Task 14 addition: the parity gate and unit suite both operate on markup and
// text — neither one can tell a live `href="#id"` from a dead one, because
// both sides render the same string either way. Two of ten in-page anchors on
// /features pointed at ids that never existed until a prior round caught it
// by hand; this is the automated net for that whole class of defect, run
// against every route rather than the one page it happened to be found on.
for (const route of ALL_ROUTES) {
  test(`${route} — every in-page "#" anchor resolves to a real id`, async ({ page }) => {
    await page.goto(route);
    const fragments = await page.$$eval('a[href^="#"]', (as) =>
      as.map((a) => a.getAttribute('href')!.slice(1)).filter(Boolean),
    );
    const missing = await page.evaluate(
      (ids) => ids.filter((id) => !document.getElementById(id)),
      fragments,
    );
    expect(missing, `dead in-page anchor(s) on ${route}: ${missing.join(', ')}`).toEqual([]);
  });
}
