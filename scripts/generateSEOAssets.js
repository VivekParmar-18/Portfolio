#!/usr/bin/env node

/**
 * Build script to generate SEO assets like sitemap.xml and robots.txt
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = (process.env.VITE_SITE_URL || 'https://vivekparmar.is-a.dev').replace(/\/$/, '');
const buildDir = path.join(__dirname, '../dist');
const publicDir = path.join(__dirname, '../public');

// Ensure directories exist
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Generate sitemap.xml — homepage only. This is a single-page app: hash-fragment
// URLs are invalid in sitemaps, so only the root URL is listed.
const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const images = ['/profile-photo.jpg', '/og-image.png'];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>${images.map(img => `
    <image:image>
      <image:loc>${baseUrl}${img}</image:loc>
    </image:image>`).join('')}
  </url>
</urlset>
`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated sitemap.xml (homepage only)');
};

// Generate robots.txt
const generateRobotsTxt = () => {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`;

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
