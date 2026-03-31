import { motion } from 'framer-motion';
import AnimatedCounter from '../AnimatedCounter/AnimatedCounter';
import { statisticsData } from '../../data/statisticsData';

const Statistics = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.h3 
        className="text-2xl font-bold text-white text-center mb-12"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="text-center p-6 bg-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/[0.05] hover:border-blue-500/30 transition-all duration-300 group"
          >
            {/* Icon */}
            <div 
              className="text-4xl mb-4 p-4 inline-block rounded-2xl bg-white/[0.03] group-hover:bg-blue-500/10 transition-colors"
            >
              {stat.icon}
            </div>
            
            {/* Animated Counter */}
            <div className="text-4xl font-bold text-white mb-2 font-mono">
              <AnimatedCounter
                end={stat.value}
                duration={2.5}
                suffix={stat.suffix}
                prefix={stat.prefix}
                decimals={stat.decimals}
              />
            </div>
            
            {/* Label */}
            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold group-hover:text-blue-400/80 transition-colors">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;