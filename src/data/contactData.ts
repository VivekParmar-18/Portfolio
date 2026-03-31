import type { ContactInfo, SocialLink } from '../types/types';
import { personal } from './personalData';

export const contactInfo: ContactInfo = {
  email: personal.email,
  phone: personal.phone,
  location: personal.location,
};

export const socialLinks: SocialLink[] = [
  { platform: 'LinkedIn', url: personal.linkedin, icon: 'linkedin' },
  { platform: 'GitHub', url: personal.github, icon: 'github' },
  { platform: 'Twitter', url: personal.twitter, icon: 'twitter' },
  { platform: 'Email', url: `mailto:${personal.email}`, icon: 'mail' },
];

export const contactMethods = [
  {
    title: 'Email Me',
    description: 'Get in touch via email',
    value: personal.email,
    action: `mailto:${personal.email}`,
    icon: 'mail',
    color: 'blue',
  },
  {
    title: 'Call Me',
    description: "Let's have a conversation",
    value: personal.phone,
    action: `tel:${personal.phone}`,
    icon: 'phone',
    color: 'emerald',
  },
  {
    title: 'Location',
    description: 'Based in Ahmedabad, India',
    value: personal.location,
    action: '#',
    icon: 'location',
    color: 'purple',
  },
];