/**
 * SEO and Meta Tag Management Utilities
 */

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  siteName?: string;
  locale?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  structuredData?: any;
}

// Default SEO configuration
export const defaultSEOConfig: SEOData = {
  title: 'Vivek Parmar - Java Developer & Full Stack Engineer',
  description: 'Experienced Java developer specializing in Spring Boot and React.js with professional experience at Techforce InfoTech PVT LTD. Building scalable web applications with modern technologies.',
  keywords: [
    'java developer',
    'spring boot developer',
    'react developer',
    'full stack developer',
    'javascript',
    'typescript',
    'web development',
    'software engineer',
    'techforce infotech',
    'portfolio',
    'vivek parmar'
  ],
  author: 'Vivek Parmar',
  image: '/og-image.jpg', // We'll create this
  url: 'https://vivekparmar.dev', // Replace with actual domain
  type: 'profile',
  siteName: 'Vivek Parmar Portfolio',
  locale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterSite: '@vivekparmar1812',
  twitterCreator: '@vivekparmar1812'
};

// Page-specific SEO configurations
export const pageSEOConfigs: Record<string, Partial<SEOData>> = {
  '/': {
    title: 'Vivek Parmar - Java Developer & Full Stack Engineer',
    description: 'Welcome to my portfolio. I\'m a passionate Java developer with experience building scalable web applications using Spring Boot and React.js at Techforce InfoTech PVT LTD.',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Vivek Parmar',
      jobTitle: 'Associate Software Developer',
      worksFor: {
        '@type': 'Organization',
        name: 'Techforce InfoTech PVT LTD'
      },
      url: 'https://vivekparmar.dev',
      sameAs: [
        'https://linkedin.com/in/vivekparmar1812',
        'https://github.com/VivekParmar-18',
        'mailto:vivek18parmar@gmail.com'
      ],
      knowsAbout: [
        'Java',
        'Spring Boot',
        'React.js',
        'JavaScript',
        'TypeScript',
        'Web Development',
        'Software Engineering'
      ]
    }
  },
  '/about': {
    title: 'About Vivek Parmar - My Journey & Experience',
    description: 'Learn about my journey as a Java developer, my experience at Techforce InfoTech PVT LTD, and the technologies I work with including Spring Boot, React.js, and modern web development.',
    type: 'article'
  },
  '/contact': {
    title: 'Contact Vivek Parmar - Let\'s Work Together',
    description: 'Get in touch with me for collaboration opportunities, job inquiries, or just to connect. I\'m always open to discussing new projects and opportunities.',
    type: 'article'
  }
};

// Update document meta tags
export const updateMetaTags = (seoData: SEOData) => {
  // Update title
  document.title = seoData.title;

  // Helper function to update or create meta tag
  const updateMetaTag = (name: string, content: string, property = false) => {
    const attribute = property ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // Basic meta tags
  updateMetaTag('description', seoData.description);
  if (seoData.keywords) {
    updateMetaTag('keywords', seoData.keywords.join(', '));
  }
  if (seoData.author) {
    updateMetaTag('author', seoData.author);
  }

  // Open Graph tags
  updateMetaTag('og:title', seoData.title, true);
  updateMetaTag('og:description', seoData.description, true);
  updateMetaTag('og:type', seoData.type || 'website', true);
  if (seoData.image) {
    updateMetaTag('og:image', seoData.image, true);
  }
  if (seoData.url) {
    updateMetaTag('og:url', seoData.url, true);
  }
  if (seoData.siteName) {
    updateMetaTag('og:site_name', seoData.siteName, true);
  }
  if (seoData.locale) {
    updateMetaTag('og:locale', seoData.locale, true);
  }

  // Twitter Card tags
  if (seoData.twitterCard) {
    updateMetaTag('twitter:card', seoData.twitterCard);
  }
  if (seoData.twitterSite) {
    updateMetaTag('twitter:site', seoData.twitterSite);
  }
  if (seoData.twitterCreator) {
    updateMetaTag('twitter:creator', seoData.twitterCreator);
  }
  updateMetaTag('twitter:title', seoData.title);
  updateMetaTag('twitter:description', seoData.description);
  if (seoData.image) {
    updateMetaTag('twitter:image', seoData.image);
  }

  // Structured data
  if (seoData.structuredData) {
    updateStructuredData(seoData.structuredData);
  }
};

// Update structured data (JSON-LD)
export const updateStructuredData = (data: any) => {
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
};

// Get SEO data for current page
export const getSEODataForPage = (pathname: string): SEOData => {
  const pageConfig = pageSEOConfigs[pathname] || {};
  return { ...defaultSEOConfig, ...pageConfig };
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload fonts
  const fontPreloads = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
  ];

  fontPreloads.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
    
    // Also add the actual stylesheet
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = href;
    document.head.appendChild(styleLink);
  });

  // Preload critical images
  const criticalImages = [
    '/og-image.jpg',
    '/profile-photo.jpg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Generate sitemap data
export const generateSitemapData = () => {
  const baseUrl = defaultSEOConfig.url || 'https://vivekparmar.dev';
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'monthly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/contact', priority: 0.6, changefreq: 'monthly' }
  ];

  return pages.map(page => ({
    ...page,
    url: `${baseUrl}${page.url}`,
    lastmod: new Date().toISOString().split('T')[0]
  }));
};

// Generate robots.txt content
export const generateRobotsTxt = () => {
  const baseUrl = defaultSEOConfig.url || 'https://vivekparmar.dev';
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;
};