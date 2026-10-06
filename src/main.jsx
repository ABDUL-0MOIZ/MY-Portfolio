import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/base.css';
import './styles/sections.css';
import './styles/responsive.css';

// StrictMode intentionally off: GSAP intro + WebGL should only mount once in dev.
createRoot(document.getElementById('root')).render(<App />);
