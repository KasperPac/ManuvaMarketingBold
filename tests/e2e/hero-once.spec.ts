import { test, expect, type Page } from '@playwright/test';

// The hero plays once per visit (MVBOLD-37, author's call): "after we've
// scrolled through the animation the first time, it shouldn't scroll back
// through. So if they scroll to the top, it stays as the finished frame. Same
// goes for when they navigate to another page and come back to it." A visit
// is the tab's session; the remembered flag lives in sessionStorage.

test.use({ reducedMotion: 'no-preference' });

const hero = (page: Page) => page.locator('.hero.dave');
const heroTo = (page: Page, f: number) =>
  page.evaluate((f) => {
    const el = document.querySelector('.hero.dave') as HTMLElement;
    scrollTo(0, el.getBoundingClientRect().top + scrollY + (el.offsetHeight - innerHeight) * f);
  }, f);
const shownAt = (page: Page) =>
  page.locator('.dave-scene video').evaluate((v: HTMLVideoElement) => (v.seeking ? -1 : v.currentTime));
const clipEnd = (page: Page) =>
  page.locator('.dave-scene video').evaluate((v: HTMLVideoElement) => v.duration - 0.02);
const imgSrc = (page: Page) =>
  page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => i.currentSrc || i.src);
const fetched = (page: Page, file: string) =>
  page.evaluate((f) => performance.getEntriesByType('resource').filter((r) => r.name.endsWith(`/hero/dave/${f}`)).length, file);
const logoClip = (page: Page) => page.locator('.dave-logo').evaluate((e) => getComputedStyle(e).clipPath);

async function playThrough(page: Page) {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await expect(hero(page)).toHaveAttribute('data-video', 'ready', { timeout: 20_000 });
  await heroTo(page, 1);
  await expect.poll(async () => (await shownAt(page)) > (await clipEnd(page)) - 0.1, { timeout: 8_000 }).toBe(true);
}

test('once played through, scrolling back to the top keeps the finished room', async ({ page }) => {
  await playThrough(page);
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(1500);
  expect(await shownAt(page), 'the clip stays on its last frame').toBeGreaterThan((await clipEnd(page)) - 0.1);
  await expect(hero(page)).toHaveAttribute('data-scrub', 'calm');
  await expect.poll(() => logoClip(page)).toMatch(/^(none|inset\(0px\))$/);
  // At the top the descriptor and Start free are back, over the finished room,
  // and the "Scroll" hint stays away: there is nothing left to scroll for.
  await expect(hero(page)).not.toHaveAttribute('data-lead', 'gone');
  expect(await page.locator('.dave-hint').evaluate((e) => Number(getComputedStyle(e).opacity))).toBeLessThan(0.05);
});

test('halfway is not played through: scrolling back still rewinds', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await expect(hero(page)).toHaveAttribute('data-video', 'ready', { timeout: 20_000 });
  await heroTo(page, 0.5);
  await expect.poll(() => shownAt(page), { timeout: 5_000 }).toBeGreaterThan(3);
  await page.evaluate(() => scrollTo(0, 0));
  await expect.poll(() => shownAt(page), { timeout: 5_000 }).toBeLessThan(0.5);
  await expect(hero(page)).toHaveAttribute('data-scrub', 'pre');
});

test('back on the home page in the same visit, it opens on the finished room: one screen, no clip', async ({ page }) => {
  await playThrough(page);
  await page.goto('/pricing');
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-hero', 'done');
  expect(await hero(page).evaluate((e) => e.getBoundingClientRect().height), 'no pinned stretch').toBeLessThanOrEqual(801);
  await expect(hero(page)).not.toHaveAttribute('data-scrub', /.*/);
  await expect.poll(() => imgSrc(page)).toMatch(/\/hero\/dave\/l-end\.webp$/);
  expect(await logoClip(page)).toMatch(/^(none|inset\(0px\))$/);
  expect(await page.locator('.hero.dave .hl').evaluate((e) => getComputedStyle(e).backgroundColor)).toBe('rgb(200, 255, 46)');
  await page.waitForLoadState('load');
  await page.waitForTimeout(1500);
  expect(await fetched(page, 'l.mp4'), 'the clip is not fetched').toBe(0);
  expect(await page.locator('.dave-scene video').count()).toBe(0);
});

test('a new visit plays it again', async ({ page }) => {
  await playThrough(page);
  await page.evaluate(() => sessionStorage.clear());
  await page.evaluate(() => scrollTo(0, 0));
  await page.reload();
  await expect(page.locator('html')).not.toHaveAttribute('data-hero', 'done');
  await expect(hero(page)).toHaveAttribute('data-scrub', 'pre');
  await expect.poll(() => imgSrc(page)).toMatch(/\/hero\/dave\/l\.webp$/);
});

// Playwright's Chromium does not keep pages in the back-forward cache, so
// goBack reloads the page, here as the one-screen hero: this exercises
// Motion.astro's own restore against the content below the hero (checked
// 2026-10-02: navigation type back_forward, data-hero done). A browser that
// does cache the page restores it as it was, which lands in the same place.
test('back to the home page from another page lands where it was left', async ({ page }) => {
  await playThrough(page);
  const versus = page.locator('section.versus');
  await versus.evaluate((s) => scrollTo(0, s.getBoundingClientRect().top + scrollY));
  await page.waitForTimeout(400);
  await versus.locator('a[href="/pricing"]').first().click();
  await page.waitForURL('**/pricing');
  await page.goBack();
  await page.waitForURL((u) => u.pathname === '/');
  await expect.poll(() => versus.evaluate((s) => Math.round(s.getBoundingClientRect().top)), { timeout: 5_000 }).toBeLessThan(40);
  expect(await versus.evaluate((s) => Math.round(s.getBoundingClientRect().top))).toBeGreaterThan(-40);
});

test('with motion off, a played-through visit still gets the still hero', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => sessionStorage.setItem('mv-hero-done', '1'));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.locator('html')).not.toHaveAttribute('data-hero', 'done');
  await expect.poll(() => imgSrc(page)).toMatch(/\/hero\/dave\/l\.webp$/);
});
