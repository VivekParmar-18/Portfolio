export interface SkillItem {
  name: string;
  icon?: string; // local /icons/*.svg when a recognizable logo exists
}

export interface SkillTier {
  title: string;
  desc: string;
  items: SkillItem[];
}

// Tiered on purpose: explicit depth reads more senior than a flat wall of logos.
export const skillTiers: SkillTier[] = [
  {
    title: 'Daily drivers',
    desc: 'The core stack I ship production work with, every day.',
    items: [
      { name: 'Java 17', icon: '/icons/java.svg' },
      { name: 'Spring Boot', icon: '/icons/spring.svg' },
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'TypeScript', icon: '/icons/typescript.svg' },
      { name: 'MySQL', icon: '/icons/mysql.svg' },
      { name: 'AWS', icon: '/icons/amazonwebservices.svg' },
    ],
  },
  {
    title: 'Also ship with',
    desc: 'Regular parts of my toolkit across projects and deployments.',
    items: [
      { name: 'Redux Toolkit', icon: '/icons/redux.svg' },
      { name: 'JavaScript', icon: '/icons/javascript.svg' },
      { name: 'Angular 17', icon: '/icons/angular.svg' },
      { name: 'GitHub Actions' },
      { name: 'Jenkins' },
      { name: 'Docker', icon: '/icons/docker.svg' },
      { name: 'Git', icon: '/icons/git.svg' },
      { name: 'Maven' },
      { name: 'Tailwind CSS', icon: '/icons/tailwindcss.svg' },
      { name: 'HTML5', icon: '/icons/html5.svg' },
      { name: 'CSS3', icon: '/icons/css3.svg' },
    ],
  },
  {
    title: 'Quality & practices',
    desc: 'How the work stays reliable once it ships.',
    items: [
      { name: 'JUnit' },
      { name: 'Mockito' },
      { name: 'SonarQube' },
      { name: 'Postman' },
      { name: 'Swagger / OpenAPI' },
      { name: 'Agile / Scrum' },
      { name: 'Secure coding' },
    ],
  },
];
