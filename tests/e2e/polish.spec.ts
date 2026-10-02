import { test, expect, type Page } from '@playwright/test';

// Polish (MVBOLD-31, from the MANUVA-49 critique: UI-13, UI-14, UI-15,
// UI-17, UI-19, UI-20).

const hoverStyle = async (page: Page, sel: string) => {
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  const before = await el.evaluate((e) => { const s = getComputedStyle(e); return { bg: s.backgroundColor, color: s.color, t: s.transform }; });
  await el.hover();
  await page.waitForTimeout(300);
  const after = await el.evaluate((e) => { const s = getComputedStyle(e); return { bg: s.backgroundColor, color: s.color, t: s.transform }; });
  return { before, after };
};

test('an outline button visibly changes on hover', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const { before, after } = await hoverStyle(page, '.hero-intro .pill.ghost');
  expect(after.bg, 'outline button fills on hover').not.toBe(before.bg);
});

test('a filled button lifts on hover and keeps its own ink', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const { before, after } = await hoverStyle(page, '.hero-intro .pill:not(.ghost)');
  expect(after.t, 'filled button lifts').not.toBe(before.t);
  expect(after.color, 'the design system\'s a:hover must not repaint its text').toBe(before.color);
});

test('header links on a dark hero keep the header ink on hover', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/features');
  const { before, after } = await hoverStyle(page, '.links a[href="/pricing"]');
  expect(after.color).toBe(before.color);
});

test('the band under the home hero: columns top-aligned, a gap when stacked, an ink play button', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const eyebrows = await page.locator('.hero-intro .eyebrow').evaluateAll((es) => es.map((e) => Math.round(e.getBoundingClientRect().top)));
  expect(Math.abs(eyebrows[0] - eyebrows[1]), `eyebrows at ${eyebrows.join(' and ')}`).toBeLessThanOrEqual(2);
  const play = await page.locator('.hero-intro .site-video-play').evaluate((b) => getComputedStyle(b).backgroundColor);
  expect(play, 'lime play button on the lime end card').not.toBe('rgb(200, 255, 46)');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const gap = await page.evaluate(() => {
    const ctas = document.querySelector('.hero-intro-ctas')!.getBoundingClientRect();
    const media = document.querySelector('.hero-intro .lead-media')!.getBoundingClientRect();
    return media.top - ctas.bottom;
  });
  expect(gap, 'space between the buttons and the video when stacked').toBeGreaterThanOrEqual(32);
});

test('the video poster is not the hero\'s own end frame', async ({ page }) => {
  await page.goto('/');
  const src = await page.locator('.hero-intro .site-video-poster').getAttribute('src');
  expect(src).not.toBe('/video/dave-ad-poster.jpg');
});

test('the comparison pages keep one section rhythm', async ({ page }) => {
  // Two sections had inline padding-top of 8px and 24px against ~100px
  // everywhere else, so their headings sat 17px and 27px under the rule.
  for (const path of ['/alternatives/katana', '/alternatives/mrpeasy']) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);
    const tops = await page.locator('main > section.sec').evaluateAll((ss) => ss.map((s) => parseFloat(getComputedStyle(s).paddingTop)));
    expect(Math.min(...tops), `${path} section top padding`).toBeGreaterThanOrEqual(64);
  }
});

test('the contact card reads as a card: labels in one column, values in another', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/about');
  const xs = await page.locator('.contact-card .prow').evaluateAll((rows) => rows.map((r) => {
    const [k, v] = r.children as unknown as HTMLElement[];
    return { k: Math.round(k.getBoundingClientRect().left), v: Math.round(v.getBoundingClientRect().left) };
  }));
  expect(new Set(xs.map((x) => x.v)).size, `value columns at ${xs.map((x) => x.v).join(', ')}`).toBe(1);
});

test('/mrpeasy: the seat table headers do not collide on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/alternatives/mrpeasy');
  const overlaps = await page.locator('.stable .r.h').first().evaluate((row) => {
    const rs = [...row.children].map((c) => {
      const range = document.createRange(); range.selectNodeContents(c);
      return range.getBoundingClientRect();
    });
    let n = 0;
    for (let i = 1; i < rs.length; i++) if (rs[i].left < rs[i - 1].right - 1 && rs[i].top < rs[i - 1].bottom && rs[i].bottom > rs[i - 1].top) n++;
    return n;
  });
  expect(overlaps).toBe(0);
});

test('the share image is the current brand, 1200x630', async ({ request }) => {
  const res = await request.get('/og-image.png');
  expect(res.ok()).toBe(true);
  const { default: sharp } = await import('sharp');
  const buf = await res.body();
  const meta = await sharp(buf).metadata();
  expect([meta.width, meta.height]).toEqual([1200, 630]);
  // The old card was a grey dotted panel; the new one is the lime calm room.
  const { dominant } = await sharp(buf).stats();
  expect(dominant.g, 'dominant colour is the lime room').toBeGreaterThan(200);
  expect(dominant.b, 'dominant colour is the lime room, not grey').toBeLessThan(120);
});
