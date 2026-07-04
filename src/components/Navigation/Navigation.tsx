import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useResponsive, useReducedMotion } from '../../hooks/useResponsive';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { personal } from '../../data/personalData';

// "Home" lives on the logo; keeping the list short so the pill never clips.
const navItems = [
  { id: 'about',         label: 'About' },
  { id: 'java-expertise',label: 'Backend' },
  { id: 'skills',        label: 'Skills' },
  { id: 'experience',    label: 'Experience' },
  { id: 'projects',      label: 'Projects' },
  { id: 'education',     label: 'Education' },
  { id: 'contact',       label: 'Contact' },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Navigation = ({ className = '' }: { className?: string }) => {
  const [isScrolled,        setIsScrolled]        = useState(false);
  const [activeSection,     setActiveSection]      = useState('hero');
  const [isMobileMenuOpen,  setIsMobileMenuOpen]   = useState(false);
  const { isMobile, isTablet, isTouchDevice } = useResponsive();
  const prefersReducedMotion = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const isSmall = isMobile || isTablet;

  const { attachSwipeListeners } = useSwipeGesture({
    onSwipeRight: () => isMobileMenuOpen && setIsMobileMenuOpen(false),
    threshold: 80,
  });

  useEffect(() => {
    if (mobileMenuRef.current && isTouchDevice) {
      return attachSwipeListeners(mobileMenuRef.current);
    }
  }, [attachSwipeListeners, isTouchDevice, isMobileMenuOpen]);

  // Nav background state: rAF-throttled, reads only scrollY — no layout reads.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setIsScrolled(window.scrollY > 50);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver — the previous version read
  // offsetTop of every section on every scroll event (layout thrash).
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    // #contact is a <footer>, so match any element with an id we navigate to
    document.querySelectorAll('section[id], footer[id]').forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* ── Skip to content for Accessibility ── */}
      <a 
        href="#hero" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:z-[100] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:font-bold focus:shadow-2xl focus:shadow-blue-500/50 transition-all outline-none"
        onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
      >
        Skip to Content
      </a>

      {/* ── Desktop pill nav ── */}
      {/* Centering lives on this wrapper: framer-motion owns the nav's transform for the
          y-entrance, which would clobber a Tailwind -translate-x-1/2 on the same element. */}
      {!isSmall && (
        <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.5, ease: 'easeOut' }}
          className={`pointer-events-auto max-w-full ${className}`}
        >
          <div
            className="flex items-center gap-0.5 xl:gap-1 px-3 xl:px-4 py-2 rounded-full"
            style={{
              background: isScrolled ? 'rgba(10,15,30,0.92)' : 'rgba(10,15,30,0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.2)',
              transition: 'background var(--dur-micro) var(--ease-brand), box-shadow var(--dur-micro) var(--ease-brand)',
            }}
          >
            {/* Logo — scrolls to top */}
            <button
              onClick={() => scrollTo('hero')}
              aria-label="Scroll to top"
              className="pl-1 pr-2 xl:pr-3 mr-1 py-1 text-sm font-bold text-white whitespace-nowrap border-r border-white/10 hover:text-blue-400 transition-colors"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}
            >
              Vivek Parmar
            </button>

            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                aria-label={`Scroll to ${item.label}`}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className="relative px-2 xl:px-3 py-1.5 rounded-full text-[13px] xl:text-sm font-medium transition-colors whitespace-nowrap"
                style={{ color: activeSection === item.id ? '#fff' : 'rgba(148,163,184,0.9)' }}
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                whileTap={{ scale: 0.95 }}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.35)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.nav>
        </div>
      )}

      {/* ── Mobile hamburger ── */}
      {isSmall && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: prefersReducedMotion ? 0.1 : 0.3 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          className="fixed top-4 right-4 z-50 flex items-center justify-center rounded-full touch-manipulation"
          style={{
            width: 52, height: 52,
            background: 'rgba(10,15,30,0.92)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
            {isMobileMenuOpen ? <HiX className="w-5 h-5 text-white" /> : <HiMenu className="w-5 h-5 text-white" />}
          </motion.div>
        </motion.button>
      )}

      {/* ── Mobile menu drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && isSmall && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            />
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 35 }}
              className="fixed top-0 right-0 h-full w-72 z-50 flex flex-col"
              style={{ background: 'rgba(8,12,24,0.97)', backdropFilter: 'blur(24px)', borderLeft: '1px solid rgba(255,255,255,0.07)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.06]">
                <span className="text-white font-bold" style={{ fontFamily: 'var(--font-display)' }}>{personal.name}</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white" 
                  aria-label="Close mobile menu"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <HiX className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile navigation links">
                <ul className="space-y-1">
                  {navItems.map((item, i) => (
                    <motion.li key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                    >
                      <button
                        onClick={() => { scrollTo(item.id); setIsMobileMenuOpen(false); }}
                        className="w-full text-left px-4 py-3 rounded-xl font-medium transition-all"
                        aria-label={`Navigate to ${item.label}`}
                        aria-current={activeSection === item.id ? 'true' : undefined}
                        style={{
                          color: activeSection === item.id ? '#60a5fa' : 'rgba(148,163,184,0.9)',
                          background: activeSection === item.id ? 'rgba(59,130,246,0.1)' : 'transparent',
                          border: `1px solid ${activeSection === item.id ? 'rgba(59,130,246,0.2)' : 'transparent'}`,
                          fontSize: '0.95rem',
                        }}
                      >
                        {item.label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;