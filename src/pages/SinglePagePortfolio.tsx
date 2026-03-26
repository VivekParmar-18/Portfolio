// SinglePagePortfolio with lazy-loaded sections
import { useEffect, lazy, Suspense } from 'react';
import {
  Navigation,
  PageTransition,
  Hero,
  Skills,
  BackgroundElements,
  ContactCard,
  ContactForm,
  ScrollToTop,
  contactMethods
} from '../index';

// Lazy-loaded components
const LazyAbout = lazy(() => import('../components/About/About'));
const LazyJavaExpertise = lazy(() => import('../components/JavaExpertise/JavaExpertise'));
const LazyExperience = lazy(() => import('../components/Experience/Experience'));
const LazyProjects = lazy(() => import('../components/Projects/Projects'));
const LazyBlog = lazy(() => import('../components/Blog/Blog'));

const SinglePagePortfolio = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-active');
          const event = new CustomEvent('sectionChange', {
            detail: {
              sectionId: entry.target.id,
              intersectionRatio: entry.intersectionRatio
            }
          });
          window.dispatchEvent(event);
        } else {
          entry.target.classList.remove('section-active');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      sections.forEach((section) => observer.unobserve(section));
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-900 relative overflow-x-hidden max-w-full">
        {/* Background Parallax Elements */}
        <BackgroundElements />
        <Navigation />
        {/* Hero Section */}
        <Hero />
        {/* About Section */}
        <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading About...</div>}>
          <LazyAbout />
        </Suspense>
        
        {/* Java Expertise Section */}
        <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading Java Expertise...</div>}>
          <LazyJavaExpertise />
        </Suspense>
        
        {/* Skills Section */}
        <section id="skills">
          <Skills />
        </section>
        
        {/* Experience Section */}
        <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading Experience...</div>}>
          <LazyExperience />
        </Suspense>
        
        {/* Projects Section */}
        <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading Projects...</div>}>
          <LazyProjects />
        </Suspense>
        
        {/* Blog Section */}
        <Suspense fallback={<div className="text-center py-20 text-slate-400">Loading Blog...</div>}>
          <LazyBlog />
        </Suspense>
        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center bg-slate-800 relative py-20 overflow-hidden max-w-full"
        >
          <div className="max-w-6xl mx-auto px-6 w-full">
            {/* Header */}
            <div className="text-center mb-16">
              <h2
                className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Get In Touch
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Ready to work together? Let's create something amazing. I'm always excited to discuss new opportunities and innovative projects.
              </p>
            </div>
            {/* Contact Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <ContactCard
                  key={method.title}
                  title={method.title}
                  description={method.description}
                  value={method.value || ''}
                  action={method.action}
                  icon={method.icon}
                  color={method.color as 'blue' | 'emerald' | 'purple'}
                  index={index}
                />
              ))}
            </div>
            {/* Contact Form */}
            <div className="mb-16">
              <h3 className="text-3xl font-semibold text-white text-center mb-12">
                Send Me a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </section>
        {/* Scroll to Top Button */}
        <ScrollToTop />
      </div>
    </PageTransition>
  );
};

export default SinglePagePortfolio;