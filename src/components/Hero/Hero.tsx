import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FiDownload, FiMail } from 'react-icons/fi';
import { personal } from '../../data/personalData';
import { useResponsive, useReducedMotion } from '../../hooks/useResponsive';
import MagneticHover from '../MagneticHover/MagneticHover';

const techBadges = [
  { label: 'Java', color: '#E85D24', bg: 'rgba(232,93,36,0.12)' },
  { label: 'React', color: '#61DAFB', bg: 'rgba(97,218,251,0.10)' },
  { label: 'Spring Boot', color: '#6DB33F', bg: 'rgba(109,179,63,0.10)' },
  { label: 'TypeScript', color: '#3B82F6', bg: 'rgba(59,130,246,0.10)' },
];


const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isDownloading, setIsDownloading] = useState(false);
  const { isMobile, isTouchDevice } = useResponsive();
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle mouse-parallax for desktop
  useEffect(() => {
    if (isMobile || isTouchDevice || prefersReducedMotion) return;
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 18,
      });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [isMobile, isTouchDevice, prefersReducedMotion]);

  useEffect(() => { controls.start('visible'); }, [controls]);

  // ✅ Real download
  const handleDownloadCV = () => {
    setIsDownloading(true);
    const a = document.createElement('a');
    a.href = personal.resumeUrl;
    a.download = `${personal.name.replace(' ', '_')}_Resume.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setIsDownloading(false), 1500);
  };

  const handleContactClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0.03 : 0.12, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0.15 : 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
  };
  const imgVariants: Variants = {
    hidden: { opacity: 0, scale: 0.88, x: isMobile ? 0 : 55 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: prefersReducedMotion ? 0.15 : 0.85, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Mesh gradient background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(59,130,246,0.09) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(139,92,246,0.07) 0%, transparent 60%)',
          }}
        />
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute rounded-full"
              style={{
                width: isMobile ? 220 : 420,
                height: isMobile ? 220 : 420,
                top: '8%', left: '-12%',
                background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{ x: mousePos.x * 0.45, y: mousePos.y * 0.45 }}
              transition={{ type: 'spring', stiffness: 40, damping: 22 }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: isMobile ? 160 : 360,
                height: isMobile ? 160 : 360,
                bottom: '12%', right: '-6%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{ x: mousePos.x * -0.28, y: mousePos.y * -0.28 }}
              transition={{ type: 'spring', stiffness: 32, damping: 20 }}
            />
          </>
        )}
      </div>

      {/* ── Main content ── */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-12 z-10 pt-20"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        <div className={`flex ${isMobile ? 'flex-col-reverse gap-10 text-center' : 'flex-row gap-16 items-center'}`}>

          {/* ── Text column ── */}
          <div className={`flex-1 ${isMobile ? '' : 'max-w-xl'}`}>

            {/* Status badge */}
            <motion.div variants={item} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', color: '#60a5fa', fontFamily: 'var(--font-display)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-[pulse_2s_infinite]" />
                System Architect in training
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={item} className="text-blue-400 font-medium text-sm mb-1 tracking-widest uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>
              Hi, I'm
            </motion.p>

            {/* Name */}
            <motion.h1 
              variants={item} 
              className="font-extrabold leading-tight mb-4 premium-gradient-text" 
              style={{ 
                fontSize: isMobile ? '3.5rem' : '5.5rem', 
                letterSpacing: '-0.04em',
                fontFamily: 'var(--font-display)' 
              }}
            >
              {personal.name}
            </motion.h1>

            {/* Title */}
            <motion.h2 variants={item} className="font-bold text-slate-300 mb-8" style={{ fontSize: isMobile ? '1.1rem' : '1.75rem', letterSpacing: '-0.02em', lineHeight: 1.25, maxWidth: '540px' }}>
              Turning industrial-strength <span className="text-blue-400">Java</span> into elegant <span className="text-emerald-400">Products</span>.
            </motion.h2>

        {/* Bio */}
        <motion.p variants={item} className="text-slate-400 leading-relaxed mb-8"
          style={{ fontSize: isMobile ? '0.875rem' : '1rem', maxWidth: '460px', margin: isMobile ? '0 auto 2rem' : '0 0 2rem' }}>
          {personal.bio}
        </motion.p>

        {/* Tech badges */}
        <motion.div variants={item} className={`flex flex-wrap gap-2 mb-12 ${isMobile ? 'justify-center max-w-[300px] mx-auto' : ''}`}>
          {techBadges.map((b) => (
            <span key={b.label} className="px-3 py-1.5 rounded-md text-[10px] font-medium"
              style={{ color: b.color, background: b.bg, border: `1px solid ${b.color}28`, fontFamily: "'Fira Code', monospace" }}>
              {b.label}
            </span>
          ))}
        </motion.div>

        {/* ── CTA buttons ── */}
        <motion.div variants={item} className={`flex gap-4 ${isMobile ? 'flex-col items-center' : 'flex-row'}`}>
          <MagneticHover strength={0.2} disabled={isTouchDevice || prefersReducedMotion}>
            <button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              aria-label="Download Resume"
              className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all select-none text-sm active:scale-95 shadow-xl shadow-blue-500/20"
              style={{
                background: isDownloading ? 'rgba(59,130,246,0.5)' : 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                width: isMobile ? '240px' : 'auto',
              }}
            >
              <FiDownload size={18} className={isDownloading ? 'animate-bounce' : 'group-hover:-translate-y-1 transition-transform'} />
              {isDownloading ? 'Downloading...' : 'Download Resume'}
            </button>
          </MagneticHover>

          <MagneticHover strength={0.2} disabled={isTouchDevice || prefersReducedMotion}>
            <button
              onClick={handleContactClick}
              aria-label="Contact Vivek"
              className="glass-card flex items-center justify-center gap-2 px-8 py-4 font-bold text-slate-300 hover:text-white transition-all select-none text-sm active:scale-95 border-white/5 hover:border-white/20"
              style={{
                borderRadius: '9999px',
                width: isMobile ? '240px' : 'auto',
              }}
            >
              <FiMail size={18} />
              Get in Touch
            </button>
          </MagneticHover>
        </motion.div>
      </div>

      {/* ── Photo column ── */}
      <motion.div
        className={`relative flex-shrink-0 ${isMobile ? 'flex justify-center mx-auto mb-10' : ''}`}
        variants={imgVariants}
        style={{
          x: !isMobile && !prefersReducedMotion ? mousePos.x * 0.08 : 0,
          width: isMobile ? 180 : 340,
          height: isMobile ? 180 : 340
        }}
      >
        {/* Conic gradient ring */}
        <div
          className={`absolute inset-0 rounded-full ${isMobile ? 'scale-[1.08]' : 'scale-[1.05]'}`}
          aria-hidden="true"
          style={{
            background: 'conic-gradient(from 0deg, #3B82F6, #8B5CF6, #10B981, #F59E0B, #3B82F6)',
            filter: 'blur(2px)',
            borderRadius: '50%',
          }}
        />

        {/* Photo */}
        <motion.div
          className="relative rounded-full overflow-hidden"
          style={{
            width: '100%',
            height: '100%',
            border: '4px solid var(--bg-dark)',
            boxShadow: '0 0 60px rgba(59,130,246,0.25)',
            background: 'var(--bg-dark)',
            zIndex: 2,
          }}
          whileHover={!isTouchDevice ? { scale: 1.05 } : {}}
          transition={{ duration: 0.4 }}
        >
          <img
            src={personal.profileImage}
            alt={`${personal.name} profile`}
            className={`w-full h-full object-cover transition-transform duration-700 hover:scale-110 ${isMobile ? 'scale-[1.5]' : 'scale-110'}`}
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = 'none';
              const p = t.parentElement!;
              p.style.background = 'linear-gradient(135deg, #1E3A5F 0%, #0f172a 100%)';
              p.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem">👨‍💻</div>';
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="text-slate-600 text-xs tracking-widest uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-slate-700 flex justify-center pt-1.5 overflow-hidden">
          <motion.div
            className="w-1 h-2 rounded-full bg-blue-400"
            aria-hidden="true"
            animate={!prefersReducedMotion ? { y: [0, 12, 0], opacity: [1, 0, 1] } : {}}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;