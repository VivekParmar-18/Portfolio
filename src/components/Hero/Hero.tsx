import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FiDownload, FiMail } from 'react-icons/fi';
import { personal } from '../../data/personalData';
import { useResponsive, useReducedMotion } from '../../hooks/useResponsive';
import MagneticHover from '../MagneticHover/MagneticHover';

const techBadges = ['Java', 'Spring Boot', 'React', 'TypeScript', 'AWS'];

// The system he actually runs, written the way engineers write it.
// Every line is resume-backed; rendered as a quiet mono "manifest" panel.
const manifest = [
  { k: 'runtime', v: 'Java 17 · Spring Boot' },
  { k: 'domain', v: 'orders · invoices · payments · documents' },
  { k: 'auth', v: 'JWT · role-based access control' },
  { k: 'data', v: 'MySQL · JPA / Hibernate' },
  { k: 'ai', v: 'custom LLMs — EHR document completeness' },
  { k: 'infra', v: 'AWS — EC2 · S3 · Lambda · RDS' },
  { k: 'delivery', v: 'GitHub Actions · Jenkins · SonarQube' },
  { k: 'events', v: 'WebSocket · schedulers · distributed locks' },
  { k: 'external', v: 'Stripe · ERP · email / SMS' },
];

const EASE_BRAND: [number, number, number, number] = [0.22, 1, 0.36, 1];


