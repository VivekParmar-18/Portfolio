import type { ContactInfo, SocialLink } from '../types/types';
import { personal } from './personalData';

export const contactInfo: ContactInfo = {
  email: personal.email,
  location: personal.location,
};

export const socialLinks: SocialLink[] = [
  { platform: 'LinkedIn', url: personal.linkedin, icon: 'linkedin' },
  { platform: 'GitHub', url: personal.github, icon: 'github' },
  { platform: 'Email', url: `mailto:${personal.email}`, icon: 'mail' },
];

export const contactMethods = [
  {
    title: 'Email',
    description: 'The fastest way to reach me',
    value: personal.email,
    action: `mailto:${personal.email}`,
    icon: 'mail',
    color: 'blue',
  },
  {
    title: 'LinkedIn',
    description: 'Connect with me professionally',
    value: 'linkedin.com/in/vivek1812',
    action: personal.linkedin,
    icon: 'linkedin',
    color: 'emerald',
  },
  {
    title: 'GitHub',
    description: 'See what I build',
    value: 'github.com/VivekParmar-18',
    action: personal.github,
    icon: 'github',
    color: 'purple',
  },
];
