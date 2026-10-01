import { test, expect } from '@playwright/test';

// /features (MVBOLD-31, from the MANUVA-49 critique: UI-9, UI-11, UI-21).

test('a domain cut starts as soon as its section is mostly on screen, not after a screen of empty colour', async ({ page }) => {
  // The cut only began once the section was 65% of a screen into view, so
  // every domain opened on ~600px of flat field before anything happened.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/features');
  const clipAt = (frac: number) => page.evaluate(async (f) => {
    const intro = document.querySelector('.intro') as HTMLElement;
    const top = intro.getBoundingClientRect().top + scrollY;
    scrollTo(0, top - innerHeight * f);
    await new Promise((r) => setTimeout(r, 900));
    return (intro.querySelector('.cut') as HTMLElement).style.clipPath;
  }, frac);
  // With the intro's top 40% of the way down the screen, the cut is under way
  // (the old timing waited until it was 35% down).
  const clip = await clipAt(0.4);
  expect(clip, 'cut still fully closed').not.toMatch(/circle\(0(\.0+)?%/);
});

test('/features is shorter: less pinned runway per domain', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/features');
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  // 19,254px before (19,180 in the critique), with the hero CTA since added.
  // Six domains of runway at 30svh less each, and less dead padding.
  expect(h).toBeLessThan(17_600);
});

test.describe('on a phone', () => {
  // Mobile emulation, as the critique captured it: Chrome's mobile text
  // autosizing is part of what blew the badges up.
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });

test('plan badges on phone cards are compact pills with the label centred', async ({ page }) => {
  await page.goto('/features');
  const m = await page.locator('.fcard .tier').evaluateAll((els) => els.slice(0, 6).map((e) => {
    const r = e.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(e);
    const t = range.getBoundingClientRect();
    return { h: r.height, off: Math.abs((t.top + t.bottom) / 2 - (r.top + r.bottom) / 2) };
  }));
  expect(m.length).toBeGreaterThan(0);
  for (const b of m) {
    expect(b.h, 'badge height').toBeLessThanOrEqual(24);
    expect(b.off, 'label off centre').toBeLessThanOrEqual(1.5);
  }
});
});

test('the domain bar gets out of the way as the closing band arrives', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/features');
  await page.evaluate(() => {
    const end = document.querySelector('[data-chips-end]') as HTMLElement;
    scrollTo(0, end.getBoundingClientRect().top + scrollY - innerHeight * 0.85);
  });
  await expect(page.locator('#chips')).toHaveAttribute('data-hide', '1', { timeout: 3_000 });
});
