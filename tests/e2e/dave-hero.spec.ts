import { test, expect, type Page } from '@playwright/test';

// The Dave hero (MVBOLD-29): a full-bleed claymation frame over the cobalt
// field, carrying only the tagline at the bottom and the Manuva logo, which is
// wiped onto the back wall as the room turns calm. The eyebrow, sub-copy and
// buttons sit in a band directly under the hero. The layout half of this file
// is what reduced-motion and no-JS visitors get; the scrub half covers the
// stop-motion itself.

for (const [w, h] of [[1280, 800], [1440, 900], [390, 844], [844, 390]] as const) {
  // The first frame says what Manuva is and offers Start free (MVBOLD-31,
  // MANUVA-49: a cold visitor could not tell from the first screen). The
  // sub-copy stays in the band below; nothing else joins the scene.
  test(`the first frame carries the descriptor, the tagline and Start free, at the bottom, at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    const m = await page.evaluate(() => {
      const hero = document.querySelector('.hero.dave')!;
      const h1 = hero.querySelector('h1')!.getBoundingClientRect();
      const pill = hero.querySelector('.pill') as HTMLElement | null;
      return {
        top: h1.top, vh: innerHeight, sub: hero.querySelectorAll('.sub').length,
        eyebrow: hero.querySelector('.eyebrow')?.textContent?.trim(),
        pill: pill ? { text: pill.textContent?.trim(), href: pill.getAttribute('href'), bottom: pill.getBoundingClientRect().bottom } : null,
      };
    });
    expect(m.sub, 'sub-copy belongs in the band below').toBe(0);
    expect(m.eyebrow).toBe('MRP for Shopify manufacturers');
    expect(m.pill?.text).toBe('Start free');
    expect(m.pill?.href).toBe('https://app.manuva.app/signup');
    expect(m.pill!.bottom, 'Start free is on the first screen').toBeLessThanOrEqual(m.vh);
    expect(m.top, 'the tagline sits in the lower half of the scene').toBeGreaterThan(m.vh * 0.4);
  });
}

test('the eyebrow, sub-copy and both buttons are the first thing after the hero', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const band = page.locator('.hero.dave + .hero-intro');
  await expect(band).toHaveCount(1);
  await expect(band.locator('.eyebrow').first()).toHaveText('What it does');
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
        .filter((h) => !h.closest('.cut'))
        .map((h) => Number.parseFloat(getComputedStyle(h).fontSize))),
    }));
    expect(m.h1, `h1 ${m.h1}px against h2 ${m.h2}px`).toBeGreaterThan(m.h2);
  });
}

// MVBOLD-33: on two lines the tagline covered most of the desk, where the
// room's chaos and calm show most. Wherever one line still leads the section
// headings (from 1100px, and on a landscape phone, whose headline is capped by
// its height anyway) it is one line; narrower than that it keeps two.
const oneLine = (page: Page) =>
  page.evaluate(async () => {
    await document.fonts.ready;
    const h1 = document.querySelector('.hero.dave h1')!;
    const a = h1.querySelector('.line')!.getBoundingClientRect();
    const b = h1.querySelector('.hl')!.getBoundingClientRect();
    return Math.abs((a.top + a.bottom) / 2 - (b.top + b.bottom) / 2) < a.height / 2;
  });
for (const [w, h] of [[1100, 800], [1280, 800], [1440, 900], [1920, 1080], [2560, 1440], [844, 390]] as const) {
  test(`the tagline is one line at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    expect(await oneLine(page)).toBe(true);
  });
}
for (const [w, h] of [[390, 844], [768, 1024], [1024, 768]] as const) {
  test(`the tagline keeps two lines at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    expect(await oneLine(page)).toBe(false);
  });
}

test('a portrait viewport loads the portrait frame', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const src = await page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => i.currentSrc);
  expect(src).toMatch(/\/hero\/dave\/p\.webp$/);
});

test('the video facade renders in the band straight under the hero', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await expect(page.locator('.hero-intro .site-video')).toBeVisible();
  await expect(page.locator('.hero .site-video')).toHaveCount(0);
});

// --- the scrub ---------------------------------------------------------------
//
// The scrub seeks the clip itself (every frame), fetched whole after `load`
// and played from a blob, rather than stepping a set of stills: it was picked
// in an A/B against 24 stills, 96 stills and a cross-fade, because a single
// wheel notch eases in and out instead of cutting two poses at once.

const heroScrollTo = (page: Page, fraction: number) =>
  page.evaluate((f) => {
    const el = document.querySelector('.hero.dave') as HTMLElement;
    const top = el.getBoundingClientRect().top + scrollY;
    scrollTo(0, top + (el.offsetHeight - innerHeight) * f);
  }, fraction);

const imgSrc = (page: Page) =>
  page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => i.currentSrc || i.src);

const clipReady = (page: Page, timeout = 20_000) =>
  expect(page.locator('.hero.dave')).toHaveAttribute('data-video', 'ready', { timeout });

// The time on screen, or -1 while a seek is still in flight.
const shownAt = (page: Page) =>
  page.locator('.dave-scene video').evaluate((v: HTMLVideoElement) => (v.seeking ? -1 : v.currentTime));

// The last time the scrub shows: the clip's own end, less scrub.ts's END_PAD.
const clipEnd = (page: Page) =>
  page.locator('.dave-scene video').evaluate((v: HTMLVideoElement) => v.duration - 0.02);

const fetched = (page: Page, file: string) =>
  page.evaluate((f) => performance.getEntriesByType('resource').filter((r) => r.name.endsWith(`/hero/dave/${f}`)).length, file);

test.describe('scrub, motion on', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('the hero pins and scrolling scrubs the clip', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const hero = page.locator('.hero.dave');
    await expect(hero).toHaveAttribute('data-scrub', 'pre');
    await expect(hero).toHaveAttribute('data-set', 'l');
    expect(await hero.evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThan(800 * 2);

    await clipReady(page);
    expect(await fetched(page, 'l.mp4')).toBe(1);
    await expect(page.locator('.dave-scene video')).toBeVisible();
    await heroScrollTo(page, 0.5);
    // Half the travel, with the last 10% held: 0.5 / 0.9 of the clip.
    await expect.poll(() => shownAt(page), { timeout: 5_000 }).toBeCloseTo((0.5 / 0.9) * (await clipEnd(page)), 1);
    const pinTop = await page.locator('.dave-pin').evaluate((el) => el.getBoundingClientRect().top);
    expect(Math.abs(pinTop), 'the stage is pinned mid-scrub').toBeLessThan(2);
  });

  // "1 scroll of the mouse moves 2 frames instantly. There's no ramp up or
  // ramp down" (third preview). One notch is an instant 100px jump of the
  // page; the clip has to cover it as a run of frames, not in one step.
  test('one wheel notch eases through the frames instead of jumping', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await clipReady(page);
    await heroScrollTo(page, 0.3);
    await expect.poll(async () => {
      const a = await shownAt(page);
      await page.waitForTimeout(250);
      return a >= 0 && a === (await shownAt(page));
    }, { timeout: 5_000 }).toBe(true);
    // Every seek that lands is a frame on screen; `seeked` is where each lands.
    const seen = await page.evaluate(async () => {
      const v = document.querySelector('.dave-scene video') as HTMLVideoElement;
      const t: number[] = [v.currentTime];
      const on = () => t.push(v.currentTime);
      v.addEventListener('seeked', on);
      scrollBy(0, 100);
      await new Promise((r) => setTimeout(r, 900));
      v.removeEventListener('seeked', on);
      return t;
    });
    const label = `times shown: ${seen.map((x) => x.toFixed(3)).join(',')}`;
    const travel = seen[seen.length - 1] - seen[0];
    const steps = seen.slice(1).map((x, i) => x - seen[i]);
    expect(travel, label).toBeGreaterThan(0.5);
    // Never backwards. Two seeks can land on the same time, which is not a
    // step back (it failed 1 run in 4 on exactly that).
    expect(steps.every((s) => s >= 0), `it only moves forwards; ${label}`).toBe(true);
    expect(seen.length, label).toBeGreaterThanOrEqual(6);
    expect(Math.max(...steps) / travel, `the biggest single step, as a share of the move; ${label}`).toBeLessThan(0.4);
  });

  test('the highlight lands with the calm room and leaves when scrolled back', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await clipReady(page);
    // Three-quarters through: past the calm moment (5.5s) but short of the
    // last frame. Played through to the end, the room no longer rewinds
    // (MVBOLD-37, hero-once.spec.ts).
    await heroScrollTo(page, 0.75);
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'calm', { timeout: 5_000 });
    await expect
      .poll(() => page.locator('.hero.dave .hl').evaluate((e) => getComputedStyle(e).backgroundColor))
      .toBe('rgb(200, 255, 46)');
    await heroScrollTo(page, 0);
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'pre', { timeout: 5_000 });
  });

  test('only the first frame is fetched before the page has loaded', async ({ page }) => {
    const before: string[] = [];
    let loaded = false;
    page.on('load', () => { loaded = true; });
    page.on('request', (r) => { if (!loaded && r.url().includes('/hero/dave/')) before.push(r.url()); });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    expect(before).toHaveLength(1);
    expect(before[0]).toMatch(/\/hero\/dave\/l\.webp$/);
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

  test('the descriptor and Start free fold away once the scrub starts, and return at the top', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const folds = () => page.locator('.dave-fold').evaluateAll((els) => els.map((e) => ({ h: e.getBoundingClientRect().height, vis: getComputedStyle(e).visibility })));
    expect((await folds()).every((f) => f.h > 0 && f.vis === 'visible')).toBe(true);
    await heroScrollTo(page, 0.3);
    await expect.poll(async () => (await folds()).every((f) => f.h < 1 && f.vis === 'hidden'), { timeout: 3_000 }).toBe(true);
    await heroScrollTo(page, 0);
    await expect.poll(async () => (await folds()).every((f) => f.h > 0 && f.vis === 'visible'), { timeout: 3_000 }).toBe(true);
  });

  test('the descriptor keeps 4.5:1 over the chaos frame', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: '.hero.dave .eyebrow{color:transparent!important}' });
    const r = await page.locator('.hero.dave .eyebrow').evaluate((e) => e.getBoundingClientRect().toJSON());
    const png = await page.screenshot({ clip: { x: r.x, y: r.y, width: r.width, height: r.height } });
    const { default: sharp } = await import('sharp');
    const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const lin = (c: number) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
    let worst = 0;
    for (let i = 0; i < info.width * info.height * 3; i += 3) worst = Math.max(worst, 0.2126 * lin(data[i]) + 0.7152 * lin(data[i + 1]) + 0.0722 * lin(data[i + 2]));
    expect(1.05 / (worst + 0.05), 'white descriptor against the brightest pixel under it').toBeGreaterThanOrEqual(4.5);
  });

  test('the scroll hint shows at the top and fades once the scrub starts', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const hint = page.locator('.dave-hint');
    await expect(hint).toBeVisible();
    await heroScrollTo(page, 0.2);
    await expect.poll(() => hint.evaluate((e) => Number(getComputedStyle(e).opacity))).toBeLessThan(0.05);
  });

  // MVBOLD-33: the room only tidies. It used to be repainted lime as it
  // calmed, which was too much going on for an office tidying up. The upper
  // half of the calm scene is wall; with the logo hidden, almost none of it
  // may be lime (the yellow parts bins and Dave's pencil are a sliver).
  test('the calm room keeps its natural walls', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await clipReady(page);
    await heroScrollTo(page, 1);
    await expect.poll(() => shownAt(page), { timeout: 8_000 }).toBeGreaterThan((await clipEnd(page)) - 0.1);
    await page.addStyleTag({ content: '.dave-logo{visibility:hidden!important}' });
    await page.waitForTimeout(400);
    const png = await page.screenshot({ clip: { x: 0, y: 0, width: 1280, height: 360 } });
    const { default: sharp } = await import('sharp');
    const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    let lime = 0;
    for (let i = 0; i < info.width * info.height * 3; i += 3) {
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      const mx = Math.max(r, g, b), c = mx - Math.min(r, g, b);
      if (mx === g && c / mx > 0.45 && mx > 90 && r > b) lime++;
    }
    expect(lime / (info.width * info.height), 'share of lime pixels in the upper half').toBeLessThan(0.02);
  });

  test('the logo is wiped onto the back wall as the room turns calm', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const logo = page.locator('.dave-logo');
    const clip = () => logo.evaluate((e) => getComputedStyle(e).clipPath);
    expect(await clip(), 'hidden on the chaos frames').toMatch(/^inset\(0px 100%/);
    await clipReady(page);
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
    await clipReady(page);
    expect(await fetched(page, 'p.mp4')).toBe(1);
    await heroScrollTo(page, 1);
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'calm', { timeout: 10_000 });
    const r = await page.locator('.dave-logo').evaluate((e) => e.getBoundingClientRect().toJSON());
    expect(r.top).toBeGreaterThanOrEqual(0);
    expect(r.bottom, 'in the top band of the wall').toBeLessThan(844 * 0.3);
    expect(r.left).toBeGreaterThanOrEqual(0);
    expect(r.right).toBeLessThanOrEqual(390);
  });

  // Review Focus 1
  test('a viewport that turns portrait swaps to the portrait clip', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await clipReady(page);
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-set', 'l');
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-set', 'p', { timeout: 20_000 });
    await clipReady(page);
    expect(await fetched(page, 'p.mp4')).toBe(1);
    await expect.poll(() => imgSrc(page)).toMatch(/\/hero\/dave\/p\.webp$/);
  });

  // Review Focus 2
  test('a reload mid-scrub shows the frame for that position', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await heroScrollTo(page, 0.6);
    await page.reload();
    await expect.poll(() => page.evaluate(() => scrollY), { timeout: 5_000 }).toBeGreaterThan(400);
    await clipReady(page);
    await expect.poll(() => shownAt(page), { timeout: 5_000 }).toBeGreaterThan(3);
  });

  // Review Focus 3
  test('a clip that fails to load leaves the still hero, highlight showing', async ({ page }) => {
    await page.route(/\/hero\/dave\/l\.mp4$/, (route) => route.abort());
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const hero = page.locator('.hero.dave');
    await expect(hero).not.toHaveAttribute('data-scrub', /.*/, { timeout: 10_000 });
    expect(await hero.evaluate((el) => el.getBoundingClientRect().height)).toBeLessThanOrEqual(801);
    await expect(page.locator('.dave-scene video')).toHaveCount(0);
    const img = await page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => ({
      src: i.currentSrc || i.src, complete: i.complete, w: i.naturalWidth,
    }));
    expect(img.src).toMatch(/\/l\.webp$/);
    expect(img.complete && img.w > 0, JSON.stringify(img)).toBe(true);
    // Polled: the chip fades in over 220ms from the moment the hero flattens.
    await expect
      .poll(() => page.locator('.hero.dave .hl').evaluate((e) => getComputedStyle(e).backgroundColor))
      .toBe('rgb(200, 255, 46)');
    await expect(page.locator('.dave-hint')).toBeHidden();
  });

  // Final review, finding 1: something that never arrives must not keep the
  // shared animation loop awake for the rest of the visit.
  test('the loop goes idle past the hero even when the clip never loads', async ({ page }) => {
    await page.addInitScript(() => {
      const raf = window.requestAnimationFrame.bind(window);
      (window as unknown as { __raf: number }).__raf = 0;
      window.requestAnimationFrame = (cb) => {
        (window as unknown as { __raf: number }).__raf++;
        return raf(cb);
      };
    });
    let aborted = 0;
    await page.route(/\/hero\/dave\/l\.mp4$/, (route) => { aborted++; return route.abort(); });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect.poll(() => aborted, { timeout: 15_000 }).toBe(1);
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1500);
    const a = await page.evaluate(() => (window as unknown as { __raf: number }).__raf);
    await page.waitForTimeout(1000);
    const b = await page.evaluate(() => (window as unknown as { __raf: number }).__raf);
    expect(b - a, 'animation frames requested in one idle second at the foot of the page').toBeLessThan(5);
  });

  // Final review, finding 2, for the clip: a rotation whose new clip fails
  // keeps the clip that works (cropped by object-fit) rather than dropping it.
  test('a rotation whose portrait clip fails keeps the landscape clip scrubbing', async ({ page }) => {
    await page.route(/\/hero\/dave\/p\.mp4$/, (route) => route.abort());
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await clipReady(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1500);
    const hero = page.locator('.hero.dave');
    await expect(hero).toHaveAttribute('data-video', 'ready');
    await expect(hero).toHaveAttribute('data-set', 'l');
    await heroScrollTo(page, 0.5);
    await expect.poll(() => shownAt(page), { timeout: 5_000 }).toBeGreaterThan(3);
  });

  // Final review, finding 6, and again for the tagline-only hero: the white
  // words of the tagline ("Less chaos.") sit over the bottom fade, and in the
  // calm frames the room behind them is light. Large text needs 3:1. The text
  // is hidden and every pixel under those words is measured, so the brightest
  // background they can land on is what is judged. The words' own box, so the
  // measure holds whether the tagline is one line or two (MVBOLD-33).
  for (const width of [1280, 1440, 1920, 390]) {
    test(`the tagline keeps large-text contrast over the calm room at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 900 });
      await page.goto('/');
      await clipReady(page);
      await heroScrollTo(page, 1);
      await expect.poll(() => shownAt(page), { timeout: 8_000 }).toBeGreaterThan((await clipEnd(page)) - 0.1);
      await page.addStyleTag({ content: '.hero.dave h1, .hero.dave h1 *{color:transparent!important;background:transparent!important}' });
      await page.waitForTimeout(400);
      const r = await page.evaluate(() => {
        const range = document.createRange();
        range.selectNodeContents(document.querySelector('.hero.dave h1 .line')!);
        const b = range.getBoundingClientRect();
        return { x: Math.round(b.left), y: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height) };
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
  test('Save-Data keeps the still hero and fetches no clip', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'connection', { value: { saveData: true, effectiveType: '4g' } });
    });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('load');
    await page.waitForTimeout(1500);
    expect(await fetched(page, 'l.mp4')).toBe(0);
    const hero = page.locator('.hero.dave');
    await expect(hero).not.toHaveAttribute('data-scrub', /.*/);
    expect(await hero.evaluate((el) => el.getBoundingClientRect().height)).toBeLessThanOrEqual(801);
    const bg = await page.locator('.hero.dave .hl').evaluate((e) => getComputedStyle(e).backgroundColor);
    expect(bg).toBe('rgb(200, 255, 46)');
  });

  // Review Focus 5
  test('the motion toggle flattens and restores the hero', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.locator('.site-foot .motion-toggle').click();
    await page.waitForLoadState('load');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
    const flat = await page.locator('.hero.dave').evaluate((el) => el.getBoundingClientRect().height);
    expect(flat).toBeLessThanOrEqual(800 + 1);
    await expect(page.locator('.hero.dave')).not.toHaveAttribute('data-scrub', /.*/);

    await page.locator('.site-foot .motion-toggle').click();
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
    await page.waitForTimeout(1000);
    expect(await imgSrc(page)).toMatch(/\/hero\/dave\/l\.webp$/);
    await expect(page.locator('.dave-scene video')).toHaveCount(0);
    expect(await fetched(page, 'l.mp4')).toBe(0);
    const bg = await page.locator('.hero.dave .hl').evaluate((e) => getComputedStyle(e).backgroundColor);
    expect(bg).toBe('rgb(200, 255, 46)');
    await expect(page.locator('.dave-hint')).toBeHidden();
    await expect(page.locator('.hero.dave .pill')).toBeVisible();
    await expect(page.locator('.hero.dave .eyebrow')).toBeVisible();
  });
});

test.describe('no JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the first frame, the tagline and both CTAs (in the band below) still render', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(page.locator('.dave-scene img')).toBeVisible();
    await expect(page.locator('.dave-scene video')).toHaveCount(0);
    await expect(page.locator('.hero.dave h1')).toHaveText('Less chaos. More making.');
    await expect(page.locator('.hero-intro .pill')).toHaveCount(2);
    await expect(page.locator('.dave-hint')).toBeHidden();
  });
});
