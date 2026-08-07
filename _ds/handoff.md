# Manuva — developer handoff

How to consume this design system from an external codebase (the marketing site,
the app, anything else). Written for a developer who did not build it.

---

## 1. What you actually take

| You need | Take this | Notes |
|---|---|---|
| Tokens | `styles.css` + everything in `tokens/` | One `<link>`. Plain CSS custom properties, no build step. |
| Logo | `assets/logo-lockup.svg`, `-mark.svg`, `-wordmark.svg` | Single-path, `currentColor`. Designed to be used as a CSS mask. |
| Components (React) | `_ds_bundle.js` | Pre-compiled, no JSX/Babel needed. Exposes `window.ManuvaDesignSystem_169665`. |
| Components (other stacks) | The `.jsx` sources under `components/` | Read them and port. They are ~30 lines each and contain no framework magic. |
| Patterns | `templates/<slug>/` | Copy the folder; edit one line in its `ds-base.js`. |

**Do not** copy `_ds_bundle.js`, `_ds_manifest.json` or `_adherence.oxlintrc.json`
by hand — they are generated. Re-export them when the system changes.

---

## 2. Tokens are the contract

Everything is a CSS custom property. There is no JS token export and you do not
need one.

```html
<link rel="stylesheet" href="styles.css">
```

```css
.thing { background: var(--bg-card); color: var(--ink-strong); padding: var(--space-4) var(--space-6); }
```

### The four layers, and which are public API

Full detail is in the **Token taxonomy** card. The short version:

| Layer | Example | Safe to use? |
|---|---|---|
| **1 · Palette** | `--cobalt-500`, `--graphite-950`, `--navy-800` | **Internal.** Do not reference directly — it freezes you to one theme. |
| **2 · Semantic** | `--bg-card`, `--ink-muted`, `--brand-1`, `--danger-dim` | **Public. This is what you write.** |
| **3 · Scoped** | `--accent-loud`, `--accent-text`, `--accent-on` | **Public**, but only inside a `[data-domain]` subtree. |
| **4 · Surface** | `--field-cobalt` / `--on-cobalt`, `--tint-*` | **Public, marketing only.** Never inside the product UI. |

Dimensional tokens (`--space-*`, `--fs-*`, `--radius-*`, `--control-*`, `--dur-*`,
`--ease-*`) are all public.

Reference points one direction only: down. Nothing points sideways within a layer.

### Theming

Four themes: Daylight (default), Midnight, Ocean, Ember. All four resolve the same
semantic names — you never branch on theme in your code.

```html
<html data-theme="midnight">
```

Print is handled: an `@media print` block flips every token to monochrome.

### Domain scoping

Six product modules each own an accent. Scope a subtree and any component inside
picks it up without knowing which module it is in:

```html
<div data-domain="purchasing">
  <!-- --accent-loud, --accent-text, --accent-dim, --accent-on are now amber -->
</div>
```

`--accent-on` is the ink that clears AA on a solid `--accent-loud` fill — white on
the blues, orange and violet; `#141413` on amber, mint and aqua. Always pair them.

---

## 3. Components

```html
<script src="react.js"></script><script src="react-dom.js"></script>
<script src="_ds_bundle.js"></script>
<script>
  const { Button, DataTable, StateBand } = window.ManuvaDesignSystem_169665;
</script>
```

Every component takes `style` and `className` and merges them, and spreads the rest
onto its root element. There is no theme provider, no context, no CSS-in-JS runtime.

Each component has a sibling `.d.ts` (the API) and `.prompt.md` (when to use it, and
when not to). **Read the `.prompt.md` before using a component** — several carry
rules that are not expressible in types.

### Groups

