import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personal } from '../../data/personalData';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiBriefcase, FiCalendar } from 'react-icons/fi';
import Statistics from '../Statistics/Statistics';

const traits = [
  { title: 'Problem Solver', desc: 'Breaking complex challenges into elegant, maintainable solutions.', icon: '🧩', accent: '#3B82F6' },
  { title: 'Team Player', desc: 'Collaboration and knowledge sharing are how great software gets built.', icon: '🤝', accent: '#10B981' },
  { title: 'Continuous Learner', desc: "Technology evolves rapidly — I stay ahead of the curve.", icon: '📚', accent: '#8B5CF6' },
  { title: 'Quality First', desc: 'Clean, maintainable code and delightful UX are non-negotiable.', icon: '⚡', accent: '#F59E0B' },
];

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section id="about" className="py-24 bg-[#020817] relative overflow-hidden" ref={ref}>
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-24"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono">
              The Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
              Turning Complexity Into <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Simplicity</span>
            </h2>
          </motion.div>

          {/* Main Layout: Story + Profile Card */}
          <motion.div variants={containerVariants} className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Biography (7 cols) */}
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-blue-500/50" />
                  My Story
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  I'm a fullstack developer with a passion for building robust applications that solve real-world problems. Currently carving out digital solutions at <span className="text-white font-medium underline decoration-blue-500/50 underline-offset-4">{personal.company}</span>.
                </p>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  My architecture philosophy revolves around <span className="text-blue-400 font-medium">Java Spring Boot</span> backends that offer industrial-strength reliability, paired with <span className="text-indigo-400 font-medium">React</span> frontends that provide fluid, modern user experiences.
                </p>
                <p className="text-slate-400 text-lg leading-relaxed font-light">
                  I thrive in environments that value clean code, performance optimization, and cross-functional collaboration. Whether it's designing a RESTful API or refining a CSS layout, I aim for excellence in every pixel and every line of code.
                </p>
              </div>

              {/* Social Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                {[
                  { icon: FiGithub, href: personal.github, label: 'Explore Code' },
                  { icon: FiLinkedin, href: personal.linkedin, label: 'Professional' },
                  { icon: FiMail, href: `mailto:${personal.email}`, label: 'Get in Touch' },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-400 hover:text-white transition-all bg-white/[0.03] border border-white/[0.06] hover:border-blue-500/40 hover:bg-blue-500/5 text-sm font-medium">
                    <Icon className="group-hover:scale-110 transition-transform" /> {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Profile Side (5 cols) */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
              {/* Profile Card */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity blur" />
                <div className="relative bg-[#0a1120] rounded-3xl p-8 border border-white/5 space-y-6 overflow-hidden">
                   {/* Abstract Pattern overlay */}
                   <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                     <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                       <circle cx="50" cy="50" r="40" strokeWidth="1" strokeDasharray="4 4" />
                       <circle cx="50" cy="50" r="25" strokeWidth="1" />
                     </svg>
                   </div>

                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-blue-500/20 shadow-xl shadow-blue-500/10">
                      <img src={personal.profileImage} alt={personal.name} className="w-full h-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${personal.name}&background=1E3A8A&color=fff&size=128`;
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{personal.name}</h4>
                      <div className="flex items-center gap-2 text-blue-400 text-xs font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Available for Projects
                      </div>
                    </div>
                  </div>

                  {/* Info List */}
                  <div className="space-y-4">
                    {[
                      { icon: FiBriefcase, label: 'Role', value: personal.title },
                      { icon: FiMapPin, label: 'Location', value: personal.location },
                      { icon: FiCalendar, label: 'Experience', value: `${personal.yearsOfExperience}+ Productive Years` },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-blue-400">
                          <item.icon size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{item.label}</p>
                          <p className="text-slate-200 text-sm font-medium">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Statistics Section Integration */}
          <motion.div variants={itemVariants} className="pt-12 border-t border-white/[0.05]">
            <Statistics />
          </motion.div>

          {/* Traits: The Philosophy */}
          <motion.div variants={containerVariants} className="space-y-12">
            <motion.div variants={itemVariants} className="max-w-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">Core Principles</h3>
              <p className="text-slate-400 leading-relaxed font-light">
                Great software is more than just code. It's about mindset, process, and a commitment to creating value. Here's what I bring to every team.
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {traits.map((t) => (
                <motion.div
                  key={t.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Hover Accent Glow */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="text-3xl mb-4 p-3 inline-block rounded-2xl bg-white/[0.03] group-hover:bg-blue-500/10 transition-colors">
                    {t.icon}
                  </div>
                  <h4 className="text-white font-bold mb-3 text-lg leading-tight">{t.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{t.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
