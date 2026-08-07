# Task 14 — End-to-end verification pass — final report

Branch `feat/marketing-reskin`. This is the final verification record for the reskin: every check run, every failure found, and its disposition.

**This report has three rounds.** Round 1 is the original e2e verification pass. Round 2 (below) is a whole-branch review fix wave — a CRITICAL invented-copy defect, two IMPORTANT structural bugs, five minors, and a ratified deviation. Round 3 is a single residual from round 2's own CTA fix, caught on re-review.

## Summary

- Playwright installed and configured (`@playwright/test`, `@axe-core/playwright`, Chromium).
- Three e2e spec files, 96 e2e tests total (round 1 shipped 89; round 2 widened one check from 2 routes to 8), covering everything the brief and the team lead required — same-page and cross-page anchor resolution, table column integrity by geometry, anchor landing clearance at two nav heights, field-section body-copy contrast.
- Round 1 found and fixed **seven defects**: a horizontal-overflow bug on the hero heading, a nav breakpoint bug that never actually hid the desktop nav links, a missing mobile treatment for the nav CTA, a dead cross-page anchor (`/#compare`), and ~20 individual accessibility contrast failures across seven of eight routes.
- Round 2 (whole-branch review) found and fixed **invented CTA copy shipped on six routes with "Book a demo" silently lost on four of them**, plus a dead spacing token (`--space-14`, doesn't exist) collapsing three layout rules to zero, five missing `<head>` tags on all eight routes, and four smaller correctness issues. Full detail in the "Round 2" section below.
- Round 3 fixed **one residual from round 2's own CtaBand fix**: the home page ended up with "Book a demo" twice (hero + closing band) where its source has it once. Detail in the "Round 3" section below.
- All fixes are in `src/styles/site.css`, `src/components/site/{Pill,CtaBand}.astro`, `src/layouts/{Base,Alternative}.astro`, or page files under `src/pages/`. None required touching `_ds/`.
- Full unit suite (176 tests), the parity gate with `--require-all`, and the full e2e suite (96 tests) are all green together.
- **The font prerequisite has not landed. This is a blocking item — see below. Not touched by round 2.**

## Checks run and results

| Check | Command | Result |
|---|---|---|
| Unit suite | `npm run test` | 176/176 passed (was 175 at end of round 1; round 2 added one head-tag coverage test) |
| Parity gate (strict) | `npm run parity:strict` | Holds, 8/8 routes checked, 0 skipped, 0 missing |
| Build | `npm run build` | 8/8 pages built |
| E2E — full suite | `npx playwright test` | 96/96 passed (was 89 at end of round 1; round 2 widened the table column-integrity check from 2 routes to all 8, +7 tests). Confirmed on repeated clean full runs. A couple of tests intermittently timed out once earlier in round 1 under heavy concurrent load from ad-hoc diagnostic scripts running alongside the suite on this machine — passed reliably in isolation and on every clean run since, round 1 and round 2 alike. |

## What the e2e suite covers

- **`tests/e2e/routes.spec.ts`** — all 8 routes return 200; every `href^="/"` across every route resolves without a redirect hop; `/_redirects` carries the legacy `.html` → clean-URL rules; every same-page `href="#…"` on every route resolves to a real `id` on that page; every cross-page `href="/path#id"` resolves to a real `id` on its target route (added this round — see the `/#compare` fix below).
- **`tests/e2e/a11y.spec.ts`** — axe-core (wcag2a/aa, wcag21a/aa) on all 8 routes, zero violations; drawer opens, traps Tab focus in both directions, closes on Escape, returns focus to the burger, and doesn't shift the page when scroll locks; skip link is the first Tab stop; `prefers-reduced-motion` leaves everything visible; and a custom computed-contrast check (real `getComputedStyle` color/background/opacity, composited by hand against the WCAG relative-luminance formula — not axe) asserts every leaf of body copy inside a `[data-fold]` field clears 4.5:1, across all 8 routes.
- **`tests/e2e/responsive.spec.ts`** — no horizontal overflow at 375/480/720/960/1440px on all 8 routes; burger/nav-link swap at the 960px breakpoint; `.mv-matrix` → `.mv-matrix-cards` swap below 720px on `/pricing`; every `<table>` on both `/alternatives/` routes forms as many real columns as its header, measured by computed x-position (not `<td>` count); and anchor-landing clearance on `/privacy` and `/terms`, above and at/below the 960px breakpoint where `--nav-h` changes from 88px to 64px.

## Defects found and fixed

All seven were found by the new suite, not present before this task, and none were flagged by the unit suite or the parity gate — confirming the premise of the task (these are exactly the class of bug that markup/text-level tests structurally can't see).

### 1. Home hero heading overflowed the page horizontally

At 375/480/720/960px. Root cause: `.site-hero-title`'s `max-width: 14ch` was carried over unchanged from the old site, but the new display type (weight 800, expanded width variation, wide tracking) renders visibly wider per character than the old site's lighter, tighter-tracked heading — the same 14ch ceiling that worked on the old type doesn't hold on the new one, and `max-width` alone can't stop it because the heading is a CSS Grid item whose intrinsic min-content Chromium reports equal to its max-content under `text-wrap: balance`. Fixed with a definite `width: min(14ch, 100%)` + `overflow-wrap: break-word` on the heading, and `grid-template-columns: minmax(0, 1fr)` on its panel (an implicit `auto` column's resolved size is circular against a child's percentage width; an explicit `fr` track isn't). `src/styles/site.css`.

### 2. The mobile nav never actually hid the desktop nav links below 960px

`.site-nav-links { display: flex }` was unconditional and loaded after every `_ds/tokens/*.css` file (Base's own stylesheet is the last `<link>` in `<head>`), so at equal specificity it silently beat the ds's own conditional `.mv-nav-links { display: none }` at every width — the full link row stayed on screen next to the burger it was supposed to be replaced by. This shipped in Task 4, passed review, and survived nine subsequent tasks, because every prior test asserted the classes were *present*, never that the layout actually swapped. Fixed by moving `display: flex` into the ds's own `@media (min-width: 961px)` convention.

### 3. The nav-bar "Start free trial" CTA had no mobile treatment

Unlike "Sign in" (which already had one via a shared class) — the old site's own `mobile.css` hides both CTAs below 960px with the comment "both live in the drawer" (Drawer.astro already carries both). Without it, logo + CTA + burger together overflowed the viewport by ~11px at 375px. Fixed by adding the equivalent rule.

### 4. `/#compare` — a dead cross-page anchor (team-lead correction)

Both `/alternatives/katana` and `/alternatives/mrpeasy`'s "Explore further" section link to `/#compare` ("Comparison overview"). I initially flagged this as a possible content decision rather than fixing it, since my anchor test only covered same-page `href="#…"`. Team lead checked `origin/master:index.html` and confirmed the old home page carries `<section class="compare" id="compare">` — the same "Why Manuva / Built for the floor, not for the demo" comparison band this reskin already has (`.site-compare`, the ink-field section in `index.astro`) — and both alternatives pages' `href="/#compare"` was carried across faithfully from the old site. Only the `id` never made it onto the new section. That makes it our regression, not a judgment call.

**Fixed:** added `id="compare"` to `<Field field="ink" class="site-compare">` in `src/pages/index.astro`, matching the old page's own id on the same content.

**Test coverage extended:** `tests/e2e/routes.spec.ts` now has a second anchor test, `every cross-page "/path#id" anchor resolves to a real id on its target route` — it collects every `href="/path#id"` across all 8 routes, then navigates to each distinct target path once and checks the id is really there. Checked for other instances of this pattern site-wide (`grep -rn 'href="/[a-zA-Z0-9/_-]*#'`): the only other cross-page target is `/#contact`, which already resolves (it's `index.astro`'s real contact section). `/#compare` was the only broken one.

### 5–7. ~20 accessibility contrast failures

axe-flagged across 7 of 8 routes (only `/about` was clean already), all pre-existing (unrelated to anything Task 14 itself touched), all fixed in `src/styles/site.css` or `src/components/site/Pill.astro`, none in `_ds/`. Itemized in full below.

One existing unit test (`tests/unit/primitives.test.ts`) asserted the ghost pill's *old* literal `color-mix(...)` string as an implementation detail; updated the one assertion to the new (fixed) value — the test's actual point (inline style, correct cascade order, no dead class) is untouched and still passing.

## Contrast fixes, itemized — route, element, ratio before → after

Ratios and colours below are real measurements: "before" is axe-core's own reported `contrastRatio`/`fgColor`/`bgColor` from the first scan; "after" is axe-core's own reported values from the passing `color-contrast` check post-fix (not recomputed by hand), captured from a second scan run against the fixed build. All 8 routes independently re-confirmed at **0 violations** after every round below.

### `/`

| Element | Fix | Before | After |
|---|---|---|---|
| `.site-hero-eyebrow` (cobalt) | `[data-fold] .site-hero-eyebrow { opacity: 1 }` | 4.33 (`#ebefff` on `#3a5eff`) | 4.97 (`#ffffff` on `#3a5eff`) |
| `.site-hero-badge` (cobalt) | fill mix white→black | 3.19 (`#ebefff` on `#5d7bff`) | 7.01 (`#ffffff` on `#2e4bcc`) |
| `.site-hero-sub` (cobalt) | `[data-fold] .site-hero-sub { opacity: 1 }` | 3.87 (`#dce2ff` on `#3a5eff`) | 4.97 (`#ffffff` on `#3a5eff`) |
| `.mv-btn.mv-press[href$="#contact"]` — "Book a demo" ghost pill (cobalt) | `Pill.astro` fill mix white→black | 3.9 (`#ffffff` on `#5675ff`) | 6.29 (`#ffffff` on `#3251db`) |
| `a[href$="features#inventory"] > .site-tile-body` (cobalt) | `.site-tile-body { opacity: 1 }` (unconditional) | 3.87 (`#dce2ff` on `#3a5eff`) | 4.97 |
| `.site-tile-chip` ×4, cobalt tile (Stock control / Production orders / Mfg planning / Stocktaking) | chip background mix white→black | 2.84 (`#dce2ff` on `#5e7bff`) | 7.26 (`#ffffff` on `#2d49c7`) |
| `a[href$="features#boms"] > .site-tile-body` (violet) | `.site-tile-body { opacity: 1 }` | 3.5 (`#f1d8ff` on `#b026ff`) | 4.59 |
| `.site-tile-chip` ×2, violet tile (BOM builder / Cost management) | chip background mix white→black | 2.81 (`#f1d8ff` on `#be4dff`) | 6.83 |
| `a[href$="features#purchasing"] > .site-tile-body` (flare — Warehouse & Stock Movement pillar) | dark-ink override, scoped by href | 2.64 (`#ffdfd1` on `#ff4d00`) | 5.54 (`#141413` on `#ff4d00`) |
| `.site-tile-chip` ×4, flare tile (Delivery receipts / Stock adjustments / Bin locations / Transfers) | chip background switched to a light overlay (dark ink needs the opposite direction from white ink) | 2.23 (`#ffdfd1` on `#ff6d2e`) | 7.97 (`#141413` on `#ff8b59`) |
| `div[data-fold="violet"] > .site-split-body` | `[data-fold] .site-split-body { opacity: 1 }` | 3.6 (`#f2dcff` on `#b026ff`) | 4.59 |
| `.site-pricing-toggle-btn:nth-child(1)` — "Monthly" (home preview toggle, paper) | removed a colliding `opacity: .7` shared with the pricing-page toggle rule | 3.32 (`#8a8a85` on `#fafaf9`) | 6.65 (`#5a5a53` on `#fafaf9`) |
| `.site-pricing-save` — "−20%" (home, paper) | `color: color-mix(in srgb, var(--ok) 70%, black)` | 3.01 (`#12a150` on `#e7f6ee`) | 5.47 (`#0d7138` on `#e7f6ee`) |
| `.site-tier-per` — "/ month" ×3 tiers | `--ink-faint` → `--ink-muted` | 3.49 (`#74746c` on `#dededa`) | 5.15 (`#5a5a53` on `#dededa`) |
| `.site-tier-feats-hd` — "Everything in X, plus" ×2 | `--ink-faint` → `--ink-muted` | 3.49 | 5.15 |
| `.site-compare-foot > a[href$="katana"/"mrpeasy"]` | `[data-fold] .site-compare-foot { opacity: 1 }` + explicit `color: var(--on-ink)` (opacity fix alone only reached 2.67) | 1.99 (`#3a5eff` on `#15314d`) | 13.3 (`#ffffff` on `#15314d`) |
| `.site-compare-caption` | `[data-fold] .site-compare-caption { opacity: 1 }` | 3.64 (`#778898` on `#15314d`) | 13.3 |
| `.site-footer-base .mv-wrap span` / `.mv-mono` (footer, all routes) | alpha `.42` → `.62` (matching `.site-footer a`, already proven safe) | 3.64 (`rgb(255 255 255/.42)` on `#15314d`) | 6.09 (`#a6b1bb` on `#15314d`) |

### `/features`

| Element | Fix | Before | After |
|---|---|---|---|
| `a[href$="#purchasing"] > .site-tile-title` — domain tile (flare) | dark-ink override, scoped by href | 3.32 (`#ffffff` on `#ff4d00`, 12px bold — below the large-text exemption) | 5.54 (`#141413` on `#ff4d00`) |
| `#lot-tracking > .mv-wrap > .site-feat-intro` (violet) | `[data-fold] .site-feat-intro { opacity: 1 }` | 3.4 (`#efd4ff` on `#b026ff`) | 4.59 |
| `#costing > .mv-wrap > .site-feat-intro` (cobalt) | same | 3.76 (`#d8dfff` on `#3a5eff`) | 4.97 |
| Footer (shared) | same as `/` | 3.64 | 6.09 |

### `/pricing`

| Element | Fix | Before | After |
|---|---|---|---|
| `.site-pricing-toggle-btn:nth-child(2)` — "Monthly" (pricing hero, ink field) | untangled from the home instance's rule; `[data-fold] .site-pricing-toggle-btn:not(.site-pricing-toggle-on) { color: var(--on-ink); opacity: .8 }` | 1.15 (`#4f5659` on `#364e66`) | 6.23 (`#d7dce0` on `#364e66`) |
| `.site-pricing-save` — "Save ~20%" (pricing hero, ink field) | `[data-fold] .site-pricing-save { color: color-mix(in srgb, var(--ok) 55%, white) }` | 3.49 (`#12a150` on `#153c4d`) | 6.11 (`#7dcb9f` on `#153c4d`) |
| `.site-plan-chip-ok` — "Unlimited users" (featured plan) | `color: color-mix(in srgb, var(--ok) 70%, black)` | 3.01 (`#12a150` on `#e7f6ee`) | 5.47 |
| `.site-plan-chip-ok` ×2 (plan 3 — locations, users) | same | 3.01 | 5.47 |
| `.site-plan-chip-ok` ×2 (enterprise — locations, users) | same | 2.54 (`#12a150` on `#d2e3e9`) | 4.62 |
| Footer (shared) | same as `/` | 3.64 | 6.09 |

### `/about`

Footer only (shared fix): 3.64 → 6.09.

### `/alternatives/katana`

| Element | Fix | Before | After |
|---|---|---|---|
| `a[href$="/#contact"]` — "Book a demo" ghost pill (violet) | `Pill.astro` fill mix white→black (same fix as `/`'s cobalt instance) | 3.9 (`#ffffff` on `#bb44ff`) | Confirmed via axe re-scan: clears AA (0 violations) — exact post-fix figure not separately captured for this route's specific field blend. |
| `.site-alt-table-manuva` (table header) | `--brand-1` → `--brand-2` | 3.68 (`#3a5eff` on `#dededa`) | 5.97 (`#1e36db` on `#dededa`) |
| `.site-alt-price-col:nth-child(1) > .site-alt-price-callout` | `--brand-1` → `--brand-2` | 4.33 (`#3a5eff` on `#ebefff`) | 7.03 (`#1e36db` on `#ebefff`) |
| `.site-alt-price-featured > .site-alt-price-callout` (+ `strong`) | same | 4.33 | 7.03 |
| `.site-alt-trial-callout > strong` — "At 10 users:" | `--brand-1` → `--brand-2` | 3.68 | 5.97 |
| `.site-alt-table-foot > a[href$="mailto:…"]` — "Spot something out of date?" (`link-in-text-block`) | `--brand-1` → `--brand-2` + `text-decoration: underline` | 1.05:1 contrast to surrounding text, no non-colour cue | 7.71 (`#1e36db` on `#fafaf9`) against the page + underline |
| Footer (shared) | same as `/` | 3.64 | 6.09 |

### `/alternatives/mrpeasy`

| Element | Fix | Before | After |
|---|---|---|---|
| `.site-alt-table-manuva` ×3 (Growth / Pro / generic header) | `--brand-1` → `--brand-2` | 3.68 | 5.97 |
| `.site-alt-trial-callout > strong` — "The break-even is around 5 users." | `--brand-1` → `--brand-2` | 3.68 | 5.97 |
| `.site-alt-table-foot > a[href$="mailto:…"]` (`link-in-text-block`) | same as katana | 1.05:1 to surrounding text, no cue | 7.71 + underline |
| Footer (shared) | same as `/` | 3.64 | 6.09 |

### `/privacy`

| Element | Fix | Before | After |
|---|---|---|---|
| `.site-doc-note > a[href$="#roadmap"]` | `.site-doc a { color: var(--brand-2); text-decoration: underline }` | 3.68 (`#3a5eff` on `#dededa`) | 5.97 (`#1e36db` on `#dededa`) |
| `.site-doc-contact > p > a[href$="mailto:…"]` | same | 4.15 (`#3a5eff` on `#e7eafa`) | 6.73 (`#1e36db` on `#e7eafa`) |
| `link-in-text-block` ×7 (`manuva.app`, `app.manuva.app`, `#roadmap`, `/terms`, `privacy@manuva.app` ×3) | same rule — colour + underline | 1.39:1 contrast to surrounding text, no cue | 5.97–7.71 (varies by the paragraph's own background) + underline |
| Footer (shared) | same as `/` | 3.64 | 6.09 |

### `/terms`

| Element | Fix | Before | After |
|---|---|---|---|
| `link-in-text-block` ×12 (assorted `mailto:` and cross-page links across the document body) | `.site-doc a { color: var(--brand-2); text-decoration: underline }` | 1.39:1 contrast to surrounding text, no cue | 6.65–7.71 (varies by paragraph background) + underline |
| Footer (shared) | same as `/` | 3.64 | 6.09 |

## Round 2 — whole-branch review fix wave

A separate, independent review re-verified the highest-stakes content directly against source rather than through the parity gate — both competitor tables cell-for-cell including verdict classes, the MRPeasy seat table byte-identical including every delta, and a **reverse** comparison (new→old, which the gate never runs) confirming no body-copy loss on any route. That review found one CRITICAL defect, two IMPORTANT structural bugs, five smaller issues, and confirmed one deviation as intentional. All fixed in this single pass; findings below.

### CRITICAL — invented CTA copy on 6 routes, "Book a demo" silently lost on 4

`CtaBand.astro` hardcoded its second action to `<Pill href={mailto}>Talk to us</Pill>`. **"Talk to us" appears on none of the eight source pages** (confirmed by reading each page's own raw HTML, not assumed) — it shipped on `/`, `/features`, `/pricing`, `/about`, and both `/alternatives/` routes regardless. What it displaced: every old page's closing CTA band actually reads **"Start free trial" + "Book a demo"** (→ that page's own `#contact`), except `pricing.html`, whose closing band has no second action at all — there is no `cta-section` anywhere on that page.

**Why the parity gate stayed green through this:** the extractor renders the old CTA band as the single phrase `"Start free trial Book a demo"`. The gate's phrase tier only checks `newText.includes(phrase)` — presence anywhere on the page, never count, never position. Every affected page (except pricing, which never had "Book a demo" to lose) happens to *also* carry that same two-word run in its **hero** — the "Start free trial"/"Book a demo" pair had been relocated there as a workaround in earlier tasks, because CtaBand couldn't hold "Book a demo" without losing it. So the phrase was always present exactly once on the page, just in the wrong place, while the closing band silently replaced it with an invented one. **General limitation, not fixed here** (told not to touch the gate): any source phrase occurring twice in the old page can lose one occurrence with zero signal, because the phrase tier is presence-only where the short-fragment tier is count-based. Whoever maintains `scripts/parity/` next should know this.

**Fix:**
- `CtaBand.astro` — `secondActionHref` is now an optional prop. When provided, renders `Book a demo` glued to `Start free trial` with the same `{' '}` real-whitespace pattern the old page's own sibling `<a>` tags use (needed to keep the phrase tier passing — this broke it on the first attempt, since Astro drops the bare whitespace text node between block JSX siblings). When omitted (pricing only), renders `Start free trial` alone.
- `index.astro`, `features.astro`, `about.astro`: `secondActionHref` set to each page's own real `#contact`/`/#contact`.
- `pricing.astro`: no `secondActionHref` — matches its source having no second action, rather than inventing one to match every other page's pattern.
- `Alternative.astro` (katana, mrpeasy): new `ctaSecondActionHref` prop threaded through to `CtaBand`, both pages pass `/#contact`.
- **Also removed the hero-relocation workaround itself** on `about.astro`, `features.astro`, `katana.astro`, `mrpeasy.astro`: their hero sections had "Start free trial"/"Book a demo" moved up from the closing band specifically because CtaBand couldn't hold "Book a demo" — each page's own comment said so explicitly. Now that CtaBand carries a real second action again, that workaround's entire reason for existing is gone; leaving it in place would have shown the same two buttons twice on one page, which none of the eight source pages ever did (confirmed: every affected `page-hero` is eyebrow + h1 + lede only, no buttons, verified directly against source). This is judgment beyond the literal ask ("make it a prop, wire it up") — flagged here in case a hero CTA is preferred as a deliberate conversion pattern rather than a source-fidelity bug; happy to revert to leaving both if so. `/`'s own hero *does* keep its "Start free trial"/"Book a demo" pair — that one was real content on the old home page, not a relocation, and untouched.
- Unused `Pill`/`Button`/`APP_URL` imports removed from the four pages where the hero action rows went away.
- `tests/unit/primitives.test.ts`'s ghost-pill test and `tests/unit/about.test.ts`'s closing-CTA test both pre-date this fix; updated to match the new behaviour (about.test.ts now checks the closing band specifically, not just page-wide presence, since presence-only is exactly the blind spot that let this ship).

### IMPORTANT — `--space-14` doesn't exist; three layout rules were dead

`site.css` (three declarations) used `var(--space-14)`. The scale is `1,2,3,4,5,6,8,10,12,16,20,24,32` — it skips 14 — so each declaration was invalid at computed-value time and fell back to its initial value. Measured in the built site: `.site-feat-row-image`'s `gap` was `0` (the BOMs screenshot on `/features` butted straight against its feature text); `.site-alt-group`'s `padding-block` was `0` on every group on both `/alternatives/` pages (each group's own `border-top` divider sat flush against the preceding paragraph); `.site-alt-related`'s `padding` was `0`.

**Fix:** swapped each to a real token, chosen by checking the old source's own literal px value for that exact spot and picking the closer real neighbour, then confirmed by screenshotting the rendered result rather than picking by arithmetic alone (both spacing screenshots read clean — clear separation, no crowding, no excess):
- `.site-feat-row-image` gap: old source `56px` → `--space-12` (48px).
- `.site-alt-group` padding-block: old source `72px` → `--space-16` (64px, the closer of the two real neighbours).
- `.site-alt-related` padding: old source `56px` → `--space-12` (48px) — also keeps it visibly lighter than `.site-alt-group`'s 64px above it, matching the old page's own step down from 72px to 56px.

### IMPORTANT — five `<head>` tags missing on all 8 routes

`Base.astro` never emitted `og:site_name`, `og:image:width` (1200), `og:image:height` (630), `og:image:alt`, or `twitter:image` — all five present, identical, on all eight source pages (verified by reading each page's raw `<head>` independently). Separately, `<link rel="icon" sizes="16x16">` for `favicon-16.png` was never emitted, though the file itself ships and an existing test already asserted its presence on disk. Root cause: `Base.astro`'s `<head>` was written in Task 1 and never revisited once later tasks added real per-page `og:title`/`og:description` — the gate never reads `<head>` at all, so nothing could have caught this.

**Fix:** all five meta tags plus the 16px favicon link added to `Base.astro`, values taken from the source pages' own `<head>` (all fixed/identical, not per-page). `twitter:image` lives inside the existing `{twitterDescription && ...}` conditional block, alongside the rest of the Twitter Card — a page with no Twitter card shouldn't have a lone `twitter:image` either. New unit test `tests/unit/seo.test.ts`, "every route emits the full fixed head-tag set", asserts all six on all eight routes against the real build output.

### Minors

1. **Home page's `og:description` was the wrong variant.** `Base.astro` defaults `ogDescription` to the long `description`; `/`'s own source `og:description` is actually the *short* variant (same value already defined as `twitterDescription` in `index.astro`). Fixed: `index.astro` now passes that same value as `ogDescription` too — one already-verified string, two prop names, not a new value.
2. **`Alternative.astro`'s `twitterDescription={ogDescription}` was a broken assumption for one of its two pages.** Katana's own `og:description` and `twitter:description` happen to be identical, so the shared value worked there. MRPeasy's don't — its `twitter:description` drops a further clause ("See how Manuva compares.") that its `og:description` keeps. Fixed: `Alternative.astro` now takes an independent `twitterDescription` prop; `katana.astro` passes its (still-identical) `ogDescription` value explicitly; `mrpeasy.astro` defines and passes its own, genuinely different, shorter value.
3. **`.site-pricing-toggle`/`-btn`/`-on`/`-save` were declared twice, unscoped, for two different pages' toggles** (the home-page decorative preview and `/pricing`'s real one) — both blocks applied on both pages, colliding on whichever property either one set last in the file (this is what round 1's `[data-fold]`/`:not()` overrides were patching around). No visible defect remained after round 1's patches, but the architecture stayed fragile — the next edit to either block would silently change the other page too. Fixed properly this round: both blocks now scoped under each page's own existing section class (`.site-pricing` / `.site-pricing-hero`), which can no longer reach each other's elements at all — the `[data-fold]`/`:not()` overrides are gone, replaced by ordinary specificity within each page's own scope.
4. **`seo.test.ts`'s CDN test was misleadingly named and half a no-op.** Named "no page references the CDN-hosted fonts or icons" but only ever asserted `cdn.jsdelivr.net`, never `fonts.googleapis.com` — the actual, currently-live font CDN reference. Tightened: still checks jsDelivr unconditionally; additionally checks `fonts.googleapis.com` **only once `_ds/tokens/fonts-selfhost.css` exists** (gated on file presence, not hardcoded true/false) — this starts enforcing itself automatically the moment the font swap lands, rather than needing a second person to remember to un-skip it, and doesn't fail red today over the already-reported, already-blocking font gate.
5. **Table column-integrity check covered only the two `/alternatives/` routes.** `/pricing`'s 43-row matrix and both legal pages' own document tables are the same shape of risk (a `<td>` with `display` overridden breaks table layout there exactly as easily). Widened to all 8 routes; added a companion sanity test asserting at least 5 real `<table>` elements are found across the site, so the widened check can't silently pass everywhere because it stopped finding any tables at all.

### Ratified, not changed

The nav dropping **Contact** in favour of **About** (`NAV_LINKS` in `src/site.ts`: Features / Pricing / Compare / About, no Contact) is **confirmed intended** by the design-system author. Left as-is — recorded here per the team lead's instruction so it isn't re-raised as a defect.

## Round 3 — one residual from round 2's own CtaBand fix

Team lead re-verified round 2's per-route "Book a demo" counts against source directly (not through the gate) and found one route wrong: `/`.

Round 2 gave every page with a source `#contact` href a `secondActionHref` on its `CtaBand`, `/` included. But `/`'s hero *already* carries a real "Book a demo" — genuine source content (`origin/master:index.html`'s own `<div class="hero-ctas">`), not a relocation like the other four pages had. The old home page has **no closing cta-section at all** — it ends on the contact section, which this build already preserves — so its `CtaBand` is a structural addition from the design system, the same situation `/pricing`'s already was. Giving it a `secondActionHref` too meant `/` rendered "Book a demo" twice (hero + closing band) against a source count of one.

**Fix:** removed `secondActionHref` from `/`'s `CtaBand` call in `index.astro`, matching `/pricing`'s pattern (no second action — a structural addition, not ported content). The hero's own "Book a demo" is untouched and still real.

**Worth recording for whoever checks this next:** the old home page's raw HTML contains the string "Book a demo" **three** times — one real button in the hero, and two more inside `<script>` comments (JS that used to prefill the removed contact form). The parity extractor strips script content, so the real, extractable count is one. A plain `grep -c "Book a demo" index.html` against the source returns three and points at the wrong conclusion (that a second occurrence was lost, when none was) — confirmed this by checking each of the three matches individually before trusting the count either direction.

**Verified per-route "Book a demo" counts in the built output** (`grep -o "Book a demo" dist/*.html | wc -l`, matching what was asked): `/` → 1, `/features` → 1, `/pricing` → 0, `/about` → 1, `/alternatives/katana` → 1, `/alternatives/mrpeasy` → 1.

## The font prerequisite — blocking

**`_ds/tokens/fonts-selfhost.css` has not landed** (checked both `_ds/tokens/` and its synced copy in `public/_ds/tokens/` — neither exists). `Base.astro`'s `TOKENS` array still lists `fonts`, and `_ds/tokens/fonts.css` still `@import`s from `fonts.googleapis.com`.

Confirmed live, not just by file absence — captured the real network requests off a running page load:

```
https://fonts.googleapis.com/css2?family=Archivo:...&family=Inter:...&family=IBM+Plex+Mono:...&display=swap
https://fonts.gstatic.com/s/archivo/v25/k3kQo8UDI-1M0wlSfdnoLg.woff2
https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2
https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2
```

Every one of the eight pages sends four requests off the origin, unconditionally, on every load. **The site must not go to production like this.** Once `fonts-selfhost.css` ships (MVBOLD-3): swap `fonts` → `fonts-selfhost` in `Base.astro`'s `TOKENS` array, add a `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the Archivo display face, rebuild, and re-run this same "no request leaves the origin" check before shipping. Not worked around here — the design system owner is producing that file, and the swap is a one-word change when it lands.

## TODO markers

`grep -rn "TODO" src/` — **none.** Nothing shipping silently.

## `scripts/parity/ignore.json` — every entry, with its reason

| Route | Suppressed phrase(s) | Reason (verbatim from the file) |
|---|---|---|
| `/` | "First name", "Last name", "Company", "Work email", "Message", "Send message" | The old contact form posted to `mailto:` via `method=POST`, which browsers either ignore or mangle — shipping a form that can silently swallow a message is worse than not shipping one. Author's decision (task-7 ruling): kept the contact section's heading, copy and email verbatim; replaced the form with a direct mailto CTA. These six field-label/submit-button fragments are the form's only casualties. |
| `/features` | `[icon:layout-kanban]` | The old page's own `data-lucide="layout-kanban"` isn't a real Lucide icon name in any version (checked lucide-static@0.544.0's full index and tag list) — it silently rendered as an invisible icon on the live old site too, a bug in the source. Substituted the closest real glyph (`kanban-square`). Team-lead ruling (task-9): authorised, nothing a reader can see is actually lost. |
| `/pricing` | "Need every feature side-by-side?", "Open this page on desktop to see the full comparison matrix." | The old page's entire mobile treatment for the feature matrix was this note telling readers to come back on a bigger screen. This build ships a real mobile fallback (`.mv-matrix-cards`) instead, so the instruction to leave is obsolete, not lost. Team-lead ruling (task-8): drop the note rather than caption a working mobile view with a contradiction. |
| `/about` | — | none |
| `/alternatives/katana` | — | none |
| `/alternatives/mrpeasy` | — | none |
| `/privacy` | — | none |
| `/terms` | — | none |

All nine entries (six phrases + three routes with none) still fire against real, current content — `parity:strict` reports zero stale entries.

## Gate confirmation

`npm run parity:strict` (`--require-all`, fails on a route that never built rather than skipping it): **holds.** 8/8 routes checked, 0 skipped, 0 missing.

## Files changed

Round 1:
- `playwright.config.ts` (new)
- `tests/e2e/routes.spec.ts`, `tests/e2e/a11y.spec.ts`, `tests/e2e/responsive.spec.ts` (new)
- `src/styles/site.css` — contrast/layout fixes
- `src/components/site/Pill.astro` — ghost fill direction fix
- `src/pages/index.astro` — `id="compare"` restored on the comparison section
- `tests/unit/primitives.test.ts` — one assertion updated to match the ghost-pill fix
- `package.json` / `package-lock.json` — `@playwright/test`, `@axe-core/playwright`, `test:e2e` script
- `.gitignore` — Playwright output directories

Round 2 (whole-branch review fix wave):
- `src/components/site/CtaBand.astro` — real `secondActionHref` prop, replaces hardcoded "Talk to us"
- `src/layouts/Base.astro` — five missing `<head>` tags + 16px favicon link
- `src/layouts/Alternative.astro` — `ctaSecondActionHref` and independent `twitterDescription` props
- `src/pages/index.astro` — `ogDescription` now the correct short variant
- `src/pages/{features,about}.astro` — `secondActionHref` wired to CtaBand; hero-relocation workaround removed (unused `Pill`/`Button`/`APP_URL` imports also removed)
- `src/pages/pricing.astro` — comment only, documenting why no `secondActionHref`
- `src/pages/alternatives/{katana,mrpeasy}.astro` — `ctaSecondActionHref` passed to `Alternative`; own `twitterDescription` value; hero-relocation workaround removed (unused `Pill`/`APP_URL` imports removed)
- `src/styles/site.css` — three `--space-14` fixes; `.site-pricing-*` rules properly scoped per page
- `tests/unit/about.test.ts` — closing-CTA test updated to check the band specifically
- `tests/unit/seo.test.ts` — new full-head-tag-set test; CDN test now actually checks fonts.googleapis.com (gated on fonts-selfhost.css existing)
- `tests/e2e/responsive.spec.ts` — table column-integrity check widened from 2 routes to all 8, plus a table-count sanity check

Round 3 (residual):
- `src/pages/index.astro` — removed `secondActionHref` from the home page's `CtaBand` call; its hero's own "Book a demo" (real source content, untouched) is the page's only one now, matching source

## What a person should look at before this goes live

1. **The font prerequisite (above) — blocking.** Do not ship with fonts loading from Google. Not touched by rounds 2 or 3.
2. **Judgment call flagged for confirmation, not blocking:** round 2 removed "Start free trial"/"Book a demo" from the hero on `/features`, `/about`, `/alternatives/katana`, `/alternatives/mrpeasy`, since those buttons only existed there as a workaround for CtaBand's now-fixed limitation, and none of the source pages' heroes have buttons. `/`'s hero keeps its own "Book a demo" — that one is real source content, not a relocation (round 3 confirmed this directly against source). If a hero CTA is actually preferred over strict source fidelity on the other four pages, that's a one-line revert per page.
3. Everything else in this report is closed: 176 unit tests, the parity gate, and 96 e2e tests are all green together on the current `dist/` build. Per-route "Book a demo" counts verified against the built output: `/` 1, `/features` 1, `/pricing` 0, `/about` 1, both `/alternatives/` 1 — matching source exactly.

---

## Operational note — stale preview server produces phantom e2e failures

`playwright.config.ts` sets `reuseExistingServer: !process.env.CI`. If a preview
server from an earlier run is still listening on port 4321, Playwright reuses it
rather than starting a fresh one — and that server keeps serving whatever `dist/`
it was started with.

Observed during the final merge verification: three tests failed at exactly 30.1s
each (`routes.spec.ts` internal-link crawl, `/features` horizontal overflow,
`/features` axe) against a tree that was byte-identical to one where all 96 had
just passed. Killing the stale listener and re-running gave 96/96.

The signature to recognise: several failures at an identical ~30s timeout rather
than assertion messages. Check for a listener on 4321 before investigating the
code.
