import React from "react";
const TONE={default:["var(--surface-1)","var(--ink-muted)","var(--ink-faint)"],neutral:["var(--surface-1)","var(--ink-muted)","var(--ink-faint)"],success:["var(--ok-dim)","var(--ok)","var(--ok-dot)"],ok:["var(--ok-dim)","var(--ok)","var(--ok-dot)"],warning:["var(--warning-dim)","var(--warning)","var(--warning-dot)"],warn:["var(--warning-dim)","var(--warning)","var(--warning-dot)"],danger:["var(--danger-dim)","var(--danger)","var(--danger-dot)"],info:["var(--info-dim)","var(--info)","var(--info-dot)"]};
/** Square-ended completion bar for job progress and stock coverage. */
export function ProgressBar({value=0,max=100,tone="accent",height=6,label,showValue=false,style,...rest}){
  const pct=Math.max(0,Math.min(100,(value/max)*100));
  const fill=tone==="accent"?"var(--accent-loud)":(TONE[tone]||TONE.default)[2];
  return (
    <div {...rest} style={{display:"grid",gap:6,...style}}>
      {(label||showValue)&&<div style={{display:"flex",justifyContent:"space-between",gap:8,
        fontSize:"var(--fs-sm)",color:"var(--ink-faint)"}}>
        <span>{label}</span>{showValue&&<span className="mv-tnum" style={{color:"var(--ink-strong)"}}>{Math.round(pct)}%</span>}
      </div>}
      <div style={{height,background:"var(--surface-1)",borderRadius:"var(--radius-2)",overflow:"hidden"}}>
        <div style={{width:`${pct}%`,height:"100%",background:fill,transition:"width var(--dur-slow) var(--ease-out)"}}/>
      </div>
    </div>
  );
}
export default ProgressBar;
