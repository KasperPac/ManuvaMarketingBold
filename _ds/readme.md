# Manuva Design System

**Manufacturing operations, finally simple.**

Manuva is manufacturing operations software (MRP) for small and mid-sized manufacturers — the simpler alternative to legacy MRP for Shopify manufacturers. Multi-tenant SaaS: marketing site at `manuva.app`, product at `manuva.app/app`.

The product is six domains plus orders:

| Domain | What it covers |
|---|---|
| **Inventory** | Stock levels, warehouse and bin locations, goods inwards |
| **Products & BOMs** | Components, variants, bills of materials, reusable templates |
| **Production** | Production orders, labour, allocation of stock to jobs |
| **Purchasing** | Purchase orders, suppliers, receiving |
| **Logistics** | Despatch, packing, carriers |
| **Audit** | Activity log of who changed what, when |
| *Orders* | Customer orders, synced live from Shopify |

**Two users, one product.** The ops person at a desk lives in dense tables all day. The person on the floor glances at a screen between tasks and needs state at a distance. The system serves both by being loud where it counts and silent where it matters.

> **Component provenance.** Every component in `components/` is an **intentional addition**, built to match the real primitives in `src/app/app/_ui/` in the live repo — not derived from a Figma kit. `Manuva.fig` contains brand artwork only and defines no component library, so there is no kit vocabulary to rename against. Any tool report of "components named after nothing in the kit" or an unbuilt `Building blocks/General item` family is expected and can be ignored.

---

> **Building on this system?** Read [`handoff.md`](handoff.md) — what to take, which
> tokens are public API, how theming and domain scoping work, and the rules that
> aren't expressible in types.

## Sources

