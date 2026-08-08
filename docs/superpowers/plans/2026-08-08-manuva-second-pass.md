# Manuva Second Pass — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lean the shipped site into the design system's own voice, add a `/product` tour, and bring the explainer video in — without touching the copy that ranks.

**Architecture:** Six tasks on the existing Astro site. One new component (`Video.astro`, three modes), one new route (`/product`), edits to the home page's hero and fold rhythm, one positional CSS rule for section division, and a verification pass that closes the gaps which let the lime-on-mint defect ship.

**Tech Stack:** Astro 5 static, Vitest + Astro Container API, Playwright + axe-core, cheerio. No new runtime dependencies.

## Global Constraints

- **`_ds/` is never edited.** Vendored design-system export, replaced wholesale on re-export.
- **No token is redeclared site-side.** No hardcoded colour, size, spacing, radius or duration value *that a token already names*. Site geometry no token names is legitimately raw, documented in place.
- **No third-party request on load, on any route, before user interaction.** This is why icons are inlined and fonts gate on self-hosting; the video work must not break it.
- **Copy is unchanged on `/pricing`, `/alternatives/katana`, `/alternatives/mrpeasy`, `/privacy`, `/terms`.** Those pages rank on their words. The parity gate still guards all eight original routes and must stay green.
- **`scripts/parity/ignore.json` holds exactly 9 authorised entries** across `/`, `/pricing`, `/features`. Do not add to it; if you believe an entry is warranted, stop and report.
- **Nothing invented.** Every factual claim traces to `llms.txt` or an existing old page. The one exception is `/product`'s own head values, which are authored and flagged for review.
- **The home page's `<title>`, `<meta name="description">` and all `og:`/`twitter:` values stay byte-identical to the old page.**
- `data-fold` marks fold-level colour; never on a `Tile`. No two adjacent folds share a hue; no two fields touch.
- Cell and boundary elements are `<div>`, `<td>` or `<th>` — never `<span>`. Never override `display` on anything cell-like.
- Astro drops whitespace-only text nodes between block siblings on separate lines — force a space with `{' '}`.
- Run the whole gate rather than a single route from Git Bash (it mangles a leading-slash argument); check the exit code on the `node` process, not through a pipe.
- **176 unit tests and 96 e2e tests currently pass.** Do not break them.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/components/site/Video.astro` | One component, three modes: self-hosted, YouTube facade, still-only |
| `scripts/extract-poster.mjs` | Pulls a frame from a local MP4 via Playwright; no ffmpeg needed |
| `src/pages/product.astro` | The product tour — screenshots and five domain cards |
| `src/content/domains.ts` | The five domain cards' data, each field traced to its source |
| `src/pages/index.astro` | Hero punchline, explainer band, fold rhythm |
| `src/components/site/Marquee.astro` | Gains `data-fold` so the adjacency check can see it |
| `src/site.ts` | `/product` in `ALL_ROUTES`, `NAV_LINKS`, `FOOTER_GROUPS` |
| `src/styles/site.css` | Section alternation rule; hero, video band and product styles |
| `public/video/` | The explainer MP4 and extracted posters |
| `public/sitemap.xml` | Ninth `<url>` entry |

---

### Task 1: `Video.astro` and the poster extractor

**Files:**
- Create: `src/components/site/Video.astro`, `scripts/extract-poster.mjs`
- Test: `tests/unit/video.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `Video.astro` with props
  `{ poster: string; alt: string; src?: string; youtubeId?: string; title?: string; class?: string }`.
  Three modes, selected by which of `src` / `youtubeId` is present. Used by `index.astro` (Task 3) and `product.astro` (Task 5).

- [ ] **Step 1: Write the failing test**

`tests/unit/video.test.ts`:

