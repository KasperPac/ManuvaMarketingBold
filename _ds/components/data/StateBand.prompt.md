The in-app form of the transactional email's header band. One per page, directly under the topbar, above the working surface — it says the page's one number and nothing else.

Colour keeps its domain meaning in the app (cobalt = Inventory, amber = Purchasing). Lime is `tone="notice"` only: Manuva speaking, not a module reporting.

```jsx
<StateBand domain="purchasing" metric="7" unit="open"
  eyebrow="Purchasing" title="7 purchase orders awaiting receipt"
  actions={<Button size="sm" variant="ink">Receive</Button>} />
```

Never stack two bands, never put one behind a table, and never use it for something that is not a number the operator acts on.
