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
