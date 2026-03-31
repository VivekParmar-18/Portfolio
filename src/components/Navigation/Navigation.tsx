import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useResponsive, useReducedMotion } from '../../hooks/useResponsive';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { personal } from '../../data/personalData';

const navItems = [
  { id: 'hero',          label: 'Home' },
  { id: 'about',         label: 'About' },
  { id: 'java-expertise',label: 'Java' },
  { id: 'skills',        label: 'Skills' },
  { id: 'experience',    label: 'Experience' },
  { id: 'projects',      label: 'Projects' },
  { id: 'blog',          label: 'Blog' },
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
  const [isReady,           setIsReady]            = useState(false);
  const { isMobile, isTablet, isTouchDevice } = useResponsive();
  const prefersReducedMotion = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const isSmall = isMobile || isTablet;

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  const { attachSwipeListeners } = useSwipeGesture({
    onSwipeRight: () => isMobileMenuOpen && setIsMobileMenuOpen(false),
    threshold: 80,
  });

  useEffect(() => {
    if (mobileMenuRef.current && isTouchDevice) {
      return attachSwipeListeners(mobileMenuRef.current);
    }
  }, [attachSwipeListeners, isTouchDevice, isMobileMenuOpen]);

  // Scroll-based active section
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let active = 'hero';
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollY) active = item.id;
      }
      setActiveSection(active);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isReady) return null;

  return (
    <>
      {/* ── Desktop pill nav ── */}
      {!isSmall && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.5, ease: 'easeOut' }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 ${className}`}
        >
          <div
            className="flex items-center gap-1 px-4 py-2 rounded-full"
            style={{
              background: isScrolled ? 'rgba(10,15,30,0.92)' : 'rgba(10,15,30,0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.2)',
              transition: 'background 0.3s, box-shadow 0.3s',
            }}
          >
            {/* Logo removed as requested */}

            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
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
      )}

      {/* ── Mobile hamburger ── */}
      {isSmall && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: prefersReducedMotion ? 0.1 : 0.3 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                <span className="text-white font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{personal.name}</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <HiX className="w-5 h-5" />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
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

              <div className="px-6 py-4 border-t border-white/[0.06]">
                <p className="text-slate-600 text-xs text-center" style={{ fontFamily: "'Fira Code', monospace" }}>Swipe right to close</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;