```ts
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import Video from '../../src/components/site/Video.astro';

const render = (props: Record<string, unknown>) =>
  AstroContainer.create().then((c) => c.renderToString(Video, { props }));

const BASE = { poster: '/video/explainer-poster.jpg', alt: 'Manuva explainer' };

test('self-hosted mode never preloads the file', async () => {
  const html = await render({ ...BASE, src: '/video/explainer.mp4' });
  expect(html).toContain('preload="none"');
  expect(html).toContain('/video/explainer.mp4');
  expect(html).toContain('poster="/video/explainer-poster.jpg"');
});

test('facade mode contacts YouTube nowhere in the markup', async () => {
  const html = await render({ ...BASE, youtubeId: 'abc123XYZ_-' });
  // The id must be present as data for the click handler, but no request-bearing
  // attribute may reference youtube: no iframe src, no img src, no link href.
  expect(html).not.toMatch(/<iframe/);
  expect(html).not.toMatch(/(src|href)="[^"]*youtu/);
  expect(html).toContain('data-youtube-id="abc123XYZ_-"');
});

test('facade mode uses the self-hosted poster, not a YouTube thumbnail', async () => {
  const html = await render({ ...BASE, youtubeId: 'abc123XYZ_-' });
  expect(html).toContain('/video/explainer-poster.jpg');
  expect(html).not.toContain('ytimg');
});

test('still mode renders the poster with no play affordance', async () => {
  const html = await render(BASE);
  expect(html).toContain('/video/explainer-poster.jpg');
  expect(html).not.toMatch(/<video/);
  expect(html).not.toMatch(/data-youtube-id/);
  expect(html).not.toMatch(/aria-label="Play/);
});

test('the play control is a real button with an accessible name', async () => {
  const html = await render({ ...BASE, src: '/video/explainer.mp4', title: 'What is Manuva' });
  expect(html).toMatch(/<button[^>]*aria-label="Play[^"]*What is Manuva/);
});

test('the poster carries the caller alt text in every mode', async () => {
  for (const extra of [{}, { src: '/v.mp4' }, { youtubeId: 'abc' }]) {
    const html = await render({ ...BASE, ...extra });
    expect(html, JSON.stringify(extra)).toContain('alt="Manuva explainer"');
  }
});

test('supplying both src and youtubeId fails loudly rather than picking one', async () => {
  await expect(render({ ...BASE, src: '/v.mp4', youtubeId: 'abc' }))
    .rejects.toThrow(/both/i);
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run tests/unit/video.test.ts`
Expected: FAIL — `src/components/site/Video.astro` does not exist.

- [ ] **Step 3: Write `src/components/site/Video.astro`**

```astro
---
export interface Props {
  /** Self-hosted still, always used. Never a third-party thumbnail URL. */
  poster: string;
  alt: string;
  /** Self-hosted mode. Mutually exclusive with youtubeId. */
  src?: string;
  /** Facade mode. Mutually exclusive with src. */
  youtubeId?: string;
  title?: string;
  class?: string;
}
const { poster, alt, src, youtubeId, title, class: className } = Astro.props;

if (src && youtubeId) {
  throw new Error(
    'Video: both `src` and `youtubeId` were supplied. Pick one — self-hosted or facade.',
  );
}

const label = title ? `Play video: ${title}` : 'Play video';
const mode = src ? 'self' : youtubeId ? 'facade' : 'still';
---
<figure class:list={['site-video', className]} data-mode={mode}>
  {mode === 'self' && (
    <>
      <video class="site-video-el" preload="none" poster={poster} controls playsinline>
        <source src={src} type="video/mp4" />
      </video>
      <button type="button" class="site-video-play" aria-label={label}>
        <span aria-hidden="true">▶</span>
      </button>
      <img class="site-video-poster" src={poster} alt={alt} loading="lazy" decoding="async" />
    </>
  )}

  {mode === 'facade' && (
    <>
      <img class="site-video-poster" src={poster} alt={alt} loading="lazy" decoding="async" />
      <button type="button" class="site-video-play" aria-label={label}
              data-youtube-id={youtubeId} data-youtube-title={title ?? ''}>
        <span aria-hidden="true">▶</span>
      </button>
    </>
  )}

  {mode === 'still' && (
    <img class="site-video-poster" src={poster} alt={alt} loading="lazy" decoding="async" />
  )}

  {title && <figcaption class="site-video-caption">{title}</figcaption>}
</figure>
```

- [ ] **Step 4: Add the client script**

Append inside `Video.astro`, after the `</figure>`:

```astro
<script>
  document.querySelectorAll('.site-video').forEach((fig) => {
    const btn = fig.querySelector<HTMLButtonElement>('.site-video-play');
    if (!btn) return;

    const ytId = btn.dataset.youtubeId;

    btn.addEventListener('click', () => {
      if (ytId) {
        // First contact with YouTube happens here, on an explicit click — never on load.
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0`;
        iframe.title = btn.dataset.youtubeTitle || 'Video';
        iframe.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
        iframe.setAttribute('allowfullscreen', '');
        iframe.className = 'site-video-el';
        fig.querySelector('.site-video-poster')?.remove();
        btn.remove();
        fig.prepend(iframe);
        iframe.focus();
        return;
      }

      const video = fig.querySelector<HTMLVideoElement>('video');
      if (!video) return;
      fig.querySelector('.site-video-poster')?.remove();
      btn.remove();
      video.play();
      video.focus();
    });
  });
