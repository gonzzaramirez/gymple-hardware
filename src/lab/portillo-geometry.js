import { iso, depthOf, pathOf, roundedPlan, extrude, slabOf, cylinder, planOutline, ring, boxCorners, haloOf, axisVector, fitProjection, solidSvg, lineSvg, dotsSvg } from '../anatomy/iso-kit.js';
import { AnatomyLathe } from './anatomy-lathe.js';
/* Anatomy world-space geometry. Drawing units, never fabrication dimensions. */
const PortilloArt=(()=>{
  const G=AnatomyLathe,W=1000,H=650;
  const gatePlan={x:-177,y:-55,w:410,d:212,r:9};
  const P=fitProjection([...boxCorners(gatePlan,-20,0),[-155,0,150],[145,0,150],[-80,185,120]],W,H,{pad:48,azimuth:38,elevation:28});
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
  for(const [x,y]of[[-156,-35],[207,-35],[-156,135],[207,135]])box('base',x,y,12,12,-20,7,'lo',3,0);
  box('base',-177,-55,410,212,-13,13,'lo',9,1);
  for(const x of[-122,107]){box('post',x,-24,48,48,0,5,'mid',3);box('post',x+9,-14,27,28,5,132,'mid',3);box('post',x+8,-15,29,30,137,3,'hi',3);for(const dx of[7,41])for(const y of[-17,17]){disk('post',x+dx,y,5,3,2,'hi');screw('post',x+dx,y,7);}box('post',x+9,-14,27,28,11,1,'lo',1);}
  for(const z of[49,115]){
    box('pivot',-89,-6,9,12,z-8,23,'mid',1);disk('pivot',-80,0,z-8,5,6);disk('pivot',-80,0,z+8,5,6);disk('pivot',-80,0,z-10,2,27,'hi');disk('pivot',-80,0,z+17,6,2,'hi');screw('pivot',-80,0,z+19);
  }
  // The contact faces meet at x=106 in the closed pose. No floating overhead lock.
  box('magnet',106,-3,10,26,88,31,'hi',1);box('magnet',105.5,0,.5,20,91,25,'hi',.2);
  box('magnet',116,-9,7,30,85,37,'mid',1);box('magnet',116,-9,18,5,85,37,'mid',1);
  for(const z of[90,117])for(const y of[-5,17])box('magnet',116,y,3,3,z,3,'hi',.4);
  // Electronics bracket, not part of the leaf or magnetic retention load path.
  for(const z of[65,112])box('case',-144,-8,34,6,z,5,'mid',1);
  box('case',-168,-7,29,31,57,69,'mid',3);box('case',-167,24,27,3,59,65,'hi',2);
  for(const x of[-164,-144])for(const z of[63,120])box('case',x,27,2,1,z,2,'hi',.4);
  for(const x of[-162,-149]){box('case',x,6,5,7,50,7,'mid',1);box('case',x+1,7,3,5,46,4,'lo',1);}
  for(const z of[83,103])box('exit',139,-3,12,9,z,5,'mid',1);
  box('exit',151,-3,25,9,75,37,'mid',2);box('exit',151,6,25,9,75,37,'hi',2);box('exit',157,15,13,3,86,17,'hi',1);
  for(const x of[154,172])for(const z of[79,108])box('exit',x,15,2,1,z,2,'mid',.3);
  box('source',158,47,53,34,0,17,'mid',4);box('source',161,50,47,28,17,.7,'hi',3);
  function l(part,x,y,w,d,z,h,tone='mid',r=1){leaf.push({part,name:part+'-moving-'+count++,plan:rect(x,y,w,d,r),z,h,tone});}
  l('leaf',-76,-4,178,8,116,10,'hi',3);l('leaf',-76,-4,178,8,40,8,'mid',2);
  for(const x of[-76,94])l('leaf',x,-4,8,8,48,68,'mid',2);
  for(const x of[-31,14,59])l('leaf',x,-2,4,4,48,68,'hi',1);
  for(const z of[49,115])l('pivot',-80,-4,12,8,z,8,'hi',2);
  l('armature',102,0,3.5,20,91,25,'hi',.4);l('armature',98,0,4,20,89,29,'mid',.5);
  for(const z of[94,111])l('armature',100,-6,5,3,z,3,'hi',.4);
  for(const x of[-71,96])for(const z of[44,121])l('leaf',x,-4.5,2,1,z,2,'hi',.3);
  const rotate=(p,a)=>{const t=a*Math.PI/180;return[-80+(p[0]+80)*Math.cos(t)-p[1]*Math.sin(t),(p[0]+80)*Math.sin(t)+p[1]*Math.cos(t)];};
  const shifts={base:[0,0,0],post:[0,0,0],pivot:[0,0,15],leaf:[0,0,25],armature:[-17,8,25],magnet:[25,-3,12],case:[-8,0,14],exit:[12,0,12],source:[10,0,8]};
  function gate(angle=0,apart=0){
    const out=fixed.map(b=>{const d=shifts[b.part].map(v=>v*apart),v=axisVector(P,d);return{...b,center:b.center.map((v,i)=>v+d[i]),svg:b.svg,offset:v};});
    for(const b of leaf){const d=shifts[b.part].map(v=>v*apart),plan=roundedPlan(b.plan,4).map(p=>{const r=rotate(p,angle);return[r[0]+d[0],r[1]+d[1]];}),c=rotate([b.plan.x+b.plan.w/2,b.plan.y+b.plan.d/2],angle);out.push({...b,layer:2,center:[c[0]+d[0],c[1]+d[1],b.z+b.h/2+d[2]],svg:solidSvg(extrude(plan,b.z+d[2],b.h,P,{bevel:.35}),{tone:b.tone,crease:'faint'})});}
    for(const z of[49,115]){const d=shifts.pivot.map(v=>v*apart);out.push({part:'pivot',name:'pivot-moving-knuckle-'+z,layer:2,center:[-80+d[0],d[1],z+3+d[2]],svg:round([-80+d[0],d[1],z-2+d[2]],[0,0,1],10,5,P,'hi')});}
    return out.sort((a,b)=>a.layer-b.layer||depthOf(a.center,P)-depthOf(b.center,P));
  }
  function electronics(apart=0){return Object.entries(detailParts).map(([part,svg])=>{const h={enclosure:0,shield:29,esp:72,relay:44,converter:39,protection:24,connectors:0}[part],v=axisVector(Q,[0,0,h*apart]);return{part,name:'electronics-'+part,svg,offset:v};});}
  return Object.freeze({P,Q,gate,electronics,detailsAt,rotate,detailSolids,partCount:count,baseHalo:`<path class="iso-halo" d="${haloOf(gatePlan,-20,15,P)}"/>`});

})();
export { PortilloArt };
