/**
 * Lazy loading utilities for animation libraries to improve initial bundle size
 */

// Lazy load Framer Motion components
export const loadFramerMotion = async () => {
  try {
    const framerMotionModule = await import('framer-motion');
    return framerMotionModule;
  } catch (error) {
    console.error('Failed to load Framer Motion:', error);
    return null;
  }
};

// Cache for loaded libraries to prevent multiple loads
const libraryCache = new Map<string, any>();

// Generic lazy loader with caching
export const lazyLoadLibrary = async <T>(
  libraryName: string,
  loader: () => Promise<T>
): Promise<T | null> => {
  // Check cache first
  if (libraryCache.has(libraryName)) {
    return libraryCache.get(libraryName);
  }

  try {
    const library = await loader();
    libraryCache.set(libraryName, library);
    return library;
  } catch (error) {
    console.error(`Failed to load ${libraryName}:`, error);
    libraryCache.set(libraryName, null);
    return null;
  }
};

// Preload critical animation libraries
export const preloadCriticalAnimations = async () => {
  // Only preload if user doesn't prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Preload Framer Motion (most commonly used)
  lazyLoadLibrary('framer-motion', loadFramerMotion);
};

// Initialize lazy loading on app start
export const initializeLazyLoading = () => {
  // Preload critical animations after a short delay
  setTimeout(() => {
    preloadCriticalAnimations();
  }, 1000);
};