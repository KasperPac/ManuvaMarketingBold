(function(){
/* Layout for the /alternatives/* competitor-intercept pages.
   Headings, FAQ questions and feature claims are the LIVE SITE'S OWN
   (KasperPac/ManuvaMarketing @ alternatives/*.html + llms.txt).
   Body paragraphs marked TODO:copy are compressed for layout — pull the
   full text from the repo when building for production. Those pages rank;
   do not ship them thinner than they are today. */
const __mv = n => { const C = props => { const R = (window.MV||{})[n];
  return R ? React.createElement(R, props) : null; }; C.displayName = n; return C; };
const Logo=__mv("Logo"), Icon=__mv("Icon"), Button=__mv("Button");

const MAX={maxWidth:"var(--page-max)",margin:"0 auto",padding:"0 var(--space-8)"};
const DISPLAY={fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 118,"wght" 800',fontWeight:800,lineHeight:"var(--lh-display)",letterSpacing:"var(--ls-mega)",textWrap:"balance",margin:0};
const NAV=["Features","Pricing","Compare","About"];

const DATA={
  katana:{
    field:"violet",eyebrow:"Manuva vs Katana",
    h1:["Katana alternatives for Shopify manufacturers:"," why teams switch to Manuva"],
    gapTitle:"What Katana doesn't do that Shopify manufacturers need",
    gapBody:"Katana covers the basics well. The gaps show up once your BOMs get real — when a component has scrap, when a recipe changes mid-season, when you need to know which PO ran late.",
    pillars:[
      ["layers","BOM versioning + side-by-side comparison","Every change saved as a numbered version. Compare any two to see added, removed and modified components with cost and margin impact — then roll back."],
      ["package","Yield % per component line","Set a scrap allowance per component. A process that eats 10% more fabric plans for it, so purchasing reflects real consumption."],
      ["users","Capacity planning with staff costing","Model departments and staffing, plan against real capacity, and cost actual time against planned."]
    ],
    matrix:[["Yield % per BOM line",1,0],["BOM versioning & rollback",1,0],["Side-by-side BOM compare",1,0],
      ["BOM templates",1,0],["PO variance reporting",1,0],["Lead-time accuracy reports",1,0],
      ["Profitability dashboard",1,0],["Shopify sync",1,1],["Multi-level BOMs",1,1]],
    matrixNote:"None of the above are offered by Katana at any price tier.",
    priceUs:["Manuva Pro","$499","/mo flat","Unlimited users and locations. Capacity planning, profitability dashboard and API included."],
    priceThem:["Katana","Per tier","+ per user","Advanced features sit behind higher tiers, and seats are counted."],
    faqs:["Is Manuva a direct replacement for Katana?","Can I import my data from Katana?",
      "Does Manuva work with Shopify the same way Katana does?","What happens to my Katana account if I switch?"]
  },
  mrpeasy:{
    field:"flare",eyebrow:"Manuva vs MRPeasy",
    h1:["MRPeasy alternative:"," flat-rate manufacturing software for growing teams"],
    gapTitle:"MRPeasy pricing scales with headcount, not capability",
    gapBody:"Per-user pricing punishes you for putting the system where the work happens. Every person on the floor who should see a work order is a line item.",
    pillars:[
      ["refresh-cw","Native Shopify webhook sync","Real-time, webhook-driven, two-way. Orders cascade to production without a nightly batch or a CSV."],
      ["layers","BOM versioning with diff","Numbered versions with a true side-by-side diff — added, removed and modified lines, with cost and margin impact."],
      ["users","Flat-rate unlimited users","Growth and Pro include unlimited team members. Put it on every bench without doing seat maths."]
    ],
    matrix:[["Flat-rate pricing",1,0],["Unlimited users included",1,0],["Native Shopify webhooks",1,0],
      ["BOM versioning with diff",1,0],["Yield % per BOM line",1,0],["PO variance reporting",1,0],
      ["Capacity planning",1,1],["Multi-level BOMs",1,1],["Stock control",1,1]],
    matrixNote:"MRPeasy charges per user — a 10-person team reaches $490/mo before advanced features.",
    priceUs:["Manuva Growth","$249","/mo flat","Unlimited users. Multi-level BOMs, versioning, costing, reports and Shopify sync."],
    priceThem:["MRPeasy","$490","/mo at 10 users","Per-user pricing, before advanced features are added."],
    faqs:["Does Manuva have a per-user pricing tier like MRPeasy?","How does Manuva's Shopify sync compare to MRPeasy?",
      "Can I migrate from MRPeasy to Manuva without downtime?","What MRPeasy features does Manuva not yet have?"]
  }
};

function Nav(){
  return (
    <header style={{position:"sticky",top:0,zIndex:40,background:"var(--field-paper)"}}>
      <div style={{...MAX,height:88,display:"flex",alignItems:"center",gap:"var(--space-10)"}}>
        <Logo variant="lockup" height={24} base="../../" style={{color:"var(--ink-strong)",flex:"none"}}/>
        <nav style={{display:"flex",gap:"var(--space-6)",flex:1}}>
          {NAV.map(n=><a key={n} href="#" style={{fontSize:15,fontWeight:600,color:"var(--ink-strong)",
            textDecoration:"none",whiteSpace:"nowrap"}}>{n}</a>)}
        </nav>
        <a href="#" style={{fontSize:15,fontWeight:600,color:"var(--ink-strong)",textDecoration:"none",whiteSpace:"nowrap"}}>Sign in</a>
        <Button as="a" href="#" size="lg" shape="pill" variant="ink" className="mv-press"
          style={{padding:"0 22px",fontSize:15}}>Start free</Button>
      </div>
    </header>
  );
}

function Hero({d}){
  return (
    <section style={{background:"var(--field-paper)",padding:"0 var(--space-8) var(--space-8)"}}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",background:`var(--field-${d.field})`,
        color:`var(--on-${d.field})`,borderRadius:"var(--radius-panel)",
        padding:"var(--space-20) var(--space-16)",display:"grid",gap:"var(--space-6)"}}>
        <span className="mv-eyebrow" style={{color:"rgb(255 255 255/.72)"}}>{d.eyebrow}</span>
        <h1 style={{...DISPLAY,fontSize:"var(--fs-display-3)",maxWidth:"20ch"}}>
          {d.h1[0]}<span style={{color:"#C8FF2E"}}>{d.h1[1]}</span>
        </h1>
        <div style={{display:"flex",gap:"var(--space-3)",marginTop:"var(--space-2)"}}>
          <Button as="a" href="#" size="xl" shape="pill" className="mv-press"
            style={{background:"#C8FF2E",borderColor:"#C8FF2E",color:"#141413",padding:"0 30px"}}>Start free</Button>
          <Button as="a" href="#" size="xl" shape="pill" variant="ghost" className="mv-press"
            style={{color:"#fff",borderColor:"rgb(255 255 255/.42)",padding:"0 30px"}}>See pricing</Button>
        </div>
        <span style={{fontSize:14,color:"rgb(255 255 255/.7)"}}>14 days free, full Pro access. No credit card.</span>
      </div>
    </section>
  );
}

function Gap({d}){
  return (
    <section style={{background:"var(--field-paper)",padding:"var(--space-20) 0"}}>
      <div style={{...MAX,display:"grid",gap:"var(--space-10)"}}>
        <div style={{display:"grid",gap:"var(--space-4)",maxWidth:"62ch"}}>
          <h2 style={{...DISPLAY,fontSize:"var(--fs-display-2)",color:"var(--ink-strong)"}}>{d.gapTitle}</h2>
          <p style={{margin:0,fontSize:18,lineHeight:1.6,color:"var(--ink-muted)",textWrap:"pretty"}}>{d.gapBody}</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"var(--space-4)"}}>
          {d.pillars.map(([icon,title,body],i)=>{
            const f=["cobalt","violet","mint"][i];
            return (
              <div key={title} style={{background:`var(--tint-${f})`,borderRadius:"var(--radius-tile)",
                padding:"var(--space-8)",display:"grid",gap:"var(--space-4)",alignContent:"start"}}>
                <span style={{width:44,height:44,display:"grid",placeItems:"center",borderRadius:"var(--radius-md)",
                  background:`var(--field-${f})`,color:`var(--on-${f})`}}><Icon name={icon} size={22}/></span>
                <span style={{fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 108,"wght" 700',
                  fontSize:20,lineHeight:1.15,letterSpacing:"-.02em",color:"var(--ink-strong)"}}>{title}</span>
                <span style={{fontSize:15,lineHeight:1.55,color:"var(--ink-muted)",textWrap:"pretty"}}>{body}</span>
              </div>);
          })}
        </div>
      </div>
    </section>
  );
}

