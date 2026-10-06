import { useRef, useState } from 'react';
import { useWhileVisible } from '../../hooks/useInView';
import { reduce } from '../../lib/env';

const INITIAL = [{ n: 'Sneakers', s: 84 }, { n: 'Headphones', s: 61 }, { n: 'Backpack', s: 92 }, { n: 'Watch', s: 47 }];

export default function StoreWidget() {
  const [st, setSt] = useState({ orders: 128, prods: INITIAL });
  const ref = useRef(null);

  // a new order every 1.3s lowers a random product's stock
  useWhileVisible(ref, () => {
    if (reduce) return;
    const id = setInterval(() => setSt((s) => {
      const prods = s.prods.map((p) => ({ ...p }));
      const p = prods[Math.floor(Math.random() * prods.length)];
      p.s -= 1 + Math.floor(Math.random() * 4);
      if (p.s < 8) p.s = 100;
      return { orders: s.orders + 1, prods };
    }), 1300);
    return () => clearInterval(id);
  });

  return (
    <div className="vis-in">
      <div className="store-top">
        <span>ORDERS <b>{st.orders}</b></span>
        <span id="stLock">LOCK ✓{st.orders > 128 ? ' #' + st.orders : ''}</span>
      </div>
      <div className="store" ref={ref}>
        {st.prods.map((p) => (
          <div className="srow" key={p.n}>
            <span>{p.n}</span>
            <div className="b"><i className={p.s < 22 ? 'low' : ''} style={{ width: p.s + '%' }} /></div>
            <span>{p.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