- `components/brand/` — `Logo`, `Icon`, `Metric`, `PosterBlock`
- `components/forms/` — `Button`, `IconButton`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Field`
- `components/data/` — `DataTable`, `ListPanel`, `ListRow`, `StatusBadge`, `StatusDot`, `Card`, `Tag`, `ProgressBar`, `StateBand`
- `components/feedback/` — `Banner`, `Dialog`, `Toast`, `Tooltip`, `EmptyState`
- `components/navigation/` — `PageHeader`, `SideNav`, `TopBar`, `Tabs`, `Breadcrumb`, `HelpLink`
- `components/marketing/` — `SectionHeader`, `FeatureGrid`, `PricingTable`, `Testimonial`, `FAQ`, `LogoWall`

`components/marketing/` is the loud layer. It never appears inside the product.
`PageHeader` is the app's section opener; `SectionHeader` is the site's. They are
not interchangeable.

### The logo

The SVGs are single-path and inherit `currentColor`. Use them as a mask so the mark
takes the colour of whatever it sits on — `filter: invert()` only works on dark and
will break on amber or lime:

```css
.logo {
  display: inline-block; height: 24px; width: 109px;   /* lockup ratio 4.539 */
  background-color: currentColor;
  mask-image: url(assets/logo-lockup.svg); -webkit-mask-image: url(assets/logo-lockup.svg);
  mask-repeat: no-repeat; mask-size: contain;
}
```

Aspect ratios: lockup `2189.357 × 482.347`, mark `741.242 × 482.347`, wordmark `1361.115 × 243.403`.

---

## 4. The rules that are not in the types

These are enforced by review, not by the compiler. They are the difference between
using the system and looking like you used it.

**The loud layer**
1. A field is a **background**. Always pair it with its `--on-*` ink.
2. Never a colour field behind a data table.
3. Never two fields touching — put ink or paper between them.
4. **Lime `#C8FF2E` is backgrounds only, never text.**
5. One full-bleed field per fold. A tile grid counts as one composed unit.
6. Never colour behind long-form body copy.
7. Never a field under form inputs.

**Colour meaning**
- In the app, colour keeps its domain meaning (cobalt = Inventory, amber = Purchasing).
- On the site, colour rotates for rhythm — no two adjacent panels share a hue.
- Domain accents never carry status. Status is `StatusBadge` and `StatusDot` only.

**Type**
- The app scale (`--fs-xs` … `--fs-2xl`) tops out at 26px. Do not grow it.
- The display scale (`--fs-display-1…8`) is marketing, decks, metrics and empty
  states only.

**Motion**
- The app's motion is mechanical: 120–180ms, no overshoot, no bounce.
- The site is allowed to be slower and softer.
- The only looping animation in the product is the live-data pulse on `StatusDot live`.
- Nothing is ever gated on JS: `prefers-reduced-motion` must leave content visible.

---

## 5. Email is not the web

Email clients do not resolve CSS custom properties, and Outlook drops background
images. `ui_kits/marketing/email.html` therefore uses literal hex lifted from the
tokens, `bgcolor` on table cells, and a table-cell button rather than a styled `<a>`.

Keep it that way. If you change a token, update the email's literals by hand — there
is no mechanism that does it for you.

---

## 6. Known gaps

Be aware of these before you ship anything customer-facing.

- **Every number is invented.** 1,240 units short, 830 factories, 9 minutes to first
  BOM, $339,410 revenue. They are internally consistent, which makes them read as
  real. Replace them.
- **No customer logos.** `LogoWall` works but its specimen is deliberately empty.
  Drop single-colour SVGs into `assets/customers/`.
- **No photography.** The social ad's photo variant has an empty image slot.
- **No mobile or floor-screen layouts.** *(Closed — see `ui_kits/app/floor.html`:
  goods-inwards scan, stocktake count, and a wall board. Three screens, not a
  responsive pass over the desk UI.)*
- **`--warning` moved** from the shipped `#D97706` to `#8A5200` because the original
  fails AA at 11–13px. The vivid amber survives as `--warning-dot`. If you copy
  colour from the live app, you will reintroduce the failure.
