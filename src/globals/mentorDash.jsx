import React, { useState, useMemo } from 'react';
import { 
  Users, Clock, Star, CheckCircle2, XCircle, ChevronRight, 
  MessageSquare, LayoutGrid, Zap, Bell, Search, 
  MoreVertical, Filter, ArrowUpRight, Shield, Rocket, Target,
  ZapOff, Activity, MoreHorizontal, X, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MentorDashboard = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('requests'); 
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isOfficeHoursActive, setIsOfficeHoursActive] = useState(false);

  const [requests, setRequests] = useState([
    {
      id: "req_1",
      name: "Jordan Smith",
      talent: "Software Development",
      stage: "Build Phase",
      message: "I’ve hit a wall with my database schema. Need insight on scaling.",
      activityScore: 88,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
      roadmapProgress: 65,
      recentActivity: [4, 2, 5, 0, 3, 4, 1]
    },
    {
      id: "req_2",
      name: "Mia Wong",
      talent: "Product Design",
      stage: "Ideation",
      message: "Building a fintech app. Need guidance on security and Git workflow.",
      activityScore: 94,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
      roadmapProgress: 12,
      recentActivity: [5, 5, 4, 5, 3, 5, 5]
    }
  ]);

  const [roster, setRoster] = useState([
    { 
      id: "s_1", 
      name: "Alex Rivera", 
      talent: "Software Dev", 
      status: "Active", 
      lastMeeting: "2 days ago", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
      roadmapProgress: 78,
      activityScore: 91,
      message: "Currently optimizing the backend routes."
    }
  ]);

  // --- LOGIC ---
  
  // Search & Filter Logic
  const filteredRequests = useMemo(() => {
    return requests.filter(r => 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      r.talent.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [requests, searchTerm]);

  const filteredRoster = useMemo(() => {
    return roster.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.talent.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [roster, searchTerm]);

  const handleAccept = (request) => {
    triggerNotification(`Success! ${request.name} added to your roster.`);
    setRequests(prev => prev.filter(r => r.id !== request.id));
    setRoster(prev => [{ ...request, status: "Active", lastMeeting: "Just now" }, ...prev]);
  };

  const handleDecline = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    triggerNotification("Request declined.");
  };

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleOfficeHours = () => {
    setIsOfficeHoursActive(!isOfficeHoursActive);
    triggerNotification(isOfficeHoursActive ? "Office hours disabled." : "You are now LIVE for office hours.");
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA] font-sans text-slate-900 flex flex-col antialiased">
      
      {/* 1. FLOATING GLOBAL NAV */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl shadow-indigo-100/50 rounded-[2.5rem] px-8 py-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
            <Shield size={20} fill="currentColor" />
          </div>
          <span className="font-black tracking-tighter text-xl italic hidden sm:block">EmpowerPath <span className="text-indigo-600">PRO</span></span>
        </div>
        
        <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
          {['Overview', 'Students', 'Settings'].map((item) => (
            <button key={item} className="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 hover:bg-white transition-all">
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
          </div>
          <div className="h-8 w-px bg-slate-200 mx-2" />
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" className="w-10 h-10 rounded-full border-2 border-indigo-100 shadow-sm cursor-pointer hover:scale-110 transition-transform" alt="Mentor" />
        </div>
      </nav>

      {/* 2. MAIN HUB */}
      <main className="flex-1 max-w-7xl mx-auto w-full pt-32 px-6 pb-20">
        
        {/* TOAST NOTIFICATION */}
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ y: -100, x: '-50%', opacity: 0 }} 
              animate={{ y: 0, x: '-50%', opacity: 1 }} 
              exit={{ y: -100, x: '-50%', opacity: 0 }}
              className="fixed top-28 left-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl z-[60] font-black flex items-center gap-3 min-w-[300px] justify-center"
            >
              <Zap size={18} className="text-amber-400" /> {notification}
            </motion.div>
          )}
        </AnimatePresence>

        {/* TOP STATS GRID */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Active Cohort", val: roster.length, icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
            { label: "Pending", val: requests.length, icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
            { label: "Talent Score", val: "9.2", icon: Star, color: "text-emerald-500", bg: "bg-emerald-50" },
            { label: "Growth Units", val: "128", icon: Rocket, color: "text-rose-500", bg: "bg-rose-50" },
          ].map((s, i) => (
            <motion.div whileHover={{ y: -5 }} key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className={`${s.bg} ${s.color} w-10 h-10 rounded-2xl flex items-center justify-center mb-4`}>
                <s.icon size={20} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <p className="text-3xl font-black">{s.val}</p>
            </motion.div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* TAB CONTENT (LEFT 8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-2 gap-4">
              <div className="flex gap-8">
                {['requests', 'roster'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-indigo-600' : 'text-slate-300'}`}
                  >
                    {tab} ({tab === 'requests' ? requests.length : roster.length})
                    {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-full" />}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search by name or talent..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'requests' ? (
                <motion.div key="req-list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  {filteredRequests.length > 0 ? filteredRequests.map((req) => (
                    <motion.div layout key={req.id} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:border-indigo-100 group transition-all">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-32 flex flex-col items-center gap-4">
                          <img src={req.image} className="w-24 h-24 rounded-[2.5rem] object-cover ring-4 ring-slate-50 shadow-xl" />
                          <div className="flex gap-1">
                            {req.recentActivity.map((val, i) => (
                              <div key={i} className={`w-2.5 h-2.5 rounded-sm ${val > 3 ? 'bg-indigo-500' : val > 0 ? 'bg-indigo-200' : 'bg-slate-100'}`} />
                            ))}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-2xl font-black tracking-tight group-hover:text-indigo-600 transition-colors">{req.name}</h3>
                              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{req.talent} • {req.stage}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => handleDecline(req.id)} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-all">
                                <XCircle size={20} />
                              </button>
                              <button onClick={() => handleAccept(req)} className="p-3 bg-indigo-600 text-white rounded-xl hover:shadow-xl shadow-indigo-100 transition-all">
                                <CheckCircle2 size={20} />
                              </button>
                            </div>
                          </div>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 italic bg-slate-50 p-4 rounded-2xl border-l-4 border-indigo-200">"{req.message}"</p>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Growth Score</span>
                                <span className="text-sm font-black text-indigo-600">{req.activityScore}</span>
                             </div>
                             <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Roadmap</span>
                                <span className="text-sm font-black text-slate-800">{req.roadmapProgress}%</span>
                             </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )) : (
                    <div className="py-20 text-center text-slate-300">
                      <ZapOff size={48} className="mx-auto mb-4 opacity-20" />
                      <p className="font-black uppercase tracking-widest text-xs">No pending requests found</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div key="roster-list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredRoster.length > 0 ? filteredRoster.map(student => (
                    <div key={student.id} className="p-6 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-between shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center gap-4">
                          <img src={student.image} className="w-14 h-14 rounded-2xl object-cover shadow-md" />
                          <div>
                             <h5 className="font-black text-base">{student.name}</h5>
                             <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Last: {student.lastMeeting}
                             </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSelectedStudent(student)}
                          className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm"
                        >
                          <ArrowUpRight size={18} />
                        </button>
                    </div>
                  )) : (
                    <div className="col-span-2 py-20 text-center text-slate-300">
                      <Users size={48} className="mx-auto mb-4 opacity-20" />
                      <p className="font-black uppercase tracking-widest text-xs">Your roster is currently empty</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDEBAR (4 COLS) */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
               <Activity className="absolute -right-6 -bottom-6 text-indigo-500/10 w-44 h-44" />
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-8 flex items-center gap-2">
                 <Shield size={14} /> Global Status
               </h4>
               <div className="space-y-6 relative z-10">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-400">Visibility</span>
                    <span className={`text-sm font-black flex items-center gap-1 ${isOfficeHoursActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${isOfficeHoursActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} /> 
                      {isOfficeHoursActive ? 'LIVE' : 'Snoozed'}
                    </span>
                 </div>
                 <div className="h-px bg-white/10 w-full" />
                 <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-4 tracking-widest">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-3">
                       <button 
                        onClick={toggleOfficeHours}
                        className={`p-4 border rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${isOfficeHoursActive ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                       >
                         {isOfficeHoursActive ? 'Close Office' : 'Open Office'}
                       </button>
                       <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Broadcast</button>
                    </div>
                 </div>
               </div>
            </section>

            <section className="space-y-4 px-2">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex justify-between items-center">
                 Upcoming Sessions <span className="text-indigo-600 cursor-pointer">View All</span>
               </h4>
               <div className="p-6 bg-white border border-slate-100 rounded-[2.5rem] space-y-6 shadow-sm">
                  {roster.slice(0, 2).map((s, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black text-[10px]">
                             {i === 0 ? '16:00' : '18:30'}
                          </div>
                          <div>
                             <p className="text-xs font-black group-hover:text-indigo-600 transition-colors">{s.name}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase">Roadmap Sync</p>
                          </div>
                       </div>
                       <ArrowUpRight size={14} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                    </div>
                  ))}
               </div>
            </section>
          </div>
        </div>
      </main>

      {/* STUDENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedStudent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedStudent(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-10 overflow-hidden"
            >
              <button onClick={() => setSelectedStudent(null)} className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full transition-colors">
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-6 mb-8">
                <img src={selectedStudent.image} className="w-20 h-20 rounded-[2rem] object-cover shadow-xl" />
                <div>
                  <h2 className="text-2xl font-black">{selectedStudent.name}</h2>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{selectedStudent.talent}</p>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div className="bg-slate-50 p-6 rounded-[2rem]">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Current Status</p>
                  <p className="text-slate-600 font-medium leading-relaxed italic">"{selectedStudent.message}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-100 rounded-2xl">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Roadmap</p>
                    <p className="text-xl font-black text-slate-900">{selectedStudent.roadmapProgress}%</p>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-2xl">
                    <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Skill Rating</p>
                    <p className="text-xl font-black text-emerald-500">{selectedStudent.activityScore}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                  <MessageSquare size={16} /> Open Chat
                </button>
                <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all">
                  <ExternalLink size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default MentorDashboard;