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
    label: 'Engineering Journey',
    value: 2,
    suffix: '+ yrs',
    icon: '🏗️'
  },
  {
    id: 'projects',
    label: 'Architecture Success',
    value: 15,
    suffix: '+ systems',
    icon: '🔮'
  },
  {
    id: 'technologies',
    label: 'Innovation Stack',
    value: 12,
    suffix: '+ tools',
    icon: '🧩'
  },
  {
    id: 'satisfaction',
    label: 'Performance Index',
    value: 99,
    suffix: '%',
    icon: '💎'
  }
];