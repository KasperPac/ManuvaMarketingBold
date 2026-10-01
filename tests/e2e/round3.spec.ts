import { test, expect } from '@playwright/test';

// The UI critic's second pass (MVBOLD-31): what still kept UI under 85.

const toCalm = async (page: import('@playwright/test').Page) => {
  await page.goto('/');
  await page.waitForSelector('.hero.dave[data-video="ready"]', { timeout: 20_000 });
  await page.evaluate(() => { const el = document.querySelector('.hero.dave') as HTMLElement; scrollTo(0, el.offsetHeight - innerHeight); });
  await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'calm', { timeout: 10_000 });
  await page.waitForTimeout(900);
};

// The logo is the payoff of the scrub. On 4:3 and 5:4 screens the scene's
// crop cut it ("Manuv"), and on portrait tablets it sat above the screen.
for (const [w, h] of [[1024, 768], [1280, 1024], [1440, 900], [1920, 1080], [768, 1024], [820, 1180], [390, 844]] as const) {
  test(`the logo lands whole and under the header at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await toCalm(page);
    const r = await page.locator('.dave-logo').evaluate((e) => e.getBoundingClientRect().toJSON());
    expect(r.left, 'left edge').toBeGreaterThanOrEqual(0);
    expect(r.right, 'right edge').toBeLessThanOrEqual(w);
    expect(r.top, 'below the header bar').toBeGreaterThanOrEqual(w > 720 ? 76 : 64);
  });
}

test('/about "One system…" heading: room between its lines and above its body', async ({ page }) => {
  for (const w of [1440, 1024, 390]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('/about');
    const m = await page.locator('h2', { hasText: 'One system covering' }).evaluate((h) => {
      const fs = parseFloat(getComputedStyle(h).fontSize);
      const body = h.closest('.split')!.querySelector('.sub')!.getBoundingClientRect();
      return { lh: parseFloat(getComputedStyle(h).lineHeight) / fs, gap: body.top - h.getBoundingClientRect().bottom };
    });
    expect(m.lh, `line height at ${w}`).toBeGreaterThanOrEqual(0.979);
    if (w < 1100) expect(m.gap, `gap above the body at ${w}`).toBeGreaterThanOrEqual(24);
  }
});

for (const path of ['/alternatives/katana', '/alternatives/mrpeasy']) {
  test(`${path}: the headline leaves the sub-copy and Start free in the first screen at 1440`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path);
    const bottom = await page.locator('main > section.hero .pill').first().evaluate((e) => e.getBoundingClientRect().bottom);
    expect(bottom).toBeLessThanOrEqual(900);
  });
}

test('/mrpeasy at 390: the seat table headers keep their words whole', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/alternatives/mrpeasy');
  const broken = await page.locator('.stable .r.h').first().evaluate((row) => {
    const out: string[] = [];
    row.querySelectorAll('.eyebrow').forEach((el) => {
      const n = el.firstChild!; const t = n.textContent ?? ''; const re = /\S+/g; let m;
      while ((m = re.exec(t))) {
        const r = document.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
        const rects = [...r.getClientRects()].filter((x) => x.width > 0);
        if (new Set(rects.map((x) => Math.round(x.top))).size > 1) out.push(m[0]);
      }
    });
    return out;
  });
  expect(broken).toEqual([]);
});

for (const w of [1440, 390]) {
  test(`short panel lines do not leave one word alone at ${w}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: 900 });
    for (const path of ['/features', '/']) {
      await page.goto(path);
      const lone = await page.locator('.cut .pline, .stage .panel .pline').evaluateAll((ps) => ps.filter((p) => {
        const n = p.firstChild!; const t = (n.textContent ?? '').trimEnd();
        const words = [...t.matchAll(/\S+/g)];
        if (words.length < 2) return false;
        const top = (m: RegExpMatchArray) => { const r = document.createRange(); r.setStart(n, m.index!); r.setEnd(n, m.index! + m[0].length); return Math.round(r.getClientRects()[0].top); };
        return top(words[words.length - 1]) !== top(words[words.length - 2]);
      }).map((p) => p.textContent));
      expect(lone, `${path}: ${lone.join(' | ')}`).toEqual([]);
    }
  });
}

test('the header Start free never turns its text lime on hover', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/pricing');
  await page.locator('.head-cta').hover();
  await page.waitForTimeout(300);
  expect(await page.locator('.head-cta').evaluate((e) => getComputedStyle(e).color)).not.toBe('rgb(200, 255, 46)');
});

test('the band under the hero does not repeat the hero\'s eyebrow', async ({ page }) => {
  await page.goto('/');
  const hero = await page.locator('.hero.dave .eyebrow').textContent();
  const band = await page.locator('.hero-intro .eyebrow').first().textContent();
  expect(band?.trim()).not.toBe(hero?.trim());
});

test('the video poster has no dark line along its top edge', async ({ request }) => {
  const buf = await (await request.get('/video/dave-ad-scene.jpg')).body();
  const { default: sharp } = await import('sharp');
  const { data, info } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  const rowLum = (y: number) => {
    let s = 0;
    for (let x = 0; x < info.width; x++) { const i = (y * info.width + x) * info.channels; s += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]; }
    return s / info.width;
  };
  expect(rowLum(0), 'top row against row 12').toBeGreaterThan(rowLum(12) - 25);
});
