export function FlowView({ active }) {
  return (
<section id="view-flow" role="tabpanel" aria-labelledby="tab-flow" hidden={!active}><div className="view-heading"><div><h1>Poné el DNI y mirá cómo abre.</h1>
<p>DNI de prueba <button className="fixture-inline" data-fill="allow">11111111</button></p>
</div>
</div>

<div className="lab-card simple-flow"><div id="flow-stage" className="flow-workspace iso-plate" tabIndex="0" role="group" aria-label="Teclado numérico. Solo ejemplos ficticios; números, Retroceso y Enter."><div className="pad-column"><svg id="pc-pad" viewBox="0 0 310 475" role="group" aria-label="Numpad de PC, vista de frente"></svg>
<div className="pad-edit"><button id="flow-back" aria-label="Borrar un dígito">⌫ Borrar</button><button id="flow-clear">Limpiar</button></div>
</div>
<div className="gate-column"><div className="card-meta"><span>PUERTA DE LA MAQUETA / DEMO</span><span id="flow-angle">0°</span></div>
<svg id="flow-svg" className="iso-svg" viewBox="0 0 1000 650" role="img" aria-label="Puerta de la maqueta con bisagra, caja impresa y cerradura electromagnética"></svg>
<div className="cycle-status"><span id="flow-status" role="status"></span><small id="flow-readout" data-readout=""></small></div>
</div>
</div>
<div className="simple-controls"><button id="flow-pause" disabled>Ⅱ Pausar</button><button id="flow-next" hidden>Siguiente paso →</button><button id="flow-reset">↺ Empezar de nuevo</button><span id="flow-notice" className="notice"></span></div>
<p className="motion-disclaimer">Movimiento de mentira: el mecanismo de apertura y retorno todavía no está definido. El imán traba la puerta, no la empuja.</p>
</div>

<details className="secondary"><summary>Ejemplos, fallas y límites</summary><p>Sin internet ni servidor. No pongas DNI reales: no se guarda ni se envía nada. <button data-fill="deny">Probar uno que no entra: 22222222</button> Ningún otro número entra. El numpad es una referencia: falta definir cómo lo lee la compu.</p>
<div className="fault-buttons"><button data-fault="power">Cortar los 12 V</button><button data-fault="control">Sin control</button><button data-fault="welded">Relé pegado</button><button data-fault="emergency">Botón de salida</button><button data-fault="restore">Volver a la normalidad</button></div>
<label className="fault-manual">Mover la puerta a mano en la falla <input id="fault-door" type="range" min="0" max="82" defaultValue="0" aria-label="Mover la puerta a mano durante la falla" /></label>
<p id="fault-reason"></p>
<p>Una falla corta el ciclo; no lo deja pendiente. COM–NC es una idea, no un pinout. Para otro ejemplo, restablecé y volvé a la puerta cerrada. Las animaciones no prueban nada de verdad.</p>
</details>
</section>

  );
}
