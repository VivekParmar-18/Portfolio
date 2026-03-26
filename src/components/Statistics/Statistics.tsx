import { motion } from 'framer-motion';
import { AnimatedCounter, ScrollReveal } from '../../index';
import { statisticsData } from '../../data/statisticsData';

const Statistics = () => {
  return (
    <ScrollReveal direction="up" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h3 
          className="text-3xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          By the Numbers
        </motion.h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statisticsData.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="text-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-blue-400/50 transition-all duration-300"
            >
              {/* Icon */}
              <motion.div 
                className="text-4xl mb-4"
                whileHover={{ 
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {stat.icon}
              </motion.div>
              
              {/* Animated Counter */}
              <div className="text-4xl font-bold text-white mb-2">
                <AnimatedCounter
                  end={stat.value}
                  duration={2.5}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  decimals={stat.decimals}
                />
              </div>
              
              {/* Label */}
              <p className="text-slate-300 text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
};

export default Statistics;