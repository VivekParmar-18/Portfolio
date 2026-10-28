const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '../public');
const bannerSvgPath = path.join(publicDir, 'banner.svg');
const bannerSvgBuffer = fs.readFileSync(bannerSvgPath);

async function run() {
  console.log('🚀 Generating all OS, banner, WebP, SVG, and platform assets...');

  // 1. Social Banners from banner.svg
  console.log('Rendering 1280x640 Banners...');
  await sharp(bannerSvgBuffer)
    .resize(1280, 640)
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'banner.png'));
  console.log('✅ banner.png generated');

  await sharp(bannerSvgBuffer)
    .resize(1280, 640)
    .webp({ quality: 90, effort: 6 })
    .toFile(path.join(publicDir, 'banner.webp'));
  console.log('✅ banner.webp generated');

  // 2. Open Graph WebP (1200x630)
  await sharp(bannerSvgBuffer)
    .resize(1200, 630)
    .webp({ quality: 90, effort: 6 })
    .toFile(path.join(publicDir, 'og-image.webp'));
  console.log('✅ og-image.webp generated');

  // Re-generate og-image.png and og-image.jpg at 1200x630 from crisp banner vector
  await sharp(bannerSvgBuffer)
    .resize(1200, 630)
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('✅ og-image.png updated with vector banner');

  await sharp(bannerSvgBuffer)
    .resize(1200, 630)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log('✅ og-image.jpg updated');

  // 3. Twitter / X Header Banner (1200x600)
  await sharp(bannerSvgBuffer)
    .resize(1200, 600)
    .png({ quality: 95 })
    .toFile(path.join(publicDir, 'twitter-banner.png'));

  await sharp(bannerSvgBuffer)
    .resize(1200, 600)
    .webp({ quality: 90 })
    .toFile(path.join(publicDir, 'twitter-banner.webp'));
  console.log('✅ twitter-banner.png and .webp generated');

  // 4. Windows Microsoft Tiles (mstile)
  // Base icon SVG for tiles & icons
  const iconSvg = (size, isWide = false) => {
    const w = size;
    const h = isWide ? Math.round(size * 150 / 310) : size;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.round(Math.min(w, h) * 0.28);
    const innerRadius = Math.round(radius * 0.35);

    if (isWide) {
      return Buffer.from(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
          <rect width="${w}" height="${h}" fill="#050505"/>
          <circle cx="${Math.round(h / 2)}" cy="${cy}" r="${radius}" fill="#ff4c24"/>
          <circle cx="${Math.round(h / 2)}" cy="${cy}" r="${innerRadius}" fill="#ffffff"/>
          <text x="${Math.round(h * 1.1)}" y="${cy - 4}" font-family="Host Grotesk, sans-serif" font-size="28" font-weight="700" fill="#f4f1ee">Vivek Parmar</text>
          <text x="${Math.round(h * 1.1)}" y="${cy + 22}" font-family="monospace" font-size="12" letter-spacing="1.5" fill="rgba(244,241,238,0.5)">JAVA BACKEND ENGINEER</text>
        </svg>
      `);
    }

    return Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <rect width="${w}" height="${h}" fill="#050505"/>
        <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="${Math.round(w * 0.2)}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#ff4c24"/>
        <circle cx="${cx}" cy="${cy}" r="${innerRadius}" fill="#ffffff"/>
      </svg>
    `);
  };

  await sharp(iconSvg(70)).png().toFile(path.join(publicDir, 'mstile-70x70.png'));
  await sharp(iconSvg(150)).png().toFile(path.join(publicDir, 'mstile-150x150.png'));
  await sharp(iconSvg(310)).png().toFile(path.join(publicDir, 'mstile-310x310.png'));
  await sharp(iconSvg(310, true)).png().toFile(path.join(publicDir, 'mstile-310x150.png'));
  console.log('✅ Windows mstile tiles (70x70, 150x150, 310x310, 310x150) generated');

  // 5. Apple Touch Icons for iOS/iPadOS
  const appleSvg = (size) => {
    const cx = size / 2;
    const cy = size / 2;
    const radius = Math.round(size * 0.28);
    const innerRadius = Math.round(radius * 0.35);
    return Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <rect width="${size}" height="${size}" fill="#050505"/>
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#ff4c24"/>
        <circle cx="${cx}" cy="${cy}" r="${innerRadius}" fill="#ffffff"/>
      </svg>
    `);
  };

  await sharp(appleSvg(180)).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  await sharp(appleSvg(152)).png().toFile(path.join(publicDir, 'apple-touch-icon-152x152.png'));
  await sharp(appleSvg(167)).png().toFile(path.join(publicDir, 'apple-touch-icon-167x167.png'));
  await sharp(appleSvg(120)).png().toFile(path.join(publicDir, 'apple-touch-icon-120x120.png'));
  console.log('✅ Apple Touch icons (180, 152, 167, 120) generated');

  // 6. Favicon extra sizes
  await sharp(appleSvg(48)).png().toFile(path.join(publicDir, 'favicon-48x48.png'));
  await sharp(appleSvg(96)).png().toFile(path.join(publicDir, 'favicon-96x96.png'));
  console.log('✅ favicon 48x48 and 96x96 generated');

  // 7. Android Maskable Icons (Extra padding so circular crop doesn't touch the icon mark)
  const maskableSvg = (size) => {
    const cx = size / 2;
    const cy = size / 2;
    // 60% of size is the inner safe area for Android adaptive icons
    const radius = Math.round(size * 0.20);
    const innerRadius = Math.round(radius * 0.35);
    return Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <!-- Full bleed dark background fills entire mask canvas -->
        <rect width="${size}" height="${size}" fill="#050505"/>
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#ff4c24"/>
        <circle cx="${cx}" cy="${cy}" r="${innerRadius}" fill="#ffffff"/>
      </svg>
    `);
  };

  await sharp(maskableSvg(192)).png().toFile(path.join(publicDir, 'maskable-icon-192x192.png'));
  await sharp(maskableSvg(512)).png().toFile(path.join(publicDir, 'maskable-icon-512x512.png'));
  console.log('✅ Android maskable icons (192, 512) generated with safe zone padding');

  // 8. WebP equivalents of Android PWA icons
  await sharp(appleSvg(192)).webp({ quality: 95 }).toFile(path.join(publicDir, 'android-chrome-192x192.webp'));
  await sharp(appleSvg(512)).webp({ quality: 95 }).toFile(path.join(publicDir, 'android-chrome-512x512.webp'));
  console.log('✅ Android chrome WebP icons generated');

  console.log('🎉 All OS, banner, WebP, SVG, and platform assets generated successfully!');
}

run().catch(console.error);

