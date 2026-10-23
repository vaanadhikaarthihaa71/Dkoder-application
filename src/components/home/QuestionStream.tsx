import React, { useState, useEffect } from 'react';
import { 
  Question 
} from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  FilterX, 
  ArrowUpDown,
  Code2,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface QuestionStreamProps {
  questions: Question[];
  solvedIds: Set<string>;
  onSelectQuestion: (question: Question) => void;
  onResetFilters: () => void;
}

export const QuestionStream: React.FC<QuestionStreamProps> = ({
  questions,
  solvedIds,
  onSelectQuestion,
  onResetFilters
}) => {
  const { addToast } = useToast();
  const [sortBy, setSortBy] = useState<'recommended' | 'time-asc' | 'solvers-desc'>('recommended');
  const [detailQuestion, setDetailQuestion] = useState<Question | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('dkoder_bookmarks');
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
    return new Set(['q-101']);
  });
  const [animatingBookmarkId, setAnimatingBookmarkId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('dkoder_bookmarks', JSON.stringify(Array.from(bookmarkedIds)));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  const handleToggleBookmark = (e: React.MouseEvent, q: Question) => {
    e.stopPropagation();
    setAnimatingBookmarkId(q.id);
    setTimeout(() => setAnimatingBookmarkId(null), 400);

    const isBookmarked = bookmarkedIds.has(q.id);
    const updated = new Set(bookmarkedIds);
    if (isBookmarked) {
      updated.delete(q.id);
      addToast({
        type: 'info',
        title: 'Bookmark Removed',
        description: `Removed "${q.title}" from saved questions.`
      });
    } else {
      updated.add(q.id);
      addToast({
        type: 'success',
        title: 'Question Bookmarked! 🔖',
        description: `Saved "${q.title}" for quick revision.`
      });
    }
    setBookmarkedIds(updated);
  };

  const handleCopyCodeSnippet = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setIsCopied(true);
    addToast({
      type: 'success',
      title: 'Copied to Clipboard! 📋',
      description: 'Starter code copied to your clipboard.'
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    if (sortBy === 'time-asc') return a.estimatedMinutes - b.estimatedMinutes;
    if (sortBy === 'solvers-desc') return b.solversCount - a.solversCount;
    return 0;
  });

  return (
    <div className="space-y-4">
      
      {/* Stream Controls */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base sm:text-lg font-bold text-[#211B2B] flex items-center gap-2">
          <span>Practice Question Vault</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F3EDFF] text-[#5425A8]">
            {sortedQuestions.length} Questions
          </span>
        </h3>

        {/* Sort Selector */}
        <div className="flex items-center gap-1.5 text-xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#6F687A]" />
          <span className="text-[#6F687A] hidden sm:inline font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-[#E8E2EF] bg-white text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8] cursor-pointer shadow-2xs"
          >
            <option value="recommended">Recommended</option>
            <option value="time-asc">Fastest First</option>
            <option value="solvers-desc">Most Solved</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {sortedQuestions.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-[#E8E2EF] p-12 text-center max-w-md mx-auto space-y-4 animate-word">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF8FD] text-[#6F687A] flex items-center justify-center mx-auto border border-[#E8E2EF]">
            <FilterX className="w-6 h-6 text-[#5425A8]" />
          </div>
          <div>
            <h4 className="text-base font-bold text-[#211B2B]">No Matching Recruiter Questions</h4>
            <p className="text-xs text-[#6F687A] mt-1 leading-relaxed">
              No questions matched your current filter criteria. Reset filters or choose another company to see verified placement problems.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={onResetFilters}
            className="font-bold interactive-tap"
          >
            Reset All Filters
          </Button>
        </div>
      ) : (
        /* Question Cards Grid with Staggered Transition */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {sortedQuestions.map((q, idx) => {
            const isSolved = solvedIds.has(q.id);
            const isBookmarked = bookmarkedIds.has(q.id);
            const isAnimating = animatingBookmarkId === q.id;

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl border p-4 flex flex-col justify-between transition-all duration-200 group card-hover-shadow relative ${
                  isSolved
                    ? 'border-emerald-300 bg-[#FAFDFB]'
                    : 'border-[#E8E2EF] hover:border-[#5425A8]'
                }`}
                style={{ animationDelay: `${Math.min(idx * 40, 320)}ms` }}
              >
                <div>
                  {/* Top Row: Difficulty, Format, Company, Topic & Bookmark */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <Badge
                        variant={
                          q.difficulty === 'Easy' ? 'green' : q.difficulty === 'Medium' ? 'amber' : 'purple'
                        }
                        size="sm"
                      >
                        {q.difficulty}
                      </Badge>
                      <Badge variant="outline" size="sm">{q.format}</Badge>
                      <span className="text-[11px] font-bold text-[#5425A8] bg-[#F3EDFF] px-2 py-0.5 rounded-md border border-purple-100">
                        {q.company}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-[#6F687A] font-semibold hidden sm:inline mr-1">
                        {q.topic}
                      </span>

                      {/* Interactive Bookmark / Favorite Icon Button with Pop animation */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleBookmark(e, q)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isAnimating ? 'animate-pop' : ''
                        } ${
                          isBookmarked 
                            ? 'bg-[#FFF8D6] border-[#FFD84D] text-[#92400E]' 
                            : 'bg-white border-transparent hover:border-[#E8E2EF] text-[#948B9E] hover:text-[#5425A8]'
                        }`}
                        title={isBookmarked ? "Remove Bookmark" : "Bookmark Question"}
                        aria-label="Bookmark question"
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-3.5 h-3.5 fill-[#FFD84D] text-[#92400E]" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Question Title (Clickable for Detail View) */}
                  <h4 
                    onClick={() => setDetailQuestion(q)}
                    className="text-sm font-bold text-[#211B2B] line-clamp-1 mb-2 group-hover:text-[#5425A8] transition-colors cursor-pointer"
                  >
                    {q.title}
                  </h4>
                </div>

                {/* Footer Actions: Details & Start Practising */}
                <div className="pt-2.5 border-t border-[#E8E2EF] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setDetailQuestion(q)}
                    className="text-[11px] font-bold text-[#6F687A] hover:text-[#5425A8] transition-colors flex items-center gap-1 cursor-pointer link-underline-hover"
                  >
                    <span>View Blueprint</span>
                  </button>

                  <Button
                    variant={isSolved ? 'outline' : 'primary'}
                    size="sm"
                    onClick={() => onSelectQuestion(q)}
                    rightIcon={isSolved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
                    className="font-bold interactive-tap"
                  >
                    {isSolved ? 'Review Code' : 'Start Practising'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Progressive Disclosure Question Detail Modal */}
      {detailQuestion && (
        <Modal
          isOpen={!!detailQuestion}
          onClose={() => setDetailQuestion(null)}
          title={
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#211B2B]">{detailQuestion.title}</span>
              <Badge variant={detailQuestion.difficulty === 'Easy' ? 'green' : detailQuestion.difficulty === 'Medium' ? 'amber' : 'purple'} size="sm">
                {detailQuestion.difficulty}
              </Badge>
            </div>
          }
          subtitle={`${detailQuestion.company} Pattern • ${detailQuestion.packageCategory}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            
            {/* Meta Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#6F687A] p-3 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF]">
              <span className="flex items-center gap-1 font-semibold text-[#211B2B]">
                <Clock className="w-3.5 h-3.5 text-[#5425A8]" />
                ~{detailQuestion.estimatedMinutes} mins
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#211B2B]">
                <Users className="w-3.5 h-3.5 text-[#5425A8]" />
                {detailQuestion.solversCount.toLocaleString()} candidates solved
              </span>
              <span className="flex items-center gap-1 font-bold text-[#5425A8]">
                <Code2 className="w-3.5 h-3.5" />
                Format: {detailQuestion.format}
              </span>
            </div>

            {/* Description */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6F687A] mb-1.5">
                Problem Statement:
              </div>
              <p className="text-sm text-[#211B2B] leading-relaxed bg-white p-3.5 rounded-xl border border-[#E8E2EF]">
                {detailQuestion.description}
              </p>
            </div>

            {/* Code / Question Sandbox Preview with Copy Button */}
            <div className="p-3.5 rounded-xl bg-[#211B2B] text-emerald-400 font-mono text-xs border border-[#211B2B]/20 relative">
              <div className="flex items-center justify-between text-[11px] text-purple-300 font-sans mb-1.5 pb-1 border-b border-white/10">
                <span>{detailQuestion.format === 'Coding' ? 'Live Sandbox Environment' : 'Concept Evaluator'}</span>
                
                {/* Copy Button with Morphing Check Icon */}
                <button
                  type="button"
                  onClick={() => handleCopyCodeSnippet(
                    detailQuestion.starterCode?.['python'] || `def solve_${detailQuestion.id.replace(/-/g, '_')}(nums):\n    pass`
                  )}
                  className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[#FFF8D6] transition-colors cursor-pointer text-[10px] font-sans font-bold"
                  title="Copy Starter Code"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <code>
                {detailQuestion.format === 'Coding'
                  ? `def solve_${detailQuestion.id.replace(/-/g, '_')}(nums):\n    # Write your optimal O(N) solution here\n    pass`
                  : `Q: Which optimal data structure achieves O(1) average lookup?\n> [A] Hash Table   [B] Binary Search Tree`}
              </code>
            </div>

            {/* Topic Tags */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#6F687A] mb-1.5">
                Tagged Concepts:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {detailQuestion.topicTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#F3EDFF] text-[#5425A8] border border-purple-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8E2EF]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDetailQuestion(null)}
                className="font-semibold interactive-tap"
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const q = detailQuestion;
                  setDetailQuestion(null);
                  onSelectQuestion(q);
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                className="font-bold interactive-tap"
              >
                Launch in Coding Lab
              </Button>
            </div>

          </div>
        </Modal>
      )}

      <div className="text-center pt-2">
        <p className="text-[11px] text-[#6F687A]">
          * Sample practice problems representative of verified corporate recruitment formats.
        </p>
      </div>

    </div>
  );
};
