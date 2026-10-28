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

const escapeXml = (unsafe = '') =>
  String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// Generate sitemap.xml — homepage only. This is a single-page app: hash-fragment
// URLs are invalid in sitemaps, so only the root URL is listed.
const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  const images = [
    {
      loc: '/profile-photo.jpg',
      title: 'Vivek Parmar - Java Backend Engineer (Software Engineer L1)',
      caption: 'Profile photograph of Vivek Parmar, Java Backend Engineer based in Ahmedabad, India'
    },
    {
      loc: '/og-image.png',
      title: 'Vivek Parmar Portfolio - Spring Boot, Kafka and Cloud Architecture',
      caption: 'Engineering portfolio social card of Vivek Parmar'
    },
    {
      loc: '/banner.png',
      title: 'Vivek Parmar Portfolio Banner - Java Backend Engineer',
      caption: 'Brand and engineering portfolio banner of Vivek Parmar'
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(`${baseUrl}/`)}</loc>
    <lastmod>${escapeXml(currentDate)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>${images.map(img => `
    <image:image>
      <image:loc>${escapeXml(`${baseUrl}${img.loc}`)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`).join('')}
  </url>
</urlset>
`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated sitemap.xml (homepage with rich image metadata)');
};

// Generate robots.txt — explicitly configured for all global search engines, social crawlers, and AI answer engines
const generateRobotsTxt = () => {
  const robotsTxt = `# Universal rule for search engines & browsers
User-agent: *
Allow: /

# Googlebot (Google Search, Google Images, Google Discover)
User-agent: Googlebot
Allow: /
User-agent: Googlebot-Image
Allow: /

# Bingbot (Microsoft Bing, Yahoo, DuckDuckGo, Copilot)
User-agent: Bingbot
Allow: /
User-agent: msnbot
Allow: /

# Applebot (Apple Siri, Spotlight, Safari suggestions)
User-agent: Applebot
Allow: /

# DuckDuckBot (DuckDuckGo Search)
User-agent: DuckDuckBot
Allow: /

# Baiduspider (Baidu Search)
User-agent: Baiduspider
Allow: /

# YandexBot (Yandex Search)
User-agent: YandexBot
Allow: /

# Yahoo (Yahoo Slurp)
User-agent: Slurp
Allow: /

# Social Preview Crawlers (LinkedIn, Twitter/X, Facebook, WhatsApp, Telegram, Discord, Slack)
User-agent: Twitterbot
Allow: /
User-agent: facebookexternalhit
Allow: /
User-agent: LinkedInBot
Allow: /
User-agent: WhatsApp
Allow: /
User-agent: TelegramBot
Allow: /
User-agent: Discordbot
Allow: /
User-agent: Slackbot
Allow: /
User-agent: SkypeUriPreview
Allow: /

# AI Answer Engines & LLM Search Bots (ChatGPT, Claude, Perplexity, Gemini, Cohere, Meta, Amazon)
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: cohere-ai
Allow: /
User-agent: meta-externalagent
Allow: /
User-agent: Amazonbot
Allow: /
User-agent: Bytespider
Allow: /

# Sitemap & Host specifications
Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}
`;

  // Write to both public and dist directories
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  fs.writeFileSync(path.join(buildDir, 'robots.txt'), robotsTxt);
  
  console.log('✅ Generated robots.txt (optimized for all search engines & AI bots)');
};

// Generate security.txt according to RFC 9116
const generateSecurityTxt = () => {
  const securityTxt = `Contact: mailto:vivek18parmar@gmail.com
Expires: ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()}
Preferred-Languages: en
Canonical: ${baseUrl}/.well-known/security.txt
Policy: ${baseUrl}/#contact
Hiring: ${baseUrl}/#about
`;

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
  
  console.log('✅ Generated security.txt (RFC 9116)');
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
