import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { RobotGuideWidget } from './components/common/RobotGuideWidget';
import { HomePage } from './pages/HomePage';
import { HackathonsPage } from './pages/HackathonsPage';
import { CollegesPage } from './pages/CollegesPage';
import { PartnerMouPage } from './pages/PartnerMouPage';
import { DashboardPage } from './pages/DashboardPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { InfosysBundlePage } from './pages/InfosysBundlePage';
import { AccentureBundlePage } from './pages/AccentureBundlePage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    // If it's an in-page hash scroll on home
    if (path.startsWith('/#')) {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
      }
      setTimeout(() => {
        const id = path.replace('/#', '');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render current active page based on route
  const renderCurrentPage = () => {
    if (currentPath === '/hackathons') {
      return <HackathonsPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/colleges') {
      return <CollegesPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/partner-mou') {
      return <PartnerMouPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/dashboard') {
      return <DashboardPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/student/subscription') {
      return <SubscriptionPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/bundles/infosys') {
      return <InfosysBundlePage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/bundles/accenture') {
      return <AccentureBundlePage onNavigate={handleNavigate} />;
    }
    // Default to Home
    return <HomePage onNavigate={handleNavigate} />;
  };

  const isDashboard = currentPath.startsWith('/dashboard');

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen bg-white text-[#211B2B]">
        {!isDashboard && <Navbar currentPath={currentPath} onNavigate={handleNavigate} />}
        
        {/* Animated Page Transition Container */}
        <main key={currentPath} className="flex-1 animate-word">
          {renderCurrentPage()}
        </main>

        {!isDashboard && <Footer onNavigate={handleNavigate} />}

        {/* Global Signature 3D Mascot Companion & Tour Assistant */}
        <RobotGuideWidget currentPath={currentPath} onNavigate={handleNavigate} />
      </div>
    </ToastProvider>
  );
}

export default App;
