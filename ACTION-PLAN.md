# Action Plan: Vivek Parmar Portfolio SEO

## 1. Immediate Blockers (Critical)
✅ **None Found**: The portfolio demonstrates an excellent baseline. Indexability, basic schema setup, and base render paths are fully operational.

## 2. Quick Wins (High Impact / Low Effort)
✅ **Resolved**: **Fix Image Bleed via Solid Border**
- **Action**: Modified the Hero avatar border container from an 80% opacity RGBA value to a solid `var(--bg-dark)` base color with explicit `z-index`.
- **Result**: Ensures clean visual flow without conic gradient background blurring over the subject face, improving layout shift UX and visual professionalism.

✅ **Resolved**: **AI Readiness (`llms.txt`)**
- **Action**: Created `/public/llms.txt` outlining the portfolio's core capabilities, tech stack, and experience. 
- **Result**: This specifically targets Perplexity, ChatGPT, and other LLM bots, enabling AI search engines to contextually understand Vivek Parmar's technical foundation without running headless browser scraping.

✅ **Resolved**: **Interactive Element ARIA Roles**
- **Action**: Added `aria-label` to all standalone buttons (Menu, Modal close, External case study links) and dynamically injected `aria-hidden` to decorative loaders.
- **Result**: Boosts PageSpeed Accessibility score and clears up DOM reading structures for search indexers and screen readers.

## 3. Strategic Improvements (Medium/Low Priority - Ongoing)
- **Content Marketing Pipeline**: Introduce actual `.md` files or a headless CMS for the Tech Journal to generate actual crawlable blog posts instead of only mapping predefined JSON structures, optimizing for long-tail technical keywords like "Java Spring Boot architecture strategies."
- **Pre-rendered HTML Generation**: Since the site is a client-side React SPA, utilizing tools like Vite SSG or Next.js export in the future could convert the React components into static HTML. This ensures crawlers without JavaScript execution can index all text immediately. Currently mitigated by explicit JSON-LD schema.
