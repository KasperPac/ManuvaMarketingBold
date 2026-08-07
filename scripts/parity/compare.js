// Pure diffing logic for the copy-parity gate, kept free of file/git I/O so it can
// be unit tested with small string fixtures instead of the real old site.
import { normalise } from './extract.js';

function normaliseIgnoreEntry(entry) {
  return normalise(entry).toLowerCase();
}

export function countFragments(fragments) {
  const counts = new Map();
  for (const f of fragments) {
    const key = normalise(f).toLowerCase();
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return counts;
}

// Tier 1: sentence-ish prose phrases. An old phrase is "present" if it appears
// anywhere in the new page's flattened text — exact placement/wrapping doesn't
// matter, only that the content survived. ignoreList entries must equal the whole
// missing phrase exactly (after the same normalisation), not just a substring of
// it — a substring match let one short entry silently swallow unrelated phrases.
export function diffPhrases(oldPhrases, newText, ignoreList) {
  const normalisedIgnore = ignoreList.map(normaliseIgnoreEntry);
  const missing = [];
  const fired = new Map();

  for (const phrase of oldPhrases) {
    const needle = normalise(phrase).toLowerCase();
    if (newText.includes(needle)) continue;

    const idx = normalisedIgnore.indexOf(needle);
    if (idx !== -1) {
      const entry = ignoreList[idx];
      if (!fired.has(entry)) fired.set(entry, []);
      fired.get(entry).push(phrase);
      continue;
    }
    missing.push(phrase);
  }

  return { missing, fired };
}

// Tier 2: the short fragments (2-24 chars) toPhrases() drops — table-cell verdicts
// like "Yes" / "No" / "Limited" on the /alternatives/ comparison tables. Presence
// alone isn't enough here (a page legitimately says "Yes" a dozen times); a drop in
// how many times a fragment appears is the signal, e.g. one flipped or deleted row.
export function diffShortFragments(oldFragments, newFragments, ignoreList) {
  const normalisedIgnore = ignoreList.map(normaliseIgnoreEntry);
  const oldCounts = countFragments(oldFragments);
  const newCounts = countFragments(newFragments);
  const decreased = [];
  const fired = new Map();

  for (const [fragment, oldCount] of oldCounts) {
    const newCount = newCounts.get(fragment) || 0;
    if (newCount >= oldCount) continue;

    const idx = normalisedIgnore.indexOf(fragment);
    if (idx !== -1) {
      const entry = ignoreList[idx];
      if (!fired.has(entry)) fired.set(entry, []);
      fired.get(entry).push(`"${fragment}" ${oldCount} -> ${newCount}`);
      continue;
    }
    decreased.push({ fragment, oldCount, newCount });
  }

  return { decreased, fired };
}

function mergeFired(a, b) {
  const merged = new Map(a);
  for (const [entry, items] of b) {
    merged.set(entry, [...(merged.get(entry) || []), ...items]);
  }
  return merged;
}

// Runs both tiers for one route and flags ignore.json entries that suppressed
// nothing at all ("stale") — an entry that protects nothing is how these files
// silently rot into permission to lose content.
export function evaluateRoute({ oldPhrases, oldFragments, newText, newFragments, ignoreList }) {
  const phraseResult = diffPhrases(oldPhrases, newText, ignoreList);
  const fragmentResult = diffShortFragments(oldFragments, newFragments, ignoreList);
  const fired = mergeFired(phraseResult.fired, fragmentResult.fired);
  const staleEntries = ignoreList.filter((entry) => !fired.has(entry));

  return {
    missingPhrases: phraseResult.missing,
    decreasedFragments: fragmentResult.decreased,
    fired,
    staleEntries,
  };
}

// Without --require-all, a route with no built dist/ file yet is skipped (Tasks
// 7-12 need this). With it, a missing file is a failure — the state that should
// hold once every page is expected to exist.
export function routeStatus(exists, requireAll) {
  if (exists) return 'checked';
  return requireAll ? 'missing' : 'skipped';
}
