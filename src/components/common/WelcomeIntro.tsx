import React, { useState, useEffect, useCallback } from 'react';
import './WelcomeIntro.css';

interface Particle {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  delay: string;
  duration: string;
}

const PARTICLES: Particle[] = [
  { id: 1, top: '22%', left: '26%', size: 8, color: '#FFD84D', delay: '0.2s', duration: '3.4s' },
  { id: 2, top: '18%', left: '72%', size: 10, color: '#A855F7', delay: '0.6s', duration: '3.8s' },
  { id: 3, top: '35%', left: '18%', size: 6, color: '#C084FC', delay: '1.1s', duration: '3.2s' },
  { id: 4, top: '42%', left: '82%', size: 9, color: '#FFD84D', delay: '0.4s', duration: '4.0s' },
  { id: 5, top: '60%', left: '22%', size: 7, color: '#5425A8', delay: '1.4s', duration: '3.6s' },
  { id: 6, top: '58%', left: '76%', size: 8, color: '#FDE047', delay: '0.9s', duration: '3.5s' },
  { id: 7, top: '28%', left: '38%', size: 6, color: '#E9D5FF', delay: '1.7s', duration: '3.7s' },
  { id: 8, top: '32%', left: '64%', size: 7, color: '#FFD84D', delay: '0.8s', duration: '3.9s' },
  { id: 9, top: '48%', left: '30%', size: 5, color: '#C084FC', delay: '1.3s', duration: '3.3s' },
  { id: 10, top: '50%', left: '68%', size: 6, color: '#FFD84D', delay: '1.6s', duration: '3.6s' },
  { id: 11, top: '15%', left: '48%', size: 9, color: '#A855F7', delay: '0.5s', duration: '4.2s' },
  { id: 12, top: '65%', left: '52%', size: 7, color: '#FFD84D', delay: '1.0s', duration: '3.8s' },
];

