import { useEffect, useRef, useState } from 'react';

// true (once) after the element scrolls into view
export default function useInView(threshold = 0.4) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

// runs start() while element is visible; start() may return a cleanup fn
export function useWhileVisible(ref, start) {
  useEffect(() => {
    let stop = null;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!stop) stop = start() || (() => {}); }
      else if (stop) { stop(); stop = null; }
    }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => { io.disconnect(); if (stop) stop(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
