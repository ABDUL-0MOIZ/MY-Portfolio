import { useMemo, useState } from 'react';
import { TYPES, FEATURES, TYPE_NAMES, estimate, buildMessage } from '../data/configurator';
import Card from './ui/Card';
import Button from './ui/Button';

// "Plan your project" -> rough timeline + stack. onUse(message, subject) fills the contact form
export default function Configurator({ onUse }) {
  const [type, setType] = useState('web');
  const [feats, setFeats] = useState({});
  const r = useMemo(() => estimate(type, feats), [type, feats]);

  return (
    <Card className="cfg cfg-body" id="cfg">
      <h3>Plan your project</h3>
      <p className="sub">Pick what you need. You'll see a rough timeline right away.</p>

      <div className="grp">
        <span className="lbl">What are you building?</span>
        <div className="opts">
          {TYPES.map(([id, label]) => (
            <button key={id} type="button" className={'opt' + (type === id ? ' on' : '')} onClick={() => setType(id)}>{label}</button>
          ))}
        </div>
      </div>

      <div className="grp">
        <span className="lbl">Add features</span>
        <div className="opts">
          {FEATURES.map(([id, label]) => (
            <button key={id} type="button" className={'opt' + (feats[id] ? ' on' : '')}
              onClick={() => setFeats((f) => ({ ...f, [id]: !f[id] }))}>{label}</button>
          ))}
        </div>
      </div>

      <div className="result">
        <div className="meter"><i style={{ width: r.pct + '%' }} /></div>
        <div className="res-row"><span>Rough timeline</span><b key={r.a + '-' + r.b} className="flash">{r.a}–{r.b} weeks</b></div>
        <div className="res-row"><span>Suggested stack</span><b key={r.stack} className="flash">{r.stack}</b></div>
        <p className="note">A rough guide only. The real plan comes after we talk.</p>
        <Button variant="ghost" type="button" onClick={() => onUse(buildMessage(type, feats, r), 'Project: ' + TYPE_NAMES[type])}>
          Use this in my message
        </Button>
      </div>
    </Card>
  );
}