</script>
```

`youtube-nocookie.com` rather than `youtube.com` — same player, no tracking cookie set on play.

- [ ] **Step 5: Run the tests**

Run: `npx vitest run tests/unit/video.test.ts`
Expected: PASS, 7 tests.

- [ ] **Step 6: Write the poster extractor**

ffmpeg is not installed and adding it is a new system dependency. Playwright already is. `scripts/extract-poster.mjs`:

```js
import { chromium } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const [, , input, output, atSeconds = '2'] = process.argv;
if (!input || !output) {
  console.error('usage: node scripts/extract-poster.mjs <input.mp4> <output.jpg> [seconds]');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.setContent(
  `<style>html,body{margin:0;background:#000}video{display:block;width:100vw}</style>
   <video id="v" src="${pathToFileURL(resolve(input)).href}" muted></video>`,
);
await page.waitForFunction(() => {
  const v = document.querySelector('video');
  return v && v.readyState >= 2;
}, null, { timeout: 60_000 });
await page.evaluate((t) => {
  const v = document.querySelector('video');
  return new Promise((res) => { v.onseeked = res; v.currentTime = t; });
}, Number(atSeconds));
await page.locator('#v').screenshot({ path: output, type: 'jpeg', quality: 82 });
await browser.close();
console.log(`wrote ${output} from ${input} at ${atSeconds}s`);
```

Add to `package.json` scripts: `"poster": "node scripts/extract-poster.mjs"`.

- [ ] **Step 7: Verify the extractor on the real file**

The explainer is a Dropbox online-only placeholder; reading it materialises it.

```bash
mkdir -p public/video
cp "$USERPROFILE/Pac Technologies Dropbox/Pac/Manuva/Advertising/youtube/Manuva 01 Explainer.mp4" public/video/explainer.mp4
npm run poster -- public/video/explainer.mp4 public/video/explainer-poster.jpg 3
```

Expected: `public/video/explainer.mp4` is ~8.7MB and `explainer-poster.jpg` exists and is a real frame. **Open the poster and look at it** — a black or blank frame means the seek landed on a fade; try a different timestamp. Report which timestamp you used.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-5): add Video component with self-hosted, facade and still modes"
```

---

### Task 2: Home hero — punchline, lede, and fold rhythm

**Files:**
- Modify: `src/pages/index.astro`, `src/components/site/Marquee.astro`, `src/styles/site.css`
- Test: `tests/unit/home.test.ts`

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: `Marquee.astro` now emits `data-fold="lime"`, making it visible to every hue-adjacency check.

- [ ] **Step 1: Write the failing tests**

Append to `tests/unit/home.test.ts`:

```ts
test('the hero leads with the design system punchline', () => {
  const h = html();
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  expect(h1).toContain('Make it.');
  expect(h1).toContain('Track it.');
  expect(h1).toContain('Ship it.');
});

test('the keyword line survives as the lede, not the h1', () => {
  const h = html();
  expect(h).toContain('Manufacturing operations,');
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  expect(h1).not.toContain('Manufacturing operations');
});

test('title and description are still byte-identical to the old page', () => {
  const h = html();
  expect(h).toContain('<title>Manuva — Manufacturing operations, finally simple</title>');
  expect(h).toContain(
    'Inventory, BOMs, work orders, and stock control — connected, live, and built for the floor. The simpler alternative to legacy MRP for Shopify manufacturers.',
  );
});

test('lime highlights the middle clause as a background, never as text colour', () => {
  const h = html();
  const h1 = (h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  expect(h1).toContain('var(--field-lime)');
  expect(h1).not.toMatch(/color:\s*var\(--field-lime\)/);
});

test('the marquee declares its fold so adjacency checks can see it', () => {
  expect(html()).toMatch(/data-fold="lime"/);
});

test('no two adjacent folds share a hue, marquee included', () => {
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  expect(folds.length).toBeGreaterThan(4);
  for (let i = 1; i < folds.length; i++) {
    expect(folds[i], `${folds[i]} repeats at fold ${i}`).not.toBe(folds[i - 1]);
  }
});

test('lime never touches mint again', () => {
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  for (let i = 1; i < folds.length; i++) {
    const pair = [folds[i - 1], folds[i]].sort().join('+');
    expect(pair, `greens touching at fold ${i}`).not.toBe('lime+mint');
  }
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npm run build && npx vitest run tests/unit/home.test.ts`
Expected: FAIL on the punchline, the marquee's `data-fold`, and the adjacency check.

- [ ] **Step 3: Make `Marquee` declare its fold**

`src/components/site/Marquee.astro` — change the root element only:

```astro
<div class="mv-field-lime site-marquee" data-fold="lime">
```

This is why the lime-on-mint defect shipped: the marquee carried its colour by class, so every hue-adjacency test was blind to it.

- [ ] **Step 4: Rewrite the hero heading block**

`src/pages/index.astro`, replacing the `<h1>` and lede at lines 229-233:

```astro
        <h1 class="mv-display site-hero-title">
          Make it.{' '}
          <span class="site-hero-mark">Track it.</span>{' '}
          Ship it.
        </h1>
        <p class="site-hero-lede">Manufacturing operations, finally simple.</p>
        <p class="site-hero-sub">
          Manuva replaces the spreadsheets and legacy MRP your team is fighting with. Inventory, BOMs, work
          orders, and stock control — connected, live, and built for the floor.
        </p>
```

- [ ] **Step 5: Style the highlight and lede**

Append to `src/styles/site.css`:

```css
/* Lime as a background behind the clause, never as an ink. box-decoration-break
   keeps the highlight intact when the headline wraps. */
.site-hero-mark {
  background: var(--field-lime);
  color: var(--on-lime);
  padding: 0 .12em .06em;
  border-radius: 12px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

/* The keyword line, demoted from h1 to lede but kept high on the page. */
.site-hero-lede {
  font-family: var(--font-display);
  font-size: var(--fs-display-2);
  line-height: var(--lh-display);
  letter-spacing: var(--ls-mega);
  margin: var(--space-4) 0 0;
  color: inherit;
  opacity: .82;
}
```

`opacity` is safe here: the hero is cobalt, whose full-strength white is 4.97:1, but the lede is display-sized so the 3:1 large-text threshold applies.

- [ ] **Step 6: Move the marquee and recolour the beta strip**

In `src/pages/index.astro`, move `<Marquee words={MARQUEE} />` to sit immediately after the hero `</section>`, before the explainer band's position (Task 3 fills that slot).

Change the beta strip's field from `mint` to `aqua`:

```astro
  <Field field="aqua" class="site-beta">
```

Aqua, not violet: the split panels directly above are amber and violet, so violet would repeat the hue of the panel above it.

- [ ] **Step 7: Run the tests**

Run: `npm run build && npx vitest run tests/unit/home.test.ts`
Expected: PASS.

- [ ] **Step 8: Confirm parity is unaffected**

Run: `npm run build && node scripts/parity/check.js --require-all`
Expected: exit 0, all 8 routes. The keyword line is still on the page, so the phrase tier is satisfied.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-5): hero takes the design system punchline; marquee declares its fold"
```

---

### Task 3: The explainer band

**Files:**
- Modify: `src/pages/index.astro`, `src/styles/site.css`
- Test: `tests/unit/home.test.ts`

**Interfaces:**
- Consumes: `Video.astro` from Task 1.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Write the failing tests**

Append to `tests/unit/home.test.ts`:

```ts
test('the explainer band sits on ink directly after the hero', () => {
  const folds = [...html().matchAll(/data-fold="([a-z]+)"/g)].map((m) => m[1]);
  expect(folds.slice(0, 3)).toEqual(['cobalt', 'lime', 'ink']);
});

