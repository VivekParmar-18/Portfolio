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
    <section id="projects" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="glow-mesh" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase mb-6 px-5 py-2 rounded-full"
            style={{ color: '#c084fc', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', fontFamily: 'var(--font-display)' }}>
            Selected Artifacts
          </span>
          <h2 className="text-4xl md:text-7xl font-extrabold text-white mb-8" style={{ letterSpacing: '-0.05em', fontFamily: 'var(--font-display)' }}>
            Solution <span className="premium-gradient-text">Archive</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">Architecting robust digital ecosystems and solving complex engineering challenges through code.</p>
        </motion.div>

        {/* Cards grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          role="list" 
          aria-label="Software Engineering Projects Portfolio"
        >
          {projectsData.map((project, index) => {
            const c = colorMap[project.color] ?? colorMap.blue;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                onClick={() => setSelected(index)}
                className="group cursor-pointer relative"
                role="listitem"
              >
                <motion.article 
                  className="glass-card h-full p-8 overflow-hidden border-white/5 group-hover:border-white/20 transition-all duration-500"
                  style={{ backdropFilter: 'blur(16px)' }}
                  aria-labelledby={`project-title-${index}`}
                >
                  <div className="absolute top-0 left-0 right-0 h-1" aria-hidden="true" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />

                  <div className="flex items-start justify-between mb-5">
                    <h3 id={`project-title-${index}`} className="text-xl font-bold text-white leading-tight pr-4" style={{ fontFamily: 'var(--font-display)' }}>{project.title}</h3>
                    <FiChevronRight size={18} className="text-slate-600 group-hover:text-slate-300 group-hover:translate-x-1 flex-shrink-0 mt-0.5 transition-all" aria-hidden="true" />
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8" aria-label="Project Technologies">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ color: c.accent, background: c.bg, border: `1px solid ${c.border}`, fontFamily: "'Fira Code', monospace" }}>{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold mt-auto transition-all" style={{ color: c.accent }} aria-label={`View Case Study: ${project.title}`}>
                    <span>Case Study</span>
                    <FiExternalLink size={14} aria-hidden="true" className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.article>
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
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 px-4 flex items-center justify-center pt-24"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed inset-4 md:inset-10 lg:inset-24 z-50 overflow-y-auto"
            >
              <div className="glass-card min-h-full border-white/10 shadow-3xl">
              {(() => {
                const p = projectsData[selected];
                const c = colorMap[p.color] ?? colorMap.blue;
                return (
                  <div className="p-8 md:p-16">
                    {/* Modal header */}
                    <div className="flex items-start justify-between mb-12">
                      <div>
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3 block" style={{ color: c.accent, fontFamily: 'var(--font-display)' }}>0{selected + 1} / Project Case Study</span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-white" style={{ letterSpacing: '-0.04em', fontFamily: 'var(--font-display)' }}>{p.title}</h2>
                      </div>
                      <button onClick={() => setSelected(null)} aria-label="Close modal" className="p-3 rounded-2xl text-slate-400 hover:text-white flex-shrink-0 ml-4 hover:rotate-90 transition-transform duration-300" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <FiX size={20} />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-xl leading-relaxed mb-12 font-medium">{p.description}</p>

                    <div className="grid lg:grid-cols-2 gap-12">
                      {/* Key features */}
                      <div className="glass-card p-8 border-white/5 bg-white/1">
                        <h3 className="text-white font-bold mb-6 text-xl" style={{ fontFamily: 'var(--font-display)' }}>Technical Architecture</h3>
                        <ul className="space-y-4">
                          {p.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-4 text-slate-300 text-sm md:text-base leading-relaxed">
                              <span className="mt-1 w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: c.bg, color: c.accent, border: `1px solid ${c.border}` }}>{i + 1}</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-col gap-8">
                        <div className="glass-card p-8 border-white/5 bg-white/1">
                          <h3 className="text-white font-bold mb-6 text-xl" style={{ fontFamily: 'var(--font-display)' }}>Core Infrastructure</h3>
                          <div className="flex flex-wrap gap-2">
                            {p.tags.map((tag) => (
                              <span key={tag} className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider" style={{ color: c.accent, background: c.bg, border: `1px solid ${c.border}`, fontFamily: 'var(--font-display)' }}>{tag}</span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/5">
                           <div className="text-sm font-medium text-slate-400">Ready to discuss this project?</div>
                           <button onClick={() => setSelected(null)} className="text-blue-400 font-bold hover:underline">Get in touch →</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
