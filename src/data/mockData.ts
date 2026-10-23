import { 
  Question, 
  CareerTrack, 
  StudentRanking, 
  PricingPlan, 
  AnxietyQuery, 
  DailyTask,
  CertificationTrack,
  FinalYearProjectTrack
} from '../types';

export const COMPANY_INFO = {
  name: 'DKODER',
  legalName: 'DKoder Placement Technologies',
  operatedBy: 'Xyzon Innovations',
  operatorCity: 'Chennai, Tamil Nadu, India',
  tagline: 'The Placement LMS for Engineering Colleges Across India',
  address: 'Campus 1A, No. 143, Dr. M.G.R. Road, Perungudi, Chennai 600096, Tamil Nadu, India',
  email: 'support@dkoder.co.in',
  phone: '+91 87542 00247',
  whatsappUrl: 'https://wa.me/918754200247?text=Hello%20DKODER%20Team%2C%20I%20have%20an%20enquiry%20regarding%20campus%20preparation',
  credentials: [
    'Placement LMS Platform for Engineering Colleges across India (Operated by Xyzon Innovations)',
    'Real Company-Tagged Placement Questions (TCS NQT, InfyTQ, Accenture)',
    'Live Browser Coding Lab with Real-Time Compilers',
    'AI Report Cards & Frequency-Based Question Filtering',
    'Campus MOU Integration for Institutional Placement Cells',
    'QR-Verifiable Domain Certifications & Mentored Project Tracks'
  ]
};

export const RECRUITER_LOGOS = [
  { name: 'TCS', role: 'Ninja, Digital & Prime (3.6 - 9.0 LPA)', color: '#1d4ed8' },
  { name: 'Infosys', role: 'SE & Specialist Programmer (3.6 - 9.5 LPA)', color: '#0284c7' },
  { name: 'Accenture', role: 'ASE & FSE Roles (4.5 - 6.5 LPA)', color: '#9333ea' },
  { name: 'Microsoft', role: 'Software Engineer (18.0 - 45.0 LPA)', color: '#059669' },
  { name: 'Amazon', role: 'SDE-I & SDE Intern (16.0 - 44.0 LPA)', color: '#d97706' },
  { name: 'Google', role: 'SWE-I & STEP Intern (22.0 - 52.0 LPA)', color: '#dc2626' },
  { name: 'Wipro', role: 'Elite & Turbo Prep (3.5 - 6.5 LPA)', color: '#0891b2' },
  { name: 'Cognizant', role: 'GenC, GenC Elevate & Next (4.0 - 8.5 LPA)', color: '#4f46e5' },
  { name: 'HCL Tech', role: 'Graduate Engineer Trainee (3.6 - 5.0 LPA)', color: '#c026d3' },
  { name: 'Adobe', role: 'Product Development Engineer (20.0 - 40.0 LPA)', color: '#e11d48' },
];

