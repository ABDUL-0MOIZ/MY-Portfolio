import { useEffect, useRef } from 'react';
import { useWhileVisible } from '../../hooks/useInView';
import { reduce } from '../../lib/env';

export default function TelemetryWidget() {
  const canvasRef = useRef(null), healthRef = useRef(null), p50Ref = useRef(null), p99Ref = useRef(null);

  // live latency chart (canvas), drawn only while visible
  useEffect(() => {
    const c = canvasRef.current, ctx = c.getContext('2d'), dpr = Math.min(window.devicePixelRatio || 1, 2);
    const p50 = Array(90).fill(18), p99 = Array(90).fill(44);
    let W = 0, H = 0, raf = 0, last = 0, tick = 0;

    const size = () => {
      const r = c.getBoundingClientRect();
      W = c.width = Math.max(10, Math.round(r.width * dpr));
      H = c.height = Math.max(10, Math.round(r.height * dpr));
    };
    size();
    window.addEventListener('resize', size);

    const next = () => {
      tick++;
      const a = 18 + Math.sin(tick * 0.12) * 4 + Math.random() * 3;
      const b = 44 + Math.sin(tick * 0.07) * 9 + (Math.random() < 0.06 ? Math.random() * 34 : Math.random() * 5);
      p50.push(a); p99.push(b); p50.shift(); p99.shift();
      p50Ref.current.textContent = Math.round(a) + 'ms';
      p99Ref.current.textContent = Math.round(b) + 'ms';
    };
    const line = (arr, col, fill) => {
      ctx.beginPath();
      for (let i = 0; i < arr.length; i++) {
        const x = i / (arr.length - 1) * W, y = H - (arr[i] / 90) * H * 0.95;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = col; ctx.lineWidth = 1.6 * dpr; ctx.stroke();
      if (fill) {
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath();
        const g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, 'rgba(8,184,216,.28)'); g.addColorStop(1, 'rgba(8,184,216,0)');
        ctx.fillStyle = g; ctx.fill();
      }
    };
    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 55) return;
      last = t; next();
      ctx.clearRect(0, 0, W, H); line(p99, 'rgba(255,194,71,.8)', false); line(p50, '#08b8d8', true);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!raf && !reduce) raf = requestAnimationFrame(draw);
        if (reduce && !tick) { next(); line(p50, '#08b8d8', true); }
      } else { cancelAnimationFrame(raf); raf = 0; }
    }, { threshold: 0.15 });
    io.observe(c);

    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('resize', size); };
  }, []);

  // random "warning" blink on the 12 health bars
  useWhileVisible(healthRef, () => {
    if (reduce) return;
    const bars = healthRef.current.children;
    const id = setInterval(() => {
      const e = bars[Math.floor(Math.random() * bars.length)];
      e.classList.add('warn');
      setTimeout(() => e.classList.remove('warn'), 900);
    }, 1400);
    return () => clearInterval(id);
  });

  return (
    <>
      <div className="vis-in">
        <div className="tele-top"><span>p50 <b ref={p50Ref}>18ms</b></span><span>p99 <b ref={p99Ref}>44ms</b></span></div>
        <div className="health" ref={healthRef}>{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
      </div>
      <canvas id="tele" ref={canvasRef} />
    </>
  );
}
