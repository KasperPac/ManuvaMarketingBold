import React from "react";
/** Multi-line text. Used for notes on jobs, POs and audit entries. */
export function Textarea({invalid=false,rows=4,style,...rest}){
  return (<><textarea rows={rows} className="mv-ta" {...rest} style={{
    width:"100%",padding:"8px 10px",background:"var(--bg-card)",
    border:`1px solid ${invalid?"var(--danger)":"var(--stroke-card)"}`,
    borderRadius:"var(--radius-lg)",color:"var(--ink-strong)",fontFamily:"var(--font-body)",
    fontSize:"var(--fs-md)",lineHeight:"var(--lh-normal)",resize:"vertical",outline:"none",
    transition:"var(--transition-control)",...style}}/>
  <style>{".mv-ta:focus{border-color:var(--focus-border);box-shadow:var(--shadow-focus)}.mv-ta::placeholder{color:var(--ink-faint)}"}</style></>);
}
export default Textarea;
