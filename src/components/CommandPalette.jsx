import { useEffect, useMemo, useRef, useState } from 'react';
import { buildPaletteItems } from '../data/palette';
import { navTo, startScroll, stopScroll } from '../lib/scroll';

export default function CommandPalette({ open, setOpen }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inp = useRef(null);
  const items = useMemo(buildPaletteItems, []);
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter((i) => !s || i.t.toLowerCase().includes(s));
  }, [q, items]);

  useEffect(() => {
    if (open) {
      setQ(''); setSel(0); stopScroll();
      setTimeout(() => inp.current && inp.current.focus(), 20);
    } else startScroll();
  }, [open]);

  const run = (it) => {
    setOpen(false);
    if (it.t === 'Download CV') {
      const a = document.createElement('a');
      a.href = it.u;
      a.download = 'MYResume.pdf';
      a.click();
    } else if (it.u) window.open(it.u, '_blank', 'noopener');
    else setTimeout(() => navTo(it.h), 60);
  };
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); return; }
      if (!open) return;
      const n = Math.max(shown.length, 1);
      if (e.key === 'Escape') setOpen(false);
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => (s + 1) % n); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => (s - 1 + n) % n); }
      else if (e.key === 'Enter' && shown[sel]) { e.preventDefault(); run(shown[sel]); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  return (
    <div id="pal" className={open ? 'open' : ''} role="dialog" aria-modal="true" aria-label="Command menu"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="pal-box">
        <input ref={inp} id="palIn" type="text" placeholder="Jump to a section or action…" autoComplete="off"
          aria-label="Search commands" value={q} onChange={(e) => { setQ(e.target.value); setSel(0); }} />
        <div className="pal-list">
          {shown.map((it, i) => (
            <button key={it.t} type="button" className={'pal-item' + (i === sel ? ' sel' : '')}
              onClick={() => run(it)} onPointerMove={() => setSel(i)}>
              <span>{it.t}</span><small>{it.k}</small>
            </button>
          ))}
          {!shown.length && <div className="pal-item"><small>No match. Try "portfolio" or "contact".</small></div>}
        </div>
        <div className="pal-foot">↑ ↓ to move · Enter to open · Esc to close</div>
      </div>
    </div>
  );
}
