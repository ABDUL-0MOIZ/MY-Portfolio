import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, animated } from '../lib/gsap';
import { SKILL_TABS, SKILL_TILES } from '../data/content';
import useTilt from '../hooks/useTilt';
import SectionHead from './SectionHead';
import Divider from './ui/Divider';

function Tile({ ic, name, desc, pop, d }) {
  const t = useTilt(true);
  return (
    <div ref={t.ref} className={`tile${t.on ? ' tilt' : ''}${pop ? ' pop' : ''}`} style={{ '--d': d }}
      onPointerMove={t.onPointerMove} onPointerLeave={t.onPointerLeave}>
      <span className="mono-ic">{ic}</span>
      <div><b>{name}</b><small>{desc}</small></div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const [filter, setFilter] = useState('all');
  const [touched, setTouched] = useState(false);
  const visible = SKILL_TILES.filter((t) => filter === 'all' || t.cat === filter);

  useGSAP(() => {
    if (!animated) return;
    gsap.from('.tab', { opacity: 0, y: 14, duration: 0.5, stagger: 0.07, scrollTrigger: { trigger: '.tabs', start: 'top 92%', once: true } });
    ScrollTrigger.batch(gsap.utils.toArray('.tile', ref.current), {
      start: 'top 92%', once: true,
      onEnter: (els) => gsap.from(els, { opacity: 0, y: 40, scale: 0.9, duration: 0.7, ease: 'power3.out', stagger: 0.05, clearProps: 'transform,opacity' }),
    });
  }, { scope: ref });

  // layout height changes when tiles are filtered
  useEffect(() => {
    if (!touched) return;
    const id = setTimeout(() => ScrollTrigger.refresh(), 60);
    return () => clearTimeout(id);
  }, [filter, touched]);

  return (
    <section id="skills" className="block" ref={ref}>
      <div className="wrap">
        <SectionHead title="Tech Skills" text="Languages and frameworks I use to build mobile, web, and backend products." />
        <div className="tabs" role="tablist" aria-label="Skill categories">
          {SKILL_TABS.map(([id, label]) => (
            <button key={id} className={'tab' + (filter === id ? ' on' : '')} role="tab" aria-selected={filter === id}
              onClick={() => { setFilter(id); setTouched(true); }}>{label}</button>
          ))}
        </div>
        <div className="skill-grid">
          {visible.map((t, i) => <Tile key={filter + t.name} {...t} pop={touched} d={i} />)}
        </div>
        <Divider />
      </div>
    </section>
  );
}
