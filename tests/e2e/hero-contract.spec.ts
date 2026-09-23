import { test, expect, type Page } from '@playwright/test';

// The UI audit of 2026-09-23 found that the six interior pages had each grown
// their own copy of the hero rules and drifted apart. Measured at 1280px they
// shipped three eyebrow display modes (flex / block / inline), five eyebrow
// gaps (32 / 24 / 32 / 20 / 2px), three heading alignments and three heading
// sizes — /alternatives had no hero panel at all and so fell through to the
// base .mv-display value, rendering its h1 at 28px against 68px everywhere
// else. Separately, every closing CTA band rendered its h2 at 88px, larger
// than each page's own h1, and "Explore further" rendered at 12px as an h2.
//
// None of that is visible to axe, to a typecheck, or to the copy-parity gate.
// It is only visible by measuring, which is what this file does. The rules
// themselves live in one place — see "the shared page-hero contract" in
// src/styles/site.css.

// Every page carrying the contract. / is deliberately excluded and asserted
// separately below.
const INTERIOR = [
  '/features',
  '/pricing',
  '/about',
  '/alternatives',
  '/alternatives/katana',
  '/alternatives/mrpeasy',
] as const;

const px = (v: string) => Number.parseFloat(v);

async function heroMetrics(page: Page) {
  return page.evaluate(() => {
    const hero = document.querySelector('main > section');
    const panel = hero?.querySelector('.mv-panel');
    const eyebrow = panel?.querySelector(':scope > .mv-eyebrow') as HTMLElement | null;
    const h1 = document.querySelector('h1') as HTMLElement | null;
    return {
      hasPanel: !!panel,
      field: panel ? getComputedStyle(panel).backgroundColor : null,
      eyebrowDisplay: eyebrow ? getComputedStyle(eyebrow).display : null,
      gap:
        eyebrow && h1
          ? Math.round(h1.getBoundingClientRect().top - eyebrow.getBoundingClientRect().bottom)
          : null,
      h1Align: h1 ? getComputedStyle(h1).textAlign : null,
      h1Size: h1 ? getComputedStyle(h1).fontSize : null,
    };
  });
}

test.describe('the shared page-hero contract', () => {
  for (const route of INTERIOR) {
    test(`${route} renders the contract, not its own hero`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(route);
      const m = await heroMetrics(page);

      // A panel carrying a real field. /alternatives shipped without one.
      expect(m.hasPanel, 'hero has an inset panel').toBe(true);
      expect(m.field, 'hero panel carries a field, not the paper background').not.toBe(
        'rgba(0, 0, 0, 0)',
      );

      // .mv-eyebrow ships display:inline with no margin; the contract makes it
      // a block and lets the panel's own grid gap do the spacing. 2px was
      // /alternatives before the fix.
      expect(m.eyebrowDisplay, 'eyebrow is a block sibling').toBe('block');
      expect(m.gap, 'eyebrow-to-h1 gap comes from the panel grid gap').toBe(24);

      expect(m.h1Align, 'headings are centred').toBe('center');
      expect(px(m.h1Size!), 'h1 is --fs-display-4').toBe(68);
    });
  }

  // The home page is the documented exception, and it is asserted rather than
  // merely commented so nobody has to guess whether it is intentional. Its
  // composition is genuinely different (badge eyebrow, split headline carrying
  // the lime mark, display lede, two CTAs, meta), and .site-hero-title's
  // width calc plus .site-hero-mark's white-space:nowrap are load-bearing
  // against the split-pill defect responsive.spec.ts pins at eight viewports.
  test('/ keeps its own larger, left-aligned hero on purpose', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');
    const m = await heroMetrics(page);
    expect(m.hasPanel).toBe(true);
    expect(px(m.h1Size!), 'home h1 is --fs-display-6').toBe(120);
    expect(m.h1Align).not.toBe('center');
  });
});

// The closing CTA band used to render at --fs-display-5 (88px), which made it
// the largest type on six of seven pages — the call to action outranking the
// page title. It is --fs-display-3 (52px) now: above the 40px section h2,
// below the 68px h1, which is the order the document outline already claims.
test.describe('heading scale', () => {
  for (const route of ['/', ...INTERIOR] as const) {
    test(`${route} — no h2 renders larger than the page's own h1`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(route);
      const offenders = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        if (!h1) return ['no h1 on the page'];
        const h1Size = Number.parseFloat(getComputedStyle(h1).fontSize);
        return [...document.querySelectorAll('main h2')]
          .map((h) => ({
            text: (h.textContent || '').trim().slice(0, 40),
            size: Number.parseFloat(getComputedStyle(h).fontSize),
          }))
          .filter((h) => h.size > h1Size)
          .map((h) => `"${h.text}" is ${h.size}px against an h1 of ${h1Size}px`);
      });
      expect(offenders, offenders.join('\n')).toEqual([]);
    });
  }

  // "Explore further" was an <h2> rendering at 12px — smaller than body copy
  // and smaller than the links beneath it, because the layout emitted it
  // without .mv-display and no fallback rule existed.
  for (const route of ['/alternatives/katana', '/alternatives/mrpeasy'] as const) {
    test(`${route} — no h2 renders smaller than body copy`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(route);
      const tooSmall = await page.evaluate(() => {
        const body = Number.parseFloat(getComputedStyle(document.body).fontSize);
        return [...document.querySelectorAll('main h2')]
          .map((h) => ({
            text: (h.textContent || '').trim().slice(0, 40),
            size: Number.parseFloat(getComputedStyle(h).fontSize),
          }))
          .filter((h) => h.size < body)
          .map((h) => `"${h.text}" is ${h.size}px against body copy at ${body}px`);
      });
      expect(tooSmall, tooSmall.join('\n')).toEqual([]);
    });
  }
});

