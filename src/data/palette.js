import { CONFIG } from '../config';

// t = title, k = kind label, h = hash target, u = external url
export function buildPaletteItems() {
  const items = [
    { t: 'Home', k: 'Section', h: '#home' },
    { t: 'Services', k: 'Section', h: '#services' },
    { t: 'About me', k: 'Section', h: '#about' },
    { t: 'Tech skills', k: 'Section', h: '#skills' },
    { t: 'How we work together', k: 'Section', h: '#process' },
    { t: 'Portfolio', k: 'Section', h: '#portfolio' },
    { t: 'Plan a project', k: 'Action', h: '#cfg' },
    { t: 'Send a message', k: 'Action', h: '#contact' },
  ];
  if (CONFIG.cv) items.push({ t: 'Download CV', k: 'Action', u: CONFIG.cv });
  if (CONFIG.github) items.push({ t: 'Open GitHub', k: 'Link', u: CONFIG.github });
  if (CONFIG.linkedin) items.push({ t: 'Open LinkedIn', k: 'Link', u: CONFIG.linkedin });
  return items;
}
