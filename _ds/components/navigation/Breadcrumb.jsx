import React from "react";
/** Trail for drill-down records: Inventory / Kingsgrove / SKU-4410. */
export function Breadcrumb({items=[],style,...rest}){
  return (
    <nav aria-label="Breadcrumb" {...rest} style={{display:"flex",alignItems:"center",gap:"var(--space-2)",
      fontSize:"var(--fs-sm)",color:"var(--ink-faint)",...style}}>
      {items.map((it,i)=>(
        <React.Fragment key={i}>
          {i>0&&<span style={{color:"var(--ink-faint)"}}>/</span>}
          {i===items.length-1
            ? <span style={{color:"var(--ink-strong)",fontWeight:"var(--fw-medium)"}}>{it.label}</span>
            : <a href={it.href||"#"} style={{color:"inherit",textDecoration:"none"}}>{it.label}</a>}
        </React.Fragment>))}
    </nav>
  );
}
export default Breadcrumb;
