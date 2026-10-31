export function FlowView({ active }) {
  return (
<section id="view-flow" role="tabpanel" aria-labelledby="tab-flow" hidden={!active}><div className="view-heading"><div><h1>DNI + Enter. Mirá el ciclo.</h1>
<p>DNI de prueba <button className="fixture-inline" data-fill="allow">11111111</button></p>
</div>
</div>

<div className="lab-card simple-flow"><div id="flow-stage" className="flow-workspace iso-plate" tabIndex="0" role="group" aria-label="Teclado numérico. Solo ejemplos ficticios; números, Retroceso y Enter."><div className="pad-column"><svg id="pc-pad" viewBox="0 0 310 475" role="group" aria-label="Numpad de PC, vista de frente"></svg>
<div className="pad-edit"><button id="flow-back" aria-label="Borrar un dígito">⌫ Borrar</button><button id="flow-clear">Limpiar</button></div>
</div>
<div className="gate-column"><div className="card-meta"><span>PORTILLO BAJO / DEMOSTRACIÓN</span><span id="flow-angle">0°</span></div>
<svg id="flow-svg" className="iso-svg" viewBox="0 0 1000 650" role="img" aria-label="Portillo bajo con hoja pivotante, electroimán y armadura"></svg>
<div className="cycle-status"><span id="flow-status" role="status"></span><small id="flow-readout" data-readout=""></small></div>
</div>
</div>
<div className="simple-controls"><button id="flow-pause" disabled>Ⅱ Pausar</button><button id="flow-next" hidden>Siguiente pose →</button><button id="flow-reset">↺ Repetir desde cero</button><span id="flow-notice" className="notice"></span></div>
<p className="motion-disclaimer">Movimiento ilustrativo; mecanismo de apertura/retorno por definir. El imán retiene al alinear, no mueve la hoja.</p>
</div>

<details className="secondary"><summary>Ejemplos, fallas y alcance</summary><p>Sin red ni servidor. No ingreses DNI reales: nada se guarda ni se envía. <button data-fill="deny">Probar denegado: 22222222</button> Ningún otro número se autoriza. El numpad USB es una referencia de interacción: interfaz y equipo host por definir.</p>
<div className="fault-buttons"><button data-fault="power">Corte 12 V</button><button data-fault="control">Sin control</button><button data-fault="welded">Contacto pegado</button><button data-fault="emergency">Liberación independiente</button><button data-fault="restore">Restablecer</button></div>
<label className="fault-manual">Pose ilustrativa en falla <input id="fault-door" type="range" min="0" max="82" defaultValue="0" aria-label="Pose ilustrativa de la hoja en falla" /></label>
<p id="fault-reason"></p>
<p>Una falla cancela el ciclo, no lo deja pendiente. COM–NC es propuesta, no pinout. Antes de otro ejemplo restablecé y volvé a pose cerrada. Las animaciones no prueban salida ni retención reales.</p>
</details>
</section>

  );
}
