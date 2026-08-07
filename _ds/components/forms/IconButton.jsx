import React from "react";
const H={sm:26,md:32,lg:40};
/** Square icon-only control for toolbars and table row actions. */
export function IconButton({size="md",variant="ghost",label,active=false,disabled=false,children,style,...rest}){
  const h=H[size]||32;
  const bg=active?"var(--surface-active)":variant==="solid"?"var(--bg-ink)":variant==="outline"?"var(--bg-card)":"transparent";
  return (
    <button aria-label={label} title={label} disabled={disabled} className="mv-ibtn" style={{
      width:h,height:h,display:"inline-flex",alignItems:"center",justifyContent:"center",
      background:bg,color:variant==="solid"?"var(--ink-on-brand)":"var(--ink-muted)",
      border:variant==="outline"?"1px solid var(--stroke-card)":"1px solid transparent",
      borderRadius:"var(--radius-lg)",cursor:disabled?"not-allowed":"pointer",opacity:disabled?.4:1,
      transition:"var(--transition-control)",...style}} {...rest}>
      {children}
      <style>{".mv-ibtn:hover:not(:disabled){background:var(--surface-hover);color:var(--ink-strong)}.mv-ibtn:focus-visible{outline:none;box-shadow:var(--shadow-focus)}"}</style>
    </button>
  );
}
export default IconButton;
