import { test, expect, type Page } from '@playwright/test';

// Re-score round (MVBOLD-31): what the critics' second pass still found.

// The home stage's three tests (the outgoing panel's copy whole early in a
// cut, faded a quarter in, and an inset focus ring) went with the stage
// (MVBOLD-34). The tiles' ring is covered in access.spec.ts.

test('the integration names on home read at 4.5:1', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const o = await page.locator('.logorow li').first().evaluate((li) => Number(getComputedStyle(li).opacity));
  // #141413 at .55 on #fafaf9 measured 4.05:1; .72 is the sector rows' value.
  expect(o).toBeGreaterThanOrEqual(0.72);
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('every row of the plan matrix is reachable from the plan cards', async ({ page }) => {
    await page.goto('/pricing');
    const card = page.locator('.site-matrix-card').filter({ hasText: 'Growth' }).first();
    await card.locator('summary').click();
    const rows = await card.locator('.site-matrix-all li').count();
    expect(rows).toBe(await page.locator('table.mv-matrix tbody tr:not(.site-matrix-divider)').count());
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });
});

test('the pricing headline agrees with Starter\'s three users', async ({ page }) => {
  await page.goto('/pricing');
  await expect(page.locator('main h1')).toContainText('from Growth');
});

test('"Priced for the shed" links to the prices', async ({ page }) => {
  await page.goto('/');
  const sec = page.locator('section', { has: page.locator('h2', { hasText: 'Priced for the shed' }) });
  await expect(sec.locator('a[href="/pricing"]')).toHaveCount(1);
});

// With the narrower fallback face "Less chaos. More making." fitted on one
// line at 1440; the swap to Archivo broke it onto two and moved the copy block
// and its scrim by 136px. The break is now set by width, never by the font:
// one line from 1100px (MVBOLD-33), two below.
for (const [width, want] of [[1440, 1], [1024, 2]] as const) {
  test(`the hero tagline is ${want} line(s) at ${width}px with or without the web fonts, so nothing shifts when they arrive`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const lines = () => page.locator('.hero.dave h1').evaluate((h) => {
      const lh = parseFloat(getComputedStyle(h).lineHeight);
      return Math.round(h.getBoundingClientRect().height / lh);
    });
    const FONTS = /fonts\.(googleapis|gstatic)\.com/;
    await page.route(FONTS, (r) => r.abort());
    await page.goto('/');
    expect(await lines(), 'fallback face').toBe(want);
    await page.unroute(FONTS);
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    expect(await lines(), 'web fonts').toBe(want);
  });
}

test('the header motion switch keeps a visible word at tablet widths', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 700 });
  await page.goto('/pricing');
  const w = await page.locator('.head-motion .motion-word').evaluate((e) => e.getBoundingClientRect().width);
  expect(w).toBeGreaterThan(20);
  const sw = await page.evaluate(() => document.querySelector('.bar')!.scrollWidth - document.querySelector('.bar')!.clientWidth);
  expect(sw, 'the header still fits').toBeLessThanOrEqual(0);
});
