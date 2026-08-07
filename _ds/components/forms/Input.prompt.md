Single-line text field. Quantities are always `align="right"` with a `suffix` unit; identifiers are always `mono`.

```jsx
<Input placeholder="Search SKUs" prefix={<Icon name="search"/>} />
<Input mono align="right" suffix="ea" defaultValue="1,240" />
```
