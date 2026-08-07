import React from "react";
/** The state band. Carries the page's one number in a solid field, directly
 *  under the topbar and above the calm working surface — the in-app form of
 *  the transactional email's header band.
 *
 *  Colour keeps its domain meaning here: `domain` paints --accent-loud with
 *  the matching --accent-on ink. `tone="notice"` is the lime system band,
 *  reserved for Manuva speaking rather than a module reporting. */
export function StateBand({domain,tone="domain",eyebrow,title,metric,unit,actions,style,...rest}){
  const field = tone==="notice" ? "var(--field-lime)" : tone==="ink" ? "var(--field-ink)" : "var(--accent-loud)";
  const ink   = tone==="notice" ? "var(--on-lime)"   : tone==="ink" ? "var(--on-ink)"   : "var(--accent-on)";
  return (
    <div data-domain={tone==="domain"?domain:undefined} {...rest} style={{background:field,color:ink,
      display:"flex",alignItems:"center",justifyContent:"space-between",gap:"var(--space-6)",flexWrap:"wrap",
      padding:"var(--space-4) var(--space-6)",borderRadius:"var(--radius-2)",...style}}>
      <div style={{display:"flex",alignItems:"baseline",gap:"var(--space-4)",minWidth:0}}>
        {metric!=null&&(
          <span style={{display:"flex",alignItems:"baseline",gap:3,flex:"none"}}>
            <span className="mv-numeral" style={{fontSize:"var(--fs-display-1)"}}>{metric}</span>
            {unit&&<span style={{fontSize:"var(--fs-md)",fontWeight:"var(--fw-bold)",opacity:.66}}>{unit}</span>}
          </span>)}
        <span style={{display:"grid",gap:2,minWidth:0}}>
          {eyebrow&&<span className="mv-eyebrow" style={{opacity:.7}}>{eyebrow}</span>}
          {title&&<span style={{fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 100,"wght" 700',
            fontWeight:700,fontSize:"var(--fs-lg)",letterSpacing:"-.02em",lineHeight:1.25,textWrap:"pretty"}}>{title}</span>}
        </span>
      </div>
      {actions&&<div style={{display:"flex",gap:"var(--space-2)",alignItems:"center",flexWrap:"wrap"}}>{actions}</div>}
    </div>
  );
}
export default StateBand;
