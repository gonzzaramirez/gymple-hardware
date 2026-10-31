import { coil } from '../anatomy/iso-kit.js';
/* Pure model of an explicitly proposed COM-NC architecture. NO I/O, no network. */
const GympleDemoModel=(()=>{
  'use strict';
  const defaults=()=>({supply:true,control:true,network:true,emergency:false,halted:false,welded:false});
  function evaluate(input,command='none',angle=0){
    const s={...defaults(),...input};
    let coil=false,contact='closed',magnet=true,reason='Reposo de la arquitectura propuesta: NC cerrado.';
    const remoteAvailable=s.supply&&s.control&&s.network&&!s.halted&&!s.emergency;
    if(!s.supply){coil=false;magnet=false;reason='Sin 12 V: ambas ramas quedan sin alimentación en esta propuesta.';}
    else if(!s.control){coil=false;magnet=true;reason='Sin 5 V de control, el relé desenergizado vuelve a NC. Con 12 V presentes, el electroimán puede seguir alimentado.';}
    else if(s.halted||!s.network){coil=null;contact='unknown';magnet=null;reason=s.halted?'ESP bloqueado: el estado del mando no está definido por esta maqueta.':'Sin red/VPS: no inferimos el estado físico del relé ni una política offline no verificada.';}
    else if(command==='authorized'){coil=true;contact='open';magnet=false;reason='Autorización simulada: bobina accionada, NC abierto. No se mueve la hoja.';}
    else if(command==='denied'){reason='Denegación simulada: no se ordena liberar el electroimán.';}
    if(s.welded&&s.supply){contact='closed';magnet=true;reason='Hipótesis de NC pegado: una orden del controlador no corta esta rama.';}
    if(s.emergency){magnet=false;reason='Corte independiente propuesto: la rama de cerradura queda interrumpida sin depender del mando.';}
    // No supply also dominates a welded contact. Zero energy is not a door sensor.
    if(!s.supply)magnet=false;
    const leafOpen=angle>.01;
    return Object.freeze({coil,contact,magnet,remoteAvailable,reason,leafOpen,manualOpenAllowed:magnet===false||leafOpen,bond:magnet===null?'unknown':magnet&& !leafOpen?'possible':'none',observedDoor:'not-measured'});
  }
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const follow=(current,target,dt,still=false)=>still||Math.abs(target-current)<.0005?target:current+(target-current)*(1-Math.exp(-Math.min(dt,1/30)/.22));
  return Object.freeze({defaults,evaluate,clamp,follow,revision:'propuesta-bpnet-v01',pulseSeconds:3});
})();

export { GympleDemoModel };
