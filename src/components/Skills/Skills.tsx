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
      className="py-28 bg-slate-950 relative overflow-hidden"
      ref={ref}
    >
      {/* BG glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(59,130,246,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 50%, rgba(16,185,129,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full"
            style={{
              color: '#34d399',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
              fontFamily: "'Fira Code', monospace",
            }}
          >
            Toolkit
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Skills &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#60a5fa,#34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Tech Stack
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            The technologies I use to build fast, scalable fullstack applications.
          </p>
        </motion.div>

        {/* Staggered grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
                  ? { y: -8, scale: 1.08, transition: { duration: 0.2 } }
                  : {}
              }
              className="group cursor-default"
            >
              <div
                className="relative rounded-2xl p-5 text-center overflow-hidden h-full flex flex-col items-center justify-center gap-3"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(59,130,246,0.35)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(59,130,246,0.06)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(59,130,246,0.12)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                {/* Shimmer on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)',
                  }}
                />

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={tech.icon}
                    alt={`${tech.name} logo`}
                    className="w-10 h-10 object-contain"
                    style={{
                      transition: 'transform 0.3s ease',
                      filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                    }}
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Name */}
                <span
                  className="text-slate-300 text-xs font-semibold group-hover:text-white transition-colors leading-tight text-center"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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