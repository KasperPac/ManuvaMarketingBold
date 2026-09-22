export const APP_URL = 'https://app.manuva.app';
export const CONTACT_EMAIL = 'hello@manuva.app';

export const FIELDS = [
  'cobalt', 'flare', 'amber', 'violet', 'mint', 'aqua', 'lime', 'ink', 'paper',
] as const;
export type FieldName = (typeof FIELDS)[number];

// The ten feature areas, for the Features mega menu. Labels and ids mirror
// features.astro's own DOMAIN_SECTIONS — the "· Pro" tier suffixes are dropped
// because a nav label is not the place for tier badging, but the ids must match
// exactly or the links land nowhere. Drift is caught automatically: the e2e
// suite already asserts every "/route#id" anchor on every page resolves to a
// real id on its target, and the nav renders on all ten routes.
export const FEATURE_LINKS = [
  { href: '/features#boms', label: 'BOMs & Manufacturing' },
  { href: '/features#orders', label: 'Orders & Fulfilment' },
  { href: '/features#inventory', label: 'Inventory' },
  { href: '/features#purchasing', label: 'Purchasing & Suppliers' },
  { href: '/features#production-planning', label: 'Production Planning' },
  { href: '/features#capacity', label: 'Capacity & Team' },
  { href: '/features#costing', label: 'Costing & Profitability' },
  { href: '/features#reports', label: 'Reports & Analytics' },
  { href: '/features#shopify', label: 'Shopify & Platform' },
] as const;

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
