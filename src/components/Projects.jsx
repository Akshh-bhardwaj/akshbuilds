import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projectData = [
  {
    id: 1,
    title: 'Xyzzy Traders',
    subtitle: 'B2B Wholesale Platform',
    type: 'Full-Stack / B2B SaaS',
    status: 'shipped',
    problem: 'Indian kirana store owners had no reliable, low-bandwidth digital channel to place wholesale orders or track fleet deliveries.',
    solution: 'Built a complete decoupled B2B ordering + fleet-tracking system for 3 user roles (shopkeeper, agent, admin) with a built-in offline simulation mode using localStorage when the backend is unreachable.',
    impact: 'Fully functional on 2G — offline mode seeds all data into localStorage with zero config so no order is ever lost.',
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Leaflet.js'],
    color: '#10b981',
    image: '/assets/project_backend_api_1775025512690.webp',
    github: 'https://github.com/Akshh-bhardwaj/trader-demo',
    featured: true,
  },
  {
    id: 2,
    title: 'Premium Chess',
    subtitle: 'Full-Stack App',
    type: 'Full-Stack App',
    status: 'shipped',
    problem: 'Most chess interfaces are heavy, visually dated, and can\'t isolate concurrent game sessions cleanly.',
    solution: 'Full-stack chess app with Flask + python-chess for strict server-side move validation, check/checkmate/castling enforcement, and unique session IDs per player.',
    impact: 'Session-isolated board state — 100+ concurrent games with zero state bleed.',
    stack: ['Python', 'Flask', 'python-chess', 'HTML', 'CSS', 'JavaScript'],
    color: '#a78bfa',
    image: '/assets/project_premium_chess_1775025919148.webp',
    github: 'https://github.com/Akshh-bhardwaj/Premium-Chess',
  },
  {
    id: 3,
    title: 'Dora — AI Chatbot UI',
    subtitle: 'AI / Frontend',
    type: 'AI / Frontend',
    status: 'shipped',
    problem: 'AI chat interfaces feel generic — no personality, no polish, no attention to interaction detail.',
    solution: 'Glassmorphic AI chat UI with animated mesh gradient background, custom typing delays, micro-animations, and avatar-based message bubbles — built to connect to any LLM backend.',
    impact: 'Sub-100ms perceived response latency via optimistic UI + streaming-ready message rendering.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Groq API'],
    color: '#00d4ff',
    image: '/assets/project_chatbot_1775025903371.webp',
    github: 'https://github.com/Akshh-bhardwaj/DORA',
  },
  {
    id: 4,
    title: 'Smart City Analytics',
    subtitle: 'Data Science Dashboard',
    type: 'Data Science / ML',
    status: 'shipped',
    problem: 'City planners lack a unified interactive tool to analyse traffic, air quality, and weather patterns together.',
    solution: 'Interactive Streamlit dashboard with ML-powered traffic forecasting, AQI trend analysis, and weather pattern visualisation — backed by real dataset pipelines.',
    impact: 'Integrated 4 ML models (traffic, air quality, weather, energy) in a single live dashboard.',
    stack: ['Python', 'Streamlit', 'Pandas', 'scikit-learn', 'Matplotlib'],
    color: '#f43f5e',
    image: '/assets/project_ai_tracker_1775024442510.webp',
    github: 'https://github.com/Akshh-bhardwaj/SmartCityAnalytics',
  },
  {
    id: 5,
    title: 'DSA Visualiser',
    subtitle: 'Dev Tool in C',
    type: 'Dev Tool / Education',
    status: 'shipped',
    problem: 'Learning data structures from static textbooks is ineffective — students need to see operations happen live.',
    solution: 'Terminal-based menu-driven DSA visualiser in C — users interactively insert, delete, and traverse Stacks, Queues, Linked Lists, and Trees with real-time console animation.',
    impact: 'Covers 8 core DSA structures with step-by-step animated traversal — zero dependencies, runs anywhere.',
    stack: ['C', 'Terminal UI', 'Data Structures'],
    color: '#fbbf24',
    image: '/assets/project_video_dash_1775024426115.webp',
    github: 'https://github.com/Akshh-bhardwaj/DSA_visulaiser',
  },
  {
    id: 6,
    title: 'Groq Chatbot UI',
    subtitle: 'AI / Frontend',
    type: 'AI / Frontend',
    status: 'shipped',
    problem: 'Groq\'s ultra-fast inference had no polished lightweight frontend — just raw API.',
    solution: 'Clean, responsive chat UI in pure HTML/CSS/JS with fixed input bar, styled message bubbles, and Groq API integration — deployable with no build step.',
    impact: 'Zero-dependency deployment — single HTML file, instant load, works on any host.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Groq API'],
    color: '#f97316',
    image: '/assets/project_chatbot_1775025903371.webp',
    github: 'https://github.com/Akshh-bhardwaj/chatbot-grrok-',
  },
];

