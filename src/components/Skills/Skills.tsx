import { useInView } from 'react-intersection-observer';
import { skillTiers } from '../../data/skillsData';

const Skills = () => {
  const [ref] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="skills" className="pt-12 md:pt-16 pb-20 md:pb-24 relative overflow-hidden" ref={ref}>
      <div className="glow-mesh" />

      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="mb-14 max-w-3xl">
          <p className="text-xs text-console-cool font-mono mb-2">technical capabilities</p>
          <h2 className="text-3xl md:text-4xl font-medium text-ink tracking-tight mb-4">
            Technical skills & engineering stack
          </h2>
          <p className="text-ink-muted text-base leading-relaxed">
            Production daily drivers, data persistence architectures, security protocols, and quality tooling used across enterprise production systems.
          </p>
        </div>

        {/* Tiered Stack List */}
        <div className="space-y-4" role="list" aria-label="Technical skills grouped by architecture domain">
          {skillTiers.map((tier, index) => (
            <article
              key={tier.title}
              role="listitem"
              className="console-panel p-5 md:p-6 border border-rule flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
            >
              {/* Domain header */}
              <div className="md:w-64 flex-shrink-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono text-console-accent" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3 className="text-base font-medium text-ink font-body">
                    {tier.title}
                  </h3>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed font-body">
                  {tier.desc}
                </p>
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2 flex-1" aria-label={`${tier.title} technologies`}>
                {tier.items.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-paper-3 border border-rule text-xs text-ink-2 font-mono transition-colors hover:border-rule-2 hover:text-ink cursor-default"
                  >
                    {item.icon && (
                      <img
                        src={item.icon}
                        alt=""
                        aria-hidden="true"
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <span>{item.name}</span>
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

export default Skills;
