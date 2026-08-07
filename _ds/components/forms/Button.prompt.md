Primary action control — use for anything that commits a change (Save, Create PO, Release job).

```jsx
<Button variant="primary" size="md">Create purchase order</Button>
<Button variant="secondary" iconLeft={<Icon name="filter"/>}>Filter</Button>
<Button variant="ink" size="xl">Start free</Button>
```

Variants: `primary` (cobalt, one per view), `secondary` (outlined, the workhorse), `ghost` (toolbars), `danger` (destructive), `ink` (marketing/poster), `accent` (inherits the surrounding `data-domain` hue). Sizes `sm|md|lg` are for the app; `xl` is marketing only.
