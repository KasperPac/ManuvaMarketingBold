import { expect, test } from 'vitest';
import {
  diffPhrases,
  diffShortFragments,
  diffTableRows,
  evaluateRoute,
  routeStatus,
} from '../../scripts/parity/compare.js';

test('diffPhrases reports old phrases absent from the new page text', () => {
  const oldPhrases = ['Flat pricing that never charges per seat.', 'Unlimited users on Growth and above.'];
  const newText = 'flat pricing that never charges per seat.'; // second phrase missing
  const { missing } = diffPhrases(oldPhrases, newText, []);
  expect(missing).toEqual(['Unlimited users on Growth and above.']);
});

test('an ignore entry that is only a fragment of a phrase no longer swallows the whole phrase', () => {
  // Regression: the old substring-based match let a short ignore entry ("3 months of
  // Pro") suppress every missing phrase that merely contained it, including unrelated
  // ones. Matching is now exact against the whole normalised phrase.
  const oldPhrases = ['Beta testers get 3 months of Pro for free.', 'Unlimited users on Growth and above.'];
  const { missing } = diffPhrases(oldPhrases, '', ['3 months of Pro']);
  expect(missing).toEqual(['Beta testers get 3 months of Pro for free.', 'Unlimited users on Growth and above.']);
});

test('an ignore entry suppresses only the phrase it exactly matches, and is recorded as fired', () => {
  const oldPhrases = ['Beta testers get 3 months of Pro for free.', 'Unlimited users on Growth and above.'];
  const { missing, fired } = diffPhrases(oldPhrases, '', ['Beta testers get 3 months of Pro for free.']);
  expect(missing).toEqual(['Unlimited users on Growth and above.']);
  expect(fired.get('Beta testers get 3 months of Pro for free.')).toEqual([
    'Beta testers get 3 months of Pro for free.',
  ]);
});

test('ignore matching is case-insensitive and normalises smart quotes/whitespace like extractText does', () => {
  const oldPhrases = [`Manuva’s   pricing is flat, not per seat.`];
  const { missing, fired } = diffPhrases(oldPhrases, '', [`manuva's pricing is flat, not per seat.`]);
  expect(missing).toEqual([]);
  expect(fired.size).toBe(1);
});

test('diffShortFragments reports fragments whose count decreased between old and new', () => {
  const oldFragments = ['Yes', 'Yes', 'No', 'Yes'];
  const newFragments = ['Yes', 'No'];
  const { decreased } = diffShortFragments(oldFragments, newFragments, []);
  expect(decreased).toEqual([{ fragment: 'yes', oldCount: 3, newCount: 1 }]);
});

test('diffShortFragments does not flag a fragment whose count held steady or grew', () => {
  const oldFragments = ['Yes', 'No'];
  const newFragments = ['Yes', 'Yes', 'No', 'No'];
  const { decreased } = diffShortFragments(oldFragments, newFragments, []);
  expect(decreased).toEqual([]);
});

test('an ignore entry suppresses a specific decreased fragment', () => {
  const oldFragments = ['Yes', 'Yes', 'Yes'];
  const newFragments = ['Yes'];
  const { decreased, fired } = diffShortFragments(oldFragments, newFragments, ['yes']);
  expect(decreased).toEqual([]);
  expect(fired.has('yes')).toBe(true);
});

test('evaluateRoute flags an ignore entry that matches nothing on the route as stale', () => {
  const result = evaluateRoute({
    oldPhrases: ['Unlimited users on Growth and above.'],
    oldFragments: ['Yes'],
    newText: 'unlimited users on growth and above.',
    newFragments: ['Yes'],
    ignoreList: ['A stat that no longer appears anywhere.'],
  });
  expect(result.staleEntries).toEqual(['A stat that no longer appears anywhere.']);
});

test('evaluateRoute does not flag an ignore entry that actually fired as stale', () => {
  const result = evaluateRoute({
    oldPhrases: ['Beta testers get 3 months of Pro for free.'],
    oldFragments: [],
    newText: '',
    newFragments: [],
    ignoreList: ['Beta testers get 3 months of Pro for free.'],
  });
  expect(result.missingPhrases).toEqual([]);
  expect(result.staleEntries).toEqual([]);
});

test('evaluateRoute passes cleanly when nothing is missing, decreased, or stale', () => {
  const result = evaluateRoute({
    oldPhrases: ['Unlimited users on Growth and above.'],
    oldFragments: ['Yes'],
    newText: 'unlimited users on growth and above.',
    newFragments: ['Yes'],
    ignoreList: [],
  });
  expect(result.missingPhrases).toEqual([]);
  expect(result.decreasedFragments).toEqual([]);
  expect(result.staleEntries).toEqual([]);
});

test('routeStatus: a missing dist file is skipped by default, and a required failure with --require-all', () => {
  expect(routeStatus(false, false)).toBe('skipped');
  expect(routeStatus(false, true)).toBe('missing');
  expect(routeStatus(true, false)).toBe('checked');
  expect(routeStatus(true, true)).toBe('checked');
});

// --- Fix round 2: the multiset tier is position-blind; keyed row comparison fixes it ---

test('diffTableRows reports a row present in old but absent from new, keyed by name not position', () => {
  const oldRows = [{ name: 'BOM versioning', verdicts: ['Yes', 'No'] }];
  const newRows = [];
  const { missingRows } = diffTableRows(oldRows, newRows);
  expect(missingRows).toEqual([{ name: 'BOM versioning', oldVerdicts: ['Yes', 'No'] }]);
});

