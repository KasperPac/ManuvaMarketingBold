import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { extractText, toPhrases } from './extract.js';

const OLD_REPO = 'C:/dev/ManuvaMarketing';
const ROUTES = [
  ['/', 'index.html', 'dist/index.html'],
  ['/features', 'features.html', 'dist/features.html'],
  ['/pricing', 'pricing.html', 'dist/pricing.html'],
  ['/about', 'about.html', 'dist/about.html'],
  ['/alternatives/katana', 'alternatives/katana.html', 'dist/alternatives/katana.html'],
  ['/alternatives/mrpeasy', 'alternatives/mrpeasy.html', 'dist/alternatives/mrpeasy.html'],
  ['/privacy', 'privacy.html', 'dist/privacy.html'],
  ['/terms', 'terms.html', 'dist/terms.html'],
];

const ignore = JSON.parse(readFileSync(new URL('./ignore.json', import.meta.url), 'utf8'));

const readOld = (path) =>
  execFileSync('git', ['-C', OLD_REPO, 'show', `origin/master:${path}`], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });

let failed = 0;
const only = process.argv[2];

for (const [route, oldPath, newPath] of ROUTES) {
  if (only && only !== route) continue;

  if (!existsSync(newPath)) {
    console.log(`- ${route}  not built yet, skipped`);
    continue;
  }

  const oldPhrases = toPhrases(extractText(readOld(oldPath)));
  const newText = extractText(readFileSync(newPath, 'utf8')).toLowerCase();
  const allowed = (ignore[route] || []).map((s) => s.toLowerCase());

  const missing = oldPhrases.filter((p) => {
    const needle = p.toLowerCase();
    if (newText.includes(needle)) return false;
    return !allowed.some((a) => needle.includes(a));
  });

  if (missing.length) {
    failed++;
    console.error(`\nFAIL ${route} — ${missing.length} of ${oldPhrases.length} source phrases missing:`);
    for (const m of missing.slice(0, 40)) console.error(`  · ${m}`);
    if (missing.length > 40) console.error(`  … and ${missing.length - 40} more`);
  } else {
    console.log(`+ ${route}  ${oldPhrases.length} phrases present`);
  }
}

if (failed) {
  console.error(`\n${failed} page(s) lost content. Move the copy across, or add a reasoned entry to scripts/parity/ignore.json.`);
  process.exit(1);
}
console.log('\nCopy parity holds.');
