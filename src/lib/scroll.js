import { reduce } from './env';

// Shared scroll state (Lenis instance + scroll velocity) used by many components
export const scrollState = { lenis: null, velocity: 0, introDone: false };

export function navTo(target) {
  const t = typeof target === 'string' ? document.querySelector(target) : target;
  if (!t) return;
  const { lenis } = scrollState;
  if (lenis) {
    lenis.scrollTo(t, { offset: -58, duration: 1.7, easing: (x) => 1 - Math.pow(1 - x, 4) });
  } else {
    t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }
}

export const stopScroll = () => scrollState.lenis && scrollState.lenis.stop();
export const startScroll = () => {
  if (scrollState.introDone && scrollState.lenis) scrollState.lenis.start();
};
