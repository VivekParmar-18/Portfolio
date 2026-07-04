export interface Project {
  title: string;
  context: string;          // "Production system — Techforce Infotech" | "Client project — Techforce Infotech" | "Personal project"
  description: string;
  tags: string[];           // REAL technologies only
  problem: string;
  solution: string;
  features: string[];       // honest technical work items
  results: string[];        // honest, resume-backed outcomes
  learnings: string;
  github?: string;          // only if a public repo exists
  color: 'blue' | 'purple' | 'emerald';
}

export const projectsData: Project[] = [
  {
    title: "Healthcare Order Management Platform",
    context: "Production system — Techforce Infotech",
    description: "Enterprise US healthcare order and patient management platform serving practices, agencies, manufacturers, and administrators. The code is private, but I can walk through the architecture and my contributions in detail in interviews.",
    tags: ["Java 17", "Spring Boot", "React", "Redux Toolkit", "MySQL", "AWS", "Stripe", "WebSocket", "LLMs", "GitHub Actions"],
    problem: "Healthcare organizations needed one platform to manage the full order-to-payment lifecycle — orders, invoices, payments, documents, and notifications — across 100+ practices, agencies, and manufacturers, with strict control over who can access patient data.",
    solution: "I design, develop, and maintain the platform's REST API layer in Java 17 and Spring Boot, secured with JWT authentication and role-based access control aligned with healthcare compliance standards. The backend integrates Stripe payments, ERP systems, email/SMS providers, tracking services, and webhooks, uses custom LLMs to check EHR documents for completeness, and runs on AWS with GitHub Actions and Jenkins CI/CD.",
    features: [
      "40+ REST APIs covering order, invoice, payment, notification, and document workflows",
      "JWT authentication and role-based access control for secure patient data workflows",
      "Custom LLM-powered completeness checks for EHR documents",
      "Stripe, ERP, email/SMS, tracking, and webhook integrations",
      "Async processing with schedulers and distributed job locking",
      "Real-time notifications via WebSocket",
      "PDF and Excel document generation with Apache PDFBox and Apache POI",
      "AWS deployment (EC2, S3, Lambda, RDS) with GitHub Actions & Jenkins CI/CD"
    ],
    results: [
      "40+ production REST APIs designed, developed, and maintained",
      "10,000+ orders and invoices processed through the platform",
      "100+ organizations supported across the US healthcare space",
      "Production-critical issues resolved across Dev, Stage, and Prod with minimal downtime"
    ],
    learnings: "Working on a production healthcare system taught me to treat security and reliability as first-class features — access control, SonarQube quality gates, and careful incident response matter as much as shipping new endpoints.",
    color: "blue"
  },
  {
    title: "Skillroom — Prompt Intelligence Engine",
    context: "Open-source project",
    description: "An open-source Claude Agent Skill (MIT licensed) that automatically transforms brief prompts into comprehensive, expert-level prompts — with intent classification, automatic role assignment, and a transparent quality scorecard.",
    tags: ["Claude Agent Skills", "AI Tooling", "Prompt Engineering", "Markdown"],
    problem: "Good prompts are a skill: most people under-specify what they want from AI assistants, silently lose context, and never know whether a prompt is actually good before running it.",
    solution: "Built an agent skill with a staged optimization pipeline — difficulty estimation, intent classification across 13+ domains (coding, debugging, research, SQL, AWS, QA), context inference from conversation history, expert role assignment, and hidden-requirement expansion — using progressive disclosure so reference files load only when needed.",
    features: [
      "Intent classification across 13+ domains with automatic expert role assignment",
      "Assumptions surfaced explicitly as [ASSUMED: …] tags instead of silent guessing",
      "Transparent 0–100 quality scorecard with auto-improvement below 90",
      "Difficulty-tiered depth, from simple tasks to enterprise-level decomposition",
      "Progressive-disclosure design to keep the skill fast and token-efficient",
      "One-command install: npx skills add VivekParmar-18/skillroom"
    ],
    results: [
      "Published on GitHub under the MIT license, open to community contributions",
      "Installable as a Claude Agent Skill with a single CLI command",
      "Roadmap in progress: additional domain playbooks, Q&A mode, saved templates"
    ],
    learnings: "Designing for AI agents is real systems design — the skill needed deterministic staged behavior, explicit assumptions, and token-budget discipline, the same instincts as building a good API.",
    github: "https://github.com/VivekParmar-18/skillroom",
    color: "purple"
  },
  {
    title: "Lab Automation Tool",
    context: "Client project — Techforce Infotech",
    description: "A lab management application built for a client to digitize lab workflows, with an Angular 17 front-end backed by REST APIs and a MySQL database.",
    tags: ["Angular 17", "PrimeNG", "MySQL", "REST APIs"],
    problem: "The client's lab processes relied on manual data handling, making it slow to record, track, and retrieve lab records accurately.",
    solution: "Built a web application with an Angular 17 and PrimeNG front-end talking to REST APIs over a MySQL database, so lab data is entered, validated, and retrieved in one place.",
    features: [
      "Angular 17 front-end with PrimeNG component library",
      "REST API integration for lab data workflows",
      "MySQL schema design for structured lab records",
      "Form-driven data entry with validation"
    ],
    results: [
      "Delivered a working lab management tool to the client",
      "Replaced manual record handling with structured, searchable data"
    ],
    learnings: "This project made me comfortable in a second front-end ecosystem — Angular's module and dependency injection model — and reinforced how much a good component library like PrimeNG speeds up delivery.",
    color: "emerald"
  },
  {
    title: "First Flight Travels",
    context: "Personal project",
    description: "A multi-page travel booking website front-end built from scratch with plain HTML5 and CSS3 — landing, locations, login, and registration pages.",
    tags: ["HTML5", "CSS3"],
    problem: "I wanted to practice building a complete, multi-page website layout by hand — navigation, forms, and responsive pages — without leaning on a framework.",
    solution: "Built the full site as static pages: home, about, locations, contact, login, registration, and terms pages sharing a consistent stylesheet and navigation.",
    features: [
      "Multi-page structure: home, about, locations, contact, and terms pages",
      "Login and registration form pages",
      "Hand-written CSS3 styling shared across pages"
    ],
    results: [
      "Completed, publicly available static site on GitHub",
      "Solid foundation in semantic HTML and CSS before moving to React and Angular"
    ],
    learnings: "Building every page by hand gave me a real understanding of HTML structure and CSS layout — the fundamentals that frameworks abstract away.",
    github: "https://github.com/VivekParmar-18/FirstFlights",
    color: "blue"
  }
];
