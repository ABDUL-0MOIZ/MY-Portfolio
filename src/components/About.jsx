import { useRef } from 'react';
import { gsap, useGSAP, animated } from '../lib/gsap';
import { fine } from '../lib/env';
import { ABOUT } from '../data/content';
import portrait from '../assets/portrait.jpg';
import SectionHead from './SectionHead';
import Divider from './ui/Divider';
import { SplitWords } from './ui/SplitText';
import Skill from './Skill';

export default function About() {
  const ref = useRef(null), por = useRef(null);

  // portrait tilts with the pointer over the whole left column (desktop)
  const tiltProps = fine ? {
    onPointerMove: (e) => {
      const r = e.currentTarget.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      por.current.style.setProperty('--ry', ((px - 0.5) * 24).toFixed(2) + 'deg');
      por.current.style.setProperty('--rx', ((0.5 - py) * 24).toFixed(2) + 'deg');
    },
    onPointerLeave: () => { por.current.style.setProperty('--rx', '0deg'); por.current.style.setProperty('--ry', '0deg'); },
  } : {};

  useGSAP(() => {
    if (!animated) return;
    const once = (trigger, start = 'top 85%') => ({ trigger, start, once: true });
    gsap.from('.portrait .photo', { scale: 0.2, opacity: 0, rotate: -90, duration: 1.4, ease: 'expo.out', scrollTrigger: once('.portrait') });
    gsap.from('.portrait .ring', { opacity: 0, duration: 1.6, ease: 'power2.out', stagger: 0.2, scrollTrigger: once('.portrait') });
    gsap.from('.about .tag', { opacity: 0, y: 14, duration: 0.7, scrollTrigger: once('.about') });
    gsap.fromTo('#aboutText .wd', { opacity: 0.14 }, {
      opacity: 1, ease: 'none', stagger: 0.1,
      scrollTrigger: { trigger: '#aboutText', start: 'top 82%', end: 'bottom 50%', scrub: true },
    });
    gsap.from('.skill', { opacity: 0, x: -30, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: once('.skill', 'top 92%') });
    gsap.from('.chip', { opacity: 0, scale: 0.6, duration: 0.5, stagger: 0.07, ease: 'back.out(2.2)', scrollTrigger: once('.chips', 'top 95%') });
  }, { scope: ref });

  return (
    <section id="about" className="block" ref={ref}>
      <div className="wrap">
        <SectionHead title="About Me" />
        <div className="about">
          <div className="about-side" {...tiltProps}>
            <div className="tag">{ABOUT.tag}</div>
            <div className="portrait" id="portrait" ref={por}>
              <div className="ring r2" />
              <div className="ring">
                {ABOUT.orbit.map((o) => (
                  <span key={o.label} className="cho" style={{ left: o.left, top: o.top }}><span>{o.label}</span></span>
                ))}
              </div>
              <div className="photo"><img id="portraitImg" src={portrait} alt="Abdul Moiz" /></div>
            </div>
          </div>
          <div>
            <p className="about-text" id="aboutText" aria-label={ABOUT.text}><SplitWords text={ABOUT.text} /></p>
            {ABOUT.bars.map((b) => <Skill key={b.label} {...b} />)}
            <div className="chips">
              {ABOUT.chips.map((c) => <span key={c} className="chip">{c}</span>)}
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </section>
  );
}
