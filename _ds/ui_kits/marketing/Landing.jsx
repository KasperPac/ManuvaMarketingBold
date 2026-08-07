(function(){
/* Components resolve at render time so this file is inert when the
   design-system compiler evaluates it, and a missing export degrades one
   element instead of unmounting the tree. */
const __mv = n => { const C = props => { const R = (window.MV||{})[n];
  return R ? React.createElement(R, props) : null; }; C.displayName = n; return C; };
const Logo=__mv("Logo"), Icon=__mv("Icon"), StatusBadge=__mv("StatusBadge"), DataTable=__mv("DataTable"), StatusDot=__mv("StatusDot"), Button=__mv("Button");

const MAX={maxWidth:"var(--page-max)",margin:"0 auto",padding:"0 var(--space-8)"};
const DISPLAY={fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 118,"wght" 800',fontWeight:800,lineHeight:"var(--lh-display)",letterSpacing:"var(--ls-mega)",textWrap:"balance",margin:0};
const NAV=["Features","Pricing","Compare","About"];

/* Field rotation on the site is for RHYTHM, not meaning — no two
   adjacent panels share a hue. In-app, colour keeps its domain
   meaning (data-domain). See guidelines/marketing-fields.card.html. */
const DOMAINS=[
  ["01","package","Inventory","Stock, bins and goods inwards — counted once, true everywhere.","cobalt"],
  ["02","layers","Products & BOMs","Components, variants and bills of materials you can actually reuse.","violet"],
  ["03","factory","Production","Work orders, labour and stock allocation on one board.","flare"],
  ["04","shopping-cart","Purchasing","Suppliers, POs and receiving, with lead times that mean something.","amber"],
  ["05","truck","Logistics","Pack, despatch and carriers from a single screen.","mint"],
  ["06","history","Audit","Who moved what, when. Every movement, kept forever.","aqua"]
];

function useReveal(){
  React.useEffect(()=>{
    const root=document.documentElement;
    const els=Array.from(document.querySelectorAll(".mv-reveal"));
    const showAll=()=>els.forEach(e=>{e.dataset.in="1";});
    if(!("IntersectionObserver" in window))return;
    root.dataset.revealArmed="1";
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting){e.target.dataset.in="1";io.unobserve(e.target);}
    }),{threshold:0});
    els.forEach(e=>io.observe(e));
    /* Failsafe: anything still unrevealed after 2.5s — scroll restoration,
       a fragment jump, Cmd+End — is shown unconditionally. */
    const t=setTimeout(showAll,2500);
    return()=>{clearTimeout(t);io.disconnect();};
  },[]);
}

function Pill({bg="var(--field-ink)",fg="#fff",children,style,...rest}){
  return <Button as="a" href="#" size="xl" shape="pill" variant="ink" className="mv-press" {...rest}
    style={{background:bg,color:fg,borderColor:bg,padding:"0 30px",...style}}>{children}</Button>;
}

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

