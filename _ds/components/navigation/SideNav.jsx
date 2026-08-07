import React from "react";
/** App sidebar. Each item can carry a domain so the accent follows the module. */
export function SideNav({sections=[],value,onChange,header,footer,style,...rest}){
  return (
    <nav {...rest} style={{width:"var(--sidebar-w)",flexShrink:0,display:"flex",flexDirection:"column",
      background:"var(--bg-card-alt)",borderRight:"1px solid var(--stroke)",...style}}>
      {header&&<div style={{padding:"var(--space-4) var(--space-3)",borderBottom:"1px solid var(--stroke)"}}>{header}</div>}
      <div style={{flex:1,overflow:"auto",padding:"var(--space-4) var(--space-3)",display:"grid",gap:"var(--space-4)",alignContent:"start"}}>
        {sections.map((sec,si)=>(
          <div key={si} style={{display:"grid",gap:1}}>
            {sec.label&&<span className="mv-key" style={{padding:"var(--space-3) var(--space-3) var(--space-1)"}}>{sec.label}</span>}
            {sec.items.map(it=>{
              const on=it.value===value;
              return (
                <button key={it.value} data-domain={it.domain} onClick={()=>onChange&&onChange(it.value)}
                  className="mv-nav" data-on={on||undefined} style={{display:"flex",alignItems:"center",gap:"var(--space-3)",
                    width:"100%",height:30,padding:"0 var(--space-3)",border:0,cursor:"pointer",
                    background:on?"var(--bg-card)":"transparent",borderRadius:"var(--radius-lg)",
                    boxShadow:on?"inset 0 0 0 1px var(--stroke)":"none",
                    fontFamily:"var(--font-body)",fontSize:"var(--fs-base)",
                    fontWeight:on?"var(--fw-semibold)":"var(--fw-medium)",
                    color:on?"var(--ink-strong)":"var(--ink-muted)",textAlign:"left",
                    transition:"var(--transition-control)"}}>
                  <span style={{width:3,height:14,borderRadius:1,flexShrink:0,
                    background:on?"var(--accent-loud)":"transparent"}}/>
                  {it.icon}
                  <span style={{flex:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it.label}</span>
                  {it.count!=null&&<span className="mv-tnum" style={{fontSize:"var(--fs-xs)",color:"var(--ink-faint)"}}>{it.count}</span>}
                </button>);
            })}
          </div>))}
      </div>
      {footer&&<div style={{padding:"var(--space-4) var(--space-3)",borderTop:"1px solid var(--stroke)"}}>{footer}</div>}
      <style>{".mv-nav:hover:not([data-on]){background:var(--surface-hover);color:var(--ink-strong)}"}</style>
    </nav>
  );
}
export default SideNav;
