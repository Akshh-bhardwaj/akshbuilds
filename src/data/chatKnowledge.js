// Rich Knowledge Base for AkshBuilds AI Assistant & Career Course Planner
import notesList from '../components/notesManifest.json';

export const CAREER_TRACKS = [
  {
    id: 'fullstack',
    name: 'Full-Stack Web Development',
    icon: '💻',
    tagline: 'Modern MERN, Next.js, APIs & Cloud Deployment',
    badge: 'High Demand',
    description: 'Learn modern HTML/CSS, React, Node.js, Express, MongoDB/PostgreSQL, REST APIs, and deploy production web apps.',
    durations: [30, 60, 100],
    defaultDuration: 60,
    color: '#00d4ff',
    plans: {
      30: [
        {
          week: 1,
          title: 'Modern Frontend Fundamentals (HTML5, Modern CSS & JS ES6+)',
          goals: ['Master Flexbox, Grid, Responsive Design', 'Deep-dive into async/await, closures, DOM manipulation', 'Build a responsive portfolio page'],
          project: 'Interactive Portfolio with Dark Mode',
          notes: ['web_html_css_js_complete_cheatsheet', 'javascript_es6_complete_notes', 'git_github_complete_handwritten_guide']
        },
        {
          week: 2,
          title: 'Modern React.js & State Management',
          goals: ['React components, props, hooks (useState, useEffect, useMemo)', 'Custom hooks & context API', 'Client-side routing with React Router'],
          project: 'E-commerce Product Filter & Cart UI',
          notes: ['react_complete_handwritten_notes', 'react_hooks_cheatsheet_mastery', 'tailwind_css_quick_reference']
        },
        {
          week: 3,
          title: 'Backend Engineering with Node.js, Express & MongoDB',
          goals: ['REST API design, routing, middlewares', 'Database schema design with Mongoose / Prisma', 'JWT Authentication & password hashing'],
          project: 'Secure RESTful User Auth & Task API',
          notes: ['mern_stack_complete_guide', 'sql_handwritten_mastery', 'dbms_easy_classroom_notes_vol1']
        },
        {
          week: 4,
          title: 'Full-Stack Integration, Testing & Cloud Deployment',
          goals: ['Connect React frontend to Express backend', 'State sync, error boundaries, loading skeletons', 'Deploy to Vercel/Render, set up custom domain & CI/CD'],
          project: 'Full-Stack SaaS MVP with Auth & Database',
          notes: ['mern_stack_complete_guide', 'roadmaps_collection', 'web_developer_interview_cheatsheet']
        }
      ],
      60: [
        {
          week: 1,
          title: 'Advanced Web Foundations & Git Architecture',
          goals: ['Semantic HTML5, CSS layout engines, Git branching & pull requests', 'Event loops, execution context, prototypes'],
          project: 'Responsive Landing Page with CSS Animations',
          notes: ['web_html_css_js_complete_cheatsheet', 'git_github_complete_handwritten_guide']
        },
        {
          week: 2,
          title: 'Deep-Dive JavaScript (ES6+ & Async)',
          goals: ['Promises, fetch, Async/Await, Error Handling, LocalStorage', 'Functional programming & array transformations'],
          project: 'Interactive Realtime Weather / Crypto Dashboard',
          notes: ['javascript_es6_complete_notes']
        },
        {
          week: 3,
          title: 'React Fundamentals & Component Architecture',
          goals: ['Component lifecycle, Hooks ecosystem, clean folder architecture', 'Tailwind CSS utility styling'],
          project: 'Multi-step Form with Validation',
          notes: ['react_complete_handwritten_notes', 'tailwind_css_quick_reference']
        },
        {
          week: 4,
          title: 'Advanced React: State Management & Optimization',
          goals: ['Context API, Zustand / Redux Toolkit, performance profiling', 'Lazy loading & code splitting'],
          project: 'Kanban Task Board with Drag & Drop',
          notes: ['react_hooks_cheatsheet_mastery']
        },
        {
          week: 5,
          title: 'Backend Core: Node.js, Express & Security',
          goals: ['Node runtime, event loop, streams, Express routers, rate-limiting, CORS, helmet'],
          project: 'Micro-blogging API with JWT & Role Based Access',
          notes: ['mern_stack_complete_guide']
        },
        {
          week: 6,
          title: 'Databases: Relational (SQL) & NoSQL (MongoDB)',
          goals: ['ACID properties, Normalization (1NF to BCNF), indexing, complex aggregations'],
          project: 'Inventory Management Database Schema & Queries',
          notes: ['sql_handwritten_mastery', 'dbms_easy_classroom_notes_vol1', 'dbms_easy_classroom_notes_vol2']
        },
        {
          week: 7,
          title: 'Full-Stack Integration & Real-time WebSockets',
          goals: ['Socket.io bidirectional communication, file uploads (Cloudinary/S3)', 'Clean REST error handling'],
          project: 'Real-time Chat Application with Rooms & Notifications',
          notes: ['mern_stack_complete_guide']
        },
        {
          week: 8,
          title: 'Production Deployment, Docker & Interview Prep',
          goals: ['Docker containerization basics, Dockerfile, Nginx reverse proxy', 'Frontend & Backend interview Q&A revision'],
          project: 'Live Deployed Full-Stack SaaS with Analytics',
          notes: ['web_developer_interview_cheatsheet', 'roadmaps_collection']
        }
      ],
      100: [
        {
          week: 1,
          title: 'Days 1-20: Foundational Mastery (HTML/CSS, JS, Git & Terminal)',
          goals: ['Master modern responsive web design, JS runtime, DOM, Git collaboration'],
          project: 'Pixel-perfect Mobile & Desktop Web App',
          notes: ['web_html_css_js_complete_cheatsheet', 'javascript_es6_complete_notes', 'git_github_complete_handwritten_guide']
        },
        {
          week: 2,
          title: 'Days 21-45: React, Next.js & Frontend Architecture',
          goals: ['React 18+, Server Components, Next.js App Router, SSR/SSG, Tailwind CSS'],
          project: 'Production Next.js Blog & Content Platform',
          notes: ['react_complete_handwritten_notes', 'react_hooks_cheatsheet_mastery', 'tailwind_css_quick_reference']
        },
        {
          week: 3,
          title: 'Days 46-70: Backend, PostgreSQL, MongoDB & Cloud Architecture',
          goals: ['Express, NestJS or Node microservices, SQL joins, Redis caching, Auth0 / Clerk'],
          project: 'High-Throughput E-Commerce API with Redis Cache',
          notes: ['mern_stack_complete_guide', 'sql_handwritten_mastery', 'dbms_easy_classroom_notes_vol1']
        },
        {
          week: 4,
          title: 'Days 71-100: Microservices, DevOps, System Design & FAANG Prep',
          goals: ['Docker, Kubernetes basics, CI/CD GitHub Actions, Load balancing, Portfolio polish'],
          project: 'End-to-End Enterprise SaaS with Payment Gateway (Stripe)',
          notes: ['web_developer_interview_cheatsheet', 'roadmaps_collection']
        }
      ]
    }
  },
  {
    id: 'dsa_faang',
    name: 'DSA & Coding Interview (FAANG)',
    icon: '⚡',
    tagline: 'Master LeetCode, Patterns, Trees, Graphs & DP',
    badge: 'Placement Favorite',
    description: 'Structured pattern-based problem solving: Two Pointers, Sliding Window, DFS/BFS, Dynamic Programming, and System Design.',
    durations: [30, 60, 100],
    defaultDuration: 60,
    color: '#10b981',
    plans: {
      30: [
        {
          week: 1,
          title: 'Arrays, Two Pointers & Sliding Window High-Yield',
          goals: ['Two-pointer patterns, sliding window max/min, kadane algorithm', 'Solve 30 top interview array problems'],
          project: 'Custom Visualizer for Sorting & Two Pointers',
          notes: ['01_arrays_leetcode_30', 'leetcode_module1_solutions_full']
        },
        {
          week: 2,
          title: 'Linked Lists, Stacks & Queues',
          goals: ['Fast & Slow pointer cycle detection, in-place reversal, monotonic stack', 'LRU Cache implementation'],
          project: 'LRU Cache & Calculator parser',
          notes: ['02_linked_list_leetcode_30', 'tree_and_hashing_cheatsheet']
        },
        {
          week: 3,
          title: 'Binary Trees, BSTs & Graph Traversals',
          goals: ['Tree BFS/DFS traversals, Lowest Common Ancestor, Graph cycle detection, Dijkstra'],
          project: 'Shortest Path Maze Solver',
          notes: ['tree_and_hashing_cheatsheet', 'striver_sde_sheet_notes']
        },
        {
          week: 4,
          title: 'Recursion, Backtracking & Dynamic Programming 1D/2D',
          goals: ['Subsets, permutations, 0/1 Knapsack, Longest Common Subsequence, Grid DP'],
          project: 'DP Memoization & Tabulation Cheatsheet',
          notes: ['striver_sde_sheet_notes', 'leetcode_module1_solutions_full']
        }
      ],
      60: [
        {
          week: 1,
          title: 'Time/Space Complexity & Array Masterclass',
          goals: ['Big-O asymptotic analysis, prefix sums, binary search variations, 2D matrices'],
          project: 'Binary Search Edge Case Cheatsheet',
          notes: ['01_arrays_leetcode_30', 'leetcode_module1_solutions_full']
        },
        {
          week: 2,
          title: 'Strings, HashMaps & Sliding Window Patterns',
          goals: ['Anagrams, Rabin-Karp, sliding window variable size, hash collisions'],
          project: 'String Pattern Matching Engine',
          notes: ['tree_and_hashing_cheatsheet']
        },
        {
          week: 3,
          title: 'Linked List Deep Dive & Monotonic Data Structures',
          goals: ['Merge K sorted lists, reverse nodes in k-group, next greater element, trapping rain water'],
          project: 'Stock Span & Histogram Max Area Visualizer',
          notes: ['02_linked_list_leetcode_30']
        },
        {
          week: 4,
          title: 'Binary Trees, Traversals & View Problems',
          goals: ['Diameter of tree, zig-zag traversal, top/bottom/side views, serialize & deserialize binary tree'],
          project: 'Binary Tree Interactive Visualizer',
          notes: ['tree_and_hashing_cheatsheet']
        },
        {
          week: 5,
          title: 'Binary Search Trees & Heaps / Priority Queues',
          goals: ['BST search, insert, delete, validate BST, Kth largest in stream, median in data stream'],
          project: 'Min-Heap / Max-Heap Priority Task Manager',
          notes: ['tree_and_hashing_cheatsheet', 'striver_sde_sheet_notes']
        },
        {
          week: 6,
          title: 'Graphs: BFS, DFS, Topological Sort & Disjoint Set',
          goals: ['Number of islands, course schedule (Kahn algo), Kruskal / Prim MST, Disjoint Set Union (DSU)'],
          project: 'Network Connectivity & Redundant Connection Solver',
          notes: ['striver_sde_sheet_notes']
        },
        {
          week: 7,
          title: 'Dynamic Programming: 1D, 2D & DP on Trees',
          goals: ['Climbing stairs, coin change, house robber, matrix chain multiplication, edit distance'],
          project: 'DP Benchmark & Comparison Suite',
          notes: ['striver_sde_sheet_notes']
        },
        {
          week: 8,
          title: 'Mock Coding Interviews & SDE Sheet Sprint',
          goals: ['Timed 45-minute mock interviews, behavioral STAR method, code explanation technique'],
          project: 'Complete Striver SDE Sheet Completion Log',
          notes: ['striver_sde_sheet_notes', 'roadmaps_collection']
        }
      ],
      100: [
        {
          week: 1,
          title: 'Month 1: Fundamentals, Arrays, Strings & Linear DS',
          goals: ['Master 100+ basic-to-medium questions in Arrays, Strings, Stacks, Queues, Linked Lists'],
          project: 'Core Data Structures Implementation in Java / C++',
          notes: ['01_arrays_leetcode_30', '02_linked_list_leetcode_30', 'core_java_complete_notes']
        },
        {
          week: 2,
          title: 'Month 2: Non-Linear Data Structures (Trees, Graphs, Tries)',
          goals: ['Master Binary Trees, BSTs, Segment Trees, Graphs, Topological Sort, Shortest Paths, Trie autocomplete'],
          project: 'Autocomplete Trie Engine',
          notes: ['tree_and_hashing_cheatsheet', 'striver_sde_sheet_notes']
        },
        {
          week: 3,
          title: 'Month 3: Advanced Algorithms (DP, Greedy, Backtracking, Bit Manipulation)',
          goals: ['DP on grids, partitions, bitmasking, intervals greedy, N-Queens backtracking'],
          project: 'N-Queens & Sudoku Solver',
          notes: ['striver_sde_sheet_notes', 'leetcode_module1_solutions_full']
        },
        {
          week: 4,
          title: 'Days 91-100: Low-Level & High-Level System Design',
          goals: ['Design TinyURL, Rate Limiter, Notification System, Uber backend; OOP Design Patterns'],
          project: 'System Design Diagram Architecture Portfolio',
          notes: ['roadmaps_collection', 'dbms_easy_classroom_notes_vol1']
        }
      ]
    }
  },
  {
    id: 'core_cs',
    name: 'College Semester & Core CS Mastery',
    icon: '🎓',
    tagline: 'OS, DBMS, Computer Networks & OOPs for Exams & Interviews',
    badge: 'Exam & Gate Ace',
    description: 'Ace your university semester exams, GATE, and SDE core technical interviews with complete conceptual clarity.',
    durations: [30, 60],
    defaultDuration: 30,
    color: '#f97316',
    plans: {
      30: [
        {
          week: 1,
          title: 'Operating Systems (OS) Essentials',
          goals: ['Processes vs Threads, CPU Scheduling (FCFS, SJF, Round Robin), Process Synchronization (Semaphores, Mutex)', 'Deadlocks: Banker\'s Algorithm & Prevention', 'Virtual Memory, Paging, Page Faults (LRU, FIFO)'],
          project: 'CPU Scheduling Simulator in Code',
          notes: ['os_operating_systems_notes', 'operating_systems_handwritten_revision']
        },
        {
          week: 2,
          title: 'Database Management Systems (DBMS)',
          goals: ['Relational Model, ER Diagrams, Normalization (1NF, 2NF, 3NF, BCNF)', 'SQL Queries, Joins, Group By, Subqueries', 'Transactions: ACID properties, Concurrency Control (2PL, Timestamp), Indexing (B-Trees)'],
          project: 'Normalized Database Design & SQL Query Bank',
          notes: ['dbms_easy_classroom_notes_vol1', 'dbms_easy_classroom_notes_vol2', 'sql_handwritten_mastery']
        },
        {
          week: 3,
          title: 'Computer Networks (CN)',
          goals: ['OSI 7-Layer & TCP/IP Model', 'Data Link: Framing, Error Detection (CRC), Sliding Window (Go-Back-N)', 'Network Layer: IPv4/IPv6, Subnetting, CIDR, Routing Protocols (OSPF, BGP)', 'Transport: TCP vs UDP, 3-Way Handshake, Flow/Congestion Control'],
          project: 'Subnet Calculator & Network Packet Analyzer',
          notes: ['computer_networks_complete_notes']
        },
        {
          week: 4,
          title: 'Object-Oriented Programming (OOPs) & Java / C++',
          goals: ['Encapsulation, Abstraction, Inheritance, Polymorphism', 'Virtual functions, interfaces, abstract classes', 'SOLID principles and design patterns (Singleton, Factory, Observer)'],
          project: 'Parking Lot / Elevator OOP Design',
          notes: ['core_java_complete_notes', 'java_complete_classroom_notes_vol1']
        }
      ],
      60: [
        {
          week: 1,
          title: 'OS Part 1: Process Management & Concurrency',
          goals: ['System calls, PCB, process states, thread models, IPC (pipes, shared memory), race conditions'],
          project: 'Thread Synchronization Producer-Consumer Demo',
          notes: ['os_operating_systems_notes']
        },
        {
          week: 2,
          title: 'OS Part 2: Memory Management & Storage',
          goals: ['Paging, segmentation, TLB, page replacement algorithms, disk scheduling (SSTF, SCAN)'],
          project: 'Virtual Memory Page Replacement Simulator',
          notes: ['os_operating_systems_notes', 'operating_systems_handwritten_revision']
        },
        {
          week: 3,
          title: 'DBMS Part 1: ER Modelling, Relational Algebra & Normalization',
          goals: ['Functional dependencies, candidate key derivation, decomposition losslessness & dependency preservation'],
          project: 'Automated 3NF Normalization Checker',
          notes: ['dbms_easy_classroom_notes_vol1']
        },
        {
          week: 4,
          title: 'DBMS Part 2: Advanced SQL, Transactions & Storage',
          goals: ['Serializability testing, conflict serializability, WAL (Write-Ahead Logging), crash recovery'],
          project: 'Bank Transaction Simulation with ACID guarantees',
          notes: ['dbms_easy_classroom_notes_vol2', 'sql_handwritten_mastery']
        },
        {
          week: 5,
          title: 'Computer Networks Part 1: Physical, Data Link & Network Layers',
          goals: ['Shannon / Nyquist theorem, CSMA/CD, ARP, DHCP, NAT, IP header fields'],
          project: 'Custom ICMP Ping / Traceroute Script',
          notes: ['computer_networks_complete_notes']
        },
        {
          week: 6,
          title: 'Computer Networks Part 2: Transport & Application Layers',
          goals: ['DNS, HTTP 1.1 vs 2 vs 3, SSL/TLS handshake, TCP Reno / Tahoe congestion control'],
          project: 'HTTP Web Server from Raw TCP Sockets',
          notes: ['computer_networks_complete_notes']
        },
        {
          week: 7,
          title: 'OOPs Architecture & Software Engineering Principles',
          goals: ['UML diagrams, design principles, coupling & cohesion, code smells, refactoring techniques'],
          project: 'Clean Architecture Domain Model',
          notes: ['core_java_complete_notes', 'java_complete_classroom_notes_vol1']
        },
        {
          week: 8,
          title: 'Semester Mock Exams & Previous Years Questions (PYQs)',
          goals: ['Solve 5 past year university examination papers with time constraints'],
          project: 'Comprehensive Core CS Quick Cheat Sheets',
          notes: ['os_operating_systems_notes', 'dbms_easy_classroom_notes_vol1', 'computer_networks_complete_notes']
        }
      ]
    }
  },
  {
    id: 'data_python',
    name: 'Python, Data Analytics & AI Foundations',
    icon: '📊',
    tagline: 'Python, SQL, Pandas, NumPy & Machine Learning Basics',
    badge: 'Trending Career',
    description: 'From zero Python programming to analyzing real-world datasets, building visual dashboards, and foundational AI models.',
    durations: [30, 60],
    defaultDuration: 30,
    color: '#ec4899',
    plans: {
      30: [
        {
          week: 1,
          title: 'Python Essentials & Data Structures',
          goals: ['Variables, data types, lists, dictionaries, tuples, sets, list comprehensions', 'Functions, lambdas, file I/O, error handling'],
          project: 'Automated File Organizer & Log Parser in Python',
          notes: ['python_handwritten_complete_notes', 'python_zero_to_hero_handwritten']
        },
        {
          week: 2,
          title: 'SQL & Database Querying for Analytics',
          goals: ['SELECT, WHERE, GROUP BY, HAVING, ORDER BY', 'INNER/LEFT/RIGHT/CROSS Joins, Window functions (ROW_NUMBER, RANK, DENSE_RANK)', 'CTEs and subqueries'],
          project: 'Business Sales Insights Query Pack',
          notes: ['sql_handwritten_mastery', 'dbms_handwritten_complete']
        },
        {
          week: 3,
          title: 'Data Wrangling with NumPy & Pandas',
          goals: ['NumPy arrays, broadcasting, vectorization', 'Pandas DataFrames, missing data handling, merging, pivot tables, grouping'],
          project: 'Exploratory Data Analysis (EDA) on Real-world Dataset (Kaggle)',
          notes: ['python_handwritten_complete_notes']
        },
        {
          week: 4,
          title: 'Data Visualization & Intro to Machine Learning',
          goals: ['Matplotlib, Seaborn interactive charts, storytelling with data', 'Scikit-Learn: Linear Regression, Logistic Regression, train-test split, metrics (accuracy, precision, recall)'],
          project: 'Customer Churn Prediction Model & Dashboard',
          notes: ['python_handwritten_complete_notes', 'roadmaps_collection']
        }
      ],
      60: [
        {
          week: 1,
          title: 'Python Deep Dive (OOP, Iterators, Generators & Decorators)',
          goals: ['Classes, dunder methods, generators, context managers, clean PEP8 coding'],
          project: 'Custom Data Pipeline Simulator',
          notes: ['python_handwritten_complete_notes', 'python_zero_to_hero_handwritten']
        },
        {
          week: 2,
          title: 'Advanced SQL & Data Modeling',
          goals: ['Star schema, snowflake schema, analytical window functions, stored procedures'],
          project: 'E-commerce Analytical Warehouse Model',
          notes: ['sql_handwritten_mastery']
        },
        {
          week: 3,
          title: 'NumPy & Mathematics for Machine Learning',
          goals: ['Linear algebra (matrices, eigenvalues), basic calculus (gradients), probability & statistics'],
          project: 'Matrix Operations from Scratch',
          notes: ['python_zero_to_hero_handwritten']
        },
        {
          week: 4,
          title: 'Pandas Masterclass & Data Cleaning',
          goals: ['Outlier detection, regex text cleaning, time-series analysis with pandas date_range'],
          project: 'Stock Market Trend Analysis Notebook',
          notes: ['python_handwritten_complete_notes']
        },
        {
          week: 5,
          title: 'Exploratory Data Analysis & Business Intelligence Dashboards',
          goals: ['Plotly interactive charts, Streamlit or Dash web apps'],
          project: 'Live Interactive BI Dashboard in Streamlit',
          notes: ['web_html_css_js_complete_cheatsheet']
        },
        {
          week: 6,
          title: 'Supervised Learning Algorithms',
          goals: ['Decision Trees, Random Forests, Support Vector Machines (SVM), Hyperparameter tuning with GridSearchCV'],
          project: 'House Price Prediction with Feature Engineering',
          notes: ['python_handwritten_complete_notes']
        },
        {
          week: 7,
          title: 'Unsupervised Learning & NLP Basics',
          goals: ['K-Means clustering, PCA dimensionality reduction, TF-IDF, sentiment analysis with NLTK/Spacy'],
          project: 'Customer Segmentation & Review Sentiment Classifier',
          notes: ['python_handwritten_complete_notes']
        },
        {
          week: 8,
          title: 'Portfolio Projects, Capstone & Resume Building',
          goals: ['Deploy model to Hugging Face / Streamlit Cloud, write technical documentation, LinkedIn showcase'],
          project: 'Production ML End-to-End Capstone Project',
          notes: ['roadmaps_collection']
        }
      ]
    }
  }
];

