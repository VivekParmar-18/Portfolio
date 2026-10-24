export interface Project {
  title: string;
  context: string;
  description: string;
  tags: string[];
  problem: string;
  solution: string;
  features: string[];
  results: string[];
  learnings: string;
  github?: string;
  color: 'blue' | 'purple' | 'emerald';
}

export const projectsData: Project[] = [
  {
    title: "KabilHire — Recruitment Platform & ATS Pipeline",
    context: "Production system — Techforce Infotech",
    description: "High-performance recruitment platform and applicant tracking system (ATS) engineered with Java 21, Spring Boot 4, PostgreSQL, Redis, and React 19. Focused on database query tuning, high-concurrency search, and network efficiency.",
    tags: ["Java 21", "Spring Boot 4", "PostgreSQL", "Redis", "React 19", "TanStack Query", "Playwright", "Apache Kafka"],
    problem: "The ATS search and candidate pipeline suffered from query latency under heavy loads: per-applicant interview lookups resulted in N+1 queries, unbounded notification fetching caused HTTP/2 stream failures, and repeated COUNT(*) scans on multi-filter searches burdened the database.",
    solution: "Re-architected the query layer: replaced N+1 queries with a batched JOIN FETCH query, transitioned pagination from offset to keyset cursors, created composite indexes, and cached filter counts and profile views in Redis with event-driven eviction. Bounded Kafka consumer timeouts and capped notification requests.",
    features: [
      "Batched JOIN FETCH queries eliminating N+1 candidate interview lookups",
      "Keyset cursor pagination replacing expensive offset scans on high-volume tables",
      "Redis caching of candidate profiles and filter count totals with event-driven invalidation",
      "Custom Playwright automated test harness verifying 15 user journeys across the network layer",
      "Bounded Kafka client timeouts and capped notification fetches to guarantee stream stability",
      "TanStack Query request deduplication and lean payload serialization"
    ],
    results: [
      "Cut API requests by 64% (from 121 down to 44) across 15 user journeys",
      "Reduced network payload size by 60% (from 541 KB to 216 KB)",
      "Eliminated broker timeout stalls through strict Kafka consumer bounding",
      "Zero repeated COUNT(*) table scans on cached filter combinations"
    ],
    learnings: "Production query performance requires thinking in database execution plans and measuring network roundtrips with real test harnesses. Eliminating N+1 queries and tuning cache invalidation delivered a dramatic reduction in server load and user latency.",
    color: "emerald"
  },
  {
    title: "Enterprise Healthcare Order & Patient Management",
    context: "Production system — Techforce Infotech",
    description: "Enterprise US healthcare order and patient management platform supporting practices, agencies, manufacturers, and administrators. 40+ REST APIs in Java 17 and Spring Boot with Kafka event streaming, Stripe automation, and AWS cloud infrastructure.",
    tags: ["Java 17", "Spring Boot", "Apache Kafka", "AWS", "Stripe", "Quartz Scheduler", "WebSocket", "Docker", "LLM APIs"],
    problem: "Healthcare organizations required a single, HIPAA-compliant platform to coordinate the entire order-to-payment lifecycle (orders, invoices, payments, documents, and notifications) across 100+ organizations while strictly safeguarding patient health information.",
    solution: "Designed, developed, and maintained the platform's core REST API layer in Java 17 and Spring Boot, secured with stateless JWT and role-based access control. Implemented Kafka-based event streaming and background processors with distributed job locking, integrated automated Stripe payments via Quartz schedulers, and integrated custom LLM completeness checks for EHR records.",
    features: [
      "40+ REST APIs covering order, invoice, payment, pricing, commission, and audit logging workflows",
      "Stateless JWT authentication and role-based access control (RBAC) protecting sensitive patient data",
      "Apache Kafka event streaming for real-time processing and asynchronous background jobs",
      "Distributed job locking to prevent duplicate cron executions across scaled instances",
      "Automated Stripe payment workflows scheduled with Quartz, cutting manual processing by 40%",
      "Real-time notifications via WebSocket and automated invoice/report generation with Apache PDFBox and POI",
      "Custom LLM-powered completeness checks for electronic health record (EHR) documents",
      "AWS deployment (EC2, S3, Lambda, RDS) with CI/CD in Jenkins and GitHub Actions at 99.9% uptime"
    ],
    results: [
      "40+ production REST APIs designed, deployed, and maintained",
      "10,000+ orders and invoices processed securely",
      "100+ healthcare practices, agencies, and manufacturers supported",
      "99.9% infrastructure uptime maintained on AWS",
      "40% reduction in manual invoice and payment processing"
    ],
    learnings: "Working on regulated healthcare systems taught me to treat security, distributed locking, and auditability as first-class architectural concerns. Code quality gated by SonarQube and fast incident response in production are vital to keeping critical systems running.",
    color: "blue"
  },
  {
    title: "Job Scraper — Multi-Source Aggregation Engine",
    context: "Production system — Techforce Infotech",
    description: "Resilient job aggregation and web scraping engine built with Python, Playwright, Spring Boot, and PostgreSQL. Gathers postings from multiple recruitment platforms with multi-layer deduplication and automated scheduling.",
    tags: ["Python", "Playwright", "Spring Boot", "PostgreSQL", "AWS EC2", "Automation", "REST APIs"],
    problem: "Manual aggregation of job opportunities across fragmented portals was slow and prone to errors. Dynamic JavaScript rendering, anti-scraping measures, and frequent page timeouts stalled collector runs.",
    solution: "Engineered an automated collector pipeline in under 4 weeks: Indeed and LinkedIn scrapers combined with a Playwright headless browser collector for Naukri. Built a 4-layer deduplication engine, integrated with Spring Boot via a database-driven cron scheduler, and provided a Super Admin review console.",
    features: [
      "Multi-platform collectors: Indeed and LinkedIn plus Playwright browser collector for Naukri",
      "4-layer deduplication engine validating freshness and uniqueness before database ingestion",
      "Database-driven cron scheduler running scrapers as managed child processes",
      "Crash-safe Playwright teardown and hung-page recovery to prevent stalled runs",
      "API-key secured ingestion endpoints and permission-gated Super Admin publish console",
      "Complete EC2 deployment runbook and knowledge-transfer guide"
    ],
    results: [
      "Shipped complete multi-source aggregation engine end-to-end in under 4 weeks",
      "Zero deadlocked scraper runs through crash-safe Playwright teardown handlers",
      "High data cleanliness with 4-layer deduplication preventing duplicate ingestion into KabilHire"
    ],
    learnings: "Resilient data ingestion demands defensive programming: process isolation, strict timeout boundaries, and automated resource cleanup so a single failed page never compromises the entire batch pipeline.",
    color: "purple"
  },
  {
    title: "Skillroom — Prompt Intelligence Engine",
    context: "Open-source project — GitHub",
    description: "Open-source Claude Agent Skill (MIT licensed) that transforms brief prompts into comprehensive, expert-level prompts with intent classification, automatic role assignment, and a transparent quality scorecard.",
    tags: ["Claude Agent Skills", "AI Tooling", "Prompt Engineering", "Open Source", "Markdown"],
    problem: "Developers and users often under-specify prompts when using AI assistants, resulting in hallucinated requirements, lost context, and low-quality outputs.",
    solution: "Created an agent skill with a staged optimization pipeline: intent classification across 13+ domains, explicit assumption tagging via [ASSUMED: ...], transparent 0–100 quality scoring, and progressive-disclosure file loading to stay token-efficient.",
    features: [
      "Intent classification across 13+ domains with automated expert role assignment",
      "Transparent 0–100 quality scorecard with auto-refinement triggers below 90",
      "Explicit assumption surfacing preventing silent AI hallucinations",
      "Progressive disclosure architecture ensuring high token efficiency",
      "Single-command installation: npx skills add VivekParmar-18/skillroom"
    ],
    results: [
      "Published on GitHub under open-source MIT license",
      "Compatible across modern Claude agent runtimes and agentic coding workflows"
    ],
    learnings: "Designing for AI agents requires the same rigor as systems API design: deterministic state pipelines, explicit contracts, and strict token-budget discipline.",
    github: "https://github.com/VivekParmar-18/skillroom",
    color: "purple"
  },
  {
    title: "Lab Automation Tool",
    context: "Client project — Techforce Infotech",
    description: "Laboratory management platform designed to digitize manual lab workflows, sample records, and testing logs with Angular 17, PrimeNG, and Spring Boot REST APIs.",
    tags: ["Angular 17", "PrimeNG", "Spring Boot", "MySQL", "REST APIs"],
    problem: "The client's laboratory operations relied on paper logs and manual spreadsheets, resulting in slow record lookups, transcription errors, and difficulty generating compliance reports.",
    solution: "Built a structured web application with an Angular 17 frontend and PrimeNG components, connecting to Spring Boot REST APIs and a normalized MySQL relational database.",
    features: [
      "Angular 17 frontend with PrimeNG component library for high-speed data entry",
      "RESTful API endpoints for sample management, testing logs, and patient records",
      "Normalized MySQL database schema optimized for query searchability and audit trails"
    ],
    results: [
      "Replaced manual paper tracking with an instant, searchable digital workflow",
      "Successfully delivered into daily laboratory use"
    ],
    learnings: "Working across multiple frontend frameworks (React and Angular) deepened my appreciation for modular architecture and structured component design systems.",
    color: "emerald"
  },
  {
    title: "First Flight Travels",
    context: "Personal project",
    description: "Multi-page travel and flight booking front-end application built from scratch with semantic HTML5, CSS3, and JavaScript.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    problem: "Mastering frontend fundamentals by building an entire multi-page web application with complex responsive layouts without relying on CSS frameworks.",
    solution: "Hand-crafted a multi-page web application complete with flight search, location exploration, user registration, and booking confirmation interfaces.",
    features: [
      "Multi-page architecture with shared stylesheet and navigation system",
      "Responsive layout optimized across mobile, tablet, and desktop viewports",
      "Custom form validation and interactive UI controls"
    ],
    results: [
      "Public open-source repository available on GitHub",
      "Solid foundation in semantic HTML, CSS box model, and responsive styling"
    ],
    learnings: "Writing layout and interaction logic from scratch gives an engineer deep intuition for the browser rendering engine that frameworks abstract away.",
    github: "https://github.com/VivekParmar-18/FirstFlights",
    color: "blue"
  }
];
