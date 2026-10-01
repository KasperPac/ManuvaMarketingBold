# Dave Scroll-Scrub Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home page hero with a full-bleed, pinned claymation frame sequence that steps Dave's office from chaos to calm as the visitor scrolls, under the headline "Less chaos. More making."

**Architecture:** A one-off Node script cuts 48 WebP frames (landscape and portrait sets) from the transformation clip T1 and commits them under `public/hero/dave/`. The hero renders frame 0 as plain markup (the LCP image and the no-JS / reduced-motion rendering). `Motion.astro`'s existing scroll loop gains one step that pins the hero, maps damped scroll progress to a frame through pure functions in `src/lib/scrub.ts`, swaps one `<img>`'s `src` at stop-motion pace, and loads the remaining frames after `load`, coarse to fine.

**Tech Stack:** Astro 7 (static, `build.format: 'file'`), TypeScript, plain CSS in `src/styles/site.css`, sharp 0.35 (already in `node_modules` via Astro), ffmpeg (script only), Vitest 4, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-01-dave-scroll-hero-design.md`

## Global Constraints

- `_ds/` is vendored and never edited. No token is redeclared site-side.
- Copy moves verbatim. The eyebrow ("MRP for Shopify manufacturers"), the sub-copy and both CTAs ("Start free" → `APP_URL`, "Book a demo" → `/about#contact`) are unchanged. The H1 is exactly `Less chaos. <span class="hl keep">More making.</span>`.
- Lime is a background, never a text colour. The scrim is `--ink-strong` at alpha, never navy (`#15314D`, `--field-ink`, `--bg-ink`).
- The hero section keeps `mv-field-cobalt`.
- Frames: WebP quality 65, 48 per set, landscape 1280×720, portrait 500×1080, files `000.webp`…`047.webp`. Budgets: landscape ≤ 1600 KB, portrait ≤ 1300 KB.
- Frame swaps are hard cuts, at most 12 per second.
- Only frame 0 is requested before the window `load` event.
- Motion mode is `<html data-motion>`, never the media query directly. `data-motion="off"` and no-JS both render a flat, unpinned, one-screen hero showing frame 0.
- Copy layout: layout A at `(min-width: 1200px) and (min-aspect-ratio: 1/1)`, poster layout otherwise. Frame set: portrait at `(max-aspect-ratio: 4/5)`, landscape otherwise.
- Commits are prefixed `feat(MVBOLD-29):`, `test(MVBOLD-29):` or `chore(MVBOLD-29):` and end with the `Co-Authored-By` line.
- Run Playwright with `--workers=1` (see the comment in `playwright.config.ts`). Unit tests that read `dist/` need `npm run build` first.

## Review Focus

1. **The viewport crosses the 4/5 aspect boundary mid-session** (a phone rotated, a window resized). The visitor expects the frame to stay correctly cropped, not a landscape frame stretched into a portrait box. Test: Task 4, "a viewport that turns portrait swaps to the portrait set".
2. **A reload or back-navigation lands part-way down the hero.** The visitor expects the frame for that scroll position once frames arrive, not frame 0 for the rest of the visit. Test: Task 4, "a reload mid-scrub shows the frame for that position".
3. **A frame request fails** (offline, 404, aborted). The visitor expects the last good frame to stay up, never a broken-image icon. Test: Task 4, "a frame that fails to load never leaves a broken image".
4. **Save-Data or a slow connection.** The visitor expects the coarse pass only (7 frames), not the full ~1.5 MB. Test: Task 4, "Save-Data stops after the coarse pass".
5. **The motion toggle is flipped on the page.** The visitor expects the hero to follow the toggle (flat when off, pinned when on), as the stage below does. Test: Task 4, "the motion toggle flattens and restores the hero".

---

### Task 1: Scrub maths

**Files:**
- Create: `src/lib/scrub.ts`
- Test: `tests/unit/scrub.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (used by Task 4):
  - `MIN_SWAP_MS: number` (= 1000/12)
  - `END_HOLD: number` (= 0.1)
  - `frameAt(p: number, n: number, hold?: number): number`
  - `canSwap(now: number, lastSwap: number, minGap?: number): boolean`
  - `loadOrder(n: number, stride?: number): number[]`
  - `coarseCount(n: number, stride?: number): number`
  - `nearestLoaded(target: number, loaded: ReadonlySet<number>, n: number): number`

- [ ] **Step 1: Write the failing tests**

Create `tests/unit/scrub.test.ts`:

```ts
import { describe, expect, test } from 'vitest';
import {
  END_HOLD, MIN_SWAP_MS, canSwap, coarseCount, frameAt, loadOrder, nearestLoaded,
} from '../../src/lib/scrub';

describe('frameAt', () => {
  test('starts on the first frame and ends on the last', () => {
    expect(frameAt(0, 48)).toBe(0);
    expect(frameAt(1, 48)).toBe(47);
  });

  test('holds the last frame for the final stretch of the scroll', () => {
    expect(END_HOLD).toBe(0.1);
    expect(frameAt(0.9, 48)).toBe(47);
    expect(frameAt(0.95, 48)).toBe(47);
    expect(frameAt(0.89, 48)).toBeLessThan(47);
  });

  test('is centred on the middle of the travel', () => {
    // 0.45 / 0.9 = 0.5 of the way through 47 steps = 23.5, which rounds up.
    expect(frameAt(0.45, 48)).toBe(24);
  });

  test('clamps progress outside 0..1', () => {
    expect(frameAt(-0.2, 48)).toBe(0);
    expect(frameAt(1.5, 48)).toBe(47);
  });

  test('a single-frame sequence always shows that frame', () => {
    expect(frameAt(0.5, 1)).toBe(0);
    expect(frameAt(0.5, 0)).toBe(0);
  });

  test('never goes backwards and never skips a frame at fine resolution', () => {
    const seen: number[] = [];
    let prev = 0;
    for (let p = 0; p <= 1.0001; p += 0.001) {
      const f = frameAt(p, 48);
      expect(f).toBeGreaterThanOrEqual(prev);
      expect(f - prev).toBeLessThanOrEqual(1);
      prev = f;
      seen.push(f);
    }
    expect(new Set(seen).size).toBe(48);
  });
});

describe('canSwap', () => {
  test('allows at most twelve swaps a second', () => {
    expect(MIN_SWAP_MS).toBeCloseTo(83.33, 1);
    expect(canSwap(100, 0)).toBe(true);
    expect(canSwap(80, 0)).toBe(false);
    expect(canSwap(0, 0)).toBe(false);
  });

  test('the first swap is always allowed', () => {
    expect(canSwap(0, -Infinity)).toBe(true);
  });
});

describe('loadOrder', () => {
  test('fetches every eighth frame and the last one first', () => {
    expect(loadOrder(48).slice(0, 7)).toEqual([0, 8, 16, 24, 32, 40, 47]);
    expect(coarseCount(48)).toBe(7);
  });

  test('covers every frame exactly once', () => {
    const order = loadOrder(48);
    expect(order).toHaveLength(48);
    expect(new Set(order).size).toBe(48);
    expect([...order].sort((a, b) => a - b)).toEqual(Array.from({ length: 48 }, (_, i) => i));
  });

  test('does not count the last frame twice when it falls on the stride', () => {
    expect(coarseCount(49)).toBe(7);
    expect(loadOrder(49).slice(0, 7)).toEqual([0, 8, 16, 24, 32, 40, 48]);
  });

  test('handles tiny sequences', () => {
    expect(loadOrder(1)).toEqual([0]);
    expect(loadOrder(0)).toEqual([]);
    expect(coarseCount(0)).toBe(0);
  });
});

