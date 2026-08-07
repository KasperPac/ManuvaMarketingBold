# Brief for Claude Code — Manuva marketing site

Paste this whole file as your opening prompt, with the design system exported
into the repo (see **Inputs**). Everything below is instruction, not context.

---

## What you are building

A new marketing site for **Manuva** — MRP software for Shopify-first
manufacturers, by Pac Technologies Pty Ltd (Australia). It replaces the
existing site at `manuva.app`.

This is a **re-skin, not a rewrite**. The copy and URLs already exist and
perform. Your job is to rebuild them on a new visual system. Keep the diff
reviewable: content moves across close to verbatim, only the visual layer is new.

## Inputs

1. **`_ds/`** (or wherever you put it) — the Manuva design system. `handoff.md`
   at its root is the authority on tokens, components and rules. Read it first.
2. **The old site repo** — `KasperPac/ManuvaMarketing`. Source for all copy,
   SEO assets and product screenshots. Read `llms.txt` first: it is a complete
   content spec (positioning, features, pricing, competitor claims, FAQs).

Where the two disagree on visuals, the design system wins. Where they disagree
on facts or copy, the old repo wins.

## Hard rules

- **Preserve every URL exactly**, or 301 it. `/`, `/features`, `/pricing`,
  `/about`, `/alternatives/katana`, `/alternatives/mrpeasy`, `/privacy`,
  `/terms`.
- **Carry `sitemap.xml`, `robots.txt` and `llms.txt` across.** Update the
  sitemap only if routes genuinely change.
- **Do not thin the two `/alternatives/` pages.** They are 32KB and 28KB of
  competitor-intercept content that ranks. Move the copy verbatim. If a design
  reference looks shorter than the source, the source wins.
- **Do not invent numbers, claims, testimonials or customer names.** Every
  factual claim must trace to `llms.txt` or an existing page. If you need a
  figure that isn't there, leave a visible `TODO` and tell the user.
- **The trial is 14 days, full Pro access, no credit card.** Not 30. Not
  "free forever".
- Contact is `hello@manuva.app`. App lives at `app.manuva.app` — every "Start
  free" and "Sign in" CTA points there.

## Real pricing (USD)

| Plan | Annual | Monthly | Limits |
|---|---|---|---|
| Starter | $99/mo ($1,188/yr) | $119/mo | 1 location, up to 5 office seats |
| Growth | $249/mo ($2,988/yr) | $299/mo | Multi-location, unlimited users |
| Pro | $499/mo ($5,988/yr) | $599/mo | Unlimited locations & users |
| Enterprise | Custom | Custom | Unlimited, SSO/SAML, dedicated CSM |

Annual saves ~20%. Pricing is **flat per account**, never per seat — this is a
core differentiator, especially against MRPeasy.

## Responsive — read this before you scope

The reference layouts in `ui_kits/marketing/` have **no responsive layer**.
They are desktop preview art at 1440×900 built with inline styles, which cannot
express a media query. Treat their breakpoint behaviour as absent, not as a
decision.

The responsive contract lives in **`tokens/responsive.css`** instead. Load it
and use it — it is not optional decoration:

- Fluid display scale via `clamp()`. Same desktop ceilings, sane phone floors.
  Use `--fs-display-*` and the sizing is handled.
- Grid collapse utilities: `.mv-cols-2/3/4/6` and `.mv-split`. Use these
  instead of a fixed `repeat(N,1fr)`.
- Section rhythm: `--section-y`, `--gutter`, `--panel-pad` all scale.
- Panel radius drops from 32px to 20px below 720px.
- 44px minimum touch targets on coarse pointers.

**Breakpoints are 480 / 720 / 960 — matching the shipped site**, so behaviour
carries across rather than being reinvented.

**Port these behaviours from the old site rather than rebuilding them.** They
work today and they are more subtle than they look:

- The mobile nav drawer, with its focus trap, Escape handling and
  `prefers-reduced-motion` support (`mobile.js`).
- The pricing feature matrix swapping to per-plan bullet lists below 720px.
  The old repo marks the two with `<!-- KEEP IN SYNC -->` comments — keep that
  discipline; `.mv-matrix` / `.mv-matrix-cards` in `responsive.css` handle the
  switch.

