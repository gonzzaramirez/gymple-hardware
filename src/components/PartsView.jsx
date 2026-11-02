import { GympleContent } from '../lab/gymple-content.js';
export function PartsView({ active }) {
  return (
<section id="view-parts" role="tabpanel" aria-labelledby="tab-parts" hidden={!active}><div className="view-heading"><div><h1>El conjunto, pieza por pieza.</h1>
<p>Todo montado en su lugar. Movés el control y las piezas se separan; tocás una y te cuenta qué hace. Lo único impreso es la caja chica: el resto es acero de herrería.</p>
</div>
<span className="eyebrow">EXPLOSIONADO · {Object.keys(GympleContent.parts).length} PIEZAS</span></div>
<div className="lab-card"><div className="canvas-column"><div id="parts-stage" className="iso-plate" tabIndex="0" role="group" aria-label="Conjunto explosionado. Elegí una pieza en el dibujo o en la lista."><div className="card-meta"><span>FIG. 02 / CONJUNTO EXPLOTADO</span><span id="parts-scene-label">PUERTA, MARCO Y CERRADURA</span></div>
<svg id="parts-svg" className="iso-svg" viewBox="0 0 1000 650" role="group" aria-label="Conjunto del MVP"></svg>
<div className="card-meta bottom"><span id="parts-hint">LO IMPRESO ES LA CAJA; EL METAL ES HERRERÍA</span><span id="parts-readout" data-readout="">ARMADO</span></div>
</div>
<div className="local-controls"><label>Separar <input id="parts-explode" type="range" min="0" max="100" defaultValue="0" aria-label="Separar las piezas del conjunto" /></label>
<button id="parts-auto" className="primary">▶ Ver cómo se separa</button>
<span>Solo para mirar. No agrega conexiones.</span></div>
</div>
<aside><div className="rail-head"><span className="eyebrow">PIEZAS · {Object.keys(GympleContent.parts).length}</span><span className="rail-hint">Tocá una pieza del dibujo o de la lista</span></div>
<div id="parts-groups" className="part-groups">{GympleContent.groups.map(group => <details key={group.id} data-group={group.id}><summary>{group.name}</summary><div className="group-buttons">{Object.entries(GympleContent.parts).filter(([,part]) => part.group === group.id).map(([id,part]) => <button key={id} data-part-pick={id}>{part.name}</button>)}</div></details>)}</div>
<div className="part-inspector"><span className="eyebrow">PIEZA ELEGIDA</span><h2 id="part-title"></h2>
<p id="part-role"></p>
<dl id="part-facts"></dl><details><summary>Qué falta definir</summary><p id="part-pending"></p>
</details>
</div>
</aside>
</div>
</section>

  );
}
