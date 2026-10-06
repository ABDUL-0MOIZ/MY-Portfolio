import { gsap, useGSAP, animated } from '../lib/gsap';

export default function ProgressBar() {
  useGSAP(() => {
    if (!animated) return;
    gsap.to('#prog', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });
  });
  return <div id="prog" aria-hidden="true" />;
}
