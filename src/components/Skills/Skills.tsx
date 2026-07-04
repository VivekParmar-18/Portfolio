import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skillTiers } from '../../data/skillsData';
import { useReducedMotion } from '../../hooks/useResponsive';

const EASE = [0.22, 1, 0.36, 1] as const;

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="py-24 md:py-32 2xl:py-40 relative overflow-hidden"
      ref={ref}
    >
      {/* BG glows */}
      <div className="glow-mesh" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-16"
        >
          <span className="flex items-center justify-center gap-3 mb-5">
            <span className="w-6 h-px bg-blue-500/40" aria-hidden="true" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-blue-400" style={{ fontFamily: "'Fira Code', monospace" }}>
              Tooling
            </span>
            <span className="w-6 h-px bg-blue-500/40" aria-hidden="true" />
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Skills
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Grouped by how often each tool earns its place in my day — not a wall of logos.
          </p>
        </motion.div>

        {/* Tiered stack */}
        <div className="space-y-5" aria-label="Technical skills grouped by depth">
          {skillTiers.map((tier, tierIndex) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0.1 : 0.6,
                delay: prefersReducedMotion ? 0 : tierIndex * 0.08,
                ease: EASE,
              }}
              className="glass-card border-white/5 p-6 md:p-8 lg:flex lg:items-start lg:gap-10"
              style={{ borderRadius: 20 }}
            >
              {/* Tier label */}
              <div className="lg:w-[220px] flex-shrink-0 mb-5 lg:mb-0">
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-[11px] text-slate-600"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                    aria-hidden="true"
                  >
                    {String(tierIndex + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                    {tier.title}
                  </h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mt-2">{tier.desc}</p>
              </div>

              {/* Chips */}
              <ul className="flex flex-wrap gap-2.5 flex-1 m-0 p-0 list-none" aria-label={`${tier.title} technologies`}>
                {tier.items.map((item) => (
                  <li key={item.name}>
                    <span
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm text-slate-300 bg-white/[0.03] border border-white/[0.07] hover:border-blue-500/40 hover:bg-blue-500/[0.06] hover:text-white cursor-default"
                      style={{ transition: 'all var(--dur-micro, 0.35s) var(--ease-brand, ease-out)' }}
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt=""
                          aria-hidden="true"
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain"
                          loading="lazy"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
