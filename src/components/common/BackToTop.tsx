import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollTop > 380) {
        setIsVisible(true);
        if (docHeight > 0) {
          const progress = Math.min(100, Math.round((scrollTop / docHeight) * 100));
          setScrollProgress(progress);
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-5 left-5 z-40 p-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E8E2EF] text-[#5425A8] shadow-lg hover:shadow-xl hover:border-[#5425A8]/50 transition-all duration-200 cursor-pointer group select-none interactive-tap ${
        isClicked ? 'animate-pop' : ''
      }`}
      aria-label="Scroll back to top"
      title={`Back to top (${scrollProgress}%)`}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Progress Ring */}
        <svg className="w-8 h-8 -rotate-90" viewBox="0 0 42 42">
          <circle
            cx="21"
            cy="21"
            r={radius}
            fill="none"
            stroke="#F3EDFF"
            strokeWidth="3"
          />
          <circle
            cx="21"
            cy="21"
            r={radius}
            fill="none"
            stroke="#FFD84D"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.15s ease-out'
            }}
          />
        </svg>

        <ArrowUp className="w-4 h-4 text-[#5425A8] group-hover:-translate-y-0.5 group-hover:text-[#211B2B] transition-transform duration-200 absolute" />
      </div>
    </button>
  );
};
