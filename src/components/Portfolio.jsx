import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, animated } from '../lib/gsap';
import { PROJECTS } from '../data/content';
import SectionHead from './SectionHead';
import Card from './ui/Card';
import Button from './ui/Button';
import LedgerWidget from './widgets/LedgerWidget';
import TelemetryWidget from './widgets/TelemetryWidget';
import StoreWidget from './widgets/StoreWidget';

const VISUALS = { ledger: LedgerWidget, telemetry: TelemetryWidget, store: StoreWidget };

function Project({ visual, badge, title, text, chips }) {
  const Visual = VISUALS[visual];
  return (
    <Card as="article" tilt className="proj">
      <div className="proj-vis">
        <span className="badge">{badge}</span>
        <Visual />
      </div>
      <div className="proj-body">
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="pchips">{chips.map((c) => <span key={c}>{c}</span>)}</div>
        <div className="proj-links"><a href="#">View Details →</a><a href="#">Live Demo →</a></div>
      </div>
    </Card>
  );
}

export default function Portfolio() {
  const ref = useRef(null);

  // desktop: pinned horizontal scroll. mobile: simple stacked reveal
  useGSAP(() => {
    if (!animated) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      const track = ref.current.querySelector('#hsTrack');
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.hs-pin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1 } });
      gsap.from('.proj', { opacity: 0, y: 60, scale: 0.94, duration: 1, stagger: 0.14, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.hs-pin', start: 'top 70%', once: true } });
    });
    mm.add('(max-width: 899px)', () => {
      ScrollTrigger.batch(gsap.utils.toArray('.proj', ref.current), {
        start: 'top 90%', once: true,
        onEnter: (els) => gsap.from(els, { opacity: 0, y: 60, scale: 0.95, duration: 0.9, stagger: 0.14, ease: 'power3.out', clearProps: 'transform,opacity' }),
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section id="portfolio" className="block hs" ref={ref}>
      <div className="hs-pin">
        <div className="hs-track" id="hsTrack">
          <div className="hs-intro">
            <SectionHead left title="Portfolio" text="Featured full-stack applications crafted with clean code architecture and responsive UI design." />
            <div className="hint">Keep scrolling →</div>
          </div>
          {PROJECTS.map((p) => <Project key={p.title} {...p} />)}
          <div className="hs-end">
            <div><p>Have something in mind?</p><Button href="#contact">Let's talk</Button></div>
          </div>
        </div>
      </div>
    </section>
  );
}
