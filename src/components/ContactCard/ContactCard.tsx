import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';

// GitHub Icon Component
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
  </svg>
);

// LinkedIn Icon Component
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// Lighter easing
const lightEasing = 'ease-out';

interface ContactCardProps {
  title: string;
  description: string;
  value: string;
  action: string;
  icon: string;
  color: 'blue' | 'emerald' | 'purple';
  index: number;
}

const iconMap = {
  mail: EnvelopeIcon,
  phone: PhoneIcon,
  location: MapPinIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon
};

const colorMap = {
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'text-blue-400',
    hover: 'hover:border-blue-400/40 hover:bg-blue-500/20',
    glow: 'hover:shadow-blue-500/20'
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'text-emerald-400',
    hover: 'hover:border-emerald-400/40 hover:bg-emerald-500/20',
    glow: 'hover:shadow-emerald-500/20'
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    icon: 'text-purple-400',
    hover: 'hover:border-purple-400/40 hover:bg-purple-500/20',
    glow: 'hover:shadow-purple-500/20'
  }
};

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  description,
  value,
  action,
  icon,
  color,
  index
}) => {
  const IconComponent = iconMap[icon as keyof typeof iconMap];
  const colors = colorMap[color];

  return (
    <div
      className="group"
      style={{
        opacity: 1,
        transition: `opacity 0.3s ${lightEasing} ${index * 0.08}s, transform 0.3s ${lightEasing} ${index * 0.08}s`, // Reduced stagger
        transform: 'translateZ(0)' // GPU acceleration
      }}
    >
      <a
        href={action}
        className={`
          block p-8 rounded-2xl border backdrop-blur-sm
          ${colors.bg} ${colors.border} ${colors.hover}
          hover:shadow-2xl ${colors.glow}
        `}
        style={{
          transition: `all 0.3s ${lightEasing}`,
          willChange: 'transform, box-shadow',
          transform: 'translateZ(0)' // GPU acceleration
        }}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div
            className={`
              p-4 rounded-full ${colors.bg} border ${colors.border}
              group-hover:shadow-lg group-hover:scale-110
            `}
            style={{ transition: `all 0.3s ${lightEasing}`, transform: 'translateZ(0)' }}
          >
            <IconComponent className={`w-8 h-8 ${colors.icon}`} />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 
              className="text-xl font-semibold text-white group-hover:text-white"
              style={{ transition: `color 0.2s ${lightEasing}` }}
            >
              {title}
            </h3>
            <p 
              className="text-slate-400 text-sm group-hover:text-slate-300"
              style={{ transition: `color 0.2s ${lightEasing}` }}
            >
              {description}
            </p>
            <p 
              className={`font-medium ${colors.icon} group-hover:brightness-110`}
              style={{ transition: `all 0.2s ${lightEasing}` }}
            >
              {value}
            </p>
          </div>

          {/* Hover indicator */}
          <div 
            className={`h-0.5 w-0 group-hover:w-full ${colors.icon.replace('text-', 'bg-')} rounded-full`}
            style={{ transition: `width 0.3s ${lightEasing}` }}
          />
        </div>
      </a>
    </div>
  );
};

export default ContactCard;