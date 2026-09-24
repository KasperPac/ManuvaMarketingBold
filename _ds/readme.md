# Handoff: Manuva marketing site

## Overview
A full rebuild of the marketing site at `manuva.app` for **Manuva**, MRP software for Shopify-first manufacturers from Pac Technologies Pty Ltd (Australia). The pages are home, features, pricing, customers and two competitor pages (vs Katana, vs MRPeasy). There's one responsive design, built mobile first, with bold full-bleed colour fields and big shape-cut scroll transitions. How much motion a page gets depends on its job.

Target repo: **`KasperPac/ManuvaMarketing`** (the current static site). This is a **re-skin**: URLs, SEO copy, `sitemap.xml`, `robots.txt` and `llms.txt` carry across. Only the visual layer changes.

## About the design files
The HTML in `ui_kits/marketing/` is a **design reference**, not production code. It's a working prototype of the intended look and behaviour. Open any page in a browser and scroll it at 375, 768 and 1440 wide.

Recreate it in the target repo. Keep the site static: plain HTML with a static site generator (Astro is the natural fit), so the header, footer and patterns are shared without shipping a framework to the browser.

**What to lift almost verbatim:** `tokens/*.css`, `ui_kits/marketing/site.css`, and the motion engine in `ui_kits/marketing/site.js` (the `SHAPES` array, `introU`, the stage and chips logic). These are plain CSS/JS with no build step, and they *are* the design.

**What must change** (these are prototype shortcuts):
1. **Header, drawer and footer are injected by JS** in `site.js`. Make them real server-rendered markup in a shared layout.
2. **Features and compare content is rendered from JS arrays** (`features.html` inline script, `compare.js`). Move the data to content files (JSON/MD) and render it at build time. Nothing crawlable may depend on JS.
3. **Logo is fetched and inlined at runtime.** Inline the SVG at build time instead.
4. **Header colour is sampled at runtime** with `elementFromPoint`. That's acceptable to keep, but the cheaper approach is to put `data-head="light|dark"` on each section and read it in the existing scroll loop.
5. **`image-slot.js`** on customers is a design-tool placeholder. Use real `<img>` elements once content exists.

## Fidelity
**High fidelity.** Colours, type, spacing, breakpoints and motion are final. Match them exactly, using the tokens rather than hardcoded values.

## Motion is rationed by page — keep this
| Route | Reference | Motion |
|---|---|---|
| `/` | `index.html` | **Full**: pinned stage of six shape-cut panels, speed-reactive marquee |
| `/features` | `features.html` | **Full**: each domain enters with its own shape cut; sticky domain chips |
| `/customers` | `customers.html` | **One moment**: a single shape cut into the sectors section |
| `/alternatives/katana`, `/alternatives/mrpeasy` | `alt-*.html` | **One moment**: a single shape cut into the feature table |
| `/pricing` | `pricing.html` | **None**: nothing pins |
| `/about`, `/privacy`, `/terms` | — | **None**: plain document layout on paper, same header and footer |

Don't add pinned sections to pricing, legal or document pages. What carries everywhere is the full-field hero, display type, ghost numerals, numbered lists, comparison table, FAQ, closing call to action and footer.

## Breakpoints
Mobile first. **≤720** is the base, **721+** is tablet (inline nav replaces the burger; two-column lists), **1100+** is desktop (content held to `--page-max` 1240px; three-column lists; sticky left column in `.split`). The gutter is 20 / 32 / `max(48px, (100% − 1240px)/2)`.

## Shared patterns (build these as components)
| Pattern | Class in reference | Notes |
|---|---|---|
| Layout | `.site-head`, `#drawer`, `.site-foot` | Fixed header 64px (76 at 721+); logo lockup 24px tall. The full-screen ink drawer slides down 400ms `--ease-out`; Escape closes it; lock body scroll while open. **Port the old site's `mobile.js` focus trap into it.** The footer ends with a full-width logo lockup. |
| Hero | `.hero` (`.tall` = 100svh) | Full field; content bottom-aligned; optional `.ghostnum` numeral at 9% opacity that drifts 0.3× scroll. |
| Shape-cut intro | `.intro[data-from][data-shape] > .ipin > .cut.mv-field-*` | 170svh tall, pinned 100svh. The backdrop is the field you came *from*; the new field clips in over it. Progress starts when the intro's top reaches 35% of the viewport and completes at 80% of its travel. Children with `data-rate` (px) drift `(1−u)×rate`. |
| Pinned stage | `.stage > .pin > .panel[data-shape]` | Height = panels × 100svh. Each panel clips in over the last. Tick bar at the bottom. Each panel links to its features section. |
| Numbered list | `.nlist` (`.two`, `.three`) | 2px rules at 22% `currentColor`; index in numeral face; h3 26/30px. |
| Comparison table | `.ctable` | 3 columns; Manuva column bold; the other one at 55%. |
| FAQ | `.faq` | `<details>`; "+" rotates 45° when open. |
| Domain chips | `#chips` | Fixed bottom pill bar; the active chip takes its domain's field; hidden over the hero and the closing call to action (`[data-chips-end]`); clicking scrolls to the point where that shape has fully landed. |
| Marquee | `.marquee` | Lime strip; base drift 0.05 px/ms, boosted by scroll velocity and decaying at ×0.92 per frame. |
| Pill | `.pill` (`.ink`, `.white`, `.ghost`) | Min-height 54px (58 at 721+), radius 999, 17px/700. |

