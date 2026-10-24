import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiTerminal, FiFileText, FiMail, 
  FiLinkedin, FiGithub, FiArrowRight, FiX, FiCheck, FiCpu, FiDatabase 
} from 'react-icons/fi';
import { personal } from '../../data/personalData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Systems & Specs' | 'Terminal';
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
      setTerminalOutput(null);
    }
  }, [isOpen]);

  // Global keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open via parent
          const event = new CustomEvent('toggle-command-palette');
          window.dispatchEvent(event);
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const scrollTo = (id: string) => {
    onClose();
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = Math.max(0, el.getBoundingClientRect().top + currentScrollY - 76);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const commands: CommandItem[] = [
    // Navigation
    { id: 'nav-about', title: 'Go to About Vivek', category: 'Navigation', icon: <FiArrowRight aria-hidden="true" />, action: () => scrollTo('about') },
    { id: 'nav-sim', title: 'Open Kafka & Redis Simulator', category: 'Navigation', icon: <FiCpu aria-hidden="true" />, action: () => scrollTo('architecture-simulator'), badge: 'Interactive' },
    { id: 'nav-arch', title: 'Inspect Systems Architecture', category: 'Navigation', icon: <FiArrowRight aria-hidden="true" />, action: () => scrollTo('java-expertise') },
    { id: 'nav-query', title: 'Open Query Tuner (N+1 Solver)', category: 'Navigation', icon: <FiDatabase aria-hidden="true" />, action: () => scrollTo('query-tuner'), badge: 'Live Diff' },
    { id: 'nav-skills', title: 'View Technical Skills Matrix', category: 'Navigation', icon: <FiArrowRight aria-hidden="true" />, action: () => scrollTo('skills') },
    { id: 'nav-exp', title: 'View Work Experience', category: 'Navigation', icon: <FiArrowRight aria-hidden="true" />, action: () => scrollTo('experience') },
    { id: 'nav-projects', title: 'Browse Production Projects', category: 'Navigation', icon: <FiArrowRight aria-hidden="true" />, action: () => scrollTo('projects') },
    { id: 'nav-edu', title: 'View Education & Certifications', category: 'Navigation', icon: <FiArrowRight aria-hidden="true" />, action: () => scrollTo('education') },
    { id: 'nav-contact', title: 'Contact Vivek Parmar', category: 'Navigation', icon: <FiMail aria-hidden="true" />, action: () => scrollTo('contact') },

    // Actions
    {
      id: 'act-resume',
      title: 'Download Resume (Vivek_Parmar_SDE.pdf)',
      category: 'Actions',
      icon: <FiFileText aria-hidden="true" />,
      action: () => {
        const a = document.createElement('a');
        a.href = personal.resumeUrl;
        a.download = 'Vivek_Parmar_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        onClose();
      },
      badge: '178 KB PDF'
    },
    {
      id: 'act-email',
      title: `Copy Email (${personal.email})`,
      category: 'Actions',
      icon: copied ? <FiCheck className="text-console-ok" aria-hidden="true" /> : <FiMail aria-hidden="true" />,
      action: handleCopyEmail,
      badge: copied ? 'Copied!' : 'Click to copy'
    },
    {
      id: 'act-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'Actions',
      icon: <FiLinkedin aria-hidden="true" />,
      action: () => { window.open(personal.linkedin, '_blank'); onClose(); }
    },
    {
      id: 'act-github',
      title: 'Open GitHub Profile',
      category: 'Actions',
      icon: <FiGithub aria-hidden="true" />,
      action: () => { window.open(personal.github, '_blank'); onClose(); }
    },

    // Systems & Specs
    {
      id: 'spec-runtime',
      title: 'Specs: Java 21, Spring Boot 4, Kafka, AWS',
      category: 'Systems & Specs',
      icon: <FiCpu aria-hidden="true" />,
      action: () => scrollTo('java-expertise')
    },
    {
      id: 'spec-kabilhire',
      title: 'Optimization: -64% API requests & -60% network payload',
      category: 'Systems & Specs',
      icon: <FiDatabase aria-hidden="true" />,
      action: () => scrollTo('projects')
    },

    // Terminal Commands
    {
      id: 'term-stats',
      title: 'terminal: run system.getMetrics()',
      category: 'Terminal',
      icon: <FiTerminal aria-hidden="true" />,
      action: () => setTerminalOutput('Metrics: 40+ Production REST APIs | 99.9% Uptime | -64% Query Reductions | 2+ Years Exp')
    },
    {
      id: 'term-tech',
      title: 'terminal: run arch.getStack()',
      category: 'Terminal',
      icon: <FiTerminal aria-hidden="true" />,
      action: () => setTerminalOutput('Stack: Java 21/17, Spring Boot, Spring Security, Kafka, Redis, PostgreSQL, AWS (EC2/S3/Lambda/RDS), Docker')
    }
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 md:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-paper-2 border border-rule-2 rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[75vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-rule bg-paper-3/90">
              <FiSearch className="w-4 h-4 text-console-accent flex-shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search sections (e.g. simulator, resume, kafka, projects)..."
                className="w-full bg-transparent text-ink placeholder-ink-muted text-sm font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command palette"
                className="p-1 rounded text-ink-muted hover:text-ink transition-colors"
              >
                <FiX className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Terminal output banner if triggered */}
            {terminalOutput && (
              <div className="px-4 py-2.5 bg-paper-3 border-b border-rule text-xs font-mono text-console-ok flex items-center justify-between">
                <span className="truncate">{terminalOutput}</span>
                <button
                  type="button"
                  onClick={() => setTerminalOutput(null)}
                  className="text-ink-muted hover:text-ink text-[11px] underline ml-2 flex-shrink-0"
                >
                  dismiss
                </button>
              </div>
            )}

            {/* Command List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-ink-muted text-xs font-mono">
                  No matching commands found for &quot;{query}&quot;. Try typing &quot;resume&quot; or &quot;simulator&quot;.
                </div>
              ) : (
                filteredCommands.map((cmd, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-xs transition-colors font-body ${
                        isSelected
                          ? 'bg-paper-3 text-ink border border-rule-2'
                          : 'text-ink-muted hover:text-ink hover:bg-paper-3/50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`flex-shrink-0 ${isSelected ? 'text-console-accent' : 'text-ink-muted'}`}>
                          {cmd.icon}
                        </span>
                        <span className="truncate font-medium">{cmd.title}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        {cmd.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-paper border border-rule text-console-cool">
                            {cmd.badge}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-ink-muted/60">
                          {cmd.category}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-rule bg-paper-3/50 text-[11px] font-mono text-ink-muted">
              <div className="flex items-center gap-3">
                <span><kbd className="px-1.5 py-0.5 rounded bg-paper border border-rule text-ink">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-paper border border-rule text-ink">↓</kbd> navigate</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-paper border border-rule text-ink">↵</kbd> select</span>
                <span><kbd className="px-1.5 py-0.5 rounded bg-paper border border-rule text-ink">esc</kbd> close</span>
              </div>
              <span className="text-console-accent">Vivek Parmar · Systems Deck</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
