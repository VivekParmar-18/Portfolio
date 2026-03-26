/**
 * Performance monitoring utilities for SEO and user experience
 */

interface PerformanceMetrics {
    fcp: number; // First Contentful Paint
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
    ttfb: number; // Time to First Byte
}

/**
 * Measure Core Web Vitals
 */
export const measureCoreWebVitals = (): Promise<Partial<PerformanceMetrics>> => {
    return new Promise((resolve) => {
        const metrics: Partial<PerformanceMetrics> = {};

        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
                metrics.fcp = fcpEntry.startTime;
            }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
                metrics.fid = entry.processingStart - entry.startTime;
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            metrics.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Time to First Byte
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
            metrics.ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart;
        }

        // Resolve after a delay to collect metrics
        setTimeout(() => {
            resolve(metrics);
        }, 3000);
    });
};

/**
 * Monitor page load performance
 */
export const monitorPageLoad = () => {
    window.addEventListener('load', () => {
        // Measure page load time
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;

        // Measure DOM content loaded time
        const domContentLoadedTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;

        // Log performance metrics (in production, send to analytics)
        console.log('Performance Metrics:', {
            loadTime,
            domContentLoadedTime,
            timestamp: new Date().toISOString()
        });

        // Measure Core Web Vitals
        measureCoreWebVitals().then(metrics => {
            console.log('Core Web Vitals:', metrics);

            // In production, send to analytics service
            // sendToAnalytics('core-web-vitals', metrics);
        });
    });
};

/**
 * Monitor resource loading performance
 */
export const monitorResourceLoading = () => {
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        entries.forEach((entry) => {
            if (entry.entryType === 'resource') {
                const resourceEntry = entry as PerformanceResourceTiming;

                // Log slow resources (> 1 second)
                if (resourceEntry.duration > 1000) {
                    console.warn('Slow resource detected:', {
                        name: resourceEntry.name,
                        duration: resourceEntry.duration,
                        size: resourceEntry.transferSize
                    });
                }
            }
        });
    });

    observer.observe({ entryTypes: ['resource'] });
};

/**
 * Check if page meets Core Web Vitals thresholds
 */
export const checkCoreWebVitalsThresholds = (metrics: Partial<PerformanceMetrics>) => {
    const thresholds = {
        fcp: 1800, // Good: < 1.8s
        lcp: 2500, // Good: < 2.5s
        fid: 100,  // Good: < 100ms
        cls: 0.1   // Good: < 0.1
    };

    const results = {
        fcp: metrics.fcp ? metrics.fcp < thresholds.fcp : null,
        lcp: metrics.lcp ? metrics.lcp < thresholds.lcp : null,
        fid: metrics.fid ? metrics.fid < thresholds.fid : null,
        cls: metrics.cls ? metrics.cls < thresholds.cls : null
    };

    return results;
};

/**
 * Initialize performance monitoring
 */
export const initializePerformanceMonitoring = () => {
    // Only run in production or when explicitly enabled
    if (import.meta.env.MODE === 'production' || import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true') {
        monitorPageLoad();
        monitorResourceLoading();
    }
};

/**
 * Report performance metrics to analytics (placeholder)
 */
export const reportPerformanceMetrics = (metrics: any) => {
    // In a real application, send to Google Analytics, DataDog, etc.
    console.log('Reporting performance metrics:', metrics);

    // Example: Google Analytics 4
    // gtag('event', 'page_load_performance', {
    //   custom_parameter_1: metrics.loadTime,
    //   custom_parameter_2: metrics.fcp
    // });
};