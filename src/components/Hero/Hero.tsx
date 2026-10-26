import { useEffect, useRef, useState } from 'react';
import { FiDownload, FiMail, FiExternalLink, FiCopy, FiCheck } from 'react-icons/fi';
import { personal } from '../../data/personalData';

interface SystemManifest {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  badgeType: 'cool' | 'accent' | 'ok';
  metrics: { label: string; value: string }[];
  rows: { k: string; v: string }[];
}

const systemManifests: SystemManifest[] = [
  {
    id: 'healthcare',
    name: 'Healthcare Platform',
    shortName: 'Healthcare',
    badge: 'production: 99.9% uptime',
    badgeType: 'ok',
    metrics: [
      { label: 'APIs', value: '40+' },
      { label: 'Orders', value: '10,000+' },
      { label: 'Manual work', value: '-40%' },
    ],
    rows: [
      { k: 'runtime', v: 'Java 17, Spring Boot, Spring Security' },
      { k: 'messaging', v: 'Apache Kafka event streaming' },
      { k: 'concurrency', v: 'Distributed locks, Quartz scheduler' },
      { k: 'cloud infra', v: 'AWS (EC2, S3, Lambda, RDS)' },
      { k: 'security', v: 'Stateless JWT, role-based access control' },
      { k: 'integrations', v: 'Stripe, ERP, WebSockets, LLM validation' },
    ],
  },
  {
    id: 'kabilhire',
    name: 'KabilHire ATS Platform',
    shortName: 'KabilHire ATS',
    badge: 'production: query tuned',
    badgeType: 'accent',
    metrics: [
      { label: 'API requests', value: '-64%' },
      { label: 'Payload', value: '-60%' },
      { label: 'Lookups', value: 'N+1 solved' },
    ],
    rows: [
      { k: 'runtime', v: 'Java 21, Spring Boot 4, React 19' },
      { k: 'database', v: 'PostgreSQL, composite indexes' },
      { k: 'caching', v: 'Redis with event-driven eviction' },
      { k: 'query opt', v: 'Batched JOIN FETCH, keyset cursors' },
      { k: 'resilience', v: 'Bounded Kafka client timeouts' },
      { k: 'verification', v: 'Playwright 15-journey network harness' },
    ],
  },
  {
    id: 'scraper',
    name: 'Job Aggregator Engine',
    shortName: 'Job Scraper',
    badge: 'production: 4-layer dedup',
    badgeType: 'cool',
    metrics: [
      { label: 'Delivery', value: '< 4 weeks' },
      { label: 'Sources', value: 'Indeed, LinkedIn, Naukri' },
      { label: 'Dedup', value: '4 layers' },
    ],
    rows: [
      { k: 'runtime', v: 'Python, Playwright headless, Spring Boot' },
      { k: 'scheduling', v: 'Database-driven cron child processes' },
      { k: 'ingestion', v: 'API-key secured ingestion endpoints' },
      { k: 'resilience', v: 'Crash-safe browser teardown, hang recovery' },
      { k: 'governance', v: 'Super Admin review and publish portal' },
      { k: 'deployment', v: 'AWS EC2 with production runbook' },
    ],
  },
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeSystemIndex, setActiveSystemIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedSpec, setCopiedSpec] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDownloadCV = () => {
    setIsDownloading(true);
    const a = document.createElement('a');
    a.href = personal.resumeUrl;
    a.download = `${personal.name.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setIsDownloading(false), 1200);
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const contentTarget = el.querySelector('.container') || el;
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = Math.max(0, contentTarget.getBoundingClientRect().top + currentScrollY - 76);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const handleCopySpec = () => {
    const sys = systemManifests[activeSystemIndex];
    const spec = `${sys.name} (${sys.badge})\n` +
      sys.metrics.map((m) => `${m.label}: ${m.value}`).join(' | ') + '\n' +
      sys.rows.map((r) => `${r.k}: ${r.v}`).join('\n');
    navigator.clipboard.writeText(spec);
    setCopiedSpec(true);
    setTimeout(() => setCopiedSpec(false), 2000);
  };

  const activeSystem = systemManifests[activeSystemIndex];

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Introduction"
      className="relative flex items-center justify-center overflow-hidden pt-24 pb-16 md:py-24"
      style={{ minHeight: '100dvh' }}
    >
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-14 items-center">
          {/* Left column: 7 cols */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Role indicator in body face */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-ink-muted bg-paper-2 border border-rule font-body">
                <span className="w-2 h-2 rounded-full bg-console-ok" aria-hidden="true" />
                Software Engineer L1 at {personal.company}
              </span>
            </div>

            {/* Headline: solid ink, Host Grotesk 500, no neon, no gradient */}
            <h1
              className="text-ink font-medium text-display leading-tight mb-6"
              style={{ letterSpacing: 'var(--tracking-display)' }}
            >
              Architecting resilient Java backends that scale
            </h1>

            {/* One sentence lede */}
            <p className="lead text-ink-2 mb-8" style={{ maxWidth: '54ch' }}>
              I engineer high-throughput Spring Boot microservices, Kafka event streams, and low-latency database architectures on AWS.
            </p>

            {/* Stack chips */}
            <div className="flex flex-wrap gap-2 mb-10" aria-label="Core stack technologies">
              {['Java 21', 'Spring Boot 4', 'Apache Kafka', 'PostgreSQL', 'Redis', 'AWS', 'React 19', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-xs text-ink-muted bg-paper-3 border border-rule measured"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadCV}
                disabled={isDownloading}
                aria-label={`Download ${personal.name} resume`}
                className="btn btn--primary px-6 py-3 font-medium select-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiDownload size={16} aria-hidden="true" />
                <span>{isDownloading ? 'Downloading…' : 'Download resume'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollToSection('contact')}
                aria-label="Navigate to contact section"
                className="btn px-6 py-3 font-medium select-none active:scale-[0.98] disabled:opacity-50"
              >
                <FiMail size={16} aria-hidden="true" />
                <span>Get in touch</span>
              </button>

              <button
                type="button"
                onClick={() => handleScrollToSection('architecture-simulator')}
                aria-label="Launch systems simulator"
                className="btn px-4 py-3 text-xs select-none border-rule-2 text-console-cool hover:bg-paper-3 active:scale-[0.98] disabled:opacity-50"
              >
                <span>Live simulator</span>
              </button>
            </div>
          </div>

          {/* Right column: 5 cols — System Manifest Switcher */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* System selector tab strip */}
            <div
              className="flex items-center p-1 rounded-lg bg-paper-3 border border-rule overflow-x-auto scrollbar-none"
              role="tablist"
              aria-label="Select production system architecture"
            >
              {systemManifests.map((sys, idx) => {
                const isSelected = activeSystemIndex === idx;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    role="tab"
                    id={`hero-tab-${sys.id}`}
                    aria-selected={isSelected}
                    aria-controls={`hero-panel-${sys.id}`}
                    onClick={() => setActiveSystemIndex(idx)}
                    className={`flex-1 text-center py-2 px-1.5 sm:px-2 text-xs rounded transition-colors font-body truncate ${
                      isSelected
                        ? 'bg-paper-2 text-ink border border-rule-2 font-medium shadow-none'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    <span className="hidden sm:inline">{sys.name}</span>
                    <span className="sm:hidden">{sys.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Single clean hairline console panel */}
            <div
              id={`hero-panel-${activeSystem.id}`}
              role="tabpanel"
              aria-labelledby={`hero-tab-${activeSystem.id}`}
              className="console-panel p-4 sm:p-5 md:p-6 flex flex-col gap-4 sm:gap-5 border border-rule"
            >
              {/* Header with status badge and copy button */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-rule">
                <span className="text-xs text-ink-muted measured">
                  service: {activeSystem.id}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySpec}
                    aria-label="Copy specification"
                    className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink transition-colors font-body px-1.5 py-0.5 rounded border border-rule bg-paper-3"
                  >
                    {copiedSpec ? (
                      <>
                        <FiCheck size={12} className="text-console-ok" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <FiCopy size={12} aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs measured px-2 py-0.5 rounded ${
                      activeSystem.badgeType === 'ok'
                        ? 'text-console-ok bg-paper-3'
                        : activeSystem.badgeType === 'accent'
                        ? 'text-console-accent bg-paper-3'
                        : 'text-console-cool bg-paper-3'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        activeSystem.badgeType === 'ok'
                          ? 'bg-console-ok'
                          : activeSystem.badgeType === 'accent'
                          ? 'bg-console-accent'
                          : 'bg-console-cool'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{activeSystem.badge}</span>
                  </span>
                </div>
              </div>

              {/* Measured metrics row */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 py-1">
                {activeSystem.metrics.map((m) => (
                  <div key={m.label} className="p-2 sm:p-2.5 rounded bg-paper-3 border border-rule">
                    <p className="text-[10px] sm:text-[11px] text-ink-muted font-body mb-0.5 sm:mb-1 truncate">{m.label}</p>
                    <p className="reading text-base sm:text-lg text-ink font-mono">{m.value}</p>
                  </div>
                ))}
              </div>

              {/* Architecture telemetry rows */}
              <dl className="m-0 space-y-2 text-xs measured">
                {activeSystem.rows.map((row) => (
                  <div key={row.k} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3 py-0.5">
                    <dt className="text-ink-muted w-auto sm:w-24 flex-shrink-0 font-normal">{row.k}:</dt>
                    <dd className="text-ink-2 m-0 flex-1 break-words leading-relaxed">{row.v}</dd>
                  </div>
                ))}
              </dl>

              {/* Simulator link */}
              <div className="pt-2 border-t border-rule flex items-center justify-between text-xs font-body text-ink-muted">
                <span>Production runbook verified</span>
                <button
                  type="button"
                  onClick={() => handleScrollToSection('architecture-simulator')}
                  className="text-console-cool hover:underline inline-flex items-center gap-1"
                >
                  <span>Inspect simulator</span>
                  <FiExternalLink size={12} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => handleScrollToSection('about')}
        aria-label="Scroll to about section"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-opacity duration-300 font-body text-xs text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rule-2 rounded p-1"
        style={{ opacity: hasScrolled ? 0 : 0.6 }}
      >
        <span>scroll</span>
        <div className="w-4 h-6 rounded-full border border-rule flex justify-center pt-1 overflow-hidden" aria-hidden="true">
          <div className="w-1 h-1.5 rounded-full bg-console-accent" />
        </div>
      </button>
    </section>
  );
};

export default Hero;