import type { FieldName } from '../site';

export interface Domain {
  slug: string;
  name: string;
  field: FieldName;
  icon: string;
  /** Lifted from llms.txt or the old features.html — never composed. */
  blurb: string;
  source: 'llms.txt' | 'features.html';
  /** Set when the category video is uploaded. Until then the card shows a still. */
  youtubeId?: string;
  /** Optional: not every domain has a screenshot that genuinely shows its
   * own screen. Author's ruling (post-review): a proxy screenshot under a
   * heading it doesn't depict is the visual equivalent of an invented
   * blurb — this project has refused to invent copy in every task across
   * two passes, and a mismatched image is the same failure in a different
   * medium. Omit poster/posterAlt entirely rather than show one; the card
   * renders colour, icon, name and blurb only. Purchasing and Audit have
   * no matching screen among the three existing product screenshots. */
  poster?: string;
  posterAlt?: string;
}

// Five cards, not six. "Logistics" is zero occurrences across llms.txt,
// features.html and index.html (checked logistics/despatch/dispatch/
// shipping/carrier) — it exists only in the design system's invented
// DOMAINS array and a video filename. Author's ruling: drop it. See
// product.astro's own comment and tests/unit/product.test.ts.
export const DOMAINS: Domain[] = [
  {
    slug: 'inventory',
    name: 'Inventory & stock control',
    field: 'cobalt',
    icon: 'package',
    // llms.txt: "Inventory & stock control — real-time component and
    // finished-goods tracking, movements ledger, stocktake, bin/aisle
    // locations, multi-warehouse"
    blurb:
      'Real-time component and finished-goods tracking, movements ledger, stocktake, bin/aisle locations, multi-warehouse.',
    source: 'llms.txt',
    poster: '/video/poster-inventory.jpg',
    posterAlt: 'Manuva inventory list showing stock on hand across warehouses',
  },
  {
    slug: 'boms',
    name: 'Bills of Materials',
    field: 'violet',
    icon: 'layers',
    // llms.txt: "Bills of Materials (BOMs) — multi-level assemblies, yield %
    // per line, versioning with draft/publish/rollback, side-by-side version
    // comparison, BOM templates"
    blurb:
      'Multi-level assemblies, yield % per line, versioning with draft/publish/rollback, side-by-side version comparison, BOM templates.',
    source: 'llms.txt',
    poster: '/video/poster-boms.jpg',
    posterAlt: 'Manuva variant detail showing a versioned bill of materials',
  },
  {
    slug: 'production',
    name: 'Production orders',
    field: 'flare',
    icon: 'factory',
    // llms.txt: "Production orders — issue work orders, allocate
    // components, track runs from start to finish, shop floor view"
    blurb:
      'Issue work orders, allocate components, track runs from start to finish, shop floor view.',
    source: 'llms.txt',
    poster: '/video/poster-production.jpg',
    posterAlt: 'Manuva production board showing work orders in progress',
  },
  {
    slug: 'purchasing',
    name: 'Purchasing & suppliers',
    field: 'amber',
    icon: 'shopping-cart',
    // llms.txt: "Purchasing & suppliers — purchase orders, goods inwards,
    // supplier management, lead-time tracking, PO variance reporting"
    blurb:
      'Purchase orders, goods inwards, supplier management, lead-time tracking, PO variance reporting.',
    source: 'llms.txt',
    // No poster: none of the three product screenshots shows a PO or
    // supplier screen. The nearest available shot (the component picker
    // modal) doesn't depict purchasing — see the Domain interface comment.
  },
  {
    slug: 'audit',
    name: 'Audit',
    field: 'aqua',
    icon: 'history',
    // features.html (Inventory group, "Activity log" feature): "Who did
    // what, when. Audit trail across every change in the system — for
    // compliance and for sanity." — second sentence quoted verbatim.
    blurb:
      'Audit trail across every change in the system — for compliance and for sanity.',
    source: 'features.html',
    // No poster: none of the three product screenshots shows the activity
    // log / audit trail itself. The nearest available shot (a revenue
    // chart plus a low-stock panel) doesn't depict it — see the Domain
    // interface comment.
  },
];
