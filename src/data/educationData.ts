export interface Education {
    degree: string;
    institution: string;
    university?: string;
    location: string;
    duration: string;
    color: 'blue' | 'emerald';
}

export const educationData: Education[] = [
    {
        degree: "B.E. — Computer Engineering",
        institution: "Vishwakarma Government Engineering College, Ahmedabad",
        university: "Gujarat Technological University (GTU)",
        location: "Ahmedabad",
        duration: "2020 – 2024",
        color: "blue"
    }
];

export const certifications: string[] = [
    "Model Context Protocol: Advanced Topics — Anthropic (2026)",
    "Claude Code in Action — Anthropic (2026)",
    "Java Foundations Professional Certificate — JetBrains (2026)",
    "Building AI Agents: Advanced Techniques for Developers — LinkedIn Learning (2026)",
    "AWS Certified Developer – Associate (in progress)"
];
