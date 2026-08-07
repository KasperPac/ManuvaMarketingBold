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

function tableRowKey(name) {
  return normalise(name).toLowerCase();
}

// Tier 3: table rows, keyed by their own first cell (feature/provider/version name)
// rather than by position. Neither tier 1 nor tier 2 can tell a swapped verdict from
// an unchanged page: a multiset sees old ['Yes','No'] / new ['No','Yes'] as the same
// 1-Yes-1-No either way. Comparing each row against its past self — by name, not by
// row index — catches a swap, and also survives the new site legitimately reordering
// or restyling the table, since nothing here depends on where the row sits.
export function diffTableRows(oldRows, newRows) {
  const newByKey = new Map(newRows.map((row) => [tableRowKey(row.name), row]));
  const missingRows = [];
  const changedRows = [];
  const columnCountChanges = [];

  for (const oldRow of oldRows) {
    const newRow = newByKey.get(tableRowKey(oldRow.name));
    if (!newRow) {
      missingRows.push({ name: oldRow.name, oldVerdicts: oldRow.verdicts });
      continue;
    }

    const sameLength = oldRow.verdicts.length === newRow.verdicts.length;
    if (!sameLength) {
      columnCountChanges.push({
        name: oldRow.name,
        oldCount: oldRow.verdicts.length,
        newCount: newRow.verdicts.length,
      });
    }

    const sameValues =
      sameLength && oldRow.verdicts.every((v, i) => v.toLowerCase() === newRow.verdicts[i].toLowerCase());
    if (!sameValues) {
      changedRows.push({ name: oldRow.name, oldVerdicts: oldRow.verdicts, newVerdicts: newRow.verdicts });
    }
  }

  return { missingRows, changedRows, columnCountChanges };
}

// Runs all three tiers for one route and flags ignore.json entries that suppressed
// nothing at all ("stale") — an entry that protects nothing is how these files
// silently rot into permission to lose content. Table rows aren't run against
// ignore.json — the table tier reports structural differences (a row, a swap, a
// column count), and "this specific row is allowed to differ" isn't a shape
// ignore.json's flat phrase list currently expresses; revisit if that's needed.
export function evaluateRoute({
  oldPhrases,
  oldFragments,
  newText,
  newFragments,
  ignoreList,
  oldTableRows = [],
  newTableRows = [],
}) {
  const phraseResult = diffPhrases(oldPhrases, newText, ignoreList);
  const fragmentResult = diffShortFragments(oldFragments, newFragments, ignoreList);
  const tableResult = diffTableRows(oldTableRows, newTableRows);
  const fired = mergeFired(phraseResult.fired, fragmentResult.fired);
  const staleEntries = ignoreList.filter((entry) => !fired.has(entry));

  return {
    missingPhrases: phraseResult.missing,
    decreasedFragments: fragmentResult.decreased,
    missingRows: tableResult.missingRows,
    changedRows: tableResult.changedRows,
    columnCountChanges: tableResult.columnCountChanges,
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
