import { ScrollReveal } from '../../index';
import { experienceData } from '../../data/experienceData';

const Experience = () => {
  return (
    <section 
      id="experience" 
      className="min-h-screen flex items-center justify-center bg-slate-800 relative py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal direction="up" delay={0.2}>
          <h2 
            className="text-5xl md:text-6xl font-extrabold text-center mb-16 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #34d399 0%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Experience
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <ScrollReveal key={index} direction={index % 2 === 0 ? "left" : "right"} delay={0.4 + (index * 0.2)}>
              <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-8 border border-slate-600/30">
                <h3 className="text-2xl font-semibold text-white mb-2">{exp.position}</h3>
                <p className={`${index % 2 === 0 ? 'text-blue-400' : 'text-emerald-400'} mb-4`}>
                  {exp.company} • {exp.duration}
                </p>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {exp.description}
                </p>
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Key Achievements:</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>• {achievement}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className={`px-3 py-1 ${index % 2 === 0 ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'} rounded-full text-sm`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
