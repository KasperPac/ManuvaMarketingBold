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
// the home page's amber/violet split was two inset panels on a paper section,
// and /alternatives' two comparison cards are panels inside one. None of those
// is a fold. Only a full-bleed <Field> emits a top-level section
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

// Navy came OFF the marketing site on an author's call, and went back on in
// MVBOLD-14 after comparing the two side by side. The reasoning behind the
// original call still holds for one half of it, so this test now asserts that
// half instead of the whole thing.
//
// The half that holds: ink is not a rotation hue. --field-rotation is
// `cobalt flare amber violet mint aqua` and the readme's loud layer is those
// six plus lime, with ink in neither list. On marketing, navy as a third blue
// taking its turn behind cobalt and aqua was the actual problem.
//
// The half that did not: ink as STRUCTURE. All three reference layouts in
// _ds/ui_kits/marketing/ end on an ink footer and carry one full-bleed ink
// band — Landing (paper·paper·paper·INK·INK), Alternative
// (paper·paper·INK·paper·paper·INK), Pricing (INK featured card, INK band,
// INK footer). Removing that left the site with no dark end at all, which is
// what it was pulled up on.
//
// So: ink may be the footer, and at most one band per page. It may not be a
// hero panel or a CtaBand, which are the rotation's slots.
const NAVY = /#15314[dD]|rgb\(\s*21\s*,\s*49\s*,\s*77\s*\)/;

for (const route of ALL_ROUTES) {
  test(`${route} — ink is structure, never a rotation hue`, () => {
    const html = readFileSync(file(route), 'utf8');
    const $ = load(html);

    // At most one full-bleed ink band. Two would make it a hue that rotates.
    const inkBands = topLevelFolds(html).filter((f) => f === 'ink');
    expect(
      inkBands.length,
      `${route} declares ${inkBands.length} full-bleed ink bands; the anchor is one per page`,
    ).toBeLessThanOrEqual(1);

    // Never the hero and never the closing CTA — those are the rotation's
    // slots, and a navy hero is the "third blue" the original call was about.
    const heroPanel = $('main > section').first().find('.mv-panel').attr('data-fold');
    expect(heroPanel, `${route} has a navy hero panel`).not.toBe('ink');
    const ctaPanel = $('.site-cta-inner').attr('data-fold');
    expect(ctaPanel, `${route} has a navy closing CTA`).not.toBe('ink');

    // Checked as a rendered value as well as a token name, because navy reaches
    // pages through three channels: --field-ink (marketing.css), --bg-ink
    // (themes.css, which is what Button's `ink` variant and every field-less
    // Pill used), and the .mv-field-ink helper. Grepping one would miss two.
    // Inline navy is now expected only where a <Field field="ink"> emitted it.
    const inlineNavy = $('[style]')
      .toArray()
      .filter((el) => {
        const style = $(el).attr('style') ?? '';
        return style.includes('--field-ink') || NAVY.test(style);
      });
    for (const el of inlineNavy) {
      expect(
        $(el).attr('data-fold'),
        `${route}: navy painted on an element that is not a declared ink band`,
      ).toBe('ink');
    }
    // --bg-ink is the app's substrate and still has no business here.
    expect(html, `${route} uses --bg-ink, which is the app token`).not.toMatch(/var\(--bg-ink\)/);
  });
}

// The footer is the one place ink appears on every single page — it is what
// stops each page fading out into paper. It is set in site.css rather than
// inline, so this asserts the rule is present rather than reading the markup.
test('the footer is the dark anchor on every page', () => {
  const css = readFileSync('src/styles/site.css', 'utf8');
  expect(css).toMatch(/\.site-footer\s*\{[^}]*background:\s*var\(--field-ink\)/);
});

// The rule above is satisfiable by having no fields at all, which would make it
// vacuous on exactly the pages it matters most for.
//
// / and /features have always carried full-bleed fields. /pricing, /about and
// /alternatives now do too — the lime trial strip (MVBOLD-13) and the ink
// anchor band (MVBOLD-14) are both top-level bands, and both comparison pages
// get the trial strip as well.
//
// The long-form routes stay colourless by design, and so does the inside of a
// data table or a block of body copy: the loud-layer rules keep a field off
// those, which is why this list is the visual routes and not every route.
//
// /product was in this list until the route was removed (author's call: it did
// not flow with the rest of the site). Substituting /alternatives for it failed
// immediately — worth recording, because it is the same shape of mistake as the
// hue test that could not see separation: a page can be full of colour and still
// declare no fold.
test('the visual routes actually carry full-bleed fields', () => {
  for (const route of ['/', '/features', '/pricing', '/about', '/alternatives']) {
    const folds = topLevelFolds(readFileSync(file(route), 'utf8')).filter(Boolean);
    expect(folds.length, `${route} declares no full-bleed field`).toBeGreaterThan(0);
  }
});
