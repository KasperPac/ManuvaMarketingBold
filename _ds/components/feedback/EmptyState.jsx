import React from "react";
/** Zero state. Mirrors the shipped _ui/empty-state (dashed --stroke border,
 *  radius-lg, 20px/18px padding) with an optional hero numeral — the one
 *  place the app is allowed poster energy. */
export function EmptyState({numeral,title,message,body,action,align="left",style,...rest}){
  const text=message??body;
  return (
    <div {...rest} style={{display:"grid",gap:"10px",padding:"20px 18px",
      border:"1px dashed var(--stroke)",borderRadius:"var(--radius-lg)",background:"var(--bg-card)",
      justifyItems:align==="center"?"center":"start",textAlign:align,...style}}>
      {numeral&&<span className="mv-numeral" style={{fontSize:"var(--fs-display-4)",color:"var(--stroke-strong)"}}>{numeral}</span>}
      <p style={{margin:0,fontSize:"var(--fs-md)",fontWeight:"var(--fw-bold)",color:"var(--ink-strong)"}}>{title}</p>
      {text&&<p style={{margin:0,fontSize:"var(--fs-base)",lineHeight:"var(--lh-normal)",color:"var(--ink-muted)",maxWidth:"52ch",textWrap:"pretty"}}>{text}</p>}
      {action&&<div style={{width:"fit-content"}}>{action}</div>}
    </div>
  );
}
export default EmptyState;
