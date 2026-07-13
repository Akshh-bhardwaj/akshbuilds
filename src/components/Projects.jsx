import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const projectData = [
  {
    id: 1,
    title: 'Forminne - AI Agent OS',
    problem: 'Orchestrating multiple generative AI models (DALL-E, Sora, GPT) concurrently is chaotic for enterprises.',
    solution: 'Built a massive AI orchestration interface with hardware-accelerated WebGL rendering and WebSocket connections to a Node/Python ML engine.',
    badges: [
      { text: 'React', color: 'var(--primary-color)', bg: 'rgba(0, 240, 255, 0.1)' },
      { text: 'OpenAI API', color: 'var(--secondary-color)', bg: 'rgba(138, 43, 226, 0.1)' }
    ],
    image: '/assets/project_video_dash_1775024426115.webp',
    github: 'https://github.com/Akshh-bhardwaj',
    liveLink: 'https://forminne.netlify.app/'
  },
  {
    id: 2,
    title: 'AI Model Tracking Hub',
    problem: 'MLOps engineers lack real-time, low-latency visual performance metrics for various LLM instances.',
    solution: 'Developed a hyper-optimized mobile application prototype digesting vast datasets via GraphQL in sub-50ms latency.',
    badges: [
      { text: 'React Native', color: 'var(--accent-color)', bg: 'rgba(255, 0, 85, 0.1)' },
      { text: 'GraphQL', color: 'var(--primary-color)', bg: 'rgba(0, 240, 255, 0.1)' }
    ],
    image: '/assets/project_ai_tracker_1775024442510.webp',
    github: 'https://github.com/Akshh-bhardwaj',
    liveLink: 'https://phenomenal-muffin-646633.netlify.app/'
  },
  {
    id: 3,
    title: 'Secure Fintech Backend',
    problem: 'Financial startup needed an impenetrable data microservice to handle thousands of requests.',
    solution: 'Engineered an OWASP-standard API routing thousands of pseudo-financial requests to a PostgreSQL data lake.',
    badges: [
      { text: 'Node.js', color: '#00ff88', bg: 'rgba(0, 255, 136, 0.1)' },
      { text: 'PostgreSQL', color: '#4facfe', bg: 'rgba(79, 172, 254, 0.1)' }
    ],
    image: '/assets/project_backend_api_1775025512690.webp',
    github: 'https://github.com/Akshh-bhardwaj'
  },
  {
    id: 4,
    title: 'Agentic RAG Assistant',
    problem: 'General chat AI fails at understanding contextual business documents.',
    solution: 'Designed an intelligent agent utilizing vector embeddings, LangChain, and multi-agent RAG for secure document extraction.',
    badges: [
      { text: 'TypeScript', color: '#ffcc00', bg: 'rgba(255, 204, 0, 0.1)' },
      { text: 'LangChain', color: 'var(--primary-color)', bg: 'rgba(0, 240, 255, 0.1)' }
    ],
    image: '/assets/project_chatbot_1775025903371.webp',
    github: 'https://github.com/Akshh-bhardwaj',
    liveLink: 'https://phenomenal-muffin-646633.netlify.app/'
  },
  {
    id: 5,
    title: 'Premium-Chess Engine',
    problem: 'Standard chess interfaces drop frames and struggle with high-concurrent server loads.',
    solution: 'Built a highly aesthetic, scalable chess hub using Next.js and WebSockets with predictive move algorithms.',
    badges: [
      { text: 'WebSockets', color: '#ff0055', bg: 'rgba(255, 0, 85, 0.1)' },
      { text: 'Next.js', color: '#FFF', bg: 'rgba(255, 255, 255, 0.1)' }
    ],
    image: '/assets/project_premium_chess_1775025919148.webp',
    github: 'https://github.com/Akshh-bhardwaj',
    liveLink: 'https://premium-chess.onrender.com/'
  }
];

