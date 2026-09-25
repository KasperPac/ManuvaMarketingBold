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
// The contract itself was rebuilt with the site (MVBOLD-17). It is no longer
// "an inset .mv-panel carrying a field, centred, at 68px" — every page now
// opens on a full-bleed field hero with the display scale, left-aligned. The
// thing this file protects is unchanged: the interior pages do not each grow
// their own hero and drift apart. Only the shape being asserted moved.
//
// /about and /alternatives are still on the pre-rebuild components; the user
// is rebuilding them separately. They are held to the part of the contract
// that must be true of any hero (it does not collapse to body scale) and not
// to the part that depends on the new markup. Replacing site.css had already
// dropped them to a 28px h1 — the original defect, reintroduced — which is
// why they are listed rather than skipped.
const REBUILT = [
  '/features',
  '/pricing',
  '/alternatives/katana',
  '/alternatives/mrpeasy',
] as const;
const PENDING_REBUILD = ['/about', '/alternatives'] as const;

const px = (v: string) => Number.parseFloat(v);

async function heroMetrics(page: Page) {
  return page.evaluate(() => {
    const hero = document.querySelector('main > section');
    const h1 = document.querySelector('h1') as HTMLElement | null;
    const eyebrow = hero?.querySelector(':scope > .eyebrow, :scope > .mv-eyebrow') as HTMLElement | null;
    return {
      heroClass: hero ? (hero as HTMLElement).className : null,
      field: hero ? getComputedStyle(hero as HTMLElement).backgroundColor : null,
      eyebrowDisplay: eyebrow ? getComputedStyle(eyebrow).display : null,
      h1Align: h1 ? getComputedStyle(h1).textAlign : null,
      h1Size: h1 ? Number.parseFloat(getComputedStyle(h1).fontSize) : null,
    };
  });
}

test.describe('the shared page-hero contract', () => {
  for (const route of ['/', ...REBUILT] as const) {
    test(`${route} renders the contract, not its own hero`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(route);
      const m = await heroMetrics(page);

      // One hero component, and it carries a real field. /alternatives once
      // shipped without one and fell through to the paper background.
      expect(m.heroClass!.split(' '), 'the page opens on the shared .hero').toContain('hero');
      expect(m.heroClass, 'the hero carries a field').toContain('mv-field-');
      expect(m.field, 'the field actually paints').not.toBe('rgba(0, 0, 0, 0)');

      // .eyebrow ships display:inline; the hero's own grid makes it a block
      // sibling and lets the grid gap do the spacing. 2px was /alternatives
      // before the original fix.
      expect(m.eyebrowDisplay, 'eyebrow is a block sibling').toBe('block');

      // Left-aligned at the display scale, the same on every page: 9vw
      // clamped to 96-156px, so 115.2px at 1280.
      expect(m.h1Align, 'headings are left-aligned').toBe('start');
      expect(m.h1Size, 'h1 is the hero display size').toBeCloseTo(115.2, 1);
    });
  }

  for (const route of PENDING_REBUILD) {
    test(`${route} — its hero has not collapsed to body scale`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(route);
      const m = await heroMetrics(page);
      const body = await page.evaluate(() =>
        Number.parseFloat(getComputedStyle(document.body).fontSize));
      expect(m.h1Size!, `h1 is ${m.h1Size}px against body copy at ${body}px`).toBeGreaterThan(body * 3);
    });
  }
});

