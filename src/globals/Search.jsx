import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, SlidersHorizontal, User, GraduationCap, 
  Video, MapPin, Star, Play, MessageSquare, CheckCircle2, 
  X, ChevronDown, Flame, Clock, Heart, Eye, Sparkles,
  SearchCode, Music2, Palette, Dumbbell, Theater, Zap
} from 'lucide-react';

// --- RICH MOCK DATA ---
const MOCK_DATA = [
  { id: 1, type: 'talent', name: 'Ambient Soundscape Live', user: 'lofi_producer', category: 'Music', skill: 'Audio Design', experience: 'Advanced', rating: 4.9, views: '24k', likes: 1200, image: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=800', location: 'Tokyo' },
  { id: 2, type: 'mentor', name: 'Dr. Aris Thorne', title: 'Creative Director', skills: ['Branding', 'UI/UX'], experience: 'Expert', rating: 5.0, reviews: 210, sessions: 840, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', location: 'New York' },
  { id: 3, type: 'user', name: 'Sofia Rodriguez', username: 'sofia_creates', bio: 'Multidisciplinary designer exploring the intersection of AI and Art.', talents: 12, followers: '3.4k', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', location: 'Madrid' },
  { id: 4, type: 'talent', name: 'Urban Flow Choreography', user: 'j_dance', category: 'Dance', skill: 'Hip Hop', experience: 'Intermediate', rating: 4.8, views: '8k', likes: 540, image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&q=80&w=800', location: 'Paris' },
  { id: 5, type: 'mentor', name: 'Elena Kostic', title: 'Performance Coach', skills: ['Public Speaking', 'Acting'], experience: 'Expert', rating: 4.7, reviews: 65, sessions: 150, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400', location: 'Berlin' },
  { id: 6, type: 'user', name: 'Kevin Park', username: 'k_park_dev', bio: 'Full-stack developer building open-source creative tools.', talents: 4, followers: '890', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', location: 'Seoul' },
];

const categories = [
  { name: 'All', icon: <Sparkles size={16} /> },
  { name: 'Music', icon: <Music2 size={16} /> },
  { name: 'Programming', icon: <SearchCode size={16} /> },
  { name: 'Art', icon: <Palette size={16} /> },
  { name: 'Acting', icon: <Theater size={16} /> },
  { name: 'Sports', icon: <Dumbbell size={16} /> },
];

const SearchDiscovery = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ category: 'All', exp: 'All' });

  // 1. Live Search Debouncer Effect
  useEffect(() => {
    if (query.length > 0 || activeTab !== 'all') {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 600); // Simulate API delay
      return () => clearTimeout(timer);
    }
  }, [query, activeTab, filters]);

  // 2. Filter Logic
  const results = useMemo(() => {
    return MOCK_DATA.filter(item => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || 
                           (item.username && item.username.toLowerCase().includes(query.toLowerCase()));
      const matchesTab = activeTab === 'all' || item.type === activeTab;
      const matchesCat = filters.category === 'All' || item.category === filters.category;
      const matchesExp = filters.exp === 'All' || item.experience === filters.exp;
      return matchesQuery && matchesTab && matchesCat && matchesExp;
    });
  }, [query, activeTab, filters]);

  return (
    <div className="mt-16 min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30">
      
      {/* --- ENHANCED SEARCH HEADER --- */}
      <div className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
          <div className="flex flex-col gap-6">
            {/* Search Input Row */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={22} />
                <input 
                  type="text"
                  placeholder="Search talents, mentors, @users..."
                  className="w-full pl-14 pr-6 py-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border-2 border-transparent focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-lg font-medium shadow-inner"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button onClick={() => setQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <X size={18} />
                  </button>
                )}
              </div>
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-500/30"
              >
                <SlidersHorizontal size={24} />
              </button>
            </div>

            {/* Sub-navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {[
                { id: 'all', label: 'Explore All', icon: <Zap size={16}/> },
                { id: 'talent', label: 'Talents', icon: <Video size={16}/> },
                { id: 'mentor', label: 'Mentors', icon: <GraduationCap size={16}/> },
                { id: 'user', label: 'Users', icon: <User size={16}/> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-10">
        
        {/* --- DESKTOP SIDEBAR FILTERS --- */}
        <aside className="hidden lg:block w-72 shrink-0 space-y-10">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
              <Filter size={14} /> Categories
            </h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button 
                  key={cat.name}
                  onClick={() => setFilters({...filters, category: cat.name})}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${filters.category === cat.name ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
                >
                  <span className="flex items-center gap-3">{cat.icon} {cat.name}</span>
                  {filters.category === cat.name && <CheckCircle2 size={16} />}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Expertise</h3>
            <div className="space-y-3">
              {['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
                <label key={level} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" name="exp" 
                      className="peer appearance-none w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-700 checked:border-indigo-600 checked:bg-indigo-600 transition-all" 
                      checked={filters.exp === level}
                      onChange={() => setFilters({...filters, exp: level})}
                    />
                    <CheckCircle2 size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400 peer-checked:text-indigo-600 transition-colors">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* --- MAIN RESULTS AREA --- */}
        <main className="flex-1">
          {/* Status Bar */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight">
                {isLoading ? 'Searching...' : `Found ${results.length} results`}
              </h2>
              <div className="flex gap-2 mt-2">
                {filters.category !== 'All' && (
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
                    {filters.category} <X size={12} className="cursor-pointer" onClick={() => setFilters({...filters, category: 'All'})} />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Grid Layout with Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {isLoading ? (
                // Skeleton Loading State
                [...Array(6)].map((_, i) => (
                  <div key={i} className="bg-slate-100 dark:bg-slate-900 animate-pulse rounded-[2.5rem] h-[400px]" />
                ))
              ) : results.length > 0 ? (
                results.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
                  >
                    {/* Render specific card based on type */}
                    {item.type === 'talent' && <TalentCard data={item} />}
                    {item.type === 'mentor' && <MentorCard data={item} />}
                    {item.type === 'user' && <UserCard data={item} />}
                  </motion.div>
                ))
              ) : (
                <EmptyState onReset={() => {setQuery(''); setFilters({category: 'All', exp: 'All'})}} />
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* --- MOBILE FILTER DRAWER --- */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 rounded-t-[3rem] z-[70] p-8 lg:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-8" />
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl"><X size={24}/></button>
              </div>

              <div className="space-y-10 mb-10">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">By Category</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map(cat => (
                      <button 
                        key={cat.name}
                        onClick={() => setFilters({...filters, category: cat.name})}
                        className={`px-4 py-4 rounded-2xl font-bold text-sm transition-all border-2 flex items-center gap-2 ${filters.category === cat.name ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' : 'border-transparent bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                      >
                        {cat.icon} {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Experience</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(level => (
                      <button 
                        key={level}
                        onClick={() => setFilters({...filters, exp: level})}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${filters.exp === level ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black text-xl shadow-xl shadow-indigo-500/30 active:scale-95 transition-transform"
              >
                Apply Filters
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUB-COMPONENTS FOR CLEANER CODE ---

const TalentCard = ({ data }) => (
  <>
    <div className="relative aspect-[4/5] overflow-hidden">
      <img src={data.image} alt={data.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <div className="flex items-center gap-2 mb-2">
           <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-wider">{data.category}</span>
           <span className="px-3 py-1 bg-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-wider">{data.skill}</span>
        </div>
        <h4 className="text-xl font-black leading-tight">{data.name}</h4>
      </div>
      <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300">
        <Play fill="white" size={20} />
      </div>
    </div>
    <div className="p-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase">
          {data.user.charAt(0)}
        </div>
        <p className="text-sm font-bold text-slate-500">@{data.user}</p>
      </div>
      <div className="flex items-center gap-4 text-slate-400">
        <span className="flex items-center gap-1.5 text-xs font-bold"><Eye size={14}/> {data.views}</span>
        <span className="flex items-center gap-1.5 text-xs font-bold text-rose-500"><Heart size={14} fill="currentColor"/> {data.likes}</span>
      </div>
    </div>
  </>
);

const MentorCard = ({ data }) => (
  <div className="p-8 h-full flex flex-col">
    <div className="flex justify-between items-start mb-6">
      <div className="relative">
        <img src={data.image} className="w-20 h-20 rounded-3xl object-cover shadow-2xl" alt="" />
        <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-xl border-4 border-white dark:border-slate-900">
          <GraduationCap size={16} />
        </div>
      </div>
      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-500/10 px-3 py-1.5 rounded-xl">
        <Star size={14} className="text-yellow-500" fill="currentColor" />
        <span className="text-sm font-black text-yellow-700 dark:text-yellow-500">{data.rating}</span>
      </div>
    </div>
    
    <div className="mb-6">
      <h4 className="text-2xl font-black mb-1 flex items-center gap-2">{data.name} <CheckCircle2 size={18} className="text-indigo-500"/></h4>
      <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider">{data.title}</p>
    </div>

    <div className="flex flex-wrap gap-2 mb-8">
      {data.skills.map(s => <span key={s} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg text-xs font-bold">#{s}</span>)}
    </div>

    <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
      <div><p className="text-[10px] text-slate-400 font-black uppercase mb-1">Students</p><p className="font-black">{data.sessions}+</p></div>
      <div><p className="text-[10px] text-slate-400 font-black uppercase mb-1">Level</p><p className="font-black">{data.experience}</p></div>
    </div>

    <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-indigo-500/20 mt-auto">
      Book Mentorship
    </button>
  </div>
);

const UserCard = ({ data }) => (
  <div className="p-8 text-center h-full flex flex-col items-center">
    <div className="relative mb-6">
      <img src={data.image} className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-2xl" alt="" />
      <div className="absolute bottom-0 right-0 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900" />
    </div>
    <h4 className="text-2xl font-black mb-1">{data.name}</h4>
    <p className="text-slate-400 font-bold text-sm mb-4">@{data.username}</p>
    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">{data.bio}</p>
    
    <div className="flex gap-8 mb-8 border-y border-slate-100 dark:border-slate-800 w-full py-6">
      <div className="flex-1"><p className="font-black text-lg">{data.talents}</p><p className="text-[10px] text-slate-400 font-black uppercase">Talents</p></div>
      <div className="flex-1 border-x border-slate-100 dark:border-slate-800"><p className="font-black text-lg">{data.followers}</p><p className="text-[10px] text-slate-400 font-black uppercase">Followers</p></div>
    </div>

    <button className="w-full py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-black hover:bg-indigo-600 hover:text-white transition-all mt-auto">
      View Profile
    </button>
  </div>
);

const EmptyState = ({ onReset }) => (
  <div className="col-span-full py-20 text-center">
    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
      <Search className="text-slate-400" size={40} />
    </div>
    <h3 className="text-2xl font-black mb-2">No results found</h3>
    <p className="text-slate-500 mb-8 max-w-xs mx-auto">Try adjusting your filters or searching for something else.</p>
    <button onClick={onReset} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black">Clear all filters</button>
  </div>
);

export default SearchDiscovery;