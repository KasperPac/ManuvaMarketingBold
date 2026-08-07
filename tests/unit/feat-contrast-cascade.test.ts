import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

// Task 9 fix round 2 review: the field-aware contrast fix for the features
// page's two full-bleed sections (violet lot-tracking, cobalt costing) is a
// CSS cascade/specificity concern, not a component-rendering one — neither
// AstroContainer (renders to an HTML string, no CSS) nor a static grep of
// dist/features.html (CSS lives in a separate stylesheet) can observe
// "which declaration actually wins". This file implements just enough real
// CSS selector matching and specificity comparison — scoped to the exact
// selector shapes this stylesheet uses (.class, [attr], :not(.class),
// single-level descendant combinator) — to answer that question against
// the real source text of site.css, not a hardcoded assumption about it.
//
// This exists because the seam has already produced three defects that no
// test caught: the inert `.site-pill-ghost` class (Pill/CtaBand review),
// absolute paper inks inside a coloured Field (round 1), and the
// `[data-fold] .site-feat-tier` override clobbering `.site-feat-tier-pro`
// (round 2, caught by the implementer, not the reviewer). All three were
// "which CSS rule actually applies" bugs.

const css = readFileSync('src/styles/site.css', 'utf8');

interface Rule { selector: string; declarations: Record<string, string>; sourceOrder: number }

function parseRules(source: string): Rule[] {
  // Strip comments first so `/* ... { ... } ... */` can't be mistaken for a rule.
  const noComments = source.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules: Rule[] = [];
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = ruleRe.exec(noComments))) {
    const selectorList = m[1].trim();
    const body = m[2];
    const declarations: Record<string, string> = {};
    for (const decl of body.split(';')) {
      const idx = decl.indexOf(':');
      if (idx === -1) continue;
      const prop = decl.slice(0, idx).trim();
      const value = decl.slice(idx + 1).trim();
      if (prop) declarations[prop] = value;
    }
    // A rule can have a comma-separated selector list; each gets its own
    // entry sharing the same declarations and source position, since CSS
    // treats them as independent rules for cascade purposes.
    for (const selector of selectorList.split(',')) {
      rules.push({ selector: selector.trim(), declarations, sourceOrder: i++ });
    }
  }
  return rules;
}

// One "compound part" of a selector: base classes/attrs it requires present,
// and classes required ABSENT via :not(.class). Enough for this file's
// selectors — no tag names, no combinators other than descendant (space),
// no :not() arguments beyond a single class.
interface CompoundPart { requiredClasses: string[]; requiredAttrs: string[]; excludedClasses: string[] }

function parseCompound(part: string): CompoundPart {
  const excludedClasses: string[] = [];
  const withoutNots = part.replace(/:not\(\.([\w-]+)\)/g, (_m, cls) => {
    excludedClasses.push(cls);
    return '';
  });
  const requiredClasses = [...withoutNots.matchAll(/\.([\w-]+)/g)].map((mm) => mm[1]);
  const requiredAttrs = [...withoutNots.matchAll(/\[([\w-]+)\]/g)].map((mm) => mm[1]);
  return { requiredClasses, requiredAttrs, excludedClasses };
}

interface VirtualEl { classes: string[]; ancestorAttrs?: string[] }

// Does `selector` (a descendant-combinator chain of compound parts, e.g.
// "[data-fold] .site-feat-desc") match `el`? The LAST compound part must
// match the element itself; every earlier part must match at least one
// ancestor (this file's fixtures only ever need a single ancestor level).
function matches(selector: string, el: VirtualEl): boolean {
  const parts = selector.trim().split(/\s+/).map(parseCompound);
  const target = parts[parts.length - 1];
  // None of this file's selectors put an [attr] on the TARGET (rightmost)
  // compound part — attributes only ever appear on an ancestor part (e.g.
  // "[data-fold] .site-feat-desc") — so a target part requiring one would
  // indicate an untested selector shape; fail loudly rather than silently
  // treat it as a no-op match.
  if (target.requiredAttrs.length) throw new Error(`unsupported: attribute on target compound "${selector}"`);
  const targetOk =
    target.requiredClasses.every((c) => el.classes.includes(c)) &&
    target.excludedClasses.every((c) => !el.classes.includes(c));
  if (!targetOk) return false;
  const ancestorParts = parts.slice(0, -1);
  return ancestorParts.every(
    (p) =>
      p.requiredAttrs.every((a) => (el.ancestorAttrs ?? []).includes(a)) &&
      p.requiredClasses.length === 0 &&
      p.excludedClasses.length === 0,
  );
}

