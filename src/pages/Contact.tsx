import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { 
  PageTransition, 
  Navigation, 
  ContactCard, 
  SocialLinks, 
  ContactForm,
  useSEO,
  contactMethods
} from '../index';
import { socialLinks } from '../data/contactData';

const Contact = () => {
  // SEO optimization for contact page
  const { updateSEO } = useSEO();
  
  useEffect(() => {
    updateSEO({
      title: 'Contact Vivek Parmar - Let\'s Work Together',
      description: 'Get in touch with me for collaboration opportunities, job inquiries, or just to connect. I\'m always open to discussing new projects and opportunities.',
      keywords: ['contact vivek parmar', 'hire java developer', 'java react developer contact', 'collaboration opportunities', 'software developer hire']
    });
  }, [updateSEO]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-900">
        <Navigation />
        
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="max-w-6xl mx-auto px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Ready to work together? Let's create something amazing. I'm always excited to discuss new opportunities and innovative projects.
              </p>
            </motion.div>

            {/* Contact Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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

            {/* Contact Form */}
            <div className="mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-3xl font-semibold text-white text-center mb-12"
              >
                Send Me a Message
              </motion.h2>
              <ContactForm />
            </div>

            {/* Social Links */}
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-2xl font-semibold text-white mb-8"
              >
                Connect With Me
              </motion.h2>
              <SocialLinks socialLinks={socialLinks} />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;