import { useEffect } from 'react';
import { navTo } from '../lib/scroll';

// Any <a href="#section"> click scrolls smoothly via Lenis
export default function useAnchorScroll() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id === '#') { e.preventDefault(); return; }
      if (!id || id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      navTo(t);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