const notesData = {
  c: [
    { category: 'Arrays & Strings', files: [
      { name: 'two_sum.c', path: 'Arrays/two_sum.c' },
      { name: 'max_min_element.c', path: 'Arrays/max_min_element.c' },
      { name: 'reverse_array.c', path: 'Arrays/reverse_array.c' },
      { name: 'move_zeroes.c', path: 'Arrays/move_zeroes.c' },
      { name: 'prefix_sum.c', path: 'Arrays/prefix_sum.c' },
      { name: 'palindrome.c', path: 'Strings/palindrome.c' },
      { name: 'anagram.c', path: 'Strings/anagram.c' },
      { name: 'reverse_string.c', path: 'Strings/reverse_string.c' },
    ]},
    { category: 'Linked List & Stacks', files: [
      { name: 'insert_node.c', path: 'LinkedList/insert_node.c' },
      { name: 'delete_node.c', path: 'LinkedList/delete_node.c' },
      { name: 'reverse_list.c', path: 'LinkedList/reverse_list.c' },
      { name: 'doubly_linked_list.c', path: 'LinkedList/doubly_linked_list.c' },
      { name: 'stack_array.c', path: 'Stack/stack_array.c' },
      { name: 'stack_linkedlist.c', path: 'Stack/stack_linkedlist.c' },
    ]},
    { category: 'Queue & Recursion', files: [
      { name: 'queue_array.c', path: 'Queue/queue_array.c' },
      { name: 'queue_linkedlist.c', path: 'Queue/queue_linkedlist.c' },
      { name: 'factorial.c', path: 'Recursion/factorial.c' },
      { name: 'fibonacci.c', path: 'Recursion/fibonacci.c' },
    ]},
    { category: 'Trees & BST', files: [
      { name: 'bst_insert.c', path: 'Trees/bst_insert.c' },
      { name: 'inorder_traversal.c', path: 'Trees/inorder_traversal.c' },
      { name: 'bst_height.c', path: 'Trees/bst_height.c' },
    ]},
    { category: 'Graph Algorithms', files: [
      { name: 'graph_representation.c', path: 'Graphs/graph_representation.c' },
      { name: 'graph_bfs.c', path: 'Graphs/graph_bfs.c' },
      { name: 'graph_dfs.c', path: 'Graphs/graph_dfs.c' },
      { name: 'cycle_detection.c', path: 'Graphs/cycle_detection.c' },
      { name: 'topological_sort.c', path: 'Graphs/topological_sort.c' },
      { name: 'dijkstra.c', path: 'Graphs/dijkstra.c' },
      { name: 'bellman_ford.c', path: 'Graphs/bellman_ford.c' },
      { name: 'floyd_warshall.c', path: 'Graphs/floyd_warshall.c' },
      { name: 'kruskal_mst.c', path: 'Graphs/kruskal_mst.c' },
      { name: 'prims_mst.c', path: 'Graphs/prims_mst.c' },
      { name: 'bipartite_check.c', path: 'Graphs/bipartite_check.c' },
      { name: 'number_of_islands.c', path: 'Graphs/number_of_islands.c' },
      { name: 'kosaraju_scc.c', path: 'Graphs/kosaraju_scc.c' },
      { name: 'bridges_articulation.c', path: 'Graphs/bridges_articulation.c' },
    ]},
    { category: 'Sorting & Searching', files: [
      { name: 'bubble_sort.c', path: 'Sorting/bubble_sort.c' },
      { name: 'insertion_sort.c', path: 'Sorting/insertion_sort.c' },
      { name: 'merge_sort.c', path: 'Sorting/merge_sort.c' },
      { name: 'quick_sort.c', path: 'Sorting/quick_sort.c' },
      { name: 'linear_search.c', path: 'Searching/linear_search.c' },
      { name: 'binary_search.c', path: 'Searching/binary_search.c' },
    ]},
  ],
  java: [
    { category: 'Java Internals & OOP', files: [
      { name: 'JVMAndStringDemo.java', path: 'JavaInternals/JVMAndStringDemo.java' },
      { name: 'SOLIDPayrollDemo.java', path: 'OOP/SOLIDPayrollDemo.java' },
    ]},
    { category: 'Collections & Generics', files: [
      { name: 'CustomGenericStack.java', path: 'Collections/CustomGenericStack.java' },
      { name: 'HashMapCollisionDemo.java', path: 'Collections/HashMapCollisionDemo.java' },
    ]},
    { category: 'Streams & Lambdas', files: [
      { name: 'EmployeeStreamDemo.java', path: 'Streams/EmployeeStreamDemo.java' },
    ]},
    { category: 'Concurrency', files: [
      { name: 'ProducerConsumerDemo.java', path: 'Concurrency/ProducerConsumerDemo.java' },
      { name: 'ThreadSafeLRUCache.java', path: 'Concurrency/ThreadSafeLRUCache.java' },
    ]},
    { category: 'Dynamic Programming', files: [
      { name: 'DPDemo.java', path: 'DynamicProgramming/DPDemo.java' },
    ]},
  ],
  python: [
    { category: 'Advanced Core & OOP', files: [
      { name: 'Advanced OOP (Metaclasses, Descriptors)', path: 'Advanced/01_advanced_oop' },
      { name: 'Decorators & Generators (Closures, Lazy Load)', path: 'Advanced/02_decorators_and_generators' },
      { name: 'Memory Management (GC, Slots, Weakref)', path: 'Advanced/03_memory_management' },
      { name: 'Metaprogramming & Introspection', path: 'Advanced/05_metaprogramming' },
    ]},
    { category: 'Concurrency & Design Patterns', files: [
      { name: 'Concurrency & Asyncio (GIL, Threads, Async)', path: 'Advanced/04_concurrency_and_asyncio' },
      { name: 'Enterprise Design Patterns', path: 'Advanced/06_design_patterns' },
    ]},
    { category: 'Enterprise Python Development', files: [
      { name: 'Testing & Mocking', path: 'Advanced/07_testing_and_logging' },
      { name: 'Advanced Collections & Containers', path: 'Advanced/08_advanced_data_structures' },
      { name: 'Database Integrations & ORMs', path: 'Advanced/09_database_integration' },
      { name: 'System Pipelines & TCP Networking', path: 'Advanced/10_system_and_networking' },
    ]},
  ],
  interview: [
    { category: 'Google LeetCode Questions', files: [
      { name: 'Last 30 Days (Immediate)', path: 'google/thirty-days.csv' },
      { name: 'Last 3 Months (Recent Trends)', path: 'google/three-months.csv' },
      { name: 'Last 6 Months (Core Prep)', path: 'google/six-months.csv' },
      { name: 'All Historical Questions', path: 'google/all.csv' },
    ]},
    { category: 'Amazon LeetCode Questions', files: [
      { name: 'Last 30 Days (Immediate)', path: 'amazon/thirty-days.csv' },
      { name: 'Last 3 Months (Recent Trends)', path: 'amazon/three-months.csv' },
      { name: 'Last 6 Months (Core Prep)', path: 'amazon/six-months.csv' },
      { name: 'All Historical Questions', path: 'amazon/all.csv' },
    ]},
    { category: 'Microsoft LeetCode Questions', files: [
      { name: 'Last 30 Days (Immediate)', path: 'microsoft/thirty-days.csv' },
      { name: 'Last 3 Months (Recent Trends)', path: 'microsoft/three-months.csv' },
      { name: 'Last 6 Months (Core Prep)', path: 'microsoft/six-months.csv' },
      { name: 'All Historical Questions', path: 'microsoft/all.csv' },
    ]},
    { category: 'Meta LeetCode Questions', files: [
      { name: 'Last 30 Days (Immediate)', path: 'meta/thirty-days.csv' },
      { name: 'Last 3 Months (Recent Trends)', path: 'meta/three-months.csv' },
      { name: 'Last 6 Months (Core Prep)', path: 'meta/six-months.csv' },
      { name: 'All Historical Questions', path: 'meta/all.csv' },
    ]},
    { category: 'Apple LeetCode Questions', files: [
      { name: 'Last 30 Days (Immediate)', path: 'apple/thirty-days.csv' },
      { name: 'Last 3 Months (Recent Trends)', path: 'apple/three-months.csv' },
      { name: 'Last 6 Months (Core Prep)', path: 'apple/six-months.csv' },
      { name: 'All Historical Questions', path: 'apple/all.csv' },
    ]},
    { category: 'Netflix LeetCode Questions', files: [
      { name: 'Last 30 Days (Immediate)', path: 'netflix/thirty-days.csv' },
      { name: 'Last 3 Months (Recent Trends)', path: 'netflix/three-months.csv' },
      { name: 'Last 6 Months (Core Prep)', path: 'netflix/six-months.csv' },
      { name: 'All Historical Questions', path: 'netflix/all.csv' },
    ]},
    { category: 'Uber LeetCode Questions', files: [
      { name: 'Last 30 Days (Immediate)', path: 'uber/thirty-days.csv' },
      { name: 'Last 3 Months (Recent Trends)', path: 'uber/three-months.csv' },
      { name: 'Last 6 Months (Core Prep)', path: 'uber/six-months.csv' },
      { name: 'All Historical Questions', path: 'uber/all.csv' },
    ]},
    { category: 'Bloomberg LeetCode Questions', files: [
      { name: 'Last 30 Days (Immediate)', path: 'bloomberg/thirty-days.csv' },
      { name: 'Last 3 Months (Recent Trends)', path: 'bloomberg/three-months.csv' },
      { name: 'Last 6 Months (Core Prep)', path: 'bloomberg/six-months.csv' },
      { name: 'All Historical Questions', path: 'bloomberg/all.csv' },
    ]},
    { category: 'OpenAI LeetCode Questions', files: [
      { name: 'Last 30 Days (Immediate)', path: 'openai/thirty-days.csv' },
      { name: 'Last 3 Months (Recent Trends)', path: 'openai/three-months.csv' },
      { name: 'Last 6 Months (Core Prep)', path: 'openai/six-months.csv' },
      { name: 'All Historical Questions', path: 'openai/all.csv' },
    ]},
    { category: 'Selenium Scraper Core Tool', files: [
      { name: 'Scraper.java (Scraper Code)', path: 'src/main/java/Scraper.java' },
      { name: 'Main.java (Application Entrypoint)', path: 'src/main/java/Main.java' },
      { name: 'Scraper Documentation Guide', path: 'README.md' },
    ]},
  ],
};

