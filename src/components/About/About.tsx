import { useInView } from 'react-intersection-observer';
import { personal } from '../../data/personalData';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiBriefcase, FiTarget } from 'react-icons/fi';
import Statistics from '../Statistics/Statistics';

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
          <article className="lg:col-span-7 space-y-5 min-w-0">
            <h3 className="text-lg font-medium text-ink font-display pb-2 border-b border-rule">
              Background & engineering focus
            </h3>

            <p className="text-ink-2 text-sm md:text-base leading-relaxed font-body">
              I engineer backend services and APIs at <span className="text-ink font-medium">{personal.company}</span> across enterprise healthcare and recruitment domains. Core stack includes Java 21, Spring Boot, Apache Kafka event streaming, PostgreSQL/MySQL query tuning, and Redis caching on AWS.
            </p>

            <p className="text-ink-muted text-sm md:text-base leading-relaxed font-body">
              On the healthcare platform, I maintain 40+ REST APIs managing orders, dynamic commissions, and audit trails serving 100+ practices with 99.9% uptime. On KabilHire ATS, I resolved N+1 bottlenecks with batched fetches and keyset pagination, cutting API calls by 64% and payloads by 60%.
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
                  className="btn text-xs active:scale-[0.98]"
                  aria-label={label}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </article>

          {/* Profile Card: 5 cols */}
          <aside className="lg:col-span-5 console-panel p-4 sm:p-6 border border-rule space-y-5 min-w-0 w-full" aria-label="Profile card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 pb-4 border-b border-rule">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-rule flex-shrink-0 bg-paper-3">
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
              <div className="min-w-0 flex-1">
                <h4 className="text-base sm:text-lg font-medium text-ink font-display truncate">
                  {personal.name}
                </h4>
                <p className="text-xs text-console-accent font-mono mb-1 truncate">
                  {personal.role}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-console-ok font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-console-ok" aria-hidden="true" />
                  <span className="truncate">Available for engineering roles</span>
                </div>
              </div>
            </div>

            {/* Quick telemetry details */}
            <dl className="space-y-2.5 sm:space-y-3 m-0 text-xs font-mono">
              {[
                { icon: FiBriefcase, label: 'Domain', value: 'Backend Engineering & Distributed Systems' },
                { icon: FiMapPin, label: 'Location', value: personal.location },
                { icon: FiTarget, label: 'Core focus', value: 'Java 21/17, Kafka, Redis, Query Tuning, AWS' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="p-2.5 sm:p-3 rounded bg-paper-3 border border-rule">
                    <dt className="text-ink-muted text-[10px] font-body mb-0.5 flex items-center gap-1.5">
                      <Icon size={12} className="text-console-cool flex-shrink-0" aria-hidden="true" />
                      <span>{item.label}</span>
                    </dt>
                    <dd className="text-ink-2 font-medium m-0 break-words leading-snug">
                      {item.value}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </aside>
        </div>

        {/* Career Statistics */}
        <div className="pt-6 border-t border-rule" aria-label="Professional metrics">
          <Statistics />
        </div>
      </div>
    </section>
  );
};

export default About;
