// The Dave hero's scroll scrub, as pure maths (MVBOLD-29). Motion.astro owns
// the DOM; everything here is a function of numbers so it can be tested
// without a browser.
//
// The scrub seeks a video rather than stepping a set of stills. Three image
// rates were tried on the preview: 48 poses at 24 a second let Dave's mouth
// flicker and read as hectic; 24 poses at 12 a second still moved two poses at
// once on a single wheel notch, with no ease in or out. An A/B of stills,
// cross-fades and the clip itself chose the clip: every frame, so a notch
// is a short eased run rather than a cut.

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** The share of the scroll, at the end, that holds the last frame before the
 * pin releases. Without it the calm room arrives on the very last pixel and
 * leaves on the next one. */
export const END_HOLD = 0.1;

/** How far short of the clip's end the scrub stops, in seconds. The end
 * itself is past the last frame (at 24 fps the last frame is 7.958s–8s), and
 * a seek there can land on an ended, blank element. */
export const END_PAD = 0.02;

/** The scrub's own follow, in ms (Motion.astro's damp, with its own time
 * constant). The A/B's video option used 160ms, slower than the page's 90ms,
 * and that is the feel that was picked. */
export const SCRUB_TAU = 160;

/** The time to show at scroll progress p (0..1) through a clip `duration`
 * seconds long. 0 for a clip whose length is not known yet. */
export function timeAt(p: number, duration: number, hold = END_HOLD): number {
  if (!(duration > END_PAD)) return 0;
  return clamp01(p / (1 - hold)) * (duration - END_PAD);
}

/** Whether the shown time is far enough from the target to be worth a seek.
 * Within a sixtieth of a second it is the same frame or the next one, and
 * seeking anyway would keep the loop awake chasing rounding. */
export function needsSeek(current: number, target: number): boolean {
  return Math.abs(current - target) > 1 / 60;
}
