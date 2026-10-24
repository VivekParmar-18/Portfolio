import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiDatabase, FiShield, FiCloud, FiActivity, FiLayers } from 'react-icons/fi';

interface ArchitectureLayer {
  id: string;
  title: string;
  icon: typeof FiShield;
  tech: string;
  summary: string;
  details: string[];
  metrics: { label: string; value: string }[];
}

const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'query-tuning',
    title: 'Query Optimization & Caching',
    icon: FiDatabase,
    tech: 'PostgreSQL, Redis, JPA / Hibernate',
    summary: 'Reworking data access paths to eliminate database bottlenecks and eliminate table scans under high concurrency.',
    details: [
      'Replaced per-applicant N+1 interview query scans with a single batched JOIN FETCH query in Spring Data JPA.',
      'Transitioned pagination from offset to keyset cursors, maintaining O(1) page access on deep candidate search tables.',
      'Cached filter combination count totals in Redis with event-driven cache invalidation to skip repeated COUNT(*) table scans.',
      'Designed composite indexes on multi-tenant lookup columns, drastically reducing query execution planning time.'
    ],
    metrics: [
      { label: 'API request cut', value: '-64%' },
      { label: 'Payload reduction', value: '-60%' },
      { label: 'N+1 queries', value: '0' }
    ]
  },
  {
    id: 'event-streaming',
    title: 'Kafka & Distributed Concurrency',
    icon: FiActivity,
    tech: 'Apache Kafka, Quartz, Distributed Locks',
    summary: 'Building fault-tolerant asynchronous event pipelines and coordinating background jobs across distributed server instances.',
    details: [
      'Built Kafka-based background pipelines for asynchronous execution and real-time event streaming.',
      'Implemented distributed job locking across server instances to guarantee zero duplicate background job runs.',
      'Hardened production stability by bounding Kafka client timeouts so broker disconnects cannot stall the application.',
      'Delivered real-time notifications over WebSockets and automated PDF/Excel reports with Apache PDFBox and Apache POI.'
    ],
    metrics: [
      { label: 'Broker stalls', value: '0' },
      { label: 'Duplicate runs', value: '0' },
      { label: 'Manual work cut', value: '-40%' }
    ]
  },
  {
    id: 'security-auth',
    title: 'Security & Regulated Compliance',
    icon: FiShield,
    tech: 'Spring Security, Stateless JWT, RBAC',
    summary: 'Protecting sensitive healthcare records, role hierarchies, and payment processing endpoints with zero trust boundaries.',
    details: [
      'Engineered stateless JWT authentication and granular role-based access control (RBAC) protecting sensitive patient health records.',
      'Integrated Stripe payment processing with Quartz-scheduled automation, cutting manual invoice handling by 40%.',
      'Built custom LLM-powered document completeness checks for electronic health records (EHR), automating clinical validation.',
      'Audited endpoint authorization and secured webhooks, email/SMS gateways, and ERP connectors with API keys and signatures.'
    ],
    metrics: [
      { label: 'REST APIs', value: '40+' },
      { label: 'Orders handled', value: '10k+' },
      { label: 'Practices served', value: '100+' }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud Infrastructure & Reliability',
    icon: FiCloud,
    tech: 'AWS (EC2, S3, Lambda, RDS), Docker, CI/CD',
    summary: 'Managing scalable AWS cloud systems, reproducible container environments, and automated quality gates.',
    details: [
      'Maintained AWS infrastructure (EC2, S3, Lambda, RDS) supporting healthcare platforms at 99.9% production uptime.',
      'Automated continuous integration and deployment with Jenkins and GitHub Actions pipelines.',
      'Enforced code quality gates with SonarQube, JUnit, Mockito, and pytest test suites before production deployment.',
      'Supported version control modernization and repository migration from Apache Subversion (SVN) to Git and GitHub.'
    ],
    metrics: [
      { label: 'AWS uptime', value: '99.9%' },
      { label: 'Deployments', value: 'CI/CD' },
      { label: 'Quality gate', value: 'SonarQube' }
    ]
  }
];

const optimizationDiffs = [
  {
    category: 'Candidate Search Query',
    before: 'N+1 individual queries per applicant interview stage',
    after: '1 batched JOIN FETCH query with composite indexes',
    result: 'Zero redundant queries'
  },
  {
    category: 'Search Result Pagination',
    before: 'Offset pagination triggering full table scan + COUNT(*)',
    after: 'Keyset cursor pagination + Redis cached filter counts',
    result: 'O(1) seek time'
  },
  {
    category: 'Client Request Traffic',
    before: '121 HTTP requests across 15 journeys (frequent polling)',
    after: '44 HTTP requests (TanStack Query deduplication)',
    result: '-64% requests'
  },
  {
    category: 'Network Payload Size',
    before: '541 KB cumulative JSON data transferred',
    after: '216 KB lean, trimmed payload serialization',
    result: '-60% payload'
  }
];

