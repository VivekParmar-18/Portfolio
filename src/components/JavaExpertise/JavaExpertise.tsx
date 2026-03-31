import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { personal } from '../../data/personalData';
import { FiDatabase, FiShield, FiCpu, FiCloud, FiLayers, FiActivity } from 'react-icons/fi';

const javaSkills = [
  { category: 'Core Java', icon: '☕', color: '#E85D24', skills: ['Java 8+', 'OOP Principles', 'Collections Framework', 'Multithreading', 'Exception Handling', 'Stream API'] },
  { category: 'Spring Ecosystem', icon: '🍃', color: '#6DB33F', skills: ['Spring Boot', 'Spring MVC', 'Spring Security', 'Spring Data JPA', 'Spring Cloud', 'REST APIs'] },
  { category: 'Database & ORM', icon: '🗄️', color: '#3B82F6', skills: ['MySQL', 'PostgreSQL', 'Hibernate', 'JPA', 'Query Optimization', 'Schema Design'] },
  { category: 'DevOps & Tools', icon: '🛠️', color: '#8B5CF6', skills: ['Maven', 'Gradle', 'Docker', 'Git', 'IntelliJ IDEA', 'Swagger/OpenAPI'] },
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
    color: '#8B5CF6'
  }
];

const JavaExpertise = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="java-expertise" className="py-28 bg-[#020617] relative overflow-hidden" ref={ref}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-orange-600/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono">
            Backend Architecture
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            Java & Spring Boot <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Building industrial-strength backends with Java. Specializing in high-availability services and scalable microarchitecture at <span className="text-white font-medium underline decoration-orange-500/30 underline-offset-4">{personal.company}</span>.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20 md:mb-24">
          {javaSkills.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, background: 'rgba(255,255,255,0.04)' }}
              className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/[0.02] border border-white/[0.05] transition-all duration-300 h-full"
            >
              <div className="text-xl md:text-3xl mb-3 md:mb-4">{cat.icon}</div>
              <h3 className="text-white font-bold mb-3 text-[10px] md:text-sm uppercase tracking-widest leading-tight">{cat.category}</h3>
              <ul className="space-y-1.5 md:space-y-2">
                {cat.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-slate-500 text-[9px] md:text-xs leading-tight">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Interactive Architecture Visualization */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Diagram */}
          <div className="lg:col-span-5 relative w-full overflow-hidden">
            <div className="flex flex-col gap-3">
              {architectureSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                    activeStep === index
                      ? 'bg-white/[0.05] border-white/20'
                      : 'bg-transparent border-white/5 hover:border-white/10'
                  }`}
                  onClick={() => setActiveStep(index)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {/* Active Progress Bar (Mobile) */}
                  {activeStep === index && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-orange-500 to-red-500"
                      layoutId="activeIndicator"
                    />
                  )}

                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl transition-colors ${
                      activeStep === index ? 'bg-orange-500/20 text-orange-400' : 'bg-white/5 text-slate-500'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-sm truncate transition-colors ${activeStep === index ? 'text-white' : 'text-slate-500'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[9px] uppercase tracking-wider text-slate-600 font-mono truncate">{step.tech}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Detailed Insight Display */}
          <div className="lg:col-span-7 w-full overflow-hidden">
            <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 min-h-[320px] md:min-h-[400px] flex flex-col justify-center font-sans box-border">
              {/* Visual Accent */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] hidden md:block">
                <FiActivity size={120} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 text-orange-500 mb-2">
                    <FiLayers size={18} />
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] font-mono">System Architecture</span>
                  </div>
                  <h3 className="text-2xl md:text-5xl font-bold text-white leading-tight">
                    How I Build <span className="text-orange-400">{architectureSteps[activeStep].title}</span>
                  </h3>
                  <p className="text-slate-400 text-base md:text-xl font-light leading-relaxed max-w-2xl">
                    {architectureSteps[activeStep].desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6">
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
                    <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-orange-400 transition-colors group uppercase tracking-widest">
                      Explore Layer Architecture
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>→</motion.span>
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