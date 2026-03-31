import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { FiExternalLink, FiX, FiChevronRight } from 'react-icons/fi';

const colorMap: Record<string, { accent: string; bg: string; border: string }> = {
  blue:    { accent: '#3B82F6', bg: 'rgba(59,130,246,0.08)',   border: 'rgba(59,130,246,0.2)' },
  purple:  { accent: '#8B5CF6', bg: 'rgba(139,92,246,0.08)',   border: 'rgba(139,92,246,0.2)' },
  emerald: { accent: '#10B981', bg: 'rgba(16,185,129,0.08)',   border: 'rgba(16,185,129,0.2)' },
};

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="projects" className="py-28 bg-slate-900 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(139,92,246,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full"
            style={{ color: '#c084fc', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', fontFamily: "'Fira Code', monospace" }}>
            What I've Built
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>
            Featured <span style={{ background: 'linear-gradient(135deg,#a78bfa,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Projects</span>
          </h2>
          <p className="text-slate-400 mt-4 text-base">Click any project for a detailed case study</p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => {
            const c = colorMap[project.color] ?? colorMap.blue;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                onClick={() => setSelected(index)}
                className="group cursor-pointer relative rounded-2xl overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${c.border}` }}
                whileHover={{ y: -8, boxShadow: `0 24px 48px ${c.accent}20`, transition: { duration: 0.25 } }}
              >
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />

                <div className="p-7">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-white leading-tight pr-4">{project.title}</h3>
                    <FiChevronRight size={18} className="text-slate-600 group-hover:text-slate-300 flex-shrink-0 mt-0.5 transition-colors" />
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs" style={{ color: c.accent, background: c.bg, fontFamily: "'Fira Code', monospace" }}>{tag}</span>
                    ))}
                    {project.tags.length > 5 && <span className="px-2 py-0.5 rounded text-xs text-slate-500" style={{ background: 'rgba(255,255,255,0.04)' }}>+{project.tags.length - 5}</span>}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm font-medium" style={{ color: c.accent }}>
                    <FiExternalLink size={14} />
                    <span>View case study</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Case study modal ── */}
      <AnimatePresence>
        {selected !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-2 md:inset-12 lg:inset-20 z-50 overflow-y-auto rounded-2xl"
              style={{ background: 'rgba(10,15,30,0.98)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)' }}
            >
              {(() => {
                const p = projectsData[selected];
                const c = colorMap[p.color] ?? colorMap.blue;
                return (
                  <div className="p-8 md:p-12">
                    {/* Modal header */}
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <span className="text-xs font-semibold tracking-widest uppercase mb-2 block" style={{ color: c.accent, fontFamily: "'Fira Code', monospace" }}>Case Study</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>{p.title}</h2>
                      </div>
                      <button onClick={() => setSelected(null)} className="p-2 rounded-xl text-slate-400 hover:text-white flex-shrink-0 ml-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <FiX size={20} />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-lg leading-relaxed mb-10">{p.description}</p>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Key features */}
                      <div>
                        <h3 className="text-white font-bold mb-4 text-lg">Key Features</h3>
                        <ul className="space-y-3">
                          {p.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                              <span className="mt-1 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: c.bg, color: c.accent }}>{i + 1}</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech stack */}
                      <div>
                        <h3 className="text-white font-bold mb-4 text-lg">Technology Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ color: c.accent, background: c.bg, border: `1px solid ${c.border}`, fontFamily: "'Fira Code', monospace" }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