## Using the design system

Load its global CSS and use its tokens. Never hardcode a colour, size or
spacing value that a token already names.

**The field system** is what makes this site bold. Fields are saturated
full-bleed background colours (`--field-cobalt`, `--field-flare`,
`--field-amber`, `--field-violet`, `--field-mint`, `--field-aqua`,
`--field-lime`, `--field-ink`). Each pairs with an `--on-*` ink token. Always
use the pair.

**Rules that are not negotiable** (they are in `handoff.md` in full):

- A field is a background. Never small text on white.
- **Lime is an accent, never a main surface.** Buttons, rules, eyebrows,
  single words in a headline. Never a whole panel of it behind body copy.
- Never a colour field behind a data table.
- Never two fields touching without ink or paper between them.
- Never more than one field per screen fold.
- Never a field under form inputs or long-form body copy.

**Colour means rhythm here, not meaning.** On the site, rotate fields so no two
adjacent sections share a hue. (In the product, colour is tied to domain — that
distinction matters and is documented.)

Type is Archivo for display, at large sizes with tight tracking. Numerals use
the tabular numeral treatment. Don't substitute a different font.

## Pages, and what to build each from

| Route | Copy source | Visual reference |
|---|---|---|
| `/` | old `index.html` + `llms.txt` | `ui_kits/marketing/index.html` |
| `/pricing` | old `pricing.html` + `llms.txt` | `ui_kits/marketing/pricing.html` |
| `/features` | old `features.html` | landing page domain grid, extended |
| `/alternatives/katana` | old `alternatives/katana.html` | `alt-katana.html` |
| `/alternatives/mrpeasy` | old `alternatives/mrpeasy.html` | `alt-mrpeasy.html` |
| `/customers` | **none exists** | `customers.html` |
| `/about` | old `about.html` | — |
| `/privacy`, `/terms` | old files | plain document layout |

The visual references are React files in the design system's `ui_kits/marketing/`.
They are **reference layouts, not code to lift** — they run on a preview runtime,
not a production stack, and they have no responsive layer. Read them for
structure, spacing and field rhythm; write the CSS properly in your stack.

**Only three design-system components are actually needed for marketing:**
`Logo`, `Icon` and `Button`. Port those three. Everything else on these pages
is page-level composition, not a shared component — build it in the site's own
vocabulary (Field, Panel, Tile, Section, FAQ, PricingTable).

Do **not** port the app-surface components (`DataTable`, `StatusBadge`,
`StatusDot`, `ListPanel`, `Metric`, and the rest). A marketing site must never
render them, and one of the system's own rules forbids a colour field behind a
data table. Where the landing reference mocks a product table, **use the real
screenshot instead** — `screen-dashboard.png` from the old repo.

## Known placeholders — must not ship

- **`/customers` has no real content.** No testimonials, logos, names or metrics
  exist anywhere. The reference layout marks every one. Either get real content
  from the user or do not ship the page.
- **The alternatives FAQ answers** in the reference are stubs. The real answers
  are in the old repo's HTML.

## Assets

Product screenshots are in the old repo, normalised to 2080×1090:
`screen-dashboard.png`, `screen-variant.png`, `screen-components.png`.
`hero-dashboard.png` is an unreferenced old placeholder — do not use it.

Logo: `public/Manuva_svg.svg` (detailed) or the design system's
`assets/logo-lockup.svg` / `logo-mark.svg` / `logo-wordmark.svg`, which inherit
`currentColor` and are the better choice on coloured fields.

## Stack

The old site is static HTML/CSS/JS with no build step. Match that simplicity
unless the user asks otherwise — a static site generator (Astro or similar) is
the natural upgrade: it keeps the output static and fast while letting you share
the nav, footer and field components across pages.

Accessibility is not optional: the field/ink pairings are chosen to clear AA,
so use them as paired and don't invent new combinations.

## Before you finish

- Every route from the old site resolves or redirects.
- No invented facts; every claim traces to source.
- No `TODO` markers left silently — list them for the user.
- Contrast checked on every field/ink pairing you used.
