import React from "react";
const H={sm:"var(--control-sm)",md:"var(--control-md)",lg:"var(--control-lg)"};
/** Single-line text field. Mono variant for SKUs, lot codes and quantities. */
export function Input({size="md",invalid=false,mono=false,prefix,suffix,align="left",style,...rest}){
  const box={display:"flex",alignItems:"center",gap:"var(--space-2)",height:H[size]||H.md,
    padding:"0 10px",background:"var(--bg-card)",
    border:`1px solid ${invalid?"var(--danger)":"var(--stroke-card)"}`,
    borderRadius:"var(--radius-lg)",transition:"var(--transition-control)"};
  return (
    <div className="mv-field" data-invalid={invalid||undefined} style={{...box,...style}}>
      {prefix&&<span style={{color:"var(--ink-faint)",display:"flex",flexShrink:0}}>{prefix}</span>}
      <input {...rest} style={{flex:1,minWidth:0,border:0,outline:"none",background:"transparent",
        color:"var(--ink-strong)",fontFamily:mono?"var(--font-mono)":"var(--font-body)",
        fontSize:size==="sm"?"var(--fs-sm)":"var(--fs-md)",textAlign:align,
        fontVariantNumeric:mono||align==="right"?"tabular-nums":"normal"}}/>
      {suffix&&<span style={{color:"var(--ink-faint)",fontSize:"var(--fs-sm)",flexShrink:0}}>{suffix}</span>}
      <style>{".mv-field:focus-within{border-color:var(--focus-border);box-shadow:var(--shadow-focus)}.mv-field[data-invalid]:focus-within{box-shadow:var(--shadow-focus)}.mv-field input::placeholder{color:var(--ink-faint)}"}</style>
    </div>
  );
}
export default Input;