describe('nearestLoaded', () => {
  test('returns the target itself when it is loaded', () => {
    expect(nearestLoaded(5, new Set([0, 5, 8]), 48)).toBe(5);
  });

  test('returns the closest loaded frame', () => {
    expect(nearestLoaded(5, new Set([0, 8]), 48)).toBe(8);
    expect(nearestLoaded(2, new Set([0, 8]), 48)).toBe(0);
  });

  test('prefers the earlier frame on a tie', () => {
    expect(nearestLoaded(4, new Set([0, 8]), 48)).toBe(0);
  });

  test('returns -1 when nothing is loaded', () => {
    expect(nearestLoaded(3, new Set(), 48)).toBe(-1);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run tests/unit/scrub.test.ts`
Expected: FAIL — `Failed to resolve import "../../src/lib/scrub"`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/scrub.ts`:

```ts
// The Dave hero's scroll scrub, as pure maths (MVBOLD-29). Motion.astro owns
// the DOM; everything here is a function of numbers so it can be tested
// without a browser.

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Claymation runs at 12 frames a second. The scrub never swaps faster, so a
 * fast scroll reads as stop-motion rather than as a smeared video. */
export const MIN_SWAP_MS = 1000 / 12;

/** The share of the scroll, at the end, that holds the last frame before the
 * pin releases. Without it the calm room arrives on the very last pixel and
 * leaves on the next one. */
export const END_HOLD = 0.1;

/** The frame to show at scroll progress p (0..1) through n frames. */
export function frameAt(p: number, n: number, hold = END_HOLD): number {
  if (n <= 1) return 0;
  const q = clamp01(p / (1 - hold));
  return Math.round(q * (n - 1));
}

/** Whether enough time has passed since the last swap to show another frame. */
export function canSwap(now: number, lastSwap: number, minGap = MIN_SWAP_MS): boolean {
  return now - lastSwap >= minGap;
}

/** Frame indices in fetch order: every stride-th frame plus the last one (the
 * coarse pass, enough to scrub with), then everything else ascending. */
export function loadOrder(n: number, stride = 8): number[] {
  if (n <= 0) return [];
  const coarse = new Set<number>();
  for (let i = 0; i < n; i += stride) coarse.add(i);
  coarse.add(n - 1);
  const rest: number[] = [];
  for (let i = 0; i < n; i++) if (!coarse.has(i)) rest.push(i);
  return [...coarse].sort((a, b) => a - b).concat(rest);
}

/** How many entries at the front of loadOrder(n, stride) are the coarse pass. */
export function coarseCount(n: number, stride = 8): number {
  if (n <= 0) return 0;
  const onStride = Math.ceil(n / stride);
  return (n - 1) % stride === 0 ? onStride : onStride + 1;
}

/** The loaded frame closest to target, the earlier one on a tie. -1 if none. */
export function nearestLoaded(target: number, loaded: ReadonlySet<number>, n: number): number {
  if (loaded.has(target)) return target;
  for (let d = 1; d < n; d++) {
    if (target - d >= 0 && loaded.has(target - d)) return target - d;
    if (target + d < n && loaded.has(target + d)) return target + d;
  }
  return -1;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run tests/unit/scrub.test.ts`
Expected: PASS, 15 tests.

- [ ] **Step 5: Commit**

```bash
git add src/lib/scrub.ts tests/unit/scrub.test.ts
git commit -m "feat(MVBOLD-29): scrub maths for the Dave hero

Progress to frame with an end hold, a 12 fps swap cap, coarse-to-fine
load order and nearest-loaded fallback. Pure, so the DOM step in
Motion.astro stays thin.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Frame pipeline and the committed frames

**Files:**
- Create: `scripts/hero-frames-lib.mjs`
- Create: `scripts/hero-frames.mjs`
- Create: `scripts/hero-frames.json`
- Create: `public/hero/dave/l/000.webp` … `047.webp`, `public/hero/dave/p/000.webp` … `047.webp` (generated)
- Modify: `package.json` (add the `hero:frames` script)
- Test: `tests/unit/hero-frames.test.ts`

**Interfaces:**
- Consumes: the clip `../MarketingAndPromotion/video/manuva-stopmotion/flow-kit/downloads/T1.mp4` (1920×1080, 24 fps, 8.0 s; untracked, in the sibling repo). ffmpeg on `PATH`.
- Produces (used by Tasks 3 and 4):
  - `scripts/hero-frames.json` with keys `count` (48), `calm` (integer K), `landscape: { width: 1280, height: 720 }`, `portrait: { width: 500, height: 1080, focalX }`.
  - Frame URLs `/hero/dave/l/NNN.webp` and `/hero/dave/p/NNN.webp`, NNN zero-padded to 3.
  - `frameTimes(inS, outS, count, tail?)` and `portraitLeft(srcW, winW, focalX)` from `scripts/hero-frames-lib.mjs`.

- [ ] **Step 1: Write the failing tests**

Create `tests/unit/hero-frames.test.ts`:

```ts
import { readdirSync, readFileSync, statSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, test } from 'vitest';
import { frameTimes, portraitLeft } from '../../scripts/hero-frames-lib.mjs';

const M = JSON.parse(readFileSync('scripts/hero-frames.json', 'utf8'));
const pad = (i: number) => String(i).padStart(3, '0');

describe('frameTimes', () => {
  test('spaces frames evenly from in to just before out', () => {
    const t = frameTimes(0, 8, 48);
    expect(t).toHaveLength(48);
    expect(t[0]).toBe(0);
    expect(t[47]).toBeCloseTo(7.95, 4);
    for (let i = 1; i < t.length; i++) expect(t[i]).toBeGreaterThan(t[i - 1]);
  });

  test('rejects a sequence it cannot space', () => {
    expect(() => frameTimes(0, 8, 1)).toThrow();
    expect(() => frameTimes(5, 5, 48)).toThrow();
  });
});

describe('portraitLeft', () => {
  test('centres the window on the focal point', () => {
    expect(portraitLeft(1920, 500, 610)).toBe(360);
  });

  test('keeps the window inside the source', () => {
    expect(portraitLeft(1920, 500, 100)).toBe(0);
    expect(portraitLeft(1920, 500, 1900)).toBe(1420);
  });
});

describe('the committed frames', () => {
  test('the manifest is the shape Tasks 3 and 4 rely on', () => {
    expect(M.count).toBe(48);
    expect(Number.isInteger(M.calm)).toBe(true);
    expect(M.calm).toBeGreaterThan(0);
    expect(M.calm).toBeLessThan(M.count);
    expect(M.landscape).toEqual({ width: 1280, height: 720 });
    expect(M.portrait.width).toBe(500);
    expect(M.portrait.height).toBe(1080);
  });

  for (const set of ['l', 'p'] as const) {
    test(`the ${set} set is complete, the right size and within budget`, async () => {
      const dir = `public/hero/dave/${set}`;
      const files = readdirSync(dir).sort();
      expect(files).toEqual(Array.from({ length: M.count }, (_, i) => `${pad(i)}.webp`));

      const want = set === 'l' ? M.landscape : M.portrait;
      for (const f of [files[0], files[Math.floor(files.length / 2)], files[files.length - 1]]) {
        const meta = await sharp(`${dir}/${f}`).metadata();
        expect(meta.format).toBe('webp');
        expect([meta.width, meta.height]).toEqual([want.width, want.height]);
      }

      const kb = files.reduce((s, f) => s + statSync(`${dir}/${f}`).size, 0) / 1024;
      expect(kb, `${set} set is ${kb.toFixed(0)} KB`).toBeLessThanOrEqual(M.budgetKB[set]);
    });
  }
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run tests/unit/hero-frames.test.ts`
Expected: FAIL — `ENOENT: no such file or directory, open 'scripts/hero-frames.json'`.

- [ ] **Step 3: Write the pure helpers**

Create `scripts/hero-frames-lib.mjs`:

```js
// Pure helpers for scripts/hero-frames.mjs, split out so they can be unit
// tested without ffmpeg or a clip on disk.

/** Evenly spaced timestamps from inS to outS. The last one is pulled back by
 * `tail` seconds so it lands on a real frame instead of past the end of the
 * stream, which ffmpeg answers with no output at all. */
export function frameTimes(inS, outS, count, tail = 0.05) {
  if (!(count >= 2)) throw new Error(`count must be at least 2, got ${count}`);
  if (!(outS > inS)) throw new Error(`out (${outS}) must be after in (${inS})`);
  const end = outS - tail;
  return Array.from({ length: count }, (_, i) => +(inS + (i * (end - inS)) / (count - 1)).toFixed(4));
}

/** Left edge of a window winW wide centred on focalX, kept inside srcW. */
export function portraitLeft(srcW, winW, focalX) {
  return Math.round(Math.min(srcW - winW, Math.max(0, focalX - winW / 2)));
}
```

- [ ] **Step 4: Write the manifest**

Create `scripts/hero-frames.json`. `calm` starts at 38 (6.5 s of 8 s, where the walls finish turning lime on the contact sheet) and is confirmed by eye in Step 8:

```json
{
  "_about": "Inputs for scripts/hero-frames.mjs (MVBOLD-29). focalX is in the clip's 1920px-wide pixel space. calm is the first frame whose back walls are fully lime; it drives the headline highlight.",
  "clip": "../MarketingAndPromotion/video/manuva-stopmotion/flow-kit/downloads/T1.mp4",
  "in": 0,
  "out": 8,
  "count": 48,
  "calm": 38,
  "quality": 65,
  "landscape": { "width": 1280, "height": 720 },
  "portrait": { "width": 500, "height": 1080, "focalX": 610 },
  "budgetKB": { "l": 1600, "p": 1300 }
}
```

- [ ] **Step 5: Write the script**

Create `scripts/hero-frames.mjs`:

```js
// Cut the Dave hero's frames from the transformation clip (MVBOLD-29).
//
// Usage:  npm run hero:frames [-- path/to/T1.mp4]
//
// The clip is generated in Google Flow and lives untracked in the sibling
// MarketingAndPromotion repo, so Vercel never sees it. Run this by hand and
// commit public/hero/dave/. Needs ffmpeg on PATH.
//
// Two sets, because one crop cannot serve both shapes of screen:
//   l/  the full 16:9 frame at 1280x720, the clip's native generation size
//       (the 1080p download is an upscale, so going bigger adds bytes only)
//   p/  a 500x1080 window from the full-height 1080p frame, centred on Dave,
//       for portrait phones
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { frameTimes, portraitLeft } from './hero-frames-lib.mjs';

const M = JSON.parse(readFileSync('scripts/hero-frames.json', 'utf8'));
const clip = process.argv[2] ?? M.clip;
if (!existsSync(clip)) {
  console.error(`no clip at ${clip}`);
  process.exit(1);
}

const OUT = 'public/hero/dave';
const pad = (i) => String(i).padStart(3, '0');
const tmp = mkdtempSync(join(tmpdir(), 'hero-frames-'));
for (const set of ['l', 'p']) {
  rmSync(join(OUT, set), { recursive: true, force: true });
  mkdirSync(join(OUT, set), { recursive: true });
}

for (const [i, t] of frameTimes(M.in, M.out, M.count).entries()) {
  const png = join(tmp, `${pad(i)}.png`);
  // -ss before -i is fast, and frame-accurate since ffmpeg 2.1 because it
  // decodes from the previous keyframe rather than snapping to it.
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(t), '-i', clip, '-frames:v', '1', png]);
  const { width, height } = await sharp(png).metadata();

  await sharp(png)
    .resize(M.landscape.width, M.landscape.height)
    .webp({ quality: M.quality })
    .toFile(join(OUT, 'l', `${pad(i)}.webp`));

  const winW = Math.round((height * M.portrait.width) / M.portrait.height);
  const left = portraitLeft(width, winW, Math.round((M.portrait.focalX * width) / 1920));
  await sharp(png)
    .extract({ left, top: 0, width: winW, height })
    .resize(M.portrait.width, M.portrait.height)
    .webp({ quality: M.quality })
    .toFile(join(OUT, 'p', `${pad(i)}.webp`));
}
rmSync(tmp, { recursive: true, force: true });

let over = false;
for (const set of ['l', 'p']) {
  const files = readdirSync(join(OUT, set));
  const kb = files.reduce((s, f) => s + statSync(join(OUT, set, f)).size, 0) / 1024;
  console.log(`${set}: ${files.length} frames, ${kb.toFixed(0)} KB (budget ${M.budgetKB[set]} KB)`);
  if (kb > M.budgetKB[set]) {
    console.error(`${set} is over budget: lower "quality" in scripts/hero-frames.json and rerun`);
    over = true;
  }
}
process.exit(over ? 1 : 0);
```

Add to `package.json` `scripts`, after `"poster"`:

```json
    "hero:frames": "node scripts/hero-frames.mjs"
```

- [ ] **Step 6: Run the script**

Run: `npm run hero:frames`
Expected output, two lines, both within budget, for example:
```
l: 48 frames, 1490 KB (budget 1600 KB)
p: 48 frames, 1150 KB (budget 1300 KB)
```
If a set is over budget, set `"quality": 60` in `scripts/hero-frames.json` and rerun.

- [ ] **Step 7: Check the portrait crop keeps Dave in frame**

Open `public/hero/dave/p/000.webp`, `public/hero/dave/p/024.webp` and `public/hero/dave/p/047.webp`. Dave's head, both hands and (in 047) his feet on the desk must be inside the frame. If his feet are cut in 047, raise `portrait.focalX` by 20 and rerun Step 6. If his face is cut in 000, lower it by 20.

- [ ] **Step 8: Confirm the calm frame**

Open `public/hero/dave/l/034.webp` through `public/hero/dave/l/042.webp`. Set `calm` in `scripts/hero-frames.json` to the first frame in which both back walls are fully lime with no grey showing. No rerun is needed; `calm` does not affect the frames.

- [ ] **Step 9: Run the tests to verify they pass**

Run: `npx vitest run tests/unit/hero-frames.test.ts`
Expected: PASS, 7 tests.

- [ ] **Step 10: Commit**

```bash
git add scripts/hero-frames-lib.mjs scripts/hero-frames.mjs scripts/hero-frames.json package.json public/hero/dave tests/unit/hero-frames.test.ts
git commit -m "feat(MVBOLD-29): cut the Dave hero frames from the transformation clip

48 frames per set, landscape 1280x720 and a 500x1080 portrait window on
Dave, WebP q65, budget-checked. The clip stays in MarketingAndPromotion;
the frames are committed because Vercel cannot reach it.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: The static hero, the new headline and the moved explainer

This task ships the finished markup with no scrub: frame 0, the scrims, both copy layouts, and the explainer in the stage lead-in. It is exactly what reduced-motion and no-JS visitors get, which is why it comes before the engine.

**Files:**
- Modify: `src/pages/index.astro` (frontmatter imports; the hero `<section>` at lines 164–197; the stage-lead `<section>` at lines 214–222)
- Modify: `src/styles/site.css` (remove the `.hero-split` block at lines 663–678; add the `.hero.dave` block in its place; add `.lead-media` and `.stage-lead .site-video`)
- Modify: `tests/unit/home.test.ts` (replace the tests at lines 64–70 and 129–144)
- Modify: `tests/e2e/hero-contract.spec.ts` (the eyebrow selector at lines 48–50 and its comment)
- Modify: `tests/e2e/video.spec.ts` (the locator at line 30)
- Create: `tests/e2e/dave-hero.spec.ts`

**Interfaces:**
- Consumes: `scripts/hero-frames.json` (`count`, `calm`) and the frame URLs from Task 2.
- Produces (used by Task 4): the DOM contract
  - `section.hero.dave.mv-field-cobalt[data-frames][data-calm]`
  - `.dave-pin` (the sticky stage) containing `picture.dave-scene` (one `<source media="(max-aspect-ratio: 4/5)">` and one `<img>`), `.dave-scrim`, `.dave-copy` (holding `.dave-head` and `.dave-foot`), and `.dave-hint`
  - the H1's `.hl` inside `.dave-head`

- [ ] **Step 1: Confirm nothing else uses the classes being removed**

Run: `npx rg -n "hero-split|hero-copy|hero-media" src`
Expected: matches in `src/pages/index.astro` and `src/styles/site.css` only. If any other page matches, keep those CSS rules and remove only the index markup.

- [ ] **Step 2: Write the failing unit tests**

In `tests/unit/home.test.ts`, replace the test `'the hero leads with the design system punchline'` (lines 64–70) with:

```ts
test('the hero says what the room does', () => {
  // "Make it. Track it. Ship it." came from the design handoff. The hero is
  // now Dave's office going from chaos to calm, and the headline is the ad's
  // own end line (MVBOLD-29).
  const h1 = (html().match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  expect(h1).toContain('Less chaos.');
  expect(h1).toMatch(/<span class="hl keep">More making\.<\/span>/);
  expect(h1).not.toContain('Make it.');
});

test('the hero opens on frame 0 as a plain, high-priority picture', () => {
  const h = html();
  const hero = h.slice(h.indexOf('class="hero dave mv-field-cobalt"'), h.indexOf('</section>', h.indexOf('class="hero dave')));
  expect(hero, 'hero not found').not.toBe('');
  expect(hero).toMatch(/data-frames="48"/);
  expect(hero).toMatch(/data-calm="\d+"/);
  expect(hero).toContain('<picture class="dave-scene">');
  expect(hero).toContain('srcset="/hero/dave/p/000.webp"');
  expect(hero).toMatch(/<img[^>]+src="\/hero\/dave\/l\/000\.webp"[^>]+fetchpriority="high"/);
  expect(hero, 'the LCP image must not be lazy').not.toContain('loading="lazy"');
});

test('the hero carries no navy', () => {
  // field-separation.test.ts: ink is structure, never a hero. The scrim is
  // --ink-strong, not --field-ink.
  const h = html();
  const hero = h.slice(h.indexOf('class="hero dave'), h.indexOf('</section>', h.indexOf('class="hero dave')));
  expect(hero).not.toMatch(/--field-ink|--bg-ink|#15314d/i);
  const css = readFileSync('src/styles/site.css', 'utf8');
  const daveCss = css.slice(css.indexOf('/* The Dave hero'), css.indexOf('/* end Dave hero */'));
  expect(daveCss, 'Dave hero CSS block not found').not.toBe('');
  expect(daveCss).not.toMatch(/--field-ink|--bg-ink|#15314d/i);
  expect(daveCss).toContain('--ink-strong');
});
```

Replace the test `'the explainer is in the hero, not a fold of its own'` (lines 129–144) with:

```ts
test('the explainer sits in the stage lead-in, after the hero', () => {
  // It sat in the hero beside the copy until the hero became Dave's office
  // (MVBOLD-29). It is still the page's second beat: straight after the
  // marquee, introducing the stage. MANUVA-36 swaps it for the Dave cut.
  const h = html();
  const heroEnd = h.indexOf('</section>', h.indexOf('class="hero dave'));
  const lead = h.indexOf('class="sec stage-lead"');
  const leadEnd = h.indexOf('</section>', lead);
  const video = h.indexOf('data-youtube-id=');
  expect(lead).toBeGreaterThan(heroEnd);
  expect(video, 'the explainer sits inside the stage lead-in').toBeGreaterThan(lead);
  expect(video, 'the explainer sits inside the stage lead-in').toBeLessThan(leadEnd);
  expect(h).toContain('What Manuva actually does');
  expect(h).toContain('See it in 32 seconds');
  expect(h.indexOf('<section class="stage"')).toBeGreaterThan(leadEnd);
});
```

- [ ] **Step 3: Write the failing e2e layout tests**

Create `tests/e2e/dave-hero.spec.ts`:

```ts
import { test, expect, type Page } from '@playwright/test';

// The Dave hero (MVBOLD-29). The layout half lives here from Task 3; the scrub
// half is added in Task 4.

async function ctasOnScreen(page: Page) {
  return page.evaluate(() =>
    [...document.querySelectorAll('.dave-foot .pill')].map((a) => {
      const r = a.getBoundingClientRect();
      return { text: (a.textContent || '').trim(), inView: r.top >= 0 && r.bottom <= innerHeight && r.width > 0 };
    }),
  );
}

for (const [w, h] of [[1280, 900], [1440, 900], [390, 844], [844, 390]] as const) {
  test(`both CTAs are on screen on load at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h });
    await page.goto('/');
    const ctas = await ctasOnScreen(page);
    expect(ctas.map((c) => c.text)).toEqual(['Start free', 'Book a demo']);
    expect(ctas.every((c) => c.inView), JSON.stringify(ctas)).toBe(true);
  });
}

