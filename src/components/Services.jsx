import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, animated } from '../lib/gsap';
import { SERVICES } from '../data/content';
import SectionHead from './SectionHead';
import Card from './ui/Card';
import Icon from './ui/Icon';
import Divider from './ui/Divider';

export default function Services() {
  const ref = useRef(null);
  useGSAP(() => {
    if (!animated) return;
    const root = ref.current;
    // prepare the stroke-draw effect on the icons
    root.querySelectorAll('.svc .ico svg').forEach((svg) => {
      svg.querySelectorAll('path,rect,circle,ellipse,line,polyline').forEach((s) => {
        s.setAttribute('pathLength', '1'); s.style.strokeDasharray = '1'; s.style.strokeDashoffset = '1';
      });
    });
    ScrollTrigger.batch(gsap.utils.toArray('.svc', root), {
      start: 'top 90%', once: true,
      onEnter: (els) => {
        gsap.from(els, { opacity: 0, y: 60, rotateX: -22, transformPerspective: 700, duration: 0.9, ease: 'power3.out', stagger: 0.1, clearProps: 'transform,opacity' });
        els.forEach((el, i) => gsap.to(el.querySelectorAll('svg *'), { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', delay: 0.25 + i * 0.1 }));
      },
    });
  }, { scope: ref });

  return (
    <section id="services" className="block" ref={ref}>
      <div className="wrap">
        <SectionHead title="Services" text="Delivering robust full-stack web solutions, mobile apps, high-performance APIs, and responsive frontends." />
        <div className="services-grid">
          {SERVICES.map((s) => (
            <Card key={s.title} as="article" tilt className="svc">
              <div className="ico"><Icon name={s.icon} size={21} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Card>
          ))}
        </div>
        <Divider />
      </div>
    </section>
  );
}
