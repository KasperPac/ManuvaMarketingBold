# Manuva Marketing Site Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the eight-page Manuva marketing site on the Manuva design system as a static Astro site, moving all copy across verbatim from the old repo.

**Architecture:** Astro with static output and zero client JS except a ported mobile drawer. The design system in `_ds/` is a vendored dependency consumed through its CSS custom properties; only three of its components (`Logo`, `Icon`, `Button`) are ported to `.astro`. Everything else is built in the site's own vocabulary. A copy-parity gate diffs each new page against its old counterpart so content cannot be silently lost.

**Tech Stack:** Astro 5 (static), Vitest + Astro Container API for component tests, Playwright + axe-core for end-to-end and accessibility, cheerio for copy extraction, lucide-static for build-time inlined icons, Netlify for hosting.

## Global Constraints

- **Node 20+.** Astro 5 requires it.
- **`_ds/` is never edited.** Issues found there are reported, not patched. It is replaced wholesale on re-export.
- **No token is redeclared site-side.** No hardcoded colour, size, spacing, radius or duration value **that a token already names**. Site-specific geometry no token names — nav height, tile min-height, burger bar dimensions, drawer width — is legitimately a raw value in `site.css`, and is not a violation. The scrim `rgb(20 20 19 / .5)` and footer ink `rgb(255 255 255 / .62)` are lifted from the design system's own `Landing.jsx`, which uses the same values; they are sanctioned, not site inventions. What is forbidden is writing `#2C6BED` where `--field-cobalt` exists, or `16px` where `--space-4` exists.
- **Fold-level colour is marked with `data-fold`.** `Field` and `CtaBand` emit it automatically; add it by hand to a fold-level `Panel` such as a page hero. Tiles never emit it — a tile grid is one composed unit with paper between every tile, so it is exempt from the adjacency rule. The hue-adjacency tests read `data-fold` and nothing else.
- **Copy moves verbatim.** No rewording, summarising or reordering of argument. The two `/alternatives/` pages especially — 32KB and 28KB of ranking content.
- **Nothing is invented.** Every factual claim traces to `llms.txt` or an existing page. Unsourceable facts become a visible `TODO` and are reported, never a plausible-looking number.
- **Trial is 14 days, full Pro access, no credit card.** Not 30 days. Not free forever.
- **Contact is `hello@manuva.app`.** Every "Start free" and "Sign in" CTA points to `https://app.manuva.app`.
- **Pricing is flat per account, never per seat.** Starter $99/mo annual ($1,188/yr) or $119/mo monthly · Growth $249/mo annual ($2,988/yr) or $299/mo monthly · Pro $499/mo annual ($5,988/yr) or $599/mo monthly · Enterprise custom. Annual saves approximately 20%.
- **Eight routes, no trailing slash:** `/` `/features` `/pricing` `/about` `/alternatives/katana` `/alternatives/mrpeasy` `/privacy` `/terms`.
- **Loud-layer rules:** a field is a background, always paired with its `--on-*` ink. Lime is backgrounds and accents only, never text. Never a colour field behind a data table, form inputs or long-form body copy. Never two fields touching. One full-bleed field per fold. No two adjacent panels share a hue.
- **Breakpoints are 480 / 720 / 960**, hardcoded in `@media` conditions. `.mv-split` stacks at 860 by design. Never write a fixed `repeat(N,1fr)` — use `.mv-cols-*`.
- **Copy is read from the old repo's remote:** `git -C C:/dev/ManuvaMarketing show origin/master:<path>`. The local working tree is stale and lacks half the pages. That repo is read-only.

---

## File Structure

| File | Responsibility |
|---|---|
| `astro.config.mjs` | Static output, `trailingSlash: 'never'`, site URL |
| `netlify.toml` | Build command, publish dir, trailing-slash behaviour |
| `vitest.config.ts` | Vitest via `getViteConfig` so `.astro` files compile |
| `playwright.config.ts` | E2E against `astro preview` |
| `src/layouts/Base.astro` | `<head>`, token links, SEO, OG, JSON-LD, skip link, nav + footer |
| `src/layouts/Doc.astro` | Long-form legal shell — `Base` plus a constrained prose column |
| `src/components/ds/Icon.astro` | Lucide glyph inlined as SVG at build time |
| `src/components/ds/Logo.astro` | Lockup / mark / wordmark as a `currentColor` mask |
| `src/components/ds/Button.astro` | Action control, `as`/`variant`/`size`/`shape` |
| `src/components/site/Nav.astro` | Sticky header, links, CTAs, burger |
| `src/components/site/Drawer.astro` | Mobile drawer — the only client JS |
| `src/components/site/Footer.astro` | Ink footer, real routes only |
| `src/components/site/Field.astro` | Full-bleed field band |
| `src/components/site/Panel.astro` | Inset rounded field panel |
| `src/components/site/Tile.astro` | Grid tile with its own field |
| `src/components/site/Pill.astro` | Pill CTA wrapping `Button` |
| `src/components/site/Marquee.astro` | The one looping animation |
| `src/components/site/CtaBand.astro` | Closing CTA, used by six pages |
| `src/components/site/FaqList.astro` | Accordion-free FAQ via `<details>` |
| `src/components/site/PriceCards.astro` | Four plan cards |
| `src/components/site/FeatureMatrix.astro` | Matrix plus its below-720 card fallback |
| `src/styles/site.css` | Only section-shell geometry the DS has no opinion on |
| `scripts/parity/extract.js` | HTML → normalised comparable phrases |
| `scripts/parity/check.js` | Old vs new diff, ignore list, exit code |
| `scripts/parity/ignore.json` | Declared allowed differences, per route |
| `src/pages/*.astro` | The eight routes |
| `public/` | `_redirects`, `robots.txt`, `sitemap.xml`, `llms.txt`, screenshots, favicons |

---

### Task 1: Astro scaffold, token wiring, Base layout

**Files:**
- Create: `package.json`, `astro.config.mjs`, `vitest.config.ts`, `tsconfig.json`
- Create: `src/layouts/Base.astro`, `src/styles/site.css`
- Create: `src/pages/index.astro` (placeholder, replaced in Task 7)
- Test: `tests/unit/base-layout.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `Base.astro` accepting props `{ title: string; description: string; canonical: string; ogImage?: string }` and a default `<slot />`. Every page uses it.

- [ ] **Step 1: Scaffold the project**

```bash
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict --skip-houston
npm install
npm install -D vitest cheerio
```

Answer "y" if it warns the directory is not empty — `_ds/`, `docs/` and `CLAUDE.md` must survive. Verify afterwards with `ls _ds docs CLAUDE.md`.

- [ ] **Step 2: Configure Astro**

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://manuva.app',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  devToolbar: { enabled: false },
});
```

`build.format: 'file'` emits `features.html` rather than `features/index.html`, which with `trailingSlash: 'never'` keeps the live URL spelling exactly as it is today.

- [ ] **Step 3: Configure Vitest**

`vitest.config.ts`:

```ts
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: { globals: true, environment: 'node', include: ['tests/unit/**/*.test.ts'] },
});
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4: Write the failing test**

`tests/unit/base-layout.test.ts`:

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Base from '../../src/layouts/Base.astro';

const render = () =>
  AstroContainer.create().then((c) =>
    c.renderToString(Base, {
      props: {
        title: 'Manuva — MRP for Shopify manufacturers',
        description: 'Inventory, BOMs, work orders and stock control.',
        canonical: 'https://manuva.app/',
      },
      slots: { default: '<p>body content</p>' },
    }),
  );

test('links every design-system token file in styles.css order', async () => {
  const html = await render();
  const links = [...html.matchAll(/_ds\/tokens\/([a-z-]+\.css)/g)].map((m) => m[1]);
  expect(links).toEqual([
    'fonts.css', 'colors.css', 'themes.css', 'typography.css', 'spacing.css',
    'shape.css', 'marketing.css', 'responsive.css', 'motion.css', 'base.css',
  ]);
});

test('never links the design system aggregate entry point', async () => {
  // styles.css @imports fonts.css, which is the file we must be able to swap.
  const html = await render();
  expect(html).not.toMatch(/_ds\/styles\.css/);
});

test('emits title, description and canonical', async () => {
  const html = await render();
  expect(html).toContain('<title>Manuva — MRP for Shopify manufacturers</title>');
  expect(html).toContain('name="description" content="Inventory, BOMs, work orders and stock control."');
  expect(html).toContain('rel="canonical" href="https://manuva.app/"');
});

test('canonical never carries a trailing slash except on root', async () => {
  const c = await AstroContainer.create();
  const html = await c.renderToString(Base, {
    props: { title: 't', description: 'd', canonical: 'https://manuva.app/features' },
    slots: { default: '<p>x</p>' },
  });
  expect(html).toContain('href="https://manuva.app/features"');
  expect(html).not.toContain('href="https://manuva.app/features/"');
});

test('provides a skip link as the first focusable element', async () => {
  const html = await render();
  expect(html).toMatch(/<a[^>]+href="#main"[^>]*>\s*Skip to content\s*<\/a>/);
});
```

- [ ] **Step 5: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `src/layouts/Base.astro` does not exist.

- [ ] **Step 6: Write `src/layouts/Base.astro`**

The token files are linked individually rather than through `_ds/styles.css`, because `styles.css` `@import`s `fonts.css` and that is the one file which gets swapped for `fonts-selfhost.css` once the design system ships it (spec §3.4). Order matches `styles.css` exactly.

```astro
---
export interface Props {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  /** JSON-LD nodes. Populated in Task 13; ignored until then. */
  schema?: Record<string, unknown>[];
}
const { title, description, canonical, ogImage = '/og-image.png', schema } = Astro.props;

const TOKENS = [
  'fonts', 'colors', 'themes', 'typography', 'spacing',
  'shape', 'marketing', 'responsive', 'motion', 'base',
];
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={new URL(ogImage, Astro.site)} />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="icon" href="/favicon-32.png" sizes="32x32" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    {TOKENS.map((t) => <link rel="stylesheet" href={`/_ds/tokens/${t}.css`} />)}
    <link rel="stylesheet" href="/styles/site.css" />
  </head>
  <body>
    <a class="skip" href="#main">Skip to content</a>
    <slot name="nav" />
    <main id="main"><slot /></main>
    <slot name="footer" />
  </body>
</html>
```

- [ ] **Step 7: Make `_ds/` and `src/styles/` reachable at those URLs**

`_ds/` sits at the repo root, outside `public/`, so Astro will not serve it. Rather than move the vendored folder — it must stay replaceable wholesale on re-export — copy the consumed subset into `public/_ds` as a prebuild step.

Leave `astro.config.mjs` exactly as written in Step 2. Do **not** set `publicDir`; it is a top-level Astro option and overriding it breaks `public/` for everything else.

Add to `package.json`:

```json
"scripts": {
  "sync:ds": "node scripts/sync-ds.js",
  "dev": "npm run sync:ds && astro dev",
  "build": "npm run sync:ds && astro build",
  "preview": "astro preview",
  "test": "vitest run"
}
```

`scripts/sync-ds.js`:

```js
import { cp, mkdir, rm } from 'node:fs/promises';

const OUT = 'public/_ds';
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp('_ds/tokens', `${OUT}/tokens`, { recursive: true });
await cp('_ds/assets', `${OUT}/assets`, { recursive: true });
console.log('synced _ds → public/_ds');
```

Add `public/_ds/` to `.gitignore` — it is generated.

