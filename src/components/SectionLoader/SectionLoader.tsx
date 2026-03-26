import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionLoaderProps {
  isLoading: boolean;
  message?: string;
  variant?: 'dots' | 'pulse' | 'wave' | 'spiral';
  className?: string;
}

const LoadingVariants = {
  dots: () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  ),
  
  pulse: () => (
    <motion.div
      className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ),
  
  wave: () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
          animate={{
            height: [20, 40, 20],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  ),
  
  spiral: () => (
    <motion.div
      className="w-12 h-12 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  ),
};

export const SectionLoader: React.FC<SectionLoaderProps> = ({
  isLoading,
  message = "Loading...",
  variant = 'dots',
  className = ''
}) => {
  const LoadingComponent = LoadingVariants[variant];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col items-center space-y-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <LoadingComponent />
            
            {message && (
              <motion.p
                className="text-white/80 text-sm font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {message}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionLoader;