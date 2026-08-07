The quiet surface. 13px cells, uppercase 11px column keys, hairline rules, no zebra striping, no shadows.

```jsx
<DataTable density="compact" selectable columns={[
  {key:"sku",header:"SKU",mono:true},
  {key:"name",header:"Product"},
  {key:"onHand",header:"On hand",align:"right"},
]} rows={rows} />
```

Numbers are right-aligned and tabular. Identifiers are `mono`. Boldness never enters the table body — it lives in the header bar above it.
