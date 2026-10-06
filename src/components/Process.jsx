import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, animated } from '../lib/gsap';
import { STEPS } from '../data/content';
import SectionHead from './SectionHead';
import Card from './ui/Card';

export default function Process() {
  const ref = useRef(null);
  useGSAP(() => {
    if (!animated) return;
    gsap.utils.toArray('.step', ref.current).forEach((s, i) => {
      const fx = window.innerWidth >= 900 ? (i % 2 ? 70 : -70) : 40;
      gsap.from(s.querySelector('.step-card'), { opacity: 0, x: fx, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 85%', once: true } });
      ScrollTrigger.create({ trigger: s, start: 'top 62%', onEnter: () => s.classList.add('on'), onLeaveBack: () => s.classList.remove('on') });
    });
    gsap.to('#stepFill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#steps', start: 'top 65%', end: 'bottom 60%', scrub: true } });
  }, { scope: ref });

  return (
    <section id="process" className="block" ref={ref}>
      <div className="wrap">
        <SectionHead title="How we work together" text="A simple four-step flow, so you always know what happens next." />
        <ol className="steps" id="steps">
          <span className="fill" id="stepFill" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <div className="dot">{i + 1}</div>
              <Card className="step-card">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <span className="tg">{s.tag}</span>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
