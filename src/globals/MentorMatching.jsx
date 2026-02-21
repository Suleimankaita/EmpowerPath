import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Star, ShieldCheck, Clock, MessageSquare, 
  ChevronRight, X, UserCheck, Zap, Briefcase, Globe, Info, Send, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MentorMatchingPage = () => {
  // --- STATE MANAGEMENT ---
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // --- MOCK DATA ---
  const currentUser = {
    talent: "Software Development",
    stage: "Build Phase",
    recommendation: "Senior Developer / Tech Founder"
  };

  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Engineer @ Google",
      talent: "Software Development",
      exp: "8 Years",
      rating: 4.9,
      students: 24,
      status: "Available",
      bio: "Specializing in React, System Design, and helping juniors transition into Big Tech.",
      journey: "From self-taught coder to Engineering Lead. I focus on clean architecture and career strategy.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      name: "Marcus Thorne",
      role: "SaaS Founder",
      talent: "Software Development",
      exp: "12 Years",
      rating: 5.0,
      students: 15,
      status: "Busy",
      bio: "I help developers build their first MVP and understand the business side of code.",
      journey: "Founded three profitable startups. I mentor those looking to build their own products.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "UX Strategy Lead",
        talent: "UI/UX Design",
        exp: "6 Years",
        rating: 4.8,
        students: 31,
        status: "Available",
        bio: "Mastering user psychology and interface precision for global-scale applications.",
        journey: "Background in cognitive science. I mentor on how to make apps feel human.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    }
  ];

  // --- LOGIC: FILTERING & SEARCH ---
  const filteredMentors = useMemo(() => {
    return mentors.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            m.talent.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === "All" || m.talent === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  // --- LOGIC: REQUEST SUBMISSION ---
  const handleSubmitRequest = () => {
    // Simulated API call
    setTimeout(() => {
      setRequestSubmitted(true);
      setIsRequesting(false);
      // Reset after 3 seconds
      setTimeout(() => {
        setRequestSubmitted(false);
        setSelectedMentor(null);
      }, 3000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20 selection:bg-indigo-100">
      
      {/* 1. PAGE HEADER */}
      <header className="bg-white border-b border-slate-100 pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-black tracking-tight mb-4">Find a Mentor for Your Talent</h1>
            <p className="text-xl text-slate-400 font-medium">Direction + Human Guidance = Accelerated Growth.</p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-8 space-y-12">
        
        {/* 2. MATCH SUMMARY SECTION */}
        <section className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/20 rounded-full text-indigo-300 text-[10px] font-black uppercase tracking-widest border border-indigo-500/30">
                <Zap size={14} fill="currentColor" /> Strategic Matching Active
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <p className="text-indigo-300/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Your Talent</p>
                  <p className="text-xl font-black italic">{currentUser.talent}</p>
                </div>
                <div>
                  <p className="text-indigo-300/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Current Stage</p>
                  <p className="text-xl font-black italic">{currentUser.stage}</p>
                </div>
                <div>
                  <p className="text-indigo-300/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Recommended</p>
                  <p className="text-xl font-black italic">{currentUser.recommendation}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-[2.5rem] border border-white/10 backdrop-blur-md max-w-sm">
              <p className="text-sm font-medium text-slate-300 leading-relaxed">
                Expert-led guidance reduces roadmap friction by <span className="text-indigo-400 font-black">65%</span>. We’ve prioritized mentors in the <span className="text-white underline decoration-indigo-500">Launch Phase</span> for you.
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/30 blur-[120px] rounded-full -mr-32 -mt-32" />
        </section>

        {/* 3. FILTER & SEARCH BAR */}
        <section className="flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, company, or skill..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border border-slate-100 rounded-[2rem] font-bold text-lg focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar py-2 px-1">
            {["All", "Software Development", "UI/UX Design"].map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap px-8 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all ${
                  activeFilter === filter 
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" 
                  : "bg-white border border-slate-100 text-slate-400 hover:border-indigo-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* 4. MENTOR GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredMentors.map(mentor => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={mentor.id}
                className="bg-white border border-slate-100 rounded-[3rem] p-8 shadow-sm hover:shadow-2xl transition-all group cursor-pointer"
                onClick={() => setSelectedMentor(mentor)}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="relative">
                    <img src={mentor.image} alt={mentor.name} className="w-24 h-24 rounded-[2rem] object-cover transition-transform duration-500 group-hover:scale-105 shadow-lg" />
                    <div className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full border-4 border-white ${mentor.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 text-slate-800 px-4 py-2 rounded-2xl font-black text-xs">
                    <Star size={14} className="text-amber-400" fill="currentColor" /> {mentor.rating}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-black tracking-tight">{mentor.name}</h3>
                    <ShieldCheck size={20} className="text-indigo-600" />
                  </div>
                  <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4">{mentor.role}</p>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-2 italic">"{mentor.bio}"</p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Experience</span>
                      <span className="text-sm font-black text-slate-700">{mentor.exp}</span>
                   </div>
                   <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <ChevronRight size={20} />
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>

      {/* 5. UNIFIED MODAL SYSTEM (PROFILE & REQUEST) */}
      <AnimatePresence>
        {selectedMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => { if(!isRequesting) setSelectedMentor(null) }} />
            
            <motion.div 
              layoutId={`mentor-${selectedMentor.id}`}
              className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <button className="absolute top-8 right-8 p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors z-20" onClick={() => { setSelectedMentor(null); setIsRequesting(false); }}>
                <X size={24} />
              </button>

              <div className="p-12 max-h-[90vh] overflow-y-auto no-scrollbar">
                {!isRequesting ? (
                  /* PROFILE VIEW */
                  <div className="space-y-10">
                    <div className="flex flex-col md:flex-row gap-10">
                      <img src={selectedMentor.image} className="w-40 h-40 rounded-[2.5rem] object-cover shadow-2xl ring-8 ring-slate-50" />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                           <h2 className="text-4xl font-black">{selectedMentor.name}</h2>
                           <ShieldCheck className="text-indigo-600" size={28} />
                        </div>
                        <p className="text-xl font-bold text-slate-400 mb-6 tracking-tight">{selectedMentor.role}</p>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-2">
                            <Briefcase size={12} /> {selectedMentor.talent}
                          </span>
                          <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                            <UserCheck size={12} /> High Impact Mentor
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-slate-50 rounded-[2.5rem]">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">The Journey</h4>
                            <p className="text-slate-600 leading-relaxed font-medium italic">"{selectedMentor.journey}"</p>
                        </div>
                        <div className="space-y-4">
                            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-slate-400">Total Students</span>
                                <span className="text-lg font-black">{selectedMentor.students}</span>
                            </div>
                            <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-slate-400">Response Rate</span>
                                <span className="text-lg font-black text-emerald-600">98%</span>
                            </div>
                        </div>
                    </div>

                    <button 
                      onClick={() => setIsRequesting(true)}
                      className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-indigo-100"
                    >
                      Request Guided Mentorship <Zap size={24} fill="white" />
                    </button>
                  </div>
                ) : (
                  /* REQUEST FLOW VIEW */
                  <div className="text-center py-6">
                    {requestSubmitted ? (
                        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="space-y-6">
                            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <CheckCircle2 size={48} />
                            </div>
                            <h3 className="text-4xl font-black tracking-tight italic">Request Sent!</h3>
                            <p className="text-slate-400 font-bold max-w-xs mx-auto leading-relaxed">
                                Our safety protocol is reviewing your request. {selectedMentor.name} will respond within 48 hours.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-4xl font-black italic tracking-tight">Personalize Request</h3>
                                <p className="text-slate-400 font-medium">Why are you choosing <span className="text-slate-900 font-black underline">{selectedMentor.name}</span> for your {currentUser.talent} journey?</p>
                            </div>
                            
                            <div className="text-left space-y-6">
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block ml-2">Context for the Mentor</label>
                                    <textarea 
                                        className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-8 min-h-[160px] font-medium text-lg focus:outline-none focus:ring-4 focus:ring-indigo-50 placeholder:text-slate-300 shadow-inner"
                                        placeholder="I’ve completed my MVP roadmap and I’m struggling with scaling the cloud architecture. I saw your experience at Google and..."
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <button 
                                        onClick={handleSubmitRequest}
                                        className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 shadow-xl"
                                    >
                                        Send Request <Send size={20} />
                                    </button>
                                    <button 
                                        onClick={() => setIsRequesting(false)}
                                        className="w-full py-4 text-slate-400 font-black uppercase tracking-widest text-xs hover:text-slate-900 transition-colors"
                                    >
                                        Wait, go back
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorMatchingPage;