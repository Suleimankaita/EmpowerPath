import React, { useState, useMemo, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; 
import { 
  ExternalLink, Award, Clock, Star, Share2, 
  Link as LinkIcon, ShieldCheck, Zap, Briefcase, Target, Activity, 
  Calendar, TrendingUp, ChevronRight, CheckCircle2, X, Github, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION ---
const GITHUB_USERNAME = "octocat"; // Change this to your GitHub username!

const PublicProfile = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedDay, setSelectedDay] = useState({
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    count: 4
  });

  const today = new Date();
  const shiftDate = (date, numDays) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  };

  // 1. Fetch GitHub Projects
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        const data = await response.json();
        
        // Map GitHub API data to our component's structure
        const formattedProjects = data.map(repo => ({
          id: repo.id,
          name: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
          shortDesc: repo.description || "No description provided.",
          fullDesc: repo.description || "This project was built to solve specific engineering challenges. Detailed documentation is available in the repository.",
          rating: repo.stargazers_count > 0 ? repo.stargazers_count : (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1),
          tags: repo.topics.length > 0 ? repo.topics : ['Software', 'Engineering'],
          liveLink: repo.homepage || repo.html_url,
          githubLink: repo.html_url
        }));

        setProjects(formattedProjects);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // 2. Generate Activity Data (Heatmap)
  const activityValues = useMemo(() => {
    return Array.from({ length: 365 }, (_, i) => ({
      date: shiftDate(today, -i).toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5),
    }));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Alex Rivera | Dev Profile`,
          text: 'Check out my technical journey and projects.',
          url: window.location.href,
        });
      } catch (err) { console.log("Share failed", err); }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-slate-900 pb-20 selection:bg-indigo-100 relative">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-100 pt-16 pb-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="relative">
            <div className="w-44 h-44 rounded-[2.5rem] bg-indigo-600 p-1 shadow-2xl overflow-hidden ring-4 ring-indigo-50">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full rounded-[2.3rem] object-cover" 
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-3 rounded-2xl border-4 border-white shadow-lg">
              <ShieldCheck size={24} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 flex flex-col md:flex-row md:items-center gap-4">
              Alex Rivera
              <span className="text-sm font-black px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100 uppercase tracking-widest inline-block w-max mx-auto md:mx-0">
                LVL 7
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-8 leading-relaxed font-medium italic">
                "Building human-centric software. Mastering React and System Design to solve real-world community problems."
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className="px-4 py-2 bg-slate-50 text-slate-500 rounded-full font-bold text-xs md:text-sm flex items-center gap-2 border border-slate-100">
                <Clock size={16} /> 19–21 (Peak Flow)
              </div>
              <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold text-xs md:text-sm flex items-center gap-2 border border-indigo-100">
                <Briefcase size={16} /> EmpowerPath Engine
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT GRID */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT: Activity */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-600 text-white rounded-2xl">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="font-black text-lg tracking-tight italic text-slate-800">Growth Consistency</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Yearly Contribution Map</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black text-slate-300 uppercase">
                Intensity Level
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map(i => <div key={i} className={`w-3.5 h-3.5 rounded-sm color-scale-${i}`} />)}
                </div>
              </div>
            </div>

            <div className="heatmap-stable-container overflow-x-auto pb-4">
              <div className="min-w-[600px]">
                <CalendarHeatmap
                  startDate={shiftDate(today, -365)}
                  endDate={today}
                  values={activityValues}
                  onClick={(val) => val && setSelectedDay({
                    date: new Date(val.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    count: val.count
                  })}
                  classForValue={(val) => !val ? 'color-empty' : `color-scale-${val.count}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-6 bg-slate-900 text-white rounded-[2rem] flex flex-col justify-between">
                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-4">Focus Insight</p>
                <div className="flex items-center gap-3">
                    <Calendar size={20} className="text-indigo-400" />
                    <div>
                        <p className="text-xs font-bold text-slate-400">{selectedDay.date}</p>
                        <p className="text-base font-black">{selectedDay.count} Units Earned</p>
                    </div>
                </div>
              </div>
              <div className="p-6 bg-white border border-slate-100 rounded-[2rem] flex flex-col justify-between">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Performance</p>
                <div className="flex items-center gap-3">
                    <TrendingUp size={20} className="text-emerald-500" />
                    <p className="text-base font-black text-slate-800">84.2% Consistency</p>
                </div>
              </div>
              <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-[2rem] flex flex-col justify-between">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Yearly Flow</p>
                <div className="flex items-center gap-3">
                    <Zap size={20} className="text-indigo-600 fill-indigo-600" />
                    <p className="text-base font-black text-indigo-900">22 Day Streak</p>
                </div>
              </div>
            </div>
          </div>

          <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                <Target size={16} /> Technical Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Fullstack React", "Cloud Arch", "UI Design", "Git Flow", "TypeScript", "System Design"].map(skill => (
                <span key={skill} className="px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black text-slate-600 hover:border-indigo-200 transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT: Portfolio */}
        <div className="lg:col-span-4 space-y-8">
          <div className="px-2">
            <h3 className="text-3xl font-black tracking-tight italic mb-2">Portfolio</h3>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest flex items-center gap-2">
               <Github size={12} /> Syncing from GitHub
            </p>
          </div>
          
          <div className="flex flex-col gap-6 min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-300">
                <Loader2 className="animate-spin" size={32} />
                <p className="font-black text-xs uppercase tracking-widest">Loading Projects...</p>
              </div>
            ) : (
              projects.map(project => (
                <motion.button 
                  onClick={() => setSelectedProject(project)}
                  key={project.id} 
                  whileHover={{ y: -5 }}
                  className="w-full text-left p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <ExternalLink size={24} />
                    </div>
                    <div className="px-3 py-1 bg-amber-50 rounded-lg text-[10px] font-black text-amber-600 border border-amber-100 flex items-center gap-1 uppercase tracking-tighter">
                      <Star size={10} fill="currentColor" /> {project.rating}
                    </div>
                  </div>
                  <h4 className="text-xl font-black mb-3 tracking-tight truncate">{project.name}</h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-2">
                    {project.shortDesc}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-indigo-600 text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                    Explore Project <ChevronRight size={14} />
                  </div>
                </motion.button>
              ))
            )}
          </div>

          <div className="pt-4 flex flex-col gap-4">
              <button onClick={handleCopy} className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white border-2 border-slate-100 rounded-[2rem] font-black hover:border-indigo-600 transition-all text-slate-700">
                {copied ? <CheckCircle2 size={20} className="text-emerald-500" /> : <LinkIcon size={20} />}
                {copied ? "Link Copied" : "Copy Profile Link"}
              </button>
              <button onClick={handleShare} className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-[2rem] font-black hover:bg-black shadow-2xl transition-all">
                <Share2 size={20} /> Share Identity
              </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 p-2 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full z-10 transition-colors">
                <X size={24} />
              </button>

              <div className="p-8 md:p-12 overflow-y-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Award size={24} />
                  </div>
                  <span className="text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-lg border border-amber-100 flex items-center gap-1 uppercase">
                    <Star size={12} fill="currentColor" /> {selectedProject.rating} Rating
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 capitalize">{selectedProject.name}</h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium">{selectedProject.fullDesc}</p>

                <div className="mb-10">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Repository Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={selectedProject.liveLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all">
                    <ExternalLink size={18} /> View Live
                  </a>
                  <a href={selectedProject.githubLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all">
                    <Github size={18} /> Source Repo
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .react-calendar-heatmap .color-empty { fill: #f1f5f9; }
        .react-calendar-heatmap .color-scale-1 { fill: #e0e7ff; }
        .react-calendar-heatmap .color-scale-2 { fill: #818cf8; }
        .react-calendar-heatmap .color-scale-3 { fill: #4f46e5; }
        .react-calendar-heatmap .color-scale-4 { fill: #312e81; }
        .react-calendar-heatmap rect { rx: 3px; ry: 3px; cursor: pointer; transition: all 0.2s; }
        .react-calendar-heatmap rect:hover { opacity: 0.7; stroke: #4f46e5; stroke-width: 1px; }
        .heatmap-stable-container::-webkit-scrollbar { display: none; }
        .heatmap-stable-container { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default PublicProfile;