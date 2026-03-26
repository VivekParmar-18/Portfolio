import { useEffect, useRef, useCallback } from 'react';
import { useAnimationPreferences } from './useResponsive';
import { 
  animationCleanupRegistry, 
  animationPerformanceMonitor,
  applyGPUAcceleration,
  removeGPUAcceleration,
  optimizedRequestAnimationFrame,
  debounceAnimation
} from '../utils/animationOptimization';

interface UseOptimizedAnimationOptions {
  enableGPUAcceleration?: boolean;
  enablePerformanceMonitoring?: boolean;
  autoCleanup?: boolean;
  debounceDelay?: number;
}

/**
 * Hook for performance-optimized animations with automatic cleanup
 */
export const useOptimizedAnimation = (options: UseOptimizedAnimationOptions = {}) => {
  const {
    enableGPUAcceleration = true,
    enablePerformanceMonitoring = false,
    autoCleanup = true,
    debounceDelay = 16
  } = options;

  const { shouldUseReducedAnimations, animationQuality } = useAnimationPreferences();
  const elementRef = useRef<HTMLElement>(null);
  const cleanupFunctionsRef = useRef<Set<() => void>>(new Set());

  // Apply GPU acceleration to element
  const applyOptimizations = useCallback(() => {
    if (elementRef.current && enableGPUAcceleration && !shouldUseReducedAnimations) {
      applyGPUAcceleration(elementRef.current);
    }
  }, [enableGPUAcceleration, shouldUseReducedAnimations]);

  // Remove optimizations from element
  const removeOptimizations = useCallback(() => {
    if (elementRef.current) {
      removeGPUAcceleration(elementRef.current);
    }
  }, []);

  // Register cleanup function
  const registerCleanup = useCallback((cleanup: () => void) => {
    cleanupFunctionsRef.current.add(cleanup);
    if (autoCleanup) {
      animationCleanupRegistry.registerCleanup(cleanup);
    }
  }, [autoCleanup]);

  // Unregister cleanup function
  const unregisterCleanup = useCallback((cleanup: () => void) => {
    cleanupFunctionsRef.current.delete(cleanup);
    animationCleanupRegistry.unregisterCleanup(cleanup);
  }, []);

  // Optimized animation frame request
  const requestOptimizedFrame = useCallback((callback: FrameRequestCallback) => {
    if (shouldUseReducedAnimations) {
      // Skip animation for reduced motion
      return 0;
    }
    return optimizedRequestAnimationFrame(callback);
  }, [shouldUseReducedAnimations]);

  // Debounced animation function
  const createDebouncedAnimation = useCallback((callback: () => void) => {
    return debounceAnimation(callback, debounceDelay);
  }, [debounceDelay]);

  // Get animation configuration based on quality
  const getAnimationConfig = useCallback(() => {
    if (shouldUseReducedAnimations) {
      return {
        duration: 0.1,
        delay: 0,
        easing: 'linear',
        particleCount: 0,
        enableComplexAnimations: false
      };
    }

    switch (animationQuality) {
      case 'high':
        return {
          duration: 0.8,
          delay: 0.1,
          easing: 'cubic-bezier(0.25, 0.25, 0.25, 0.75)',
          particleCount: 20,
          enableComplexAnimations: true
        };
      case 'medium':
        return {
          duration: 0.5,
          delay: 0.05,
          easing: 'ease-out',
          particleCount: 10,
          enableComplexAnimations: true
        };
      case 'low':
        return {
          duration: 0.3,
          delay: 0,
          easing: 'ease',
          particleCount: 5,
          enableComplexAnimations: false
        };
    }
  }, [shouldUseReducedAnimations, animationQuality]);

  // Initialize optimizations
  useEffect(() => {
    applyOptimizations();

    if (enablePerformanceMonitoring && !shouldUseReducedAnimations) {
      animationPerformanceMonitor.startMonitoring();
    }

    return () => {
      removeOptimizations();
      
      if (enablePerformanceMonitoring) {
        animationPerformanceMonitor.stopMonitoring();
      }

      // Clean up registered functions
      cleanupFunctionsRef.current.forEach(cleanup => {
        try {
          cleanup();
        } catch (error) {
          console.warn('Animation cleanup error:', error);
        }
      });
      cleanupFunctionsRef.current.clear();
    };
  }, [applyOptimizations, removeOptimizations, enablePerformanceMonitoring, shouldUseReducedAnimations]);

  return {
    ref: elementRef,
    shouldUseReducedAnimations,
    animationQuality,
    registerCleanup,
    unregisterCleanup,
    requestOptimizedFrame,
    createDebouncedAnimation,
    getAnimationConfig,
    applyOptimizations,
    removeOptimizations
  };
};

/**
 * Hook for optimized scroll-based animations
 */
export const useOptimizedScrollAnimation = () => {
  const { shouldUseReducedAnimations, getAnimationConfig } = useOptimizedAnimation();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const requestScrollFrame = useCallback((callback: () => void) => {
    if (shouldUseReducedAnimations) return;

    if (!ticking.current) {
      optimizedRequestAnimationFrame(() => {
        callback();
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [shouldUseReducedAnimations]);

  const handleOptimizedScroll = useCallback((callback: (scrollY: number, deltaY: number) => void) => {
    return () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      
      requestScrollFrame(() => {
        callback(currentScrollY, deltaY);
        lastScrollY.current = currentScrollY;
      });
    };
  }, [requestScrollFrame]);

  return {
    shouldUseReducedAnimations,
    getAnimationConfig,
    handleOptimizedScroll,
    requestScrollFrame
  };
};

/**
 * Hook for optimized intersection observer animations
 */
export const useOptimizedIntersectionAnimation = (options: IntersectionObserverInit = {}) => {
  const { shouldUseReducedAnimations } = useOptimizedAnimation();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Set<Element>>(new Set());

  const observe = useCallback((element: Element, callback: (isIntersecting: boolean) => void) => {
    if (shouldUseReducedAnimations) {
      // Immediately trigger animation for reduced motion
      callback(true);
      return;
    }

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          callback(entry.isIntersecting);
        });
      }, {
        threshold: 0.1,
        rootMargin: '-50px',
        ...options
      });
    }

    observerRef.current.observe(element);
    elementsRef.current.add(element);
  }, [shouldUseReducedAnimations, options]);

  const unobserve = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.unobserve(element);
      elementsRef.current.delete(element);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      elementsRef.current.clear();
    }
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    observe,
    unobserve,
    disconnect,
    shouldUseReducedAnimations
  };
};