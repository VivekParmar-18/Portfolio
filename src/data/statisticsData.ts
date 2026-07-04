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
    label: 'Years of experience',
    value: 2,
    suffix: '+ yrs'
  },
  {
    id: 'apis',
    label: 'Production REST APIs',
    value: 40,
    suffix: '+'
  },
  {
    id: 'orders',
    label: 'Orders & invoices processed',
    value: 10000,
    suffix: '+'
  },
  {
    id: 'organizations',
    label: 'Organizations supported',
    value: 100,
    suffix: '+'
  }
];
