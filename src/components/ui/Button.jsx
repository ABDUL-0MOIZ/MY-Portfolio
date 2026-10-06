import { gsap } from '../../lib/gsap';
import { fine } from '../../lib/env';

// Magnetic button. Renders <a> when href is given, otherwise <button>
export default function Button({ href, variant = 'primary', pill, full, className = '', children, ...rest }) {
  const cls = `btn btn-${variant}${pill ? ' btn-pill' : ''}${full ? ' btn-full' : ''} ${className}`.trim();
  const magnet = {
    onPointerMove: (e) => {
      if (!fine) return;
      const b = e.currentTarget, r = b.getBoundingClientRect();
      gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.28, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.3, ease: 'power2.out' });
    },
    onPointerLeave: (e) => {
      if (!fine) return;
      gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,.4)' });
    },
  };
  return href !== undefined
    ? <a href={href} className={cls} {...magnet} {...rest}>{children}</a>
    : <button className={cls} {...magnet} {...rest}>{children}</button>;
}
