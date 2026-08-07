import React from "react";
/** One quote, attributed. Quotes carry a metric when there is one —
 *  a number the customer can point at beats an adjective. */
export function Testimonial({quote,name,role,company,metric,unit,field,style,...rest}){
  const on=!!field;
  return (
    <figure {...rest} style={{margin:0,background:on?`var(--field-${field})`:"var(--bg-card)",
      color:on?`var(--on-${field})`:"var(--ink-strong)",
      border:on?"0":"1px solid var(--stroke-card)",borderRadius:"var(--radius-tile)",
      padding:"var(--space-10)",display:"grid",gap:"var(--space-8)",alignContent:"space-between",...style}}>
      {metric!=null&&(
        <span style={{display:"flex",alignItems:"baseline",gap:6}}>
          <span className="mv-numeral" style={{fontSize:"var(--fs-display-3)"}}>{metric}</span>
          {unit&&<span style={{fontSize:"var(--fs-lg)",fontWeight:"var(--fw-bold)",opacity:.62}}>{unit}</span>}
        </span>)}
      <blockquote style={{margin:0,fontFamily:"var(--font-display)",
        fontVariationSettings:'"wdth" 100,"wght" 700',fontWeight:700,fontSize:"var(--fs-2xl)",
        lineHeight:1.25,letterSpacing:"var(--ls-display)",textWrap:"pretty"}}>{quote}</blockquote>
      <figcaption style={{display:"grid",gap:2,fontSize:"var(--fs-md)"}}>
        <span style={{fontWeight:"var(--fw-semibold)"}}>{name}</span>
        <span style={{opacity:on?.72:1,color:on?"currentColor":"var(--ink-muted)"}}>
          {[role,company].filter(Boolean).join(", ")}</span>
      </figcaption>
    </figure>
  );
}
export default Testimonial;
