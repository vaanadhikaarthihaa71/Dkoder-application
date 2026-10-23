import React from 'react';
import { 
  CheckCircle2, 
  FileText, 
  Code2, 
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

interface PerformanceAnalyticsProps {
  examAccuracy?: number;
  examsCompleted?: number;
  examsTotal?: number;
  problemsSolved?: number;
  xpValue?: number;
  levelName?: string;
  progressPercent?: number;
}

export const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({
  examAccuracy = 0,
  examsCompleted = 0,
  examsTotal = 0,
  problemsSolved = 0,
  xpValue = 0,
  levelName = 'Rookie',
  progressPercent = 0
}) => {
  const animatedAccuracy = useCountUp(examAccuracy, 1000);
  const animatedProblems = useCountUp(problemsSolved, 800);
  const animatedXp = useCountUp(xpValue, 1200);

  // SVG Progress Ring calculations
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(examAccuracy, 100) / 100) * circumference;
  const xpOffset = circumference - (Math.min(progressPercent, 100) / 100) * circumference;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#211B2B] flex items-center gap-2">
          <span>Performance Analytics</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </h3>
        <span className="text-[11px] text-[#6F687A] font-medium">
          Verified student metrics
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Exam Accuracy with Animated Ring */}
        <div className="bg-white rounded-2xl border border-[#E8E2EF] p-4 flex flex-col justify-between card-hover-shadow">
          <div>
            <div className="flex items-center justify-between text-xs text-[#6F687A] mb-1">
              <span className="font-bold">Exam Accuracy</span>
              
              {/* Circular Mini Progress Ring */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-8 h-8 -rotate-90" viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    fill="none"
                    stroke="#F3EDFF"
                    strokeWidth="4"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r={radius}
                    fill="none"
                    stroke="#5425A8"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{
                      strokeDashoffset,
                      transition: 'stroke-dashoffset 1s ease-out'
                    }}
                  />
                </svg>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5425A8] absolute" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 my-1">
              <span className="text-2xl font-black text-[#211B2B]">{animatedAccuracy}%</span>
              <span className="text-[11px] font-medium text-[#6F687A]">cut-off avg</span>
            </div>

            <p className="text-xs text-[#6F687A] mt-0.5">
              Across all MCQ rounds
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E8E2EF] flex items-center justify-between text-[11px] text-[#6F687A]">
            <span>Minimum cutoff: 65%</span>
            <span className={examAccuracy >= 65 ? "text-emerald-600 font-bold" : "text-amber-600 font-medium"}>
              {examAccuracy >= 65 ? "Qualified" : "In Progress"}
            </span>
          </div>
        </div>

        {/* Card 2: Exams Completed */}
        <div className="bg-white rounded-2xl border border-[#E8E2EF] p-4 flex flex-col justify-between card-hover-shadow">
          <div>
            <div className="flex items-center justify-between text-xs text-[#6F687A] mb-1">
              <span className="font-bold">Exams Completed</span>
              <div className="w-7 h-7 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF] flex items-center justify-center text-[#5425A8]">
                <FileText className="w-3.5 h-3.5" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 my-1">
              <span className="text-2xl font-black text-[#211B2B]">{examsCompleted} / {examsTotal}</span>
              <span className="text-[11px] font-medium text-[#6F687A]">mock sets</span>
            </div>

            <p className="text-xs text-[#6F687A] mt-0.5">
              {examsCompleted === 0 ? "No active mock in progress" : "Verified submissions"}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E8E2EF] flex items-center justify-between text-[11px] text-[#6F687A]">
            <span>Scheduled: 2 Tests</span>
            <span className="text-emerald-600 font-bold">Ready</span>
          </div>
        </div>

        {/* Card 3: Problems Solved */}
        <div className="bg-white rounded-2xl border border-[#E8E2EF] p-4 flex flex-col justify-between card-hover-shadow">
          <div>
            <div className="flex items-center justify-between text-xs text-[#6F687A] mb-1">
              <span className="font-bold">Problems Solved</span>
              <div className="w-7 h-7 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF] flex items-center justify-center text-[#5425A8]">
                <Code2 className="w-3.5 h-3.5" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 my-1">
              <span className="text-2xl font-black text-[#211B2B]">{animatedProblems}</span>
              <span className="text-[11px] font-medium text-[#6F687A]">solved</span>
            </div>

            <p className="text-xs text-[#6F687A] mt-0.5">
              {problemsSolved > 0 ? "Live tests passing" : "Start daily practice"}
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E8E2EF] flex items-center justify-between text-[11px] text-[#6F687A] font-semibold">
            <span className="text-emerald-600">Easy ({Math.max(1, problemsSolved)})</span>
            <span className="text-amber-600">Med (0)</span>
            <span className="text-rose-600">Hard (0)</span>
          </div>
        </div>

        {/* Card 4: Placement XP with Ring */}
        <div className="bg-white rounded-2xl border border-[#E8E2EF] p-4 flex flex-col justify-between card-hover-shadow">
          <div>
            <div className="flex items-center justify-between text-xs text-[#6F687A] mb-1">
              <span className="font-bold">Placement XP</span>
              <div className="w-7 h-7 rounded-xl bg-[#FFF8D6] border border-[#FFD84D]/40 flex items-center justify-center text-[#92400E]">
                <Zap className="w-3.5 h-3.5 fill-[#FFD84D] text-[#92400E]" />
              </div>
            </div>
            
            <div className="flex items-baseline gap-2 my-1">
              <span className="text-2xl font-black text-[#5425A8]">{animatedXp} XP</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#F3EDFF] text-[#5425A8] border border-[#5425A8]/20">
                {levelName}
              </span>
            </div>

            <p className="text-xs text-[#6F687A] mt-0.5">
              {progressPercent}% towards next rank
            </p>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E8E2EF]">
            <div className="w-full h-2 rounded-full bg-[#E8E2EF] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FFD84D] to-[#F2C836] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(progressPercent, 5)}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
