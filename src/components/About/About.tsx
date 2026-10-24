import { useInView } from 'react-intersection-observer';
import { personal } from '../../data/personalData';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiBriefcase, FiTarget, FiSearch, FiZap, FiUsers, FiBookOpen } from 'react-icons/fi';
import Statistics from '../Statistics/Statistics';

const traits = [
  {
    title: 'Root-cause debugging',
    desc: 'Tracking production-critical issues across Dev, Stage, and Prod until the architectural root cause is resolved, not just patched.',
    icon: FiSearch
  },
  {
    title: 'Code quality & testing',
    desc: 'Changes are gated through SonarQube quality gates and verified with JUnit, Mockito, and Playwright test harnesses before merging.',
    icon: FiZap
  },
  {
    title: 'Cross-functional delivery',
    desc: 'Recipient of the Team Motivator Award at Techforce Infotech for proactive collaboration, technical ownership, and reliable releases.',
    icon: FiUsers
  },
  {
    title: 'Continuous depth',
    desc: 'Certified across Anthropic MCP, Claude Code in Action, JetBrains Java Foundations, and Building AI Agents; preparing for AWS Developer Associate.',
    icon: FiBookOpen
  },
];

const About = () => {
  const [ref] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="pt-12 md:pt-16 pb-20 md:pb-24 relative overflow-hidden" ref={ref}>
      <div className="glow-mesh" />

      <div className="container relative z-10 space-y-20">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <p className="text-xs text-console-cool font-mono mb-2">engineering profile</p>
          <h2 className="text-3xl md:text-4xl font-medium text-ink tracking-tight mb-4">
            Reliable backend software engineered for production
          </h2>
          <p className="text-ink-muted text-base leading-relaxed">
            From regulated healthcare order platforms to high-concurrency recruitment search pipelines: engineering clean APIs, event streaming, and resilient cloud infrastructure.
          </p>
        </div>

        {/* Narrative & Profile Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Biography: 7 cols */}
          <article className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-medium text-ink font-display pb-2 border-b border-rule">
              Background & engineering focus
            </h3>

            <p className="text-ink-2 text-sm md:text-base leading-relaxed font-body">
              I build and scale backend services and APIs at <span className="text-ink font-medium">{personal.company}</span> across enterprise healthcare and recruitment domains. My work spans Java 17 and Java 21, Spring Boot, Apache Kafka event streaming, PostgreSQL/MySQL query optimization, and Redis caching.
            </p>

            <p className="text-ink-muted text-sm md:text-base leading-relaxed font-body">
              On the healthcare platform, I design and maintain 40+ REST APIs managing orders, invoices, payments, dynamic commissions, and audit trails serving 100+ practices and agencies with 99.9% uptime on AWS. On the KabilHire ATS platform, I reworked the candidate search pipeline to eliminate N+1 queries, introduced keyset pagination, and cut API requests by 64% and payload by 60%.
            </p>

            <p className="text-ink-muted text-sm md:text-base leading-relaxed font-body">
              Promoted to Software Engineer L1 in January 2026, recipient of the Team Motivator Award, and actively building AI tooling like the open-source Skillroom agent skill on GitHub.
            </p>

            {/* Social connection buttons */}
            <div className="flex flex-wrap gap-2.5 pt-2" aria-label="Social connections">
              {[
                { icon: FiGithub, href: personal.github, label: 'GitHub' },
                { icon: FiLinkedin, href: personal.linkedin, label: 'LinkedIn' },
                { icon: FiMail, href: `mailto:${personal.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn text-xs"
                  aria-label={label}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </article>

          {/* Profile Card: 5 cols */}
          <aside className="lg:col-span-5 console-panel p-6 border border-rule space-y-6" aria-label="Profile card">
            <div className="flex items-center gap-4 pb-4 border-b border-rule">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-rule flex-shrink-0 bg-paper-3">
                <img
                  src={personal.profileImage}
                  alt={personal.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-lg font-medium text-ink font-display truncate">
                  {personal.name}
                </h4>
                <p className="text-xs text-console-accent font-mono mb-1 truncate">
                  {personal.role}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-console-ok font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-console-ok" aria-hidden="true" />
                  <span>Available for engineering roles</span>
                </div>
              </div>
            </div>

            {/* Quick telemetry details */}
            <dl className="space-y-3 m-0 text-xs font-mono">
              {[
                { icon: FiBriefcase, label: 'Domain', value: 'Backend Engineering & Distributed Systems' },
                { icon: FiMapPin, label: 'Location', value: personal.location },
                { icon: FiTarget, label: 'Core focus', value: 'Java 21/17, Kafka, Redis, Query Tuning, AWS' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="p-3 rounded bg-paper-3 border border-rule">
                    <dt className="text-ink-muted text-[10px] font-body mb-0.5 flex items-center gap-1.5">
                      <Icon size={12} className="text-console-cool" aria-hidden="true" />
                      <span>{item.label}</span>
                    </dt>
                    <dd className="text-ink-2 font-medium m-0 truncate">
                      {item.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </aside>
        </div>

        {/* Career Statistics */}
        <div className="pt-8 border-t border-rule" aria-label="Professional metrics">
          <Statistics />
        </div>

        {/* Engineering Philosophy & Habits */}
        <div className="space-y-6 pt-4">
          <div className="max-w-2xl">
            <h3 className="text-lg font-medium text-ink font-display mb-1.5">
              Engineering discipline & production habits
            </h3>
            <p className="text-xs md:text-sm text-ink-muted font-body">
              How I approach distributed systems, code quality gating, and team ownership.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Core engineering habits">
            {traits.map((t, idx) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className="console-panel p-5 border border-rule flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded bg-paper-3 text-console-accent" aria-hidden="true">
                        <Icon size={16} />
                      </div>
                      <span className="text-[10px] font-mono text-ink-muted">0{idx + 1}</span>
                    </div>
                    <h4 className="text-sm font-medium text-ink font-body mb-2">
                      {t.title}
                    </h4>
                    <p className="text-xs text-ink-muted leading-relaxed font-body">
                      {t.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
