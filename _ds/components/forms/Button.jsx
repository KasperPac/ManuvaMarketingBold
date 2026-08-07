import React from "react";

const SIZES={sm:{h:"var(--control-sm)",px:"12px",fs:"var(--fs-sm)"},md:{h:"var(--control-md)",px:"18px",fs:"var(--fs-md)"},lg:{h:"var(--control-lg)",px:"20px",fs:"var(--fs-md)"},xl:{h:"var(--control-xl)",px:"26px",fs:"var(--fs-lg)"}};

const VARIANTS={
  primary:{background:"var(--brand-2)",color:"var(--ink-on-brand)",border:"1px solid var(--brand-2)"},
  secondary:{background:"var(--bg-card)",color:"var(--ink-strong)",border:"1px solid var(--stroke-strong)"},
  ghost:{background:"transparent",color:"var(--ink-muted)",border:"1px solid transparent"},
  danger:{background:"var(--danger-dim)",color:"var(--danger)",border:"1px solid var(--danger-dim)"},
  ink:{background:"var(--bg-ink)",color:"var(--bg-card)",border:"1px solid var(--bg-ink)"},
  accent:{background:"var(--accent-loud)",color:"#fff",border:"1px solid var(--accent-loud)"}
};

/** Action control. Geometry mirrors the shipped _ui/buttons.module.css.
 *  `shape="pill"` is the loud-layer shape — marketing CTAs, onboarding, poster
 *  blocks. `as="a"` renders an anchor so those CTAs can be real links. */
export function Button({as:Tag="button",variant="primary",size="md",shape="default",block=false,disabled=false,loading=false,iconLeft,iconRight,children,className,style,...rest}){
  const s=SIZES[size]||SIZES.md, v=VARIANTS[variant]||VARIANTS.primary;
  const native=Tag==="button";
  return (
    <Tag {...(native?{disabled:disabled||loading}:{"aria-disabled":disabled||loading||undefined})}
      data-variant={variant} className={["mv-btn",className].filter(Boolean).join(" ")} style={{
      display:block?"flex":"inline-flex",width:block?"100%":undefined,alignItems:"center",justifyContent:"center",
      gap:"6px",height:s.h,padding:`0 ${s.px}`,fontFamily:"var(--font-body)",fontSize:s.fs,
      fontWeight:"var(--fw-semibold)",letterSpacing:size==="xl"?"var(--ls-tight)":"0",
      borderRadius:shape==="pill"?"var(--radius-pill)":"var(--radius-lg)",cursor:disabled||loading?"not-allowed":"pointer",
      opacity:disabled?.45:1,whiteSpace:"nowrap",textDecoration:"none",
      transition:"filter var(--dur-fast) ease, background var(--dur-fast) ease, border-color var(--dur-fast) ease, box-shadow var(--dur-fast) ease",
      ...v,...style}} {...rest}>
      {loading&&<span style={{width:12,height:12,border:"2px solid currentColor",borderTopColor:"transparent",borderRadius:"50%",animation:"mv-spin .7s linear infinite"}}/>}
      {!loading&&iconLeft}
      {children}
      {iconRight}
      <style>{".mv-btn:hover:not(:disabled){filter:brightness(1.06)}.mv-btn[data-variant='secondary']:hover:not(:disabled),.mv-btn[data-variant='ghost']:hover:not(:disabled){filter:none;background:var(--surface-hover)}.mv-btn[data-variant='danger']:hover:not(:disabled){filter:none;background:var(--danger);color:#fff}.mv-btn:active:not(:disabled){transform:translateY(1px)}.mv-btn:focus-visible{outline:none;box-shadow:var(--shadow-focus)}"}</style>
    </Tag>
  );
}
export default Button;
