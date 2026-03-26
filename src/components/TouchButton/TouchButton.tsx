import { motion } from 'framer-motion';
import { useState } from 'react';
import { useResponsive, useReducedMotion } from '../../hooks/useResponsive';
import { useLongPress } from '../../hooks/useSwipeGesture';

interface TouchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onLongPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  hapticFeedback?: boolean;
}

const TouchButton: React.FC<TouchButtonProps> = ({
  children,
  onClick,
  onLongPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  hapticFeedback = true
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const { isTouchDevice } = useResponsive();
  const prefersReducedMotion = useReducedMotion();

  const longPressProps = useLongPress(() => {
    if (onLongPress && !disabled) {
      // Trigger haptic feedback if available
      if (hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(50);
      }
      onLongPress();
    }
  }, 500);

  const handleClick = () => {
    if (onClick && !disabled) {
      // Light haptic feedback for regular clicks
      if (hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(25);
      }
      onClick();
    }
  };

  const handleTouchStart = () => {
    setIsPressed(true);
    longPressProps.onTouchStart();
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    longPressProps.onTouchEnd();
  };

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[40px]',
    md: 'px-4 py-3 text-base min-h-[48px]',
    lg: 'px-6 py-4 text-lg min-h-[56px]'
  };

  // Variant styles
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 active:from-blue-700 active:to-blue-800',
    secondary: 'border-2 border-slate-600 text-slate-300 bg-transparent active:bg-slate-800/50 active:border-slate-500',
    ghost: 'text-slate-300 bg-transparent active:bg-slate-800/30'
  };

  const baseClasses = `
    relative overflow-hidden rounded-xl font-medium 
    transition-all duration-200 flex items-center justify-center
    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed
    touch-manipulation select-none
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${isPressed ? 'scale-95' : 'scale-100'}
    ${className}
  `;

  return (
    <motion.button
      className={baseClasses}
      onClick={handleClick}
      onTouchStart={isTouchDevice ? handleTouchStart : undefined}
      onTouchEnd={isTouchDevice ? handleTouchEnd : undefined}
      onMouseDown={!isTouchDevice ? () => setIsPressed(true) : undefined}
      onMouseUp={!isTouchDevice ? () => setIsPressed(false) : undefined}
      onMouseLeave={!isTouchDevice ? () => setIsPressed(false) : undefined}
      disabled={disabled}
      whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}}
      transition={{ duration: 0.1 }}
    >
      {/* Ripple effect for touch feedback */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={isPressed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </div>

      {/* Long press indicator */}
      {onLongPress && longPressProps.isPressed && (
        <motion.div
          className="absolute inset-0 border-2 border-blue-400 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        />
      )}
    </motion.button>
  );
};

export default TouchButton;