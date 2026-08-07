(function(){
/* Components resolve at render time so this file is inert when the
   design-system compiler evaluates it, and a missing export degrades one
   element instead of unmounting the tree. */
const __mv = n => { const C = props => { const R = (window.MV||{})[n];
  return R ? React.createElement(R, props) : null; }; C.displayName = n; return C; };
const StateBand = __mv("StateBand"), PageHeader = __mv("PageHeader"), Button = __mv("Button"), Icon = __mv("Icon"), Input = __mv("Input"), Select = __mv("Select"), DataTable = __mv("DataTable"), StatusBadge = __mv("StatusBadge"), Tag = __mv("Tag"), EmptyState = __mv("EmptyState"), IconButton = __mv("IconButton"), Tabs = __mv("Tabs"), HelpLink = __mv("HelpLink");

function Inventory({tab,setTab}){
  const D=window.MV_DATA;
  const [sel,setSel]=React.useState([]);
  const rows = tab==="low" ? D.stock.filter(r=>r.st[0]!=="ok") : tab==="bins" ? [] : D.stock;
  return (
    <div data-domain="inventory" style={{display:"flex",flexDirection:"column",gap:"18px"}}>
      <PageHeader eyebrow="Operations" domain="inventory" title="Inventory"
        description="Live stock on hand across every warehouse and bin. Updated from the floor as items are scanned."
        actions={<>
          <Button size="sm" variant="secondary" iconLeft={<Icon name="download" size={14}/>}>Export</Button>
          <Button size="sm" iconLeft={<Icon name="plus" size={14}/>}>Goods inwards</Button>
        </>}/>

      <StateBand domain="inventory" metric="9" unit="SKUs" eyebrow="Below reorder point"
        title="1,240 units short against live jobs"
        actions={<Button size="sm" variant="ink">Create POs</Button>}/>

      <Tabs value={tab} onChange={setTab} items={[
        {value:"all",label:"All stock",count:412},{value:"low",label:"Below reorder",count:9},
        {value:"alloc",label:"Allocated"},{value:"bins",label:"Bin locations"}]}/>

      <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
        <Input size="sm" placeholder="Search SKUs" prefix={<Icon name="search" size={13}/>} style={{width:220}}/>
        <Select size="sm" options={["All warehouses","Kingsgrove","Botany"]}/>
        <Select size="sm" options={["All categories","Fabricated","Fasteners","Consumables"]}/>
        <Tag onDismiss={()=>{}}>On hand &gt; 0</Tag>
        <span style={{flex:1}}/>
        {sel.length>0&&<span style={{fontSize:12,color:"var(--ink-muted)"}}>{sel.length} selected</span>}
        {sel.length>0&&<Button size="sm" variant="secondary">Allocate</Button>}
        <IconButton label="Density" variant="outline" size="sm"><Icon name="rows-3" size={14}/></IconButton>
        <IconButton label="Columns" variant="outline" size="sm"><Icon name="columns-3" size={14}/></IconButton>
      </div>

      <div style={{background:"var(--bg-card)",border:"1px solid var(--stroke-card)",
        borderRadius:"var(--radius-xl)",overflow:"hidden"}}>
        <DataTable density="default" selectable selected={sel} rowKey="id"
          onToggle={k=>setSel(s=>s.includes(k)?s.filter(x=>x!==k):[...s,k])}
          onToggleAll={e=>setSel(e.target.checked?rows.map(r=>r.id):[])}
          empty={<EmptyState numeral="0" title="No bin locations yet"
            message="Assign bins to a warehouse to track stock down to the shelf."
            action={<Button size="sm">Add bin location</Button>} style={{border:"none",padding:0}}/>}
          columns={[
            {key:"sku",header:"SKU",mono:true,width:132},
            {key:"name",header:"Component"},
            {key:"wh",header:"Warehouse",width:112,muted:true},
            {key:"oh",header:"On hand",align:"right",width:92,render:r=>r.oh.toLocaleString()},
            {key:"alloc",header:"Allocated",align:"right",width:96,muted:true,render:r=>r.alloc.toLocaleString()},
            {key:"free",header:"Free",align:"right",width:92,render:r=>
              <span style={{color:r.free<0?"var(--danger)":"var(--ink-strong)",fontWeight:r.free<0?700:400}}>{r.free.toLocaleString()}</span>},
            {key:"rop",header:"Reorder pt",align:"right",width:96,muted:true,render:r=>r.rop.toLocaleString()},
            {key:"st",header:"Status",width:132,render:r=><StatusBadge tone={r.st[0]} dot>{r.st[1]}</StatusBadge>}
          ]} rows={rows}/>
      </div>
      <HelpLink slug="inventory/reorder-points" label="How do reorder points work?"/>
    </div>
  );
}
Object.assign(window,{Inventory});
})();
