export interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  icon?: string;
}

export const statisticsData: Statistic[] = [
  {
    id: 'experience',
    label: 'Years of Experience',
    value: 2,
    suffix: '+',
    icon: '💼'
  },
  {
    id: 'projects',
    label: 'Projects Completed',
    value: 15,
    suffix: '+',
    icon: '🚀'
  },
  {
    id: 'technologies',
    label: 'Technologies Mastered',
    value: 12,
    suffix: '+',
    icon: '⚡'
  },
  {
    id: 'satisfaction',
    label: 'Client Satisfaction',
    value: 98,
    suffix: '%',
    icon: '⭐'
  }
];