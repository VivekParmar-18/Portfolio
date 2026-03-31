import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation, PageTransition, Hero, Skills, ScrollReveal, BackgroundElements, Statistics } from '../components';
import { useSEO } from '../hooks/useSEO';
import { personal } from '../data/personalData';
import { experienceData } from '../data/experienceData';
import { FiBriefcase, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SectionHeading = ({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) => (
  <div className="text-center mb-16">
    <span
      className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-full"
      style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontFamily: "'Fira Code', monospace" }}
    >
      {label}
    </span>
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
      {title}
    </h2>
    {subtitle && <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const Home = () => {
  const { updateSEO } = useSEO();
  const navigate = useNavigate();

  useEffect(() => {
    updateSEO({
      title: `${personal.name} — Fullstack Java & React Developer`,
      description: personal.bio,
      keywords: ['fullstack developer', 'java developer', 'react developer', 'portfolio', personal.company],
    });
  }, [updateSEO]);

  // Section-change observer for nav highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.dispatchEvent(new CustomEvent('sectionChange', { detail: { sectionId: entry.target.id } }));
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-950" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <BackgroundElements />
        <Navigation />

        {/* Hero */}
        <Hero />

        {/* About */}
        <section id="about" className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal direction="up" delay={0.1}>
              <SectionHeading label="Who I am" title="About Me" subtitle="A bit about my background and what drives me as a developer." />
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal direction="left" delay={0.2}>
                <div className="space-y-5 text-slate-300 leading-relaxed">
                  <p>I'm a fullstack developer currently building enterprise applications at <span className="text-blue-400 font-semibold">{personal.company}</span> as an Associate Software Developer. I've been here for over a year, working across the stack on Java Spring Boot services and React frontends.</p>
                  <p>I thrive at the intersection of clean backend architecture and polished UIs. My go-to stack is <span className="text-emerald-400">Java + Spring Boot</span> on the server and <span className="text-blue-400">React + TypeScript</span> on the client.</p>
                  <p>Outside of work you'll find me exploring new frameworks, contributing to open-source, or diving deep into system design problems.</p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Location', value: personal.location },
                    { label: 'Role', value: personal.title },
                    { label: 'Company', value: personal.company },
                    { label: 'Experience', value: `${personal.yearsOfExperience}+ Years` },
                  ].map((item) => (
                    <div key={item.label} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="text-xs text-slate-500 mb-1" style={{ fontFamily: "'Fira Code', monospace" }}>{item.label}</div>
                      <div className="text-white font-medium text-sm">{item.value}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.3}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '🧩', title: 'Problem Solver', desc: 'I love breaking complex challenges into clean, elegant solutions.' },
                    { icon: '🤝', title: 'Team Player', desc: 'Collaboration and knowledge sharing are at my core.' },
                    { icon: '📚', title: 'Always Learning', desc: "Tech moves fast — I move with it." },
                    { icon: '⚡', title: 'Quality First', desc: 'Clean, maintainable code is non-negotiable for me.' },
                  ].map((trait) => (
                    <motion.div
                      key={trait.title}
                      className="p-5 rounded-2xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      whileHover={{ scale: 1.03, background: 'rgba(255,255,255,0.05)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-2xl mb-3">{trait.icon}</div>
                      <div className="text-white font-semibold text-sm mb-1">{trait.title}</div>
                      <div className="text-slate-500 text-xs leading-relaxed">{trait.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="up" delay={0.4}>
              <div className="mt-16">
                <Statistics />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Skills */}
        <Skills />

        {/* Experience */}
        <section id="experience" className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)' }} />
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal direction="up" delay={0.1}>
              <SectionHeading label="Career" title="Experience" subtitle="Where I've been and what I've built." />
            </ScrollReveal>

            <div className="space-y-6">
              {experienceData.map((exp, index) => (
                <ScrollReveal key={index} direction={index % 2 === 0 ? 'left' : 'right'} delay={0.2 + index * 0.15}>
                  <motion.div
                    className="relative p-8 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    whileHover={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(59,130,246,0.2)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                        <p className="text-blue-400 font-medium mt-0.5">{exp.company}</p>
                      </div>
                      <span className="text-xs px-3 py-1.5 rounded-full text-slate-400" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Fira Code', monospace", whiteSpace: 'nowrap' }}>
                        <FiBriefcase className="inline mr-1.5 mb-0.5" size={11} />
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{exp.description}</p>
                    <div className="grid md:grid-cols-2 gap-2 mb-5">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md text-xs text-blue-300" style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontFamily: "'Fira Code', monospace" }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
          <div className="max-w-3xl mx-auto px-6 text-center">
            <ScrollReveal direction="fade" delay={0.1}>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full" style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontFamily: "'Fira Code', monospace" }}>Let's Connect</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>Ready to build<br />something great?</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">Whether you have a project in mind, an opportunity to share, or just want to say hi — my inbox is always open.</p>
              <motion.button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', boxShadow: '0 0 40px rgba(59,130,246,0.3)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(59,130,246,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
                <FiArrowRight />
              </motion.button>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;