const notesData = {
  c: [
    {
      category: 'Arrays & Strings',
      files: [
        { name: 'two_sum.c', path: 'Arrays/two_sum.c' },
        { name: 'max_min_element.c', path: 'Arrays/max_min_element.c' },
        { name: 'reverse_array.c', path: 'Arrays/reverse_array.c' },
        { name: 'move_zeroes.c', path: 'Arrays/move_zeroes.c' },
        { name: 'prefix_sum.c', path: 'Arrays/prefix_sum.c' },
        { name: 'palindrome.c', path: 'Strings/palindrome.c' },
        { name: 'anagram.c', path: 'Strings/anagram.c' },
        { name: 'reverse_string.c', path: 'Strings/reverse_string.c' }
      ]
    },
    {
      category: 'Linked List & Stacks',
      files: [
        { name: 'insert_node.c', path: 'LinkedList/insert_node.c' },
        { name: 'delete_node.c', path: 'LinkedList/delete_node.c' },
        { name: 'reverse_list.c', path: 'LinkedList/reverse_list.c' },
        { name: 'doubly_linked_list.c', path: 'LinkedList/doubly_linked_list.c' },
        { name: 'stack_array.c', path: 'Stack/stack_array.c' },
        { name: 'stack_linkedlist.c', path: 'Stack/stack_linkedlist.c' }
      ]
    },
    {
      category: 'Queue & Recursion',
      files: [
        { name: 'queue_array.c', path: 'Queue/queue_array.c' },
        { name: 'queue_linkedlist.c', path: 'Queue/queue_linkedlist.c' },
        { name: 'factorial.c', path: 'Recursion/factorial.c' },
        { name: 'fibonacci.c', path: 'Recursion/fibonacci.c' }
      ]
    },
    {
      category: 'Trees & BST',
      files: [
        { name: 'bst_insert.c', path: 'Trees/bst_insert.c' },
        { name: 'inorder_traversal.c', path: 'Trees/inorder_traversal.c' },
        { name: 'bst_height.c', path: 'Trees/bst_height.c' }
      ]
    },
    {
      category: 'Graph Algorithms',
      files: [
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
        { name: 'bridges_articulation.c', path: 'Graphs/bridges_articulation.c' }
      ]
    },
    {
      category: 'Sorting & Searching',
      files: [
        { name: 'bubble_sort.c', path: 'Sorting/bubble_sort.c' },
        { name: 'insertion_sort.c', path: 'Sorting/insertion_sort.c' },
        { name: 'merge_sort.c', path: 'Sorting/merge_sort.c' },
        { name: 'quick_sort.c', path: 'Sorting/quick_sort.c' },
        { name: 'linear_search.c', path: 'Searching/linear_search.c' },
        { name: 'binary_search.c', path: 'Searching/binary_search.c' }
      ]
    }
  ],
  java: [
    {
      category: 'Java Internals & OOP',
      files: [
        { name: 'JVMAndStringDemo.java', path: 'JavaInternals/JVMAndStringDemo.java' },
        { name: 'SOLIDPayrollDemo.java', path: 'OOP/SOLIDPayrollDemo.java' }
      ]
    },
    {
      category: 'Collections & Generics',
      files: [
        { name: 'CustomGenericStack.java', path: 'Collections/CustomGenericStack.java' },
        { name: 'HashMapCollisionDemo.java', path: 'Collections/HashMapCollisionDemo.java' }
      ]
    },
    {
      category: 'Streams & Lambdas',
      files: [
        { name: 'EmployeeStreamDemo.java', path: 'Streams/EmployeeStreamDemo.java' }
      ]
    },
    {
      category: 'Concurrency',
      files: [
        { name: 'ProducerConsumerDemo.java', path: 'Concurrency/ProducerConsumerDemo.java' },
        { name: 'ThreadSafeLRUCache.java', path: 'Concurrency/ThreadSafeLRUCache.java' }
      ]
    },
    {
      category: 'Dynamic Programming',
      files: [
        { name: 'DPDemo.java', path: 'DynamicProgramming/DPDemo.java' }
      ]
    }
  ],
  python: [
    {
      category: 'Advanced Core & OOP',
      files: [
        { name: 'Advanced OOP (Metaclasses, Descriptors)', path: 'Advanced/01_advanced_oop' },
        { name: 'Decorators & Generators (Closures, Lazy Load)', path: 'Advanced/02_decorators_and_generators' },
        { name: 'Memory Management (GC, Slots, Weakref)', path: 'Advanced/03_memory_management' },
        { name: 'Metaprogramming & Introspection', path: 'Advanced/05_metaprogramming' }
      ]
    },
    {
      category: 'Concurrency & Design Patterns',
      files: [
        { name: 'Concurrency & Asyncio (GIL, Threads, Async)', path: 'Advanced/04_concurrency_and_asyncio' },
        { name: 'Enterprise Design Patterns', path: 'Advanced/06_design_patterns' }
      ]
    },
    {
      category: 'Enterprise Python Development',
      files: [
        { name: 'Testing & Mocking', path: 'Advanced/07_testing_and_logging' },
        { name: 'Advanced Collections & Containers', path: 'Advanced/08_advanced_data_structures' },
        { name: 'Database Integrations & ORMs', path: 'Advanced/09_database_integration' },
        { name: 'System Pipelines & TCP Networking', path: 'Advanced/10_system_and_networking' }
      ]
    }
  ],
  interview: [
    {
      category: 'LeetCode Tracking Lists',
      files: [
        { name: 'Last 30 Days (Immediate Prep)', path: 'README.md#folder-structure' },
        { name: 'Last 3 Months (Recent Trends)', path: 'README.md#folder-structure' },
        { name: 'Last 6 Months (Core Preparation)', path: 'README.md#folder-structure' },
        { name: 'Last 1 Year (Broad Coverage)', path: 'README.md#folder-structure' }
      ]
    },
    {
      category: 'Selenium Scraper Tool',
      files: [
        { name: 'Scraper.java (Core Scraper)', path: 'src/main/java/Scraper.java' },
        { name: 'Main.java (Entrypoint)', path: 'src/main/java/Main.java' },
        { name: 'Scraper README Guide', path: 'README.md' }
      ]
    }
  ]
};

