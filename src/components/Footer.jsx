import { gsap, useGSAP, animated } from '../lib/gsap';

export default function Footer() {
  useGSAP(() => {
    if (!animated) return;
    gsap.to('#wordmark', { '--f': '100%', ease: 'none', scrollTrigger: { trigger: 'footer', start: 'top 95%', end: 'bottom bottom', scrub: true } });
  });
  return (
    <footer>
      <div className="wrap">
        <span className="wordmark" id="wordmark" aria-hidden="true">ABDUL MOIZ</span>
        © 2026 Abdul Moiz. Built with Java-grade discipline and a lot of particles.
      </div>
    </footer>
  );
}
