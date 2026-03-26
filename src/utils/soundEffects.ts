/**
 * Sound Effects System for Button Interactions
 * Provides audio feedback for user interactions (optional feature)
 */

import React from 'react';

interface SoundConfig {
  volume: number;
  enabled: boolean;
}

class SoundEffectsManager {
  private audioContext: AudioContext | null = null;
  private config: SoundConfig = {
    volume: 0.3,
    enabled: false // Disabled by default to avoid annoying users
  };

  constructor() {
    // Initialize audio context on first user interaction
    this.initializeAudioContext();
  }

  private initializeAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  // Enable/disable sound effects
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
    
    // Store preference in localStorage
    localStorage.setItem('soundEffectsEnabled', enabled.toString());
  }

  // Set volume (0-1)
  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume));
    localStorage.setItem('soundEffectsVolume', this.config.volume.toString());
  }

  // Load preferences from localStorage
  loadPreferences(): void {
    const enabled = localStorage.getItem('soundEffectsEnabled');
    const volume = localStorage.getItem('soundEffectsVolume');

    if (enabled !== null) {
      this.config.enabled = enabled === 'true';
    }

    if (volume !== null) {
      this.config.volume = parseFloat(volume);
    }
  }

  // Create a simple tone
  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    if (!this.audioContext || !this.config.enabled) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      oscillator.type = type;

      // Envelope for smooth sound
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.config.volume, this.audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  // Predefined sound effects
  playHoverSound(): void {
    this.createTone(800, 0.1, 'sine');
  }

  playClickSound(): void {
    this.createTone(1000, 0.15, 'square');
  }

  playSuccessSound(): void {
    // Play a pleasant chord
    setTimeout(() => this.createTone(523.25, 0.2, 'sine'), 0);   // C5
    setTimeout(() => this.createTone(659.25, 0.2, 'sine'), 50);  // E5
    setTimeout(() => this.createTone(783.99, 0.2, 'sine'), 100); // G5
  }

  playErrorSound(): void {
    this.createTone(200, 0.3, 'sawtooth');
  }

  playNotificationSound(): void {
    this.createTone(880, 0.2, 'triangle');
  }

  // Resume audio context (required for some browsers)
  resumeAudioContext(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  // Get current configuration
  getConfig(): SoundConfig {
    return { ...this.config };
  }
}

// Global sound effects manager instance
export const soundEffects = new SoundEffectsManager();

// Initialize preferences on load
soundEffects.loadPreferences();

// Hook for React components
export const useSoundEffects = () => {
  const playHover = () => soundEffects.playHoverSound();
  const playClick = () => soundEffects.playClickSound();
  const playSuccess = () => soundEffects.playSuccessSound();
  const playError = () => soundEffects.playErrorSound();
  const playNotification = () => soundEffects.playNotificationSound();

  const setEnabled = (enabled: boolean) => soundEffects.setEnabled(enabled);
  const setVolume = (volume: number) => soundEffects.setVolume(volume);
  const getConfig = () => soundEffects.getConfig();

  // Resume audio context on first interaction
  const resumeAudio = () => soundEffects.resumeAudioContext();

  return {
    playHover,
    playClick,
    playSuccess,
    playError,
    playNotification,
    setEnabled,
    setVolume,
    getConfig,
    resumeAudio,
  };
};

// Enhanced button component with sound effects (requires React import in consuming component)
export const createSoundEnhancedComponent = <P extends object>(
  Component: React.ComponentType<P>
) => {
  // This would need to be implemented in a React component file
  // For now, we'll just export the hook for manual integration
  return Component;
};

export default soundEffects;