const WIDTHS = [320, 375, 414, 768, 1024, 1199, 1200, 1280, 1440, 1920];
for (const width of WIDTHS) {
  test(`the headline fits its column at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const m = await page.evaluate(() => {
      const h1 = document.querySelector('.hero.dave h1') as HTMLElement;
      const hl = h1.querySelector('.hl') as HTMLElement;
      const box = h1.parentElement!.getBoundingClientRect();
      const r = hl.getBoundingClientRect();
      return { overflow: h1.scrollWidth - h1.clientWidth, hlRight: r.right, colRight: box.right, vw: innerWidth };
    });
    expect(m.overflow, 'the h1 overflows its own box').toBeLessThanOrEqual(1);
    expect(m.hlRight, '"More making." runs past its column').toBeLessThanOrEqual(m.colRight + 1);
    expect(m.hlRight, '"More making." runs off the screen').toBeLessThanOrEqual(m.vw);
  });
}

test('layout A puts the copy on the right half from 1200px', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const left = await page.locator('.dave-copy').evaluate((el) => el.getBoundingClientRect().left);
  expect(left).toBeGreaterThanOrEqual(1280 * 0.45);
});

test('the poster layout puts the headline at the top and the buttons at the foot', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const m = await page.evaluate(() => ({
    h1: document.querySelector('.hero.dave h1')!.getBoundingClientRect(),
    cta: document.querySelector('.dave-foot .row')!.getBoundingClientRect(),
  }));
  expect(m.h1.top).toBeLessThan(844 * 0.4);
  expect(m.cta.bottom).toBeGreaterThan(844 * 0.75);
});

test('a portrait viewport loads the portrait frame', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const src = await page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => i.currentSrc);
  expect(src).toMatch(/\/hero\/dave\/p\/000\.webp$/);
});

test('the explainer facade renders in the stage lead-in', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await expect(page.locator('.stage-lead .site-video')).toBeVisible();
  await expect(page.locator('.hero .site-video')).toHaveCount(0);
});
```

- [ ] **Step 4: Update the existing e2e tests the move breaks**

In `tests/e2e/video.spec.ts` line 30, change:
```ts
  const figure = page.locator('.hero .site-video');
```
to:
```ts
  const figure = page.locator('.stage-lead .site-video');
```

In `tests/e2e/hero-contract.spec.ts`, replace lines 45–50:
```ts
    // The home hero puts its copy in .hero-copy so the video can share the
    // row, so the eyebrow is a grandchild there. Still one eyebrow, still a
    // block sibling of the h1 with the grid gap doing the spacing.
    const eyebrow = hero?.querySelector(
      ':scope > .eyebrow, :scope > .mv-eyebrow, :scope > .hero-split > .hero-copy > .eyebrow',
    ) as HTMLElement | null;
```
with:
```ts
    // The home hero (MVBOLD-29) pins a stage over a claymation frame, so its
    // eyebrow sits in .dave-head inside that stage. Still one eyebrow, still a
    // block sibling of the h1 with the grid gap doing the spacing.
    const eyebrow = hero?.querySelector(
      ':scope > .eyebrow, :scope > .mv-eyebrow, :scope .dave-head > .eyebrow',
    ) as HTMLElement | null;
```
and in the comment above the `'/ sizes its headline…'` test (lines 86–92), replace "Its hero carries the explainer beside the copy, so the headline is sized for a shared row instead of the full width." with "Its headline sits in a half-width column over Dave's office, so it is sized for that column instead of the full width."

- [ ] **Step 5: Build and run the tests to verify they fail**

Run: `npm run build && npx vitest run tests/unit/home.test.ts`
Expected: FAIL on `the hero says what the room does`, `the hero opens on frame 0…`, `the hero carries no navy` and `the explainer sits in the stage lead-in…`.

Run: `npx playwright test tests/e2e/dave-hero.spec.ts --workers=1`
Expected: FAIL (`.dave-foot .pill` not found, `.hero.dave h1` null).

- [ ] **Step 6: Write the hero markup**

In `src/pages/index.astro` frontmatter, after `import { APP_URL, DOMAINS } from '../site';` add:

```ts
// Frame count and the frame where the room turns calm, from the manifest the
// frame script reads, so the page and the frames cannot disagree.
import heroFrames from '../../scripts/hero-frames.json';
```

Replace the comment and hero `<section>` (lines 164–197) with:

```astro
  {/* Dave's office (MVBOLD-29). Frame 0 of the chaos-to-calm sequence is plain
      markup: it is the LCP image and the whole hero for reduced-motion and
      no-JS visitors. Motion.astro pins .dave-pin and steps the <img> through
      the rest as the page scrolls. The explainer that used to sit here moved
      to the stage lead-in below. */}
  <section class="hero dave mv-field-cobalt" data-frames={heroFrames.count} data-calm={heroFrames.calm}>
    <div class="dave-pin">
      <picture class="dave-scene">
        <source media="(max-aspect-ratio: 4/5)" srcset="/hero/dave/p/000.webp" width="500" height="1080" />
        <img
          src="/hero/dave/l/000.webp"
          width="1280"
          height="720"
          fetchpriority="high"
          alt="Claymation: Dave at his desk in a grey office full of spreadsheets and sticky notes. Scrolling tidies it into a calm, lime-green room with his feet up."
        />
      </picture>
      <div class="dave-scrim" aria-hidden="true"></div>
      <div class="dave-copy">
        <div class="dave-head">
          <span class="eyebrow" style="opacity:.75">MRP for Shopify manufacturers</span>
          <h1 class="disp">Less chaos. <span class="hl keep">More making.</span></h1>
        </div>
        <div class="dave-foot">
          <p class="sub" style="opacity:.88;max-width:40ch">
            Manuva replaces the spreadsheets and legacy MRP your team is fighting with. Inventory, BOMs, work
            orders, and stock control — connected, live, and built for the floor.
          </p>
          <div class="row">
            <a class="pill" href={APP_URL}>Start free</a>
            <a class="pill ghost" href="/about#contact" style="box-shadow:inset 0 0 0 2px rgb(255 255 255/.42)">Book a demo</a>
          </div>
        </div>
      </div>
      <span class="dave-hint" aria-hidden="true">Scroll</span>
    </div>
  </section>
```

Replace the stage lead-in `<section class="sec stage-lead">…</section>` (lines 214–222) with:

```astro
  <section class="sec stage-lead">
    <div class="split">
      <div style="display:grid;gap:18px;align-content:start">
        <span class="eyebrow" style="opacity:.6">The platform</span>
        <h2 class="disp">Everything your shop needs. Nothing it doesn't.</h2>
        <p class="sub" style="color:var(--ink-muted);max-width:58ch">
          One system covering the whole shop floor — from raw materials in to finished goods out. No modules to
          bolt on, no consultants to hire.
        </p>
        <a class="pill ink" href="/features" style="justify-self:start">Explore the full feature set &rarr;</a>
      </div>
      <div class="lead-media">
        <span class="eyebrow" style="opacity:.6">See it in 32 seconds</span>
        {/* The caption carries "What Manuva actually does", which was the h2
            of the section this once replaced — the sentence stays on the page.
            MANUVA-36 swaps the YouTube id and poster for the Dave cut. */}
        <Video
          youtubeId="Vr4rkatHggA"
          poster="/video/explainer-poster.jpg"
          alt="Manuva title card reading Manufacturing operations software — What is Manuva?"
          title="What Manuva actually does"
        />
      </div>
    </div>
  </section>
```

Also delete the now-stale two-line comment immediately above the stage-lead comment (`{/* The explainer. A facade, not an embed: … until someone clicks. */}`), since the explainer's own comment now sits with it.

- [ ] **Step 7: Write the CSS**

In `src/styles/site.css`, delete the block from `/* Hero with the explainer in it.` through the closing `}` of its `@media(min-width:1100px){…}` (lines 663–678). In its place add:

```css
/* The Dave hero (MVBOLD-29). A full-bleed claymation frame over the cobalt
   field, which only shows while frame 0 loads. Motion.astro gives the section
   its scroll length and steps the frame; without it (reduced motion, no JS)
   the section is one screen and the sticky pin has nothing to do.

   Two copy layouts. The poster (default): eyebrow and headline in the plain
   wall band at the top, sub-copy and buttons at the foot, Dave clear in the
   middle. Layout A from 1200px on a landscape screen: the copy in the right
   half over a scrim from the right. Below 1200px a half column cannot hold
   the unbreakable "More making." at a size that still beats the page's 72px
   section headings, so narrower landscape screens get the poster too.

   The scrim is --ink-strong, never navy: a navy hero is the "third blue"
   field-separation.test.ts exists to stop. 7.2 is "More making." in .disp's
   ems plus a margin; the headline-fits test in dave-hero.spec.ts is what
   holds it true. */
.hero.dave{display:block;padding:0;gap:0;min-height:100svh}
.hero.dave>.dave-pin{position:sticky;top:0;height:100svh;overflow:hidden;display:grid}
.dave-scene{position:absolute;inset:0;margin:0}
.dave-scene img{display:block;width:100%;height:100%;object-fit:cover;object-position:31% 50%}
.dave-scrim{position:absolute;inset:0;pointer-events:none;background:
  linear-gradient(180deg,color-mix(in srgb,var(--ink-strong) 80%,transparent) 0%,color-mix(in srgb,var(--ink-strong) 45%,transparent) 30%,transparent 52%),
  linear-gradient(0deg,color-mix(in srgb,var(--ink-strong) 85%,transparent) 0%,color-mix(in srgb,var(--ink-strong) 50%,transparent) 22%,transparent 42%)}
.dave-copy{position:relative;display:grid;align-content:space-between;gap:24px;height:100%;box-sizing:border-box;padding:96px 20px 36px}
.dave-head,.dave-foot{display:grid;gap:18px;justify-items:start;min-width:0}
.hero.dave h1{font-size:min(15.5vw,calc((100vw - 40px) / 7.2));max-width:none}
.dave-hint{display:none;position:absolute;left:50%;bottom:12px;transform:translateX(-50%);font:600 11px/1 var(--font-body);letter-spacing:.14em;text-transform:uppercase;opacity:.8;pointer-events:none}
@media(min-width:721px){.dave-copy{padding:112px 32px 48px}.hero.dave h1{font-size:min(11vw,calc((100vw - 64px) / 7.2))}}
@media(max-aspect-ratio:4/5){.dave-scene img{object-position:50% 50%}}
@media(min-width:1200px) and (min-aspect-ratio:1/1){
  .dave-scrim{background:linear-gradient(90deg,transparent 30%,color-mix(in srgb,var(--ink-strong) 70%,transparent) 60%,color-mix(in srgb,var(--ink-strong) 85%,transparent))}
  .dave-copy{align-content:center;justify-self:end;width:50vw;height:auto;gap:28px;padding:120px max(48px,calc((100vw - var(--page-max,1240px)) / 2)) 80px 0}
  .hero.dave h1{font-size:min(clamp(74px,6vw,112px),calc((50vw - max(48px,(100vw - var(--page-max,1240px)) / 2)) / 7.2))}
}
/* end Dave hero */

/* The explainer, in the stage lead-in since MVBOLD-29. */
.lead-media{display:grid;gap:12px;min-width:0;align-content:start}
.stage-lead .site-video{margin:0;width:100%;max-width:none}
```

- [ ] **Step 8: Build and run the unit tests**

Run: `npm run build && npx vitest run`
Expected: PASS, the whole unit suite. `field-separation.test.ts`, `orphan-classes.test.ts` and `seo.test.ts` must stay green.

- [ ] **Step 9: Run the e2e tests and tune the headline constant if needed**

Run: `npx playwright test tests/e2e/dave-hero.spec.ts tests/e2e/hero-contract.spec.ts tests/e2e/video.spec.ts tests/e2e/responsive.spec.ts --workers=1`
Expected: PASS.

If `the headline fits its column` fails at any width, the 7.2 em constant is too small for Archivo at `wdth 118`. Measure it in the built page:

Run: `npx playwright test tests/e2e/dave-hero.spec.ts -g "fits its column at 1280px" --workers=1` after temporarily adding `console.log(await page.evaluate(() => { const s = document.querySelector('.hero.dave .hl') as HTMLElement; return s.getBoundingClientRect().width / parseFloat(getComputedStyle(s).fontSize); }))` to that test. Replace every `7.2` in the Dave hero CSS block with the logged value plus 0.2, rounded up to one decimal, remove the log, rebuild and rerun.

If `'/ sizes its headline for the row it shares, and still leads the page'` in `hero-contract.spec.ts` fails at 1280 (h1 not larger than the 72px section h2s), the constant has grown past what layout A's column allows at 1280. Raise layout A's breakpoint from 1200px to 1280px in both the CSS and the `1199`/`1200` widths in `dave-hero.spec.ts`, and update the spec's §3.2 to match.

- [ ] **Step 10: Commit**

```bash
git add src/pages/index.astro src/styles/site.css tests/unit/home.test.ts tests/e2e/dave-hero.spec.ts tests/e2e/hero-contract.spec.ts tests/e2e/video.spec.ts
git commit -m "feat(MVBOLD-29): Dave's office as the hero, explainer moves to the lead-in

Full-bleed frame 0 over the cobalt field with a neutral-ink scrim, poster
layout by default and layout A from 1200px. Headline becomes 'Less chaos.
More making.' The explainer moves to the stage lead-in as a split.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: The scrub engine

**Files:**
- Modify: `src/components/site/Motion.astro` (import; new section `5 · scrub` after the chips block at line 178; the frame loop at lines 184–288; the resize listener at lines 304–307)
- Modify: `src/styles/site.css` (highlight and hint rules inside the Dave hero block)
- Modify: `tests/e2e/dave-hero.spec.ts` (append the scrub, reduced-motion, no-JS and Review Focus tests)

**Interfaces:**
- Consumes: `frameAt`, `canSwap`, `loadOrder`, `coarseCount`, `nearestLoaded` from `src/lib/scrub.ts` (Task 1); the DOM contract from Task 3; frame URLs from Task 2.
- Produces: runtime state on the hero for tests and CSS:
  - `section.hero.dave` inline `style.height` = `250svh` when motion is on
  - `data-scrub` = `"pre"` before the calm frame, `"calm"` from it; absent when motion is off
  - `data-set` = `"l"` or `"p"`, the frame set in use

- [ ] **Step 1: Write the failing e2e tests**

Append to `tests/e2e/dave-hero.spec.ts`:

```ts
// --- the scrub (Task 4) ------------------------------------------------------

const heroScrollTo = (page: Page, fraction: number) =>
  page.evaluate((f) => {
    const el = document.querySelector('.hero.dave') as HTMLElement;
    const top = el.getBoundingClientRect().top + scrollY;
    scrollTo(0, top + (el.offsetHeight - innerHeight) * f);
  }, fraction);

const imgSrc = (page: Page) =>
  page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => i.currentSrc || i.src);

const framesFetched = (page: Page, set: 'l' | 'p') =>
  page.evaluate(
    (s) => performance.getEntriesByType('resource').filter((r) => r.name.includes(`/hero/dave/${s}/`)).length,
    set,
  );

test.describe('scrub, motion on', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('the hero pins and scrolling steps the frame', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const hero = page.locator('.hero.dave');
    await expect(hero).toHaveAttribute('data-scrub', 'pre');
    await expect(hero).toHaveAttribute('data-set', 'l');
    expect(await hero.evaluate((el) => el.getBoundingClientRect().height)).toBeGreaterThan(800 * 2);

    await expect.poll(() => framesFetched(page, 'l'), { timeout: 15_000 }).toBeGreaterThanOrEqual(7);
    await heroScrollTo(page, 0.5);
    await expect.poll(() => imgSrc(page), { timeout: 5_000 }).not.toMatch(/\/000\.webp$/);
    const pinTop = await page.locator('.dave-pin').evaluate((el) => el.getBoundingClientRect().top);
    expect(Math.abs(pinTop), 'the stage is pinned mid-scrub').toBeLessThan(2);
  });

  test('the highlight lands with the calm room and leaves when scrolled back', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect.poll(() => framesFetched(page, 'l'), { timeout: 15_000 }).toBeGreaterThanOrEqual(7);
    await heroScrollTo(page, 1);
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'calm', { timeout: 5_000 });
    const bg = await page.locator('.hero.dave .hl').evaluate((e) => getComputedStyle(e).backgroundColor);
    expect(bg).toBe('rgb(200, 255, 46)');
    await heroScrollTo(page, 0);
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'pre', { timeout: 5_000 });
  });

  test('only frame 0 is fetched before the page has loaded', async ({ page }) => {
    const before: string[] = [];
    let loaded = false;
    page.on('load', () => { loaded = true; });
    page.on('request', (r) => { if (!loaded && r.url().includes('/hero/dave/')) before.push(r.url()); });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    expect(before).toHaveLength(1);
    expect(before[0]).toMatch(/\/hero\/dave\/l\/000\.webp$/);
  });

  test('the scroll hint shows at the top and fades once the scrub starts', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const hint = page.locator('.dave-hint');
    await expect(hint).toBeVisible();
    await heroScrollTo(page, 0.2);
    await expect.poll(() => hint.evaluate((e) => Number(getComputedStyle(e).opacity))).toBeLessThan(0.05);
  });

  // Review Focus 1
  test('a viewport that turns portrait swaps to the portrait set', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-set', 'l');
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-set', 'p', { timeout: 5_000 });
    await expect.poll(() => imgSrc(page)).toMatch(/\/hero\/dave\/p\//);
  });

  // Review Focus 2
  test('a reload mid-scrub shows the frame for that position', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await heroScrollTo(page, 0.6);
    await page.reload();
    await expect.poll(() => page.evaluate(() => scrollY), { timeout: 5_000 }).toBeGreaterThan(400);
    await expect.poll(() => imgSrc(page), { timeout: 15_000 }).not.toMatch(/\/000\.webp$/);
  });

  // Review Focus 3
  test('a frame that fails to load never leaves a broken image', async ({ page }) => {
    await page.route(/\/hero\/dave\/l\/(?!000)\d{3}\.webp$/, (route) => route.abort());
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForTimeout(1500);
    await heroScrollTo(page, 0.7);
    await page.waitForTimeout(800);
    const img = await page.locator('.dave-scene img').evaluate((i: HTMLImageElement) => ({
      src: i.currentSrc || i.src, complete: i.complete, w: i.naturalWidth,
    }));
    expect(img.src).toMatch(/\/000\.webp$/);
    expect(img.complete && img.w > 0, JSON.stringify(img)).toBe(true);
  });

  // Review Focus 4
  test('Save-Data stops after the coarse pass', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'connection', { value: { saveData: true, effectiveType: '4g' } });
    });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect.poll(() => framesFetched(page, 'l'), { timeout: 15_000 }).toBe(7);
    await page.waitForTimeout(1500);
    expect(await framesFetched(page, 'l')).toBe(7);
  });

  // Review Focus 5
  test('the motion toggle flattens and restores the hero', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.locator('.motion-toggle').click();
    await page.waitForLoadState('load');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
    const flat = await page.locator('.hero.dave').evaluate((el) => el.getBoundingClientRect().height);
    expect(flat).toBeLessThanOrEqual(800 + 1);
    await expect(page.locator('.hero.dave')).not.toHaveAttribute('data-scrub', /.*/);

    await page.locator('.motion-toggle').click();
    await page.waitForLoadState('load');
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
    await expect(page.locator('.hero.dave')).toHaveAttribute('data-scrub', 'pre');
  });
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('the hero is one still screen with the highlight showing', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const hero = page.locator('.hero.dave');
    expect(await hero.evaluate((el) => el.getBoundingClientRect().height)).toBeLessThanOrEqual(801);
    await expect(hero).not.toHaveAttribute('data-scrub', /.*/);
    await page.evaluate(() => scrollTo(0, 300));
    await page.waitForTimeout(500);
    expect(await imgSrc(page)).toMatch(/\/hero\/dave\/l\/000\.webp$/);
    expect(await framesFetched(page, 'l')).toBe(1);
    const bg = await page.locator('.hero.dave .hl').evaluate((e) => getComputedStyle(e).backgroundColor);
    expect(bg).toBe('rgb(200, 255, 46)');
    await expect(page.locator('.dave-hint')).toBeHidden();
  });
});

