import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useResponsive, useReducedMotion } from '../../hooks/useResponsive';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';

interface NavigationProps {
  className?: string;
}

const navigationItems = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'java-expertise', label: 'Java Skills', href: '#java-expertise' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// Smooth easing curve - using string format for framer-motion
const smoothEasing = "easeOut";

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { isMobile, isTablet, isTouchDevice } = useResponsive();
  const prefersReducedMotion = useReducedMotion();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Delay initial animation to prevent jank
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Swipe gesture for closing mobile menu
  const { attachSwipeListeners } = useSwipeGesture({
    onSwipeRight: () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    },
    threshold: 100
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navigationItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };

    const handleSectionChange = (event: CustomEvent) => {
      setActiveSection(event.detail.sectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('sectionChange', handleSectionChange as EventListener);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('sectionChange', handleSectionChange as EventListener);
    };
  }, []);

  // Attach swipe listeners to mobile menu
  useEffect(() => {
    if (mobileMenuRef.current && isTouchDevice) {
      return attachSwipeListeners(mobileMenuRef.current);
    }
  }, [attachSwipeListeners, isTouchDevice, isMobileMenuOpen]);

  const handleNavigation = (item: typeof navigationItems[0]) => {
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(item.id);
      setIsMobileMenuOpen(false);
      
      // Dispatch custom event for section change
      const event = new CustomEvent('sectionChange', {
        detail: { sectionId: item.id }
      });
      window.dispatchEvent(event);
    }
  };

  if (!isReady) return null;

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: prefersReducedMotion ? 0.1 : 0.6, 
          ease: smoothEasing
        }}
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${className} ${
          isMobile || isTablet ? 'hidden' : 'block'
        }`}
        style={{ willChange: 'transform, opacity' }}
      >
        <motion.div
          animate={{
            backgroundColor: isScrolled 
              ? 'rgba(15, 23, 42, 0.9)' 
              : 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(16px)',
          }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.4, ease: smoothEasing }}
          className="px-6 py-3 rounded-full border border-slate-700/50 shadow-2xl"
        >
          <ul className="flex items-center space-x-6 lg:space-x-8">
            {navigationItems.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: prefersReducedMotion ? 0 : index * 0.08, 
                  duration: prefersReducedMotion ? 0.1 : 0.5,
                  ease: smoothEasing
                }}
              >
                <button
                  onClick={() => handleNavigation(item)}
                  className="relative group touch-manipulation"
                >
                  <motion.span
                    className={`text-sm lg:text-base font-medium transition-colors duration-300 ${
                      activeSection === item.id
                        ? 'text-blue-400'
                        : 'text-slate-300 hover:text-white'
                    }`}
                    whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Hover glow effect - disabled on touch devices */}
                  {!isTouchDevice && (
                    <motion.div
                      className="absolute -inset-2 bg-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
                      initial={false}
                      animate={{ scale: activeSection === item.id ? 1 : 0 }}
                    />
                  )}
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"
                      transition={{ 
                        type: 'spring', 
                        stiffness: 300, 
                        damping: 30,
                        duration: prefersReducedMotion ? 0.1 : undefined
                      }}
                    />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: prefersReducedMotion ? 0 : 0.3, 
          duration: prefersReducedMotion ? 0.1 : 0.5,
          ease: smoothEasing
        }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`fixed top-4 right-4 z-50 p-4 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/50 shadow-lg touch-manipulation ${
          isMobile || isTablet ? 'block' : 'hidden'
        }`}
        whileHover={!prefersReducedMotion && !isTouchDevice ? { scale: 1.1 } : {}}
        whileTap={{ scale: 0.9 }}
        style={{ minHeight: '56px', minWidth: '56px' }} // Touch-friendly size
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.4, ease: smoothEasing }}
        >
          {isMobileMenuOpen ? (
            <HiX className="w-6 h-6 text-white" />
          ) : (
            <HiMenu className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (isMobile || isTablet) && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: smoothEasing }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            
            {/* Menu */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: prefersReducedMotion ? 'tween' : 'spring', 
                stiffness: 300, 
                damping: 30,
                duration: prefersReducedMotion ? 0.2 : undefined
              }}
              className={`fixed top-0 right-0 h-full bg-slate-900/95 backdrop-blur-md border-l border-slate-700/50 z-50 ${
                isMobile ? 'w-full' : 'w-80'
              }`}
            >
              <div className="pt-20 px-6 h-full overflow-y-auto">
                <ul className="space-y-4">
                  {navigationItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        delay: prefersReducedMotion ? 0 : index * 0.08, 
                        duration: prefersReducedMotion ? 0.1 : 0.5,
                        ease: smoothEasing
                      }}
                    >
                      <button
                        onClick={() => handleNavigation(item)}
                        className="block w-full text-left group touch-manipulation"
                        style={{ minHeight: '60px' }} // Touch-friendly height
                      >
                        <motion.div
                          className={`p-4 rounded-xl transition-all duration-300 ${
                            activeSection === item.id
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'text-slate-300 hover:bg-slate-800/50 hover:text-white border border-transparent'
                          }`}
                          whileHover={!prefersReducedMotion ? { x: 10, scale: 1.02 } : {}}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-xl font-medium">{item.label}</span>
                          {activeSection === item.id && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ 
                                duration: prefersReducedMotion ? 0.1 : 0.5,
                                ease: smoothEasing
                              }}
                              className="h-0.5 bg-blue-400 mt-3 rounded-full"
                            />
                          )}
                        </motion.div>
                      </button>
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile Menu Footer */}
                <div className="mt-8 pt-8 border-t border-slate-700/50">
                  <div className="flex items-center justify-center space-x-2 text-slate-400 text-sm">
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-lg"
                    >
                      👉
                    </motion.div>
                    <p>Swipe right to close menu</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;