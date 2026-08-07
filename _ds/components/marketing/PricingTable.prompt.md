Plan columns. At most one `featured` — it inverts to the ink field with a lime eyebrow.

```jsx
<PricingTable plans={[
  {name:"Starter", price:"$0", period:"/mo", summary:"One workspace.",
   features:["Unlimited floor users","Shopify sync"], action:<Button block>Start free</Button>},
  {name:"Factory", price:"$249", period:"/mo", featured:true, features:["Everything in Starter"],
   action:<Button block variant="primary">Start free</Button>}
]}/>
```

Never put a colour field behind the feature list — the featured column is the only inverted surface.
