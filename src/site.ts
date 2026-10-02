export const APP_URL = 'https://app.manuva.app';
/** The trial sign-up. APP_URL itself redirects a stranger to /login, so every
 * Start free goes here and only Sign in goes to APP_URL (MVBOLD-31). */
export const SIGNUP_URL = `${APP_URL}/signup`;
export const CONTACT_EMAIL = 'hello@manuva.app';

export const FIELDS = [
  'cobalt', 'flare', 'amber', 'violet', 'mint', 'aqua', 'lime', 'ink', 'paper',
] as const;
export type FieldName = (typeof FIELDS)[number];

// The six domains. This is the new design's own model, and it replaces the
// nine sections the previous build carried — the handoff groups the product
// into Inventory, Purchasing, Production, Sales, Planning and Reporting, and
// the home page's pinned stage is one panel per domain.
//
// Our nine sections condense into it without losing anything:
//   Inventory   <- inventory
//   Purchasing  <- purchasing
//   Production  <- BOMs & manufacturing
//   Sales       <- orders & fulfilment + Shopify & platform
//   Planning    <- production planning + capacity & team
//   Reporting   <- costing & profitability + reports & analytics
//
// `line` is the panel's one-line promise, verbatim from the reference. `field`
// is fixed per domain here, not rotated: each /features section's shape cut
// arrives from the previous domain's field, and a domain is the same colour
// on its home tile (MVBOLD-34; it was a pinned stage panel) and on /features.
export const DOMAINS = [
  { id: 'inventory',  name: 'Inventory',  field: 'cobalt', line: 'Counted once. True everywhere.' },
  { id: 'purchasing', name: 'Purchasing', field: 'amber',  line: 'Lead times that mean something.' },
  { id: 'production', name: 'Production', field: 'flare',  line: 'Bills of materials you can actually reuse.' },
  { id: 'sales',      name: 'Sales',      field: 'mint',   line: 'Every Shopify order, allocated.' },
  { id: 'planning',   name: 'Planning',   field: 'violet', line: 'Every job on one board.' },
  { id: 'reporting',  name: 'Reporting',  field: 'aqua',   line: 'The whole floor, in numbers.' },
] as const;

export type DomainId = (typeof DOMAINS)[number]['id'];

// The old nine anchors still resolve. /features#boms and the rest were live
// URLs with inbound links; each one now points at the domain that absorbed it
// rather than 404-ing on a fragment that no longer exists.
export const LEGACY_FEATURE_ANCHORS: Record<string, DomainId> = {
  boms: 'production',
  orders: 'sales',
  shopify: 'sales',
  'production-planning': 'planning',
  capacity: 'planning',
  costing: 'reporting',
  reports: 'reporting',
};

// Rotating words (MVBOLD-36, author's call 2026-10-02): manufacturing is one
// of the trades Manuva serves, not the only one — "Anything really that
// requires a BOM and a storefront". The first entry of each list is the word
// the page is written with: it is what search engines, screen readers, no-JS
// and motion-off visitors get, and where every rotation starts.
//
// The verbs follow "Less chaos. More …" in the home tagline's highlight.
// "developing" was offered and left out: the longest of them, it cost the
// headline 12% of its size everywhere.
export const MORE_VERBS = ['making', 'selling', 'creating', 'crafting'] as const;
// The trades, as an adjective ("Salon operations") and a plural noun ("MRP
// for Shopify salons"). Pharma was named and left out: it can read as a
// regulatory claim (GMP, batch records); "product" is the catch-all instead.
export const TRADES = [
  { adj: 'manufacturing', noun: 'manufacturers' },
  { adj: 'dropshipping', noun: 'dropshippers' },
  { adj: 'salon', noun: 'salons' },
  { adj: 'product', noun: 'product brands' },
] as const;
// The lists as data-rotate values (Motion.astro splits them on "|"). Trade
// is the adjective at the start of a sentence.
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
export const ROTATE = {
  verbs: MORE_VERBS.join('|'),
  trade: TRADES.map((t) => t.adj).join('|'),
  Trade: TRADES.map((t) => cap(t.adj)).join('|'),
  trades: TRADES.map((t) => t.noun).join('|'),
} as const;

export const FEATURE_LINKS = DOMAINS.map((d) => ({
  href: `/features#${d.id}`,
  label: d.name,
}));

export const NAV_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/alternatives', label: 'Compare' },
  { href: '/about', label: 'About' },
] as const;

export const FOOTER_GROUPS = [
  // The old footer carried a "Feature overview" column listing the nine
  // feature areas — the site's only cross-page entry points into /features
  // besides the header. The rebuild dropped it; the six domains that replaced
  // the nine areas take its place.
  { heading: 'Feature overview', links: FEATURE_LINKS },
  { heading: 'Product', links: [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
  ] },
  { heading: 'Compare', links: [
    { href: '/alternatives', label: 'All comparisons' },
    { href: '/alternatives/katana', label: 'vs Katana' },
    { href: '/alternatives/mrpeasy', label: 'vs MRPeasy' },
  ] },
  { heading: 'Company', links: [
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ] },
] as const;

export const ALL_ROUTES = [
  '/', '/features', '/pricing', '/about', '/alternatives',
  '/alternatives/katana', '/alternatives/mrpeasy', '/privacy', '/terms',
] as const;