test('the explainer is self-hosted and preloads nothing', () => {
  const h = html();
  expect(h).toContain('/video/explainer.mp4');
  expect(h).toContain('preload="none"');
});

test('the dashboard screenshot has left the home page for /product', () => {
  expect(html()).not.toContain('screen-dashboard.png');
});

test('the other two product shots stay where they are', () => {
  const h = html();
  expect(h).toContain('screen-variant.png');
  expect(h).toContain('screen-components.png');
});
```

- [ ] **Step 2: Run to verify they fail**

Run: `npm run build && npx vitest run tests/unit/home.test.ts`
Expected: FAIL — no ink band, dashboard still present.

- [ ] **Step 3: Replace the dashboard section with the explainer band**

In `src/pages/index.astro`, replace the whole `<section class="mv-section site-shot">` block with:

```astro
  {/* The explainer takes the slot the dashboard screenshot held. A static shot of
      a UI the reader has no context for is weak work in the page's second beat;
      a 32-second "what is Manuva" is the strongest asset available. The screenshot
      moves to /product, where someone has chosen to look at the product. */}
  <Field field="ink" class="site-explainer">
    <div class="site-explainer-inner">
      <span class="mv-eyebrow">See it in 30 seconds</span>
      <h2 class="mv-display site-explainer-title">What Manuva actually does.</h2>
      <Video
        src="/video/explainer.mp4"
        poster="/video/explainer-poster.jpg"
        alt="Manuva's dashboard, inventory list and production board in sequence"
        title="What is Manuva"
        class="site-explainer-video"
      />
    </div>
  </Field>
```

Import `Video` at the top of the file alongside the other site components.

The eyebrow and heading are authored, not moved — the old page had no video section. They are the only authored copy on this page and must be reviewed.

- [ ] **Step 4: Style the band**

Append to `src/styles/site.css`:

```css
.site-explainer-inner { display: grid; justify-items: center; text-align: center; gap: var(--space-5); }
.site-explainer-title { font-size: var(--fs-display-3); margin: 0; max-width: 18ch; }
.site-explainer-video { width: 100%; max-width: 900px; margin-top: var(--space-6); }

