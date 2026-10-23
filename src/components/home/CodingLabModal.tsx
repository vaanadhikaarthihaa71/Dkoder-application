import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Check, 
  Lightbulb,
  Sparkles,
  Trophy
} from 'lucide-react';
import { Question } from '../../types';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';
import confetti from 'canvas-confetti';

interface CodingLabModalProps {
  question: Question | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessSolved: (questionId: string) => void;
}

export const CodingLabModal: React.FC<CodingLabModalProps> = ({
  question,
  isOpen,
  onClose,
  onSuccessSolved
}) => {
  const { addToast } = useToast();
  const [selectedLang, setSelectedLang] = useState<'python' | 'java' | 'cpp'>('python');
  const [code, setCode] = useState('');
  const [selectedMcqOption, setSelectedMcqOption] = useState<string | null>(null);
  const [isMcqSubmitted, setIsMcqSubmitted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [outputConsole, setOutputConsole] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    if (question) {
      if (question.format === 'Coding' && question.starterCode) {
        setCode(question.starterCode[selectedLang] || question.starterCode['python'] || '# Write your solution here\n');
      }
      setSelectedMcqOption(null);
      setIsMcqSubmitted(false);
      setOutputConsole(null);
      setIsSolved(false);
    }
  }, [question, selectedLang]);

  if (!question) return null;

  const handleRunCode = () => {
    setIsRunning(true);
    setOutputConsole('Compiling solution against sample test cases...');
    
    setTimeout(() => {
      setIsRunning(false);
      setOutputConsole(
        `✓ Compilation successful (0.04s)\n✓ Test Case 1: PASSED (Expected: ${question.sampleOutput || 'Valid'}, Received: ${question.sampleOutput || 'Valid'})\n✓ Memory: 14.2 MB | Runtime: 28 ms`
      );
      addToast({
        type: 'info',
        title: 'Sample Tests Passed',
        description: 'Your solution matched sample outputs.'
      });
    }, 700);
  };

  const handleSubmitSolution = () => {
    setIsSubmitting(true);
    setOutputConsole('Evaluating against hidden recruiter test suite...');

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSolved(true);
      setOutputConsole(
        `🎉 VERDICT: ACCEPTED\n✓ 18/18 Hidden test cases passed\n✓ Runtime: 32 ms\n✓ Memory: 15.1 MB\n+50 XP recorded to your DKODER streak!`
      );
      
      confetti({
        particleCount: 50,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#FFD84D', '#5425A8', '#F3EDFF']
      });

      onSuccessSolved(question.id);
      addToast({
        type: 'success',
        title: 'Problem Solved! (+50 XP)',
        description: `"${question.title}" recorded in your local practice log.`
      });
    }, 1100);
  };

  const handleMcqSubmit = () => {
    if (!selectedMcqOption) return;
    setIsMcqSubmitted(true);
    const correctOpt = question.mcqOptions?.find(o => o.isCorrect);
    const isCorrect = correctOpt?.id === selectedMcqOption;

    if (isCorrect) {
      setIsSolved(true);
      confetti({
        particleCount: 40,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#FFD84D', '#5425A8', '#F3EDFF']
      });
      onSuccessSolved(question.id);
      addToast({
        type: 'success',
        title: 'Correct Answer! (+30 XP)',
        description: 'Answer validated successfully.'
      });
    } else {
      addToast({
        type: 'error',
        title: 'Incorrect Option',
        description: 'Check the explanation below to clarify the concept.'
      });
    }
  };

  const handleResetCode = () => {
    if (question.starterCode) {
      setCode(question.starterCode[selectedLang] || '');
      setOutputConsole(null);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex flex-wrap items-center gap-2">
          <Badge 
            variant={
              question.difficulty === 'Easy' ? 'green' : question.difficulty === 'Medium' ? 'amber' : 'purple'
            }
            size="sm"
          >
            {question.difficulty}
          </Badge>
          <Badge variant="outline" size="sm">{question.format}</Badge>
          <Badge variant="purple" size="sm">{question.company}</Badge>
          <span className="text-xs text-[#6F687A] flex items-center gap-1 ml-auto">
            <Clock className="w-3.5 h-3.5" />
            {question.estimatedMinutes} mins
          </span>
        </div>
      }
      subtitle={question.title}
      maxWidth="4xl"
    >
      <div className="space-y-4">
        
        {/* Topic Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-semibold text-[#6F687A]">Topics:</span>
          {question.topicTags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-[#FAF8FD] text-[#211B2B] border border-[#E8E2EF] text-[11px] font-medium">
              {tag}
            </span>
          ))}
          <span className="ml-auto font-bold text-[#5425A8] bg-[#F3EDFF] px-2.5 py-0.5 rounded-md text-[11px]">
            Target: {question.packageCategory}
          </span>
        </div>

        {/* Problem Description */}
        <div className="p-4 rounded-2xl bg-[#FAF8FD] border border-[#E8E2EF]">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#6F687A] mb-1.5">
            Problem Statement
          </div>
          <p className="text-xs sm:text-sm text-[#211B2B] leading-relaxed">
            {question.description}
          </p>

          {question.sampleInput && (
            <div className="mt-3 pt-3 border-t border-[#E8E2EF] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white border border-[#E8E2EF]">
                <span className="text-[10px] text-[#6F687A] uppercase block font-bold">Sample Input:</span>
                <span className="text-[#211B2B] font-semibold">{question.sampleInput}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E8E2EF]">
                <span className="text-[10px] text-[#6F687A] uppercase block font-bold">Expected Output:</span>
                <span className="text-[#5425A8] font-bold">{question.sampleOutput}</span>
              </div>
            </div>
          )}
        </div>

        {/* Coding Mode */}
        {question.format === 'Coding' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between bg-[#211B2B] text-white px-3.5 py-2 rounded-t-xl text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#FFD84D]" />
                <span className="font-bold">Compiler:</span>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value as any)}
                  className="bg-[#371275] text-[#FFD84D] text-xs font-bold px-2 py-0.5 rounded-lg border border-[#5425A8] cursor-pointer"
                >
                  <option value="python">Python 3.11</option>
                  <option value="java">Java 17</option>
                  <option value="cpp">C++ 20</option>
                </select>
              </div>

              <button
                onClick={handleResetCode}
                className="text-[11px] text-[#E8E2EF] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Starter Code</span>
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={8}
              className="w-full font-mono text-xs bg-[#211B2B] text-[#FFF8D6] p-3.5 rounded-b-xl border border-[#371275] focus:outline-none focus:ring-1 focus:ring-[#FFD84D] resize-y leading-relaxed"
              spellCheck={false}
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRunCode}
                  isLoading={isRunning}
                  leftIcon={<Play className="w-3 h-3 text-[#5425A8]" />}
                  className="interactive-tap font-semibold"
                >
                  Run Sample Tests
                </Button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSubmitSolution}
                  isLoading={isSubmitting}
                  leftIcon={<Send className="w-3 h-3" />}
                  className="interactive-tap font-bold"
                >
                  Submit Solution
                </Button>
              </div>

              {isSolved && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 animate-word">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Accepted! +50 Placement XP</span>
                </div>
              )}
            </div>

            {outputConsole && (
              <div className="p-3.5 rounded-xl bg-[#211B2B] text-xs font-mono text-[#F3EDFF] border border-[#5425A8] animate-word">
                <div className="text-[10px] uppercase font-bold text-[#FFD84D] mb-1 flex items-center justify-between">
                  <span>Execution Output</span>
                  <span className="text-white/60">DKODER Sandbox Kernel</span>
                </div>
                <pre className="whitespace-pre-wrap">{outputConsole}</pre>
              </div>
            )}
          </div>
        )}

        {/* MCQ Mode */}
        {question.format === 'MCQ' && question.mcqOptions && (
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#6F687A] uppercase tracking-wider">
              Select Answer:
            </div>

            <div className="space-y-2">
              {question.mcqOptions.map((opt) => {
                const isSelected = selectedMcqOption === opt.id;
                let optStyle = 'border-[#E8E2EF] hover:border-[#5425A8] bg-white';
                
                if (isMcqSubmitted) {
                  if (opt.isCorrect) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                  } else if (isSelected && !opt.isCorrect) {
                    optStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                  }
                } else if (isSelected) {
                  optStyle = 'border-[#5425A8] bg-[#F3EDFF] text-[#211B2B] font-bold';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => !isMcqSubmitted && setSelectedMcqOption(opt.id)}
                    disabled={isMcqSubmitted}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-start gap-2.5 cursor-pointer transition-all interactive-tap ${optStyle}`}
                  >
                    <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      {isMcqSubmitted && opt.isCorrect ? <Check className="w-3 h-3 text-emerald-600" /> : opt.id.slice(-1).toUpperCase()}
                    </span>
                    <span className="font-mono flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {!isMcqSubmitted ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleMcqSubmit}
                disabled={!selectedMcqOption}
                className="font-bold interactive-tap"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsMcqSubmitted(false);
                  setSelectedMcqOption(null);
                }}
                className="interactive-tap font-semibold"
              >
                Try Again
              </Button>
            )}
          </div>
        )}

        {/* Editorial Explanation with Kody Insight */}
        {(isSolved || isMcqSubmitted) && (
          <div className="p-4 rounded-2xl bg-[#FFF8D6] border border-[#FFD84D]/60 text-xs text-[#211B2B] space-y-1.5 animate-word">
            <div className="font-bold text-[#92400E] flex items-center justify-between uppercase tracking-wide text-[11px]">
              <span className="flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-[#5425A8]" />
                <span>Editorial Notes & Recruiter Expectation</span>
              </span>
              <span className="font-bold text-[#5425A8] bg-white px-2 py-0.5 rounded-md border border-[#FFD84D]/40">
                Verified Syllabus
              </span>
            </div>
            <p className="leading-relaxed font-medium">
              {question.explanation}
            </p>
          </div>
        )}

      </div>
    </Modal>
  );
};
