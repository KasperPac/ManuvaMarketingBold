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
