import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiRefreshCw, FiCheckCircle, FiActivity, FiServer, FiLayers, FiDatabase, FiCpu } from 'react-icons/fi';

interface SimulationScenario {
  id: string;
  name: string;
  platform: string;
  load: string;
  description: string;
  beforeLatency: string;
  afterLatency: string;
  beforeQueries: string;
  afterQueries: string;
  cacheHitRatio: string;
  payloadReduction: string;
  logs: string[];
}

const scenarios: SimulationScenario[] = [
  {
    id: 'kabilhire',
    name: 'Candidate Search Query Storm',
    platform: 'KabilHire ATS Platform (Java 21, Spring Boot 4, PostgreSQL, Redis)',
    load: '5,000 concurrent candidate searches',
    description: 'Replaced N+1 ORM lazy fetches with batched JOIN FETCH, keyset cursor pagination, and Redis caching with automatic TTL eviction.',
    beforeLatency: '840ms',
    afterLatency: '38ms',
    beforeQueries: '41 queries/req (N+1)',
    afterQueries: '1 batched query/req',
    cacheHitRatio: '98.4%',
    payloadReduction: '-60%',
    logs: [
      '[Gateway] Inbound batch: 5,000 search queries on /api/v1/candidates/search',
      '[Redis] L1 Cache hit on composite key candidate:filter:hash:a9f2 -> returned in 3ms',
      '[Spring Boot 4] Keyset cursor pagination applied; skipping offset row count scan',
      '[PostgreSQL] Composite index idx_candidate_skills_experience utilized; 0 full table scans',
      '[Playwright Harness] Verification passed: 15-journey network payload reduced by 60%'
    ]
  },
  {
    id: 'healthcare',
    name: 'Stripe Payment Webhook Ingestion',
    platform: 'Enterprise Healthcare Platform (Java 17, Kafka, Quartz, AWS RDS)',
    load: '1,200 asynchronous payment events/min',
    description: 'Decoupled synchronous checkout with Kafka event streams and distributed Quartz job locking to eliminate race conditions.',
    beforeLatency: '1,420ms',
    afterLatency: '45ms (async ack)',
    beforeQueries: 'Synchronous lock wait',
    afterQueries: 'Distributed Quartz event lock',
    cacheHitRatio: '99.9% uptime',
    payloadReduction: '-40% manual overhead',
    logs: [
      '[Stripe Webhook] Received charge.succeeded webhook payload',
      '[Kafka Producer] Emitted event to topic orders.payment.verified partition 2',
      '[Consumer Worker] Distributed lock acquired on order_lock:10948 via Quartz',
      '[PostgreSQL] Order status updated to PAID; patient medical record unlocked',
      '[Kafka] Acknowledgement committed to partition offset 48201'
    ]
  },
  {
    id: 'scraper',
    name: 'Multi-Source Scraper Deduplication',
    platform: 'Job Aggregator Engine (Playwright Headless, Spring Boot, MySQL)',
    load: '10,000 raw listings across Indeed, LinkedIn, Naukri',
    description: '4-layer deduplication hash engine with freshness filters and crash-safe browser lifecycle teardown.',
    beforeLatency: '18.4s batch',
    afterLatency: '2.1s stream',
    beforeQueries: 'Linear URL lookups',
    afterQueries: '4-layer hash fingerprinting',
    cacheHitRatio: '94.2% duplicates pruned',
    payloadReduction: '< 4 week delivery',
    logs: [
      '[Scraper Engine] Headless Playwright worker pool spawned (concurrency: 6)',
      '[Ingestion] Streamed 10,000 candidate postings into memory gate',
      '[Dedup Layer 1-4] Exact URL, company-title normalized hash, and description vector matched',
      '[Storage] 8,100 duplicate items suppressed; 1,900 pristine records committed',
      '[Governance] Published to Super Admin review queue with 0 zombie processes'
    ]
  }
];

