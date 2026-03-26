import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedIconProps {
  className?: string;
  size?: number;
  color?: string;
  animate?: boolean;
}

// Animated Arrow Icon
export const AnimatedArrow: React.FC<AnimatedIconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  animate = true
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={animate ? {
      x: [0, 5, 0],
    } : {}}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <motion.path
      d="M5 12h14m-7-7l7 7-7 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  </motion.svg>
);

// Animated Code Icon
export const AnimatedCode: React.FC<AnimatedIconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  animate = true
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    whileHover={animate ? { scale: 1.1 } : {}}
  >
    <motion.path
      d="M16 18l6-6-6-6M8 6l-6 6 6 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  </motion.svg>
);

// Animated Heart Icon (for likes/favorites)
export const AnimatedHeart: React.FC<AnimatedIconProps & { filled?: boolean }> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  animate = true,
  filled = false
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? color : "none"}
    className={className}
    whileHover={animate ? { scale: 1.2 } : {}}
    whileTap={animate ? { scale: 0.9 } : {}}
    animate={animate && filled ? {
      scale: [1, 1.2, 1],
    } : {}}
    transition={{
      duration: 0.6,
      ease: "easeInOut",
    }}
  >
    <motion.path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  </motion.svg>
);

// Animated Star Icon
export const AnimatedStar: React.FC<AnimatedIconProps & { filled?: boolean }> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  animate = true,
  filled = false
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? color : "none"}
    className={className}
    whileHover={animate ? { 
      rotate: 180,
      scale: 1.1 
    } : {}}
    transition={{ duration: 0.3 }}
  >
    <motion.path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    />
  </motion.svg>
);

// Animated Loading Spinner
export const AnimatedSpinner: React.FC<AnimatedIconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor'
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="4"
      strokeOpacity="0.3"
    />
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="31.416"
      initial={{ strokeDashoffset: 31.416 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.svg>
);

// Animated Check Icon
export const AnimatedCheck: React.FC<AnimatedIconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  animate = true
}) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    initial={animate ? { scale: 0 } : { scale: 1 }}
    animate={animate ? { scale: 1 } : {}}
    transition={animate ? { duration: 0.3, type: "spring", stiffness: 300 } : {}}
  >
    <motion.path
      d="M20 6L9 17l-5-5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
      animate={animate ? { pathLength: 1 } : {}}
      transition={animate ? { duration: 0.5, ease: "easeInOut", delay: 0.2 } : {}}
    />
  </motion.svg>
);

// Animated Floating Elements (decorative)
export const FloatingElements: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, Math.random() * 20 - 10, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

export default {
  AnimatedArrow,
  AnimatedCode,
  AnimatedHeart,
  AnimatedStar,
  AnimatedSpinner,
  AnimatedCheck,
  FloatingElements,
};