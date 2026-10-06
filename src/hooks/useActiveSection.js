import { useEffect, useState } from 'react';

export default function useActiveSection(ids) {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
    return () => io.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}
