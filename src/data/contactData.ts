import type { ContactInfo, SocialLink } from '../types/types';

export const contactInfo: ContactInfo = {
  email: 'vivek18parmar@gmail.com',
  phone: '+918401278136',
  location: 'Ahmedabad'
};

export const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/vivekparmar1812',
    icon: 'linkedin'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/VivekParmar-18',
    icon: 'github'
  },
  {
    platform: 'Email',
    url: 'mailto:vivek18parmar@gmail.com',
    icon: 'mail'
  }
];

export const contactMethods = [
  {
    title: 'Email Me',
    description: 'Get in touch via email',
    value: contactInfo.email,
    action: `mailto:${contactInfo.email}`,
    icon: 'mail',
    color: 'blue'
  },
  {
    title: 'LinkedIn',
    description: 'Connect professionally',
    value: 'vivekparmar1812',
    action: 'https://linkedin.com/in/vivekparmar1812',
    icon: 'linkedin',
    color: 'emerald'
  },
  {
    title: 'GitHub',
    description: 'Check out my code',
    value: 'VivekParmar-18',
    action: 'https://github.com/VivekParmar-18',
    icon: 'github',
    color: 'purple'
  }
];