import { ScrollReveal } from '../../index';
import { educationData } from '../../data/educationData';

const Education = () => {
  return (
    <ScrollReveal direction="up" delay={0.4}>
      <div className="mb-16">
        <h3 
          className="text-3xl font-bold text-center mb-12"
          style={{
            background: 'linear-gradient(90deg, #a78bfa 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Education
        </h3>
        
        {/* Education Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
          
          {/* Education Items */}
          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <div key={index} className="flex items-center">
                {/* Left Side (for even index) or Spacer (for odd index) */}
                <div className={`w-1/2 pr-8 ${index % 2 === 0 ? 'text-right' : ''}`}>
                  {index % 2 === 0 && (
                    <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 hover:scale-105 transition-transform duration-200">
                      <h4 className="text-xl font-semibold text-white mb-2">{edu.degree}</h4>
                      <p className={`text-${edu.color}-400 mb-2`}>{edu.institution}</p>
                      {edu.university && <p className="text-slate-400 text-sm mb-1">{edu.university}</p>}
                      <p className="text-slate-300">{edu.location} • {edu.year}</p>
                    </div>
                  )}
                </div>
                
                {/* Timeline Dot */}
                <div className={`relative z-10 w-4 h-4 bg-${edu.color}-500 rounded-full border-4 border-slate-800`}></div>
                
                {/* Right Side (for odd index) or Spacer (for even index) */}
                <div className="w-1/2 pl-8">
                  {index % 2 !== 0 && (
                    <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/30 hover:scale-105 transition-transform duration-200">
                      <h4 className="text-xl font-semibold text-white mb-2">{edu.degree}</h4>
                      <p className={`text-${edu.color}-400 mb-2`}>{edu.institution}</p>
                      {edu.university && <p className="text-slate-400 text-sm mb-1">{edu.university}</p>}
                      <p className="text-slate-300">{edu.location} • {edu.year}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default Education;
