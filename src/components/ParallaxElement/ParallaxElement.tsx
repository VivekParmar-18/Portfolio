import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number; // Multiplier for parallax effect (0.5 = half speed, 2 = double speed)
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number; // Additional offset for positioning
}

const ParallaxElement = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className = '',
  offset = 0
}: ParallaxElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to movement values
  const getTransformValue = () => {
    const range = 200; // Base movement range in pixels
    const movement = range * speed;
    
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [movement + offset, -movement + offset]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [-movement + offset, movement + offset]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [movement + offset, -movement + offset]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [-movement + offset, movement + offset]);
      default:
        return useTransform(scrollYProgress, [0, 1], [movement + offset, -movement + offset]);
    }
  };

  const transformValue = getTransformValue();

  const getMotionStyle = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return { x: transformValue };
      default:
        return { y: transformValue };
    }
  };

  return (
    <motion.div
      ref={ref}
      style={getMotionStyle()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxElement;