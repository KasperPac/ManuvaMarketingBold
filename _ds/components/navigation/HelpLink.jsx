import React from "react";
/** Contextual help link. Mirrors the shipped _ui/help-link. */
export function HelpLink({slug,label,href,style,...rest}){
  return (
    <a href={href||`/app/help/${slug||""}`} className="mv-help" {...rest} style={{display:"inline-flex",
      alignItems:"center",gap:"var(--space-1)",fontSize:"var(--fs-sm)",color:"var(--ink-muted)",
      textDecoration:"none",transition:"color .15s",...style}}>
      <span aria-hidden="true" style={{fontSize:"var(--fs-md)",lineHeight:1}}>?</span>
      {label}
      <style>{".mv-help:hover{color:var(--brand-1)}"}</style>
    </a>
  );
}
export default HelpLink;
