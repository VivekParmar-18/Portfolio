import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initializePerformanceMonitoring } from './utils/performanceMonitoring'

// Initialize performance monitoring
initializePerformanceMonitoring();

// Hide initial loader once React is ready
const hideInitialLoader = () => {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    // Small delay to ensure smooth transition
    requestAnimationFrame(() => {
      loader.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(() => loader.remove(), 500);
    });
  }
};

// Preload critical images before rendering
const preloadCriticalImages = (): Promise<void[]> => {
  const criticalImages = [
    '/profile-photo.jpg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
  ];

  return Promise.all(
    criticalImages.map(src => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Don't block on error
        img.src = src;
      });
    })
  );
};

// Wait for critical images then render
preloadCriticalImages().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  
  // Hide loader after React mounts
  requestAnimationFrame(() => {
    hideInitialLoader();
  });
});
