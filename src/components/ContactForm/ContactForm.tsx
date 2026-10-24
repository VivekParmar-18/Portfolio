import { useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { FiSend } from 'react-icons/fi';
import { personal } from '../../data/personalData';

interface FormData { name: string; email: string; subject: string; message: string; }
interface FormErrors { name?: string; email?: string; subject?: string; message?: string; }
type FormStatus = { type: 'idle' | 'loading' | 'success' | 'error'; message?: string };

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${personal.email}`;

const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={id} className="block text-xs font-medium text-ink-2 mb-1.5 font-body">
      {label} <span className="text-console-accent" aria-hidden="true">*</span>
    </label>
    {children}
    {error && (
      <p role="alert" className="mt-1 text-xs text-console-bad flex items-center gap-1 font-body">
        <ExclamationCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{error}</span>
      </p>
    )}
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const validate = (name: string, value: string): string | undefined => {
    if (name === 'name') { if (!value.trim()) return 'Name is required'; if (value.trim().length < 2) return 'At least 2 characters'; }
    if (name === 'email') { if (!value.trim()) return 'Email is required'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email'; }
    if (name === 'subject') { if (!value.trim()) return 'Subject is required'; if (value.trim().length < 5) return 'At least 5 characters'; }
    if (name === 'message') { if (!value.trim()) return 'Message is required'; if (value.trim().length < 10) return 'At least 10 characters'; }
    return undefined;
  };

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name] && !validate(name, value)) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setErrors(prev => ({ ...prev, [name]: validate(name, formData[name]) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    (Object.entries(formData) as [keyof FormData, string][]).forEach(([k, v]) => {
      const err = validate(k, v);
      if (err) newErrors[k] = err;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const first = (['name', 'email', 'subject', 'message'] as const).find(k => newErrors[k]);
      if (first) document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus({ type: 'loading' });
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, _subject: formData.subject, _replyto: formData.email, _captcha: 'false' }),
      });
      if (res.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully. I will get back to you within 24 hours.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Server error');
      }
    } catch {
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\n\n${formData.message}`)}`;
      setStatus({ type: 'error', message: 'Direct dispatch failed: opening your default email client.' });
    }
  };

  const inputClass = "w-full px-3.5 py-2.5 rounded bg-paper-3 border border-rule text-xs text-ink placeholder:text-ink-muted/50 font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-console-accent transition-colors";

  return (
    <div className="console-panel p-6 sm:p-8 border border-rule">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field id="contact-name" label="Your Name" error={errors.name}>
            <input
              id="contact-name"
              className={inputClass}
              placeholder="Vivek Parmar"
              value={formData.name}
              autoComplete="name"
              aria-invalid={!!errors.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
            />
          </Field>
          <Field id="contact-email" label="Email Address" error={errors.email}>
            <input
              id="contact-email"
              className={inputClass}
              placeholder="you@example.com"
              type="email"
              value={formData.email}
              autoComplete="email"
              inputMode="email"
              aria-invalid={!!errors.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
            />
          </Field>
        </div>

        <Field id="contact-subject" label="Subject" error={errors.subject}>
          <input
            id="contact-subject"
            className={inputClass}
            placeholder="Technical role, backend engineering, interview"
            value={formData.subject}
            aria-invalid={!!errors.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            onBlur={() => handleBlur('subject')}
          />
        </Field>

        <Field id="contact-message" label="Message" error={errors.message}>
          <textarea
            id="contact-message"
            className={`${inputClass} resize-y min-h-[120px]`}
            placeholder="Share details about your team or backend role..."
            value={formData.message}
            aria-invalid={!!errors.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            rows={4}
          />
        </Field>

        {status.message && (
          <div
            role="alert"
            className={`flex items-start gap-2 p-3 rounded text-xs border font-body ${
              status.type === 'success'
                ? 'bg-paper-3 text-console-ok border-console-ok/30'
                : 'bg-paper-3 text-console-bad border-console-bad/30'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircleIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
            ) : (
              <ExclamationCircleIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="btn btn--primary w-full py-3 text-xs font-medium whitespace-nowrap"
        >
          {status.type === 'loading' ? (
            <span>Sending message…</span>
          ) : (
            <>
              <FiSend size={14} aria-hidden="true" />
              <span>Send message</span>
            </>
          )}
        </button>

        <p className="text-center text-xs text-ink-muted font-body">
          Direct email: <a href={`mailto:${personal.email}`} className="text-console-cool hover:underline">{personal.email}</a>
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
