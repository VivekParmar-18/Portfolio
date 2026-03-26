import { ScrollReveal } from '../../index';
import { projectsData } from '../../data/projectsData';

const Projects = () => {
  return (
    <section 
      id="projects" 
      className="min-h-screen flex items-center justify-center bg-slate-900 relative py-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal direction="up" delay={0.2}>
          <h2 
            className="text-5xl md:text-6xl font-extrabold text-center mb-16 tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Projects
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ScrollReveal 
              key={index} 
              direction={index === 0 ? "left" : index === 1 ? "up" : "right"} 
              delay={0.4 + (index * 0.2)}
            >
              <div className={`bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/30 hover:border-${project.color}-500/50 transition-all duration-300`}>
                <h3 className="text-2xl font-semibold text-white mb-4">{project.title}</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className={`px-3 py-1 bg-${project.color === 'blue' ? 'emerald' : project.color}-500/20 text-${project.color === 'blue' ? 'emerald' : project.color}-400 rounded-full text-sm`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ul className="text-slate-300 text-sm space-y-1">
                  {project.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
