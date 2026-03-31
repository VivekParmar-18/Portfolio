/**
 * SEO utilities — all values derived from personalData.ts
 */
import { personal, seoKeywords } from '../data/personalData';

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
  twitterCard?: 'summary' | 'summary_large_image';
  twitterCreator?: string;
  structuredData?: object;
}

export const defaultSEOConfig: SEOData = {
  title: `${personal.name} — Fullstack Java & React Developer`,
  description: personal.bio,
  keywords: seoKeywords,
  author: personal.name,
  image: `${personal.domain}${personal.ogImage}`,
  url: personal.domain,
  type: 'profile',
  siteName: `${personal.name} Portfolio`,
  locale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterCreator: personal.twitter,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: personal.title,
    description: personal.bio,
    image: `${personal.domain}${personal.profileImage}`,
    gender: 'Male',
    nationality: 'Indian',
    birthPlace: 'Ahmedabad, India',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Gujarat Technological University',
    },
    worksFor: { 
      '@type': 'Organization', 
      name: personal.company,
      url: 'https://www.linkedin.com/company/java-enterprise-solutions' // Placeholder or actual
    },
    url: personal.domain,
    email: personal.email,
    sameAs: [personal.linkedin, personal.github, personal.twitter].filter(Boolean),
    knowsAbout: [...seoKeywords, 'Java Microservices', 'Spring Boot', 'System Design', 'Cloud Architecture'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      postalCode: '380001',
      addressCountry: 'IN',
    },
  },
};

export const getSEODataForPage = (path: string): SEOData => {
  const overrides: Record<string, Partial<SEOData>> = {
    '/':        { title: `${personal.name} — Fullstack Java & React Developer` },
    '/#about':  { title: `About ${personal.name} — Journey & Experience` },
    '/#projects': { title: `${personal.name}'s Projects — Fullstack Portfolio` },
    '/#contact':  { title: `Contact ${personal.name} — Let's Work Together` },
  };
  return { ...defaultSEOConfig, ...(overrides[path] ?? {}) };
};

export const updateMetaTags = (data: Partial<SEOData>) => {
  const d = { ...defaultSEOConfig, ...data };

  const setMeta = (sel: string, val: string | undefined) => {
    if (!val) return;
    let el = document.querySelector(sel) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      const attr = sel.includes('[name') ? 'name' : 'property';
      const key = sel.match(/"([^"]+)"/)?.[1] ?? '';
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', val);
  };

  const updateLink = (rel: string, href: string | undefined) => {
    if (!href) return;
    let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  if (d.title) document.title = d.title;
  setMeta('[name="description"]', d.description);
  setMeta('[name="keywords"]', d.keywords?.join(', '));
  setMeta('[name="author"]', d.author);
  setMeta('[name="robots"]', 'index, follow');
  
  // Canonical
  updateLink('canonical', d.url);

  // Open Graph
  setMeta('[property="og:title"]', d.title);
  setMeta('[property="og:description"]', d.description);
  setMeta('[property="og:image"]', d.image);
  setMeta('[property="og:url"]', d.url);
  setMeta('[property="og:type"]', d.type);
  setMeta('[property="og:site_name"]', d.siteName);

  // Twitter
  setMeta('[property="twitter:card"]', d.twitterCard);
  setMeta('[property="twitter:title"]', d.title);
  setMeta('[property="twitter:description"]', d.description);
  setMeta('[property="twitter:image"]', d.image);
  setMeta('[property="twitter:creator"]', d.twitterCreator);

  if (d.structuredData) {
    let ld = document.querySelector('script[type="application/ld+json"]');
    if (!ld) { 
      ld = document.createElement('script'); 
      ld.setAttribute('type', 'application/ld+json'); 
      document.head.appendChild(ld); 
    }
    ld.textContent = JSON.stringify(d.structuredData);
  }
};

export const preloadCriticalResources = () => {
  const resources = [personal.profileImage, personal.ogImage].filter(Boolean);
  resources.forEach((href) => {
    if (!document.querySelector(`link[rel="preload"][href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = href;
      document.head.appendChild(link);
    }
  });
};