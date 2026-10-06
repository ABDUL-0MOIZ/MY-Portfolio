import { CONFIG } from '../config';

// Returns href/target/rel for social + CV links based on CONFIG
export function linkProps(key, fallback = '#') {
  const v = key === 'mail' ? (CONFIG.email ? 'mailto:' + CONFIG.email : '') : CONFIG[key];
  if (!v) return { href: fallback };

  if (key === 'cv') return { href: v, download: 'MYResume.pdf' };
  if (key === 'mail') return { href: v };
  return { href: v, target: '_blank', rel: 'noopener' };
}