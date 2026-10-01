import { readFileSync, statSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, test } from 'vitest';
import { mp4Info, portraitLeft } from '../../scripts/hero-frames-lib.mjs';

const M = JSON.parse(readFileSync('scripts/hero-frames.json', 'utf8'));
const DIR = 'public/hero/dave';

describe('portraitLeft', () => {
  test('centres the window on the focal point', () => {
    expect(portraitLeft(1920, 500, 610)).toBe(360);
  });

  test('keeps the window inside the source', () => {
    expect(portraitLeft(1920, 500, 100)).toBe(0);
    expect(portraitLeft(1920, 500, 1900)).toBe(1420);
  });
});

describe('mp4Info', () => {
  test('rejects a file that is not an MP4', () => {
    expect(() => mp4Info(Buffer.from('not a video at all, just text'))).toThrow();
  });
});

describe('the committed hero media', () => {
  test('the manifest is the shape the hero relies on', () => {
    expect(M.calm).toBeGreaterThan(0);
    expect(M.calm).toBeLessThan(8);
    expect(M.landscape).toEqual({ width: 1280, height: 720 });
    expect(M.portrait.width).toBe(500);
    expect(M.portrait.height).toBe(1080);
    expect(M.video.gop).toBeLessThanOrEqual(4);
  });

  for (const set of ['l', 'p'] as const) {
    const want = () => (set === 'l' ? M.landscape : M.portrait);

    test(`the ${set} still is the first frame's size, as WebP`, async () => {
      const meta = await sharp(`${DIR}/${set}.webp`).metadata();
      expect(meta.format).toBe('webp');
      expect([meta.width, meta.height]).toEqual([want().width, want().height]);
    });

    test(`the ${set} video is every frame of the clip, seekable, and within budget`, () => {
      const buf = readFileSync(`${DIR}/${set}.mp4`);
      const v = mp4Info(buf);
      expect(v.codec, 'H.264, the one codec every browser decodes').toBe('avc1');
      expect([v.width, v.height]).toEqual([want().width, want().height]);
      expect(v.samples, 'all 192 frames of the 8s clip').toBe(192);
      expect(v.audio, 'no audio track').toBe(false);
      // A seek decodes from the keyframe before it. Short gaps keep that to a
      // few frames, which is what makes scrubbing backwards as smooth as forwards.
      const gaps = v.keyframes.slice(1).map((k: number, i: number) => k - v.keyframes[i]);
      expect(Math.max(...gaps), `keyframes at ${v.keyframes.join(',')}`).toBeLessThanOrEqual(M.video.gop);
      expect(v.faststart, 'moov before mdat').toBe(true);
      const kb = statSync(`${DIR}/${set}.mp4`).size / 1024;
      expect(kb, `${set}.mp4 is ${kb.toFixed(0)} KB`).toBeLessThanOrEqual(M.budgetKB[set]);
    });
  }
});
