import { 
  PageTransition, 
  Navigation, 
  ScrollReveal, 
  Statistics,
  Timeline,
  useSEO
} from '../index';
import { experienceData } from '../data/experienceData';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const About = () => {
  const [, setActivePersonalityTab] = useState(0);

  // SEO optimization for about page
  const { updateSEO } = useSEO();
  
  useEffect(() => {
    updateSEO({
      title: 'About Vivek Parmar - My Journey & Experience',
      description: 'Learn about my journey as a Java developer, my experience at Techforce InfoTech PVT LTD, and the technologies I work with including Spring Boot, React.js, and modern web development.',
      keywords: ['about vivek parmar', 'java developer journey', 'techforce infotech experience', 'spring boot react developer', 'software engineer background']
    });
  }, [updateSEO]);

  const personalityTraits = [
    {
      title: "Problem Solver",
      description: "I love breaking down complex problems into manageable pieces and finding elegant solutions.",
      icon: "🧩",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Team Player",
      description: "Collaboration and knowledge sharing are key to building great software products.",
      icon: "🤝",
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Continuous Learner",
      description: "Technology evolves rapidly, and I'm always eager to learn new tools and techniques.",
      icon: "📚",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Quality Focused",
      description: "Clean, maintainable code and great user experiences are my top priorities.",
      icon: "⚡",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  About Me
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  Java Developer with experience at Techforce InfoTech PVT LTD.
                  Passionate about creating modern, responsive web applications with clean code and great user experiences.
                </p>
              </div>
            </ScrollReveal>

            {/* Split Layout - Bio and Image */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <ScrollReveal direction="left">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    My Journey
                  </h2>
                  <div className="space-y-4 text-slate-300 leading-relaxed">
                    <p>
                      I'm a passionate Java developer currently working as an Associate Software Developer 
                      at Techforce InfoTech PVT LTD, where I've been building enterprise applications since August 2024.
                    </p>
                    <p>
                      My expertise spans across Java Spring Boot for robust backend services and React.js 
                      with TypeScript for creating engaging user interfaces. I love the challenge of 
                      building scalable applications that solve real-world problems.
                    </p>
                    <p>
                      When I'm not coding, you'll find me exploring new technologies, contributing to 
                      open-source projects, or sharing knowledge with fellow developers.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="relative">
                  <motion.div
                    className="relative z-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-slate-700/50"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl">
                        👨‍💻
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Associate Software Developer
                      </h3>
                      <p className="text-blue-400 mb-4">Techforce InfoTech PVT LTD</p>
                      <div className="flex justify-center space-x-4 text-sm text-slate-300">
                        <span>📍 Ahmedabad</span>
                        <span>💼 2+ Years</span>
                        <span>🎯 Fullstack</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-60"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-emerald-500 rounded-full opacity-60"
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [360, 180, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <Statistics />

        {/* Personality Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal direction="up">
              <h2 className="text-4xl font-bold text-white text-center mb-16">
                What Drives Me
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personalityTraits.map((trait, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                  <motion.div
                    className="relative group cursor-pointer"
                    onHoverStart={() => setActivePersonalityTab(index)}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${trait.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`} />
                    
                    <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-300">
                      <motion.div
                        className="text-4xl mb-4 text-center"
                        whileHover={{ 
                          scale: 1.2,
                          rotate: [0, -10, 10, 0]
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {trait.icon}
                      </motion.div>
                      
                      <h3 className="text-lg font-bold text-white text-center mb-3">
                        {trait.title}
                      </h3>
                      
                      <motion.p
                        className="text-slate-300 text-sm text-center leading-relaxed"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {trait.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Elements Demo */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Interactive Experience
                </h2>
                <p className="text-slate-300 text-lg">
                  Experience the enhanced micro-interactions throughout this portfolio
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              <ScrollReveal direction="left">
                <motion.div
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 text-center cursor-interactive"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-white font-semibold mb-2">Cursor Following</h3>
                  <p className="text-slate-300 text-sm">
                    Custom cursor that follows your mouse and reacts to interactive elements
                  </p>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal direction="up">
                <motion.div
                  className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20 text-center cursor-interactive"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="text-4xl mb-4">🧲</div>
                  <h3 className="text-white font-semibold mb-2">Magnetic Hover</h3>
                  <p className="text-slate-300 text-sm">
                    Elements that subtly follow your cursor when you hover over them
                  </p>
                </motion.div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <motion.div
                  className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 text-center cursor-interactive"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-white font-semibold mb-2">Smooth Animations</h3>
                  <p className="text-slate-300 text-sm">
                    Carefully crafted animations that enhance the user experience
                  </p>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <ScrollReveal direction="up">
              <h2 className="text-4xl font-bold text-white text-center mb-16">
                My Experience
              </h2>
            </ScrollReveal>
            
            <Timeline experiences={experienceData} />
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;