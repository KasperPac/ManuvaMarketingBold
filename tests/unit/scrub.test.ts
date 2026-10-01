import { describe, expect, test } from 'vitest';
import { END_HOLD, END_PAD, SCRUB_TAU, needsSeek, timeAt } from '../../src/lib/scrub';

describe('timeAt', () => {
  test('starts at the first frame and ends on the last one', () => {
    expect(timeAt(0, 8)).toBe(0);
    expect(timeAt(1, 8)).toBeCloseTo(8 - END_PAD, 6);
  });

  test('never asks for the very end of the clip, which is past its last frame', () => {
    // At 24 fps the last frame starts at 191/24 = 7.958s.
    expect(END_PAD).toBeGreaterThan(0);
    expect(timeAt(1, 8)).toBeGreaterThanOrEqual(191 / 24);
    expect(timeAt(1, 8)).toBeLessThan(8);
  });

  test('holds the last frame for the final stretch of the scroll', () => {
    expect(END_HOLD).toBe(0.1);
    expect(timeAt(0.9, 8)).toBeCloseTo(timeAt(1, 8), 6);
    expect(timeAt(0.95, 8)).toBeCloseTo(timeAt(1, 8), 6);
    expect(timeAt(0.89, 8)).toBeLessThan(timeAt(1, 8));
  });

  test('is linear through the travel', () => {
    expect(timeAt(0.45, 8)).toBeCloseTo((8 - END_PAD) / 2, 6);
  });

  test('clamps progress outside 0..1', () => {
    expect(timeAt(-0.2, 8)).toBe(0);
    expect(timeAt(1.5, 8)).toBeCloseTo(8 - END_PAD, 6);
  });

  test('has nothing to seek in a clip with no length yet', () => {
    expect(timeAt(0.5, 0)).toBe(0);
    expect(timeAt(0.5, Number.NaN)).toBe(0);
  });
});

describe('needsSeek', () => {
  test('seeks when the shown time is more than a sixtieth of a second off', () => {
    expect(needsSeek(2, 2.1)).toBe(true);
    expect(needsSeek(2.1, 2)).toBe(true);
  });

  test('leaves a time that is already close enough alone, so the loop can settle', () => {
    expect(needsSeek(2, 2)).toBe(false);
    expect(needsSeek(2, 2 + 1 / 100)).toBe(false);
  });
});

describe('SCRUB_TAU', () => {
  // The follow the visitor picked in the A/B (option B): slower than the
  // page's 90ms, so one wheel notch plays out as a short eased run of frames
  // rather than landing two poses away at once.
  test('is the 160ms follow from the A/B', () => {
    expect(SCRUB_TAU).toBe(160);
  });
});
