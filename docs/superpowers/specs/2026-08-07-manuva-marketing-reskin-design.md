# Manuva marketing site — visual rebuild

**Date:** 2026-08-07
**Status:** Approved design, ready for planning

Rebuild the Manuva marketing site on the new Manuva design system. A re-skin, not
a rewrite: the copy and URLs already exist and perform, so content moves across
verbatim and only the visual layer is new.

---

## 1. Inputs and sources of truth

| Input | Location | Authority over |
|---|---|---|
| Manuva design system | `_ds/` in this repo | Tokens, components, visual rules |
| Old marketing site | `C:\dev\ManuvaMarketing`, branch `origin/master` | All copy, facts, SEO assets |
| Content spec | `llms.txt` on `origin/master` | Positioning, pricing, features, FAQs |
| Developer handoff | `_ds/handoff.md` | Token taxonomy, component rules |
| Build brief | `_ds/claude-code-brief.md` | Scope, hard rules, page mapping |

Where the design system and the old repo disagree on **visuals**, the design
system wins. Where they disagree on **facts or copy**, the old repo wins.

**The local checkout of the old repo is 7 commits behind `origin/master`.**
Everything this spec depends on — `about.html`, `alternatives/`, `llms.txt`,
`robots.txt`, `sitemap.xml`, `_redirects` — exists only on the remote. Read copy
from `origin/master`, never from the stale working tree.

Old page sizes, for parity checking:

| Page | Bytes |
|---|---|
| `index.html` | 66,187 |
| `features.html` | 56,978 |
| `pricing.html` | 48,653 |
| `terms.html` | 48,110 |
| `privacy.html` | 38,163 |
| `alternatives/katana.html` | 31,977 |
| `alternatives/mrpeasy.html` | 28,560 |
| `about.html` | 19,919 |

---

## 2. Decisions

| Decision | Choice | Reason |
|---|---|---|
| Stack | **Astro**, static output | Eight pages with heavy shared chrome; keeps static-site SEO profile, no client JS by default |
| Deploy target | **Netlify** | Old repo already carries a Netlify/Cloudflare-format `_redirects`; it moves across unchanged |
| `/customers` | **Not built** | No testimonials, logos, names or metrics exist anywhere. Nothing to build it from without inventing |
| SEO audit (2026-05-17) | **Deferred** | Pure re-skin this pass. Audit becomes separate follow-up work |
| Beta-tester strip | **Carried across verbatim** | Offer is current. Sits alongside the 14-day trial as a secondary strip |
| Icons | **Inlined at build time** | `Icon.jsx` masks from a jsDelivr CDN at runtime. Inlining removes the third-party dependency and per-glyph request while keeping the same glyphs, version and authoring API |
| Webfonts | **Self-hosted via a new `tokens/fonts-selfhost.css`** — see §3.4 | `tokens/fonts.css` `@import`s Google Fonts, which chains three render-blocking round trips. Fix belongs in the design system; the file is a prerequisite input |
| Mobile drawer | **Ported from `mobile.js`** | Working behaviour with focus trap, Escape handling and reduced-motion support. Worth more than a reimplementation |

### Facts that must not drift

- Trial is **14 days, full Pro access, no credit card**. Not 30 days, not free forever.
- Contact is **hello@manuva.app**. App is **app.manuva.app** — every "Start free"
  and "Sign in" CTA points there.
- Pricing is **flat per account, never per seat**. This is the core differentiator
  against MRPeasy.

| Plan | Annual | Monthly | Limits |
|---|---|---|---|
| Starter | $99/mo ($1,188/yr) | $119/mo | 1 location, up to 5 office seats |
| Growth | $249/mo ($2,988/yr) | $299/mo | Multi-location, unlimited users |
| Pro | $499/mo ($5,988/yr) | $599/mo | Unlimited locations & users |
| Enterprise | Custom | Custom | Unlimited, SSO/SAML, dedicated CSM |

Annual saves approximately 20%.

---

## 3. Architecture

```
src/
  layouts/
    Base.astro        head, SEO, OG, JSON-LD, skip-link, nav + footer
    Doc.astro         long-form legal shell — Base plus a prose column
  components/
    ds/               Logo, Icon, Button — the three design-system ports
    site/             Nav, Drawer, Footer, Field, Panel, Tile, Pill, Marquee,
                      CtaBand, FaqList, PriceCards, FeatureMatrix
  pages/
    index.astro, features.astro, pricing.astro, about.astro,
    privacy.astro, terms.astro,
    alternatives/katana.astro, alternatives/mrpeasy.astro
  styles/
    site.css          only what the design system genuinely does not cover
public/
  _redirects, robots.txt, sitemap.xml, llms.txt,
  screen-dashboard.png, screen-variant.png, screen-components.png,
  favicons, og-image.png
_ds/                  vendored, never edited
```

