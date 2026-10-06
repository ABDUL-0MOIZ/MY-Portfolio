import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { reduce } from '../lib/env';
import { scrollState } from '../lib/scroll';
import { linkProps } from '../lib/links';
import { HUDS, SOCIALS, STATS } from '../data/content';
import portrait from '../assets/portrait.jpg';
import Button from './ui/Button';
import Icon from './ui/Icon';
import { SplitChars } from './ui/SplitText';
import Typed from './Typed';

function Stat({ to, label, on }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!on || !ref.current) return;
    if (reduce) { ref.current.textContent = to + '+'; return; }
    const o = { v: 0 };
    const tw = gsap.to(o, { v: to, duration: 1.5, ease: 'power3.out', onUpdate: () => { ref.current.textContent = Math.round(o.v) + '+'; } });
    return () => tw.kill();
  }, [on, to]);
  return <div className="stat"><b ref={ref}>0+</b><span>{label}</span></div>;
}

export default function Hero({ typedOn, countOn }) {
  // kinetic letter hover on the big heading
  const onHover = (e) => {
    if (!scrollState.introDone) return;
    const c = e.target.closest && e.target.closest('.ch');
    if (!c || c._busy) return;
    c._busy = true;
    gsap.to(c, { y: -20, scale: 1.15, duration: 0.18, ease: 'power2.out', yoyo: true, repeat: 1, onComplete: () => { c._busy = false; } });
  };

  return (
    <section id="home" className="hero">
      <div className="wrap hero-grid">
        <div className="hero-visual intro" id="heroVisual">
          {HUDS.map((h) => <span key={h.label} className="hud" style={h.style}>{h.label}</span>)}
          <div className="poke">Move · tap · click to scatter</div>
          <div className="hire-badge">
            <img src={portrait} alt="Abdul Moiz" width="44" height="44" />
            <div><b>Abdul Moiz</b><span>Available for hire</span></div>
          </div>
        </div>

        <div className="hero-copy">
          <div className="hello intro" id="hello">HI I AM</div>
          <div className="name intro">Abdul Moiz</div>
          <h1 className="intro" aria-label="Full-Stack Developer" onPointerOver={onHover}>
            <span className="line"><SplitChars text="Full-Stack" /></span>
            <span className="line acc"><SplitChars text="Developer" /></span>
          </h1>
          <div className="typed intro" aria-hidden="true">
            <span className="p">&gt;</span> <Typed on={typedOn} /><i className="caret" />
          </div>
          <p className="lead intro">
            I build reliable Java and Spring Boot backends, Flutter and Android apps, and fast React frontends that hold up under real traffic.
          </p>
          <div className="socials intro">
            {SOCIALS.map((s) => (
              <a key={s.key} aria-label={s.label} {...linkProps(s.key, s.fallback)}><Icon name={s.icon} /></a>
            ))}
          </div>
          <div className="cta-row intro">
            <Button href="#contact">Hire me</Button>
            <Button variant="ghost" {...linkProps('cv')}>Download CV</Button>
          </div>
          <div className="stats intro">
            {STATS.map((s) => <Stat key={s.label} to={s.to} label={s.label} on={countOn} />)}
          </div>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span>SCROLL</span><i /></div>
    </section>
  );
}
