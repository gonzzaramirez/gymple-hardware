import { GympleContent } from '../lab/gymple-content.js';
export function InsideView({ active }) {
  return (
<section id="view-inside" role="tabpanel" aria-labelledby="tab-inside" hidden={!active}><div className="view-heading"><div><h1>Adentro de la caja.</h1>
<p>Los 12 V entran, se reparten y vuelven a salir hacia la cerradura. La ESP32 sólo manda señal. Tocá una pieza para ver su parte del recorrido.</p>
</div>
<span className="eyebrow">FLUJO INTERNO · SIN ESCALA</span></div>
<div className="lab-card"><div className="canvas-column"><div id="inside-stage" className="iso-plate" tabIndex="0" role="group" aria-label="Interior de la caja con el recorrido de la alimentación y la señal"><div className="card-meta"><span>FIG. 03 / INTERIOR DE LA CAJA</span><span>12 V · 5 V · SEÑAL</span></div>
<svg id="inside-svg" className="iso-svg" viewBox="0 0 1000 650" role="group" aria-label="Interior de la caja"></svg>
<div className="card-meta bottom"><span id="inside-hint">TOCÁ UNA PIEZA PARA VER SU PARTE DEL FLUJO</span><span id="inside-readout" data-readout="">EN REPOSO</span></div>
</div>
<div className="local-controls"><button id="inside-run" className="primary">▶ Ver el recorrido</button><button id="inside-reset">Reiniciar</button>
<span className="flow-legend"><i className="flow-dot f12" />12 V<i className="flow-dot f5" />5 V<i className="flow-dot fsig" />señal</span></div>
</div>
<aside><span className="eyebrow">QUÉ PASA ACÁ</span><h2 id="inside-title"></h2>
<p id="inside-role" className="instruction"></p>
<div className="inside-flowcopy"><span className="eyebrow">EN EL FLUJO</span><p id="inside-flowtext"></p></div>
<dl id="inside-facts"></dl>
</aside>
</div>
</section>

  );
}
