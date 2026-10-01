// The Dave hero's scroll scrub, as pure maths (MVBOLD-29). Motion.astro owns
// the DOM; everything here is a function of numbers so it can be tested
// without a browser.

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** At most 24 swaps a second, film rate. It was 12 with the scrub jumping
 * straight to the target frame, which made a scroll flick skip several poses
 * at once and read as rigid; nextFrame now plays through the in-between
 * frames, so each swap is a small step and can come faster. */
export const MIN_SWAP_MS = 1000 / 24;

/** A jump of any size settles within roughly this many swaps at its start:
 * each step covers 1/CATCH_UP of the remaining gap, so a big jump runs fast
 * and eases out, and a small one plays frame by frame. */
const CATCH_UP = 6;

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

/** The next frame to show on the way from `shown` to `target`: one step that
 * covers a sixth of the gap (at least one frame), landing on the furthest
 * loaded frame within that step, or on the first loaded frame beyond it if the
 * step falls in a gap that has not loaded. Holds `shown` if nothing between it
 * and the target is loaded, so a missing frame never keeps the scrub busy.
 * shown < 0 means nothing of this set is on screen yet (after a set change):
 * take the loaded frame nearest the target. */
export function nextFrame(shown: number, target: number, loaded: ReadonlySet<number>, n: number): number {
  if (shown < 0) return nearestLoaded(target, loaded, n);
  if (target === shown) return shown;
  const dir = Math.sign(target - shown);
  const step = Math.max(1, Math.ceil(Math.abs(target - shown) / CATCH_UP));
  const goal = shown + dir * step;
  for (let i = goal; i !== shown; i -= dir) if (loaded.has(i)) return i;
  for (let i = goal + dir; dir > 0 ? i <= target : i >= target; i += dir) if (loaded.has(i)) return i;
  return shown;
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