export const SystemsSimulator: React.FC = () => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeLogs, setActiveLogs] = useState<string[]>([]);

  const scenario = scenarios[selectedScenarioIndex];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(1);
    setActiveLogs([scenario.logs[0]]);

    // Sequence through the 4 architecture stages
    setTimeout(() => {
      setActiveStep(2);
      setActiveLogs((prev) => [...prev, scenario.logs[1]]);
    }, 600);

    setTimeout(() => {
      setActiveStep(3);
      setActiveLogs((prev) => [...prev, scenario.logs[2], scenario.logs[3]]);
    }, 1200);

    setTimeout(() => {
      setActiveStep(4);
      setActiveLogs((prev) => [...prev, scenario.logs[4]]);
      setIsSimulating(false);
    }, 1800);
  };

  useEffect(() => {
    setActiveStep(0);
    setActiveLogs([scenario.logs[0]]);
  }, [selectedScenarioIndex]);

  return (
    <section id="architecture-simulator" className="py-20 md:py-28 bg-paper relative overflow-hidden border-t border-rule">
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-console-accent animate-pulse" aria-hidden="true" />
            <span className="text-xs font-mono text-console-accent">
              Interactive Systems Simulator
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-ink tracking-tight font-display mb-4">
            Test my distributed architectures live
          </h2>
          <p className="text-ink-muted text-base leading-relaxed font-body">
            Trigger simulated production event spikes across Spring Boot backends, Kafka event streaming topics, 
            Redis caches, and tuned PostgreSQL queries to watch latency plummet.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Simulation Scenarios">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.id}
              type="button"
              role="tab"
              aria-selected={selectedScenarioIndex === idx}
              onClick={() => setSelectedScenarioIndex(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-colors border ${
                selectedScenarioIndex === idx
                  ? 'bg-paper-2 text-console-accent border-console-accent/40 font-medium shadow-sm'
                  : 'bg-paper-3 text-ink-muted border-rule hover:text-ink hover:bg-paper-2'
              }`}
            >
              {sc.name}
            </button>
          ))}
        </div>

        {/* Simulator Workbench */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Main Visual Pipeline Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-paper-2 border border-rule rounded-xl p-5 md:p-6 shadow-xl flex flex-col gap-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rule">
              <div>
                <p className="text-sm font-medium text-ink font-display">{scenario.platform}</p>
                <p className="text-xs text-ink-muted font-mono mt-0.5">Load profile: {scenario.load}</p>
              </div>
              <button
                type="button"
                onClick={runSimulation}
                disabled={isSimulating}
                className="btn btn--primary py-2 px-4 text-xs font-mono whitespace-nowrap self-start sm:self-auto"
              >
                {isSimulating ? (
                  <>
                    <FiRefreshCw className="animate-spin" aria-hidden="true" />
                    <span>Processing event stream…</span>
                  </>
                ) : (
                  <>
                    <FiPlay aria-hidden="true" />
                    <span>Run Simulation</span>
                  </>
                )}
              </button>
            </div>

            {/* Visual Pipeline Nodes */}
            <div className="py-6 px-2 bg-paper-3/60 rounded-lg border border-rule relative overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                {/* Node 1: Client Gateway */}
                <div className={`p-4 rounded-lg border transition-colors ${
                  activeStep >= 1 ? 'border-console-accent bg-paper-2 shadow-lg shadow-cyan-500/10' : 'border-rule bg-paper-2/60'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <FiServer className={activeStep >= 1 ? 'text-console-accent' : 'text-ink-muted'} aria-hidden="true" />
                    <span className="text-[10px] font-mono text-ink-muted">STEP 01</span>
                  </div>
                  <p className="text-xs font-medium text-ink font-mono">REST Gateway</p>
                  <p className="text-[11px] text-ink-muted mt-1">Spring Boot 4</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono">
                    <span className={`w-1.5 h-1.5 rounded-full ${activeStep >= 1 ? 'bg-console-ok' : 'bg-ink-muted/40'}`} />
                    <span className="text-ink-muted">{activeStep >= 1 ? 'Inbound ACK' : 'Idle'}</span>
                  </div>
                </div>

                {/* Node 2: Kafka Stream */}
                <div className={`p-4 rounded-lg border transition-colors ${
                  activeStep >= 2 ? 'border-console-cool bg-paper-2 shadow-lg shadow-sky-500/10' : 'border-rule bg-paper-2/60'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <FiActivity className={activeStep >= 2 ? 'text-console-cool' : 'text-ink-muted'} aria-hidden="true" />
                    <span className="text-[10px] font-mono text-ink-muted">STEP 02</span>
                  </div>
                  <p className="text-xs font-medium text-ink font-mono">Event Broker</p>
                  <p className="text-[11px] text-ink-muted mt-1">Apache Kafka</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono">
                    <span className={`w-1.5 h-1.5 rounded-full ${activeStep >= 2 ? 'bg-console-ok' : 'bg-ink-muted/40'}`} />
                    <span className="text-ink-muted">{activeStep >= 2 ? 'Partitioned' : 'Waiting'}</span>
                  </div>
                </div>

                {/* Node 3: Redis Cache */}
                <div className={`p-4 rounded-lg border transition-colors ${
                  activeStep >= 3 ? 'border-console-ok bg-paper-2 shadow-lg shadow-emerald-500/10' : 'border-rule bg-paper-2/60'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <FiLayers className={activeStep >= 3 ? 'text-console-ok' : 'text-ink-muted'} aria-hidden="true" />
                    <span className="text-[10px] font-mono text-ink-muted">STEP 03</span>
                  </div>
                  <p className="text-xs font-medium text-ink font-mono">L1 Caching</p>
                  <p className="text-[11px] text-ink-muted mt-1">Redis In-Memory</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono">
                    <span className={`w-1.5 h-1.5 rounded-full ${activeStep >= 3 ? 'bg-console-ok' : 'bg-ink-muted/40'}`} />
                    <span className="text-ink-muted">{activeStep >= 3 ? '98.4% Hit' : 'Hot'}</span>
                  </div>
                </div>

                {/* Node 4: Tuned DB */}
                <div className={`p-4 rounded-lg border transition-colors ${
                  activeStep >= 4 ? 'border-console-accent bg-paper-2 shadow-lg shadow-cyan-500/10' : 'border-rule bg-paper-2/60'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <FiDatabase className={activeStep >= 4 ? 'text-console-accent' : 'text-ink-muted'} aria-hidden="true" />
                    <span className="text-[10px] font-mono text-ink-muted">STEP 04</span>
                  </div>
                  <p className="text-xs font-medium text-ink font-mono">Storage Tier</p>
                  <p className="text-[11px] text-ink-muted mt-1">PostgreSQL Tuned</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono">
                    <span className={`w-1.5 h-1.5 rounded-full ${activeStep >= 4 ? 'bg-console-ok' : 'bg-ink-muted/40'}`} />
                    <span className="text-ink-muted">{activeStep >= 4 ? 'Batched FETCH' : 'Indexed'}</span>
                  </div>
                </div>
              </div>

              {/* Progress Pulse Bar */}
              <div className="w-full bg-paper mt-6 h-1 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-console-accent via-console-cool to-console-ok"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(activeStep / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Live Terminal Telemetry Output */}
            <div className="p-4 rounded-lg bg-paper-3 border border-rule font-mono text-xs space-y-1.5 overflow-x-auto">
              <div className="flex items-center justify-between text-[11px] text-ink-muted pb-2 border-b border-rule mb-2">
                <span className="flex items-center gap-2">
                  <FiCpu className="text-console-accent" aria-hidden="true" />
                  <span>Real-time execution telemetry</span>
                </span>
                <span className="text-console-ok text-[10px]">cluster: active</span>
              </div>
              {activeLogs.map((log, index) => (
                <div key={index} className="text-ink-2 leading-relaxed flex items-start gap-2">
                  <span className="text-console-cool flex-shrink-0">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Side Performance Ledger (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Impact Metric 1: Latency */}
            <div className="p-5 rounded-xl bg-paper-2 border border-rule">
              <p className="text-xs font-mono text-ink-muted mb-1">Latency comparison</p>
              <div className="flex items-baseline justify-between mt-2">
                <div>
                  <p className="text-xs text-console-bad line-through font-mono">{scenario.beforeLatency}</p>
                  <p className="text-[10px] text-ink-muted font-mono">Before (Naive)</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-mono font-medium text-console-ok">{scenario.afterLatency}</p>
                  <p className="text-[10px] text-console-cool font-mono">Vivek&apos;s Architecture</p>
                </div>
              </div>
            </div>

            {/* Impact Metric 2: Database Load */}
            <div className="p-5 rounded-xl bg-paper-2 border border-rule">
              <p className="text-xs font-mono text-ink-muted mb-1">Query execution overhead</p>
              <div className="flex items-baseline justify-between mt-2">
                <div>
                  <p className="text-xs text-console-bad font-mono">{scenario.beforeQueries}</p>
                  <p className="text-[10px] text-ink-muted font-mono">Before</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-mono font-medium text-console-ok">{scenario.afterQueries}</p>
                  <p className="text-[10px] text-console-cool font-mono">Optimized</p>
                </div>
              </div>
            </div>

            {/* Impact Metric 3: Network / Cache */}
            <div className="p-5 rounded-xl bg-paper-2 border border-rule">
              <p className="text-xs font-mono text-ink-muted mb-1">Cache efficiency & payload</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-xl font-mono font-medium text-ink">{scenario.cacheHitRatio}</p>
                  <p className="text-[10px] text-ink-muted font-mono">Cache Hit Ratio</p>
                </div>
                <div>
                  <p className="text-xl font-mono font-medium text-console-ok">{scenario.payloadReduction}</p>
                  <p className="text-[10px] text-ink-muted font-mono">Payload Reduction</p>
                </div>
              </div>
            </div>

            {/* Engineering Takeaway */}
            <div className="p-4 rounded-xl bg-paper-3 border border-rule-2 text-xs font-body text-ink-muted leading-relaxed">
              <div className="flex items-center gap-2 text-ink font-medium font-mono text-[11px] mb-1">
                <FiCheckCircle className="text-console-ok" aria-hidden="true" />
                <span>Production Proven</span>
              </div>
              {scenario.description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemsSimulator;