## Motion spec
- **Shapes, never fades.** In order: iris `circle()`, diagonal slab, diamond, column wipe, blade, shutter `inset()`. See `SHAPES` in `site.js`.
- Easing: cubic in-out (`u<.5 ? 4u³ : 1−(−2u+2)³/2`).
- Everything runs off scroll position in **one `requestAnimationFrame`**, never IntersectionObserver, so a fast flick or restored scroll can't strand a transition.
- **`prefers-reduced-motion`:** no clip-paths or drift, pins released, intros become normal 100svh sections. Test this.
- Animate only `clip-path` and `transform`.

## Design tokens
Everything is in `tokens/`; `handoff.md` is the authority on the token system and its rules.

**Fields** (always use a field with its `--on-*` pair):
cobalt `#3A5EFF`/#FFF · flare `#FF4D00`/#FFF · amber `#FFB300`/#141413 · violet `#B026FF`/#FFF · mint `#00C271`/#141413 · aqua `#00B9D6`/#141413 · lime `#C8FF2E`/#141413 · ink `#15314D`/#FFF · paper `#FAFAF9`/#141413.

**Type:** display is Archivo, `wdth 118`, `wght 800`, line-height .88, tracking −.035em. Numerals are Archivo `wdth 78`, `wght 800`, tracking −.04em. Body is Inter. The eyebrow is 12px/700, tracking .16em, uppercase. Display sizes are viewport-based on mobile (h1 15.5vw, section h2 12vw) and clamp on desktop (h1 96–156px, cut h2 96–180px).

**Radius:** plan and story cards 28px; pills 999px; lime highlight 10px.

### Where this site deliberately revises older rules in `handoff.md`
- **Fields touching:** allowed *only* at a shape-cut boundary. The cut is the separator.
- **Lime as a surface:** allowed for closing call-to-action sections and the marquee, with display type plus one short line only. Still never behind body copy or a table.
- **Colour field behind a table:** allowed for `.ctable` on **ink only** (a comparison, not app data). Never behind product data tables.

## Content sources — do not invent
- Pricing figures, the plan matrix and FAQ come from **`llms.txt`** in `ManuvaMarketing`. Starter $99 / Growth $249 / Pro $499 per month annual (monthly $119 / $299 / $599); Enterprise custom. Flat per account, unlimited users from Growth.
- Features copy comes from the live app's modules (`KasperPac/Assemblio`, `src/app/app/route-meta.ts`), grouped into Inventory, Purchasing, Production, Sales, Planning and Reporting. Planning is behind an upgrade in the app, so it's tagged "Upgrade plan". Check with the user which plan that is before shipping.
- Compare pages: the headings and claims here are the live site's own. **The live `alternatives/*.html` pages are 28–32KB and rank. Carry every paragraph across verbatim**; the reference is shorter than the source, and the source wins.
- The trial is **14 days, full Pro access, no credit card**. All "Start free" and "Sign in" links go to `app.manuva.app`. Contact is `hello@manuva.app`.

## Placeholders that must not ship (listed for the user)
- **Customers:** every quote, name, metric and logo is a placeholder (marked `TODO`). No real content exists anywhere. Get it from the user, or leave the page unpublished.
- **Compare FAQ answers:** stubs. The real answers are in the old repo's HTML.
- **Home "1,240" ghost numeral:** decorative only, but confirm it isn't read as a claim.

## Assets
- Logo: `assets/logo-lockup.svg` (used in the header, drawer and footer), plus `logo-mark.svg` and `logo-wordmark.svg`. All paint in `currentColor`; inline them.
- Product screenshots (2080×1090) are in the old repo: `screen-dashboard.png`, `screen-variant.png`, `screen-components.png`. They're not used in this design. Ask before adding any.

## Done means
- Every old route resolves or 301s; `sitemap.xml`, `robots.txt` and `llms.txt` carried across.
- All content is in the HTML at build time (check with JS disabled: nav, footer, features, compare tables and FAQs all present).
- Checked at 375, 768, 1100 and 1440, plus with reduced motion on.
- No horizontal scroll at any width; touch targets at least 44px.
- Contrast checked on every field/ink pair used.
- Remaining `TODO`s listed for the user, not left silently.

## Files
- `ui_kits/marketing/index.html`, `features.html`, `pricing.html`, `customers.html`, `alt-katana.html`, `alt-mrpeasy.html`: page references
- `ui_kits/marketing/site.css`, `site.js`: shared layer and motion engine
- `ui_kits/marketing/compare.js`: compare-page data and renderer (move the data to content files)
- `styles.css` + `tokens/*.css`: tokens
- `assets/`: logos
- `handoff.md`: design-system authority (tokens, rules, component patterns)
