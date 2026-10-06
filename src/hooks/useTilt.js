import { useRef } from 'react';
import { fine } from '../lib/env';

// 3D tilt on pointer move (desktop only). Sets --rx / --ry used by .tilt in CSS
export default function useTilt(enabled = true, deg = 12) {
  const ref = useRef(null);
  const on = enabled && fine;
  const onPointerMove = (e) => {
    if (!on) return;
    const el = ref.current, r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', ((px - 0.5) * deg).toFixed(2) + 'deg');
    el.style.setProperty('--rx', ((0.5 - py) * deg).toFixed(2) + 'deg');
  };
  const onPointerLeave = () => {
    if (!on) return;
    ref.current.style.setProperty('--rx', '0deg');
    ref.current.style.setProperty('--ry', '0deg');
  };
  return { ref, on, onPointerMove, onPointerLeave };
}
