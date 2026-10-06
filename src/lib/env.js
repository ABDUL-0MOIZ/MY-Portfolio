export const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
export const isMobile = () => window.innerWidth < 768;
