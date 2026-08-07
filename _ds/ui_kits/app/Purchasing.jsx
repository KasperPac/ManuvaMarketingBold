(function(){
/* Components resolve at render time so this file is inert when the
   design-system compiler evaluates it, and a missing export degrades one
   element instead of unmounting the tree. */
const __mv = n => { const C = props => { const R = (window.MV||{})[n];
  return R ? React.createElement(R, props) : null; }; C.displayName = n; return C; };
const PageHeader = __mv("PageHeader"), Tabs = __mv("Tabs"), Button = __mv("Button"), Icon = __mv("Icon"), Input = __mv("Input"), DataTable = __mv("DataTable"), StatusBadge = __mv("StatusBadge"), Field = __mv("Field"), Select = __mv("Select"), Textarea = __mv("Textarea"), ListPanel = __mv("ListPanel"), ListRow = __mv("ListRow"), HelpLink = __mv("HelpLink"), StateBand = __mv("StateBand");

const TPL="1.3fr 2fr 70px 80px 90px";

function Purchasing({tab,setTab,onSend,detail,setDetail}){
  const D=window.MV_DATA;
  if(detail) return <PoDetail onBack={()=>setDetail(null)} onSend={onSend}/>;
  return (
    <div data-domain="purchasing" style={{display:"flex",flexDirection:"column",gap:"18px"}}>
      <PageHeader eyebrow="Operations" domain="purchasing" title="Purchase Orders"
        description="Supplier orders, expected receipts and receiving discrepancies."
        actions={<Button size="sm" variant="accent" iconLeft={<Icon name="plus" size={14}/>}>New PO</Button>}/>
      <StateBand domain="purchasing" metric="7" unit="open" eyebrow="Awaiting receipt"
        title="2 arrive today — Kingsgrove Metals and Alloy Supply Co."
        actions={<Button size="sm" variant="ink">Open receiving</Button>}/>
      <Tabs value={tab} onChange={setTab} items={[
        {value:"open",label:"Open",count:7},{value:"receiving",label:"Receiving",count:2},
        {value:"suppliers",label:"Suppliers"},{value:"draft",label:"Drafts",count:1}]}/>
      <div style={{background:"var(--bg-card)",border:"1px solid var(--stroke-card)",
        borderRadius:"var(--radius-xl)",overflow:"hidden"}}>
        <DataTable density="default" columns={[
          {key:"id",header:"PO",mono:true,width:96,render:r=>
            <a href="#" onClick={e=>{e.preventDefault();setDetail(r.id);}} style={{color:"var(--brand-1)",fontWeight:600}}>{r.id}</a>},
          {key:"supplier",header:"Supplier"},
          {key:"lines",header:"Lines",align:"right",width:70,muted:true},
          {key:"value",header:"Value",align:"right",width:96},
          {key:"eta",header:"Expected",width:96,muted:true},
          {key:"st",header:"Status",width:170,render:r=><StatusBadge tone={r.st[0]} dot>{r.st[1]}</StatusBadge>},
          {key:"a",header:"",width:78,align:"right",render:r=>r.st[0]==="neutral"
            ? <Button size="sm" variant="secondary" onClick={onSend}>Send</Button> : null}
        ]} rows={D.pos}/>
      </div>
      <HelpLink slug="purchasing/create-po" label="How do purchase orders work?"/>
    </div>
  );
}

function PoDetail({onBack,onSend}){
  const lines=[
    ["SKU-4410-B","Bracket, 6mm mild steel","2,000","$2.40","$4,800.00"],
    ["SKU-1102","M6 flange nut, zinc plated","20,000","$0.11","$2,200.00"],
    ["SKU-3050-A","Panel, 1200×600 alloy, 3mm","400","$9.60","$3,840.00"],
    ["SKU-6612","Weld wire ER70S-6, 15kg","40","$32.00","$1,280.00"]];
  return (
    <div data-domain="purchasing" style={{display:"flex",flexDirection:"column",gap:"18px"}}>
      <PageHeader domain="purchasing"
        breadcrumbs={[{label:"Purchase Orders",href:"#"},{label:"PO-1042"}]}
        title="PO-1042"
        actions={<>
          <Button size="sm" variant="secondary">Download PDF</Button>
          <Button size="sm" variant="accent" onClick={onSend}>Receive Goods →</Button>
        </>}/>
      <div style={{border:"1px solid var(--stroke-card)",borderRadius:"var(--radius-xl)",
        background:"var(--bg-card)",boxShadow:"var(--shadow-card)",padding:"18px",
        display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"18px"}}>
        {[["Supplier","Kingsgrove Metals"],["Expected","22 Aug 2026"],["Payment terms","Net 30"],["Raised by","Dana Reyes"]].map(([k,v])=>(
          <div key={k} style={{display:"grid",gap:4}}>
            <span className="mv-key">{k}</span>
            <span style={{fontSize:"var(--fs-md)",fontWeight:600,color:"var(--ink-strong)"}}>{v}</span>
          </div>))}
      </div>
      <ListPanel eyebrow="Operations" title="Order lines"
        columns={{template:TPL,labels:["SKU","Item","Qty","Unit","Amount"]}}
        action={<span style={{display:"flex",alignItems:"baseline",gap:6}}>
          <span className="mv-key">Total ex GST</span>
          <span className="mv-numeral" style={{fontSize:"var(--fs-display-1)",color:"var(--ink-strong)"}}>$12,480</span></span>}>
        {lines.map(l=>(
          <ListRow key={l[0]} template={TPL}>
            <span className="mv-mono" style={{fontSize:"var(--fs-sm)"}}>{l[0]}</span>
            <span>{l[1]}</span>
            <span className="mv-tnum" style={{textAlign:"right"}}>{l[2]}</span>
            <span className="mv-tnum" style={{textAlign:"right",color:"var(--ink-muted)"}}>{l[3]}</span>
            <span className="mv-tnum" style={{textAlign:"right",fontWeight:600}}>{l[4]}</span>
          </ListRow>))}
      </ListPanel>
      <div style={{border:"1px solid var(--stroke-card)",borderRadius:"var(--radius-xl)",
        background:"var(--bg-card)",boxShadow:"var(--shadow-card)",padding:"18px",display:"grid",gap:"10px",maxWidth:560}}>
        <Field label="Note to supplier" hint="Printed on the PDF sent to Kingsgrove Metals.">
          <Textarea rows={3} defaultValue="Deliver to Kingsgrove dock B before 3pm. Reference PO-1042 on all packaging."/>
        </Field>
      </div>
      <a href="#" onClick={e=>{e.preventDefault();onBack();}}
        style={{fontSize:"var(--fs-base)",color:"var(--ink-muted)",display:"inline-flex",alignItems:"center",gap:4}}>← Back to purchase orders</a>
    </div>
  );
}
Object.assign(window,{Purchasing});
})();