const graphCheatSheet = [
  { type: 'Shortest path (unweighted)', alg: 'BFS', comp: 'O(V + E)' },
  { type: 'Shortest path (weighted, ≥0)', alg: 'Dijkstra', comp: 'O(V² / ElogV)' },
  { type: 'Shortest path (negative wts)', alg: 'Bellman-Ford', comp: 'O(V × E)' },
  { type: 'All-pairs shortest path', alg: 'Floyd-Warshall', comp: 'O(V³)' },
  { type: 'Minimum Spanning Tree (sparse)', alg: 'Kruskal + UnionFind', comp: 'O(E log E)' },
  { type: 'Minimum Spanning Tree (dense)', alg: 'Prim\'s', comp: 'O(V²)' },
  { type: 'Topological ordering / cycle', alg: 'Kahn\'s BFS / DFS', comp: 'O(V + E)' },
  { type: 'Strongly Connected Components', alg: 'Kosaraju\'s', comp: 'O(V + E)' },
  { type: 'Bridges / Articulation Points', alg: 'Tarjan\'s DFS', comp: 'O(V + E)' },
  { type: 'Bipartite check', alg: 'BFS/DFS 2-coloring', comp: 'O(V + E)' },
  { type: 'Flood fill / Islands', alg: 'BFS / DFS', comp: 'O(R × C)' },
  { type: 'Cycle detection (undirected)', alg: 'DFS or Union-Find', comp: 'O(V + E)' },
  { type: 'Cycle detection (directed)', alg: 'DFS + rec stack', comp: 'O(V + E)' }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('c');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({ 
    'Arrays & Strings': true, 
    'Java Internals & OOP': true, 
    'Advanced Core & OOP': true,
    'LeetCode Tracking Lists': true 
  });
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  const activeProject = projectData.find(p => p.id === selectedId);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setSelectedId(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedId(null);
        setIsCheatSheetOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const isSearching = searchQuery.trim().length > 0;

  // Filter notes based on active tab and search query
  const filteredNotes = notesData[activeTab].map(cat => {
    const files = cat.files.filter(f => 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cat.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, files };
  }).filter(cat => cat.files.length > 0);

  return (
    <>
      <style>{`
        :root {
          --study-card-bg: var(--glass-bg);
          --study-card-border: var(--glass-border);
          --study-input-bg: rgba(0, 0, 0, 0.2);
          --study-input-border: var(--glass-border);
          --study-accordion-bg: rgba(255, 255, 255, 0.01);
          --study-accordion-border: var(--glass-border);
          --study-file-bg: rgba(0, 0, 0, 0.15);
          --study-file-hover-bg: rgba(0, 240, 255, 0.05);
          --study-file-border: transparent;
          --study-tab-bg: rgba(255, 255, 255, 0.01);
          --study-tab-border: var(--glass-border);
          --study-tab-color: var(--text-muted);
        }
        body.light-mode {
          --study-input-bg: rgba(255, 255, 255, 0.9);
          --study-input-border: rgba(0, 0, 0, 0.15);
          --study-accordion-bg: rgba(0, 0, 0, 0.02);
          --study-accordion-border: rgba(0, 0, 0, 0.08);
          --study-file-bg: rgba(0, 0, 0, 0.03);
          --study-file-hover-bg: rgba(0, 136, 255, 0.05);
          --study-file-border: rgba(0, 0, 0, 0.05);
          --study-tab-bg: rgba(0, 0, 0, 0.02);
          --study-tab-border: rgba(0, 0, 0, 0.1);
          --study-tab-color: var(--text-muted);
        }
        .study-hub-container {
          width: 100%;
        }
        .study-material-card {
          background: var(--study-card-bg);
          border: 1px solid var(--study-card-border);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        @media (max-width: 768px) {
          .study-material-card {
            padding: 20px;
            gap: 20px;
          }
        }
        .study-tabs-container {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        .study-tab-btn {
          flex: 1;
          min-width: 200px;
          padding: 14px 20px;
          border-radius: 10px;
          border: 1px solid var(--study-tab-border);
          background: var(--study-tab-bg);
          color: var(--study-tab-color);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          font-family: var(--font-body);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
        }
        @media (max-width: 580px) {
          .study-tab-btn {
            min-width: 100%;
          }
        }
        .study-tab-btn.active-c {
          background: rgba(0, 240, 255, 0.1);
          border-color: var(--primary-color);
          color: var(--primary-color);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
        }
        body.light-mode .study-tab-btn.active-c {
          background: rgba(0, 136, 255, 0.1);
          border-color: var(--primary-color);
          color: var(--primary-color);
          box-shadow: 0 0 10px rgba(0, 136, 255, 0.1);
        }
        .study-tab-btn.active-java {
          background: rgba(138, 43, 226, 0.1);
          border-color: var(--secondary-color);
          color: var(--secondary-color);
          box-shadow: 0 0 15px rgba(138, 43, 226, 0.15);
        }
        body.light-mode .study-tab-btn.active-java {
          background: rgba(106, 11, 226, 0.1);
          border-color: var(--secondary-color);
          color: var(--secondary-color);
          box-shadow: 0 0 10px rgba(106, 11, 226, 0.1);
        }
        .study-tab-btn.active-python {
          background: rgba(0, 255, 136, 0.1);
          border-color: #00ff88;
          color: #00ff88;
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.15);
        }
        body.light-mode .study-tab-btn.active-python {
          background: rgba(0, 150, 80, 0.1);
          border-color: #009955;
          color: #009955;
          box-shadow: 0 0 10px rgba(0, 150, 80, 0.1);
        }
        .study-tab-btn.active-interview {
          background: rgba(255, 0, 85, 0.1);
          border-color: var(--accent-color);
          color: var(--accent-color);
          box-shadow: 0 0 15px rgba(255, 0, 85, 0.15);
        }
        body.light-mode .study-tab-btn.active-interview {
          background: rgba(200, 0, 60, 0.1);
          border-color: var(--accent-color);
          color: var(--accent-color);
          box-shadow: 0 0 10px rgba(200, 0, 60, 0.1);
        }
        .study-search-input {
          width: 100%;
          padding: 14px 20px;
          border-radius: 10px;
          border: 1px solid var(--study-input-border);
          background: var(--study-input-bg);
          color: var(--text-main);
          font-family: var(--font-body);
          transition: var(--transition);
          font-size: 1rem;
        }
        .study-search-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.15);
        }
        body.light-mode .study-search-input:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 10px rgba(0, 136, 255, 0.2);
        }
        .study-accordion-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }
        @media (max-width: 680px) {
          .study-accordion-grid {
            grid-template-columns: 1fr;
          }
        }
        .topic-accordion {
          border-radius: 12px;
          border: 1px solid var(--study-accordion-border);
          overflow: hidden;
          background: var(--study-accordion-bg);
          transition: var(--transition);
          height: fit-content;
        }
        .topic-accordion-header {
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-weight: 700;
          color: var(--text-main);
          font-family: var(--font-heading);
          transition: var(--transition);
          user-select: none;
          font-size: 1.1rem;
        }
        .topic-accordion-header:hover {
          background: rgba(255,255,255,0.02);
        }
        body.light-mode .topic-accordion-header:hover {
          background: rgba(0,0,0,0.02);
        }
        .topic-accordion-content {
          padding: 15px 24px 20px;
          border-top: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .study-file-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-radius: 8px;
          background: var(--study-file-bg);
          border: 1px solid var(--study-file-border);
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.95rem;
          transition: var(--transition);
        }
        .study-file-link:hover {
          color: var(--text-main);
          background: var(--study-file-hover-bg);
          border-color: rgba(0, 240, 255, 0.2);
          transform: translateX(4px);
        }
        .study-file-link.java-link:hover {
          border-color: rgba(138, 43, 226, 0.2);
          background: rgba(138, 43, 226, 0.05);
        }
        .study-file-link.python-link:hover {
          border-color: rgba(0, 255, 136, 0.2);
          background: rgba(0, 255, 136, 0.05);
        }
        .study-file-link.interview-link:hover {
          border-color: rgba(255, 0, 85, 0.2);
          background: rgba(255, 0, 85, 0.05);
        }
        .cheat-sheet-btn {
          width: fit-content;
          margin-top: 10px;
          padding: 14px 28px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.15), rgba(138, 43, 226, 0.15));
          border: 1px solid rgba(0, 240, 255, 0.25);
          color: var(--text-main);
          font-weight: 600;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          transition: var(--transition);
          align-self: flex-start;
        }
        @media (max-width: 580px) {
          .cheat-sheet-btn {
            width: 100%;
          }
        }
        .cheat-sheet-btn:hover {
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.25);
          border-color: var(--primary-color);
        }
        .cheat-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        .cheat-table th, .cheat-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid var(--glass-border);
        }
        .cheat-table th {
          font-weight: 600;
          color: var(--primary-color);
          background: rgba(0, 240, 255, 0.03);
        }
        .cheat-table tr:hover {
          background: rgba(255,255,255,0.01);
        }
        body.light-mode .cheat-table tr:hover {
          background: rgba(0,0,0,0.01);
        }
      `}</style>

      {/* SECTION 1: MAJOR PROJECTS */}
      <section id="projects" className="projects section">
        <div className="container">
          <div className="section-header reveal active">
            <h2 className="section-title">Major <span className="text-glow">Projects</span></h2>
            <p className="section-subtitle">Real problems solved through advanced engineering and design.</p>
          </div>

          <motion.div 
            className="projects-grid mt-4"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projectData.map((project) => (
              <motion.div key={project.id} variants={itemVariants} className="project-card glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div className="project-img" style={{ height: '220px', width: '100%', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelectedId(project.id)}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div className="project-info" style={{ padding: '35px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    {project.badges.map((b, i) => (
                      <span key={i} style={{ fontSize: '0.8rem', background: b.bg, color: b.color, padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}>
                        {b.text}
                      </span>
                    ))}
                  </div>
                  <h3 className="project-title" style={{ fontSize: '1.6rem', marginBottom: '15px' }}>{project.title}</h3>
                  <div style={{ marginBottom: '25px', flexGrow: 1 }}>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '8px' }}><strong>Problem:</strong> <span style={{ color: 'var(--text-muted)' }}>{project.problem}</span></p>
                    <p style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}><strong>Solution:</strong> <span style={{ color: 'var(--primary-color)' }}>{project.solution}</span></p>
                  </div>
                  
                  <div className="project-card-actions" style={{ display: 'flex', gap: '15px', marginTop: 'auto' }}>
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary glow-btn" style={{ flex: 1, padding: '10px' }}>
                        Live Demo <i className="fa-solid fa-arrow-up-right-from-square" style={{fontSize: '0.8rem'}}></i>
                      </a>
                    )}
                    <button className="btn btn-outline glow-hover" style={{ flex: project.liveLink ? 1 : '100%', padding: '10px' }} onClick={() => setSelectedId(project.id)}>
                      Deep Dive
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: STUDY MATERIAL & NOTES */}
      <section id="notes" className="notes section" style={{ borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="section-header reveal active">
            <h2 className="section-title">Study Material & <span className="text-glow">Notes</span></h2>
            <p className="section-subtitle">Curated learning tracks, interview prep cheatsheets, and language-specific references.</p>
          </div>

          <div className="study-hub-container mt-4">
            <div className="study-material-card">
              {/* Tab Switcher */}
              <div className="study-tabs-container">
                <button 
                  className={`study-tab-btn ${activeTab === 'c' ? 'active-c' : ''}`}
                  onClick={() => setActiveTab('c')}
                >
                  <i className="fa-solid fa-code"></i> C / C++ (dsa-in-c)
                </button>
                <button 
                  className={`study-tab-btn ${activeTab === 'java' ? 'active-java' : ''}`}
                  onClick={() => setActiveTab('java')}
                >
                  <i className="fa-brands fa-java"></i> Java & Internals (dsa)
                </button>
                <button 
                  className={`study-tab-btn ${activeTab === 'python' ? 'active-python' : ''}`}
                  onClick={() => setActiveTab('python')}
                >
                  <i className="fa-brands fa-python"></i> Python codes (python)
                </button>
                <button 
                  className={`study-tab-btn ${activeTab === 'interview' ? 'active-interview' : ''}`}
                  onClick={() => setActiveTab('interview')}
                >
                  <i className="fa-solid fa-terminal"></i> Interview Prep (LeetCode)
                </button>
              </div>

              {/* Search Box */}
              <div>
                <input 
                  type="text" 
                  placeholder="Search topics, libraries, algorithms or files..." 
                  className="study-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Accordion Explorer Grid */}
              <div className="study-accordion-grid">
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((cat) => {
                    const isExpanded = isSearching || !!expandedCategories[cat.category];
                    return (
                      <div key={cat.category} className="topic-accordion">
                        <div 
                          className="topic-accordion-header" 
                          onClick={() => toggleCategory(cat.category)}
                        >
                          <span>
                            <i className="fa-solid fa-folder" style={{ 
                              marginRight: '8px', 
                              color: activeTab === 'c' ? 'var(--primary-color)' : 
                                     activeTab === 'java' ? 'var(--secondary-color)' :
                                     activeTab === 'python' ? '#00ff88' : 'var(--accent-color)', 
                              opacity: 0.8 
                            }}></i>
                            {cat.category}
                          </span>
                          <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}></i>
                        </div>
                        
                        {isExpanded && (
                          <div className="topic-accordion-content">
                            {cat.files.map((file) => {
                              const repoUrl = activeTab === 'c' 
                                ? `https://github.com/Akshh-bhardwaj/dsa-in-c/blob/main/${file.path}`
                                : activeTab === 'java'
                                ? `https://github.com/Akshh-bhardwaj/dsa/blob/main/java/${file.path}`
                                : activeTab === 'python'
                                ? `https://github.com/Akshh-bhardwaj/python/tree/main/${file.path}`
                                : `https://github.com/Akshh-bhardwaj/interview-question/blob/main/${file.path}`;
                              
                              const linkClass = activeTab === 'java' ? 'java-link' : 
                                                activeTab === 'python' ? 'python-link' :
                                                activeTab === 'interview' ? 'interview-link' : '';

                              return (
                                <a 
                                  key={file.name} 
                                  href={repoUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className={`study-file-link ${linkClass}`}
                                >
                                  <span>
                                    <i className="fa-regular fa-file-code" style={{ marginRight: '8px', opacity: 0.7 }}></i>
                                    {file.name}
                                  </span>
                                  <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.75rem', opacity: 0.5 }}></i>
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                    <i className="fa-solid fa-magnifying-glass-minus" style={{ fontSize: '2.5rem', marginBottom: '15px', opacity: 0.5 }}></i>
                    <p style={{ fontSize: '1.1rem' }}>No matching notes or repositories found</p>
                  </div>
                )}
              </div>

              {/* Cheat Sheet Trigger */}
              {activeTab === 'c' && (
                <button className="cheat-sheet-btn" onClick={() => setIsCheatSheetOpen(true)}>
                  <i className="fa-solid fa-circle-nodes"></i> View Graph Algorithms Cheat Sheet
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Modal */}
      <div
        className={`modal-overlay ${selectedId ? 'active' : ''}`}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label={activeProject ? activeProject.title : 'Project details'}
      >
        <div className="modal-content">
          <button className="modal-close" onClick={() => setSelectedId(null)} aria-label="Close project details">×</button>
          
          {activeProject && (
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                {activeProject.badges.map((b, i) => (
                  <span key={i} style={{ fontSize: '0.9rem', background: b.bg, color: b.color, padding: '6px 14px', borderRadius: '6px' }}>
                    {b.text}
                  </span>
                ))}
              </div>
              
              <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{activeProject.title}</h2>
              <div style={{ marginBottom: '30px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--primary-color)' }}>
                 <h4 style={{ color: 'var(--text-main)', marginBottom: '10px' }}>The Challenge</h4>
                 <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '20px' }}>{activeProject.problem}</p>
                 <h4 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>The Solution</h4>
                 <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{activeProject.solution}</p>
              </div>
              
              <img src={activeProject.image} alt={activeProject.title} loading="lazy" style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '30px' }} />
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {activeProject.liveLink && (
                  <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline glow-hover" style={{ borderColor: '#00ff88', color: '#00ff88' }}>
                    <i className="fa-solid fa-rocket"></i> View Live Site
                  </a>
                )}
                <a href={activeProject.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary glow-btn">
                  <i className="fa-brands fa-github"></i> Source Code
                </a>
                <button className="btn btn-outline glow-hover" onClick={() => setSelectedId(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cheat Sheet Modal */}
      {isCheatSheetOpen && (
        <div
          className="modal-overlay active"
          onClick={() => setIsCheatSheetOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Graph Algorithm Cheat Sheet"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px', width: '90%', maxHeight: '85vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setIsCheatSheetOpen(false)} aria-label="Close cheat sheet">×</button>
            <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-circle-nodes"></i> Graph Algorithm Cheat Sheet
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Quick reference for common graph algorithms and their time complexities.</p>
            <div style={{ overflowX: 'auto' }}>
              <table className="cheat-table">
                <thead>
                  <tr>
                    <th>Problem Type</th>
                    <th>Algorithm</th>
                    <th>Time Complexity</th>
                  </tr>
                </thead>
                <tbody>
                  {graphCheatSheet.map((item, index) => (
                    <tr key={index}>
                      <td style={{ color: 'var(--text-main)', fontWeight: 500 }}>{item.type}</td>
                      <td><span style={{ color: 'var(--secondary-color)', background: 'rgba(138, 43, 226, 0.1)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.85rem', border: '1px solid rgba(138, 43, 226, 0.2)', fontWeight: 600 }}>{item.alg}</span></td>
                      <td style={{ color: 'var(--primary-color)', fontFamily: 'monospace', fontWeight: 600 }}>{item.comp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-outline glow-hover mt-4" style={{ float: 'right' }} onClick={() => setIsCheatSheetOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
