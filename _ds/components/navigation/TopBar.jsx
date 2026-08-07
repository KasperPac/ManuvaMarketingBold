import React from "react";
/** Screen header: title, domain eyebrow, search and actions. */
export function TopBar({title,eyebrow,domain,search,actions,tabs,style,...rest}){
  return (
    <header data-domain={domain} {...rest} style={{background:"var(--bg-card)",
      borderBottom:"1px solid var(--stroke)",...style}}>
      <div style={{display:"flex",alignItems:"center",gap:"var(--space-4)",
        minHeight:"var(--control-xl)",padding:"var(--space-3) var(--space-6)"}}>
        <div style={{display:"grid",gap:1,flex:1,minWidth:0}}>
          {eyebrow&&<span className="mv-key" style={{color:"var(--accent-text)"}}>{eyebrow}</span>}
          <h1 style={{margin:0,fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 100,"wght" 700',
            fontSize:"var(--fs-2xl)",lineHeight:1.1,letterSpacing:"var(--ls-display)",color:"var(--ink-strong)"}}>{title}</h1>
        </div>
        {search}
        {actions&&<div style={{display:"flex",gap:"var(--space-2)",alignItems:"center"}}>{actions}</div>}
      </div>
      {tabs&&<div style={{padding:"0 var(--space-6)"}}>{tabs}</div>}
    </header>
  );
}
export default TopBar;
