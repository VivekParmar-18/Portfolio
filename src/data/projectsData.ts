export interface Project {
    title: string;
    description: string;
    tags: string[];
    features: string[];
    color: 'blue' | 'purple' | 'emerald';
}

export const projectsData: Project[] = [
    {
        title: "Healthcare Management System",
        description: "Enterprise healthcare platform with IVR integration, order management, and invoice processing. Features EHR integration, Stripe payment gateway, order tracking, and comprehensive AWS cloud infrastructure.",
        tags: ["Spring Boot", "React", "EHR", "Stripe", "AWS Lambda", "S3", "API Gateway", "EC2", "RDS"],
        features: [
            "IVR system integration for patient communication",
            "Order tracking and invoice management",
            "EHR integration for medical records",
            "Stripe payment processing",
            "AWS serverless architecture with Lambda, S3, API Gateway, EC2, and RDS"
        ],
        color: "blue"
    },
    {
        title: "Lab Automation Tool",
        description: "Comprehensive lab management system with API integration and MySQL database. Built using Angular 17 with PrimeNG theme for modern UI components.",
        tags: ["Angular 17", "PrimeNG", "MySQL", "API Integration"],
        features: [
            "API integration for data management",
            "MySQL database design and optimization",
            "Modern UI with PrimeNG components"
        ],
        color: "purple"
    },
    {
        title: "First Flight Travels",
        description: "Travel agency booking website with comprehensive user authentication system. Features signup/login functionality for seamless travel package booking experience.",
        tags: ["Web Development", "Authentication", "Booking System"],
        features: [
            "User authentication system",
            "Travel package booking functionality",
            "Responsive design for all devices"
        ],
        color: "blue"
    }
];
