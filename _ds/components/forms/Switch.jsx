import React from "react";
/** On/off toggle for settings that take effect immediately. */
export function Switch({checked=false,disabled=false,label,onChange,size="md",style}){
  const w=size==="sm"?30:38, h=size==="sm"?18:22, k=h-6;
  return (
    <label style={{display:"inline-flex",alignItems:"center",gap:"var(--space-3)",fontFamily:"var(--font-body)",fontSize:"var(--fs-md)",color:"var(--ink-strong)",cursor:disabled?"not-allowed":"pointer",opacity:disabled?.45:1,...style}}>
      <span style={{width:w,height:h,flexShrink:0,padding:3,borderRadius:"var(--radius-pill)",
        background:checked?"var(--brand-2)":"var(--stroke-strong)",display:"flex",
        transition:`background-color var(--dur-fast) var(--ease-snap)`}}>
        <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} style={{position:"absolute",opacity:0,width:0,height:0}}/>
        <span style={{width:k,height:k,borderRadius:"50%",background:"#fff",boxShadow:"var(--shadow-sm)",
          transform:checked?`translateX(${w-k-6}px)`:"none",transition:`transform var(--dur-fast) var(--ease-snap)`}}/>
      </span>
      {label&&<span style={{fontSize:"var(--fs-base)",color:"var(--ink)"}}>{label}</span>}
    </label>
  );
}
export default Switch;
