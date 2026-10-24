import React, { useState } from 'react';
import { FiCheckCircle, FiAlertTriangle, FiCode, FiZap, FiDatabase } from 'react-icons/fi';

export const QueryTuner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'java' | 'sql' | 'metrics'>('java');
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');

  return (
    <section id="query-tuner" className="py-20 md:py-28 bg-paper-3 border-t border-rule relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-console-ok" aria-hidden="true" />
            <span className="text-xs font-mono text-console-ok">
              Production Architecture Crucible
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-medium text-ink tracking-tight font-display mb-4">
            Interactive Query Tuner &amp; N+1 Solver
          </h2>
          <p className="text-ink-muted text-base leading-relaxed font-body">
            Examine how Vivek refactored KabilHire&apos;s recruitment candidate pipeline in Java 21 &amp; PostgreSQL, 
            slashing API network requests by 64% and payload size by 60%.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Tab buttons */}
          <div className="flex gap-2" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'java'}
              onClick={() => setActiveTab('java')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                activeTab === 'java'
                  ? 'bg-paper-2 text-console-accent border-console-accent/40 font-medium'
                  : 'bg-paper text-ink-muted border-rule hover:text-ink'
              }`}
            >
              <FiCode aria-hidden="true" />
              <span>Spring Data JPA / Keyset</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'sql'}
              onClick={() => setActiveTab('sql')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                activeTab === 'sql'
                  ? 'bg-paper-2 text-console-accent border-console-accent/40 font-medium'
                  : 'bg-paper text-ink-muted border-rule hover:text-ink'
              }`}
            >
              <FiDatabase aria-hidden="true" />
              <span>PostgreSQL EXPLAIN Plan</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'metrics'}
              onClick={() => setActiveTab('metrics')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                activeTab === 'metrics'
                  ? 'bg-paper-2 text-console-accent border-console-accent/40 font-medium'
                  : 'bg-paper text-ink-muted border-rule hover:text-ink'
              }`}
            >
              <FiZap aria-hidden="true" />
              <span>Network &amp; Payload Ledger</span>
            </button>
          </div>

          {/* Before vs After Switcher */}
          <div className="flex items-center p-1 rounded-lg bg-paper border border-rule self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('before')}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                viewMode === 'before'
                  ? 'bg-console-bad/20 text-console-bad font-medium'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Before: Naive N+1
            </button>
            <button
              type="button"
              onClick={() => setViewMode('after')}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                viewMode === 'after'
                  ? 'bg-console-ok/20 text-console-ok font-medium'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              After: Vivek&apos;s Solution (-64%)
            </button>
          </div>
        </div>

        {/* Code / Artifact Canvas */}
        <div className="bg-paper-2 border border-rule rounded-xl overflow-hidden shadow-2xl">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-rule bg-paper-3/80 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${viewMode === 'after' ? 'bg-console-ok' : 'bg-console-bad'}`} />
              <span className="text-ink font-medium">
                {activeTab === 'java' ? 'CandidateRepository.java' : activeTab === 'sql' ? 'explain_analyze_plan.sql' : 'playwright_network_audit.json'}
              </span>
            </div>
            <span className={`text-[11px] px-2 py-0.5 rounded ${
              viewMode === 'after' ? 'bg-console-ok/15 text-console-ok' : 'bg-console-bad/15 text-console-bad'
            }`}>
              {viewMode === 'after' ? 'OPTIMIZED (PROD ACTIVE)' : 'VULNERABLE (UNOPTIMIZED)'}
            </span>
          </div>

          {/* Code Body */}
          <div className="p-5 font-mono text-xs overflow-x-auto leading-relaxed">
            {activeTab === 'java' && (
              <pre className="text-ink-2">
                {viewMode === 'after' ? (
`// ✅ VIVEK'S OPTIMIZED IMPLEMENTATION: Java 21 & Spring Boot 4
// Batched JOIN FETCH with Keyset Cursor Pagination & Redis L1 Cache
@Repository
public interface CandidateRepository extends JpaRepository<Candidate, UUID> {

    @Query("""
        SELECT DISTINCT c FROM Candidate c
        LEFT JOIN FETCH c.skills s
        LEFT JOIN FETCH c.experiences e
        LEFT JOIN FETCH c.certifications cert
        WHERE (:lastSeenId IS NULL OR c.createdAt < :lastSeenCreatedAt 
               OR (c.createdAt = :lastSeenCreatedAt AND c.id < :lastSeenId))
          AND (:searchTerm IS NULL OR LOWER(c.fullName) LIKE LOWER(CONCAT('%', :searchTerm, '%')))
        ORDER BY c.createdAt DESC, c.id DESC
    """)
    List<Candidate> findCandidatesKeysetPaged(
        @Param("searchTerm") String searchTerm,
        @Param("lastSeenCreatedAt") Instant lastSeenCreatedAt,
        @Param("lastSeenId") UUID lastSeenId,
        Pageable pageable
    );
}

// 🎯 Result: 1 single database roundtrip; 0 Hibernate sequential queries.
// Verified via Playwright 15-journey test: Latency dropped from 840ms to 38ms.`
                ) : (
`// ❌ NAIVE JUNIOR IMPLEMENTATION (The N+1 Anti-Pattern)
// Triggers 1 query for candidate list + N queries for skills + N queries for experience
@Repository
public interface CandidateRepository extends JpaRepository<Candidate, UUID> {

    // Standard Offset Pagination scans full table on high page numbers (OFFSET 10000)
    Page<Candidate> findByFullNameContainingIgnoreCase(String name, Pageable pageable);
}

// ⚠️ In Service Layer:
// For 40 candidates on page, Hibernate executes 41 separate SQL queries!
// Latency: 840ms | DB pool thread starvation under 100 concurrent recruiters.`
                )}
              </pre>
            )}

            {activeTab === 'sql' && (
              <pre className="text-ink-2">
                {viewMode === 'after' ? (
`-- ✅ POSTGRESQL EXPLAIN (ANALYZE, BUFFERS) - VIVEK'S COMPOSITE INDEX
Index Scan using idx_candidates_created_at_id on candidates c
  (cost=0.42..18.25 rows=20 width=248) (actual time=0.038..0.042 rows=20 loops=1)
  Index Cond: ((created_at, id) < ('2026-10-24 18:00:00+00'::timestamptz, 'b39c01...'))
  Buffers: shared hit=4 read=0
Hash Join (actual time=0.124..0.180 rows=58 loops=1)
  Hash Cond: (s.candidate_id = c.id)
  -> Seq Scan on candidate_skills s (Buffers: shared hit=12)
Planning Time: 0.112 ms
Execution Time: 0.285 ms  <-- 38ms end-to-end HTTP response including Redis serialize`
                ) : (
`-- ❌ NAIVE EXPLAIN ANALYZE - UNINDEXED OFFSET SCAN
Seq Scan on candidates  (cost=1000.00..8450.20 rows=20 width=248)
  Filter: (lower(full_name) ~~ '%java%'::text)
  Rows Removed by Filter: 48920
  Buffers: shared hit=842 read=1942  <-- Disk I/O Bottleneck!
SubPlan 1 (Hibernate N+1 child query fired 40 consecutive times):
  -> Index Scan on candidate_skills (fired x40)
Execution Time: 840.42 ms  <-- 840ms bottleneck under load`
                )}
              </pre>
            )}

            {activeTab === 'metrics' && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-paper-3 border border-rule">
                    <p className="text-[11px] text-ink-muted">API Call Reduction</p>
                    <p className="text-2xl font-mono text-console-ok font-medium mt-1">-64%</p>
                    <p className="text-[10px] text-ink-muted mt-1">Batched queries eliminate chatty front-end roundtrips</p>
                  </div>
                  <div className="p-4 rounded-lg bg-paper-3 border border-rule">
                    <p className="text-[11px] text-ink-muted">Payload Over-the-Wire</p>
                    <p className="text-2xl font-mono text-console-cool font-medium mt-1">-60%</p>
                    <p className="text-[10px] text-ink-muted mt-1">Slim projection DTOs eliminate circular JSON bloat</p>
                  </div>
                  <div className="p-4 rounded-lg bg-paper-3 border border-rule">
                    <p className="text-[11px] text-ink-muted">End-to-End Latency</p>
                    <p className="text-2xl font-mono text-console-accent font-medium mt-1">840ms → 38ms</p>
                    <p className="text-[10px] text-ink-muted mt-1">Keyset cursor index + Redis 15-minute TTL caching</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-paper border border-rule flex items-start gap-3">
                  <FiCheckCircle className="w-5 h-5 text-console-ok flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-xs font-body leading-relaxed text-ink-muted">
                    <strong className="text-ink font-mono">Automated Verification:</strong> Vivek validated this refactoring across 
                    15 complete recruiter user journeys using a headless Playwright regression suite, ensuring 0 data corruption 
                    and 0 broken pagination links before deploying to AWS ECS.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Callout */}
          <div className="px-5 py-3 border-t border-rule bg-paper-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-ink-muted">
            <span className="flex items-center gap-2">
              {viewMode === 'after' ? (
                <>
                  <FiCheckCircle className="text-console-ok" aria-hidden="true" />
                  <span className="text-console-ok">Architecture Grade: Production Enterprise</span>
                </>
              ) : (
                <>
                  <FiAlertTriangle className="text-console-bad" aria-hidden="true" />
                  <span className="text-console-bad">Architecture Grade: Critical Performance Defect</span>
                </>
              )}
            </span>
            <span className="text-ink-muted/70">Verified with Playwright &amp; SonarQube</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QueryTuner;
