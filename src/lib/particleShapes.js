const PI = Math.PI;
const TAU = PI * 2;
const R = Math.random;

function rot(a, rx, rz) {
  const cx = Math.cos(rx), sx = Math.sin(rx), cz = Math.cos(rz), sz = Math.sin(rz);
  for (let i = 0; i < a.length; i += 3) {
    let x = a[i], y = a[i + 1], z = a[i + 2];
    const y1 = y * cx - z * sx, z1 = y * sx + z * cx; y = y1; z = z1;
    const x2 = x * cz - y * sz, y2 = x * sz + y * cz;
    a[i] = x2; a[i + 1] = y2; a[i + 2] = z;
  }
  return a;
}
function sphere(a, from, to, r) {
  const n = to - from, g = PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - 2 * (i + 0.5) / n, rr = Math.sqrt(1 - y * y), t = g * i, j = (from + i) * 3;
    a[j] = Math.cos(t) * rr * r; a[j + 1] = y * r; a[j + 2] = Math.sin(t) * rr * r;
  }
}
function ringPts(a, from, to, r0, r1, thick) {
  for (let i = from; i < to; i++) {
    const rr = r0 + R() * (r1 - r0), t = R() * TAU, j = i * 3;
    a[j] = Math.cos(t) * rr; a[j + 1] = (R() - 0.5) * thick; a[j + 2] = Math.sin(t) * rr;
  }
}

// 7 target shapes the particles morph between while scrolling
export function buildShapes(N) {
  const shapes = [];

  // 0 globe + orbit ring
  {
    const a = new Float32Array(N * 3), s = Math.floor(N * 0.82);
    sphere(a, 0, s, 1.25);
    const tmp = new Float32Array(N * 3);
    ringPts(tmp, s, N, 1.65, 1.72, 0.02); rot(tmp, 0.5, 0.35);
    for (let i = s * 3; i < N * 3; i++) a[i] = tmp[i];
    rot(a.subarray(0, s * 3), 0.2, 0);
    shapes.push(a);
  }
  // 1 torus
  {
    const a = new Float32Array(N * 3), Rr = 1.1, r = 0.4;
    for (let i = 0; i < N; i++) {
      const u = R() * TAU, v = R() * TAU, j = i * 3;
      a[j] = (Rr + r * Math.cos(v)) * Math.cos(u); a[j + 1] = r * Math.sin(v); a[j + 2] = (Rr + r * Math.cos(v)) * Math.sin(u);
    }
    rot(a, 0.9, 0.3); shapes.push(a);
  }
  // 2 DNA helix
  {
    const a = new Float32Array(N * 3), st = Math.floor(N * 0.72);
    for (let i = 0; i < N; i++) {
      const t = R(), y = (t - 0.5) * 4.2, ang = t * PI * 6, j = i * 3;
      if (i < st) {
        const s = i % 2 ? PI : 0;
        a[j] = Math.cos(ang + s) * 0.75 + (R() - 0.5) * 0.05; a[j + 1] = y; a[j + 2] = Math.sin(ang + s) * 0.75 + (R() - 0.5) * 0.05;
      } else {
        const k = R() * 2 - 1;
        a[j] = Math.cos(ang) * 0.75 * k; a[j + 1] = y; a[j + 2] = Math.sin(ang) * 0.75 * k;
      }
    }
    rot(a, 0, 0.25); shapes.push(a);
  }
  // 3 galaxy
  {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const rr = Math.pow(R(), 0.62) * 2.2, arm = i % 3, ang = rr * 2.1 + arm * TAU / 3, sp = (R() - 0.5) * 0.5 * rr, j = i * 3;
      a[j] = Math.cos(ang) * rr + sp; a[j + 1] = (R() - 0.5) * 0.2 * (1.3 - rr / 2.2); a[j + 2] = Math.sin(ang) * rr + sp;
    }
    rot(a, 0.95, 0.2); shapes.push(a);
  }
  // 4 cube (edges + faces)
  {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const j = i * 3, s = 1.05;
      if (R() < 0.55) {
        const ax = Math.floor(R() * 3), o = [(R() < 0.5 ? -1 : 1) * s, (R() < 0.5 ? -1 : 1) * s], v = (R() * 2 - 1) * s;
        a[j + ax] = v; a[j + (ax + 1) % 3] = o[0]; a[j + (ax + 2) % 3] = o[1];
      } else {
        const f = Math.floor(R() * 3);
        a[j + f] = (R() < 0.5 ? -1 : 1) * s; a[j + (f + 1) % 3] = (R() * 2 - 1) * s; a[j + (f + 2) % 3] = (R() * 2 - 1) * s;
      }
    }
    rot(a, 0.6, 0.6); shapes.push(a);
  }
  // 5 wave plane
  {
    const a = new Float32Array(N * 3), cols = Math.ceil(Math.sqrt(N * 1.6)), rows = Math.ceil(N / cols);
    for (let i = 0; i < N; i++) {
      const gx = (i % cols) / cols - 0.5, gz = Math.floor(i / cols) / rows - 0.5, j = i * 3;
      a[j] = gx * 6; a[j + 1] = Math.sin(gx * 10) * 0.3 + Math.cos(gz * 9) * 0.3; a[j + 2] = gz * 5;
    }
    rot(a, -0.45, 0); shapes.push(a);
  }
  // 6 planet + wide ring
  {
    const a = new Float32Array(N * 3), s = Math.floor(N * 0.5);
    sphere(a, 0, s, 0.85);
    const tmp = new Float32Array(N * 3);
    ringPts(tmp, s, N, 1.2, 2.0, 0.05); rot(tmp, 0.35, 0.3);
    for (let i = s * 3; i < N * 3; i++) a[i] = tmp[i];
    shapes.push(a);
  }
  return shapes;
}
