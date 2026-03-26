// TypeScript type definitions

export interface DeveloperProfile {
  name: string;
  title: string;
  currentCompany: string;
  yearsOfExperience: number;
  location: string;
  profileImage: string;
  bio: string;
  skills: SkillCategory[];
  experience: WorkExperience[];
  contact: ContactInfo;
  socialLinks: SocialLink[];
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  proficiency: number; // 1-100
  icon: string;
}

export interface Technology {
  name: string;
  icon: string; // Logo/icon path, no proficiency levels
}

export interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured: boolean;
}