.site-video { position: relative; margin: 0; border-radius: var(--radius-tile); overflow: hidden; }
.site-video-el, .site-video-poster { display: block; width: 100%; height: auto; }
.site-video-poster { position: absolute; inset: 0; height: 100%; object-fit: cover; }
.site-video-play {
  position: absolute; inset: 0; margin: auto;
  width: 72px; height: 72px; border-radius: var(--radius-pill);
  display: grid; place-items: center;
  background: var(--field-lime); color: var(--on-lime);
  border: 0; cursor: pointer; font-size: var(--fs-lg);
  transition: transform var(--dur-fast) var(--ease-out);
}
.site-video-play:hover { transform: scale(1.06); }
.site-video-play:focus-visible { outline: none; box-shadow: var(--shadow-focus); }
.site-video-caption { margin-top: var(--space-3); font-size: var(--fs-sm); color: inherit; opacity: .72; }
@media (prefers-reduced-motion: reduce) { .site-video-play { transition: none; } }
```

- [ ] **Step 5: Run the tests**

Run: `npm run build && npx vitest run tests/unit/home.test.ts`
Expected: PASS.

- [ ] **Step 6: Verify zero video bytes on load, by measurement**

Start `npm run preview`, then in a browser DevTools Network panel load `/` and confirm `explainer.mp4` does **not** appear until the play button is clicked. Report what you observed. A `preload="none"` that still fetches means something else on the page is touching the element.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-5): explainer video takes the home page's second beat"
```

---

### Task 4: Section division across the marketing routes

**Files:**
- Modify: `src/styles/site.css`
- Test: `tests/e2e/responsive.spec.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing.

**Must run after Task 3.** `.site-shot` sets `background: var(--tint-cobalt)` at
specificity (0,1,0); this task's `main > section:not([data-fold])` is (0,1,1) and
would override it, silently flattening the product-shot section's tint to paper.
Task 3 removes that section entirely, so running in order avoids the collision.
It is the only section-level background set by a class — every other
`background:` in `site.css` is on an inner element the rule cannot reach.

- [ ] **Step 1: Write the failing test**

Append to `tests/e2e/responsive.spec.ts`:

**Scope: marketing routes only.** `/privacy` and `/terms` put everything inside
`<article class="site-doc">`, so `main > section` matches nothing on them and this
test would fail with zero elements. They are documents — they navigate by clause
number, heading and the table of contents — and the design-system author has ruled
they keep their current treatment. Do not widen the rule to reach them.

```ts
import { ALL_ROUTES } from '../../src/site';

const MARKETING_ROUTES = ALL_ROUTES.filter((r) => r !== '/privacy' && r !== '/terms');

for (const route of MARKETING_ROUTES) {
  test(`${route} — no two consecutive sections share a background`, async ({ page }) => {
    await page.goto(route);
    const bgs = await page.$$eval('main > section', (els) =>
      els.map((e) => getComputedStyle(e).backgroundColor));
    expect(bgs.length).toBeGreaterThan(1);
    for (let i = 1; i < bgs.length; i++) {
      expect(bgs[i], `sections ${i - 1} and ${i} share ${bgs[i]}`).not.toBe(bgs[i - 1]);
    }
  });
}
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run build && npx playwright test responsive.spec.ts -g "consecutive sections"`
Expected: FAIL on `/`, `/features`, `/pricing`, both `/alternatives/` — long runs of identical `rgba(0, 0, 0, 0)`.

- [ ] **Step 3: Add the alternation rule**

Append to `src/styles/site.css`:

```css
/* --- section division ------------------------------------------------
   Paper sections alternate paper / card so a boundary is always visible.
   Four consecutive sections on the home page previously ran 3,380px with
   no division at all, and /pricing plus both /alternatives/ pages ran five.

   `of :not([data-fold])` counts only paper sections, so field bands neither
   break the alternation nor consume a position. CSS cannot restart a
   positional count mid-list, so the alternation is global per page rather
   than resetting at each band — deterministic, and every boundary still
   shows. Needs Chrome 111 / Firefox 113 / Safari 9 for the `of S` syntax. */
main > section:not([data-fold]) { background: var(--field-paper); }
main > section:nth-child(even of :not([data-fold])) { background: var(--bg-card); }
main > section:not([data-fold]) + section:not([data-fold]) { border-top: 1px solid var(--stroke); }
```

- [ ] **Step 4: Run the test**

Run: `npm run build && npx playwright test responsive.spec.ts -g "consecutive sections"`
Expected: PASS on all 8 routes.

- [ ] **Step 5: Look at it**

Load `/` and `/pricing` in a browser and confirm the division reads as deliberate rather than as banding. If the contrast between `#FAFAF9` and `#FFFFFF` is too subtle to serve the purpose, say so in your report rather than inventing a third value — that is a design call, not yours.

- [ ] **Step 6: Run the full suite and gate**

