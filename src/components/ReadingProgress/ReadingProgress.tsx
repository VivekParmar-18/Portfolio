import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const ReadingProgress = () => {
  const [rawProgress, setRawProgress] = useState(0);
  const springVal = useSpring(0, { stiffness: 180, damping: 28 });

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const total = scrollHeight - clientHeight;
      const pct = total > 0 ? (scrollTop / total) * 100 : 0;
      setRawProgress(pct);
      springVal.set(pct / 100);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [springVal]);

  if (rawProgress <= 0) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] origin-left"
      style={{
        height: '2px',
        scaleX: springVal,
        background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 50%, #8B5CF6 100%)',
        boxShadow: '0 0 8px rgba(59,130,246,0.5)',
      }}
    />
  );
};

export default ReadingProgress;
