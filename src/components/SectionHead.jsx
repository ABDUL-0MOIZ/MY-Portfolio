import { useRef } from 'react';
import { gsap, useGSAP, animated } from '../lib/gsap';
import { SplitChars } from './ui/SplitText';

export default function SectionHead({ title, text, left }) {
  const ref = useRef(null);
  useGSAP(() => {
    if (!animated) return;
    const h = ref.current, trg = h.closest('section') || h;
    gsap.from(h.querySelectorAll('h2 .ch'), {
      opacity: 0, y: 40, rotateX: -80, transformOrigin: '50% 100%', transformPerspective: 500,
      duration: 0.9, ease: 'back.out(1.6)', stagger: 0.035,
      scrollTrigger: { trigger: trg, start: 'top 72%', once: true },
    });
    const p = h.querySelector('p');
    if (p) gsap.from(p, { opacity: 0, y: 18, duration: 0.8, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: trg, start: 'top 72%', once: true } });
  }, { scope: ref });

  return (
    <div ref={ref} className={`sec-head${left ? ' left' : ''}`}>
      <h2 aria-label={title}><SplitChars text={title} /></h2>
      {text && <p>{text}</p>}
    </div>
  );
}
