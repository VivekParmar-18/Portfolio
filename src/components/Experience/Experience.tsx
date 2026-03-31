import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experienceData } from '../../data/experienceData';
import { FiBriefcase } from 'react-icons/fi';

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="experience" className="py-28 bg-slate-950 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(16,185,129,0.05) 0%, transparent 65%)' }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full"
            style={{ color: '#34d399', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', fontFamily: "'Fira Code', monospace" }}>
            Career
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
            Work <span style={{ background: 'linear-gradient(135deg,#34d399,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block" style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), rgba(16,185,129,0.4), transparent)' }} />

          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.15 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-5 h-5 rounded-full hidden md:flex items-center justify-center"
                  style={{ background: index === 0 ? '#3B82F6' : '#10B981', boxShadow: `0 0 12px ${index === 0 ? 'rgba(59,130,246,0.5)' : 'rgba(16,185,129,0.5)'}` }}>
                  <FiBriefcase size={10} className="text-white" />
                </div>

                <motion.div
                  className="p-6 md:p-8 rounded-2xl relative overflow-hidden group"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  whileHover={{ background: 'rgba(255,255,255,0.05)', borderColor: index === 0 ? 'rgba(59,130,246,0.25)' : 'rgba(16,185,129,0.25)', transition: { duration: 0.2 } }}
                >
                  <div className="absolute top-0 left-0 w-full h-0.5" style={{ background: `linear-gradient(90deg, ${index === 0 ? '#3B82F6' : '#10B981'}60, transparent)` }} />

                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.position}</h3>
                      <p className="font-medium" style={{ color: index === 0 ? '#60a5fa' : '#34d399' }}>{exp.company}</p>
                    </div>
                    <span className="text-xs px-3 py-1.5 rounded-full text-slate-400 flex items-center gap-1.5"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: "'Fira Code', monospace", whiteSpace: 'nowrap' }}>
                      <FiBriefcase size={11} />{exp.duration}
                    </span>
                  </div>

                  <p className="text-slate-400 leading-relaxed mb-6">{exp.description}</p>

                  <div className="grid md:grid-cols-2 gap-2 mb-6">
                    {exp.achievements.map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="mt-0.5 flex-shrink-0 font-bold" style={{ color: index === 0 ? '#60a5fa' : '#34d399' }}>✓</span>
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {experienceData[index].technologies.map((tech) => (
                      <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-medium"
                        style={{ color: index === 0 ? '#93c5fd' : '#6ee7b7', background: index === 0 ? 'rgba(59,130,246,0.08)' : 'rgba(16,185,129,0.08)', border: `1px solid ${index === 0 ? 'rgba(59,130,246,0.15)' : 'rgba(16,185,129,0.15)'}`, fontFamily: "'Fira Code', monospace" }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