function Matrix({d,them}){
  return (
    <section style={{background:"var(--field-ink)",color:"#fff",padding:"var(--space-20) 0"}}>
      <div style={{...MAX,display:"grid",gap:"var(--space-8)"}}>
        <h2 style={{...DISPLAY,fontSize:"var(--fs-display-2)",maxWidth:"18ch"}}>Manuva vs {them} — feature comparison</h2>
        <div style={{display:"grid"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",padding:"0 0 var(--space-3)"}}>
            <span/>
            <span className="mv-eyebrow" style={{color:"#C8FF2E",textAlign:"center"}}>Manuva</span>
            <span className="mv-eyebrow" style={{color:"rgb(255 255 255/.42)",textAlign:"center"}}>{them}</span>
          </div>
          {d.matrix.map(([label,a,b])=>(
            <div key={label} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",alignItems:"center",
              padding:"var(--space-4) 0",borderTop:"var(--border-rule) solid rgb(255 255 255/.14)"}}>
              <span style={{fontSize:15,color:"rgb(255 255 255/.8)"}}>{label}</span>
              <span style={{display:"grid",placeItems:"center",color:"#C8FF2E"}}>
                {a?<Icon name="check" size={19}/>:<span style={{opacity:.35}}>—</span>}</span>
              <span style={{display:"grid",placeItems:"center",color:"rgb(255 255 255/.5)"}}>
                {b?<Icon name="check" size={19}/>:<span style={{opacity:.4}}>—</span>}</span>
            </div>))}
        </div>
        <p style={{margin:0,fontSize:15,color:"rgb(255 255 255/.6)",maxWidth:"58ch",textWrap:"pretty"}}>{d.matrixNote}</p>
      </div>
    </section>
  );
}

