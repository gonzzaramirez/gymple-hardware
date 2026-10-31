import { iso, depthOf, pathOf, roundedPlan, extrude, slabOf, cylinder, planOutline, ring, boxCorners, haloOf, axisVector, fitProjection, solidSvg, lineSvg, dotsSvg } from '../anatomy/iso-kit.js';
import { AnatomyLathe } from './anatomy-lathe.js';
/* Anatomy world-space geometry. Drawing units, never fabrication dimensions. */
const PortilloArt=(()=>{
  const G=AnatomyLathe,W=1000,H=650;
  const gatePlan={x:-190,y:-60,w:470,d:220,r:12};
  const P=fitProjection([...boxCorners(gatePlan,-24,0),[-160,0,130],[260,0,130],[100,0,126],[260,130,34]],W,H,{pad:54,azimuth:38,elevation:29});
  const Q={origin:[500,355],scale:1.7,azimuth:40,elevation:37};
  const at=(p,q=P)=>iso(p,q);
  const round=(o,axis,len,r,q=P,tone='mid')=>solidSvg(G.solidOf([[0,r],[len,r]],G.frameAlong(o,axis),q,{steps:32}),{tone});
  const block=(plan,z,h,q=P,tone='mid',lit=false)=>solidSvg(slabOf({...plan,r:plan.r??.5},z,h,q,5,.5),{tone,lit,crease:'faint'});
  const faceCircle=(x,y,z,r,q=P)=>pathOf(Array.from({length:25},(_,i)=>at([x+r*Math.cos(i*Math.PI/12),y,z+r*Math.sin(i*Math.PI/12)],q)),true);
  const bolt=(x,y,z,q=P,r=1.5)=>lineSvg(ring(x,y,r,z,q,16),{tone:'mid'})+dotsSvg([at([x,y,z],q)],{size:.45,tone:'hi'});
  const faceBolt=(x,y,z,q=P)=>lineSvg(faceCircle(x,y,z,1.5,q),{tone:'mid'})+dotsSvg([at([x,y,z],q)],{size:.4,tone:'hi'});
  const rect=(x,y,w,d,r=.5)=>({x,y,w,d,r});
  function detailsAt(Q){
  const detailParts={};let detailSolids=0;
  const S=(x,y,w,d,z,h,tone='mid',r=.5)=>{detailSolids++;return block(rect(x,y,w,d,r),z,h,Q,tone);};
  const B=(x,y,z)=>bolt(x,y,z,Q);
  let art='';
  for(const [x,y]of[[-126,-70],[126,-70],[-126,70],[126,70]])art+=S(x-4,y-4,8,8,-7,7,'lo',2);
  art+=S(-140,-84,280,168,0,6,'lo',7)+S(-140,-84,280,4,6,24,'mid',1)+S(-140,-80,4,160,6,24,'mid',1)+S(-136,80,276,4,6,7,'mid',1)+S(136,-80,4,160,6,7,'mid',1);
  for(const [x,y]of[[-128,-72],[128,-72],[-128,72],[128,72]])art+=S(x-4,y-4,8,8,6,12,'mid',3)+B(x,y,18);
  detailParts.enclosure=art;
  art='';for(const [x,y]of[[-116,-61],[-34,-61],[-116,58],[-34,58]])art+=S(x-2,y-2,4,4,6,8,'mid',1);
  art+=S(-122,-66,94,129,14,2,'hi',2);
  for(let i=0;i<19;i++)for(const x of[-118,-42]){art+=S(x,-55+i*5.7,9,5,16,7,'mid',.5)+B(x+4.5,-52.5+i*5.7,23);}
  for(const [x,y]of[[-116,-61],[-34,-61],[-116,58],[-34,58]])art+=B(x,y,16);
  detailParts.shield=art;
  art=S(-101,-55,49,108,23,2,'hi',2);
  for(let i=0;i<19;i++)for(const x of[-102,-53])art+=S(x,-54+i*5.6,2,2,19,4,'mid',.1);
  art+=S(-96,-50,39,36,25,5,'hi',1)+S(-96,-14,39,14,25,.6,'mid',.5)+S(-84,45,15,10,25,4,'hi',1)+S(-89,8,21,18,25,2,'lo',.5);
  for(let i=0;i<4;i++)art+=lineSvg(planOutline(rect(-93+i*8,-12,4,10,.5),25.7,Q),{tone:'lo'});
  art+=S(-96,32,6,7,25,3,'mid',.5)+S(-63,32,6,7,25,3,'mid',.5);
  detailParts.esp=art;
  art=S(25,-65,65,55,14,2,'hi',2);
  for(const [x,y]of[[29,-61],[86,-61],[29,-13],[86,-13]])art+=S(x-2,y-2,4,4,6,8,'mid',1)+B(x,y,16);
  art+=S(35,-57,39,25,16,18,'hi',1.5);
  for(let i=0;i<3;i++)art+=S(28+i*18,-29,16,10,16,9,'mid',.5)+B(36+i*18,-24,25)+S(35+i*11,-65,7,5,16,3,'mid',.3);
  detailParts.relay=art;
  art=S(25,8,78,55,14,2,'hi',2);
  for(const [x,y]of[[29,12],[99,12],[29,59],[99,59]])art+=S(x-2,y-2,4,4,6,8,'mid',1)+B(x,y,16);
  art+=S(49,25,26,22,16,8,'hi',3)+S(52,28,20,16,24,.7,'mid',2);
  for(const x of[36,90])art+=solidSvg(cylinder(x,31,4,16,12,Q,32,.3),{tone:'mid'});
  for(let i=0;i<5;i++)art+=lineSvg(planOutline(rect(51+i*4.3,28,1.5,16,.5),25,Q),{tone:'lo'});
  for(let i=0;i<2;i++)art+=S(51+i*15,9,13,8,16,7,'mid',.5)+B(57.5+i*15,13,23);
  art+=S(50,54,19,10,16,5,'hi',1);
  detailParts.converter=art;
  art='';for(const y of[-55,22]){art+=S(-14,y,25,28,6,5,'lo',1);for(let i=0;i<3;i++)art+=S(-12,y+2+i*8,21,6,11,7,'mid',.5)+B(-2,y+5+i*8,18);}
  art+=S(111,-60,20,47,6,4,'lo',1)+S(114,-55,14,37,10,10,'mid',2)+S(116,-48,10,23,20,1,'hi',1);
  detailParts.protection=art;
  art='';for(const x of[-128,117])art+=S(x,57,14,23,6,11,'mid',2)+S(x+3,74,8,12,10,6,'hi',1);
  detailParts.connectors=art;
  return {parts:detailParts,count:detailSolids};
  }
  const detailBuilt=detailsAt(Q),detailParts=detailBuilt.parts,detailSolids=detailBuilt.count;

  const fixed=[],leaf=[];let count=0;
  function box(part,x,y,w,d,z,h,tone='mid',r=1,layer=2){const b={part,name:part+'-'+count++,plan:rect(x,y,w,d,r),z,h,tone,center:[x+w/2,y+d/2,z+h/2],layer};b.svg=block(b.plan,z,h,P,tone);fixed.push(b);return b;}
  function disk(part,x,y,z,r,h,tone='mid'){fixed.push({part,name:part+'-'+count++,center:[x,y,z+h/2],svg:round([x,y,z],[0,0,1],h,r,P,tone),layer:2});}
  function screw(part,x,y,z){fixed.push({part,name:part+'-'+count++,center:[x,y,z],svg:bolt(x,y,z,P),layer:2});}
  function dot(part,x,y,z,size=.9,tone='lo'){fixed.push({part,name:part+'-'+count++,center:[x,y,z],svg:dotsSvg([at([x,y,z])],{size,tone}),layer:2});}
  function roundPart(part,o,axis,len,r,tone='mid'){const c=o.map((v,i)=>v+axis[i]*len/2);fixed.push({part,name:part+'-'+count++,center:c,svg:round(o,axis,len,r,P,tone),layer:2});}
  function layerLines(part,x,y,w,d,zs,h=.7){for(const z of zs)box(part,x,y,w,d,z,h,'faint',.2);}
  // Printed tray base with rubber feet and a low rim.
  for(const [x,y]of[[-180,-50],[264,-50],[-180,148],[264,148]])box('base',x,y,12,12,-24,8,'lo',3,0);
  box('base',-190,-60,470,220,-16,13,'lo',12,1);
  box('base',-184,-54,458,208,-3,3,'mid',10,1);
  box('base',-186,-56,6,212,0,5,'mid',2,1);box('base',278,-56,6,212,0,5,'mid',2,1);box('base',-184,150,448,6,0,5,'mid',2,1);
  box('base',-62,116,64,18,0,1.4,'hi',2,1);
  for(let i=0;i<3;i++)box('base',-54+i*19,118,10,.8,.6,.4,'lo',.2,1);
  // Hinge frame: one rounded printed post, no metal hardware.
  box('post',-168,-30,46,60,0,8,'mid',8);
  box('post',-162,-24,34,48,8,98,'mid',7);
  box('post',-160,-22,30,44,106,12,'hi',7);
  layerLines('post',-162.8,-24.6,31,.7,[26,50,74]);
  box('post',-140,-10,14,20,28,74,'mid',4);
  // Hinge: fixed pin and two bushings; the door turns around it.
  disk('pivot',-126,0,18,1.8,96,'hi');
  disk('pivot',-126,0,28,4.6,6,'hi');
  disk('pivot',-126,0,98,4.6,6,'hi');
  // Printed box: the only enclosure. Logic and terminals go inside; the
  // lock mounts outside. Its left side is the door stop.
  box('case',100,-40,90,80,0,70,'mid',7);
  box('case',98,-42,94,84,70,7,'hi',7);
  box('case',99,-41,92,82,68,1.4,'lo',5);
  layerLines('case',101,39.9,88,.8,[18,36,54]);
  for(const [x,y]of[[112,30],[178,30],[112,-30],[178,-30]])screw('case',x,y,76);
  box('case',118,40.6,50,.8,48,12,'hi',1.5);
  for(let i=0;i<3;i++)box('case',124,41.2,38,.5,51+i*3.5,.6,'lo',.2);
  box('case',148,40.6,22,.6,26,12,'mid',1.4);
  box('case',151,41.2,16,.6,29,6,'lo',.8);
  roundPart('case',[112,40,14],[0,1,0],2.4,4.4,'hi');
  roundPart('case',[112,42.4,14],[0,1,0],.8,2.8,'lo');
  for(let i=0;i<3;i++)box('case',106,40.4,34,.5,4+i*4.6,1.6,'lo',.4);
  // Electromagnetic lock on the face that meets the door.
  box('magnet',92,-12,10,24,42,20,'hi',2);
  box('magnet',91.2,-10,.8,20,45,14,'hi',.3);
  box('magnet',102,-14,8,28,40,24,'mid',2);
  // Exit button: a simple button on the inside.
  roundPart('exit',[170,40,58],[0,1,0],2.4,4.6,'hi');
  dot('exit',170,42.4,58,1.2,'lo');
  // A single 12 V transformer beside the box.
  box('source',200,90,60,40,0,28,'mid',5);
  box('source',202,92,56,36,28,4,'hi',4);
  box('source',200,90,60,40,22,1,'lo',3);
  box('source',200,108,4,8,12,8,'hi',1);
  dot('source',210,98,31,.9,'lo');
  // A single 12 V cable from the transformer to the box.
  const cablePts=[[200,110,16],[196,96,8],[194,66,8],[192,44,12],[190,40,16]].map(p=>at(p));
  fixed.push({part:'source',name:'source-cable-'+count++,center:[195,75,10],layer:2,svg:lineSvg(pathOf(cablePts),{tone:'mid',className:'gate-cable'})+dotsSvg([cablePts[0],cablePts.at(-1)],{size:1.6,tone:'hi'})});
  function l(part,x,y,w,d,z,h,tone='mid',r=1,layer=2){leaf.push({part,name:part+'-moving-'+count++,plan:rect(x,y,w,d,r),z,h,tone,layer});}
  // Door: one printed panel with two recessed fields and a simple handle.
  l('leaf',-122,-4,210,8,22,90,'hi',3);
  l('leaf',-100,5,160,1,30,20,'mid',.6,3);
  l('leaf',-100,5,120,1,60,32,'mid',.6,3);
  l('leaf',-122,5,210,1.4,104,4,'mid',1,3);l('leaf',-122,5,210,1.4,22,4,'mid',1,3);
  l('leaf',-122,5,4,1.4,28,76,'mid',1,3);l('leaf',84,5,4,1.4,28,76,'mid',1,3);
  l('leaf',62,4,18,1,62,18,'mid',2,3);
  l('leaf',56,8,28,4,72,5,'hi',2,3);
  l('leaf',80,4,6,5,70,3,'mid',1,3);
  for(const z of[40,64,88])l('leaf',-128,-5,7,10,z,8,'mid',2,3);
  l('armature',84,-10,6,20,44,20,'hi',1,3);l('armature',80,-11,5,22,42,24,'mid',1,3);
  l('leaf',86,-4,2,8,50,20,'mid',.5,3);
  const rotate=(p,a)=>{const t=a*Math.PI/180;return[-126+(p[0]+126)*Math.cos(t)-p[1]*Math.sin(t),(p[0]+126)*Math.sin(t)+p[1]*Math.cos(t)];};
  const shifts={base:[0,0,0],post:[-14,0,24],pivot:[-14,0,24],leaf:[0,26,54],armature:[0,26,54],magnet:[24,0,20],case:[34,0,40],exit:[34,0,40],source:[24,26,26]};
  function gate(angle=0,apart=0){
    const out=fixed.map(b=>{const d=shifts[b.part].map(v=>v*apart),v=axisVector(P,d);return{...b,center:b.center.map((v,i)=>v+d[i]),svg:b.svg,offset:v};});
    for(const b of leaf){const d=shifts[b.part].map(v=>v*apart),rr=Math.min(4,Math.max(.4,Math.min(b.plan.w,b.plan.d)/2)),plan=roundedPlan(b.plan,rr).map(p=>{const r=rotate(p,angle);return[r[0]+d[0],r[1]+d[1]];}),c=rotate([b.plan.x+b.plan.w/2,b.plan.y+b.plan.d/2],angle);out.push({...b,layer:b.layer??2,center:[c[0]+d[0],c[1]+d[1],b.z+b.h/2+d[2]],svg:solidSvg(extrude(plan,b.z+d[2],b.h,P,{bevel:.35}),{tone:b.tone,crease:'faint'})});}
    return out.sort((a,b)=>a.layer-b.layer||depthOf(a.center,P)-depthOf(b.center,P));
  }
  function electronics(apart=0){return Object.entries(detailParts).map(([part,svg])=>{const h={enclosure:0,shield:29,esp:72,relay:44,converter:39,protection:24,connectors:0}[part],v=axisVector(Q,[0,0,h*apart]);return{part,name:'electronics-'+part,svg,offset:v};});}
  return Object.freeze({P,Q,gate,electronics,detailsAt,rotate,detailSolids,partCount:count,baseHalo:`<path class="iso-halo" d="${haloOf(gatePlan,-20,15,P)}"/>`});

})();
export { PortilloArt };