export const PORTFOLIO_INFO = {
  name: 'Akshit Bhardwaj',
  role: 'Full-Stack Software Engineer & Creative Developer',
  tagline: 'Crafting high-performance web systems, 3D interactive experiences, and AI-powered applications.',
  experience: '3+ years building modern digital products, scalable SaaS platforms, and developer tooling.',
  location: 'India (Available Globally for Remote Work & Contracts)',
  stats: {
    projects: '20+ Production Applications',
    notes: '62 Comprehensive PDF Handbooks',
    satisfaction: '100% Client Satisfaction',
    githubCommits: '500+ Commits this year'
  },
  coreSkills: [
    'React.js / Next.js (App Router, Server Components, SSR)',
    'Node.js / Express / REST & GraphQL APIs',
    'PostgreSQL / MongoDB / Prisma / Redis',
    'Three.js / WebGL / Framer Motion / Modern CSS',
    'AI Integrations (Gemini, OpenAI, Vector DBs, Agents)',
    'Docker / Cloud Hosting (Vercel, AWS, Render, DigitalOcean)'
  ],
  services: [
    {
      title: 'Full-Stack Web Development',
      description: 'End-to-end web applications built with Next.js/React, secure backend APIs, database architecture, and lightning-fast loading speeds.'
    },
    {
      title: '3D & High-End Interactive UI/UX',
      description: 'Award-winning digital experiences featuring Three.js, WebGL particle shaders, smooth micro-interactions, and glassmorphism design.'
    },
    {
      title: 'SaaS MVP Development',
      description: 'Taking your product from napkin sketch to launched MVP with authentication, Stripe payments, and analytics in weeks.'
    },
    {
      title: 'AI Chatbots & Workflow Automation',
      description: 'Custom AI conversational agents, RAG document search, and intelligent workflow automations.'
    }
  ],
  socialLinks: {
    github: 'https://github.com/Akshh-bhardwaj',
    linkedin: 'https://www.linkedin.com/in/akshit-bhardwaj',
    instagram: 'https://www.instagram.com/akshbuilds',
    email: 'akshbuild@gmail.com',
    portfolioUrl: 'https://akshbuilds.tech'
  }
};

