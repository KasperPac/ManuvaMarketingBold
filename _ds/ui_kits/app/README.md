# UI kit — Manuva app

A recreation of `manuva.app/app`, built from the real source in
**KasperPac/Assemblio** — `src/app/app/shell.module.css`, `dashboard.module.css`,
`_ui/*.module.css` and `src/app/globals.css`.

**Structure is copied; only the brand values are new.** 240px sticky dark sidebar
with a centred 32px lockup, 10px/0.14em section labels, 10px/12px nav items with a
brand-dim active pill; a transparent topbar carrying the tenant chip and avatar;
`PageHeader` with its pill eyebrow on every page; `radius-xl` table cards with
`--bg-card-alt` headers and 11px uppercase column keys.

## Screens

| File | Screen | Built from |
|---|---|---|
| `Shell.jsx` | `AppShell` + `ShellTopBar` | `shell.module.css` |
| `Dashboard.jsx` | Quick-link pills, KPI chip grid, jobs table, incoming POs, activity | `dashboard.module.css` |
| `Inventory.jsx` | Stock list — filters, selection, bin-locations empty state | `inventory.module.css`, `_ui/table` |
| `Production.jsx` | Production orders + **Floor board** | `_ui/table`, `planning/floor` |
| `Purchasing.jsx` | PO list **and** PO detail (ListPanel lines, back link) | `purchasing.module.css`, `_ui/list-panel` |
| `data.js` | Fixture data on `window.MV_DATA` |

## Interactions

Sidebar switches screens · tabs filter (Inventory → *Below reorder*; Production →
*Floor board*) · row selection drives a bulk action · PO reference opens the detail
page · **Release** and **Send** open a Dialog and land a Toast.

Screens the shipped app has but this kit does not recreate (Components, BOMs, Goods
Inwards, Stocktake, Scan, Orders, Suppliers, Locations, Reports, Activity Log,
Settings) appear in the nav and render an honest EmptyState rather than invented UI.
