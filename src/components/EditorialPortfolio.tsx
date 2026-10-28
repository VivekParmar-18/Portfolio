import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiArrowUpRight, FiCopy, FiCheck, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import { personal } from '../data/personalData';
import { projectsData, type Project } from '../data/projectsData';
import InteractiveCursor from './InteractiveCursor';
import SpaceWarpScrollSection from './SpaceWarpScrollSection';
import DepthVideoCanvas from './DepthVideoCanvas';

/* ─────────────────────────────────────────────────────────
   EXACT 9-SECTION RECONSTRUCTION — portfolio-mti1.vercel.app
   01 HERO          — Build at the frontier + Hero Video FNCjudcX594YYVfA1Gvkck3ANo8
   02 SKILLS        — Text Reveal + 3D Web Mesh VQ8hBdTRatVLjaRMhY9KcKUKnk
   03 MY JOURNEY    — Step Milestones 01, 02, 03 + Avatar GIF
   04 PROJECTS      — Selected Work + Images eorpvQ9TMWlQSExoUJ6RbUkDhw & u7vQBJKJoCxpNVGjab1tQX5Xj4
   05 AFTER CODE    — Hyperspace Warp Speed Pinned Scroll Section (SpaceWarpScrollSection)
   06 PHILOSOPHY    — How I Work (4 Phases)
   07 PRINCIPLES    — 001 to 017 Monospace Rules with Hover Glow
   08 THE CURIOSITY — How systems scale + Honey Fluid Video mP4XoxHZn0eDX7MlZ1LegFJJqE
   09 CONTACT       — Vibrant Coral Red #ff4c24 Footer + I'm listening + Action Buttons
───────────────────────────────────────────────────────── */

const TOTAL_SECTIONS = '09';

// Skills domains for Section 02 unblurring text reveal
const skillDomains = [
  { domain: 'Backend Architecture', desc: 'Spring Boot · Java 17/21 · Modular Microservices' },
  { domain: 'Distributed Caching', desc: 'Redis · In-Memory Invalidation · Sub-Millisecond Hits' },
  { domain: 'Database Performance', desc: 'PostgreSQL · MySQL · Keyset Paging · Batched JOINs' },
  { domain: 'Event-Driven Streams', desc: 'Apache Kafka · Consumer Groups · Dead-Letter Queues' },
  { domain: 'Cloud Infrastructure', desc: 'AWS EC2 · S3 · RDS · Dockerized Containerization' },
  { domain: 'Security & Auth Systems', desc: 'OAuth2 · JWT · RBAC · HIPAA Audit Trails' },
];

// Milestones for Section 03 Journey
const milestones = [
  {
    step: '01',
    title: 'Software Engineer L1 · Techforce Infotech',
    period: 'Oct 2024 – Present · Ahmedabad',
    desc: 'Promoted to L1 Engineer (Jan 2026). Architecting production backends for high-volume recruitment platforms and HIPAA-compliant healthcare portals.',
  },
  {
    step: '02',
    title: 'Database Query Tuning & Hibernate Mastery',
    period: 'Production Optimization Milestone',
    desc: 'Diagnosed and eradicated recursive N+1 query scans across 40+ endpoints. Implemented batched joins and keyset cursors, slashing database load by 74%.',
  },
  {
    step: '03',
    title: 'Event Streaming & Distributed Microservices',
    period: 'Architecture Scaling Milestone',
    desc: 'Engineered fault-tolerant Kafka asynchronous event ingestion, reducing peak request latency by 64% with 99.9% cloud uptime.',
  },
];

// Principles for Section 07 (Minimal 5 Core Rules)
const principlesList = [
  'BUILD IN PUBLIC.',
  'BENCHMARK BEFORE OPTIMIZING.',
  'SHIP THE CODE.',
  'ZERO DOWNTIME IS A REQUIREMENT.',
  'CODE COMPOUNDS WITH EVERY COMMIT.',
];