### The design system is a vendored dependency

`Base.astro` links the token files in the order `_ds/styles.css` establishes,
substituting `fonts-selfhost.css` for `fonts.css` (§3.4). Everything else is
consumed exactly as exported. When the system is re-exported, `_ds/` is replaced
wholesale and the only thing to re-check is that the import list still matches
`styles.css`.

**No token is ever redeclared site-side.** If a needed value is missing, that is
a design-system change, raised as such — not patched locally. `site.css` exists
only for section-shell geometry the system has no opinion on. Colour, type or
spacing values accumulating there is a signal something belongs in the design
system instead.

### Only three components are ported

`Logo`, `Icon` and `Button` are the only real design-system components the
marketing surfaces touch. `SectionHeader`, `FeatureGrid`, `PricingTable`, `FAQ`,
`Testimonial` and `LogoWall` are page-level compositions written inline in the
reference JSX, so they are rebuilt in the site's own vocabulary.

`Pricing.jsx:7` declares `StatusBadge` but never renders it — a dead declaration,
not a dependency.

`DataTable`, `StatusBadge` and `StatusDot` do not cross into marketing at all.
The landing page's product section becomes `screen-dashboard.png`, which is what
the reference mock stood in for before a screenshot existed.

### Icon port

Vendor `lucide-static@0.544.0` as a dev dependency and inline each glyph as SVG
during the build. Same authoring API (`<Icon name="package" size={24} />`), same
glyphs, same version — no runtime requests, no external dependency.

Sizes follow the system: 16px in buttons, 20px in nav, 24px+ in marketing. Never
below 14px. Colour is always `currentColor`. No emoji anywhere.

Domain glyphs are fixed: Inventory `package`, Products `layers`, Production
`factory`, Purchasing `shopping-cart`, Orders `receipt`, Logistics `truck`,
Audit `history`, Settings `settings-2`.

### 3.4 Webfonts — open question for the design-system author

`_ds/tokens/fonts.css` loads Archivo, Inter and IBM Plex Mono with a CSS
`@import` from `fonts.googleapis.com`. Its own comment says this exists so the
specimen cards and kits render standalone, which is a preview-surface need rather
than a production directive — the same seam as the reference layouts' missing
responsive layer and the icon CDN.

In production it costs three serialised round trips on the render-blocking path
(`styles.css` → parse → `fonts.googleapis.com` → parse → `fonts.gstatic.com`)
before any text paints. Archivo is also requested as a full variable font across
`wdth 62..125` and `wght 100..900`. It is additionally a live third-party
dependency on every page and a recurring GDPR question in the EU.

**Resolution taken here:** self-host. Vendor the three families as subset woff2,
declare them with `@font-face` and `font-display:swap`, and preload the Archivo
display face. The token contract is unchanged — `--font-display`, `--font-body`
and `--font-mono` resolve exactly as before.

This is the one place the site cannot consume `_ds/styles.css` wholly unmodified,
because the `@import` lives inside it.

**Decided:** the design system ships a `tokens/fonts-selfhost.css` variant
declaring the three families with `@font-face` against vendored woff2 files. The
site links the token files individually and substitutes `fonts-selfhost.css` for
`fonts.css`; the other nine are linked in the order `styles.css` already
establishes. The fix lives in the system, so the app and the kits get it too.

`_ds/` is still never edited in place — the variant arrives with the next export.

**Prerequisite.** `tokens/fonts-selfhost.css` and its woff2 files do not exist
yet. Until they land the site links `styles.css` as-is and loads fonts from the
Google CDN, which is acceptable in development and **must not ship**. The
verification checklist gates on it.

Requirements for the variant, so the site can rely on it:

- Archivo (display), Inter (body), IBM Plex Mono (mono) as woff2.
- Latin subset at minimum; variable axes trimmed to what the system uses rather
  than the full `wdth 62..125` / `wght 100..900` range.
- `font-display: swap`.
- Same three token names out the other side: `--font-display`, `--font-body`,
  `--font-mono`. No consumer changes.
- Paths relative to the token file, so the folder stays relocatable.

The site preloads the Archivo display face itself — that is a page-level
decision, not a system one.

---

## 4. Responsive strategy

`_ds/tokens/responsive.css` carries the responsive layer. The site consumes it;
it does not reimplement it.

