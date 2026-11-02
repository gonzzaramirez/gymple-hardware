import { GympleContent } from '../lab/gymple-content.js';
export function PartsView({ active }) {
  return (
<section id="view-parts" role="tabpanel" aria-labelledby="tab-parts" hidden={!active}><div className="view-heading"><div><h1>Todo lo que lleva el MVP.</h1>
<p>Elegí una pieza para ver dónde va y qué la alimenta. Lo único impreso es la caja; la estructura de metal la hace herrería.</p>
</div>
<span className="eyebrow">CAJA IMPRESA + ESTRUCTURA DE METAL</span></div>
<div className="lab-card"><div className="canvas-column"><div id="parts-stage" className="iso-plate" tabIndex="0" role="group" aria-label="Catálogo visual. Elegí una pieza con los botones del catálogo."><div className="card-meta"><span>FIG. 02 / PIEZAS DEL MVP</span><span id="parts-scene-label">PUERTA Y ESTRUCTURA</span></div>
<svg id="parts-svg" className="iso-svg" viewBox="0 0 1000 650" role="group" aria-label="Piezas del MVP"></svg>
<div className="card-meta bottom"><span id="parts-hint">LO IMPRESO ES LA CAJA; EL METAL ES HERRERÍA</span><span id="parts-readout" data-readout="">ARMADO</span></div>
</div>
<div className="local-controls"><label>Separar <input id="parts-explode" type="range" min="0" max="100" defaultValue="0" aria-label="Separar las piezas de la maqueta" /></label>
<span>Solo para mirar. No agrega conexiones.</span></div>
</div>
<aside><div className="rail-head"><span className="eyebrow">CATÁLOGO · {Object.keys(GympleContent.parts).length} PIEZAS</span><span className="rail-hint">Tocá una pieza o elegila en el dibujo</span></div>
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