export const ANXIETY_QUERIES: AnxietyQuery[] = [
  {
    id: 'anx-1',
    question: 'What should I revise tonight?',
    shortAnswer: 'Focus on High-Frequency Foundation patterns: Two Pointers, String parsing, and basic Array hashing.',
    category: 'Last-Minute Prep',
    detailedSteps: [
      'Solve 2 classic Two-Pointer problems (e.g., Valid Palindrome, Two Sum sorted).',
      'Review time complexities of common standard library data structures (Vector, Hash Map, Priority Queue).',
      'Scan the most common SQL aggregation queries (GROUP BY, HAVING, and 2nd Highest Salary).',
      'Avoid tackling brand new hard topics right before the exam to preserve cognitive confidence.'
    ],
    recommendedTrack: 'Service-Company Track',
    proTip: 'Company recruitment rounds favor bug-free solutions with clean boundary handling over complex unfinished algorithms.'
  },
  {
    id: 'anx-2',
    question: 'Where should I begin?',
    shortAnswer: 'Start with the Service Company Core Track: Basic syntax mastery, Loops, Arrays, and Quantitative Aptitude.',
    category: 'Beginner Roadmap',
    detailedSteps: [
      'Select a single core language (Java, C++, or Python) and stick with it for syntax fluency.',
      'Complete the first 10 Day Path questions on DKODER to build an unbroken daily streak.',
      'Take the 20-minute diagnostic mock test on DKODER to identify speed vs accuracy gaps.',
      'Establish a 60-minute daily routine: 40 minutes of coding practice, 20 minutes of aptitude.'
    ],
    recommendedTrack: 'Beginner Diagnostic Path',
    proTip: 'Consistency beats cramming. Practicing 2 problems every single day for 30 days builds far more confidence than 20 problems on a weekend.'
  },
  {
    id: 'anx-3',
    question: 'How do I prepare for coding rounds?',
    shortAnswer: 'Simulate live IDE conditions: strict 30-minute timers, hidden test cases, and zero compiler auto-complete.',
    category: 'Round Readiness',
    detailedSteps: [
      'Write your algorithmic approach in plain English or comments before writing single line of code.',
      'Test your code mentally against extreme edge cases (empty array, single element, negative numbers, overflow).',
      'Get comfortable with standard I/O (handling custom test case inputs and formatting outputs properly).',
      'Analyze memory constraints and time limits (10^8 operations per second in C++).'
    ],
    recommendedTrack: 'Big Tech SDE Track',
    proTip: 'Over 65% of students fail coding rounds due to unhandled edge cases, not because their core logic was incorrect.'
  },
  {
    id: 'anx-4',
    question: 'Which topics should I practise first?',
    shortAnswer: 'Arrays & Strings (40% of all questions), followed by Hashing, Recursion, and Binary Search.',
    category: 'Topic Priority',
    detailedSteps: [
      'Phase 1: Linear Arrays, Two Pointers, Prefix Sum, Frequency Maps.',
      'Phase 2: Linked Lists, Stacks & Queues, Binary Trees traversal.',
      'Phase 3: Sliding Window, Binary Search on Answer, Graph BFS/DFS.',
      'Phase 4: Dynamic Programming (Memoization first, then Tabulation).'
    ],
    recommendedTrack: 'Product SDE Track',
    proTip: 'Mastering the Sliding Window and Prefix Sum patterns alone unlocks solutions for over 60 campus placement problems.'
  },
  {
    id: 'anx-5',
    question: 'How do I improve my interview confidence?',
    shortAnswer: 'Practice verbalizing your thought process out loud using the STAR & Clarify-Propose-Execute frameworks.',
    category: 'Behavioral & Technical HR',
    detailedSteps: [
      'Always ask 1-2 clarifying questions when an interviewer states a problem (confirm input constraints).',
      'Explain your brute-force solution first (O(N^2)), calculate its complexity, then propose an optimized approach.',
      'Talk through your code as you type; never code in dead silence.',
      'Prepare 3 solid project stories highlighting trade-offs, architecture decisions, and bug investigations.'
    ],
    recommendedTrack: 'Mock Interview Simulator',
    proTip: 'Interviewers evaluate how you collaborate and troubleshoot when stuck just as much as whether you arrive at the optimal solution.'
  },
  {
    id: 'anx-6',
    question: 'How to balance semester exams with placement prep?',
    shortAnswer: 'Anchor your preparation to high-yield daily micro-tasks: 2 problems and 1 concept revision per day.',
    category: 'Time Management',
    detailedSteps: [
      'Align your college lab syllabus (Data Structures, DBMS, OS) directly with your placement topics.',
      'Use the DKODER Daily Path Checklist: complete your 4 daily checkboxes during morning commute or study blocks.',
      'Dedicate weekday evenings to 45 minutes of coding; reserve weekend mornings for full-length mock tests.',
      'Protect 7 hours of sleep during placement drive weeks to stay sharp during afternoon cognitive rounds.'
    ],
    recommendedTrack: 'Daily Path Routine',
    proTip: 'Quality of deliberate practice on 2 focused questions far exceeds mindlessly browsing 10 solution videos.'
  }
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q-101',
    title: 'Rotate Matrix 90 Degrees In-Place',
    topic: 'Matrix Operations',
    topicTags: ['Matrix Operations', 'In-Place', 'Two Pointers'],
    format: 'Coding',
    difficulty: 'Medium',
    company: 'TCS',
    packageCategory: '4 - 7 LPA',
    estimatedMinutes: 25,
    acceptanceRate: '68%',
    solversCount: 3410,
    description: 'Given an n x n 2D matrix representing an image, rotate the image by 90 degrees clockwise in-place without allocating another 2D matrix.',
    sampleInput: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]',
    sampleOutput: '[[7,4,1],[8,5,2],[9,6,3]]',
    starterCode: {
      python: `def rotate(matrix):\n    # Step 1: Transpose matrix\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    # Step 2: Reverse each row\n    for i in range(n):\n        matrix[i].reverse()\n    return matrix`,
      java: `class Solution {\n    public void rotate(int[][] matrix) {\n        int n = matrix.length;\n        // Transpose and reverse rows\n    }\n}`,
      cpp: `class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        // In-place rotation\n    }\n};`
    },
    explanation: 'Transposing the matrix (swapping element [i][j] with [j][i]) followed by horizontally reversing each row results in an exact 90-degree clockwise rotation with O(1) auxiliary space.'
  },
  {
    id: 'q-102',
    title: 'Climbing Stairs with Variable Step Costs',
    topic: 'Memoisation',
    topicTags: ['Memoisation', 'Dynamic Programming', 'Recursion'],
    format: 'Coding',
    difficulty: 'Easy',
    company: 'Infosys',
    packageCategory: '4 - 7 LPA',
    estimatedMinutes: 15,
    acceptanceRate: '79%',
    solversCount: 4210,
    description: 'You are climbing a staircase with n steps. Each time you can either take 1 step or 2 steps. Given a cost array where cost[i] is the price of step i, find the minimum total cost to reach the top floor.',
    sampleInput: 'cost = [10, 15, 20]',
    sampleOutput: '15',
    starterCode: {
      python: `def minCostClimbingStairs(cost):\n    n = len(cost)\n    prev2, prev1 = cost[0], cost[1]\n    for i in range(2, n):\n        curr = cost[i] + min(prev1, prev2)\n        prev2, prev1 = prev1, curr\n    return min(prev1, prev2)`,
      java: `class Solution {\n    public int minCostClimbingStairs(int[] cost) {\n        int n = cost.length;\n        return 0;\n    }\n}`
    },
    explanation: 'Optimal substructure: to reach step i, we take the minimum of reaching step i-1 or step i-2 plus the current step cost. We can optimize space to O(1) using two accumulator variables.'
  },
  {
    id: 'q-103',
    title: 'Flatten Multi-Level Doubly Linked List',
    topic: 'Nested Structures',
    topicTags: ['Nested Structures', 'Linked List', 'Stack'],
    format: 'Coding',
    difficulty: 'Hard',
    company: 'Microsoft',
    packageCategory: '12 - 20 LPA',
    estimatedMinutes: 40,
    acceptanceRate: '44%',
    solversCount: 1520,
    description: 'You are given a doubly linked list where each node has a next pointer, a previous pointer, and a child pointer to another separate doubly linked list. Flatten the list into a single-level doubly linked list.',
    sampleInput: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]',
    sampleOutput: '[1,2,3,7,8,11,12,9,10,4,5,6]',
    starterCode: {
      python: `def flatten(head):\n    # DFS traversal with stack\n    if not head: return head\n    curr = head\n    while curr:\n        if curr.child:\n            # insert child chain\n            pass\n        curr = curr.next\n    return head`
    },
    explanation: 'Treat the child pointer as a left branch and next as right branch in a pre-order traversal. Use an explicit stack to keep track of paused parent next pointers.'
  },
  {
    id: 'q-104',
    title: 'Longest Substring Without Repeating Characters',
    topic: 'Sliding Window',
    topicTags: ['Sliding Window', 'Two Pointers', 'Hash Map'],
    format: 'Coding',
    difficulty: 'Medium',
    company: 'Amazon',
    packageCategory: '12 - 20 LPA',
    estimatedMinutes: 25,
    acceptanceRate: '56%',
    solversCount: 5120,
    description: 'Given a string s, find the length of the longest substring without duplicate characters.',
    sampleInput: 's = "abcabcbb"',
    sampleOutput: '3',
    starterCode: {
      python: `def lengthOfLongestSubstring(s: str) -> int:\n    char_index = {}\n    max_len = 0\n    left = 0\n    for right, ch in enumerate(s):\n        if ch in char_index and char_index[ch] >= left:\n            left = char_index[ch] + 1\n        char_index[ch] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len`
    },
    explanation: 'Maintain a dynamic sliding window [left, right] using a hash map to store the last seen position of each character, advancing the left boundary immediately upon encountering a repeat.'
  },
  {
    id: 'q-105',
    title: 'Find Second Highest Department Salary (SQL)',
    topic: 'SQL Aggregates',
    topicTags: ['SQL Aggregates', 'Subqueries', 'Database'],
    format: 'MCQ',
    difficulty: 'Easy',
    company: 'Accenture',
    packageCategory: '4 - 7 LPA',
    estimatedMinutes: 10,
    acceptanceRate: '84%',
    solversCount: 6890,
    description: 'Which SQL statement reliably retrieves the second highest unique salary from the Employee table, returning NULL if no second highest salary exists?',
    mcqOptions: [
      { id: 'opt-a', text: 'SELECT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1;', isCorrect: false },
      { id: 'opt-b', text: 'SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);', isCorrect: true },
      { id: 'opt-c', text: 'SELECT DISTINCT salary FROM Employee GROUP BY salary HAVING COUNT(*) = 2;', isCorrect: false },
      { id: 'opt-d', text: 'SELECT TOP 1 salary FROM Employee WHERE salary NOT IN (SELECT MAX(salary) FROM Employee);', isCorrect: false }
    ],
    explanation: 'Using `SELECT MAX(salary) WHERE salary < (SELECT MAX(salary))` is ANSI SQL compliant and gracefully returns NULL when the table has fewer than 2 distinct salary values.'
  },
  {
    id: 'q-106',
    title: 'Word Ladder Transformation Sequence',
    topic: 'Graph BFS',
    topicTags: ['Graph BFS', 'Shortest Path', 'Hash Set'],
    format: 'Coding',
    difficulty: 'Hard',
    company: 'Google',
    packageCategory: '20+ LPA (Super Dream)',
    estimatedMinutes: 45,
    acceptanceRate: '38%',
    solversCount: 940,
    description: 'Given two words, beginWord and endWord, and a dictionary wordList, return the minimum number of words in the shortest transformation sequence from beginWord to endWord, changing only 1 letter per step.',
    sampleInput: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
    sampleOutput: '5',
    starterCode: {
      python: `from collections import deque\n\ndef ladderLength(beginWord: str, endWord: str, wordList: list[str]) -> int:\n    word_set = set(wordList)\n    if endWord not in word_set: return 0\n    queue = deque([(beginWord, 1)])\n    # BFS search...\n    return 0`
    },
    explanation: 'Since all edge weights in word transformation are unit cost (1 letter difference), Breadth-First Search (BFS) is guaranteed to find the shortest transformation path in minimum steps.'
  },
  {
    id: 'q-107',
    title: 'Container With Most Water',
    topic: 'Two Pointers',
    topicTags: ['Two Pointers', 'Greedy', 'Array'],
    format: 'Coding',
    difficulty: 'Medium',
    company: 'Wipro',
    packageCategory: '4 - 7 LPA',
    estimatedMinutes: 20,
    acceptanceRate: '71%',
    solversCount: 3890,
    description: 'You are given an integer array height of length n. There are n vertical lines drawn. Find two lines that together with the x-axis form a container, such that the container contains the most water.',
    sampleInput: 'height = [1,8,6,2,5,4,8,3,7]',
    sampleOutput: '49',
    starterCode: {
      python: `def maxArea(height: list[int]) -> int:\n    left, right = 0, len(height) - 1\n    max_water = 0\n    while left < right:\n        width = right - left\n        water = width * min(height[left], height[right])\n        max_water = max(max_water, water)\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n    return max_water`
    },
    explanation: 'Place pointers at both boundaries. Since area is limited by the shorter line, moving the taller pointer can never yield a larger area with smaller width, so greedily move the shorter pointer inward.'
  },
  {
    id: 'q-108',
    title: 'Implement Autocomplete Prefix Dictionary',
    topic: 'Trie',
    topicTags: ['Trie', 'Prefix Tree', 'Design'],
    format: 'Coding',
    difficulty: 'Hard',
    company: 'Microsoft',
    packageCategory: '12 - 20 LPA',
    estimatedMinutes: 35,
    acceptanceRate: '49%',
    solversCount: 1670,
    description: 'Design a data structure that supports adding new words and finding if a string matches any previously added string or prefix efficiently in O(L) time where L is word length.',
    sampleInput: 'Trie trie = new Trie(); trie.insert("apple"); trie.search("apple"); // true; trie.startsWith("app"); // true',
    sampleOutput: 'All prefix queries returned in O(L)',
    starterCode: {
      python: `class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    def insert(self, word: str):\n        curr = self.root\n        for ch in word:\n            curr = curr.children.setdefault(ch, TrieNode())\n        curr.is_end = True`
    },
    explanation: 'A Trie (Prefix Tree) provides O(L) lookup independent of the total dictionary size, ideal for search suggestions and prefix matching.'
  },
  {
    id: 'q-109',
    title: 'Time & Work Cyclical Efficiency Calculation',
    topic: 'Aptitude & Logic',
    topicTags: ['Aptitude', 'Quantitative', 'TCS NQT'],
    format: 'MCQ',
    difficulty: 'Easy',
    company: 'TCS',
    packageCategory: '< 4 LPA',
    estimatedMinutes: 8,
    acceptanceRate: '88%',
    solversCount: 7800,
    description: 'Pipe A can fill a tank in 12 hours, while Pipe B can fill it in 15 hours. If both pipes are opened together for 4 hours and then Pipe A is closed, how long will Pipe B take to fill the remainder?',
    mcqOptions: [
      { id: 'opt-1', text: '4 hours', isCorrect: false },
      { id: 'opt-2', text: '6 hours', isCorrect: true },
      { id: 'opt-3', text: '5.5 hours', isCorrect: false },
      { id: 'opt-4', text: '7 hours', isCorrect: false }
    ],
    explanation: 'Total capacity = LCM(12, 15) = 60 units. Rate of A = 5 u/hr, B = 4 u/hr. In 4 hours together, work done = 4 * 9 = 36 units. Remaining = 24 units. Time for B = 24 / 4 = 6 hours.'
  },
  {
    id: 'q-110',
    title: 'SOLID Principles in Scalable Microservices',
    topic: 'System Design',
    topicTags: ['System Design', 'OOP', 'Architecture'],
    format: 'MCQ',
    difficulty: 'Medium',
    company: 'Cognizant',
    packageCategory: '7 - 12 LPA',
    estimatedMinutes: 12,
    acceptanceRate: '65%',
    solversCount: 2900,
    description: 'Which SOLID principle states that high-level modules should not depend on low-level modules, but rather both should depend upon abstractions?',
    mcqOptions: [
      { id: 'sol-s', text: 'Single Responsibility Principle', isCorrect: false },
      { id: 'sol-o', text: 'Open/Closed Principle', isCorrect: false },
      { id: 'sol-l', text: 'Liskov Substitution Principle', isCorrect: false },
      { id: 'sol-d', text: 'Dependency Inversion Principle', isCorrect: true }
    ],
    explanation: 'The Dependency Inversion Principle (DIP) dictates that high-level policy code should be decoupled from low-level implementation details through shared interfaces.'
  },
  {
    id: 'q-111',
    title: 'Single Number with Linear Time & Constant Space',
    topic: 'Bit Manipulation',
    topicTags: ['Bit Manipulation', 'XOR', 'Arrays'],
    format: 'Coding',
    difficulty: 'Easy',
    company: 'Amazon',
    packageCategory: '7 - 12 LPA',
    estimatedMinutes: 15,
    acceptanceRate: '75%',
    solversCount: 4670,
    description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single unique element using O(N) runtime and O(1) auxiliary space.',
    sampleInput: 'nums = [4,1,2,1,2]',
    sampleOutput: '4',
    starterCode: {
      python: `def singleNumber(nums: list[int]) -> int:\n    result = 0\n    for num in nums:\n        result ^= num\n    return result`
    },
    explanation: 'The XOR operation satisfies: A ^ A = 0 and A ^ 0 = A. XORing all elements together cancels out every duplicate pair, isolating the single unique element in linear time.'
  },
  {
    id: 'q-112',
    title: '0/1 Knapsack with Custom Weights & Value Ratios',
    topic: 'Memoisation',
    topicTags: ['Memoisation', 'Dynamic Programming', 'Knapsack'],
    format: 'Coding',
    difficulty: 'Medium',
    company: 'Cognizant',
    packageCategory: '4 - 7 LPA',
    estimatedMinutes: 30,
    acceptanceRate: '58%',
    solversCount: 3120,
    description: 'Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack.',
    sampleInput: 'values = [60, 100, 120], weights = [10, 20, 30], W = 50',
    sampleOutput: '220',
    starterCode: {
      python: `def knapSack(W, wt, val, n):\n    dp = [0 for _ in range(W + 1)]\n    for i in range(n):\n        for w in range(W, wt[i] - 1, -1):\n            dp[w] = max(dp[w], dp[w - wt[i]] + val[i])\n    return dp[W]`
    },
    explanation: 'By iterating backward over the knapsack capacity in a 1D DP table, we prevent using the same item multiple times while optimizing space from O(N*W) to O(W).'
  }
];

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'track-service',
    title: 'Service-Company Developer',
    subtitle: 'High-Volume Hiring & Mass Recruiter Mastery',
    targetCompanies: ['TCS Ninja/Digital', 'Infosys InfyTQ', 'Accenture ASE', 'Wipro Turbo'],
    packageRange: '3.5 - 7.5 LPA',
    totalQuestions: 280,
    codingRatio: 55,
    mcqRatio: 45,
    skills: ['C/C++/Java Basics', 'Quantitative Aptitude', 'Data Structures (Arrays/Strings)', 'Core CS (OS, DBMS, SQL)'],
    overview: 'Engineered specifically for campus placement drives with high-volume technical MCQs, pseudo-code testing, and timed coding challenges.',
    bundleUrl: '/bundles/infosys',
    bundleName: 'View Infosys & Accenture Prep Bundles',
    colorTheme: 'from-amber-400 to-yellow-500'
  },
  {
    id: 'track-bigtech',
    title: 'Big Tech Software Engineer',
    subtitle: 'Competitive DSA & Algorithmic Excellence',
    targetCompanies: ['Microsoft', 'Amazon SDE', 'Google SWE', 'Adobe', 'Oracle'],
    packageRange: '18.0 - 45.0 LPA',
    totalQuestions: 420,
    codingRatio: 85,
    mcqRatio: 15,
    skills: ['Advanced Graph Algorithms', 'Dynamic Programming', 'Tries & Segment Trees', 'System Design & Concurrency'],
    overview: 'Rigorous algorithmic deep-dives focused on optimal Big-O time complexity, space tradeoffs, and multi-round technical interviews.',
    bundleUrl: '/student/subscription',
    bundleName: 'Unlock with Super Dream Pass',
    colorTheme: 'from-purple-600 to-indigo-700'
  },
  {
    id: 'track-product',
    title: 'Product-Company SDE',
    subtitle: 'Full-Stack Practicality & High-Growth Startups',
    targetCompanies: ['Razorpay', 'Swiggy', 'Flipkart', 'CRED', 'BrowserStack'],
    packageRange: '10.0 - 24.0 LPA',
    totalQuestions: 350,
    codingRatio: 70,
    mcqRatio: 30,
    skills: ['REST APIs & Database Design', 'Problem Solving with Trees & Maps', 'Low-Level Design (LLD)', 'Clean Code Principles'],
    overview: 'Balancing data structure problems with real-world engineering scenarios: caching, concurrency, indexing, and architecture discussions.',
    bundleUrl: '/bundles/accenture',
    bundleName: 'Explore Product Prep Tracks',
    colorTheme: 'from-purple-500 to-pink-600'
  }
];