// Quick prompt suggestions for student mode
export const STUDENT_QUICK_PROMPTS = [
  '⚡ Generate a 60-Day Full-Stack Roadmap',
  '🎯 30-Day FAANG & DSA Placement Plan',
  '📚 Best Notes for Semester OS & DBMS',
  '🐍 Python & Data Analytics Track',
  '🔑 How do I unlock all 62 notes?'
];

// Quick prompt suggestions for recruiter/client mode
export const CLIENT_QUICK_PROMPTS = [
  '💼 What services do you offer?',
  '🚀 What tech stack do you use?',
  '📁 Show me your top projects',
  '🤝 How can I hire or contact Akshit?'
];

// Helper to look up note metadata by id or filename keyword
export function getNoteDetails(noteIdOrKeyword) {
  if (!noteIdOrKeyword) return null;
  const lower = noteIdOrKeyword.toLowerCase();
  return (
    notesList.find(n => n.id.toLowerCase() === lower || n.filename.toLowerCase() === lower) ||
    notesList.find(n => n.title.toLowerCase().includes(lower) || n.filename.toLowerCase().includes(lower))
  );
}

// Generate tailored study plan object
export function buildCustomPlan({ trackId, duration = 60, hoursPerDay = 3 }) {
  const track = CAREER_TRACKS.find(t => t.id === trackId) || CAREER_TRACKS[0];
  const availableDurations = track.durations;
  const closestDuration = availableDurations.reduce((prev, curr) => 
    Math.abs(curr - duration) < Math.abs(prev - duration) ? curr : prev
  );
  
  const schedule = track.plans[closestDuration] || track.plans[track.defaultDuration];

  // Resolve notes objects for each week
  const enrichedSchedule = schedule.map(weekPlan => {
    const resolvedNotes = weekPlan.notes.map(nKey => {
      const found = getNoteDetails(nKey);
      if (found) return found;
      return {
        id: nKey,
        title: nKey.replace(/_/g, ' ').toUpperCase(),
        path: `/notes/${nKey}.pdf`,
        badge: 'Study Note',
        pages: 'PDF Guide'
      };
    });

    return {
      ...weekPlan,
      resolvedNotes
    };
  });

  return {
    track,
    duration: closestDuration,
    hoursPerDay,
    totalWeeks: enrichedSchedule.length,
    schedule: enrichedSchedule
  };
}

