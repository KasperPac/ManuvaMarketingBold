/* /alternatives/* pages. Headings, FAQ questions and claims are the live site's own
   (KasperPac/ManuvaMarketing alternatives/*.html + llms.txt). FAQ answers are TODO —
   carry them across verbatim; these pages rank, don't ship them thinner. */
(()=>{
const DATA={
 katana:{them:"Katana",field:"violet",h1:["Katana alternatives for Shopify manufacturers:"," why teams switch to Manuva"],
  gapTitle:"What Katana doesn't do that Shopify manufacturers need",
  gapBody:"Katana covers the basics well. The gaps show up once your BOMs get real — when a component has scrap, when a recipe changes mid-season, when you need to know which PO ran late.",
  pillars:[["BOM versioning + side-by-side comparison","Every change saved as a numbered version. Compare any two to see added, removed and modified components with cost and margin impact — then roll back."],["Yield % per component line","Set a scrap allowance per component. A process that eats 10% more fabric plans for it, so purchasing reflects real consumption."],["Capacity planning with staff costing","Model departments and staffing, plan against real capacity, and cost actual time against planned."]],
  matrix:[["Yield % per BOM line",1,0],["BOM versioning & rollback",1,0],["Side-by-side BOM compare",1,0],["BOM templates",1,0],["PO variance reporting",1,0],["Lead-time accuracy reports",1,0],["Profitability dashboard",1,0],["Shopify sync",1,1],["Multi-level BOMs",1,1]],
  note:"None of the above are offered by Katana at any price tier.",
  us:["Manuva Pro","$499","/mo flat","Unlimited users and locations. Capacity planning, profitability dashboard and API included."],
  they:["Katana","Per tier","+ per user","Advanced features sit behind higher tiers, and seats are counted."],
  faqs:["Is Manuva a direct replacement for Katana?","Can I import my data from Katana?","Does Manuva work with Shopify the same way Katana does?","What happens to my Katana account if I switch?"]},
 mrpeasy:{them:"MRPeasy",field:"flare",h1:["MRPeasy alternative:"," flat-rate manufacturing software for growing teams"],
  gapTitle:"MRPeasy pricing scales with headcount, not capability",
  gapBody:"Per-user pricing punishes you for putting the system where the work happens. Every person on the floor who should see a work order is a line item.",
  pillars:[["Native Shopify webhook sync","Real-time, webhook-driven, two-way. Orders cascade to production without a nightly batch or a CSV."],["BOM versioning with diff","Numbered versions with a true side-by-side diff — added, removed and modified lines, with cost and margin impact."],["Flat-rate unlimited users","Growth and Pro include unlimited team members. Put it on every bench without doing seat maths."]],
  matrix:[["Flat-rate pricing",1,0],["Unlimited users included",1,0],["Native Shopify webhooks",1,0],["BOM versioning with diff",1,0],["Yield % per BOM line",1,0],["PO variance reporting",1,0],["Capacity planning",1,1],["Multi-level BOMs",1,1],["Stock control",1,1]],
  note:"MRPeasy charges per user — a 10-person team reaches $490/mo before advanced features.",
  us:["Manuva Growth","$249","/mo flat","Unlimited users. Multi-level BOMs, versioning, costing, reports and Shopify sync."],
  they:["MRPeasy","$490","/mo at 10 users","Per-user pricing, before advanced features are added."],
  faqs:["Does Manuva have a per-user pricing tier like MRPeasy?","How does Manuva's Shopify sync compare to MRPeasy?","Can I migrate from MRPeasy to Manuva without downtime?","What MRPeasy features does Manuva not yet have?"]}
};
const k=document.body.dataset.competitor,d=DATA[k],other=k==="katana"?["mrpeasy","MRPeasy"]:["katana","Katana"];
const cnt=d.matrix.filter(r=>r[1]&&!r[2]).length;
const price=(c,mine)=>`<article class="pcard mv-field-${mine?"cobalt":"paper"}"><span class="eyebrow" style="${mine?"color:var(--field-lime)":"opacity:.6"}">${c[0]}</span><span style="display:flex;align-items:baseline;gap:6px;flex-wrap:wrap"><span class="num" style="font-size:80px">${c[1]}</span><span style="font-weight:600;opacity:.7">${c[2]}</span></span><p style="margin:0;font-size:16px;line-height:1.5;opacity:.85">${c[3]}</p></article>`;
document.getElementById("alt").innerHTML=`
<section class="hero mv-field-${d.field}"><span class="ghostnum num" aria-hidden="true">vs</span><span class="eyebrow" style="opacity:.8">Manuva vs ${d.them}</span><h1 class="disp" style="font-size:11vw;max-width:16ch">${d.h1[0]}<span class="hl">${d.h1[1]}</span></h1><div class="row"><a class="pill" href="#">Start free</a><a class="pill ghost" href="pricing.html">See pricing</a></div><span style="font-size:14px;opacity:.8">14 days free, full Pro access. No credit card.</span></section>
<section class="sec"><div class="split"><div class="stick" style="display:grid;gap:18px"><h2 class="disp" style="font-size:clamp(40px,9vw,72px)">${d.gapTitle}</h2><p class="sub" style="color:var(--ink-muted)">${d.gapBody}</p></div><ul class="nlist">${d.pillars.map(([t,p],i)=>`<li><span class="i">0${i+1}</span><h3>${t}</h3><p>${p}</p></li>`).join("")}</ul></div></section>
<section class="mv-field-ink"><div class="intro" data-from="paper" data-shape="${k==="katana"?1:4}"><div class="ipin"><div class="cut mv-field-ink"><span class="pnum num" data-rate="30" aria-hidden="true">${String(cnt).padStart(2,"0")}</span><span class="eyebrow" data-rate="70" style="color:var(--field-lime)">Feature comparison</span><h2 class="disp" data-rate="50">${cnt} things ${d.them} doesn't do.</h2><p class="pline" data-rate="90">Manuva vs ${d.them}, line by line.</p></div></div></div>
<div class="wrap" style="padding-bottom:96px;display:grid;gap:24px"><div class="ctable"><div class="r h"><span></span><span class="eyebrow" style="color:var(--field-lime)">Manuva</span><span class="eyebrow" style="opacity:.5">${d.them}</span></div>${d.matrix.map(([l,a,b])=>`<div class="r"><span class="k" style="opacity:.85">${l}</span><span class="us ${a?"yes":"no"}" style="color:var(--field-lime)" aria-label="${a?"Yes":"No"}"></span><span class="them ${b?"yes":"no"}" aria-label="${b?"Yes":"No"}"></span></div>`).join("")}</div><p class="sub" style="opacity:.7;font-size:15px;max-width:58ch">${d.note}</p></div></section>
<section class="sec"><h2 class="disp">What you actually pay.</h2><div class="pgrid">${price(d.us,true)}${price(d.they,false)}</div></section>
<section class="sec" style="padding-top:24px"><div class="split"><h2 class="disp stick" style="font-size:clamp(40px,9vw,72px)">Switching from ${d.them} — common questions</h2><div class="faq">${d.faqs.map((q,i)=>`<details${i?"":" open"}><summary>${q}</summary><p><span class="todo">TODO: copy</span>Answer lives in alternatives/${k}.html — carry it across verbatim.</p></details>`).join("")}</div></div></section>
<section class="outro mv-field-lime"><p class="disp">Try Manuva free for 14 days.</p><p class="sub">Full Pro access. No credit card, no migration fee, no kickoff call.</p><div class="row"><a class="pill ink" href="#">Start free</a><a class="pill ghost" href="alt-${other[0]}.html">vs ${other[1]} →</a></div></section>`;
})();
