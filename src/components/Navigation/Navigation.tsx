import { useState, useEffect, useRef } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { useResponsive } from '../../hooks/useResponsive';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { personal } from '../../data/personalData';

const navItems = [
  { id: 'about',          label: 'About' },
  { id: 'java-expertise', label: 'Architecture' },
  { id: 'skills',         label: 'Skills' },
  { id: 'experience',     label: 'Experience' },
  { id: 'projects',       label: 'Projects' },
  { id: 'education',      label: 'Credentials' },
  { id: 'contact',        label: 'Contact' },
];

const scrollTo = (id: string) => {
  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;

  const contentTarget = el.querySelector('.container') || el;
  const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
  const targetY = Math.max(0, contentTarget.getBoundingClientRect().top + currentScrollY - 76);

  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  });
};

const Navigation = ({ className = '' }: { className?: string }) => {
  const [isScrolled,        setIsScrolled]        = useState(false);
  const [activeSection,     setActiveSection]      = useState('hero');
  const [isMobileMenuOpen,  setIsMobileMenuOpen]   = useState(false);
  const { isMobile, isTablet, isTouchDevice } = useResponsive();
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

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setIsScrolled(window.scrollY > 40);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    );
    document.querySelectorAll('section[id], footer[id]').forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-console-accent focus:text-paper-3 focus:rounded focus:text-xs focus:font-mono focus:shadow-xl"
        onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
      >
        Skip to content
      </a>

      {/* Desktop pill nav */}
      {!isSmall && (
        <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <nav
            aria-label="Primary navigation"
            className={`pointer-events-auto max-w-full ${className}`}
          >
            <div
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border border-rule transition-colors backdrop-blur-md ${
                isScrolled ? 'bg-paper-2/95 shadow-md' : 'bg-paper-2/80'
              }`}
            >
              <button
                type="button"
                onClick={() => scrollTo('hero')}
                aria-label="Scroll to hero"
                className="pl-2 pr-3 py-1 text-xs font-medium text-ink hover:text-console-accent border-r border-rule transition-colors font-display"
              >
                {personal.name}
              </button>

              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  aria-label={`Scroll to ${item.label}`}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                  className={`px-3 py-1 rounded-full text-xs font-body transition-colors ${
                    activeSection === item.id
                      ? 'bg-paper-3 text-console-accent border border-rule-2 font-medium'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Mobile hamburger button */}
      {isSmall && (
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="fixed top-4 right-4 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-paper-2 border border-rule text-ink shadow-lg touch-manipulation"
        >
          {isMobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
        </button>
      )}

      {/* Mobile menu drawer */}
      {isMobileMenuOpen && isSmall && (
        <>
          <div
            className="fixed inset-0 bg-black/80 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={mobileMenuRef}
            className="fixed top-0 right-0 h-full w-64 z-50 flex flex-col bg-paper-2 border-l border-rule p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-rule mb-4">
              <span className="text-sm font-medium text-ink font-display">{personal.name}</span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded text-ink-muted hover:text-ink bg-paper-3 border border-rule"
                aria-label="Close mobile menu"
              >
                <HiX className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto space-y-1" aria-label="Mobile navigation links">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { scrollTo(item.id); setIsMobileMenuOpen(false); }}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                  className={`w-full text-left px-3 py-2.5 rounded text-xs font-body transition-colors ${
                    activeSection === item.id
                      ? 'bg-paper-3 text-console-accent border border-rule-2 font-medium'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="pt-4 border-t border-rule text-[11px] font-mono text-ink-muted">
              {personal.role}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;