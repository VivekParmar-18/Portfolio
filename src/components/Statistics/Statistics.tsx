import { motion } from 'framer-motion';
import { FiCalendar, FiServer, FiFileText, FiUsers, FiTrendingUp } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import AnimatedCounter from '../AnimatedCounter/AnimatedCounter';
import { statisticsData } from '../../data/statisticsData';

const EASE = [0.22, 1, 0.36, 1] as const;

// Component-side icon mapping keeps the data layer presentation-free.
const statIcons: Record<string, IconType> = {
  experience: FiCalendar,
  apis: FiServer,
  orders: FiFileText,
  organizations: FiUsers,
};

const Statistics = () => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.h3
        className="text-2xl font-bold text-white text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        viewport={{ once: true, margin: '-80px' }}
      >
        By the Numbers
      </motion.h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        {statisticsData.map((stat, index) => {
          const Icon = statIcons[stat.id] ?? FiTrendingUp;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: EASE
                }
              }}
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{
                y: -4,
                transition: { duration: 0.25, ease: EASE }
              }}
              className="text-center p-6 bg-white/[0.02] rounded-3xl border border-white/[0.05] hover:border-blue-500/30 transition-all duration-300 group"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 mb-4 mx-auto rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors"
                aria-hidden="true"
              >
                <Icon size={18} />
              </div>

              {/* Animated Counter */}
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2 font-mono" style={{ fontVariantNumeric: 'tabular-nums' }}>
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
          );
        })}
      </div>
    </div>
  );
};

export default Statistics;
