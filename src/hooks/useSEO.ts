import { useEffect } from 'react';
import { updateMetaTags, getSEODataForPage, preloadCriticalResources } from '../utils/seoUtils';

/**
 * Hook to manage SEO meta tags for single page portfolio
 */
export const useSEO = () => {
  useEffect(() => {
    // Get SEO data for home page (single page portfolio)
    const seoData = getSEODataForPage('/');
    
    // Update meta tags
    updateMetaTags(seoData);
    
    // Preload critical resources on initial load
    preloadCriticalResources();
  }, []);

  return {
    updateSEO: (customSEOData: any) => {
      const currentSEO = getSEODataForPage('/');
      updateMetaTags({ ...currentSEO, ...customSEOData });
    }
  };
};

/**
 * Hook for managing page-specific structured data
 */
export const useStructuredData = (data: any) => {
  useEffect(() => {
    if (!data) return;

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);
};