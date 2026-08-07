repo: KasperPac/Assemblio
branch: main
path: src

## Last sync

date: 2026-08-06T13:35:00Z
commit:

### Updated in this project

- Retokenised the whole system onto the shipped token names from `src/app/globals.css` (`--bg-card`, `--ink-strong`, `--stroke-card`, `--fs-*`, `--radius-*`, `--space-*`, `--shadow-*`).
- Kept the four shipped themes and added Ember; evolved values only — slate → warm graphite, indigo → cobalt.
- Rebuilt the app UI kit against the real shell, dashboard and `_ui/` primitives.
- Added `PageHeader`, `StatusBadge`, `ListPanel`/`ListRow` and `HelpLink` to match the shipped `_ui/` inventory.

## Screen map

| Screen / file | Built from |
|---|---|
| `ui_kits/app/Shell.jsx` | `src/app/app/shell.module.css` |
| `ui_kits/app/Dashboard.jsx` | `src/app/app/dashboard.module.css` |
| `ui_kits/app/Inventory.jsx` | `src/app/app/inventory.module.css`, `_ui/table.module.css` |
| `ui_kits/app/Production.jsx` | `_ui/table.module.css`, `planning/(gated)/floor/floor.module.css` |
| `ui_kits/app/Purchasing.jsx` | `src/app/app/purchasing.module.css`, `_ui/list-panel.module.css` |
| `components/navigation/PageHeader.jsx` | `_ui/page-header.tsx` + `.module.css` |
| `components/data/StatusBadge.jsx` | `_ui/status-badge.tsx` + `.module.css` |
| `components/data/DataTable.jsx` | `_ui/table.module.css` |
| `components/data/ListPanel.jsx` | `_ui/list-panel.module.css` |
| `components/feedback/EmptyState.jsx` | `_ui/empty-state.tsx` + `.module.css` |
| `components/forms/Button.jsx` | `_ui/buttons.module.css` |
| `components/navigation/HelpLink.jsx` | `_ui/help-link.module.css` |
| `tokens/*.css` | `src/app/globals.css` |
| Rules in `readme.md` | `docs/design-system.md` |
