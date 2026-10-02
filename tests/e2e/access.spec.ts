import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Brand rules and access (MVBOLD-31, from the MANUVA-49 critique: UI-7,
// UI-10, UX-7, UX-8, UX-11).

const LIME = 'rgb(200, 255, 46)';

test('the domain headings on /features are in the accessibility tree before they are scrolled to', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/features');
  await page.waitForTimeout(400);
  const vis = await page.locator('.cut h2').evaluateAll((hs) => hs.map((h) => getComputedStyle(h).visibility));
  expect(vis.length).toBe(6);
  expect(vis.every((v) => v === 'visible'), vis.join(',')).toBe(true);
});

// The home domains are tiles that are themselves fields, on paper (MVBOLD-34).
// A ring drawn outside a tile would sit on paper in the tile's own --ring,
// which is white on cobalt and violet: invisible. The ring goes inside, on
// the field it was chosen for.
test('a focused home domain tile shows a ring inside it, in its field\'s ring colour', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const tiles = page.locator('.domains .tile');
  expect(await tiles.count()).toBe(6);
  await tiles.first().focus();
  await page.keyboard.press('Shift+Tab');
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    const t = tiles.nth(i);
    await expect(t).toBeFocused();
    const m = await t.evaluate((e) => {
      const cs = getComputedStyle(e);
      return { style: cs.outlineStyle, width: parseFloat(cs.outlineWidth), offset: parseFloat(cs.outlineOffset), color: cs.outlineColor, field: [...e.classList].find((c) => c.startsWith('mv-field-')) };
    });
    expect(m.style, `tile ${i}`).not.toBe('none');
    expect(m.width, `tile ${i}`).toBeGreaterThanOrEqual(2);
    expect(m.offset + m.width, `tile ${i}: the ring is inside the tile`).toBeLessThanOrEqual(0);
    const white = m.field === 'mv-field-cobalt' || m.field === 'mv-field-violet';
    expect(m.color, `tile ${i} (${m.field})`).toBe(white ? 'rgb(255, 255, 255)' : 'rgb(20, 20, 19)');
  }
});

test('lime is never text: footer headings, the current drawer item, the billing saving', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/pricing');
  const colours = await page.evaluate(() => ({
    foot: [...document.querySelectorAll('.site-foot .cols .eyebrow')].map((e) => getComputedStyle(e).color),
    drawer: [...document.querySelectorAll('#drawer a[aria-current]')].map((e) => getComputedStyle(e).color),
    toggle: [...document.querySelectorAll('.toggle small')].map((e) => getComputedStyle(e).color),
  }));
  for (const [where, list] of Object.entries(colours)) {
    expect(list.length, `${where} not found`).toBeGreaterThan(0);
    for (const c of list) expect(c, where).not.toBe(LIME);
  }
});

test('a focused plan button on a paper card shows an ink ring, not a white one', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/pricing');
  const btn = page.locator('.plan .pill').first();
  await btn.focus();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Tab');
  const ring = await btn.evaluate((b) => getComputedStyle(b).outlineColor);
  expect(ring).toBe('rgb(20, 20, 19)');
});

for (const path of ['/', '/pricing', '/alternatives', '/alternatives/katana', '/alternatives/mrpeasy', '/privacy', '/terms']) {
  test(`${path} at 390: no empty table headers, and every scroller takes focus`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(path);
    const r = await new AxeBuilder({ page }).withRules(['empty-table-header', 'scrollable-region-focusable']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
}

test('the motion switch is in the header from 721 up and in the drawer below', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await expect(page.locator('.site-head .motion-toggle')).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.burger').click();
  await expect(page.locator('#drawer .motion-toggle')).toBeVisible();
  await expect(page.locator('#drawer .motion-toggle')).toHaveAttribute('aria-pressed', /true|false/);
});
