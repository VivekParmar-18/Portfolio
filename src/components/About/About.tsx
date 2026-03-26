import { ScrollReveal } from '../../index';
import Education from '../Education/Education';

const About = () => {
  return (
    <section 
      id="about" 
      className="min-h-screen flex items-center justify-center bg-slate-800 relative py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="text-center mb-16">
            <h2 
              className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              About Me
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Associate Software Developer at Techforce InfoTech PVT LTD with expertise in Java, Spring Boot, and React development.
            </p>
          </div>
        </ScrollReveal>

        {/* Career Objective and Professional Info */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <h3 
                className="text-3xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(90deg, #60a5fa 0%, #34d399 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Career Objective
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Passionate Java developer seeking to leverage expertise in Spring Boot and React.js 
                  to build innovative, scalable software solutions. Currently working as an Associate 
                  Software Developer at Techforce InfoTech PVT LTD since August 2024.
                </p>
                <p>
                  My goal is to contribute to cutting-edge projects that solve real-world problems 
                  while continuously expanding my technical skills in Java ecosystem, cloud technologies, 
                  and modern web development frameworks.
                </p>
                <p>
                  I thrive in collaborative environments and am committed to writing clean, 
                  maintainable code that follows industry best practices and delivers exceptional user experiences.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-slate-700/50 hover:scale-105 transition-transform duration-200">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full overflow-hidden border-2 border-blue-400/30 flex items-center justify-center">
                    <img 
                      src="/avatar.png" 
                      alt="Vivek Parmar - Java Developer" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Associate Software Developer
                  </h4>
                  <p className="text-blue-400 mb-4">Techforce InfoTech PVT LTD</p>
                  <div className="flex justify-center flex-wrap gap-3 text-sm text-slate-300">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      Ahmedabad
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                      </svg>
                      Java Developer
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                      </svg>
                      Full Stack
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Education Timeline */}
        <Education />

        {/* Clean Professional Summary */}
        <ScrollReveal direction="up" delay={0.6}>
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h3 className="text-2xl font-bold text-white mb-4">Professional Summary</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">1.5 Years +</div>
                  <p className="text-slate-300">Current Role Experience</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400 mb-2">Java & React</div>
                  <p className="text-slate-300">Core Technologies</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">Full Stack</div>
                  <p className="text-slate-300">Development Focus</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default About;
