import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, CheckCircle2, Circle, Lock, PlayCircle, BookOpen, 
  DollarSign, Trophy, ArrowRight, User, Star, Zap, 
  ChevronRight, TrendingUp, Award, MessageSquare, X, Send
} from 'lucide-react';

const RoadmapDashboard = () => {
  // --- CORE DATA STRUCTURE ---
  const initialRoadmap = {
    talent: "Software Development",
    roleModel: {
      name: "Alex Chen",
      title: "Founder of DevFlow",
      bio: "Started coding at 14, sold first SaaS at 19. Alex believes in building 'ugly' first and scaling later.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    phases: [
      {
        id: 0,
        title: "Phase 1: Foundations",
        tasks: [
          { id: "p1-1", title: "Master Logic Fundamentals", type: "theory", duration: "2 weeks" },
          { id: "p1-2", title: "Choose Your Tech Stack", type: "decision", duration: "1 day" }
        ]
      },
      {
        id: 1,
        title: "Phase 2: The Build Stage",
        tasks: [
          { id: "p2-1", title: "Create Your First Landing Page", type: "project", duration: "1 week" },
          { id: "p2-2", title: "Integrate Database Basics", type: "skill", duration: "2 weeks" },
          { id: "p2-3", title: "Build a Personal Portfolio", type: "project", duration: "1 week" }
        ]
      },
      {
        id: 2,
        title: "Phase 3: Public Launch",
        tasks: [
          { id: "p3-1", title: "Publish to GitHub/Vercel", type: "action" },
          { id: "p3-2", title: "Get 10 Beta Users", type: "growth" }
        ]
      },
      {
        id: 3,
        title: "Phase 4: Monetization",
        tasks: [
          { id: "p4-1", title: "Setup Stripe Payments", type: "finance" },
          { id: "p4-2", title: "First Paid Client/Subscriber", type: "income" }
        ]
      }
    ]
  };

  // --- STATE MANAGEMENT ---
  const [completedTaskIds, setCompletedTaskIds] = useState(() => {
    const saved = localStorage.getItem('roadmap_progress');
    return saved ? JSON.parse(saved) : ["p1-1"]; // Start with one task done
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeBio, setActiveBio] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('roadmap_progress', JSON.stringify(completedTaskIds));
  }, [completedTaskIds]);

  // --- ENGINE LOGIC ---
  const toggleTask = (taskId) => {
    setCompletedTaskIds(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  // Calculate Progress Logic
  const stats = useMemo(() => {
    const totalTasks = initialRoadmap.phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
    const completedCount = completedTaskIds.length;
    const percentage = Math.round((completedCount / totalTasks) * 100);
    
    // Determine the current "Active Phase"
    let currentPhaseIdx = 0;
    for (let i = 0; i < initialRoadmap.phases.length; i++) {
      const phaseTasks = initialRoadmap.phases[i].tasks.map(t => t.id);
      const isPhaseDone = phaseTasks.every(id => completedTaskIds.includes(id));
      if (isPhaseDone) currentPhaseIdx = i + 1;
      else {
        currentPhaseIdx = i;
        break;
      }
    }

    return { percentage, currentPhaseIdx, completedCount, totalTasks };
  }, [completedTaskIds]);

  // --- HELPER: GET PHASE STATUS ---
  const getPhaseStatus = (index) => {
    if (index < stats.currentPhaseIdx) return 'completed';
    if (index === stats.currentPhaseIdx) return 'active';
    return 'locked';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20 selection:bg-indigo-100">
      
      {/* 1. DYNAMIC HEADER */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
              <Map size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">EmpowerPath <span className="text-indigo-600">Engine</span></h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Roadmap v1.0.4</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Current Path</span>
              <span className="text-sm font-bold text-slate-700">{initialRoadmap.talent}</span>
            </div>
            <div className="h-10 w-[1px] bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold">User Profile</p>
                <p className="text-[10px] text-emerald-500 font-bold italic">Level 4 Talent</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 rounded-full border-2 border-white overflow-hidden shadow-sm flex items-center justify-center text-indigo-600 font-bold">
                JD
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 mt-10 grid lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: THE ENGINE */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Progress Dashboard Card */}
          <motion.div 
            layout
            className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-300"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 blur-[100px] rounded-full -mr-20 -mt-20" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-4 border border-white/10">
                  <Trophy size={12} /> Milestone tracking active
                </div>
                <h2 className="text-5xl font-black mb-2">{stats.percentage}% <span className="text-2xl text-slate-400 font-medium">Complete</span></h2>
                <p className="text-indigo-200 font-medium max-w-sm">You have completed {stats.completedCount} of {stats.totalTasks} skill modules. Keep pushing!</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                   <svg className="w-full h-full transform -rotate-90">
                     <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                     <motion.circle 
                        cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={364.4}
                        initial={{ strokeDashoffset: 364.4 }}
                        animate={{ strokeDashoffset: 364.4 - (364.4 * stats.percentage) / 100 }}
                        className="text-indigo-400"
                      />
                   </svg>
                   <Zap className="absolute text-amber-400" size={32} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* DYNAMIC ROADMAP PHASES */}
          <div className="space-y-8">
            {initialRoadmap.phases.map((phase, pIdx) => {
              const status = getPhaseStatus(pIdx);
              return (
                <div key={phase.id} className={`relative pl-10 before:absolute before:left-0 before:top-4 before:bottom-[-2rem] before:w-[2px] before:bg-slate-200 last:before:hidden`}>
                  
                  {/* Phase Node */}
                  <div className={`absolute left-[-11px] top-4 w-6 h-6 rounded-full border-4 border-[#F8FAFC] z-20 flex items-center justify-center transition-all duration-500
                    ${status === 'completed' ? 'bg-emerald-500 scale-110 shadow-lg shadow-emerald-100' : 
                      status === 'active' ? 'bg-indigo-600 scale-125 animate-pulse shadow-xl shadow-indigo-100' : 'bg-slate-300'}
                  `}>
                    {status === 'completed' && <CheckCircle2 size={12} className="text-white" />}
                  </div>

                  <motion.div 
                    initial={false}
                    animate={{ opacity: status === 'locked' ? 0.5 : 1 }}
                    className={`bg-white rounded-[2rem] border transition-all duration-500 overflow-hidden
                      ${status === 'active' ? 'border-indigo-200 shadow-xl shadow-indigo-50/50 ring-1 ring-indigo-100' : 'border-slate-100 shadow-sm'}
                    `}
                  >
                    <div className="p-8">
                      <div className="flex justify-between items-center mb-8">
                        <div>
                          <h3 className="text-2xl font-black text-slate-800 tracking-tight">{phase.title}</h3>
                          <p className="text-sm text-slate-400 font-medium">Step {pIdx + 1} of 4 • {phase.tasks.length} Modules</p>
                        </div>
                        {status === 'locked' && <Lock size={20} className="text-slate-300" />}
                        {status === 'completed' && <span className="text-[10px] font-black text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full">Completed</span>}
                      </div>

                      <div className="grid gap-4">
                        {phase.tasks.map((task) => {
                          const isDone = completedTaskIds.includes(task.id);
                          return (
                            <button
                              key={task.id}
                              disabled={status === 'locked'}
                              onClick={() => toggleTask(task.id)}
                              className={`flex items-center justify-between p-5 rounded-2xl border transition-all text-left
                                ${isDone ? 'bg-emerald-50/30 border-emerald-100 shadow-inner' : 
                                  status === 'locked' ? 'bg-slate-50 border-transparent cursor-not-allowed' : 
                                  'bg-white border-slate-100 hover:border-indigo-300 hover:-translate-y-0.5'}
                              `}
                            >
                              <div className="flex items-center gap-5">
                                <div className={`transition-colors duration-300 ${isDone ? 'text-emerald-500' : 'text-slate-200'}`}>
                                  <CheckCircle2 size={28} strokeWidth={isDone ? 3 : 2} />
                                </div>
                                <div>
                                  <p className={`font-bold text-base ${isDone ? 'text-slate-500 line-through' : 'text-slate-700'}`}>{task.title}</p>
                                  <div className="flex gap-3 mt-1">
                                    <span className="text-[10px] font-black uppercase text-indigo-500">{task.type}</span>
                                    {task.duration && <span className="text-[10px] font-bold text-slate-400 italic">⏳ {task.duration}</span>}
                                  </div>
                                </div>
                              </div>
                              {!isDone && status !== 'locked' && <PlayCircle size={24} className="text-slate-300 group-hover:text-indigo-600" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* 1. ROLE MODEL MODAL-LIKE CARD */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm overflow-hidden relative">
            <h4 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Star size={14} fill="currentColor" /> North Star Model
            </h4>
            <div className="flex items-center gap-5 mb-6">
              <div className="relative">
                <img src={initialRoadmap.roleModel.image} alt="Role Model" className="w-20 h-20 rounded-3xl object-cover shadow-xl border-4 border-white" />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-2 border-white">
                  <CheckCircle2 size={12} />
                </div>
              </div>
              <div>
                <h5 className="font-black text-xl text-slate-800">{initialRoadmap.roleModel.name}</h5>
                <p className="text-xs text-slate-500 font-bold">{initialRoadmap.roleModel.title}</p>
              </div>
            </div>
            
            <p className={`text-sm text-slate-600 leading-relaxed mb-8 italic ${!activeBio && 'line-clamp-2'}`}>
              "{initialRoadmap.roleModel.bio}"
            </p>
            
            <button 
              onClick={() => setActiveBio(!activeBio)}
              className="w-full py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-800 font-black text-sm transition-all flex items-center justify-center gap-2"
            >
              {activeBio ? "Show Less" : "Full Story"} <ChevronRight size={16} className={activeBio ? 'rotate-90' : ''} />
            </button>
          </div>

          {/* 2. DYNAMIC INCOME ENGINE */}
          <div className="bg-emerald-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-emerald-100 overflow-hidden relative">
            <div className="absolute bottom-0 right-0 p-4 opacity-10 rotate-12"><TrendingUp size={120} /></div>
            <h4 className="font-black text-sm uppercase tracking-widest mb-8 opacity-80">Wealth Projection</h4>
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-end pb-4 border-b border-white/20">
                <span className="text-xs font-bold opacity-80">Phase 3 (Active Launch)</span>
                <span className="text-xl font-black">$450 - $1,200 <span className="text-[10px] opacity-70">/MO</span></span>
              </div>
              <div className="flex justify-between items-end pb-4 border-b border-white/20">
                <span className="text-xs font-bold opacity-80">Phase 4 (Scale)</span>
                <span className="text-xl font-black">$4,500+ <span className="text-[10px] opacity-70">/MO</span></span>
              </div>
            </div>
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-[10px] font-bold leading-tight uppercase opacity-90">Pathway confirmed: 82% of developers at Phase 4 reach financial freedom within 18 months.</p>
            </div>
          </div>

          {/* 3. MENTOR TRIGGER */}
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-full bg-white border border-slate-200 p-8 rounded-[2.5rem] text-left hover:border-indigo-400 transition-all group shadow-sm"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <MessageSquare size={24} />
              </div>
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-tighter">Experts Online</span>
            </div>
            <h4 className="font-black text-xl mb-2 text-slate-800">Ask a Question</h4>
            <p className="text-sm text-slate-500 font-medium">Stuck on a logic module? Get human help in under 5 minutes.</p>
          </button>

        </div>
      </main>

      {/* --- FLOATING CHAT MODAL --- */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-96 h-[500px] bg-white rounded-[2.5rem] shadow-2xl z-[100] border border-slate-200 flex flex-col overflow-hidden"
          >
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center"><User size={16}/></div>
                <div>
                  <p className="text-xs font-bold leading-tight">Sarah (Lead Mentor)</p>
                  <p className="text-[10px] text-emerald-400">Online & Ready</p>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:rotate-90 transition-transform"><X size={20}/></button>
            </div>
            
            <div className="flex-grow p-6 bg-slate-50 overflow-y-auto space-y-4">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] border border-slate-100">
                <p className="text-sm text-slate-700">Hey there! I see you're working on the **Foundations Phase**. Any blockers with the Logic module?</p>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input type="text" placeholder="Type a message..." className="flex-grow px-4 py-3 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 ring-indigo-500/20" />
              <button className="bg-indigo-600 text-white p-3 rounded-xl hover:scale-105 transition-transform"><Send size={18}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default RoadmapDashboard;