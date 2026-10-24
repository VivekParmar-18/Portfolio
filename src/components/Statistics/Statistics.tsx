import { statisticsData } from '../../data/statisticsData';
import AnimatedCounter from '../AnimatedCounter/AnimatedCounter';

const Statistics = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-rule mb-8">
        <h3 className="text-sm font-medium text-ink font-body">
          Production scale & measured metrics
        </h3>
        <span className="text-xs text-console-cool font-mono">
          verified engineering telemetry
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statisticsData.map((stat, index) => (
          <div
            key={stat.id}
            className="p-4 rounded bg-paper-3 border border-rule transition-colors hover:border-console-accent/40 flex flex-col justify-between"
          >
            <span className="text-[10px] font-mono text-ink-muted mb-2 block">
              0{index + 1}
            </span>

            <div className="reading text-2xl md:text-3xl text-ink font-mono mb-2">
              <AnimatedCounter
                end={stat.value}
                duration={2}
                suffix={stat.suffix}
                prefix={stat.prefix}
                decimals={stat.decimals}
              />
            </div>

            <div>
              <p className="text-xs font-medium text-ink-2 font-body mb-1">
                {stat.label}
              </p>
              {stat.subtext && (
                <p className="text-[11px] text-ink-muted font-body leading-snug">
                  {stat.subtext}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
