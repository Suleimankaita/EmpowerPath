import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, MapPin, Target, Award, Github, ExternalLink, 
  Zap, ShieldCheck, Plus, MessageSquare, 
  X, Send, Image as ImageIcon, CheckCircle, Camera, Globe, Trash2, Upload, Activity
} from 'lucide-react';

// --- INITIAL SEED DATA ---
const INITIAL_DATA = {
  fullName: "Alex Chen",
  username: "alexc_dev",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  primaryTalent: "Full-Stack Developer",
  bio: "Building the future of web tech. Passionate about systems design and open-source.",
  location: "Lagos, Nigeria",
  isVerified: true,
  level: 4,
  consistency: 88,
  skills: ["React", "Node.js", "TypeScript", "Tailwind"],
  roadmap: { stage: "Build", progress: 65 },
  mentor: { name: "Sarah Jenkins", role: "Senior Engineer @ Google", initials: "SJ" },
  projects: [
    { id: 1, title: "FinTech Dashboard", tech: "React & Node", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500" }
  ]
};

const UserProfilePage = ({ isPrivate = true }) => {
  // --- CORE STATE ---
  const [user, setUser] = useState(INITIAL_DATA);
  const [activeModal, setActiveModal] = useState(null);
  const [showToast, setShowToast] = useState(false);
  
  // --- CHAT STATE ---
  const [chat, setChat] = useState([{ id: 0, role: 'mentor', text: "Great progress on that dashboard, Alex!" }]);
  const [msgInput, setMsgInput] = useState("");
  const chatEndRef = useRef(null);

  // --- FORM STATES & REFS ---
  const [tempAvatar, setTempAvatar] = useState(user.avatarUrl);
  const [tempProjectImg, setTempProjectImg] = useState(null);
  const avatarInputRef = useRef(null);
  const projectInputRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chat]);

  // --- GENERATE HEATMAP DATA WITH DATES ---
  // Generates 119 days (17 weeks) of activity data ending on today's date
  const activityData = useMemo(() => {
    const data = [];
    const today = new Date();
    const TOTAL_DAYS = 119;
    
    for (let i = 0; i < TOTAL_DAYS; i++) {
      // Randomize activity level from 0 to 4
      const level = Math.random() > 0.5 ? Math.floor(Math.random() * 4) + 1 : 0;
      
      // Calculate the specific date for this block
      const date = new Date(today);
      date.setDate(today.getDate() - (TOTAL_DAYS - 1 - i));
      
      // Format to something like "Feb 22, 2026"
      const dateString = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      data.push({ level, date: dateString });
    }
    return data;
  }, []);

  const getActivityColor = (level) => {
    switch(level) {
      case 1: return 'bg-indigo-300 dark:bg-indigo-900/60';
      case 2: return 'bg-indigo-400 dark:bg-indigo-700/80';
      case 3: return 'bg-indigo-500 dark:bg-indigo-500';
      case 4: return 'bg-indigo-600 dark:bg-indigo-400';
      default: return 'bg-slate-100 dark:bg-slate-800/40';
    }
  };

  // --- FILE HANDLERS ---
  const handleFileChange = (e, target) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'avatar') setTempAvatar(reader.result);
        if (target === 'project') setTempProjectImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProjectPhoto = (e) => {
    e.stopPropagation();
    setTempProjectImg(null);
    if (projectInputRef.current) projectInputRef.current.value = "";
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setUser({
      ...user,
      fullName: fd.get('fullName'),
      location: fd.get('location'),
      bio: fd.get('bio'),
      primaryTalent: fd.get('talent'),
      avatarUrl: tempAvatar
    });
    setActiveModal(null);
    triggerToast();
  };

  const handlePublishProject = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newProj = {
      id: Date.now(),
      title: fd.get('title'),
      tech: fd.get('tech'),
      image: tempProjectImg || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500"
    };
    setUser({ 
      ...user, 
      projects: [newProj, ...user.projects],
      level: user.projects.length % 2 === 0 ? user.level + 1 : user.level 
    });
    setActiveModal(null);
    setTempProjectImg(null);
    triggerToast();
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    setChat(prev => [...prev, { id: Date.now(), role: 'user', text: msgInput }]);
    setMsgInput("");
    setTimeout(() => {
      setChat(prev => [...prev, { id: Date.now() + 1, role: 'mentor', text: "Just reviewed it. The architecture looks solid! 🚀" }]);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 font-sans selection:bg-indigo-100">
      
      {/* SUCCESS TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold">
            <CheckCircle className="text-emerald-500" size={20} /> Success! Files Synchronized.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto space-y-8">
        
        {/* --- HERO SECTION --- */}
        <section className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] -mr-40 -mt-40" />
          
          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="relative group cursor-pointer" onClick={() => setActiveModal('profile')}>
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-[3rem] overflow-hidden ring-8 ring-indigo-50 dark:ring-indigo-900/20 shadow-2xl transition-transform group-hover:scale-[1.02]">
                <img src={user.avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
              </div>
              {isPrivate && (
                <div className="absolute bottom-2 right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-xl hover:bg-indigo-700 transition-colors">
                  <Camera size={20} />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{user.fullName}</h1>
                    {user.isVerified && <ShieldCheck className="text-indigo-500" fill="currentColor" size={32} />}
                  </div>
                  <p className="text-indigo-600 font-black text-xl mt-1">@{user.username}</p>
                </div>
                {isPrivate && (
                  <button onClick={() => setActiveModal('profile')} className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm hover:shadow-xl transition-all active:scale-95 flex items-center gap-2">
                    <Edit3 size={18} /> Manage Profile
                  </button>
                )}
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed max-w-2xl font-medium">{user.bio}</p>
            </div>
          </div>

          {/* STATS STRIP */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-12 border-t border-slate-100 dark:border-slate-800">
            {[
              { label: "Level", val: user.level, icon: Award, color: "text-amber-500" },
              { label: "Phase", val: user.roadmap.stage, icon: Target, color: "text-indigo-500" },
              { label: "Works", val: user.projects.length, icon: Github, color: "text-slate-900 dark:text-white" },
              { label: "Consistency", val: `${user.consistency}%`, icon: Zap, color: "text-violet-500" }
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-5 p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800/40 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/30 transition-colors">
                <div className={`p-4 rounded-[1.2rem] bg-white dark:bg-slate-900 shadow-sm ${s.color}`}><s.icon size={24} /></div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{s.label}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">{s.val}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDEBAR */}
          <div className="space-y-8">
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden group">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-70 mb-8">Verified Mentor</h3>
              <div className="flex items-center gap-5 mb-10">
                <div className="w-20 h-20 rounded-[1.5rem] bg-white/20 backdrop-blur-xl flex items-center justify-center text-3xl font-black border border-white/30">SJ</div>
                <div>
                  <p className="text-2xl font-bold leading-tight">{user.mentor.name}</p>
                  <p className="text-sm opacity-80 font-medium">{user.mentor.role}</p>
                </div>
              </div>
              <button onClick={() => setActiveModal('chat')} className="w-full py-5 bg-white text-indigo-600 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:shadow-xl transition-all">
                <MessageSquare size={18} /> Send Message
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Talent Stack</h3>
              <div className="flex flex-wrap gap-3">
                {user.skills.map(s => (
                  <span key={s} className="px-5 py-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-2xl text-xs font-black border border-slate-100 dark:border-slate-700">{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* --- NEW HEATMAP SECTION WITH DATES --- */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Activity size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Activity Graph</h3>
                </div>
                <p className="text-sm font-bold text-slate-400">Last 119 Days</p>
              </div>
              
              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 md:gap-2">
                  {activityData.map((data, i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 md:w-4 md:h-4 rounded-sm md:rounded-md transition-all duration-300 hover:scale-125 cursor-pointer ${getActivityColor(data.level)}`}
                      title={`${data.level > 0 ? data.level + ' contributions' : 'No activity'} on ${data.date}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Heatmap Legend */}
              <div className="flex items-center justify-end gap-2 mt-4 text-xs font-bold text-slate-400">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map(l => (
                    <div key={l} className={`w-3 h-3 rounded-sm ${getActivityColor(l)}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>

            {/* --- PORTFOLIO SECTION --- */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-4">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Portfolio</h3>
                <button onClick={() => setActiveModal('project')} className="p-4 bg-indigo-600 text-white rounded-[1.5rem] hover:rotate-90 transition-all shadow-lg shadow-indigo-500/40">
                  <Plus size={28} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode='popLayout'>
                  {user.projects.map(p => (
                    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key={p.id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500">
                      <div className="h-56 overflow-hidden relative">
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.title} />
                      </div>
                      <div className="p-8">
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{p.title}</h4>
                        <p className="text-sm font-black text-indigo-500 uppercase tracking-widest mt-2">{p.tech}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- MODAL SYSTEM --- */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
            
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] relative z-10 overflow-hidden shadow-2xl border border-white/10">
              
              {/* 1. PROFILE EDIT WITH FILE UPLOAD */}
              {activeModal === 'profile' && (
                <div className="p-10 space-y-8">
                  <h2 className="text-3xl font-black italic">Identity Settings</h2>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="flex flex-col items-center gap-4 py-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                       <div className="relative group">
                          <img src={tempAvatar} className="w-28 h-28 rounded-3xl object-cover shadow-2xl" alt="Preview" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <Upload className="text-white" />
                          </div>
                       </div>
                       <input type="file" ref={avatarInputRef} className="hidden" onChange={(e) => handleFileChange(e, 'avatar')} accept="image/*" />
                       <button type="button" onClick={() => avatarInputRef.current.click()} className="px-6 py-2 bg-white dark:bg-slate-900 rounded-xl text-xs font-black shadow-sm flex items-center gap-2">
                        <Camera size={14} /> Change Photo
                       </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input name="fullName" defaultValue={user.fullName} placeholder="Full Name" className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none font-bold text-slate-900 dark:text-white" />
                      <input name="talent" defaultValue={user.primaryTalent} placeholder="Title" className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none font-bold text-slate-900 dark:text-white" />
                    </div>
                    <textarea name="bio" defaultValue={user.bio} rows="3" className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none font-bold resize-none text-slate-900 dark:text-white" />
                    <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-colors">Save Changes</button>
                  </form>
                </div>
              )}

              {/* 2. PROJECT PUBLISH WITH REMOVE PHOTO */}
              {activeModal === 'project' && (
                <div className="p-10 text-center space-y-8">
                  <h2 className="text-3xl font-black italic">Publish Work</h2>
                  <form onSubmit={handlePublishProject} className="space-y-5">
                    <div 
                      className="group relative w-full h-52 bg-slate-100 dark:bg-slate-800 rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center cursor-pointer"
                      onClick={() => projectInputRef.current.click()}
                    >
                      {tempProjectImg ? (
                        <>
                          <img src={tempProjectImg} className="w-full h-full object-cover" alt="Upload Preview" />
                          <button 
                            onClick={removeProjectPhoto}
                            className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-2xl shadow-xl hover:bg-red-600 transition-colors z-20"
                          >
                            <Trash2 size={20} />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-slate-400">
                          <ImageIcon size={40} className="mb-2 opacity-20" />
                          <p className="text-xs font-black uppercase tracking-widest">Click to upload cover</p>
                        </div>
                      )}
                      <input type="file" ref={projectInputRef} className="hidden" onChange={(e) => handleFileChange(e, 'project')} accept="image/*" />
                    </div>
                    <input name="title" placeholder="Project Title" className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none font-bold text-slate-900 dark:text-white" required />
                    <input name="tech" placeholder="Stack (e.g. Next.js, AI)" className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none font-bold text-slate-900 dark:text-white" required />
                    <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-colors">Add to Portfolio</button>
                  </form>
                </div>
              )}

              {/* MENTOR CHAT */}
              {activeModal === 'chat' && (
                <div className="flex flex-col h-[650px]">
                  <div className="p-8 bg-indigo-600 text-white flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center font-black text-xl border border-white/20">{user.mentor.initials}</div>
                      <div><p className="text-xl font-bold">{user.mentor.name}</p><p className="text-xs font-black uppercase tracking-widest opacity-70">Active Now</p></div>
                    </div>
                    <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><X /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50 dark:bg-slate-950">
                    {chat.map(m => (
                      <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-5 rounded-[2rem] font-bold text-sm shadow-sm ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-tl-none border border-slate-100 dark:border-slate-700'}`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                  <form onSubmit={handleSendChat} className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-3">
                    <input value={msgInput} onChange={(e) => setMsgInput(e.target.value)} placeholder="Type a message..." className="flex-1 p-5 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none font-bold text-sm text-slate-900 dark:text-white" />
                    <button type="submit" className="p-5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors"><Send size={24} /></button>
                  </form>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfilePage;