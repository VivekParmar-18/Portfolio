import { useEffect, useState } from 'react';
import {
  Navigation,
  Hero,
  Skills,
  BackgroundElements,
  ContactCard,
  ContactForm,
  ScrollToTop,
} from '../components';
import About from '../components/About/About';
import SystemsSimulator from '../components/SystemsSimulator/SystemsSimulator';
import JavaExpertise from '../components/JavaExpertise/JavaExpertise';
import QueryTuner from '../components/QueryTuner/QueryTuner';
import Experience from '../components/Experience/Experience';
import Projects from '../components/Projects/Projects';
import Education from '../components/Education/Education';
import CommandPalette from '../components/CommandPalette/CommandPalette';
import { contactMethods } from '../data/contactData';
import { personal } from '../data/personalData';
import { useSEO } from '../hooks/useSEO';

const SinglePagePortfolio = () => {
  const { updateSEO } = useSEO();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    updateSEO({
      title: 'Vivek Parmar | Java Backend Engineer | Software Engineer L1',
      description: personal.bio,
    });
  }, [updateSEO]);

  useEffect(() => {
    const handleToggle = () => setIsPaletteOpen((prev) => !prev);
    window.addEventListener('toggle-command-palette', handleToggle);
    return () => window.removeEventListener('toggle-command-palette', handleToggle);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink relative" style={{ overflowX: 'clip' }}>
      <BackgroundElements />
      <CommandPalette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
      <Navigation onOpenPalette={() => setIsPaletteOpen(true)} />

      {/* Hero */}
      <Hero />

      {/* About & Narrative */}
      <About />

      {/* Interactive Systems Simulator (Kafka & Redis Event Stream) */}
      <SystemsSimulator />

      {/* Java Expertise & Systems Architecture */}
      <JavaExpertise />

      {/* Interactive Query Tuner & N+1 Solver */}
      <QueryTuner />

      {/* Skills & Domains */}
      <Skills />

      {/* Featured Projects & Catalog */}
      <Projects />

      {/* Work Experience & Timeline */}
      <Experience />

      {/* Credentials, Education & Honors */}
      <Education />

      {/* Contact & Footer */}
      <footer id="contact" className="pt-12 md:pt-16 pb-20 md:pb-24 bg-paper-3 border-t border-rule relative overflow-hidden">
        <div className="container relative z-10">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-medium text-ink tracking-tight mb-4">
              Get in touch
            </h2>
            <p className="text-ink-muted text-base leading-relaxed">
              Hiring for a backend or full-stack engineering role? Reach out via email or LinkedIn; I respond within 24 hours.
            </p>
          </div>

          {/* Contact method cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14" aria-label="Contact methods">
            {contactMethods.map((method, index) => (
              <ContactCard
                key={method.title}
                title={method.title}
                description={method.description}
                value={method.value || ''}
                action={method.action}
                icon={method.icon}
                color={method.color as 'blue' | 'emerald' | 'purple'}
                index={index}
              />
            ))}
          </div>

          {/* Form + info */}
          <div className="grid md:grid-cols-12 gap-8 items-start mb-16">
            <div className="md:col-span-5 space-y-4">
              <h3 className="text-xl font-medium text-ink font-display">
                Send a message
              </h3>
              <p className="text-ink-muted text-sm leading-relaxed font-body">
                Fill out the form with role or project details and I will get back to you promptly.
              </p>
              <div className="p-4 rounded bg-paper-2 border border-rule space-y-2 text-xs font-mono text-ink-muted">
                <div>
                  <span className="text-console-cool">location:</span> {personal.location}
                </div>
                <div>
                  <span className="text-console-accent">workplace:</span> on-site, hybrid, or remote
                </div>
                <div>
                  <span className="text-console-ok">status:</span> open to opportunities
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <ContactForm />
            </div>
          </div>

          {/* Masthead Footer */}
          <div className="pt-10 border-t border-rule" role="contentinfo">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
              <div className="text-center md:text-left">
                <p className="text-ink font-medium text-sm font-display">{personal.name}</p>
                <p className="text-ink-muted text-xs font-mono mt-0.5">
                  {personal.role} · {personal.company}
                </p>
              </div>

              <nav aria-label="Footer navigation">
                <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pl-0 list-none m-0 text-xs font-body text-ink-muted">
                  <li>
                    <a href="#about" className="hover:text-ink transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#architecture-simulator" className="hover:text-ink transition-colors text-console-accent">
                      Simulator
                    </a>
                  </li>
                  <li>
                    <a href="#java-expertise" className="hover:text-ink transition-colors">
                      Architecture
                    </a>
                  </li>
                  <li>
                    <a href="#query-tuner" className="hover:text-ink transition-colors text-console-ok">
                      Query Tuner
                    </a>
                  </li>
                  <li>
                    <a href="#skills" className="hover:text-ink transition-colors">
                      Skills
                    </a>
                  </li>
                  <li>
                    <a href="#experience" className="hover:text-ink transition-colors">
                      Experience
                    </a>
                  </li>
                  <li>
                    <a href="#projects" className="hover:text-ink transition-colors">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                      Resume
                    </a>
                  </li>
                  <li>
                    <a href={personal.github} target="_blank" rel="noopener noreferrer me" className="hover:text-ink transition-colors">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href={personal.linkedin} target="_blank" rel="noopener noreferrer me" className="hover:text-ink transition-colors">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Colophon */}
            <p className="text-center text-ink-muted/60 text-xs font-mono">
              &copy; {new Date().getFullYear()} {personal.name} · Java Backend Engineer · Ahmedabad, India
            </p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
};

export default SinglePagePortfolio;