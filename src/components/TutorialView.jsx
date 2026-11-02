import { GympleContent } from '../lab/gymple-content.js';
export function TutorialView({ active }) {
  return (
<section id="view-tutorial" role="tabpanel" aria-labelledby="tab-tutorial" hidden={!active}><div className="view-heading"><div><h1>Armá la caja y conectá la cerradura.</h1>
<p>Un paso, un gesto y listo. La estructura de metal la hace herrería: acá va solo la caja, la electrónica y la cerradura.</p>
</div>
<span id="tutorial-count" className="eyebrow">PASO 01 / {GympleContent.lessons.length}</span></div>
<div className="tutorial-navigation"><button id="tutorial-prev">← Anterior</button><label>Paso <select id="tutorial-select" defaultValue="0">{GympleContent.lessons.map((lesson,index) => <option key={lesson.scene + index} value={index}>{String(index + 1).padStart(2,"0")} · {lesson.title}</option>)}</select>
</label>
<button id="tutorial-next">Siguiente →</button></div>
<div className="lab-card tutorial-card"><div className="canvas-column"><div id="tutorial-stage" className="iso-plate" tabIndex="0" role="group" aria-label="Paso de armado. Espacio reproduce o pausa. Flechas recorren el paso."><div className="card-meta"><span id="tutorial-scene-label">FIG. 03 / MESA VACÍA</span><span>SIN ENCHUFAR</span></div>
<svg id="tutorial-svg" className="iso-svg" viewBox="0 0 840 560" role="group" aria-label="Gesto del paso actual"></svg>
<div className="card-meta bottom"><span id="tutorial-gesture">Mesa vacía</span><span id="tutorial-readout" data-readout="">EMPIEZA</span></div>
</div>
<div className="local-controls tutorial-controls"><button id="tutorial-play" className="primary">▶ Ver cómo se arma</button><button id="tutorial-replay">↺ Repetir</button><button id="tutorial-pose">Siguiente paso</button><label>Velocidad <select id="tutorial-speed" defaultValue="1"><option value="0.5">0,5×</option><option value="1">1×</option><option value="1.5">1,5×</option></select>
</label>
</div>
<label className="tutorial-timeline">Mové el paso <input id="tutorial-scrub" type="range" min="0" max="1000" defaultValue="0" aria-label="Recorrer el paso de esta acción" /></label>
</div>
<aside><span className="eyebrow" id="tutorial-step-label">01 / PREPARAR</span><h2 id="tutorial-title"></h2>
<p id="tutorial-action" className="instruction"></p>
<div className="result"><span className="eyebrow">QUÉ TENÉS QUE MIRAR</span><p id="tutorial-result"></p>
</div>
<label className="didactic-check"><input id="tutorial-done" type="checkbox" /><span>Entendí este paso (demo).<small>No quiere decir que ya lo probaste de verdad.</small></span></label>
<div id="tutorial-block" className="physical-gate" hidden><span>ESTO TODAVÍA NO LO ARMES DE VERDAD</span><p id="tutorial-block-copy"></p>
</div>
<details className="materials"><summary>Qué necesitás para este paso</summary><p id="tutorial-need"></p>
</details>
<button id="tutorial-go-flow" className="primary" hidden>Probar el DNI de mentira →</button><p id="tutorial-storage" className="tiny"></p>
</aside>
</div>
</section>

  );
}
