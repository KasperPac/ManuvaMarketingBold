// Pure helpers for scripts/hero-frames.mjs, split out so they can be unit
// tested without ffmpeg or a clip on disk.

/** Left edge of a window winW wide centred on focalX, kept inside srcW. */
export function portraitLeft(srcW, winW, focalX) {
  return Math.round(Math.min(srcW - winW, Math.max(0, focalX - winW / 2)));
}

// ISO BMFF boxes: a 32-bit size (1 means a 64-bit size follows, 0 means "to
// the end") and a four-character type.
function boxes(buf, start, end) {
  const out = [];
  for (let i = start; i + 8 <= end;) {
    let size = buf.readUInt32BE(i);
    let head = 8;
    if (size === 1) { size = Number(buf.readBigUInt64BE(i + 8)); head = 16; }
    else if (size === 0) size = end - i;
    if (size < head || i + size > end) throw new Error(`malformed box at byte ${i}`);
    out.push({ type: buf.toString('latin1', i + 4, i + 8), start: i, body: i + head, end: i + size });
    i += size;
  }
  return out;
}

const child = (buf, box, type) => boxes(buf, box.body, box.end).find((b) => b.type === type);

/** What the hero relies on in an MP4: the first video track's codec and
 * size, its sample (frame) count and keyframe numbers, whether there is an
 * audio track, and whether the index (moov) comes before the media (mdat).
 * Throws on anything that is not an MP4 with a video track. */
export function mp4Info(buf) {
  const top = boxes(buf, 0, buf.length);
  const moov = top.find((b) => b.type === 'moov');
  const mdat = top.find((b) => b.type === 'mdat');
  if (!moov || !mdat) throw new Error('not an MP4: no moov or mdat box');

  let video = null, audio = false;
  for (const trak of boxes(buf, moov.body, moov.end).filter((b) => b.type === 'trak')) {
    const mdia = child(buf, trak, 'mdia');
    const hdlr = mdia && child(buf, mdia, 'hdlr');
    // hdlr: version/flags (4), pre_defined (4), handler type (4).
    const kind = hdlr && buf.toString('latin1', hdlr.body + 8, hdlr.body + 12);
    if (kind === 'soun') audio = true;
    if (kind === 'vide' && !video) video = child(buf, child(buf, mdia, 'minf'), 'stbl');
  }
  if (!video) throw new Error('no video track');

  // stsd: version/flags (4), entry count (4), then the sample entry box,
  // whose body opens with 24 bytes of reserved fields before width and height.
  const stsd = child(buf, video, 'stsd');
  const entry = boxes(buf, stsd.body + 8, stsd.end)[0];
  // stsz: version/flags (4), uniform sample size (4), sample count (4).
  const stsz = child(buf, video, 'stsz');
  const samples = buf.readUInt32BE(stsz.body + 8);
  // stss lists the keyframes (1-based); without it every sample is one.
  const stss = child(buf, video, 'stss');
  const keyframes = stss
    ? Array.from({ length: buf.readUInt32BE(stss.body + 4) }, (_, i) => buf.readUInt32BE(stss.body + 8 + i * 4))
    : Array.from({ length: samples }, (_, i) => i + 1);

  return {
    codec: entry.type,
    width: buf.readUInt16BE(entry.body + 24),
    height: buf.readUInt16BE(entry.body + 26),
    samples,
    keyframes,
    audio,
    faststart: moov.start < mdat.start,
  };
}
