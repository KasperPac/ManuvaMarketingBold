import React from "react";
/** Radio input. Use RadioGroup semantics via shared `name`. */
export function Radio({checked=false,disabled=false,label,description,name,onChange,value,style}){
  return (
    <label style={{display:"inline-flex",alignItems:description?"flex-start":"center",gap:"var(--space-2)",fontFamily:"var(--font-body)",fontSize:"var(--fs-md)",color:"var(--ink-strong)",cursor:disabled?"not-allowed":"pointer",opacity:disabled?.45:1,...style}}>
      <span style={{width:16,height:16,flexShrink:0,marginTop:description?2:0,display:"grid",placeItems:"center",
        background:"var(--bg-card)",border:`1px solid ${checked?"var(--brand-2)":"var(--stroke-strong)"}`,
        borderRadius:"50%",transition:"var(--transition-control)"}}>
        <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onChange} style={{position:"absolute",opacity:0,width:0,height:0}}/>
        {checked&&<span style={{width:8,height:8,borderRadius:"50%",background:"var(--brand-2)"}}/>}
      </span>
      {(label||description)&&<span style={{display:"grid",gap:2}}>
        <span style={{fontSize:"var(--fs-base)",color:"var(--ink)"}}>{label}</span>
        {description&&<span style={{fontSize:"var(--fs-sm)",color:"var(--ink-faint)"}}>{description}</span>}
      </span>}
    </label>
  );
}
export default Radio;