Run: `npx vitest run && npm run build && node scripts/parity/check.js --require-all && npx playwright test`
Expected: all green.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-5): divide consecutive paper sections site-wide"
```

---

### Task 5: `/product`

**Files:**
- Create: `src/pages/product.astro`, `src/content/domains.ts`
- Modify: `src/site.ts`, `public/sitemap.xml`, `src/styles/site.css`
- Test: `tests/unit/product.test.ts`

**Interfaces:**
- Consumes: `Video.astro` (Task 1).
- Produces: `/product` in `ALL_ROUTES`, `NAV_LINKS`, `FOOTER_GROUPS`.

- [ ] **Step 1: Read the source copy for the domain descriptions**

```bash
git -C C:/dev/ManuvaMarketing show origin/master:llms.txt
git -C C:/dev/ManuvaMarketing show origin/master:features.html
```

Inventory, Products & BOMs, Production and Purchasing come from `llms.txt`'s capability list. Logistics and Audit come from `features.html`. **Every description must be traceable — quote or condense from source, never compose.** The six invented blurbs in `_ds/ui_kits/marketing/Landing.jsx` are exactly what must not return; do not read them for inspiration.

- [ ] **Step 2: Write the domain data**

**There are five cards, not six.** "Logistics" appears **zero times** in `llms.txt`, `features.html` and `index.html` — no logistics, despatch, dispatch, shipping or carrier anywhere. It exists only in the design system's invented `DOMAINS` array and in a video filename. Writing a blurb for it would be inventing, which is the exact failure that produced the six blurbs stripped in the first pass. The design-system author has confirmed: drop it. If Logistics is a real module it gets a card when copy describing it exists somewhere citable.

Every blurb below is lifted from source. `src/content/domains.ts`:

```ts
import type { FieldName } from '../site';

export interface Domain {
  slug: string;
  name: string;
  field: FieldName;
  icon: string;
  /** Lifted from llms.txt or the old features.html — never composed. */
  blurb: string;
  source: 'llms.txt' | 'features.html';
  /** Set when the category video is uploaded. Until then the card shows a still. */
  youtubeId?: string;
  poster: string;
  posterAlt: string;
}

export const DOMAINS: Domain[] = [
  {
    slug: 'inventory',
    name: 'Inventory & stock control',
    field: 'cobalt',
    icon: 'package',
    blurb:
      'Real-time component and finished-goods tracking, movements ledger, stocktake, bin/aisle locations, multi-warehouse.',
    source: 'llms.txt',
    poster: '/video/poster-inventory.jpg',
    posterAlt: 'Manuva inventory list showing stock on hand across warehouses',
  },
  {
    slug: 'boms',
    name: 'Bills of Materials',
    field: 'violet',
    icon: 'layers',
    blurb:
      'Multi-level assemblies, yield % per line, versioning with draft/publish/rollback, side-by-side version comparison, BOM templates.',
    source: 'llms.txt',
    poster: '/video/poster-boms.jpg',
    posterAlt: 'Manuva variant detail showing a versioned bill of materials',
  },
  {
    slug: 'production',
    name: 'Production orders',
    field: 'flare',
    icon: 'factory',
    blurb:
      'Issue work orders, allocate components, track runs from start to finish, shop floor view.',
    source: 'llms.txt',
    poster: '/video/poster-production.jpg',
    posterAlt: 'Manuva production board showing work orders in progress',
  },
  {
    slug: 'purchasing',
    name: 'Purchasing & suppliers',
    field: 'amber',
    icon: 'shopping-cart',
    blurb:
      'Purchase orders, goods inwards, supplier management, lead-time tracking, PO variance reporting.',
    source: 'llms.txt',
    poster: '/video/poster-purchasing.jpg',
    posterAlt: 'Manuva purchase order list with supplier lead times',
  },
  {
    slug: 'audit',
    name: 'Audit',
    field: 'aqua',
    icon: 'history',
    blurb:
      'Audit trail across every change in the system — for compliance and for sanity.',
    source: 'features.html',
    poster: '/video/poster-audit.jpg',
    posterAlt: 'Manuva activity log showing a chronological record of changes',
  },
];
```

Field rotation across the five: cobalt, violet, flare, amber, aqua — no two adjacent repeat, and none is mint or lime, so the grid cannot reintroduce the green clash this pass exists to fix.

Posters for these five: extract a representative frame from each source video where one exists, otherwise crop from the existing product screenshots. Record in your report which each card used.

- [ ] **Step 3: Write the failing test**

`tests/unit/product.test.ts`:

```ts
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { expect, test } from 'vitest';
import { DOMAINS } from '../../src/content/domains';

const html = () => readFileSync('dist/product.html', 'utf8');
const oldSrc = (p: string) =>
  execFileSync('git', ['-C', 'C:/dev/ManuvaMarketing', 'show', `origin/master:${p}`],
    { encoding: 'utf8', maxBuffer: 32e6 });

test('all five domains render', () => {
  expect(DOMAINS).toHaveLength(5);
  const h = html();
  for (const d of DOMAINS) expect(h, `${d.name} missing`).toContain(d.name);
});

test('Logistics does not appear — it has no source', () => {
  // Zero occurrences in llms.txt, features.html and index.html. Present only in
  // the design system's invented DOMAINS array. Author's ruling: drop it.
  expect(html()).not.toMatch(/logistics/i);
  expect(DOMAINS.map((d) => d.slug)).not.toContain('logistics');
});

