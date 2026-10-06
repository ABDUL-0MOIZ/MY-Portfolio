import { useRef, useState } from 'react';
import { gsap, useGSAP, animated } from '../lib/gsap';
import { navTo } from '../lib/scroll';
import SectionHead from './SectionHead';
import Configurator from './Configurator';
import ContactForm from './ContactForm';

export default function Contact() {
  const ref = useRef(null), msgRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: 'Full-Stack Contract / Developer Position', message: '' });

  // Configurator -> pre-fills the message + subject, then scrolls to the form
  const fillFromPlan = (message, subject) => {
    setForm((f) => ({ ...f, message, subject }));
    navTo('.msg-card');
    setTimeout(() => msgRef.current && msgRef.current.focus({ preventScroll: true }), 900);
  };

  useGSAP(() => {
    if (!animated) return;
    const st = { trigger: '.contact-grid', start: 'top 85%', once: true };
    gsap.from('.cfg', { opacity: 0, x: -50, duration: 1, ease: 'power3.out', scrollTrigger: st });
    gsap.from('.msg-card', { opacity: 0, x: 50, duration: 1, ease: 'power3.out', scrollTrigger: st });
  }, { scope: ref });

  return (
    <section id="contact" className="block" ref={ref}>
      <div className="wrap">
        <SectionHead title="Contact Me" text="Have a project in mind or want to discuss engineering roles? Plan it below, then send it over." />
        <div className="contact-grid">
          <Configurator onUse={fillFromPlan} />
          <ContactForm form={form} setForm={setForm} msgRef={msgRef} />
        </div>
      </div>
    </section>
  );
}
