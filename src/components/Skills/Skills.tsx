import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skillsData } from '../../data/skillsData';
import type { Technology } from '../../types/types';
import { useReducedMotion } from '../../hooks/useResponsive';

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="py-32 relative overflow-hidden"
      ref={ref}
    >
      {/* BG glows */}
      <div className="glow-mesh" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <span
            className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase mb-6 px-5 py-2 rounded-full"
            style={{
              color: '#34d399',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.15)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Capabilities
          </span>
          <h2
            className="text-4xl md:text-7xl font-extrabold text-white mb-8"
            style={{ letterSpacing: '-0.05em', fontFamily: 'var(--font-display)' }}
          >
            The Technical <span className="premium-gradient-text">Ecosystem</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            A curated selection of tools and frameworks I've mastered to bridge the gap between complex logic and human-centric design.
          </p>
        </motion.div>

        {/* Staggered grid */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5"
          aria-label="Technical Skills and Frameworks"
        >
          {skillsData.map((tech: Technology, i: number) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: prefersReducedMotion ? 0.1 : 0.4,
                delay: prefersReducedMotion ? 0 : i * 0.04,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={
                !prefersReducedMotion
                  ? { y: -8, scale: 1.05, transition: { duration: 0.2 } }
                  : {}
              }
              className="group cursor-default"
              aria-label={`${tech.name} proficiency`}
            >
              <div
                className="glass-card relative p-6 text-center overflow-hidden h-full flex flex-col items-center justify-center gap-4 border-white/5 group-hover:border-blue-500/30 group-hover:bg-blue-500/5 transition-all duration-500"
              >
                {/* Shimmer on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, transparent 100%)',
                  }}
                />

                {/* Icon */}
                <div className="w-14 h-14 flex items-center justify-center">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Name */}
                <span
                  className="text-slate-300 text-sm font-bold group-hover:text-white transition-colors leading-tight text-center"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {tech.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom fade-in note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: skillsData.length * 0.04 + 0.2 }}
          className="text-center text-slate-600 text-sm mt-12"
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          +{' '}
          <span className="text-slate-500">
            Maven · Gradle · IntelliJ · Postman · Linux
          </span>{' '}
          & more
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;