export const WelcomeIntro: React.FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('dkoder_welcome_intro_seen') !== 'true';
    } catch {
      return true;
    }
  });

  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  const handleFinish = useCallback(() => {
    setIsFadingOut(true);
    try {
      sessionStorage.setItem('dkoder_welcome_intro_seen', 'true');
    } catch {
      // safe fallback
    }

    const timer = setTimeout(() => {
      setIsMounted(false);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Respect reduced motion: finish quickly without blocking
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const quickTimer = setTimeout(() => {
        handleFinish();
      }, 600);
      return () => clearTimeout(quickTimer);
    }

    // Auto-dismiss after 5.4 seconds (smooth fade completes around 6.1s)
    const autoTimer = setTimeout(() => {
      handleFinish();
    }, 5400);

    // Escape key listener to allow skipping
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(autoTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMounted, handleFinish]);

  if (!isMounted) {
    return null;
  }

  return (
    <aside
      aria-label="Welcome to DKODER"
      className={`welcome-intro-overlay ${isFadingOut ? 'fading-out' : ''}`}
    >
      {/* Soft Ambient Glows in Yellow and Purple */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#FFD84D]/25 via-[#F3EDFF]/50 to-[#5425A8]/20 blur-3xl pointer-events-none -z-10" 
      />
      <div 
        className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#5425A8]/10 blur-2xl pointer-events-none -z-10" 
      />

      {/* Floating Sparkles and Glowing Particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="welcome-particle"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Central Animated Mascot Group */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Floating Robot Container */}
        <div className="robot-float-container relative w-64 h-72 sm:w-72 sm:h-80 flex items-center justify-center">
          <svg
            viewBox="0 0 280 290"
            className="w-full h-full drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Sunshine Yellow 3D Robot Gradients */}
              <linearGradient id="introYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF287" />
                <stop offset="45%" stopColor="#FFD84D" />
                <stop offset="100%" stopColor="#F5B800" />
              </linearGradient>

              <linearGradient id="introYellowLight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              {/* Deep Purple Accents */}
              <linearGradient id="introPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6C2FD1" />
                <stop offset="60%" stopColor="#5425A8" />
                <stop offset="100%" stopColor="#35146E" />
              </linearGradient>

              {/* Dark Obsidian Digital Visor Screen */}
              <linearGradient id="introVisor" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#25163D" />
                <stop offset="100%" stopColor="#140A23" />
              </linearGradient>

              {/* Glowing Digital Cyan Eyes */}
              <linearGradient id="introEyeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A7F3D0" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>

            {/* Floor Shadow Beneath Robot */}
            <ellipse
              cx="140"
              cy="274"
              rx="64"
              ry="11"
              fill="#5425A8"
              className="robot-floor-shadow"
              opacity="0.25"
            />

            {/* --- ROBOT BODY / TORSO --- */}
            <g id="robot-torso">
              {/* Left Arm (Resting at side) */}
              <circle cx="82" cy="166" r="9" fill="url(#introPurple)" />
              <rect
                x="66"
                y="172"
                width="16"
                height="42"
                rx="8"
                fill="url(#introYellow)"
              />
              <circle cx="74" cy="218" r="9" fill="#FFD84D" />

              {/* Torso Chassis */}
              <rect
                x="86"
                y="152"
                width="108"
                height="94"
                rx="28"
                fill="url(#introYellow)"
              />
              {/* Torso Top Highlight */}
              <rect
                x="92"
                y="156"
                width="96"
                height="32"
                rx="16"
                fill="url(#introYellowLight)"
              />
              {/* Purple Collar Trim */}
              <path
                d="M106 152 H174 C166 162 114 162 106 152 Z"
                fill="url(#introPurple)"
              />

              {/* Center Emblem: Gold DK Shield */}
              <circle cx="140" cy="194" r="17" fill="url(#introPurple)" stroke="#FFD84D" strokeWidth="2.5" />
              <text
                x="140"
                y="199"
                textAnchor="middle"
                fill="#FFD84D"
                fontSize="11"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
              >
                DK
              </text>
            </g>

            {/* --- ROBOT HEAD (with gentle tilt & blinking) --- */}
            <g id="robot-head" className="robot-head-group">
              {/* Top Golden Antenna & Glowing Orb */}
              <rect x="138" y="32" width="4" height="24" rx="2" fill="url(#introPurple)" />
              <circle
                cx="140"
                cy="28"
                r="9"
                fill="#FFD84D"
                stroke="#FFF287"
                strokeWidth="2"
                className="robot-antenna-orb"
              />

              {/* Ear Capsules */}
              <rect x="64" y="80" width="14" height="34" rx="7" fill="url(#introPurple)" />
              <circle cx="71" cy="97" r="3.5" fill="#FFD84D" />
              <rect x="202" y="80" width="14" height="34" rx="7" fill="url(#introPurple)" />
              <circle cx="209" cy="97" r="3.5" fill="#FFD84D" />

              {/* Main Head Box (Smooth Rounded 3D Yellow) */}
              <rect
                x="74"
                y="52"
                width="132"
                height="96"
                rx="36"
                fill="url(#introYellow)"
              />
              {/* Glossy Top Specular Highlight */}
              <rect
                x="82"
                y="56"
                width="116"
                height="36"
                rx="18"
                fill="url(#introYellowLight)"
              />

              {/* Obsidian Visor Screen */}
              <rect
                x="88"
                y="66"
                width="104"
                height="68"
                rx="22"
                fill="url(#introVisor)"
                stroke="#371275"
                strokeWidth="1.5"
              />

              {/* Visor Glare Reflection */}
              <path
                d="M94 72 Q140 82 186 72"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.25"
              />

              {/* Digital Eyes with Blinking Animation */}
              <g id="robot-eyes">
                {/* Left Eye */}
                <ellipse
                  cx="120"
                  cy="98"
                  rx="8.5"
                  ry="12"
                  fill="url(#introEyeGlow)"
                  className="robot-eye-left"
                />
                <circle cx="122" cy="94" r="3" fill="#FFFFFF" opacity="0.9" />

                {/* Right Eye */}
                <ellipse
                  cx="160"
                  cy="98"
                  rx="8.5"
                  ry="12"
                  fill="url(#introEyeGlow)"
                  className="robot-eye-right"
                />
                <circle cx="162" cy="94" r="3" fill="#FFFFFF" opacity="0.9" />
              </g>

              {/* Subtle Digital Amber Blush */}
              <ellipse cx="103" cy="118" rx="6" ry="2.8" fill="#F59E0B" opacity="0.4" />
              <ellipse cx="177" cy="118" rx="6" ry="2.8" fill="#F59E0B" opacity="0.4" />
            </g>

            {/* --- RIGHT ARM (Friendly Waving) --- */}
            <g id="robot-waving-arm" className="robot-waving-arm">
              {/* Shoulder Ball Joint */}
              <circle cx="198" cy="166" r="10" fill="url(#introPurple)" />
              {/* Arm Segment (aimed upward for waving) */}
              <rect
                x="194"
                y="126"
                width="18"
                height="44"
                rx="9"
                fill="url(#introYellow)"
              />
              {/* Waving Mitten Hand */}
              <circle cx="203" cy="120" r="14" fill="#FFD84D" />
              {/* Thumb */}
              <circle cx="191" cy="124" r="5.5" fill="#FFD84D" />
              {/* Fingers Indicator */}
              <path
                d="M198 112 Q203 108 208 112"
                stroke="#E5B800"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>

        {/* Exact Text Displayed with Smooth Fade-In and Upward Motion */}
        <h1 className="welcome-text-reveal text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#211B2B] tracking-tight mt-4 text-center">
          Welcome to <span className="text-[#5425A8]">DKODER</span>
        </h1>
      </div>
    </aside>
  );
};
