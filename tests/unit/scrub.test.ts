import { describe, expect, test } from 'vitest';
import {
  END_HOLD, MIN_SWAP_MS, canSwap, coarseCount, frameAt, loadOrder, nearestLoaded, nextFrame,
} from '../../src/lib/scrub';

const ALL = new Set(Array.from({ length: 48 }, (_, i) => i));

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
  test('allows at most twelve swaps a second, the stop-motion rate', () => {
    // History: 12 a second jumping straight to the target read as rigid (it
    // skipped poses in clumps); 24 a second playing through every frame read
    // as hectic (Dave's mouth flickered on a fast scroll). Now 12 a second,
    // playing through 24 poses: no clumps, and no flicker.
    expect(MIN_SWAP_MS).toBeCloseTo(83.33, 1);
    expect(canSwap(90, 0)).toBe(true);
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

describe('nextFrame', () => {
  test('a small move plays every in-between frame, one swap each', () => {
    expect(nextFrame(10, 14, ALL, 48)).toBe(11);
    expect(nextFrame(14, 10, ALL, 48)).toBe(13);
  });

  test('stays put at the target', () => {
    expect(nextFrame(20, 20, ALL, 48)).toBe(20);
  });

  test('a big jump catches up quickly, easing out, and never overshoots', () => {
    const path = [0];
    while (path[path.length - 1] !== 47 && path.length < 100) path.push(nextFrame(path[path.length - 1], 47, ALL, 48));
    expect(path[path.length - 1]).toBe(47);
    expect(path.length - 1, `took ${path.length - 1} swaps: ${path.join(',')}`).toBeLessThanOrEqual(20);
    const steps = path.slice(1).map((f, i) => f - path[i]);
    expect(steps.every((s) => s >= 1), 'never stands still or goes backwards on the way').toBe(true);
    for (let i = 1; i < steps.length; i++) expect(steps[i]).toBeLessThanOrEqual(steps[i - 1]);
  });

  test('steps over frames that have not loaded yet', () => {
    expect(nextFrame(0, 16, new Set([0, 8, 16]), 48)).toBe(8);
    expect(nextFrame(16, 0, new Set([0, 8, 16]), 48)).toBe(8);
  });

  test('holds the frame it has when nothing toward the target is loaded', () => {
    expect(nextFrame(0, 10, new Set([0]), 48)).toBe(0);
  });

  test('after a set change, takes the nearest loaded frame to the target', () => {
    expect(nextFrame(-1, 10, new Set([8, 16]), 48)).toBe(8);
    expect(nextFrame(-1, 10, new Set(), 48)).toBe(-1);
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
