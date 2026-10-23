import React, { useState } from 'react';
import { CAREER_TRACKS } from '../../data/mockData';
import { CareerTrack } from '../../types';
import { 
  Check, 
  ArrowRight, 
  Code2, 
  PieChart,
  BookOpen,
  Sparkles,
  Award
} from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface CareerTracksProps {
  solvedCount: number;
  onNavigate: (path: string) => void;
}

export const CareerTracks: React.FC<CareerTracksProps> = ({ solvedCount, onNavigate }) => {
  const [selectedTrack, setSelectedTrack] = useState<CareerTrack | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section 
      ref={sectionRef}
      className={`py-16 sm:py-24 bg-[#FAF8FD] border-b border-[#E8E2EF] transition-all duration-700 ${
        isVisible ? 'reveal-visible' : 'reveal-init'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3EDFF] text-[#5425A8] text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD84D] fill-[#FFD84D]" />
            <span>Structured Career Pathways</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#211B2B] tracking-tight">
            Targeted preparation for <span className="text-[#5425A8]">every recruitment tier</span>
          </h2>
          <p className="mt-2 text-sm text-[#6F687A]">
            Structured pathways balancing aptitude, CS fundamentals, and timed coding rounds.
          </p>
        </div>

        {/* 3 Clean, Scannable Cards with Staggered Delays */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {CAREER_TRACKS.map((track, idx) => {
            const simulatedTotal = track.totalQuestions;
            const trackSolved = Math.min(simulatedTotal, Math.max(1, solvedCount * (idx === 0 ? 3 : idx === 1 ? 1 : 2)));
            const progressPercent = Math.min(100, Math.round((trackSolved / simulatedTotal) * 100));

            return (
              <div
                key={track.id}
                className={`bg-white rounded-3xl border border-[#E8E2EF] overflow-hidden flex flex-col justify-between card-hover-shadow group ${
                  idx === 0 ? 'stagger-1' : idx === 1 ? 'stagger-2' : 'stagger-3'
                }`}
              >
                <div>
                  {/* Track 3D Illustration Header */}
                  <div 
                    onClick={() => setSelectedTrack(track)}
                    className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#FAF8FD] border-b border-[#E8E2EF] cursor-pointer"
                  >
                    <img
                      src={
                        idx === 0 
                          ? '/images/track-service.jpg' 
                          : idx === 1 
                            ? '/images/track-super-dream.jpg' 
                            : '/images/track-fullstack.jpg'
                      }
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-[#211B2B] border border-[#E8E2EF] shadow-sm">
                      {track.packageRange}
                    </div>
                    <div className="absolute top-3.5 right-3.5 bg-[#5425A8]/95 text-white backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-bold">
                      {track.totalQuestions} Questions
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-3.5">
                    {/* Title & Subtitle */}
                    <div>
                      <h3 
                        onClick={() => setSelectedTrack(track)}
                        className="text-lg font-bold text-[#211B2B] group-hover:text-[#5425A8] transition-colors cursor-pointer"
                      >
                        {track.title}
                      </h3>
                      <p className="text-xs text-[#5425A8] font-bold mt-0.5">
                        {track.subtitle}
                      </p>
                    </div>

                    {/* Concise 1-sentence overview */}
                    <p className="text-xs text-[#6F687A] line-clamp-2 leading-relaxed">
                      {track.overview}
                    </p>

                    {/* Local Session Progress */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs text-[#6F687A] mb-1.5 font-bold">
                        <span>Preparation Progress</span>
                        <span className="text-[#5425A8]">{progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#E8E2EF] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#5425A8] to-[#FFD84D] rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card CTA: Explore Track Details */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 flex items-center gap-2">
                  <Button
                    variant={idx === 0 ? 'primary' : 'outline'}
                    size="sm"
                    fullWidth
                    onClick={() => setSelectedTrack(track)}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
                    className="font-bold interactive-tap"
                  >
                    Explore Track Syllabus
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Syllabus Detail Modal */}
        {selectedTrack && (
          <Modal
            isOpen={!!selectedTrack}
            onClose={() => setSelectedTrack(null)}
            title={selectedTrack.title}
            subtitle={`${selectedTrack.subtitle} • ${selectedTrack.packageRange}`}
            maxWidth="xl"
          >
            <div className="space-y-5">
              
              {/* Full Overview */}
              <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-[#E8E2EF]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6F687A] mb-1">
                  Track Blueprint & Overview
                </div>
                <p className="text-xs sm:text-sm text-[#211B2B] leading-relaxed">
                  {selectedTrack.overview}
                </p>
              </div>

              {/* Milestones / Core Focus Areas */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#6F687A] mb-2.5">
                  Core Modules & Placement Focus:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedTrack.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-white border border-[#E8E2EF] flex items-center gap-2.5 text-xs text-[#211B2B]"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-[10px] font-bold">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-semibold">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recruiter Patterns */}
              <div className="pt-2 border-t border-[#E8E2EF] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#6F687A]">
                  <span className="font-bold text-[#211B2B]">Target Recruiters:</span>
                  <span>{selectedTrack.targetCompanies.join(', ')}</span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedTrack(null);
                    onNavigate('/#practice-stream');
                  }}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="font-bold interactive-tap"
                >
                  Start Practicing
                </Button>
              </div>

            </div>
          </Modal>
        )}

      </div>
    </section>
  );
};
