import React from "react";
/** Surface container. Flat by default — Manuva leans on strokes, not shadow. */
export function Card({title,action,eyebrow,padding="var(--space-6)",elevation=0,accentBar=false,children,style,...rest}){
  return (
    <section {...rest} style={{background:"var(--bg-card)",border:"1px solid var(--stroke-card)",
      borderRadius:"var(--radius-card)",boxShadow:elevation===0?"none":`var(--shadow-${elevation})`,
      overflow:"hidden",...style}}>
      {accentBar&&<div style={{height:"var(--border-rule)",background:"var(--accent-loud)"}}/>}
      {(title||action||eyebrow)&&(
        <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"var(--space-4)",
          padding:`var(--space-4) ${padding}`,borderBottom:"1px solid var(--stroke)"}}>
          <div style={{display:"grid",gap:2}}>
            {eyebrow&&<span className="mv-key">{eyebrow}</span>}
            {title&&<h3 style={{margin:0,fontFamily:"var(--font-body)",fontSize:"var(--fs-md)",
              fontWeight:"var(--fw-semibold)",color:"var(--ink-strong)",letterSpacing:"var(--ls-tight)"}}>{title}</h3>}
          </div>
          {action}
        </header>)}
      <div style={{padding}}>{children}</div>
    </section>
  );
}
export default Card;
