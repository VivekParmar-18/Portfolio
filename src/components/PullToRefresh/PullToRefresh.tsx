import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResponsive, useReducedMotion } from '../../hooks/useResponsive';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
  disabled?: boolean;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  threshold = 80,
  disabled = false
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const { isMobile, isTouchDevice } = useResponsive();
  const prefersReducedMotion = useReducedMotion();
  
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: TouchEvent) => {
    if (disabled || !isTouchDevice || window.scrollY > 0) return;
    
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (disabled || !isTouchDevice || window.scrollY > 0) return;
    
    currentY.current = e.touches[0].clientY;
    const distance = Math.max(0, currentY.current - startY.current);
    
    if (distance > 0) {
      e.preventDefault();
      const dampedDistance = Math.min(distance * 0.5, threshold * 1.5);
      setPullDistance(dampedDistance);
      setCanRefresh(dampedDistance >= threshold);
    }
  };

  const handleTouchEnd = async () => {
    if (disabled || !isTouchDevice) return;
    
    if (canRefresh && !isRefreshing) {
      setIsRefreshing(true);
      
      // Trigger haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setPullDistance(0);
    setCanRefresh(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isTouchDevice) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [disabled, isTouchDevice, canRefresh, isRefreshing]);

  if (!isMobile || !isTouchDevice) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Pull indicator */}
      <AnimatePresence>
        {(pullDistance > 0 || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ 
              opacity: 1, 
              y: Math.min(pullDistance - 50, 0),
              transition: { duration: prefersReducedMotion ? 0.1 : 0.2 }
            }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-slate-800/90 backdrop-blur-sm rounded-b-xl px-6 py-3 border-x border-b border-slate-700/50"
          >
            <div className="flex items-center space-x-3">
              {/* Refresh icon */}
              <motion.div
                animate={isRefreshing && !prefersReducedMotion ? { 
                  rotate: 360 
                } : { 
                  rotate: canRefresh ? 180 : 0 
                }}
                transition={{ 
                  duration: isRefreshing ? 1 : 0.3,
                  repeat: isRefreshing ? Infinity : 0,
                  ease: isRefreshing ? "linear" : "easeInOut"
                }}
                className={`text-2xl ${canRefresh ? 'text-blue-400' : 'text-slate-400'}`}
              >
                {isRefreshing ? '⟳' : '↓'}
              </motion.div>
              
              {/* Status text */}
              <span className={`text-sm font-medium ${
                isRefreshing 
                  ? 'text-blue-400' 
                  : canRefresh 
                    ? 'text-emerald-400' 
                    : 'text-slate-400'
              }`}>
                {isRefreshing 
                  ? 'Refreshing...' 
                  : canRefresh 
                    ? 'Release to refresh' 
                    : 'Pull to refresh'
                }
              </span>
            </div>
            
            {/* Progress indicator */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-blue-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: isRefreshing 
                  ? '100%' 
                  : `${Math.min((pullDistance / threshold) * 100, 100)}%`
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with transform */}
      <motion.div
        animate={{ 
          y: isRefreshing ? 60 : Math.min(pullDistance * 0.3, 30)
        }}
        transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;