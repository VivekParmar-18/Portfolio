import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  useResponsive,
  useReducedMotion,
  MagneticHover
} from '../../index';
import { useSoundEffects } from '../../utils/soundEffects';

interface CTAButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  enableSounds?: boolean;
  enableMagnetic?: boolean;
}

const CTAButton = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false, 
  loading = false,
  icon,
  className = '',
  enableSounds = false,
  enableMagnetic = true
}: CTAButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isTouchDevice, isMobile } = useResponsive();
  const prefersReducedMotion = useReducedMotion();
  const { playHover, playClick, resumeAudio } = useSoundEffects();

  // Magnetic hover effect - disabled on touch devices
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || isTouchDevice || prefersReducedMotion) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.2; // Reduced intensity
    const deltaY = (e.clientY - centerY) * 0.2;
    
    setMousePosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (enableSounds && !disabled) {
      resumeAudio();
      playHover();
    }
  };

  const handleClick = () => {
    if (enableSounds && !disabled) {
      resumeAudio();
      playClick();
    }
    onClick?.();
  };

  // Button variants for different states with responsive adjustments
  const buttonVariants: Variants = {
    initial: {
      scale: 1,
      x: 0,
      y: 0
    },
    hover: {
      scale: isTouchDevice || prefersReducedMotion ? 1 : 1.05,
      x: isTouchDevice || prefersReducedMotion ? 0 : mousePosition.x,
      y: isTouchDevice || prefersReducedMotion ? 0 : mousePosition.y,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: prefersReducedMotion ? 0.1 : undefined
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: prefersReducedMotion ? 0.05 : 0.1
      }
    }
  };

  // Ripple effect variants
  const rippleVariants: Variants = {
    initial: {
      scale: 0,
      opacity: 0.6
    },
    animate: {
      scale: 4,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Glow effect variants
  const glowVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    hover: {
      opacity: variant === 'primary' ? 0.8 : 0.4,
      scale: 1.2,
      transition: {
        duration: 0.3
      }
    }
  };

  // Loading spinner variants
  const spinnerVariants: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const baseClasses = `
    relative overflow-hidden font-medium 
    transition-all duration-300 flex items-center gap-2 justify-center
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation
    ${isMobile ? 'px-6 py-4 rounded-xl text-base min-h-[56px]' : 'px-8 py-3 rounded-lg'}
    ${className}
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-blue-700 text-white 
      hover:from-blue-500 hover:to-blue-600 
      focus:ring-blue-500
      shadow-lg shadow-blue-500/25
    `,
    secondary: `
      border-2 border-slate-600 text-slate-300 bg-transparent
      hover:border-slate-500 hover:text-white hover:bg-slate-800/50
      focus:ring-slate-500
    `
  };

  const buttonElement = (
    <motion.button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} cursor-interactive`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onMouseMove={!isTouchDevice ? handleMouseMove : undefined}
      onMouseEnter={!isTouchDevice ? handleMouseEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {/* Glow Effect - Disabled on touch devices */}
      {!isTouchDevice && (
        <motion.div
          className={`absolute inset-0 ${isMobile ? 'rounded-xl' : 'rounded-lg'} blur-xl ${
            variant === 'primary' 
              ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
              : 'bg-slate-400'
          }`}
          variants={glowVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        />
      )}

      {/* Ripple Effect */}
      <motion.div
        className={`absolute inset-0 ${isMobile ? 'rounded-xl' : 'rounded-lg'} ${
          variant === 'primary' 
            ? 'bg-white/20' 
            : 'bg-slate-300/20'
        }`}
        variants={rippleVariants}
        initial="initial"
        animate={isHovered && !prefersReducedMotion ? "animate" : "initial"}
      />

      {/* Button Content */}
      <div className="relative z-10 flex items-center gap-2">
        {loading ? (
          <motion.div
            className={`${isMobile ? 'w-6 h-6' : 'w-5 h-5'} border-2 border-current border-t-transparent rounded-full`}
            variants={spinnerVariants}
            animate={prefersReducedMotion ? {} : "animate"}
          />
        ) : (
          icon && <span className={`${isMobile ? 'text-xl' : 'text-lg'}`}>{icon}</span>
        )}
        
        <span className={loading ? 'opacity-70' : ''}>
          {loading ? 'Loading...' : children}
        </span>
      </div>

      {/* Shine Effect - Disabled on touch devices and reduced motion */}
      {!isTouchDevice && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: '200%' } : { x: '-100%' }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );

  // Wrap with magnetic hover if enabled and not on touch devices
  if (enableMagnetic && !isTouchDevice && !disabled) {
    return (
      <MagneticHover strength={0.15}>
        {buttonElement}
      </MagneticHover>
    );
  }

  return buttonElement;
};

export default CTAButton;