import { useRef, useState } from 'react';
import { useWhileVisible } from '../../hooks/useInView';
import { reduce } from '../../lib/env';

const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const makeRow = () => ({
  id: Math.random(),
  txn: 1000 + Math.floor(Math.random() * 9000),
  amt: Math.round((Math.random() * 900 + 20) * 100) / 100,
  out: Math.random() < 0.35,
});
const signed = (r) => (r.out ? -r.amt : r.amt);

export default function LedgerWidget() {
  const [state, setState] = useState(() => {
    const rows = Array.from({ length: 4 }, makeRow);
    return { rows, balance: 1284930.22 + rows.reduce((s, r) => s + signed(r), 0) };
  });
  const ref = useRef(null);

  // new transaction every 1.1s, only while the card is on screen
  useWhileVisible(ref, () => {
    if (reduce) return;
    const id = setInterval(() => setState((s) => {
      const r = makeRow();
      return { balance: s.balance + signed(r), rows: [...s.rows, r].slice(-4) };
    }), 1100);
    return () => clearInterval(id);
  });

  return (
    <div className="vis-in">
      <div className="bal"><small>LEDGER BALANCE · LIVE</small><b>${fmt(state.balance)}</b></div>
      <div className="ledger" ref={ref}>
        {state.rows.map((r) => (
          <div className="lrow" key={r.id}>
            <span>TXN-{r.txn}</span>
            <span className={r.out ? 'neg' : 'pos'}>{r.out ? '-' : '+'}${fmt(r.amt)}</span>
            <span className="ok">✓ settled</span>
          </div>
        ))}
      </div>
    </div>
  );
}
