import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { scrollState } from '../lib/scroll';
import { reduce } from '../lib/env';

// Smooth scrolling + scroll velocity tracking
export default function useLenis() {
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true });
    scrollState.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    if (!scrollState.introDone) lenis.stop();

    let lastY = window.scrollY;
    const vel = () => {
      const y = window.scrollY;
      scrollState.velocity = scrollState.velocity * 0.88 + (y - lastY) * 0.12;
      lastY = y;
    };
    gsap.ticker.add(vel);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.remove(vel);
      lenis.destroy();
      scrollState.lenis = null;
    };
  }, []);
}
