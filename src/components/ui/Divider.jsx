import { useRef } from 'react';
import { gsap, useGSAP, animated } from '../../lib/gsap';

export default function Divider() {
  const ref = useRef(null);
  useGSAP(() => {
    if (!animated) return;
    gsap.from(ref.current, { scaleX: 0, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: ref.current, start: 'top 95%', once: true } });
  }, { scope: ref });
  return <div ref={ref} className="divider" />;
}