// Nine tiles in a six-column grid rendered as two rows with three orphans in
// the second, left-aligned inside a centre-aligned section. The grid is a
// centred flex wrap now, so a short row sits under the middle of the one
// above it instead of hanging off the left edge.
test('the features index band centres a short final row', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/features');
  const geometry = await page.evaluate(() => {
    const grid = document.querySelector('.site-domain-grid') as HTMLElement;
    const tiles = [...grid.children] as HTMLElement[];
    const gridBox = grid.getBoundingClientRect();
    const tops = tiles.map((t) => Math.round(t.getBoundingClientRect().top));
    const lastTop = Math.max(...tops);
    const lastRow = tiles.filter((t) => Math.round(t.getBoundingClientRect().top) === lastTop);
    const first = lastRow[0].getBoundingClientRect();
    const last = lastRow[lastRow.length - 1].getBoundingClientRect();
    return {
      rows: new Set(tops).size,
      lastRowCount: lastRow.length,
      tileCount: tiles.length,
      // How far the last row's own centre sits from the grid's centre.
      centreOffset: Math.abs((first.left + last.right) / 2 - (gridBox.left + gridBox.right) / 2),
    };
  });
  expect(geometry.tileCount, 'nine feature areas').toBe(9);
  // Three columns at 1280px, so nine tiles fill three rows exactly.
  expect(geometry.rows).toBe(3);
  expect(geometry.lastRowCount).toBe(3);
  // Whatever the row count, a short row must be centred rather than ragged.
  expect(geometry.centreOffset, 'final row is centred in the grid').toBeLessThan(2);
});

// "No two adjacent panels share a hue" is a loud-layer rule, and a grid of
// coloured tiles can satisfy it at one column count and break it at another —
// moving this band from six columns to three put two flare tiles directly
// above one another, an adjacency the six-column layout happened to avoid.
// Checked at all three steps rather than by eye at one width.
for (const width of [1280, 900, 480]) {
  test(`the features index band has no touching same-hue tiles at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/features');
    const clashes = await page.evaluate(() => {
      const tiles = [...document.querySelectorAll('.site-domain-tile')].map((t) => {
        const r = t.getBoundingClientRect();
        return {
          label: (t.textContent || '').trim().slice(0, 28),
          bg: getComputedStyle(t).backgroundColor,
          x: Math.round(r.left),
          y: Math.round(r.top),
          right: Math.round(r.right),
          bottom: Math.round(r.bottom),
        };
      });
      const out: string[] = [];
      for (const a of tiles) {
        for (const b of tiles) {
          if (a === b || a.bg !== b.bg) continue;
          // Side by side on the same row, or stacked in the same column.
          const sameRow = a.y === b.y && Math.abs(a.right - b.x) < 40;
          const sameCol = a.x === b.x && Math.abs(a.bottom - b.y) < 40;
          if (sameRow || sameCol) out.push(`${a.label} touches ${b.label} — both ${a.bg}`);
        }
      }
      return out;
    });
    expect(clashes, clashes.join('\n')).toEqual([]);
  });
}

// The Enterprise plan card had no "/mo" suffix and no "or $X/mo billed
// monthly" line, and nothing reserved that space — so its CTA, chips, divider
// and feature list all sat ~43px above the other three cards' while all four
// cards were the same height. The four most important targets on the pricing
// page did not form a line.
test('every plan card lines its CTA up with the others', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/pricing');
  const offsets = await page.evaluate(() =>
    [...document.querySelectorAll('.site-plan')].map((card) => {
      const cta = card.querySelector('.site-plan-cta')!.getBoundingClientRect();
      return {
        name: card.querySelector('.site-plan-name')!.textContent!.trim(),
        top: Math.round(cta.top - card.getBoundingClientRect().top),
      };
    }),
  );
  expect(offsets.length).toBe(4);
  const spread = Math.max(...offsets.map((o) => o.top)) - Math.min(...offsets.map((o) => o.top));
  expect(spread, `CTA offsets: ${JSON.stringify(offsets)}`).toBeLessThanOrEqual(2);
});
