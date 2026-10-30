/* Reused and isolated workshop tool art. Classic script, no legacy UI/storage. */
const GympleTools=(()=>{
 const G=AnatomyLathe;
 const P={origin:[420,300],scale:1.38,azimuth:43,elevation:38};
 const D={origin:[420,290],scale:2.15,azimuth:43,elevation:34};
  const s=(x,y,w,d,z,h,Q=P,tone='mid',r=1)=>solidSvg(slabOf({x,y,w,d,r},z,h,Q,5,.5),{tone,crease:'faint'});
  const c=(x,y,r,z,h,Q=P,tone='mid')=>solidSvg(cylinder(x,y,r,z,h,Q,32,.3),{tone});
  const screw=(x,y,z,Q=P)=>lineSvg(ring(x,y,1.8,z,Q,16),{tone:'mid'})+dotsSvg([iso([x,y,z],Q)],{size:.5,tone:'hi'});
  const rod=(origin,axis,len,r,Q=D,tone='mid',cls='')=>solidSvg(G.solidOf([[0,r],[len,r]],G.frameAlong(origin,axis),Q,{steps:40}),{tone,className:cls});
  const move=(el,x=0,y=0,scale=1)=>el.setAttribute('transform',`translate(${x.toFixed(3)} ${y.toFixed(3)}) scale(${scale.toFixed(4)})`);
  const at=(p,Q=P)=>iso(p,Q);
  let bench=s(-197,-127,394,254,-26,9,P,'lo',7);
  for(const [x,y]of[[-180,-110],[178,-110],[-180,108],[178,108]])bench+=s(x,y,9,9,-34,8,P,'lo',2);
  bench+=s(-182,-112,364,224,-17,.8,P,'lo',3)+lineSvg(planOutline({x:-178,y:-108,w:356,d:216,r:2},-16,P),{tone:'faint'});
  bench+=s(-171,101,338,7,-16,1,P,'lo',1);
  const ticks=topTicks(-166,160,7,5,101,-15,[2.5,4.5],P);bench+=lineSvg(ticks.minor,{tone:'faint'})+lineSvg(ticks.major,{tone:'lo'});
  const screwdriver=(()=>{let a=rod([0,0,0],[0,0,1],34,1.1,P,'hi','tw-tool-metal');a+=solidSvg(G.solidOf([[34,2],[37,5],[55,5],[60,3]],G.frameAlong([0,0,0],[0,0,1]),P,{steps:48}),{tone:'mid',className:'tw-tool-grip'});for(let i=0;i<4;i++)a+=lineSvg(ring(0,0,4.8,40+i*4,P,32),{tone:'faint'});return a;})();
  const toolOrigin=at([0,0,0]);
  let turningScrew=c(0,0,2.6,0,2,P,'hi')+'<g id="tw-screw-shaft"></g><g id="tw-screw-slot"></g>';
  // Closeup calibre: fixed bar, vernier carriage and opposed measuring jaws.
  let caliper=s(-92,-7,180,13,0,4,D,'mid',.5)+s(-87,-32,8,38,4,6,D,'hi',.7);
  const ct=topTicks(-76,79,4,5,-7,4,[1.2,2.6],D);caliper+=lineSvg(ct.minor,{tone:'lo'})+lineSvg(ct.major,{tone:'mid'});
  let jaw=s(0,-11,20,22,4,6,D,'hi',1)+s(6,-33,8,29,6,4,D,'hi',.7)+s(15,0,8,9,10,4,D,'mid',1)+screw(8,0,10,D);
  let measureSample=s(-79,-28,77,15,5,2,D,'hi',.6);
  for(let n=0;n<5;n++)measureSample+=s(-70+n*12,-25,7,7,7,1.5,D,'mid',.4);
  // Cable exercise: round jacket, actual exposed strands, removable insulation sleeve.
  const wire=rod([-77,0,8],[1,0,0],125,4,D,'mid');
  let core='';for(const [y,z]of[[0,8],[-.9,8.5],[.9,8.5],[-.5,7.2],[.5,7.2]])core+=rod([48,y,z],[1,0,0],20,.55,D,'hi','tw-ferrule');
  const sleeve=rod([48,0,8],[1,0,0],20,4,D,'mid');
  const offcut=rod([68,0,8],[1,0,0],25,4,D,'mid');
  const ferrule=solidSvg(G.lathe([[0,3.1],[4,3.1],[4,2.3],[23,2.3],[23,1.7],[3,1.7],[0,2]],G.frameAlong([45,0,8],[1,0,0]),D,{steps:48}),{tone:'hi',className:'tw-ferrule'});
  let clamp=s(-36,-20,22,40,0,5,D,'lo',2)+s(-36,-19,22,4,5,15,D,'mid',1)+s(-36,15,22,4,5,15,D,'mid',1)+s(-34,-16,18,32,17,4,D,'hi',2)+screw(-25,-10,21,D)+screw(-25,10,21,D);
  // Tool jaws oppose the cable. Handles move with jaws; no instant geometry swaps.
  const upperJaw=s(42,-21,31,10,1,9,D,'hi',1)+s(48,-59,13,39,1,7,D,'mid',2)+s(45,-61,19,23,7,5,D,'lo',2);
  const lowerJaw=s(42,11,31,10,1,9,D,'hi',1)+s(48,21,13,39,1,7,D,'mid',2)+s(45,38,19,23,7,5,D,'lo',2);
  const cutter=upperJaw+lowerJaw;
  let labels='';for(const x of[-52,7]){labels+=s(x,-6,22,12,13,.7,D,'hi',.5);labels+=faceTextSvg(topMatrix([x+2,-3],14,D),'P01',{size:4,tone:'hi'});}
  // Camera used for identification: lens lands over the device, never identifies it automatically.
  let camera=s(-22,-16,44,32,0,14,P,'mid',3)+s(-12,-19,19,8,9,9,P,'hi',1)+c(0,0,11,14,5,P,'hi')+c(0,0,7,19,2,P,'lo')+s(14,-11,5,6,14,2,P,'hi',.5);
  // Meter shown in its own plane. Functional symbols belong to the instrument, not floating labels.
  const M={origin:[330,245],scale:1.8,azimuth:25,elevation:57};
  let meter=s(-39,-73,78,146,0,9,M,'mid',8)+s(-35,-69,70,138,9,3,M,'hi',5);
  const screenTransform=topMatrix([-28,-57],12.5,M);
  meter+=`<g transform="${screenTransform}"><rect class="tw-meter-screen" width="56" height="25" rx="2"/><clipPath id="tw-meter-window"><rect x="2" y="2" width="52" height="21"/></clipPath><text class="tw-meter-text" x="28" y="15" text-anchor="middle" clip-path="url(#tw-meter-window)">SIN MEDIR</text></g>`;
  meter+=c(0,7,18,12,4,M,'mid')+lineSvg(ring(0,7,22,12,M,40),{tone:'lo'});
  for(let i=0;i<3;i++){const x=-24+i*24;meter+=c(x,53,5,12,1,M,'lo')+lineSvg(ring(x,53,3,13,M,20),{tone:'hi'});}
  for(const [x,label]of[[-24,'A'],[0,'COM'],[24,'V']])meter+=faceTextSvg(topMatrix([x,65],13,M),label,{size:4,tone:'hi',anchor:'middle'});
  meter+=faceTextSvg(topMatrix([0,-24],13,M),'V⎓',{size:4,tone:'hi',anchor:'middle'});
  const knobIndicator=lineSvg(lineOnTop([0,7],[0,-6],17,M),{tone:'hi',free:true});
  // Physical removable caps show that A is not the voltage lead port.
  meter+=c(-24,53,4.5,13,2,M,'mid');
  const portBlack=at([0,53,14],M),portRed=at([24,53,14],M);
  const probe=(color)=>`<g class="tw-probe-${color}">${rod([0,0,0],[1,0,0],9,.7,M,'hi')}${rod([9,0,0],[1,0,0],28,2.5,M,'mid','tw-tool-grip')}${solidSvg(G.solidOf([[7,2.5],[8,4.5],[10,4.5],[11,2.5]],G.frameAlong([0,0,0],[1,0,0]),M,{steps:40}),{tone:'hi'})}</g>`;
  const probeOrigin=at([0,0,0],M);
  let posts=s(73,-35,57,78,0,7,M,'lo',3)+c(87,-19,5,7,6,M,'hi')+c(115,23,5,7,6,M,'hi')+screw(87,-19,13,M)+screw(115,23,13,M);
  const contactBlack=at([87,-19,14],M),contactRed=at([115,23,14],M);
  let clipboard=s(-35,-58,70,116,0,5,D,'mid',3)+s(-30,-49,60,100,5,.4,D,'hi',.7)+s(-17,-59,34,12,5,2,D,'mid',1);
  for(let i=0;i<5;i++){clipboard+=lineSvg(planOutline({x:-23,y:-35+i*17,w:6,d:6,r:1},6,D),{tone:'mid'});clipboard+=lineSvg(lineOnTop([-10,-32+i*17],[23,-32+i*17],6,D),{tone:'lo',free:true});}
  let book=s(105,-35,65,55,0,4,P,'mid',2)+s(108,-32,59,49,4,.8,P,'hi',1);for(let i=0;i<4;i++)book+=lineSvg(lineOnTop([113,-23+i*10],[158,-23+i*10],5,P),{tone:'lo',free:true});
  const lidCorners=[[-140,-85],[140,-85],[-140,85],[140,85]];
  let cover=s(-155,-100,310,200,0,5,P,'hi',8);
  for(let i=0;i<7;i++)cover+=lineSvg(planOutline({x:-65+i*18,y:-45,w:6,d:80,r:3},5,P),{tone:'lo'});
  const lidBolts=lidCorners.map(([x,y],i)=>`<g id="tw-lid-bolt-${i}">${c(x,y,2.3,5,2,P,'hi')}${rod([x,y,-2],[0,0,1],7,1,P,'mid')}${lineSvg(planOutline({x:x-1.3,y:y-.2,w:2.6,d:.4,r:.1},7,P),{tone:'hi'})}</g>`).join('');
  const unitTag=s(-42,48,84,23,0,.4,P,'hi',.5)+faceTextSvg(topMatrix([-34,55],.7,P),'UNIDAD 01',{size:5,tone:'hi'});

 return Object.freeze({P,D,M,at,s,c,rod,screw,toolOrigin,probeOrigin,portBlack,portRed,contactBlack,contactRed,knobIndicator,art:{bench,driver:screwdriver,screw:turningScrew,caliper,jaw,sample:measureSample,wire,core,sleeve,offcut,ferrule,clamp,upper:upperJaw,lower:lowerJaw,labels,camera,meter,posts,blackProbe:probe('black'),redProbe:probe('red'),clipboard,book,cover,lidBolts,unitTag}});
})();