const graphCheatSheet = [
  { type: 'Shortest path (unweighted)',     alg: 'BFS',                comp: 'O(V + E)'     },
  { type: 'Shortest path (weighted, ≥0)',   alg: 'Dijkstra',           comp: 'O(V² / ElogV)'},
  { type: 'Shortest path (negative wts)',   alg: 'Bellman-Ford',       comp: 'O(V × E)'     },
  { type: 'All-pairs shortest path',        alg: 'Floyd-Warshall',     comp: 'O(V³)'        },
  { type: 'Minimum Spanning Tree (sparse)', alg: 'Kruskal + UnionFind', comp: 'O(E log E)'  },
  { type: 'Minimum Spanning Tree (dense)',  alg: "Prim's",             comp: 'O(V²)'        },
  { type: 'Topological ordering / cycle',   alg: "Kahn's BFS / DFS",   comp: 'O(V + E)'     },
  { type: 'Strongly Connected Components',  alg: "Kosaraju's",         comp: 'O(V + E)'     },
  { type: 'Bridges / Articulation Points',  alg: "Tarjan's DFS",       comp: 'O(V + E)'     },
  { type: 'Bipartite check',               alg: 'BFS/DFS 2-coloring',  comp: 'O(V + E)'     },
  { type: 'Flood fill / Islands',           alg: 'BFS / DFS',          comp: 'O(R × C)'     },
  { type: 'Cycle detection (undirected)',   alg: 'DFS or Union-Find',  comp: 'O(V + E)'     },
  { type: 'Cycle detection (directed)',     alg: 'DFS + rec stack',    comp: 'O(V + E)'     },
];

