(function(){
/* Components resolve at render time so this file is inert when the
   design-system compiler evaluates it, and a missing export degrades one
   element instead of unmounting the tree. */
const __mv = n => { const C = props => { const R = (window.MV||{})[n];
  return R ? React.createElement(R, props) : null; }; C.displayName = n; return C; };
const Logo = __mv("Logo"), Icon = __mv("Icon"), StatusDot = __mv("StatusDot");

/* Mirrors src/app/app/shell.module.css: 240px sticky dark sidebar, brand
   centred at 32px, 10px/0.14em section labels, 10px/12px nav items with a
   brand-dim active pill, and a transparent topbar over --bg-page. */
/* Sidebar sections, labels, order and icons transcribed from the shipped
   app (app.manuva.app, Aug 2026). The real nav carries no counts. */
const NAV=[
  {label:"Operations",items:[
    ["dashboard","Dashboard","layout-dashboard",null],
    ["products","Products","package","products"],
    ["components","Components","layers","inventory"],
    ["templates","Templates","copy","products"],
    ["goods-inwards","Goods Inwards","package-open","logistics"],
    ["orders","Orders","file-text",null],
    ["stocktake","Stocktake","list-checks","inventory"],
    ["suppliers","Suppliers","building-2","logistics"],
    ["reports","Reports","chart-column","audit"],
    ["purchasing","Purchasing","shopping-bag","purchasing"],
    ["inventory","Inventory","briefcase","inventory"]]},
  {label:"Warehouse",items:[["locations","Locations","house","logistics"]]},
  {label:"Workspace",items:[
    ["activity-log","Activity Log","clock","audit"],
    ["trash","Trash","trash-2",null]]},
  {label:"Platform",items:[
    ["tenants","Tenants","house",null],
    ["audit-log","Audit log","file-text","audit"],
    ["team","Team","users",null]]}
];

const SIDEBAR_VARS={
  "--ink-strong":"#F8F7F5","--ink-muted":"#A8A79E","--ink-faint":"#74746C",
  "--surface-1":"rgba(255,255,255,0.06)","--surface-hover":"rgba(255,255,255,0.07)",
  "--stroke":"rgba(255,255,255,0.09)","--stroke-strong":"rgba(255,255,255,0.16)",
  "--brand-1":"#8B9BFF","--brand-dim":"rgba(139,155,255,0.18)"
};

function AppShell({view,setView,children,topbar,impersonating}){
  return (
    <div style={{display:"grid",gridTemplateColumns:"var(--sidebar-w) 1fr",minHeight:"100vh",
      height:"100vh",overflow:"hidden",background:"var(--bg-page)",color:"var(--ink-strong)"}}>
      <aside style={{...SIDEBAR_VARS,background:"var(--bg-sidebar)",borderRight:"1px solid rgba(255,255,255,0.09)",
        display:"flex",flexDirection:"column",padding:"20px 16px",gap:"10px",height:"100vh",overflow:"hidden"}}>
        <div style={{padding:"4px 10px 18px",display:"flex"}}>
          <Logo variant="lockup" height={26} base="../../" style={{color:"#F8F7F5"}}/>
        </div>
        <nav style={{display:"flex",flexDirection:"column",gap:"14px",padding:"0 4px",flex:"1 1 auto",minHeight:0,overflowY:"auto",overflowX:"hidden"}}>
          {NAV.map(sec=>(
            <div key={sec.label} style={{display:"grid",gap:"4px"}}>
              <p style={{fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.14em",
                color:"var(--ink-faint)",padding:"0 12px 6px",margin:0}}>{sec.label}</p>
              {sec.items.map(([v,label,icon,domain])=>{
                const on=v===view;
                return (
                  <button key={v} data-domain={domain||undefined} onClick={()=>setView(v)} className="mv-nav" data-on={on||undefined}
                    style={{display:"flex",alignItems:"center",gap:"12px",padding:"10px 12px",borderRadius:"10px",
                      color:on?"#F8F7F5":"var(--ink-muted)",fontSize:"14px",fontWeight:500,textAlign:"left",
                      cursor:"pointer",width:"100%",fontFamily:"var(--font-body)",
                      background:on?(domain?"var(--accent-dim)":"var(--brand-dim)"):"transparent",
                      border:"1px solid "+(on?(domain?"var(--accent-dim)":"var(--brand-dim)"):"transparent"),
                      transition:"background .15s ease,color .15s ease,border-color .15s ease"}}>
                    <Icon name={icon} size={20} style={{opacity:on?1:.6,
                      color:on?(domain?"var(--accent-loud)":"var(--brand-1)"):"currentColor"}}/>
                    <span style={{flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{label}</span>
                  </button>);
              })}
            </div>))}
        </nav>
        <style>{".mv-nav:hover:not([data-on]){background:rgba(255,255,255,.07);color:#F8F7F5;border-color:rgba(255,255,255,.07)}"}</style>
      </aside>

      <main style={{display:"flex",flexDirection:"column",minHeight:0,overflow:"hidden"}}>
        {topbar}
        {impersonating&&<ImpersonationBar tenant={impersonating}/>}
        <div style={{flex:1,padding:"var(--content-pad)",overflowY:"auto"}}>{children}</div>
      </main>
    </div>
  );
}

/* "Viewing as <tenant>" — a support user is inside a customer's workspace.
   Warning-toned, full width, never dismissible: only Exit clears it. */
function ImpersonationBar({tenant,onExit}){
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"var(--space-4)",
      padding:"10px var(--space-6)",background:"var(--warning-dim)",
      borderBlock:"1px solid rgb(224 134 0/.28)",fontSize:"var(--fs-md)",color:"var(--warning)"}}>
      <span>Viewing as <strong style={{color:"var(--warning)"}}>{tenant}</strong></span>
      <button onClick={onExit} style={{padding:"3px 12px",borderRadius:"var(--radius-1)",
        border:"1px solid rgb(224 134 0/.45)",background:"transparent",color:"var(--warning)",
        fontFamily:"var(--font-body)",fontSize:"var(--fs-sm)",fontWeight:600,cursor:"pointer"}}>Exit</button>
    </div>
  );
}

function TopBar({tenant="Ridgeline Mfg",user="DR",children}){
  return (
    <div style={{padding:"16px 28px",display:"flex",justifyContent:"space-between",
      alignItems:"flex-start",gap:"16px",flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:0}}>{children}</div>
      <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:"8px",minHeight:40,padding:"0 14px",
          borderRadius:"10px",border:"1px solid var(--stroke)",background:"var(--bg-card)"}}>
          <span style={{fontSize:"10px",letterSpacing:"0.14em",textTransform:"uppercase",
            color:"var(--ink-faint)",lineHeight:1}}>Tenant</span>
          <strong style={{fontSize:"13px",lineHeight:1,color:"var(--ink-strong)"}}>{tenant}</strong>
        </div>
        <StatusDot tone="success" live size={7}
          label={<span style={{fontSize:12,color:"var(--ink-muted)"}}>Shopify live</span>}/>
        <span style={{width:40,height:40,borderRadius:"50%",background:"var(--brand-dim)",
          color:"var(--brand-1)",display:"grid",placeItems:"center",fontWeight:700,fontSize:14,
          border:"2px solid var(--stroke)",flexShrink:0}}>{user}</span>
      </div>
    </div>
  );
}
Object.assign(window,{AppShell,ShellTopBar:TopBar,ImpersonationBar});
})();
