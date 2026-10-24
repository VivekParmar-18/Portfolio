import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { projectsData, type Project } from '../../data/projectsData';
import { FiExternalLink, FiX, FiGithub, FiLock, FiChevronRight } from 'react-icons/fi';

const Projects = () => {
  const [ref] = useInView({ threshold: 0.05, triggerOnce: true });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  const openProject = (project: Project, trigger: HTMLElement) => {
    triggerElementRef.current = trigger;
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
    triggerElementRef.current?.focus();
    triggerElementRef.current = null;
  };

  useEffect(() => {
    if (!selectedProject) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" className="pt-12 md:pt-16 pb-20 md:pb-24 relative overflow-hidden" ref={ref}>
      <div className="glow-mesh" />

      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="mb-14 max-w-3xl">
          <p className="text-xs text-console-cool font-mono mb-2">engineering catalog</p>
          <h2 className="text-3xl md:text-4xl font-medium text-ink tracking-tight mb-4">
            Featured projects & production systems
          </h2>
          <p className="text-ink-muted text-base leading-relaxed">
            Production systems, high-concurrency pipelines, and open-source agent tooling: the technical problem, the architectural solution, and measured outcomes.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Software engineering projects">
          {projectsData.map((project, index) => (
            <article
              key={project.title}
              role="listitem"
              onClick={(e) => openProject(project, e.currentTarget)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProject(project, e.currentTarget);
                }
              }}
              tabIndex={0}
              className="console-panel p-6 border border-rule flex flex-col justify-between cursor-pointer transition-colors hover:border-rule-2 group"
              aria-label={`View architectural details for ${project.title}`}
            >
              <div>
                {/* Header: Context & badge */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-rule mb-4">
                  <span className="text-[11px] font-mono text-console-accent truncate">
                    {project.context}
                  </span>
                  <span className="text-[10px] font-mono text-ink-muted bg-paper-3 px-2 py-0.5 rounded border border-rule">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-ink font-display mb-2.5 group-hover:text-console-accent transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs md:text-sm text-ink-muted leading-relaxed line-clamp-3 mb-5 font-body">
                  {project.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Technologies">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-paper-3 border border-rule font-mono text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-paper-3 border border-rule font-mono text-ink-muted">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer: Action */}
              <div className="pt-4 border-t border-rule flex items-center justify-between text-xs font-medium text-console-cool font-body group-hover:text-ink transition-colors">
                <span>Inspect architecture</span>
                <FiChevronRight size={14} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Accessible Project Detail Modal ── */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Scrim */}
          <div
            className="fixed inset-0 bg-paper-3/90"
            onClick={closeProject}
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto console-panel p-6 sm:p-8 md:p-10 border border-rule-2 bg-paper-2"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-rule mb-6">
              <div>
                <span className="text-xs font-mono text-console-accent block mb-1">
                  {selectedProject.context}
                </span>
                <h3 id="project-dialog-title" className="text-2xl md:text-3xl font-medium text-ink font-display">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeProject}
                aria-label="Close project modal"
                className="p-2 rounded bg-paper-3 text-ink-muted hover:text-ink border border-rule transition-colors flex-shrink-0"
              >
                <FiX size={18} aria-hidden="true" />
              </button>
            </div>

            {/* Overview */}
            <p className="text-ink-2 text-sm md:text-base leading-relaxed mb-6 font-body">
              {selectedProject.description}
            </p>

            {/* All Tags */}
            <div className="flex flex-wrap gap-1.5 mb-8" aria-label="Project technologies">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded bg-paper-3 border border-rule font-mono text-ink-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Problem & Solution Panels */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded bg-paper-3 border border-rule">
                <span className="text-xs text-console-bad font-mono block mb-1.5">problem statement</span>
                <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-body">
                  {selectedProject.problem}
                </p>
              </div>
              <div className="p-4 rounded bg-paper-3 border border-rule">
                <span className="text-xs text-console-ok font-mono block mb-1.5">architectural solution</span>
                <p className="text-xs md:text-sm text-ink-2 leading-relaxed font-body">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            {/* Work Items */}
            <div className="mb-8">
              <span className="text-xs text-console-cool font-mono block mb-3">implementation work</span>
              <ul className="space-y-2 pl-0 list-none m-0">
                {selectedProject.features.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-ink-muted leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-console-accent flex-shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Measured Results */}
            <div className="p-4 rounded bg-paper-3 border border-rule mb-8">
              <span className="text-xs text-console-ok font-mono block mb-3">measured outcomes</span>
              <ul className="space-y-2 pl-0 list-none m-0">
                {selectedProject.results.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-ink leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-console-ok flex-shrink-0" aria-hidden="true" />
                    <span className="font-medium">{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Engineering Learning */}
            <div className="p-4 rounded bg-paper-3 border border-rule mb-8">
              <span className="text-xs text-ink-muted font-mono block mb-1">engineering insight</span>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed font-body italic">
                "{selectedProject.learnings}"
              </p>
            </div>

            {/* Footer Links */}
            <div className="pt-4 border-t border-rule flex items-center justify-between">
              {selectedProject.github ? (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary text-xs"
                >
                  <FiGithub size={14} aria-hidden="true" />
                  <span>View GitHub repository</span>
                  <FiExternalLink size={12} aria-hidden="true" />
                </a>
              ) : (
                <div className="flex items-center gap-2 text-xs text-ink-muted font-mono">
                  <FiLock size={14} aria-hidden="true" />
                  <span>Enterprise production system (architecture discussed in interviews)</span>
                </div>
              )}

              <button
                type="button"
                onClick={closeProject}
                className="btn text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
