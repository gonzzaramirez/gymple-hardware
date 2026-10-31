import { coil } from '../anatomy/iso-kit.js';
import { GympleDemoModel } from './demo-model.js';
/* Local fixtures; automatic motion is desired behaviour, NOT a selected mechanism. */
const GympleFlow=(()=>{
 const ALLOW='11111111',DENY='22222222',moving=new Set(['released','opening','open','closing']);
 const create=()=>({input:'',phase:'entering',elapsed:0,paused:false,angle:0,targetAngle:0,relay:0,motion:null,epoch:0,notice:'',env:GympleDemoModel.defaults()});
 const command=s=>['released','opening'].includes(s.phase)?'authorized':'none';
 function electrical(s){const v={...GympleDemoModel.evaluate(s.env,command(s),s.angle)};if(v.coil!==null){v.contact=s.relay>.001&&s.relay<.999?'transition':s.relay>=.999?'open':'closed';v.magnet=v.contact==='transition'?null:v.contact==='closed';}if(s.env.welded&&s.env.supply){v.contact='closed';v.magnet=true;}if(!s.env.supply||s.env.emergency)v.magnet=false;v.retained=v.magnet===true&&s.angle===0;v.manualOpenAllowed=v.magnet===false||s.angle>.01;return v;}
 const busy=s=>moving.has(s.phase);
 function reset(s){const epoch=s.epoch+1;Object.assign(s,create(),{epoch});return true;}
 function edit(s,key){if(busy(s)||s.angle>.01||s.phase==='fault')return false;s.phase='entering';s.elapsed=0;s.notice='';s.epoch++;if(key==='clear')s.input='';else if(key==='back')s.input=s.input.slice(0,-1);else if(/^\d$/.test(key)&&s.input.length<8)s.input+=key;return true;}
 function fill(s,which){if(!edit(s,'clear'))return false;s.input=which==='allow'?ALLOW:DENY;return true;}
 function submit(s){if(busy(s)||s.angle>.01||s.phase==='fault')return false;if(!GympleDemoModel.evaluate(s.env).remoteAvailable){s.phase='fault';return false;}if(s.input!==ALLOW&&s.input!==DENY){s.phase='example';s.notice='Usá solo el DNI de prueba.';return false;}s.epoch++;s.phase=s.input===ALLOW?'released':'denied';s.elapsed=0;s.notice='';s.paused=false;return true;}
 const ease=u=>u*u*u*(u*(u*6-15)+10);
 function advance(s){if(s.phase==='released'){if(electrical(s).magnet!==false)return false;s.phase='opening';s.targetAngle=82;s.elapsed=0;}else if(s.phase==='opening'){s.angle=82;s.targetAngle=82;s.phase='open';s.elapsed=0;}else if(s.phase==='open'){s.phase='closing';s.targetAngle=0;s.elapsed=0;}else if(s.phase==='closing'){s.angle=0;s.targetAngle=0;s.phase='complete';s.elapsed=0;}else return false;return true;}
 function tick(s,dt,still=false){dt=Math.min(Math.max(dt,0),1/30);if(s.paused)return s;const c=GympleDemoModel.evaluate(s.env,command(s),s.angle).coil,t=c===null?.5:c?1:0;s.relay=GympleDemoModel.follow(s.relay,t,dt,still);if(Math.abs(s.relay-t)<.0005)s.relay=t;if(still)return s;if(busy(s)){s.elapsed+=dt;if(s.phase==='released'){if(s.elapsed>=.8&&electrical(s).magnet===false)advance(s);else if(s.elapsed>=2){s.phase='fault';s.targetAngle=s.angle;s.notice='No se libera: mirá la falla.';}}else if(s.phase==='opening'){s.angle=82*ease(Math.min(1,s.elapsed/3.4));if(s.elapsed>=3.4)advance(s);}else if(s.phase==='open'&&s.elapsed>=1.3)advance(s);else if(s.phase==='closing'){s.angle=82*(1-ease(Math.min(1,s.elapsed/5.2)));if(s.elapsed>=5.2)advance(s);}}return s;}
 function fault(s,key){s.epoch++;s.phase='fault';s.elapsed=0;s.targetAngle=s.angle;s.paused=false;if(key==='restore'){s.env=GympleDemoModel.defaults();if(s.angle===0)s.phase='entering';}else if(key==='power')s.env.supply=!s.env.supply;else if(key==='control')s.env.control=!s.env.control;else if(key in s.env)s.env[key]=!s.env[key];}
 function manualFault(s,target){if(s.phase!=='fault')return false;const e=electrical(s);if(target>s.angle&&!e.manualOpenAllowed)return false;s.angle=GympleDemoModel.clamp(target,0,82);s.targetAngle=s.angle;return true;}
 const snapshot=s=>({phase:s.phase,inputLength:s.input.length,fixture:s.input===ALLOW?'allow':s.input===DENY?'deny':'other',elapsed:s.elapsed,paused:s.paused,angle:s.angle,targetAngle:s.targetAngle,relay:s.relay,epoch:s.epoch,env:{...s.env},state:electrical(s)});
 return Object.freeze({ALLOW,DENY,create,edit,fill,submit,advance,reset,fault,manualFault,tick,electrical,command,busy,snapshot,push:()=>false,close:()=>false});
})();

export { GympleFlow };
