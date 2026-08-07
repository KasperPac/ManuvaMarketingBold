import React from "react";
/** Plan columns. One plan may be `featured` — it inverts to the ink field.
 *  Never put a colour field behind the feature list. */
export function PricingTable({plans=[],footnote,style,...rest}){
  return (
    <div {...rest} style={{display:"grid",gap:"var(--space-5)",...style}}>
      <div style={{display:"grid",gridTemplateColumns:`repeat(${plans.length},1fr)`,gap:"var(--space-4)",alignItems:"stretch"}}>
        {plans.map(p=>{
          const on=!!p.featured;
          return (
            <div key={p.name} style={{background:on?"var(--field-ink)":"var(--bg-card)",
              color:on?"var(--on-ink)":"var(--ink-strong)",
              border:on?"1px solid var(--field-ink)":"1px solid var(--stroke-card)",
              borderRadius:"var(--radius-tile)",padding:"var(--space-8)",
              display:"grid",gridTemplateRows:"auto auto auto 1fr auto",gap:"var(--space-5)"}}>
              <span className="mv-eyebrow" style={{color:on?"var(--field-lime)":"var(--ink-faint)"}}>{p.name}</span>
              <span style={{display:"flex",alignItems:"baseline",gap:6}}>
                <span className="mv-numeral" style={{fontSize:"var(--fs-display-2)"}}>{p.price}</span>
                {p.period&&<span style={{fontSize:"var(--fs-md)",opacity:.62}}>{p.period}</span>}
              </span>
              <span style={{fontSize:"var(--fs-md)",lineHeight:1.55,opacity:on?.78:1,
                color:on?"currentColor":"var(--ink-muted)",textWrap:"pretty"}}>{p.summary}</span>
              <ul style={{margin:0,padding:0,listStyle:"none",display:"grid",gap:"var(--space-3)",alignContent:"start"}}>
                {(p.features||[]).map(f=>(
                  <li key={f} style={{display:"flex",gap:"var(--space-3)",fontSize:"var(--fs-md)",
                    lineHeight:1.45,color:on?"currentColor":"var(--ink-muted)",opacity:on?.86:1}}>
                    <span aria-hidden="true" style={{color:on?"var(--field-lime)":"var(--ok)",flex:"none"}}>✓</span>{f}
                  </li>))}
              </ul>
              {p.action}
            </div>);
        })}
      </div>
      {footnote&&<span style={{fontSize:"var(--fs-sm)",color:"var(--ink-faint)"}}>{footnote}</span>}
    </div>
  );
}
export default PricingTable;
