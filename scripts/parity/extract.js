import { load } from 'cheerio';

// Chrome that must never count as page content on either side of the comparison.
// header/nav/footer/svg/script/style are the obvious ones. The old site's mobile
// drawer is a <div class="nav-drawer"> sibling of <nav>, not nested inside it — its
// close button and CTAs survived past the original selector list, gluing onto the
// start of the hero copy on any page that falls back to <body> (i.e. index.html,
// which has no <main>). role="dialog" / aria-modal="true" strip it and the new
// site's own drawer (different class, same ARIA pattern) symmetrically; .nav-drawer
// is kept too as a belt-and-suspenders match on the old site's specific wrapper.
const CHROME_SELECTORS = [
  'script',
  'style',
  'noscript',
  'header',
  'nav',
  'footer',
  'svg',
  '[role="dialog"]',
  '[aria-modal="true"]',
  '.nav-drawer',
].join(', ');

// cheerio's .text() concatenates sibling text nodes with no separator, so adjacent
// block elements or table cells glue into one run-on string (e.g. a comparison
// table row becomes "BOM versioningYesNo"). Force a boundary after each of these
// when it has more content following it, using the "|" delimiter toPhrases()
// already splits on, so both the sentence-phrase tier and the short-fragment tier
// see cells and blocks as separate candidates instead of one giant blob.
const BOUNDARY_SELECTORS = [
  'p',
  'div',
  'li',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'section',
  'article',
  'blockquote',
  'ul',
  'ol',
  'dl',
  'dt',
  'dd',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'td',
  'th',
  'pre',
  'hr',
  'figure',
  'figcaption',
].join(', ');

export function normalise(text) {
  return text
    .replace(/ /g, ' ')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

// Verdict cells on the comparison tables are frequently an icon and nothing
// else (the old pricing matrix alone has 117 check-icon cells with no text at
// all). Swap each icon element for a "[icon:name]" text token — using its
// glyph name, not a rendering of it — before it can be stripped as chrome, so
// a checkmark that disappears between old and new produces a real signal
// instead of two empty cells comparing equal. Runs on both sides: the old
// site marks icons with data-lucide, the new site's Icon.astro/Icon.jsx with
// data-icon (see the Icon component fix in this same round).
function tokenizeIcons($) {
  $('[data-lucide], [data-icon]').each((_, el) => {
    const name = $(el).attr('data-lucide') || $(el).attr('data-icon') || 'icon';
    $(el).replaceWith(`[icon:${name}]`);
  });
}

export function extractText(html) {
  const $ = load(html);
  tokenizeIcons($);
  $(CHROME_SELECTORS).remove();

  // <br> carries no text of its own but is a hard line break in the source
  // (e.g. the old H1 "Manufacturing operations,<br/>finally simple."), so it
  // needs the same boundary treatment even though it isn't a container.
  $('br').replaceWith(' | ');

  // Only insert a boundary when there is real content after it — an element
  // with no next sibling is the last thing in its container, and marking it
  // anyway would leave a stray trailing "|" in the output.
  $(BOUNDARY_SELECTORS).each((_, el) => {
    if ($(el).next().length) $(el).after(' | ');
  });

  const root = $('main').length ? $('main') : $('body');
  return normalise(root.text());
}

function splitFragments(text) {
  return text
    .split(/(?<=[.!?:])\s+|\s*[|•]\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Sentence-ish phrases long enough to carry real prose meaning on their own.
export function toPhrases(text) {
  return splitFragments(text).filter((s) => s.length >= 25);
}

// The fragments toPhrases() drops as noise are exactly what a feature-comparison
// table is made of: "Yes", "No", "Limited", short capability names. Collected
// separately (as a multiset, by the caller) so a flipped verdict or a deleted row
// on the /alternatives/ pages still produces a signal instead of vanishing under
// the 25-character floor.
export function toShortFragments(text) {
  return splitFragments(text).filter((s) => s.length >= 2 && s.length <= 24);
}

// Both toPhrases() and toShortFragments() flatten a table into a bag of text with
// no idea which cell came from which row — a multiset comparison can't tell "Row A
// flipped to No" from "Row B flipped to Yes", because the page-wide Yes/No counts
// come out the same either way. Extract every <table> as rows instead, each keyed
// by its own first cell (the feature/provider/version name), so the comparison in
// compare.js can ask "for THIS row, what changed" — which survives the new site
// reordering or restyling the table, since nothing here depends on row position.
export function extractTables(html) {
  const $ = load(html);
  tokenizeIcons($);
  $(CHROME_SELECTORS).remove();

  const root = $('main').length ? $('main') : $('body');

  // An empty cell and a lone "not applicable" dash both carry the same meaning —
  // "nothing here" — and both would otherwise vanish (an empty string, or a
  // single hyphen post-normalise, sit below toShortFragments' 2-char floor).
  // Naming that meaning explicitly means a row losing this verdict is comparable
  // text instead of two blanks that trivially match each other.
  const cellValue = (el) => {
    const raw = normalise($(el).text());
    return raw === '' || raw === '-' ? '[none]' : raw;
  };

  const rows = [];
  root.find('table').each((_, table) => {
    $(table)
      .find('tr')
      .each((_, tr) => {
        const cells = $(tr).find('td, th').toArray();
        if (!cells.length) return;
        const [first, ...rest] = cells;
        rows.push({ name: cellValue(first), verdicts: rest.map(cellValue) });
      });
  });

  return rows;
}