export const STUDENT_RANKINGS: StudentRanking[] = [
  {
    id: 'rank-1',
    rank: 1,
    name: 'Karthik Raja S.',
    college: 'Anna University, CEG Campus',
    streakDays: 48,
    xp: 8940,
    questionsSolved: 312,
    hardSolved: 42,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    badge: 'Campus Legend'
  },
  {
    id: 'rank-2',
    rank: 2,
    name: 'Ananya Sharma',
    college: 'VIT Vellore',
    streakDays: 42,
    xp: 8420,
    questionsSolved: 288,
    hardSolved: 38,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    badge: 'Algorithm Master'
  },
  {
    id: 'rank-3',
    rank: 3,
    name: 'Rohan Deshmukh',
    college: 'PSG College of Technology',
    streakDays: 39,
    xp: 7910,
    questionsSolved: 264,
    hardSolved: 31,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    badge: 'Streak Pioneer'
  },
  {
    id: 'rank-4',
    rank: 4,
    name: 'Divya Venkatesh',
    college: 'SRM Institute of Science & Tech',
    streakDays: 34,
    xp: 7350,
    questionsSolved: 245,
    hardSolved: 27,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    badge: 'Code Gladiator'
  },
  {
    id: 'rank-5',
    rank: 5,
    name: 'Arjun Nambiar',
    college: 'NIT Trichy',
    streakDays: 29,
    xp: 6890,
    questionsSolved: 220,
    hardSolved: 24,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    badge: 'Hard Solver'
  },
  {
    id: 'rank-6',
    rank: 6,
    name: 'Sneha Patel',
    college: 'BITS Pilani (Hyderabad Campus)',
    streakDays: 26,
    xp: 6420,
    questionsSolved: 204,
    hardSolved: 22,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
    badge: 'Consistent Coder'
  },
  {
    id: 'rank-7',
    rank: 7,
    name: 'Mohammed Faisal',
    college: 'Anna University, MIT Campus',
    streakDays: 21,
    xp: 5930,
    questionsSolved: 191,
    hardSolved: 19,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    badge: 'Speed Demon'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-bronze',
    name: 'Bronze',
    tagline: 'Foundational service-company placement kit',
    annualPrice: 699,
    dailyCost: 2,
    targetAudience: '1st & 2nd Year Students starting foundational coding',
    features: [
      'Access to 250+ Service Company Practice Questions',
      'Daily Coding Challenges & Streak Tracking',
      'Aptitude & Technical MCQ Question Bank',
      'Basic Performance Analytics'
    ],
    filterCapabilities: ['Topic-wise Filtering', 'Difficulty Level Selector']
  },
  {
    id: 'plan-silver',
    name: 'Silver',
    tagline: 'Comprehensive mass-recruiter interview readiness',
    annualPrice: 999,
    dailyCost: 3,
    targetAudience: 'Pre-final Year Students targeting mass placement drives',
    features: [
      'All Bronze features included',
      'TCS NQT, Infosys InfyTQ & Wipro Mock Assessments',
      'Timed Coding Environment with Hidden Test Cases',
      'Company-Specific Question Tagging',
      'Downloadable Solutions & Editorial Notes'
    ],
    filterCapabilities: ['Company Tag Filters', 'Topic & Platform Filters']
  },
  {
    id: 'plan-gold',
    name: 'Gold',
    tagline: 'Dual service & product company career tracks',
    annualPrice: 1599,
    dailyCost: 5,
    targetAudience: 'Targeting 7 - 12 LPA differential placement packages',
    features: [
      'All Silver features included',
      'Advanced DSA & System Design Interview Modules',
      'AI-Powered Performance Report Card & Weakness Diagnoser',
      'Infosys Specialist Programmer & TCS Digital Prep Packs',
      'Full Access to Live Hackathons & Contests'
    ],
    filterCapabilities: ['Package-wise Salary Filters', 'AI Weakness Recommendations']
  },
  {
    id: 'plan-platinum',
    name: 'Platinum',
    tagline: 'The most popular end-to-end placement accelerator',
    annualPrice: 1999,
    dailyCost: 6,
    isPopular: true,
    targetAudience: 'Final Year Students aiming for top-tier IT & Product offers',
    features: [
      'All Gold features included',
      'Full Stack Interview Prep & System Design Lab',
      'Granular Recruiter & Salary Range Filtering (<4 to 20+ LPA)',
      'Live Peer Mock Interview Simulator',
      'Priority Doubt Resolution & Placement Mentor Q&A',
      'Official Certificate of Placement Readiness'
    ],
    filterCapabilities: ['Granular Frequency Filters', 'Salary & Package Selector', 'Year-wise Trends']
  },
  {
    id: 'plan-superdream',
    name: 'Super Dream Pack',
    tagline: 'Elite 15+ LPA preparation for Big Tech and Tier-1 Unicorns',
    annualPrice: 2999,
    dailyCost: 9,
    isBestValue: true,
    targetAudience: 'Aspirants targeting Microsoft, Amazon, Google & Startups',
    features: [
      'All Platinum features included with lifetime archive access',
      'Unlocks ALL Current & Future Company Preparation Bundles',
      'Quarterly & Recency-wise Recruitment Question Vault',
      'High-Level & Low-Level Design (HLD/LLD) Case Studies',
      'Direct Referrals & Institutional Hackathon Fast-Track Pass',
      '1-on-1 Resume & Portfolio Review by Senior Engineers'
    ],
    filterCapabilities: ['Quarterly Recency Filtering', 'Company Frequency Matrix', 'Custom Drill Generator']
  }
];

