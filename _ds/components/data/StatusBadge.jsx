import React from "react";
const TONE={default:["var(--surface-1)","var(--ink-muted)","var(--ink-faint)"],neutral:["var(--surface-1)","var(--ink-muted)","var(--ink-faint)"],success:["var(--ok-dim)","var(--ok)","var(--ok-dot)"],ok:["var(--ok-dim)","var(--ok)","var(--ok-dot)"],warning:["var(--warning-dim)","var(--warning)","var(--warning-dot)"],warn:["var(--warning-dim)","var(--warning)","var(--warning-dot)"],danger:["var(--danger-dim)","var(--danger)","var(--danger-dot)"],info:["var(--info-dim)","var(--info)","var(--info-dot)"]};
/** Status chip. Mirrors the shipped _ui/status-badge: 22px min-height,
 *  radius-xs, 11px bold uppercase with --ls-caps, tinted 1px border. */
export function StatusBadge({variant="default",tone,children,dot=false,size="md",style,...rest}){
  const [bg,fg,dotc]=TONE[tone||variant]||TONE.default;
  return (
    <span {...rest} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",
      gap:"6px",minHeight:size==="sm"?18:22,padding:size==="sm"?"0 6px":"0 8px",
      background:bg,color:fg,border:`1px solid ${bg}`,borderRadius:"var(--radius-xs)",
      fontFamily:"var(--font-body)",fontSize:"var(--fs-xs)",fontWeight:"var(--fw-bold)",
      letterSpacing:"var(--ls-caps)",textTransform:"uppercase",whiteSpace:"nowrap",...style}}>
      {dot&&<span style={{width:6,height:6,borderRadius:"50%",background:dotc,flexShrink:0}}/>}
      {children}
    </span>
  );
}
export default StatusBadge;
