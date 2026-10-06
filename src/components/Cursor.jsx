import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { fine, reduce } from '../lib/env';

export default function Cursor() {
  const ring = useRef(null), dot = useRef(null);
  useEffect(() => {
    if (!fine || reduce) return;
    const root = document.documentElement;
    root.classList.add('has-cur');
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08 });
    const move = (e) => { rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY); };
    const over = (e) => {
      const hot = !!(e.target.closest && e.target.closest('a,button,.tile,.svc,.proj,.field,.tab,.opt'));
      ring.current.classList.toggle('hot', hot);
    };
    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    return () => {
      root.classList.remove('has-cur');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
    };
  }, []);
  return (<><div id="cur" ref={ring} aria-hidden="true" /><div id="curDot" ref={dot} aria-hidden="true" /></>);
}
