import React, { useState, useEffect } from 'react';
import { KodyMascot } from './KodyMascot';
import { 
  X, 
  ChevronRight, 
  Sparkles, 
  Code2, 
  LayoutDashboard, 
  Briefcase, 
  Trophy, 
  Minimize2, 
  Maximize2,
  Compass,
  CheckCircle2,
  Lightbulb,
  GraduationCap
} from 'lucide-react';

interface RobotGuideWidgetProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface ContextTip {
  title: string;
  message: string;
  actionText?: string;
  actionPath?: string;
}

const ROUTE_TIPS: Record<string, ContextTip> = {
  '/': {
    title: 'Welcome to DKODER!',
    message: 'Master campus recruitment coding rounds with real recruiter questions. Try filtering by salary or launch the live compiler!',
    actionText: 'Go to Practice Stream',
    actionPath: '/#practice-stream'
  },
  '/dashboard': {
    title: 'Student Mission Control',
    message: 'Solve your Daily Practice problem to build your streak and earn placement XP!',
    actionText: 'View Today\'s Challenge',
    actionPath: '/dashboard'
  },
  '/hackathons': {
    title: 'Competitive Coding Arena',
    message: 'Compete in timed college hackathons with automated test suites and live batch ranks.',
    actionText: 'View Active Contests',
    actionPath: '/hackathons'
  },
  '/colleges': {
    title: 'Campus & Institutional Portal',
    message: 'Over 40+ engineering colleges partner with DKODER to boost batch placement rates.',
    actionText: 'Explore Partner MOU',
    actionPath: '/partner-mou'
  },
  '/student/subscription': {
    title: 'Placement Pass',
    message: 'Unlock full company test archives, mock assessments, and mentor code reviews.',
    actionText: 'Compare Plans',
    actionPath: '/student/subscription'
  },
  '/bundles/tcs': {
    title: 'TCS NQT 2025–2026',
    message: 'Crack India’s largest campus test. Target Ninja (3.36 LPA), Digital (7.0 LPA), and Prime (9.0 LPA) with in-browser compilation!',
    actionText: 'Solve TCS Problems',
    actionPath: '/bundles/tcs'
  },
  '/bundles/infosys': {
    title: 'Infosys InfyTQ & SP Prep',
    message: 'Targeted preparation for Infosys Specialist Programmer (9.5 LPA) and SE roles.',
    actionText: 'Start Infosys Track',
    actionPath: '/bundles/infosys'
  },
  '/bundles/accenture': {
    title: 'Accenture ASE / FSE Pack',
    message: 'Master cognitive ability, pseudo-code puzzles, and technical coding rounds.',
    actionText: 'Start Accenture Track',
    actionPath: '/bundles/accenture'
  }
};

