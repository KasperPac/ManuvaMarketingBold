import { test, expect, type Page } from '@playwright/test';

// The home page's six domains (MVBOLD-34). They were a pinned stage: six
// full-screen panels wiping in over each other for five screens of scroll,
// a short band after the scrubbing Dave hero. Two pinned sequences was too
// much, so the hero keeps the motion and the domains are a static grid of
// field tiles: three across from 1100px, two from 721px, one on a phone.

const tiles = (page: Page) =>
  page.locator('.domains .tile').evaluateAll((ts) => ts.map((t) => {
    const r = t.getBoundingClientRect();
    return { left: Math.round(r.left), top: Math.round(r.top + scrollY), right: Math.round(r.right), bottom: Math.round(r.bottom + scrollY) };
  }));

for (const [w, h, cols] of [[1440, 900, 3], [1280, 800, 3], [1100, 800, 3], [1024, 768, 2], [768, 1024, 2], [390, 844, 1]] as const) {
  test(`the six domains are ${cols} across at ${w}px, and no two tiles touch`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    const r = await tiles(page);
    expect(r.length).toBe(6);
    expect(r.filter((t) => t.top === r[0].top).length, 'tiles on the first row').toBe(cols);
    // Two fields may never touch: every pair is separated by paper.
    for (let i = 0; i < r.length; i++) {
      for (let j = i + 1; j < r.length; j++) {
        const gapX = Math.max(r[j].left - r[i].right, r[i].left - r[j].right);
        const gapY = Math.max(r[j].top - r[i].bottom, r[i].top - r[j].bottom);
        expect(Math.max(gapX, gapY), `tiles ${i} and ${j}`).toBeGreaterThanOrEqual(12);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth), 'no sideways scroll').toBeLessThanOrEqual(w);
  });
}

test('nothing pins below the hero on the home page', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const pinned = await page.evaluate(() => {
    const hero = document.querySelector('.hero.dave')!;
    return [...document.querySelectorAll('main *')]
      .filter((e) => !hero.contains(e) && getComputedStyle(e).position === 'sticky')
      // The split sections' sticky heading column is a column, not a pin:
      // it rides alongside its own list rather than holding the screen.
      .filter((e) => !e.matches('.split > .stick'))
      .map((e) => e.className);
  });
  expect(pinned).toEqual([]);
});

// The docked header takes the background of the field under it. Over a
// full-bleed field that is the point; over a tile it is not: scrolling the
// grid on a phone turned the bar cobalt, then amber, then flare, six colours
// in a row. Over the tiles the bar keeps the paper of their section.
for (const [w, h] of [[390, 844], [1440, 900]] as const) {
  test(`the docked header stays paper over the domain tiles at ${w}px`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    const tiles = page.locator('.domains .tile');
    for (const i of [0, 1, 4]) {
      await tiles.nth(i).evaluate((t) => scrollTo(0, t.getBoundingClientRect().top + scrollY - 10));
      await expect.poll(() => page.locator('.site-head').evaluate((e) => (e as HTMLElement).dataset.dock)).toBe('1');
      await expect.poll(
        () => page.locator('.site-head').evaluate((e) => getComputedStyle(e).backgroundColor),
        { message: `over tile ${i}` },
      ).toBe('rgb(250, 250, 249)');
    }
  });
}

test('the platform section takes about a screen, not five', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const hgt = await page.locator('section.platform').evaluate((s) => s.getBoundingClientRect().height);
  expect(hgt, `${hgt}px`).toBeLessThanOrEqual(800 * 1.6);
});
