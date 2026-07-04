// ============================================
// SINGLE CONSOLIDATED INDEX FILE
// All exports from the entire project
// ============================================

// ============================================
// COMPONENTS
// ============================================
export { default as Navigation } from './components/Navigation/Navigation';
export { default as LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
export { default as Hero } from './components/Hero/Hero';
export { default as Skills } from './components/Skills/Skills';
export { default as ContactCard } from './components/ContactCard/ContactCard';
export { default as SocialLinks } from './components/SocialLinks/SocialLinks';
export { default as ContactForm } from './components/ContactForm/ContactForm';
export { default as ScrollToTop } from './components/ScrollToTop/ScrollToTop';
export { default as AnimatedCounter } from './components/AnimatedCounter/AnimatedCounter';
export { default as ScrollReveal } from './components/ScrollReveal/ScrollReveal';
export { default as Statistics } from './components/Statistics/Statistics';
export { default as BackgroundElements } from './components/BackgroundElements/BackgroundElements';
export { default as MagneticHover } from './components/MagneticHover/MagneticHover';
export { default as SectionLoader } from './components/SectionLoader/SectionLoader';

// New modular components
export { default as About } from './components/About/About';
export { default as Experience } from './components/Experience/Experience';
export { default as Projects } from './components/Projects/Projects';
export { default as Education } from './components/Education/Education';

// ============================================
// PAGES
// ============================================
export { default as SinglePagePortfolio } from './pages/SinglePagePortfolio';

// ============================================
// HOOKS
// ============================================
export { useIntersectionObserver } from './hooks/useIntersectionObserver';
export { useResponsive, useReducedMotion } from './hooks/useResponsive';
export { useSEO } from './hooks/useSEO';

// ============================================
// TYPES
// ============================================
export type {
  DeveloperProfile,
  SkillCategory,
  Skill,
  Technology,
  WorkExperience,
  ContactInfo,
  SocialLink,
  Project
} from './types/types';

// ============================================
// DATA
// ============================================
export { skillTiers } from './data/skillsData';
export { contactMethods } from './data/contactData';
export { experienceData } from './data/experienceData';
export { projectsData } from './data/projectsData';
export { educationData } from './data/educationData';

// ============================================
// UTILITIES
// ============================================
export * from './utils/animations';
export { initializeLazyLoading } from './utils/lazyAnimationLoader';
export { animationCleanupRegistry } from './utils/animationOptimization';
