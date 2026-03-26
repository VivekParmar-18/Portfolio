const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated gradient orbs with softer colors and floating animation */}
      <div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.05) 0%, transparent 70%)',
          animation: 'float 15s ease-in-out infinite',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
      <div 
        className="absolute top-40 right-20 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.05) 0%, transparent 70%)',
          animation: 'float 18s ease-in-out infinite 3s',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
      <div 
        className="absolute bottom-40 right-10 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.05) 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite 6s',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
      
      {/* Floating geometric shapes - GPU accelerated */}
      <div 
        className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-blue-500/10 rotate-45"
        style={{
          animation: 'float 12s ease-in-out infinite',
          willChange: 'transform',
          transform: 'translateZ(0) rotate(45deg)'
        }}
      />
      <div 
        className="absolute top-2/3 right-1/3 w-12 h-12 border-2 border-purple-500/10 rotate-12"
        style={{
          animation: 'float 14s ease-in-out infinite 2s',
          willChange: 'transform',
          transform: 'translateZ(0) rotate(12deg)'
        }}
      />
      <div 
        className="absolute bottom-1/3 left-1/2 w-20 h-20 border-2 border-emerald-500/10 -rotate-12"
        style={{
          animation: 'float 16s ease-in-out infinite 4s',
          willChange: 'transform',
          transform: 'translateZ(0) rotate(-12deg)'
        }}
      />
      <div 
        className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full border-2 border-cyan-500/10"
        style={{
          animation: 'float 10s ease-in-out infinite 1s',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
      <div 
        className="absolute bottom-1/4 left-1/3 w-10 h-10 rounded-full border-2 border-pink-500/10"
        style={{
          animation: 'float 13s ease-in-out infinite 3s',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      />
    </div>
  );
};

export default BackgroundElements;