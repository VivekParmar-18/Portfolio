import { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

// Scroll progress bar driven entirely by a motion value — no React re-renders
// on scroll (setState here previously re-rendered on every scroll event).
export const ReadingProgress = () => {
  const springVal = useSpring(0, { stiffness: 180, damping: 28 });

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      springVal.set(total > 0 ? scrollTop / total : 0);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [springVal]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 origin-left"
      aria-hidden="true"
      style={{
        height: '2px',
        scaleX: springVal,
        background: '#3B82F6',
      }}
    />
  );
};

export default ReadingProgress;
