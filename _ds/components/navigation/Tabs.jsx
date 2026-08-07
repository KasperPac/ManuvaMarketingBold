import React from "react";
/** Underline tabs. The active rule is 2px ink — never a pill. */
export function Tabs({items=[],value,onChange,size="md",style,...rest}){
  return (
    <div role="tablist" {...rest} style={{display:"flex",gap:"var(--space-6)",
      borderBottom:"1px solid var(--stroke)",...style}}>
      {items.map(it=>{
        const on=it.value===value;
        return (
          <button key={it.value} role="tab" aria-selected={on} onClick={()=>onChange&&onChange(it.value)}
            className="mv-tab" style={{position:"relative",border:0,background:"transparent",cursor:"pointer",
              padding:size==="sm"?"6px 0":"9px 0",fontFamily:"var(--font-body)",
              fontSize:size==="sm"?"var(--fs-sm)":"var(--fs-base)",
              fontWeight:on?"var(--fw-semibold)":"var(--fw-medium)",
              color:on?"var(--ink-strong)":"var(--ink-faint)",
              display:"flex",alignItems:"center",gap:"var(--space-2)",
              transition:"color var(--dur-instant) var(--ease-out)"}}>
            {it.label}
            {it.count!=null&&<span className="mv-tnum" style={{fontSize:"var(--fs-xs)",padding:"1px 5px",
              borderRadius:"var(--radius-2)",background:"var(--bg-card)",color:"var(--ink-muted)"}}>{it.count}</span>}
            <span style={{position:"absolute",left:0,right:0,bottom:-1,height:2,
              background:on?"var(--ink-strong)":"transparent",transition:"background-color var(--dur-fast) var(--ease-snap)"}}/>
          </button>);
      })}
      <style>{".mv-tab:hover{color:var(--ink-strong)}"}</style>
    </div>
  );
}
export default Tabs;
