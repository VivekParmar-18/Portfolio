# Profile Photo Instructions

## Current Setup
- The portfolio currently uses `/profile-photo.jpg` as a placeholder profile image
- This SVG creates a professional silhouette with a gradient background

## To Replace with Your Actual Photo

1. **Prepare your photo:**
   - Use a professional headshot
   - Recommended size: 300x300 pixels or larger (square aspect ratio)
   - Supported formats: JPG, PNG, WebP, or SVG

2. **Replace the file:**
   - Save your photo as `profile-photo.jpg` (or keep the .svg extension if using SVG)
   - Place it in the `public/` folder
   - Update the file extension in the code if needed:
     - `portfolio-website/src/components/Hero/Hero.tsx` (line ~26)
     - `portfolio-website/src/pages/SinglePagePortfolio.tsx` (line ~133)
     - `portfolio-website/src/utils/seoUtils.ts` (line ~205)

3. **File naming options:**
   - Keep as `profile-photo.jpg` (no code changes needed)
   - Or rename to `profile-photo.jpg` and update the 3 files above

## Current Usage
The profile photo appears in:
- Hero section (main landing page)
- About section (SinglePagePortfolio page)
- SEO meta tags for social sharing