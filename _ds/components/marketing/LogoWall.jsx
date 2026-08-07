import React from "react";
/** Customer proof. Logos are masked to a single ink so a wall of mismatched
 *  brand colours reads as one row. Supply real logos — never placeholders. */
export function LogoWall({logos=[],label,columns=5,tone="ink",style,...rest}){
  return (
    <div {...rest} style={{display:"grid",gap:"var(--space-6)",justifyItems:"center",...style}}>
      {label&&<span className="mv-eyebrow" style={{color:tone==="onField"?"currentColor":"var(--ink-faint)",
        opacity:tone==="onField"?.6:1}}>{label}</span>}
      <div style={{display:"grid",gridTemplateColumns:`repeat(${columns},1fr)`,gap:"var(--space-10)",
        alignItems:"center",width:"100%"}}>
        {logos.map(l=>(
          <span key={l.name} role="img" aria-label={l.name} title={l.name} style={{height:l.height||28,
            width:"100%",backgroundColor:tone==="onField"?"currentColor":"var(--ink-faint)",
            WebkitMaskImage:`url("${l.src}")`,maskImage:`url("${l.src}")`,
            WebkitMaskRepeat:"no-repeat",maskRepeat:"no-repeat",
            WebkitMaskSize:"contain",maskSize:"contain",
            WebkitMaskPosition:"center",maskPosition:"center",opacity:tone==="onField"?.72:1}}/>
        ))}
      </div>
    </div>
  );
}
export default LogoWall;
