#!/usr/bin/env node

/**
 * Build script to generate SEO assets like sitemap.xml and robots.txt
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://vivekparmar.is-a.dev'; 
const buildDir = path.join(__dirname, '../dist');
const publicDir = path.join(__dirname, '../public');

// Ensure directories exist
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Generate sitemap.xml
const generateSitemap = () => {
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly', images: ['/profile-photo.jpg', '/og-image.png'] },
    { url: '/#about', priority: '0.8', changefreq: 'monthly' },
    { url: '/#experience', priority: '0.8', changefreq: 'monthly' },
    { url: '/#projects', priority: '0.9', changefreq: 'monthly' },
    { url: '/#contact', priority: '0.7', changefreq: 'monthly' }
  ];

  const blogPosts = [
    'java-spring-boot-best-practices',
    'java-microservices-architecture',
    'java-developer-career-path',
    'java-performance-optimization'
  ];

  const blogPages = blogPosts.map(id => ({
    url: `/#blog/${id}`,
    priority: '0.8',
    changefreq: 'monthly'
  }));

  const allPages = [...pages, ...blogPages];
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.url === '/' ? '1.0' : page.priority}</priority>${page.images ? page.images.map(img => `
    <image:image>
      <image:loc>${baseUrl}${img}</image:loc>
    </image:image>`).join('') : ''}
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated optimized crawler-ready sitemap.xml');
};

// Generate robots.txt
const generateRobotsTxt = () => {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Block access to admin or private areas (if any)
Disallow: /admin/
Disallow: /.well-known/
Disallow: /api/

# Allow all common crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /`;

  // Write to both public and dist directories
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  fs.writeFileSync(path.join(buildDir, 'robots.txt'), robotsTxt);
  
  console.log('✅ Generated robots.txt');
};

// Generate security.txt (optional)
const generateSecurityTxt = () => {
  const securityTxt = `Contact: mailto:vivek18parmar@gmail.com
Expires: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()}
Preferred-Languages: en
Canonical: ${baseUrl}/.well-known/security.txt`;

  const wellKnownDir = path.join(publicDir, '.well-known');
  const wellKnownBuildDir = path.join(buildDir, '.well-known');
  
  if (!fs.existsSync(wellKnownDir)) {
    fs.mkdirSync(wellKnownDir, { recursive: true });
  }
  if (!fs.existsSync(wellKnownBuildDir)) {
    fs.mkdirSync(wellKnownBuildDir, { recursive: true });
  }

  fs.writeFileSync(path.join(wellKnownDir, 'security.txt'), securityTxt);
  fs.writeFileSync(path.join(wellKnownBuildDir, 'security.txt'), securityTxt);
  
  console.log('✅ Generated security.txt');
};

// Main execution
const main = () => {
  console.log('🚀 Generating SEO assets...');
  
  try {
    generateSitemap();
    generateRobotsTxt();
    generateSecurityTxt();
    
    console.log('✅ All SEO assets generated successfully!');
  } catch (error) {
    console.error('❌ Error generating SEO assets:', error);
    process.exit(1);
  }
};

// Run main execution
main();

export {
  generateSitemap,
  generateRobotsTxt,
  generateSecurityTxt
};