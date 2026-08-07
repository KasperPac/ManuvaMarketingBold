**Required on every app page.** Always pass both `eyebrow` and `title`.

```jsx
<PageHeader eyebrow="Operations" domain="purchasing" title="Purchase Orders"
  actions={<Button size="sm">New PO</Button>} />
```

Eyebrow taxonomy: Products (Components, BOMs) · Operations (Production, Purchasing, Inventory, Goods Inwards) · Logistics (Suppliers, Locations) · Orders · Admin (Settings, Users) · Audit (Activity Log). Detail pages pass `breadcrumbs` instead of `eyebrow`.
