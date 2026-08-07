window.MV_DATA = {
  stock:[
    {id:1,sku:"SKU-4410-B",name:"Bracket, 6mm mild steel",wh:"Kingsgrove",oh:8412,alloc:1200,free:7212,rop:2000,st:["ok","In stock"]},
    {id:2,sku:"SKU-2288",name:"Hinge assembly, left",wh:"Kingsgrove",oh:240,alloc:240,free:0,rop:500,st:["warn","Low"]},
    {id:3,sku:"SKU-9014-C",name:"Powder coat, satin black 20L",wh:"Botany",oh:0,alloc:480,free:-480,rop:120,st:["danger","Short 480"]},
    {id:4,sku:"SKU-1102",name:"M6 flange nut, zinc",wh:"Kingsgrove",oh:54800,alloc:12000,free:42800,rop:10000,st:["ok","In stock"]},
    {id:5,sku:"SKU-7731",name:"Gas strut 250N",wh:"Botany",oh:1180,alloc:900,free:280,rop:400,st:["warn","Low"]},
    {id:6,sku:"SKU-3050-A",name:"Panel, 1200×600 alloy",wh:"Kingsgrove",oh:326,alloc:120,free:206,rop:150,st:["ok","In stock"]},
    {id:7,sku:"SKU-6612",name:"Weld wire ER70S-6, 15kg",wh:"Botany",oh:44,alloc:44,free:0,rop:20,st:["warn","Low"]},
    {id:8,sku:"SKU-8890-D",name:"Castor, braked 100mm",wh:"Kingsgrove",oh:2140,alloc:400,free:1740,rop:600,st:["ok","In stock"]}
  ],
  jobs:[
    {id:"WO-4192",product:"Trolley, heavy duty",qty:120,done:74,due:"Fri 14 Aug",cell:"Assembly 2",st:["danger","Blocked · 3 short"]},
    {id:"WO-4193",product:"Bench, 1800 stainless",qty:40,done:40,due:"Thu 13 Aug",cell:"Fabrication",st:["ok","Complete"]},
    {id:"WO-4194",product:"Trolley, light duty",qty:200,done:96,due:"Mon 17 Aug",cell:"Assembly 1",st:["info","In progress"]},
    {id:"WO-4195",product:"Shelf kit, 4-tier",qty:80,done:0,due:"Wed 19 Aug",cell:"Assembly 2",st:["neutral","Planned"]},
    {id:"WO-4196",product:"Cabinet, lockable",qty:25,done:11,due:"Tue 18 Aug",cell:"Fabrication",st:["warn","At risk"]}
  ],
  pos:[
    {id:"PO-1042",supplier:"Kingsgrove Metals",lines:14,value:"$12,480",eta:"22 Aug",st:["info","Sent"]},
    {id:"PO-1041",supplier:"Southbank Coatings",lines:3,value:"$2,140",eta:"15 Aug",st:["ok","Confirmed"]},
    {id:"PO-1040",supplier:"Fastener Direct",lines:22,value:"$6,905",eta:"12 Aug",st:["warn","Partially received"]},
    {id:"PO-1039",supplier:"Gasflow Pty Ltd",lines:2,value:"$1,320",eta:"—",st:["neutral","Draft"]}
  ],
  audit:[
    {t:"09:41",who:"Dana R.",what:"Released WO-4194",obj:"WO-4194",dom:"production"},
    {t:"09:38",who:"System",what:"Synced 12 orders from Shopify",obj:"Orders",dom:"inventory"},
    {t:"09:12",who:"Sam K.",what:"Received 480 of SKU-1102 against PO-1040",obj:"PO-1040",dom:"purchasing"},
    {t:"08:55",who:"Dana R.",what:"Changed reorder point 400 → 500 on SKU-2288",obj:"SKU-2288",dom:"inventory"},
    {t:"08:30",who:"Priya N.",what:"Created BOM v3.2 for Trolley, heavy duty",obj:"BOM v3.2",dom:"products"}
  ]
};
