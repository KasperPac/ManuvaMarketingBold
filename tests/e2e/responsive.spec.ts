import { test, expect } from '@playwright/test';
import { ALL_ROUTES } from '../../src/site';

const WIDTHS = [375, 480, 720, 960, 1440];

for (const width of WIDTHS) {
  for (const route of ALL_ROUTES) {
    test(`${route} does not scroll horizontally at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${overflow}px of horizontal overflow`).toBeLessThanOrEqual(1);
    });
  }
}

test('the burger replaces the nav links below 960px', async ({ page }) => {
  await page.setViewportSize({ width: 720, height: 900 });
  await page.goto('/');
  await expect(page.locator('.site-burger')).toBeVisible();
  await expect(page.locator('.site-nav-links')).toBeHidden();
});

test('the nav links replace the burger above 960px', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto('/');
  await expect(page.locator('.site-nav-links')).toBeVisible();
  await expect(page.locator('.site-burger')).toBeHidden();
});

test('the pricing matrix becomes cards below 720px', async ({ page }) => {
  await page.setViewportSize({ width: 480, height: 900 });
  await page.goto('/pricing');
  await expect(page.locator('.mv-matrix')).toBeHidden();
  await expect(page.locator('.mv-matrix-cards')).toBeVisible();
});

// --- comparison table column integrity --------------------------------------
//
// The regression this guards: `display: inline-flex` on a <td> took it out of
// table layout, so the CSS table fixup algorithm folded a run of consecutive
// cells into one anonymous cell — both comparison tables rendered two columns
// under a three-column header. Every existing test asserted on markup and CSS
// text, which never changed (the <td> elements were all still there in the
// DOM); the parity gate compares extracted text, also unchanged. Only
// measuring where cells actually land on screen catches it, so this counts
// columns by computed x-position, never by counting <td> elements.
async function tableColumnReport(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const report: {
      table: string;
      row: number;
      headerCols: number;
      bodyCols: number;
      misalignedIndexes: number[];
    }[] = [];

    document.querySelectorAll('table').forEach((table, ti) => {
      const headerCells = Array.from(table.querySelectorAll('thead th'));
      const headerRects = headerCells.map((c) => c.getBoundingClientRect());
      const bodyRows = Array.from(table.querySelectorAll('tbody tr')).filter(
        // Category divider rows (colspan across the whole table) aren't a
        // real data row and have no per-column cells to align.
        (tr) => !tr.className.toLowerCase().includes('divider'),
      );

      bodyRows.forEach((tr, ri) => {
        const cells = Array.from(tr.children) as HTMLElement[];
        const rects = cells.map((c) => c.getBoundingClientRect());
        const misalignedIndexes: number[] = [];
        rects.forEach((r, i) => {
          const centerX = r.left + r.width / 2;
          const hr = headerRects[i];
          // A column that collapsed into its neighbour puts this cell's
          // centre outside the header cell it's supposed to sit under.
          if (!hr || centerX < hr.left - 1 || centerX > hr.right + 1) misalignedIndexes.push(i);
        });
        report.push({
          table: table.getAttribute('aria-label') || table.className || `table-${ti}`,
          row: ri,
          headerCols: headerRects.length,
          bodyCols: cells.length,
          misalignedIndexes,
        });
      });
    });
    return report;
  });
}

// Widened to every route, not just the two /alternatives/ pages (Task 14,
// team-lead review) — /pricing's 43-row matrix and the legal pages' own
// tables (/privacy, /terms) are the same shape of risk: a <td> with its
// display overridden takes it out of table layout just as easily there as
// on a comparison table, and nothing else in this suite would catch it.
for (const route of ALL_ROUTES) {
  test(`${route} — every table body row forms as many real columns as its header`, async ({ page }) => {
    await page.goto(route);
    const report = await tableColumnReport(page);
    const broken = report.filter((r) => r.bodyCols !== r.headerCols || r.misalignedIndexes.length > 0);
    expect(broken, JSON.stringify(broken, null, 2)).toEqual([]);
  });
}

// Five routes are known, from reading each page's own markup, to carry a
// real <table>: both /alternatives/ pages, /pricing's comparison matrix, and
// /privacy and /terms' own document tables. This guards the check above
// against silently passing everywhere because tableColumnReport stopped
// finding any tables at all (a selector typo, a markup change dropping
// <table> for a div grid, etc.) rather than because every table is healthy.
test('at least five routes carry a real <table>, matching what the source pages are known to have', async ({ page }) => {
  let totalTables = 0;
  for (const route of ALL_ROUTES) {
    await page.goto(route);
    totalTables += await page.locator('table').count();
  }
  expect(totalTables, 'total <table> elements found across all 8 routes').toBeGreaterThanOrEqual(5);
});

// --- anchor landing clearance -----------------------------------------------
//
// `--nav-h` is 88px above 960px and 64px at/below it (site.css). The sticky
// nav sits on top of the document, so a TOC jump that lands a heading exactly
// at the viewport top — rather than below the nav's own height — leaves the
// heading physically covered by the nav bar. Round 1 of this fix was
// verified by reading the CSS (`scroll-margin-top: var(--nav-h)`) and
// reasoning it must work; this measures the landed heading's real position
// against the nav's real rendered height instead.
const ANCHOR_CASES = [
  { route: '/privacy', id: 'retention' },
  { route: '/terms', id: 'termination' },
] as const;
const NAV_WIDTHS = [1280, 720] as const; // above and at/below the 960px --nav-h breakpoint

for (const { route, id } of ANCHOR_CASES) {
  for (const width of NAV_WIDTHS) {
    test(`${route} — jumping to #${id} at ${width}px clears the sticky nav`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await page.locator(`a[href="#${id}"]`).first().click();
      await expect.poll(async () => page.evaluate((hid) => {
        const nav = document.querySelector('.site-nav');
        const heading = document.getElementById(hid);
        if (!nav || !heading) return null;
        return heading.getBoundingClientRect().top - nav.getBoundingClientRect().bottom;
      }, id)).not.toBeNull();

      const clearance = await page.evaluate((hid) => {
        const nav = document.querySelector('.site-nav')!;
        const heading = document.getElementById(hid)!;
        return heading.getBoundingClientRect().top - nav.getBoundingClientRect().bottom;
      }, id);
      // Small negative tolerance for sub-pixel rounding only — the heading
      // must not be meaningfully underneath the nav.
      expect(clearance, `#${id} landed ${clearance}px from the nav's bottom edge at ${width}px`).toBeGreaterThanOrEqual(-1);
    });
  }
}