- Fluid display scale via `clamp()` — `--fs-display-*` holds its desktop ceiling
  and reaches its floor around 375px. Pure `vw` interpolation, no offset terms.
- `.mv-cols-2/3/4/6` and `.mv-split` for grid collapse. Never a fixed
  `repeat(N,1fr)` in site markup.
- `--section-y`, `--gutter`, `--panel-pad` scale with the viewport. Panel radius
  drops 32→20px below 720px.
- `.mv-matrix` / `.mv-matrix-cards` swap the pricing feature matrix for per-plan
  bullet lists below 720px. Both exist in the markup.
- 44px minimum touch targets on coarse pointers.

Breakpoints are **480 / 720 / 960**, matching the shipped site so behaviour
carries across rather than being reinvented. `.mv-split` stacks at 860px by
design — the narrow column becomes unreadable before an even grid does.

`--page-max` is 1320px.

The reference layouts in `_ds/ui_kits/marketing/` are desktop preview art built
at 1440 with inline styles, which cannot express a media query. They inform
structure and field rhythm only. `responsive.css` is the contract.

### The drawer

Ported from the old site's `mobile.js`: open/close, focus trap, Escape handling,
`prefers-reduced-motion` support. Below 960px `.mv-nav-links` hides and
`.mv-nav-burger` appears. This is the only real JavaScript on the site.

---

## 5. Pages and field rhythm

Field rotation on the site is for **rhythm, not meaning** — no two adjacent
panels share a hue.

