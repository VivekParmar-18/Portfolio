import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import type { Technology } from '../../types/types';
import { skillsData } from '../../data/skillsData';
import { useResponsive, useReducedMotion } from '../../hooks/useResponsive';

// Lighter easing function
const lightEasing = 'ease-out';

const Skills = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });
    const { isMobile } = useResponsive();
    const prefersReducedMotion = useReducedMotion();

    return (
        <section
            ref={(node) => {
                ref(node);
                if (sectionRef.current !== node) {
                    (sectionRef as any).current = node;
                }
            }}
            className={`${isMobile ? 'py-12' : 'py-20'} bg-slate-900 relative overflow-hidden`}
            style={{ transform: 'translateZ(0)' }} // GPU acceleration
        >
            {/* Simple Background Elements */}
            {!prefersReducedMotion && (
                <div className="absolute inset-0">
                    <div 
                        className={`absolute ${isMobile ? 'top-10 left-4 w-16 h-16' : 'top-20 left-10 w-32 h-32'} bg-blue-500 rounded-full blur-3xl opacity-20`}
                        style={{ transform: 'translateZ(0)' }}
                    />
                    <div 
                        className={`absolute ${isMobile ? 'bottom-10 right-4 w-20 h-20' : 'bottom-20 right-10 w-40 h-40'} bg-emerald-500 rounded-full blur-3xl opacity-20`}
                        style={{ transform: 'translateZ(0)' }}
                    />
                </div>
            )}

            <div className={`container mx-auto ${isMobile ? 'px-4' : 'px-6'} relative z-10`}>
                {/* Section Header */}
                <div
                    className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, -15px, 0)',
                        transition: `opacity 0.4s ${lightEasing}, transform 0.4s ${lightEasing}`,
                        willChange: inView ? 'auto' : 'opacity, transform'
                    }}
                >
                    <h2 
                        className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-extrabold mb-4 tracking-tight`}
                        style={{
                            background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 50%, #a78bfa 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            animation: 'gradient-shift 4s ease infinite'
                        }}
                    >
                        Skills & Tech Stack
                    </h2>
                    <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-slate-400 max-w-2xl mx-auto font-light`}>
                        Java development expertise with modern technologies and frameworks
                    </p>
                </div>

                {/* Technology Grid - Clean Logo Display */}
                <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6'} max-w-6xl mx-auto`}>
                    {skillsData.map((technology: Technology, index: number) => (
                        <div
                            key={technology.name}
                            className="group cursor-pointer"
                            style={{
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translate3d(0, 0, 0)' : 'translate3d(0, 20px, 0)',
                                transition: `opacity 0.3s ${lightEasing} ${index * 0.03}s, transform 0.3s ${lightEasing} ${index * 0.03}s`, // Reduced stagger
                                willChange: inView ? 'auto' : 'opacity, transform'
                            }}
                        >
                            <div 
                                className={`bg-slate-800/50 backdrop-blur-sm rounded-xl ${isMobile ? 'p-4' : 'p-6'} border border-slate-700/50 hover:border-blue-400/50 text-center`}
                                style={{
                                    transition: `all 0.3s ${lightEasing}`,
                                    transform: 'translateZ(0)' // GPU acceleration
                                }}
                            >
                                {/* Technology Icon */}
                                <div
                                    className={`flex items-center justify-center ${isMobile ? 'w-12 h-12' : 'w-16 h-16'} mx-auto ${isMobile ? 'mb-3' : 'mb-4'}`}
                                >
                                    <img 
                                        src={technology.icon} 
                                        alt={`${technology.name} logo`}
                                        className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} object-contain group-hover:scale-110`}
                                        style={{ 
                                            transition: `transform 0.3s ${lightEasing}`,
                                            transform: 'translateZ(0)'
                                        }}
                                        loading="lazy"
                                    />
                                </div>

                                {/* Technology Name */}
                                <h4 
                                    className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold text-white group-hover:text-blue-400`}
                                    style={{ transition: `color 0.2s ${lightEasing}` }}
                                >
                                    {technology.name}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;