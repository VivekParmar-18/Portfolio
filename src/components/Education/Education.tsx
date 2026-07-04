import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiBookOpen, FiCalendar, FiMapPin } from 'react-icons/fi';
import { educationData, certifications } from '../../data/educationData';

const EASE = [0.22, 1, 0.36, 1] as const;

const Education = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="education" className="py-24 md:py-32 2xl:py-40 relative overflow-hidden" ref={ref}>
      <div className="glow-mesh opacity-50" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
              Education
            </span>
            <span className="w-6 h-px bg-blue-500/40" aria-hidden="true" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Degree & Certification
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Degree card(s) */}
          {educationData.map((edu, index) => (
            <motion.article
              key={edu.degree}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 + index * 0.08, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE } }}
              className="glass-card p-8 border-white/5 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden h-full"
              aria-labelledby={`education-degree-${index}`}
            >
              <div className="absolute top-0 left-0 right-0 h-1" aria-hidden="true" style={{ background: 'linear-gradient(90deg, #3B82F6, transparent)' }} />
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6" aria-hidden="true">
                <FiBookOpen size={22} />
              </div>
              <h3 id={`education-degree-${index}`} className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {edu.degree}
              </h3>
              <p className="text-blue-400 font-medium mb-1">{edu.institution}</p>
              {edu.university && <p className="text-slate-400 text-sm mb-4">{edu.university}</p>}
              <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1.5">
                  <FiCalendar size={14} aria-hidden="true" />
                  {edu.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMapPin size={14} aria-hidden="true" />
                  {edu.location}
                </span>
              </div>
            </motion.article>
          ))}

          {/* Certification card */}
          <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE } }}
            className="glass-card p-8 border-white/5 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden h-full"
            aria-labelledby="education-certifications"
          >
            <div className="absolute top-0 left-0 right-0 h-1" aria-hidden="true" style={{ background: 'linear-gradient(90deg, #3B82F6, transparent)' }} />
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6" aria-hidden="true">
              <FiAward size={22} />
            </div>
            <h3 id="education-certifications" className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Certifications
            </h3>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" aria-hidden="true" />
                  {cert}
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default Education;
