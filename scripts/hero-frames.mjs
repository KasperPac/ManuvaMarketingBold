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
