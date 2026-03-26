import { ScrollReveal } from '../../index';

const JavaExpertise = () => {
  const javaSkills = [
    {
      category: "Core Java",
      skills: ["Java 8+", "OOP Principles", "Collections Framework", "Multithreading", "Exception Handling"],
      icon: "☕"
    },
    {
      category: "Spring Ecosystem",
      skills: ["Spring Boot", "Spring MVC", "Spring Security", "Spring Data JPA", "Spring Cloud"],
      icon: "🍃"
    },
    {
      category: "Database & ORM",
      skills: ["MySQL", "PostgreSQL", "Hibernate", "JPA", "Database Design"],
      icon: "🗄️"
    },
    {
      category: "Development Tools",
      skills: ["Maven", "Gradle", "IntelliJ IDEA", "Eclipse", "Git"],
      icon: "🛠️"
    }
  ];

  const projects = [
    {
      title: "Enterprise Web Application",
      description: "Built scalable Java Spring Boot application with microservices architecture",
      technologies: ["Java", "Spring Boot", "MySQL", "React"],
      impact: "Improved system performance by 40%"
    },
    {
      title: "REST API Development",
      description: "Developed robust RESTful APIs with comprehensive error handling and validation",
      technologies: ["Java", "Spring MVC", "JPA", "Swagger"],
      impact: "Reduced API response time by 30%"
    }
  ];

  return (
    <section id="java-expertise" className="py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Java Development Expertise
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Specialized Java developer with hands-on experience in enterprise application development, 
              Spring Boot microservices, and modern Java frameworks at Techforce InfoTech PVT LTD.
            </p>
          </div>
        </ScrollReveal>

        {/* Java Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {javaSkills.map((category, index) => (
            <ScrollReveal key={category.category} direction="up" delay={index * 0.1}>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-orange-500/50 transition-colors">
                <div className="text-3xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-slate-300 text-sm flex items-center">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Java Projects */}
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Java Development Projects</h3>
            <p className="text-slate-300">Real-world Java applications built with modern frameworks and best practices</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} direction={index % 2 === 0 ? "left" : "right"}>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700">
                <h4 className="text-xl font-bold text-white mb-3">{project.title}</h4>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-emerald-400 font-medium">
                  📈 {project.impact}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JavaExpertise;