import React from "react";
/** Card panel with an eyebrow/title header and a stack of rows.
 *  Mirrors the shipped _ui/list-panel: 22px padding, radius-xl, shadow-card. */
export function ListPanel({eyebrow,title,description,action,columns,children,style,...rest}){
  return (
    <section {...rest} style={{display:"flex",flexDirection:"column",gap:"var(--space-4)",
      padding:"22px",border:"1px solid var(--stroke-card)",borderRadius:"var(--radius-xl)",
      background:"var(--bg-card)",boxShadow:"var(--shadow-card)",...style}}>
      {(eyebrow||title||action)&&(
        <header style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"14px"}}>
          <div>
            {eyebrow&&<p style={{margin:"0 0 6px",fontSize:"var(--fs-xs)",fontWeight:"var(--fw-bold)",
              textTransform:"uppercase",letterSpacing:"var(--ls-caps)",color:"var(--ink-faint)"}}>{eyebrow}</p>}
            {title&&<h2 style={{margin:0,color:"var(--ink-strong)",fontSize:"var(--fs-lg)",fontWeight:"var(--fw-bold)"}}>{title}</h2>}
            {description&&<p style={{margin:"8px 0 0",color:"var(--ink-muted)",fontSize:"var(--fs-base)",lineHeight:"var(--lh-snug)"}}>{description}</p>}
          </div>
          {action&&<div style={{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}}>{action}</div>}
        </header>)}
      {columns&&<div style={{display:"grid",gap:"12px",alignItems:"center",gridTemplateColumns:columns.template,
        padding:"10px 16px",borderRadius:"var(--radius-lg)",background:"var(--bg-card-alt)",
        borderBottom:"1px solid var(--stroke)",color:"var(--ink-muted)",fontWeight:"var(--fw-semibold)",
        fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.05em"}}>
        {columns.labels.map((l,i)=><span key={i}>{l}</span>)}
      </div>}
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>{children}</div>
    </section>
  );
}
/** A row inside a ListPanel — surface-1 fill, radius-lg, hover tint. */
export function ListRow({template,children,style,...rest}){
  return <div className="mv-lrow" {...rest} style={{display:"grid",gap:"12px",alignItems:"center",
    gridTemplateColumns:template,padding:"14px 16px",borderRadius:"var(--radius-lg)",
    background:"var(--surface-1)",border:"1px solid var(--stroke-card)",
    fontSize:"var(--fs-base)",color:"var(--ink-strong)",
    transition:"background var(--dur-base) var(--ease-out)",...style}}>
    {children}
    <style>{".mv-lrow:hover{background:var(--surface-hover)}"}</style>
  </div>;
}
export default ListPanel;
