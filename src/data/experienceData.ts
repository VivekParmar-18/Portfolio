import type { WorkExperience } from '../types/types';

export const experienceData: WorkExperience[] = [
  {
    company: "Techforce Infotech Pvt. Ltd.",
    position: "Software Developer (promoted from Associate Software Developer)",
    duration: "August 2024 - Present",
    description: "Building an enterprise US healthcare order and patient management platform supporting 100+ practices, agencies, manufacturers, and administrators.",
    achievements: [
      "Designed, developed, and maintained 40+ REST APIs (Java 17, Spring Boot) for order, invoice, payment, notification, and document workflows — handling 10,000+ orders and invoices",
      "Implemented JWT authentication and role-based access control securing healthcare workflows and patient data",
      "Integrated Stripe payments, ERP systems, email/SMS providers, tracking services, and webhooks",
      "Built custom LLM-powered completeness checks for EHR documents on the platform's document workflows",
      "Resolved production-critical issues across Dev, Stage, and Prod; maintained code quality via SonarQube",
      "Built async processing with schedulers and distributed job locking, plus real-time notifications via WebSocket",
      "Generated PDF and Excel documents with Apache PDFBox and Apache POI",
      "Deployed on AWS (EC2, S3, Lambda, RDS) with GitHub Actions and Jenkins CI/CD; supported the SVN to Git/GitHub migration"
    ],
    technologies: ["Java 17", "Spring Boot", "React", "TypeScript", "Redux Toolkit", "MySQL", "AWS", "GitHub Actions", "Jenkins", "SonarQube", "WebSocket", "LLMs"]
  },
  {
    company: "Rays TechServ",
    position: "Software Developer Intern",
    duration: "February 2024 - May 2024",
    description: "Contributed to frontend and backend feature development in an Agile team, following the full software development lifecycle.",
    achievements: [
      "Developed frontend and backend features for client-facing applications",
      "Debugged and resolved defects across the stack",
      "Worked in an Agile process with Git-based version control and code reviews"
    ],
    technologies: ["Java", "JavaScript", "HTML5", "CSS3", "Git"]
  }
];
