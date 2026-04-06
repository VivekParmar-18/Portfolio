import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experienceData } from '../../data/experienceData';
import { FiBriefcase } from 'react-icons/fi';

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="experience" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="glow-mesh" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full"
            style={{ color: '#34d399', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', fontFamily: "'Fira Code', monospace" }}>
            Career
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white" style={{ letterSpacing: '-0.04em' }}>
            Work <span className="premium-gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block" aria-hidden="true" style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), rgba(16,185,129,0.4), transparent)' }} />

          <div className="space-y-12" role="list" aria-label="Professional career timeline">
            {experienceData.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${exp.position}`}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.15 }}
                className="relative md:pl-24"
                role="listitem"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-6 h-6 rounded-xl hidden md:flex items-center justify-center rotate-45 border border-white/10"
                  aria-hidden="true"
                  style={{ background: index === 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)', boxShadow: index === 0 ? '0 0 20px rgba(59,130,246,0.3)' : 'none' }}>
                  <FiBriefcase size={12} className="text-white -rotate-45" />
                </div>

                <motion.article
                  className="glass-card p-8 md:p-12 relative overflow-hidden group border-white/5 hover:border-white/10 transition-all duration-500"
                  whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
                  aria-labelledby={`exp-title-${index}`}
                >
                  <div className="absolute top-0 left-0 w-full h-1" aria-hidden="true" style={{ background: index === 0 ? 'linear-gradient(90deg, var(--accent-primary), transparent)' : 'rgba(255,255,255,0.05)' }} />

                  <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
                    <div>
                      <h3 id={`exp-title-${index}`} className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>{exp.position}</h3>
                      <p className="text-lg font-medium opacity-80" style={{ color: index === 0 ? 'var(--accent-primary)' : 'inherit' }}>{exp.company}</p>
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-lg bg-white/5 border border-white/5 opacity-60" aria-label="Employment duration">
                      {exp.duration}
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed mb-8 text-lg font-light">{exp.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-10" aria-label="Key Achievements">
                    {exp.achievements.map((a, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" aria-hidden="true" style={{ background: index === 0 ? 'var(--accent-primary)' : 'rgba(255,255,255,0.3)' }} />
                        <span className="leading-relaxed">{a}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5" aria-label="Technologies used">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
