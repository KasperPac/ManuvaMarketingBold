// Cut the Dave hero's media from the transformation clip (MVBOLD-29).
//
// Usage:  npm run hero:frames [-- path/to/clip.mp4]
//
// The clip is generated in Google Flow and lives untracked in the sibling
// MarketingAndPromotion repo, so Vercel never sees it. Run this by hand and
// commit public/hero/dave/. Needs ffmpeg on PATH.
//
// Two shapes, because one crop cannot serve both shapes of screen:
//   l  the full 16:9 frame at 1280x720, the clip's native generation size
//      (the 1080p download is an upscale, so going bigger adds bytes only)
//   p  a 500x1080 window from the full-height 1080p frame, centred on Dave,
//      for portrait phones
// and two files per shape:
//   <set>.webp  the first frame, the LCP image and the reduced-motion still
//   <set>.mp4   the first M.frames frames, which the scroll scrubs
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { mp4Info, portraitLeft } from './hero-frames-lib.mjs';

const M = JSON.parse(readFileSync('scripts/hero-frames.json', 'utf8'));
const clip = process.argv[2] ?? M.clip;
if (!existsSync(clip)) {
  console.error(`no clip at ${clip}`);
  process.exit(1);
}

const OUT = 'public/hero/dave';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const tmp = mkdtempSync(join(tmpdir(), 'hero-frames-'));
const first = join(tmp, 'first.png');
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', clip, '-frames:v', '1', first]);
const { width, height } = await sharp(first).metadata();

// The clips' first frames (T1 and T2 alike) carry a few rows of black along
// the top, which read as a dark line across the hero (MVBOLD-31). M.trim rows come off the top and
// bottom of both shapes, and the width follows to keep each aspect.
const T = M.trim ?? 0;
const h = height - 2 * T;
const lw = Math.round((h * M.landscape.width) / M.landscape.height);
const lx = Math.round((width - lw) / 2);
const winW = Math.round((h * M.portrait.width) / M.portrait.height);
const left = portraitLeft(width, winW, Math.round((M.portrait.focalX * width) / 1920));
const crop = {
  l: {
    still: (s) => s.extract({ left: lx, top: T, width: lw, height: h }),
    vf: `crop=${lw}:${h}:${lx}:${T},scale=${M.landscape.width}:${M.landscape.height}`,
  },
  p: {
    still: (s) => s.extract({ left, top: T, width: winW, height: h }),
    vf: `crop=${winW}:${h}:${left}:${T},scale=${M.portrait.width}:${M.portrait.height}`,
  },
};

let bad = false;
for (const set of ['l', 'p']) {
  const want = set === 'l' ? M.landscape : M.portrait;
  await crop[set].still(sharp(first))
    .resize(want.width, want.height)
    .webp({ quality: M.poster.quality })
    .toFile(join(OUT, `${set}.webp`));

  // -g sets the keyframe spacing: a seek decodes from the keyframe before it,
  // so a short gap is what keeps a backwards scrub as smooth as a forwards one.
  // yuv420p and no audio: the profile every browser decodes, and nothing to mute.
  // -frames:v cuts the clip at its settled last pose, which the scrub holds.
  const mp4 = join(OUT, `${set}.mp4`);
  execFileSync('ffmpeg', [
    '-v', 'error', '-y', '-i', clip, '-vf', crop[set].vf, '-an', '-frames:v', String(M.frames),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(M.video.crf), '-g', String(M.video.gop),
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4,
  ]);

  const v = mp4Info(readFileSync(mp4));
  const kb = statSync(mp4).size / 1024;
  console.log(`${set}: ${v.width}x${v.height}, ${v.samples} frames, ${kb.toFixed(0)} KB (budget ${M.budgetKB[set]} KB)`);
  if (v.width !== want.width || v.height !== want.height) {
    console.error(`${set}.mp4 is ${v.width}x${v.height}, expected ${want.width}x${want.height}`);
    bad = true;
  }
  if (kb > M.budgetKB[set]) {
    console.error(`${set}.mp4 is over budget: raise "video.crf" in scripts/hero-frames.json and rerun`);
    bad = true;
  }
}
rmSync(tmp, { recursive: true, force: true });
process.exit(bad ? 1 : 0);