test('diffTableRows catches a verdict swap between two rows that a page-wide count would miss', () => {
  // The reviewer's construction: old ['Yes','No'] / new ['No','Yes'] across two rows keeps
  // the page-wide tally at 1 Yes + 1 No either way, so diffShortFragments alone sees no
  // decrease. Comparing row-by-row catches it because each row is judged against its own
  // past self, not the page's aggregate counts.
  const oldRows = [
    { name: 'Row A', verdicts: ['Yes'] },
    { name: 'Row B', verdicts: ['No'] },
  ];
  const newRows = [
    { name: 'Row A', verdicts: ['No'] },
    { name: 'Row B', verdicts: ['Yes'] },
  ];
  const { changedRows } = diffTableRows(oldRows, newRows);
  expect(changedRows).toEqual([
    { name: 'Row A', oldVerdicts: ['Yes'], newVerdicts: ['No'] },
    { name: 'Row B', oldVerdicts: ['No'], newVerdicts: ['Yes'] },
  ]);
});

test('diffTableRows does not fire when a table is legitimately reordered but every row keeps its verdicts', () => {
  const oldRows = [
    { name: 'Row A', verdicts: ['Yes'] },
    { name: 'Row B', verdicts: ['No'] },
  ];
  const newRows = [
    { name: 'Row B', verdicts: ['No'] },
    { name: 'Row A', verdicts: ['Yes'] },
  ];
  const result = diffTableRows(oldRows, newRows);
  expect(result.missingRows).toEqual([]);
  expect(result.changedRows).toEqual([]);
  expect(result.columnCountChanges).toEqual([]);
});

test('diffTableRows reports a column-count change separately from (but alongside) a value change', () => {
  const oldRows = [{ name: 'API access', verdicts: ['No', 'No', 'Yes'] }];
  const newRows = [{ name: 'API access', verdicts: ['No', 'Yes'] }];
  const result = diffTableRows(oldRows, newRows);
  expect(result.columnCountChanges).toEqual([{ name: 'API access', oldCount: 3, newCount: 2 }]);
  expect(result.changedRows).toEqual([
    { name: 'API access', oldVerdicts: ['No', 'No', 'Yes'], newVerdicts: ['No', 'Yes'] },
  ]);
});

test('diffTableRows matches the row key and compares verdicts case-insensitively', () => {
  const oldRows = [{ name: 'BOM Versioning', verdicts: ['YES'] }];
  const newRows = [{ name: 'bom versioning', verdicts: ['yes'] }];
  const result = diffTableRows(oldRows, newRows);
  expect(result.missingRows).toEqual([]);
  expect(result.changedRows).toEqual([]);
});

test('evaluateRoute folds table results in alongside the phrase and fragment tiers', () => {
  const result = evaluateRoute({
    oldPhrases: [],
    oldFragments: [],
    newText: '',
    newFragments: [],
    ignoreList: [],
    oldTableRows: [{ name: 'BOM versioning', verdicts: ['Yes'] }],
    newTableRows: [],
  });
  expect(result.missingRows).toEqual([{ name: 'BOM versioning', oldVerdicts: ['Yes'] }]);
  expect(result.changedRows).toEqual([]);
  expect(result.columnCountChanges).toEqual([]);
});

// --- Fix round 3: duplicate row names last-write-win, and zero-verdict dividers false-fail ---

test('diffTableRows catches a deleted row even when another row shares its exact name and verdicts', () => {
  // Regression: a one-to-one Map keyed by name is last-write-wins, so two old "Free trial"
  // rows reading "14 days" against a single surviving new one previously reported nothing —
  // the survivor silently answered for the deleted row.
  const oldRows = [
    { name: 'Free trial', verdicts: ['14 days'] },
    { name: 'Free trial', verdicts: ['14 days'] },
  ];
  const newRows = [{ name: 'Free trial', verdicts: ['14 days'] }];
  const { missingRows } = diffTableRows(oldRows, newRows);
  expect(missingRows).toEqual([{ name: 'Free trial', oldVerdicts: ['14 days'] }]);
});

test('diffTableRows does not fire when duplicate-named rows are merely reordered relative to each other', () => {
  const oldRows = [
    { name: 'Free trial', verdicts: ['14 days'] },
    { name: 'Free trial', verdicts: ['30 days'] },
  ];
  const newRows = [
    { name: 'Free trial', verdicts: ['30 days'] },
    { name: 'Free trial', verdicts: ['14 days'] },
  ];
  const result = diffTableRows(oldRows, newRows);
  expect(result.missingRows).toEqual([]);
  expect(result.changedRows).toEqual([]);
});

test('diffTableRows does not report a missing row for a zero-verdict divider/label row', () => {
  // The old pricing matrix has 9 <tr class="module-row"><td colspan="5">Section Name</td></tr>
  // rows with a single spanning cell and no verdicts. Task 8 renders that section heading as
  // an <h3> outside the table, which is a legitimate restructuring, not content loss — the
  // divider's own text still flows through toShortFragments() independently (verified against
  // the real page: all 9 divider strings appear there, unrelated to the table tier).
  const oldRows = [
    { name: 'Shopify Integration', verdicts: [] },
    { name: 'Product sync', verdicts: ['Yes', 'Yes'] },
  ];
  const newRows = [{ name: 'Product sync', verdicts: ['Yes', 'Yes'] }];
  const result = diffTableRows(oldRows, newRows);
  expect(result.missingRows).toEqual([]);
  expect(result.changedRows).toEqual([]);
});

test('a zero-verdict row that gains verdicts in the new build is not reported as changed, only as content that appeared', () => {
  const oldRows = [{ name: 'Shopify Integration', verdicts: [] }];
  const newRows = [{ name: 'Shopify Integration', verdicts: ['Yes'] }];
  const result = diffTableRows(oldRows, newRows);
  expect(result.changedRows).toEqual([]);
});
