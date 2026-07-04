import { useState, useEffect } from 'react';

// Signature brand easing
const lightEasing = 'var(--ease-brand, ease-out)';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        width: 48, // 44px+ touch target
        height: 48,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 64px, 0) scale(0.8)',
        transition: `all 0.3s ${lightEasing}`, // Faster transition
        willChange: isVisible ? 'auto' : 'transform, opacity', // Dynamic will-change
        backfaceVisibility: 'hidden' // GPU optimization
      }}
      aria-label="Back to top"
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        style={{
          transition: `transform 0.2s ${lightEasing}`
        }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
