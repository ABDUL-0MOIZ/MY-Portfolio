import { Fragment, useEffect, useRef } from 'react';
import { gsap, animated } from '../lib/gsap';
import { scrollState } from '../lib/scroll';
import { MARQUEE } from '../data/content';

// Two text rows that scroll sideways; speed reacts to page scroll velocity
export default function Marquee() {
  const ref = useRef(null);
  useEffect(() => {
    if (!animated) return;
    const rows = Array.from(ref.current.querySelectorAll('.mq-row')).map((r) => ({
      tr: r.querySelector('.mq-track'), dir: +r.dataset.dir, x: 0, w: 0,
    }));
    const measure = () => rows.forEach((o) => { o.w = o.tr.scrollWidth / 3; });
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

    const tick = () => rows.forEach((o) => {
      if (!o.w) return;
      o.x += o.dir * (1.1 + Math.min(Math.abs(scrollState.velocity), 60) * 0.9);
      o.x = ((o.x % o.w) + o.w) % o.w - o.w;
      o.tr.style.transform = 'translate3d(' + o.x + 'px,0,0)';
    });
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  return (
    <div className="marquee" aria-hidden="true" ref={ref}>
      {MARQUEE.map((row, i) => (
        <div key={i} className={`mq-row${row.alt ? ' alt' : ''}`} data-dir={row.dir}>
          <div className="mq-track">
            {[0, 1, 2].map((k) => (
              <Fragment key={k}>
                {row.items.map((item) => (
                  <Fragment key={item}><span>{item}</span><span className="sep">✦</span></Fragment>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
