import { useState, useEffect, useRef } from 'react';
import {
  CAREER_TRACKS,
  PORTFOLIO_INFO,
  STUDENT_QUICK_PROMPTS,
  CLIENT_QUICK_PROMPTS,
  buildCustomPlan,
  processChatQuery
} from '../data/chatKnowledge';
import notesManifest from './notesManifest.json';

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('planner'); // 'planner' | 'chat' | 'portfolio'
  const [chatMode, setChatMode] = useState('student'); // 'student' | 'client'

  // Career Planner State
  const [selectedTrack, setSelectedTrack] = useState(CAREER_TRACKS[0].id);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [activePlan, setActivePlan] = useState(null);
  const [completedGoals, setCompletedGoals] = useState({});
  const [copySuccess, setCopySuccess] = useState(false);

  // Chat State
  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      sender: 'bot',
      mode: 'student',
      text: `👋 Hey there! I'm **AkshBot**, your AI Career Mentor & Portfolio Guide.\n\nLooking to crack placements, build high-performance web apps, or master core CS? Switch to the **Course Planner** tab to generate a custom 30/60/100-day roadmap with links to all **62 PDF study notes**!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Load saved roadmap progress from localStorage on mount
  useEffect(() => {
    try {
      const savedGoals = localStorage.getItem('akshbuilds_study_progress');
      if (savedGoals) {
        setCompletedGoals(JSON.parse(savedGoals));
      }
      const savedPlan = localStorage.getItem('akshbuilds_saved_plan');
      if (savedPlan) {
        const parsed = JSON.parse(savedPlan);
        setActivePlan(parsed);
        setSelectedTrack(parsed.track.id);
        setSelectedDuration(parsed.duration);
      } else {
        // Generate default plan
        const def = buildCustomPlan({ trackId: 'fullstack', duration: 60 });
        setActivePlan(def);
      }
    } catch {
      const def = buildCustomPlan({ trackId: 'fullstack', duration: 60 });
      setActivePlan(def);
    }
  }, []);

  // Scroll chat to bottom on new messages
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, activeTab]);

  // Handle Goal Toggle in Course Plan
  const toggleGoal = (goalKey) => {
    const nextState = { ...completedGoals, [goalKey]: !completedGoals[goalKey] };
    setCompletedGoals(nextState);
    try {
      localStorage.setItem('akshbuilds_study_progress', JSON.stringify(nextState));
    } catch {
      // Ignore quota errors
    }
  };

  // Generate or regenerate plan
  const handleGeneratePlan = (trackId, duration) => {
    const newPlan = buildCustomPlan({ trackId, duration });
    setActivePlan(newPlan);
    try {
      localStorage.setItem('akshbuilds_saved_plan', JSON.stringify(newPlan));
    } catch {
      // Ignore
    }
  };

  // Copy Plan to Clipboard as clean Markdown
  const handleCopyPlan = () => {
    if (!activePlan) return;
    let md = `# 🚀 ${activePlan.track.name} — ${activePlan.duration}-Day Roadmap\n`;
    md += `Target: ${activePlan.track.tagline}\n`;
    md += `Curated by AkshBuilds (akshbuilds.tech)\n\n`;

    activePlan.schedule.forEach((w) => {
      md += `## Week ${w.week}: ${w.title}\n`;
      md += `**Milestone Project:** ${w.project}\n`;
      md += `**Key Objectives:**\n`;
      w.goals.forEach((g) => {
        const key = `${activePlan.track.id}_w${w.week}_${g}`;
        const done = completedGoals[key] ? '[x]' : '[ ]';
        md += `- ${done} ${g}\n`;
      });
      if (w.resolvedNotes && w.resolvedNotes.length > 0) {
        md += `**Recommended Handwritten Notes:**\n`;
        w.resolvedNotes.forEach((n) => {
          md += `- 📖 [${n.title}](https://akshbuilds.tech${n.path}) (${n.pages})\n`;
        });
      }
      md += `\n`;
    });

    navigator.clipboard.writeText(md).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  // Handle user sending a chat query
  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Realistic bot response delay
    setTimeout(() => {
      const response = processChatQuery(query, chatMode);

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        mode: chatMode,
        text: response.text,
        action: response.action,
        actionLabel: response.actionLabel,
        suggestedTrack: response.suggestedTrack,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  // Handle action click in bot response (smooth scroll)
  const handleActionClick = (action, suggestedTrack) => {
    if (suggestedTrack) {
      setSelectedTrack(suggestedTrack);
      handleGeneratePlan(suggestedTrack, 60);
      setActiveTab('planner');
      return;
    }

    setIsOpen(false);

    if (action === 'scroll_to_notes') {
      const el = document.getElementById('notes');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'scroll_to_contact') {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'scroll_to_projects') {
      const el = document.getElementById('projects');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'scroll_to_tools') {
      const el = document.getElementById('tools');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate overall plan progress percentage
  const getPlanProgress = () => {
    if (!activePlan) return 0;
    let total = 0;
    let done = 0;
    activePlan.schedule.forEach((w) => {
      w.goals.forEach((g) => {
        total++;
        if (completedGoals[`${activePlan.track.id}_w${w.week}_${g}`]) {
          done++;
        }
      });
    });
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  const currentTrackObj = CAREER_TRACKS.find((t) => t.id === selectedTrack) || CAREER_TRACKS[0];

  return (
    <>
      {/* ─── FLOATING LAUNCH TRIGGER BUTTON ────────────────────────── */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-3">
        {/* Callout Pill (Hidden on tiny screens) */}
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              setActiveTab('planner');
            }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061220]/90 backdrop-blur-md border border-cyan-500/30 text-xs text-cyan-300 shadow-lg shadow-cyan-950/40 hover:border-cyan-400 transition-all hover:scale-105 group"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-slate-200 group-hover:text-cyan-200">
              ⚡ Career & Course Planner
            </span>
            <span className="bg-cyan-500/20 text-cyan-400 text-[10px] px-1.5 py-0.5 rounded font-mono">
              AI Bot
            </span>
          </button>
        )}

        {/* Circular Glowing Icon Button */}
        <button
          id="akshbot-trigger-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AI Career Assistant"
          className="relative w-14 h-14 rounded-full p-[2px] transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl shadow-cyan-950/60 focus:outline-none"
          style={{
            background: isOpen
              ? 'linear-gradient(135deg, #f43f5e, #ec4899)'
              : 'linear-gradient(135deg, #00d4ff, #7c3aed, #ec4899)'
          }}
        >
          <div className="w-full h-full rounded-full bg-[#040812] flex items-center justify-center text-white text-xl relative overflow-hidden group">
            {/* Animated shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {isOpen ? (
              <i className="fa-solid fa-xmark text-lg text-rose-400" />
            ) : (
              <div className="relative flex items-center justify-center">
                <i className="fa-solid fa-robot text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#040812] rounded-full" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* ─── EXPANDED CHAT ASSISTANT MODAL / PANEL ──────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AkshBot AI Career and Course Planner"
          className="fixed bottom-24 right-4 sm:right-8 w-[95vw] sm:w-[480px] max-w-[540px] h-[640px] max-h-[85vh] z-50 rounded-2xl flex flex-col bg-[#050b14]/95 backdrop-blur-2xl border border-cyan-500/25 shadow-2xl shadow-cyan-950/70 overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-200"
          style={{
            boxShadow: '0 25px 60px -15px rgba(0, 212, 255, 0.15), 0 0 30px 2px rgba(6, 182, 212, 0.1)'
          }}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-[#061528] via-[#091e38] to-[#0d1527] border-b border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shadow-md">
                <div className="w-full h-full bg-[#050b14] rounded-[10px] flex items-center justify-center text-cyan-400">
                  <i className="fa-solid fa-graduation-cap text-base" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#050b14] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wide">AkshBot AI</h3>
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[9px] px-1.5 py-0.2 rounded font-mono uppercase">
                    v2.5
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Career Mentor & 62 Notes Guide</p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                title="Close Assistant"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-3 pt-2.5 pb-2 bg-[#040812]/80 border-b border-white/5 flex items-center justify-between gap-1 text-xs">
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'planner'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/40 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <span>🎓</span>
              <span>Course Planner</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('chat');
                setTimeout(() => chatInputRef.current?.focus(), 100);
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-purple-500/20 to-indigo-600/20 border border-purple-400/40 text-purple-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <span>💬</span>
              <span>AI Chat & Q&A</span>
            </button>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex-1 py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-emerald-400/40 text-emerald-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <span>💼</span>
              <span>Hire Me</span>
            </button>
          </div>

          {/* ─── TAB 1: INTERACTIVE CAREER COURSE PLANNER ────────────────── */}
          {activeTab === 'planner' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {/* Goal Track Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  1. Select Target Career Track
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CAREER_TRACKS.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => {
                        setSelectedTrack(track.id);
                        handleGeneratePlan(track.id, selectedDuration);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        selectedTrack === track.id
                          ? 'bg-cyan-500/15 border-cyan-400/60 shadow-md shadow-cyan-950/40'
                          : 'bg-white/[0.02] border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{track.icon}</span>
                        <span className="text-xs font-semibold text-white truncate">
                          {track.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{track.tagline}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    2. Select Timeline Duration
                  </label>
                  <span className="text-[11px] text-cyan-400 font-mono">
                    ~{activePlan ? activePlan.totalWeeks : 4} Weeks
                  </span>
                </div>
                <div className="flex gap-2">
                  {currentTrackObj.durations.map((dur) => (
                    <button
                      key={dur}
                      onClick={() => {
                        setSelectedDuration(dur);
                        handleGeneratePlan(selectedTrack, dur);
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                        selectedDuration === dur
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400 text-cyan-300 shadow-sm'
                          : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {dur} Days Plan
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress & Plan Overview Card */}
              {activePlan && (
                <div className="bg-gradient-to-br from-[#07172b] to-[#06101d] rounded-2xl p-3.5 border border-cyan-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{activePlan.track.icon}</span>
                        <span>{activePlan.track.name}</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">{activePlan.track.description}</p>
                    </div>
                    <button
                      onClick={handleCopyPlan}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-[11px] text-cyan-300 flex items-center gap-1.5 transition-colors whitespace-nowrap"
                      title="Copy full roadmap to clipboard"
                    >
                      <i className={`fa-solid ${copySuccess ? 'fa-check text-emerald-400' : 'fa-copy'}`} />
                      <span>{copySuccess ? 'Copied!' : 'Copy Plan'}</span>
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Roadmap Progress</span>
                      <span className="font-mono text-cyan-400 font-bold">{getPlanProgress()}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500 rounded-full"
                        style={{ width: `${getPlanProgress()}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Schedule Accordion / Week-by-Week Cards */}
              {activePlan && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Curriculum & PDF Notes ({activePlan.schedule.length} Modules)
                    </span>
                    <span className="text-[10px] text-slate-500">Tap checkboxes to save progress</span>
                  </div>

                  {activePlan.schedule.map((weekItem) => (
                    <div
                      key={weekItem.week}
                      className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 rounded-xl p-3.5 transition-all"
                    >
                      {/* Week Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                          WEEK {weekItem.week}
                        </span>
                        {weekItem.project && (
                          <span className="text-[10px] text-amber-300/90 font-medium flex items-center gap-1">
                            <i className="fa-solid fa-code text-[9px]" />
                            <span>Build Project</span>
                          </span>
                        )}
                      </div>

                      <h5 className="text-xs font-bold text-slate-200 mb-2">{weekItem.title}</h5>

                      {/* Goals Checklist */}
                      <div className="space-y-1.5 mb-3">
                        {weekItem.goals.map((goal, gIdx) => {
                          const goalKey = `${activePlan.track.id}_w${weekItem.week}_${goal}`;
                          const isDone = !!completedGoals[goalKey];
                          return (
                            <label
                              key={gIdx}
                              className="flex items-start gap-2 text-xs cursor-pointer group select-none"
                            >
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => toggleGoal(goalKey)}
                                className="mt-0.5 h-3.5 w-3.5 rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0 focus:ring-offset-0 transition-colors"
                              />
                              <span
                                className={`text-[11px] transition-colors leading-snug ${
                                  isDone
                                    ? 'line-through text-slate-500'
                                    : 'text-slate-300 group-hover:text-slate-100'
                                }`}
                              >
                                {goal}
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      {/* Project Milestone */}
                      {weekItem.project && (
                        <div className="text-[11px] bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 text-amber-200 mb-2 flex items-center gap-2">
                          <i className="fa-solid fa-hammer text-amber-400" />
                          <span>
                            <strong>Project:</strong> {weekItem.project}
                          </span>
                        </div>
                      )}

                      {/* Recommended PDF Notes */}
                      {weekItem.resolvedNotes && weekItem.resolvedNotes.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/5">
                          <span className="text-[10px] text-slate-400 font-semibold block mb-1.5 uppercase tracking-wider">
                            📖 Suggested Handwritten Notes ({weekItem.resolvedNotes.length}):
                          </span>
                          <div className="space-y-1.5">
                            {weekItem.resolvedNotes.map((note, nIdx) => (
                              <div
                                key={nIdx}
                                className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-all text-[11px]"
                              >
                                <div className="flex items-center gap-2 truncate pr-2">
                                  <i className="fa-solid fa-file-pdf text-rose-400" />
                                  <span className="text-slate-300 truncate font-medium">
                                    {note.title}
                                  </span>
                                  {note.pages && (
                                    <span className="text-[9px] text-slate-500 font-mono hidden sm:inline">
                                      {note.pages}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <a
                                    href={note.path}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2 py-0.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] flex items-center gap-1 transition-colors"
                                  >
                                    <i className="fa-solid fa-arrow-up-right-from-square text-[8px]" />
                                    <span>Open</span>
                                  </a>
                                  <a
                                    href={note.path}
                                    download={note.filename}
                                    className="px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] flex items-center gap-1 transition-colors"
                                  >
                                    <i className="fa-solid fa-download text-[8px]" />
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── TAB 2: AI CHAT & NOTES SEARCH ──────────────────────────── */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Chat Mode Toggle (Student vs Recruiter) */}
              <div className="px-3 py-1.5 bg-[#03060d] border-b border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Answering as:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setChatMode('student')}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                      chatMode === 'student'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    🎓 Student Mode
                  </button>
                  <button
                    onClick={() => setChatMode('client')}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                      chatMode === 'client'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    💼 Recruiter / Client
                  </button>
                </div>
              </div>

              {/* Messages Stream */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                          : 'bg-white/[0.05] border border-white/10 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {/* Markdown-style formatting */}
                      <div className="whitespace-pre-line space-y-1">
                        {msg.text.split('\n\n').map((paragraph, pIdx) => (
                          <p key={pIdx}>
                            {paragraph.split('**').map((chunk, cIdx) =>
                              cIdx % 2 === 1 ? (
                                <strong key={cIdx} className="text-cyan-300 font-semibold">
                                  {chunk}
                                </strong>
                              ) : (
                                chunk
                              )
                            )}
                          </p>
                        ))}
                      </div>

                      {/* Optional Interactive CTA button */}
                      {msg.action && (
                        <button
                          onClick={() => handleActionClick(msg.action, msg.suggestedTrack)}
                          className="mt-2.5 w-full py-1.5 px-3 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-sm"
                        >
                          <span>{msg.actionLabel || 'View Details'}</span>
                          <i className="fa-solid fa-arrow-right text-[10px]" />
                        </button>
                      )}

                      {msg.suggestedTrack && (
                        <button
                          onClick={() => handleActionClick(null, msg.suggestedTrack)}
                          className="mt-2.5 w-full py-1.5 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all"
                        >
                          <span>Open Interactive Roadmap</span>
                          <i className="fa-solid fa-arrow-right text-[10px]" />
                        </button>
                      )}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/5 w-16">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Carousel */}
              <div className="px-3 py-1.5 bg-[#030710] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
                {(chatMode === 'student' ? STUDENT_QUICK_PROMPTS : CLIENT_QUICK_PROMPTS).map(
                  (prompt, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleSendMessage(prompt)}
                      className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-[10px] text-slate-400 hover:text-cyan-300 transition-all shrink-0"
                    >
                      {prompt}
                    </button>
                  )
                )}
              </div>

              {/* Chat Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-[#040914] border-t border-white/10 flex items-center gap-2"
              >
                <input
                  ref={chatInputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    chatMode === 'student'
                      ? 'Ask about roadmaps, DSA, or any of 62 notes...'
                      : 'Ask about Akshit\'s projects, tech stack, or hire...'
                  }
                  className="flex-1 bg-black/50 border border-white/10 focus:border-cyan-500/50 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-md shadow-cyan-950/40"
                  aria-label="Send message"
                >
                  <i className="fa-solid fa-paper-plane text-xs" />
                </button>
              </form>
            </div>
          )}

          {/* ─── TAB 3: PORTFOLIO & HIRE ME ─────────────────────────────── */}
          {activeTab === 'portfolio' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-[#081a33] to-[#040b17] rounded-2xl p-4 border border-cyan-500/20 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                <h4 className="text-base font-bold text-white mb-0.5">{PORTFOLIO_INFO.name}</h4>
                <p className="text-xs text-cyan-400 font-medium mb-2">{PORTFOLIO_INFO.role}</p>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                  {PORTFOLIO_INFO.tagline}
                </p>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                  <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                    <span className="block text-xs font-bold text-cyan-400">20+</span>
                    <span className="text-[9px] text-slate-400">Projects Built</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                    <span className="block text-xs font-bold text-emerald-400">62</span>
                    <span className="text-[9px] text-slate-400">Study Handbooks</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                    <span className="block text-xs font-bold text-purple-400">100%</span>
                    <span className="text-[9px] text-slate-400">Satisfaction</span>
                  </div>
                </div>
              </div>

              {/* Core Services */}
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                  Client & Contract Services
                </span>
                <div className="space-y-2">
                  {PORTFOLIO_INFO.services.map((srv, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all"
                    >
                      <h5 className="text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                        <i className="fa-solid fa-circle-check text-cyan-400 text-[10px]" />
                        <span>{srv.title}</span>
                      </h5>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{srv.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="pt-2">
                <button
                  onClick={() => handleActionClick('scroll_to_contact')}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-all hover:scale-[1.02]"
                >
                  <i className="fa-solid fa-paper-plane" />
                  <span>Send Project Inquiry / Contact</span>
                </button>

                <div className="flex items-center justify-center gap-4 mt-3 text-slate-400 text-sm">
                  <a
                    href={PORTFOLIO_INFO.socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                    title="GitHub"
                  >
                    <i className="fa-brands fa-github" />
                  </a>
                  <a
                    href={PORTFOLIO_INFO.socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                    title="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin" />
                  </a>
                  <a
                    href={PORTFOLIO_INFO.socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-pink-400 transition-colors"
                    title="Instagram"
                  >
                    <i className="fa-brands fa-instagram" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