test('every domain blurb traces to its declared source', () => {
  const sources = {
    'llms.txt': oldSrc('llms.txt').toLowerCase(),
    'features.html': oldSrc('features.html').toLowerCase().replace(/<[^>]*>/g, ' '),
  };
  for (const d of DOMAINS) {
    // Every content word of length > 5 must appear somewhere in the declared source.
    const words = d.blurb.toLowerCase().match(/[a-z]{6,}/g) || [];
    const missing = words.filter((w) => !sources[d.source].includes(w));
    expect(missing, `${d.name}: ${missing.join(', ')} not in ${d.source}`).toEqual([]);
  }
});

test('none of the design system\'s invented blurbs return', () => {
  const h = html();
  for (const invented of [
    'counted once, true everywhere',
    'you can actually reuse',
    'on one board',
    'that mean something',
    'from a single screen',
    'kept forever',
  ]) {
    expect(h, `invented: ${invented}`).not.toContain(invented);
  }
});

test('all three product screenshots appear', () => {
  const h = html();
  for (const s of ['screen-dashboard.png', 'screen-variant.png', 'screen-components.png']) {
    expect(h, s).toContain(s);
  }
});

test('a domain without a video renders a still and no play control', () => {
  const withoutVideo = DOMAINS.filter((d) => !d.youtubeId);
  expect(withoutVideo.length).toBeGreaterThan(0);
  const h = html();
  const stills = (h.match(/data-mode="still"/g) || []).length;
  expect(stills).toBe(withoutVideo.length);
});

test('no page markup references youtube before a click', () => {
  expect(html()).not.toMatch(/(src|href)="[^"]*youtu/);
});

