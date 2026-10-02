import { test, expect, type Page } from '@playwright/test';

// Rotating words (MVBOLD-36). Manufacturing is one of the trades Manuva
// serves, so the tagline's verb ("More making / selling / creating /
// crafting") and the trade named on the page rotate on a timer. Only the
// screen rotates: the markup, the accessible name and motion-off visitors
// keep the sentence as written, and no rotation may move the layout.
//
// The rotation runs on setInterval/setTimeout, requestAnimationFrame and
// performance.now, which page.clock drives. An installed clock still flows
// in real time, so open() pauses it after load: from then on it moves only
// with runFor, and next() steps the 400ms ticks until the word changes.

const word = (page: Page, sel: string) => page.locator(sel).evaluate((e) => (e as HTMLElement).dataset.word ?? e.textContent?.trim());

async function open(page: Page, path: string) {
  await page.clock.install();
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
  await page.clock.pauseAt((await page.evaluate(() => Date.now())) + 50);
}

async function next(page: Page, sel: string) {
  const before = await word(page, sel);
  for (let t = 0; t < 4000; t += 400) {
    await page.clock.runFor(400);
    const w = await word(page, sel);
    if (w !== before) {
      // Past the swap's own timers, then its CSS transition in real time.
      await page.clock.runFor(400);
      await page.waitForTimeout(400);
      return w;
    }
  }
  return before;
}

test.describe('motion on', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('the /features headline cycles the trades in order and back', async ({ page }) => {
    await open(page, '/features');
    const r = '.hero h1 [data-rotate]';
    expect(await word(page, r)).toBe('manufacturing');
    for (const w of ['dropshipping', 'salon', 'product', 'manufacturing']) {
      expect(await next(page, r)).toBe(w);
    }
  });

  test('a word holds for over two seconds before it turns', async ({ page }) => {
    await open(page, '/features');
    const r = '.hero h1 [data-rotate]';
    await next(page, r);
    await page.clock.runFor(2000);
    expect(await word(page, r)).toBe('dropshipping');
  });

  test('screen readers, copy and indexing keep the sentence as written while the screen rotates', async ({ page }) => {
    await open(page, '/features');
    expect(await next(page, '.hero h1 [data-rotate]')).toBe('dropshipping');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveAccessibleName('Everything you need to run manufacturing operations');
    // The rendered page text: what a copy takes and what a search engine that
    // runs scripts reads. A rotated word is drawn, never written.
    expect((await h1.evaluate((e) => e.textContent))!.replace(/\s+/g, ' ').trim()).toBe('Everything you need to run manufacturing operations');
  });

  test('the footer rotates only once it is on screen', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await open(page, '/pricing');
    const r = '.site-foot .legal [data-rotate]';
    await page.clock.runFor(8000);
    expect(await word(page, r), 'off screen, it holds').toBe('Manufacturing');
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    expect(await next(page, r)).toBe('Dropshipping');
  });

  // Real time: the hero's calm moment depends on the clip loading and
  // seeking, which a fake clock would stall.
  test('the tagline\'s verb waits for the calm room, cycles, and resets when the room turns back', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const hero = page.locator('.hero.dave');
    const r = '.hero.dave h1 [data-rotate]';
    await expect(hero).toHaveAttribute('data-video', 'ready', { timeout: 20_000 });
    await page.waitForTimeout(3500);
    expect(await word(page, r), 'no rotation over the chaos').toBe('making');
    await page.evaluate(() => {
      const el = document.querySelector('.hero.dave') as HTMLElement;
      scrollTo(0, el.getBoundingClientRect().top + scrollY + el.offsetHeight - innerHeight);
    });
    await expect(hero).toHaveAttribute('data-scrub', 'calm', { timeout: 10_000 });
    await expect.poll(() => word(page, r), { timeout: 5_000 }).toBe('selling');
    await page.evaluate(() => scrollTo(0, 0));
    await expect(hero).toHaveAttribute('data-scrub', 'pre', { timeout: 10_000 });
    await expect.poll(() => word(page, r), { timeout: 2_000 }).toBe('making');
  });

  // No rotation may move anything: a shorter trade must not pull the next
  // words up a line, and a longer one must not push a line down. Measured
  // after each swap has settled.
  const SPOTS = [
    { name: 'home eyebrow', path: '/', rot: '.hero.dave .eyebrow [data-rotate]', boxes: ['.hero.dave .eyebrow', '.hero.dave h1'] },
    { name: 'features headline', path: '/features', rot: '.hero h1 [data-rotate]', boxes: ['.hero h1', '.hero .sub'] },
    { name: 'about headline', path: '/about', rot: '.hero h1 [data-rotate]', boxes: ['.hero h1', '.hero .sub'] },
    { name: 'footer tagline', path: '/pricing', rot: '.site-foot .legal [data-rotate]', boxes: ['.site-foot .legal'], bottom: true },
  ];
  for (const [w, h] of [[320, 700], [390, 844], [768, 1024], [1440, 900]] as const) {
    for (const s of SPOTS) {
      test(`the ${s.name} holds its layout through every word at ${w}px`, async ({ page }) => {
        await page.setViewportSize({ width: w, height: h });
        await open(page, s.path);
        if (s.bottom) await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
        const boxes = () => page.evaluate((sels) => sels.map((q) => {
          const r = document.querySelector(q)!.getBoundingClientRect();
          return `${Math.round(r.top)}/${Math.round(r.height)}`;
        }), s.boxes);
        await page.clock.runFor(400);
        const first = await boxes();
        const seen = [await word(page, s.rot)];
        for (let i = 0; i < 4; i++) {
          seen.push(await next(page, s.rot));
          expect(await boxes(), `${s.name} with "${seen.at(-1)}"`).toEqual(first);
          expect(await page.evaluate(() => document.documentElement.scrollWidth), 'no sideways scroll').toBeLessThanOrEqual(w);
        }
        expect(new Set(seen).size, `words seen: ${seen.join(', ')}`).toBe(4);
      });
    }
  }
});

test('with motion off nothing rotates', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.install();
  await page.goto('/features');
  await page.clock.runFor(13_000);
  const r = page.locator('.hero h1 [data-rotate]');
  await expect(r).toHaveText('manufacturing');
  expect(await r.evaluate((e) => e.querySelectorAll('.rot-face').length)).toBe(0);
});

// The tagline is sized for its widest verb, so no verb overflows its column
// or, from 1100px, breaks the one line. Forced into the markup with motion off.
for (const width of [320, 375, 390, 768, 1024, 1100, 1280, 1440, 1920]) {
  test(`every verb fits the tagline at ${width}px`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const fits = await page.evaluate(() => {
      const h1 = document.querySelector('.hero.dave h1') as HTMLElement;
      const rot = h1.querySelector('[data-rotate]') as HTMLElement;
      const col = h1.parentElement!.getBoundingClientRect();
      return rot.dataset.rotate!.split('|').map((w) => {
        rot.textContent = w;
        const hl = h1.querySelector('.hl')!.getBoundingClientRect();
        const line = h1.querySelector('.line')!.getBoundingClientRect();
        const oneLine = Math.abs((line.top + line.bottom) / 2 - (hl.top + hl.bottom) / 2) < line.height / 2;
        return { w, ok: h1.scrollWidth <= h1.clientWidth + 1 && hl.right <= col.right + 1 && hl.right <= innerWidth, oneLine };
      });
    });
    for (const f of fits) {
      expect(f.ok, `"More ${f.w}." overflows`).toBe(true);
      expect(f.oneLine, `"More ${f.w}." at ${width}px`).toBe(width >= 1100);
    }
  });
}
