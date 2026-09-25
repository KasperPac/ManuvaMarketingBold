# Manuva marketing site (Bold)

Marketing site for Manuva, rebuilt on the Manuva design system. Astro static
output, deployed to Vercel. A re-skin of `KasperPac/ManuvaMarketing` — the copy
and URLs already exist and perform, so only the visual layer is new.

## Task tracking

- **monday.com board:** `Manuva` (id `5099992950`, Software Automation workspace) — the
  product board, shared with the Assemblio/Manuva app. There is no separate
  `ManuvaMarketingBold` board; the id `5101754034` recorded here until 2026-09-25 did not
  resolve, so none of MVBOLD-1..17 was ever tracked. Marketing-site work goes on the Manuva
  board and takes **that board's own `MANUVA-n` codes**, because `Task No` is per-board and a
  second numbering sequence on one board would collide.
- **Task code prefix:** `MANUVA` on the board. `MVBOLD-n` stays in commit messages and branch
  names — it is the history's own reference and rewriting it would break every existing commit
  — so an item names both, e.g. `MANUVA-28 … (MVBOLD-17)`.
- The board description carries `[repo: KasperPac/Assemblio]`. This repo is
  `KasperPac/ManuvaMarketingBold`, so the dashboard's repo join is wrong for these items.
  Worth fixing when someone decides whether the marketing site deserves its own board.

## Governing documents

- `docs/superpowers/specs/2026-08-07-manuva-marketing-reskin-design.md` — the design spec
- `_ds/handoff.md` — token taxonomy, component rules, loud-layer rules
- `_ds/claude-code-brief.md` — scope and hard rules

## Sources of truth

Visuals: the design system in `_ds/`. Facts and copy: the old repo at
`C:\dev\ManuvaMarketing`, branch **`origin/master`** — the local working tree is
behind and does not contain `about.html`, `alternatives/`, `llms.txt`,
`robots.txt`, `sitemap.xml` or `_redirects`. Read copy with `git show
origin/master:<path>`, and treat that repo as read-only.

## Deployment

Vercel, from `master`. `astro.config.mjs` sets `build.format: 'file'`, so every
route emits as `<route>.html` rather than `<route>/index.html` — Netlify serves
those at clean URLs automatically, **Vercel does not**. `vercel.json` sets
`cleanUrls: true` to do it, and without that every route except `/` returns 404
while the landing page looks perfectly fine. `netlify.toml` and
`public/_redirects` are kept for Netlify/Cloudflare and are ignored by Vercel.

## Standing rules

- **`_ds/` is vendored and never edited in place.** Issues found there are raised,
  not patched locally. It is replaced wholesale on re-export.
- **No token is redeclared site-side.** A missing value is a design-system change.
- **Nothing is invented.** Every factual claim traces to `llms.txt` or an existing
  page. Anything unsourceable becomes a visible `TODO` and is reported.
- **Copy moves verbatim.** The two `/alternatives/` pages especially — 32KB and
  28KB of ranking competitor-intercept content. The parity check gates this.
- The reference layouts in `_ds/ui_kits/marketing/` are desktop preview art built
  at 1440 with inline styles. They inform structure and field rhythm only;
  `_ds/tokens/responsive.css` is the responsive contract.

## Loud-layer rules

A field is a background, always paired with its `--on-*` ink. Lime is backgrounds
and accents only, never text. Never a colour field behind a data table, form
inputs or long-form body copy. Never two fields touching. One full-bleed field per
fold. On the site colour rotates for rhythm, not meaning — no two adjacent panels
share a hue.

## Known prerequisite

`_ds/tokens/fonts-selfhost.css` and its woff2 files do not exist yet (MVBOLD-3,
owned by Kasper). Until they land the site loads fonts from the Google CDN, which
must not reach production. See spec §3.4.
