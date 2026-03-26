import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { animationCleanupRegistry } from '../../utils/animationOptimization';

interface CursorFollowerProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const CursorFollower: React.FC<CursorFollowerProps> = ({
  children,
  className = '',
  disabled = false
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVariant, setCursorVariant] = useState('default');
  
  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring animations for smooth following
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (disabled) return;

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => {
      setCursorVariant('hover');
    };

    const handleMouseLeave = () => {
      setCursorVariant('default');
    };

    // Add event listeners
    document.addEventListener('mousemove', updateCursor);
    
    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"], input, textarea, select, .cursor-interactive'
    );
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup function
    const cleanup = () => {
      document.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };

    animationCleanupRegistry.registerCleanup(cleanup);

    return cleanup;
  }, [disabled, cursorX, cursorY]);

  // Don't render on touch devices
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }
  }, []);

  if (disabled || 'ontouchstart' in window) {
    return null;
  }

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(59, 130, 246, 0.3)',
      border: '2px solid rgba(59, 130, 246, 0.6)',
      backdropFilter: 'blur(4px)',
    },
    hover: {
      scale: 1.5,
      backgroundColor: 'rgba(139, 92, 246, 0.4)',
      border: '2px solid rgba(139, 92, 246, 0.8)',
      backdropFilter: 'blur(8px)',
    },
    click: {
      scale: 0.8,
      backgroundColor: 'rgba(16, 185, 129, 0.5)',
      border: '2px solid rgba(16, 185, 129, 1)',
    }
  };

  return (
    <motion.div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference ${className}`}
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      variants={cursorVariants}
      animate={cursorVariant}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
      }}
    >
      {children}
    </motion.div>
  );
};

export default CursorFollower;