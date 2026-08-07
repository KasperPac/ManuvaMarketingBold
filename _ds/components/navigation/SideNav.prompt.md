The app's primary navigation, 236px. Set `domain` per item so the active rule adopts that module's accent.

```jsx
<SideNav value={view} onChange={setView} sections={[{label:"Operate",items:[{value:"inv",label:"Inventory",domain:"inventory",icon:<Icon name="package"/>}]}]} />
```