- [ ] **Step 8: Write `src/styles/site.css`**

Starts nearly empty on purpose. Anything added here that is a colour, type, spacing or radius value belongs in the design system instead.

```css
/* Site-only geometry. Tokens live in _ds/. Nothing here redeclares one. */

.skip {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  padding: var(--space-3) var(--space-5);
  background: var(--bg-card);
  color: var(--ink-strong);
  border-radius: var(--radius-lg);
}
.skip:focus { left: var(--space-4); top: var(--space-4); }

body { background: var(--field-paper); color: var(--ink-strong); }
```

- [ ] **Step 9: Add a placeholder home page so the build succeeds**

`src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
---
<Base
  title="Manuva — MRP for Shopify manufacturers"
  description="Inventory, BOMs, work orders and stock control — connected, live, and built for people standing on a factory floor."
  canonical="https://manuva.app/"
>
  <h1>Manuva</h1>
</Base>
```

- [ ] **Step 10: Run the tests and the build**

Run: `npm test`
Expected: PASS, 5 tests.

Run: `npm run build`
Expected: build completes, `dist/index.html` exists, `dist/_ds/tokens/colors.css` exists.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): scaffold Astro, wire design-system tokens, add Base layout"
```

---

### Task 2: Icon component — Lucide inlined at build time

**Files:**
- Create: `src/components/ds/Icon.astro`
- Test: `tests/unit/icon.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `Icon.astro` with props `{ name: string; size?: number; class?: string }`, default `size` 20. Renders an inline `<svg>` inheriting `currentColor`, `aria-hidden="true"`. Used by `Nav`, `Tile`, `FaqList`, `FeatureMatrix` and most pages.

- [ ] **Step 1: Install the glyph source**

```bash
npm install -D lucide-static@0.544.0
```

Version is pinned to match `_ds/components/brand/Icon.jsx`, which masks from `lucide-static@0.544.0`. Same glyphs, no runtime request.

- [ ] **Step 2: Write the failing test**

`tests/unit/icon.test.ts`:

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Icon from '../../src/components/ds/Icon.astro';

const render = (props: Record<string, unknown>) =>
  AstroContainer.create().then((c) => c.renderToString(Icon, { props }));

test('inlines the glyph as an svg, not a network reference', async () => {
  const html = await render({ name: 'package' });
  expect(html).toContain('<svg');
  expect(html).not.toContain('cdn.jsdelivr.net');
  expect(html).not.toContain('mask-image');
  expect(html).not.toContain('<img');
});

test('inherits currentColor so it takes the colour of its field', async () => {
  const html = await render({ name: 'package' });
  expect(html).toContain('currentColor');
});

test('applies the requested size to both dimensions', async () => {
  const html = await render({ name: 'factory', size: 30 });
  expect(html).toMatch(/width="30"/);
  expect(html).toMatch(/height="30"/);
});

test('is hidden from assistive technology', async () => {
  const html = await render({ name: 'truck' });
  expect(html).toContain('aria-hidden="true"');
});

test('renders each fixed domain glyph', async () => {
  const domains = ['package', 'layers', 'factory', 'shopping-cart', 'receipt', 'truck', 'history', 'settings-2'];
  for (const name of domains) {
    const html = await render({ name });
    expect(html, `${name} should render`).toContain('<svg');
  }
});

