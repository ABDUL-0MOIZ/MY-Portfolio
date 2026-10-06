import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { scrollState } from '../lib/scroll';
import { isMobile } from '../lib/env';
import { buildShapes } from '../lib/particleShapes';
import { vertexShader, fragmentShader } from '../lib/particleShaders';
import { SECTION_IDS } from '../data/content';

// [x, y, scale, alpha] per section
const DESK = [[1.55, 0, 1, 1], [0, 0, 1.7, 0.3], [0, -0.1, 1.5, 0.32], [0, 0, 1.8, 0.28], [0, 0, 1.5, 0.32], [0, 0, 1.9, 0.24], [0, 0.05, 1.25, 0.55]];
const MOB = [[0, 0.8, 0.55, 1], [0, 0, 1.2, 0.22], [0, 0, 1.1, 0.24], [0, 0, 1.3, 0.2], [0, 0, 1.1, 0.22], [0, 0, 1.4, 0.18], [0, 0, 0.95, 0.4]];
const lerp = (a, b, t) => a + (b - a) * t;
const sm = (t) => t * t * (3 - 2 * t);

export default function ParticleCanvas({ onUnsupported }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch (e) { onUnsupported && onUnsupported(); return; }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr); renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50); camera.position.z = 4.4;

    const N = isMobile() ? 8500 : 16000;
    const shapes = buildShapes(N), S = shapes.length;

    const geo = new THREE.BufferGeometry();
    const pA = new THREE.BufferAttribute(new Float32Array(shapes[0]), 3);
    const pB = new THREE.BufferAttribute(new Float32Array(shapes[1]), 3);
    const rnd = new Float32Array(N), sz = new Float32Array(N);
    for (let i = 0; i < N; i++) { rnd[i] = Math.random(); sz[i] = 0.6 + Math.random() * 1.5; }
    geo.setAttribute('position', pA); geo.setAttribute('aTo', pB);
    geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sz, 1));

    const U = {
      uMix: { value: 0 }, uTime: { value: 0 }, uPixel: { value: dpr }, uSize: { value: isMobile() ? 9 : 11 },
      uBurst: { value: 0 }, uAlpha: { value: 1 }, uMouse: { value: new THREE.Vector2(9, 9) }, uAspect: { value: 1 },
      uA: { value: new THREE.Color('#08b8d8') }, uB: { value: new THREE.Color('#9ff6ff') },
    };
    const mat = new THREE.ShaderMaterial({ uniforms: U, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexShader, fragmentShader });
    const pts = new THREE.Points(geo, mat); pts.frustumCulled = false; scene.add(pts);

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      U.uAspect.value = w / h; U.uSize.value = w < 768 ? 9 : 11;
    };
    resize(); window.addEventListener('resize', resize);

    // section offsets decide which shape we are morphing to
    const secs = SECTION_IDS.map((id) => document.getElementById(id));
    let tops = [];
    const measure = () => { tops = secs.map((s) => s.getBoundingClientRect().top + window.scrollY); };
    measure();
    ScrollTrigger.addEventListener('refresh', measure);
    window.addEventListener('load', measure);
    const timers = [800, 2000, 4000].map((ms) => setTimeout(measure, ms));

    const progress = () => {
      const y = window.scrollY, vh = window.innerHeight;
      let p = 0;
      for (let k = 1; k < S; k++) p += Math.max(0, Math.min(1, (y + vh * 0.92 - tops[k]) / (vh * 0.75)));
      return p;
    };

    let cur = -1, ps = 0, mx = 9, my = 9, tmx = 9, tmy = 9, rotY = 0, vis = true;
    const tilt = { x: 0, y: 0 }, t0 = performance.now();

    const onMove = (e) => { tmx = e.clientX / window.innerWidth * 2 - 1; tmy = -(e.clientY / window.innerHeight * 2 - 1); };
    const onLeave = () => { tmx = 9; tmy = 9; };
    const onUp = (e) => { if (e.pointerType && e.pointerType !== 'mouse') { tmx = 9; tmy = 9; } };
    const onClick = (e) => {
      if (e.target.closest && e.target.closest('a,button,input,textarea,label,.card,.tile,#pal')) return;
      gsap.fromTo(U.uBurst, { value: 1.1 }, { value: 0, duration: 2, ease: 'power3.out' });
    };
    const onVis = () => { vis = !document.hidden; };
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('click', onClick);
    document.addEventListener('visibilitychange', onVis);

    const tick = () => {
      if (!vis || !tops.length) return;
      ps += (progress() - ps) * 0.075;
      let i = Math.min(Math.floor(ps), S - 2), t = Math.min(ps - i, 1);
      if (ps >= S - 1) { i = S - 2; t = 1; }
      if (i !== cur) {
        cur = i;
        pA.array.set(shapes[i]); pA.needsUpdate = true;
        pB.array.set(shapes[i + 1]); pB.needsUpdate = true;
      }
      U.uMix.value = t;
      const T = isMobile() ? MOB : DESK, a = T[i], b = T[i + 1], e = sm(t);
      pts.position.x = lerp(a[0], b[0], e); pts.position.y = lerp(a[1], b[1], e);
      const sc = lerp(a[2], b[2], e); pts.scale.set(sc, sc, sc);
      U.uAlpha.value = lerp(a[3], b[3], e);
      U.uTime.value = (performance.now() - t0) / 1000;
      mx += (tmx - mx) * 0.12; my += (tmy - my) * 0.12; U.uMouse.value.set(mx, my);
      tilt.x += ((tmy > 5 ? 0 : tmy * 0.25) - tilt.x) * 0.05;
      tilt.y += ((tmx > 5 ? 0 : tmx * 0.35) - tilt.y) * 0.05;
      rotY += 0.0016 + scrollState.velocity * 0.0025;
      pts.rotation.y = rotY + tilt.y; pts.rotation.x = tilt.x;
      renderer.render(scene, camera);
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      timers.forEach(clearTimeout);
      ScrollTrigger.removeEventListener('refresh', measure);
      window.removeEventListener('resize', resize);
      window.removeEventListener('load', measure);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onVis);
      geo.dispose(); mat.dispose(); renderer.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas id="gl" ref={ref} aria-hidden="true" />;
}
