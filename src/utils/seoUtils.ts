/**
 * SEO utilities — all values derived from personalData.ts
 * Enhanced for AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization)
 */
import { personal, seoKeywords } from '../data/personalData';
import { blogPosts } from '../data/blogData';

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
  title: `Vivek Parmar (Vivek) — Software Engineer - L1 | Java & React Portfolio`,
  description: `Vivek Parmar is a Software Engineer - L1 at Techforce Global, specializing in Java Spring Boot and React.js. Explore his enterprise-grade projects, career timeline, and technical insights.`,
  keywords: ["Vivek", "Vivek Parmar", ...seoKeywords],
  author: "Vivek Parmar",
  image: `${personal.domain}${personal.ogImage}`,
  url: personal.domain,
  type: 'profile',
  siteName: personal.name,
  locale: 'en_US',
  twitterCard: 'summary_large_image',
  structuredData: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${personal.domain}/#person`,
        name: personal.name,
        givenName: personal.firstName,
        familyName: 'Parmar',
        alternateName: 'Vivek',
        jobTitle: personal.title,
        description: `${personal.name} is a ${personal.title} at ${personal.company}, specializing in Java Spring Boot backends and React.js frontends. He builds enterprise-grade, high-availability applications with clean architecture and performance-centric design.`,
        image: `${personal.domain}${personal.profileImage}`,
        gender: 'Male',
        nationality: {
          '@type': 'Country',
          name: 'India'
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Gujarat Technological University',
        },
        worksFor: {
          '@type': 'Organization',
          name: personal.company,
          url: 'https://www.techforceglobal.com'
        },
        url: personal.domain,
        email: personal.email,
        sameAs: [personal.linkedin, personal.github].filter(Boolean),
        knowsAbout: [
          ...seoKeywords,
          'Java Microservices', 'Spring Boot', 'System Design',
          'Cloud Architecture', 'Clean Architecture', 'OAuth2',
          'REST API Design', 'CI/CD', 'Docker'
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ahmedabad',
          addressRegion: 'Gujarat',
          postalCode: '380001',
          addressCountry: 'IN',
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${personal.domain}/#website`,
        url: personal.domain,
        name: personal.name,
        alternateName: ['Vivek', 'Vivek Parmar Portfolio', 'Vivek Dev'],
        description: `Professional portfolio of ${personal.name} — ${personal.title} specializing in Java, Spring Boot, and React.js`,
        publisher: { '@id': `${personal.domain}/#person` },
        inLanguage: 'en-US'
      },
      {
        '@type': 'WebPage',
        '@id': `${personal.domain}/#webpage`,
        url: `${personal.domain}/`,
        name: `${personal.name} — ${personal.title} | Java & React Portfolio`,
        isPartOf: { '@id': `${personal.domain}/#website` },
        about: { '@id': `${personal.domain}/#person` },
        description: `${personal.name} is a ${personal.title} at ${personal.company}, specializing in Java Spring Boot and React.js. Explore his enterprise-grade projects, career timeline, and technical insights.`,
        inLanguage: 'en-US',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#hero h1', '#hero h2', '#about h2', '#about p']
        }
      },
      ...blogPosts.map(post => ({
        '@type': 'BlogPosting',
        '@id': `${personal.domain}/#blog/${post.id}`,
        headline: post.title,
        description: post.excerpt,
        articleBody: post.content.replace(/#.*?\n/g, '').substring(0, 500) + '...',
        datePublished: post.publishDate,
        author: { '@id': `${personal.domain}/#person` },
        publisher: { '@id': `${personal.domain}/#person` },
        isPartOf: { '@id': `${personal.domain}/#website` },
        inLanguage: 'en-US',
        mainEntityOfPage: `${personal.domain}/#blog/${post.id}`
      }))
    ]
  },
};

export const getSEODataForPage = (path: string): SEOData => {
  const overrides: Record<string, Partial<SEOData>> = {
    '/': { title: `${personal.name} — ${personal.title} | Java & React Portfolio` },
    '/#about': { title: `About ${personal.name} — Journey & Experience` },
    '/#projects': { title: `${personal.name}'s Projects — Enterprise Software Portfolio` },
    '/#contact': { title: `Contact ${personal.name} — Let's Build Together` },
    '/#blog': { title: `${personal.name}'s Engineering Blog — Java & Architecture Insights` },
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
  setMeta('[property="og:image:alt"]', `${personal.name} — Software Engineer Portfolio`);

  // Twitter
  setMeta('[name="twitter:card"]', d.twitterCard);
  setMeta('[name="twitter:title"]', d.title);
  setMeta('[name="twitter:description"]', d.description);
  setMeta('[name="twitter:image"]', d.image);
  setMeta('[name="twitter:image:alt"]', `${personal.name} — Software Engineer Portfolio`);

  if (d.structuredData) {
    // Find any existing graph-based LD+JSON or create new
    let ld = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
      .find(script =>
        script.textContent?.includes('"@graph"') ||
        script.textContent?.includes('"@type": "Person"') ||
        script.textContent?.includes('"@type":"Person"')
      );

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