/* Manuva marketing site — shared behaviour. Every effect is driven off scroll
   position in one rAF, never an observer, so a flick or a restored scroll can't
   strand a transition. With prefers-reduced-motion, shapes are skipped. */
(()=>{
const PAGES=[["features","Features","features.html"],["pricing","Pricing","pricing.html"],["compare","Compare","alt-katana.html"],["customers","Customers","customers.html"]];
const page=document.body.dataset.page;
const cur=k=>k===page?' aria-current="page"':"";
document.body.insertAdjacentHTML("afterbegin",
 `<div id="drawer" aria-hidden="true"><span class="mark dmark" aria-hidden="true"></span><button class="x" aria-label="Close menu">×</button>${PAGES.map(([k,l,h])=>`<a href="${h}"${cur(k)}>${l}</a>`).join("")}<a class="small" href="#">Sign in</a><a class="small" href="#" style="margin-top:0">Start free →</a></div>`+
 `<header class="site-head"><div class="bar"><a href="index.html" class="mark" aria-label="Manuva home"></a><nav class="links">${PAGES.map(([k,l,h])=>`<a href="${h}"${cur(k)}>${l}</a>`).join("")}<a href="#" style="margin-left:auto">Sign in</a></nav><button class="burger" aria-label="Open menu" aria-expanded="false"><i></i></button></div></header>`);
document.body.insertAdjacentHTML("beforeend",
 `<footer class="site-foot"><div class="cols"><div><span class="eyebrow">Product</span><a href="features.html">Features</a><a href="pricing.html">Pricing</a><a href="customers.html">Customers</a></div><div><span class="eyebrow">Compare</span><a href="alt-katana.html">vs Katana</a><a href="alt-mrpeasy.html">vs MRPeasy</a></div><div><span class="eyebrow">Company</span><a href="#">About</a><a href="#">Privacy</a><a href="#">Terms</a></div><div><span class="eyebrow">Talk to us</span><a href="mailto:hello@manuva.app">hello@manuva.app</a></div></div><span class="logo-big" role="img" aria-label="Manuva"></span><div class="legal"><span>© 2026 Pac Technologies Pty Ltd</span><span>Manufacturing operations, finally simple.</span></div></footer>`);
/* Real lockup, inlined so it paints in currentColor. */
fetch("../../assets/logo-lockup.svg").then(r=>r.text()).then(s=>{s=s.replace(/ color="[^"]*"/,"");document.querySelectorAll(".mark,.logo-big").forEach((el,i)=>el.innerHTML=s.replace(/mv-knock/g,"mv-knock-"+i))});
/* Header takes the text colour of whatever field is under it. */
const head=document.querySelector(".site-head");
function headColor(){head.style.visibility="hidden";const el=document.elementFromPoint(innerWidth/2,32);head.style.visibility="";
 let n=el;while(n&&n!==document.body){const bgc=getComputedStyle(n).backgroundColor;if(bgc&&bgc!=="rgba(0, 0, 0, 0)"&&bgc!=="transparent")break;n=n.parentElement}
 head.style.color=getComputedStyle(n||document.body).color}
const dr=document.getElementById("drawer"),bg=document.querySelector(".burger");
const open=o=>{dr.dataset.open=o?"1":"";dr.setAttribute("aria-hidden",String(!o));bg.setAttribute("aria-expanded",String(o));document.body.style.overflow=o?"hidden":""};
bg.onclick=()=>open(true);dr.querySelector(".x").onclick=()=>open(false);dr.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>open(false)));
addEventListener("keydown",e=>{if(e.key==="Escape")open(false)});

const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const ease=u=>u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2,cl=v=>Math.min(1,Math.max(0,v));
/* Big shapes, never fades. Index with data-shape. */
const SHAPES=[
 u=>`circle(${u*152}% at 50% 62%)`,
 u=>`polygon(0% ${118-u*168}%,100% ${152-u*168}%,100% 102%,0% 102%)`,
 u=>{const r=u*118;return `polygon(50% ${50-r}%,${50+r}% 50%,50% ${50+r}%,${50-r}% 50%)`},
 u=>`inset(0% ${102-u*104}% 0% 0%)`,
 u=>`polygon(${100-u*142}% 0%,102% 0%,102% 102%,${142-u*142}% 102%)`,
 u=>`inset(${(1-u)*50}% 0% ${(1-u)*50}% 0%)`
];
const drift=(root,amt)=>root.querySelectorAll("[data-rate]").forEach(e=>e.style.transform=`translate3d(0,${amt*+e.dataset.rate}px,0)`);

/* 1 · intros: <div class="intro" data-from="ink" data-shape="0"><div class="ipin"><div class="cut mv-field-x">… */
const intros=[...document.querySelectorAll(".intro")];
intros.forEach(n=>{const p=n.querySelector(".ipin");if(n.dataset.from)p.style.background=`var(--field-${n.dataset.from})`});
const introU=n=>{const H=innerHeight,top=n.getBoundingClientRect().top,span=n.offsetHeight-H+H*.35;return ease(cl((H*.35-top)/Math.max(1,span*.8)))};
window.MVSite={introEnd:n=>n.getBoundingClientRect().top+scrollY+(n.offsetHeight-innerHeight)*.85};

/* 2 · stage: <section class="stage"><div class="pin"><a class="panel" data-shape="n">… many panels, one pin */
const stages=[...document.querySelectorAll(".stage")].map(s=>{const panels=[...s.querySelectorAll(".panel")];
 s.style.height=(panels.length*100)+"svh";panels.forEach((p,i)=>p.style.zIndex=i);
 const t=document.createElement("div");t.className="ticks";t.innerHTML=panels.map(()=>"<i></i>").join("");s.querySelector(".pin").appendChild(t);
 return{s,panels,ticks:[...t.children]}});

/* 3 · marquee — base drift, speeds up with scroll velocity */
const mq=[...document.querySelectorAll(".marquee .track")];mq.forEach(t=>t.innerHTML+=t.innerHTML);
let mx=0,lastY=scrollY,lastT=performance.now(),vel=0;
function tick(now){const dt=Math.min(64,now-lastT);lastT=now;vel*=.92;
 if(!reduce)mq.forEach(t=>{mx-=(0.05+Math.min(2.5,vel))*dt;const w=t.scrollWidth/2;if(-mx>w)mx+=w;t.style.transform=`translate3d(${mx}px,0,0)`});
 requestAnimationFrame(tick)}
if(mq.length)requestAnimationFrame(tick);

/* 4 · chips: <nav id="chips"> + sections with data-chip="Label" data-field="x" */
const chipSecs=[...document.querySelectorAll("[data-chip]")],chipsEl=document.getElementById("chips");let chipAct=-2,chipLinks=[];
if(chipsEl&&chipSecs.length){chipsEl.dataset.hide="1";chipsEl.innerHTML=`<div class="ctrack">${chipSecs.map((s,i)=>`<a href="#${s.id}" data-jump="${i}">${s.dataset.chip}</a>`).join("")}</div>`;chipLinks=[...chipsEl.querySelectorAll("a")]}
document.addEventListener("click",e=>{const a=e.target.closest("[data-jump]");if(!a)return;const s=chipSecs[+a.dataset.jump];if(!s)return;e.preventDefault();
 const n=s.querySelector(".intro");scrollTo({top:n?MVSite.introEnd(n):s.offsetTop,behavior:reduce?"auto":"smooth"});history.replaceState(null,"","#"+s.id)});

const ghosts=[...document.querySelectorAll(".ghostnum")];
let raf=0;
function draw(){raf=0;const H=innerHeight;headColor();
 intros.forEach(n=>{const c=n.querySelector(".cut"),u=reduce?1:introU(n);if(reduce)return;
  c.style.clipPath=SHAPES[(+n.dataset.shape||0)%SHAPES.length](u);c.style.visibility=u<=0?"hidden":"visible";drift(c,1-u)});
 stages.forEach(({s,panels,ticks})=>{const r=s.getBoundingClientRect(),h=s.offsetHeight-H,p=cl(-r.top/h),x=p*(panels.length-1);
  panels.forEach((el,i)=>{if(i>0&&!reduce){const u=ease(cl(x-(i-1)));el.style.clipPath=SHAPES[(+el.dataset.shape||i-1)%SHAPES.length](u);el.style.visibility=u<=0?"hidden":"visible"}
   if(reduce&&i>0)el.style.visibility=Math.round(x)>=i?"visible":"hidden";
   if(!reduce)drift(el,(x-i)*-1.2)});
  const a=Math.round(x);ticks[0].parentElement.style.color=getComputedStyle(panels[a]).color;ticks.forEach((t,j)=>t.dataset.on=j===a?"1":"")});
 if(!reduce)ghosts.forEach(g=>g.style.transform=`translate3d(0,${Math.min(scrollY,H)*.3}px,0)`);
 if(chipLinks.length){let a=-1;chipSecs.forEach((s,i)=>{if(s.getBoundingClientRect().top<=H*.5)a=i});
  const endEl=document.querySelector("[data-chips-end]");const end=endEl&&endEl.getBoundingClientRect().top<H*.6;
  chipsEl.dataset.hide=(a<0||end)?"1":"";
  if(a!==chipAct){chipAct=a;chipLinks.forEach((l,j)=>{const on=j===a,f=chipSecs[j].dataset.field;l.style.background=on?`var(--field-${f})`:"";l.style.color=on?`var(--on-${f})`:"";on?l.setAttribute("aria-current","true"):l.removeAttribute("aria-current")});
   const l=chipLinks[a];if(l){const t=l.parentElement;t.scrollTo({left:l.offsetLeft-(t.clientWidth-l.offsetWidth)/2,behavior:"smooth"})}}}}
addEventListener("scroll",()=>{const now=performance.now(),dy=Math.abs(scrollY-lastY);lastY=scrollY;vel=Math.max(vel,dy/16*.25);if(!raf)raf=requestAnimationFrame(draw)},{passive:true});
addEventListener("resize",()=>{stages.forEach(({s,panels})=>s.style.height=(panels.length*100)+"svh");draw()});
draw();
})();
