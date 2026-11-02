import { useLayoutEffect, useRef, useState } from 'react';
import { FlowView } from './components/FlowView.jsx';
import { PartsView } from './components/PartsView.jsx';
import { TutorialView } from './components/TutorialView.jsx';
import { TechnicalHelp } from './components/TechnicalHelp.jsx';
import { mountLab } from './lab/controller.js';

const views = [
  ['flow', 'El ciclo'],
  ['parts', 'Las piezas'],
  ['tutorial', 'La caja y la cerradura'],
];

function ViewTabs({ view, onChange }) {
  function navigate(event) {
    const index = views.findIndex(([id]) => id === view);
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % views.length;
    if (event.key === 'ArrowLeft') next = (index + views.length - 1) % views.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = views.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    const id = views[next][0];
    onChange(id);
    document.getElementById(`tab-${id}`).focus();
  }
  return <nav id="main-tabs" className="main-tabs" role="tablist" aria-label="Tres vistas del laboratorio" onKeyDown={navigate}>
    {views.map(([id, label], index) => <button key={id} id={`tab-${id}`} role="tab" aria-selected={view === id} aria-controls={`view-${id}`} tabIndex={view === id ? 0 : -1} data-tab={id} onClick={() => onChange(id)}><span>{String(index + 1).padStart(2, '0')}</span> {label}</button>)}
  </nav>;
}

export default function App() {
  const root = useRef(null);
  const controller = useRef(null);
  const [view, setView] = useState('flow');
  const [theme, setTheme] = useState('light');
  useLayoutEffect(() => {
    const lab = mountLab(root.current, { onViewChange:setView });
    controller.current = lab;
    return () => { lab.destroy(); controller.current = null; };
  }, []);
  useLayoutEffect(() => { controller.current?.setView(view); }, [view]);
  useLayoutEffect(() => { document.body.dataset.theme = theme; }, [theme]);
  return <div ref={root}>
    <a className="skip" href="#contenido">Ir a las vistas</a>
    <header><div className="brand">GYMPLE<span>CONTROL DE ACCESO</span></div><div className="header-tools"><span className="demo-tag">MVP · DEMO LOCAL</span><button id="theme" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? 'Oscuro' : 'Claro'}</button></div></header>
    <main id="contenido" tabIndex={-1}>
      <ViewTabs view={view} onChange={setView} />
      <FlowView active={view === 'flow'} />
      <PartsView active={view === 'parts'} />
      <TutorialView active={view === 'tutorial'} />
      <TechnicalHelp />
      <footer>GYMPLE / CONTROL DE ACCESO · CAJA IMPRESA + ESTRUCTURA DE METAL · DEMO SIN HARDWARE CONECTADO</footer>
      <div id="announcement" className="sr-only" aria-live="polite" />
    </main>
  </div>;
}