function Hero(){
  return (
    <section style={{background:"var(--field-paper)",padding:"0 var(--space-8) var(--space-8)"}}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",background:"var(--field-cobalt)",color:"var(--on-cobalt)",
        borderRadius:"var(--radius-panel)",padding:"var(--space-24) var(--space-16) var(--space-16)",
        position:"relative",overflow:"hidden"}}>
        <span aria-hidden="true" className="mv-numeral" style={{position:"absolute",right:"-.06em",bottom:"-.34em",
          fontSize:"var(--fs-display-8)",color:"rgb(255 255 255/.10)",pointerEvents:"none"}}>1,240</span>
        <div style={{position:"relative",display:"grid",gap:"var(--space-8)",justifyItems:"start"}}>
          <span className="mv-eyebrow" style={{color:"rgb(255 255 255/.72)"}}>MRP for Shopify manufacturers</span>
          <h1 style={{...DISPLAY,fontSize:"var(--fs-display-6)",maxWidth:"11ch"}}>
            Make it.{" "}
            <span style={{background:"var(--field-lime)",color:"var(--on-lime)",padding:"0 .12em .06em",
              borderRadius:12,boxDecorationBreak:"clone",WebkitBoxDecorationBreak:"clone"}}>Track it.</span>{" "}
            Ship it.
          </h1>
          <p style={{margin:0,maxWidth:"46ch",fontSize:22,lineHeight:1.45,color:"rgb(255 255 255/.82)",textWrap:"pretty"}}>
            Inventory, BOMs, work orders and stock control — connected, live, and built for people standing on a factory floor.
          </p>
          <div style={{display:"flex",gap:"var(--space-4)",alignItems:"center",marginTop:"var(--space-2)"}}>
            <Pill bg="var(--field-lime)" fg="var(--on-lime)">Start free</Pill>
            <Pill bg="rgb(255 255 255/.14)" fg="#fff" style={{boxShadow:"inset 0 0 0 1.5px rgb(255 255 255/.4)"}}>Book a demo</Pill>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee(){
  const words=["Yield % on every BOM line","BOM versioning with rollback","Unlimited users on Growth","Real-time Shopify webhooks","14-day free trial"];
  return (
    <div className="mv-field-lime" style={{overflow:"hidden",padding:"var(--space-5) 0"}}>
      <div className="mv-marquee-track">
        {[...words,...words].map((w,i)=>(
          <span key={i} style={{display:"flex",alignItems:"center",gap:"var(--space-8)",padding:"0 var(--space-8)",
            fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 100,"wght" 700',fontWeight:700,
            fontSize:20,letterSpacing:"-.01em",whiteSpace:"nowrap"}}>
            {w}<span style={{width:9,height:9,borderRadius:"50%",background:"var(--on-lime)",flex:"none"}}/>
          </span>))}
      </div>
    </div>
  );
}

function ProductShot(){
  const rows=(window.MV_DATA?window.MV_DATA.stock:[]).slice(0,5);
  return (
    <section style={{background:"var(--tint-cobalt)",padding:"var(--space-24) 0"}}>
      <div style={{...MAX,display:"grid",gap:"var(--space-12)"}}>
        <div className="mv-reveal" style={{display:"grid",gap:"var(--space-4)",justifyItems:"center",textAlign:"center"}}>
          <span className="mv-eyebrow" style={{color:"var(--cobalt-700)"}}>Live, not nightly</span>
          <h2 style={{...DISPLAY,fontSize:"var(--fs-display-3)",color:"var(--ink-strong)",maxWidth:"16ch"}}>One number, everywhere.</h2>
        </div>
        {/* Never a colour field behind a data table — the shot sits on a tint,
            and the table keeps the app's own white card surface. */}
        <div className="mv-reveal" data-domain="inventory" style={{background:"var(--bg-card)",
          borderRadius:"var(--radius-tile)",overflow:"hidden",boxShadow:"0 24px 60px rgb(20 20 19/.16)",transitionDelay:"90ms"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,
            padding:"var(--space-5) var(--space-6)",borderBottom:"1px solid var(--stroke)"}}>
            <div style={{display:"grid",gap:2}}>
              <span className="mv-key" style={{color:"var(--accent-text)"}}>Inventory</span>
              <span style={{fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 100,"wght" 700',
                fontSize:20,letterSpacing:"-.02em",color:"var(--ink-strong)"}}>Stock on hand</span>
            </div>
            <StatusDot tone="info" live label={<span style={{fontSize:12,color:"var(--ink-muted)"}}>Live from the floor</span>}/>
          </div>
          <DataTable density="compact" columns={[
            {key:"sku",header:"SKU",mono:true,width:130},
            {key:"name",header:"Product"},
            {key:"wh",header:"Warehouse",width:110,muted:true},
            {key:"oh",header:"On hand",align:"right",width:90,render:r=>r.oh.toLocaleString()},
            {key:"free",header:"Free",align:"right",width:90,render:r=>r.free.toLocaleString()},
            {key:"st",header:"Status",width:130,render:r=><StatusBadge tone={r.st[0]} dot>{r.st[1]}</StatusBadge>}
          ]} rows={rows}/>
        </div>
      </div>
    </section>
  );
}

