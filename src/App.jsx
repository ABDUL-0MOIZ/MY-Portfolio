import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { reduce } from './lib/env';
import { SECTION_IDS } from './data/content';
import useLenis from './hooks/useLenis';
import useAnchorScroll from './hooks/useAnchorScroll';
import useActiveSection from './hooks/useActiveSection';
import useIntro from './hooks/useIntro';

import Loader from './components/Loader';
import ProgressBar from './components/ProgressBar';
import ParticleCanvas from './components/ParticleCanvas';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import About from './components/About';
import Skills from './components/Skills';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import CommandPalette from './components/CommandPalette';

export default function App() {
  const root = useRef(null);
  const [loaderGone, setLoaderGone] = useState(reduce);
  const [typedOn, setTypedOn] = useState(reduce);
  const [countOn, setCountOn] = useState(reduce);
  const [palOpen, setPalOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useLenis();
  useAnchorScroll();
  useIntro(root, {
    onTyped: () => setTypedOn(true),
    onCount: () => setCountOn(true),
    onLoaderDone: () => setLoaderGone(true),
  });

  useEffect(() => {
    const html = document.documentElement;
    if (reduce) html.classList.add('fallback', 'static');
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <div ref={root}>
      {!loaderGone && <Loader />}
      <ProgressBar />
      <ParticleCanvas onUnsupported={() => document.documentElement.classList.add('static')} />
      <Cursor />
      <Header active={active} onOpenPalette={() => setPalOpen(true)} />
      <main>
        <Hero typedOn={typedOn} countOn={countOn} />
        <Marquee />
        <Services />
        <About />
        <Skills />
        <Process />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <BottomNav active={active} />
      <CommandPalette open={palOpen} setOpen={setPalOpen} />
    </div>
  );
}
