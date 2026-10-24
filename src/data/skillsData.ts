export interface SkillItem {
  name: string;
  icon?: string;
  badge?: string;
}

export interface SkillTier {
  title: string;
  desc: string;
  items: SkillItem[];
}

export const skillTiers: SkillTier[] = [
  {
    title: "Core Backend & Distributed Systems",
    desc: "Production daily drivers for Spring Boot backends, event streaming, and cloud systems.",
    items: [
      { name: "Java 17 / 21", icon: "/icons/java.svg" },
      { name: "Spring Boot", icon: "/icons/spring.svg" },
      { name: "Apache Kafka" },
      { name: "PostgreSQL" },
      { name: "Redis" },
      { name: "MySQL", icon: "/icons/mysql.svg" },
      { name: "AWS (EC2, S3, Lambda, RDS)", icon: "/icons/amazonwebservices.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
    ],
  },
  {
    title: "Data Persistence & Concurrency",
    desc: "Techniques and frameworks for high-concurrency database access and async execution.",
    items: [
      { name: "Spring Data JPA" },
      { name: "Hibernate" },
      { name: "Distributed Job Locking" },
      { name: "Quartz Scheduler" },
      { name: "Flyway" },
      { name: "Query Optimization & Indexing" },
      { name: "WebSocket" },
      { name: "Event-Driven Architecture" },
    ],
  },
  {
    title: "Security, APIs & Integrations",
    desc: "Securing regulated healthcare workflows, payments, and multi-source pipelines.",
    items: [
      { name: "Spring Security" },
      { name: "JWT & RBAC" },
      { name: "REST APIs & OpenAPI" },
      { name: "Stripe & ERP Integrations" },
      { name: "Webhooks" },
      { name: "Python & Playwright" },
      { name: "Apache PDFBox & POI" },
      { name: "LLM APIs" },
    ],
  },
  {
    title: "Frontend & Full-Stack Tooling",
    desc: "Full-stack client architectures, state management, and request caching.",
    items: [
      { name: "React.js (React 19)", icon: "/icons/react.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "TanStack Query" },
      { name: "Redux Toolkit", icon: "/icons/redux.svg" },
      { name: "JavaScript (ES6+)", icon: "/icons/javascript.svg" },
      { name: "Angular 17", icon: "/icons/angular.svg" },
      { name: "HTML5 & CSS3", icon: "/icons/html5.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
    ],
  },
  {
    title: "Testing, DevOps & Engineering Practices",
    desc: "Production gating, continuous delivery, and engineering discipline.",
    items: [
      { name: "JUnit & Mockito" },
      { name: "SonarQube Quality Gates" },
      { name: "pytest" },
      { name: "GitHub Actions & Jenkins" },
      { name: "Postman" },
      { name: "Maven & Linux" },
      { name: "Git & Code Review", icon: "/icons/git.svg" },
      { name: "System Design & OOP" },
    ],
  },
];
