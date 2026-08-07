import React from "react";
/** Modal. Scrim is warm-black at 56%; panel is flat with a hard top rule.
 *  `inline` scopes the scrim to the nearest positioned ancestor instead of the
 *  viewport — for embedded confirm panels and specimen cards. */
export function Dialog({open=true,inline=false,title,eyebrow,footer,width=520,onClose,children,style,...rest}){
  if(!open)return null;
  return (
    <div role="dialog" aria-modal={inline?undefined:"true"} aria-label={typeof title==="string"?title:undefined} style={{position:inline?"absolute":"fixed",inset:0,zIndex:100,
      display:"grid",placeItems:"center",padding:"var(--space-6)",
      background:"rgb(20 20 19/.56)",animation:"mv-rise var(--dur-base) var(--ease-out)"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} {...rest} style={{width:"100%",maxWidth:width,
        background:"var(--bg-card)",border:"1px solid var(--stroke-card)",
        borderRadius:"var(--radius-xl)",boxShadow:"var(--shadow-lg)",overflow:"hidden",...style}}>
        <header style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"var(--space-4)",
          padding:"var(--space-6) var(--space-6) var(--space-3)"}}>
          <div style={{display:"grid",gap:2}}>
            {eyebrow&&<span className="mv-key">{eyebrow}</span>}
            <h2 style={{margin:0,fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 100,"wght" 700',
              fontSize:"var(--fs-xl)",letterSpacing:"var(--ls-tight)",color:"var(--ink-strong)"}}>{title}</h2>
          </div>
          {onClose&&<button onClick={onClose} aria-label="Close" style={{border:0,background:"transparent",cursor:"pointer",
            color:"var(--ink-faint)",padding:4,lineHeight:0}}>
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.6"><path d="M2 2l10 10M12 2L2 12"/></svg>
          </button>}
        </header>
        <div style={{padding:"0 var(--space-6) var(--space-6)",fontSize:"var(--fs-md)",color:"var(--ink-muted)",lineHeight:"var(--lh-normal)"}}>{children}</div>
        {footer&&<footer style={{display:"flex",justifyContent:"flex-end",gap:"var(--space-3)",
          padding:"var(--space-4) var(--space-6)",background:"var(--bg-card-alt)",borderTop:"1px solid var(--stroke)"}}>{footer}</footer>}
      </div>
    </div>
  );
}
export default Dialog;
