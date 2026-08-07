Field tiles. Colour rotates for rhythm — no two adjacent tiles share a hue. Paper shows between tiles, so the grid counts as one composed unit, not six fields.

```jsx
<FeatureGrid columns={3} items={[
  {title:"Inventory", body:"Stock, bins and goods inwards.", field:"cobalt"},
  {title:"Production", body:"Work orders, labour, allocation."}
]}/>
```

Pass `field` only when a tile IS a product module and should keep its domain colour. Otherwise let it rotate.
