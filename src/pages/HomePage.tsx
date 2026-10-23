import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { RecruiterMarquee } from '../components/home/RecruiterMarquee';
import { AnxietyTicker } from '../components/home/AnxietyTicker';
import { FilterToolbar, FilterState } from '../components/home/FilterToolbar';
import { QuestionStream } from '../components/home/QuestionStream';
import { CodingLabModal } from '../components/home/CodingLabModal';
import { CareerTracks } from '../components/home/CareerTracks';
import { CertificationsSection } from '../components/home/CertificationsSection';
import { Leaderboard } from '../components/home/Leaderboard';
import { PricingGrid } from '../components/home/PricingGrid';
import { DailyPath } from '../components/home/DailyPath';
import { InstitutionalBanner } from '../components/home/InstitutionalBanner';
import { MOCK_QUESTIONS } from '../data/mockData';
import { Question } from '../types';
import { useToast } from '../context/ToastContext';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const INITIAL_FILTERS: FilterState = {
  company: 'All',
  packageRange: 'All',
  mode: 'All',
  difficulty: 'All',
  searchQuery: ''
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { addToast } = useToast();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [solvedQuestionIds, setSolvedQuestionIds] = useState<Set<string>>(new Set(['q-102']));

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    addToast({
      type: 'info',
      title: 'Filters Reset',
      description: 'Showing all curated placement questions.'
    });
  };

  // Filter logic
  const filteredQuestions = MOCK_QUESTIONS.filter((q) => {
    if (filters.company !== 'All' && q.company !== filters.company) return false;
    if (filters.packageRange !== 'All' && q.packageCategory !== filters.packageRange) return false;
    if (filters.difficulty !== 'All' && q.difficulty !== filters.difficulty) return false;
    if (filters.mode === 'Core Coding' && q.format !== 'Coding') return false;
    if (filters.mode === 'MCQ & Tech' && q.format !== 'MCQ') return false;
    if (filters.mode === 'Aptitude' && !q.topicTags.includes('Aptitude')) return false;
    if (filters.mode === 'System Design' && !q.topicTags.includes('System Design')) return false;

    if (filters.searchQuery.trim()) {
      const qText = filters.searchQuery.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(qText);
      const matchTopic = q.topic.toLowerCase().includes(qText);
      const matchCompany = q.company.toLowerCase().includes(qText);
      const matchTags = q.topicTags.some((t) => t.toLowerCase().includes(qText));
      if (!matchTitle && !matchTopic && !matchCompany && !matchTags) return false;
    }

    return true;
  });

  const handleSurpriseMe = () => {
    const pool = filteredQuestions.length > 0 ? filteredQuestions : MOCK_QUESTIONS;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setSelectedQuestion(random);
    addToast({
      type: 'success',
      title: 'Surprise Question Picked',
      description: `Opened: "${random.title}" (${random.company})`
    });
  };

  const handleSuccessSolved = (qId: string) => {
    setSolvedQuestionIds((prev) => new Set([...prev, qId]));
  };

  const scrollToQuestions = () => {
    const el = document.getElementById('practice-stream');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. Spacious Hero Section */}
      <HeroSection
        onStartPracticing={scrollToQuestions}
        onExploreBundles={() => onNavigate('/bundles/infosys')}
        onApplyMou={() => onNavigate('/partner-mou')}
      />

      {/* 2. Recruiter Section */}
      <RecruiterMarquee />

      {/* 3. Student Preparation Challenges & Quick-Start Options */}
      <AnxietyTicker 
        onNavigateToTrack={() => scrollToQuestions()} 
      />

      {/* 4. Practice Filters and Well-Organized Question List */}
      <section className="py-16 sm:py-20 bg-[#FAF8FD] border-b border-[#E8E2EF]" id="practice-stream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#211B2B] tracking-tight">
              Targeted practice with <span className="text-[#5425A8]">granular filters</span>
            </h2>
            <p className="mt-2 text-sm text-[#6F687A]">
              Filter by company, salary package range, or difficulty. Launch in-browser code compilation on any card.
            </p>
          </div>

          <FilterToolbar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            onSurpriseMe={handleSurpriseMe}
            matchingCount={filteredQuestions.length}
            totalCount={MOCK_QUESTIONS.length}
          />

          <QuestionStream
            questions={filteredQuestions}
            solvedIds={solvedQuestionIds}
            onSelectQuestion={(q) => setSelectedQuestion(q)}
            onResetFilters={handleResetFilters}
          />

        </div>
      </section>

      {/* 5. Career Preparation Tracks */}
      <CareerTracks
        solvedCount={solvedQuestionIds.size}
        onNavigate={onNavigate}
      />

      {/* 6. Domain Certifications with QR Verifiable Credentials */}
      <CertificationsSection
        onNavigate={onNavigate}
      />

      {/* 7. Leaderboard Preview */}
      <Leaderboard />

      {/* 7. Pricing Comparison */}
      <PricingGrid
        onNavigate={onNavigate}
      />

      {/* 8. Daily Preparation Checklist */}
      <DailyPath
        onStartTaskPractice={() => scrollToQuestions()}
      />

      {/* 9. Institutional Analytics and Enquiry CTA */}
      <InstitutionalBanner
        onNavigate={onNavigate}
      />

      {/* Live Coding Lab / Practice Modal */}
      <CodingLabModal
        question={selectedQuestion}
        isOpen={!!selectedQuestion}
        onClose={() => setSelectedQuestion(null)}
        onSuccessSolved={handleSuccessSolved}
      />

    </div>
  );
};