function Domains(){
  return (
    <section style={{background:"var(--field-paper)",padding:"var(--space-24) 0"}}>
      <div style={{...MAX,display:"grid",gap:"var(--space-12)"}}>
        <h2 className="mv-reveal" style={{...DISPLAY,fontSize:"var(--fs-display-4)",color:"var(--ink-strong)",maxWidth:"14ch"}}>Six jobs. One system.</h2>
        {/* Tiles are one composed unit, not six folds of colour: paper shows
            between every tile, so no two fields ever touch. */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"var(--space-5)"}}>
          {DOMAINS.map(([num,icon,title,body,field],i)=>(
            <div key={num} className="mv-reveal mv-lift" style={{background:`var(--field-${field})`,
              color:`var(--on-${field})`,borderRadius:"var(--radius-tile)",padding:"var(--space-8)",minHeight:280,
              display:"grid",gridTemplateRows:"auto auto 1fr",gap:"var(--space-6)",transitionDelay:`${(i%3)*70}ms`}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
                <Icon name={icon} size={30}/>
                <span className="mv-score" style={{fontSize:52,opacity:.34}}>{num}</span>
              </div>
              <span style={{fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 112,"wght" 800',
                fontSize:30,lineHeight:1.02,letterSpacing:"-.025em",minHeight:"2.04em"}}>{title}</span>
              <span style={{fontSize:15,lineHeight:1.5,opacity:.82,textWrap:"pretty",alignSelf:"start"}}>{body}</span>
            </div>))}
        </div>
      </div>
    </section>
  );
}

function Split(){
  return (
    <section style={{background:"var(--field-paper)",padding:"0 var(--space-8) var(--space-24)"}}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",display:"grid",gridTemplateColumns:"1.25fr 1fr",gap:"var(--space-5)"}}>
        <div className="mv-reveal" style={{background:"var(--field-amber)",color:"var(--on-amber)",
          borderRadius:"var(--radius-panel)",padding:"var(--space-16)",display:"grid",
          alignContent:"space-between",gap:"var(--space-10)",minHeight:400}}>
          <span className="mv-eyebrow" style={{opacity:.7}}>Shortages</span>
          <div style={{display:"grid",gap:"var(--space-5)"}}>
            <span className="mv-numeral" style={{fontSize:"var(--fs-display-6)"}}>1,240</span>
            <h3 style={{...DISPLAY,fontSize:"var(--fs-display-2)",maxWidth:"14ch"}}>Know before the line stops.</h3>
            <p style={{margin:0,maxWidth:"40ch",fontSize:17,lineHeight:1.55,opacity:.78,textWrap:"pretty"}}>
              Manuva checks every BOM against live stock and tells you what's short — before the job hits the floor, not after.
            </p>
          </div>
          <Pill bg="var(--field-ink)" fg="#fff" style={{justifySelf:"start"}}>See how it works</Pill>
        </div>
        <div className="mv-reveal" style={{background:"var(--field-violet)",color:"var(--on-violet)",
          borderRadius:"var(--radius-panel)",padding:"var(--space-16)",display:"grid",
          alignContent:"space-between",gap:"var(--space-10)",minHeight:400,transitionDelay:"90ms"}}>
          <span className="mv-eyebrow" style={{opacity:.7}}>Purchasing</span>
          <div style={{display:"grid",gap:"var(--space-5)"}}>
            <span className="mv-numeral" style={{fontSize:"var(--fs-display-5)"}}>9<span style={{fontSize:28,opacity:.6,marginLeft:8}}>days</span></span>
            <h3 style={{...DISPLAY,fontSize:"var(--fs-display-1)",maxWidth:"13ch"}}>Reorder before you're asked.</h3>
          </div>
          <Logo variant="lockup" height={20} base="../../" style={{color:"#fff",justifySelf:"start"}}/>
        </div>
      </div>
    </section>
  );
}

