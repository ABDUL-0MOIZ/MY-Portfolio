import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { reduce } from './env';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// false when user prefers reduced motion -> components skip animations
export const animated = !reduce;

export { gsap, ScrollTrigger, useGSAP };
