import { iso, depthOf, pathOf, roundedPlan, extrude, slabOf, cylinder, planOutline, ring, boxCorners, haloOf, axisVector, fitProjection, solidSvg, lineSvg, dotsSvg } from '../anatomy/iso-kit.js';
import { AnatomyLathe } from './anatomy-lathe.js';
/* Anatomy world-space geometry. Drawing units, never fabrication dimensions. */
const PortilloArt=(()=>{
  const G=AnatomyLathe,W=1000,H=650;
  const gatePlan={x:-180,y:-56,w:436,d:200,r:8};
  const P=fitProjection([...boxCorners(gatePlan,-24,0),[-160,0,140],[250,0,140],[-40,126,140],[210,126,140],[160,0,90]],W,H,{pad:54,azimuth:38,elevation:29});
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
  // Metal base plate: 8 mm steel anchored to the floor.
  for(const [x,y]of[[-170,-46],[246,-46],[-170,130],[246,130]])screw('base',x,y,1);
  box('base',-180,-56,436,200,-8,8,'lo',2,1);
  box('base',-176,-52,428,192,-2,3,'mid',3,1);
  // Closing post (right): steel tube that carries the lock and the box.
  box('post',-174,-36,48,76,-8,8,'lo',2,1);
  box('post',-174,-30,48,64,0,104,'mid',2,1);
  box('post',-174,-30,48,64,104,5,'hi',2,1);
  box('post',-176,-32,52,68,0,2,'lo',2,1);
  for(const [x,y]of[[-172,-26],[-172,26]])screw('post',x,y,3);
  box('jamb',96,-30,48,64,0,104,'mid',2,1);
  box('jamb',96,-30,48,64,104,5,'hi',2,1);
  box('jamb',94,-32,52,68,0,2,'lo',2,1);
  for(const [x,y]of[[100,-26],[100,26]])screw('jamb',x,y,3);
  // Steel barrel hinge: three knuckles around one pin, bolted to the post.
  roundPart('pivot',[-124,-14,10],[0,0,1],22,6,'mid');
  roundPart('pivot',[-124,-14,44],[0,0,1],16,6,'hi');
  roundPart('pivot',[-124,-14,72],[0,0,1],22,6,'mid');
  disk('pivot',-124,-14,24,2.2,64,'hi');
  box('pivot',-144,-6,20,12,42,14,'mid',1);
  screw('pivot',-140,0,56);
  // The only printed part: a small box that just holds the electronics.
  box('case',146,-18,44,36,60,26,'mid',3,2);
  box('case',144,-20,48,40,86,4,'hi',3,2);
  box('case',145,-19,46,38,85,1.2,'lo',2,2);
  for(const [x,y]of[[152,-12],[184,-12],[152,12],[184,12]])screw('case',x,y,0);
  box('case',190,-14,2,28,64,18,'hi',1,2);
  for(let i=0;i<3;i++)box('case',186,-8,1.6,16,66+i*5,.8,'lo',.3,2);
  // Electromagnetic lock: on the jamb, at the opening, fed by a short cable.
  box('magnet',88,-12,8,24,40,26,'hi',1,2);
  box('magnet',87.4,-10,.8,20,44,18,'hi',.3,2);
  for(const [x,y]of[[90,-8],[90,8],[92,-8],[92,8]])screw('magnet',x,y,66);
  const lockCable=[[146,0,66],[138,0,68],[128,0,70],[116,0,70],[104,0,68],[96,0,64]].map(p=>at(p));
  fixed.push({part:'magnet',name:'magnet-cable-'+count++,center:[120,0,68],layer:2,svg:lineSvg(pathOf(lockCable),{tone:'mid',className:'gate-cable'})+dotsSvg([lockCable[0],lockCable.at(-1)],{size:1.4,tone:'hi'})});
  // Exit button on the closing post (in the gym it anchors to the wall right
  // beside it), wired to the lock branch.
  box('exit',100,-33,36,4,12,30,'hi',2,2);
  box('exit',102,-32,32,2,15,24,'lo',2,2);
  roundPart('exit',[118,-32,27],[0,1,0],3,5.5,'hi');
  const exitCable=[[118,-30,27],[120,-26,34],[122,-18,46],[118,-10,58],[108,-4,64],[100,0,64]].map(p=>at(p));
  fixed.push({part:'exit',name:'exit-cable-'+count++,center:[118,-18,46],layer:2,svg:lineSvg(pathOf(exitCable),{tone:'mid',className:'gate-cable'})});
  // Numpad on the closing post, USB toward the computer.
  box('terminal',100,-33,40,4,58,34,'hi',2,2);
  for(let r=0;r<4;r++)for(let c=0;c<3;c++)box('terminal',104+c*11,-31.5,8,2,62+r*7,5,'mid',1.2,2);
  const usbCable=[[100,-31,60],[86,-30,58],[70,-26,54],[58,-20,50]].map(p=>at(p));
  fixed.push({part:'terminal',name:'terminal-usb-'+count++,center:[78,-26,55],layer:2,svg:lineSvg(pathOf(usbCable),{tone:'mid',className:'gate-cable'})});
  // Laptop charger on the floor, one 12 V output for everything.
  box('source',172,58,54,34,0,16,'mid',4,2);
  box('source',174,60,50,30,16,3,'hi',3,2);
  box('source',176,64,46,22,19,.8,'lo',2,2);
  box('source',172,74,6,10,10,8,'hi',1,2);
  roundPart('source',[226,80,12],[1,0,0],3,2.6,'hi');
  const chargerCable=[[228,80,14],[236,86,10],[238,100,8],[236,116,10],[230,118,14]].map(p=>at(p));
  const dcCable=[[226,78,10],[210,60,10],[196,40,12],[192,24,14],[190,10,16],[190,0,18]].map(p=>at(p));
  fixed.push({part:'source',name:'source-ac-'+count++,center:[234,100,10],layer:2,svg:lineSvg(pathOf(chargerCable),{tone:'mid',className:'gate-cable'})});
  fixed.push({part:'source',name:'source-dc-'+count++,center:[200,40,12],layer:2,svg:lineSvg(pathOf(dcCable),{tone:'mid',className:'gate-cable'})+dotsSvg([dcCable.at(-1)],{size:1.4,tone:'hi'})});
  function l(part,x,y,w,d,z,h,tone='mid',r=1,layer=2){leaf.push({part,name:part+'-moving-'+count++,plan:rect(x,y,w,d,r),z,h,tone,layer});}
  // Steel door: folded sheet, one stiffener, a pull handle and the Z anchor.
  l('leaf',-122,-4,202,8,22,90,'mid',1,3);
  l('leaf',-122,-5,4,10,22,90,'hi',1,3);
  l('leaf',76,-5,4,10,22,90,'hi',1,3);
  l('leaf',-122,-5,202,10,22,4,'hi',1,3);
  l('leaf',-122,-5,202,10,108,4,'hi',1,3);
  l('leaf',-104,3.4,128,2.2,64,9,'lo',1,3);
  l('leaf',20,4,18,1,62,18,'mid',2,3);
  l('leaf',14,8,28,4,72,5,'hi',2,3);
  l('leaf',38,4,6,5,70,3,'mid',1,3);
  for(const z of[40,64,88])l('leaf',-128,-5,7,10,z,8,'mid',2,3);
  // Z anchor on the door, the only contact with the lock.
  l('armature',76,-9,4,18,58,10,'hi',.5,3);
  l('armature',78,-7,4,14,42,16,'mid',.5,3);
  l('armature',80,-9,8,18,40,7,'hi',.5,3);
  l('leaf',86,-4,2,8,50,20,'mid',.5,3);
  const rotate=(p,a)=>{const t=a*Math.PI/180;return[-124+(p[0]+124)*Math.cos(t)-p[1]*Math.sin(t),-124*0+(p[0]+124)*Math.sin(t)+p[1]*Math.cos(t)];};
  const shifts={base:[0,0,0],post:[-22,0,0],pivot:[-22,0,0],jamb:[22,0,0],leaf:[0,-36,28],armature:[0,-36,28],magnet:[0,-20,16],case:[18,6,36],exit:[0,24,18],terminal:[0,24,26],source:[0,-42,10]};
  // Steel gets a cool tone; the printed case keeps the warm one.
  const METAL=new Set(['base','post','pivot','jamb','leaf','armature']),metal=(part,svg)=>METAL.has(part)?`<g class="metal">${svg}</g>`:svg;
  function gate(angle=0,apart=0){
    const out=fixed.map(b=>{const d=shifts[b.part].map(v=>v*apart),v=axisVector(P,d);return{...b,center:b.center.map((v,i)=>v+d[i]),svg:metal(b.part,b.svg),offset:v};});
    for(const b of leaf){const d=shifts[b.part].map(v=>v*apart),rr=Math.min(4,Math.max(.4,Math.min(b.plan.w,b.plan.d)/2)),plan=roundedPlan(b.plan,rr).map(p=>{const r=rotate(p,angle);return[r[0]+d[0],r[1]+d[1]];}),c=rotate([b.plan.x+b.plan.w/2,b.plan.y+b.plan.d/2],angle);out.push({...b,layer:b.layer??2,center:[c[0]+d[0],c[1]+d[1],b.z+b.h/2+d[2]],svg:metal(b.part,solidSvg(extrude(plan,b.z+d[2],b.h,P,{bevel:.35}),{tone:b.tone,crease:'faint'}))});}
    return out.sort((a,b)=>a.layer-b.layer||depthOf(a.center,P)-depthOf(b.center,P));
  }
  function electronics(apart=0){return Object.entries(detailParts).map(([part,svg])=>{const h={enclosure:0,shield:29,esp:72,relay:44,converter:39,protection:24,connectors:0}[part],v=axisVector(Q,[0,0,h*apart]);return{part,name:'electronics-'+part,svg,offset:v};});}
  return Object.freeze({P,Q,gate,electronics,detailsAt,rotate,detailSolids,partCount:count,baseHalo:`<path class="iso-halo" d="${haloOf(gatePlan,-20,15,P)}"/>`});

})();
export { PortilloArt };
