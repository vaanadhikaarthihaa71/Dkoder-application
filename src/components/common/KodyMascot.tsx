import React, { useState, useRef } from 'react';

export type MascotPose = 'floating' | 'celebrate' | 'avatar';
export type MascotSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';

interface KodyMascotProps {
  pose?: MascotPose;
  size?: MascotSize;
  className?: string;
  interactive?: boolean;
  withGlow?: boolean;
  withFloating?: boolean;
  showSpeechBubble?: boolean;
  speechText?: string;
  onClick?: () => void;
  altText?: string;
}

const SIZE_MAP: Record<MascotSize, string> = {
  xs: 'w-8 h-8',
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-36 h-36',
  hero: 'w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96'
};

export const KodyMascot: React.FC<KodyMascotProps> = ({
  pose = 'floating',
  size = 'md',
  className = '',
  interactive = true,
  withGlow = true,
  withFloating = true,
  showSpeechBubble = false,
  speechText,
  onClick,
  altText = 'DKODER 3D Robot Guide Kody'
}) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const imageSrc = pose === 'celebrate' 
    ? '/images/kody-celebrate.jpg'
    : pose === 'avatar'
    ? '/images/mascot-avatar.jpg'
    : '/images/kody-floating.jpg';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Subtle 3D tilt degrees
    const rotateY = (x / (rect.width / 2)) * 8;
    const rotateX = -(y / (rect.height / 2)) * 8;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleClick = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 600);
    if (onClick) onClick();
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center select-none perspective-1000 ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.15s ease-out'
      }}
    >
      {/* Dynamic Ambient Glow Behind Kody */}
      {withGlow && (
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FFD84D]/35 via-[#F1E9FF]/40 to-[#5425A8]/20 blur-xl -z-10 pointer-events-none transform scale-110"
        />
      )}

      {/* Mascot Image with Animation States */}
      <div
        className={`relative ${SIZE_MAP[size]} transition-all duration-300 ${
          withFloating ? 'animate-kody-float' : ''
        } ${isWiggling ? 'animate-kody-wiggle' : ''}`}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-contain rounded-2xl drop-shadow-md"
          loading="lazy"
        />

        {/* Live Status Indicator Pulse */}
        <span 
          className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white shadow-xs" 
          title="Kody Online"
        />
      </div>

      {/* Optional Contextual Speech Bubble */}
      {showSpeechBubble && speechText && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E8E2EF] shadow-lg text-[11px] font-semibold text-[#211B2B] whitespace-nowrap z-20 flex items-center gap-1.5 animate-word">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD84D]" />
          <span>{speechText}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#E8E2EF] rotate-45" />
        </div>
      )}
    </div>
  );
};