// Natural language query processor
export function processChatQuery(query, mode = 'student') {
  const q = query.toLowerCase().trim();

  // Mode: Student queries
  if (mode === 'student') {
    // Check for note unlocking
    if (q.includes('unlock') || q.includes('access') || q.includes('password') || q.includes('locked') || q.includes('free')) {
      return {
        text: `**How to Unlock All 62 PDF Notes:**\n\n1. Simply scroll up to the **Interactive Notes** section on the website.\n2. Click the **Unlock All Notes** button.\n3. Follow Akshit on Instagram (\`@akshbuilds\`) to support our open-source student community.\n4. Click **I Followed — Unlock Now** and your instant direct download / online reader access will immediately be activated!\n\nAll 62 notes (DSA, Core CS, Full-Stack, Java, Python, Roadmaps) are 100% free!`,
        action: 'scroll_to_notes',
        actionLabel: 'Go to Notes Section 📂'
      };
    }

    // Check for Full Stack
    if (q.includes('full stack') || q.includes('fullstack') || q.includes('web dev') || q.includes('mern') || q.includes('react') || q.includes('frontend') || q.includes('backend')) {
      return {
        text: `Here is your customized **Full-Stack Web Development Course Plan**! 🚀\n\nI recommend our structured **60-Day Full-Stack Roadmap** covering:\n- **Week 1-2**: HTML5, Modern CSS, Flexbox/Grid, and ES6+ JavaScript.\n- **Week 3-4**: React.js Architecture, Hooks, Context API & Tailwind CSS.\n- **Week 5-6**: Node.js, Express REST APIs, MongoDB & SQL.\n- **Week 7-8**: WebSockets, Docker, Deployment & Portfolio Polish.\n\nUse the **Plan Builder** tab above to view the full interactive checklist and get direct links to handwritten PDF handbooks!`,
        suggestedTrack: 'fullstack'
      };
    }

    // Check for DSA / FAANG
    if (q.includes('dsa') || q.includes('faang') || q.includes('leetcode') || q.includes('algorithm') || q.includes('data structure') || q.includes('tree') || q.includes('graph') || q.includes('dp')) {
      return {
        text: `Ready to crack your dream tech placement? ⚡\n\nOur **DSA & FAANG Preparation Track** focuses on high-yield patterns:\n- **Two Pointers & Sliding Window** (Array 30 LeetCode Guide)\n- **Cycle Detection & Reversals** (Linked List 30 Guide)\n- **Trees & Graphs** (111-Page Trees & Hashing Cheatsheet)\n- **Dynamic Programming** (Striver SDE Sheet Notes)\n\nSwitch to the **Course Planner** above to generate your customized 30/60/100-day schedule!`,
        suggestedTrack: 'dsa_faang'
      };
    }

    // Check for College / Semester / Core CS
    if (q.includes('semester') || q.includes('college') || q.includes('os') || q.includes('dbms') || q.includes('computer networks') || q.includes('cn') || q.includes('oops') || q.includes('exam')) {
      return {
        text: `Studying for upcoming semester exams or technical interviews? 🎓\n\nOur **Core CS Mastery Plan** breaks down:\n1. **Operating Systems**: Processes, Semaphores, Deadlocks & Virtual Memory.\n2. **DBMS**: Normalization, B-Trees, Transactions & SQL Joins.\n3. **Computer Networks**: OSI Layers, Subnetting, TCP 3-Way Handshake.\n4. **OOPs in Java/C++**: Polymorphism, Inheritance & SOLID Principles.\n\nAll notes in this track are handwritten classroom notes ready for quick revision!`,
        suggestedTrack: 'core_cs'
      };
    }

    // Check for Python / Data
    if (q.includes('python') || q.includes('data') || q.includes('pandas') || q.includes('sql') || q.includes('ai') || q.includes('machine learning')) {
      return {
        text: `Starting with Python and Data Analytics? 📊\n\nWe have a dedicated **30 & 60-Day Python & Data Roadmap**:\n- **Python Zero-to-Hero Handwritten Notes**\n- **SQL Mastery & Query Bank**\n- **NumPy, Pandas, Matplotlib & EDA**\n- **Intro to Scikit-Learn & ML Models**\n\nClick **Course Planner** to get the week-by-week blueprint!`,
        suggestedTrack: 'data_python'
      };
    }

    // Default student response
    return {
      text: `Hello! I'm **AkshBot**, your dedicated AI Career & Course Mentor! 🎓\n\nI can help you build customized study roadmaps, prepare for campus placements, or find the right handwritten notes among our **62 comprehensive PDFs**.\n\nTry clicking one of the quick suggestions below or switch to the **Course Planner** tab to generate an interactive 30, 60, or 100-day study plan!`
    };
  }

  // Mode: Client / Recruiter queries
  if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('call') || q.includes('reach') || q.includes('rate') || q.includes('price')) {
    return {
      text: `**Let's build something extraordinary together!** 🤝\n\nAkshit is open for freelance projects, contract roles, and full-time software engineering opportunities.\n\n- **Email**: \`${PORTFOLIO_INFO.socialLinks.email}\`\n- **LinkedIn**: [Akshit Bhardwaj](${PORTFOLIO_INFO.socialLinks.linkedin})\n- **GitHub**: [github.com/Akshh-bhardwaj](${PORTFOLIO_INFO.socialLinks.github})\n- **Instagram**: [@akshbuilds](${PORTFOLIO_INFO.socialLinks.instagram})\n\nFeel free to drop a message in the **Contact Form** below or send an email directly!`,
      action: 'scroll_to_contact',
      actionLabel: 'Jump to Contact Form ✉️'
    };
  }

  if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('build')) {
    return {
      text: `Akshit specializes in building **high-performance web systems**, **3D interactive applications**, and **AI-driven products**.\n\nFeatured work includes:\n- **AkshBuilds Platform**: Modern 3D WebGL developer ecosystem & learning hub.\n- **Full-Stack SaaS MVPs**: Scalable auth, payment workflows, and real-time data sync.\n- **Creative Portfolios & 3D Visualizers**: Built with Three.js, GSAP, and Tailwind CSS.\n\nScroll to the **Projects** section to view live demos and source code!`,
      action: 'scroll_to_projects',
      actionLabel: 'View Projects 🚀'
    };
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('react') || q.includes('node')) {
    return {
      text: `**Akshit's Core Tech Stack:**\n\n- **Frontend**: React.js, Next.js, TypeScript, Tailwind CSS, Three.js / WebGL, Framer Motion.\n- **Backend**: Node.js, Express, REST & GraphQL APIs, Python, Microservices.\n- **Databases**: PostgreSQL, MongoDB, Redis, Prisma ORM.\n- **DevOps & Cloud**: Docker, Git, CI/CD, AWS, Vercel, Linux System Admin.\n- **AI Tools**: Gemini API, OpenAI API, LangChain, Vector Embeddings.`,
      action: 'scroll_to_tools',
      actionLabel: 'See Tools & Tech 🛠️'
    };
  }

  // Default client response
  return {
    text: `Hello! I'm **AkshBot**, Akshit Bhardwaj's digital portfolio assistant. 💼\n\nI can provide insights into Akshit's technical capabilities, past production projects, architecture style, or connect you directly for a project consultation.\n\nHow can I help you today?`
  };
}