test('fails loudly on an unknown glyph rather than rendering nothing', async () => {
  await expect(render({ name: 'not-a-real-glyph' })).rejects.toThrow(/not-a-real-glyph/);
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npx vitest run tests/unit/icon.test.ts`
Expected: FAIL — `src/components/ds/Icon.astro` does not exist.

- [ ] **Step 4: Write `src/components/ds/Icon.astro`**

```astro
---
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

export interface Props {
  name: string;
  size?: number;
  class?: string;
}
const { name, size = 20, class: className } = Astro.props;

const require = createRequire(import.meta.url);

let raw: string;
try {
  raw = readFileSync(require.resolve(`lucide-static/icons/${name}.svg`), 'utf8');
} catch {
  throw new Error(
    `Icon "${name}" is not in lucide-static@0.544.0. Check the glyph name at https://lucide.dev/icons.`,
  );
}

// lucide-static ships width/height/stroke already set. Re-stamp the dimensions
// for the requested size and mark it decorative; colour comes from currentColor,
// which the source already uses for stroke.
const svg = raw
  .replace(/<svg([^>]*)>/, (_m, attrs) => {
    const cleaned = String(attrs)
      .replace(/\swidth="[^"]*"/, '')
      .replace(/\sheight="[^"]*"/, '')
      .replace(/\sclass="[^"]*"/, '');
    return `<svg${cleaned} width="${size}" height="${size}" aria-hidden="true" focusable="false"${
      className ? ` class="${className}"` : ''
    }>`;
  })
  .trim();
---
<Fragment set:html={svg} />
```

- [ ] **Step 5: Run the tests**

Run: `npx vitest run tests/unit/icon.test.ts`
Expected: PASS, 6 tests.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): add Icon with Lucide glyphs inlined at build time"
```

---

### Task 3: Logo and Button components

**Files:**
- Create: `src/components/ds/Logo.astro`, `src/components/ds/Button.astro`
- Test: `tests/unit/logo.test.ts`, `tests/unit/button.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `Logo.astro` — props `{ variant?: 'lockup' | 'mark' | 'wordmark'; height?: number; class?: string }`, default `variant` `'lockup'`, default `height` 28.
  - `Button.astro` — props `{ as?: 'a' | 'button'; href?: string; variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'ink' | 'accent'; size?: 'sm' | 'md' | 'lg' | 'xl'; shape?: 'default' | 'pill'; block?: boolean; class?: string }`. Extra attributes spread onto the root. Consumed by `Pill`, `Nav`, `CtaBand`.

- [ ] **Step 1: Write the failing Logo test**

Aspect ratios come from `_ds/handoff.md`: lockup `2189.357 × 482.347`, mark `741.242 × 482.347`, wordmark `1361.115 × 243.403`.

`tests/unit/logo.test.ts`:

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Logo from '../../src/components/ds/Logo.astro';

const render = (props: Record<string, unknown> = {}) =>
  AstroContainer.create().then((c) => c.renderToString(Logo, { props }));

test('uses a mask so the mark takes the colour of its field', async () => {
  // filter: invert() only works on dark and breaks on amber or lime.
  const html = await render();
  expect(html).toContain('mask-image');
  expect(html).toContain('background-color:currentColor');
  expect(html).not.toContain('invert(');
});

test('defaults to the lockup at its correct ratio', async () => {
  const html = await render({ height: 24 });
  // 2189.357 / 482.347 = 4.5388… → 24 × ratio = 108.93
  expect(html).toMatch(/width:108\.9\d*px/);
  expect(html).toContain('height:24px');
});

test('sizes the mark on its own ratio', async () => {
  const html = await render({ variant: 'mark', height: 24 });
  // 741.242 / 482.347 = 1.5367… → 36.88
  expect(html).toMatch(/width:36\.8\d*px/);
});

test('sizes the wordmark on its own ratio', async () => {
  const html = await render({ variant: 'wordmark', height: 24 });
  // 1361.115 / 243.403 = 5.5924… → 134.22
  expect(html).toMatch(/width:134\.2\d*px/);
});

test('carries an accessible name', async () => {
  const html = await render();
  expect(html).toContain('role="img"');
  expect(html).toContain('aria-label="Manuva"');
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run tests/unit/logo.test.ts`
Expected: FAIL — component does not exist.

- [ ] **Step 3: Write `src/components/ds/Logo.astro`**

```astro
---
export interface Props {
  variant?: 'lockup' | 'mark' | 'wordmark';
  height?: number;
  class?: string;
}
const { variant = 'lockup', height = 28, class: className } = Astro.props;

const RATIO = {
  lockup: 2189.357 / 482.347,
  mark: 741.242 / 482.347,
  wordmark: 1361.115 / 243.403,
} as const;

const src = `/_ds/assets/logo-${variant}.svg`;
const width = height * RATIO[variant];

const style = [
  'display:inline-block',
  `height:${height}px`,
  `width:${width}px`,
  'background-color:currentColor',
  `-webkit-mask-image:url("${src}")`,
  `mask-image:url("${src}")`,
  '-webkit-mask-repeat:no-repeat',
  'mask-repeat:no-repeat',
  '-webkit-mask-size:contain',
  'mask-size:contain',
].join(';');
---
<span role="img" aria-label="Manuva" class={className} style={style}></span>
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run tests/unit/logo.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Write the failing Button test**

Geometry mirrors `_ds/components/forms/Button.jsx`.

`tests/unit/button.test.ts`:

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Button from '../../src/components/ds/Button.astro';

const render = (props: Record<string, unknown> = {}, slot = 'Start free') =>
  AstroContainer.create().then((c) =>
    c.renderToString(Button, { props, slots: { default: slot } }),
  );

test('renders a button element by default', async () => {
  const html = await render();
  expect(html).toMatch(/^<button/);
  expect(html).toContain('Start free');
});

test('renders a real anchor when asked, so CTAs are links', async () => {
  const html = await render({ as: 'a', href: 'https://app.manuva.app' });
  expect(html).toMatch(/^<a/);
  expect(html).toContain('href="https://app.manuva.app"');
});

test('pill shape uses the pill radius token', async () => {
  const html = await render({ shape: 'pill' });
  expect(html).toContain('var(--radius-pill)');
});

test('default shape uses the large radius token', async () => {
  const html = await render();
  expect(html).toContain('var(--radius-lg)');
});

test('every size maps to a control height token', async () => {
  for (const [size, token] of Object.entries({
    sm: '--control-sm', md: '--control-md', lg: '--control-lg', xl: '--control-xl',
  })) {
    const html = await render({ size });
    expect(html, `${size} → ${token}`).toContain(`var(${token})`);
  }
});

test('exposes the variant for CSS hooks', async () => {
  const html = await render({ variant: 'ink' });
  expect(html).toContain('data-variant="ink"');
  expect(html).toContain('var(--bg-ink)');
});

test('hardcodes no colour value', async () => {
  const html = await render({ variant: 'primary' });
  expect(html).not.toMatch(/#[0-9a-fA-F]{3,6}/);
});

test('spreads unknown attributes onto the root', async () => {
  const html = await render({ as: 'a', href: '#', 'data-testid': 'cta' });
  expect(html).toContain('data-testid="cta"');
});
```

- [ ] **Step 6: Run it to verify it fails**

Run: `npx vitest run tests/unit/button.test.ts`
Expected: FAIL — component does not exist.

- [ ] **Step 7: Write `src/components/ds/Button.astro`**

```astro
---
export interface Props {
  as?: 'a' | 'button';
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'ink' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'default' | 'pill';
  block?: boolean;
  class?: string;
  [key: string]: unknown;
}
const {
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  shape = 'default',
  block = false,
  class: className,
  ...rest
} = Astro.props;

const SIZES = {
  sm: { h: 'var(--control-sm)', px: '12px', fs: 'var(--fs-sm)' },
  md: { h: 'var(--control-md)', px: '18px', fs: 'var(--fs-md)' },
  lg: { h: 'var(--control-lg)', px: '20px', fs: 'var(--fs-md)' },
  xl: { h: 'var(--control-xl)', px: '26px', fs: 'var(--fs-lg)' },
} as const;

const VARIANTS = {
  primary: 'background:var(--brand-2);color:var(--ink-on-brand);border:1px solid var(--brand-2)',
  secondary: 'background:var(--bg-card);color:var(--ink-strong);border:1px solid var(--stroke-strong)',
  ghost: 'background:transparent;color:var(--ink-muted);border:1px solid transparent',
  danger: 'background:var(--danger-dim);color:var(--danger);border:1px solid var(--danger-dim)',
  ink: 'background:var(--bg-ink);color:var(--bg-card);border:1px solid var(--bg-ink)',
  accent: 'background:var(--accent-loud);color:var(--accent-on);border:1px solid var(--accent-loud)',
} as const;

const s = SIZES[size];
const style = [
  block ? 'display:flex;width:100%' : 'display:inline-flex',
  'align-items:center',
  'justify-content:center',
  'gap:6px',
  `height:${s.h}`,
  `padding:0 ${s.px}`,
  'font-family:var(--font-body)',
  `font-size:${s.fs}`,
  'font-weight:var(--fw-semibold)',
  size === 'xl' ? 'letter-spacing:var(--ls-tight)' : 'letter-spacing:0',
  `border-radius:${shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-lg)'}`,
  'cursor:pointer',
  'white-space:nowrap',
  'text-decoration:none',
  'transition:filter var(--dur-fast) ease, background var(--dur-fast) ease, border-color var(--dur-fast) ease',
  VARIANTS[variant],
].join(';');
---
<Tag class:list={['mv-btn', className]} data-variant={variant} style={style} {...rest}>
  <slot />
</Tag>
```

Add the interaction states to `src/styles/site.css` — they belong in a stylesheet, not an inline `<style>` per instance as the React source does:

```css
.mv-btn:hover:not(:disabled) { filter: brightness(1.06); }
.mv-btn[data-variant='secondary']:hover:not(:disabled),
.mv-btn[data-variant='ghost']:hover:not(:disabled) { filter: none; background: var(--surface-hover); }
.mv-btn:active:not(:disabled) { transform: translateY(1px); }
.mv-btn:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
```

- [ ] **Step 8: Run the full unit suite**

Run: `npm test`
Expected: PASS — Base 5, Icon 6, Logo 5, Button 8.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): port Logo and Button from the design system"
```

---

### Task 4: Site chrome — Nav, Drawer, Footer

**Files:**
- Create: `src/components/site/Nav.astro`, `src/components/site/Drawer.astro`, `src/components/site/Footer.astro`
- Modify: `src/layouts/Base.astro` (render chrome by default)
- Modify: `src/styles/site.css`
- Test: `tests/unit/chrome.test.ts`

**Interfaces:**
- Consumes: `Logo.astro`, `Button.astro`, `Icon.astro`.
- Produces: `Nav.astro` and `Footer.astro`, both prop-less, rendered by `Base.astro`. A shared `NAV_LINKS` export from `src/site.ts`.

- [ ] **Step 1: Create the route table**

Every nav and footer link must point at a real route. `src/site.ts`:

```ts
export const APP_URL = 'https://app.manuva.app';
export const CONTACT_EMAIL = 'hello@manuva.app';

export const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/alternatives/katana', label: 'Compare' },
  { href: '/about', label: 'About' },
] as const;

export const FOOTER_GROUPS = [
  { heading: 'Product', links: [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
  ] },
  { heading: 'Compare', links: [
    { href: '/alternatives/katana', label: 'vs Katana' },
    { href: '/alternatives/mrpeasy', label: 'vs MRPeasy' },
  ] },
  { heading: 'Company', links: [
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ] },
] as const;

export const ALL_ROUTES = [
  '/', '/features', '/pricing', '/about',
  '/alternatives/katana', '/alternatives/mrpeasy', '/privacy', '/terms',
] as const;
```

- [ ] **Step 2: Write the failing test**

`tests/unit/chrome.test.ts`:

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Nav from '../../src/components/site/Nav.astro';
import Footer from '../../src/components/site/Footer.astro';
import { ALL_ROUTES } from '../../src/site';

const renderNav = () => AstroContainer.create().then((c) => c.renderToString(Nav));
const renderFooter = () => AstroContainer.create().then((c) => c.renderToString(Footer));

const hrefsIn = (html: string) =>
  [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

test('every nav link points at a route that exists', async () => {
  const internal = hrefsIn(await renderNav()).filter((h) => h.startsWith('/') && h !== '#main');
  for (const href of internal) {
    expect(ALL_ROUTES, `${href} is not a real route`).toContain(href);
  }
});

test('every footer link points at a route that exists', async () => {
  const internal = hrefsIn(await renderFooter()).filter((h) => h.startsWith('/'));
  for (const href of internal) {
    expect(ALL_ROUTES, `${href} is not a real route`).toContain(href);
  }
});

test('footer never links the six routes the reference layouts invented', async () => {
  const html = (await renderFooter()) + (await renderNav());
  for (const dead of ['Docs', 'Careers', 'Changelog', 'Status', 'Support', 'Customers']) {
    expect(html, `${dead} is not a page that exists`).not.toContain(`>${dead}<`);
  }
});

test('CTAs point at the app, not a placeholder', async () => {
  const html = await renderNav();
  expect(html).toContain('https://app.manuva.app');
  expect(html).not.toContain('href="#"');
});

test('nav exposes the responsive hooks the design system defines', async () => {
  const html = await renderNav();
  expect(html).toContain('mv-nav-links');
  expect(html).toContain('mv-nav-burger');
});

test('burger controls the drawer and reports its state', async () => {
  const html = await renderNav();
  expect(html).toMatch(/aria-expanded="false"/);
  expect(html).toMatch(/aria-controls="site-drawer"/);
  expect(html).toMatch(/aria-label="(Open )?[Mm]enu"/);
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npx vitest run tests/unit/chrome.test.ts`
Expected: FAIL — components do not exist.

- [ ] **Step 4: Write `src/components/site/Nav.astro`**

```astro
---
import Logo from '../ds/Logo.astro';
import Button from '../ds/Button.astro';
import Drawer from './Drawer.astro';
import { NAV_LINKS, APP_URL } from '../../site';
---
<header class="site-nav">
  <div class="mv-wrap site-nav-inner">
    <a href="/" aria-label="Manuva home" class="site-nav-logo">
      <Logo variant="lockup" height={24} />
    </a>

    <nav class="mv-nav-links site-nav-links" aria-label="Primary">
      {NAV_LINKS.map((l) => <a href={l.href}>{l.label}</a>)}
    </nav>

    <a href={APP_URL} class="site-nav-signin mv-nav-links">Sign in</a>
    <Button as="a" href={APP_URL} size="lg" shape="pill" variant="ink" class="mv-press site-nav-cta">
      Start free
    </Button>

    <button
      type="button"
      class="mv-nav-burger site-burger"
      aria-label="Open menu"
      aria-expanded="false"
      aria-controls="site-drawer"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  </div>
</header>
<Drawer />
```

- [ ] **Step 5: Write `src/components/site/Drawer.astro`**

Behaviour is ported from the old repo's `mobile.js`. Read the original first:

```bash
git -C C:/dev/ManuvaMarketing show origin/master:mobile.js
```

Keep its open/close, focus trap, Escape handling and `prefers-reduced-motion` support. It is the only client JS on the site.

```astro
---
import { NAV_LINKS, APP_URL } from '../../site';
---
<div id="site-drawer" class="site-drawer" hidden>
  <div class="site-drawer-panel" role="dialog" aria-modal="true" aria-label="Menu">
    <button type="button" class="site-drawer-close" aria-label="Close menu">&times;</button>
    <nav aria-label="Mobile">
      {NAV_LINKS.map((l) => <a href={l.href}>{l.label}</a>)}
      <a href={APP_URL}>Sign in</a>
      <a href={APP_URL} class="site-drawer-cta">Start free</a>
    </nav>
  </div>
</div>

<script>
  const drawer = document.getElementById('site-drawer');
  const burger = document.querySelector('.site-burger');
  const closeBtn = drawer?.querySelector('.site-drawer-close');
  if (drawer && burger) {
    const FOCUSABLE = 'a[href], button:not([disabled])';
    let lastFocused: HTMLElement | null = null;

    const open = () => {
      lastFocused = document.activeElement as HTMLElement;
      drawer.hidden = false;
      document.body.style.overflow = 'hidden';
      burger.setAttribute('aria-expanded', 'true');
      drawer.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    };

    const close = () => {
      drawer.hidden = true;
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
      lastFocused?.focus();
    };

    burger.addEventListener('click', open);
    closeBtn?.addEventListener('click', close);
    drawer.addEventListener('click', (e) => { if (e.target === drawer) close(); });

    document.addEventListener('keydown', (e) => {
      if (drawer.hidden) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;

      const items = [...drawer.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
</script>
```

- [ ] **Step 6: Write `src/components/site/Footer.astro`**

```astro
---
import Logo from '../ds/Logo.astro';
import { FOOTER_GROUPS, CONTACT_EMAIL } from '../../site';
const year = new Date().getFullYear();
---
<footer class="mv-field-ink site-footer">
  <div class="mv-wrap site-footer-grid">
    <div class="site-footer-brand">
      <Logo variant="lockup" height={24} />
      <p>Manufacturing operations, finally simple.</p>
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
    </div>
    {FOOTER_GROUPS.map((g) => (
      <div class="site-footer-col">
        <span class="mv-eyebrow">{g.heading}</span>
        {g.links.map((l) => <a href={l.href}>{l.label}</a>)}
      </div>
    ))}
  </div>
  <div class="site-footer-base">
    <div class="mv-wrap">
      <span>© {year} Pac Technologies Pty Ltd</span>
      <span class="mv-mono">manuva.app</span>
    </div>
  </div>
</footer>
```

- [ ] **Step 7: Add chrome styles to `src/styles/site.css`**

Geometry only. Colour, type and spacing come from tokens.

```css
/* --- nav --- */
.site-nav { position: sticky; top: 0; z-index: 40; background: var(--field-paper); }
.site-nav-inner { display: flex; align-items: center; gap: var(--space-10); height: 88px; }
.site-nav-logo { color: var(--ink-strong); flex: none; display: inline-flex; }
.site-nav-links { display: flex; gap: var(--space-6); flex: 1; }
.site-nav-links a, .site-nav-signin {
  font-size: var(--fs-md); font-weight: var(--fw-semibold);
  color: var(--ink-strong); text-decoration: none; white-space: nowrap;
}
.site-burger {
  background: none; border: 0; cursor: pointer; padding: var(--space-3);
  flex-direction: column; gap: 5px; align-items: center; justify-content: center;
}
.site-burger > span { display: block; width: 22px; height: 2px; background: var(--ink-strong); }
@media (max-width: 960px) { .site-nav-inner { height: 64px; } }

/* --- drawer --- */
.site-drawer { position: fixed; inset: 0; z-index: 60; background: rgb(20 20 19 / .5); }
.site-drawer[hidden] { display: none; }
.site-drawer-panel {
  position: absolute; inset-block: 0; right: 0; width: min(320px, 86vw);
  background: var(--bg-card); padding: var(--space-8);
  display: grid; align-content: start; gap: var(--space-6);
}
.site-drawer-panel nav { display: grid; gap: var(--space-5); }
.site-drawer-panel a { color: var(--ink-strong); text-decoration: none; font-size: var(--fs-lg); }
.site-drawer-close {
  justify-self: end; background: none; border: 0; cursor: pointer;
  font-size: 28px; line-height: 1; color: var(--ink-muted);
}
@media (prefers-reduced-motion: no-preference) {
  .site-drawer-panel { animation: drawer-in var(--dur-fast) var(--ease-out); }
  @keyframes drawer-in { from { transform: translateX(8px); opacity: 0; } }
}

/* --- footer --- */
.site-footer-grid {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: var(--space-10); padding-block: var(--space-16);
}
.site-footer-brand { display: grid; gap: var(--space-5); align-content: start; color: #fff; }
.site-footer-brand p { margin: 0; max-width: 28ch; color: rgb(255 255 255 / .62); }
.site-footer-col { display: grid; gap: var(--space-3); align-content: start; }
.site-footer-col .mv-eyebrow { color: var(--field-amber); }
.site-footer a { color: rgb(255 255 255 / .62); text-decoration: none; }
.site-footer a:hover { color: #fff; }
.site-footer-base { border-top: 1px solid rgb(255 255 255 / .12); }
.site-footer-base .mv-wrap {
  display: flex; justify-content: space-between;
  padding-block: var(--space-5); font-size: var(--fs-xs); color: rgb(255 255 255 / .42);
}
@media (max-width: 720px) {
  .site-footer-grid { grid-template-columns: 1fr 1fr; }
  .site-footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 480px) { .site-footer-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 8: Render chrome from `Base.astro`**

Replace the two named slots with the real components:

```astro
---
import Nav from '../components/site/Nav.astro';
import Footer from '../components/site/Footer.astro';
// … existing props and TOKENS …
---
  <body>
    <a class="skip" href="#main">Skip to content</a>
    <Nav />
    <main id="main"><slot /></main>
    <Footer />
  </body>
```

- [ ] **Step 9: Run the tests**

Run: `npm test`
Expected: PASS — 30 tests across five files.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): add site chrome with drawer ported from mobile.js"
```

---

### Task 5: Section primitives

**Files:**
- Create: `src/components/site/Field.astro`, `Panel.astro`, `Tile.astro`, `Pill.astro`, `Marquee.astro`, `CtaBand.astro`
- Modify: `src/styles/site.css`
- Test: `tests/unit/primitives.test.ts`

**Interfaces:**
- Consumes: `Button.astro`, `Icon.astro`, `Logo.astro`.
- Produces:
  - `Field.astro` — `{ field: FieldName; class?: string }`, full-bleed band, `<section>`.
  - `Panel.astro` — `{ field: FieldName; class?: string }`, inset rounded panel.
  - `Tile.astro` — `{ field: FieldName; num?: string; icon?: string; title: string }`, default slot is body copy.
  - `Pill.astro` — `{ href: string; field?: FieldName; class?: string }`, wraps `Button` at `size="xl" shape="pill"`.
  - `Marquee.astro` — `{ words: string[] }`.
  - `CtaBand.astro` — `{ field: FieldName; heading: string; body: string }`.
  - `FieldName` type exported from `src/site.ts`: `'cobalt' | 'flare' | 'amber' | 'violet' | 'mint' | 'aqua' | 'lime' | 'ink' | 'paper'`.

- [ ] **Step 1: Add the field type to `src/site.ts`**

```ts
export const FIELDS = [
  'cobalt', 'flare', 'amber', 'violet', 'mint', 'aqua', 'lime', 'ink', 'paper',
] as const;
export type FieldName = (typeof FIELDS)[number];
```

- [ ] **Step 2: Write the failing test**

`tests/unit/primitives.test.ts`:

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Field from '../../src/components/site/Field.astro';
import Panel from '../../src/components/site/Panel.astro';
import Tile from '../../src/components/site/Tile.astro';
import Pill from '../../src/components/site/Pill.astro';
import Marquee from '../../src/components/site/Marquee.astro';
import { FIELDS } from '../../src/site';

const render = (C: any, props: Record<string, unknown> = {}, slot = 'content') =>
  AstroContainer.create().then((c) => c.renderToString(C, { props, slots: { default: slot } }));

test('every field pairs its background with its own ink', async () => {
  for (const field of FIELDS) {
    const html = await render(Field, { field });
    expect(html, `${field} background`).toContain(`var(--field-${field})`);
    expect(html, `${field} ink`).toContain(`var(--on-${field})`);
  }
});

test('panels pair background and ink too', async () => {
  const html = await render(Panel, { field: 'cobalt' });
  expect(html).toContain('var(--field-cobalt)');
  expect(html).toContain('var(--on-cobalt)');
});

test('panels use the panel radius token, tiles the tile radius token', async () => {
  expect(await render(Panel, { field: 'cobalt' })).toContain('var(--radius-panel)');
  expect(await render(Tile, { field: 'mint', title: 'Logistics' })).toContain('var(--radius-tile)');
});

test('primitives hardcode no colour, radius or spacing value', async () => {
  for (const [C, props] of [
    [Field, { field: 'ink' }],
    [Panel, { field: 'amber' }],
    [Tile, { field: 'aqua', title: 'Audit' }],
  ] as const) {
    const html = await render(C, props);
    expect(html).not.toMatch(/#[0-9a-fA-F]{3,6}/);
    expect(html).not.toMatch(/:\s*\d+px/);
  }
});

test('pill CTAs are real anchors at pill shape', async () => {
  const html = await render(Pill, { href: 'https://app.manuva.app' }, 'Start free');
  expect(html).toMatch(/^<a/);
  expect(html).toContain('var(--radius-pill)');
  expect(html).toContain('https://app.manuva.app');
});

test('marquee duplicates its words so the loop is seamless', async () => {
  const words = ['Yield % on every BOM line', '14-day free trial'];
  const html = await render(Marquee, { words });
  const hits = html.split('14-day free trial').length - 1;
  expect(hits).toBe(2);
});

test('marquee is decorative and hidden from screen readers on the duplicate', async () => {
  const html = await render(Marquee, { words: ['a phrase'] });
  expect(html).toContain('aria-hidden="true"');
});

test('marquee uses the design system track class so reduced motion stops it', async () => {
  const html = await render(Marquee, { words: ['a phrase'] });
  expect(html).toContain('mv-marquee-track');
});

test('Field declares its fold so hue adjacency can be checked', async () => {
  expect(await render(Field, { field: 'ink' })).toContain('data-fold="ink"');
});

test('Tile never declares a fold — a tile grid is one composed unit, exempt from the rule', async () => {
  const html = await render(Tile, { field: 'cobalt', title: 'Inventory' });
  expect(html).not.toContain('data-fold');
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npx vitest run tests/unit/primitives.test.ts`
Expected: FAIL — components do not exist.

- [ ] **Step 4: Write the primitives**

`src/components/site/Field.astro`:

```astro
---
import type { FieldName } from '../../site';
export interface Props { field: FieldName; class?: string }
const { field, class: className } = Astro.props;
---
<section
  class:list={['mv-section', className]}
  data-fold={field}
  style={`background:var(--field-${field});color:var(--on-${field})`}
>
  <div class="mv-wrap"><slot /></div>
</section>
```

`src/components/site/Panel.astro`:

```astro
---
import type { FieldName } from '../../site';
export interface Props { field: FieldName; class?: string; [key: string]: unknown }
const { field, class: className, ...rest } = Astro.props;
---
<div
  class:list={['mv-panel', className]}
  style={`background:var(--field-${field});color:var(--on-${field});border-radius:var(--radius-panel)`}
  {...rest}
>
  <slot />
</div>
```

`src/components/site/Tile.astro`:

```astro
---
import Icon from '../ds/Icon.astro';
import type { FieldName } from '../../site';
export interface Props { field: FieldName; num?: string; icon?: string; title: string }
const { field, num, icon, title } = Astro.props;
---
<div
  class="site-tile mv-reveal mv-lift"
  style={`background:var(--field-${field});color:var(--on-${field});border-radius:var(--radius-tile)`}
>
  <div class="site-tile-head">
    {icon && <Icon name={icon} size={30} />}
    {num && <span class="mv-score site-tile-num">{num}</span>}
  </div>
  <span class="site-tile-title">{title}</span>
  <span class="site-tile-body"><slot /></span>
</div>
```

`src/components/site/Pill.astro`:

```astro
---
import Button from '../ds/Button.astro';
import type { FieldName } from '../../site';
export interface Props { href: string; field?: FieldName; class?: string }
const { href, field, class: className } = Astro.props;
const style = field
  ? `background:var(--field-${field});color:var(--on-${field});border-color:var(--field-${field})`
  : undefined;
---
<Button as="a" href={href} size="xl" shape="pill" variant="ink" class:list={['mv-press', className]} style={style}>
  <slot />
</Button>
```

`src/components/site/Marquee.astro`:

```astro
---
export interface Props { words: string[] }
const { words } = Astro.props;
---
<div class="mv-field-lime site-marquee">
  <div class="mv-marquee-track">
    {words.map((w) => <span class="site-marquee-word">{w}<i aria-hidden="true"></i></span>)}
    {words.map((w) => <span class="site-marquee-word" aria-hidden="true">{w}<i aria-hidden="true"></i></span>)}
  </div>
</div>
```

`src/components/site/CtaBand.astro`:

```astro
---
import Pill from './Pill.astro';
import type { FieldName } from '../../site';
import { APP_URL, CONTACT_EMAIL } from '../../site';
export interface Props { field: FieldName; heading: string; body: string }
const { field, heading, body } = Astro.props;
---
<section class="mv-section site-cta">
  <div class="mv-wrap">
    <div class="mv-panel site-cta-inner" data-fold={field} style={`background:var(--field-${field});color:var(--on-${field})`}>
      <h2 class="mv-display site-cta-heading">{heading}</h2>
      <p class="site-cta-body">{body}</p>
      <div class="mv-cta-stack site-cta-actions">
        <Pill href={APP_URL}>Start free</Pill>
        <Pill href={`mailto:${CONTACT_EMAIL}`}>Talk to us</Pill>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Add primitive styles to `src/styles/site.css`**

```css
.site-tile {
  padding: var(--space-8); min-height: 280px;
  display: grid; grid-template-rows: auto auto 1fr; gap: var(--space-6);
}
.site-tile-head { display: flex; align-items: flex-start; justify-content: space-between; }
.site-tile-num { font-size: var(--fs-display-1); opacity: .34; }
.site-tile-title {
  font-family: var(--font-display); font-weight: 800;
  font-size: var(--fs-display-1); line-height: 1.02; letter-spacing: var(--ls-mega);
}
.site-tile-body { font-size: var(--fs-md); line-height: 1.5; opacity: .82; text-wrap: pretty; align-self: start; }

.site-marquee { overflow: hidden; padding-block: var(--space-5); }
.site-marquee-word {
  display: flex; align-items: center; gap: var(--space-8);
  padding-inline: var(--space-8); white-space: nowrap;
  font-family: var(--font-display); font-weight: 700; font-size: var(--fs-lg);
}
.site-marquee-word > i { width: 9px; height: 9px; border-radius: 50%; background: var(--on-lime); flex: none; }

.site-cta-inner { display: grid; justify-items: center; text-align: center; gap: var(--space-8); }
.site-cta-heading { font-size: var(--fs-display-5); max-width: 12ch; margin: 0; }
.site-cta-body { margin: 0; font-size: var(--fs-lg); max-width: 38ch; opacity: .84; text-wrap: pretty; }
.site-cta-actions { display: flex; gap: var(--space-4); }
```

- [ ] **Step 6: Run the tests**

Run: `npm test`
Expected: PASS — all files green.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): add field, panel, tile, pill, marquee and CTA primitives"
```

---

### Task 6: Copy-parity gate

**Files:**
- Create: `scripts/parity/extract.js`, `scripts/parity/check.js`, `scripts/parity/ignore.json`
- Test: `tests/unit/parity-extract.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `extractText(html: string): string` — visible main-content text, normalised.
  - `toPhrases(text: string): string[]` — comparable sentence-ish fragments, ≥25 chars.
  - `check.js` — CLI, exits 1 with a per-route report when the new page is missing source phrases.

Built before the content pages so every page lands with the gate already watching. It reports "old page not built yet" until its counterpart exists, which is expected.

- [ ] **Step 1: Write the failing test**

`tests/unit/parity-extract.test.ts`:

```ts
import { expect, test } from 'vitest';
import { extractText, toPhrases } from '../../scripts/parity/extract.js';

test('prefers main, since seven of eight old pages wrap content in it', () => {
  const html = `<body><header>nav junk</header><main>The real content of the page.</main><footer>footer junk</footer></body>`;
  expect(extractText(html)).toBe('The real content of the page.');
});

test('falls back to body when there is no main, as on the old index.html', () => {
  const html = `<body><header>nav junk</header><section>The real content of the page.</section><footer>footer junk</footer></body>`;
  expect(extractText(html)).toBe('The real content of the page.');
});

test('always strips chrome, scripts and styles from both sides', () => {
  const html = `<body><main>Keep this.<script>var x=1</script><style>.a{color:red}</style><nav>drop</nav></main></body>`;
  expect(extractText(html)).toBe('Keep this.');
});

test('normalises entities, smart quotes and whitespace so formatting is not a diff', () => {
  const html = `<body><main>Manuva\u2019s   \u201cflat\u201d\u00a0pricing.\n\nUnlimited users.</main></body>`;
  expect(extractText(html)).toBe(`Manuva's "flat" pricing. Unlimited users.`);
});

test('splits into phrases and drops fragments too short to be meaningful', () => {
  const text = 'Flat pricing that never charges per seat. OK. Unlimited users on Growth and above.';
  expect(toPhrases(text)).toEqual([
    'Flat pricing that never charges per seat.',
    'Unlimited users on Growth and above.',
  ]);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run tests/unit/parity-extract.test.ts`
Expected: FAIL — `scripts/parity/extract.js` does not exist.

- [ ] **Step 3: Write `scripts/parity/extract.js`**

```js
import { load } from 'cheerio';

export function normalise(text) {
  return text
    .replace(/\u00a0/g, ' ')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractText(html) {
  const $ = load(html);
  $('script, style, noscript, header, nav, footer, svg').remove();
  const root = $('main').length ? $('main') : $('body');
  return normalise(root.text());
}

export function toPhrases(text) {
  return text
    .split(/(?<=[.!?:])\s+|\s*[|•]\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 25);
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `npx vitest run tests/unit/parity-extract.test.ts`
Expected: PASS, 5 tests.

- [ ] **Step 5: Write `scripts/parity/ignore.json`**

Every entry is a conscious decision. Starts with the invented figures the reference layouts carry and the spec forbids shipping.

```json
{
  "_comment": "Phrases present in the old site that are deliberately absent from the new one. Each entry needs a reason. Matching is substring, case-insensitive.",
  "/": [],
  "/features": [],
  "/pricing": [],
  "/about": [],
  "/alternatives/katana": [],
  "/alternatives/mrpeasy": [],
  "/privacy": [],
  "/terms": []
}
```

- [ ] **Step 6: Write `scripts/parity/check.js`**

```js
import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { extractText, toPhrases } from './extract.js';

const OLD_REPO = 'C:/dev/ManuvaMarketing';
const ROUTES = [
  ['/', 'index.html', 'dist/index.html'],
  ['/features', 'features.html', 'dist/features.html'],
  ['/pricing', 'pricing.html', 'dist/pricing.html'],
  ['/about', 'about.html', 'dist/about.html'],
  ['/alternatives/katana', 'alternatives/katana.html', 'dist/alternatives/katana.html'],
  ['/alternatives/mrpeasy', 'alternatives/mrpeasy.html', 'dist/alternatives/mrpeasy.html'],
  ['/privacy', 'privacy.html', 'dist/privacy.html'],
  ['/terms', 'terms.html', 'dist/terms.html'],
];

const ignore = JSON.parse(readFileSync(new URL('./ignore.json', import.meta.url), 'utf8'));

const readOld = (path) =>
  execFileSync('git', ['-C', OLD_REPO, 'show', `origin/master:${path}`], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });

let failed = 0;
const only = process.argv[2];

for (const [route, oldPath, newPath] of ROUTES) {
  if (only && only !== route) continue;

  if (!existsSync(newPath)) {
    console.log(`- ${route}  not built yet, skipped`);
    continue;
  }

  const oldPhrases = toPhrases(extractText(readOld(oldPath)));
  const newText = extractText(readFileSync(newPath, 'utf8')).toLowerCase();
  const allowed = (ignore[route] || []).map((s) => s.toLowerCase());

  const missing = oldPhrases.filter((p) => {
    const needle = p.toLowerCase();
    if (newText.includes(needle)) return false;
    return !allowed.some((a) => needle.includes(a));
  });

  if (missing.length) {
    failed++;
    console.error(`\nFAIL ${route} — ${missing.length} of ${oldPhrases.length} source phrases missing:`);
    for (const m of missing.slice(0, 40)) console.error(`  · ${m}`);
    if (missing.length > 40) console.error(`  … and ${missing.length - 40} more`);
  } else {
    console.log(`+ ${route}  ${oldPhrases.length} phrases present`);
  }
}

if (failed) {
  console.error(`\n${failed} page(s) lost content. Move the copy across, or add a reasoned entry to scripts/parity/ignore.json.`);
  process.exit(1);
}
console.log('\nCopy parity holds.');
```

Add to `package.json` scripts: `"parity": "node scripts/parity/check.js"`.

- [ ] **Step 7: Verify the gate runs and reports honestly**

Run: `npm run build && npm run parity`
Expected: `/` reports either a pass or a list of missing phrases against the placeholder home page; the other seven report "not built yet, skipped". Exit code may be 1 — that is correct, the content is genuinely not moved yet.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): add copy-parity gate against the old site"
```

---

### Task 7: Home page

**Files:**
- Create: `src/pages/index.astro` (replaces the placeholder)
- Modify: `src/styles/site.css`, `scripts/parity/ignore.json`
- Test: `tests/unit/home.test.ts`

**Interfaces:**
- Consumes: `Base`, `Field`, `Panel`, `Tile`, `Pill`, `Marquee`, `CtaBand`, `Icon`, `Logo`.
- Produces: the `/` route.

**Field sequence:** paper → **cobalt** hero panel → **lime** marquee → cobalt *tint* + screenshot → paper (six field tiles) → paper (**amber**/**violet** split) → **mint** beta strip → **ink** comparison → **flare** CTA → ink footer.

- [ ] **Step 1: Read the source copy**

```bash
git -C C:/dev/ManuvaMarketing show origin/master:index.html > /tmp/old-index.html
git -C C:/dev/ManuvaMarketing show origin/master:llms.txt
```

Every heading, paragraph, list item and table row moves across. Read the whole file before writing — 66KB, the largest page.

- [ ] **Step 2: Write the failing test**

`tests/unit/home.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const html = () => readFileSync('dist/index.html', 'utf8');

test('states the trial correctly', () => {
  const h = html();
  expect(h).toMatch(/14[\s-]day/i);
  expect(h).not.toMatch(/30[\s-]day free trial/i);
  expect(h).not.toMatch(/free forever/i);
});

test('carries the beta-tester strip', () => {
  expect(html()).toMatch(/3 months of Pro/i);
});

test('ships none of the invented reference figures', () => {
  const h = html();
  for (const invented of ['1,240', '830 factories', '$339,410']) {
    expect(h, `${invented} was invented in the reference layout`).not.toContain(invented);
  }
});

test('the product section is the screenshot, not a mocked data table', () => {
  const h = html();
  expect(h).toContain('screen-dashboard.png');
  expect(h).not.toContain('mv-cell');
});

test('CTAs point at the app', () => {
  expect(html()).toContain('https://app.manuva.app');
});

test('lime is never used as a text colour', () => {
  const h = html();
  expect(h).not.toMatch(/color:\s*var\(--field-lime\)/);
  expect(h).not.toMatch(/color:\s*#C8FF2E/i);
});

test('no two adjacent folds share a hue', () => {
  // data-fold marks fold-level colour only. Tiles are exempt: a tile grid is one
  // composed unit with paper between every tile, so its hues never "touch".
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  expect(folds.length, 'page should declare its folds').toBeGreaterThan(2);
  for (let i = 1; i < folds.length; i++) {
    expect(folds[i], `${folds[i]} repeats at fold ${i}`).not.toBe(folds[i - 1]);
  }
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm run build && npx vitest run tests/unit/home.test.ts`
Expected: FAIL — the placeholder home page has none of this.

- [ ] **Step 4: Copy the screenshots into `public/`**

```bash
git -C C:/dev/ManuvaMarketing show origin/master:screen-dashboard.png > public/screen-dashboard.png
git -C C:/dev/ManuvaMarketing show origin/master:screen-variant.png > public/screen-variant.png
git -C C:/dev/ManuvaMarketing show origin/master:screen-components.png > public/screen-components.png
```

All three are 2080×1090. `hero-dashboard.png` is an unreferenced old placeholder — do not copy it.

- [ ] **Step 5: Write `src/pages/index.astro`**

Every section's copy comes from `/tmp/old-index.html` verbatim — the skeleton below is the field structure it hangs on, not a licence to write new prose. Where a `{/* … */}` marker appears, move the corresponding section across whole.

```astro
---
import Base from '../layouts/Base.astro';
import Field from '../components/site/Field.astro';
import Panel from '../components/site/Panel.astro';
import Tile from '../components/site/Tile.astro';
import Pill from '../components/site/Pill.astro';
import Marquee from '../components/site/Marquee.astro';
import CtaBand from '../components/site/CtaBand.astro';
import { APP_URL } from '../site';

const DOMAINS = [
  ['01', 'package',       'Inventory',       'cobalt'],
  ['02', 'layers',        'Products & BOMs', 'violet'],
  ['03', 'factory',       'Production',      'flare'],
  ['04', 'shopping-cart', 'Purchasing',      'amber'],
  ['05', 'truck',         'Logistics',       'mint'],
  ['06', 'history',       'Audit',           'aqua'],
] as const;

const MARQUEE = [
  'Yield % on every BOM line',
  'BOM versioning with rollback',
  'Unlimited users on Growth',
  'Real-time Shopify webhooks',
  '14-day free trial',
];
---
<Base
  title="Manuva — MRP for Shopify manufacturers"
  description="{/* the old page's meta description, verbatim */}"
  canonical="https://manuva.app/"
>
  {/* 1 · cobalt hero panel, inset on paper */}
  <section class="site-hero">
    <div class="mv-wrap">
      <Panel field="cobalt" class="site-hero-panel" data-fold="cobalt">
        <span class="mv-eyebrow">MRP for Shopify manufacturers</span>
        <h1 class="mv-display site-hero-title">{/* headline, verbatim */}</h1>
        <p class="site-hero-sub">{/* subhead, verbatim */}</p>
        <div class="mv-cta-stack site-hero-actions">
          <Pill href={APP_URL} field="lime">Start free</Pill>
          <Pill href={APP_URL} class="site-pill-ghost">Book a demo</Pill>
        </div>
      </Panel>
    </div>
  </section>

  {/* 2 · lime marquee — lime as a background, never as text */}
  <Marquee words={MARQUEE} />

  {/* 3 · product shot on a cobalt TINT, not a field. Never a field behind a table,
         and this is the real screenshot, not a mocked DataTable. */}
  <section class="mv-section site-shot">
    <div class="mv-wrap">
      <span class="mv-eyebrow">Live, not nightly</span>
      <h2 class="mv-display">{/* section heading, verbatim */}</h2>
      <img src="/screen-dashboard.png" width="2080" height="1090" loading="lazy"
           decoding="async" alt="{/* describe what the dashboard shows */}" />
    </div>
  </section>

  {/* 4 · six field tiles — one composed unit, paper visible between every tile */}
  <section class="mv-section">
    <div class="mv-wrap">
      <h2 class="mv-display">{/* section heading, verbatim */}</h2>
      <div class="mv-cols-3">
        {DOMAINS.map(([num, icon, title, field]) => (
          <Tile field={field} num={num} icon={icon} title={title}>
            {/* the matching blurb from the old page, verbatim */}
          </Tile>
        ))}
      </div>
    </div>
  </section>

  {/* 5 · amber / violet split */}
  <section class="mv-section">
    <div class="mv-wrap mv-split" style="--split:1.25fr 1fr">
      <Panel field="amber">{/* left panel copy, verbatim */}</Panel>
      <Panel field="violet">{/* right panel copy, verbatim */}</Panel>
    </div>
  </section>

  {/* 6 · mint beta strip — the offer is current, moves across verbatim */}
  <Field field="mint" class="site-beta">
    <p class="site-beta-head">Beta testers get <strong>3 months of Pro — free</strong>.</p>
    <p class="site-beta-sub">{/* the strip's subline, verbatim */}</p>
    <Pill href={APP_URL} field="ink">Start free trial</Pill>
  </Field>

  {/* 7 · ink comparison */}
  <Field field="ink">
    {/* comparison copy and rows, verbatim from the old page's compare section */}
  </Field>

  {/* 8 · flare CTA */}
  <CtaBand
    field="flare"
    heading="{/* closing heading, verbatim */}"
    body="14 days free with full Pro access. No credit card required."
  />
</Base>
```

Two rules bite here specifically:

- The product section uses `<img src="/screen-dashboard.png" width="2080" height="1090" alt="…">` on a `var(--tint-cobalt)` background, never a live table. Give the image explicit dimensions so it reserves layout space, and `loading="eager"` plus `fetchpriority="high"` only if it is above the fold — it is not, so use `loading="lazy"`.
- The comparison table sits on `mv-field-ink` with the table itself on the ink field. That is text-on-field, not a data table on a colour field — the rule forbids the latter. Keep it to the four comparison rows the reference uses, sourced from the old page's own comparison copy.

The six domain tiles use `.mv-cols-3` and the fixed domain glyphs: Inventory `package` cobalt, Products & BOMs `layers` violet, Production `factory` flare, Purchasing `shopping-cart` amber, Logistics `truck` mint, Audit `history` aqua.

- [ ] **Step 6: Run the tests and the parity gate**

Run: `npm run build && npx vitest run tests/unit/home.test.ts`
Expected: PASS, 7 tests.

Run: `npm run parity -- /`
Expected: `+ / N phrases present`. If phrases are reported missing, move that copy across. Only add to `ignore.json` when the omission is deliberate, with the reason in the entry.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): build the home page on the field system"
```

---

### Task 8: Pricing page

**Files:**
- Create: `src/pages/pricing.astro`, `src/components/site/PriceCards.astro`, `src/components/site/FeatureMatrix.astro`, `src/components/site/FaqList.astro`
- Modify: `src/styles/site.css`
- Test: `tests/unit/pricing.test.ts`

**Interfaces:**
- Consumes: `Base`, `Field`, `CtaBand`, `Icon`.
- Produces: `PriceCards.astro` (prop-less, plans defined inline), `FeatureMatrix.astro` (prop-less), `FaqList.astro` — `{ items: { q: string; a: string }[] }`. `FaqList` is reused by both alternatives pages.

**Field sequence:** **ink** hero → paper plan cards → paper matrix → paper FAQ → **amber** CTA. The middle runs on paper because plan cards and the matrix are data, and the system forbids a colour field behind a table.

- [ ] **Step 1: Read the source copy**

```bash
git -C C:/dev/ManuvaMarketing show origin/master:pricing.html > /tmp/old-pricing.html
```

Note the old page's `<!-- KEEP IN SYNC -->` comments: the matrix and each plan card's mobile bullet list are linked. That relationship carries across as `.mv-matrix` / `.mv-matrix-cards`.

- [ ] **Step 2: Write the failing test**

`tests/unit/pricing.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const html = () => readFileSync('dist/pricing.html', 'utf8');

test('every plan price is exactly right', () => {
  const h = html();
  for (const price of ['$99', '$1,188', '$119', '$249', '$2,988', '$299', '$499', '$5,988', '$599']) {
    expect(h, `${price} missing`).toContain(price);
  }
});

test('states flat per-account pricing, the core differentiator', () => {
  expect(html()).toMatch(/flat/i);
  expect(html()).not.toMatch(/per seat pricing|priced per user/i);
});

test('trial is 14 days with full Pro access and no card', () => {
  const h = html();
  expect(h).toMatch(/14[\s-]day/i);
  expect(h).toMatch(/no credit card/i);
});

test('ships both the matrix and its below-720 card fallback', () => {
  const h = html();
  expect(h).toContain('mv-matrix');
  expect(h).toContain('mv-matrix-cards');
});

test('no colour field sits behind the matrix', () => {
  const h = html();
  const matrixStart = h.indexOf('mv-matrix');
  const section = h.slice(Math.max(0, matrixStart - 2000), matrixStart);
  expect(section).not.toMatch(/background:var\(--field-(cobalt|flare|amber|violet|mint|aqua|lime)\)/);
});

test('FAQ answers are real content, not stubs', () => {
  const h = html();
  expect(h).not.toMatch(/lorem|TBD|placeholder/i);
  expect(h).toMatch(/A location is any physical place/i);
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm run build && npx vitest run tests/unit/pricing.test.ts`
Expected: FAIL — `dist/pricing.html` does not exist.

- [ ] **Step 4: Write `FaqList.astro`**

Uses `<details>`/`<summary>` so it works with no JS and is keyboard-accessible for free.

```astro
---
export interface Props { items: { q: string; a: string }[] }
const { items } = Astro.props;
---
<div class="site-faq">
  {items.map((item) => (
    <details class="site-faq-item">
      <summary>{item.q}</summary>
      <div class="site-faq-answer" set:html={item.a} />
    </details>
  ))}
</div>
```

- [ ] **Step 5: Write `PriceCards.astro` and `FeatureMatrix.astro`**

Plan data comes from `llms.txt` and the old pricing page. `FeatureMatrix` renders the full matrix inside `.mv-matrix` and the per-plan bullet lists inside `.mv-matrix-cards`; the design system's `responsive.css` switches between them at 720px. Both must contain the same claims — that is what the old repo's `KEEP IN SYNC` comment was guarding by hand.

- [ ] **Step 6: Write `src/pages/pricing.astro`**

Copy moves verbatim from `/tmp/old-pricing.html`, including the full FAQ list. The four FAQs in `llms.txt` (what counts as a location, is pricing per seat, what the trial includes, what BOM versioning is, what yield % is) are the floor, not the ceiling — the old page has more.

- [ ] **Step 7: Run the tests and the gate**

Run: `npm run build && npx vitest run tests/unit/pricing.test.ts`
Expected: PASS, 6 tests.

Run: `npm run parity -- /pricing`
Expected: `+ /pricing N phrases present`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): build the pricing page with matrix and card fallback"
```

---

### Task 9: Features page

**Files:**
- Create: `src/pages/features.astro`
- Modify: `src/styles/site.css`
- Test: `tests/unit/features.test.ts`

**Interfaces:**
- Consumes: `Base`, `Field`, `Panel`, `Tile`, `CtaBand`, `Icon`.
- Produces: the `/features` route.

**Field sequence:** **aqua** hero panel → six-tile domain grid → paper spine of ten detail sections, with full-bleed **violet** after section 3 and **cobalt** after section 7 → **flare** CTA.

The domain grid is an additive summary band above the ten sections. It does not replace them, and no source section is folded into a tile.

- [ ] **Step 1: Read the source copy**

```bash
git -C C:/dev/ManuvaMarketing show origin/master:features.html > /tmp/old-features.html
```

The ten `<h2>` sections, in order: BOMs · orders · stock counts · lot tracking · purchase orders · shop floor · capacity planning · margin · reporting · Shopify. The most recent commit on `origin/master` added the orders, production-planning and scanner content — make sure it is present in what you read.

- [ ] **Step 2: Write the failing test**

`tests/unit/features.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const html = () => readFileSync('dist/features.html', 'utf8');

test('keeps all ten source sections as h2s', () => {
  const h2s = [...html().matchAll(/<h2[^>]*>(.*?)<\/h2>/gs)].map((m) => m[1]);
  expect(h2s.length).toBeGreaterThanOrEqual(10);
});

test('every source section heading survives', () => {
  const h = html();
  for (const heading of [
    'Build, version, and run BOMs',
    'Every order, from sale to shipment',
    'Stock counts you can actually trust',
    'Trace every finished good back to the lot',
    'Purchase orders that close the loop',
    'Run the floor without a whiteboard',
    'Plan production around the people',
    'Know your margin before the job starts',
    'Operational intelligence',
    'Built around your Shopify store',
  ]) {
    expect(h, `missing: ${heading}`).toContain(heading);
  }
});

test('uses collapse utilities rather than fixed column counts', () => {
  const h = html();
  expect(h).toMatch(/mv-cols-[2346]/);
  expect(h).not.toMatch(/grid-template-columns:\s*repeat\(\d,\s*1fr\)/);
});

test('no two adjacent folds share a hue', () => {
  // See Task 7 — data-fold marks fold-level colour; the six-tile grid is exempt.
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  expect(folds.length, 'page should declare its folds').toBeGreaterThan(2);
  for (let i = 1; i < folds.length; i++) {
    expect(folds[i], `${folds[i]} repeats at fold ${i}`).not.toBe(folds[i - 1]);
  }
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm run build && npx vitest run tests/unit/features.test.ts`
Expected: FAIL — `dist/features.html` does not exist.

- [ ] **Step 4: Write `src/pages/features.astro`**

Ten sections, copy verbatim. Lucide glyphs replace the old page's `data-lucide` attributes — the old page loaded the Lucide JS library at runtime to swap them in; here they are already inline.

- [ ] **Step 5: Run the tests and the gate**

Run: `npm run build && npx vitest run tests/unit/features.test.ts`
Expected: PASS, 4 tests.

Run: `npm run parity -- /features`
Expected: `+ /features N phrases present`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): build the features page"
```

---

### Task 10: Alternatives pages

**Files:**
- Create: `src/layouts/Alternative.astro`, `src/pages/alternatives/katana.astro`, `src/pages/alternatives/mrpeasy.astro`
- Test: `tests/unit/alternatives.test.ts`

**Interfaces:**
- Consumes: `Base`, `Field`, `Panel`, `FaqList`, `CtaBand`.
- Produces: `Alternative.astro` — props `{ title: string; description: string; canonical: string; heroField: FieldName; ctaField: FieldName; competitor: string }`, slots for hero copy, comparison and FAQ.

**Field sequences:** Katana — **violet** hero → paper comparison → paper FAQ → **flare** CTA. MRPeasy — **amber** hero → paper comparison → paper FAQ → **cobalt** CTA. Different hues so the two pages do not read as the same page.

**These are the highest-risk pages in the project.** 32KB and 28KB of competitor-intercept content that ranks. The reference layouts are shorter than the source and their FAQ answers are stubs — the source wins, every time.

- [ ] **Step 1: Read both source pages in full**

```bash
git -C C:/dev/ManuvaMarketing show origin/master:alternatives/katana.html > /tmp/old-katana.html
git -C C:/dev/ManuvaMarketing show origin/master:alternatives/mrpeasy.html > /tmp/old-mrpeasy.html
```

Read both completely before writing anything. Do not summarise, do not merge rows, do not drop a comparison line because it looks repetitive.

- [ ] **Step 2: Write the failing test**

`tests/unit/alternatives.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { expect, test } from 'vitest';
import { extractText } from '../../scripts/parity/extract.js';

const OLD = 'C:/dev/ManuvaMarketing';
const oldPage = (p: string) =>
  execFileSync('git', ['-C', OLD, 'show', `origin/master:${p}`], { encoding: 'utf8', maxBuffer: 32e6 });

const pages = [
  ['katana', 'alternatives/katana.html', 'dist/alternatives/katana.html'],
  ['mrpeasy', 'alternatives/mrpeasy.html', 'dist/alternatives/mrpeasy.html'],
] as const;

test.each(pages)('%s keeps at least as much content as the source', (_n, oldPath, newPath) => {
  const before = extractText(oldPage(oldPath)).length;
  const after = extractText(readFileSync(newPath, 'utf8')).length;
  expect(after, `content shrank from ${before} to ${after} chars`).toBeGreaterThanOrEqual(before * 0.98);
});

test.each(pages)('%s has no stub FAQ answers', (_n, _o, newPath) => {
  const h = readFileSync(newPath, 'utf8');
  expect(h).not.toMatch(/lorem|TBD|placeholder|coming soon/i);
});

test('the two pages use different hero hues so they do not read as one page', () => {
  const k = readFileSync('dist/alternatives/katana.html', 'utf8');
  const m = readFileSync('dist/alternatives/mrpeasy.html', 'utf8');
  expect(k).toContain('var(--field-violet)');
  expect(m).toContain('var(--field-amber)');
});

test('mrpeasy makes the per-user cost argument', () => {
  // llms.txt: a 10-person team reaches $490/mo on MRPeasy before advanced features.
  const h = readFileSync('dist/alternatives/mrpeasy.html', 'utf8');
  expect(h).toMatch(/\$490/);
});

test('katana names the features Katana does not offer', () => {
  const h = readFileSync('dist/alternatives/katana.html', 'utf8');
  for (const feature of ['yield', 'versioning', 'variance', 'lead-time']) {
    expect(h.toLowerCase(), `missing: ${feature}`).toContain(feature);
  }
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm run build && npx vitest run tests/unit/alternatives.test.ts`
Expected: FAIL — pages do not exist.

- [ ] **Step 4: Write `Alternative.astro` and both pages**

The layout carries the shared shape; the two pages supply their own copy and hues. The comparison table runs on paper.

```astro
---
import Base from './Base.astro';
import Panel from '../components/site/Panel.astro';
import FaqList from '../components/site/FaqList.astro';
import CtaBand from '../components/site/CtaBand.astro';
import type { FieldName } from '../site';

export interface Props {
  title: string;
  description: string;
  canonical: string;
  competitor: string;
  heroField: FieldName;
  ctaField: FieldName;
  faqs: { q: string; a: string }[];
  schema?: Record<string, unknown>[];
}
const { title, description, canonical, competitor, heroField, ctaField, faqs, schema } = Astro.props;
---
<Base {title} {description} {canonical} {schema}>
  <section class="site-alt-hero">
    <div class="mv-wrap">
      <Panel field={heroField}>
        <span class="mv-eyebrow">Manuva vs {competitor}</span>
        <slot name="hero" />
      </Panel>
    </div>
  </section>

  {/* Comparison runs on paper — never a colour field behind a table. */}
  <section class="mv-section">
    <div class="mv-wrap"><slot name="comparison" /></div>
  </section>

  <section class="mv-section">
    <div class="mv-wrap">
      <h2 class="mv-display">Questions</h2>
      <FaqList items={faqs} />
    </div>
  </section>

  <CtaBand field={ctaField} heading="Run your first job today."
           body="14 days free with full Pro access. No credit card required." />
</Base>
```

The `faqs` array is passed by each page and reused verbatim for the `FAQPage` JSON-LD in Task 13, so the two can never drift. **Answers come from the old repo's HTML, not from the reference layouts — those are stubs.**

- [ ] **Step 5: Run the tests and the gate**

Run: `npm run build && npx vitest run tests/unit/alternatives.test.ts`
Expected: PASS, 8 tests.

Run: `npm run parity -- /alternatives/katana && npm run parity -- /alternatives/mrpeasy`
Expected: both report all phrases present. **If either reports missing phrases, move the copy — do not add to the ignore list.** These are the two pages the brief is explicit about.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): build both alternatives pages with copy intact"
```

---

### Task 11: About page

**Files:**
- Create: `src/pages/about.astro`
- Test: `tests/unit/about.test.ts`

**Interfaces:**
- Consumes: `Base`, `Field`, `Panel`, `CtaBand`.
- Produces: the `/about` route.

**Field sequence:** **mint** hero → paper → **ink** principles → **flare** CTA.

- [ ] **Step 1: Read the source copy**

```bash
git -C C:/dev/ManuvaMarketing show origin/master:about.html > /tmp/old-about.html
```

Four sections: one system covering the shop floor · the principles behind the product · who runs Manuva · a closing CTA.

- [ ] **Step 2: Write the failing test**

`tests/unit/about.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const html = () => readFileSync('dist/about.html', 'utf8');

test('names the operating company', () => {
  expect(html()).toContain('Pac Technologies');
});

test('keeps all four source sections', () => {
  const h = html();
  for (const heading of [
    'One system covering the whole shop floor',
    'The principles behind the product',
    'Who runs Manuva',
  ]) {
    expect(h, `missing: ${heading}`).toContain(heading);
  }
});

test('invents no team members or company facts', () => {
  const h = html();
  expect(h).not.toMatch(/lorem|placeholder|Jane Doe|John Smith/i);
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm run build && npx vitest run tests/unit/about.test.ts`
Expected: FAIL — page does not exist.

- [ ] **Step 4: Write `src/pages/about.astro`**

- [ ] **Step 5: Run the tests and the gate**

Run: `npm run build && npx vitest run tests/unit/about.test.ts`
Expected: PASS, 3 tests.

Run: `npm run parity -- /about`
Expected: all phrases present.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): build the about page"
```

---

### Task 12: Privacy and Terms

**Files:**
- Create: `src/layouts/Doc.astro`, `src/pages/privacy.astro`, `src/pages/terms.astro`
- Modify: `src/styles/site.css`
- Test: `tests/unit/legal.test.ts`

**Interfaces:**
- Consumes: `Base`.
- Produces: `Doc.astro` — props `{ title: string; description: string; canonical: string; heading: string; updated: string }`, default slot is the document body.

**Field sequence:** paper only, ink footer. 38KB and 48KB of long-form body copy, and the system forbids colour behind it. No fields on these two pages at all.

- [ ] **Step 1: Read the source copy**

```bash
git -C C:/dev/ManuvaMarketing show origin/master:privacy.html > /tmp/old-privacy.html
git -C C:/dev/ManuvaMarketing show origin/master:terms.html > /tmp/old-terms.html
```

Legal text moves across character-for-character. Clause numbering, defined terms and cross-references must not shift — the old repo has a spec noting that §15's carveout list was aligned deliberately.

- [ ] **Step 2: Write the failing test**

`tests/unit/legal.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';

const pages = [['privacy', 'dist/privacy.html'], ['terms', 'dist/terms.html']] as const;

test.each(pages)('%s uses no colour field behind long-form copy', (_n, path) => {
  const h = readFileSync(path, 'utf8');
  const body = h.slice(h.indexOf('<main'), h.indexOf('</main>'));
  expect(body).not.toMatch(/background:var\(--field-(cobalt|flare|amber|violet|mint|aqua|lime|ink)\)/);
});

test.each(pages)('%s constrains the measure for readability', (_n, path) => {
  expect(readFileSync(path, 'utf8')).toContain('site-doc');
});

test.each(pages)('%s names the operating entity and contact', (_n, path) => {
  const h = readFileSync(path, 'utf8');
  expect(h).toContain('Pac Technologies');
  expect(h).toContain('hello@manuva.app');
});

test('terms keeps its clause numbering intact', () => {
  const h = readFileSync('dist/terms.html', 'utf8');
  expect(h).toMatch(/\b15\b/);
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm run build && npx vitest run tests/unit/legal.test.ts`
Expected: FAIL — pages do not exist.

- [ ] **Step 4: Write `Doc.astro`**

```astro
---
import Base from './Base.astro';
export interface Props {
  title: string; description: string; canonical: string;
  heading: string; updated: string;
}
const { title, description, canonical, heading, updated } = Astro.props;
---
<Base title={title} description={description} canonical={canonical}>
  <article class="site-doc">
    <header class="site-doc-head">
      <h1>{heading}</h1>
      <p class="site-doc-updated">Last updated {updated}</p>
    </header>
    <slot />
  </article>
</Base>
```

Styles in `site.css`:

```css
.site-doc {
  max-width: 72ch; margin-inline: auto;
  padding-inline: var(--gutter); padding-block: var(--section-y);
}
.site-doc h1 { font-family: var(--font-display); font-size: var(--fs-display-3); margin: 0; }
.site-doc h2 { font-family: var(--font-display); font-size: var(--fs-display-1); margin-block: var(--space-10) var(--space-4); }
.site-doc h3 { font-size: var(--fs-lg); margin-block: var(--space-8) var(--space-3); }
.site-doc p, .site-doc li { font-size: var(--fs-md); line-height: 1.65; color: var(--ink); }
.site-doc-updated { color: var(--ink-muted); font-size: var(--fs-sm); }
.site-doc a { color: var(--brand-1); }
```

- [ ] **Step 5: Write both pages**

- [ ] **Step 6: Run the tests and the gate**

Run: `npm run build && npx vitest run tests/unit/legal.test.ts`
Expected: PASS, 7 tests.

Run: `npm run parity -- /privacy && npm run parity -- /terms`
Expected: all phrases present on both.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): build privacy and terms on a plain document layout"
```

---

### Task 13: SEO assets, redirects and structured data

**Files:**
- Create: `public/_redirects`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `netlify.toml`
- Copy: favicons and `og-image.png` into `public/`
- Modify: `src/layouts/Base.astro` (JSON-LD)
- Test: `tests/unit/seo.test.ts`

**Interfaces:**
- Consumes: `ALL_ROUTES` from `src/site.ts`.
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Carry the SEO assets across unchanged**

```bash
git -C C:/dev/ManuvaMarketing show origin/master:_redirects > public/_redirects
git -C C:/dev/ManuvaMarketing show origin/master:robots.txt > public/robots.txt
git -C C:/dev/ManuvaMarketing show origin/master:sitemap.xml > public/sitemap.xml
git -C C:/dev/ManuvaMarketing show origin/master:llms.txt > public/llms.txt
git -C C:/dev/ManuvaMarketing show origin/master:og-image.png > public/og-image.png
git -C C:/dev/ManuvaMarketing show origin/master:favicon-32.png > public/favicon-32.png
git -C C:/dev/ManuvaMarketing show origin/master:favicon-16.png > public/favicon-16.png
git -C C:/dev/ManuvaMarketing show origin/master:favicon-512.png > public/favicon-512.png
git -C C:/dev/ManuvaMarketing show origin/master:apple-touch-icon.png > public/apple-touch-icon.png
```

Routes have not changed, so the only edit to `sitemap.xml` is `lastmod`. Do not add or remove a `<url>`.

- [ ] **Step 2: Write `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

Deliberately **no** trailing-slash redirect rule. `from = "/*/"` with `force = true` matches `/` with an empty splat and redirects it to itself — an infinite loop on the home page. Astro's `trailingSlash: 'never'` plus `build.format: 'file'` emits `features.html`, and Netlify's default pretty-URL handling serves it at `/features` and canonicalises away the slash. `public/_redirects` still handles the eight legacy `.html` paths.

- [ ] **Step 3: Write the failing test**

`tests/unit/seo.test.ts`:

```ts
import { readFileSync, existsSync } from 'node:fs';
import { expect, test } from 'vitest';
import { ALL_ROUTES } from '../../src/site';

test('every SEO asset reaches the build output', () => {
  for (const f of ['_redirects', 'robots.txt', 'sitemap.xml', 'llms.txt', 'og-image.png']) {
    expect(existsSync(`dist/${f}`), `dist/${f} missing`).toBe(true);
  }
});

test('robots keeps the AI crawlers explicitly allowed', () => {
  const r = readFileSync('dist/robots.txt', 'utf8');
  for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'OAI-SearchBot', 'Google-Extended']) {
    expect(r, `${bot} allow rule lost`).toContain(bot);
  }
  expect(r).toContain('Sitemap: https://manuva.app/sitemap.xml');
});

test('redirects still collapse every .html variant', () => {
  const r = readFileSync('dist/_redirects', 'utf8');
  for (const p of ['/features.html', '/pricing.html', '/about.html', '/alternatives/katana.html', '/alternatives/mrpeasy.html', '/privacy.html', '/terms.html', '/index.html']) {
    expect(r, `${p} redirect lost`).toContain(p);
  }
});

test('sitemap lists exactly the eight routes, no more, no fewer', () => {
  const s = readFileSync('dist/sitemap.xml', 'utf8');
  const locs = [...s.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs).toHaveLength(8);
  for (const route of ALL_ROUTES) {
    const expected = route === '/' ? 'https://manuva.app/' : `https://manuva.app${route}`;
    expect(locs, `${expected} missing from sitemap`).toContain(expected);
  }
});

test('every route emits a canonical matching its sitemap entry', () => {
  for (const route of ALL_ROUTES) {
    const file = route === '/' ? 'dist/index.html' : `dist${route}.html`;
    const h = readFileSync(file, 'utf8');
    const expected = route === '/' ? 'https://manuva.app/' : `https://manuva.app${route}`;
    expect(h, `${route} canonical`).toContain(`rel="canonical" href="${expected}"`);
  }
});

test('the home page carries Organization and SoftwareApplication structured data', () => {
  const h = readFileSync('dist/index.html', 'utf8');
  expect(h).toContain('application/ld+json');
  expect(h).toContain('"@type":"Organization"');
  expect(h).toContain('Pac Technologies');
});

test('no page references the CDN-hosted fonts or icons', () => {
  for (const route of ALL_ROUTES) {
    const file = route === '/' ? 'dist/index.html' : `dist${route}.html`;
    const h = readFileSync(file, 'utf8');
    expect(h, `${route} references jsDelivr`).not.toContain('cdn.jsdelivr.net');
  }
});
```

- [ ] **Step 4: Run it to verify it fails**

Run: `npm run build && npx vitest run tests/unit/seo.test.ts`
Expected: FAIL — assets not yet copied, no JSON-LD.

- [ ] **Step 5: Render JSON-LD from `Base.astro`**

The `schema` prop was declared in Task 1. Emit it — add this immediately before `</head>`:

```astro
    {schema && schema.length > 0 && (
      <script type="application/ld+json" set:html={JSON.stringify(schema)} />
    )}
```

Then pass the nodes from `src/pages/index.astro`. Every value traces to `llms.txt`; nothing here is invented.

```astro
---
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Manuva',
    legalName: 'Pac Technologies Pty Ltd',
    url: 'https://manuva.app',
    email: 'hello@manuva.app',
    address: { '@type': 'PostalAddress', addressCountry: 'AU' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Manuva',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Manufacturing operations and MRP platform for Shopify-first product brands — inventory, bills of materials, production orders, purchasing, capacity planning, costing and reporting in a single web application.',
    offers: [
      { '@type': 'Offer', name: 'Starter', price: '99', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Growth', price: '249', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Pro', price: '499', priceCurrency: 'USD' },
    ],
  },
];
---
```

`offers` carries the annual per-month prices, matching the page. Do **not** add `aggregateRating` or `review` — no ratings or reviews exist, and inventing them is both a spec violation and a structured-data policy violation.

For `/pricing` and both `/alternatives/` pages, pass a `FAQPage` node built from the same array already feeding `FaqList`, so the two can never drift:

```astro
---
const faqs = [ /* the same array passed to <FaqList items={faqs} /> */ ];
const schema = [{
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}];
---
```

- [ ] **Step 6: Run the tests**

Run: `npm run build && npx vitest run tests/unit/seo.test.ts`
Expected: PASS, 7 tests.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-2): carry SEO assets across and add structured data"
```

---

### Task 14: End-to-end verification pass

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/routes.spec.ts`, `tests/e2e/a11y.spec.ts`, `tests/e2e/responsive.spec.ts`
- Test: the files above

**Interfaces:**
- Consumes: the built site.
- Produces: nothing.

- [ ] **Step 1: Install Playwright**

```bash
npm install -D @playwright/test @axe-core/playwright
npx playwright install chromium
```

- [ ] **Step 2: Configure it**

`playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: { baseURL: 'http://localhost:4321' },
});
```

Add script: `"test:e2e": "playwright test"`.

- [ ] **Step 3: Write the route and link tests**

`tests/e2e/routes.spec.ts`:

```ts
import { test, expect } from '@playwright/test';
import { ALL_ROUTES } from '../../src/site';

for (const route of ALL_ROUTES) {
  test(`${route} responds 200`, async ({ request }) => {
    const res = await request.get(route);
    expect(res.status()).toBe(200);
  });
}

test('no internal link 301s — every href is already canonical', async ({ page, request }) => {
  const seen = new Set<string>();
  for (const route of ALL_ROUTES) {
    await page.goto(route);
    const hrefs = await page.$$eval('a[href^="/"]', (as) => as.map((a) => a.getAttribute('href')!));
    for (const href of hrefs) seen.add(href.split('#')[0]);
  }
  for (const href of [...seen].filter(Boolean)) {
    const res = await request.get(href, { maxRedirects: 0 });
    expect(res.status(), `${href} should not redirect`).toBe(200);
  }
});

test('legacy .html paths still 301 to clean URLs', async ({ request }) => {
  // Netlify applies _redirects; astro preview does not, so this asserts the
  // rule file is present and well-formed rather than the live behaviour.
  const res = await request.get('/_redirects');
  const body = await res.text();
  expect(body).toContain('/features.html');
  expect(body).toContain('301');
});
```

- [ ] **Step 4: Write the accessibility test**

`tests/e2e/a11y.spec.ts`:

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { ALL_ROUTES } from '../../src/site';

for (const route of ALL_ROUTES) {
  test(`${route} has no WCAG A or AA violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}

test('the drawer traps focus and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 480, height: 900 });
  await page.goto('/');
  await page.click('.site-burger');
  await expect(page.locator('#site-drawer')).toBeVisible();
  await expect(page.locator('.site-burger')).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.locator('#site-drawer')).toBeHidden();
  await expect(page.locator('.site-burger')).toBeFocused();
});

test('the skip link is the first thing keyboard focus reaches', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('a.skip')).toBeFocused();
});

test('content stays visible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const hidden = await page.$$eval('.mv-reveal', (els) =>
    els.filter((e) => getComputedStyle(e).opacity === '0').length);
  expect(hidden).toBe(0);
});
```

- [ ] **Step 5: Write the responsive test**

`tests/e2e/responsive.spec.ts`:

```ts
import { test, expect } from '@playwright/test';
import { ALL_ROUTES } from '../../src/site';

const WIDTHS = [375, 480, 720, 960, 1440];

for (const width of WIDTHS) {
  for (const route of ALL_ROUTES) {
    test(`${route} does not scroll horizontally at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${overflow}px of horizontal overflow`).toBeLessThanOrEqual(1);
    });
  }
}

test('the burger replaces the nav links below 960px', async ({ page }) => {
  await page.setViewportSize({ width: 720, height: 900 });
  await page.goto('/');
  await expect(page.locator('.site-burger')).toBeVisible();
  await expect(page.locator('.site-nav-links')).toBeHidden();
});

test('the nav links replace the burger above 960px', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto('/');
  await expect(page.locator('.site-nav-links')).toBeVisible();
  await expect(page.locator('.site-burger')).toBeHidden();
});

test('the pricing matrix becomes cards below 720px', async ({ page }) => {
  await page.setViewportSize({ width: 480, height: 900 });
  await page.goto('/pricing');
  await expect(page.locator('.mv-matrix')).toBeHidden();
  await expect(page.locator('.mv-matrix-cards')).toBeVisible();
});
```

- [ ] **Step 6: Run everything**

Run: `npm run build && npm test && npm run parity && npm run test:e2e`
Expected: all green, parity reports every route present.

Fix what fails. An axe violation on a field/ink pairing means the pairing was used wrong, not that the token is broken — check it against `_ds/guidelines/marketing-fields.card.html` before touching anything in `_ds/`.

- [ ] **Step 7: Report the outstanding items**

Collect and report to the user:

1. Every `TODO` marker left in the source (`grep -rn "TODO" src/`). None may ship silently.
2. Every entry in `scripts/parity/ignore.json`, with its reason.
3. **The font prerequisite.** Until `_ds/tokens/fonts-selfhost.css` ships (MVBOLD-3), `Base.astro` links `fonts.css`, which pulls from `fonts.googleapis.com`. Confirm explicitly whether it has landed. If it has, swap the entry in the `TOKENS` array from `fonts` to `fonts-selfhost`, add a `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the Archivo display face, re-run the suite, and verify no request leaves the origin. If it has not, the site must not go to production.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "test(MVBOLD-2): add end-to-end route, accessibility and responsive coverage"
```

---

## Deferred, and why

- **`/customers`** — no testimonials, logos, customer names or metrics exist anywhere. Nothing to build it from without inventing, which the brief forbids.
- **SEO audit remediation** — the audit at `seo/audit/2026-05-17/` on the old repo's remote is separate work. This pass is a re-skin.
- **`fonts-selfhost.css`** — MVBOLD-3, shipping with the next design-system export.