export const RobotGuideWidget: React.FC<RobotGuideWidgetProps> = ({
  currentPath,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(() => {
    return localStorage.getItem('kody_minimized') === 'true';
  });
  const [dismissedPath, setDismissedPath] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'shortcuts' | 'tour' | 'tips'>('shortcuts');
  const [tourStep, setTourStep] = useState(0);

  const currentTip = ROUTE_TIPS[currentPath] || ROUTE_TIPS['/'];
  const showTeaser = dismissedPath !== currentPath;

  // Auto-dismiss teaser after 9s of inactivity on same path
  useEffect(() => {
    const timer = setTimeout(() => {
      setDismissedPath(currentPath);
    }, 9000);
    return () => clearTimeout(timer);
  }, [currentPath]);

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isMinimized;
    setIsMinimized(nextState);
    localStorage.setItem('kody_minimized', String(nextState));
    if (nextState) setIsOpen(false);
  };

  const handleAction = (path?: string) => {
    if (!path) return;
    onNavigate(path);
    setIsOpen(false);
  };

  const TOUR_STEPS = [
    {
      title: 'Step 1: Choose Your Placement Target',
      desc: 'Pick your career track—from Mass Recruiters (TCS, Infosys 3.5-9.5 LPA) to Super Dream Tech (20+ LPA).',
      icon: <Briefcase className="w-5 h-5 text-[#5425A8]" />
    },
    {
      title: 'Step 2: Solve in the Live Browser Compiler',
      desc: 'No local setup needed. Run Python, Java, C++, or JavaScript against hidden test cases instantly.',
      icon: <Code2 className="w-5 h-5 text-[#FFD84D]" />
    },
    {
      title: 'Step 3: Track Progress on Student Dashboard',
      desc: 'Monitor real problems solved, your daily practice streak, and topic accuracy rings.',
      icon: <LayoutDashboard className="w-5 h-5 text-emerald-500" />
    },
    {
      title: 'Step 4: Compete on the Batch Leaderboard',
      desc: 'See how you stack up against engineering students across 40+ partner universities.',
      icon: <Trophy className="w-5 h-5 text-amber-500" />
    }
  ];

  const PLACEMENT_TIPS = [
    {
      title: 'TCS Ninja & Digital Strategy',
      text: 'Focus heavily on Two-Pointer array problems, string manipulations, and basic greedy algorithms.'
    },
    {
      title: 'Infosys InfyTQ Test Pattern',
      text: 'Master OOP abstraction, SQL subqueries/HAVING clauses, and timed recursion problems.'
    },
    {
      title: 'Super Dream (20+ LPA) Strategy',
      text: 'Prioritize Sliding Window, Binary Search on Answer, Graph BFS/DFS, and dynamic programming memoization.'
    }
  ];

  return (
    <aside aria-label="DKODER Interactive Companion" className="fixed bottom-5 right-5 z-40 flex flex-col items-end select-none">
      
      {/* Floating Teaser Speech Bubble (when panel is closed and not minimized) */}
      {!isOpen && !isMinimized && showTeaser && (
        <div className="mb-3 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#E8E2EF] shadow-xl text-left animate-word relative group">
          <button
            onClick={() => setDismissedPath(currentPath)}
            className="absolute top-2 right-2 text-[#6F687A] hover:text-[#211B2B] p-1 rounded-md transition-colors cursor-pointer"
            title="Dismiss tip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#FFD84D] animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5425A8]">
              {currentTip.title}
            </span>
          </div>

          <p className="text-xs text-[#211B2B] leading-relaxed pr-4">
            {currentTip.message}
          </p>

          <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#E8E2EF]">
            <button
              onClick={() => setIsOpen(true)}
              className="text-[11px] font-bold text-[#5425A8] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Compass className="w-3 h-3" />
              <span>Open Tour Guide</span>
            </button>

            {currentTip.actionText && currentTip.actionPath && (
              <button
                onClick={() => handleAction(currentTip.actionPath)}
                className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#FFD84D] text-[#211B2B] hover:bg-[#F2C836] transition-colors cursor-pointer"
              >
                {currentTip.actionText} →
              </button>
            )}
          </div>

          {/* Speech bubble pointer */}
          <div className="absolute -bottom-1.5 right-7 w-3 h-3 bg-white border-b border-r border-[#E8E2EF] rotate-45" />
        </div>
      )}

      {/* Main Mascot Floating Launcher Button */}
      <div className="flex items-center gap-2">
        
        {/* Toggle Minimize Button */}
        <button
          onClick={toggleMinimize}
          className="p-1.5 rounded-full bg-white/90 border border-[#E8E2EF] text-[#6F687A] hover:text-[#5425A8] shadow-sm backdrop-blur-xs transition-colors cursor-pointer"
          title={isMinimized ? "Expand Kody Guide" : "Minimize Kody Guide"}
        >
          {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
        </button>

        {/* Mascot Avatar Launcher */}
        <button
          onClick={() => {
            if (isMinimized) {
              setIsMinimized(false);
              localStorage.setItem('kody_minimized', 'false');
            }
            setIsOpen(!isOpen);
          }}
          className={`relative group rounded-full transition-all duration-300 cursor-pointer ${
            isMinimized 
              ? 'p-1.5 bg-[#FAF8FD] border border-[#E8E2EF] shadow-sm hover:scale-105' 
              : 'p-1 bg-gradient-to-tr from-[#FFD84D] to-[#FAF8FD] border border-[#FFD84D] shadow-lg hover:shadow-xl hover:scale-105'
          }`}
          title="Kody — DKODER Robot Guide"
        >
          <KodyMascot
            pose={isOpen ? 'celebrate' : 'floating'}
            size={isMinimized ? 'xs' : 'sm'}
            interactive={false}
            withFloating={!isOpen && !isMinimized}
            withGlow={!isMinimized}
          />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5425A8] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#5425A8]" />
            </span>
          )}
        </button>
      </div>

      {/* Expanded Interactive Tour & Assistant Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[92vw] sm:w-96 max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-xl rounded-3xl border border-[#E8E2EF] shadow-2xl p-4 sm:p-5 flex flex-col gap-4 animate-word text-left">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2EF]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF8D6] border border-[#FFD84D] overflow-hidden flex items-center justify-center p-1 shadow-xs">
                <img 
                  src="/images/kody-floating.jpg" 
                  alt="Kody Guide" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-[#211B2B] text-sm">Kody</h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F3EDFF] text-[#5425A8]">
                    Campus Guide
                  </span>
                </div>
                <p className="text-[11px] text-[#6F687A]">Your interactive DKODER companion</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#6F687A] hover:text-[#211B2B] hover:bg-[#FAF8FD] transition-colors cursor-pointer"
                title="Close guide"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex rounded-xl bg-[#FAF8FD] p-1 border border-[#E8E2EF] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('shortcuts')}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'shortcuts'
                  ? 'bg-white text-[#5425A8] shadow-xs'
                  : 'text-[#6F687A] hover:text-[#211B2B]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Navigation</span>
            </button>
            <button
              onClick={() => setActiveTab('tour')}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'tour'
                  ? 'bg-white text-[#5425A8] shadow-xs'
                  : 'text-[#6F687A] hover:text-[#211B2B]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guided Tour</span>
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'tips'
                  ? 'bg-white text-[#5425A8] shadow-xs'
                  : 'text-[#6F687A] hover:text-[#211B2B]'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Tips</span>
            </button>
          </div>

          {/* TAB 1: QUICK NAVIGATION SHORTCUTS */}
          {activeTab === 'shortcuts' && (
            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-[#6F687A] uppercase tracking-wider px-1">
                Where do you want to practice?
              </p>

              <button
                onClick={() => handleAction('/#practice-stream')}
                className="w-full p-2.5 rounded-xl border border-[#E8E2EF] hover:border-[#5425A8]/40 bg-white hover:bg-[#FAF8FD] transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFF8D6] text-[#211B2B] flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-[#5425A8]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#211B2B] group-hover:text-[#5425A8]">
                      Curated Practice Questions
                    </div>
                    <div className="text-[10px] text-[#6F687A]">Filter by company, salary & live compiler</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6F687A] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('/dashboard')}
                className="w-full p-2.5 rounded-xl border border-[#E8E2EF] hover:border-[#5425A8]/40 bg-white hover:bg-[#FAF8FD] transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F3EDFF] text-[#5425A8] flex items-center justify-center">
                    <LayoutDashboard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#211B2B] group-hover:text-[#5425A8]">
                      Student Dashboard & Streak
                    </div>
                    <div className="text-[10px] text-[#6F687A]">Track real submissions, XP & analytics</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6F687A] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('/bundles/infosys')}
                className="w-full p-2.5 rounded-xl border border-[#E8E2EF] hover:border-[#5425A8]/40 bg-white hover:bg-[#FAF8FD] transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF5FF] text-blue-600 flex items-center justify-center">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#211B2B] group-hover:text-[#5425A8]">
                      Infosys InfyTQ & SP Bundle
                    </div>
                    <div className="text-[10px] text-[#6F687A]">Exact test pattern, OOPs & pseudocode</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6F687A] group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleAction('/partner-mou')}
                className="w-full p-2.5 rounded-xl border border-[#E8E2EF] hover:border-[#5425A8]/40 bg-white hover:bg-[#FAF8FD] transition-all flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#211B2B] group-hover:text-[#5425A8]">
                      Institutional MOU for Colleges
                    </div>
                    <div className="text-[10px] text-[#6F687A]">Batch LMS, faculty dashboard & custom tests</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6F687A] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          {/* TAB 2: STEP-BY-STEP GUIDED TOUR */}
          {activeTab === 'tour' && (
            <div className="space-y-3">
              <div className="bg-[#FAF8FD] p-3.5 rounded-2xl border border-[#E8E2EF] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-white shadow-xs">
                      {TOUR_STEPS[tourStep].icon}
                    </div>
                    <span className="text-xs font-bold text-[#211B2B]">
                      {TOUR_STEPS[tourStep].title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#6F687A]">
                    {tourStep + 1} / {TOUR_STEPS.length}
                  </span>
                </div>

                <p className="text-xs text-[#6F687A] leading-relaxed">
                  {TOUR_STEPS[tourStep].desc}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#E8E2EF]">
                  <button
                    disabled={tourStep === 0}
                    onClick={() => setTourStep((prev) => Math.max(0, prev - 1))}
                    className="text-xs font-semibold text-[#6F687A] disabled:opacity-40 cursor-pointer"
                  >
                    ← Previous
                  </button>

                  <div className="flex gap-1">
                    {TOUR_STEPS.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === tourStep ? 'bg-[#5425A8] w-4' : 'bg-[#E8E2EF]'
                        }`}
                      />
                    ))}
                  </div>

                  {tourStep < TOUR_STEPS.length - 1 ? (
                    <button
                      onClick={() => setTourStep((prev) => Math.min(TOUR_STEPS.length - 1, prev + 1))}
                      className="text-xs font-bold text-[#5425A8] cursor-pointer"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAction('/#practice-stream')}
                      className="text-xs font-bold text-[#5425A8] cursor-pointer"
                    >
                      Start Practice!
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLACEMENT INTERVIEW TIPS */}
          {activeTab === 'tips' && (
            <div className="space-y-2.5">
              {PLACEMENT_TIPS.map((tip, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF]">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#5425A8] mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{tip.title}</span>
                  </div>
                  <p className="text-[11px] text-[#6F687A] leading-relaxed">
                    {tip.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Footer note */}
          <div className="pt-2 border-t border-[#E8E2EF] flex items-center justify-between text-[10px] text-[#6F687A]">
            <span>DKODER Mascot v2.4 • Always here to guide</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#5425A8] font-bold hover:underline cursor-pointer"
            >
              Minimize
            </button>
          </div>

        </div>
      )}

    </aside>
  );
};