const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { isMobile, isTouchDevice } = useResponsive();
  const prefersReducedMotion = useReducedMotion();

  // Mouse-parallax via motion values — updates skip React re-renders entirely
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 22 });
  const orb1X = useTransform(springX, (v) => v * 0.45);
  const orb1Y = useTransform(springY, (v) => v * 0.45);
  const orb2X = useTransform(springX, (v) => v * -0.28);
  const orb2Y = useTransform(springY, (v) => v * -0.28);
  const photoX = useTransform(springX, (v) => v * 0.08);

  useEffect(() => {
    if (isMobile || isTouchDevice || prefersReducedMotion) return;
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 18);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 18);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [isMobile, isTouchDevice, prefersReducedMotion, mouseX, mouseY]);

  useEffect(() => { controls.start('visible'); }, [controls]);

  // Fade the scroll indicator once the user starts scrolling
  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0.15 : 0.6, ease: EASE_BRAND } },
  };
  const imgVariants: Variants = {
    hidden: { opacity: 0, scale: 0.88, x: isMobile ? 0 : 55 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: prefersReducedMotion ? 0.15 : 0.85, ease: EASE_BRAND } },
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh' }}
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
                x: orb1X,
                y: orb1Y,
              }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: isMobile ? 160 : 360,
                height: isMobile ? 160 : 360,
                bottom: '12%', right: '-6%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)',
                filter: 'blur(40px)',
                x: orb2X,
                y: orb2Y,
              }}
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
        <div className={`flex ${isMobile ? 'flex-col-reverse gap-10 text-center' : 'flex-row gap-12 xl:gap-16 items-center justify-between'}`}>

          {/* ── Text column (~60%) ── */}
          <div className={`flex-1 ${isMobile ? '' : 'max-w-2xl xl:max-w-[720px]'}`}>

            {/* Status badge */}
            <motion.div variants={item} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', color: '#60a5fa', fontFamily: 'var(--font-display)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-[pulse_2s_infinite]" />
                Open to software engineer roles · Ahmedabad / Remote
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
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                letterSpacing: '-0.04em',
                fontFamily: 'var(--font-display)'
              }}
            >
              {personal.name}
            </motion.h1>

            {/* Title */}
            <motion.h2 variants={item} className="font-bold text-slate-300 mb-8" style={{ fontSize: isMobile ? '1.1rem' : '1.9rem', letterSpacing: '-0.02em', lineHeight: 1.3, maxWidth: '660px' }}>
              I build the order-to-payment backbone of a <span className="text-blue-400">US healthcare</span> platform.
            </motion.h2>

        {/* Bio */}
        <motion.p variants={item} className="text-slate-400 leading-relaxed mb-8"
          style={{ fontSize: isMobile ? '0.875rem' : '1.0625rem', maxWidth: '620px', margin: isMobile ? '0 auto 2rem' : '0 0 2rem' }}>
          {personal.bio}
        </motion.p>

        {/* Tech badges */}
        <motion.div variants={item} className={`flex flex-wrap gap-2 mb-12 ${isMobile ? 'justify-center max-w-[300px] mx-auto' : ''}`}>
          {techBadges.map((label) => (
            <span key={label} className="px-3 py-1.5 rounded-md text-[10px] font-medium bg-slate-800/60 text-slate-300 border border-slate-700"
              style={{ fontFamily: "'Fira Code', monospace" }}>
              {label}
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
              className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white select-none text-sm active:scale-95 shadow-xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-500"
              style={{
                background: isDownloading ? 'rgba(59,130,246,0.5)' : undefined,
                width: isMobile ? '240px' : 'auto',
                transition: 'all var(--dur-micro) var(--ease-brand)',
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

      {/* ── Right column (~40%): portrait stacked above the service manifest — one composed unit ── */}
      <motion.div
        className={`relative ${isMobile ? 'flex justify-center mx-auto mb-10 w-[180px] h-[180px] flex-shrink-0' : 'w-full max-w-[520px] flex-shrink-0 lg:w-[42%] flex flex-col items-center gap-8'}`}
        variants={imgVariants}
      >
        {/* Portrait */}
        <div className={`relative ${isMobile ? 'w-full h-full' : 'w-[220px] h-[220px] flex-shrink-0'}`} style={{ zIndex: 2 }}>
          {/* Restrained ring: 1px slate line, glow comes from the photo's box-shadow */}
          <div
            className="absolute inset-0 rounded-full scale-[1.06]"
            aria-hidden="true"
            style={{ border: '1px solid #334155', borderRadius: '50%' }}
          />
          <motion.div
            className="relative rounded-full overflow-hidden w-full h-full"
            style={{
              border: '4px solid var(--bg-dark)',
              boxShadow: '0 0 60px rgba(59,130,246,0.25)',
              background: 'var(--bg-dark)',
              x: !isMobile && !prefersReducedMotion ? photoX : 0,
            }}
            whileHover={!isTouchDevice ? { scale: 1.04 } : {}}
            transition={{ duration: 0.4 }}
          >
            <img
              src={personal.profileImage}
              alt={`${personal.name} profile`}
              width={380}
              height={380}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
                const p = t.parentElement!;
                p.style.background = 'linear-gradient(135deg, #1E3A5F 0%, #0f172a 100%)';
                p.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3.5rem;font-weight:700;color:#93c5fd;letter-spacing:0.05em">VP</div>';
              }}
            />
          </motion.div>
        </div>

        {/* Manifest card — the platform he runs, written the way engineers write it */}
        {!isMobile && (
          <div className="hidden lg:block w-full glass-card overflow-hidden" style={{ borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 60px rgba(0,0,0,0.45)' }}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
              <span className="text-[11px] text-slate-500" style={{ fontFamily: "'Fira Code', monospace" }}>
                service: healthcare-order-platform
              </span>
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-emerald-400" style={{ fontFamily: "'Fira Code', monospace" }}>
                <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${!prefersReducedMotion ? 'animate-[pulse_2s_infinite]' : ''}`} aria-hidden="true" />
                production
              </span>
            </div>
            <dl className="px-6 py-5 m-0" style={{ fontFamily: "'Fira Code', monospace", fontSize: 12.5, lineHeight: 1.9 }}>
              {manifest.map((row) => (
                <div key={row.k} className="flex items-baseline gap-4 py-[3px]">
                  <dt className="text-slate-500 w-[80px] flex-shrink-0">{row.k}:</dt>
                  <dd className="text-slate-300 m-0 flex-1 min-w-0">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </motion.div>
    </div>
  </motion.div>

      {/* Scroll indicator — fades away once the user scrolls */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ delay: hasScrolled ? 0 : 2.2, duration: prefersReducedMotion ? 0.15 : 0.6, ease: EASE_BRAND }}
        aria-hidden={hasScrolled}
      >
        <span className="text-slate-500 text-xs tracking-widest uppercase" style={{ fontFamily: "'Fira Code', monospace" }}>
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