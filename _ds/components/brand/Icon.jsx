import React from "react";
/** Lucide glyph rendered as a currentColor mask. No local sprite ships with
 *  this system — see readme.md ICONOGRAPHY for the substitution note. */
const CDN="https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/";
export function Icon({name,size=16,strokeWidth,style,...rest}){
  const url=`url("${CDN}${name}.svg")`;
  return <span aria-hidden="true" data-icon={name} {...rest} style={{
    display:"inline-block",width:size,height:size,flexShrink:0,backgroundColor:"currentColor",
    WebkitMaskImage:url,maskImage:url,WebkitMaskRepeat:"no-repeat",maskRepeat:"no-repeat",
    WebkitMaskPosition:"center",maskPosition:"center",WebkitMaskSize:"contain",maskSize:"contain",
    ...style}}/>;
}
export default Icon;
