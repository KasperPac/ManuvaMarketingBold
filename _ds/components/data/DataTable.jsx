import React from "react";
/** The dense working surface. Mirrors the shipped _ui/table.module.css:
 *  radius-xl card, --bg-card-alt header, 11px uppercase column keys,
 *  10px/16px header padding, 11px/16px cells, hairline --stroke rules,
 *  no zebra, last row unruled. */
export function DataTable({columns=[],rows=[],density="default",selectable=false,selected=[],
  onToggle,onToggleAll,rowKey="id",empty,style,...rest}){
  const pad=density==="compact"?"8px 16px":density==="comfy"?"14px 16px":"11px 16px";
  const allOn=selectable&&rows.length>0&&selected.length===rows.length;
  return (
    <div {...rest} style={{overflow:"auto",background:"var(--bg-card)",...style}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"var(--font-body)",fontSize:"0.9rem"}}>
        <thead>
          <tr>
            {selectable&&<th style={{width:40,padding:"10px 0 10px 16px",background:"var(--bg-card-alt)",
              borderBottom:"1px solid var(--stroke)"}}>
              <input type="checkbox" checked={allOn} onChange={onToggleAll} aria-label="Select all"
                style={{accentColor:"var(--brand-1)",width:14,height:14}}/>
            </th>}
            {columns.map(c=>(
              <th key={c.key} style={{textAlign:c.align||"left",padding:"10px 16px",
                background:"var(--bg-card-alt)",borderBottom:"1px solid var(--stroke)",
                color:"var(--ink-muted)",fontWeight:600,fontSize:"11px",textTransform:"uppercase",
                letterSpacing:"0.05em",whiteSpace:"nowrap",width:c.width,position:"sticky",top:0,zIndex:1}}>{c.header}</th>))}
          </tr>
        </thead>
        <tbody>
          {rows.length===0&&<tr><td colSpan={columns.length+(selectable?1:0)} style={{padding:"var(--space-6)"}}>{empty}</td></tr>}
          {rows.map((r,i)=>{
            const key=r[rowKey]??i, on=selected.includes(key), last=i===rows.length-1;
            return (
              <tr key={key} className="mv-row" data-on={on||undefined}
                style={{background:on?"var(--brand-dim)":"transparent"}}>
                {selectable&&<td style={{padding:pad,paddingRight:0,paddingLeft:16,
                  borderBottom:last?"none":"1px solid var(--stroke)"}}>
                  <input type="checkbox" checked={on} onChange={()=>onToggle&&onToggle(key)} aria-label="Select row"
                    style={{accentColor:"var(--brand-1)",width:14,height:14}}/>
                </td>}
                {columns.map(c=>(
                  <td key={c.key} style={{padding:pad,textAlign:c.align||"left",verticalAlign:"middle",
                    borderBottom:last?"none":"1px solid var(--stroke)",
                    color:c.muted?"var(--ink-muted)":"var(--ink-strong)",
                    fontFamily:c.mono?"var(--font-mono)":undefined,
                    fontSize:c.mono?"var(--fs-sm)":undefined,
                    fontVariantNumeric:c.align==="right"||c.mono?"tabular-nums":undefined,
                    whiteSpace:"nowrap"}}>
                    {c.render?c.render(r):r[c.key]}
                  </td>))}
              </tr>);
          })}
        </tbody>
      </table>
      <style>{".mv-row:hover td{background:var(--surface-hover)}.mv-row[data-on] td{background:var(--brand-dim)}"}</style>
    </div>
  );
}
export default DataTable;
