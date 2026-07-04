import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef, useState } from 'react';
import { personal } from '../../data/personalData';
import { FiDatabase, FiShield, FiCpu, FiCloud, FiLayers, FiActivity, FiCoffee, FiFeather, FiTool } from 'react-icons/fi';

const EASE = [0.22, 1, 0.36, 1] as const;

const javaSkills = [
  { category: 'Core Java', icon: FiCoffee, color: '#E85D24', iconClass: 'bg-orange-500/10 text-orange-400', skills: ['Java 8+', 'OOP Principles', 'Collections Framework', 'Multithreading', 'Exception Handling', 'Stream API'] },
  { category: 'Spring Ecosystem', icon: FiFeather, color: '#6DB33F', iconClass: 'bg-orange-500/10 text-orange-400', skills: ['Spring Boot', 'Spring MVC', 'Spring Security', 'Spring Data JPA', 'Spring Cloud', 'REST APIs'] },
  { category: 'Database & ORM', icon: FiDatabase, color: '#3B82F6', iconClass: 'bg-blue-500/10 text-blue-400', skills: ['MySQL', 'SQL', 'Hibernate', 'JPA', 'Query Optimization', 'Schema Design'] },
  { category: 'DevOps & Tools', icon: FiTool, color: '#3B82F6', iconClass: 'bg-blue-500/10 text-blue-400', skills: ['GitHub Actions', 'Jenkins', 'Maven', 'Docker', 'Git', 'Swagger/OpenAPI'] },
];

const architectureSteps = [
  {
    id: 'gateway',
    title: 'Security Gateway',
    icon: <FiShield />,
    tech: 'Spring Security + JWT',
    desc: 'Implementing stateless authentication and RBAC to protect enterprise resources.',
    color: '#3B82F6'
  },
  {
    id: 'service',
    title: 'Business Logic',
    icon: <FiCpu />,
    tech: 'Spring Boot Services',
    desc: 'Crafting clean, maintainable services with proper dependency injection and SOLID principles.',
    color: '#6DB33F'
  },
  {
    id: 'data',
    title: 'Data Persistence',
    icon: <FiDatabase />,
    tech: 'Spring Data JPA',
    desc: 'Optimized ORM mapping and connection pooling for high-concurrency database operations.',
    color: '#E85D24'
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    icon: <FiCloud />,
    tech: 'AWS / Docker',
    desc: 'Containerizing services for consistent deployments and scalability in cloud environments.',
    color: '#3B82F6'
  }
];

