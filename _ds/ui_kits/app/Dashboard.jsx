(function(){
/* Components resolve at render time so this file is inert when the
   design-system compiler evaluates it, and a missing export degrades one
   element instead of unmounting the tree. */
const __mv = n => { const C = props => { const R = (window.MV||{})[n];
  return R ? React.createElement(R, props) : null; }; C.displayName = n; return C; };
const PageHeader = __mv("PageHeader"), StatusBadge = __mv("StatusBadge"), StatusDot = __mv("StatusDot"), Button = __mv("Button"), Icon = __mv("Icon"), DataTable = __mv("DataTable"), ProgressBar = __mv("ProgressBar"), Banner = __mv("Banner"), HelpLink = __mv("HelpLink");

/* Mirrors src/app/app/dashboard.module.css: quick-links pill bar, KPI chip
   grid (auto-fill minmax 150px), then a 1.5fr/1fr bottom row of cards. */
function Card({eyebrow,title,action,children,style}){
  return (
    <section style={{display:"flex",flexDirection:"column",gap:"14px",padding:"22px 24px",
      borderRadius:"var(--radius-xl)",border:"1px solid var(--stroke-card)",background:"var(--bg-card)",
      boxShadow:"var(--shadow-card)",...style}}>
      <header style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"12px"}}>
        <div>
          {eyebrow&&<p style={{margin:0,fontSize:"0.68rem",fontWeight:700,textTransform:"uppercase",
            letterSpacing:"0.16em",color:"var(--ink-faint)"}}>{eyebrow}</p>}
          <h2 style={{margin:"4px 0 0",fontSize:"1rem",fontWeight:700,lineHeight:1.2,color:"var(--ink-strong)"}}>{title}</h2>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

function KpiChip({label,value,unit,sub,tone,domain}){
  return (
    <div data-domain={domain} style={{display:"flex",flexDirection:"column",gap:"5px",padding:"16px 18px",
      borderRadius:"var(--radius-xl)",border:"1px solid var(--stroke-card)",background:"var(--bg-card)",
      boxShadow:"var(--shadow-card)",position:"relative",overflow:"hidden"}}>
      {domain&&<span style={{position:"absolute",inset:"0 auto 0 0",width:3,background:"var(--accent-loud)"}}/>}
      <p style={{margin:0,fontSize:"0.69rem",fontWeight:700,textTransform:"uppercase",
        letterSpacing:"0.14em",color:"var(--ink-faint)"}}>{label}</p>
      <span style={{display:"flex",alignItems:"baseline",gap:5}}>
        <span className="mv-numeral" style={{fontSize:"clamp(1.6rem,1.4vw+1.1rem,2.25rem)",
          color:tone||"var(--ink-strong)"}}>{value}</span>
        {unit&&<span style={{fontSize:"0.72rem",fontWeight:700,letterSpacing:"var(--ls-caps)",
          textTransform:"uppercase",color:"var(--ink-faint)"}}>{unit}</span>}
      </span>
      {sub&&<span style={{fontSize:"0.76rem",color:"var(--ink-muted)",lineHeight:1.3}}>{sub}</span>}
    </div>
  );
}

function Dashboard(){
  const D=window.MV_DATA;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"20px",paddingBottom:8,minWidth:0}}>
      <PageHeader eyebrow="Overview" title="Today"
        description="Live position across inventory, production and purchasing for Ridgeline Manufacturing."
        actions={<>
          <Button size="sm" variant="secondary" iconLeft={<Icon name="download" size={14}/>}>Export</Button>
          <Button size="sm" iconLeft={<Icon name="plus" size={14}/>}>New job</Button>
        </>}/>
      <Banner variant="danger" title="WO-4192 is blocked — 3 components short"
        action={<Button size="sm" variant="secondary">Create PO</Button>}>
        Powder coat satin black is 480 short. Southbank Coatings lead time is 6 days.
      </Banner>

      <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
        {[["Low stock","9",true],["Awaiting receipt","2",false],["Open POs","7",false],["Unallocated orders","4",false]].map(([l,c,warn])=>(
          <span key={l} style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"8px 14px",
            borderRadius:"var(--radius-pill)",border:"1px solid "+(warn?"var(--warning-dim)":"var(--stroke-card)"),
            background:"var(--bg-card)"}}>
            <span style={{fontSize:"0.84rem",fontWeight:500,color:warn?"var(--warning)":"var(--ink-muted)"}}>{l}</span>
            <span style={{fontSize:"0.82rem",fontWeight:700,padding:"1px 7px",borderRadius:"var(--radius-pill)",
              lineHeight:1.6,background:warn?"var(--warning-dim)":"var(--surface-1)",
              color:warn?"var(--warning)":"var(--ink-strong)"}}>{c}</span>
          </span>))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:"12px"}}>
        <KpiChip domain="inventory" label="Units on hand" value="67,142" unit="ea" sub="Across 2 warehouses"/>
        <KpiChip domain="inventory" label="Stock value" value="$412k" sub="+2.4% vs last month"/>
        <KpiChip domain="production" label="Open jobs" value="26" sub="+4 this week"/>
        <KpiChip domain="inventory" label="Below reorder" value="9" tone="var(--danger)" sub="+3 today"/>
        <KpiChip domain="purchasing" label="Committed spend" value="$91k" sub="-12% vs Jul"/>
        <KpiChip domain="logistics" label="Awaiting despatch" value="14" unit="orders" sub="2 overdue"/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1.5fr) minmax(0,1fr)",gap:"18px",alignItems:"start",minWidth:0}}>
        <div data-domain="production">
          <Card eyebrow="Operations" title="Jobs on the floor"
            action={<a href="#" style={{fontSize:"0.84rem",fontWeight:600,color:"var(--ink-muted)"}}>View all</a>}
            style={{padding:0,gap:0}}>
            <div style={{padding:"22px 24px 0"}}/>
            <DataTable density="default" columns={[
              {key:"id",header:"Job",mono:true,width:92},
              {key:"product",header:"Product"},
              {key:"cell",header:"Cell",width:118,muted:true},
              {key:"p",header:"Progress",width:130,render:r=><ProgressBar value={r.done} max={r.qty} height={4}
                tone={r.st[0]==="danger"?"danger":r.st[0]==="warn"?"warn":"accent"}/>},
              {key:"qty",header:"Made",align:"right",width:80,render:r=><span className="mv-tnum">{r.done}/{r.qty}</span>},
              {key:"due",header:"Due",width:96,muted:true},
              {key:"st",header:"Status",width:150,render:r=><StatusBadge tone={r.st[0]} dot>{r.st[1]}</StatusBadge>}
            ]} rows={D.jobs} style={{borderTop:"1px solid var(--stroke)",marginTop:14}}/>
          </Card>
        </div>

        <div style={{display:"grid",gap:"18px"}}>
          <div data-domain="purchasing">
            <Card eyebrow="Operations" title="Incoming" style={{padding:"22px 24px",gap:0}}>
              <div style={{display:"flex",flexDirection:"column",marginTop:14}}>
                {D.pos.map((p,i)=>(
                  <div key={p.id} style={{display:"flex",alignItems:"center",gap:"14px",padding:"12px 4px",
                    borderBottom:i<D.pos.length-1?"1px solid var(--stroke-card)":"none"}}>
                    <span className="mv-mono" style={{fontSize:"0.86rem",fontWeight:700,color:"var(--ink-strong)",minWidth:74}}>{p.id}</span>
                    <span style={{fontSize:"0.84rem",color:"var(--ink-muted)",flex:1,overflow:"hidden",
                      textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.supplier}</span>
                    <StatusBadge tone={p.st[0]} size="sm">{p.st[1]}</StatusBadge>
                  </div>))}
              </div>
            </Card>
          </div>
          <div data-domain="audit">
            <Card eyebrow="Audit" title="Activity"
              action={<HelpLink slug="audit/activity-log" label="What's logged?"/>}
              style={{padding:"22px 24px"}}>
              <div style={{display:"grid",gap:"12px"}}>
                {D.audit.map((a,i)=>(
                  <div key={i} data-domain={a.dom} style={{display:"flex",gap:"10px",alignItems:"flex-start"}}>
                    <span className="mv-mono" style={{fontSize:11,color:"var(--ink-faint)",width:34,flexShrink:0,paddingTop:2}}>{a.t}</span>
                    <span style={{width:3,alignSelf:"stretch",background:"var(--accent-loud)",borderRadius:2,flexShrink:0}}/>
                    <div style={{display:"grid",gap:1,minWidth:0}}>
                      <span style={{fontSize:"0.84rem",color:"var(--ink-strong)"}}>{a.what}</span>
                      <span style={{fontSize:"0.76rem",color:"var(--ink-faint)"}}>{a.who}</span>
                    </div>
                  </div>))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window,{Dashboard});
})();
