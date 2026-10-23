import React, { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  Users, 
  Award, 
  ArrowRight, 
  Timer,
  CheckCircle2,
  FolderGit2,
  FileText,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useToast } from '../context/ToastContext';
import { FINAL_YEAR_PROJECTS } from '../data/mockData';
import { FinalYearProjectTrack } from '../types';

interface HackathonsPageProps {
  onNavigate: (path: string) => void;
}

export const HackathonsPage: React.FC<HackathonsPageProps> = ({ onNavigate }) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'contests' | 'projects'>('contests');
  const [selectedContest, setSelectedContest] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<FinalYearProjectTrack | null>(null);
  const [teamName, setTeamName] = useState('');
  const [collegeName, setCollegeName] = useState('');

  const contests = [
    {
      id: 'c-1',
      title: 'DKODER National Collegiate Code Sprint 2026',
      tagline: 'All-India Inter-College Algorithmic Championship',
      startsIn: '2 Days 14 Hours',
      duration: '3 Hours (4 Coding Problems)',
      prizes: '₹1,50,000 Prize Pool + Fast-track Interviews',
      participants: '3,840 Students Registered',
      category: 'National Open',
      difficulty: 'Medium to Hard',
      topics: ['Dynamic Programming', 'Graph BFS/DFS', 'Sliding Window', 'Trie']
    },
    {
      id: 'c-2',
      title: 'TCS NQT & InfyTQ Rapid-Fire Mock Contest',
      tagline: 'Strict 90-minute timed simulation matching 2026 recruiter patterns',
      startsIn: '5 Days 08 Hours',
      duration: '90 Minutes (60 MCQs + 2 Code)',
      prizes: 'DKODER Gold Pass Subscriptions + Detailed AI Report',
      participants: '2,120 Students Registered',
      category: 'Service Track',
      difficulty: 'Easy to Medium',
      topics: ['Arrays & Two Pointers', 'Quantitative Aptitude', 'SQL Aggregates', 'Pseudo-code']
    },
    {
      id: 'c-3',
      title: 'Super Dream 20+ LPA Algorithmic Marathon',
      tagline: 'High-difficulty challenge for Big Tech aspirants (Google, Microsoft, Amazon)',
      startsIn: 'Next Weekend',
      duration: '4 Hours (5 Hard Problems)',
      prizes: '1-on-1 Mentorship with SDE-II Engineers + Direct Referrals',
      participants: '1,450 Students Registered',
      category: 'Super Dream',
      difficulty: 'Hard',
      topics: ['Segment Trees', 'Hard DP', 'System Design Scenarios', 'Graph Shortest Paths']
    }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !collegeName) {
      addToast({
        type: 'error',
        title: 'Missing Details',
        description: 'Please fill in your Team Name and College Name.'
      });
      return;
    }
    addToast({
      type: 'success',
      title: 'Registration Confirmed! 🎉',
      description: `Your team "${teamName}" is registered for the contest.`
    });
    setSelectedContest(null);
    setTeamName('');
    setCollegeName('');
  };

  return (
    <div className="py-12 bg-[#FAF8FD] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#6F687A] font-medium mb-6 flex items-center gap-1.5">
          <button onClick={() => onNavigate('/')} className="hover:text-[#211B2B]">Home</button>
          <span>/</span>
          <span className="text-[#211B2B] font-semibold">Hackathons & Contests</span>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E9FF] text-[#5425A8] text-xs font-semibold uppercase tracking-wider mb-2">
            <Trophy className="w-3.5 h-3.5" />
            <span>Collegiate Coding Contests</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#211B2B] tracking-tight">
            Campus Hackathons & <span className="text-[#5425A8]">Live Arena</span>
          </h1>
          <p className="mt-2 text-sm text-[#706879]">
            Compete with engineering peers across India. Benchmark your speed under real-time timed conditions.
          </p>
        </div>

        {/* 3D Hackathon Arena Visual Banner */}
        <div className="max-w-4xl mx-auto mb-10 relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FAF8FD] to-[#F1E9FF] border border-[#E8E2EF] p-2.5 shadow-md group">
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xs">
            <img
              src="/images/hackathon-arena.jpg"
              alt="DKODER 3D Collegiate Hackathon Arena with Live Timers, Prizes, and Coding Teams"
              className="w-full max-h-[380px] object-cover group-hover:scale-101 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E8E2EF] text-xs font-bold text-[#211B2B] shadow-md flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD84D] animate-ping" />
              <span>DKODER Hackathon Arena • Season 4 Live</span>
            </div>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('contests')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer interactive-tap ${
              activeTab === 'contests'
                ? 'bg-[#5425A8] text-white shadow-md'
                : 'bg-white text-[#6F687A] border border-[#E8E2EF] hover:bg-[#FAF8FD]'
            }`}
          >
            Live Hackathons & Arena Contests
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer interactive-tap ${
              activeTab === 'projects'
                ? 'bg-[#5425A8] text-white shadow-md'
                : 'bg-white text-[#6F687A] border border-[#E8E2EF] hover:bg-[#FAF8FD]'
            }`}
          >
            Final-Year Projects & Research Mentorship
          </button>
        </div>

        {/* Tab 1: Contests List */}
        {activeTab === 'contests' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {contests.map((contest) => (
              <div
                key={contest.id}
                className="bg-white rounded-2xl border border-[#E8E2EF] p-6 hover:border-[#5425A8] transition-all duration-150 shadow-xs"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#F3EDFF] text-[#5425A8] border border-[#E8E2EF]">
                        {contest.category}
                      </span>
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FFF8D6] text-[#211B2B] border border-[#FFD84D]/40">
                        {contest.difficulty}
                      </span>
                      <span className="text-xs text-[#6F687A] flex items-center gap-1">
                        <Timer className="w-3.5 h-3.5" />
                        Starts in {contest.startsIn}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#211B2B]">
                      {contest.title}
                    </h3>
                    <p className="text-xs text-[#6F687A] leading-relaxed">
                      {contest.tagline}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-[#211B2B]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#5425A8]" />
                        <span>Duration: <strong>{contest.duration}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#5425A8]" />
                        <span>{contest.participants}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:col-span-2 text-xs font-semibold text-[#5425A8]">
                        <Award className="w-3.5 h-3.5 text-[#FFD84D]" />
                        <span>Reward: {contest.prizes}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {contest.topics.map((t) => (
                        <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#FAF8FD] text-[#6F687A] border border-[#E8E2EF]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full lg:w-auto shrink-0 flex flex-col gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedContest(contest.title)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Register Team Free
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate('/')}
                    >
                      Practice Problems
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Final-Year Projects & Mentorship */}
        {activeTab === 'projects' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-[#F3EDFF] rounded-2xl border border-purple-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-extrabold text-[#5425A8] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFD84D]" />
                  <span>Capstone Engineering Project Guidance</span>
                </h3>
                <p className="text-xs text-[#6F687A] mt-1 max-w-xl">
                  Build production-grade projects that impress technical interviewers. Complete with IEEE format documentation, code review sprints, and Scopus/UGC paper publication guidance.
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('/partner-mou')}
                className="font-bold text-xs shrink-0"
              >
                Colleges MOU Enquiry
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {FINAL_YEAR_PROJECTS.map((proj) => (
                <div 
                  key={proj.id}
                  className="bg-white rounded-2xl border border-[#E8E2EF] p-5 flex flex-col justify-between card-hover-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[#5425A8] bg-[#F3EDFF] px-2 py-0.5 rounded-full">
                        {proj.domain}
                      </span>
                      <span className="text-[10px] font-bold text-[#211B2B] bg-[#FFF8D6] px-2 py-0.5 rounded-full border border-[#FFD84D]/40">
                        {proj.complexity}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-[#211B2B] mb-2 leading-snug">
                      {proj.title}
                    </h4>

                    <div className="space-y-1.5 my-3 text-[11px] text-[#6F687A]">
                      <div className="font-bold text-[#211B2B] text-[11px]">Milestones Included:</div>
                      {proj.milestones.slice(0, 3).map((m, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#5425A8] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{m}</span>
                        </div>
                      ))}
                    </div>

                    {proj.paperPublicationSupport && (
                      <div className="mt-2.5 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold flex items-center gap-1.5">
                        <FileText className="w-3 h-3 text-emerald-600" />
                        <span>Research Paper Support Included</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E8E2EF]">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => setSelectedProject(proj)}
                      className="text-xs font-bold bg-white interactive-tap"
                    >
                      Project Details & Code Plan →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Registration Modal */}
      {selectedContest && (
        <Modal
          isOpen={!!selectedContest}
          onClose={() => setSelectedContest(null)}
          title={`Register: ${selectedContest}`}
          subtitle="Inter-Collegiate Online Coding Contest"
          maxWidth="md"
        >
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                Candidate / Team Leader Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vaanadhi Kaarthihaa"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs sm:text-sm text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                College / Institution Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Anna University (CEG Campus), Chennai"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs sm:text-sm text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
              />
            </div>

            <div className="p-3 bg-[#FAF8FD] rounded-xl border border-[#E8E2EF] text-xs text-[#6F687A]">
              Rules: In-browser code editor only. Rankings based on automated test suite evaluation and execution time.
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8E2EF]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedContest(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Confirm Registration
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Final-Year Project Details Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          subtitle={`Domain: ${selectedProject.domain} • ${selectedProject.complexity}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div>
              <div className="font-bold text-[#211B2B] uppercase tracking-wider mb-2">
                4-Stage Milestone Roadmap:
              </div>
              <div className="space-y-2">
                {selectedProject.milestones.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF] flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#5425A8] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-[#211B2B] font-medium leading-relaxed">{m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="font-bold text-[#211B2B] uppercase tracking-wider mb-2">
                Capstone Deliverables:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.deliverables.map((d, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#E8E2EF] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-[#211B2B] font-semibold">{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-[#F3EDFF] rounded-xl border border-purple-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-[#5425A8]">Industry SDE Mentor Allocation</div>
                <div className="text-[11px] text-[#6F687A]">Weekly sprint check-in & code reviews for engineering batches</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white text-[#5425A8] font-bold text-[10px] border border-purple-200">
                Active Batch
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E8E2EF]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedProject(null);
                  onNavigate('/partner-mou');
                }}
              >
                Request College Allocation
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

