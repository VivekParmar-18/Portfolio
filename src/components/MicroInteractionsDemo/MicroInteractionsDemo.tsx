import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnhancedButton } from '../EnhancedButton/EnhancedButton';
import { MagneticHover } from '../MagneticHover/MagneticHover';
import { RippleEffect } from '../RippleEffect/RippleEffect';
import { SectionLoader } from '../SectionLoader/SectionLoader';
import { 
  AnimatedArrow, 
  AnimatedCode, 
  AnimatedHeart, 
  AnimatedStar,
  FloatingElements 
} from '../AnimatedIcons/AnimatedIcons';
import { useSoundEffects } from '../../utils/soundEffects';

export const MicroInteractionsDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [soundsEnabled, setSoundsEnabled] = useState(false);
  const [heartFilled, setHeartFilled] = useState(false);
  const [starFilled, setStarFilled] = useState(false);
  const { setEnabled } = useSoundEffects();

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const toggleSounds = () => {
    const newState = !soundsEnabled;
    setSoundsEnabled(newState);
    setEnabled(newState);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <FloatingElements />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Advanced Micro-Interactions Demo
          </h1>
          <p className="text-gray-300 text-lg">
            Experience the enhanced user interface elements with smooth animations and effects
          </p>
        </motion.div>

        {/* Sound Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
        >
          <h3 className="text-white font-semibold mb-2">Sound Effects</h3>
          <EnhancedButton
            onClick={toggleSounds}
            variant={soundsEnabled ? 'primary' : 'secondary'}
            size="sm"
          >
            {soundsEnabled ? 'Disable Sounds' : 'Enable Sounds'}
          </EnhancedButton>
        </motion.div>

        {/* Enhanced Buttons Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Enhanced Buttons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Primary Buttons</h3>
              <EnhancedButton
                variant="primary"
                enableSounds={soundsEnabled}
                icon={<AnimatedArrow size={16} />}
                iconPosition="right"
              >
                Get Started
              </EnhancedButton>
              <EnhancedButton
                variant="primary"
                size="lg"
                enableSounds={soundsEnabled}
                onClick={handleLoadingDemo}
              >
                Show Loading
              </EnhancedButton>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Secondary Buttons</h3>
              <EnhancedButton
                variant="secondary"
                enableSounds={soundsEnabled}
                icon={<AnimatedCode size={16} />}
              >
                View Code
              </EnhancedButton>
              <EnhancedButton
                variant="secondary"
                size="sm"
                enableSounds={soundsEnabled}
              >
                Learn More
              </EnhancedButton>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Ghost Buttons</h3>
              <EnhancedButton
                variant="ghost"
                enableSounds={soundsEnabled}
              >
                Contact Us
              </EnhancedButton>
              <EnhancedButton
                variant="ghost"
                disabled
                enableSounds={soundsEnabled}
              >
                Disabled
              </EnhancedButton>
            </div>
          </div>
        </motion.section>

        {/* Magnetic Hover Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Magnetic Hover Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <MagneticHover key={item} strength={0.4}>
                <div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl border border-white/10 text-center">
                  <h3 className="text-white font-semibold mb-2">Magnetic Card {item}</h3>
                  <p className="text-gray-300 text-sm">
                    Hover over me to see the magnetic effect in action
                  </p>
                </div>
              </MagneticHover>
            ))}
          </div>
        </motion.section>

        {/* Animated Icons Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Animated Icons</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="mb-2">
                <AnimatedArrow size={32} color="#3B82F6" />
              </div>
              <p className="text-gray-300 text-sm">Animated Arrow</p>
            </div>
            
            <div className="text-center">
              <div className="mb-2">
                <AnimatedCode size={32} color="#10B981" />
              </div>
              <p className="text-gray-300 text-sm">Code Icon</p>
            </div>
            
            <div className="text-center cursor-pointer" onClick={() => setHeartFilled(!heartFilled)}>
              <div className="mb-2">
                <AnimatedHeart size={32} color="#EF4444" filled={heartFilled} />
              </div>
              <p className="text-gray-300 text-sm">Click Heart</p>
            </div>
            
            <div className="text-center cursor-pointer" onClick={() => setStarFilled(!starFilled)}>
              <div className="mb-2">
                <AnimatedStar size={32} color="#F59E0B" filled={starFilled} />
              </div>
              <p className="text-gray-300 text-sm">Click Star</p>
            </div>
          </div>
        </motion.section>

        {/* Ripple Effect Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Ripple Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RippleEffect color="rgba(59, 130, 246, 0.4)">
              <div className="p-8 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl border border-blue-500/30 text-center cursor-pointer">
                <h3 className="text-white font-semibold mb-2">Blue Ripple</h3>
                <p className="text-gray-300">Click anywhere on this card</p>
              </div>
            </RippleEffect>
            
            <RippleEffect color="rgba(139, 92, 246, 0.4)">
              <div className="p-8 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl border border-purple-500/30 text-center cursor-pointer">
                <h3 className="text-white font-semibold mb-2">Purple Ripple</h3>
                <p className="text-gray-300">Click anywhere on this card</p>
              </div>
            </RippleEffect>
          </div>
        </motion.section>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
        >
          <h3 className="text-white font-semibold mb-2">Interactive Features</h3>
          <p className="text-gray-300 text-sm">
            • Move your cursor around to see the custom cursor follower<br/>
            • Hover over buttons and cards to experience magnetic effects<br/>
            • Click on buttons to see ripple animations and hear sound effects (if enabled)<br/>
            • Try the loading demo to see section transitions
          </p>
        </motion.div>
      </div>

      {/* Section Loader */}
      <SectionLoader 
        isLoading={isLoading} 
        message="Loading awesome content..." 
        variant="spiral"
      />
    </div>
  );
};

export default MicroInteractionsDemo;