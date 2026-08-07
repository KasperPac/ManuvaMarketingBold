import { execFileSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { extractText, toPhrases, toShortFragments } from './extract.js';
import { evaluateRoute, routeStatus } from './compare.js';

// Overridable so the gate isn't bound to one machine's checkout path.
const OLD_REPO = process.env.PARITY_OLD_REPO || 'C:/dev/ManuvaMarketing';
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

const args = process.argv.slice(2);
const requireAll = args.includes('--require-all');
const only = args.find((a) => a !== '--require-all');

let failed = 0;
let checked = 0;
let skipped = 0;

for (const [route, oldPath, newPath] of ROUTES) {
  if (only && only !== route) continue;

  const status = routeStatus(existsSync(newPath), requireAll);

  if (status === 'missing') {
    failed++;
    console.error(`\nFAIL ${route} — ${newPath} does not exist and --require-all is set.`);
    continue;
  }

  if (status === 'skipped') {
    skipped++;
    console.log(`- ${route}  not built yet, skipped`);
    continue;
  }

  checked++;

  const oldText = extractText(readOld(oldPath));
  const oldPhrases = toPhrases(oldText);
  const oldFragments = toShortFragments(oldText);

  const newTextRaw = extractText(readFileSync(newPath, 'utf8'));
  const newText = newTextRaw.toLowerCase();
  const newFragments = toShortFragments(newTextRaw);

  const ignoreList = ignore[route] || [];
  const result = evaluateRoute({ oldPhrases, oldFragments, newText, newFragments, ignoreList });

  const problems = result.missingPhrases.length || result.decreasedFragments.length || result.staleEntries.length;

  if (problems) {
    failed++;
    console.error(`\nFAIL ${route}`);

    if (result.missingPhrases.length) {
      console.error(`  ${result.missingPhrases.length} of ${oldPhrases.length} source phrases missing:`);
      for (const m of result.missingPhrases.slice(0, 40)) console.error(`    · ${m}`);
      if (result.missingPhrases.length > 40) console.error(`    … and ${result.missingPhrases.length - 40} more`);
    }

    if (result.decreasedFragments.length) {
      console.error(`  ${result.decreasedFragments.length} short fragment(s) dropped in count (table verdicts etc.):`);
      for (const d of result.decreasedFragments.slice(0, 40)) {
        console.error(`    · "${d.fragment}" ${d.oldCount} → ${d.newCount}`);
      }
      if (result.decreasedFragments.length > 40) {
        console.error(`    … and ${result.decreasedFragments.length - 40} more`);
      }
    }

    if (result.staleEntries.length) {
      console.error(`  ${result.staleEntries.length} ignore.json entr${result.staleEntries.length === 1 ? 'y' : 'ies'} for this route matched nothing — remove or fix:`);
      for (const s of result.staleEntries) console.error(`    · ${s}`);
    }
  } else {
    console.log(`+ ${route}  ${oldPhrases.length} phrases, ${oldFragments.length} short fragments present`);
  }

  if (result.fired.size) {
    console.log(`  (${result.fired.size} ignore.json entr${result.fired.size === 1 ? 'y' : 'ies'} fired on ${route}:)`);
    for (const [entry, suppressed] of result.fired) {
      console.log(`    · "${entry}" suppressed: ${suppressed.join('; ')}`);
    }
  }
}

console.log(`\nChecked ${checked} route(s), skipped ${skipped}.`);

if (failed) {
  console.error(`\n${failed} page(s) lost content. Move the copy across, or add a reasoned entry to scripts/parity/ignore.json.`);
  process.exit(1);
}
console.log('Copy parity holds.');
