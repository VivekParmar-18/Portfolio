import { useEffect } from 'react';
import { 
  PullToRefresh,
  initializeLazyLoading,
  animationCleanupRegistry,
  useSEO,
  SinglePagePortfolio
} from './index';

function App() {
  // Initialize SEO for single page
  const { updateSEO } = useSEO();

  useEffect(() => {
    updateSEO({
      title: 'Vivek Parmar - Java Developer Portfolio',
      description: 'Portfolio of Vivek Parmar, Associate Software Developer at Techforce InfoTech PVT LTD. Specializing in Java, Spring Boot, React, and full-stack development.',
      keywords: ['Vivek Parmar', 'Java Developer', 'Spring Boot', 'React', 'Full Stack Developer', 'Techforce InfoTech', 'Portfolio']
    });
  }, [updateSEO]);

  const handleRefresh = async () => {
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // You could also trigger a data refresh here
    console.log('Page refreshed');
  };

  // Initialize performance optimizations
  useEffect(() => {
    // Initialize lazy loading for animation libraries
    initializeLazyLoading();

    // Cleanup animations on app unmount
    return () => {
      animationCleanupRegistry.cleanup();
    };
  }, []);

  return (
    <div className="App">
      {/* CursorFollower disabled for better performance */}
      <PullToRefresh onRefresh={handleRefresh}>
        <SinglePagePortfolio />
      </PullToRefresh>
    </div>
  );
}

export default App;
