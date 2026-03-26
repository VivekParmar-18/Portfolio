// ============================================
// SINGLE CONSOLIDATED INDEX FILE
// All exports from the entire project
// ============================================

// ============================================
// COMPONENTS
// ============================================
export { default as Navigation } from './components/Navigation/Navigation';
export { default as PageTransition } from './components/PageTransition/PageTransition';
export { default as LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
export { default as PageLoader } from './components/PageLoader/PageLoader';
export { default as Hero } from './components/Hero/Hero';
export { default as CTAButton } from './components/CTAButton/CTAButton';
export { default as Skills } from './components/Skills/Skills';
export { default as ContactCard } from './components/ContactCard/ContactCard';
export { default as SocialLinks } from './components/SocialLinks/SocialLinks';
export { default as ContactForm } from './components/ContactForm/ContactForm';
export { default as ScrollToTop } from './components/ScrollToTop/ScrollToTop';
export { default as TouchButton } from './components/TouchButton/TouchButton';
export { default as PullToRefresh } from './components/PullToRefresh/PullToRefresh';
export { default as AnimatedCounter } from './components/AnimatedCounter/AnimatedCounter';
export { default as ParallaxElement } from './components/ParallaxElement/ParallaxElement';
export { default as ScrollReveal } from './components/ScrollReveal/ScrollReveal';
export { default as Statistics } from './components/Statistics/Statistics';
export { default as BackgroundElements } from './components/BackgroundElements/BackgroundElements';
export { default as Timeline } from './components/Timeline/Timeline';
export { default as CursorFollower } from './components/CursorFollower/CursorFollower';
export { default as MagneticHover } from './components/MagneticHover/MagneticHover';
export { default as SectionLoader } from './components/SectionLoader/SectionLoader';
export { default as AnimatedIcons } from './components/AnimatedIcons/AnimatedIcons';
export { default as EnhancedButton } from './components/EnhancedButton/EnhancedButton';
export { default as RippleEffect } from './components/RippleEffect/RippleEffect';
export { default as Typewriter } from './components/Typewriter/Typewriter';

// New modular components
export { default as About } from './components/About/About';
export { default as Experience } from './components/Experience/Experience';
export { default as Projects } from './components/Projects/Projects';
export { default as Education } from './components/Education/Education';

// ============================================
// PAGES
// ============================================
export { default as Home } from './pages/Home';
export { default as Contact } from './pages/Contact';
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
export { skillsData } from './data/skillsData';
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