// CSS specificity as (id, class-or-attribute-or-:not-argument, type). :not()
// contributes its argument's specificity per the Selectors spec — each
// excludedClasses entry counts the same as a requiredClasses entry.
function specificity(selector: string): [number, number, number] {
  const parts = selector.trim().split(/\s+/).map(parseCompound);
  let classLike = 0;
  for (const p of parts) classLike += p.requiredClasses.length + p.requiredAttrs.length + p.excludedClasses.length;
  return [0, classLike, 0];
}

function higherOrEqual(a: [number, number, number], b: [number, number, number]): boolean {
  for (let i = 0; i < 3; i++) if (a[i] !== b[i]) return a[i] > b[i];
  return true; // equal specificity: caller breaks the tie with source order
}

// Resolve the winning value for `property` on `el`, among all rules whose
// selector matches it — standard cascade: highest specificity wins; ties go
// to the later rule in source order (no !important anywhere in this file).
function resolve(rules: Rule[], el: VirtualEl, property: string): string | undefined {
  const candidates = rules.filter((r) => property in r.declarations && matches(r.selector, el));
  if (!candidates.length) return undefined;
  let winner = candidates[0];
  for (const r of candidates.slice(1)) {
    const sp = specificity(r.selector);
    const wp = specificity(winner.selector);
    if (higherOrEqual(sp, wp) && (sp[1] !== wp[1] || r.sourceOrder > winner.sourceOrder)) winner = r;
  }
  return winner.declarations[property];
}

const rules = parseRules(css);

test('the CSS parser used by these tests actually finds the real rules it is testing', () => {
  // Sanity check on the parser itself, not the design: if this fails, the
  // regex above stopped matching site.css's real syntax and the two tests
  // below would be vacuously trivial rather than meaningfully checking
  // anything.
  const selectors = rules.map((r) => r.selector);
  expect(selectors).toContain('.site-feat-desc');
  expect(selectors).toContain('[data-fold] .site-feat-desc');
  expect(selectors).toContain('.site-feat-tier-pro');
  expect(selectors).toContain('[data-fold] .site-feat-tier:not(.site-feat-tier-pro):not(.site-feat-tier-ent)');
});

test('.site-feat-desc resolves to full opacity under a data-fold ancestor, and its muted value without one', () => {
  const onPaper: VirtualEl = { classes: ['site-feat-desc'], ancestorAttrs: [] };
  const onField: VirtualEl = { classes: ['site-feat-desc'], ancestorAttrs: ['data-fold'] };
  expect(resolve(rules, onPaper, 'opacity'), 'paper (no data-fold ancestor)').toBe('.72');
  expect(resolve(rules, onField, 'opacity'), 'under a data-fold ancestor').toBe('1');
});

test('a Pro+ tier badge keeps its --bg-card-2 backing under a data-fold ancestor, not the darkening override', () => {
  const proOnPaper: VirtualEl = { classes: ['site-feat-tier', 'site-feat-tier-pro'], ancestorAttrs: [] };
  const proOnField: VirtualEl = { classes: ['site-feat-tier', 'site-feat-tier-pro'], ancestorAttrs: ['data-fold'] };
  for (const [name, el] of [['paper', proOnPaper], ['field', proOnField]] as const) {
    expect(resolve(rules, el, 'background'), name).toBe('var(--bg-card-2)');
  }
  // And the base (non-Pro+) badge really does switch to the darkening mix
  // under a field — confirming the exclusion is scoped correctly rather
  // than accidentally disabling the whole field override.
  const baseOnField: VirtualEl = { classes: ['site-feat-tier'], ancestorAttrs: ['data-fold'] };
  expect(resolve(rules, baseOnField, 'background')).toBe('color-mix(in srgb, black 20%, transparent)');
});
