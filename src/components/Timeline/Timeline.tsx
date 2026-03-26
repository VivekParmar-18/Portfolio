import { motion } from 'framer-motion';
import { useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import type { WorkExperience } from '../../types/types';

interface TimelineProps {
  experiences: WorkExperience[];
}

const Timeline = ({ experiences }: TimelineProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 10
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto">
      {/* Timeline Line */}
      <motion.div
        className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-blue-500 to-emerald-500"
        initial={{ height: 0 }}
        animate={isIntersecting ? { height: '100%' } : { height: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        className="space-y-12"
      >
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative flex items-start group"
            onHoverStart={() => setExpandedIndex(index)}
            onHoverEnd={() => setExpandedIndex(null)}
          >
            {/* Timeline Point */}
            <motion.div
              variants={badgeVariants}
              animate={isIntersecting ? ["visible", "pulse"] : "hidden"}
              className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">
                  {index + 1}
                </span>
              </div>
            </motion.div>

            {/* Experience Card */}
            <motion.div
              className="ml-8 flex-1 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.1)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {experience.position}
                  </h3>
                  <p className="text-blue-400 font-semibold">
                    {experience.company}
                  </p>
                </div>
                <span className="text-emerald-400 font-medium mt-2 md:mt-0">
                  {experience.duration}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-300 mb-4 leading-relaxed">
                {experience.description}
              </p>

              {/* Achievements */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedIndex === index ? 'auto' : 0,
                  opacity: expandedIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <h4 className="text-white font-semibold mb-3">Key Achievements:</h4>
                <ul className="space-y-2 mb-4">
                  {experience.achievements.map((achievement: string, achIndex: number) => (
                    <motion.li
                      key={achIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: achIndex * 0.1 }}
                      className="flex items-start text-slate-300"
                    >
                      <span className="text-emerald-400 mr-2 mt-1">•</span>
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech: string, techIndex: number) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: techIndex * 0.05 }}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Hover Indicator */}
              <motion.div
                className="absolute top-4 right-4 text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: expandedIndex === index ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xs">Click to expand</span>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;