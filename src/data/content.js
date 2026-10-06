export const SECTION_IDS = ['home', 'services', 'about', 'skills', 'process', 'portfolio', 'contact'];

export const NAV = [
  ['home', 'Home'], ['services', 'Services'], ['about', 'About'],
  ['skills', 'Skills'], ['portfolio', 'Portfolio'], ['contact', 'Contact'],
];
// [id, label, icon]
export const BOTTOM_NAV = [
  ['home', 'Home', 'home'], ['services', 'Services', 'code'], ['about', 'About', 'user'],
  ['portfolio', 'Portfolio', 'brief'], ['contact', 'Contact', 'chat'],
];
// sections that highlight a different item in the mobile bottom nav
export const NAV_MAP = { skills: 'about', process: 'portfolio' };

export const TYPED_WORDS = ['Spring Boot APIs', 'Flutter & Android apps', 'React frontends', 'ASP.NET services', 'Java microservices'];

export const HUDS = [
  { label: 'Java', style: { top: '12%', left: '6%' } },
  { label: 'Flutter', style: { top: '26%', right: '4%', animationDelay: '-2s' } },
  { label: 'React', style: { top: '58%', left: 0, animationDelay: '-4s' } },
  { label: 'ASP.NET', style: { top: '72%', right: '30%', animationDelay: '-1s' } },
];

export const SOCIALS = [
  { key: 'github', icon: 'github', label: 'GitHub' },
  { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn' },
  { key: 'mail', icon: 'mail', label: 'Email', fallback: '#contact' },
  { key: 'projects', icon: 'code', label: 'Projects', fallback: '#portfolio' },
];

export const STATS = [
  { to: 5, label: 'Experience' },
  { to: 20, label: 'Projects done' },
  { to: 80, label: 'Happy clients' },
];

export const MARQUEE = [
  { dir: -1, alt: false, items: ['Java', 'Spring Boot', 'Flutter', 'Android', 'React', 'C#', 'ASP.NET'] },
  { dir: 1, alt: true, items: ['PostgreSQL', 'Redis', 'Docker', 'REST APIs', 'CI/CD', 'Next.js', 'TypeScript'] },
];

export const SERVICES = [
  { icon: 'code', title: 'Full-Stack Web Apps', text: 'End-to-end web apps with React, Next.js, and Java backend.' },
  { icon: 'server', title: 'Spring Boot REST APIs', text: 'High-throughput microservices and asynchronous backends.' },
  { icon: 'phone', title: 'Flutter & Android Apps', text: 'Fast cross-platform and native mobile apps that feel smooth.' },
  { icon: 'chart', title: 'Analytics Dashboards', text: 'Admin portals with live telemetry, metrics, and role-based workflows.' },
  { icon: 'db', title: 'Database Architecture', text: 'PostgreSQL schema tuning, Redis distributed caching.' },
  { icon: 'box', title: 'Cloud & Docker', text: 'Automated CI/CD workflows and resilient containers.' },
];

export const ABOUT = {
  tag: 'Clean code, resilient architectures, real impact',
  text: 'I am a results-oriented Full-Stack Developer specialized in architecting reliable backend services, mobile apps, and intuitive modern frontends. With a solid foundation in software craftsmanship, I focus on building maintainable solutions that scale smoothly under load.',
  orbit: [
    { label: 'Java', left: '50%', top: '0' },
    { label: 'Flutter', left: '93.3%', top: '75%' },
    { label: 'React', left: '6.7%', top: '75%' },
  ],
  bars: [
    { label: 'Java & Spring Boot', value: 95 },
    { label: 'React & TypeScript', value: 90 },
    { label: 'PostgreSQL & Redis', value: 88 },
  ],
  chips: ['RESTful APIs', 'Docker', 'Git & CI/CD', 'Spring Security', 'Tailwind CSS'],
};

export const SKILL_TABS = [
  ['all', 'All'], ['mobile', 'Mobile'], ['frontend', 'Frontend'], ['backend', 'Backend'], ['data', 'Data & Cloud'],
];
export const SKILL_TILES = [
  { cat: 'mobile', ic: 'Fl', name: 'Flutter', desc: 'Cross-platform apps' },
  { cat: 'mobile', ic: 'An', name: 'Android', desc: 'Native Kotlin / Java apps' },
  { cat: 'frontend', ic: 'Re', name: 'React', desc: 'Component-driven UI' },
  { cat: 'frontend', ic: 'Nx', name: 'Next.js', desc: 'SSR and fast pages' },
  { cat: 'frontend', ic: 'TS', name: 'TypeScript', desc: 'Typed JavaScript' },
  { cat: 'frontend', ic: 'Tw', name: 'Tailwind CSS', desc: 'Responsive styling' },
  { cat: 'backend', ic: 'Jv', name: 'Java', desc: 'Core backend language' },
  { cat: 'backend', ic: 'Sb', name: 'Spring Boot', desc: 'REST APIs, microservices' },
  { cat: 'backend', ic: 'C#', name: 'C#', desc: '.NET applications' },
  { cat: 'backend', ic: 'As', name: 'ASP.NET', desc: 'Web APIs and MVC' },
  { cat: 'data', ic: 'Pg', name: 'PostgreSQL', desc: 'Schema and query tuning' },
  { cat: 'data', ic: 'Rd', name: 'Redis', desc: 'Distributed caching' },
  { cat: 'data', ic: 'Dk', name: 'Docker', desc: 'Containers and CI/CD' },
  { cat: 'data', ic: 'Gt', name: 'Git', desc: 'Version control workflows' },
];

export const STEPS = [
  { title: 'Discover', text: 'We talk through your goals, users, and deadline. You get a clear scope and a rough plan.', tag: 'Call + scope' },
  { title: 'Design', text: 'I map out the architecture, database, and screens before writing production code.', tag: 'Architecture + UI' },
  { title: 'Build', text: 'Weekly working demos so you see real progress, not slides. Clean, tested code.', tag: 'Weekly demos' },
  { title: 'Launch', text: 'Deployed with Docker and CI/CD, monitored, and handed over with docs. Support continues after launch.', tag: 'Deploy + support' },
];

// visual: which live widget to render inside the project card
export const PROJECTS = [
  {
    visual: 'ledger', badge: 'Fintech Engine', title: 'Fabric Flow ERP System',
    text: 'Complete Enterprise Application For Textile Management System using Asp.Net MSSQL with Entity FrameWork and basic authentication and authorization Using Cookise and Sessions Views with Razor Pages ',
    chips: ['Asp.Net', 'Razor Pages', 'MSSQL', 'Bootstrap'],
  },{
    visual: 'store', badge: 'GOlden Gate School', title: 'School Management System',
    text: 'Developed a RESTful School Management System using Java, Spring Boot, MongoDB, and Spring Security. Implemented JWT authentication, role-based authorization, CRUD APIs, validation, Redis, Swagger/OpenAPI, and testing with JUnit/Mockito. ',
    chips: ['Java', 'JWT Oaut2', 'MongoDB', 'Java spring boot'],
  },
  {
    visual: 'telemetry', badge: 'Cloud Analytics', title: 'Point of Sales System',
    text: 'esktop Application with full CRUD operations applying discount to special customer built using OOP principles and UI with Java Swing . ',
    chips: ['Java', 'Java Swing', 'OOP'],
  },
  {
    visual: 'store', badge: 'E-Commerce', title: 'Distributed Commerce Store',
    text: 'High-converting digital storefront with inventory locking, Stripe integration, and optimized sub-second server-side rendering.',
    chips: ['Next.js', 'Stripe', 'Redis', 'PostgreSQL'],
  },
];
