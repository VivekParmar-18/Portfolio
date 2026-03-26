import { useEffect } from 'react';
import { 
  Navigation, 
  PageTransition, 
  Hero, 
  Skills, 
  ScrollReveal, 
  Statistics, 
  BackgroundElements,
  useSEO
} from '../index';

const Home = () => {
  // SEO optimization for home page
  const { updateSEO } = useSEO();

  useEffect(() => {
    updateSEO({
      title: 'Vivek Parmar - Java Developer & Full Stack Engineer',
      description: 'Welcome to my portfolio. I\'m a passionate Java developer with experience building scalable web applications using Spring Boot and React.js at Techforce InfoTech PVT LTD.',
      keywords: ['java developer', 'spring boot developer', 'react developer', 'portfolio', 'techforce infotech', 'web development']
    });
  }, [updateSEO]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const event = new CustomEvent('sectionChange', {
            detail: { sectionId: entry.target.id }
          });
          window.dispatchEvent(event);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-900 relative">
        {/* Background Parallax Elements */}
        <BackgroundElements />

        <Navigation />

        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center bg-slate-800 relative">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-4xl font-bold text-white mb-6">About Me</h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-lg text-slate-300 mb-12 leading-relaxed">
                I'm a passionate Java developer with experience building modern web applications.
                Currently working as an Associate Software Developer at Techforce InfoTech PVT LTD, I specialize in Spring Boot backend
                development and React.js frontend solutions.
              </p>
            </ScrollReveal>

            {/* Statistics Section */}
            <Statistics />
          </div>
        </section>

        {/* Skills Section */}
        <Skills />

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center justify-center bg-slate-800 relative">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <ScrollReveal direction="up" delay={0.2}>
              <h2 className="text-4xl font-bold text-white mb-6">Experience</h2>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.4}>
              <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50 mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">Associate Software Developer</h3>
                <p className="text-blue-400 mb-4">Techforce InfoTech PVT LTD • August 2024 - Present</p>
                <p className="text-slate-300 leading-relaxed">
                  Developing and maintaining fullstack applications using Java Spring Boot and React.js.
                  Collaborating with cross-functional teams to deliver high-quality software solutions.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.6}>
              <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50">
                <h3 className="text-2xl font-semibold text-white mb-2">Software Development Intern</h3>
                <p className="text-emerald-400 mb-4">Previous Company • 2022 - 2023</p>
                <p className="text-slate-300 leading-relaxed">
                  Gained hands-on experience in web development, working on various projects and learning
                  industry best practices in software development lifecycle.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center bg-slate-900 relative">
          <div className="text-center">
            <ScrollReveal direction="fade" delay={0.2}>
              <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <p className="text-lg text-slate-300 mb-8">
                Ready to work together? Let's create something amazing!
              </p>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;