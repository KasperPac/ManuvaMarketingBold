import { test, expect, type Page } from '@playwright/test';

// Smooth wheel scrolling (MVBOLD-32). A mouse wheel moves the page in ~100px
// notches; with Lenis each notch glides there over a few hundred ms. Wheel
// only: touch, keyboard and the scrollbar stay native. Off with reduced
// motion or the site's motion switch off, and with ?smooth=0 for comparing.

const glide = (page: Page) => page.evaluate(async () => {
  const ys: number[] = [scrollY];
  const end = performance.now() + 900;
  while (performance.now() < end) {
    await new Promise((r) => requestAnimationFrame(r));
    if (scrollY !== ys[ys.length - 1]) ys.push(scrollY);
  }
  return ys;
});

test.describe('motion on', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('one wheel notch glides the page rather than jumping it', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/pricing');
    await page.mouse.move(640, 400);
    await page.waitForTimeout(300);
    const sampling = glide(page);
    await page.mouse.wheel(0, 100);
    const ys = await sampling;
    const label = ys.map(Math.round).join(',');
    expect(ys[ys.length - 1] - ys[0], label).toBeGreaterThan(80);
    expect(ys.length, `positions passed through: ${label}`).toBeGreaterThanOrEqual(5);
    const steps = ys.slice(1).map((y, i) => y - ys[i]);
    expect(Math.max(...steps) / (ys[ys.length - 1] - ys[0]), label).toBeLessThan(0.5);
  });

  test('?smooth=0 leaves native scrolling for comparison', async ({ page }) => {
    await page.goto('/pricing?smooth=0');
    await expect(page.locator('html')).not.toHaveClass(/\blenis\b/);
  });

  test('with the phone drawer open, the wheel does not scroll the page behind it', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/pricing');
    await page.locator('.burger').click();
    await page.waitForTimeout(500);
    const y0 = await page.evaluate(() => scrollY);
    await page.mouse.move(195, 600);
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(700);
    expect(await page.evaluate(() => scrollY)).toBe(y0);
  });

  test('a domain chip still jumps to its domain', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/features');
    await page.evaluate(() => scrollTo(0, (document.getElementById('inventory') as HTMLElement).offsetTop + 400));
    await expect(page.locator('#chips')).not.toHaveAttribute('data-hide', '1', { timeout: 3_000 });
    await page.locator('#chips a[data-jump="3"]').click();
    await expect.poll(() => page.evaluate(() => {
      const s = document.getElementById('sales')!.getBoundingClientRect();
      return s.top <= innerHeight * 0.5 && s.bottom > innerHeight * 0.5;
    }), { timeout: 4_000 }).toBe(true);
  });
});

test.describe('reduced motion', () => {
  test('the wheel scrolls natively', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/pricing');
    await expect(page.locator('html')).not.toHaveClass(/\blenis\b/);
  });
});

// Presets to compare on the preview (MVBOLD-32). Chrome on Windows already
// eases a wheel notch over ~150ms, so the default glide read as "the same";
// these are stronger, to find where the difference is felt.
test.describe('presets', () => {
  test.use({ reducedMotion: 'no-preference' });
  const settleMs = (page: Page) => page.evaluate(async () => {
    const t0 = performance.now(); let last = scrollY; let lastMove = t0;
    while (performance.now() - t0 < 2500) {
      await new Promise((r) => requestAnimationFrame(r));
      if (scrollY !== last) { last = scrollY; lastMove = performance.now(); }
    }
    return lastMove - t0;
  });
  const run = async (page: Page, q: string) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/pricing' + q);
    await page.mouse.move(640, 400);
    await page.waitForTimeout(300);
    const s = settleMs(page);
    await page.mouse.wheel(0, 100);
    return s;
  };
  test('strong and silk glide for longer than the default', async ({ page }) => {
    const base = await run(page, '');
    const strong = await run(page, '?smooth=strong');
    const silk = await run(page, '?smooth=silk');
    expect(strong, `default ${Math.round(base)}ms, strong ${Math.round(strong)}ms`).toBeGreaterThan(base * 1.4);
    // silk is timed (1.2s ease-out); its last ~250ms moves under a pixel, so
    // it settles sooner than its duration, but still clearly after default.
    expect(silk, `default ${Math.round(base)}ms, silk ${Math.round(silk)}ms`).toBeGreaterThan(base * 1.15);
  });
});
