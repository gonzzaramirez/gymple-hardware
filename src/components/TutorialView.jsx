import { GympleContent } from '../lab/gymple-content.js';
export function TutorialView({ active }) {
  return (
<section id="view-tutorial" role="tabpanel" aria-labelledby="tab-tutorial" hidden={!active}><div className="view-heading"><div><h1>Armado desde cero.</h1>
<p>Una acción, un gesto y un resultado. Aprender no aprueba una instalación.</p>
</div>
<span id="tutorial-count" className="eyebrow">ACCIÓN 01 / 33</span></div>
<div className="tutorial-navigation"><button id="tutorial-prev">← Anterior</button><label>Acción <select id="tutorial-select" defaultValue="0">{GympleContent.lessons.map((lesson,index) => <option key={lesson.scene + index} value={index}>{String(index + 1).padStart(2,"0")} · {lesson.title}</option>)}</select>
</label>
<button id="tutorial-next">Siguiente →</button></div>
<div className="lab-card tutorial-card"><div className="canvas-column"><div id="tutorial-stage" className="iso-plate" tabIndex="0" role="group" aria-label="Gesto de armado. Espacio reproduce o pausa. Flechas recorren el gesto."><div className="card-meta"><span id="tutorial-scene-label">FIG. 03 / MESA VACÍA</span><span>GESTO DIDÁCTICO · SIN ALIMENTACIÓN REAL</span></div>
<svg id="tutorial-svg" className="iso-svg" viewBox="0 0 840 560" role="group" aria-label="Gesto de la acción actual"></svg>
<div className="card-meta bottom"><span id="tutorial-gesture">Mesa vacía</span><span id="tutorial-readout" data-readout="">INICIO</span></div>
</div>
<div className="local-controls tutorial-controls"><button id="tutorial-play" className="primary">▶ Ver gesto</button><button id="tutorial-replay">↺ Repetir</button><button id="tutorial-pose">Siguiente pose</button><label>Velocidad <select id="tutorial-speed" defaultValue="1"><option value="0.5">0,5×</option><option value="1">1×</option><option value="1.5">1,5×</option></select>
</label>
</div>
<label className="tutorial-timeline">Recorrer este gesto <input id="tutorial-scrub" type="range" min="0" max="1000" defaultValue="0" aria-label="Recorrer gesto de esta acción" /></label>
</div>
<aside><span className="eyebrow" id="tutorial-step-label">01 / PREPARAR</span><h2 id="tutorial-title"></h2>
<p id="tutorial-action" className="instruction"></p>
<div className="result"><span className="eyebrow">QUÉ TENÉS QUE VER</span><p id="tutorial-result"></p>
</div>
<label className="didactic-check"><input id="tutorial-done" type="checkbox" /><span>Entendí este gesto DEMO.<small>No declara un ensayo ni un montaje real.</small></span></label>
<div id="tutorial-block" className="physical-gate" hidden><span>REALIZACIÓN FÍSICA PENDIENTE</span><p id="tutorial-block-copy"></p>
</div>
<details className="materials"><summary>Materiales y preparación de esta acción</summary><p id="tutorial-need"></p>
</details>
<button id="tutorial-go-flow" className="primary" hidden>Probar el flujo DNI DEMO →</button><p id="tutorial-storage" className="tiny"></p>
</aside>
</div>
</section>

  );
}
