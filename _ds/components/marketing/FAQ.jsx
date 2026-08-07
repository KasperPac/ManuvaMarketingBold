import React from "react";
/** Questions as rules, not cards. Open one at a time; the first is open by
 *  default so the pattern is legible without a click. */
export function FAQ({items=[],defaultOpen=0,style,...rest}){
  const [open,setOpen]=React.useState(defaultOpen);
  return (
    <div {...rest} style={{display:"grid",...style}}>
      {items.map((it,i)=>{
        const on=open===i;
        return (
          <div key={it.q} style={{borderTop:i?"1px solid var(--stroke-strong)":"3px solid var(--ink-strong)",
            borderBottom:i===items.length-1?"3px solid var(--ink-strong)":"0"}}>
            <button onClick={()=>setOpen(on?-1:i)} aria-expanded={on} style={{width:"100%",
              display:"flex",alignItems:"center",justifyContent:"space-between",gap:"var(--space-6)",
              padding:"var(--space-6) 0",background:"transparent",border:0,cursor:"pointer",
              fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 100,"wght" 700',
              fontWeight:700,fontSize:"var(--fs-xl)",letterSpacing:"var(--ls-display)",
              color:"var(--ink-strong)",textAlign:"left"}}>
              {it.q}
              <span aria-hidden="true" style={{flex:"none",width:22,height:22,display:"grid",
                placeItems:"center",color:"var(--accent-text, var(--brand-2))",
                transform:on?"rotate(45deg)":"none",transition:"transform var(--dur-base) var(--ease-out)"}}>
                <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
                  <path d="M8 2v12M2 8h12"/></svg>
              </span>
            </button>
            {on&&<p style={{margin:0,padding:"0 0 var(--space-6)",maxWidth:"62ch",
              fontSize:"var(--fs-lg)",lineHeight:1.6,color:"var(--ink-muted)",textWrap:"pretty"}}>{it.a}</p>}
          </div>);
      })}
    </div>
  );
}
export default FAQ;
