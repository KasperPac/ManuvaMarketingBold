import { test, expect, type Page } from '@playwright/test';

// The Dave hero (MVBOLD-29): a full-bleed claymation frame over the cobalt
// field, carrying only the tagline at the bottom and the Manuva logo, which is
// revealed on the lime wall as the room turns calm. The eyebrow, sub-copy and
// buttons sit in a band directly under the hero. The layout half of this file
// is what reduced-motion and no-JS visitors get; the scrub half covers the
// stop-motion itself.

for (const [w, h] of [[1280, 800], [1440, 900], [390, 844], [844, 390]] as const) {
  test(`the hero shows only the tagline, at the bottom, at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    const m = await page.evaluate(() => {
      const hero = document.querySelector('.hero.dave')!;
      const h1 = hero.querySelector('h1')!.getBoundingClientRect();
      return { top: h1.top, bottom: h1.bottom, vh: innerHeight, extra: hero.querySelectorAll('.eyebrow, .sub, .pill').length };
    });
    expect(m.extra, 'eyebrow, sub-copy or buttons still in the hero').toBe(0);
    expect(m.top, 'the tagline sits in the lower half of the scene').toBeGreaterThan(m.vh * 0.5);
    expect(m.bottom).toBeLessThanOrEqual(m.vh);
  });
}

test('the eyebrow, sub-copy and both buttons are the first thing after the hero', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const band = page.locator('.hero.dave + .hero-intro');
  await expect(band).toHaveCount(1);
  await expect(band.locator('.eyebrow').first()).toHaveText('MRP for Shopify manufacturers');
  await expect(band.locator('.sub')).toContainText('Manuva replaces the spreadsheets');
  await band.scrollIntoViewIfNeeded();
  await expect(band.locator('.pill')).toHaveText(['Start free', 'Book a demo']);
  await expect(band.locator('.pill').first()).toBeVisible();
});

const WIDTHS = [320, 375, 414, 768, 1024, 1200, 1279, 1280, 1366, 1440, 1920, 2560];
for (const width of WIDTHS) {
  test(`the headline fits its column at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const m = await page.evaluate(() => {
      const h1 = document.querySelector('.hero.dave h1') as HTMLElement;
      const hl = h1.querySelector('.hl') as HTMLElement;
      const box = h1.parentElement!.getBoundingClientRect();
      const r = hl.getBoundingClientRect();
      return { overflow: h1.scrollWidth - h1.clientWidth, hlRight: r.right, colRight: box.right, vw: innerWidth };
    });
    expect(m.overflow, 'the h1 overflows its own box').toBeLessThanOrEqual(1);
    expect(m.hlRight, '"More making." runs past its column').toBeLessThanOrEqual(m.colRight + 1);
    expect(m.hlRight, '"More making." runs off the screen').toBeLessThanOrEqual(m.vw);
  });
}

