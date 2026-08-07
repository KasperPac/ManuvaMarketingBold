import React from "react";
/** Marketing section opener: eyebrow, display headline, optional lede.
 *  The app uses PageHeader; marketing uses this. */
export function SectionHeader({eyebrow,title,lede,align="left",tone="ink",actions,style,...rest}){
  const centred=align==="center";
  return (
    <div {...rest} style={{display:"grid",gap:"var(--space-4)",
      justifyItems:centred?"center":"start",textAlign:centred?"center":"left",
      maxWidth:centred?"46ch":undefined,marginInline:centred?"auto":undefined,...style}}>
      {eyebrow&&<span className="mv-eyebrow" style={{color:tone==="onField"?"currentColor":"var(--ink-faint)",
        opacity:tone==="onField"?.72:1}}>{eyebrow}</span>}
      {title&&<h2 className="mv-display" style={{margin:0,fontSize:"var(--fs-display-3)",
        color:tone==="onField"?"currentColor":"var(--ink-strong)",maxWidth:"18ch"}}>{title}</h2>}
      {lede&&<p style={{margin:0,fontSize:"var(--fs-xl)",lineHeight:1.5,maxWidth:"46ch",
        color:tone==="onField"?"currentColor":"var(--ink-muted)",opacity:tone==="onField"?.82:1,
        textWrap:"pretty"}}>{lede}</p>}
      {actions&&<div style={{display:"flex",gap:"var(--space-3)",flexWrap:"wrap",marginTop:"var(--space-2)"}}>{actions}</div>}
    </div>
  );
}
export default SectionHeader;
