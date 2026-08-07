import React from "react";
/** The poster device: full-bleed panel, cropped hero numeral, hard edges.
 *  Advertising, OG cards, deck covers, campaign pages. Never inside the app. */
export function PosterBlock({numeral,unit,eyebrow,headline,body,footer,invert=false,
  fill="ink",ratio,align="left",style,children,...rest}){
  /* Marketing fields are first-class fills — the poster is a loud-layer device,
     so it reaches the same palette the site and social ads use. */
  const FIELDS={cobalt:1,violet:1,flare:1,amber:1,mint:1,aqua:1};
  const isField=!!FIELDS[fill];
  const bg=isField?`var(--field-${fill})`
    :fill==="ink"?"var(--bg-ink)":fill==="accent"?"var(--accent-loud)":fill==="brand"?"var(--brand-1)":"var(--bg-card)";
  const fg=isField?`var(--on-${fill})`:fill==="paper"?"var(--ink-strong)":"#fff";
  return (
    <div {...rest} style={{position:"relative",overflow:"hidden",background:bg,color:fg,
      borderRadius:"var(--radius-poster)",aspectRatio:ratio,
      padding:"var(--space-10)",display:"grid",alignContent:"space-between",
      gap:"var(--space-6)",textAlign:align,...style}}>
      {numeral!=null&&<span aria-hidden="true" className="mv-numeral" style={{position:"absolute",
        right:"-0.06em",bottom:"-0.22em",fontSize:"var(--fs-display-8)",lineHeight:.72,
        color:invert?"rgb(255 255 255/.10)":"rgb(255 255 255/.14)",pointerEvents:"none",userSelect:"none"}}>{numeral}</span>}
      <div style={{position:"relative",display:"grid",gap:"var(--space-3)",justifyItems:align==="center"?"center":"start"}}>
        {eyebrow&&<span className="mv-eyebrow" style={{opacity:.72}}>{eyebrow}</span>}
      </div>
      <div style={{position:"relative",display:"grid",gap:"var(--space-4)",justifyItems:align==="center"?"center":"start"}}>
        {headline&&<h2 className="mv-display" style={{margin:0,fontSize:"var(--fs-display-4)",maxWidth:"16ch"}}>{headline}</h2>}
        {numeral!=null&&<span style={{display:"flex",alignItems:"baseline",gap:"var(--space-2)"}}>
          <span className="mv-numeral" style={{fontSize:"var(--fs-display-6)"}}>{numeral}</span>
          {unit&&<span className="mv-eyebrow" style={{fontSize:"var(--fs-lg)",opacity:.7}}>{unit}</span>}
        </span>}
        {body&&<p style={{margin:0,maxWidth:"38ch",fontSize:"var(--fs-lg)",lineHeight:"var(--lh-normal)",opacity:.78,textWrap:"pretty"}}>{body}</p>}
        {children}
      </div>
      {footer&&<div style={{position:"relative",display:"flex",alignItems:"center",gap:"var(--space-4)",
        borderTop:"var(--border-rule) solid currentColor",paddingTop:"var(--space-5)",opacity:.95}}>{footer}</div>}
    </div>
  );
}
export default PosterBlock;
