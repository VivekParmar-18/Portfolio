import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  PaperAirplaneIcon 
} from '@heroicons/react/24/outline';
import { useResponsive, useReducedMotion, TouchButton } from '../../index';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const { isMobile } = useResponsive();
  const prefersReducedMotion = useReducedMotion();

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        break;
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        break;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        break;
      default:
        return undefined;
    }
    return undefined;
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit to Formspree
    setStatus({ type: 'loading' });
    
    try {
      const response = await fetch('https://formspree.io/f/xwpakneg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Thank you! Your message has been sent successfully.' 
        });
        
        // Reset form after success
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setStatus({ type: 'idle' });
        }, 3000);
      } else {
        throw new Error('Form submission failed');
      }
      
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Sorry, there was an error sending your message. Please try again.' 
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: prefersReducedMotion ? 0.2 : 0.6, 
        delay: prefersReducedMotion ? 0 : 0.2 
      }}
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
        {/* Name Field */}
        <div className="relative">
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`
              w-full bg-slate-800/50 border rounded-xl
              text-white
              transition-all duration-300 ease-out
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              touch-manipulation
              ${isMobile ? 'px-4 py-4 text-base' : 'px-4 py-4'}
              ${isMobile ? 'min-h-[56px]' : ''}
              ${errors.name 
                ? 'border-red-500/50 focus:border-red-500' 
                : 'border-slate-700/50 focus:border-blue-500/50'
              }
              ${formData.name ? 'border-emerald-500/30' : ''}
            `}
            placeholder="Your Name"
          />

          {/* Error Message */}
          <AnimatePresence>
            {errors.name && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center mt-2 text-red-400 text-sm"
              >
                <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                {errors.name}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`
              w-full px-4 py-4 bg-slate-800/50 border rounded-xl
              text-white
              transition-all duration-300 ease-out
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              ${errors.email 
                ? 'border-red-500/50 focus:border-red-500' 
                : 'border-slate-700/50 focus:border-blue-500/50'
              }
              ${formData.email && !errors.email ? 'border-emerald-500/30' : ''}
            `}
            placeholder="Your Email"
          />

          <AnimatePresence>
            {errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center mt-2 text-red-400 text-sm"
              >
                <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                {errors.email}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success indicator */}
          <AnimatePresence>
            {formData.email && !errors.email && validateEmail(formData.email) && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-4 top-4"
              >
                <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subject Field */}
        <div className="relative">
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className={`
              w-full px-4 py-4 bg-slate-800/50 border rounded-xl
              text-white
              transition-all duration-300 ease-out
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              ${errors.subject 
                ? 'border-red-500/50 focus:border-red-500' 
                : 'border-slate-700/50 focus:border-blue-500/50'
              }
              ${formData.subject && !errors.subject ? 'border-emerald-500/30' : ''}
            `}
            placeholder="Subject"
          />

          <AnimatePresence>
            {errors.subject && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center mt-2 text-red-400 text-sm"
              >
                <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                {errors.subject}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Message Field */}
        <div className="relative">
          <textarea
            id="message"
            rows={6}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`
              w-full px-4 py-4 bg-slate-800/50 border rounded-xl
              text-white resize-none
              transition-all duration-300 ease-out
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              ${errors.message 
                ? 'border-red-500/50 focus:border-red-500' 
                : 'border-slate-700/50 focus:border-blue-500/50'
              }
              ${formData.message && !errors.message ? 'border-emerald-500/30' : ''}
            `}
            placeholder="Your Message"
          />

          <AnimatePresence>
            {errors.message && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center mt-2 text-red-400 text-sm"
              >
                <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                {errors.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Button */}
        <TouchButton
          onClick={() => handleSubmit(new Event('submit') as any)}
          disabled={status.type === 'loading'}
          variant="primary"
          size={isMobile ? 'lg' : 'md'}
          className="w-full shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
          hapticFeedback={true}
        >
          <AnimatePresence mode="wait">
            {status.type === 'loading' ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  animate={!prefersReducedMotion ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5'} border-2 border-white/30 border-t-white rounded-full`}
                />
                <span>Sending...</span>
              </motion.div>
            ) : (
              <motion.div
                key="send"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center space-x-2"
              >
                <PaperAirplaneIcon className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5'}`} />
                <span>Send Message</span>
              </motion.div>
            )}
          </AnimatePresence>
        </TouchButton>

        {/* Status Messages */}
        <AnimatePresence>
          {status.message && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`
                p-4 rounded-xl border backdrop-blur-sm
                ${status.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                {status.type === 'success' ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <ExclamationCircleIcon className="w-5 h-5" />
                )}
                <span>{status.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default ContactForm;