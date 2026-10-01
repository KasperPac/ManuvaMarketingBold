import { test, expect, type Page } from '@playwright/test';

// The Dave hero (MVBOLD-29): a full-bleed claymation frame over the cobalt
// field, the copy in a poster layout or (from 1200px, landscape) in the right
// half. The layout half of this file is what reduced-motion and no-JS
// visitors get; the scrub half below covers the stop-motion itself.

async function ctasOnScreen(page: Page) {
  return page.evaluate(() =>
    [...document.querySelectorAll('.dave-foot .pill')].map((a) => {
      const r = a.getBoundingClientRect();
      return { text: (a.textContent || '').trim(), inView: r.top >= 0 && r.bottom <= innerHeight && r.width > 0 };
    }),
  );
}

for (const [w, h] of [[1280, 900], [1440, 900], [390, 844], [844, 390]] as const) {
  test(`both CTAs are on screen on load at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    const ctas = await ctasOnScreen(page);
    expect(ctas.map((c) => c.text)).toEqual(['Start free', 'Book a demo']);
    expect(ctas.every((c) => c.inView), JSON.stringify(ctas)).toBe(true);
  });
}

const WIDTHS = [320, 375, 414, 768, 1024, 1200, 1279, 1280, 1366, 1440, 1920, 2560];
for (const width of WIDTHS) {
  test(`the headline fits its column at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const m = await page.evaluate(() => {
      const h1 = document.querySelector('.hero.dave h1') as HTMLElement;
      const hl = h1.querySelector('.hl') as HTMLElement;
      const box = h1.parentElement!.getBoundingClientRect();
      const r = hl.getBoundingClientRect();
      return { overflow: h1.scrollWidth - h1.clientWidth, hlRight: r.right, colRight: box.right, vw: innerWidth };
    });
    expect(m.overflow, 'the h1 overflows its own box').toBeLessThanOrEqual(1);
    expect(m.hlRight, '"More making." runs past its column').toBeLessThanOrEqual(m.colRight + 1);
    expect(m.hlRight, '"More making." runs off the screen').toBeLessThanOrEqual(m.vw);
  });
}

// The reason layout A starts at 1280 and takes 54%: below that, a column that
// can hold the unbreakable "More making." cannot also keep the h1 ahead of the
// section h2s, which run at clamp(64px, 6vw, 104px). hero-contract.spec.ts
// checks 1280 only; this checks the whole layout-A range.
for (const width of [1280, 1366, 1440, 1920, 2560]) {
  test(`the headline still leads every section heading at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const m = await page.evaluate(() => ({
      h1: Number.parseFloat(getComputedStyle(document.querySelector('.hero.dave h1')!).fontSize),
      h2: Math.max(...[...document.querySelectorAll('main h2')]
        .filter((h) => !h.closest('.cut, .stage .panel'))
        .map((h) => Number.parseFloat(getComputedStyle(h).fontSize))),
    }));
    expect(m.h1, `h1 ${m.h1}px against h2 ${m.h2}px`).toBeGreaterThan(m.h2);
  });
}

test('layout A puts the copy on the right from 1280px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const left = await page.locator('.dave-copy').evaluate((el) => el.getBoundingClientRect().left);
  expect(left).toBeGreaterThanOrEqual(1280 * 0.45);
});

test('the poster layout puts the headline at the top and the buttons at the foot', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const m = await page.evaluate(() => ({
    h1: document.querySelector('.hero.dave h1')!.getBoundingClientRect().top,
    cta: document.querySelector('.dave-foot .row')!.getBoundingClientRect().bottom,
  }));
  expect(m.h1).toBeLessThan(844 * 0.4);
  expect(m.cta).toBeGreaterThan(844 * 0.75);
});

test('a portrait viewport loads the portrait frame', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const src = await page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => i.currentSrc);
  expect(src).toMatch(/\/hero\/dave\/p\/000\.webp$/);
});

test('the explainer facade renders in the stage lead-in', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await expect(page.locator('.stage-lead .site-video')).toBeVisible();
  await expect(page.locator('.hero .site-video')).toHaveCount(0);
});