export const INITIAL_DAILY_TASKS: DailyTask[] = [
  { id: 'task-1', title: 'Solve 2 Array & Two-Pointer practice questions', category: 'DSA', estimatedMinutes: 20, completed: false },
  { id: 'task-2', title: 'Review 1 SQL aggregation query (Second Highest Salary)', category: 'SQL', estimatedMinutes: 10, completed: false },
  { id: 'task-3', title: 'Practise 1 timed coding challenge in browser lab', category: 'DSA', estimatedMinutes: 25, completed: false },
  { id: 'task-4', title: 'Revise 1 Core CS concept: OS Deadlocks & Semaphores', category: 'Concept', estimatedMinutes: 15, completed: false }
];

export const CERTIFICATION_TRACKS: CertificationTrack[] = [
  {
    id: 'cert-cybersecurity',
    title: 'Cybersecurity & Defensive Engineering',
    domain: 'Cybersecurity',
    level: 'Industry Ready',
    durationWeeks: 8,
    totalModules: 12,
    handsOnLabs: 24,
    sampleCredentialId: 'DK-SEC-2026-8841',
    description: 'Practical training on network security, OWASP Top 10 vulnerabilities, penetration fundamentals, and SOC incident triage with tamper-proof QR certification.',
    skillsAcquired: ['Network Packet Analysis (Wireshark)', 'OWASP Top 10 Remediation', 'Linux Security Hardening', 'Cryptographic Primitives'],
    syllabus: [
      { title: 'Module 1: Foundations of Ethical Defense', topics: ['TCP/IP security model', 'Reconnaissance & footprinting', 'Port scanning & banner grabbing'] },
      { title: 'Module 2: Web Application Vulnerabilities', topics: ['SQL Injection & XSS exploitation', 'CSRF & broken authentication', 'Secure coding safeguards'] },
      { title: 'Module 3: Defensive Ops & Blue Team', topics: ['SIEM log analysis', 'Incident containment', 'Hardening enterprise Linux servers'] }
    ],
    iconName: 'ShieldAlert'
  },
  {
    id: 'cert-cloud-devops',
    title: 'Cloud Architecture & DevOps Systems',
    domain: 'Cloud & DevOps',
    level: 'Advanced',
    durationWeeks: 10,
    totalModules: 14,
    handsOnLabs: 30,
    sampleCredentialId: 'DK-CLD-2026-3190',
    description: 'Enterprise deployment pipelines, AWS and GCP compute/storage services, container orchestration with Kubernetes, and Infrastructure as Code with Terraform.',
    skillsAcquired: ['AWS Core Infrastructure', 'Docker & Containerization', 'Kubernetes Deployments', 'CI/CD with GitHub Actions', 'Terraform HCL'],
    syllabus: [
      { title: 'Module 1: Cloud Core & IAM Security', topics: ['VPC subnetting & routing', 'IAM roles & least-privilege', 'S3 & compute auto-scaling'] },
      { title: 'Module 2: Containerization & Microservices', topics: ['Multi-stage Docker builds', 'Kubernetes Pods & Services', 'Ingress controllers & TLS'] },
      { title: 'Module 3: Continuous Delivery Pipelines', topics: ['Automated test runners', 'Zero-downtime rollouts', 'Terraform provisioning'] }
    ],
    iconName: 'Cloud'
  },
  {
    id: 'cert-programming',
    title: 'Modern Full-Stack & Systems Engineering',
    domain: 'Programming',
    level: 'Industry Ready',
    durationWeeks: 12,
    totalModules: 16,
    handsOnLabs: 36,
    sampleCredentialId: 'DK-DEV-2026-5524',
    description: 'Production-ready full-stack software development with TypeScript, React, Next.js, Node.js microservices, PostgreSQL indexing, and distributed cache design.',
    skillsAcquired: ['TypeScript Strict Architecture', 'Next.js App Router & SSR', 'PostgreSQL Query Optimization', 'Redis Caching & Queues', 'REST & GraphQL APIs'],
    syllabus: [
      { title: 'Module 1: Systems-Level TypeScript & React', topics: ['Advanced generics & utility types', 'State machine patterns', 'Optimistic UI updates'] },
      { title: 'Module 2: Scalable Node.js Backend & DBs', topics: ['Connection pooling & migrations', 'ACID transactions & locking', 'JWT security & rate limiting'] },
      { title: 'Module 3: Distributed Architectures', topics: ['Event-driven messaging', 'Redis pub/sub', 'Horizontal scaling patterns'] }
    ],
    iconName: 'Code2'
  },
  {
    id: 'cert-data-ai',
    title: 'Data Science & Applied Generative AI',
    domain: 'Data & AI',
    level: 'Advanced',
    durationWeeks: 10,
    totalModules: 14,
    handsOnLabs: 28,
    sampleCredentialId: 'DK-DAT-2026-9218',
    description: 'Transform raw data into predictive intelligence and production LLM applications using Python, Scikit-Learn, PyTorch, RAG vector search, and model fine-tuning.',
    skillsAcquired: ['Python Data Wrangling', 'Statistical Feature Engineering', 'Deep Learning PyTorch', 'Vector Databases & Embeddings', 'RAG AI Applications'],
    syllabus: [
      { title: 'Module 1: Exploratory Analysis & Statistics', topics: ['Pandas vectorized ops', 'Hypothesis testing & p-values', 'Dimensionality reduction (PCA)'] },
      { title: 'Module 2: Machine Learning Pipelines', topics: ['Ensemble models (XGBoost)', 'Model evaluation & ROC/AUC', 'Hyperparameter tuning'] },
      { title: 'Module 3: LLM Engineering & RAG', topics: ['Embedding spaces & ChromaDB', 'LangChain orchestration', 'Prompt engineering & guardrails'] }
    ],
    iconName: 'BrainCircuit'
  },
  {
    id: 'cert-networking',
    title: 'Enterprise Networking & Secure Infrastructure',
    domain: 'Networking',
    level: 'Intermediate',
    durationWeeks: 8,
    totalModules: 10,
    handsOnLabs: 20,
    sampleCredentialId: 'DK-NET-2026-1142',
    description: 'Core telecommunications, OSI reference layers, BGP/OSPF dynamic routing, VLAN segmentation, and enterprise firewall access lists.',
    skillsAcquired: ['Subnetting & CIDR calculations', 'OSPF & BGP Routing', 'VLANs & Trunking protocols', 'Network Packet Tracing', 'Firewall ACL Rules'],
    syllabus: [
      { title: 'Module 1: L2/L3 Protocols & Addressing', topics: ['IPv4/IPv6 transition', 'Subnetting without calculator', 'ARP & DHCP discovery'] },
      { title: 'Module 2: Dynamic Routing & Switching', topics: ['Spanning Tree Protocol (STP)', 'Link aggregation (LACP)', 'OSPF multi-area design'] },
      { title: 'Module 3: Enterprise Perimeter Security', topics: ['Stateful packet inspection', 'NAT & port forwarding', 'VPN tunneling (IPsec)'] }
    ],
    iconName: 'Network'
  },
  {
    id: 'cert-strategy',
    title: 'Quantitative Problem Solving & Strategic Aptitude',
    domain: 'Strategy',
    level: 'Foundational',
    durationWeeks: 6,
    totalModules: 8,
    handsOnLabs: 18,
    sampleCredentialId: 'DK-STR-2026-7730',
    description: 'High-speed mathematical aptitude, logical deductions, data interpretation charts, and business problem-solving for top campus consulting and analyst rounds.',
    skillsAcquired: ['Vedic Math Speed Shortcuts', 'Data Interpretation Tables & Graphs', 'Syllogisms & Analytical Puzzles', 'Business Case Estimation'],
    syllabus: [
      { title: 'Module 1: Quantitative Speed Fundamentals', topics: ['Percentages, Profit & Loss shortcuts', 'Time & Work pipelines', 'Permutation & Probability'] },
      { title: 'Module 2: Logical Reasoning & Puzzles', topics: ['Circular & linear arrangements', 'Blood relations & coding-decoding', 'Critical verbal logic'] },
      { title: 'Module 3: Data Interpretation & Case Analysis', topics: ['Multi-bar & radar graph breakdowns', 'Market sizing guestimates', 'Consulting frameworks'] }
    ],
    iconName: 'LineChart'
  }
];

