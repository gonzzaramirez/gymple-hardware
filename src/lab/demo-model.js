import { coil } from '../anatomy/iso-kit.js';
/* Pure model of an explicitly proposed COM-NC architecture. NO I/O, no network. */
const GympleDemoModel=(()=>{
  'use strict';
  const defaults=()=>({supply:true,control:true,network:true,emergency:false,halted:false,welded:false});
  function evaluate(input,command='none',angle=0){
    const s={...defaults(),...input};
    let coil=false,contact='closed',magnet=true,reason='En reposo la cerradura queda trabada: el relé está en NC.';
    const remoteAvailable=s.supply&&s.control&&s.network&&!s.halted&&!s.emergency;
    if(!s.supply){coil=false;magnet=false;reason='Sin 12 V no hay nada: ni imán ni electrónica.';}
    else if(!s.control){coil=false;magnet=true;reason='Sin los 5 V de control, el relé vuelve a NC. Si hay 12 V, el imán puede seguir pegado.';}
    else if(s.halted||!s.network){coil=null;contact='unknown';magnet=null;reason=s.halted?'ESP bloqueada: la maqueta no sabe qué hace el control.':'Sin internet no sabemos qué hace el relé. No inventamos una política offline.';}
    else if(command==='authorized'){coil=true;contact='open';magnet=false;reason='Autorización de mentira: la bobina tira y el NC se abre. La puerta no se mueve sola.';}
    else if(command==='denied'){reason='Denegado de mentira: no se libera el imán.';}
    if(s.welded&&s.supply){contact='closed';magnet=true;reason='Si el NC queda pegado, la orden del control no corta esta rama.';}
    if(s.emergency){magnet=false;reason='El botón de salida corta la rama del imán sin depender del control.';}
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
