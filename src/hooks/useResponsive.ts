import { useState, useEffect } from 'react';

interface BreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

const breakpoints: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export interface ResponsiveState {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isTouchDevice: boolean;
  orientation: 'portrait' | 'landscape';
  breakpoint: keyof BreakpointConfig | 'xs';
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 1024,
        height: 768,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isLargeDesktop: false,
        isTouchDevice: false,
        orientation: 'landscape',
        breakpoint: 'lg',
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    return {
      width,
      height,
      isMobile: width < breakpoints.md,
      isTablet: width >= breakpoints.md && width < breakpoints.lg,
      isDesktop: width >= breakpoints.lg && width < breakpoints.xl,
      isLargeDesktop: width >= breakpoints.xl,
      isTouchDevice,
      orientation: width > height ? 'landscape' : 'portrait',
      breakpoint: getBreakpoint(width),
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setState({
        width,
        height,
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg && width < breakpoints.xl,
        isLargeDesktop: width >= breakpoints.xl,
        isTouchDevice,
        orientation: width > height ? 'landscape' : 'portrait',
        breakpoint: getBreakpoint(width),
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return state;
};

function getBreakpoint(width: number): keyof BreakpointConfig | 'xs' {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
}

// Enhanced hook for detecting reduced motion preference with performance considerations
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Use the newer addEventListener if available, fallback to addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
};

// Hook for comprehensive animation preferences
export const useAnimationPreferences = () => {
  const prefersReducedMotion = useReducedMotion();
  const [animationQuality, setAnimationQuality] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    // Check for reduced motion preference
    if (prefersReducedMotion) {
      setAnimationQuality('low');
      return;
    }

    // Check device capabilities
    const checkDeviceCapabilities = () => {
      // Check hardware acceleration support
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const supportsHardwareAcceleration = !!gl;

      if (!supportsHardwareAcceleration) {
        setAnimationQuality('low');
        return;
      }

      // Check device memory (if available)
      const deviceMemory = (navigator as any).deviceMemory;
      if (deviceMemory && deviceMemory < 4) {
        setAnimationQuality('medium');
        return;
      }

      // Check CPU cores (if available)
      const hardwareConcurrency = navigator.hardwareConcurrency;
      if (hardwareConcurrency && hardwareConcurrency < 4) {
        setAnimationQuality('medium');
        return;
      }

      setAnimationQuality('high');
    };

    checkDeviceCapabilities();
  }, [prefersReducedMotion]);

  return {
    prefersReducedMotion,
    animationQuality,
    shouldUseReducedAnimations: prefersReducedMotion || animationQuality === 'low',
    shouldUseComplexAnimations: animationQuality === 'high' && !prefersReducedMotion
  };
};

// Hook for detecting touch capabilities
export const useTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);

    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  return isTouchDevice;
};