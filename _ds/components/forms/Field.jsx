import React from "react";
/** Label + help/error wrapper for any form control. */
export function Field({label,hint,error,required=false,htmlFor,children,style}){
  return (
    <div style={{display:"grid",gap:"var(--space-2)",...style}}>
      {label&&<label htmlFor={htmlFor} style={{fontSize:"var(--fs-sm)",fontWeight:"var(--fw-semibold)",color:"var(--ink-muted)",letterSpacing:"var(--ls-caps)"}}>
        {label}{required&&<span style={{color:"var(--danger)",marginLeft:3}}>*</span>}
      </label>}
      {children}
      {(error||hint)&&<span style={{fontSize:"var(--fs-sm)",color:error?"var(--danger)":"var(--ink-faint)"}}>{error||hint}</span>}
    </div>
  );
}
export default Field;
