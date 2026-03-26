/**
 * Animation Performance Optimization Utilities
 * Provides GPU acceleration, cleanup, and performance monitoring for animations
 */

// GPU-accelerated CSS properties for better performance
export const GPU_ACCELERATED_STYLES = {
    transform: 'translateZ(0)',
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden' as const,
    perspective: '1000px'
} as const;

// Animation cleanup registry to prevent memory leaks
class AnimationCleanupRegistry {
    private cleanupFunctions = new Set<() => void>();
    private animationFrames = new Set<number>();
    private timeouts = new Set<number>();
    private intervals = new Set<number>();

    // Register cleanup function
    registerCleanup(cleanup: () => void): void {
        this.cleanupFunctions.add(cleanup);
    }

    // Register animation frame for cleanup
    registerAnimationFrame(id: number): void {
        this.animationFrames.add(id);
    }

    // Register timeout for cleanup
    registerTimeout(id: number): void {
        this.timeouts.add(id);
    }

    // Register interval for cleanup
    registerInterval(id: number): void {
        this.intervals.add(id);
    }

    // Clean up all registered animations and timers
    cleanup(): void {
        // Cancel animation frames
        this.animationFrames.forEach(id => cancelAnimationFrame(id));
        this.animationFrames.clear();

        // Clear timeouts
        this.timeouts.forEach(id => clearTimeout(id));
        this.timeouts.clear();

        // Clear intervals
        this.intervals.forEach(id => clearInterval(id));
        this.intervals.clear();

        // Run custom cleanup functions
        this.cleanupFunctions.forEach(cleanup => {
            try {
                cleanup();
            } catch (error) {
                console.warn('Animation cleanup error:', error);
            }
        });
        this.cleanupFunctions.clear();
    }

    // Remove specific cleanup function
    unregisterCleanup(cleanup: () => void): void {
        this.cleanupFunctions.delete(cleanup);
    }
}

// Global cleanup registry instance
export const animationCleanupRegistry = new AnimationCleanupRegistry();

// Performance monitoring for animations
export class AnimationPerformanceMonitor {
    private frameCount = 0;
    private lastTime = performance.now();
    private fps = 60;
    private isMonitoring = false;
    private animationFrame?: number;

    startMonitoring(): void {
        if (this.isMonitoring) return;

        this.isMonitoring = true;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.monitorFrame();
    }

    stopMonitoring(): void {
        this.isMonitoring = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            animationCleanupRegistry.registerAnimationFrame(this.animationFrame);
        }
    }

    private monitorFrame = (): void => {
        if (!this.isMonitoring) return;

        const currentTime = performance.now();
        this.frameCount++;

        // Calculate FPS every second
        if (currentTime - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;

            // Warn if FPS drops below 30
            if (this.fps < 30) {
                console.warn(`Low animation FPS detected: ${this.fps}fps`);
            }
        }

        this.animationFrame = requestAnimationFrame(this.monitorFrame);
    };

    getCurrentFPS(): number {
        return this.fps;
    }
}

// Global performance monitor instance
export const animationPerformanceMonitor = new AnimationPerformanceMonitor();

// Utility to apply GPU acceleration to elements
export const applyGPUAcceleration = (element: HTMLElement): void => {
    Object.assign(element.style, GPU_ACCELERATED_STYLES);
};

// Utility to remove GPU acceleration (for cleanup)
export const removeGPUAcceleration = (element: HTMLElement): void => {
    element.style.transform = '';
    element.style.willChange = 'auto';
    element.style.backfaceVisibility = '';
    element.style.perspective = '';
};

// Optimized requestAnimationFrame with cleanup registration
export const optimizedRequestAnimationFrame = (callback: FrameRequestCallback): number => {
    const id = requestAnimationFrame(callback);
    animationCleanupRegistry.registerAnimationFrame(id);
    return id;
};

// Optimized setTimeout with cleanup registration
export const optimizedSetTimeout = (callback: () => void, delay: number): number => {
    const id = window.setTimeout(callback, delay);
    animationCleanupRegistry.registerTimeout(id);
    return id;
};

// Optimized setInterval with cleanup registration
export const optimizedSetInterval = (callback: () => void, delay: number): number => {
    const id = window.setInterval(callback, delay);
    animationCleanupRegistry.registerInterval(id);
    return id;
};

// Debounced animation function for performance
export const debounceAnimation = (
    callback: () => void,
    delay: number = 16 // ~60fps
): (() => void) => {
    let timeoutId: number;

    return () => {
        clearTimeout(timeoutId);
        timeoutId = optimizedSetTimeout(callback, delay);
    };
};

// Check if device supports hardware acceleration
export const supportsHardwareAcceleration = (): boolean => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
};

// Adaptive animation quality based on device performance
export const getAnimationQuality = (): 'high' | 'medium' | 'low' => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return 'low';
    }

    // Check hardware acceleration support
    if (!supportsHardwareAcceleration()) {
        return 'low';
    }

    // Check device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory;
    if (deviceMemory && deviceMemory < 4) {
        return 'medium';
    }

    // Check CPU cores (if available)
    const hardwareConcurrency = navigator.hardwareConcurrency;
    if (hardwareConcurrency && hardwareConcurrency < 4) {
        return 'medium';
    }

    return 'high';
};

// Animation configuration based on quality level
export const getAnimationConfig = (quality: 'high' | 'medium' | 'low') => {
    switch (quality) {
        case 'high':
            return {
                duration: 1,
                particleCount: 20,
                enableComplexAnimations: true,
                enableParallax: true,
                enableBlur: true
            };
        case 'medium':
            return {
                duration: 0.7,
                particleCount: 10,
                enableComplexAnimations: true,
                enableParallax: false,
                enableBlur: false
            };
        case 'low':
            return {
                duration: 0.3,
                particleCount: 5,
                enableComplexAnimations: false,
                enableParallax: false,
                enableBlur: false
            };
    }
};