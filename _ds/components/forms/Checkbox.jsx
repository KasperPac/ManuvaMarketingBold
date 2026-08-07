import React from "react";
/** Checkbox with optional indeterminate state (table select-all). */
export function Checkbox({checked=false,indeterminate=false,disabled=false,label,onChange,style,...rest}){
  const on=checked||indeterminate;
  return (
    <label style={{display:"inline-flex",alignItems:"center",gap:"var(--space-2)",fontFamily:"var(--font-body)",fontSize:"var(--fs-md)",color:"var(--ink-strong)",cursor:disabled?"not-allowed":"pointer",opacity:disabled?.45:1,...style}}>
      <span className="mv-cbx" style={{width:16,height:16,flexShrink:0,display:"grid",placeItems:"center",
        background:on?"var(--brand-2)":"var(--bg-card)",
        border:`1px solid ${on?"var(--brand-2)":"var(--stroke-strong)"}`,
        borderRadius:"var(--radius-2)",transition:"var(--transition-control)"}}>
        <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} {...rest}
          style={{position:"absolute",opacity:0,width:0,height:0}}/>
        {indeterminate
          ? <svg width="10" height="10" viewBox="0 0 10 10" stroke="#fff" strokeWidth="2"><path d="M2 5h6"/></svg>
          : checked && <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="square"><path d="M2 5.6L4.2 8 9 2.8"/></svg>}
      </span>
      {label&&<span style={{fontSize:"var(--fs-base)",color:"var(--ink)"}}>{label}</span>}
      <style>{".mv-cbx:has(input:focus-visible){box-shadow:var(--shadow-focus)}"}</style>
    </label>
  );
}
export default Checkbox;
