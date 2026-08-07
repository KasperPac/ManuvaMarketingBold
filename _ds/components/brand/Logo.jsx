import React from "react";
/** The Manuva lockup, mark, or wordmark. Inherits currentColor. */
export function Logo({variant="lockup",height=28,base="",title="Manuva",style,...rest}){
  const src=`${base}assets/logo-${variant==="lockup"?"lockup":variant==="mark"?"mark":"wordmark"}.svg`;
  const ratio=variant==="lockup"?2189.357/482.347:variant==="mark"?741.242/482.347:1361.115/243.403;
  return <span role="img" aria-label={title} {...rest} style={{
    display:"inline-block",height,width:height*ratio,backgroundColor:"currentColor",
    WebkitMaskImage:`url("${src}")`,maskImage:`url("${src}")`,
    WebkitMaskRepeat:"no-repeat",maskRepeat:"no-repeat",WebkitMaskSize:"contain",maskSize:"contain",
    ...style}}/>;
}
export default Logo;
