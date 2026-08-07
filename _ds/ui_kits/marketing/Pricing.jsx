(function(){
/* Every number and claim on this page comes from the live site repo
   (KasperPac/ManuvaMarketing @ llms.txt). Nothing here is invented —
   if a figure changes there, change it here. */
const __mv = n => { const C = props => { const R = (window.MV||{})[n];
  return R ? React.createElement(R, props) : null; }; C.displayName = n; return C; };
const Logo=__mv("Logo"), Icon=__mv("Icon"), Button=__mv("Button"), StatusBadge=__mv("StatusBadge");

const MAX={maxWidth:"var(--page-max)",margin:"0 auto",padding:"0 var(--space-8)"};
const DISPLAY={fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 118,"wght" 800',fontWeight:800,lineHeight:"var(--lh-display)",letterSpacing:"var(--ls-mega)",textWrap:"balance",margin:0};
const NAV=["Features","Pricing","Compare","About"];

const PLANS=[
  {name:"Starter",mo:99,yr:"1,188",moM:119,field:"cobalt",limit:"1 location · up to 5 office seats",
   feats:["Inventory & stock control","Single-level BOMs","Production orders","Purchase orders","Stocktake"]},
  {name:"Growth",mo:249,yr:"2,988",moM:299,field:"violet",limit:"Multi-location · unlimited users",popular:true,
   feats:["Everything in Starter","Multi-level BOMs","BOM versioning & compare","Costing & reports","Shopify sync"]},
  {name:"Pro",mo:499,yr:"5,988",moM:599,field:"flare",limit:"Unlimited locations & users",
   feats:["Everything in Growth","Capacity planning","Profitability dashboard","API access","Priority support"]},
  {name:"Enterprise",custom:true,field:"ink",limit:"Unlimited everything",
   feats:["Everything in Pro","Multi-site","SSO / SAML","Dedicated CSM","Custom SLAs"]}
];

const MATRIX=[
  ["Inventory & stock control",1,1,1,1],
  ["Production orders",1,1,1,1],
  ["Multi-level BOMs",0,1,1,1],
  ["BOM versioning & rollback",0,1,1,1],
  ["Yield % per BOM line",0,1,1,1],
  ["Costing & profitability",0,1,1,1],
  ["Shopify sync",0,1,1,1],
  ["Capacity planning",0,0,1,1],
  ["PO variance reporting",0,0,1,1],
  ["API access",0,0,1,1],
  ["SSO / SAML",0,0,0,1]
];

const FAQS=[
  ["What counts as a warehouse location?","A location is any physical place you store components or finished goods — a warehouse, a storage room, a third-party facility. Bin and aisle areas within a single location do not count as additional locations."],
  ["Is pricing per seat?","No. Manuva uses flat per-account pricing. Growth and above include unlimited team members."],
  ["What do I get during the free trial?","Full Pro-level access for 14 days, no credit card required. At the end of the trial the account moves to the tier you selected at sign-up."],
  ["What is BOM versioning?","Every change to a bill of materials is saved as a numbered, timestamped version. Draft changes, publish when ready, compare any two versions side by side to see added, removed and modified components with cost and margin impact — and roll back to any previous version."],
  ["What is yield % per BOM line?","Yield % sets a scrap or loss allowance on each component. If a process consumes 10% more fabric than the nominal quantity, setting yield to 90% makes Manuva increase material requirements automatically — so purchasing and stock planning reflect real consumption, not theory."]
];

const INTEGRATIONS=["Shopify","WooCommerce","Amazon","Etsy","Xero","QuickBooks","MYOB"];

function Nav(){
  return (
    <header style={{position:"sticky",top:0,zIndex:40,background:"var(--field-paper)"}}>
      <div style={{...MAX,height:88,display:"flex",alignItems:"center",gap:"var(--space-10)"}}>
        <Logo variant="lockup" height={24} base="../../" style={{color:"var(--ink-strong)",flex:"none"}}/>
        <nav style={{display:"flex",gap:"var(--space-6)",flex:1}}>
          {NAV.map(n=><a key={n} href="#" style={{fontSize:15,fontWeight:n==="Pricing"?800:600,
            color:"var(--ink-strong)",textDecoration:"none",whiteSpace:"nowrap"}}>{n}</a>)}
        </nav>
        <a href="#" style={{fontSize:15,fontWeight:600,color:"var(--ink-strong)",textDecoration:"none",whiteSpace:"nowrap"}}>Sign in</a>
        <Button as="a" href="#" size="lg" shape="pill" variant="ink" className="mv-press"
          style={{padding:"0 22px",fontSize:15}}>Start free</Button>
      </div>
    </header>
  );
}

function Hero({annual,setAnnual}){
  return (
    <section style={{background:"var(--field-paper)",padding:"0 var(--space-8) var(--space-8)"}}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",background:"var(--field-cobalt)",color:"var(--on-cobalt)",
        borderRadius:"var(--radius-panel)",padding:"var(--space-20) var(--space-16)",display:"grid",
        justifyItems:"center",textAlign:"center",gap:"var(--space-6)"}}>
        <span className="mv-eyebrow" style={{color:"rgb(255 255 255/.72)"}}>Pricing</span>
        <h1 style={{...DISPLAY,fontSize:"var(--fs-display-5)",maxWidth:"15ch"}}>
          Flat pricing. <span style={{color:"#C8FF2E"}}>Unlimited users.</span>
        </h1>
        <p style={{margin:0,maxWidth:"46ch",fontSize:20,lineHeight:1.45,color:"rgb(255 255 255/.82)",textWrap:"pretty"}}>
          Every plan includes a 14-day free trial with full Pro access. No credit card required.
        </p>
        <div role="group" aria-label="Billing period" style={{display:"flex",gap:4,padding:4,marginTop:"var(--space-2)",
          background:"rgb(255 255 255/.16)",borderRadius:"var(--radius-pill)"}}>
          {[["Annual",true],["Monthly",false]].map(([label,val])=>(
            <button key={label} type="button" onClick={()=>setAnnual(val)} aria-pressed={annual===val}
              style={{height:44,padding:"0 24px",border:0,cursor:"pointer",borderRadius:"var(--radius-pill)",
                fontFamily:"var(--font-body)",fontSize:15,fontWeight:700,
                background:annual===val?"#fff":"transparent",color:annual===val?"var(--field-cobalt)":"#fff"}}>
              {label}{val&&<span style={{marginLeft:8,fontSize:12,fontWeight:700,
                color:annual===val?"var(--field-cobalt)":"#C8FF2E"}}>save 20%</span>}
            </button>))}
        </div>
      </div>
    </section>
  );
}

function Plans({annual}){
  return (
    <section style={{background:"var(--field-paper)",padding:"var(--space-16) 0 var(--space-20)"}}>
      <div style={{...MAX,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"var(--space-4)",alignItems:"start"}}>
        {PLANS.map(p=>{
          const dark=p.field==="ink"||p.popular;
          return (
            <div key={p.name} style={{position:"relative",background:p.popular?"var(--field-ink)":"var(--bg-card)",
              color:p.popular?"#fff":"var(--ink-strong)",borderRadius:"var(--radius-tile)",padding:"var(--space-8)",
              border:p.popular?"0":"var(--border-rule) solid var(--stroke-card)",
              display:"grid",gap:"var(--space-6)",minHeight:520,gridTemplateRows:"auto auto auto 1fr auto",
              boxShadow:p.popular?"0 24px 60px rgb(20 20 19/.24)":"none"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                <span style={{fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 112,"wght" 800',
                  fontSize:24,letterSpacing:"-.02em"}}>{p.name}</span>
                {p.popular&&<span style={{background:"#C8FF2E",color:"#141413",padding:"4px 10px",fontSize:11,
                  fontWeight:800,letterSpacing:".1em",textTransform:"uppercase",borderRadius:"var(--radius-pill)"}}>Popular</span>}
              </div>
              <div style={{display:"grid",gap:4}}>
                {p.custom?(
                  <span className="mv-numeral" style={{fontSize:52,lineHeight:1}}>Custom</span>
                ):(
                  <>
                    <span style={{display:"flex",alignItems:"baseline",gap:2}}>
                      <span className="mv-numeral" style={{fontSize:30,opacity:.55}}>$</span>
                      <span className="mv-numeral" style={{fontSize:60,lineHeight:1}}>{annual?p.mo:p.moM}</span>
                      <span style={{fontSize:15,fontWeight:600,opacity:.55,marginLeft:4}}>/mo</span>
                    </span>
                    <span style={{fontSize:13,opacity:.6}}>
                      {annual?`$${p.yr} billed yearly`:"billed monthly"}
                    </span>
                  </>
                )}
              </div>
              <span style={{fontSize:13,lineHeight:1.45,opacity:.7,
                borderTop:`var(--border-rule) solid ${p.popular?"rgb(255 255 255/.16)":"var(--stroke)"}`,
                paddingTop:"var(--space-4)"}}>{p.limit}</span>
              <ul style={{margin:0,padding:0,listStyle:"none",display:"grid",gap:"var(--space-3)",alignContent:"start"}}>
                {p.feats.map(f=>(
                  <li key={f} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:14,lineHeight:1.4}}>
                    <span style={{color:p.popular?"#C8FF2E":`var(--field-${p.field})`,flex:"none",marginTop:1}}>
                      <Icon name="check" size={16}/></span>
                    <span style={{opacity:p.popular?.9:1}}>{f}</span>
                  </li>))}
              </ul>
              <Button as="a" href="#" size="lg" shape="pill" className="mv-press"
                variant={p.popular?"primary":"secondary"}
                style={p.popular?{background:"#C8FF2E",borderColor:"#C8FF2E",color:"#141413",width:"100%"}:{width:"100%"}}>
                {p.custom?"Talk to sales":"Start free"}
              </Button>
            </div>);
        })}
      </div>
    </section>
  );
}

function Matrix(){
  const cell=v=>v?<Icon name="check" size={17}/>:<span style={{color:"var(--ink-faint)"}}>—</span>;
  return (
    <section style={{background:"var(--tint-cobalt)",padding:"var(--space-20) 0"}}>
      <div style={{...MAX,display:"grid",gap:"var(--space-10)"}}>
        <h2 style={{...DISPLAY,fontSize:"var(--fs-display-2)",color:"var(--ink-strong)",maxWidth:"16ch"}}>
          What's in each plan.
        </h2>
        <div style={{background:"var(--bg-card)",borderRadius:"var(--radius-tile)",overflow:"hidden",
          boxShadow:"0 20px 50px rgb(20 20 19/.12)"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr repeat(4,1fr)",alignItems:"center",
            padding:"var(--space-5) var(--space-6)",borderBottom:"var(--border-rule) solid var(--stroke)"}}>
            <span className="mv-eyebrow" style={{color:"var(--ink-faint)"}}>Feature</span>
            {PLANS.map(p=><span key={p.name} className="mv-eyebrow" style={{textAlign:"center",
              color:p.popular?"var(--field-violet)":"var(--ink-muted)"}}>{p.name}</span>)}
          </div>
          {MATRIX.map(([label,...vals],i)=>(
            <div key={label} style={{display:"grid",gridTemplateColumns:"2fr repeat(4,1fr)",alignItems:"center",
              padding:"var(--space-4) var(--space-6)",background:i%2?"var(--bg-card-2)":"transparent"}}>
              <span style={{fontSize:14,color:"var(--ink-strong)"}}>{label}</span>
              {vals.map((v,j)=><span key={j} style={{display:"grid",placeItems:"center",
                color:v?"var(--success)":"inherit"}}>{cell(v)}</span>)}
            </div>))}
        </div>
      </div>
    </section>
  );
}

function Compare(){
  const rows=[["Pricing model","Flat per account","Per user, per month"],
    ["A 10-person team","$249/mo","$490/mo"],
    ["Yield % per BOM line","Included","Not offered"],
    ["BOM versioning & compare","Included","Not offered"],
    ["PO variance reporting","Included","Not offered"]];
  return (
    <section style={{background:"var(--field-ink)",color:"#fff",padding:"var(--space-20) 0"}}>
      <div style={{...MAX,display:"grid",gridTemplateColumns:"1fr 1.25fr",gap:"var(--space-16)",alignItems:"center"}}>
        <div style={{display:"grid",gap:"var(--space-5)"}}>
          <span className="mv-eyebrow" style={{color:"#C8FF2E"}}>Versus per-seat MRP</span>
          <h2 style={{...DISPLAY,fontSize:"var(--fs-display-2)"}}>Your team growing shouldn't cost more.</h2>
          <p style={{margin:0,fontSize:17,lineHeight:1.6,color:"rgb(255 255 255/.7)",maxWidth:"42ch",textWrap:"pretty"}}>
            Tools that charge per user punish you for putting Manuva on the floor. Growth and Pro include unlimited team members at a flat rate.
          </p>
        </div>
        <div style={{display:"grid"}}>
          <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr 1fr",padding:"0 0 var(--space-3)"}}>
            <span/>
            <span className="mv-eyebrow" style={{color:"#C8FF2E"}}>Manuva</span>
            <span className="mv-eyebrow" style={{color:"rgb(255 255 255/.42)"}}>Per-seat MRP</span>
          </div>
          {rows.map(([k,a,b])=>(
            <div key={k} style={{display:"grid",gridTemplateColumns:"1.3fr 1fr 1fr",alignItems:"center",
              padding:"var(--space-4) 0",borderTop:"var(--border-rule) solid rgb(255 255 255/.14)"}}>
              <span style={{fontSize:14,color:"rgb(255 255 255/.62)"}}>{k}</span>
              <span style={{fontSize:15,fontWeight:700}}>{a}</span>
              <span style={{fontSize:14,color:"rgb(255 255 255/.4)"}}>{b}</span>
            </div>))}
        </div>
      </div>
    </section>
  );
}

function Integrations(){
  return (
    <section style={{background:"var(--field-paper)",padding:"var(--space-16) 0"}}>
      <div style={{...MAX,display:"grid",gap:"var(--space-6)",justifyItems:"center",textAlign:"center"}}>
        <span className="mv-eyebrow" style={{color:"var(--ink-faint)"}}>Connects with</span>
        <div style={{display:"flex",flexWrap:"wrap",gap:"var(--space-3)",justifyContent:"center"}}>
          {INTEGRATIONS.map(i=>(
            <span key={i} style={{padding:"10px 20px",borderRadius:"var(--radius-pill)",
              border:"var(--border-rule) solid var(--stroke-card)",fontSize:15,fontWeight:600,
              color:"var(--ink-strong)",background:"var(--bg-card)"}}>{i}</span>))}
        </div>
      </div>
    </section>
  );
}

function FAQ(){
  return (
    <section style={{background:"var(--field-paper)",padding:"var(--space-20) 0"}}>
      <div style={{...MAX,display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:"var(--space-16)",alignItems:"start"}}>
        <h2 style={{...DISPLAY,fontSize:"var(--fs-display-2)",color:"var(--ink-strong)",maxWidth:"11ch",
          position:"sticky",top:120}}>Questions, answered.</h2>
        <div style={{display:"grid"}}>
          {FAQS.map(([q,a],i)=>(
            <details key={q} open={i===0} style={{borderTop:"var(--border-rule) solid var(--stroke-strong)",
              padding:"var(--space-5) 0"}}>
              <summary style={{cursor:"pointer",listStyle:"none",display:"flex",alignItems:"center",
                justifyContent:"space-between",gap:16,fontFamily:"var(--font-display)",
                fontVariationSettings:'"wdth" 106,"wght" 700',fontSize:19,letterSpacing:"-.015em",
                color:"var(--ink-strong)"}}>
                {q}<span style={{color:"var(--field-cobalt)",flex:"none"}}><Icon name="chevron-down" size={20}/></span>
              </summary>
              <p style={{margin:"var(--space-4) 0 0",maxWidth:"62ch",fontSize:15,lineHeight:1.6,
                color:"var(--ink-muted)",textWrap:"pretty"}}>{a}</p>
            </details>))}
        </div>
      </div>
    </section>
  );
}

function CTA(){
  return (
    <section style={{background:"var(--field-paper)",padding:"0 var(--space-8) var(--space-8)"}}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",background:"var(--field-flare)",color:"var(--on-flare)",
        borderRadius:"var(--radius-panel)",padding:"var(--space-20) var(--space-16)",textAlign:"center",
        display:"grid",justifyItems:"center",gap:"var(--space-6)"}}>
        <h2 style={{...DISPLAY,fontSize:"var(--fs-display-4)",maxWidth:"13ch"}}>Try the whole thing free.</h2>
        <p style={{margin:0,fontSize:19,lineHeight:1.45,color:"rgb(255 255 255/.86)",maxWidth:"40ch",textWrap:"pretty"}}>
          14 days of full Pro access. No credit card, no sales call to get started.
        </p>
        <div style={{display:"flex",gap:"var(--space-3)"}}>
          <Button as="a" href="#" size="xl" shape="pill" className="mv-press"
            style={{background:"#fff",borderColor:"#fff",color:"var(--field-flare)",padding:"0 32px"}}>Start free</Button>
          <Button as="a" href="#" size="xl" shape="pill" variant="ghost" className="mv-press"
            style={{color:"#fff",borderColor:"rgb(255 255 255/.46)",padding:"0 32px"}}>Talk to sales</Button>
        </div>
        <span style={{fontSize:14,color:"rgb(255 255 255/.72)"}}>
          Questions? <a href="mailto:hello@manuva.app" style={{color:"#fff",fontWeight:600}}>hello@manuva.app</a>
        </span>
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
          <span>© 2026 Pac Technologies Pty Ltd</span><span className="mv-mono">manuva.app</span>
        </div>
      </div>
    </footer>
  );
}

function Pricing(){
  const [annual,setAnnual]=React.useState(true);
  return (<div style={{background:"var(--field-paper)"}}>
    <Nav/><Hero annual={annual} setAnnual={setAnnual}/><Plans annual={annual}/>
    <Matrix/><Compare/><Integrations/><FAQ/><CTA/><Footer/>
  </div>);
}
Object.assign(window,{Pricing});
})();