const JavaExpertise = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeStep, setActiveStep] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Roving-focus arrow-key navigation for the architecture tabs
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (index + 1) % architectureSteps.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (index - 1 + architectureSteps.length) % architectureSteps.length;
    if (next !== null) {
      e.preventDefault();
      setActiveStep(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section id="java-expertise" className="py-24 md:py-32 2xl:py-40 bg-[#020617] relative overflow-hidden" ref={ref}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-orange-600/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-20"
        >
          <span className="flex items-center justify-center gap-3 mb-5">
            <span className="w-6 h-px bg-blue-500/40" aria-hidden="true" />
            <span className="text-[11px] tracking-[0.25em] uppercase text-blue-400" style={{ fontFamily: "'Fira Code', monospace" }}>
              Backend Architecture
            </span>
            <span className="w-6 h-px bg-blue-500/40" aria-hidden="true" />
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Java & Spring Boot Expertise
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Building and maintaining Java 17 and Spring Boot services for an enterprise US healthcare platform at <span className="text-white font-medium underline decoration-orange-500/30 underline-offset-4">{personal.company}</span>.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div 
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20 md:mb-24"
          role="list"
          aria-label="Core Java and Spring Boot technical skills"
        >
          {javaSkills.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -4, background: 'rgba(255,255,255,0.04)', transition: { duration: 0.25, ease: EASE } }}
              className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/[0.05] transition-all duration-300 h-full"
              role="listitem"
            >
              <motion.article aria-labelledby={`cat-title-${i}`}>
                <div className={`w-10 h-10 mb-3 md:mb-4 rounded-xl flex items-center justify-center ${cat.iconClass}`} aria-hidden="true">
                  <cat.icon size={18} />
                </div>
                <h3 id={`cat-title-${i}`} className="text-white font-bold mb-3 text-[10px] md:text-sm uppercase tracking-widest leading-tight">{cat.category}</h3>
                <ul className="space-y-1.5 md:space-y-2" aria-label={`${cat.category} specialized skills`}>
                  {cat.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-slate-500 text-[9px] md:text-xs leading-tight">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: cat.color }} aria-hidden="true" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </motion.div>
          ))}
        </div>

        {/* Interactive Architecture Visualization */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Diagram */}
          <div className="lg:col-span-5 relative w-full overflow-hidden">
            <div className="flex flex-col gap-3" role="tablist" aria-label="Architecture layers">
              {architectureSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  type="button"
                  ref={(el: HTMLButtonElement | null) => { tabRefs.current[index] = el; }}
                  role="tab"
                  aria-selected={activeStep === index}
                  aria-controls={`step-panel-${index}`}
                  id={`step-tab-${index}`}
                  tabIndex={activeStep === index ? 0 : -1}
                  className={`cursor-pointer w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                    activeStep === index
                      ? 'bg-white/[0.05] border-white/20'
                      : 'bg-transparent border-white/5 hover:border-white/10'
                  }`}
                  onClick={() => setActiveStep(index)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.08, ease: EASE }}
                >
                  {/* Active Progress Bar (Mobile) */}
                  {activeStep === index && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-orange-500 to-red-500"
                      layoutId="activeIndicator"
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl transition-colors ${
                      activeStep === index ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-slate-500'
                    }`} aria-hidden="true">
                      {step.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-sm truncate transition-colors ${activeStep === index ? 'text-white' : 'text-slate-500'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono truncate">{step.tech}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: Detailed Insight Display */}
          <div className="lg:col-span-7 w-full overflow-hidden">
            <div 
              className="relative bg-white/[0.02] border border-white/[0.05] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 min-h-[320px] md:min-h-[400px] flex flex-col justify-center font-sans box-border"
              role="tabpanel"
              id={`step-panel-${activeStep}`}
              aria-labelledby={`step-tab-${activeStep}`}
            >
              {/* Visual Accent */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] hidden md:block" aria-hidden="true">
                <FiActivity size={120} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 text-orange-500 mb-2">
                    <FiLayers size={18} aria-hidden="true" />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] font-mono">Backend Architecture</span>
                  </div>
                  <h3 className="text-2xl md:text-5xl font-bold text-white leading-tight">
                    How I Build <span className="text-orange-400">{architectureSteps[activeStep].title}</span>
                  </h3>
                  <p className="text-slate-400 text-base md:text-xl font-light leading-relaxed max-w-2xl">
                    {architectureSteps[activeStep].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6" aria-label="Key performance indicators">
                    <div className="p-4 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5">
                      <p className="text-[9px] text-slate-500 font-bold uppercase mb-1 tracking-widest">Key KPI</p>
                      <p className="text-white text-sm md:text-base font-medium">High Availability</p>
                    </div>
                    <div className="p-4 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5">
                      <p className="text-[9px] text-slate-500 font-bold uppercase mb-1 tracking-widest">Implementation</p>
                      <p className="text-white text-sm md:text-base font-medium">Enterprise Grade</p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={() => setActiveStep((activeStep + 1) % architectureSteps.length)}
                      className="flex items-center gap-2 text-sm font-bold text-white hover:text-orange-400 transition-colors group uppercase tracking-widest"
                      aria-label={`Show next architecture layer: ${architectureSteps[(activeStep + 1) % architectureSteps.length].title}`}
                    >
                      Next layer: {architectureSteps[(activeStep + 1) % architectureSteps.length].title}
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }} aria-hidden="true">→</motion.span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JavaExpertise;