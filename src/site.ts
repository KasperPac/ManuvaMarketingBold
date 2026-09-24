export const APP_URL = 'https://app.manuva.app';
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
// is fixed per domain here, not rotated, because the stage clips each panel in
// over the last and the sequence has to be stable for the shapes to read.
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
