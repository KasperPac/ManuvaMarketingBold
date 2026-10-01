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
  test('the manifest is the shape the hero relies on', () => {
    // 24 poses: 48 sampled the clip finely enough that Dave's mouth flickered on
    // a fast scroll. Half the poses, half the weight.
    expect(M.count).toBe(24);
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
