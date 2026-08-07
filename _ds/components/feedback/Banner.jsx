import React from "react";
const TONE={default:["var(--surface-1)","var(--ink-muted)","var(--ink-faint)"],neutral:["var(--surface-1)","var(--ink-muted)","var(--ink-faint)"],success:["var(--ok-dim)","var(--ok)","var(--ok-dot)"],ok:["var(--ok-dim)","var(--ok)","var(--ok-dot)"],warning:["var(--warning-dim)","var(--warning)","var(--warning-dot)"],warn:["var(--warning-dim)","var(--warning)","var(--warning-dot)"],danger:["var(--danger-dim)","var(--danger)","var(--danger-dot)"],info:["var(--info-dim)","var(--info)","var(--info-dot)"]};
/** Persistent in-page message: sync failures, stock shortages, plan limits. */
export function Banner({tone="info",variant,title,children,action,onClose,style,...rest}){
  const [bg,fg,dotc]=TONE[variant||tone]||TONE.info;
  return (
    <div role="note" {...rest} style={{display:"flex",alignItems:"flex-start",gap:"var(--space-3)",
      padding:"var(--space-3) var(--space-4)",background:bg,color:fg,
      borderRadius:"var(--radius-lg)",borderLeft:`var(--border-rule) solid ${dotc}`,...style}}>
      <div style={{flex:1,display:"grid",gap:2}}>
        {title&&<span style={{fontSize:"var(--fs-base)",fontWeight:"var(--fw-semibold)"}}>{title}</span>}
        {children&&<span style={{fontSize:"var(--fs-sm)",opacity:.9}}>{children}</span>}
      </div>
      {action}
      {onClose&&<button onClick={onClose} aria-label="Dismiss" style={{border:0,background:"transparent",color:"inherit",opacity:.6,cursor:"pointer",padding:2,lineHeight:0}}>
        <svg width="11" height="11" viewBox="0 0 11 11" stroke="currentColor" strokeWidth="1.6"><path d="M2 2l7 7M9 2l-7 7"/></svg></button>}
    </div>
  );
}
export default Banner;
