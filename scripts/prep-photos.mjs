// Prepare generated photos for the site: crop off the generator watermark,
// resize, and convert to JPEG.
//
// Usage:  node scripts/prep-photos.mjs [--keep-bottom]
//
// Reads every *.png in public/photos/ and writes a *.jpg beside it. The PNGs
// stay put — they are the originals and are git-ignored; the JPEGs are what
// ships.
//
// WHY THE CROP. Google's image models stamp a four-pointed sparkle into the
// bottom-right corner. It is baked into the pixel data, not metadata, so it
// cannot be stripped — only cropped out. Measured on a real generation it sits
// at roughly 83% down and 89% across, and it survives the tile crop: a platform
// tile only trims 8.6% off top and bottom. Dropping the bottom 20% removes it
// and, at tile scale, costs only floor and bench edge rather than subject.
//
// Pass --keep-bottom if your images come from a tier that does not stamp
// (the API and paid tiers generally do not) — there is no reason to throw away
// a fifth of the frame if there is nothing to remove.
import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'node:fs';

// Originals live OUTSIDE public/. Everything under public/ is the web root and
// gets copied verbatim into dist/ — with the 16 PNGs in there the build output
// was 126MB against 1.8MB of actual site. They are git-ignored so a deploy from
// a clean clone never had them, but a local `npm run build` did, and anything
// dropped in public/ by habit would ship.
const SRC = 'photo-originals';
const OUT = 'public/photos';
const KEEP_BOTTOM = process.argv.includes('--keep-bottom');
// 1600x1000 is what public/photos/README.md specifies: enough for a
// full-strength sector card, and far more than a 16%-opacity tile needs.
const OUT_W = 1600, OUT_H = 1000;
const MAX_KB = 200;

if (!existsSync(SRC)) {
  console.error(`no ${SRC}/ directory — put the generator's PNGs there, not in public/`);
  process.exit(1);
}

const pngs = readdirSync(SRC).filter((f) => f.toLowerCase().endsWith('.png')).sort();
if (!pngs.length) {
  console.log(`no PNGs in ${SRC} — nothing to do`);
  process.exit(0);
}

let over = 0;
for (const f of pngs) {
  const src = `${SRC}/${f}`;
  const out = `${OUT}/${f.replace(/\.png$/i, '.jpg')}`;
  const { width, height } = await sharp(src).metadata();

  let pipeline = sharp(src);
  if (!KEEP_BOTTOM) {
    pipeline = pipeline.extract({ left: 0, top: 0, width, height: Math.round(height * 0.8) });
  }
  await pipeline
    .resize({ width: OUT_W, height: OUT_H, fit: 'cover', position: 'centre' })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(out);

  const kb = statSync(out).size / 1024;
  if (kb > MAX_KB) over++;
  console.log(
    `${f.replace(/\.png$/i, '').padEnd(24)} ${`${width}x${height}`.padEnd(11)} -> ${`${kb.toFixed(0)}KB`.padStart(7)}${kb > MAX_KB ? '  OVER BUDGET' : ''}`,
  );
}

console.log(`\n${pngs.length} converted${KEEP_BOTTOM ? ' (bottom kept)' : ', bottom 20% cropped'}`);
if (over) console.log(`${over} over the ${MAX_KB}KB budget — drop the quality or the dimensions`);
console.log('\nCheck the corners before shipping: a watermark that survives is invisible');
console.log('at 16% on a platform tile but obvious on a full-strength sector card.');
