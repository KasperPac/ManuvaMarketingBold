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
