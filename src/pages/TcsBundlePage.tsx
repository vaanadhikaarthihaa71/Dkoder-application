import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Check, 
  ArrowRight,
  Code2,
  Clock,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { TCS_NQT_DATA } from '../data/mockData';
import { useToast } from '../context/ToastContext';

interface TcsBundlePageProps {
  onNavigate: (path: string) => void;
}

export const TcsBundlePage: React.FC<TcsBundlePageProps> = ({ onNavigate }) => {
  const { addToast } = useToast();
  const [selectedTier, setSelectedTier] = useState<string>('Digital');

  const handleStartPractice = (tier: string) => {
    addToast({
      type: 'success',
      title: `TCS ${tier} Drill Loaded`,
      description: 'Navigating to practice question feed with TCS recruiter filters.'
    });
    onNavigate('/');
  };

  return (
    <div className="py-12 bg-[#FAF8FD] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#6F687A] font-medium flex items-center gap-1.5">
          <button onClick={() => onNavigate('/')} className="hover:text-[#211B2B] cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-[#6F687A]">Bundles</span>
          <span>/</span>
          <span className="text-[#211B2B] font-semibold">TCS National Qualifier Test (NQT)</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-[#E8E2EF] rounded-3xl p-8 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3EDFF] text-[#5425A8] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD84D]" />
              <span>Flagship Campus Recruitment Test</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#211B2B] tracking-tight">
              TCS NQT 2025–2026 <span className="text-[#5425A8]">Master Prep Bundle</span>
            </h1>

            <p className="text-sm sm:text-base text-[#6F687A] leading-relaxed">
              Curated preparation for India’s largest national campus qualifier exam. Target <strong className="text-[#211B2B]">Ninja (3.36 LPA)</strong>, <strong className="text-[#211B2B]">Digital (7.0 LPA)</strong>, and <strong className="text-[#5425A8]">Prime (9.0 LPA)</strong> roles with verified memory-based questions and live browser compilation.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleStartPractice('Digital')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="font-bold interactive-tap"
              >
                Practise TCS Coding Rounds
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('/student/subscription')}
                className="font-semibold bg-white interactive-tap"
              >
                Compare Prep Passes
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={() => onNavigate('/partner-mou')}
                className="text-[#6F687A] hover:text-[#5425A8]"
              >
                Institutional College MOU →
              </Button>
            </div>
          </div>
        </div>

        {/* 3 Salary Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TCS_NQT_DATA.salaryBands.map((band, idx) => {
            const isSelected = selectedTier === band.tier;
            return (
              <div 
                key={idx}
                onClick={() => setSelectedTier(band.tier)}
                className={`bg-white rounded-2xl border p-6 transition-all cursor-pointer card-hover-shadow ${
                  isSelected 
                    ? 'border-2 border-[#5425A8] shadow-md ring-4 ring-[#5425A8]/5' 
                    : 'border-[#E8E2EF] hover:border-[#5425A8]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#5425A8] bg-[#F3EDFF] px-2.5 py-0.5 rounded-full">
                    Band {idx + 1}
                  </span>
                  <span className="text-sm font-extrabold text-[#211B2B]">{band.tier} Tier</span>
                </div>

                <div className="text-2xl font-black text-[#211B2B] my-2">
                  {band.package}
                </div>

                <p className="text-xs text-[#6F687A] leading-relaxed mb-4">
                  {band.testFocus}
                </p>

                <div className="pt-3 border-t border-[#E8E2EF] flex items-center justify-between text-xs font-bold text-[#5425A8]">
                  <span>{isSelected ? 'Active Selection' : 'Select Tier'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Exam Structure Breakdown */}
        <div className="bg-white rounded-3xl border border-[#E8E2EF] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E2EF] pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#211B2B] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#5425A8]" />
                <span>TCS NQT Official Pattern & Time Allocation</span>
              </h2>
              <p className="text-xs text-[#6F687A] mt-0.5">
                Total duration: 165 Minutes • Strict sectional timing & zero negative marking
              </p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified 2025/2026 Syllabus</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TCS_NQT_DATA.examStructure.map((sec, idx) => (
              <div key={idx} className="bg-[#FAF8FD] rounded-2xl border border-[#E8E2EF] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#211B2B]">{sec.sectionName}</h3>
                  <span className="text-xs font-semibold text-[#5425A8] bg-white px-2.5 py-0.5 rounded-lg border border-[#E8E2EF]">
                    {sec.duration}
                  </span>
                </div>

                <div className="space-y-2">
                  {sec.subSections.map((sub, sIdx) => (
                    <div key={sIdx} className="bg-white p-3 rounded-xl border border-[#E8E2EF] flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-[#211B2B]">{sub.name}</div>
                        <div className="text-[11px] text-[#6F687A]">{sub.questions} Questions</div>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#5425A8]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{sub.timeMins} Mins</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Sample Coding Problems */}
        <div className="bg-white rounded-3xl border border-[#E8E2EF] p-6 sm:p-8 shadow-xs space-y-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#211B2B] flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#5425A8]" />
              <span>Recent TCS NQT Coding Problems (In-Browser Compilation Ready)</span>
            </h2>
            <p className="text-xs text-[#6F687A] mt-0.5">
              Practice exact memory-based test cases with strict 2.0-second time limits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TCS_NQT_DATA.verifiedQuestions.map((q, idx) => (
              <div key={idx} className="bg-[#FAF8FD] rounded-2xl border border-[#E8E2EF] p-5 flex flex-col justify-between card-hover-shadow">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-[#5425A8] bg-[#F3EDFF] px-2 py-0.5 rounded-md">
                      {q.tier}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' :
                      q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#211B2B] mb-2 leading-snug">
                    {q.title}
                  </h3>

                  <p className="text-xs text-[#6F687A] leading-relaxed line-clamp-3">
                    {q.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8E2EF]">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => handleStartPractice(q.tier)}
                    className="font-bold bg-white text-xs interactive-tap"
                  >
                    Solve in Live Compiler →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
