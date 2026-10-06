import { gsap, ScrollTrigger, useGSAP, animated } from '../lib/gsap';
import { scrollState } from '../lib/scroll';

function scramble(el, to, dur = 1) {
  const set = '!<>-_/[]{}=+*^?#01', o = { p: 0 };
  gsap.to(o, {
    p: 1, duration: dur, ease: 'none',
    onUpdate() {
      const n = Math.floor(o.p * to.length);
      let s = '';
      for (let i = 0; i < to.length; i++) s += (i < n || to[i] === ' ') ? to[i] : set[Math.floor(Math.random() * set.length)];
      el.textContent = s;
    },
    onComplete() { el.textContent = to; },
  });
}

// Loader -> hero intro timeline
export default function useIntro(scope, { onTyped, onCount, onLoaderDone }) {
  useGSAP((ctx, contextSafe) => {
    if (!animated) return;
    const root = document.documentElement;
    const q = (s) => gsap.utils.toArray(s, scope.current);
    const chars = q('.hero h1 .ch'), social = q('.socials a'), ctas = q('.cta-row .btn');
    const stats = q('.stat'), huds = q('.hud');

    root.classList.add('lock');

    // initial hidden states
    gsap.set(['.hello', '.name', '.typed', '.lead', '.socials', '.cta-row', '.stats', '#heroVisual'], { opacity: 1 });
    gsap.set('.hero h1', { opacity: 1 });
    gsap.set(chars, { opacity: 0, y: 70, rotateX: -90, transformOrigin: '50% 100%', transformPerspective: 500 });
    gsap.set(['.hello', '.name', '.typed', '.lead'], { opacity: 0, y: 16 });
    gsap.set(social.concat(ctas, stats), { opacity: 0, y: 26, scale: 0.88 });
    gsap.set(huds, { opacity: 0, scale: 0.6 });
    gsap.set('.hire-badge,.poke', { opacity: 0, y: 20 });

    const heroScrub = contextSafe(() => {
      gsap.to('.hero-copy', { y: -60, opacity: 0.1, ease: 'none', scrollTrigger: { trigger: '#home', start: '30% top', end: 'bottom top', scrub: true } });
      gsap.to('.hud', { y: -80, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true } });
    });

    const bar = document.getElementById('loadBar'), txt = document.getElementById('loadTxt'), prog = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        scrollState.introDone = true;
        clearTimeout(window.__fb);
        root.classList.remove('lock');
        if (scrollState.lenis) scrollState.lenis.start();
        heroScrub();
        ScrollTrigger.refresh();
      },
    });

    tl.to(prog, { v: 100, duration: 1.2, ease: 'power2.inOut', onUpdate() { txt.textContent = 'LOADING ' + Math.round(prog.v) + '%'; gsap.set(bar, { scaleX: prog.v / 100 }); } })
      .to('.loader-in', { opacity: 0, y: -16, duration: 0.35, ease: 'power2.in' })
      .to('#loader', { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '>-.05')
      .add(onLoaderDone)
      .to('.hello', { opacity: 1, y: 0, duration: 0.5, onStart() { scramble(document.getElementById('hello'), 'HI I AM', 0.9); } }, '-=.5')
      .to('.name', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=.6')
      .to(chars, { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'back.out(1.7)', stagger: 0.04 }, '-=.5')
      .to(huds, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(2)' }, '-=.9')
      .to('.typed', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', onStart: onTyped }, '-=.5')
      .to('.lead', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=.4')
      .to(social, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(2)' }, '-=.4')
      .to(ctas, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.8)' }, '-=.4')
      .to(stats, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(1.6)', onStart: onCount }, '-=.4')
      .to('.hire-badge,.poke', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=.7');

    return () => root.classList.remove('lock');
  }, { scope });
}