| Route | Copy source | Field sequence |
|---|---|---|
| `/` | `index.html` + `llms.txt` | paper → **cobalt** hero panel → **lime** marquee → cobalt *tint* + screenshot → paper, six field tiles → paper, **amber**/**violet** split → **mint** beta strip → **ink** comparison → **flare** CTA → ink footer |
| `/features` | `features.html`, 10 sections + CTA | **aqua** hero panel → six-tile domain grid → paper spine of 10 detail sections, with full-bleed **violet** after section 3 and **cobalt** after section 7 → **flare** CTA |
| `/pricing` | `pricing.html` + `llms.txt` | **ink** hero → paper plan cards → paper matrix → paper FAQ → **amber** CTA |
| `/alternatives/katana` | `alternatives/katana.html` | **violet** hero → paper comparison → paper FAQ → **flare** CTA |
| `/alternatives/mrpeasy` | `alternatives/mrpeasy.html` | **amber** hero → paper comparison → paper FAQ → **cobalt** CTA |
| `/about` | `about.html`, 4 sections | **mint** hero → paper → **ink** principles → **flare** CTA |
| `/privacy` | `privacy.html` | paper only, ink footer |
| `/terms` | `terms.html` | paper only, ink footer |

`/features` carries ten `<h2>` sections in the source — BOMs, orders, stock
counts, lot tracking, purchase orders, floor, capacity planning, margin,
reporting, Shopify — plus a closing CTA. The six-tile domain grid is a summary
band extended from the landing page and sits above them; it does not replace
them, and no source section is folded into a tile.

Rationale for the three non-obvious calls:

1. **Pricing and both alternatives pages run on paper through the middle.** Plan
   cards, the feature matrix and competitor comparison tables are data, and the
   system's rule is explicit: never a colour field behind a data table. Fields do
   the hero and the CTA; substance sits on paper.
2. **The two alternatives pages use different hues** so they do not read as the
   same page, with CTAs rotated off their own heroes.
3. **Privacy and terms get no fields.** 38KB and 48KB of long-form body copy, and
   the system forbids colour behind it.

### Loud-layer rules in force

- A field is a background. Always paired with its `--on-*` ink.
- Lime `#C8FF2E` is backgrounds and accents only, never text.
- Never a colour field behind a data table.
- Never two fields touching — ink or paper between them. Tile grids show paper
  between every tile, so they count as one composed unit, not six folds.
- One full-bleed field per fold.
- Never a field under form inputs or long-form body copy.

### Type

Archivo for display, large, tight tracking. Numerals use the tabular treatment
(`.mv-numeral` / `.mv-tnum`). Display scale (`--fs-display-1…8`) is marketing
only. The app scale tops out at 26px and is not used here.

---

## 6. Content pipeline

Copy moves **verbatim**. No rewording, no summarising, no restructuring of
argument order. Where the old page has a table of competitor claims, the new page
has the same table with the same rows.

**The two `/alternatives/` pages must not be thinned.** They are 32KB and 28KB of
competitor-intercept content that ranks. If a reference layout looks shorter than
the source, the source wins.

### Copy-parity gate

A script extracts visible text from each old page and its new counterpart,
normalises whitespace, and diffs them. Content present in the old and missing
from the new fails the check.

**It compares main content only.** Nav, footer, cookie and script content are
excluded on both sides — the chrome is deliberately different, so including it
would produce constant false failures and the gate would be ignored within a day.
Scope is `<main>` on the new page against the equivalent content region on the
old one.

Expected, allowed differences, declared per page in an ignore list so that each
is a conscious decision rather than a silent gap:

- The six invented figures listed below.
- Nav and footer link text.
- Any string the user explicitly signs off as dropped.

Everything else present in the old and missing from the new fails. The gate runs
on demand and in CI, not on every dev-server reload. This turns "do not thin the
alternatives pages" from an intention into something enforced, and it catches the
accidental case — which is the one that actually happens.

### Invented numbers

The reference layouts carry invented figures: `1,240` shortages in the landing
hero watermark and split panel, `9 days` lead time, `$339,410` revenue, `830`
factories. **None of these ship.** They are replaced with real claims traceable
to `llms.txt` or an existing page — flat pricing, unlimited users on Growth,
yield % per BOM line, BOM versioning with rollback — or the numeral treatment
carries a real figure such as `$249/mo` against `$490/mo` from the existing
comparison.

Anything that cannot be sourced becomes a visible `TODO` and is reported, never
a plausible-looking invention.

---

## 7. URLs and SEO assets

All eight routes preserved exactly:

`/` · `/features` · `/pricing` · `/about` · `/alternatives/katana` ·
`/alternatives/mrpeasy` · `/privacy` · `/terms`

`_redirects` moves across unchanged — it 301s the eight `.html` variants to their
clean URLs and collapses duplicate indexation. `robots.txt` (which explicitly
allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others),
`sitemap.xml` and `llms.txt` all carry across. The sitemap changes only if routes
genuinely change — they do not, so `lastmod` values are the only edit.

### Trailing slashes

The live URLs have no trailing slash (`/features`, not `/features/`). Astro's
default `build.format: 'directory'` emits `features/index.html`, which Netlify
serves at both spellings but canonicalises to one. Left unconfigured this
produces a 301 hop on every internal link — survivable, but it is exactly the
kind of quiet regression a re-skin is supposed to avoid.

Set `trailingSlash: 'never'` in `astro.config.mjs`, emit
`netlify.toml` with matching behaviour, and write canonical tags without the
slash so `sitemap.xml`, canonicals and internal links all agree on one spelling.
Verify with a crawl before ship: every internal link should be a 200, not a 301.

---

## 8. Accessibility

The field/ink pairings are chosen to clear AA. Use them **as paired** and do not
invent new combinations. `--accent-on` is the ink that clears AA on a solid
`--accent-loud` fill.

- Contrast verified on every field/ink pairing used.
- `--warning` is `#8A5200`, not the shipped `#D97706` — the original fails AA at
  11–13px. Copying colour from the live app reintroduces the failure.
- Skip link in `Base.astro`.
- Drawer keeps its focus trap and Escape handling.
- Nothing gated on JS: `prefers-reduced-motion` leaves all content visible.
  Reveals, hover lift, press feedback and the marquee are decoration only.

---

## 9. Out of scope

- `/customers` — no real content exists.
- SEO audit remediation — deferred to separate work.
- Customer logos, testimonials, photography.
- Any change to `_ds/`. Issues found are reported, not patched locally.
- The old repo's working tree. It is read-only for this project.

---

## 10. Verification before completion

- [ ] Every route from the old site resolves or 301s.
- [ ] Copy-parity gate passes on all eight pages.
- [ ] No invented facts; every claim traces to `llms.txt` or an existing page.
- [ ] All `TODO` markers listed for the user, none left silently.
- [ ] Contrast checked on every field/ink pairing used.
- [ ] No two adjacent panels share a hue.
- [ ] No colour field behind a table, form input or long-form copy.
- [ ] Lime used as background or accent only, never as text.
- [ ] Renders correctly at 375, 480, 720, 960 and 1440.
- [ ] Drawer opens, traps focus, closes on Escape.
- [ ] `prefers-reduced-motion` leaves all content visible.
- [ ] No runtime requests to third-party origins — no jsDelivr, no
      `fonts.googleapis.com`, no `fonts.gstatic.com`.
- [ ] Every internal link returns 200, not a 301 trailing-slash hop.
- [ ] `_redirects`, `robots.txt`, `sitemap.xml`, `llms.txt` present in build output.
- [ ] All eight `.html` legacy paths 301 to their clean URLs.