// The h1 has to stay larger than the section h2s, which run at
// clamp(64px, 6vw, 104px) from 1100px. hero-contract.spec.ts checks 1280 only;
// this checks the desktop range.
for (const width of [1280, 1366, 1440, 1920, 2560]) {
  test(`the headline still leads every section heading at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const m = await page.evaluate(() => ({
      h1: Number.parseFloat(getComputedStyle(document.querySelector('.hero.dave h1')!).fontSize),
      h2: Math.max(...[...document.querySelectorAll('main h2')]
        .filter((h) => !h.closest('.cut, .stage .panel'))
        .map((h) => Number.parseFloat(getComputedStyle(h).fontSize))),
    }));
    expect(m.h1, `h1 ${m.h1}px against h2 ${m.h2}px`).toBeGreaterThan(m.h2);
  });
}

test('a portrait viewport loads the portrait frame', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const src = await page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => i.currentSrc);
  expect(src).toMatch(/\/hero\/dave\/p\/000\.webp$/);
});

test('the video facade renders in the band straight under the hero', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await expect(page.locator('.hero-intro .site-video')).toBeVisible();
  await expect(page.locator('.hero .site-video')).toHaveCount(0);
});

// --- the scrub ---------------------------------------------------------------

const heroScrollTo = (page: Page, fraction: number) =>
  page.evaluate((f) => {
    const el = document.querySelector('.hero.dave') as HTMLElement;
    const top = el.getBoundingClientRect().top + scrollY;
    scrollTo(0, top + (el.offsetHeight - innerHeight) * f);
  }, fraction);

const imgSrc = (page: Page) =>
  page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => i.currentSrc || i.src);

const frameCount = async (page: Page) => Number(await page.locator('.hero.dave').getAttribute('data-frames'));

const framesFetched = (page: Page, set: 'l' | 'p') =>
  page.evaluate(
    (s) => performance.getEntriesByType('resource').filter((r) => r.name.includes(`/hero/dave/${s}/`)).length,
    set,
  );

test.describe('scrub, motion on', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('the hero pins and scrolling steps the frame', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const hero = page.locator('.hero.dave');
    await expect(hero).toHaveAttribute('data-scrub', 'pre');
    await expect(hero).toHaveAttribute('data-set', 'l');
    expect(await hero.evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThan(800 * 2);

    await expect.poll(() => framesFetched(page, 'l'), { timeout: 15_000 }).toBeGreaterThanOrEqual(7);
    await heroScrollTo(page, 0.5);
    await expect.poll(() => imgSrc(page), { timeout: 5_000 }).not.toMatch(/\/000\.webp$/);
    const pinTop = await page.locator('.dave-pin').evaluate((el) => el.getBoundingClientRect().top);
    expect(Math.abs(pinTop), 'the stage is pinned mid-scrub').toBeLessThan(2);
  });

  // "It jumps in clumps" (feedback on the first preview). A scroll jump used to
  // land on the target frame in a few big skips; it now plays through the
  // in-between poses, easing out as it arrives.
  test('a scroll jump plays through the in-between frames instead of skipping them', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const n = await frameCount(page);
    await expect.poll(() => framesFetched(page, 'l'), { timeout: 20_000 }).toBe(n);
    const seen = await page.evaluate(async () => {
      const img = document.querySelector('.dave-scene img') as HTMLImageElement;
      const el = document.querySelector('.hero.dave') as HTMLElement;
      const frames: number[] = [];
      const obs = new MutationObserver(() => {
        const m = (img.getAttribute('src') || '').match(/(\d{3})\.webp$/);
        if (m) frames.push(Number(m[1]));
      });
      obs.observe(img, { attributes: true, attributeFilter: ['src'] });
      scrollTo(0, (el.offsetHeight - innerHeight) * 0.25); // about a quarter of the way
      await new Promise((r) => setTimeout(r, 1500));
      obs.disconnect();
      return frames;
    });
    expect(seen.length, `frames shown: ${seen.join(',')}`).toBeGreaterThanOrEqual(5);
    for (let i = 1; i < seen.length; i++) {
      expect(seen[i] - seen[i - 1], `frames shown: ${seen.join(',')}`).toBeLessThanOrEqual(3);
    }
  });

  // "Too hectic when scrolling quickly" (second preview): a fast flick must
  // still read as stop-motion — no more than 12 new poses in any second.
  test('a fast flick through the whole hero never swaps more than 12 poses a second', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const n = await frameCount(page);
    await expect.poll(() => framesFetched(page, 'l'), { timeout: 20_000 }).toBe(n);
    const times = await page.evaluate(async () => {
      const img = document.querySelector('.dave-scene img') as HTMLImageElement;
      const el = document.querySelector('.hero.dave') as HTMLElement;
      const t: number[] = [];
      const obs = new MutationObserver(() => t.push(performance.now()));
      obs.observe(img, { attributes: true, attributeFilter: ['src'] });
      const track = el.offsetHeight - innerHeight;
      for (let i = 1; i <= 10; i++) { scrollTo(0, (track * i) / 10); await new Promise((r) => setTimeout(r, 30)); }
      await new Promise((r) => setTimeout(r, 3000));
      obs.disconnect();
      return t;
    });
    expect(times.length, 'it played through the poses').toBeGreaterThan(5);
    let worst = 0;
    for (let i = 0; i < times.length; i++) worst = Math.max(worst, times.filter((x) => x >= times[i] && x < times[i] + 1000).length);
    expect(worst, `${worst} swaps in one second`).toBeLessThanOrEqual(13);
  });

  test('the highlight lands with the calm room and leaves when scrolled back', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect.poll(() => framesFetched(page, 'l'), { timeout: 15_000 }).toBeGreaterThanOrEqual(7);
    await heroScrollTo(page, 1);
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'calm', { timeout: 5_000 });
    await expect
      .poll(() => page.locator('.hero.dave .hl').evaluate((e) => getComputedStyle(e).backgroundColor))
      .toBe('rgb(200, 255, 46)');
    await heroScrollTo(page, 0);
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'pre', { timeout: 5_000 });
  });

  test('only frame 0 is fetched before the page has loaded', async ({ page }) => {
    const before: string[] = [];
    let loaded = false;
    page.on('load', () => { loaded = true; });
    page.on('request', (r) => { if (!loaded && r.url().includes('/hero/dave/')) before.push(r.url()); });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    expect(before).toHaveLength(1);
    expect(before[0]).toMatch(/\/hero\/dave\/l\/000\.webp$/);
  });

  test('the docked header over the hero is dark ink, not a cobalt bar over the scene', async ({ page }) => {
    // The header takes the background of the first painted ancestor under it.
    // Over the Dave hero that was the section's cobalt field, hidden behind the
    // frames, so scrolling into the hero laid a blue bar across the claymation.
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await heroScrollTo(page, 0.3);
    await page.waitForTimeout(400);
    const bar = await page.locator('.site-head').evaluate((h) => ({
      dock: (h as HTMLElement).dataset.dock, bg: getComputedStyle(h).backgroundColor, ink: getComputedStyle(h).color,
    }));
    expect(bar.dock).toBe('1');
    expect(bar.bg).not.toBe('rgb(58, 94, 255)');
    expect(bar.bg).toBe('rgb(20, 20, 19)');
    expect(bar.ink).toBe('rgb(255, 255, 255)');
  });

  test('the scroll hint shows at the top and fades once the scrub starts', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const hint = page.locator('.dave-hint');
    await expect(hint).toBeVisible();
    await heroScrollTo(page, 0.2);
    await expect.poll(() => hint.evaluate((e) => Number(getComputedStyle(e).opacity))).toBeLessThan(0.05);
  });

  test('the logo is painted onto the lime wall as the room turns calm', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const logo = page.locator('.dave-logo');
    const clip = () => logo.evaluate((e) => getComputedStyle(e).clipPath);
    expect(await clip(), 'hidden on the chaos frames').toMatch(/^inset\(0px 100%/);
    await expect.poll(() => framesFetched(page, 'l'), { timeout: 20_000 }).toBeGreaterThanOrEqual(7);
    await heroScrollTo(page, 1);
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'calm', { timeout: 10_000 });
    await expect.poll(clip, { timeout: 3_000 }).toMatch(/^(none|inset\(0px\))$/);
    const r = await logo.evaluate((e) => e.getBoundingClientRect().toJSON());
    expect(r.left, 'on the right-hand wall').toBeGreaterThan(1280 * 0.5);
    expect(r.top + r.height / 2, 'in the upper part of the room').toBeLessThan(800 * 0.45);
    expect(r.width, 'big enough to read').toBeGreaterThan(220);
  });

  test('on a phone the logo sits at the top of the wall above Dave', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect.poll(() => framesFetched(page, 'p'), { timeout: 20_000 }).toBeGreaterThanOrEqual(7);
    await heroScrollTo(page, 1);
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'calm', { timeout: 10_000 });
    const r = await page.locator('.dave-logo').evaluate((e) => e.getBoundingClientRect().toJSON());
    expect(r.top).toBeGreaterThanOrEqual(0);
    expect(r.bottom, 'in the top band of the wall').toBeLessThan(844 * 0.3);
    expect(r.left).toBeGreaterThanOrEqual(0);
    expect(r.right).toBeLessThanOrEqual(390);
  });

  // Review Focus 1
  test('a viewport that turns portrait swaps to the portrait set', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-set', 'l');
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-set', 'p', { timeout: 5_000 });
    await expect.poll(() => imgSrc(page)).toMatch(/\/hero\/dave\/p\//);
  });

  // Review Focus 2
  test('a reload mid-scrub shows the frame for that position', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await heroScrollTo(page, 0.6);
    await page.reload();
    await expect.poll(() => page.evaluate(() => scrollY), { timeout: 5_000 }).toBeGreaterThan(400);
    await expect.poll(() => imgSrc(page), { timeout: 15_000 }).not.toMatch(/\/000\.webp$/);
  });

  // Review Focus 3
  test('a frame that fails to load never leaves a broken image', async ({ page }) => {
    await page.route(/\/hero\/dave\/l\/(?!000)\d{3}\.webp$/, (route) => route.abort());
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForTimeout(1500);
    await heroScrollTo(page, 0.7);
    await page.waitForTimeout(800);
    const img = await page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => ({
      src: i.currentSrc || i.src, complete: i.complete, w: i.naturalWidth,
    }));
    expect(img.src).toMatch(/\/000\.webp$/);
    expect(img.complete && img.w > 0, JSON.stringify(img)).toBe(true);
  });

  // Final review, finding 1: a frame that never arrives must not keep the
  // shared animation loop awake. Past the hero the scrub wants frame 47
  // forever; if 47 failed, "waiting for it" pinned the loop at 60Hz for the
  // rest of the visit.
  test('the loop goes idle past the hero even when the last frame never loads', async ({ page }) => {
    await page.addInitScript(() => {
      const raf = window.requestAnimationFrame.bind(window);
      (window as unknown as { __raf: number }).__raf = 0;
      window.requestAnimationFrame = (cb) => {
        (window as unknown as { __raf: number }).__raf++;
        return raf(cb);
      };
    });
    let aborted = 0;
    await page.route(/\/hero\/dave\/l\/(?!000)\d{3}\.webp$/, (route) => { aborted++; return route.abort(); });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const n = await frameCount(page);
    await expect.poll(() => aborted, { timeout: 15_000 }).toBeGreaterThanOrEqual(n - 1);
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    const a = await page.evaluate(() => (window as unknown as { __raf: number }).__raf);
    await page.waitForTimeout(1000);
    const b = await page.evaluate(() => (window as unknown as { __raf: number }).__raf);
    expect(b - a, 'animation frames requested in one idle second at the foot of the page').toBeLessThan(5);
  });

  // Final review, finding 2: the new set's first frame goes through the same
  // decode guard as every other frame, so a failed fetch after a rotation
  // leaves the last good frame up (cropped by object-fit) instead of a
  // broken-image icon.
  test('a rotation whose portrait frames all fail keeps the last good frame up', async ({ page }) => {
    await page.route(/\/hero\/dave\/p\/\d{3}\.webp$/, (route) => route.abort());
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-set', 'l');
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-set', 'p', { timeout: 5_000 });
    await page.waitForTimeout(1500);
    const img = await page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => ({
      src: i.currentSrc || i.src, complete: i.complete, w: i.naturalWidth,
    }));
    expect(img.complete && img.w > 0, JSON.stringify(img)).toBe(true);
    expect(img.src).toMatch(/\/hero\/dave\/l\//);
  });

  // Final review, finding 6, and again for the tagline-only hero: the white
  // first line of the tagline ("Less chaos.") sits over the bottom fade, and
  // in the calm frames the room behind it is lime. Large text needs 3:1. The
  // text is hidden and every pixel under that line is measured, so the
  // brightest background it can land on is what is judged.
  for (const width of [1280, 1440, 1920, 390]) {
    test(`the tagline keeps large-text contrast over the calm room at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 900 });
      await page.goto('/');
      const set = width < 600 ? 'p' : 'l';
      const n = Number(await page.locator('.hero.dave').getAttribute('data-frames'));
      await expect.poll(() => framesFetched(page, set), { timeout: 20_000 }).toBe(n);
      await heroScrollTo(page, 1);
      await expect.poll(() => imgSrc(page), { timeout: 8_000 }).toMatch(new RegExp(`/${String(n - 1).padStart(3, '0')}\\.webp$`));
      await page.addStyleTag({ content: '.hero.dave h1, .hero.dave h1 *{color:transparent!important;background:transparent!important}' });
      await page.waitForTimeout(400);
      const r = await page.evaluate(() => {
        const h1 = document.querySelector('.hero.dave h1')!.getBoundingClientRect();
        const hl = document.querySelector('.hero.dave h1 .hl')!.getBoundingClientRect();
        return { x: Math.round(h1.left), y: Math.round(h1.top), w: Math.round(hl.width), h: Math.round(hl.top - h1.top) };
      });
      const png = await page.screenshot({ clip: { x: r.x, y: r.y, width: r.w, height: r.h } });
      const { default: sharp } = await import('sharp');
      const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
      const lin = (c: number) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
      let worst = 0;
      for (let i = 0; i < info.width * info.height * 3; i += 3) {
        worst = Math.max(worst, 0.2126 * lin(data[i]) + 0.7152 * lin(data[i + 1]) + 0.0722 * lin(data[i + 2]));
      }
      expect(1.05 / (worst + 0.05), 'white tagline against the brightest pixel under it').toBeGreaterThanOrEqual(3);
    });
  }

  // Review Focus 4
  test('Save-Data stops after the coarse pass', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'connection', { value: { saveData: true, effectiveType: '4g' } });
    });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    // Every eighth frame plus the last: 0, 8, 16, 23 for 24 frames.
    const n = await frameCount(page);
    const coarse = Math.ceil(n / 8) + ((n - 1) % 8 === 0 ? 0 : 1);
    await expect.poll(() => framesFetched(page, 'l'), { timeout: 15_000 }).toBe(coarse);
    await page.waitForTimeout(1500);
    expect(await framesFetched(page, 'l')).toBe(coarse);
  });

  // Review Focus 5
  test('the motion toggle flattens and restores the hero', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.locator('.motion-toggle').click();
    await page.waitForLoadState('load');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
    const flat = await page.locator('.hero.dave').evaluate((el) => el.getBoundingClientRect().height);
    expect(flat).toBeLessThanOrEqual(800 + 1);
    await expect(page.locator('.hero.dave')).not.toHaveAttribute('data-scrub', /.*/);

    await page.locator('.motion-toggle').click();
    await page.waitForLoadState('load');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'pre');
  });
});

