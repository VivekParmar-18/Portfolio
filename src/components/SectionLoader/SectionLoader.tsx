import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface SectionLoaderProps {
  isLoading: boolean;
  message?: string;
  /** Kept for backward compatibility — the skeleton renders the same for all variants. */
  variant?: 'dots' | 'pulse' | 'wave' | 'spiral';
  className?: string;
}

// Subtle skeleton that mirrors the section rhythm (eyebrow, heading, card grid),
// so a lazy-loading section never looks broken while its chunk downloads.
export const SectionLoader: React.FC<SectionLoaderProps> = ({
  isLoading,
  message = 'Loading section',
  className = ''
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={`py-24 md:py-32 2xl:py-40 ${className}`}
          role="status"
          aria-label={message}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="animate-pulse">
              {/* Eyebrow placeholder */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="w-6 h-px bg-slate-800" />
                <span className="h-3 w-24 rounded bg-slate-800/80" />
                <span className="w-6 h-px bg-slate-800" />
              </div>
              {/* Heading placeholder */}
              <div className="h-10 md:h-12 w-2/3 max-w-md mx-auto rounded-xl bg-slate-800/60 mb-14" />
              {/* Card placeholders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-44 rounded-2xl bg-slate-900/80 border border-white/[0.04]" />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionLoader;
