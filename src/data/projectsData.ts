export interface Project {
    title: string;
    description: string;
    tags: string[];
    features: string[];
    color: 'blue' | 'purple' | 'emerald';
}

export const projectsData: Project[] = [
    {
        title: "Enterprise Healthcare Hub",
        description: "A mission-critical healthcare platform architected for HIPAA compliance, featuring IVR automation, scalable order lifecycles, and automated financial processing.",
        tags: ["Spring Boot", "React", "AWS Cloud", "Serverless", "Stripe Engine"],
        features: [
            "Architected IVR communication systems for automated patient engagement",
            "Engineered complex order tracking with real-time state management",
            "Integrated EHR protocols for secure medical record orchestration",
            "Optimized PCI-compliant payment flows via Stripe Global API",
            "Deployed high-availability infrastructure using AWS Lambda & EC2"
        ],
        color: "blue"
    },
    {
        title: "Clinical Lab Automation",
        description: "An advanced lab management ecosystem focused on data integrity and high-throughput API communication, built with modern architectural patterns.",
        tags: ["Angular 17", "PrimeNG", "MySQL Forge", "RESTful Core"],
        features: [
            "Developed high-performance API layers for real-time lab data syncing",
            "Designed normalized MySQL schemas for complex research data sets",
            "Engineered a modular frontend using Angular 17's reactive state architecture",
            "Implemented custom PrimeNG components for high-density data visualization"
        ],
        color: "purple"
    },
    {
        title: "Next-Gen Travel Engine",
        description: "A high-performance travel booking platform featuring advanced security protocols and a seamless, journey-focused user experience.",
        tags: ["Full Stack", "Auth Protocol", "System Design"],
        features: [
            "Implemented secure multi-factor authentication systems",
            "Designed a scalable booking engine for high-volume seasonal traffic",
            "Engineered a responsive, mobile-first interface for cross-platform booking",
            "Optimized server response times for real-time inventory updates"
        ],
        color: "emerald"
    }
];
