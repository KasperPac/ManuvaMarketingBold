import React from "react";
const TONE={default:["var(--surface-1)","var(--ink-muted)","var(--ink-faint)"],neutral:["var(--surface-1)","var(--ink-muted)","var(--ink-faint)"],success:["var(--ok-dim)","var(--ok)","var(--ok-dot)"],ok:["var(--ok-dim)","var(--ok)","var(--ok-dot)"],warning:["var(--warning-dim)","var(--warning)","var(--warning-dot)"],warn:["var(--warning-dim)","var(--warning)","var(--warning-dot)"],danger:["var(--danger-dim)","var(--danger)","var(--danger-dot)"],info:["var(--info-dim)","var(--info)","var(--info-dot)"]};
/** Transient confirmation. Bottom-left, above the sidebar, never centre-screen. */
export function Toast({tone="default",variant,title,detail,action,onClose,style,...rest}){
  const [,,dotc]=TONE[variant||tone]||TONE.default;
  return (
    <div role="status" {...rest} style={{display:"flex",alignItems:"flex-start",gap:"var(--space-3)",
      minWidth:280,maxWidth:400,padding:"var(--space-3) var(--space-4)",
      background:"var(--bg-ink)",color:"var(--bg-card)",
      borderRadius:"var(--radius-lg)",boxShadow:"var(--shadow-md)",
      borderLeft:`var(--border-rule) solid ${dotc}`,
      animation:"mv-rise var(--dur-base) var(--ease-out)",...style}}>
      <div style={{flex:1,display:"grid",gap:2}}>
        <span style={{fontSize:"var(--fs-base)",fontWeight:"var(--fw-semibold)"}}>{title}</span>
        {detail&&<span style={{fontSize:"var(--fs-sm)",opacity:.7}}>{detail}</span>}
      </div>
      {action}
      {onClose&&<button onClick={onClose} aria-label="Dismiss" style={{border:0,background:"transparent",
        color:"inherit",opacity:.6,cursor:"pointer",padding:2,lineHeight:0}}>
        <svg width="11" height="11" viewBox="0 0 11 11" stroke="currentColor" strokeWidth="1.6"><path d="M2 2l7 7M9 2l-7 7"/></svg>
      </button>}
    </div>
  );
}
export default Toast;
