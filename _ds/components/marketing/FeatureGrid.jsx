import React from "react";
/** Field tiles, one per feature. Colour rotates for rhythm on the site;
 *  pass `domain` on an item to keep its product meaning instead. */
const ROTATION=["cobalt","violet","flare","amber","mint","aqua"];
export function FeatureGrid({items=[],columns=3,numbered=true,style,...rest}){
  return (
    <div {...rest} style={{display:"grid",gridTemplateColumns:`repeat(${columns},1fr)`,
      gap:"var(--space-5)",...style}}>
      {items.map((it,i)=>{
        const field=it.field||ROTATION[i%ROTATION.length];
        return (
          <div key={it.title||i} className="mv-lift" style={{background:`var(--field-${field})`,
            color:`var(--on-${field})`,borderRadius:"var(--radius-tile)",padding:"var(--space-8)",
            minHeight:260,display:"grid",gridTemplateRows:"auto auto 1fr",gap:"var(--space-6)"}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"var(--space-4)"}}>
              {it.icon}
              {numbered&&<span className="mv-score" style={{fontSize:52,opacity:.34}}>
                {String(i+1).padStart(2,"0")}</span>}
            </div>
            <span style={{fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 112,"wght" 800',
              fontSize:"var(--fs-2xl)",lineHeight:1.02,letterSpacing:"-.025em",minHeight:"2.04em"}}>{it.title}</span>
            <span style={{fontSize:"var(--fs-lg)",lineHeight:1.5,opacity:.82,textWrap:"pretty",
              alignSelf:"start"}}>{it.body}</span>
          </div>);
      })}
    </div>
  );
}
export default FeatureGrid;