// language meta — icons, labels, repo base URLs
const LANG_META = {
  c:         { label: 'C / C++ DSA',     icon: 'fa-solid fa-code',      repoBase: 'https://github.com/Akshh-bhardwaj/dsa-in-c/blob/main/',                       repo: 'dsa-in-c'          },
  java:      { label: 'Java & Internals', icon: 'fa-brands fa-java',     repoBase: 'https://github.com/Akshh-bhardwaj/dsa/blob/main/java/',                        repo: 'dsa'               },
  python:    { label: 'Python Advanced',  icon: 'fa-brands fa-python',   repoBase: 'https://github.com/Akshh-bhardwaj/python/tree/main/',                          repo: 'python'            },
  interview: { label: 'Interview Prep',   icon: 'fa-solid fa-terminal',  repoBase: 'https://github.com/Akshh-bhardwaj/interview-question/blob/master/',            repo: 'interview-question'},
};

export default function Projects() {
  const [selectedId, setSelectedId]       = useState(null);
  const [notesLang, setNotesLang]         = useState(null);   // which language card was clicked
  const [notesTopic, setNotesTopic]       = useState(null);   // which topic card was clicked
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  const active = projectData.find(p => p.id === selectedId);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (isCheatSheetOpen) { setIsCheatSheetOpen(false); return; }
        if (notesTopic) { setNotesTopic(null); return; }
        if (notesLang)  { setNotesLang(null);  return; }
        setSelectedId(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [notesLang, notesTopic, isCheatSheetOpen]);

  const activeLang  = notesLang  ? LANG_META[notesLang]                                      : null;
  const activeTopicData = (notesLang && notesTopic)
    ? notesData[notesLang].find(c => c.category === notesTopic)
    : null;

  return (
    <>
      <style>{`
        /* ── grid ── */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          background: var(--glass-border);
        }
        @media (max-width: 900px) { .proj-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .proj-grid { grid-template-columns: 1fr; } }

        /* ── card ── */
        .proj-card {
          position: relative;
          background: var(--bg-secondary);
          overflow: hidden;
          cursor: pointer;
          transition: background 0.25s, box-shadow 0.25s;
        }

        /* Colored top accent bar per project */
        .proj-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--proj-color);
          box-shadow: 0 0 16px var(--proj-color);
          opacity: 0.7;
          z-index: 2;
          transition: opacity 0.25s, height 0.25s;
        }
        .proj-card:hover::before {
          opacity: 1;
          height: 3px;
        }
        .proj-card:hover {
          background: var(--bg-tertiary);
          box-shadow: inset 0 0 60px rgba(0,0,0,0.3), 0 0 0 1px var(--proj-color);
        }

        .proj-card-img {
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          display: block;
          position: relative;
        }
        /* Colored overlay on image */
        .proj-card-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 40%, var(--bg-secondary) 100%);
          pointer-events: none;
        }
        .proj-card-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease, filter 0.3s;
          filter: brightness(0.8) saturate(0.85);
        }
        .proj-card:hover .proj-card-img img {
          transform: scale(1.06);
          filter: brightness(1) saturate(1.1);
        }

        .proj-card-body {
          padding: 20px 22px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .proj-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .proj-type-tag {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--proj-color);
          opacity: 0.8;
        }

        .proj-shipped {
          display: inline-flex; align-items: center; gap: 4px;
          font-family: var(--font-mono); font-size: 0.6rem;
          color: var(--accent-green);
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.18);
          padding: 2px 7px; border-radius: 20px;
        }

        .proj-card-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: -0.02em;
          line-height: 1.25;
          color: var(--text-main);
          transition: color 0.2s;
        }
        .proj-card:hover .proj-card-title { color: var(--proj-color); }

        .proj-card-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .proj-stack-row {
          display: flex; flex-wrap: wrap; gap: 5px;
          margin-top: 2px;
        }
        .proj-stack-pill {
          font-family: var(--font-mono); font-size: 0.6rem;
          padding: 2px 8px; border-radius: 4px;
          border: 1px solid rgba(255,255,255,0.07);
          color: var(--text-dim);
          background: rgba(255,255,255,0.03);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .proj-card:hover .proj-stack-pill {
          border-color: var(--proj-color);
          color: var(--proj-color);
          background: rgba(0,0,0,0.2);
          opacity: 0.75;
        }

        .proj-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 10px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .proj-deep-btn {
          font-family: var(--font-mono); font-size: 0.68rem;
          color: var(--text-muted);
          background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 5px;
          padding: 0; transition: color 0.2s;
        }
        .proj-card:hover .proj-deep-btn { color: var(--proj-color); }

        .proj-gh-link {
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.07);
          color: var(--text-muted);
          background: rgba(255,255,255,0.02);
          font-size: 0.85rem;
          transition: all 0.2s;
          text-decoration: none;
        }
        .proj-gh-link:hover {
          color: var(--text-main);
          border-color: var(--proj-color);
          box-shadow: 0 0 12px var(--proj-color);
        }

        /* ── modal ── */
        .proj-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(14px);
          z-index: 2000;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
        }
        .proj-modal {
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          width: 100%; max-width: 720px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .proj-modal-img {
          width: 100%; aspect-ratio: 16/7;
          object-fit: cover;
          border-radius: 20px 20px 0 0;
          display: block;
        }
        .proj-modal-body { padding: 32px; display: flex; flex-direction: column; gap: 20px; }
        @media (max-width: 600px) { .proj-modal-body { padding: 20px; } }
        .proj-modal-close {
          position: absolute; top: 14px; right: 14px;
          width: 32px; height: 32px; border-radius: 8px;
          border: 1px solid var(--glass-border);
          background: var(--bg-secondary);
          color: var(--text-muted);
          cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          z-index: 1;
        }
        .proj-modal-close:hover { color: var(--accent-color); border-color: var(--accent-color); }
        .proj-info-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        @media (max-width: 560px) { .proj-info-row { grid-template-columns: 1fr; } }
        .proj-info-box {
          border-radius: 10px; padding: 16px;
        }
      `}</style>

      <section id="projects" className="section">
        <div className="container">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 48 }}
          >
            <span className="section-label">// projects.featured</span>
            <h2 className="section-title">Major <span className="text-glow">Projects</span></h2>
            <p className="section-subtitle">Real problems. Real solutions. Real impact.</p>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="proj-grid"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {projectData.map((p, i) => (
              <motion.div
                key={p.id}
                className="proj-card"
                style={{ '--proj-color': p.color, transformStyle: 'preserve-3d', perspective: '800px' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelectedId(p.id)}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el._rect = el.getBoundingClientRect();
                  el._glare = el.querySelector('.proj-glare');
                }}
                onMouseMove={e => {
                  const el = e.currentTarget;
                  const rect = el._rect || el.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width  - 0.5;
                  const y = (e.clientY - rect.top)  / rect.height - 0.5;
                  el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.02)`;
                  const glare = el._glare;
                  if (glare) {
                    glare.style.opacity = '1';
                    glare.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
                  }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
                  const glare = el._glare;
                  if (glare) glare.style.opacity = '0';
                  el._rect = null;
                  el._glare = null;
                }}
              >
                {/* Holographic glare overlay */}
                <div className="proj-glare" style={{
                  position: 'absolute', inset: 0, borderRadius: 'inherit',
                  opacity: 0, transition: 'opacity 0.15s', pointerEvents: 'none', zIndex: 5,
                }} />

                {/* Image */}
                <div className="proj-card-img">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>

                {/* Body */}
                <div className="proj-card-body">
                  <div className="proj-card-meta">
                    <span className="proj-type-tag">{p.type}</span>
                    <span className="proj-shipped">
                      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-green)' }} />
                      shipped
                    </span>
                  </div>

                  <div className="proj-card-title">{p.title}</div>
                  <div className="proj-card-sub">{p.solution}</div>

                  <div className="proj-stack-row">
                    {p.stack.slice(0, 4).map(s => (
                      <span key={s} className="proj-stack-pill">{s}</span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="proj-stack-pill">+{p.stack.length - 4}</span>
                    )}
                  </div>

                  <div className="proj-card-footer">
                    <button className="proj-deep-btn">
                      <i className="fa-solid fa-terminal" style={{ fontSize: '0.65rem' }} /> deep dive
                    </button>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-gh-link"
                      onClick={e => e.stopPropagation()}
                    >
                      <i className="fa-brands fa-github" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: 32 }}
          >
            <a
              href="https://github.com/Akshh-bhardwaj"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', gap: 8 }}
            >
              <i className="fa-brands fa-github" /> View all repos on GitHub
            </a>
          </motion.div>

        </div>
      </section>

      {/* ── Deep Dive Modal ── */}
      <AnimatePresence>
        {selectedId && active && (
          <motion.div
            className="proj-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setSelectedId(null)}
          >
            <motion.div
              className="proj-modal"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <button className="proj-modal-close" onClick={() => setSelectedId(null)}>
                <i className="fa-solid fa-xmark" />
              </button>

              <img className="proj-modal-img" src={active.image} alt={active.title} loading="lazy" />

              <div className="proj-modal-body">

                {/* Title */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{active.type}</span>
                    <span className="proj-shipped"><span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent-green)' }} />shipped</span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.03em', fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                    {active.title}
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.55em', marginLeft: 10 }}>{active.subtitle}</span>
                  </h2>
                </div>

                {/* Problem / Solution */}
                <div className="proj-info-row">
                  <div className="proj-info-box" style={{ background: 'rgba(244,63,94,0.04)', border: '1px solid rgba(244,63,94,0.12)' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-color)', marginBottom: 8 }}>
                      <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: 5 }} />problem
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{active.problem}</p>
                  </div>
                  <div className="proj-info-box" style={{ background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)', borderLeft: `3px solid ${active.color}` }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary-color)', marginBottom: 8 }}>
                      <i className="fa-solid fa-bolt" style={{ marginRight: 5 }} />solution
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{active.solution}</p>
                  </div>
                </div>

                {/* Impact */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 10, padding: '14px 16px' }}>
                  <i className="fa-solid fa-chart-line" style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-green)', marginBottom: 4 }}>impact</div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.6 }}>{active.impact}</p>
                  </div>
                </div>

                {/* Stack */}
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10 }}>
                    <i className="fa-solid fa-layer-group" style={{ marginRight: 5 }} />stack
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {active.stack.map(s => (
                      <span key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '4px 10px', borderRadius: 5, border: '1px solid var(--glass-border)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)' }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 4, borderTop: '1px solid var(--glass-border)' }}>
                  {active.liveLink && (
                    <a href={active.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary glow-btn" style={{ fontSize: '0.875rem' }}>
                      <i className="fa-solid fa-rocket" /> Live Demo
                    </a>
                  )}
                  <a href={active.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline glow-hover" style={{ fontSize: '0.875rem' }}>
                    <i className="fa-brands fa-github" /> Source Code
                  </a>
                  <button className="btn btn-secondary" style={{ marginLeft: 'auto', fontSize: '0.875rem' }} onClick={() => setSelectedId(null)}>
                    <i className="fa-solid fa-xmark" /> Close
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Study Material & Notes ── */}
      <section id="github-notes" className="section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <style>{`
            /* language cards grid */
            .sm-lang-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 16px;
            }
            @media (max-width: 860px) { .sm-lang-grid { grid-template-columns: repeat(2, 1fr); } }
            @media (max-width: 480px) { .sm-lang-grid { grid-template-columns: 1fr; } }

            .sm-lang-card {
              border: 1.5px solid var(--lc-border, var(--glass-border));
              border-radius: 16px;
              background: var(--glass-bg);
              backdrop-filter: blur(12px);
              padding: 28px 22px;
              cursor: pointer;
              display: flex; flex-direction: column; gap: 14px;
              transition: border-color 0.22s, transform 0.22s, box-shadow 0.22s, background 0.22s;
              user-select: none;
              position: relative;
              overflow: hidden;
            }
            /* Subtle color tint at top */
            .sm-lang-card::before {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0; height: 2px;
              background: var(--lc-color, var(--primary-color));
              box-shadow: 0 0 12px var(--lc-color, var(--primary-color));
              opacity: 0.8;
            }
            .sm-lang-card:hover {
              border-color: var(--lc-color, var(--glass-border-hover));
              transform: translateY(-5px);
              box-shadow: 0 16px 40px rgba(0,0,0,0.4), 0 0 24px var(--lc-glow, transparent);
              background: var(--lc-bg, var(--glass-bg));
            }
            .sm-lang-card:hover .lc-icon-wrap {
              transform: scale(1.12) rotate(6deg);
              box-shadow: 0 0 20px var(--lc-glow, transparent);
            }
            .lc-icon-wrap {
              width: 48px; height: 48px; border-radius: 12px;
              background: var(--lc-bg, rgba(255,255,255,0.04));
              border: 1px solid var(--lc-border, var(--glass-border));
              display: flex; align-items: center; justify-content: center;
              font-size: 1.4rem; color: var(--lc-color, var(--text-muted));
              transition: transform 0.25s, box-shadow 0.25s;
            }

            /* topic cards inside modal */
            .sm-topic-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
              gap: 12px;
            }

            .sm-topic-card {
              border: 1px solid var(--glass-border);
              border-radius: 12px;
              background: rgba(255,255,255,0.02);
              padding: 18px 16px;
              cursor: pointer;
              display: flex; align-items: center; justify-content: space-between; gap: 10px;
              transition: background 0.2s, border-color 0.2s, transform 0.15s;
              user-select: none;
            }
            .sm-topic-card:hover {
              background: rgba(255,255,255,0.05);
              border-color: var(--glass-border-hover);
              transform: translateX(3px);
            }

            /* file list inside modal */
            .sm-file-link {
              display: flex; align-items: center; justify-content: space-between; gap: 10px;
              padding: 12px 14px; border-radius: 9px;
              border: 1px solid transparent;
              background: rgba(0,0,0,0.12);
              color: var(--text-muted); text-decoration: none; font-size: 0.875rem;
              transition: var(--transition);
            }
            .sm-file-link:hover {
              color: var(--text-main);
              background: rgba(255,255,255,0.04);
              border-color: var(--glass-border);
              transform: translateX(3px);
            }
            body.light-mode .sm-file-link { background: rgba(0,0,0,0.03); }
            body.light-mode .sm-file-link:hover { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.1); }

            /* notes modal */
            .sm-modal-overlay {
              position: fixed; inset: 0;
              background: rgba(0,0,0,0.8);
              backdrop-filter: blur(14px);
              z-index: 2000;
              display: flex; align-items: center; justify-content: center;
              padding: 24px;
            }
            .sm-modal {
              background: var(--bg-secondary);
              border: 1px solid var(--glass-border);
              border-radius: 20px;
              width: 100%; max-width: 780px;
              max-height: 88vh;
              overflow-y: auto;
              position: relative;
              display: flex; flex-direction: column;
            }
            .sm-modal-header {
              padding: 24px 28px 20px;
              border-bottom: 1px solid var(--glass-border);
              display: flex; align-items: center; justify-content: space-between; gap: 12px;
              position: sticky; top: 0;
              background: var(--bg-secondary);
              border-radius: 20px 20px 0 0;
              z-index: 1;
            }
            .sm-modal-body { padding: 24px 28px 28px; flex: 1; }
            @media (max-width: 600px) {
              .sm-modal-header { padding: 18px 18px 16px; }
              .sm-modal-body   { padding: 16px 18px 22px; }
            }
            .sm-modal-close {
              width: 32px; height: 32px; border-radius: 8px;
              border: 1px solid var(--glass-border);
              background: transparent; color: var(--text-muted);
              cursor: pointer; font-size: 1rem; flex-shrink: 0;
              display: flex; align-items: center; justify-content: center;
              transition: all 0.2s;
            }
            .sm-modal-close:hover { color: var(--text-main); border-color: var(--glass-border-hover); }
            .sm-back-btn {
              display: inline-flex; align-items: center; gap: 7px;
              background: none; border: 1px solid var(--glass-border);
              color: var(--text-muted); padding: 7px 14px; border-radius: 8px;
              cursor: pointer; font-size: 0.82rem; font-family: var(--font-body);
              transition: var(--transition); margin-bottom: 20px;
            }
            .sm-back-btn:hover { color: var(--text-main); border-color: var(--glass-border-hover); }

            /* cheat sheet */
            .sm-cheat-btn {
              display: inline-flex; align-items: center; gap: 8px;
              padding: 10px 20px; border-radius: 9px;
              background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border);
              color: var(--text-muted); font-size: 0.82rem; font-family: var(--font-body);
              cursor: pointer; transition: var(--transition); margin-top: 20px;
            }
            .sm-cheat-btn:hover { color: var(--text-main); border-color: var(--glass-border-hover); }
            .sm-cheat-table { width: 100%; border-collapse: collapse; }
            .sm-cheat-table th, .sm-cheat-table td { padding: 10px 13px; text-align: left; border-bottom: 1px solid var(--glass-border); font-size: 0.875rem; }
            .sm-cheat-table th { font-weight: 600; color: var(--text-muted); background: rgba(255,255,255,0.02); }
          `}</style>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 48 }}
          >
            <span className="section-label">// study.material</span>
            <h2 className="section-title">Study Material & <span className="text-glow">Notes</span></h2>
            <p className="section-subtitle">Pick a language — browse topics — open any file on GitHub.</p>
          </motion.div>

          {/* Language cards */}
          <motion.div
            className="sm-lang-grid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            {Object.entries(LANG_META).map(([key, meta], i) => {
              const LC = {
                c:         { color: '#00d4ff', glow: 'rgba(0,212,255,0.18)',   bg: 'rgba(0,212,255,0.07)',   border: 'rgba(0,212,255,0.3)'   },
                java:      { color: '#f97316', glow: 'rgba(249,115,22,0.18)',  bg: 'rgba(249,115,22,0.07)',  border: 'rgba(249,115,22,0.3)'  },
                python:    { color: '#fbbf24', glow: 'rgba(251,191,36,0.18)',  bg: 'rgba(251,191,36,0.07)',  border: 'rgba(251,191,36,0.3)'  },
                interview: { color: '#a78bfa', glow: 'rgba(167,139,250,0.18)', bg: 'rgba(167,139,250,0.07)', border: 'rgba(167,139,250,0.3)' },
              }[key] || {};
              return (
                <motion.div
                  key={key}
                  className="sm-lang-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => { setNotesLang(key); setNotesTopic(null); }}
                  style={{
                    '--lc-color':  LC.color,
                    '--lc-glow':   LC.glow,
                    '--lc-bg':     LC.bg,
                    '--lc-border': LC.border,
                  }}
                >
                  <div className="lc-icon-wrap">
                    <i className={meta.icon} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', marginBottom: 4, color: 'var(--text-main)' }}>{meta.label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: LC.color, opacity: 0.8 }}>
                      <i className="fa-brands fa-github" style={{ marginRight: 5 }} />{meta.repo}
                    </div>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: LC.color, opacity: 0.7 }}>
                      {notesData[key].length} topics
                    </span>
                    <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.72rem', color: LC.color }} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Notes Modal (language selected) ── */}
      <AnimatePresence>
        {notesLang && activeLang && (
          <motion.div
            className="sm-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => { if (e.target === e.currentTarget) { setNotesLang(null); setNotesTopic(null); } }}
          >
            <motion.div
              className="sm-modal"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.28 }}
            >
              {/* Sticky header */}
              <div className="sm-modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {notesTopic && (
                    <button className="sm-modal-close" onClick={() => setNotesTopic(null)} title="Back to topics">
                      <i className="fa-solid fa-arrow-left" />
                    </button>
                  )}
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
                      {notesTopic ? notesTopic : activeLang.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>
                      {notesTopic ? `${activeTopicData?.files.length} files` : `${notesData[notesLang].length} topics`}
                    </div>
                  </div>
                </div>
                <button className="sm-modal-close" onClick={() => { setNotesLang(null); setNotesTopic(null); }}>
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>

              {/* Body */}
              <div className="sm-modal-body">
                <AnimatePresence mode="wait">

                  {/* Topic cards view */}
                  {!notesTopic && (
                    <motion.div
                      key="topics"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="sm-topic-grid">
                        {notesData[notesLang].map((cat, i) => (
                          <motion.div
                            key={cat.category}
                            className="sm-topic-card"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            onClick={() => setNotesTopic(cat.category)}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <i className="fa-solid fa-folder" style={{ color: 'var(--text-dim)', fontSize: '0.9rem', flexShrink: 0 }} />
                              <div>
                                <div style={{ fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.3 }}>{cat.category}</div>
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-dim)', marginTop: 2 }}>{cat.files.length} file{cat.files.length !== 1 ? 's' : ''}</div>
                              </div>
                            </div>
                            <i className="fa-solid fa-chevron-right" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', flexShrink: 0 }} />
                          </motion.div>
                        ))}
                      </div>

                      {/* Cheat sheet button for C */}
                      {notesLang === 'c' && (
                        <button className="sm-cheat-btn" onClick={() => setIsCheatSheetOpen(true)}>
                          <i className="fa-solid fa-circle-nodes" /> Graph Algorithm Cheat Sheet
                        </button>
                      )}
                    </motion.div>
                  )}

                  {/* File list view */}
                  {notesTopic && activeTopicData && (
                    <motion.div
                      key="files"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                    >
                      {activeTopicData.files.map((file, i) => (
                        <motion.a
                          key={file.name}
                          href={`${activeLang.repoBase}${file.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm-file-link"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                            <i className="fa-regular fa-file-code" style={{ opacity: 0.55, flexShrink: 0 }} />
                            {file.name}
                          </span>
                          <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.68rem', opacity: 0.4, flexShrink: 0 }} />
                        </motion.a>
                      ))}
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cheat Sheet Modal ── */}
      <AnimatePresence>
        {isCheatSheetOpen && (
          <motion.div
            className="sm-modal-overlay"
            style={{ zIndex: 2100 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsCheatSheetOpen(false)}
          >
            <motion.div
              className="sm-modal"
              style={{ maxWidth: 820 }}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.28 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="sm-modal-header">
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>C / C++ DSA</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem' }}>Graph Algorithm Cheat Sheet</div>
                </div>
                <button className="sm-modal-close" onClick={() => setIsCheatSheetOpen(false)}>
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>
              <div className="sm-modal-body">
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 16 }}>Quick reference for common graph algorithms and time complexities.</p>
                <div style={{ overflowX: 'auto' }}>
                  <table className="sm-cheat-table">
                    <thead>
                      <tr><th>Problem Type</th><th>Algorithm</th><th>Complexity</th></tr>
                    </thead>
                    <tbody>
                      {graphCheatSheet.map((item, i) => (
                        <tr key={i}>
                          <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{item.type}</td>
                          <td><span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--glass-border)' }}>{item.alg}</span></td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.comp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
