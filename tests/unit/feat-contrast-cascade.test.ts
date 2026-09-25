import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

// This file used to carry a small CSS engine — selector matching plus
// specificity comparison — to answer "which declaration actually wins" for
// the old build's field-aware contrast fix ([data-fold] .site-feat-desc and
// friends). That mechanism is gone with the rebuild, and the engine could
// not model what replaced it: the new override is a blunt
// `.mv-field-<f> *:not(...)` with !important, which the engine parsed
// neither the universal selector nor the chained :not() of. A parser that
// silently mis-models the stylesheet is worse than no parser, so it is gone
// too.
//
// The question it existed to answer is now measured rather than reasoned
// about: tests/e2e/a11y.spec.ts renders all nine routes and computes each
// text run's real contrast against its field's own computed background. That
// is strictly stronger than static specificity analysis and it covers every
// page rather than two sections of one.
//
// What is left here is the part a browser cannot tell you: that the override
// mechanism is still shaped the way the decision says it should be. The
// decision (see site.css) was "full strength on any field, not a per-field
// contrast audit", released only on the three fields with no headroom —
// cobalt, violet and flare — and never on the decorative elements, whose low
// opacity is the whole point of them.

const css = readFileSync('src/styles/site.css', 'utf8');

const TIGHT = ['cobalt', 'violet', 'flare'] as const;
const DECORATIVE = ['.ghostnum', '.pnum', '.ticks'] as const;

test('the three tight fields release their opacity mutes at full strength', () => {
  // cobalt 4.97 -> 3.50 at .75 and violet 4.60 -> 3.14; there is no headroom
  // to mute into on either, and flare is tighter still.
  const rule = css.match(
    /((?:\.mv-field-(?:cobalt|violet|flare)\s+\*[^,{]*,?\s*)+)\{([^}]*)\}/,
  );
  expect(rule, 'the full-strength override is missing').toBeTruthy();
  for (const f of TIGHT) {
    expect(rule![1], `${f} is not covered by the override`).toContain(`.mv-field-${f}`);
  }
  expect(rule![2]).toMatch(/opacity:\s*1\s*!important/);
});

test('the override exempts the decorative elements and nothing that carries text', () => {
  const rule = css.match(
    /((?:\.mv-field-(?:cobalt|violet|flare)\s+\*[^,{]*,?\s*)+)\{[^}]*opacity:\s*1\s*!important[^}]*\}/,
  );
  expect(rule, 'the full-strength override is missing').toBeTruthy();
  const exemptions = [...rule![1].matchAll(/:not\(([^)]+)\)/g)].map((m) => m[1].trim());
  expect(exemptions.length, 'the override exempts nothing').toBeGreaterThan(0);
  for (const e of exemptions) {
    // Every exemption has to be decorative. A text-bearing selector slipping
    // into this list is how a muted string quietly drops back under AA on the
    // one field where it has no headroom — and the e2e gate would then catch
    // it, but only after it had been written.
    const decorative = DECORATIVE.some((d) => e === d || e.startsWith(`${d} `));
    expect(decorative, `"${e}" is exempted from the full-strength override but is not decorative`).toBe(true);
  }
});

test('the flare ink correction sits at :root, where every reader of it can see it', () => {
  // --on-flare (#FFFFFF) on flare (#FF4D00) measures 3.33:1. The correction
  // was scoped to the field class first, which CtaBand never matched because
  // it sets its ink inline as var(--on-flare) with no field class — so
  // /about and /alternatives kept shipping white on flare. The value is wrong
  // wherever it is read. Still to be raised against the design system rather
  // than carried here forever.
  expect(css).toMatch(/:root\s*\{\s*--on-flare:\s*#141413\s*\}/);
});

test('the decorative numerals are not text nodes', () => {
  // They sit at 9-16% opacity by design, so they can never clear AA and axe
  // was right to flag them. The answer is that decoration belongs in CSS,
  // which also keeps them out of text selection and the clipboard — which
  // aria-hidden alone does not do.
  expect(css).toMatch(/\.ghostnum::before\s*,\s*\.pnum::before\s*\{\s*content:\s*attr\(data-n\)\s*\}/);
  for (const page of ['dist/index.html', 'dist/features.html', 'dist/alternatives/katana.html']) {
    const html = readFileSync(page, 'utf8');
    const numerals = [...html.matchAll(/<span class="(?:ghostnum|pnum) num"[^>]*>([^<]*)<\/span>/g)];
    expect(numerals.length, `${page} renders no ghost numerals`).toBeGreaterThan(0);
    for (const n of numerals) {
      expect(n[1], `${page}: a ghost numeral still has a text node`).toBe('');
    }
  }
});
