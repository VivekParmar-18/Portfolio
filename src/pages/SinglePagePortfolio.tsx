import { useEffect } from 'react';
import {
  Navigation,
  Hero,
  Skills,
  BackgroundElements,
  ContactCard,
  ContactForm,
  ScrollToTop,
} from '../components';
// Sections are imported eagerly on purpose: each chunk was only 2–4 kB gzipped,
// so lazy-loading saved almost nothing while making sections pop in as
// skeletons mid-scroll. One slightly larger bundle scrolls perfectly smooth.
import About from '../components/About/About';
import JavaExpertise from '../components/JavaExpertise/JavaExpertise';
import Experience from '../components/Experience/Experience';
import Projects from '../components/Projects/Projects';
import Education from '../components/Education/Education';
import { contactMethods } from '../data/contactData';
import { motion } from 'framer-motion';
import { personal } from '../data/personalData';
import { useSEO } from '../hooks/useSEO';

const EASE = [0.22, 1, 0.36, 1] as const;

const SinglePagePortfolio = () => {
  const { updateSEO } = useSEO();

  useEffect(() => {
    updateSEO({
      title: 'Vivek Parmar — Software Developer | Java, Spring Boot & React',
      description: personal.bio,
    });
  }, [updateSEO]);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-x-hidden" style={{ fontFamily: 'var(--font-body)' }}>
      <BackgroundElements />
      <Navigation />

      {/* ── Hero ── */}
      <Hero />

      {/* ── About ── */}
      <About />

      {/* ── Java Expertise ── */}
      <JavaExpertise />

      {/* ── Skills ── */}
      <Skills />

      {/* ── Experience ── */}
      <Experience />

      {/* ── Projects ── */}
      <Projects />

      {/* ── Education ── */}
      <Education />

      {/* ── Contact & Footer ── */}
      <footer id="contact" className="py-24 md:py-32 2xl:py-40 bg-slate-950 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center mb-16"
          >
            <span className="flex items-center justify-center gap-3 mb-5">
              <span className="w-6 h-px bg-blue-500/40" aria-hidden="true" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-blue-400" style={{ fontFamily: "'Fira Code', monospace" }}>
                Contact
              </span>
              <span className="w-6 h-px bg-blue-500/40" aria-hidden="true" />
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
              Get in touch
            </h2>
            <p className="text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
              Hiring for a backend or full-stack role? Email me or reach out on LinkedIn — I reply within 24 hours.
            </p>
          </motion.div>

          {/* Contact method cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" aria-label="Contact Methods">
            {contactMethods.map((method, index) => (
              <ContactCard
                key={method.title}
                title={method.title}
                description={method.description}
                value={method.value || ''}
                action={method.action}
                icon={method.icon}
                color={method.color as 'blue' | 'emerald' | 'purple'}
                index={index}
              />
            ))}
          </div>

          {/* Form + info */}
          <div className="grid md:grid-cols-5 gap-12 items-start mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="md:col-span-2"
            >
              <h3 className="text-2xl font-bold text-white mb-4" style={{ letterSpacing: '-0.01em' }}>Send me a message</h3>
              <p className="text-slate-400 leading-relaxed mb-8">Fill out the form and I'll get back to you within 24 hours.</p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Based in Ahmedabad, India — open to on-site, hybrid, and remote roles.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="md:col-span-3"
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* Footer */}
          <div className="pt-12 border-t border-white/5 mt-16" role="contentinfo">
            {/* Identity + quick links */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
              <div className="text-center md:text-left">
                <p className="text-white font-semibold text-sm">{personal.name}</p>
                <p className="text-slate-400 text-sm mt-1">Software Developer — Java, Spring Boot &amp; React</p>
              </div>
              <nav aria-label="Footer">
                <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                  <li>
                    <a href="#about" className="text-sm text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-sm">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#projects" className="text-sm text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-sm">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href={personal.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-sm"
                    >
                      Resume
                    </a>
                  </li>
                  <li>
                    <a
                      href={personal.github}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-sm"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href={personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 rounded-sm"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Copyright */}
            <p className="text-center text-slate-500 text-[13px] font-medium tracking-wider uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>
              &copy; {new Date().getFullYear()} {personal.name} · Software Developer · Ahmedabad, India
            </p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
};

export default SinglePagePortfolio;