| Source | What it gave us |
|---|---|
| **[github.com/KasperPac/Assemblio](https://github.com/KasperPac/Assemblio)** (branch `main`) | **The live app.** `src/app/globals.css` = the real token set and four themes. `src/app/app/_ui/*` = the real component inventory. `src/app/app/shell.module.css` + `dashboard.module.css` = the real layout. `docs/design-system.md` = the enforced usage rules. See `github.md` for the sync record and screen map. |
| `Manuva.fig` (page "Page-1", frame `Manuva_svg`, node `1:32`) | **The logo only** — the interlocking-M ascending-arrow mark and the "Manuva" wordmark, as 17 vector paths in navy `rgb(21,49,77)` (`#15314D`) with two knocked-out counters in the `a`s. Split here into `assets/logo-mark.svg` (741.242 × 482.347), `assets/logo-wordmark.svg` (1361.115 × 243.403) and `assets/logo-lockup.svg` (2189.357 × 482.347), preserving the file's exact geometry. **No components, no variables, no text styles** — the file's one symbol, `Building blocks/General item`, is an empty Figma default and its 18 "Ungrouped" variables are stray Material tokens, neither of which belongs to Manuva. |
| Brand guideline brief (Manuva / Kasper, 2026-08-06) | Positioning, audience, the hard constraints, and the FIFA World Cup 26 tonal reference. |

**How the three fit together.** The repo is where the brand *is*; the brief asks for where it *goes*. So this system **keeps every shipped token name, component API, layout and usage rule** from `Assemblio`, and changes only the values — slate → warm graphite, indigo → cobalt — plus a small, clearly-marked set of additions (a display face, the numeral device, six domain accents, poster surfaces). It is intended to drop into `src/app/globals.css` without touching a single `.module.css` selector.

> Note: the repo is still named **Assemblio** and `product/blurb.md` still carries the old positioning ("Manufacturing operations, without the chaos"). The app itself, `docs/design-system.md` and `public/manuva*.svg` are already on **Manuva**. Worth finishing that rename.

### What changed vs. what is new

| | |
|---|---|
| **Same names, new values** | `--bg-page`, `--bg-sidebar`, `--bg-card`, `--bg-card-2`, `--bg-card-alt`, `--bg-input`, `--ink-strong/muted/faint/on-brand`, `--stroke`, `--stroke-card`, `--stroke-strong`, `--surface-0/1/hover`, `--brand-1/2/dim/dark`, `--ok`, `--warning`, `--danger`, `--info` (+ `-dim`), `--focus-ring/-border`, `--shadow-sm/card/md/lg/focus`, `--scrollbar-thumb(-hover)`, `--logo-filter`, `--fs-*`, `--fw-*`, `--lh-*`, `--ls-*`, `--radius-*`, `--border-*`, `--space-1..12`, `--dur-*`, `--ease-*` |
| **Additions** (all marked in the CSS) | `--font-display`, `--font-numeral`, `--wdth-*`, `--fs-display-1..8`, `--fw-black`, `--lh-display`, `--ls-mega/-display/-key`, `--radius-0/-2` + role aliases, `--border-rule`, `--bg-ink`, `--surface-active`, `--ok-dot`/`--warning-dot`/`--danger-dot`/`--info-dot`, `--domain-*` (6 × 3), `--accent-loud/-text/-dim`, `--space-16/20/24/32`, `--dur-instant`, `--dur-live`, `--ease-snap`, `--row-*`, `--control-*` |
| **Nothing removed** | Every token the app reads today still resolves. |

### Two deliberate departures

1. **The primary button loses its gradient.** `_ui/buttons.module.css` fills with `linear-gradient(135deg, var(--brand-1), var(--brand-2))`. The brief's whole thesis is "not another purple gradient SaaS" — so `Button` here is a flat `--brand-2` fill. One line to change back if you disagree.
2. **`--warning` darkens to `#8A5200`.** The shipped `#D97706` is ~3.4:1 on white and fails AA for the 11–13px text it is used on. The vivid amber survives as `--warning-dot` so status still reads at a distance.

**Not taken from the WC26 reference:** football imagery, pitch green, flags, national symbolism, celebration motifs, or anything resembling FIFA's marks or typefaces. The reference is tonal only — hero numerals, one system with many identities, poster energy, broadcast clarity, an open and arriving feel.

---

### The colour argument: indigo out, Cobalt in, navy at the dark end

The brief asked us to keep, evolve or replace indigo `#6366F1` and argue it. **We replaced it.**

`#6366F1` is the default tint of the 2020s SaaS shelf. It is soft, violet-leaning and low-contrast — it fails AA against white for anything but large text, it goes muddy on cheap workshop monitors, and it reads as "another purple gradient SaaS," which is exactly the accusation the brief wants to escape. It also sits next to the amber and red of the status set badly, because its violet cast pulls warm.

**Cobalt** is the same *decision* made harder. It is a pure, high-chroma blue with no violet in it: brighter, colder, more electric, and unmistakably signal rather than decoration. It clears 5.9:1 against white as text and, at `#1E36DB`, 8:1 with white type on top — so the same hue works as a headline, a button fill and a link without a second family. Against the warm-black neutrals it produces the contrast the brief is asking for: **industrial substrate, electrical accent**. Cold blue on warm graphite is the whole visual thesis in two colours.

The neutrals moved too. The old slate ramp is blue-grey; our ink is `#141413`, taken directly from the logo, so the ramp is **warm graphite**. That single change is what stops the system reading as generic — every grey in the product now belongs to the mark.

### Resolved: navy at the dark end

The logo draws in navy `#15314D`, and the shipped app's sidebar was already navy — so this was never a change, only a name for what was true. Navy is now the **dark end** of the system: `--bg-sidebar` `#0E1B2C`, `--bg-ink` and the marketing `--field-ink` `#15314D`. Mid and light greys stay warm graphite, and `--ink-strong` stays `#141413`, so body text and paper surfaces are unaffected.

Cobalt moved with it. Navy substrate plus a mid blue accent is blue-on-blue, so `--brand-1` brightened from `#2B4BFF` to **`#3A5EFF`** to hold the separation. `--brand-2` `#1E36DB` is untouched and remains the AA-safe value for text and white-on-brand fills.

### The marketing fields

Six of the marketing fields *are* the domain accents at full bleed, plus lime `#C8FF2E`. That is the loud layer — see `tokens/marketing.css` and the **Marketing fields** card. It reaches the site, OG cards, the email header band, sales-deck openers and in-app onboarding. It does not reach the app's working surfaces.

---

## CONTENT FUNDAMENTALS

### The promise

> **Manufacturing operations, finally simple.**
> Inventory, BOMs, work orders and stock control — connected, live, and built for the floor.

### Tone

Three words to write against: **structural, live, decisive.** Manuva talks like a good production supervisor: says the number, says what to do, stops talking.

- **Direct and declarative.** State the fact, then the consequence. Never hedge.
- **Quantified.** If there is a number, lead with it. "3 components short for job 4192" beats "Some components are unavailable."
- **Present tense, active voice.** "Stock updates as the floor scans." Not "Stock will be updated."
- **Second person for the user, first person plural almost never.** "You" is the operator. "We" only in marketing, and sparingly.
- **No exclamation marks. No emoji. Ever.** Not in the app, not in email, not in social. A shortage is not a delight moment.
- **Sentence case everywhere** — buttons, labels, headings, nav, table headers excepted (column keys are UPPERCASE at 11px as a typographic device, not as writing).
- **Serial comma. Australian/UK spelling** ("organise", "catalogue", "despatch"). Metric units.
- **Abbreviate like the floor does** — SKU, BOM, WO, PO, MOQ, WIP, GRN. Expand on first use in marketing; never expand in the app (use a Tooltip).

### Do / don't

| Do | Don't |
|---|---|
| "3 components short for job 4192." | "Oops! Looks like something went wrong 😅" |
| "Sent PO-1042 to Kingsgrove Metals." | "Your PO has been successfully submitted!" |
| "Stock is live from the floor." | "Unleash the power of your supply chain." |
| "Coverage: 14 days." | "Running a little low on stock." |
| "Nothing to receive today." | "All caught up — nice work! 🎉" |
| "Delete 4 work orders? This can't be undone." | "Are you sure you want to proceed?" |

### Copy patterns by surface

- **Buttons** — verb + object, 1–3 words: *Create purchase order*, *Release job*, *Receive stock*. Never *Submit*, *OK*, *Click here*.
- **Empty states** — the number `0` at display size, one line of fact, one action. *"0 · No open production orders. Release a job to start allocating stock."*
- **Errors** — what failed, what it means, what to do. *"Shopify sync failed 2 hours ago. Orders may be out of date. Reconnect."*
- **Notifications & email subject lines** — noun-first and scannable: *"PO-1042 confirmed · Kingsgrove Metals"*, *"4 SKUs below reorder point"*.
- **Marketing headlines** — short declaratives, full stop included: *"Know before the line stops."* *"Finally simple."* No questions, no puns, no "Introducing".
- **Documents (PO, packing slip, invoice)** — no voice at all. Labels, values, totals. The brand is present as typography and rule weight only.

### Naming

Product modules are the six domain nouns (Inventory, Products, Production, Purchasing, Logistics, Audit). Records are prefixed and mono-set: `WO-4192`, `PO-1042`, `SKU-4410-B`, `LOT/2026-0814`. Never invent a cute internal name for a screen.

---

## VISUAL FOUNDATIONS

### The thesis

**Warm industrial substrate, cold electrical accent, and one enormous number.** Everything below serves those three.

### Colour

- **Ink `#141413`** is the anchor — lifted straight from the logo. Warm, near-black, never pure `#000` on screen (pure black is reserved for print).
- **Graphite** is the neutral ramp, 0→1000, all warm. No blue-grey anywhere.
- **Cobalt `#3A5EFF`** is brand-1 (loud: big type, graphics, accents). **`#1E36DB`** is brand-2 (interactive fill, AA with white text). `#1728A8` is pressed.
- **Semantics** are fixed in meaning: green = done/in stock, amber = at risk/low, red = blocked/short, cobalt = in progress, graphite = draft/archived. Hue may shift between themes; role never does.
- **Six domain accents** — Inventory cobalt, Products orchid, Production ember, Purchasing marigold, Logistics jade, Audit cyan. Evenly spaced hues, matched chroma, three values each (`-loud` for fill, `-text` for AA on light, `-dark` for AA on dark). Scope with `data-domain="production"` and components pick up `--accent-loud` / `--accent-text` automatically. **A screenshot of Production must read differently from Purchasing and unmistakably as Manuva.**
- **Domain accents never carry status.** A red-ish Production accent is not a warning. Status is Badge and StatusDot only.
- **Four themes** — Daylight (light), Midnight (warm near-black), Ocean (deep navy), Ember (deep rust). All four resolve the same shipped token names at AA.
- **Print** — an `@media print` block flips every token to monochrome. Status survives as words and rule weight, not colour.

### Typography

Three voices, no more:

| Voice | Face | Where |
|---|---|---|
| **Display** | Archivo (variable, `wdth` 62–125) at 700–800 | Marketing, decks, screen titles, empty states, dialog titles |
| **UI** | Inter 400/500/600 | Everything in the app. 11–26px. Never grows. |
| **Technical** | IBM Plex Mono | Identifiers only — SKUs, lot codes, references. Always tabular. |

- **Display goes expanded (`wdth` 118) at display-4 and above** and normal width below. Tracking tightens as size grows: `-0.022em` at 32–68px, `-0.035em` at 88px+.
- **The dense UI scale is fixed at 11 / 12 / 13 / 14 / 16 / 20 / 26px.** 13px is the default table cell. Nothing in a table is ever bold; emphasis lives in the header bar above it.
- **Eyebrows and column keys** are the connective tissue: 11px, weight 700, `0.11em` tracking, uppercase, `--ink-subtle`. They appear above every metric, card title and table column.
- **No display face below 20px, ever.** Below 20px it stops being a voice and starts being a legibility problem.

### The numeral system

The signature device, borrowed structurally (not visually) from tournament identity design.

- **Label above (11px uppercase eyebrow) → number (Archivo 800, expanded, tabular, line-height 0.86) → unit beside it (uppercase, small, `--ink-subtle`).** Never a unit below the number, never a number inside a sentence.
- **Sizes:** display-1/2 (32/40px) inside app cards; display-4 (68px) in empty states; display-6/7/8 (120/168/240px) in posters, ads and deck covers.
- **Crop it.** At display-6 and above the numeral is allowed to bleed off the edge of its panel — `PosterBlock` sets a watermark copy at 10–14% opacity anchored to the bottom-right corner and cropped by the panel. Big numbers are never scaled down to fit; the panel crops them.
- **One hero numeral per surface.** Two competing numerals is a chart, not an identity.
- **Deltas** sit under the number in mono, 12px, tinted ok/danger.

### Layout & grid

- **12 columns, 24px gutter, 1320px max** on marketing. **App is fluid** with a fixed 236px sidebar and a 52px top bar.
- **Poster layouts are hard-edged**: radius 0, full-bleed fills, content pinned to the corners (eyebrow top-left, headline + numeral bottom-left, a 3px rule above the footer). Generous empty space in the middle — the emptiness is the confidence.
- **The Manuva rule**: a 3px ink or accent bar above a section head, or across the top of an accented card. It is the one recurring graphic device besides the numeral.
- **Restraint rules for the app**: no poster blocks, no display face under 20px, no full-bleed accents behind data, no background imagery, one accent bar per view. The table is quiet.
- **Fixed elements** — sidebar and top bar are sticky; table headers are `position:sticky`. Nothing else floats.

### Surfaces, borders, radii

- **Cards** are flat: `--surface-card`, a 1px `--stroke-card` border, 8px radius, **no shadow**. The system separates by stroke and value, not by float.
- **Radii**: 0 poster, 2 bars/progress, 4 tags, **6 controls**, **8 cards**, 12 panels/dialogs, pill only for switch tracks. Radius shrinks as importance and size grow — the loudest things are square.
- **Borders**: 1px hairline (`--stroke-hairline`) inside components, 1px `--stroke-card` around them, 2px for loud outlines, 3px for the rule device.
- **Shadows** are tight and low-opacity, four steps, reserved for things that genuinely float: popover (2), drawer (3), dialog (4). `shadow-1` is a hover lift only. There is no inner-shadow system beyond a single `--shadow-inset` for pressed wells.

### Transparency & blur

Used sparingly and only for two jobs: **the dialog scrim** (`rgb(20 20 19 / .56)`, no blur — blur costs frames on shop-floor hardware) and **hover/active tints** (`rgba` over the surface, 4–10%). Poster watermark numerals sit at 10–14% white. No frosted-glass panels, no translucent nav.

### Motion

Mechanical, not playful. Things move like machinery: **fast start, firm stop, no overshoot, no bounce, nothing scales past 1.0.**

- Durations: 80ms hover/press · 140ms toggles/tabs · 200ms popovers/drawers · 320ms dialogs/page.
- Easing: `cubic-bezier(.2,.8,.3,1)` standard; `cubic-bezier(.1,.9,.2,1)` for state flips.
- **Hover** = 6% darker fill (`filter:brightness(.94)`) on solid controls, a 4% surface tint on quiet ones. Never a colour change to a different hue.
- **Press** = `translateY(1px)`. No shrink, no ripple.
- **Focus** = 3px cobalt ring at 28% (`--shadow-focus`), always visible, never removed.
- The only looping animation in the whole system is the **live-data pulse** (1600ms opacity 1→0.35) on `StatusDot live`. If it pulses, it is genuinely live.
- `prefers-reduced-motion` zeroes every duration.

### Imagery

- **Real factories, real parts.** Machined edges, powder coat, weld spatter, pallet racking, hands in gloves, a bin of identical brackets. Tight crops of *material*, not wide shots of *workplaces*.
- **Never**: stock-photo handshakes, headsets, whiteboard meetings, people pointing at laptops, glossy 3D robot arms.
- **Grade** — cool and slightly desaturated, warm highlights allowed from shop lighting, deep true blacks that meet `#141413`, visible grain. Photography sits behind an ink scrim (`rgb(20 20 19 / .55)`) whenever type is on top.
- **Full-bleed and cropped hard.** Photos are never rounded, never in a card, never floating with a shadow.
- **No illustration system.** The source file contains none, and this brand does not need one. Where a diagram is required (BOM tree, flow), draw it in ink hairlines and one accent — never as a spot illustration.

---

## ICONOGRAPHY

**The source file contains no icon set.** `Manuva.fig` is a single logo artboard: 15 vector paths, no component library, no glyphs.

**Substitution — please confirm.** The system uses **[Lucide](https://lucide.dev) 0.544.0** from jsDelivr, chosen because its 2px stroke, square caps and 24px grid match the structural, hard-edged feel of the mark. The `Icon` component renders each glyph as a CSS mask so it inherits `currentColor` and needs no per-icon source in the repo.

```jsx
<Icon name="package" size={16} />
```

- **Sizes**: 14px in table rows, 16px in UI and buttons, 20px in nav, 24px+ in marketing. Never scale a glyph below 14px.
- **Colour** is always `currentColor` — icons never carry their own colour.
- **Domain glyphs** (fixed): Inventory `package`, Products `layers`, Production `factory`, Purchasing `shopping-cart`, Orders `receipt`, Logistics `truck`, Audit `history`, Settings `settings-2`.
- **No emoji, anywhere** — not in the UI, not in email, not in social copy.
- **No decorative unicode as icons** (`→`, `✓`, `•` as bullets are fine as *typography*; they are not icons).
- The logo mark is **not** an icon. It never appears in a nav list or next to a label; it is the app avatar and the document header only.

**If Manuva has its own glyph set, send it** and it should replace Lucide wholesale — `Icon.jsx` is the only file that changes.

---

## Logo

Extracted verbatim from `Manuva.fig` and shipped as three SVGs in `assets/`. All three are single-colour and inherit `currentColor` when used via the `Logo` component.

| File | Use | Minimum |
|---|---|---|
| `assets/logo-lockup.svg` | Default. Mark + wordmark, 233 × 52. | 18px tall |
| `assets/logo-mark.svg` | App avatar, favicon, document seal, social profile. 79 × 52. | 14px tall |
| `assets/logo-wordmark.svg` | When the mark already appears nearby. 145 × 26. | 12px tall |

- **Clear space** = 0.25 × lockup height on all four sides.
- **Colour**: ink `#141413` on light, white on dark. Nothing else — never a domain accent, never a gradient, never a two-tone split.
- **Don't**: stretch, rotate, outline, add a shadow, place on a busy photo without a scrim, re-letter the wordmark in Archivo, or reconstruct the mark from shapes.
- **Print**: 100% K. The mark holds down to 8mm; below that use the wordmark alone.

---

## Font substitution — action needed

No font binaries ship with `Manuva.fig`, and the wordmark is outlined vectors, so nothing could be extracted. All three faces are loaded from Google Fonts:

| Role | Using | Note |
|---|---|---|
| Display / numerals | **Archivo** (variable `wdth` 62–125, `wght` 100–900) | Substitution. Chosen for the width axis, which is what makes cropped hero numerals possible. |
| UI | **Inter** | Matches the brief's stated current UI face. |
| Technical | **IBM Plex Mono** | Matches the brief's stated numeric face. |

The wordmark's letterforms are a geometric-humanist grotesque close to Archivo/Montserrat but **not** identical to either — it is drawn artwork, so it needs no font. **If Manuva licenses a display face, send the files** and swap `--font-display` plus the `@font-face` rules in `tokens/fonts.css`.

---

## Intentional additions

The source file defines no components, so the component set below was authored from scratch against the brief (standard primitives, sized to Manuva's needs). Three are brand-specific rather than standard, and are listed here explicitly:

- **`Icon`** — a wrapper for the substituted Lucide set. Needed because neither source ships a glyph set (the app uses inline SVG per call site).
- **`Metric`** — the hero-numeral device. This *is* the identity; it needs to be a component, not a convention.
- **`PosterBlock`** — the poster device for advertising, OG cards and deck covers.

---

## Index

| Path | What it is |
|---|---|
| `styles.css` | The one file consumers link. `@import` list only. |
| `tokens/fonts.css` | Google Fonts import (Archivo, Inter, IBM Plex Mono). |
| `tokens/colors.css` | Base palette — graphite, cobalt, sea, semantics, six domain accents. |
| `tokens/themes.css` | Semantic aliases for Daylight / Midnight / Ocean + the print monochrome override. |
| `tokens/typography.css` | Faces, dense UI scale, display scale, tracking, and the `.mv-*` type roles. |
| `tokens/spacing.css` | Space scale, row densities, control heights, layout constants. |
| `tokens/shape.css` | Radii, border weights, elevation, focus rings. |
| `tokens/motion.css` | Durations, easings, keyframes, reduced-motion. |
| `tokens/base.css` | Element defaults (body, links, focus, selection). |
| `assets/` | `logo-lockup.svg`, `logo-mark.svg`, `logo-wordmark.svg`. |
| `guidelines/` | 22 foundation specimen cards (Colors, Type, Spacing, Brand). |
| `components/` | The reusable primitives — see below. |
| `github.md` | Source-repo record: branch, last sync, and the screen → source-file map. |
| `ui_kits/app/` | The Manuva product UI recreated from the repo: dashboard, inventory, production, purchasing (+ PO detail). |
| `ui_kits/marketing/` | The manuva.app landing page, OG/social card, and email. |
| `ui_kits/documents/` | Purchase order and packing slip, print-ready and monochrome-safe. |
| `templates/app-screen/` | Copyable starting point — the product shell + dense table. |
| `templates/poster/` | Copyable starting point — the 1200×630 poster / OG card. |
| `thumbnail.html` | Homepage tile. |
| `SKILL.md` | Agent Skills manifest, for use in Claude Code. |

## Components

Components marked **[shipped]** recreate a real `src/app/app/_ui/` primitive and keep its API. The rest are additions the brand needs; each is justified below.

**`components/brand/`** — `Logo`, `Icon`, `Metric`, `PosterBlock`
**`components/forms/`** — `Button` **[shipped]**, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Field`
**`components/data/`** — `DataTable` **[shipped]**, `ListPanel` **[shipped]**, `ListRow` **[shipped]**, `StatusBadge` **[shipped]**, `Card`, `Tag`, `StatusDot`, `ProgressBar`, `StateBand`
**`components/feedback/`** — `EmptyState` **[shipped]**, `Dialog`, `Toast`, `Tooltip`, `Banner`
**`components/navigation/`** — `PageHeader` **[shipped]**, `HelpLink` **[shipped]**, `SideNav`, `TopBar`, `Tabs`, `Breadcrumb`
**`components/marketing/`** — `SectionHeader`, `FeatureGrid`, `PricingTable`, `Testimonial`, `FAQ`, `LogoWall` *(loud layer — never used inside the product)*

### Usage rules carried over from `docs/design-system.md`

These are blockers in code review on the real repo and are preserved here:

- **`PageHeader` is required on every app page**, always with both `eyebrow` and `title`. Eyebrow taxonomy: Products · Operations · Logistics · Orders · Admin · Audit.
- **Single-column pages.** No `grid-template-columns` at page level on any list/index page.
- **No embedded create forms** — create/edit flows go in modals.
- **Actions live in `PageHeader`'s `actions` slot**; back links are small, muted, and sit below the last card.
- **`--bg-card` is the card; `--surface-1` is for things inside a card.** Never swap them.
- **Buttons and inputs border with `--stroke-strong`; cards border with `--stroke-card`; inner dividers use `--stroke`.**
- **Table headers are `--bg-card-alt`**, 11px uppercase, `0.05em`.
- **No hardcoded hex, ever** — status colour comes from `--ok` / `--warning` / `--danger` / `--info`.
- **Invented token names are a blocker**: `--border`, `--bg-hover`, `--ink-base`, `--surface-card`, `--radius-base` do not exist.

Each directory carries a `.card.html` specimen; each component has a sibling `.d.ts` (props contract) and `.prompt.md` (what & when + usage).

## Applying the system

The **expression hierarchy** — loudest to quietest. Pick a tier before you pick a layout.

| Tier | Surface | What's allowed |
|---|---|---|
| **1** | Advertising, OG cards, video end-cards | Full-bleed ink or accent. Cropped hero numeral at display-6/8. Display face only. |
| **2** | Landing & campaign pages | Poster blocks alternating with quiet sections. Display 3–5. One accent per page section. |
| **3** | Decks, one-pagers, trade print, merch | One loud cover; quiet interior. Display 2–4. Numerals on data slides. |
| **4** | Email, in-app messaging, help docs, notifications | Display 1–2 at most. Body type does the work. Colour limited to ink + one accent. |
| **5** | Working UI, dense tables, supplier PDFs | No display face below 20px. Ink, hairlines and status colour only. No posters, no accents behind data. |

Consistency under pressure means tier 1 and tier 5 share a *system*, not a *look*: the same graphite, the same cobalt, the same numeral treatment, the same 11px uppercase eyebrow — at radically different volumes.
