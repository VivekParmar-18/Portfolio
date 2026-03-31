import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CursorFollower } from './components/index';
import { initializeLazyLoading } from './utils/lazyAnimationLoader';
import { animationCleanupRegistry } from './utils/animationOptimization';
import SinglePagePortfolio from './pages/SinglePagePortfolio';
import { ReadingProgress } from './components/ReadingProgress/ReadingProgress';

function App() {
  useEffect(() => {
    // Initialize performance-aware lazy loading for animations
    initializeLazyLoading();
    
    // Global cleanup on unmount
    return () => {
      animationCleanupRegistry.cleanup();
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Core UI Overlays */}
        <ReadingProgress />
        <CursorFollower />

        {/* Navigation & Content */}
        <Routes>
          {/* All routes render the same SPA — hash links handle sections */}
          <Route path="/*" element={<SinglePagePortfolio />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
