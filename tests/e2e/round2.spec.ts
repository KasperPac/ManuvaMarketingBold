import { test, expect } from '@playwright/test';

// Re-score round (MVBOLD-31): what the critics' second pass still found.

test('mid-transition, the outgoing home panel\'s copy is wiped away under the incoming one', async ({ page }) => {
  // "Production" text showed under "Sales" while the shape cut was half in.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => {
    const s = document.querySelector('.stage') as HTMLElement;
    const top = s.getBoundingClientRect().top + scrollY;
    // Halfway from panel 2 to panel 3.
    scrollTo(0, top + (s.offsetHeight - innerHeight) * (2.5 / 5));
  });
  await page.waitForTimeout(1200);
  const clip = await page.locator('.stage .panel').nth(2).locator('h2').evaluate((h) => getComputedStyle(h).clipPath);
  const pct = Number((clip.match(/inset\(0px 0px ([\d.]+)%/) || [])[1] ?? 0);
  expect(pct, `outgoing heading clip: ${clip}`).toBeGreaterThan(90);
});

test('a focused home panel shows its focus ring inside the screen', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const p = page.locator('.stage .panel').first();
  await p.focus();
  const offset = await p.evaluate((e) => parseFloat(getComputedStyle(e).outlineOffset));
  expect(offset, 'an inset ring: the panel fills the viewport').toBeLessThan(0);
});

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

test('the hero tagline is two lines before the web fonts arrive, so nothing shifts when they do', async ({ page }) => {
  // With the narrower fallback face "Less chaos. More making." fitted on one
  // line at 1440; the swap to Archivo broke it onto two and moved the copy
  // block and its scrim by 136px.
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const lines = await page.locator('.hero.dave h1').evaluate((h) => {
    const lh = parseFloat(getComputedStyle(h).lineHeight);
    return Math.round(h.getBoundingClientRect().height / lh);
  });
  expect(lines).toBe(2);
});

test('the header motion switch keeps a visible word at tablet widths', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 700 });
  await page.goto('/pricing');
  const w = await page.locator('.head-motion .motion-word').evaluate((e) => e.getBoundingClientRect().width);
  expect(w).toBeGreaterThan(20);
  const sw = await page.evaluate(() => document.querySelector('.bar')!.scrollWidth - document.querySelector('.bar')!.clientWidth);
  expect(sw, 'the header still fits').toBeLessThanOrEqual(0);
});