test.describe('no JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('frame 0, the headline and both CTAs still render', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(page.locator('.dave-scene img')).toBeVisible();
    await expect(page.locator('.hero.dave h1')).toHaveText('Less chaos. More making.');
    await expect(page.locator('.dave-foot .pill')).toHaveCount(2);
    await expect(page.locator('.dave-hint')).toBeHidden();
  });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `npx playwright test tests/e2e/dave-hero.spec.ts --workers=1 -g "scrub|reduced motion|no JavaScript"`
Expected: the `scrub, motion on` tests FAIL (no `data-scrub`, no `data-set`). The `reduced motion` and `no JavaScript` tests may already pass; that is correct, since Task 3 shipped the flat rendering.

- [ ] **Step 3: Add the scrub step to `Motion.astro`**

Make this the first line inside the `<script>` in `src/components/site/Motion.astro`, above the `// Base.astro decided this…` comment (imports must be top-level in a module script):

```ts
  import { canSwap, coarseCount, frameAt, loadOrder, nearestLoaded } from '../../lib/scrub';
```

After the chips block (after line 178, before `const ghosts = …`), add:

```ts
  // 5 · scrub — the Dave hero (MVBOLD-29). One <img> stepping through the
  // chaos-to-calm frames as the hero's scroll progresses. Frame 0 is already
  // in the markup; the rest load after `load`, coarse pass first, so the LCP
  // is one image and the scrub works within a few hundred KB. Swaps are hard
  // cuts at no more than 12 a second: it is stop-motion, and a faster swap
  // would read as a smeared video rather than as claymation.
  const PORTRAIT = matchMedia('(max-aspect-ratio: 4/5)');
  const frameUrl = (set: string, i: number) => `/hero/dave/${set}/${String(i).padStart(3, '0')}.webp`;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  const lean = !!conn && (conn.saveData === true || /(^|-)2g$|^3g$/.test(conn.effectiveType ?? ''));

  const scrubs = [...document.querySelectorAll<HTMLElement>('.hero.dave')].map((h) => {
    const img = h.querySelector<HTMLImageElement>('.dave-scene img')!;
    const o = {
      h, img,
      hint: h.querySelector<HTMLElement>('.dave-hint'),
      n: Number(h.dataset.frames) || 1,
      calm: Number(h.dataset.calm) || 0,
      set: PORTRAIT.matches ? 'p' : 'l',
      loaded: new Set<number>([0]),
      shown: 0,
      lastSwap: -Infinity,
      p: null as number | null,
      gen: 0,
    };
    if (!reduce) {
      h.style.height = '250svh';
      h.dataset.scrub = 'pre';
      h.dataset.set = o.set;
      // The <source> picked frame 0's crop for first paint. From here the
      // script owns the choice, so it goes, and the <img> takes the set's URL
      // directly; the browser already has that file.
      h.querySelector('.dave-scene source')?.remove();
      img.src = frameUrl(o.set, 0);
    }
    return o;
  });

  type Scrub = (typeof scrubs)[number];

  // Fetch and decode the set off-screen, four at a time. `gen` lets a set
  // change (Review Focus 1) abandon a load already in flight.
  async function loadFrames(o: Scrub) {
    const gen = ++o.gen;
    const order = loadOrder(o.n).filter((i) => i !== 0);
    const limit = lean ? coarseCount(o.n) - 1 : order.length;
    const queue = order.slice(0, limit);
    const worker = async () => {
      while (queue.length && gen === o.gen) {
        const i = queue.shift()!;
        const im = new Image();
        im.src = frameUrl(o.set, i);
        try {
          await im.decode();
          if (gen === o.gen) o.loaded.add(i);
        } catch {
          // A frame that fails stays out of `loaded`; nearestLoaded never picks it.
        }
        wake();
      }
    };
    await Promise.all([worker(), worker(), worker(), worker()]);
  }

  function startScrubLoads() {
    if (reduce) return;
    scrubs.forEach((o) => { void loadFrames(o); });
  }
  // After `load`, and a turn later, so not one byte of it competes with the page.
  if (document.readyState === 'complete') setTimeout(startScrubLoads, 0);
  else addEventListener('load', () => setTimeout(startScrubLoads, 0), { once: true });

  PORTRAIT.addEventListener('change', () => {
    if (reduce) return;
    scrubs.forEach((o) => {
      o.set = PORTRAIT.matches ? 'p' : 'l';
      o.h.dataset.set = o.set;
      o.loaded = new Set([0]);
      o.shown = 0;
      o.lastSwap = -Infinity;
      o.img.src = frameUrl(o.set, 0);
      void loadFrames(o);
    });
    wake();
  });

  function stepScrubs(now: number, dt: number, H: number) {
    let busy = false;
    scrubs.forEach((o) => {
      if (reduce) return;
      const r = o.h.getBoundingClientRect();
      const target = cl(-r.top / Math.max(1, o.h.offsetHeight - H));
      o.p = o.p === null ? target : damp(o.p, target, dt);
      if (Math.abs(target - o.p) > SETTLED) busy = true;

      const want = frameAt(o.p, o.n);
      const show = nearestLoaded(want, o.loaded, o.n);
      if (show >= 0 && show !== o.shown) {
        if (canSwap(now, o.lastSwap)) {
          o.img.src = frameUrl(o.set, show);
          o.shown = show;
          o.lastSwap = now;
        } else busy = true; // a swap is owed; keep the loop alive to pay it
      }
      if (show >= 0 && show !== want) busy = true; // waiting on a frame still loading

      o.h.dataset.scrub = o.shown >= o.calm ? 'calm' : 'pre';
      if (o.hint) o.hint.style.opacity = String(1 - cl(o.p / 0.05));
    });
    return busy;
  }
```

