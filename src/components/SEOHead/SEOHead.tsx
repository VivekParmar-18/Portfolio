import React, { useEffect } from 'react';
import { updateMetaTags, getSEODataForPage, type SEOData } from '../../utils/seoUtils';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  structuredData?: any;
  customMeta?: Record<string, string>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  structuredData,
  customMeta = {}
}) => {
  useEffect(() => {
    // Get default SEO data for single page (home page)
    const defaultSEO = getSEODataForPage('/');
    
    // Override with custom props
    const seoData: SEOData = {
      ...defaultSEO,
      ...(title && { title }),
      ...(description && { description }),
      ...(keywords && { keywords }),
      ...(image && { image }),
      ...(structuredData && { structuredData })
    };

    // Update meta tags
    updateMetaTags(seoData);

    // Add custom meta tags
    Object.entries(customMeta).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    });

  }, [title, description, keywords, image, structuredData, customMeta]);

  return null; // This component doesn't render anything
};

// Higher-order component for pages that need specific SEO
export const withSEO = (Component: React.ComponentType, seoProps: SEOHeadProps) => {
  return (props: any) => (
    <>
      <SEOHead {...seoProps} />
      <Component {...props} />
    </>
  );
};