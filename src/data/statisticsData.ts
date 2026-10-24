export interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  subtext?: string;
}

export const statisticsData: Statistic[] = [
  {
    id: 'apis',
    label: 'Production REST APIs',
    value: 40,
    suffix: '+',
    subtext: 'Orders, payments, invoices & EHR checks'
  },
  {
    id: 'orders',
    label: 'Orders & invoices processed',
    value: 10000,
    suffix: '+',
    subtext: 'Across 100+ practices and agencies'
  },
  {
    id: 'request-cut',
    label: 'API request reduction',
    value: 64,
    suffix: '%',
    subtext: '121 to 44 calls across 15 journeys'
  },
  {
    id: 'payload-cut',
    label: 'Network payload cut',
    value: 60,
    suffix: '%',
    subtext: '541 KB down to 216 KB in recruitment ATS'
  },
  {
    id: 'uptime',
    label: 'Cloud infrastructure uptime',
    value: 99.9,
    suffix: '%',
    decimals: 1,
    subtext: 'AWS EC2, S3, Lambda, and RDS'
  },
  {
    id: 'organizations',
    label: 'Organizations supported',
    value: 100,
    suffix: '+',
    subtext: 'Practices, agencies & manufacturers'
  }
];
