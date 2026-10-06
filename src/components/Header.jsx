import Button from './ui/Button';
import { NAV } from '../data/content';

const isMac = /Mac|iPhone|iPad/.test(navigator.platform || '');

export default function Header({ active, onOpenPalette }) {
  return (
    <header className="top">
      <div className="wrap">
        <a href="#home" className="logo">ABDUL <span>MOIZ</span></a>
        <nav className="menu" aria-label="Primary">
          {NAV.map(([id, label]) => (
            <a key={id} href={'#' + id} className={active === id ? 'active' : ''}>{label}</a>
          ))}
        </nav>
        <div className="head-r">
          <button className="kbd" type="button" aria-label="Open command menu" onClick={onOpenPalette}>
            <span>{isMac ? '⌘ K' : 'Ctrl K'}</span>
          </button>
          <Button href="#contact" pill>Hire me</Button>
        </div>
      </div>
    </header>
  );
}
