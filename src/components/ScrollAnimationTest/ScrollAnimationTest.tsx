import { AnimatedCounter, ScrollReveal, ParallaxElement } from '../../index';

const ScrollAnimationTest = () => {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <h1 className="text-white text-4xl mb-8">Scroll Animation Test</h1>
      
      {/* Test ScrollReveal */}
      <ScrollReveal direction="up" delay={0.2}>
        <div className="bg-blue-500 p-4 rounded mb-8">
          <h2 className="text-white">ScrollReveal Test - Up</h2>
        </div>
      </ScrollReveal>
      
      <ScrollReveal direction="left" delay={0.4}>
        <div className="bg-emerald-500 p-4 rounded mb-8">
          <h2 className="text-white">ScrollReveal Test - Left</h2>
        </div>
      </ScrollReveal>
      
      {/* Test AnimatedCounter */}
      <div className="bg-slate-800 p-8 rounded mb-8">
        <h2 className="text-white mb-4">Counter Test:</h2>
        <div className="text-4xl text-blue-400">
          <AnimatedCounter end={100} suffix="%" duration={3} />
        </div>
      </div>
      
      {/* Test ParallaxElement */}
      <div className="relative h-96 bg-slate-800 rounded overflow-hidden">
        <ParallaxElement speed={0.5} direction="up">
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full" />
        </ParallaxElement>
        
        <ParallaxElement speed={0.3} direction="down">
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-yellow-500 rounded" />
        </ParallaxElement>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white text-2xl">Parallax Test Area</h2>
        </div>
      </div>
    </div>
  );
};

export default ScrollAnimationTest;