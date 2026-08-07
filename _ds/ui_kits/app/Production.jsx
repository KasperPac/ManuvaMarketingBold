(function(){
/* Components resolve at render time so this file is inert when the
   design-system compiler evaluates it, and a missing export degrades one
   element instead of unmounting the tree. */
const __mv = n => { const C = props => { const R = (window.MV||{})[n];
  return R ? React.createElement(R, props) : null; }; C.displayName = n; return C; };
const PageHeader = __mv("PageHeader"), Tabs = __mv("Tabs"), Button = __mv("Button"), Icon = __mv("Icon"), DataTable = __mv("DataTable"), StatusBadge = __mv("StatusBadge"), ProgressBar = __mv("ProgressBar"), Banner = __mv("Banner"), StatusDot = __mv("StatusDot"), HelpLink = __mv("HelpLink");

function FloorBoard(){
  const D=window.MV_DATA;
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"18px"}}>
      {D.jobs.slice(0,3).map(j=>(
        <div key={j.id} style={{background:"var(--bg-ink)",color:"var(--bg-card)",
          borderRadius:"var(--radius-xl)",padding:"24px",display:"grid",gap:"12px",
          position:"relative",overflow:"hidden"}}>
          <span aria-hidden="true" className="mv-numeral" style={{position:"absolute",right:-10,bottom:-34,
            fontSize:"var(--fs-display-6)",color:"rgb(255 255 255/.07)"}}>{Math.round(j.done/j.qty*100)}</span>
          <div style={{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span className="mv-mono" style={{fontSize:13,opacity:.6}}>{j.id}</span>
            <StatusDot tone={j.st[0]} live={j.st[0]==="info"} size={10}/>
          </div>
          <span style={{position:"relative",fontSize:17,fontWeight:600,letterSpacing:"var(--ls-tight)"}}>{j.product}</span>
          <span style={{position:"relative",display:"flex",alignItems:"baseline",gap:6}}>
            <span className="mv-numeral" style={{fontSize:"var(--fs-display-2)"}}>{j.done}</span>
            <span style={{fontSize:17,opacity:.5}}>/ {j.qty}</span>
          </span>
          <div style={{position:"relative",display:"flex",justifyContent:"space-between",fontSize:12,opacity:.65,
            borderTop:"var(--border-rule) solid rgb(255 255 255/.2)",paddingTop:10}}>
            <span>{j.cell}</span><span>{j.due}</span>
          </div>
        </div>))}
    </div>
  );
}

function Production({tab,setTab,onRelease}){
  const D=window.MV_DATA;
  return (
    <div data-domain="production" style={{display:"flex",flexDirection:"column",gap:"18px"}}>
      <PageHeader eyebrow="Operations" domain="production" title="Production Orders"
        description="Every job on the floor, with live component availability against its BOM."
        actions={<Button size="sm" variant="accent" iconLeft={<Icon name="plus" size={14}/>}>New job</Button>}/>
      <Tabs value={tab} onChange={setTab} items={[
        {value:"open",label:"Open",count:26},{value:"released",label:"Released",count:9},
        {value:"done",label:"Completed"},{value:"board",label:"Floor board"}]}/>
      {tab==="board" ? <FloorBoard/> : <>
        <Banner variant="warning" title="WO-4192 is short 3 components"
          action={<Button size="sm" variant="secondary">View shortages</Button>}/>
        <div style={{background:"var(--bg-card)",border:"1px solid var(--stroke-card)",
          borderRadius:"var(--radius-xl)",overflow:"hidden"}}>
          <DataTable density="default" columns={[
            {key:"id",header:"Job",mono:true,width:96},
            {key:"product",header:"Product"},
            {key:"cell",header:"Cell",width:124,muted:true},
            {key:"p",header:"Progress",width:150,render:r=><ProgressBar value={r.done} max={r.qty} height={4}
              tone={r.st[0]==="danger"?"danger":r.st[0]==="warn"?"warn":"accent"}/>},
            {key:"qty",header:"Made",align:"right",width:92,render:r=><span className="mv-tnum">{r.done}/{r.qty}</span>},
            {key:"due",header:"Due",width:104,muted:true},
            {key:"st",header:"Status",width:160,render:r=><StatusBadge tone={r.st[0]} dot>{r.st[1]}</StatusBadge>},
            {key:"a",header:"",width:88,align:"right",render:r=>r.st[0]==="neutral"
              ? <Button size="sm" variant="secondary" onClick={onRelease}>Release</Button> : null}
          ]} rows={D.jobs}/>
        </div>
        <HelpLink slug="production/allocation" label="How is stock allocated to a job?"/>
      </>}
    </div>
  );
}
Object.assign(window,{Production});
})();
