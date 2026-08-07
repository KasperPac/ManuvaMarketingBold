import React from "react";
/** Required on every app page. Mirrors the shipped _ui/page-header:
 *  a brand-dim pill eyebrow, a clamped display title, optional breadcrumbs
 *  and a right-aligned actions slot. */
export function PageHeader({breadcrumbs,eyebrow,title,description,actions,domain,style,...rest}){
  return (
    <div data-domain={domain} {...rest} style={{display:"flex",justifyContent:"space-between",
      alignItems:"flex-start",gap:"var(--space-4)",flexWrap:"wrap",...style}}>
      <div style={{display:"grid",gap:"var(--space-2)"}}>
        {breadcrumbs&&breadcrumbs.length>0&&(
          <div style={{display:"flex",flexWrap:"wrap",gap:"var(--space-2)",alignItems:"center",
            fontSize:"var(--fs-xs)",textTransform:"uppercase",letterSpacing:"var(--ls-caps)",color:"var(--ink-faint)"}}>
            {breadcrumbs.map((c,i)=>(
              <span key={i} style={{display:"flex",gap:"var(--space-2)"}}>
                {i>0&&<span aria-hidden="true">/</span>}
                {c.href?<a href={c.href} style={{color:"var(--ink-muted)",textDecoration:"none"}}>{c.label}</a>:<span style={{color:"var(--ink-strong)"}}>{c.label}</span>}
              </span>))}
          </div>)}
        {eyebrow&&<span style={{display:"inline-flex",alignItems:"center",width:"fit-content",
          padding:"6px 10px",borderRadius:"var(--radius-pill)",
          background:domain?"var(--accent-dim)":"var(--brand-dim)",
          color:domain?"var(--accent-text)":"var(--brand-1)",
          fontSize:"10px",fontWeight:"var(--fw-bold)",textTransform:"uppercase",letterSpacing:"0.12em"}}>{eyebrow}</span>}
        {title&&<h1 style={{margin:0,fontFamily:"var(--font-display)",
          fontVariationSettings:'"wdth" 100,"wght" 700',fontWeight:700,
          fontSize:"clamp(1.5rem, 2vw, 2.2rem)",lineHeight:1.03,letterSpacing:"-0.03em",color:"var(--ink-strong)"}}>{title}</h1>}
        {description&&<p style={{margin:0,color:"var(--ink-muted)",fontSize:"var(--fs-md)",
          lineHeight:"var(--lh-normal)",maxWidth:"72ch",textWrap:"pretty"}}>{description}</p>}
      </div>
      {actions&&<div style={{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center"}}>{actions}</div>}
    </div>
  );
}
export default PageHeader;
