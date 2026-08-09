export const APP_URL = 'https://app.manuva.app';
export const CONTACT_EMAIL = 'hello@manuva.app';

export const FIELDS = [
  'cobalt', 'flare', 'amber', 'violet', 'mint', 'aqua', 'lime', 'ink', 'paper',
] as const;
export type FieldName = (typeof FIELDS)[number];

export const NAV_LINKS = [
  { href: '/product', label: 'Product' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/alternatives', label: 'Compare' },
  { href: '/about', label: 'About' },
] as const;

export const FOOTER_GROUPS = [
  { heading: 'Product', links: [
    { href: '/product', label: 'Product tour' },
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
  '/', '/product', '/features', '/pricing', '/about', '/alternatives',
  '/alternatives/katana', '/alternatives/mrpeasy', '/privacy', '/terms',
] as const;