// The closing CTA band used to render at 88px, which made it the largest type
// on six of seven pages — the call to action outranking the page title.
//
// One class of h2 is allowed above the h1 and it is stated here rather than
// left to be rediscovered: the headings inside a shape cut (.cut) or a pinned
// stage panel. Those are full-screen moments that own the whole viewport, and
// the design sizes them at clamp(96px, 10vw, 180px) deliberately, above the
// hero's own 9vw. Nothing else gets to.
test.describe('heading scale', () => {
  for (const route of ['/', ...REBUILT, ...PENDING_REBUILD] as const) {
    test(`${route} — no h2 renders larger than the page's own h1`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(route);
      const offenders = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        if (!h1) return ['no h1 on the page'];
        const h1Size = Number.parseFloat(getComputedStyle(h1).fontSize);
        return [...document.querySelectorAll('main h2')]
          .filter((h) => !h.closest('.cut, .stage .panel'))
          .map((h) => ({
            text: (h.textContent || '').trim().slice(0, 40),
            size: Number.parseFloat(getComputedStyle(h).fontSize),
          }))
          .filter((h) => h.size > h1Size)
          .map((h) => `"${h.text}" is ${h.size}px against an h1 of ${h1Size}px`);
      });
      expect(offenders, offenders.join(String.fromCharCode(10))).toEqual([]);
    });
  }

  // "Explore further" was an <h2> rendering at 12px — smaller than body copy
  // and smaller than the links beneath it.
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
      expect(tooSmall, tooSmall.join(String.fromCharCode(10))).toEqual([]);
    });
  }
});

// Nine coloured tiles in a six-column grid became six ghost pills wrapping
// inside the hero (MVBOLD-17). Two tests covered the tiles and neither can
// mean anything now:
//
//   - "centres a short final row" was about orphans hanging off the left of a
//     centre-aligned section. The pills sit in a left-aligned hero, so a short
//     final row lining up on the left is correct rather than ragged.
//   - "no touching same-hue tiles" was a loud-layer rule about a grid of
//     coloured tiles. The pills carry no hue at all — they are ghost outlines
//     on the hero's own field — so there is nothing to clash. Left as-is it
//     would have passed forever by finding no tiles, which is the failure
//     mode this suite keeps running into.
//
// What replaces them is what the band is actually for: it is the index, so it
// has to list every domain and every entry has to land on its section.
test('the features index band lists every domain and lands on each section', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/features');
  const band = page.locator('.index');
  await expect(band).toBeVisible();

  const entries = await page.evaluate(() =>
    [...document.querySelectorAll('.index a')].map((a) => ({
      href: a.getAttribute('href') ?? '',
      label: (a.textContent || '').trim(),
    })),
  );
  expect(entries.length, 'one entry per domain').toBe(6);

  for (const e of entries) {
    expect(e.href.startsWith('#'), `"${e.label}" does not link to a section`).toBe(true);
    const target = page.locator(e.href);
    await expect(target, `${e.href} is not on the page`).toHaveCount(1);
  }

  // Wrapped rows share the hero's own left edge rather than drifting.
  const lefts = await page.evaluate(() => {
    const rows = new Map<number, number>();
    document.querySelectorAll('.index a').forEach((a) => {
      const r = a.getBoundingClientRect();
      const top = Math.round(r.top);
      if (!rows.has(top) || r.left < rows.get(top)!) rows.set(top, Math.round(r.left));
    });
    return [...rows.values()];
  });
  expect(new Set(lefts).size, `rows start at ${lefts.join(', ')}`).toBe(1);
});

// The Enterprise plan card had no "/mo" suffix and no "or $X/mo billed
// monthly" line, and nothing reserved that space — so its CTA, chips, divider
// and feature list all sat ~43px above the other three cards' while all four
// cards were the same height. The four most important targets on the pricing
// page did not form a line.
test('every plan card lines its CTA up with the others', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/pricing');
  const offsets = await page.evaluate(() =>
    [...document.querySelectorAll('.plan')].map((card) => {
      const cta = card.querySelector('.pill')!.getBoundingClientRect();
      return {
        name: card.querySelector('.name b')!.textContent!.trim(),
        top: Math.round(cta.top - card.getBoundingClientRect().top),
      };
    }),
  );
  expect(offsets.length).toBe(4);
  const spread = Math.max(...offsets.map((o) => o.top)) - Math.min(...offsets.map((o) => o.top));
  expect(spread, `CTA offsets: ${JSON.stringify(offsets)}`).toBeLessThanOrEqual(2);
});
