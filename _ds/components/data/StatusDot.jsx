import React from "react";
const TONE={default:["var(--surface-1)","var(--ink-muted)","var(--ink-faint)"],neutral:["var(--surface-1)","var(--ink-muted)","var(--ink-faint)"],success:["var(--ok-dim)","var(--ok)","var(--ok-dot)"],ok:["var(--ok-dim)","var(--ok)","var(--ok-dot)"],warning:["var(--warning-dim)","var(--warning)","var(--warning-dot)"],warn:["var(--warning-dim)","var(--warning)","var(--warning-dot)"],danger:["var(--danger-dim)","var(--danger)","var(--danger-dot)"],info:["var(--info-dim)","var(--info)","var(--info-dot)"]};
/** Broadcast-clarity state marker: readable across a workshop. */
export function StatusDot({tone="default",variant,label,live=false,size=8,style,...rest}){
  const [,,dotc]=TONE[variant||tone]||TONE.default;
  return (
    <span {...rest} style={{display:"inline-flex",alignItems:"center",gap:"var(--space-2)",...style}}>
      <span style={{width:size,height:size,borderRadius:"50%",flexShrink:0,background:dotc,
        animation:live?"mv-pulse var(--dur-live) var(--ease-inout) infinite":undefined}}/>
      {label&&<span style={{fontSize:"var(--fs-base)",color:"var(--ink-strong)"}}>{label}</span>}
    </span>
  );
}
export default StatusDot;