- [ ] **Step 4: Wire the step into the frame loop**

In `function frame(now: number)`, after the `stages.forEach(…)` block and before the `if (!reduce && ghosts.length)` block, add:

```ts
    if (stepScrubs(now, dt, H)) busy = true;
```

In the idle check near the end of `frame`, change:
```ts
    if (!busy && !stages.some((o) => near(o.s)) && !intros.some((o) => near(o.n))) {
```
to:
```ts
    if (!busy && !stages.some((o) => near(o.s)) && !intros.some((o) => near(o.n)) && !scrubs.some((o) => near(o.h))) {
```

`wake` is a function declaration, so `loadFrames` can call it although it is defined further down the file.

- [ ] **Step 5: Add the highlight and hint CSS**

In `src/styles/site.css`, inside the Dave hero block, immediately before `/* end Dave hero */`, add:

```css
/* The chip on "More making." lands as the walls turn lime (data-scrub,
   written by Motion.astro). With motion off or no JS the attribute is never
   set and the chip simply shows: the markup is the finished state. */
.hero.dave .hl{transition:background-color 220ms var(--ease-out),color 220ms var(--ease-out)}
.hero.dave[data-scrub="pre"] .hl{background-color:transparent;color:inherit}
:root[data-motion="on"] .hero.dave[data-scrub] .dave-hint{display:block}
```

