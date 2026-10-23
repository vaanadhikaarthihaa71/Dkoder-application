import React, { useState } from 'react';
import { STUDENT_RANKINGS } from '../../data/mockData';
import { 
  Trophy, 
  Flame, 
  Search, 
  Crown,
  ChevronDown
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'xp' | 'active' | 'hard'>('xp');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState('All');
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

  const collegesList = ['All', 'Anna University', 'VIT Vellore', 'PSG College', 'SRM', 'NIT Trichy', 'BITS Pilani'];

  const filteredStudents = STUDENT_RANKINGS.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.college.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCollege = 
      selectedCollege === 'All' || 
      student.college.toLowerCase().includes(selectedCollege.toLowerCase());

    return matchesSearch && matchesCollege;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (activeTab === 'xp') return b.xp - a.xp;
    if (activeTab === 'active') return b.streakDays - a.streakDays;
    if (activeTab === 'hard') return b.hardSolved - a.hardSolved;
    return a.rank - b.rank;
  });

  const topThree = sortedStudents.slice(0, 3);

  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>();

  const toggleExpand = (id: string) => {
    setExpandedStudentId((prev) => (prev === id ? null : id));
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-16 sm:py-20 bg-white border-b border-[#E8E2EF] transition-all duration-700 ${
        isVisible ? 'reveal-visible' : 'reveal-init'
      }`} 
      id="leaderboard"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EDFF] text-[#5425A8] text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Campus Leaderboard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#211B2B] tracking-tight">
            Peer benchmarking and <span className="text-[#5425A8]">consistency streaks</span>
          </h2>
          <p className="mt-2 text-sm text-[#6F687A]">
            Compare solving volume and consistency across engineering institutions.
          </p>
        </div>

        {/* Clean Top-3 Podium with 3D Illustration */}
        {topThree.length >= 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10">
            
            {/* Left: 3D Championship Trophy Art (Span 5) */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FAF8FD] to-[#F1E9FF] border border-[#E8E2EF] p-2.5 shadow-sm group">
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xs">
                <img
                  src="/images/leaderboard-podium.jpg"
                  alt="DKODER 3D Coding Championship Podium with Golden Trophy and Robot Mascot"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#E8E2EF] text-[10px] font-bold text-[#5425A8] shadow-xs flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-[#FFD84D] fill-[#FFD84D]" />
                  <span>Campus Hall of Fame</span>
                </div>
              </div>
            </div>

            {/* Right: 3 Tiered Cards (Span 7) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5 items-end">
              
              {/* Rank 2 (Silver) */}
              <div className="bg-[#FAF8FD] rounded-2xl border border-[#E8E2EF] p-4 text-center order-2 sm:order-1">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-[#211B2B] font-bold flex items-center justify-center mx-auto mb-2 text-xs border border-slate-300">
                  🥈 #2
                </div>
                <h4 className="font-bold text-sm text-[#211B2B]">{topThree[1].name}</h4>
                <p className="text-[11px] text-[#706879] line-clamp-1">{topThree[1].college}</p>
                <div className="mt-2.5 pt-2 border-t border-[#E8E2EF] flex justify-around text-xs font-semibold text-[#211B2B]">
                  <span className="text-[#92400E]">{topThree[1].streakDays}d streak</span>
                  <span className="text-[#5425A8]">{topThree[1].xp.toLocaleString()} XP</span>
                </div>
              </div>

              {/* Rank 1 (Gold) */}
              <div className="bg-white rounded-2xl border-2 border-[#FFD84D] p-5 text-center shadow-md order-1 sm:order-2 relative -translate-y-1 sm:-translate-y-2">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#5425A8] text-[#FFD84D] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Crown className="w-3 h-3 text-[#FFD84D]" />
                  <span>Top Solver</span>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#FFD84D] text-[#211B2B] font-black flex items-center justify-center mx-auto mb-2 text-base shadow-xs mt-1">
                  🥇 #1
                </div>
                <h4 className="font-extrabold text-base text-[#211B2B]">{topThree[0].name}</h4>
                <p className="text-xs text-[#706879] line-clamp-1">{topThree[0].college}</p>
                <div className="mt-3 pt-2.5 border-t border-[#E8E2EF] flex justify-around text-xs font-bold text-[#211B2B]">
                  <span className="text-[#92400E]">{topThree[0].streakDays} Days</span>
                  <span className="text-[#5425A8]">{topThree[0].xp.toLocaleString()} XP</span>
                </div>
              </div>

              {/* Rank 3 (Bronze) */}
              <div className="bg-[#FAF8FD] rounded-2xl border border-[#E8E2EF] p-4 text-center order-3">
                <div className="w-12 h-12 rounded-full bg-[#F1E9FF] text-[#5425A8] font-bold flex items-center justify-center mx-auto mb-2 text-xs border border-purple-200">
                  🥉 #3
                </div>
                <h4 className="font-bold text-sm text-[#211B2B]">{topThree[2].name}</h4>
                <p className="text-[11px] text-[#706879] line-clamp-1">{topThree[2].college}</p>
                <div className="mt-2.5 pt-2 border-t border-[#E8E2EF] flex justify-around text-xs font-semibold text-[#211B2B]">
                  <span className="text-[#92400E]">{topThree[2].streakDays}d streak</span>
                  <span className="text-[#5425A8]">{topThree[2].xp.toLocaleString()} XP</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Filters Bar: Tabs & Search */}
        <div className="bg-[#FAF8FD] rounded-xl border border-[#E8E2EF] p-3 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#E8E2EF] w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('xp')}
              className={`flex-1 sm:flex-none px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'xp' ? 'bg-[#5425A8] text-white font-semibold' : 'text-[#6F687A] hover:text-[#211B2B]'
              }`}
            >
              XP Leaders
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 sm:flex-none px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'active' ? 'bg-[#5425A8] text-white font-semibold' : 'text-[#6F687A] hover:text-[#211B2B]'
              }`}
            >
              Most Active
            </button>
            <button
              onClick={() => setActiveTab('hard')}
              className={`flex-1 sm:flex-none px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'hard' ? 'bg-[#5425A8] text-white font-semibold' : 'text-[#6F687A] hover:text-[#211B2B]'
              }`}
            >
              Hard Solvers
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-[#6F687A] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student or college..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 rounded-lg border border-[#E8E2EF] bg-white text-xs text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
              />
            </div>

            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-[#E8E2EF] text-xs font-medium text-[#211B2B] bg-white focus:outline-none focus:ring-1 focus:ring-[#5425A8] cursor-pointer"
            >
              {collegesList.map((col) => (
                <option key={col} value={col}>{col === 'All' ? 'All Colleges' : col}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Ranking Table with Progressive Disclosure */}
        <div className="bg-white rounded-xl border border-[#E8E2EF] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8FD] text-[#6F687A] uppercase text-[10px] font-semibold tracking-wider border-b border-[#E8E2EF]">
                <tr>
                  <th className="py-2.5 px-4 w-12 text-center">Rank</th>
                  <th className="py-2.5 px-4">Student</th>
                  <th className="py-2.5 px-4 text-right">Placement XP</th>
                  <th className="py-2.5 px-4 text-center w-24">Breakdown</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2EF]">
                {sortedStudents.map((student, idx) => {
                  const isExpanded = expandedStudentId === student.id;
                  return (
                    <React.Fragment key={student.id}>
                      <tr 
                        onClick={() => toggleExpand(student.id)}
                        className={`hover:bg-[#FAF8FD] transition-colors cursor-pointer ${isExpanded ? 'bg-[#FAF8FD]/80' : ''}`}
                      >
                        <td className="py-3 px-4 font-bold text-[#211B2B] text-center">
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={student.avatarUrl}
                              alt={student.name}
                              className="w-7 h-7 rounded-full object-cover border border-[#E8E2EF]"
                            />
                            <div>
                              <div className="font-semibold text-[#211B2B] text-xs flex items-center gap-1.5">
                                <span>{student.name}</span>
                                {student.badge && (
                                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-medium bg-[#F3EDFF] text-[#5425A8]">
                                    {student.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#706879] line-clamp-1">{student.college}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="font-bold text-[#5425A8] text-xs">
                            {student.xp.toLocaleString()} XP
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(student.id);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#706879] hover:text-[#5425A8] px-2 py-1 rounded hover:bg-white border border-transparent hover:border-[#E8E2EF] transition-all cursor-pointer"
                            aria-expanded={isExpanded}
                          >
                            <span>{isExpanded ? 'Hide' : 'Stats'}</span>
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#5425A8]' : ''}`} />
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Details Panel */}
                      {isExpanded && (
                        <tr className="bg-[#FAF8FD]/90 border-b border-[#E8E2EF]">
                          <td colSpan={4} className="p-3 sm:p-4">
                            <div className="bg-white rounded-xl border border-[#E8E2EF] p-3 sm:p-4 shadow-2xs animate-fadeIn">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E2EF]">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-[#211B2B]">{student.name}’s Performance Record</span>
                                  {student.badge && (
                                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FFD84D]/30 text-[#92400E]">
                                      {student.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-[#706879]">
                                  Affiliation: <strong className="text-[#211B2B] font-medium">{student.college}</strong>
                                </span>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
                                <div className="p-2.5 rounded-lg bg-[#FAF8FD] border border-[#E8E2EF]">
                                  <div className="text-[10px] uppercase font-semibold text-[#706879]">Total Solved</div>
                                  <div className="text-sm font-bold text-[#211B2B] mt-0.5">{student.questionsSolved} Problems</div>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#FAF8FD] border border-[#E8E2EF]">
                                  <div className="text-[10px] uppercase font-semibold text-[#706879]">Daily Streak</div>
                                  <div className="text-sm font-bold text-[#92400E] flex items-center gap-1 mt-0.5">
                                    <Flame className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                                    <span>{student.streakDays} Consecutive Days</span>
                                  </div>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#FAF8FD] border border-[#E8E2EF]">
                                  <div className="text-[10px] uppercase font-semibold text-[#706879]">Hard DSA Solved</div>
                                  <div className="text-sm font-bold text-[#5425A8] mt-0.5">{student.hardSolved} Solved</div>
                                </div>
                                <div className="p-2.5 rounded-lg bg-[#FAF8FD] border border-[#E8E2EF]">
                                  <div className="text-[10px] uppercase font-semibold text-[#706879]">Cohort Rank</div>
                                  <div className="text-sm font-bold text-[#059669] mt-0.5">Top {Math.max(1, Math.round((idx + 1) * 2))}% Campus</div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-3">
          <span className="text-[11px] text-[#6F687A] italic">
            * Demo student data for platform benchmarking illustration.
          </span>
        </div>

      </div>
    </section>
  );
};
