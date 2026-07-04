/**
 * SEO utilities — all values derived from personalData.ts
 * Enhanced for AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization)
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
  title: `Vivek Parmar — Software Developer | Java, Spring Boot & React`,
  description: `Vivek Parmar is a Software Developer at Techforce Infotech Pvt. Ltd., specializing in Java, Spring Boot, and React. He builds the backend of an enterprise US healthcare platform — 40+ production REST APIs supporting 100+ organizations.`,
  keywords: ["Vivek", "Vivek Parmar", ...seoKeywords],
  author: "Vivek Parmar",
  image: `${personal.domain}${personal.ogImage}`,
  url: personal.domain,
  type: 'profile',
  siteName: personal.name,
  locale: 'en_US',
  twitterCard: 'summary_large_image',
  // Structured data is served statically from index.html (single source of truth).
  // Injecting it at runtime duplicated @ids and clobbered the standalone WebSite schema.
};

export const getSEODataForPage = (path: string): SEOData => {
  const overrides: Record<string, Partial<SEOData>> = {
    '/': { title: `${personal.name} — ${personal.title} | Java & React Portfolio` },
    '/#about': { title: `About ${personal.name} — Journey & Experience` },
    '/#projects': { title: `${personal.name}'s Projects — Enterprise Software Portfolio` },
    '/#contact': { title: `Contact ${personal.name} — Let's Build Together` },
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
  setMeta('[name="robots"]', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // Canonical
  updateLink('canonical', d.url);

  // Open Graph
  setMeta('[property="og:title"]', d.title);
  setMeta('[property="og:description"]', d.description);
  setMeta('[property="og:image"]', d.image);
  setMeta('[property="og:url"]', d.url);
  setMeta('[property="og:type"]', d.type);
  setMeta('[property="og:site_name"]', d.siteName);
  setMeta('[property="og:locale"]', d.locale);
  setMeta('[property="og:image:alt"]', `${personal.name} — Software Developer Portfolio`);

  // Twitter
  setMeta('[name="twitter:card"]', d.twitterCard);
  setMeta('[name="twitter:title"]', d.title);
  setMeta('[name="twitter:description"]', d.description);
  setMeta('[name="twitter:image"]', d.image);
  setMeta('[name="twitter:image:alt"]', `${personal.name} — Software Developer Portfolio`);
};

export const preloadCriticalResources = () => {
  // Only the hero photo renders on the page; og-image is for social crawlers
  // and preloading it just wastes a request (browsers warn about unused preloads).
  const resources = [personal.profileImage].filter(Boolean);
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