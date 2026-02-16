import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, Star, Clock, MapPin, Play, Heart, MessageSquare, 
  Eye, Filter, ChevronDown, Check, Share2, Plus, Zap,
  X, ExternalLink, UserPlus, Calendar, ArrowRight
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_TALENTS = [
  { id: '1', title: 'Acoustic Soul Session', creator: 'miah_vocals', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800', views: 5200, likes: 890, comments: 45, rating: 4.9, category: 'Music', level: 'Expert', createdAt: '2026-02-10', bio: "A raw, emotional vocal performance exploring the roots of soul music.", skills: ["Vocals", "Guitar", "Songwriting"] },
  { id: '2', title: 'Cyberpunk Environment Design', creator: 'neo_art', type: 'image', thumbnail: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800', views: 2100, likes: 420, comments: 12, rating: 4.7, category: 'Art', level: 'Advanced', createdAt: '2026-02-14', bio: "3D environment render using Blender and Unreal Engine 5.", skills: ["3D Modeling", "Lighting", "Texturing"] },
  { id: '3', title: 'Python Automation Scripts', creator: 'dev_ken', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800', views: 12000, likes: 3200, comments: 156, rating: 5.0, category: 'Programming', level: 'Intermediate', createdAt: '2026-01-20', bio: "Automating boring tasks with Python. This script saves 10 hours a week.", skills: ["Python", "Automation", "Backend"] },
  { id: '4', title: 'High Jump Techniques', creator: 'athlete_jake', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1461891213886-4b0af0a6e776?auto=format&fit=crop&q=80&w=800', views: 800, likes: 120, comments: 5, rating: 4.2, category: 'Sports', level: 'Beginner', createdAt: '2026-02-15', bio: "Breaking down the mechanics of the Fosbury Flop for beginners.", skills: ["High Jump", "Athletics", "Coaching"] },
  { id: '5', title: 'Contemporary Flow', creator: 'dance_lisa', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800', views: 4300, likes: 610, comments: 28, rating: 4.8, category: 'Dance', level: 'Advanced', createdAt: '2026-02-12', bio: "A movement piece exploring fluid transitions and emotional expression.", skills: ["Contemporary", "Choreography", "Improv"] },
];

const categories = ["All", "Music", "Programming", "Art", "Dance", "Sports", "Education"];

const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Trending");
  const [selectedTalent, setSelectedTalent] = useState(null);

  // --- FILTER & SORT LOGIC ---
  const filteredTalents = useMemo(() => {
    let list = [...INITIAL_TALENTS];
    if (activeCategory !== "All") list = list.filter(t => t.category === activeCategory);
    return list.sort((a, b) => (sortBy === "Most Viewed" ? b.views - a.views : b.rating - a.rating));
  }, [activeCategory, sortBy]);

  return (
    <div className="mt-16 min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-sans">
      
      {/* HEADER SECTION */}
      <section className="pt-16 pb-10 px-6 max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-4"
        >
          Discover <span className="text-indigo-600">Talent.</span>
        </motion.h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Surface the best skills from our global community.</p>
      </section>

      {/* STICKY NAV */}
      <nav className="sticky top-0 z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* GRID */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredTalents.map((talent) => (
            <TalentCard 
              key={talent.id} 
              talent={talent} 
              onClick={() => setSelectedTalent(talent)} 
            />
          ))}
        </div>
      </main>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedTalent && (
          <TalentModal 
            talent={selectedTalent} 
            onClose={() => setSelectedTalent(null)} 
            onFilterCategory={(cat) => {
              setActiveCategory(cat);
              setSelectedTalent(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const TalentCard = ({ talent, onClick }) => (
  <motion.div
    layoutId={talent.id}
    onClick={onClick}
    className="break-inside-avoid group relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 cursor-pointer hover:shadow-2xl transition-all"
  >
    <div className="relative aspect-[4/5] overflow-hidden">
      <img src={talent.thumbnail} alt={talent.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-xl">
          <Play fill="currentColor" size={20} />
        </div>
      </div>
    </div>
    <div className="p-5">
      <h3 className="font-bold text-lg leading-tight mb-2">{talent.title}</h3>
      <div className="flex items-center justify-between text-slate-400 text-xs font-black">
        <span>@{talent.creator}</span>
        <span className="flex items-center gap-1 text-yellow-500"><Star size={14} fill="currentColor"/> {talent.rating}</span>
      </div>
    </div>
  </motion.div>
);

const TalentModal = ({ talent, onClose, onFilterCategory }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-6">
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
    />
    <motion.div 
      layoutId={talent.id}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
    >
      {/* Left: Media Area */}
      <div className="md:w-3/5 bg-black relative">
        <img src={talent.thumbnail} className="w-full h-full object-cover opacity-80" alt="" />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
            <Play fill="white" size={32} />
          </button>
        </div>
        <button onClick={onClose} className="md:hidden absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-md rounded-full text-white"><X/></button>
      </div>

      {/* Right: Info Area */}
      <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col">
        <button onClick={onClose} className="hidden md:block absolute top-8 right-8 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-indigo-600 hover:text-white transition-all"><X size={20}/></button>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">{talent.category}</span>
          <span className="flex items-center gap-1 text-xs font-bold text-slate-400"><Clock size={12}/> Added Feb 2026</span>
        </div>

        <h2 className="text-3xl font-black mb-4 leading-tight">{talent.title}</h2>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl font-black">
            {talent.creator.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-black">@{talent.creator}</p>
            <p className="text-xs text-slate-400 font-bold uppercase">Pro Mentor</p>
          </div>
          <button className="ml-auto p-2 text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl"><UserPlus size={20}/></button>
        </div>

        <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-medium">
          {talent.bio}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {talent.skills.map(skill => (
            <span key={skill} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-xs font-bold">#{skill}</span>
          ))}
        </div>

        {/* CTAs */}
        <div className="space-y-3 mt-auto">
          <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Calendar size={20}/> Request Mentorship
          </button>
          
          <button 
            onClick={() => onFilterCategory(talent.category)}
            className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
          >
            See more in {talent.category} <ArrowRight size={18}/>
          </button>
        </div>
      </div>
    </motion.div>
  </div>
);

export default ExplorePage;