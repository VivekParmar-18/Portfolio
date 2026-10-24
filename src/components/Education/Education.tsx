import { useInView } from 'react-intersection-observer';
import { FiAward, FiBookOpen, FiMapPin, FiGlobe } from 'react-icons/fi';
import { educationData, certifications, achievements, languages } from '../../data/educationData';

const Education = () => {
  const [ref] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="education" className="pt-12 md:pt-16 pb-20 md:pb-24 relative overflow-hidden" ref={ref}>
      <div className="glow-mesh" />

      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="mb-14 max-w-3xl">
          <p className="text-xs text-console-cool font-mono mb-2">credentials & background</p>
          <h2 className="text-3xl md:text-4xl font-medium text-ink tracking-tight mb-4">
            Education, certifications & honors
          </h2>
          <p className="text-ink-muted text-base leading-relaxed">
            Formal engineering foundation, professional credentials in Java and AI agent systems, and company honors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Degree Card */}
          {educationData.map((edu) => (
            <article
              key={edu.degree}
              className="console-panel p-6 border border-rule flex flex-col justify-between"
              aria-label="Academic degree"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-rule mb-4">
                  <div className="p-2 rounded bg-paper-3 text-console-accent" aria-hidden="true">
                    <FiBookOpen size={16} />
                  </div>
                  <span className="text-xs font-mono text-ink-muted">{edu.duration}</span>
                </div>

                <h3 className="text-lg font-medium text-ink font-display mb-2">
                  {edu.degree}
                </h3>
                <p className="text-xs text-console-cool font-mono mb-1">
                  {edu.institution}
                </p>
                {edu.university && (
                  <p className="text-xs text-ink-muted font-body mb-4">
                    {edu.university}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-rule flex items-center gap-2 text-xs font-mono text-ink-muted">
                <FiMapPin size={13} aria-hidden="true" />
                <span>{edu.location}</span>
              </div>
            </article>
          ))}

          {/* Certifications Card */}
          <article
            className="console-panel p-6 border border-rule flex flex-col justify-between"
            aria-label="Professional certifications"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-rule mb-4">
                <div className="p-2 rounded bg-paper-3 text-console-cool" aria-hidden="true">
                  <FiAward size={16} />
                </div>
                <span className="text-xs font-mono text-console-cool">2026 credentials</span>
              </div>

              <h3 className="text-lg font-medium text-ink font-display mb-4">
                Certifications
              </h3>

              <ul className="space-y-2.5 pl-0 list-none m-0">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-start gap-2.5 text-xs text-ink-muted leading-relaxed">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-console-cool flex-shrink-0" aria-hidden="true" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-rule text-[11px] font-mono text-ink-muted">
              verified across Anthropic, JetBrains & LinkedIn Learning
            </div>
          </article>

          {/* Honors & Languages Card */}
          <article
            className="console-panel p-6 border border-rule flex flex-col justify-between"
            aria-label="Achievements and languages"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-rule mb-4">
                <div className="p-2 rounded bg-paper-3 text-console-ok" aria-hidden="true">
                  <FiAward size={16} />
                </div>
                <span className="text-xs font-mono text-console-ok">recognition</span>
              </div>

              <h3 className="text-lg font-medium text-ink font-display mb-3">
                Honors & additional info
              </h3>

              <div className="space-y-4 mb-6">
                {achievements.map((ach) => (
                  <div key={ach.title} className="p-3 rounded bg-paper-3 border border-rule">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="text-xs font-medium text-ink font-body">{ach.title}</h4>
                      <span className="text-[10px] font-mono text-console-accent">{ach.issuer}</span>
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed font-body">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-rule flex items-center justify-between text-xs font-mono text-ink-muted">
              <span className="flex items-center gap-1.5">
                <FiGlobe size={13} aria-hidden="true" />
                <span>Languages</span>
              </span>
              <span className="text-ink-2 font-body">{languages.join(', ')}</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Education;
