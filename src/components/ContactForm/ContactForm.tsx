import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { FiSend } from 'react-icons/fi';
import { personal } from '../../data/personalData';

interface FormData { name: string; email: string; subject: string; message: string; }
interface FormErrors { name?: string; email?: string; subject?: string; message?: string; }
type FormStatus = { type: 'idle' | 'loading' | 'success' | 'error'; message?: string };

// ✅ Replace YOUR_FORM_ID below after signing up at https://formspree.io
// The free plan allows 50 submissions/month — perfect for a portfolio.
const FORMSPREE_ENDPOINT = `https://formspree.io/f/YOUR_FORM_ID`;

const inputBase = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.10)',
  borderRadius: '12px',
  color: '#e2e8f0',
  padding: '14px 16px',
  fontSize: '0.95rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: "'Space Grotesk', sans-serif",
} as React.CSSProperties;

const inputFocus = {
  borderColor: 'rgba(59,130,246,0.5)',
  boxShadow: '0 0 0 3px rgba(59,130,246,0.10)',
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
          <ExclamationCircleIcon className="w-3.5 h-3.5" />{error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [focused, setFocused] = useState<string | null>(null);

  const validate = (name: string, value: string): string | undefined => {
    if (name === 'name') { if (!value.trim()) return 'Name is required'; if (value.trim().length < 2) return 'At least 2 characters'; }
    if (name === 'email') { if (!value.trim()) return 'Email is required'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email'; }
    if (name === 'subject') { if (!value.trim()) return 'Subject is required'; if (value.trim().length < 5) return 'At least 5 characters'; }
    if (name === 'message') { if (!value.trim()) return 'Message is required'; if (value.trim().length < 10) return 'At least 10 characters'; }
    return undefined;
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    (Object.entries(formData) as [keyof FormData, string][]).forEach(([k, v]) => {
      const err = validate(k, v);
      if (err) newErrors[k] = err;
    });
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setStatus({ type: 'loading' });
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, _replyto: formData.email }),
      });
      if (res.ok) {
        setStatus({ type: 'success', message: "Message sent! I'll get back to you within 24 hours." });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Server error');
      }
    } catch {
      // Fallback: open mailto link so the message is never lost
      window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\n\n${formData.message}`)}`;
      setStatus({ type: 'error', message: 'Direct send failed — opening your email client as a fallback.' });
    }
  };

  const getInputStyle = (name: string) => ({ ...inputBase, ...(focused === name ? inputFocus : {}) });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-8 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Your Name" error={errors.name}>
            <input style={getInputStyle('name')} placeholder="Vivek Parmar" value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
          </Field>
          <Field label="Email Address" error={errors.email}>
            <input style={getInputStyle('email')} placeholder="you@example.com" type="email" value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
          </Field>
        </div>

        <Field label="Subject" error={errors.subject}>
          <input style={getInputStyle('subject')} placeholder="Project collaboration, job opportunity…" value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)} />
        </Field>

        <Field label="Message" error={errors.message}>
          <textarea style={{ ...getInputStyle('message'), resize: 'vertical', minHeight: '140px' } as React.CSSProperties}
            placeholder="Tell me about your project or opportunity…" value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} rows={5} />
        </Field>

        <AnimatePresence>
          {status.message && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
              className="flex items-start gap-2.5 p-4 rounded-xl text-sm"
              style={{ background: status.type === 'success' ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)', border: `1px solid ${status.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`, color: status.type === 'success' ? '#34d399' : '#f87171' }}>
              {status.type === 'success' ? <CheckCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <ExclamationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />}
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button type="submit" disabled={status.type === 'loading'}
          className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-semibold text-white transition-all"
          style={{ background: status.type === 'loading' ? 'rgba(59,130,246,0.5)' : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', boxShadow: '0 0 30px rgba(59,130,246,0.20)' }}
          whileHover={status.type !== 'loading' ? { scale: 1.02, boxShadow: '0 0 40px rgba(59,130,246,0.35)' } : {}}
          whileTap={{ scale: 0.98 }}>
          {status.type === 'loading' ? (
            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
          ) : (
            <><FiSend size={17} />Send Message</>
          )}
        </motion.button>

        <p className="text-center text-xs text-slate-600">
          Prefer email? <a href={`mailto:${personal.email}`} className="text-blue-400 hover:underline">{personal.email}</a>
        </p>
      </form>
    </motion.div>
  );
};

export default ContactForm;