function Comparison(){
  const rows=[["Pricing model","Flat per account","Per user, per month"],
    ["A 10-person team","$249/mo","$490/mo"],
    ["Yield % per BOM line","Included","Not offered"],
    ["BOM versioning","Compare + roll back","Not offered"]];
  return (
    <section className="mv-field-ink" style={{padding:"var(--space-24) 0"}}>
      <div style={{...MAX,display:"grid",gridTemplateColumns:"1fr 1.25fr",gap:"var(--space-16)",alignItems:"center"}}>
        <div className="mv-reveal" style={{display:"grid",gap:"var(--space-5)"}}>
          <span className="mv-eyebrow" style={{color:"var(--field-amber)"}}>Versus legacy MRP</span>
          <h2 style={{...DISPLAY,fontSize:"var(--fs-display-3)"}}>Priced for the shed, not the boardroom.</h2>
          <p style={{margin:0,fontSize:17,lineHeight:1.6,color:"rgb(255 255 255/.7)",maxWidth:"40ch",textWrap:"pretty"}}>
            Flat pricing, unlimited users from Growth up. Connect Shopify, import your BOMs, run your first job today.
          </p>
        </div>
        <div className="mv-reveal" style={{display:"grid",borderRadius:"var(--radius-tile)",overflow:"hidden",transitionDelay:"90ms"}}>
          <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr 1fr",padding:"var(--space-4) var(--space-6)",
            background:"rgb(255 255 255/.06)"}}>
            <span/>
            <span className="mv-eyebrow" style={{color:"var(--field-amber)"}}>Manuva</span>
            <span className="mv-eyebrow" style={{color:"rgb(255 255 255/.42)"}}>Legacy MRP</span>
          </div>
          {rows.map(([k,a,b])=>(
            <div key={k} style={{display:"grid",gridTemplateColumns:"1.3fr 1fr 1fr",alignItems:"center",
              padding:"var(--space-5) var(--space-6)",borderTop:"1px solid rgb(255 255 255/.1)"}}>
              <span style={{fontSize:14,color:"rgb(255 255 255/.62)"}}>{k}</span>
              <span style={{fontSize:16,fontWeight:700,color:"#fff"}}>{a}</span>
              <span style={{fontSize:15,color:"rgb(255 255 255/.4)"}}>{b}</span>
            </div>))}
        </div>
      </div>
    </section>
  );
}

function CTA(){
  return (
    <section style={{background:"var(--field-ink)",padding:"0 var(--space-8) var(--space-8)"}}>
      <div className="mv-reveal" style={{maxWidth:"var(--page-max)",margin:"0 auto",background:"var(--field-flare)",
        color:"var(--on-flare)",borderRadius:"var(--radius-panel)",padding:"var(--space-24) var(--space-16)",
        textAlign:"center",display:"grid",justifyItems:"center",gap:"var(--space-8)"}}>
        <h2 style={{...DISPLAY,fontSize:"var(--fs-display-5)",maxWidth:"12ch"}}>Run your first job today.</h2>
        <p style={{margin:0,fontSize:20,lineHeight:1.45,color:"rgb(255 255 255/.84)",maxWidth:"38ch",textWrap:"pretty"}}>
          14 days free with full Pro access. No credit card required.
        </p>
        <div style={{display:"flex",gap:"var(--space-4)"}}>
          <Pill bg="#fff" fg="var(--field-flare)">Start free</Pill>
          <Pill bg="rgb(255 255 255/.16)" fg="#fff" style={{boxShadow:"inset 0 0 0 1.5px rgb(255 255 255/.42)"}}>Talk to us</Pill>
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
        </div>
        {[["Product",["Features","Pricing"]],
          ["Compare",["vs Katana","vs MRPeasy"]],
          ["Company",["About","Privacy","Terms"]]].map(([h,items])=>(
          <div key={h} style={{display:"grid",gap:"var(--space-3)",alignContent:"start"}}>
            <span className="mv-eyebrow" style={{color:"var(--field-amber)",marginBottom:4}}>{h}</span>
            {items.map(i=><a key={i} href="#" style={{fontSize:14,color:"rgb(255 255 255/.62)",textDecoration:"none"}}>{i}</a>)}
          </div>))}
      </div>
      <div style={{borderTop:"1px solid rgb(255 255 255/.12)"}}>
        <div style={{...MAX,padding:"var(--space-5) var(--space-8)",display:"flex",justifyContent:"space-between",
          fontSize:12,color:"rgb(255 255 255/.42)"}}>
          <span>© 2026 Manuva</span><span className="mv-mono">manuva.app</span>
        </div>
      </div>
    </footer>
  );
}

function Landing(){
  useReveal();
  return (<div style={{background:"var(--field-paper)"}}>
    <Nav/><Hero/><Marquee/><ProductShot/><Domains/><Split/><Comparison/><CTA/><Footer/>
  </div>);
}
Object.assign(window,{Landing});
})();
