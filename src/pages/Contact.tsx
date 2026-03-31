import { useEffect } from 'react';
import { PageTransition, Navigation, ContactCard, SocialLinks, ContactForm, ScrollReveal } from '../components';
import { contactMethods, socialLinks } from '../data/contactData';
import { useSEO } from '../hooks/useSEO';
import { personal } from '../data/personalData';

const Contact = () => {
  const { updateSEO } = useSEO();

  useEffect(() => {
    updateSEO({
      title: `Contact ${personal.name} — Let's Work Together`,
      description: `Get in touch with ${personal.name} for collaboration, job inquiries, or to just say hi.`,
      keywords: ['contact', 'hire fullstack developer', 'collaboration', personal.name],
    });
  }, [updateSEO]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-950" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <Navigation />

        {/* Header */}
        <section className="pt-36 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%)' }} />
          <div className="max-w-4xl mx-auto px-6 text-center">
            <ScrollReveal direction="up" delay={0.0}>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full" style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontFamily: "'Fira Code', monospace" }}>
                Let's Talk
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
                Get In Touch
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-xl mx-auto">
                Have a project in mind, an opportunity to share, or just want to say hi? I'd love to hear from you.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-6">

            {/* Contact method cards */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                {contactMethods.map((method, index) => (
                  <ContactCard
                    key={method.title}
                    title={method.title}
                    description={method.description}
                    value={method.value}
                    action={method.action}
                    icon={method.icon}
                    color={method.color as 'blue' | 'emerald' | 'purple'}
                    index={index}
                  />
                ))}
              </div>
            </ScrollReveal>

            {/* Form section */}
            <div className="grid md:grid-cols-5 gap-12 items-start">
              <ScrollReveal direction="left" delay={0.15}>
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>Send Me a Message</h2>
                  <p className="text-slate-400 leading-relaxed mb-8">
                    Fill out the form and I'll get back to you within 24 hours. I'm always open to discussing new projects and creative ideas.
                  </p>

                  <div className="space-y-4">
                    {[
                      { icon: '⚡', title: 'Fast Response', desc: 'Usually within 24 hours' },
                      { icon: '🤝', title: 'Open to Collaboration', desc: 'Projects of any size' },
                      { icon: '🌍', title: 'Remote Friendly', desc: 'Working across time zones' },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <div className="text-white font-semibold text-sm">{item.title}</div>
                          <div className="text-slate-500 text-xs mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="md:col-span-3">
                  <ContactForm />
                </div>
              </ScrollReveal>
            </div>

            {/* Social links */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="mt-24 text-center">
                <h2 className="text-2xl font-bold text-white mb-3" style={{ letterSpacing: '-0.01em' }}>Connect With Me</h2>
                <p className="text-slate-500 mb-8">Find me on the internet</p>
                <SocialLinks socialLinks={socialLinks} />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;