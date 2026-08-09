import { readFileSync, existsSync } from 'node:fs';
import { load } from 'cheerio';
import { expect, test } from 'vitest';
import { ALL_ROUTES } from '../../src/site';

const file = (route: string) => (route === '/' ? 'dist/index.html' : `dist${route}.html`);

// handoff.md, twice: "never two fields touching — put ink or paper between
// them" and "one full-bleed field per fold".
//
// This test exists because the check that was supposed to enforce it did not.
// tests/unit/home.test.ts's 'no two adjacent folds share a hue' collects every
// data-fold value on the page in document order and asserts consecutive values
// DIFFER. That catches ink+ink. It cannot catch ink+aqua, because those differ
// — and ink+aqua was exactly the defect that shipped: the explainer band ended
// at y=1956 and the beta strip began at y=1956, two full-bleed fields with a
// 0px gap and both cool blues. The hue test passed the whole time.
//
// Difference is not separation. This asserts the second thing: among the
// page's own top-level sections, no two consecutive ones are both fields.
//
// Deliberately scoped to `main > section` — nested panels are exempt and must
// stay exempt. A tile grid is one composed unit with paper between its tiles,
// the home page's amber/violet split is two inset panels on a paper section,
// and /product's accent chips are 44px squares inside paper cards. None of
// those is a fold. Only a full-bleed <Field> emits a top-level section
// carrying data-fold, which is precisely what this rule governs.
function topLevelFolds(html: string): (string | null)[] {
  const $ = load(html);
  return $('main > section')
    .toArray()
    .map((el) => $(el).attr('data-fold') ?? null);
}

for (const route of ALL_ROUTES) {
  test(`${route} — no two full-bleed fields touch`, () => {
    const path = file(route);
    // Fail rather than skip: a silently-unbuilt route is how a check like this
    // rots into a no-op. Same stance as the parity gate's --require-all.
    expect(existsSync(path), `${path} missing — build before running unit tests`).toBe(true);

    const folds = topLevelFolds(readFileSync(path, 'utf8'));
    for (let i = 1; i < folds.length; i++) {
      if (folds[i] && folds[i - 1]) {
        expect.fail(
          `${route}: fields "${folds[i - 1]}" and "${folds[i]}" are adjacent top-level sections ` +
            `(positions ${i - 1} and ${i} of ${folds.length}). Put a paper section between them.`,
        );
      }
    }
  });
}

// Navy is the app's dark end, not a marketing colour (author's call: it stays
// in the app, where it is a substrate under a single accent; on marketing it
// was a third blue behind cobalt and aqua). The design system agrees on its own
// terms — --field-rotation is `cobalt flare amber violet mint aqua` and the
// readme's loud layer is those six plus lime, with ink in neither list.
//
// Checks the rendered value, not the token name, because navy reached pages
// through three separate channels: --field-ink (marketing.css), --bg-ink
// (themes.css, which is what Button's `ink` variant and so every field-less
// Pill used), and the .mv-field-ink helper class on the footer. Grepping for
// any one of those would have missed the other two.
const NAVY = /#15314[dD]|rgb\(\s*21\s*,\s*49\s*,\s*77\s*\)/;

for (const route of ALL_ROUTES) {
  test(`${route} — no navy on the marketing site`, () => {
    const html = readFileSync(file(route), 'utf8');
    expect(NAVY.test(html), `${route} still renders the logo navy #15314D`).toBe(false);
    expect(html).not.toMatch(/mv-field-ink|var\(--field-ink\)|var\(--bg-ink\)/);
  });
}

// The rule above is satisfiable by having no fields at all, which would make it
// vacuous on exactly the pages it matters most for. /pricing and /alternatives/
// are legitimately colourless (the loud-layer rules forbid a field behind a
// data table or long-form copy), so this asserts only where colour is the point.
test('the visual routes actually carry full-bleed fields', () => {
  for (const route of ['/', '/product', '/features']) {
    const folds = topLevelFolds(readFileSync(file(route), 'utf8')).filter(Boolean);
    expect(folds.length, `${route} declares no full-bleed field`).toBeGreaterThan(0);
  }
});
