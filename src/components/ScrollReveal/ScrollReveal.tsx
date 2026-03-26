import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.4, // Reduced for lighter feel
  distance = 20, // Reduced distance for subtler effect
  className = '',
  threshold = 0.1,
  triggerOnce = true
}: ScrollRevealProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce,
    rootMargin: '-30px' // Reduced margin for earlier trigger
  });

  const getTransform = () => {
    if (isIntersecting) return 'translate3d(0, 0, 0)';
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'fade':
        return 'translate3d(0, 0, 0)';
      default:
        return `translate3d(0, ${distance}px, 0)`;
    }
  };

  // Lighter easing for smoother performance
  const easing = 'ease-out';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: getTransform(),
        // Removed blur filter for better performance
        transition: `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s`,
        willChange: isIntersecting ? 'auto' : 'opacity, transform', // Dynamic will-change
        // GPU acceleration
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;