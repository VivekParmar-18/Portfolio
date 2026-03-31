import { useEffect, lazy, Suspense } from 'react';
import {
  Navigation,
  Hero,
  Skills,
  BackgroundElements,
  ContactCard,
  ContactForm,
  ScrollToTop,
  SocialLinks,
} from '../components';
import { contactMethods } from '../data/contactData';
import { motion } from 'framer-motion';
import { personal } from '../data/personalData';
import { useSEO } from '../hooks/useSEO';
// SocialLinks now imported from components index
import { socialLinks } from '../data/contactData';

const LazyAbout       = lazy(() => import('../components/About/About'));
const LazyJavaExpertise = lazy(() => import('../components/JavaExpertise/JavaExpertise'));
const LazyExperience  = lazy(() => import('../components/Experience/Experience'));
const LazyProjects    = lazy(() => import('../components/Projects/Projects'));
const LazyBlog        = lazy(() => import('../components/Blog/Blog'));

const SectionFallback = ({ label }: { label: string }) => (
  <div className="flex items-center justify-center py-32">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
      <span className="text-slate-500 text-sm font-mono">Loading {label}…</span>
    </div>
  </div>
);

const SinglePagePortfolio = () => {
  const { updateSEO } = useSEO();

  useEffect(() => {
    updateSEO({
      title: `${personal.name} — Fullstack Java & React Developer`,
      description: personal.bio,
    });
  }, [updateSEO]);

  // IntersectionObserver to drive nav highlight
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            window.dispatchEvent(
              new CustomEvent('sectionChange', { detail: { sectionId: e.target.id } })
            );
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-x-hidden" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <BackgroundElements />
      <Navigation />

      {/* ── Hero ── */}
      <Hero />

      {/* ── About ── */}
      <Suspense fallback={<SectionFallback label="About" />}>
        <LazyAbout />
      </Suspense>

      {/* ── Java Expertise ── */}
      <Suspense fallback={<SectionFallback label="Java Expertise" />}>
        <LazyJavaExpertise />
      </Suspense>

      {/* ── Skills ── */}
      <Skills />

      {/* ── Experience ── */}
      <Suspense fallback={<SectionFallback label="Experience" />}>
        <LazyExperience />
      </Suspense>

      {/* ── Projects ── */}
      <Suspense fallback={<SectionFallback label="Projects" />}>
        <LazyProjects />
      </Suspense>

      {/* ── Blog ── */}
      <Suspense fallback={<SectionFallback label="Blog" />}>
        <LazyBlog />
      </Suspense>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 bg-slate-950 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(59,130,246,0.07) 0%, transparent 70%)' }} />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full"
              style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontFamily: "'Fira Code', monospace" }}>
              Let's Connect
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-5" style={{ letterSpacing: '-0.03em' }}>
              Get In Touch
            </h2>
            <p className="text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
              Ready to work together? I'm always excited to discuss new opportunities and innovative projects.
            </p>
          </motion.div>

          {/* Contact method cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <h3 className="text-2xl font-bold text-white mb-4" style={{ letterSpacing: '-0.01em' }}>Send Me a Message</h3>
              <p className="text-slate-400 leading-relaxed mb-8">Fill out the form and I'll get back to you within 24 hours.</p>
              <div className="space-y-3">
                {[
                  { icon: '⚡', title: 'Fast Response', desc: 'Usually within 24 hours' },
                  { icon: '🤝', title: 'Open to Collaboration', desc: 'Projects of any size' },
                  { icon: '🌍', title: 'Remote Friendly', desc: 'Working across time zones' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="text-white font-semibold text-sm">{item.title}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-3"
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* Social links */}
          <div className="text-center">
            <p className="text-slate-500 mb-6 text-sm">Also find me on</p>
            <SocialLinks socialLinks={socialLinks} />
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default SinglePagePortfolio;