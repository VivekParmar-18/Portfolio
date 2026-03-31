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
          {/* Timeline Line (Desktop only) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full hidden md:block"></div>
          
          {/* Timeline Line (Mobile only) */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full md:hidden"></div>
          
          {/* Education Items */}
          <div className="space-y-8 md:space-y-12">
            {educationData.map((edu, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start md:items-center relative">
                {/* Desktop Left Side */}
                <div className={`hidden md:block w-1/2 pr-12 ${index % 2 === 0 ? 'text-right' : 'invisible'}`}>
                  {index % 2 === 0 && (
                    <div className="bg-slate-700/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/20 hover:border-slate-500/30 transition-all duration-300">
                      <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                      <p className="text-blue-400 font-medium mb-1">{edu.institution}</p>
                      {edu.university && <p className="text-slate-400 text-sm mb-2">{edu.university}</p>}
                      <p className="text-slate-500 text-sm">{edu.location} • {edu.year}</p>
                    </div>
                  )}
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-[14px] md:relative md:left-auto z-10 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                
                {/* Right Side / Mobile View */}
                <div className="w-full md:w-1/2 pl-10 md:pl-12">
                  <div className={`md:${index % 2 !== 0 ? '' : 'invisible'} bg-slate-700/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/20 hover:border-slate-500/30 transition-all duration-300`}>
                    <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                    <p className="text-blue-400 font-medium mb-1">{edu.institution}</p>
                    {edu.university && <p className="text-slate-400 text-sm mb-2">{edu.university}</p>}
                    <p className="text-slate-500 text-sm">{edu.location} • {edu.year}</p>
                  </div>
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
