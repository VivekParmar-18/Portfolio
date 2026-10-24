import { useInView } from 'react-intersection-observer';
import { experienceData } from '../../data/experienceData';
import { FiBriefcase, FiLayers } from 'react-icons/fi';

const Experience = () => {
  const [ref] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="experience" className="pt-12 md:pt-16 pb-20 md:pb-24 relative overflow-hidden" ref={ref}>
      <div className="glow-mesh" />

      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="mb-14 max-w-3xl">
          <p className="text-xs text-console-cool font-mono mb-2">work history</p>
          <h2 className="text-3xl md:text-4xl font-medium text-ink tracking-tight mb-4">
            Professional experience
          </h2>
          <p className="text-ink-muted text-base leading-relaxed">
            Engineering scalable backend systems, high-throughput asynchronous pipelines, and cloud services on AWS.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8" role="list" aria-label="Professional career timeline">
          {experienceData.map((exp) => (
            <article
              key={`${exp.company}-${exp.position}`}
              role="listitem"
              className="console-panel p-6 md:p-8 border border-rule relative"
            >
              {/* Header: Company & Role */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-rule mb-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-1.5 rounded bg-paper-3 text-console-accent" aria-hidden="true">
                      <FiBriefcase size={16} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium text-ink font-display">
                      {exp.position}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-console-cool font-body">
                    {exp.company} {exp.location ? `· ${exp.location}` : ''}
                  </p>

                  {/* Multi-role progression badges if present */}
                  {exp.roles && exp.roles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3" aria-label="Role progression history">
                      {exp.roles.map((r, rIdx) => (
                        <span
                          key={r.title}
                          className={`text-xs px-2.5 py-1 rounded font-mono ${
                            rIdx === 0
                              ? 'bg-paper-3 text-console-accent border border-rule-2'
                              : 'bg-paper-3 text-ink-muted border border-rule'
                          }`}
                        >
                          {r.title} ({r.period})
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-xs font-mono text-ink-muted bg-paper-3 px-3 py-1.5 rounded border border-rule self-start">
                  {exp.duration}
                </div>
              </div>

              {/* Description */}
              <p className="text-ink-2 text-sm md:text-base leading-relaxed mb-6 font-body">
                {exp.description}
              </p>

              {/* Projects Breakdown (if available, e.g. Techforce) */}
              {exp.projects && exp.projects.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h4 className="text-xs text-ink-muted font-mono flex items-center gap-1.5">
                    <FiLayers size={13} aria-hidden="true" />
                    <span>production systems engineered</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {exp.projects.map((proj) => (
                      <div
                        key={proj.title}
                        className="p-4 rounded bg-paper-3 border border-rule space-y-2.5"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h5 className="text-sm font-medium text-ink font-body">
                            {proj.title}
                          </h5>
                          <span className="text-[11px] font-mono text-console-cool">
                            {proj.stack}
                          </span>
                        </div>
                        <ul className="space-y-1.5 pl-0 list-none m-0">
                          {proj.highlights.map((h, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2.5 text-xs text-ink-muted leading-relaxed">
                              <span className="mt-1 w-1 h-1 rounded-full bg-console-accent flex-shrink-0" aria-hidden="true" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* General Key Achievements */}
              {(!exp.projects || exp.projects.length === 0) && (
                <div className="mb-6">
                  <ul className="space-y-2 pl-0 list-none m-0">
                    {exp.achievements.map((ach, achIdx) => (
                      <li key={achIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-ink-muted leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-console-accent flex-shrink-0" aria-hidden="true" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div className="pt-4 border-t border-rule flex flex-wrap gap-1.5" aria-label="Technologies used">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] text-ink-muted bg-paper-3 border border-rule font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
