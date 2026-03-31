import { PageTransition, Navigation, ScrollReveal, Statistics, Timeline } from '../components';
import { experienceData } from '../data/experienceData';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import { personal } from '../data/personalData';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const personalityTraits = [
  { title: 'Problem Solver', desc: 'Breaking complex problems into elegant, manageable solutions.', icon: '🧩', gradient: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/20' },
  { title: 'Team Player', desc: 'Collaboration and knowledge sharing build the best software.', icon: '🤝', gradient: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/20' },
  { title: 'Continuous Learner', desc: 'Technology evolves rapidly — and so do I.', icon: '📚', gradient: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/20' },
  { title: 'Quality Focused', desc: 'Clean, maintainable code and great UX are non-negotiable.', icon: '⚡', gradient: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/20' },
];

const About = () => {
  const { updateSEO } = useSEO();

  useEffect(() => {
    updateSEO({
      title: `About ${personal.name} — My Journey & Experience`,
      description: `Learn about my journey as a fullstack developer, my experience at ${personal.company}, and the technologies I work with.`,
      keywords: ['about', 'fullstack developer', personal.company, 'java react developer'],
    });
  }, [updateSEO]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-950" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <Navigation />

        {/* Hero */}
        <section className="pt-36 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal direction="up">
              <div className="text-center mb-20">
                <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full" style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontFamily: "'Fira Code', monospace" }}>
                  The Person Behind the Code
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ letterSpacing: '-0.03em' }}>About Me</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Fullstack Java + React developer with {personal.yearsOfExperience} years of experience at {personal.company}. Passionate about clean code and delightful user experiences.
                </p>
              </div>
            </ScrollReveal>

            {/* Bio + Profile card */}
            <div className="grid md:grid-cols-5 gap-12 items-center mb-24">
              <ScrollReveal direction="left" delay={0.1}>
                <div className="md:col-span-3 space-y-5 text-slate-300 leading-relaxed">
                  <h2 className="text-3xl font-bold text-white mb-6" style={{ letterSpacing: '-0.02em' }}>My Journey</h2>
                  <p>I'm a fullstack developer currently working as an <span className="text-blue-400 font-semibold">Associate Software Developer</span> at {personal.company}, where I build enterprise applications across the entire stack.</p>
                  <p>My expertise spans <span className="text-emerald-400 font-semibold">Java Spring Boot</span> for robust backend services and <span className="text-blue-400 font-semibold">React.js with TypeScript</span> for engaging, performant UIs. I love the challenge of systems that scale and interfaces that feel effortless.</p>
                  <p>When I'm not coding, you'll find me exploring new tools, contributing to open-source, or writing about things I've learned.</p>

                  <div className="flex flex-wrap gap-3 pt-4">
                    {[
                      { icon: FiGithub, href: personal.github, label: 'GitHub' },
                      { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
                      { icon: FiMail, href: `mailto:${personal.email}`, label: 'Email' },
                    ].map(({ icon: Icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:text-white transition-all text-sm font-medium"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <Icon size={16} />{label}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="md:col-span-2 flex justify-center">
                  <motion.div
                    className="relative p-8 rounded-2xl text-center w-full max-w-xs"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden" style={{ border: '2px solid rgba(59,130,246,0.3)', boxShadow: '0 0 30px rgba(59,130,246,0.15)' }}>
                      <img src={personal.profileImage} alt={personal.name} className="w-full h-full object-cover"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.style.display = 'none';
                          t.parentElement!.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;background:linear-gradient(135deg,#1E3A5F,#0f172a)">👨‍💻</div>';
                        }}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{personal.name}</h3>
                    <p className="text-blue-400 text-sm mb-3">{personal.title}</p>
                    <p className="text-emerald-400 text-sm font-medium mb-4">{personal.company}</p>
                    <div className="flex justify-center gap-4 text-xs text-slate-400">
                      <span>📍 {personal.location.split(',')[0]}</span>
                      <span>💼 {personal.yearsOfExperience}+ yrs</span>
                    </div>

                    {/* Animated dots */}
                    <motion.div className="absolute -top-3 -right-3 w-6 h-6 bg-blue-500 rounded-full opacity-50" animate={{ y: [0, -8, 0], rotate: [0, 180, 360] }} transition={{ duration: 4, repeat: Infinity }} />
                    <motion.div className="absolute -bottom-3 -left-3 w-5 h-5 bg-emerald-500 rounded-full opacity-50" animate={{ y: [0, 8, 0], rotate: [360, 180, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats */}
        <Statistics />

        {/* What drives me */}
        <section className="py-24 bg-slate-900">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full" style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontFamily: "'Fira Code', monospace" }}>Values</span>
                <h2 className="text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>What Drives Me</h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {personalityTraits.map((trait, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                  <motion.div
                    className={`relative p-6 rounded-2xl border bg-gradient-to-br ${trait.gradient} ${trait.border} cursor-pointer h-full`}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="text-3xl mb-4">{trait.icon}</div>
                    <h3 className="text-white font-bold mb-2">{trait.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{trait.desc}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full" style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontFamily: "'Fira Code', monospace" }}>Career</span>
                <h2 className="text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>My Experience</h2>
              </div>
            </ScrollReveal>
            <Timeline experiences={experienceData} />
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;