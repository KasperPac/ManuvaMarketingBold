import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ALL_ROUTES } from '../../src/site';

for (const route of ALL_ROUTES) {
  test(`${route} has no WCAG A or AA violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test('the drawer traps focus and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 480, height: 900 });
  await page.goto('/');
  await page.click('.site-burger');
  await expect(page.locator('#site-drawer')).toBeVisible();
  await expect(page.locator('.site-burger')).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.locator('#site-drawer')).toBeHidden();
  await expect(page.locator('.site-burger')).toBeFocused();
});

test('the drawer actually traps Tab focus inside itself, in both directions', async ({ page }) => {
  await page.setViewportSize({ width: 480, height: 900 });
  await page.goto('/');
  await page.click('.site-burger');
  await expect(page.locator('#site-drawer')).toBeVisible();

  const focusable = page.locator('#site-drawer a[href], #site-drawer button:not([disabled])');
  const count = await focusable.count();
  expect(count, 'drawer should have focusable items to trap').toBeGreaterThan(1);
  const first = focusable.first();
  const last = focusable.last();

  // Forward wrap: focus the last item, Tab once more, land back on the first.
  await last.focus();
  await page.keyboard.press('Tab');
  await expect(first).toBeFocused();

  // Backward wrap: focus the first item, Shift+Tab, land back on the last.
  await first.focus();
  await page.keyboard.press('Shift+Tab');
  await expect(last).toBeFocused();
});

// Drawer.astro measures the scrollbar gap and pads the body to compensate
// before locking `overflow: hidden` specifically so the page doesn't jump
// sideways when the scrollbar disappears. Assert the compensation actually
// holds a real piece of chrome (the burger, right-aligned in a full-width
// flex row) in place, not just that the code intends to.
test('opening the drawer does not shift the page (scroll-lock compensation)', async ({ page }) => {
  await page.setViewportSize({ width: 480, height: 700 });
  await page.goto('/');
  const burger = page.locator('.site-burger');
  const before = await burger.boundingBox();
  await burger.click();
  await expect(page.locator('#site-drawer')).toBeVisible();
  const after = await burger.boundingBox();
  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(Math.abs((after!.x) - (before!.x))).toBeLessThanOrEqual(1);
});

test('the skip link is the first thing keyboard focus reaches', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('a.skip')).toBeFocused();
});

test('content stays visible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const hidden = await page.$$eval('.mv-reveal', (els) =>
    els.filter((e) => getComputedStyle(e).opacity === '0').length);
  expect(hidden).toBe(0);
});

// --- field-section body-copy contrast --------------------------------------
//
// The regression this guards: body copy shipped at 1.4:1 on a colour field
// because an absolute paper ink was set inside a <Field>, which a token-name
// read can't catch (the token itself is fine — it was used on the wrong
// background). This resolves actual computed colours in the browser —
// including the effective background walked up the ancestor chain and any
// cumulative opacity — and runs the real WCAG relative-luminance formula,
// rather than trusting that the right CSS custom property was referenced.
async function findFieldContrastViolations(page: Page) {
  return page.evaluate(() => {
    function parseColor(str: string): [number, number, number, number] | null {
      const m = str.match(/rgba?\(([^)]+)\)/i);
      if (!m) return null;
      const inner = m[1].replace('/', ' ').trim();
      const parts = inner.split(/[\s,]+/).map((s) => {
        const isPct = s.endsWith('%');
        const n = parseFloat(s);
        return isPct ? n / 100 : n;
      });
      if (parts.length < 3 || parts.slice(0, 3).some((n) => Number.isNaN(n))) return null;
      return [parts[0], parts[1], parts[2], parts.length > 3 && !Number.isNaN(parts[3]) ? parts[3] : 1];
    }
    function relLuminance(rgb: number[]): number {
      const [rs, gs, bs] = rgb.map((c) => {
        const n = c / 255;
        return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    }
    function contrastRatio(a: number[], b: number[]): number {
      const l1 = relLuminance(a) + 0.05;
      const l2 = relLuminance(b) + 0.05;
      return l1 > l2 ? l1 / l2 : l2 / l1;
    }
    function blend(fg: number[], alpha: number, bg: number[]): number[] {
      return [
        fg[0] * alpha + bg[0] * (1 - alpha),
        fg[1] * alpha + bg[1] * (1 - alpha),
        fg[2] * alpha + bg[2] * (1 - alpha),
      ];
    }
    function effectiveBackground(el: Element): number[] {
      // A single-step "first non-transparent ancestor wins" undercounts: a
      // translucent layer (e.g. a 4% white overlay) sitting on a *coloured*
      // ancestor (a dark ink field, not paper) needs that ancestor's colour
      // as its backdrop, not an assumed white — blending 4% white onto white
      // instead of onto navy reports a near-white background where the real
      // one is still near-navy. Collect every layer with any alpha, then
      // composite from the outermost inward, each one painted over the
      // accumulated result so far (paper white only as the ultimate base,
      // when nothing in the chain paints anything at all).
      const layers: number[][] = [];
      let node: Element | null = el;
      while (node) {
        const bg = parseColor(getComputedStyle(node).backgroundColor);
        if (bg && bg[3] > 0) layers.push(bg);
        node = node.parentElement;
      }
      let result = [255, 255, 255];
      for (let i = layers.length - 1; i >= 0; i--) {
        result = blend(layers[i], layers[i][3], result);
      }
      return result;
    }
    function cumulativeOpacity(el: Element): number {
      let node: Element | null = el;
      let op = 1;
      while (node) {
        const o = parseFloat(getComputedStyle(node).opacity);
        if (!Number.isNaN(o)) op *= o;
        node = node.parentElement;
      }
      return op;
    }

    const SKIP_TAGS = new Set([
      'SCRIPT', 'STYLE', 'SVG', 'PATH', 'USE', 'IMG', 'INPUT', 'BR', 'HR',
      'CIRCLE', 'RECT', 'LINE', 'POLYLINE', 'POLYGON', 'DEFS', 'G',
    ]);
    const REQUIRED = 4.5;
    const violations: { selector: string; text: string; ratio: number }[] = [];

    document.querySelectorAll('[data-fold]').forEach((section) => {
      section.querySelectorAll('*').forEach((el) => {
        if (SKIP_TAGS.has(el.tagName)) return;
        if (el.children.length > 0) return; // only leaf nodes render their own text run
        const text = (el.textContent || '').trim();
        if (!text) return;
        if (!el.getClientRects().length) return; // not actually rendered
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden') return;

        const fontSize = parseFloat(cs.fontSize);
        const fontWeight = parseInt(cs.fontWeight, 10) || 400;
        // WCAG's "large text" exception (>=24px, or >=18.66px at 700+ weight)
        // needs only 3:1 — out of scope here, which is body copy specifically.
        const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
        if (isLarge) return;

        const fg = parseColor(cs.color);
        if (!fg) return;
        const alpha = fg[3] * cumulativeOpacity(el);
        const bg = effectiveBackground(el);
        const composited = blend(fg, alpha, bg);
        const ratio = contrastRatio(composited, bg);
        if (ratio < REQUIRED - 0.05) {
          violations.push({
            selector: el.className
              ? `${el.tagName.toLowerCase()}.${String(el.className).trim().replace(/\s+/g, '.')}`
              : el.tagName.toLowerCase(),
            text: text.slice(0, 60),
            ratio: Math.round(ratio * 100) / 100,
          });
        }
      });
    });
    return violations;
  });
}

for (const route of ALL_ROUTES) {
  test(`${route} — body copy on every [data-fold] field clears 4.5:1`, async ({ page }) => {
    await page.goto(route);
    const violations = await findFieldContrastViolations(page);
    expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
  });
}
