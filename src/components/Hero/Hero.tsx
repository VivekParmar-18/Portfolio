import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { FiDownload, FiMail } from 'react-icons/fi';
import { 
  CTAButton,
  useResponsive,
  useReducedMotion,
  Typewriter
} from '../../index';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { isMobile, isTouchDevice } = useResponsive();
  const prefersReducedMotion = useReducedMotion();

  // Developer profile data
  const developerData = {
    name: "VIVEK PARMAR",
    title: "Full Stack Developer",
    currentCompany: "Techforce InfoTech PVT LTD",
    yearsOfExperience: 1,
    location: "Ahmedabad",
    profileImage: "/profile-photo.jpg", // Local profile photo
    bio: "Passionate Java developer specializing in Spring Boot and React.js with experience building scalable web applications and modern user interfaces."
  };

  // Preload profile image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = developerData.profileImage;
  }, [developerData.profileImage]);

  useEffect(() => {
    // Small delay to ensure DOM is ready and prevent initial jank
    const timer = setTimeout(() => {
      setIsReady(true);
      controls.start("visible");
    }, 100);
    
    return () => clearTimeout(timer);
  }, [controls]);

  // Button handlers
  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = '/Vivek_Parmar_Full_Stack_SDE.pdf';
      link.download = 'Vivek_Parmar_Full_Stack_SDE.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error downloading CV:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleContactClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smoother animation variants with GPU acceleration
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const textVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const imageVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      filter: 'blur(20px)'
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Generate random star particles with CSS variables for animation
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 2}s`
      }
    }));
  };

  const stars = generateStars(isMobile ? 30 : 50);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{ 
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.3s ease-out'
      }}
    >
      {/* Animated Star Particles Background - CSS Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-blue-400/60 animate-pulse"
            style={star.style}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-6 z-10 max-w-7xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        style={{ willChange: 'opacity' }}
      >
        <div className={`${isMobile ? 'flex flex-col space-y-8' : 'grid lg:grid-cols-2 gap-12'} items-center`}>
          {/* Text Content */}
          <motion.div
            className={`text-center ${isMobile ? '' : 'lg:text-left'} ${isMobile ? 'order-2' : ''}`}
            variants={textVariants}
            style={{ willChange: 'opacity, transform, filter' }}
          >
            {/* Greeting */}
            <motion.p
              className="text-blue-400 text-lg mb-4 font-medium"
              variants={textVariants}
            >
              Hello, I'm
            </motion.p>

            {/* Name with Typewriter - Single Line */}
            <motion.h1
              className={`${isMobile ? 'text-4xl' : 'text-5xl lg:text-7xl'} font-extrabold mb-6 leading-tight tracking-tight whitespace-nowrap`}
              variants={textVariants}
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #34d399 50%, #a78bfa 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 4s ease infinite'
              }}
            >
              {prefersReducedMotion ? (
                <span>{developerData.name}</span>
              ) : (
                <Typewriter text={developerData.name} delay={800} speed={80} />
              )}
            </motion.h1>

            {/* Static Title - Full Stack Developer */}
            <motion.h2
              className={`${isMobile ? 'text-xl' : 'text-2xl lg:text-3xl'} font-semibold mb-4`}
              variants={textVariants}
              style={{
                background: 'linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {developerData.title}
            </motion.h2>

            {/* Company and Experience */}
            <motion.p
              className={`${isMobile ? 'text-base' : 'text-lg'} text-slate-300 mb-8 font-medium`}
              variants={textVariants}
            >
              1 years at{' '}
              <span 
                className="font-bold text-emerald-400"
              >
                {developerData.currentCompany}
              </span>
            </motion.p>

            {/* Bio */}
            <motion.p
              className={`text-slate-400 ${isMobile ? 'text-base' : 'text-lg'} mb-8 max-w-2xl ${isMobile ? 'mx-auto' : ''} leading-relaxed font-light`}
              variants={textVariants}
            >
              {developerData.bio}
            </motion.p>

            {/* Interactive CTA Buttons */}
            <motion.div
              className={`flex ${isMobile ? 'flex-col' : 'flex-col sm:flex-row'} gap-4 ${isMobile ? 'items-center' : 'justify-center lg:justify-start'}`}
              variants={textVariants}
            >
              <CTAButton
                variant="primary"
                onClick={handleDownloadCV}
                loading={isDownloading}
                icon={<FiDownload />}
                className={`${isMobile ? 'w-full max-w-xs' : 'min-w-[160px]'}`}
              >
                Download CV
              </CTAButton>

              <CTAButton
                variant="secondary"
                onClick={handleContactClick}
                icon={<FiMail />}
                className={`${isMobile ? 'w-full max-w-xs' : 'min-w-[160px]'}`}
              >
                Get In Touch
              </CTAButton>
            </motion.div>
          </motion.div>

          {/* Professional Photo with Floating Elements */}
          <motion.div
            className={`relative flex justify-center ${isMobile ? 'order-1' : 'lg:justify-end'}`}
            variants={imageVariants}
            style={{ willChange: 'opacity, transform, filter' }}
          >
            {/* Floating Elements around Photo */}
            <div className="relative">
              {/* Main Photo */}
              <motion.div
                className={`relative z-10 ${isMobile ? 'w-64 h-64' : 'w-80 h-80'} rounded-full overflow-hidden border-4 border-blue-400/30 shadow-2xl`}
                whileHover={!isTouchDevice && !prefersReducedMotion ? { scale: 1.05 } : {}}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Placeholder while image loads */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse" />
                )}
                <img
                  src={developerData.profileImage}
                  alt={developerData.name}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </motion.div>

              {/* Floating Tech Icons */}
              {!isMobile && (
                <>
                  {/* Java Icon - Top Left */}
                  <motion.div 
                    className="absolute -top-4 -left-4 w-16 h-16 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg border border-slate-200/50 p-2 cursor-pointer"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 10,
                      boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)"
                    }}
                  >
                    <img 
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" 
                      alt="Java"
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </motion.div>

                  {/* Spring Boot Icon - Top Right */}
                  <motion.div 
                    className="absolute -top-8 -right-4 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg border border-slate-200/50 p-2 cursor-pointer"
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: -10,
                      boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)"
                    }}
                  >
                    <img 
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" 
                      alt="Spring Boot"
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </motion.div>

                  {/* React Icon - Bottom Left */}
                  <motion.div 
                    className="absolute -bottom-6 -left-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg border border-slate-200/50 p-2 cursor-pointer"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 8, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 15,
                      boxShadow: "0 10px 30px rgba(6, 182, 212, 0.3)"
                    }}
                  >
                    <img 
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
                      alt="React"
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </motion.div>

                  {/* MySQL Icon - Bottom Right */}
                  <motion.div 
                    className="absolute -bottom-4 -right-2 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg border border-slate-200/50 p-1.5 cursor-pointer"
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, -6, 0]
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: -12,
                      boxShadow: "0 10px 30px rgba(37, 99, 235, 0.3)"
                    }}
                  >
                    <img 
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" 
                      alt="MySQL"
                      className="w-full h-full object-contain"
                      loading="eager"
                    />
                  </motion.div>
                </>
              )}

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl scale-110 -z-10" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Desktop Scroll Indicator */}
      {!isMobile && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform duration-300"
          aria-label="Scroll to about section"
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-slate-400 rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="text-slate-400 text-sm mt-2 text-center">Scroll Down</p>
        </motion.button>
      )}

    </section>
  );
};

export default Hero;