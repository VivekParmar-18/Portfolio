/**
 * Image optimization utilities for better performance and SEO
 */

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  lazy?: boolean;
}

/**
 * Generate optimized image sources with multiple formats
 */
export const generateImageSources = (
  src: string,
  options: ImageOptimizationOptions = {}
): { src: string; srcSet?: string; type?: string }[] => {
  const { quality = 80, width } = options;
  
  // In a real application, you would use a service like Cloudinary, ImageKit, or build-time optimization
  // For now, we'll return the original source with potential query parameters
  const baseUrl = src.includes('http') ? src : src;
  
  const sources = [];
  
  // WebP version (modern browsers)
  sources.push({
    src: baseUrl,
    type: 'image/webp',
    srcSet: width ? `${baseUrl}?w=${width}&q=${quality}&f=webp` : undefined
  });
  
  // AVIF version (newest format, best compression)
  sources.push({
    src: baseUrl,
    type: 'image/avif',
    srcSet: width ? `${baseUrl}?w=${width}&q=${quality}&f=avif` : undefined
  });
  
  // Fallback to original format
  sources.push({
    src: baseUrl,
    srcSet: width ? `${baseUrl}?w=${width}&q=${quality}` : undefined
  });
  
  return sources;
};

/**
 * Generate responsive image srcSet
 */
export const generateResponsiveSrcSet = (
  src: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  return widths
    .map(width => `${src}?w=${width} ${width}w`)
    .join(', ');
};

/**
 * Generate sizes attribute for responsive images
 */
export const generateSizesAttribute = (
  breakpoints: { [key: string]: string } = {
    '(max-width: 640px)': '100vw',
    '(max-width: 1024px)': '50vw',
    default: '33vw'
  }
): string => {
  const entries = Object.entries(breakpoints);
  const mediaQueries = entries
    .filter(([key]) => key !== 'default')
    .map(([query, size]) => `${query} ${size}`);
  
  const defaultSize = breakpoints.default || '100vw';
  
  return [...mediaQueries, defaultSize].join(', ');
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string, options: ImageOptimizationOptions = {}) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  
  if (options.format) {
    link.type = `image/${options.format}`;
  }
  
  document.head.appendChild(link);
};

/**
 * Lazy load images with intersection observer
 */
export const createLazyImageObserver = (
  callback: (entry: IntersectionObserverEntry) => void
): IntersectionObserver => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01
    }
  );
};

/**
 * Optimized image component props generator
 */
export const generateOptimizedImageProps = (
  src: string,
  alt: string,
  options: ImageOptimizationOptions = {}
) => {
  const { width, height, lazy = true } = options;
  
  const props: any = {
    src,
    alt,
    loading: lazy ? 'lazy' : 'eager',
    decoding: 'async'
  };
  
  if (width) props.width = width;
  if (height) props.height = height;
  
  // Generate responsive attributes
  if (width) {
    props.srcSet = generateResponsiveSrcSet(src);
    props.sizes = generateSizesAttribute();
  }
  
  return props;
};

/**
 * Create placeholder for lazy loading
 */
export const createImagePlaceholder = (width: number, height: number, color = '#f3f4f6'): string => {
  // Generate a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
        Loading...
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

/**
 * Image format detection
 */
export const detectImageFormat = (src: string): string => {
  const extension = src.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'avif':
      return 'image/avif';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'image/jpeg';
  }
};

/**
 * Check if browser supports modern image formats
 */
export const checkImageFormatSupport = (): Promise<{
  webp: boolean;
  avif: boolean;
}> => {
  return new Promise((resolve) => {
    const webp = new Image();
    const avif = new Image();
    
    let webpSupported = false;
    let avifSupported = false;
    let checks = 0;
    
    const checkComplete = () => {
      checks++;
      if (checks === 2) {
        resolve({ webp: webpSupported, avif: avifSupported });
      }
    };
    
    webp.onload = () => {
      webpSupported = true;
      checkComplete();
    };
    webp.onerror = () => {
      checkComplete();
    };
    
    avif.onload = () => {
      avifSupported = true;
      checkComplete();
    };
    avif.onerror = () => {
      checkComplete();
    };
    
    // Test images (1x1 pixel)
    webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=';
  });
};