function Price({d,them}){
  const card=(title,big,unit,body,mine)=>(
    <div style={{background:mine?"var(--field-cobalt)":"var(--bg-card)",color:mine?"#fff":"var(--ink-strong)",
      border:mine?"0":"var(--border-rule) solid var(--stroke-card)",borderRadius:"var(--radius-tile)",
      padding:"var(--space-10)",display:"grid",gap:"var(--space-4)",alignContent:"start",minHeight:260}}>
      <span className="mv-eyebrow" style={{color:mine?"#C8FF2E":"var(--ink-faint)"}}>{title}</span>
      <span style={{display:"flex",alignItems:"baseline",gap:6}}>
        <span className="mv-numeral" style={{fontSize:64,lineHeight:1}}>{big}</span>
        <span style={{fontSize:16,fontWeight:600,opacity:.6}}>{unit}</span>
      </span>
      <span style={{fontSize:15,lineHeight:1.55,opacity:mine?.85:.7,textWrap:"pretty"}}>{body}</span>
    </div>
  );
  return (
    <section style={{background:"var(--field-paper)",padding:"var(--space-20) 0"}}>
      <div style={{...MAX,display:"grid",gap:"var(--space-8)"}}>
        <h2 style={{...DISPLAY,fontSize:"var(--fs-display-2)",color:"var(--ink-strong)"}}>What you actually pay</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-4)"}}>
          {card(d.priceUs[0],d.priceUs[1],d.priceUs[2],d.priceUs[3],true)}
          {card(d.priceThem[0],d.priceThem[1],d.priceThem[2],d.priceThem[3],false)}
        </div>
      </div>
    </section>
  );
}

function FAQ({d,them}){
  return (
    <section style={{background:"var(--tint-cobalt)",padding:"var(--space-20) 0"}}>
      <div style={{...MAX,display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:"var(--space-16)",alignItems:"start"}}>
        <h2 style={{...DISPLAY,fontSize:"var(--fs-display-1)",color:"var(--ink-strong)",maxWidth:"12ch"}}>
          Switching from {them} — common questions
        </h2>
        <div style={{display:"grid"}}>
          {d.faqs.map((q,i)=>(
            <details key={q} open={i===0} style={{borderTop:"var(--border-rule) solid var(--stroke-strong)",
              padding:"var(--space-5) 0"}}>
              <summary style={{cursor:"pointer",listStyle:"none",display:"flex",alignItems:"center",
                justifyContent:"space-between",gap:16,fontFamily:"var(--font-display)",
                fontVariationSettings:'"wdth" 106,"wght" 700',fontSize:19,letterSpacing:"-.015em",
                color:"var(--ink-strong)"}}>
                {q}<span style={{color:"var(--field-cobalt)",flex:"none"}}><Icon name="chevron-down" size={20}/></span>
              </summary>
              <p style={{margin:"var(--space-4) 0 0",maxWidth:"62ch",fontSize:15,lineHeight:1.6,
                color:"var(--ink-muted)",textWrap:"pretty"}}>
                <span style={{display:"inline-block",background:"var(--warning-dim)",color:"var(--warning)",
                  fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",
                  padding:"2px 7px",borderRadius:4,marginRight:8}}>TODO: copy</span>
                Answer lives in <span className="mv-mono">alternatives/{them.toLowerCase()}.html</span> — carry it across verbatim.
              </p>
            </details>))}
        </div>
      </div>
    </section>
  );
}

