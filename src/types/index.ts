export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type QuestionFormat = 'Coding' | 'MCQ' | 'Platform';

export type CompanyTag = 
  | 'TCS' 
  | 'Infosys' 
  | 'Accenture' 
  | 'Microsoft' 
  | 'Amazon' 
  | 'Google' 
  | 'Wipro' 
  | 'Cognizant'
  | 'HCL';

export type PackageRange = 
  | 'All' 
  | '< 4 LPA' 
  | '4 - 7 LPA' 
  | '7 - 12 LPA' 
  | '12 - 20 LPA' 
  | '20+ LPA (Super Dream)';

export type PrepMode = 
  | 'All' 
  | 'Core Coding' 
  | 'Aptitude' 
  | 'MCQ & Tech' 
  | 'System Design';

export interface Question {
  id: string;
  title: string;
  topic: string;
  topicTags: string[];
  format: QuestionFormat;
  difficulty: Difficulty;
  company: CompanyTag;
  packageCategory: PackageRange;
  estimatedMinutes: number;
  acceptanceRate: string;
  solversCount: number;
  description: string;
  sampleInput?: string;
  sampleOutput?: string;
  starterCode?: { [lang: string]: string };
  mcqOptions?: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export interface CareerTrack {
  id: string;
  title: string;
  subtitle: string;
  targetCompanies: string[];
  packageRange: string;
  totalQuestions: number;
  codingRatio: number; // percentage, e.g. 70
  mcqRatio: number; // percentage, e.g. 30
  skills: string[];
  overview: string;
  bundleUrl?: string;
  bundleName?: string;
  colorTheme: string;
}

export interface StudentRanking {
  id: string;
  rank: number;
  name: string;
  college: string;
  streakDays: number;
  xp: number;
  questionsSolved: number;
  hardSolved: number;
  avatarUrl: string;
  badge: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  annualPrice: number;
  dailyCost: number;
  targetAudience: string;
  features: string[];
  isPopular?: boolean;
  isBestValue?: boolean;
  filterCapabilities: string[];
}

export interface AnxietyQuery {
  id: string;
  question: string;
  shortAnswer: string;
  category: string;
  detailedSteps: string[];
  recommendedTrack: string;
  proTip: string;
}

export interface DailyTask {
  id: string;
  title: string;
  category: 'DSA' | 'SQL' | 'Concept' | 'Aptitude';
  estimatedMinutes: number;
  completed: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description?: string;
}

export interface CertificationTrack {
  id: string;
  title: string;
  domain: 'Cybersecurity' | 'Cloud & DevOps' | 'Programming' | 'Data & AI' | 'Networking' | 'Strategy';
  level: 'Foundational' | 'Intermediate' | 'Advanced' | 'Industry Ready';
  durationWeeks: number;
  totalModules: number;
  handsOnLabs: number;
  sampleCredentialId: string;
  description: string;
  skillsAcquired: string[];
  syllabus: { title: string; topics: string[] }[];
  iconName: string;
}

export interface FinalYearProjectTrack {
  id: string;
  title: string;
  domain: string;
  complexity: 'Standard' | 'High Impact' | 'Research Grade';
  milestones: string[];
  deliverables: string[];
  paperPublicationSupport: boolean;
  industryMentorAssigned: boolean;
}