test.describe('reduced motion', () => {
  // page.emulateMedia, not test.use({ reducedMotion }): the `use` option does
  // not reach matchMedia in this setup (it reported false), which is why
  // motion-toggle.spec.ts emulates per page too.
  test('the hero is one still screen with the highlight showing', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const hero = page.locator('.hero.dave');
    expect(await hero.evaluate((el) => el.getBoundingClientRect().height)).toBeLessThanOrEqual(801);
    await expect(hero).not.toHaveAttribute('data-scrub', /.*/);
    await page.evaluate(() => scrollTo(0, 300));
    await page.waitForTimeout(500);
    expect(await imgSrc(page)).toMatch(/\/hero\/dave\/l\/000\.webp$/);
    expect(await framesFetched(page, 'l')).toBe(1);
    const bg = await page.locator('.hero.dave .hl').evaluate((e) => getComputedStyle(e).backgroundColor);
    expect(bg).toBe('rgb(200, 255, 46)');
    await expect(page.locator('.dave-hint')).toBeHidden();
  });
});

test.describe('no JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('frame 0, the tagline and both CTAs (in the band below) still render', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(page.locator('.dave-scene img')).toBeVisible();
    await expect(page.locator('.hero.dave h1')).toHaveText('Less chaos. More making.');
    await expect(page.locator('.hero-intro .pill')).toHaveCount(2);
    await expect(page.locator('.dave-hint')).toBeHidden();
  });
});
