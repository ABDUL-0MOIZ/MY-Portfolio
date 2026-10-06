import Icon from './ui/Icon';
import { BOTTOM_NAV, NAV_MAP } from '../data/content';

export default function BottomNav({ active }) {
  return (
    <nav className="bottom" aria-label="Mobile">
      {BOTTOM_NAV.map(([id, label, icon]) => (
        <a key={id} href={'#' + id} className={active === id || NAV_MAP[active] === id ? 'active' : ''}>
          <span><Icon name={icon} /></span>{label}
        </a>
      ))}
    </nav>
  );
}
