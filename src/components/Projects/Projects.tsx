import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { FiExternalLink, FiX, FiChevronRight, FiGithub, FiLock } from 'react-icons/fi';

const EASE = [0.22, 1, 0.36, 1] as const;

const colorMap: Record<string, { accent: string; bg: string; border: string }> = {
  blue:    { accent: '#3B82F6', bg: 'rgba(59,130,246,0.08)',   border: 'rgba(59,130,246,0.2)' },
  purple:  { accent: '#8B5CF6', bg: 'rgba(139,92,246,0.08)',   border: 'rgba(139,92,246,0.2)' },
  emerald: { accent: '#10B981', bg: 'rgba(16,185,129,0.08)',   border: 'rgba(16,185,129,0.2)' },
};

const ModalSection = ({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) => (
  <div>
    <h3 className="font-bold mb-3 text-sm uppercase tracking-[0.2em]" style={{ color: accent, fontFamily: 'var(--font-display)' }}>{title}</h3>
    {children}
  </div>
);

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selected, setSelected] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  // Focus management: remember the card that opened the modal so we can return focus on close
  const triggerRef = useRef<HTMLElement | null>(null);

  const openModal = (index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected(index);
  };

  const closeModal = () => {
    setSelected(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  };

  // Modal a11y: close on Escape, move focus to the close button when opened
  useEffect(() => {
    if (selected === null) return;
    closeBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  return (
    <section id="projects" className="py-24 md:py-32 2xl:py-40 relative overflow-hidden" ref={ref}>
      <div className="glow-mesh" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE }} className="text-center mb-20">
          <span className="flex items-center justify-center gap-3 mb-5">
            <span className="w-6 h-px bg-blue-500/40" aria-hidden="true" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-blue-400" style={{ fontFamily: "'Fira Code', monospace" }}>
              Selected work
            </span>
            <span className="w-6 h-px bg-blue-500/40" aria-hidden="true" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Projects
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">Production systems and personal work — the problem, what I built, and what came out of it.</p>
        </motion.div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          role="list"
          aria-label="Software projects"
        >
          {projectsData.map((project, index) => {
            const c = colorMap[project.color] ?? colorMap.blue;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
                className="group cursor-pointer relative"
                role="listitem"
              >
                <motion.article
                  whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE } }}
                  whileTap={{ scale: 0.98 }}
                  role="button"
                  tabIndex={0}
                  onClick={(e) => openModal(index, e.currentTarget)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(index, e.currentTarget);
                    }
                  }}
                  className="glass-card h-full p-8 overflow-hidden border-white/5 group-hover:border-white/20 transition-all duration-500 flex flex-col cursor-pointer"
                  
                  aria-labelledby={`project-title-${index}`}
                  aria-haspopup="dialog"
                >
                  <div className="absolute top-0 left-0 right-0 h-1" aria-hidden="true" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block" style={{ color: c.accent, fontFamily: "'Fira Code', monospace" }}>
                    {project.context}
                  </span>

                  <div className="flex items-start justify-between mb-5">
                    <h3 id={`project-title-${index}`} className="text-xl font-bold text-white leading-tight pr-4" style={{ fontFamily: 'var(--font-display)' }}>{project.title}</h3>
                    <FiChevronRight size={18} className="text-slate-600 group-hover:text-slate-300 group-hover:translate-x-1 flex-shrink-0 mt-0.5 transition-all" aria-hidden="true" />
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8" aria-label="Technologies used">
                    {project.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider" style={{ color: c.accent, background: c.bg, border: `1px solid ${c.border}`, fontFamily: "'Fira Code', monospace" }}>{tag}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold mt-auto transition-all" style={{ color: c.accent }} aria-label={`View details: ${project.title}`}>
                    <span>View details</span>
                    <FiExternalLink size={14} aria-hidden="true" className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Project detail modal ── */}
      <AnimatePresence>
        {selected !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-60 px-4 flex items-center justify-center pt-24"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="fixed inset-2 sm:inset-4 md:inset-10 lg:inset-24 z-70 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
            >
              <div className="glass-card min-h-full border-white/10 shadow-3xl">
              {(() => {
                const p = projectsData[selected];
                const c = colorMap[p.color] ?? colorMap.blue;
                return (
                  <div className="p-6 sm:p-8 md:p-16">
                    {/* Modal header */}
                    <div className="flex items-start justify-between mb-10">
                      <div>
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-3 block" style={{ color: c.accent, fontFamily: 'var(--font-display)' }}>{p.context}</span>
                        <h2 id="project-modal-title" className="text-3xl md:text-5xl font-extrabold text-white" style={{ letterSpacing: '-0.04em', fontFamily: 'var(--font-display)' }}>{p.title}</h2>
                      </div>
                      <button ref={closeBtnRef} onClick={closeModal} aria-label="Close project details" className="p-3 rounded-2xl text-slate-400 hover:text-white flex-shrink-0 ml-4 hover:rotate-90 transition-transform duration-300" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <FiX size={20} />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-xl leading-relaxed mb-10 font-medium">{p.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-12" aria-label="Technologies used">
                      {p.tags.map((tag) => (
                        <span key={tag} className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider" style={{ color: c.accent, background: c.bg, border: `1px solid ${c.border}`, fontFamily: 'var(--font-display)' }}>{tag}</span>
                      ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                      <div className="glass-card p-8 border-white/5 bg-white/1">
                        <ModalSection title="Problem" accent={c.accent}>
                          <p className="text-slate-300 text-sm md:text-base leading-relaxed">{p.problem}</p>
                        </ModalSection>
                      </div>
                      <div className="glass-card p-8 border-white/5 bg-white/1">
                        <ModalSection title="Solution" accent={c.accent}>
                          <p className="text-slate-300 text-sm md:text-base leading-relaxed">{p.solution}</p>
                        </ModalSection>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                      <div className="glass-card p-8 border-white/5 bg-white/1">
                        <ModalSection title="Key work" accent={c.accent}>
                          <ul className="space-y-4">
                            {p.features.map((f, i) => (
                              <li key={i} className="flex items-start gap-4 text-slate-300 text-sm md:text-base leading-relaxed">
                                <span className="mt-1 w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: c.bg, color: c.accent, border: `1px solid ${c.border}` }}>{i + 1}</span>
                                {f}
                              </li>
                            ))}
                          </ul>
                        </ModalSection>
                      </div>

                      <div className="flex flex-col gap-8">
                        <div className="glass-card p-8 border-white/5 bg-white/1">
                          <ModalSection title="Results" accent={c.accent}>
                            <ul className="space-y-3">
                              {p.results.map((r, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm md:text-base leading-relaxed">
                                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.accent }} aria-hidden="true" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </ModalSection>
                        </div>

                        <div className="glass-card p-8 border-white/5 bg-white/1">
                          <ModalSection title="Learnings" accent={c.accent}>
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">{p.learnings}</p>
                          </ModalSection>
                        </div>
                      </div>
                    </div>

                    {/* Code availability */}
                    {p.github ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-white transition-all hover:scale-[1.02]"
                        style={{ background: c.bg, border: `1px solid ${c.border}` }}
                      >
                        <FiGithub size={18} aria-hidden="true" />
                        View Code
                        <FiExternalLink size={14} aria-hidden="true" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-slate-400 text-sm">
                        <FiLock size={16} className="flex-shrink-0" aria-hidden="true" />
                        Proprietary codebase — architecture available to discuss in interviews.
                      </div>
                    )}
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
