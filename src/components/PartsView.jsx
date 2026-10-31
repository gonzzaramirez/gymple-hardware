import { GympleContent } from '../lab/gymple-content.js';
export function PartsView({ active }) {
  return (
<section id="view-parts" role="tabpanel" aria-labelledby="tab-parts" hidden={!active}><div className="view-heading"><div><h1>Todas las partes, con una función.</h1>
<p>Seleccioná una pieza para ubicarla y ver quién la alimenta o la controla.</p>
</div>
<span className="eyebrow">CONFIGURACIÓN CANDIDATA · NO ES PINOUT</span></div>
<label className="compact-select">Elegir una parte <select id="part-select" defaultValue="leaf">{GympleContent.groups.map(group => <optgroup key={group.id} label={group.name}>{Object.entries(GympleContent.parts).filter(([,part]) => part.group === group.id).map(([id,part]) => <option key={id} value={id}>{part.name}</option>)}</optgroup>)}</select>
</label>
<div className="lab-card"><div className="canvas-column"><div id="parts-stage" className="iso-plate" tabIndex="0" role="group" aria-label="Catálogo visual. Seleccioná una pieza con los botones del catálogo."><div className="card-meta"><span>FIG. 02 / PARTES DEL PRODUCTO</span><span id="parts-scene-label">PORTILLO BAJO</span></div>
<svg id="parts-svg" className="iso-svg" viewBox="0 0 1000 650" role="group" aria-label="Piezas de la configuración propuesta"></svg>
<div className="card-meta bottom"><span id="parts-hint">UNA PIEZA SELECCIONADA, NO UN CIRCUITO APROBADO</span><span id="parts-readout" data-readout="">ENSAMBLADO</span></div>
</div>
<div className="local-controls"><label>Despiece <input id="parts-explode" type="range" min="0" max="100" defaultValue="0" aria-label="Separar conjuntos del catálogo" /></label>
<span>Separación ilustrativa. No extiende conexiones desconocidas.</span></div>
</div>
<aside><div id="parts-groups" className="part-groups">{GympleContent.groups.map(group => <details key={group.id} data-group={group.id}><summary>{group.name}</summary><div className="group-buttons">{Object.entries(GympleContent.parts).filter(([,part]) => part.group === group.id).map(([id,part]) => <button key={id} data-part-pick={id}>{part.name}</button>)}</div></details>)}</div>
<div className="part-inspector"><span className="eyebrow">PIEZA SELECCIONADA</span><h2 id="part-title"></h2>
<p id="part-role"></p>
<dl id="part-facts"></dl><details><summary>Qué falta identificar</summary><p id="part-pending"></p>
</details>
</div>
</aside>
</div>
</section>

  );
}