export const EditorialPortfolio: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Smooth scroll tracking for hero scale
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroScale = useTransform(scrollYProgress, [0, 0.08], [1, 0.97]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#f4f1ee] min-h-screen font-sans selection:bg-[#ff4c24] selection:text-white antialiased overflow-x-clip relative">
      <InteractiveCursor />

      {/* ═══════════════════════════════════════════════
          NAV — Fixed Header Matching Source Site
      ═══════════════════════════════════════════════ */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 border-b border-white/[0.06] bg-[#050505]/85 backdrop-blur-xl px-6 md:px-12 flex items-center justify-between">
        <a href="#hero" className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/90 hover:text-[#ff4c24] transition-colors flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4c24]" />
          {personal.firstName.toLowerCase()}— <span className="text-white/30">©{new Date().getFullYear()}</span>
        </a>

        <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.15em]">
          <span className="text-white/40 hidden lg:inline tracking-normal font-sans text-xs">
            {personal.email}
          </span>
          <a href="#skills" className="text-white/40 hover:text-white transition-colors hidden md:inline">Skills</a>
          <a href="#journey" className="text-white/40 hover:text-white transition-colors hidden md:inline">Journey</a>
          <a href="#projects" className="text-white/40 hover:text-white transition-colors hidden md:inline">Work</a>
          <a href="#after-code" className="text-white/40 hover:text-white transition-colors hidden md:inline">Transform</a>
          <a href={personal.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors flex items-center gap-1">
            GitHub <FiArrowUpRight size={10} />
          </a>
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-md bg-[#ff4c24] hover:bg-[#e03f1b] text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#ff4c24]/20"
          >
            Contact
          </a>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════
          [ 01 / 09 ] HERO — Build at the frontier
          Iconic Uppercase Bold Editorial Typography,
          Seamlessly Blended Video with Radial Feather Mask & mix-blend-screen
      ═══════════════════════════════════════════════ */}
      <motion.section
        id="hero"
        style={{ scale: heroScale }}
        className="min-h-screen pt-24 pb-14 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-between items-center relative overflow-hidden"
      >
        {/* Top spacer for clean minimalist breathing room */}
        <div className="h-4" />

        {/* ── Layer 1 (z-10): Minimal Background Depth Text (Apple Lock Screen Widget Style) ── */}
        <div className="absolute inset-x-0 top-[18%] sm:top-[16%] md:top-[14%] flex flex-col items-center pointer-events-none select-none z-10 px-4">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.6rem] font-bold tracking-tight leading-[0.88] uppercase select-none text-center">
            <span className="block bg-gradient-to-b from-white via-white/80 to-white/40 bg-clip-text text-transparent">
              BUILD AT THE
            </span>
            <span className="block bg-gradient-to-b from-white/90 via-white/60 to-white/20 bg-clip-text text-transparent">
              FRONTIER
            </span>
          </h1>
        </div>

        {/* ── Layer 2 (z-20): 3D Honeycomb & Honey Bee Video in Foreground (Apple Lock Screen Subject) ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <DepthVideoCanvas
            poster="/assets/hero-poster.webp"
            className="w-[360px] sm:w-[460px] md:w-[540px] max-h-[75vh] object-contain scale-105 pointer-events-none"
            src="/assets/hero-bg.webm"
          />
        </div>

        {/* ── Layer 3 (z-30): Pill Underneath Video + Hero Bottom Action Row & Stack Marquee ── */}
        <div className="w-full relative z-30 pt-4 flex flex-col items-center">
          {/* Software Engineer L1 · Techforce Infotech Underneath Video */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md font-mono text-[10px] text-white/60 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4c24] animate-pulse" />
              <span>{personal.role} · {personal.company}</span>
            </div>
          </div>

          <div className="w-full space-y-6">
            <div className="grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-7">
                <p className="text-[11px] font-mono text-white/35 tracking-wider uppercase">
                  [ 01 / {TOTAL_SECTIONS} ] — Manifest
                </p>
              </div>

              <div className="md:col-span-5 flex items-center gap-3 md:justify-end">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded bg-[#f4f1ee] text-[#050505] font-mono text-[10px] uppercase tracking-[0.15em] font-semibold hover:bg-[#ff4c24] hover:text-white transition-all flex items-center gap-2 shadow-xl pointer-events-auto"
                >
                  View Work <FiArrowUpRight size={12} />
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-6 py-3 rounded border border-white/10 hover:border-white/30 font-mono text-[10px] uppercase tracking-[0.15em] text-white/60 hover:text-white transition-all flex items-center gap-2 pointer-events-auto backdrop-blur-sm"
                >
                  {copiedEmail ? <FiCheck className="text-emerald-400" size={12} /> : <FiCopy size={12} />}
                  {copiedEmail ? 'Copied' : 'Email'}
                </button>
              </div>
            </div>

            {/* Hero Tech Platforms Marquee */}
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between gap-8 opacity-40 hover:opacity-75 transition-opacity overflow-hidden grayscale">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/40 shrink-0">STACK & PLATFORMS:</span>
              <div className="flex items-center gap-10 md:gap-14 overflow-x-auto no-scrollbar py-1">
                <span className="font-mono text-xs font-semibold tracking-wider text-white/80 shrink-0">JAVA 21</span>
                <span className="font-mono text-xs font-semibold tracking-wider text-white/80 shrink-0">SPRING BOOT</span>
                <span className="font-mono text-xs font-semibold tracking-wider text-white/80 shrink-0">APACHE KAFKA</span>
                <span className="font-mono text-xs font-semibold tracking-wider text-white/80 shrink-0">POSTGRESQL</span>
                <span className="font-mono text-xs font-semibold tracking-wider text-white/80 shrink-0">REDIS</span>
                <span className="font-mono text-xs font-semibold tracking-wider text-white/80 shrink-0">AWS EC2/S3</span>
                <span className="font-mono text-xs font-semibold tracking-wider text-white/80 shrink-0">DOCKER</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════
          [ 02 / 09 ] SKILLS — 02 - text reveal
          Features 3D Spider Web Mesh (VQ8hBdTRatVLjaRMhY9KcKUKnk)
          + Red radial glow + Sticky left column + Unblurring right items
      ═══════════════════════════════════════════════ */}
      <section id="skills" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.06] overflow-hidden">
        {/* Source Site 3D Web Background with Red Glow */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/assets/web-mesh.png"
            alt="3D Web Background"
            className="absolute top-1/2 -right-24 md:right-0 -translate-y-1/2 w-[850px] md:w-[1100px] max-w-none opacity-20 object-contain select-none"
          />
          <div className="absolute inset-0 bg-radial from-[#ff4c24]/10 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start relative z-10">
          {/* Left Sticky Column */}
          <div className="md:col-span-5 md:sticky md:top-24 space-y-6">
            <div>
              <span className="font-mono text-[10px] text-[#ff4c24] tracking-[0.2em] uppercase block mb-3">
                [ 02 / {TOTAL_SECTIONS} ] SKILLS
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
                Technical<br />toolkit.
              </h2>
            </div>
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-sans">
              A high-throughput backend arsenal focused on Java, Spring Boot, distributed caching, Kafka event streams, and relational query tuning. Learn by building; every commit is an opportunity to harden systems.
            </p>
            <div>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-[#ff4c24] font-mono text-[11px] text-white/80 hover:text-[#ff4c24] transition-all uppercase tracking-wider"
              >
                VIEW GITHUB <FiArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* Right Column: Text Reveal Domains that Unblur Smoothly */}
          <div className="md:col-span-7 space-y-10 py-4">
            {skillDomains.map((item, idx) => (
              <motion.div
                key={item.domain}
                initial={{ opacity: 0.25, filter: 'blur(4px)', y: 15 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: false, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.05 }}
                className="group border-b border-white/[0.08] pb-8 cursor-default"
              >
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white/70 group-hover:text-white transition-colors">
                    {item.domain}
                  </h3>
                  <span className="font-mono text-[11px] text-[#ff4c24] shrink-0">
                    [0{idx + 1}]
                  </span>
                </div>
                <p className="font-mono text-xs text-white/35 group-hover:text-white/60 transition-colors">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          [ 03 / 09 ] MY JOURNEY — Step Milestones
          Features Avatar GIF (v1zYnyaDEEd6BWdeIiFTZe7Zps)
          + Numbered Steps 01, 02, 03
      ═══════════════════════════════════════════════ */}
      <section id="journey" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] mb-4">
              <img
                src="/assets/avatar-journey.gif"
                alt="Avatar GIF"
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
                Techforce Infotech · Software Engineer L1
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#ff4c24] tracking-[0.2em] uppercase block mb-3">
              [ 03 / {TOTAL_SECTIONS} ] MY JOURNEY
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
              Driven by curiosity,<br />
              <span className="text-white/40">powered by code.</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-white/30 uppercase tracking-widest">
            (Three production milestones and counting.)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <motion.div
              key={m.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-7 rounded-2xl bg-white/[0.015] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
                  <span className="font-mono text-2xl font-bold text-[#ff4c24]">{m.step}</span>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">{m.period}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#ff4c24] transition-colors leading-snug">
                  {m.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-sans">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          [ 04 / 09 ] PROJECTS — Selected work
          Uses source site images (eorpvQ9TMWlQSExoUJ6RbUkDhw & u7vQBJKJoCxpNVGjab1tQX5Xj4)
          + Honey Drip divider (Mq8MwyDOkPQvD9ZYmyZxDUMoWD8)
      ═══════════════════════════════════════════════ */}
      <section id="projects" className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.06] relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-[10px] text-[#ff4c24] tracking-[0.2em] uppercase block mb-3">
              [ 04 / {TOTAL_SECTIONS} ] PROJECTS
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Selected work. <span className="text-white/40">Things I've built.</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-white/40 max-w-xs leading-relaxed">
            Hands-on backend systems shipped to production — from recruitment platforms to multi-tenant medical portals.
          </p>
        </div>

        {/* Project Cards with Source Site Visual Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1: KabilHire with eorpvQ9TMWlQSExoUJ6RbUkDhw */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setSelectedProject(projectsData[0])}
            className="group rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 overflow-hidden cursor-pointer transition-all duration-300"
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src="/assets/project-ats.jpg"
                alt="KabilHire Enterprise ATS"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md font-mono text-[10px] text-[#ff4c24] border border-white/10">
                [01] PRODUCTION
              </div>
            </div>
            <div className="p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">Techforce Infotech · Enterprise ATS</span>
                <span className="font-mono text-xs text-emerald-400 font-semibold">-64% API Requests</span>
              </div>
              <h3 className="text-2xl font-semibold text-white group-hover:text-[#ff4c24] transition-colors">
                KabilHire — Next-Gen Talent & Hiring Platform
              </h3>
              <p className="text-xs text-white/60 font-sans leading-relaxed">
                High-throughput recruitment ATS engine managing candidate pipelines, resume indexing, and batched queries with Hibernate and Redis invalidation.
              </p>
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[9px] text-white/50">Java 17</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[9px] text-white/50">Spring Boot</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[9px] text-white/50">PostgreSQL</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[9px] text-white/50">Redis</span>
                </div>
                <span className="font-mono text-[10px] text-white/40 group-hover:text-white flex items-center gap-1 transition-colors">
                  Inspect <FiArrowUpRight size={11} />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Project 2: Healthcare with u7vQBJKJoCxpNVGjab1tQX5Xj4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onClick={() => setSelectedProject(projectsData[1])}
            className="group rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/20 overflow-hidden cursor-pointer transition-all duration-300"
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src="/assets/project-healthcare.jpg"
                alt="Healthcare Management System"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md font-mono text-[10px] text-[#ff4c24] border border-white/10">
                [02] ENTERPRISE
              </div>
            </div>
            <div className="p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider">Techforce Infotech · Multi-Tenant EMR</span>
                <span className="font-mono text-xs text-emerald-400 font-semibold">99.9% Uptime</span>
              </div>
              <h3 className="text-2xl font-semibold text-white group-hover:text-[#ff4c24] transition-colors">
                Healthcare Management & Patient Telemetry
              </h3>
              <p className="text-xs text-white/60 font-sans leading-relaxed">
                Multi-tenant clinical portal for doctor-patient consultations, appointment scheduling, and HIPAA-compliant medical audit logs.
              </p>
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[9px] text-white/50">Spring Security</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[9px] text-white/50">MySQL</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[9px] text-white/50">Docker</span>
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] font-mono text-[9px] text-white/50">AWS EC2</span>
                </div>
                <span className="font-mono text-[10px] text-white/40 group-hover:text-white flex items-center gap-1 transition-colors">
                  Inspect <FiArrowUpRight size={11} />
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Honey Drip Decorative Divider from Source */}
        <div className="mt-20 overflow-hidden pointer-events-none opacity-30 select-none">
          <img
            src="/assets/space-drip.png"
            alt="Drip divider"
            className="w-full max-h-16 object-cover"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          [ 05 / 09 ] AFTER CODE — Pinned Hyperspace Warp Scroll
          Fixed brightness, acceleration zoom, BEFORE/AFTER states
      ═══════════════════════════════════════════════ */}
      <section id="after-code">
        <SpaceWarpScrollSection />
      </section>

      {/* ═══════════════════════════════════════════════
          [ 06 / 09 ] PHILOSOPHY — How I Work
          Phase 01: Audit -> Phase 02: Architect -> Phase 03: Ship -> Phase 04: Compound
      ═══════════════════════════════════════════════ */}
      <section className="py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-[10px] text-[#ff4c24] tracking-[0.2em] uppercase block mb-3">
              [ 06 / {TOTAL_SECTIONS} ] PHILOSOPHY
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
              How I Work.
            </h2>
          </div>
          <p className="font-mono text-xs text-white/40 max-w-xs leading-relaxed">
            Eliminate guesswork. Every architecture is an opportunity to harden resilience and deliver predictable runtime latency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { phase: '01', title: 'Audit & Profile', desc: 'Flame graphs, slow query logs, N+1 eradication.' },
            { phase: '02', title: 'Architect & Isolate', desc: 'Clean boundaries, decoupled microservices, idempotent APIs.' },
            { phase: '03', title: 'Benchmark & Ship', desc: 'Automated stress tests and zero-downtime rolling deploys.' },
            { phase: '04', title: 'Monitor & Compound', desc: 'Structured telemetry, p95/p99 alerts, and self-healing pools.' },
          ].map((item, idx) => (
            <motion.div
              key={item.phase}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-xl border border-white/[0.08] bg-white/[0.015] hover:border-white/20 transition-all group"
            >
              <span className="font-mono text-xs text-[#ff4c24] font-bold block mb-3">
                PHASE {item.phase}
              </span>
              <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#ff4c24] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-white/40 font-mono leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          [ 07 / 09 ] PRINCIPLES — 001 to 005 Core Rules
      ═══════════════════════════════════════════════ */}
      <section id="principles" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-[10px] text-[#ff4c24] tracking-[0.2em] uppercase block mb-3">
              [ 07 / {TOTAL_SECTIONS} ] PRINCIPLES
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
              Principles.
            </h2>
          </div>
          <p className="font-mono text-xs text-white/40 max-w-sm leading-relaxed">
            Principles I build by — borrowed from systems architects and open-source masters.
          </p>
        </div>

        <div className="divide-y divide-white/[0.08]">
          {principlesList.map((rule, idx) => {
            const numStr = String(idx + 1).padStart(3, '0') + '.';
            return (
              <motion.div
                key={rule}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group py-5 md:py-6 flex items-baseline gap-6 md:gap-10 hover:translate-x-3 transition-transform duration-200 cursor-default"
              >
                <span className="font-mono text-xl sm:text-2xl md:text-3xl font-semibold text-white/20 group-hover:text-[#ff4c24] transition-colors shrink-0 w-16 md:w-20">
                  {numStr}
                </span>
                <span className="font-mono text-xl sm:text-2xl md:text-3xl font-semibold text-white/30 group-hover:text-white transition-colors tracking-tight">
                  {rule}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          [ 08 / 09 ] THE CURIOSITY — How systems scale
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/[0.06] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-[10px] text-[#ff4c24] tracking-[0.2em] uppercase block mb-3">
              [ 08 / {TOTAL_SECTIONS} ] THE CURIOSITY
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
              How systems scale.<br />
              <span className="text-white/40">Kill them with sweetness.</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-white/40 max-w-xs leading-relaxed">
            The frontier is zero-downtime, distributed resilience, and systems that scale effortlessly.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Honey Bee / Amber 3D Fluid Video */}
          <div className="md:col-span-6 flex items-center justify-center">
            <div className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-105"
                src="/assets/curiosity-fluid.webm"
              />
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none" />
            </div>
          </div>

          {/* Minimalist Editorial Narrative */}
          <div className="md:col-span-6 space-y-5">
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-sans font-light">
              How do distributed systems maintain strict consistency under immense load?
            </p>
            <p className="text-sm text-white/50 leading-relaxed font-mono">
              That obsession drives deep dives into JVM bytecode, concurrency primitives, batched transactions, and Kafka event topologies. Architecting production software that powers healthcare and hiring at scale.
            </p>
            <div className="pt-2 flex items-center gap-3 font-mono text-[11px] text-[#ff4c24] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#ff4c24] animate-ping" />
              <span>Always building. Always profiling.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          [ 09 / 09 ] CONTACT — Minimalist Vibrant Coral Red Footer (Reduced Height)
      ═══════════════════════════════════════════════ */}
      <section id="contact" className="bg-[#ff4c24] text-[#050505] relative overflow-hidden">
        {/* Source Site Footer SVG Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden select-none">
          <img
            src="/assets/footer-texture.svg"
            alt="Footer Texture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10">
          <span className="font-mono text-[10px] text-[#050505]/50 tracking-[0.2em] uppercase block mb-4">
            [ 09 / {TOTAL_SECTIONS} ] CONTACT
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.04em] leading-[0.9] text-[#050505] mb-8">
            I'm<br />listening.
          </h2>

          {/* Bold Action Buttons Matching Source (Compact Spacing) */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href={`mailto:${personal.email}`}
              className="group px-8 py-3.5 rounded-xl bg-[#050505] text-[#f4f1ee] font-mono text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              <FiMail size={15} />
              SEND A MESSAGE
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-3.5 rounded-xl bg-[#f4f1ee] text-[#050505] font-mono text-xs uppercase tracking-[0.15em] font-semibold hover:bg-white transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              WHERE DO I SIGN? HERE <FiArrowUpRight size={15} />
            </a>
          </div>

          {/* Bottom Footer Bar */}
          <div className="pt-6 border-t border-[#050505]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#050505]/60 uppercase tracking-[0.15em]">
            <div>{personal.name} · {personal.role}</div>
            <div className="flex items-center gap-6">
              <a href="#hero" className="hover:text-[#050505] transition-colors">Top ↑</a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#050505] transition-colors flex items-center gap-1">
                <FiGithub size={11} /> GitHub
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#050505] transition-colors flex items-center gap-1">
                <FiLinkedin size={11} /> LinkedIn
              </a>
              <span>©{new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          PROJECT DETAIL MODAL
      ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" onClick={() => setSelectedProject(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0e0e0e] border border-white/15 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 relative space-y-6"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 font-mono text-[10px] text-white/40 hover:text-white px-2.5 py-1 rounded border border-white/10 hover:border-white/30 transition-colors"
              >
                ESC ✕
              </button>

              <div>
                <span className="font-mono text-[10px] text-[#ff4c24] uppercase tracking-wider block mb-1">
                  {selectedProject.context}
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>

              <p className="text-sm text-white/70 font-sans leading-relaxed">
                {selectedProject.problem}
              </p>

              <div>
                <h4 className="font-mono text-[10px] uppercase text-white/40 tracking-wider mb-2">Verified Results</h4>
                <ul className="space-y-1.5">
                  {selectedProject.results.map((r, i) => (
                    <li key={i} className="text-xs font-mono text-emerald-400/90 flex items-center gap-2">
                      <span>✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-[10px] uppercase text-white/40 tracking-wider mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] font-mono text-[10px] text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.github && (
                <div className="pt-4 border-t border-white/[0.08]">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#ff4c24] hover:underline"
                  >
                    View Source on GitHub <FiArrowUpRight size={12} />
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditorialPortfolio;
