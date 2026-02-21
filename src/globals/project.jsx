import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderPlus, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  ExternalLink, 
  Layout, 
  Trophy, 
  AlertCircle, 
  Plus, 
  Github, 
  Globe, 
  Send,
  MoreVertical,
  Briefcase,
  FileText,
  UserCheck,
  ChevronRight
} from 'lucide-react';

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all'); // all | pending | approved
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- MOCK DATA ---
  const stats = [
    { label: "Total Projects", value: 12, icon: <Layout className="text-indigo-600" /> },
    { label: "Approved", value: 8, icon: <CheckCircle2 className="text-emerald-500" /> },
    { label: "Pending Review", value: 3, icon: <Clock className="text-amber-500" /> },
    { label: "Completion Rate", value: "84%", icon: <Trophy className="text-purple-500" /> },
  ];

  const projects = [
    {
      id: 1,
      title: "FinTech Dashboard UI",
      description: "A comprehensive dashboard for managing personal finances with real-time data visualization.",
      category: "Product Design",
      roadmapStage: "Phase 2: Build Stage",
      status: "Approved",
      feedback: "Excellent attention to detail on the spacing. Try to simplify the navigation in the next iteration.",
      mentor: "Sarah K.",
      date: "Oct 12, 2025",
      link: "https://behance.net/project1"
    },
    {
      id: 2,
      title: "E-Commerce API Integration",
      description: "Back-end integration using Stripe and Node.js for a luxury fashion retailer.",
      category: "Software Dev",
      roadmapStage: "Phase 3: Launch",
      status: "Pending",
      feedback: null,
      mentor: "Alex Chen",
      date: "Oct 28, 2025",
      link: "https://github.com/user/api"
    },
    {
      id: 3,
      title: "Brand Identity: SolarFlow",
      description: "Complete branding package including logo, typography, and brand guidelines for a green tech startup.",
      category: "Creative Arts",
      roadmapStage: "Phase 2: Foundations",
      status: "Needs Revision",
      feedback: "The color palette is strong, but the logo mark is too complex for small sizes. Simplify the icon.",
      mentor: "Marcus V.",
      date: "Nov 02, 2025",
      link: null
    }
  ];

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'pending') return p.status === 'Pending';
    if (filter === 'approved') return p.status === 'Approved';
    return true;
  });

  // --- COMPONENT: STATUS BADGE ---
  const StatusBadge = ({ status }) => {
    const styles = {
      "Approved": "bg-emerald-50 text-emerald-700 border-emerald-100",
      "Pending": "bg-amber-50 text-amber-700 border-amber-100",
      "Needs Revision": "bg-rose-50 text-rose-700 border-rose-100",
      "Draft": "bg-slate-50 text-slate-700 border-slate-100"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-20 mt-20">
      
      {/* 1️⃣ PAGE HEADER & STATS */}
      <header className="bg-white border-b border-slate-200 pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Project Studio</h1>
              <p className="text-slate-500 font-medium">Turn your roadmap tasks into a world-class portfolio.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >
              <Plus size={20} /> Submit New Project
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-[2rem] flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        
        {/* 2️⃣ ACTIVE PROJECT SECTION (The "Now" Task) */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Current Milestone Requirement</h2>
          </div>
          
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
              <div className="flex-1">
                <span className="px-4 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase mb-6 inline-block">Roadmap Phase 3: Project submission</span>
                <h3 className="text-3xl md:text-5xl font-black mb-6">Marketplace Backend Logic</h3>
                <p className="text-slate-400 text-lg mb-8 max-w-xl">You've finished the theory! Now, build a working API with at least 5 endpoints and basic authentication to unlock Phase 4 (Monetization).</p>
                
                <div className="flex flex-wrap gap-4 mb-10">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-300 bg-white/5 px-4 py-2 rounded-xl">
                    <UserCheck size={16} className="text-indigo-400" /> Mentor: Alex Chen
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-300 bg-white/5 px-4 py-2 rounded-xl">
                    <Briefcase size={16} className="text-emerald-400" /> Income Readiness: +15%
                  </div>
                </div>

                <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-indigo-50 transition-all">
                  Continue Working <ChevronRight size={20} />
                </button>
              </div>

              <div className="w-full lg:w-72 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 p-6">
                <h4 className="font-bold mb-4 text-sm opacity-60">Required Skills:</h4>
                <ul className="space-y-3">
                  {['JWT Auth', 'REST API Design', 'Schema Validation', 'Error Handling'].map((skill, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3️⃣ PROJECT LIST & FILTERING */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-slate-800">Your Portfolio</h2>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
              {['all', 'pending', 'approved'].map((t) => (
                <button 
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${filter === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden group hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <StatusBadge status={project.status} />
                      <button className="text-slate-300 hover:text-slate-600"><MoreVertical size={20} /></button>
                    </div>
                    
                    <h4 className="text-xl font-black text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{project.title}</h4>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed">{project.description}</p>
                    
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                        <FileText size={16} />
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{project.category}</span>
                    </div>

                    {/* Feedback Area */}
                    {project.feedback ? (
                      <div className="bg-indigo-50/50 rounded-2xl p-4 mb-8">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare size={14} className="text-indigo-600" />
                          <span className="text-[10px] font-black uppercase text-indigo-600">Mentor Feedback</span>
                        </div>
                        <p className="text-[11px] text-slate-600 italic leading-relaxed">"{project.feedback}"</p>
                      </div>
                    ) : (
                      <div className="h-[74px] flex items-center justify-center border-2 border-dashed border-slate-50 rounded-2xl mb-8">
                        <span className="text-[10px] font-bold text-slate-300 italic tracking-widest">Awaiting Review</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{project.date}</span>
                      {project.link && (
                        <a href={project.link} className="flex items-center gap-2 text-indigo-600 text-sm font-bold hover:gap-3 transition-all">
                          Live View <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* 4️⃣ ADD PROJECT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-xl rounded-[2.5rem] p-10 relative z-10 shadow-2xl"
            >
              <h2 className="text-2xl font-black mb-2">Submit Your Work</h2>
              <p className="text-slate-500 text-sm mb-8 font-medium">Our mentors review submissions within 24 hours.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Project Title</label>
                  <input type="text" placeholder="e.g. Personal Portfolio v1" className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-indigo-500 font-medium" />
                </div>
                
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Project Link (Github/Behance)</label>
                  <div className="flex gap-2">
                    <div className="bg-slate-50 p-4 rounded-2xl text-slate-400"><Github size={20}/></div>
                    <input type="text" placeholder="https://..." className="flex-grow px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-indigo-500 font-medium" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Description</label>
                  <textarea rows="3" placeholder="Explain your process and tools used..." className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 ring-indigo-500 font-medium"></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 py-4 font-bold text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
                  <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
                    Submit Project <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProjectsPage;