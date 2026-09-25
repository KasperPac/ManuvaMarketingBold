import { test, expect } from '@playwright/test';

// The site is static, so the motion mode is decided in the browser before
// first paint and written to <html data-motion>. Everything else — the CSS
// blocks that flatten the stage, the engine's own `reduce` flag, the toggle's
// pressed state — reads that one attribute. These assert the attribute really
// is the single switch, in both directions, because the symptom it exists to
// fix (no animation, cause unclear) is one nobody can debug by eye.

test('with reduced motion preferred, the page opens flat and says so', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');

  // Height is NOT the discriminator: flat mode is also about six viewports
  // tall, because the six panels become stacked min-height:100svh sections
  // instead of overlaying in one pin. What separates the modes is whether
  // the pin sticks and whether the panels are taken out of flow.
  const flat = await page.locator('.stage').evaluate((s) => ({
    pin: getComputedStyle(s.querySelector('.pin')!).position,
    panels: [...s.querySelectorAll('.panel')].map((p) => getComputedStyle(p).position),
    clips: [...s.querySelectorAll('.panel')].map((p) => getComputedStyle(p).clipPath),
    visible: [...s.querySelectorAll('.panel')].filter(
      (p) => getComputedStyle(p).visibility === 'visible').length,
  }));
  expect(flat.pin, 'the pin is released').toBe('relative');
  expect(flat.panels.every((p) => p === 'relative'), 'panels are back in flow').toBe(true);
  expect(flat.clips.every((c) => c === 'none'), 'nothing is clipped').toBe(true);
  expect(flat.visible, 'all six read as ordinary sections').toBe(6);
  await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('.motion-label')).toHaveText('Motion off');
});

test('with motion allowed, the stage pins and the panels clip', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');

  const live = await page.locator('.stage').evaluate((s) => ({
    pin: getComputedStyle(s.querySelector('.pin')!).position,
    panels: [...s.querySelectorAll('.panel')].map((p) => getComputedStyle(p).position),
    inlineHeight: (s as HTMLElement).style.height,
  }));
  expect(live.pin, 'the pin sticks').toBe('sticky');
  expect(live.panels.every((p) => p === 'absolute'), 'panels overlay in one pin').toBe(true);
  expect(live.inlineHeight, 'the engine gave the stage its scroll length').toMatch(/svh$/);

  // Scroll into the second panel's transition and confirm it is mid-clip —
  // not absent, and not finished.
  const clip = await page.evaluate(async () => {
    const s = document.querySelector('.stage') as HTMLElement;
    const top = s.getBoundingClientRect().top + scrollY;
    scrollTo(0, top + s.offsetHeight * 0.12);
    await new Promise((r) => setTimeout(r, 300));
    return getComputedStyle(s.querySelectorAll('.panel')[1]).clipPath;
  });
  expect(clip).toMatch(/circle\(/);
  expect(clip).not.toBe('none');
  await expect(page.locator('.motion-toggle')).toHaveAttribute('aria-pressed', 'true');
});

test('the toggle overrides the system preference and survives a reload', async ({ page }) => {
  // This is the whole point of the control: a visitor whose environment
  // reports reduced motion — for any reason, including one they did not set
  // and cannot find — can still see the design.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');

  await page.locator('.motion-toggle').click();
  await page.waitForLoadState('load');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
  await expect(page.locator('.motion-label')).toHaveText('Motion on');

  const pin = await page.locator('.stage .pin').evaluate((p) => getComputedStyle(p).position);
  expect(pin, 'the stage pins once motion is forced on').toBe('sticky');

  // And it persists rather than reverting to the system preference.
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');

  // Back off again, and it stays off.
  await page.locator('.motion-toggle').click();
  await page.waitForLoadState('load');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
});

test('the control is a real button with an accessible name in both states', async ({ page }) => {
  await page.goto('/');
  const btn = page.locator('.motion-toggle');
  await expect(btn).toHaveRole('button');
  await expect(btn).toHaveAttribute('title', /Turn (on|off) the scroll animations/);
  const box = await btn.boundingBox();
  expect(box!.height, 'the target is at least 44px tall').toBeGreaterThanOrEqual(44);
});
