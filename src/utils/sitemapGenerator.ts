/**
 * Sitemap generation utility for SEO
 */

interface SitemapUrl {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const baseUrl = 'https://vivekparmar.dev'; // Replace with actual domain

// Define all pages with their SEO properties
const pages: SitemapUrl[] = [
  {
    url: `${baseUrl}/`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 1.0
  },
  {
    url: `${baseUrl}/about`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: `${baseUrl}/contact`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.6
  }
];

/**
 * Generate XML sitemap content
 */
export const generateSitemap = (): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urls = pages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  return `${xmlHeader}
${urlsetOpen}${urls}
${urlsetClose}`;
};

/**
 * Save sitemap to public directory (for build process)
 */
export const saveSitemap = () => {
  const sitemapContent = generateSitemap();
  
  // In a real application, you would write this to the public directory
  // For now, we'll log it or return it for manual creation
  console.log('Sitemap content:', sitemapContent);
  
  return sitemapContent;
};

/**
 * Generate sitemap index for multiple sitemaps (if needed in the future)
 */
export const generateSitemapIndex = (sitemaps: string[]): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const sitemapIndexOpen = '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const sitemapIndexClose = '</sitemapindex>';

  const sitemapEntries = sitemaps.map(sitemap => `
  <sitemap>
    <loc>${baseUrl}/${sitemap}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`).join('');

  return `${xmlHeader}
${sitemapIndexOpen}${sitemapEntries}
${sitemapIndexClose}`;
};