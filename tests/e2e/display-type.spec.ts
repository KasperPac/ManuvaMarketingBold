import { test, expect } from '@playwright/test';

// Display type (MVBOLD-31, from the MANUVA-49 critique). The responsive suite
// checks that nothing scrolls sideways, and nothing did: the hero clips its
// overflow, so on five pages the headline simply stopped at the right edge of
// a phone ("Manufactu", "Manuva is whe…"). And break-word turned an over-wide
// word into "manufacturin / g". This checks the words themselves: every word
// of every display heading sits on one line and inside the screen.

const PAGES = ['/', '/features', '/pricing', '/about', '/alternatives', '/alternatives/katana', '/alternatives/mrpeasy', '/privacy', '/terms'];
const WIDTHS = [320, 360, 390, 768, 1024, 1440, 1920];

for (const path of PAGES) {
  for (const width of WIDTHS) {
    test(`display headings on ${path} keep every word whole and on screen at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const bad = await page.evaluate(() => {
        const out: string[] = [];
        document.querySelectorAll<HTMLElement>('main .disp, main h1').forEach((el) => {
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          let n: Node | null;
          while ((n = walker.nextNode())) {
            const text = n.textContent ?? '';
            // A hyphenated compound may break at its hyphen ("flat- / rate"):
            // that is typography. Any other break inside a word is the defect.
            const re = /[^\s-]+-?/g;
            let m: RegExpExecArray | null;
            while ((m = re.exec(text))) {
              const r = document.createRange();
              r.setStart(n, m.index);
              r.setEnd(n, m.index + m[0].length);
              const rects = [...r.getClientRects()].filter((x) => x.width > 0);
              const tops = new Set(rects.map((x) => Math.round(x.top)));
              if (tops.size > 1) out.push(`"${m[0]}" breaks across lines`);
              const right = Math.max(...rects.map((x) => x.right));
              const left = Math.min(...rects.map((x) => x.left));
              if (right > innerWidth + 0.5 || left < -0.5) out.push(`"${m[0]}" runs off screen (${Math.round(left)}–${Math.round(right)})`);
            }
          }
        });
        return out;
      });
      expect(bad, bad.join('; ')).toEqual([]);
    });
  }
}

test('display leading leaves room for descenders, and a highlight gets its own', async ({ page }) => {
  // At .88 the lime highlight on one line painted over the descenders of the
  // line above ("why teams" read "whv teams"), and plain lines collided too.
  await page.goto('/alternatives/katana');
  const lh = await page.evaluate(() => {
    const h1 = document.querySelector('.hero h1') as HTMLElement;
    const hl = h1.querySelector('.hl') as HTMLElement;
    const fs = parseFloat(getComputedStyle(h1).fontSize);
    return { disp: parseFloat(getComputedStyle(h1).lineHeight) / fs, hl: parseFloat(getComputedStyle(hl).lineHeight) / fs };
  });
  expect(lh.disp).toBeGreaterThanOrEqual(0.919);
  expect(lh.hl).toBeGreaterThanOrEqual(1.079);
});

test('the legal documents keep a reading column at 1920', async ({ page }) => {
  // max-width 78ch with the page gutter as padding: at 1920 the gutter is
  // 340px a side, which left the text a 303px column right of centre.
  for (const path of ['/terms', '/privacy']) {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(path);
    const m = await page.evaluate(() => {
      const p = document.querySelector('.site-doc-sub') as HTMLElement;
      const r = p.getBoundingClientRect();
      return { width: r.width, centre: r.left + r.width / 2 };
    });
    expect(m.width, `${path} text column`).toBeGreaterThan(520);
    expect(Math.abs(m.centre - 960), `${path} column centred`).toBeLessThan(120);
  }
});

test('with motion off, the home page does not scroll sideways on a phone', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
