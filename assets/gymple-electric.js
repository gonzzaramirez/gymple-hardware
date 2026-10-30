/* Anatomy closeups for the v04 tutorial. Classic script; no DOM, I/O or electrical approval.
 * draw(scene, p) returns SVG children for the existing 840 x 560 tutorial canvas, or null.
 * Routes are deliberately OPEN conceptual traces, not a terminal-to-terminal wiring plan.
 * Soldering depicts an isolated practice coupon, never a screw-terminal wire end.
 * Sources checked 2026-10-30:
 * https://www.weller-tools.com/us/en/productivity
 * https://www.weller-tools.com/sites/default/files/products/documents/WEL_WQB%204000SOPS_1.2.8_GB_2025.pdf
 * https://assets.phoenixcontact.com/file/be20e58a-773f-4be9-a3f9-43ed9b1dc431/media/original?Problem_with_tinning_wires.pdf=
 * https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pdf
 */
const GympleElectric=(()=>{
  'use strict';
  const scenes=['power-source','power-distribution','power-lock','power-buck','power-control','power-usb','solder-support','solder-tip','solder-heat','solder-feed','solder-cool','solder-insulate'];
  const P={origin:[420,338],scale:1.8,azimuth:42,elevation:35};
  const clamp=x=>Math.max(0,Math.min(1,Number.isFinite(x)?x:0));
  const ease=x=>{x=clamp(x);return x*x*(3-2*x);};
  const span=(p,a,b)=>ease((p-a)/(b-a));
  const at=p=>iso(p,P),axis=v=>axisVector(P,v);
  const plan=(x,y,w,d,r=1)=>({x,y,w,d,r});
  const box=(x,y,w,d,z,h,tone='mid',r=1)=>solidSvg(slabOf(plan(x,y,w,d,r),z,h,P,6,.45),{tone,crease:'faint'});
  const disc=(x,y,r,z,h,tone='mid')=>solidSvg(cylinder(x,y,r,z,h,P,40,.3),{tone});
  const rod=(o,a,len,r,tone='mid')=>solidSvg(AnatomyLathe.solidOf([[0,r],[len,r]],AnatomyLathe.frameAlong(o,a),P,{steps:32}),{tone});
  const screw=(x,y,z)=>lineSvg(ring(x,y,2,z,P,20),{tone:'mid'})+dotsSvg([at([x,y,z])],{size:.45,tone:'hi'});
  const move=(body,v)=>{const d=axis(v);return `<g transform="translate(${d[0]} ${d[1]})">${body}</g>`;};
  function bench(){
    let h='';for(const x of[-157,145])for(const y of[-77,65])h+=box(x,y,12,12,-15,5,'lo',2);
    h+=box(-171,-91,342,182,-10,10,'lo',7);
    for(const x of[-157,145])for(const y of[-77,65])h+=screw(x+6,y+6,0);
    h+=lineSvg(planOutline(plan(-163,-83,326,166,4),0,P),{tone:'faint'});
    h+=box(-153,74,300,6,0,.7,'lo',.5);
    h+=lineSvg(planOutline(plan(-153,74,300,6,.5),.8,P),{tone:'lo'});
    const t=topTicks(-148,143,6,5,74,.8,[2,6],P);
    return h+lineSvg(t.minor,{tone:'faint'})+lineSvg(t.major,{tone:'lo'});
  }
  function adapter(x=-74,y=-35){
    let h='';for(const dx of[12,132])for(const dy of[12,58])h+=disc(x+dx,y+dy,4,0,3,'lo');
    h+=box(x,y,148,70,3,25,'mid',6)+box(x+1,y+1,146,68,28,1,'hi',5);
    h+=lineSvg(planOutline(plan(x+5,y+5,138,60,3),29,P),{tone:'lo'});
    h+=box(x+30,y+16,82,34,29,.5,'lo',1);
    h+=faceTextSvg(topMatrix([x+71,y+29],29.6,P),'12V DC · CANDIDATA',{size:4,tone:'hi',anchor:'middle'});
    for(let i=0;i<2;i++)h+=box(x+37,y+38+i*4,65-i*14,.6,29.5,.3,'mid',.1);
    h+=box(x+148,y+25,9,20,9,9,'mid',2)+box(x+157,y+29,11,12,11,5,'hi',2);
    for(let i=0;i<3;i++)h+=box(x+149+i*3,y+25,1,20,9,9,'lo',.2);
    return h;
  }
  function terminals(x=-60,y=-28,count=6){
    let h=box(x-6,y-6,count*19+10,58,1,5,'lo',2);
    h+=box(x-3,y-2,count*19+4,3,6,3,'mid',.5)+box(x-3,y+42,count*19+4,3,6,3,'mid',.5);
    for(let i=0;i<count;i++){
      const a=x+i*19;h+=box(a,y,16,42,6,19,'mid',1)+box(a+2,y+2,12,38,25,1,'hi',1);
      for(const b of[8,32])h+=screw(a+8,y+b,26);
      h+=box(a+4,y-1,8,2,11,7,'lo',.5)+box(a+4,y+41,8,2,11,7,'lo',.5);
    }
    return h;
  }
  function board(x,y,w=75,d=62,type='esp'){
    let h='';for(const dx of[5,w-5])for(const dy of[5,d-5])h+=disc(x+dx,y+dy,3,0,7,'mid');
    h+=box(x,y,w,d,7,2,'hi',2);
    for(const dx of[5,w-5])for(const dy of[5,d-5])h+=screw(x+dx,y+dy,9);
    if(type==='relay'){
      h+=box(x+14,y+12,w-28,d-28,9,22,'mid',2);
      for(let i=0;i<3;i++)h+=box(x+6+i*20,y+d-13,18,11,9,10,'mid',.5)+screw(x+15+i*20,y+d-7,19);
      for(let i=0;i<3;i++)h+=box(x+8+i*8,y+2,3,5,9,5,'hi',.3);
    }else if(type==='buck'){
      h+=box(x+24,y+19,28,24,9,8,'mid',2);
      for(let i=0;i<7;i++)h+=box(x+26+i*3.5,y+20,1.5,22,17,1,'hi',.3);
      for(const dx of[12,w-12])h+=disc(x+dx,y+29,5,9,12,'mid')+disc(x+dx,y+29,4,21,.6,'hi');
      for(const dx of[8,w-20])h+=box(x+dx,y+4,13,9,9,8,'mid',.5)+screw(x+dx+6.5,y+8,17);
    }else{
      h+=box(x+18,y+11,w-36,23,9,5,'hi',1)+box(x+24,y+38,w-48,12,9,3,'lo',.5);
      for(let i=0;i<12;i++)for(const dx of[7,w-10])h+=box(x+dx,y+7+i*4,3,3,9,4,'mid',.2);
      h+=box(x+29,y+d-8,17,10,9,5,'hi',1);
    }
    return h;
  }
  function magnet(x=60,y=-20){
    let h=box(x,y,70,34,2,10,'lo',2)+box(x+3,y+3,64,28,12,18,'mid',2)+box(x+7,y+7,56,20,30,1,'hi',1);
    for(const dx of[8,62])for(const dy of[6,28])h+=screw(x+dx,y+dy,31);
    h+=box(x+10,y+40,50,13,1,7,'hi',1);for(const dx of[15,55])h+=screw(x+dx,y+46,8);
    return h;
  }
  function release(x=-18,y=27){
    return box(x,y,34,35,2,14,'mid',3)+box(x+2,y+2,30,31,16,1,'hi',2)+disc(x+17,y+17,10,17,4,'hi')+screw(x+5,y+5,17)+screw(x+29,y+30,17);
  }
  function fuse(x=-28,y=-18){
    let h=box(x,y,48,26,2,5,'lo',2)+box(x+4,y+3,40,20,7,11,'mid',3)+box(x+8,y+5,32,16,18,1,'hi',2);
    for(const dx of[5,43])h+=screw(x+dx,y+13,19);
    return h;
  }
  // A logical route stops at two parked/open circles. No line lands on an unidentified GPIO or contact.
  function route(points,p,tone='mid'){
    const xy=points.map(at),d=pathOf(xy),ends=[xy[0],xy.at(-1)];
    const dash=`<path d="${d}" fill="none" stroke="var(--anatomy-${tone})" stroke-width="1.1" stroke-dasharray="5 5" opacity=".6"/>`;
    let h=dash;for(const v of ends)h+=`<circle cx="${v[0]}" cy="${v[1]}" r="4" fill="var(--anatomy-paper)" stroke="var(--anatomy-mid)" stroke-width="1"/>`;
    if(p>0){const n=Math.min(points.length-2,Math.floor(p*(points.length-1))),u=p>=1?1:p*(points.length-1)-n,a=xy[n],b=xy[n+1];h+=`<circle cx="${a[0]+(b[0]-a[0])*u}" cy="${a[1]+(b[1]-a[1])*u}" r="2.5" fill="var(--anatomy-hi)"/>`;}
    return `<g data-conceptual-route="true">${h}</g>`;
  }
  function usb(){
    const pad=GympleDevices.terminal.replaceAll('id="','id="electric-usb-').replaceAll('url(#','url(#electric-usb-').replace(/ data-key="[^"]*"| role="button"| tabindex="[^"]*"/g,'');
    let h=`<g transform="translate(130 45) scale(.64)" aria-hidden="true">${pad}</g>`;
    // Unplugged USB connector on the bench; never plugged into a bare ESP32 GPIO.
    h+=box(15,28,28,16,3,9,'mid',2)+box(43,30,20,12,4,7,'hi',.5)+box(46,32,14,8,11,.4,'lo',.3);
    for(const x of[48,54])h+=box(x,33,2,6,11.5,.3,'mid',.1);
    return h;
  }
  function electrical(scene,p){
    let h=bench();const u=span(p,.15,.85);
    if(scene==='power-source')h+=adapter()+move(box(90,1,32,18,3,9,'mid',2)+box(122,5,18,10,5,5,'hi',1),[24*(1-u),0,0]);
    if(scene==='power-distribution'){
      // ONE external adapter and a visible fork, not unrelated pairs of modules.
      // All traces stop at parked circles, outside real terminals; the topology is conditional.
      const place=(body,target,k)=>{const v=at(target);return `<g transform="translate(${v[0]-P.origin[0]*k} ${v[1]-P.origin[1]*k}) scale(${k})">${body}</g>`;};
      h+=place(adapter(),[-118,-2,1],.43);
      // Protection is grouped with distribution, not an unrelated loose accessory.
      h+=place(fuse(-24,-13),[-65,-3,1],.45)+place(terminals(-39,-22,4),[-28,-1,1],.62);
      h+=place(board(-37,-31,75,62,'relay'),[65,-43,1],.49);
      h+=place(release(-17,-17),[106,-46,1],.43)+place(magnet(-35,-17),[139,-44,1],.38);
      h+=place(board(-40,-35,80,71,'buck'),[69,41,1],.57)+place(board(-38,-35,77,70,'esp'),[133,37,1],.44);
      h+=route([[-79,-3,2],[-77,-3,2],[-76,-3,2]],u);
      h+=route([[-52,-3,2],[-49,-3,2],[-46,-3,2]],u);
      h+=route([[-4,-4,2],[20,-4,2],[20,-43,2],[42,-43,2]],span(p,.25,.85));
      h+=route([[-4,8,2],[20,8,2],[20,41,2],[40,41,2]],span(p,.35,.95));
      h+=route([[96,40,2],[105,40,2],[111,40,2]],span(p,.50,1));
    }
    if(scene==='power-lock')h+=board(-141,-53,73,66,'relay')+release(-40,23)+magnet(44,-40)+route([[-60,2,2],[-49,18,2],[-4,8,2],[35,0,2]],u);
    if(scene==='power-buck')h+=board(-116,-40,80,71,'buck')+board(47,-29,77,70,'esp')+route([[-25,20,2],[2,30,2],[31,15,2]],u);
    if(scene==='power-control')h+=board(-128,-40,77,70,'esp')+board(41,-40,77,70,'relay')+route([[-36,9,2],[0,9,2],[27,9,2]],u,'hi')+route([[-37,47,2],[-10,62,2],[26,47,2]],0);
    if(scene==='power-usb')h+=usb()+board(64,-40,77,70,'esp')+route([[12,-30,2],[30,-44,2],[48,-30,2]],u);
    return `<g data-electric-scene="${scene}" data-route-state="conceptual-open">${h}</g>`;
  }
  const solderP={origin:[420,345],scale:2.5,azimuth:42,elevation:32};
  function solder(scene,p){
    // Geometry has its own large closeup group; no hot part ever touches a screw terminal.
    const Q=solderP,G=AnatomyLathe,atq=v=>iso(v,Q);
    const b=(x,y,w,d,z,h,tone='mid',r=1)=>solidSvg(slabOf(plan(x,y,w,d,r),z,h,Q,6,.4),{tone,crease:'faint'});
    const r=(o,a,len,rad,tone='mid')=>solidSvg(G.solidOf([[0,rad],[len,rad]],G.frameAlong(o,a),Q,{steps:32}),{tone});
    const c=(x,y,rad,z,h,tone='mid')=>solidSvg(cylinder(x,y,rad,z,h,Q,40,.25),{tone});
    const sc=(x,y,z)=>lineSvg(ring(x,y,1.5,z,Q,20),{tone:'mid'})+dotsSvg([atq([x,y,z])],{size:.4,tone:'hi'});
    let h='';for(const x of[-110,98])for(const y of[-57,45])h+=b(x,y,12,12,-12,4,'lo',2);
    h+=b(-123,-70,246,140,-8,8,'lo',6);
    for(const x of[-110,98])for(const y of[-57,45])h+=sc(x+6,y+6,0);
    h+=lineSvg(planOutline(plan(-117,-64,234,128,3),0,Q),{tone:'faint'});
    // Recognisable safety equipment, not decorative smoke: goggles and extraction hood.
    if(scene==='solder-support'||scene==='solder-tip'){
      for(const x of[-100,-72])h+=b(x,-52,25,19,1,4,'mid',4)+b(x+3,-49,19,13,5,.5,'hi',3);
      h+=b(-76,-45,7,4,3,2,'mid',1)+b(-105,-47,5,3,1,3,'mid',1)+b(-46,-47,5,3,1,3,'mid',1);
      h+=b(-15,-59,32,21,0,6,'mid',2)+b(-4,-51,9,10,6,43,'mid',2);
      const hood=G.frameAlong([0,-45,48],[0,1,-.4]);
      h+=solidSvg(G.solidOf([[0,7],[5,9],[19,19],[22,19]],hood,Q,{steps:40}),{tone:'mid'});
      h+=solidSvg(G.solidOf([[22.1,15],[22.4,15]],hood,Q,{steps:40}),{tone:'lo'});
      for(const x of[-10,12])h+=sc(x,-54,6)+sc(x,-42,6);
    }
    // Safety rest: heavy foot, upright and an inclined open ring that supports the shaft.
    h+=b(61,17,42,35,0,6,'mid',3)+b(73,22,12,10,6,22,'mid',1);
    h+=solidSvg(G.lathe([[0,8],[3,8],[3,6],[0,6]],G.frameAlong([78,27,34],[-.55,.25,.80]),Q,{steps:40}),{tone:'hi'});
    for(const x of[67,97])for(const y of[23,46])h+=sc(x,y,6);
    if(scene==='solder-tip'){
      // Only the soldering tip is cleaned/tinned. No wire end or screw terminal is present.
      h+=c(-26,0,20,0,7,'mid')+c(-26,0,17,7,2,'hi');
      for(let i=0;i<7;i++)h+=solidSvg(G.solidOf([[0,1.1],[8,1.1]],G.frameAlong([-37+i*3.5,-5,10],[0,1,.3]),Q,{steps:24}),{tone:'mid'});
      const clean=span(p,.1,.4),away=span(p,.4,.55),rest=span(p,.85,1),active=[-26+27*away,2,10.7+13*away],park=[91.75,20.75,14],tip=active.map((v,i)=>v+(park[i]-v)*rest),a=[-.55,.25,.80];
      tip[2]+=24*Math.sin(Math.PI*rest);
      h+=solidSvg(G.sphereOf(tip,.5,Q,{steps:28}),{tone:'hi'})+solidSvg(G.solidOf([[.45,.25],[6,1.3],[25,1.7],[27,4],[43,4],[46,3]],G.frameAlong(tip,a),Q,{steps:40}),{tone:'mid'});
      if(p>=.5&&p<.87){const retreat=1-span(p,.55,.7)+span(p,.78,.87),end=[tip[0]+18*retreat,tip[1]-12*retreat,tip[2]+12*retreat],start=[-5,-31,42],v=end.map((n,i)=>n-start[i]);h+=r(start,v.map(n=>n/Math.hypot(...v)),Math.hypot(...v),.55,'hi');}
      return `<g data-electric-scene="solder-tip" data-workpiece="tip-only-no-terminal" data-thermal-reading="none" data-cleaning-phase="${clean}">${h}</g>`;
    }
    const insulate=scene==='solder-insulate',releaseJaws=insulate?span(p,.05,.35):0;
    // Two retazos, not a PCB pad: a sleeve can cover this inline practice splice.
    // Jaws leave a real channel around the conductor and open before the sleeve slides.
    for(const x of[-57,53]){
      h+=b(x,-20,24,44,0,7,'mid',2);
      for(const side of[-1,1]){
        const y=side<0?-15-12*releaseJaws:9+12*releaseJaws;
        h+=b(x+2,y,20,10,7,11,'mid',1)+sc(x+12,y+5,18);
      }
      h+=b(x+4,-3-12*releaseJaws,16,4,9,6,'hi',.5)+b(x+4,7+12*releaseJaws,16,4,9,6,'hi',.5);
    }
    h+=b(-21,-13,50,33,0,2,'lo',2); // cold, electrically isolated practice rest below the joint
    const seated=scene!=='solder-support'?1:span(p,.1,.8),lift=12*(1-seated);
    const cable=r([-113,4,12.3+lift],[1,0,0],105,3,'mid')+r([30,4,12.3+lift],[1,0,0],83,3,'mid');
    // Parallel lap practice: exposed strands overlap along x=4..18, not end-to-end.
    const segment=(a,z,rad,tone='hi')=>{const v=z.map((n,i)=>n-a[i]),len=Math.hypot(...v);return r(a,v.map(n=>n/len),len,rad,tone);};
    let core='';for(const yz of[[0,0],[-.7,0],[.7,0],[-.35,.6],[.35,.6]]){
      const z=12.3+lift+yz[1],left=[2,2.9+yz[0],z],right=[20,5.1+yz[0],z];
      core+=segment([-8,4+yz[0],z],left,.38)+segment(left,[18,2.9+yz[0],z],.38);
      core+=segment([4,5.1+yz[0],z],right,.38)+segment(right,[30,4+yz[0],z],.38);
    }
    h+=cable+core;
    const heat=scene==='solder-heat',feed=scene==='solder-feed',cool=scene==='solder-cool';
    const approach=heat?1-span(p,.12,.6):0;
    const withdraw=cool?span(p,.15,.50):0;
    const toolPresent=heat||feed||cool||insulate||scene==='solder-support';
    const join=feed?span(p,.3,.7):cool||insulate?1:0;
    // A thin longitudinal fillet wets the adjacent lap surfaces; no isolated solder ball.
    if(join>0)h+=solidSvg(G.solidOf([[0,.12],[1,.65*join],[3,.9*join],[11,.9*join],[13,.65*join],[14,.12]],G.frameAlong([4,4,12.5],[1,0,0]),Q,{steps:32}),{tone:'hi'});
    // Sleeve was threaded onto insulated wire before soldering; it is not heated with the iron.
    const sleeveX=insulate?-110+97*span(p,.45,.9):-110;
    h+=solidSvg(G.lathe([[0,5],[48,5],[48,4.3],[0,4.3]],G.frameAlong([sleeveX,4,12.3+lift],[1,0,0]),Q,{steps:40}),{tone:'mid'});
    if(toolPresent){
      // Rounded tip is tangent to the joint's near envelope, not six units away.
      const toRest=cool?withdraw:insulate||scene==='solder-support'?1:0;
      const hot=[11+25*approach,4+12.5*approach,13.36+17.5*approach],park=[91.75,20.75,14],tip=hot.map((v,i)=>v+(park[i]-v)*toRest),a=[-.55,.25,.80];
      tip[2]+=32*Math.sin(Math.PI*toRest);
      h+=solidSvg(G.sphereOf(tip,.5,Q,{steps:28}),{tone:'hi'});
      h+=solidSvg(G.solidOf([[.45,.25],[6,1.3],[25,1.7],[27,4],[43,4],[46,3]],G.frameAlong(tip,a),Q,{steps:40}),{tone:'mid'});
      for(let i=0;i<3;i++)h+=solidSvg(G.solidOf([[29+i*4,4.2],[29.7+i*4,4.2]],G.frameAlong(tip,a),Q,{steps:32}),{tone:'lo'});
    }
    if(feed||cool){
      // Feed ends at the heated joint, then withdraws BEFORE the iron leaves.
      const retreat=cool?1:1-span(p,.1,.3)+span(p,.72,.92),end=[11+26*retreat,4+18*retreat,13.95+18*retreat],start=[68,41,45],v=end.map((n,i)=>n-start[i]),len=Math.hypot(...v);
      h+=r(start,v.map(n=>n/len),len,.55,'hi');
    }
    return `<g data-electric-scene="${scene}" data-workpiece="isolated-practice-coupon" data-thermal-reading="none">${h}</g>`;
  }
  function draw(scene,p){if(!scenes.includes(scene))return null;p=clamp(p);return scene.startsWith('solder-')?solder(scene,p):electrical(scene,p);}
  return Object.freeze({draw,scenes:Object.freeze(scenes)});
})();