function CTA(){
  return (
    <section style={{background:"var(--field-paper)",padding:"0 var(--space-8) var(--space-8)"}}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",background:"#C8FF2E",color:"#141413",
        borderRadius:"var(--radius-panel)",padding:"var(--space-20) var(--space-16)",textAlign:"center",
        display:"grid",justifyItems:"center",gap:"var(--space-6)"}}>
        <h2 style={{...DISPLAY,fontSize:"var(--fs-display-4)",maxWidth:"14ch"}}>Try Manuva free for 14 days</h2>
        <p style={{margin:0,fontSize:19,lineHeight:1.45,opacity:.72,maxWidth:"40ch",textWrap:"pretty"}}>
          Full Pro access. No credit card, no migration fee, no kickoff call.
        </p>
        <div style={{display:"flex",gap:"var(--space-3)"}}>
          <Button as="a" href="#" size="xl" shape="pill" variant="ink" className="mv-press"
            style={{padding:"0 32px"}}>Start free</Button>
          <Button as="a" href="#" size="xl" shape="pill" variant="ghost" className="mv-press"
            style={{color:"#141413",borderColor:"rgb(20 20 19/.3)",padding:"0 32px"}}>Talk to us</Button>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer style={{background:"var(--field-ink)",color:"rgb(255 255 255/.62)"}}>
      <div style={{...MAX,padding:"var(--space-16) var(--space-8)",display:"grid",
        gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"var(--space-10)"}}>
        <div style={{display:"grid",gap:"var(--space-5)",alignContent:"start"}}>
          <Logo variant="lockup" height={24} base="../../" style={{color:"#fff"}}/>
          <span style={{fontSize:15,maxWidth:"28ch",lineHeight:1.5}}>Manufacturing operations, finally simple.</span>
          <a href="mailto:hello@manuva.app" style={{fontSize:14,color:"rgb(255 255 255/.62)"}}>hello@manuva.app</a>
        </div>
        {[["Product",["Features","Pricing"]],
          ["Compare",["vs Katana","vs MRPeasy"]],
          ["Company",["About","Privacy","Terms"]]].map(([h,items])=>(
          <div key={h} style={{display:"grid",gap:"var(--space-3)",alignContent:"start"}}>
            <span className="mv-eyebrow" style={{color:"#C8FF2E",marginBottom:4}}>{h}</span>
            {items.map(i=><a key={i} href="#" style={{fontSize:14,color:"rgb(255 255 255/.62)",
              textDecoration:"none"}}>{i}</a>)}
          </div>))}
      </div>
      <div style={{borderTop:"var(--border-rule) solid rgb(255 255 255/.12)"}}>
        <div style={{...MAX,padding:"var(--space-5) var(--space-8)",display:"flex",
          justifyContent:"space-between",fontSize:12,color:"rgb(255 255 255/.42)"}}>
          <span>© 2026 Pac Technologies Pty Ltd</span><span className="mv-mono">manuva.app/alternatives</span>
        </div>
      </div>
    </footer>
  );
}

function Alternative({competitor="katana"}){
  const d=DATA[competitor];
  const them=competitor==="katana"?"Katana":"MRPeasy";
  return (<div style={{background:"var(--field-paper)"}}>
    <Nav/><Hero d={d}/><Gap d={d}/><Matrix d={d} them={them}/>
    <Price d={d} them={them}/><FAQ d={d} them={them}/><CTA/><Footer/>
  </div>);
}
Object.assign(window,{Alternative});
})();
