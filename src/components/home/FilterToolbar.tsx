import React, { useState } from 'react';
import { 
  RotateCcw, 
  Dices, 
  Search,
  SlidersHorizontal,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Button } from '../common/Button';
import { CompanyTag, PackageRange, PrepMode, Difficulty } from '../../types';

export interface FilterState {
  company: CompanyTag | 'All';
  packageRange: PackageRange;
  mode: PrepMode;
  difficulty: Difficulty | 'All';
  searchQuery: string;
}

interface FilterToolbarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  onSurpriseMe: () => void;
  matchingCount: number;
  totalCount: number;
}

const COMPANIES: (CompanyTag | 'All')[] = [
  'All',
  'TCS',
  'Infosys',
  'Accenture',
  'Microsoft',
  'Amazon',
  'Google',
  'Wipro',
  'Cognizant'
];

const PACKAGES: PackageRange[] = [
  'All',
  '< 4 LPA',
  '4 - 7 LPA',
  '7 - 12 LPA',
  '12 - 20 LPA',
  '20+ LPA (Super Dream)'
];

const MODES: PrepMode[] = [
  'All',
  'Core Coding',
  'Aptitude',
  'MCQ & Tech',
  'System Design'
];

const DIFFICULTIES: (Difficulty | 'All')[] = [
  'All',
  'Easy',
  'Medium',
  'Hard'
];

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  onFilterChange,
  onReset,
  onSurpriseMe,
  matchingCount,
  totalCount
}) => {
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  const [isDiceRolling, setIsDiceRolling] = useState(false);

  // Count active secondary filters
  const activeSecondaryCount = [
    filters.packageRange !== 'All',
    filters.mode !== 'All',
    filters.difficulty !== 'All'
  ].filter(Boolean).length;

  const handleRollDice = () => {
    setIsDiceRolling(true);
    setTimeout(() => setIsDiceRolling(false), 600);
    onSurpriseMe();
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E8E2EF] p-4 sm:p-5 shadow-xs mb-6 card-hover-shadow">
      
      {/* Primary Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3.5">
        
        {/* Expanding Search Input with Focus Glow */}
        <div className="relative w-full md:flex-1 group">
          <Search className="w-4 h-4 text-[#706879] group-focus-within:text-[#5425A8] absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200" />
          <input
            type="text"
            placeholder="Search questions, companies, algorithms (e.g. Two Pointers, TCS)..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-[#E8E2EF] bg-[#FAF8FD] text-xs sm:text-sm text-[#211B2B] placeholder-[#706879] focus:outline-none focus:ring-2 focus:ring-[#5425A8]/20 focus:border-[#5425A8] focus:bg-white transition-all duration-300 shadow-2xs"
            aria-label="Search questions"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#706879] hover:text-[#211B2B] p-1 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Primary Filter: Company Quick Select */}
        <div className="w-full md:w-52 shrink-0">
          <select
            value={filters.company}
            onChange={(e) => onFilterChange({ company: e.target.value as CompanyTag | 'All' })}
            className="w-full px-3.5 py-2.5 rounded-2xl border border-[#E8E2EF] bg-white text-xs font-bold text-[#211B2B] focus:outline-none focus:ring-2 focus:ring-[#5425A8]/20 focus:border-[#5425A8] cursor-pointer shadow-2xs hover:border-[#5425A8]/40 transition-colors"
          >
            {COMPANIES.map((c) => (
              <option key={c} value={c}>{c === 'All' ? 'All Recruiters' : c}</option>
            ))}
          </select>
        </div>

        {/* Actions & More Filters Toggle */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
          <button
            onClick={() => setIsMoreFiltersOpen(!isMoreFiltersOpen)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer interactive-tap ${
              isMoreFiltersOpen || activeSecondaryCount > 0
                ? 'bg-[#F3EDFF] border-[#5425A8] text-[#5425A8] shadow-xs'
                : 'bg-white border-[#E8E2EF] text-[#211B2B] hover:bg-[#FAF8FD] hover:border-[#5425A8]/30'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeSecondaryCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#5425A8] text-white text-[10px] font-bold flex items-center justify-center animate-pop">
                {activeSecondaryCount}
              </span>
            )}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isMoreFiltersOpen ? 'rotate-180' : ''}`} />
          </button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRollDice}
            leftIcon={<Dices className={`w-3.5 h-3.5 transition-transform duration-500 ${isDiceRolling ? 'rotate-180 scale-125' : ''}`} />}
            className="font-bold interactive-tap"
          >
            Surprise Me
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-[#706879] group-hover:-rotate-90 transition-transform duration-300" />}
            className="interactive-tap font-semibold"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Collapsible Secondary Filters Panel */}
      {isMoreFiltersOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 mt-4 border-t border-[#E8E2EF] spring-dropdown">
          
          {/* Package Range */}
          <div>
            <label className="block text-[11px] font-bold text-[#6F687A] uppercase tracking-wider mb-1.5">
              Salary Package Tier
            </label>
            <select
              value={filters.packageRange}
              onChange={(e) => onFilterChange({ packageRange: e.target.value as PackageRange })}
              className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] bg-white text-xs font-semibold text-[#211B2B] focus:outline-none focus:ring-2 focus:ring-[#5425A8]/20 focus:border-[#5425A8] cursor-pointer shadow-2xs hover:border-[#5425A8]/40 transition-colors"
            >
              {PACKAGES.map((p) => (
                <option key={p} value={p}>{p === 'All' ? 'All Packages (3–20+ LPA)' : p}</option>
              ))}
            </select>
          </div>

          {/* Prep Mode */}
          <div>
            <label className="block text-[11px] font-bold text-[#6F687A] uppercase tracking-wider mb-1.5">
              Assessment Format
            </label>
            <select
              value={filters.mode}
              onChange={(e) => onFilterChange({ mode: e.target.value as PrepMode })}
              className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] bg-white text-xs font-semibold text-[#211B2B] focus:outline-none focus:ring-2 focus:ring-[#5425A8]/20 focus:border-[#5425A8] cursor-pointer shadow-2xs hover:border-[#5425A8]/40 transition-colors"
            >
              {MODES.map((m) => (
                <option key={m} value={m}>{m === 'All' ? 'All Formats' : m}</option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-[11px] font-bold text-[#6F687A] uppercase tracking-wider mb-1.5">
              Difficulty
            </label>
            <select
              value={filters.difficulty}
              onChange={(e) => onFilterChange({ difficulty: e.target.value as Difficulty | 'All' })}
              className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] bg-white text-xs font-semibold text-[#211B2B] focus:outline-none focus:ring-2 focus:ring-[#5425A8]/20 focus:border-[#5425A8] cursor-pointer shadow-2xs hover:border-[#5425A8]/40 transition-colors"
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>{d === 'All' ? 'All Difficulties' : d}</option>
              ))}
            </select>
          </div>

        </div>
      )}

      {/* Results Counter Strip */}
      <div className="flex items-center justify-between text-xs text-[#6F687A] pt-3 mt-3 border-t border-[#E8E2EF]">
        <span>Showing <strong className="text-[#211B2B]">{matchingCount}</strong> of {totalCount} practice questions</span>
        <span className="text-[11px] text-[#5425A8] font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#FFD84D] fill-[#FFD84D]" />
          <span>Click any question to view blueprint</span>
        </span>
      </div>

    </div>
  );
};
