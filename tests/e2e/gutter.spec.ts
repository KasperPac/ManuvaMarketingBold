import { test, expect } from '@playwright/test';
import { ALL_ROUTES } from '../../src/site';

// Twice now a block has shipped flush against the viewport edge, and both
// times it was the same cause: a section that is full-bleed on purpose gives
// the gutter to its children, so anything added as a new child gets no
// padding at all and sits at x=0. It is invisible in review at 1440 if you
// are looking at the section that is correct, and obvious the moment anyone
// looks at the one that is not.
//
// The rule: nothing that carries text starts at the page edge. Asserted
// against the header logo's own left edge, which is the gutter every page
// already agrees on, rather than a hardcoded number that would need changing
// with --page-max.
const WIDTHS = [1440, 1920] as const;

for (const route of ALL_ROUTES) {
  for (const width of WIDTHS) {
    test(`${route} — no text sits on the page edge at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(route);
      await page.waitForTimeout(250);

      const bad = await page.evaluate(() => {
        const logo = document.querySelector('.site-head .mark');
        const gutter = logo ? logo.getBoundingClientRect().left : 48;
        const out: string[] = [];
        document.querySelectorAll('main h1, main h2, main h3, main p, main li').forEach((el) => {
          const text = (el.textContent || '').trim();
          if (!text) return;
          const cs = getComputedStyle(el as HTMLElement);
          if (cs.visibility === 'hidden' || cs.display === 'none') return;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) return;
          // A pinned panel's own copy is inset by its panel, and anything
          // deliberately centred is out of scope — this is about the left
          // edge of ordinary left-aligned text.
          if (cs.textAlign === 'center') return;
          if (r.left < gutter - 4) {
            out.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]} ` +
                     `at ${Math.round(r.left)}px (gutter ${Math.round(gutter)}px): "${text.slice(0, 44)}"`);
          }
        });
        return [...new Set(out)].slice(0, 8);
      });

      expect(bad, bad.join('\n')).toEqual([]);
    });
  }
}