- [ ] **Step 6: Build and run the e2e tests to verify they pass**

Run: `npx playwright test tests/e2e/dave-hero.spec.ts tests/e2e/motion-toggle.spec.ts --workers=1`
Expected: PASS, including the existing smoothness and idle-loop tests in `motion-toggle.spec.ts`.

- [ ] **Step 7: Commit**

```bash
git add src/components/site/Motion.astro src/styles/site.css tests/e2e/dave-hero.spec.ts
git commit -m "feat(MVBOLD-29): scrub the Dave hero from chaos to calm on scroll

New step in the shared motion loop: pins the hero, maps damped progress to
a frame, swaps at stop-motion pace, loads frames after load coarse-first,
honours Save-Data, follows portrait/landscape changes and never shows a
frame that failed. The highlight lands on the calm frame.

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Whole-site verification and hand-off

**Files:**
- Modify: `CLAUDE.md` (one paragraph under "Sources of truth")
- No source changes unless a check fails.

**Interfaces:**
- Consumes: everything above.
- Produces: a branch ready to merge, with evidence.

- [ ] **Step 1: Run the full unit suite on a fresh build**

Run: `npm run build && npx vitest run`
Expected: PASS, all files.

- [ ] **Step 2: Run the full e2e suite**

Run: `npx playwright test --workers=1`
Expected: PASS, all files.

- [ ] **Step 3: Run the copy-parity gate**

Run: `npm run parity`
Expected: PASS. If it reports a missing phrase that came from the old hero, add the exact phrase from the FAIL output to `scripts/parity/ignore.json` with the reason "replaced by the Dave hero headline (MVBOLD-29)", rerun, and include that file in the commit below.

- [ ] **Step 4: Check the frame weight in the build**

Run: `du -sh dist/hero/dave/l dist/hero/dave/p`
Expected: each at or under its budget (≤ 1.6 MB and ≤ 1.3 MB).

- [ ] **Step 5: Record the pipeline in the project CLAUDE.md**

In `CLAUDE.md`, at the end of the "Sources of truth" section, add:

```markdown
The home hero's frames (`public/hero/dave/`) are cut from `T1.mp4` in
`C:\dev\MarketingAndPromotion\video\manuva-stopmotion\flow-kit\downloads` by
`npm run hero:frames` (needs ffmpeg). The clip is not in this repo and Vercel
never sees it, so rerun the script by hand and commit the frames whenever the
clip or `scripts/hero-frames.json` changes.
```

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md
git commit -m "chore(MVBOLD-29): note where the hero frames come from

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 7: Ask before anything leaves the machine**

Pushing the branch creates a Vercel preview, which is outward-facing. Ask the user before `git push -u origin mvbold-29-dave-hero`. Once they approve and the preview is up:

- Run Lighthouse (mobile and desktop) on the preview's `/` and on the current production `/`, and report LCP and CLS for both. LCP and CLS must not regress.
- Check by eye at 1440, 1024 and 390 wide: the scrub reads as stop-motion rather than video, the header's ink is light over the hero, and the highlight lands as the walls turn lime.

Do not merge to `master` without the user's go-ahead.

- [ ] **Step 8: Update monday**

Post an update on MANUVA-35 (item `3253976488`, board `5099992950`) with the commits, test counts, frame weights and Lighthouse numbers. Set its Status to Done only after the user has seen it on the preview, and read the status back to confirm the write.
