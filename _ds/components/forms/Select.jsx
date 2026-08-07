import React from "react";
const H={sm:"var(--control-sm)",md:"var(--control-md)",lg:"var(--control-lg)"};
/** Native select styled to match Input. */
export function Select({size="md",invalid=false,options=[],children,style,...rest}){
  return (
    <div className="mv-field" style={{position:"relative",display:"inline-flex",alignItems:"center",
      height:H[size]||H.md,background:"var(--bg-card)",
      border:`1px solid ${invalid?"var(--danger)":"var(--stroke-card)"}`,
      borderRadius:"var(--radius-lg)",transition:"var(--transition-control)",...style}}>
      <select {...rest} style={{appearance:"none",border:0,outline:"none",background:"transparent",
        color:"var(--ink-strong)",fontFamily:"var(--font-body)",fontSize:size==="sm"?"var(--fs-sm)":"var(--fs-md)",
        padding:"0 28px 0 10px",height:"100%",width:"100%",cursor:"pointer"}}>
        {children||options.map(o=>typeof o==="string"?<option key={o} value={o}>{o}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <svg width="10" height="10" viewBox="0 0 10 10" style={{position:"absolute",right:9,pointerEvents:"none",color:"var(--ink-faint)"}} fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 4l3 3 3-3"/></svg>
      <style>{".mv-field:focus-within{border-color:var(--focus-border);box-shadow:var(--shadow-focus)}"}</style>
    </div>
  );
}
export default Select;
