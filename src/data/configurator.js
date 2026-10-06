// [min weeks, max weeks, suggested stack]
export const BASE = {
  web: [3, 5, 'React + Spring Boot + PostgreSQL'],
  mobile: [4, 7, 'Flutter + Spring Boot + PostgreSQL'],
  api: [2, 4, 'Spring Boot + PostgreSQL + Redis'],
  dash: [3, 5, 'React + ASP.NET / Spring Boot'],
};
export const ADD = {
  auth: [0.5, 1], pay: [1, 1.5], rt: [1, 2], admin: [1, 2], cloud: [0.5, 1], stats: [1, 1.5],
};
export const TYPES = [['web', 'Web app'], ['mobile', 'Mobile app'], ['api', 'API & backend'], ['dash', 'Dashboard']];
export const FEATURES = [
  ['auth', 'Login & roles'], ['pay', 'Payments'], ['rt', 'Real-time'],
  ['admin', 'Admin panel'], ['cloud', 'Cloud deploy'], ['stats', 'Analytics'],
];
export const TYPE_NAMES = { web: 'a web app', mobile: 'a mobile app', api: 'an API and backend', dash: 'a dashboard' };
export const FEATURE_NAMES = {
  auth: 'login & roles', pay: 'payments', rt: 'real-time updates',
  admin: 'an admin panel', cloud: 'cloud deployment', stats: 'analytics',
};

export function estimate(type, feats) {
  let [lo, hi, stack] = BASE[type];
  Object.keys(feats).forEach((k) => {
    if (feats[k]) { lo += ADD[k][0]; hi += ADD[k][1]; }
  });
  if (feats.rt) stack += ' + WebSockets';
  if (feats.pay) stack += ' + Stripe';
  if (feats.cloud) stack += ' + Docker CI/CD';
  return { a: Math.ceil(lo), b: Math.ceil(hi), stack, pct: Math.min(100, Math.round(hi / 17 * 100)) };
}

export function buildMessage(type, feats, r) {
  const list = Object.keys(feats).filter((k) => feats[k]).map((k) => FEATURE_NAMES[k]);
  return "Hi Abdul, I'm looking to build " + TYPE_NAMES[type] + (list.length ? ' with ' + list.join(', ') : '') +
    '. Rough timeline I saw: ' + r.a + '–' + r.b + ' weeks, with ' + r.stack + '. Could we talk about it?';
}
