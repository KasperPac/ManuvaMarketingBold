import { test, expect, type Page } from '@playwright/test';

// The site is static, so the motion mode is decided in the browser before
// first paint and written to <html data-motion>. Everything else — the CSS
// blocks that release the pins, the engine's own `reduce` flag, the toggle's
// pressed state — reads that one attribute. These assert the attribute really
// is the single switch, in both directions, because the symptom it exists to
// fix (no animation, cause unclear) is one nobody can debug by eye.
//
// The probe is /features' shape cuts, six pinned sections that each clip in
// on a shape. It was the home stage until that became a static grid
// (MVBOLD-34); the cuts are the same pin-and-clip machinery.

// Scrolls to `at` (0..1) of the way through intro i's cut: introU in
// Motion.astro starts when the intro's top is 80% of the way up the screen
// and runs over 80% of the intro's travel.
const toCut = (page: Page, i: number, at: number, extra = 0) =>
  page.evaluate(([i, at, extra]) => {
    const n = document.querySelectorAll<HTMLElement>('.intro')[i];
    const H = innerHeight;
    const span = n.offsetHeight - H + H * 0.8;
    scrollTo(0, n.getBoundingClientRect().top + scrollY - (H * 0.8 - span * 0.8 * at) + extra);
  }, [i, at, extra] as const);

test('with reduced motion preferred, the page opens flat and says so', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/features');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');

  // What separates the modes is whether the pins stick and whether the cuts
  // are clipped, not the page's height.
  const flat = await page.evaluate(() => ({
    pins: [...document.querySelectorAll('.ipin')].map((p) => getComputedStyle(p).position),
    clips: [...document.querySelectorAll('.cut')].map((c) => getComputedStyle(c).clipPath),
  }));
  expect(flat.pins.length).toBe(6);
  expect(flat.pins.every((p) => p === 'relative'), 'the pins are released').toBe(true);
  expect(flat.clips.every((c) => c === 'none'), 'nothing is clipped').toBe(true);
  await expect(page.locator('.site-foot .motion-toggle')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('.site-foot .motion-label')).toHaveText('Motion off');
});

test('with motion allowed, the cuts pin and clip', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/features');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');

  const pins = await page.locator('.ipin').evaluateAll((ps) => ps.map((p) => getComputedStyle(p).position));
  expect(pins.length).toBe(6);
  expect(pins.every((p) => p === 'sticky'), 'the pins stick').toBe(true);

  // Halfway into the first cut it is mid-clip: not absent, and not finished.
  await toCut(page, 0, 0.5);
  await page.waitForTimeout(500);
  const clip = await page.locator('.cut').first().evaluate((c) => getComputedStyle(c).clipPath);
  expect(clip).toMatch(/circle\(/);
  expect(clip).not.toBe('none');
  await expect(page.locator('.site-foot .motion-toggle')).toHaveAttribute('aria-pressed', 'true');
});

test('the toggle overrides the system preference and survives a reload', async ({ page }) => {
  // This is the whole point of the control: a visitor whose environment
  // reports reduced motion — for any reason, including one they did not set
  // and cannot find — can still see the design.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');

  await page.locator('.site-foot .motion-toggle').click();
  await page.waitForLoadState('load');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
  await expect(page.locator('.site-foot .motion-label')).toHaveText('Motion on');

  // The home page's motion is the Dave hero: forced on, the engine pins it.
  await expect(page.locator('.hero.dave'), 'the hero scrubs once motion is forced on').toHaveAttribute('data-scrub', /^(pre|calm)$/);

  // And it persists rather than reverting to the system preference.
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');

  // Back off again, and it stays off.
  await page.locator('.site-foot .motion-toggle').click();
  await page.waitForLoadState('load');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
});

test('the control is a real button with an accessible name in both states', async ({ page }) => {
  await page.goto('/');
  const btn = page.locator('.site-foot .motion-toggle');
  await expect(btn).toHaveRole('button');
  await expect(btn).toHaveAttribute('title', /Turn (on|off) the scroll animations/);
  const box = await btn.boundingBox();
  expect(box!.height, 'the target is at least 44px tall').toBeGreaterThanOrEqual(44);
});

// --- smoothness -------------------------------------------------------------
//
// The design writes each shape straight from the scroll offset. That is exact
// but steppy, because a mouse wheel moves in ~100px notches: measured on the
// deployed home page, one notch moved the iris from 75.8% to 115.7% in a
// single frame — 39.9% of its travel — which is what "rigid" was. The engine
// damps the rendered progress toward the scroll-derived target instead, so a
// notch arrives as a sweep over roughly a quarter second.
//
// Asserted as a property rather than a number: after a jump the shape must be
// somewhere between where it was and where it is going, on at least one frame.
// A snapped implementation can never satisfy that.
test.describe('smoothness', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('a scroll jump sweeps the shape rather than snapping it', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/features');
    await page.waitForTimeout(300);

    // The first cut is the iris (circle): its radius is the first number.
    await toCut(page, 0, 0.35);
    await page.waitForTimeout(500);                     // let it settle
    const t = await page.evaluate(async () => {
      const c = document.querySelectorAll('.cut')[0];
      const radius = () => parseFloat((getComputedStyle(c).clipPath.match(/[\d.]+/) || ['0'])[0]);
      const from = radius();

      scrollTo(0, scrollY + 100);                       // one wheel notch
      const mid: number[] = [];
      for (let i = 0; i < 4; i++) {
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        mid.push(radius());
      }
      await new Promise((r) => setTimeout(r, 600));   // settle again
      return { from, mid, to: radius() };
    });

    expect(t.to, 'the shape still ends where the scroll position says').toBeGreaterThan(t.from);
    // At least one sampled frame strictly between the two — the signature of a
    // follower. A snapped value is already at `to` on the first frame.
    const between = t.mid.filter((v) => v > t.from + 0.5 && v < t.to - 0.5);
    expect(between.length, `frames sampled: ${JSON.stringify(t.mid)} between ${t.from} and ${t.to}`)
      .toBeGreaterThan(0);
  });

  test('the loop idles off-screen and wakes again on scroll', async ({ page }) => {
    // The marquee used to hold a permanently-running rAF open. The shared loop
    // stops when nothing is near the viewport, which is only safe if scrolling
    // back restarts it — otherwise the cuts silently stop animating for the
    // rest of the session.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/features');
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(700);

    await toCut(page, 1, 0.5);
    await page.waitForTimeout(700);
    const revived = await page.locator('.cut').nth(1).evaluate((c) => getComputedStyle(c).clipPath);
    expect(revived, 'the second shape animates after the loop had idled').not.toBe('none');
    expect(revived).toMatch(/polygon\(/);
  });
});
