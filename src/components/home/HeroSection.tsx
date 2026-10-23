import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Check, 
  Sparkles, 
  Trophy,
  Cpu,
  ChevronDown,
  Zap
} from 'lucide-react';
import { Button } from '../common/Button';
import { KodyMascot } from '../common/KodyMascot';
import { useParallax } from '../../hooks/useParallax';

interface HeroSectionProps {
  onStartPracticing: () => void;
  onExploreBundles: () => void;
  onApplyMou: () => void;
}

const DEMO_QUERIES = [
  {
    query: "How do I crack TCS Digital with 7+ LPA?",
    response: "Master Matrix in-place rotation, Two-Pointers, and Greedy Arrays with O(N) linear accuracy.",
    company: "TCS Prep",
    badge: "7.0+ LPA"
  },
  {
    query: "What is key for Infosys InfyTQ & SP?",
    response: "Focus on OOP abstraction, DBMS relational queries, and 2 medium algorithmic problems in the timed test.",
    company: "Infosys Prep",
    badge: "9.5 LPA"
  },
  {
    query: "Where should I start for Big Tech 20+ LPA?",
    response: "Master Sliding Window, Binary Search on Answer, Graph BFS/DFS, and 0/1 Knapsack memoisation.",
    company: "Super Dream",
    badge: "20+ LPA"
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartPracticing,
  onExploreBundles,
  onApplyMou
}) => {
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const activeItem = DEMO_QUERIES[activeQueryIndex];
  
  const heroRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const parallax = useParallax(heroRef, 12);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: stay muted and silently play on the first user interaction
        const startPlay = () => {
          if (video) {
            video.muted = true;
            video.play().catch(() => {});
          }
        };
        window.addEventListener('click', startPlay, { once: true });
        window.addEventListener('touchstart', startPlay, { once: true });
      });
    }
  }, []);

  // Split headline for staggered word entrance
  const headlineWords = [
    { text: "Master", highlight: false },
    { text: "campus", highlight: false },
    { text: "coding", highlight: false },
    { text: "rounds", highlight: false },
    { text: "with", highlight: false },
    { text: "real", highlight: true },
    { text: "recruiter", highlight: true },
    { text: "questions", highlight: true }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative pt-6 pb-20 lg:pt-8 lg:pb-28 bg-gradient-to-b from-white via-[#FAF8FD] to-white border-b border-[#E8E2EF] overflow-hidden"
    >
      {/* Subtle Animated Tech Grid & Glow Accents */}
      <div className="absolute inset-0 bg-tech-grid opacity-75 pointer-events-none -z-10" />
      <div className="absolute top-12 right-12 w-96 h-96 bg-[#F3EDFF]/70 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FFF8D6]/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Floating Parallax Coding Objects */}
      <div 
        className="hidden xl:block absolute top-28 left-8 p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E8E2EF] shadow-md -z-5 pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${parallax.x * 0.8}px, ${parallax.y * 0.8}px, 0)` }}
      >
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#5425A8]">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>const dreamJob = "20+ LPA";</span>
        </div>
      </div>

      <div 
        className="hidden xl:block absolute bottom-36 left-20 p-2 rounded-xl bg-[#FFF8D6]/90 border border-[#FFD84D]/50 shadow-sm -z-5 pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${-parallax.x * 0.6}px, ${-parallax.y * 0.6}px, 0)` }}
      >
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#211B2B]">
          <Zap className="w-3.5 h-3.5 text-[#5425A8]" />
          <span>Two-Pointers • O(N)</span>
        </div>
      </div>

      <div 
        className="hidden xl:block absolute top-24 right-16 p-2 rounded-xl bg-white/90 border border-[#E8E2EF] shadow-md -z-5 pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: `translate3d(${-parallax.x * 0.9}px, ${-parallax.y * 0.9}px, 0)` }}
      >
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5425A8]">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD84D] fill-[#FFD84D]" />
          <span>+50 Placement XP</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Uploaded DKODER Welcome Video Above Hero Content */}
        <div className="mb-10 lg:mb-14 w-full max-w-4xl mx-auto pointer-events-none select-none">
          <div className="rounded-2xl overflow-hidden border border-[#E8E2EF] bg-white shadow-sm">
            <video
              ref={videoRef}
              src="/assets/aistudio/Robot_welcoming_animation_video_1080p_20261024001749_gwr_video_mvp_4a1dbe57.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
              tabIndex={-1}
              className="w-full h-auto aspect-video object-contain block pointer-events-none select-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Staggered Headline, Copy & CTAs (Span 6) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Pill with Mascot Indicator & Status */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F3EDFF] border border-[#E8E2EF] text-[#5425A8] text-xs font-semibold shadow-xs hover:border-[#5425A8]/30 transition-colors">
              <KodyMascot size="xs" pose="floating" interactive={false} withFloating={true} withGlow={false} />
              <span className="font-bold">DKODER 2.0</span>
              <span className="text-[#6F687A]">•</span>
              <span className="text-[#211B2B]">Campus Placement Platform</span>
            </div>

            {/* Staggered Word-by-Word Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#211B2B] tracking-tight leading-[1.12]">
              {headlineWords.map((item, idx) => (
                <span
                  key={idx}
                  className={`animate-word inline-block mr-2 ${
                    item.highlight 
                      ? 'text-[#5425A8] underline decoration-[#FFD84D] decoration-4 underline-offset-4' 
                      : ''
                  }`}
                  style={{ animationDelay: `${idx * 55}ms` }}
                >
                  {item.text}
                </span>
              ))}
            </h1>

            {/* Concise Subtitle with High Readability */}
            <p className="text-base sm:text-lg text-[#6F687A] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Practice verified company questions from <strong className="text-[#211B2B]">TCS</strong>, <strong className="text-[#211B2B]">Infosys</strong>, and <strong className="text-[#211B2B]">Accenture</strong> to <strong className="text-[#5425A8]">20+ LPA Super Dream</strong> roles with instant in-browser compilation.
            </p>

            {/* Value checklist with subtle hover highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-[#211B2B] font-medium pt-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 border border-[#E8E2EF]">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                <span>Live Browser Compiler</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 border border-[#E8E2EF]">
                <Check className="w-4 h-4 text-[#5425A8] stroke-[3]" />
                <span>Salary Filters (3–20+ LPA)</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/70 border border-[#E8E2EF]">
                <Check className="w-4 h-4 text-amber-500 stroke-[3]" />
                <span>Verified Recruiters</span>
              </div>
            </div>

            {/* Dominant Primary CTA + Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onStartPracticing}
                rightIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                className="w-full sm:w-auto shadow-lg hover:shadow-xl interactive-tap text-base font-bold bg-[#FFD84D] hover:bg-[#F2C836] text-[#211B2B] border-none"
              >
                Start Practising Now
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onExploreBundles}
                leftIcon={<Terminal className="w-4 h-4 text-[#5425A8]" />}
                className="w-full sm:w-auto interactive-tap border-[#E8E2EF] hover:border-[#5425A8] bg-white font-semibold"
              >
                Prep Bundles
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={onApplyMou}
                className="w-full sm:w-auto text-[#6F687A] hover:text-[#5425A8] font-medium"
              >
                College MOU →
              </Button>
            </div>

            {/* Interactive placement goal selector */}
            <div className="pt-4 border-t border-[#E8E2EF]">
              <div className="flex items-center justify-center lg:justify-between text-xs font-semibold text-[#6F687A] mb-2.5">
                <span>Select recruiter target to preview tips:</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {DEMO_QUERIES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveQueryIndex(idx)}
                    className={`text-xs px-3.5 py-2 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-2 interactive-tap ${
                      activeQueryIndex === idx
                        ? 'bg-[#FFD84D] text-[#211B2B] font-bold shadow-sm scale-102 border border-[#FFD84D]'
                        : 'bg-white text-[#6F687A] border border-[#E8E2EF] hover:bg-[#FAF8FD] hover:text-[#211B2B]'
                    }`}
                  >
                    <span>{item.company}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/80 font-bold text-[#211B2B]">
                      {item.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Layered Parallax Hero Visual Container (Span 6) */}
          <div 
            className="lg:col-span-6 relative perspective-1000"
            style={{
              transform: `perspective(1000px) rotateX(${parallax.rotateX}deg) rotateY(${parallax.rotateY}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            
            {/* Visual Container */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FAF8FD] via-white to-[#F3EDFF] border border-[#E8E2EF] shadow-2xl p-3 sm:p-4 group">
              
              {/* Primary 3D Illustration */}
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xs">
                <img
                  src="/images/hero-mascot.jpg"
                  alt="DKODER 3D Yellow Robot Mascot with Indian College Students Learning Coding"
                  className="w-full h-auto object-cover transform group-hover:scale-101 transition-transform duration-500"
                  loading="eager"
                />

                {/* Subtle gradient overlay at bottom for speech bubble readability */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#211B2B]/80 via-[#211B2B]/35 to-transparent pointer-events-none" />

                {/* Floating Badge Top-Left: Live Pass Rate */}
                <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#E8E2EF] shadow-md flex items-center gap-2.5 animate-word">
                  <div className="w-7 h-7 rounded-lg bg-[#FFD84D] text-[#211B2B] flex items-center justify-center font-bold text-xs shadow-xs">
                    <Trophy className="w-4 h-4 text-[#211B2B]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#211B2B]">98.4% Pass Rate</div>
                    <div className="text-[10px] text-[#6F687A]">In TCS, Infosys & Product rounds</div>
                  </div>
                </div>

                {/* Floating Badge Top-Right: Active Compiler */}
                <div className="absolute top-3.5 right-3.5 bg-[#5425A8]/95 text-white backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5 text-xs font-semibold border border-purple-400/30">
                  <Cpu className="w-4 h-4 text-[#FFD84D]" />
                  <span>Browser Lab Active</span>
                </div>

                {/* Dynamic Layered Speech Bubble Overlay over bottom of illustration */}
                <div className="absolute inset-x-3 bottom-3 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-white/80 shadow-lg space-y-1.5 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5425A8] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFD84D] fill-[#FFD84D]" />
                      Recruiter Focus • {activeItem.company}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF8D6] text-[#211B2B] border border-[#FFD84D]/40">
                      {activeItem.badge}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-[#211B2B] leading-tight">
                    "{activeItem.query}"
                  </p>

                  <div className="pt-1.5 border-t border-[#E8E2EF] text-xs text-[#5425A8] font-medium leading-relaxed flex items-start gap-2">
                    <span className="font-bold shrink-0 text-[#211B2B] bg-[#FFF8D6] px-1.5 py-0.5 rounded text-[10px]">
                      Kody's Tip:
                    </span>
                    <span className="text-[#211B2B]">{activeItem.response}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Cinematic Scroll Cue at Bottom */}
        <div className="pt-12 flex flex-col items-center justify-center text-center">
          <button
            onClick={onStartPracticing}
            className="group inline-flex flex-col items-center gap-1.5 text-[#6F687A] hover:text-[#5425A8] transition-colors cursor-pointer"
            aria-label="Scroll to practice stream"
          >
            <span className="text-xs font-semibold tracking-wide">
              Explore Questions & Salary Filters
            </span>
            <div className="w-8 h-8 rounded-full bg-white border border-[#E8E2EF] shadow-xs flex items-center justify-center group-hover:border-[#5425A8]/40 group-hover:shadow-md transition-all">
              <ChevronDown className="w-4 h-4 text-[#5425A8] animate-bounce" />
            </div>
          </button>
        </div>

      </div>

    </section>
  );
};