const JavaExpertise = () => {
  const [ref] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);

  const activeLayer = architectureLayers[activeLayerIndex];

  return (
    <section id="java-expertise" className="pt-12 md:pt-16 pb-20 md:pb-24 relative overflow-hidden" ref={ref}>
      <div className="glow-mesh" />

      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="mb-14 max-w-3xl">
          <p className="text-xs text-console-cool font-mono mb-2">systems architecture</p>
          <h2 className="text-3xl md:text-4xl font-medium text-ink tracking-tight mb-4">
            Java & Spring Boot backend engineering
          </h2>
          <p className="text-ink-muted text-base leading-relaxed">
            Engineering production backend systems across healthcare and recruitment platforms: eliminating database bottlenecks, streaming events via Kafka, and guaranteeing high uptime.
          </p>
        </div>

        {/* ── Feature 1: The Production Query Optimization Diff Ledger ── */}
        <div className="mb-16">
          <div className="flex items-center justify-between pb-3 border-b border-rule mb-4">
            <h3 className="text-sm font-medium text-ink font-body">
              Production benchmark: KabilHire ATS query & network optimization
            </h3>
            <span className="text-xs text-console-accent font-mono">
              measured via Playwright harness
            </span>
          </div>

          <div className="console-panel overflow-hidden border border-rule">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-rule">
              {optimizationDiffs.map((diff, i) => (
                <div key={diff.category} className="p-4 flex flex-col justify-between bg-paper-2">
                  <div>
                    <span className="text-[11px] text-ink-muted font-mono block mb-2">
                      0{i + 1} · {diff.category}
                    </span>
                    <div className="space-y-2 mb-4">
                      <div className="p-2 rounded bg-paper-3 border border-rule text-xs">
                        <span className="text-console-bad font-mono text-[10px] block mb-0.5">before</span>
                        <p className="text-ink-muted text-[11px] leading-snug">{diff.before}</p>
                      </div>
                      <div className="p-2 rounded bg-paper-3 border border-rule text-xs">
                        <span className="text-console-ok font-mono text-[10px] block mb-0.5">optimized</span>
                        <p className="text-ink text-[11px] leading-snug font-medium">{diff.after}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-rule flex items-center justify-between">
                    <span className="text-[10px] text-ink-muted font-body">Outcome</span>
                    <span className="text-xs text-console-accent font-mono font-medium">{diff.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Feature 2: Interactive Architecture Inspector ── */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Layer Selector tabs: 4 cols */}
          <div className="lg:col-span-4 flex flex-col gap-2" role="tablist" aria-label="Architecture layers">
            {architectureLayers.map((layer, index) => {
              const Icon = layer.icon;
              const isSelected = activeLayerIndex === index;
              return (
                <button
                  key={layer.id}
                  type="button"
                  role="tab"
                  id={`arch-tab-${layer.id}`}
                  aria-selected={isSelected}
                  aria-controls={`arch-panel-${layer.id}`}
                  onClick={() => setActiveLayerIndex(index)}
                  className={`w-full text-left p-4 rounded border transition-colors flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-paper-2 border-rule-2 text-ink'
                      : 'bg-paper-3 border-rule text-ink-muted hover:text-ink hover:border-rule-2'
                  }`}
                >
                  <div
                    className={`p-2 rounded ${
                      isSelected ? 'bg-paper-3 text-console-accent' : 'bg-paper-2 text-ink-muted'
                    }`}
                    aria-hidden="true"
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-ink font-body mb-0.5 truncate">
                      {layer.title}
                    </h4>
                    <p className="text-[11px] text-ink-muted font-mono truncate">{layer.tech}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector Display: 8 cols */}
          <div
            className="lg:col-span-8 console-panel p-6 md:p-8 border border-rule"
            role="tabpanel"
            id={`arch-panel-${activeLayer.id}`}
            aria-labelledby={`arch-tab-${activeLayer.id}`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-rule mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-console-cool">
                <FiLayers size={14} aria-hidden="true" />
                <span>layer: {activeLayer.id}</span>
              </div>
              <span className="text-xs text-ink-muted font-mono">{activeLayer.tech}</span>
            </div>

            <h3 className="text-xl md:text-2xl font-medium text-ink mb-3 font-display">
              {activeLayer.title}
            </h3>
            <p className="text-ink-2 text-sm md:text-base leading-relaxed mb-6 font-body">
              {activeLayer.summary}
            </p>

            {/* Implementation checklist */}
            <div className="space-y-2.5 mb-8">
              {activeLayer.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-ink-muted">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-console-accent flex-shrink-0" aria-hidden="true" />
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-rule">
              {activeLayer.metrics.map((m) => (
                <div key={m.label} className="p-3 rounded bg-paper-3 border border-rule">
                  <p className="text-[10px] text-ink-muted font-body mb-0.5 truncate">{m.label}</p>
                  <p className="reading text-base md:text-lg text-ink font-mono">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JavaExpertise;