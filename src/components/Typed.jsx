import { useEffect, useState } from 'react';
import { TYPED_WORDS } from '../data/content';
import { reduce } from '../lib/env';

// Typewriter effect that cycles through TYPED_WORDS once `on` is true
export default function Typed({ on }) {
  const [text, setText] = useState(reduce ? TYPED_WORDS[0] : '');
  useEffect(() => {
    if (!on || reduce) return;
    let wi = 0, ci = 0, del = false, id;
    const tick = () => {
      const w = TYPED_WORDS[wi];
      setText(w.slice(0, ci));
      if (!del && ci < w.length) { ci++; id = setTimeout(tick, 70); }
      else if (!del) { del = true; id = setTimeout(tick, 1500); }
      else if (ci > 0) { ci--; id = setTimeout(tick, 35); }
      else { del = false; wi = (wi + 1) % TYPED_WORDS.length; id = setTimeout(tick, 300); }
    };
    tick();
    return () => clearTimeout(id);
  }, [on]);
  return <span id="typed">{text}</span>;
}
