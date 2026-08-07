import React from "react";
/** Hover label. CSS-only; wraps its child. */
export function Tooltip({content,side="top",children,style,...rest}){
  const pos=side==="top"?{bottom:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)"}
    :side==="bottom"?{top:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)"}
    :side==="left"?{right:"calc(100% + 6px)",top:"50%",transform:"translateY(-50%)"}
    :{left:"calc(100% + 6px)",top:"50%",transform:"translateY(-50%)"};
  return (
    <span className="mv-tip" {...rest} style={{position:"relative",display:"inline-flex",...style}}>
      {children}
      <span className="mv-tip-b" style={{position:"absolute",...pos,zIndex:60,pointerEvents:"none",opacity:0,
        padding:"4px 7px",background:"var(--bg-ink)",color:"var(--ink-on-brand)",
        borderRadius:"var(--radius-2)",fontSize:"var(--fs-xs)",fontWeight:"var(--fw-medium)",
        whiteSpace:"nowrap",boxShadow:"var(--shadow-card)",transition:"opacity var(--dur-fast) var(--ease-out)"}}>{content}</span>
      <style>{".mv-tip:hover .mv-tip-b,.mv-tip:focus-within .mv-tip-b{opacity:1}"}</style>
    </span>
  );
}
export default Tooltip;
