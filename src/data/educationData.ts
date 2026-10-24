export interface Education {
  degree: string;
  institution: string;
  university?: string;
  location: string;
  duration: string;
  color: 'blue' | 'emerald';
}

export interface Achievement {
  title: string;
  issuer: string;
  description: string;
}

export const educationData: Education[] = [
  {
    degree: "Bachelor of Engineering (B.E.) in Computer Engineering",
    institution: "Vishwakarma Government Engineering College, Ahmedabad",
    university: "Gujarat Technological University (GTU)",
    location: "Ahmedabad, Gujarat, India",
    duration: "2020 – 2024",
    color: "blue"
  }
];

export const certifications: string[] = [
  "Java Foundations Professional Certificate — JetBrains (2026)",
  "Model Context Protocol: Advanced Topics — Anthropic (2026)",
  "Claude Code in Action — Anthropic (2026)",
  "Building AI Agents: Advanced Techniques for Developers — LinkedIn Learning (2026)",
  "AWS Certified Developer — Associate (In Progress)"
];

export const achievements: Achievement[] = [
  {
    title: "Team Motivator Award",
    issuer: "Techforce Infotech Pvt. Ltd.",
    description: "Awarded for exceptional cross-functional collaboration, technical ownership, and delivery excellence across production releases."
  }
];

export const languages = ["English", "Hindi", "Gujarati"];