export const FINAL_YEAR_PROJECTS: FinalYearProjectTrack[] = [
  {
    id: 'proj-1',
    title: 'Decentralized Academic Credential Verification System',
    domain: 'Blockchain & Web3',
    complexity: 'Research Grade',
    milestones: [
      'Phase 1: Solidity smart contract design & local Hardhat test suite',
      'Phase 2: IPFS metadata storage integration & cryptographic signing',
      'Phase 3: React verification portal with QR validation',
      'Phase 4: Scopus/IEEE research paper drafting & mentor review'
    ],
    deliverables: ['Production-ready GitHub repo', 'Complete 60-page IEEE format project report', 'Live deployment URL', 'Accepted paper manuscript draft'],
    paperPublicationSupport: true,
    industryMentorAssigned: true
  },
  {
    id: 'proj-2',
    title: 'Autonomous Real-Time Defect Detection in Manufacturing using Edge AI',
    domain: 'Computer Vision & IoT',
    complexity: 'High Impact',
    milestones: [
      'Phase 1: Annotated industrial dataset creation & preprocessing',
      'Phase 2: YOLOv8 / MobileNet quantization for Raspberry Pi edge devices',
      'Phase 3: Flask microservice with WebSocket live telemetry',
      'Phase 4: Conference publication & patent search documentation'
    ],
    deliverables: ['Trained model weights (.onnx & .tflite)', 'Hardware schematics & Bill of Materials', 'Executive project presentation deck'],
    paperPublicationSupport: true,
    industryMentorAssigned: true
  },
  {
    id: 'proj-3',
    title: 'High-Throughput Algorithmic Trading Backtester & Risk Engine',
    domain: 'FinTech & Distributed Systems',
    complexity: 'Standard',
    milestones: [
      'Phase 1: Tick-data streaming ingestion with Apache Kafka & ClickHouse',
      'Phase 2: Event-driven backtesting execution engine in Go / Rust',
      'Phase 3: Real-time risk attribution dashboard (Sharpe, Drawdown, VaR)',
      'Phase 4: Capstone demo recording for Tier-1 Quant & HFT placement rounds'
    ],
    deliverables: ['Ultra-low latency codebase', 'Docker Compose cluster config', 'Portfolio documentation for recruiters'],
    paperPublicationSupport: false,
    industryMentorAssigned: true
  }
];

