import React from "react";
/** Non-semantic label: categories, warehouses, domains. Optional dismiss. */
export function Tag({children,onDismiss,accent=false,style,...rest}){
  return (
    <span {...rest} style={{display:"inline-flex",alignItems:"center",gap:"var(--space-1)",height:22,
      padding:onDismiss?"0 4px 0 8px":"0 8px",borderRadius:"var(--radius-2)",
      background:"var(--bg-card)",color:accent?"var(--accent-text)":"var(--ink-muted)",
      border:accent?"1px solid var(--accent-text)":"1px solid transparent",
      fontFamily:"var(--font-body)",fontSize:"var(--fs-sm)",fontWeight:"var(--fw-medium)",whiteSpace:"nowrap",...style}}>
      {children}
      {onDismiss&&<button onClick={onDismiss} aria-label="Remove" style={{border:0,background:"transparent",
        color:"inherit",cursor:"pointer",padding:2,display:"flex",lineHeight:0}}>
        <svg width="9" height="9" viewBox="0 0 9 9" stroke="currentColor" strokeWidth="1.6"><path d="M1.5 1.5l6 6M7.5 1.5l-6 6"/></svg>
      </button>}
    </span>
  );
}
export default Tag;
