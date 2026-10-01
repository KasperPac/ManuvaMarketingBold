import { test, expect } from '@playwright/test';

// MANUVA-37: with reduced motion, the header nav went near-black on every
// dark hero (axe measured 1.38:1 on /features). headColor() hid the header
// with visibility:hidden and hit-tested the point under it, but under
// reduced motion every element carries a near-zero transition on `all`, so
// the inherited visibility change had not applied when the hit-test ran: the
// header sampled its own nav and locked onto whatever ink it first got.

for (const motion of ['reduce', 'no-preference'] as const) {
  test.describe(`header ink, ${motion === 'reduce' ? 'reduced motion' : 'motion on'}`, () => {
    for (const path of ['/features', '/pricing', '/alternatives/katana', '/about', '/']) {
      test(`${path}: the header takes the ink of the hero under it`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: motion });
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(path);
        await page.waitForTimeout(600);
        const m = await page.evaluate(() => {
          const head = document.querySelector('.site-head') as HTMLElement;
          const hero = document.querySelector('main > section') as HTMLElement;
          return { head: getComputedStyle(head).color, hero: getComputedStyle(hero).color };
        });
        expect(m.head, `header ink ${m.head} against the hero's ${m.hero}`).toBe(m.hero);
      });
    }

    test('/pricing: over the paper sections below, the header turns dark', async ({ page }) => {
      await page.emulateMedia({ reducedMotion: motion });
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto('/pricing');
      await page.evaluate(() => {
        const paper = [...document.querySelectorAll<HTMLElement>('main > section')].find((s) => getComputedStyle(s).backgroundColor === 'rgba(0, 0, 0, 0)' || /250, 250, 249/.test(getComputedStyle(s).backgroundColor))!;
        scrollTo(0, paper.getBoundingClientRect().top + scrollY + 10);
      });
      await expect.poll(() => page.locator('.site-head').evaluate((h) => getComputedStyle(h).color), { timeout: 3_000 }).toBe('rgb(20, 20, 19)');
    });
  });
}