export const TCS_NQT_DATA = {
  examName: 'TCS National Qualifier Test (NQT)',
  batchYear: '2025 - 2026 Batch',
  salaryBands: [
    { tier: 'Ninja', package: '3.36 - 3.6 LPA', testFocus: 'Foundation Cognitive & Standard Coding' },
    { tier: 'Digital', package: '7.0 - 7.5 LPA', testFocus: 'Advanced Quantitative, Reasoning & DSA Coding' },
    { tier: 'Prime', package: '9.0 - 9.5 LPA', testFocus: 'Complex Problem Solving, Dynamic Programming & System Optimization' }
  ],
  examStructure: [
    {
      sectionName: 'Part A: Foundation Section (Cognitive)',
      duration: '75 Minutes',
      subSections: [
        { name: 'Numerical Ability', questions: 20, timeMins: 25 },
        { name: 'Reasoning Ability', questions: 20, timeMins: 25 },
        { name: 'Verbal Ability', questions: 25, timeMins: 25 }
      ]
    },
    {
      sectionName: 'Part B: Advanced Section (Technical & Coding)',
      duration: '90 Minutes',
      subSections: [
        { name: 'Advanced Quantitative & Reasoning', questions: 15, timeMins: 25 },
        { name: 'Advanced Coding (2 Algorithmic Problems)', questions: 2, timeMins: 65 }
      ]
    }
  ],
  verifiedQuestions: [
    {
      title: 'Subarray with Given Sum and Maximum Length',
      difficulty: 'Medium',
      format: 'Coding',
      tier: 'Digital / Prime',
      timeLimitSec: 2,
      summary: 'Find the starting and ending indices of the longest contiguous subarray whose elements sum to target K. Handle O(N) linear time with hash maps.'
    },
    {
      title: 'TCS Matrix Ring Rotation In-Place',
      difficulty: 'Medium',
      format: 'Coding',
      tier: 'Ninja / Digital',
      timeLimitSec: 1,
      summary: 'Rotate elements of an N x M matrix layer-by-layer anti-clockwise by R steps without auxiliary 2D arrays.'
    },
    {
      title: 'Lexicographically Smallest String After K Swaps',
      difficulty: 'Hard',
      format: 'Coding',
      tier: 'Prime (9 LPA)',
      timeLimitSec: 2,
      summary: 'Given an array of digits, find the smallest permutation reachable in at most K adjacent swaps using greedy priority indexing.'
    }
  ]
};

