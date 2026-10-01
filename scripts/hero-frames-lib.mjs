// Pure helpers for scripts/hero-frames.mjs, split out so they can be unit
// tested without ffmpeg or a clip on disk.

/** Evenly spaced timestamps from inS to outS. The last one is pulled back by
 * `tail` seconds so it lands on a real frame instead of past the end of the
 * stream, which ffmpeg answers with no output at all. */
export function frameTimes(inS, outS, count, tail = 0.05) {
  if (!(count >= 2)) throw new Error(`count must be at least 2, got ${count}`);
  if (!(outS > inS)) throw new Error(`out (${outS}) must be after in (${inS})`);
  const end = outS - tail;
  return Array.from({ length: count }, (_, i) => +(inS + (i * (end - inS)) / (count - 1)).toFixed(4));
}

/** Left edge of a window winW wide centred on focalX, kept inside srcW. */
export function portraitLeft(srcW, winW, focalX) {
  return Math.round(Math.min(srcW - winW, Math.max(0, focalX - winW / 2)));
}
