import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

export const SpaceWarpScrollSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const speedRef = useRef<number>(2.0);
  const targetSpeedRef = useRef<number>(2.0);

  // Track scroll progress within this 500vh pinned stage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Visceral Camera Acceleration Zoom of the Warp Video
  const videoScale = useTransform(scrollYProgress, [0, 0.45, 0.75, 1], [1, 1.25, 2.0, 2.6]);

  // Dynamic 3D Starfield Warp Acceleration Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const NUM_STARS = 500;
    const stars: { x: number; y: number; z: number; pz: number }[] = [];

    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2200,
        y: (Math.random() - 0.5) * 2200,
        z: Math.random() * 1000,
        pz: 1000,
      });
    }

    const render = () => {
      // Smoothly interpolate current speed towards target speed for fluid physics
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.12;
      const currentSpeed = speedRef.current;

      // Dark trail clear for smooth motion blur
      ctx.fillStyle = currentSpeed > 10 ? 'rgba(0, 0, 0, 0.32)' : 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < NUM_STARS; i++) {
        const star = stars[i];
        star.pz = star.z;
        star.z -= currentSpeed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 2200;
          star.y = (Math.random() - 0.5) * 2200;
          star.z = 1000;
          star.pz = 1000;
        }

        const k = 260 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = 260 / star.pz;
        const prevX = star.x * pk + cx;
        const prevY = star.y * pk + cy;

        if (px >= 0 && px < width && py >= 0 && py < height) {
          const depthAlpha = Math.min(1, Math.max(0.12, (1000 - star.z) / 750));
          const isStreak = currentSpeed > 5.5;

          ctx.beginPath();
          if (isStreak) {
            // Draw hyperspace streak radiating outward
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, depthAlpha * 1.1)})`;
            ctx.lineWidth = Math.min(2.8, Math.max(0.8, (1 - star.z / 1000) * 2.8));
            ctx.stroke();
          } else {
            // Gentle floating star dot
            ctx.arc(px, py, Math.max(0.7, (1 - star.z / 1000) * 1.6), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.75})`;
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Update target speed and video playback rate based on scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    // Phase 1 (0.0 to 0.44): gentle drift (speed = 2.0)
    // Phase 2 (0.44 to 0.85): hyperspace warp acceleration (speed ramps to 52.0)
    // Phase 3 (0.85 to 1.0): sustained warp speed
    if (v < 0.44) {
      targetSpeedRef.current = 2.0;
    } else {
      const warpProgress = Math.min(1, (v - 0.44) / 0.38);
      targetSpeedRef.current = 2.0 + Math.pow(warpProgress, 1.25) * 50.0;
    }

    if (videoRef.current) {
      videoRef.current.playbackRate = v < 0.44 ? 1.0 : Math.min(3.2, 1.0 + (v - 0.44) * 4.0);
    }
  });

  // ═════════════════════════════════════════════════
  // PHASE 1: "BEFORE // TECHFORCE '26" (v: 0.0 -> 0.50)
  // ═════════════════════════════════════════════════
  const beforeOpacity = useTransform(scrollYProgress, [0, 0.40, 0.48], [1, 1, 0]);
  const beforeScale = useTransform(scrollYProgress, [0, 0.48], [1, 1.15]);

  // BEFORE Cards:
  // Card 1: Crystal Auth (tilts -10deg, Left)
  const card1Opacity = useTransform(scrollYProgress, [0.05, 0.13, 0.22], [0, 1, 0]);
  const card1Y = useTransform(scrollYProgress, [0.05, 0.13, 0.22], [120, 0, -100]);

  // Card 2: Indigenous LLM (tilts +8deg, Right)
  const card2Opacity = useTransform(scrollYProgress, [0.18, 0.26, 0.35], [0, 1, 0]);
  const card2Y = useTransform(scrollYProgress, [0.18, 0.26, 0.35], [120, 0, -100]);

  // Card 3: More in the Pipeline (tilts -4deg, Left-Center)
  const card3Opacity = useTransform(scrollYProgress, [0.31, 0.39, 0.48], [0, 1, 0]);
  const card3Y = useTransform(scrollYProgress, [0.31, 0.39, 0.48], [120, 0, -100]);

  // ═════════════════════════════════════════════════
  // PHASE 2: "AFTER // TECHFORCE '26" (v: 0.48 -> 1.0)
  // Radiant Coral Red #ff4c24 exactly matching source Framer site!
  // ═════════════════════════════════════════════════
  const afterOpacity = useTransform(scrollYProgress, [0.46, 0.53, 1.0], [0, 1, 1]);
  const afterScale = useTransform(scrollYProgress, [0.46, 0.58], [0.88, 1.0]);

  // AFTER Cards (The cards that appear during hyperspace warp!):
  // Card 4: Accelerates Everything (tilts +6deg, Right)
  const card4Opacity = useTransform(scrollYProgress, [0.52, 0.60, 0.70], [0, 1, 0]);
  const card4Y = useTransform(scrollYProgress, [0.52, 0.60, 0.70], [120, 0, -100]);

  // Card 5: Spring & Kafka (tilts -7deg, Left)
  const card5Opacity = useTransform(scrollYProgress, [0.65, 0.73, 0.83], [0, 1, 0]);
  const card5Y = useTransform(scrollYProgress, [0.65, 0.73, 0.83], [120, 0, -100]);

  // Card 6: Systems (tilts +4deg, Right-Center)
  const card6Opacity = useTransform(scrollYProgress, [0.78, 0.86, 0.96], [0, 1, 0]);
  const card6Y = useTransform(scrollYProgress, [0.78, 0.86, 0.96], [120, 0, -100]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black">
      {/* Sticky 100vh Viewport — Locked to Top */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Zooming Space Hyperspace Video */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
            src="https://framerusercontent.com/assets/yLuVmQngCSXfd0UdaLuBOt4SabU.webm"
          />
          <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/90 pointer-events-none" />
        </motion.div>

        {/* 60fps 3D Starfield Warp Acceleration Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
        />

        {/* Top Section Header Indicator */}
        <div className="absolute top-8 inset-x-0 flex justify-between items-center px-8 md:px-12 z-20 pointer-events-none">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            [ 05 / 09 ]
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
            AFTER CODE
          </span>
        </div>

        {/* ═══════════════════════════════════════════════
            CENTER DISPLAY TEXT: BEFORE // LEGACY CODE
            Crisp White #f4f1ee — Phase 1 (z-10: Behind the cards)
        ═══════════════════════════════════════════════ */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div
            style={{ opacity: beforeOpacity, scale: beforeScale }}
            className="text-center px-4 max-w-4xl select-none"
          >
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tight uppercase leading-[0.92] drop-shadow-2xl">
              <span className="block text-white/95">BEFORE</span>
              <span className="block text-white/70 tracking-tighter whitespace-nowrap">// LEGACY CODE</span>
            </h2>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════
            CENTER DISPLAY TEXT: AFTER // PRODUCTION
            Radiant Coral Red #ff4c24 — Phase 2 (z-10: Behind the cards)
        ═══════════════════════════════════════════════ */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div
            style={{ opacity: afterOpacity, scale: afterScale }}
            className="text-center px-4 max-w-4xl select-none"
          >
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tight uppercase leading-[0.92] drop-shadow-2xl">
              <span className="block text-[#ff4c24]">AFTER</span>
              <span className="block text-[#ff4c24] tracking-tighter whitespace-nowrap">// PRODUCTION</span>
            </h2>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════
            PHASE 1 CARDS (BEFORE — z-30 in front of background text)
        ═══════════════════════════════════════════════ */}
        {/* Card 1: Crystal Auth (Tilted -10deg, Left Side) */}
        <div className="absolute inset-0 flex items-center justify-start px-6 md:px-24 pointer-events-none z-30">
          <motion.div
            style={{ opacity: card1Opacity, y: card1Y, rotate: -10 }}
            className="w-[310px] sm:w-[370px] md:w-[420px] p-6 sm:p-7 rounded-2xl border border-white/20 bg-[#0d0d0d]/95 backdrop-blur-2xl shadow-2xl shadow-black pointer-events-auto"
          >
            <div className="flex items-center justify-between font-mono text-[11px] mb-3">
              <span className="font-bold tracking-wider text-white uppercase text-base sm:text-lg">CRYSTAL AUTH.</span>
              <span className="text-[#ff4c24] font-semibold">[01]</span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/70 font-mono leading-relaxed uppercase tracking-wider">
              A SECURE AUTHENTICATION FRAMEWORK BUILT FROM SCRATCH — MFA, MODERN ENCRYPTION, AND SESSION LIFECYCLE MANAGEMENT. PRODUCTION-READY.
            </p>
          </motion.div>
        </div>

        {/* Card 2: Indigenous LLM (Tilted +8deg, Right Side) */}
        <div className="absolute inset-0 flex items-center justify-end px-6 md:px-24 pointer-events-none z-30">
          <motion.div
            style={{ opacity: card2Opacity, y: card2Y, rotate: 8 }}
            className="w-[310px] sm:w-[370px] md:w-[420px] p-6 sm:p-7 rounded-2xl border border-white/20 bg-[#0d0d0d]/95 backdrop-blur-2xl shadow-2xl shadow-black pointer-events-auto"
          >
            <div className="flex items-center justify-between font-mono text-[11px] mb-3">
              <span className="font-bold tracking-wider text-white uppercase text-base sm:text-lg">INDIGENOUS LLM.</span>
              <span className="text-[#ff4c24] font-semibold">[02]</span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/70 font-mono leading-relaxed uppercase tracking-wider">
              FINE-TUNED TRANSFORMER INFERENCE ENGINE DEPLOYED WITH INT8 QUANTIZATION AND REAL-TIME TOKEN STREAMING INFRASTRUCTURE.
            </p>
          </motion.div>
        </div>

        {/* Card 3: More in the Pipeline (Tilted -4deg, Left-Center) */}
        <div className="absolute inset-0 flex items-center justify-start px-8 md:px-32 pointer-events-none z-30">
          <motion.div
            style={{ opacity: card3Opacity, y: card3Y, rotate: -4 }}
            className="w-[310px] sm:w-[380px] md:w-[440px] p-6 sm:p-7 rounded-2xl border border-white/20 bg-[#0d0d0d]/95 backdrop-blur-2xl shadow-2xl shadow-black pointer-events-auto"
          >
            <div className="flex items-center justify-between font-mono text-[11px] mb-3">
              <span className="font-bold tracking-wider text-white uppercase text-base sm:text-lg">MORE IN THE PIPELINE.</span>
              <span className="text-[#ff4c24] font-semibold">[03]</span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/70 font-mono leading-relaxed uppercase tracking-wider">
              CONSTANT EXPERIMENTS IN DISTRIBUTED SYSTEMS, EVENT-DRIVEN STREAMING, AND BACKEND OPTIMIZATION. NEW REPOS SHIP REGULARLY.
            </p>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════
            PHASE 2 CARDS (AFTER — During Hyperspace Acceleration! z-30)
        ═══════════════════════════════════════════════ */}
        {/* Card 4: Accelerates Everything (Tilted +6deg, Right Side) */}
        <div className="absolute inset-0 flex items-center justify-end px-6 md:px-24 pointer-events-none z-30">
          <motion.div
            style={{ opacity: card4Opacity, y: card4Y, rotate: 6 }}
            className="w-[310px] sm:w-[380px] md:w-[440px] p-6 sm:p-7 rounded-2xl border border-white/20 bg-[#0d0d0d]/95 backdrop-blur-2xl shadow-2xl shadow-black pointer-events-auto"
          >
            <div className="flex items-center justify-between font-mono text-[11px] mb-3">
              <span className="font-bold tracking-wider text-white uppercase text-base sm:text-lg">ACCELERATES EVERYTHING.</span>
              <span className="text-[#ff4c24] font-semibold">[01]</span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/75 font-mono leading-relaxed uppercase tracking-wider">
              YOU'LL FIND ME IN THE LINUX TERMINAL, PROFILING FLAME GRAPHS, CONTRIBUTING TO OPEN SOURCE, OR TUNING BACKEND QUERIES AT 2 AM.
            </p>
          </motion.div>
        </div>

        {/* Card 5: Spring & Kafka (Tilted -7deg, Left Side) */}
        <div className="absolute inset-0 flex items-center justify-start px-6 md:px-24 pointer-events-none z-30">
          <motion.div
            style={{ opacity: card5Opacity, y: card5Y, rotate: -7 }}
            className="w-[310px] sm:w-[370px] md:w-[420px] p-6 sm:p-7 rounded-2xl border border-white/20 bg-[#0d0d0d]/95 backdrop-blur-2xl shadow-2xl shadow-black pointer-events-auto"
          >
            <div className="flex items-center justify-between font-mono text-[11px] mb-3">
              <span className="font-bold tracking-wider text-white uppercase text-base sm:text-lg">SPRING & KAFKA.</span>
              <span className="text-[#ff4c24] font-semibold">[02]</span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/75 font-mono leading-relaxed uppercase tracking-wider">
              SPRING BOOT, EVENT STREAMING, REDIS INVALIDATION — BUILDING AND DEPLOYING HIGH CONCURRENCY SERVICES WITH ZERO-DOWNTIME CONTRACTS.
            </p>
          </motion.div>
        </div>

        {/* Card 6: Systems Foundation (Tilted +4deg, Right-Center) */}
        <div className="absolute inset-0 flex items-center justify-end px-8 md:px-32 pointer-events-none z-30">
          <motion.div
            style={{ opacity: card6Opacity, y: card6Y, rotate: 4 }}
            className="w-[310px] sm:w-[370px] md:w-[420px] p-6 sm:p-7 rounded-2xl border border-white/20 bg-[#0d0d0d]/95 backdrop-blur-2xl shadow-2xl shadow-black pointer-events-auto"
          >
            <div className="flex items-center justify-between font-mono text-[11px] mb-3">
              <span className="font-bold tracking-wider text-white uppercase text-base sm:text-lg">SYSTEMS.</span>
              <span className="text-[#ff4c24] font-semibold">[03]</span>
            </div>
            <p className="text-[11px] sm:text-xs text-white/75 font-mono leading-relaxed uppercase tracking-wider">
              LINUX, GIT, DOCKER, AWS EC2, POSTGRESQL — A SOLID SYSTEMS FOUNDATION UNDERNEATH EVERY BACKEND ARCHITECTURE.
            </p>
          </motion.div>
        </div>

        {/* Section Bottom Marker */}
        <div className="absolute bottom-6 inset-x-0 flex justify-between px-8 md:px-12 z-20 font-mono text-[10px] text-white/40 uppercase tracking-widest pointer-events-none">
          <span>[ 05 / 09 ]</span>
          <span>AFTER CODE</span>
        </div>
      </div>
    </div>
  );
};

export default SpaceWarpScrollSection;
