import React from "react";
const SIZES={sm:"var(--fs-display-1)",md:"var(--fs-display-2)",lg:"var(--fs-display-4)",xl:"var(--fs-display-6)",hero:"var(--fs-display-8)"};
/** The Manuva numeral device: the number is the headline, the label is the caption. */
export function Metric({value,unit,label,delta,tone="neutral",size="md",align="left",crop=false,style,...rest}){
  const toneColor=tone==="accent"?"var(--accent-loud)":tone==="ok"?"var(--ok)":tone==="warn"?"var(--warning)":tone==="danger"?"var(--danger)":"var(--ink-strong)";
  const big=size==="hero"||size==="xl";
  return (
    <div {...rest} style={{display:"grid",gap:big?"var(--space-2)":"var(--space-1)",justifyItems:align==="right"?"end":"start",
      textAlign:align,overflow:crop?"hidden":undefined,...style}}>
      {label&&<span className="mv-key" style={{color:"var(--ink-faint)"}}>{label}</span>}
      <span style={{display:"flex",alignItems:"baseline",gap:big?"var(--space-2)":"var(--space-1)",
        marginBlock:crop?"-0.14em":undefined}}>
        <span className="mv-numeral" style={{fontSize:SIZES[size]||SIZES.md,color:toneColor}}>{value}</span>
        {unit&&<span style={{fontFamily:"var(--font-body)",fontWeight:"var(--fw-semibold)",
          fontSize:big?"var(--fs-xl)":"var(--fs-sm)",letterSpacing:"var(--ls-caps)",
          textTransform:"uppercase",color:"var(--ink-faint)"}}>{unit}</span>}
      </span>
      {delta&&<span style={{fontFamily:"var(--font-mono)",fontSize:"var(--fs-sm)",
        color:delta.startsWith("-")?"var(--danger)":"var(--ok)"}}>{delta}</span>}
    </div>
  );
}
export default Metric;
