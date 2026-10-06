import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Card from './ui/Card';
import Button from './ui/Button';

const EJS = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  owner: import.meta.env.VITE_EMAILJS_TEMPLATE_OWNER,
  reply: import.meta.env.VITE_EMAILJS_TEMPLATE_REPLY,
};

export default function ContactForm({ form, setForm, msgRef }) {
  const [bad, setBad] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ text: '', err: false });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const cls = (k) => 'field' + (bad[k] ? ' bad' : '');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    // spam bot trap: asli user is field ko kabhi nahi bharta
    if (e.target.elements.website && e.target.elements.website.value) return;

    const errors = {
      name: !form.name.trim(),
      email: !/^\S+@\S+\.\S+$/.test(form.email),
      message: form.message.trim().length < 10,
    };
    setBad(errors);
    if (Object.values(errors).some(Boolean)) {
      setStatus({ text: 'Add your name, a valid email, and a message of at least 10 characters.', err: true });
      return;
    }
    if (!EJS.service || !EJS.key || !EJS.owner || !EJS.reply) {
      setStatus({ text: 'Email service is not configured (.env missing).', err: true });
      return;
    }

    const params = {
      from_name: form.name,
      from_email: form.email,
      reply_to: form.email,
      to_name: form.name,
      to_email: form.email,
      subject: form.subject,
      message: form.message,
    };

    setSending(true);
    setStatus({ text: 'Sending…', err: false });
    try {
      // 1) aapko email
      await emailjs.send(EJS.service, EJS.owner, params, { publicKey: EJS.key });
      // 2) visitor ko greeting (fail ho jaye to bhi message mil chuka hai)
      await emailjs.send(EJS.service, EJS.reply, params, { publicKey: EJS.key }).catch(() => { });

      setStatus({ text: 'Message sent! Check your inbox for a confirmation email.', err: false });
      setForm((f) => ({ ...f, name: '', email: '', message: '' }));
      setBad({});
    } catch (err) {
      setStatus({ text: 'Could not send. Please try again or email me directly.', err: true });
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="msg-card">
      <h3>Send a message</h3>
      <p className="sub mono" style={{ margin: '0 0 18px', fontSize: '11.5px', color: 'var(--muted)' }}>I reply with a clear next step.</p>
      <form id="form" noValidate onSubmit={onSubmit}>
        <div className="row-2">
          <div>
            <label htmlFor="f-name">Your name</label>
            <input className={cls('name')} id="f-name" name="name" placeholder="Enter your name" autoComplete="name" value={form.name} onChange={set('name')} />
          </div>
          <div>
            <label htmlFor="f-email">Your email</label>
            <input className={cls('email')} id="f-email" name="email" type="email" placeholder="name@example.com" autoComplete="email" value={form.email} onChange={set('email')} />
          </div>
        </div>
        <div>
          <label htmlFor="f-sub">Subject / project role</label>
          <input className="field" id="f-sub" name="subject" value={form.subject} onChange={set('subject')} />
        </div>
        <div>
          <label htmlFor="f-msg">Message</label>
          <textarea ref={msgRef} className={cls('message')} id="f-msg" name="message" placeholder="Tell me about your project goals or team needs..." value={form.message} onChange={set('message')} />
        </div>

        {/* honeypot (hidden) */}
        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} />

        <Button full type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send message'}</Button>
        <div className={'form-status' + (status.err ? ' err' : '')} role="status" aria-live="polite">{status.text}</div>
      </form>
    </Card>
  );
}