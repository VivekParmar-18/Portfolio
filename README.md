# Vivek Parmar Portfolio

A production-ready personal portfolio built with React, TypeScript, Vite, and Tailwind CSS. This project showcases Vivek Parmar's work as a full-stack engineer with an emphasis on Java, Spring Boot, React, performance, and SEO.

## Overview

This repository powers a modern single-page portfolio with:

- section-based storytelling for experience, projects, skills, education, and contact
- performance-aware animations and interactive UI layers
- SEO-friendly metadata, structured data, and generated crawler assets
- responsive layouts for desktop and mobile
- a Vercel-ready deployment workflow

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Headless UI
- Vercel

## Features

- Single-page portfolio architecture with smooth section navigation
- Reusable component-based UI and content sections
- Search-focused metadata and schema support
- Auto-generated `sitemap.xml`, `robots.txt`, and `security.txt`
- Optimized build output with manual chunk splitting
- Reading progress, cursor effects, and motion-rich presentation
- Centralized personal and portfolio content configuration

## Project Structure

```text
portfolio-website/
├── public/                 # Static assets, icons, manifest, SEO files, resume
├── scripts/                # Build-time SEO generation scripts
├── src/
│   ├── components/         # Reusable UI sections and visual effects
│   ├── data/               # Personal info, skills, projects, blog, contact data
│   ├── hooks/              # SEO, animation, intersection observer, responsive hooks
│   ├── pages/              # Page-level composition
│   ├── utils/              # SEO helpers, animation optimization, performance utilities
│   ├── App.tsx             # App shell and routing
│   └── main.tsx            # Entry point
├── index.html              # Base document, metadata, schema, favicons
├── vite.config.ts          # Build and optimization settings
└── vercel.json             # Deployment headers and rewrite rules
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

This starts the local development server with Vite HMR.

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Runs TypeScript compilation, creates the production build, and generates SEO assets.

```bash
npm run build:prod
```

Generates SEO assets first, then runs the production build pipeline.

```bash
npm run generate-seo
```

Regenerates crawler-facing assets such as `sitemap.xml`, `robots.txt`, and `security.txt`.

```bash
npm run lint
```

Runs ESLint across the project.

```bash
npm run preview
```

Serves the production build locally for verification.

## Personalization

The main profile configuration lives in:

- `src/data/personalData.ts`

Update this file to change:

- name and job title
- biography and about copy
- contact details
- social links
- public site URL
- resume and image references

Additional portfolio content lives in:

- `src/data/projectsData.ts`
- `src/data/experienceData.ts`
- `src/data/skillsData.ts`
- `src/data/educationData.ts`
- `src/data/blogData.ts`
- `src/data/contactData.ts`

## SEO and Search Setup

The project includes:

- canonical metadata in `index.html`
- structured data for `Person`, `WebSite`, and `WebPage`
- manifest and favicon declarations
- generated `robots.txt`
- generated `sitemap.xml`
- `llms.txt` and `humans.txt`

The primary site URL is controlled through:

```env
VITE_SITE_URL=https://your-domain.com
```

If `VITE_SITE_URL` is not set, the app falls back to the default configured domain.

## Deployment

This project is configured for Vercel deployment.

### Deploy

```bash
vercel
```

### Deploy to Production

```bash
vercel --prod
```

Before pushing a domain-sensitive production update, make sure:

- the intended domain is configured in Vercel
- `VITE_SITE_URL` matches the primary public URL
- the site is redeployed after metadata changes

## Performance Notes

This portfolio uses several performance-oriented patterns:

- manual vendor chunk splitting in `vite.config.ts`
- lazy animation setup and cleanup
- preload hints for key assets
- compressed and optimized production output

## Why This Repository Exists

This portfolio is designed to be more than a visual resume. It serves as:

- a public technical profile
- a curated project showcase
- a lightweight engineering content hub
- a production playground for frontend polish, motion, performance, and SEO

## Future Improvements

- add automated tests for critical components and metadata behavior
- add CI checks for linting and production builds
- improve authoring workflow for blog-style content
- add screenshot previews and deeper project case studies

## License

This repository is currently intended for personal portfolio use unless otherwise stated.