test('the head values are present and authored deliberately', () => {
  const h = html();
  expect(h).toMatch(/<title>[^<]+<\/title>/);
  expect(h).toContain('rel="canonical" href="https://manuva.app/product"');
  expect(h).toContain('twitter:description');
});
```

- [ ] **Step 4: Run to verify it fails**

Run: `npx vitest run tests/unit/product.test.ts`
Expected: FAIL — `dist/product.html` does not exist.

- [ ] **Step 5: Register the route**

`src/site.ts` — add `/product` to `ALL_ROUTES`, first in `NAV_LINKS`, and under the Product footer group above Features:

```ts
export const NAV_LINKS = [
  { href: '/product', label: 'Product' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/alternatives/katana', label: 'Compare' },
  { href: '/about', label: 'About' },
] as const;
```

`public/sitemap.xml` — add a ninth entry, keeping the file's existing shape:

```xml
  <url>
    <loc>https://manuva.app/product</loc>
    <lastmod>2026-08-08</lastmod>
  </url>
```

- [ ] **Step 6: Write the page**

`src/pages/product.astro`. The `{/* … */}` markers are yours to fill; everything else is fixed.

```astro
---
import Base from '../layouts/Base.astro';
import Field from '../components/site/Field.astro';
import Video from '../components/site/Video.astro';
import Icon from '../components/ds/Icon.astro';
import CtaBand from '../components/site/CtaBand.astro';
import { DOMAINS } from '../content/domains';

const SHOTS = [
  { src: '/screen-dashboard.png',  alt: 'Manuva dashboard overview with inventory value, fulfilment rate, and open orders', caption: '{/* one framing line */}' },
  { src: '/screen-variant.png',    alt: 'Manuva variant detail showing versioned bills of materials with cost comparison', caption: '{/* one framing line */}' },
  { src: '/screen-components.png', alt: 'Manuva component selection modal with searchable parts library', caption: '{/* one framing line */}' },
];

{/* THE ONLY AUTHORED HEAD VALUES ON THE SITE. Every other route's title,
    description and og:/twitter: values are byte-identical to the old page.
    This route has no old counterpart, so these are written rather than moved
    and must be read as copy during review, not checked against a source. */}
const TITLE = '{/* authored */}';
const DESCRIPTION = '{/* authored */}';
---
<Base
  title={TITLE}
  description={DESCRIPTION}
  twitterDescription={DESCRIPTION}
  canonical="https://manuva.app/product"
>
  <section class="mv-section site-product-hero">
    <div class="mv-wrap">
      <h1 class="mv-display">{/* authored heading */}</h1>
      <p class="site-product-lede">{/* authored lede */}</p>
    </div>
  </section>

  {/* The screenshots, at a size where the interface is legible. This is where
      the dashboard belongs — someone here has chosen to look at the product. */}
  <section class="mv-section site-product-shots">
    <div class="mv-wrap">
      {SHOTS.map((s) => (
        <figure class="site-product-shot">
          <img src={s.src} alt={s.alt} width="2080" height="1090" loading="lazy" decoding="async" />
          <figcaption>{s.caption}</figcaption>
        </figure>
      ))}
    </div>
  </section>

  {/* Five domain cards. Each blurb is lifted from the source named in its
      `source` field — nothing composed. A card shows its video when one is
      uploaded and its still until then. */}
  <section class="mv-section site-product-domains">
    <div class="mv-wrap">
      <h2 class="mv-display">{/* authored heading */}</h2>
      <div class="mv-cols-3">
        {DOMAINS.map((d) => (
          <article class="site-domain-card" style={`background:var(--field-${d.field});color:var(--on-${d.field})`}>
            <Icon name={d.icon} size={30} />
            <h3 class="site-domain-name">{d.name}</h3>
            <p class="site-domain-blurb">{d.blurb}</p>
            <Video poster={d.poster} alt={d.posterAlt} youtubeId={d.youtubeId} title={d.name} />
          </article>
        ))}
      </div>
    </div>
  </section>

  <CtaBand field="flare" heading="{/* quote a real sentence from this page */}"
           body="14 days free with full Pro access. No credit card required." />
</Base>
```

Note the cards set `color` from the field's own ink and never set an absolute ink, and `.site-domain-blurb` must not opacity-mute — full-strength white clears AA by a hair on violet and cobalt, so any muting fails. This is the Task 9 defect from the first pass.

`CtaBand`'s heading must quote a sentence that exists on this page, exactly — the project-wide rule. Since this page's copy is authored, quote one of your own authored lines rather than composing a second.

- [ ] **Step 7: Run the tests**

Run: `npm run build && npx vitest run tests/unit/product.test.ts`
Expected: PASS, 7 tests.

- [ ] **Step 8: Run the gate**

Run: `node scripts/parity/check.js --require-all`
Expected: exit 0. `/product` has no old counterpart, so it is not in the route table and is not checked — that is correct. Confirm the other 8 are unchanged.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(MVBOLD-5): add the /product tour with sourced domain cards"
```

---

### Task 6: Verification pass

**Files:**
- Modify: `tests/e2e/routes.spec.ts`, `tests/e2e/a11y.spec.ts`, `tests/unit/seo.test.ts`
- Test: the files above

**Interfaces:**
- Consumes: everything.
- Produces: nothing.

- [ ] **Step 1: Extend the e2e suites to cover `/product`**

`ALL_ROUTES` now has nine entries, so the route, anchor, axe, overflow and column-integrity suites pick it up automatically. Confirm they do rather than assuming — run the suite and check the count rose.

- [ ] **Step 2: Add the no-third-party-on-load assertion**

`tests/e2e/routes.spec.ts`:

```ts
test.describe('no third-party contact before interaction', () => {
  for (const route of ALL_ROUTES) {
    test(`${route} makes no cross-origin request on load`, async ({ page }) => {
      const external: string[] = [];
      page.on('request', (r) => {
        const url = new URL(r.url());
        if (!['localhost', '127.0.0.1'].includes(url.hostname)) external.push(r.url());
      });
      await page.goto(route, { waitUntil: 'networkidle' });
      // fonts.googleapis.com is the known, accepted gap until fonts-selfhost.css
      // lands (MVBOLD-3). Everything else is a regression.
      const unexpected = external.filter((u) => !/fonts\.(googleapis|gstatic)\.com/.test(u));
      expect(unexpected, `unexpected third-party requests: ${unexpected.join(', ')}`).toEqual([]);
    });
  }
});

test('the home page transfers no video bytes until play', async ({ page }) => {
  const videoReqs: string[] = [];
  page.on('request', (r) => { if (/\.mp4/.test(r.url())) videoReqs.push(r.url()); });
  await page.goto('/', { waitUntil: 'networkidle' });
  expect(videoReqs, 'video fetched on load').toEqual([]);
  await page.locator('.site-video-play').first().click();
  await expect.poll(() => videoReqs.length).toBeGreaterThan(0);
});
```

- [ ] **Step 3: Add the sitemap/canonical assertion for the ninth route**

`tests/unit/seo.test.ts` — the existing sitemap test asserts exactly 8 entries. Update it to 9 and confirm `/product`'s canonical matches its sitemap entry, the same way the other eight are checked.

- [ ] **Step 4: Run everything**

Run: `npx vitest run && npm run build && node scripts/parity/check.js --require-all && npx playwright test`
Expected: all green. Report the final counts.

**If the e2e suite fails at an identical ~30s timeout across several tests, check for a stale preview server on port 4321 before investigating the code** — `reuseExistingServer` will reuse it and serve stale output. This cost a full investigation cycle on the first pass.

- [ ] **Step 5: Report**

In your report list: the poster timestamp used, what the Network panel showed for the explainer on load and on click, whether the paper/card contrast reads as deliberate, and the exact authored copy on `/product` and in the explainer band — those are the only unsourced strings in this pass and the review needs to see them plainly.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "test(MVBOLD-5): cover /product, third-party isolation and deferred video loading"
```

---

## Deferred, and why

- **Category videos** — not uploaded. `Video.astro` takes an optional `youtubeId`; each domain card falls back to a still until one exists. Adding a video later is one field in `domains.ts`.
- **`Stories/` videos** — nine 10-second vertical social cuts. Wrong shape for the site; advertising assets.
- **`_ds/tokens/fonts-selfhost.css`** — MVBOLD-3, still gates production.
