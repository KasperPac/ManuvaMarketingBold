For detail pages with a vertical list of items — BOM lines, receipt lines, PO lines presented as cards rather than table rows.

```jsx
<ListPanel eyebrow="Purchasing" title="Order lines" columns={{template:"1.4fr 2fr 80px 90px",labels:["SKU","Item","Qty","Amount"]}}>
  <ListRow template="1.4fr 2fr 80px 90px"><span className="mv-mono">SKU-4410-B</span>…</ListRow>
</ListPanel>
```
