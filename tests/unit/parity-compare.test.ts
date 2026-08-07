import { expect, test } from 'vitest';
import { diffPhrases, diffShortFragments, evaluateRoute, routeStatus } from '../../scripts/parity/compare.js';

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
