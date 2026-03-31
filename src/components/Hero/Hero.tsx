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

const stats = [
  { value: '2+', label: 'Years Experience', color: '#3B82F6' },
  { value: '15+', label: 'Projects Delivered', color: '#10B981' },
  { value: '12+', label: 'Technologies', color: '#8B5CF6' },
  { value: '100%', label: 'Dedication', color: '#F59E0B' },
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
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
            <motion.div variants={item} className="mb-5">
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399', fontFamily: "'Fira Code', monospace" }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={item} className="text-blue-400 font-medium text-sm mb-1 tracking-widest uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>
              Hi, I'm
            </motion.p>

            {/* Name */}
            <motion.h1 variants={item} className="font-bold text-white leading-tight mb-4" style={{ fontSize: isMobile ? '2.4rem' : '4.5rem', letterSpacing: '-0.025em' }}>
              {personal.name}
            </motion.h1>

            {/* Title */}
            <motion.h2 variants={item} className="font-semibold text-slate-300 mb-6" style={{ fontSize: isMobile ? '0.95rem' : '1.35rem', letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              {personal.title}
              <span className="text-blue-400"> @ </span>
              <span className="text-emerald-400">{personal.company}</span>
            </motion.h2>

            {/* Bio */}
            <motion.p variants={item} className="text-slate-400 leading-relaxed mb-8"
              style={{ fontSize: isMobile ? '0.875rem' : '1rem', maxWidth: '460px', margin: isMobile ? '0 auto 2rem' : '0 0 2rem' }}>
              {personal.bio}
            </motion.p>

            {/* Tech badges */}
            <motion.div variants={item} className={`flex flex-wrap gap-2 mb-9 ${isMobile ? 'justify-center max-w-[300px] mx-auto' : ''}`}>
              {techBadges.map((b) => (
                <span key={b.label} className="px-2.5 py-1 rounded-md text-[10px] font-medium"
                  style={{ color: b.color, background: b.bg, border: `1px solid ${b.color}28`, fontFamily: "'Fira Code', monospace" }}>
                  {b.label}
                </span>
              ))}
            </motion.div>

            {/* ── CTA buttons ── */}
            <motion.div variants={item} className={`flex gap-3 ${isMobile ? 'flex-col items-center' : 'flex-row'}`}>
              <MagneticHover strength={0.2} disabled={isTouchDevice || prefersReducedMotion}>
                <button
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all select-none text-sm"
                  style={{
                    background: isDownloading ? 'rgba(59,130,246,0.5)' : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                    boxShadow: '0 0 20px rgba(59,130,246,0.2)',
                    width: isMobile ? '200px' : 'auto',
                  }}
                >
                  <FiDownload size={16} className={isDownloading ? 'animate-bounce' : ''} />
                  {isDownloading ? 'Wait...' : 'CV Download'}
                </button>
              </MagneticHover>

              <MagneticHover strength={0.2} disabled={isTouchDevice || prefersReducedMotion}>
                <button
                  onClick={handleContactClick}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-300 hover:text-white transition-all select-none text-sm"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    width: isMobile ? '200px' : 'auto',
                  }}
                >
                  <FiMail size={16} />
                  Message Me
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
              width: isMobile ? 180 : 300,
              height: isMobile ? 180 : 300
            }}
          >
            {/* Conic gradient ring */}
            <div
              className={`absolute inset-0 rounded-full ${isMobile ? 'scale-[1.08]' : 'scale-[1.05]'}`}
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
                width: isMobile ? 180 : 300,
                height: isMobile ? 180 : 300,
                border: '3px solid rgba(15,23,42,1)',
                boxShadow: '0 0 40px rgba(59,130,246,0.15)',
              }}
              whileHover={!isTouchDevice ? { scale: 1.03 } : {}}
              transition={{ duration: 0.3 }}
            >
              <img
                src={personal.profileImage}
                alt={`${personal.name}`}
                className={`w-full h-full object-cover transition-transform duration-500 ${isMobile ? 'scale-[1.5]' : 'scale-110'}`}
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = 'none';
                  const p = t.parentElement!;
                  p.style.background = 'linear-gradient(135deg, #1E3A5F 0%, #0f172a 100%)';
                  p.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem">👨‍💻</div>';
                }}
              />
            </motion.div>

            {/* Floating info badges */}
            {!prefersReducedMotion && (
              <>
                <motion.div
                  className="absolute"
                  style={{
                    bottom: isMobile ? -10 : -18,
                    left: isMobile ? -5 : -24,
                    background: 'rgba(8,12,24,0.98)',
                    border: '1px solid rgba(59,130,246,0.22)',
                    borderRadius: '10px',
                    padding: isMobile ? '4px 10px' : '8px 14px',
                    backdropFilter: 'blur(16px)',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="text-blue-400 text-[9px] font-mono mb-0.5">Experience</div>
                  <div className="text-white font-bold text-[11px]">{personal.yearsOfExperience}+ Years</div>
                </motion.div>

                <motion.div
                  className="absolute"
                  style={{
                    top: isMobile ? -10 : 20,
                    right: isMobile ? -5 : -24,
                    background: 'rgba(8,12,24,0.98)',
                    border: '1px solid rgba(16,185,129,0.22)',
                    borderRadius: '10px',
                    padding: isMobile ? '4px 10px' : '8px 14px',
                    backdropFilter: 'blur(16px)',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                >
                  <div className="text-emerald-400 text-[9px] font-mono mb-0.5">Main Stack</div>
                  <div className="text-white font-bold text-[11px]">Java + React</div>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <motion.div variants={item} className="mt-12 pt-8 border-t border-slate-800/40">
          <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-4 gap-6'}`}>
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold mb-0.5`} style={{ color: s.color }}>{s.value}</div>
                <div className="text-slate-500 text-[10px] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
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
        <div className="w-5 h-8 rounded-full border border-slate-700 flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-blue-400"
            animate={!prefersReducedMotion ? { y: [0, 12, 0], opacity: [1, 0, 1] } : {}}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;