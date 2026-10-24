import type { WorkExperience } from '../types/types';

export const experienceData: WorkExperience[] = [
  {
    company: "Techforce Infotech Pvt. Ltd.",
    position: "Software Engineer L1",
    duration: "August 2024 – Present",
    location: "Ahmedabad, India",
    roles: [
      { title: "Software Engineer L1", period: "Jan 2026 – Present" },
      { title: "Associate Software Engineer", period: "Aug 2024 – Dec 2025" }
    ],
    description: "Engineering, scaling, and maintaining production Spring Boot backends, asynchronous pipelines, and cloud deployments on AWS across healthcare and recruitment domains.",
    projects: [
      {
        title: "Enterprise Healthcare Order & Patient Management Platform",
        stack: "Java 17, Spring Boot, Apache Kafka, AWS, React, MySQL",
        highlights: [
          "Designed and maintained 40+ REST APIs for orders, invoices, payments, dynamic pricing, commissions, and audit logging, serving 100+ practices, agencies, and manufacturers while processing 10,000+ orders and invoices.",
          "Secured workflows with stateless JWT authentication and role-based access control (RBAC) in Spring Security, strictly protecting sensitive patient data.",
          "Built Kafka-based event streaming and asynchronous background pipelines with distributed job locking to eliminate duplicate processing across distributed instances.",
          "Integrated Stripe payments with Quartz-scheduled automation, cutting manual invoice handling by 40%, and integrated ERP systems, SMS/email gateways, tracking providers, and webhooks.",
          "Delivered real-time notifications over WebSocket and automated PDF/Excel invoice and clinical report generation using Apache PDFBox and Apache POI.",
          "Engineered custom LLM-powered completeness checks for electronic health record (EHR) documents, automating clinical record validation.",
          "Maintained AWS cloud infrastructure (EC2, S3, Lambda, RDS) at 99.9% uptime with CI/CD pipelines in Jenkins and GitHub Actions; supported version control migration from SVN to Git/GitHub."
        ]
      },
      {
        title: "KabilHire — Recruitment Platform & ATS",
        stack: "Java 21, Spring Boot 4, PostgreSQL, Redis, React 19, TanStack Query",
        highlights: [
          "Reworked applicant tracking (ATS) pipeline, candidate search, and job search queries: eliminated per-applicant interview lookups (N+1) with a single batched JOIN FETCH query.",
          "Moved pagination from offset to keyset cursors, cached result counts per filter combination in Redis to skip repeated COUNT(*) scans, and created composite database indexes.",
          "Cut API requests by 64% (121 to 44) and network payload by 60% (541 KB to 216 KB) across 15 user journeys, measured via a custom Playwright test harness.",
          "Cached reference data and candidate profile views in Redis with event-driven cache invalidation, ensuring strict search consistency as job and applicant states update.",
          "Hardened production stability by bounding Kafka client timeouts to prevent broker stalls and capping unbounded notification fetches that previously caused HTTP/2 protocol failures."
        ]
      },
      {
        title: "Job Scraper — Multi-Source Aggregation Engine",
        stack: "Python, Playwright, Spring Boot, PostgreSQL, AWS EC2",
        highlights: [
          "Delivered multi-source job ingestion engine in under 4 weeks: Indeed and LinkedIn collectors plus a Playwright headless browser collector for Naukri with freshness and quality checks.",
          "Architected 4-layer deduplication engine before ingestion into KabilHire database.",
          "Integrated with Spring Boot via a database-driven cron scheduler executing child processes, an API-key-secured ingestion endpoint, and a Super Admin review-and-publish portal.",
          "Built crash-safe Playwright teardown and hung-page recovery; authored the knowledge-transfer guide and AWS EC2 deployment runbook."
        ]
      }
    ],
    achievements: [
      "Promoted to Software Engineer L1 in January 2026 for production leadership and systems optimization.",
      "Recipient of the Team Motivator Award for collaboration, ownership, and delivery excellence.",
      "Cut API traffic by 64% and payload by 60% across 15 recruitment platform journeys.",
      "Reduced manual payment processing by 40% with automated Stripe and Quartz workflows.",
      "Maintained 99.9% AWS infrastructure uptime across EC2, S3, Lambda, and RDS."
    ],
    technologies: [
      "Java 21", "Java 17", "Spring Boot 4", "Apache Kafka", "PostgreSQL", "Redis",
      "AWS", "Docker", "React 19", "TanStack Query", "TypeScript", "Python",
      "Playwright", "Jenkins", "GitHub Actions", "SonarQube"
    ]
  },
  {
    company: "Rays TechServ",
    position: "Software Development Intern",
    duration: "February 2024 – May 2024",
    location: "Ahmedabad, India",
    description: "Built responsive client web applications and high-throughput backend services using Java, Spring Boot, and React.js.",
    achievements: [
      "Developed and optimized RESTful APIs, improving data retrieval efficiency by 25%.",
      "Collaborated in an Agile development process with Git code reviews and continuous integration.",
      "Engineered reusable React.js frontend interfaces connected to Spring Boot backends."
    ],
    technologies: ["Java", "Spring Boot", "React.js", "JavaScript", "HTML5", "CSS3", "Git"]
  },
  {
    company: "CodSoft",
    position: "Web Development Intern",
    duration: "July 2023 – August 2023",
    location: "Remote / India",
    description: "Developed modern, responsive web user interfaces following best practices in component structure, layout, and cross-browser accessibility.",
    achievements: [
      "Built responsive, accessible web interfaces using HTML5, CSS3, JavaScript, and React.js.",
      "Implemented clean component patterns and optimized page rendering performance."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React.js", "Git"]
  }
];
