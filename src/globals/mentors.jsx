import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Star, MapPin, CheckCircle, 
  Clock, ArrowRight, SlidersHorizontal, ChevronDown,
  Code, Palette, Briefcase, Music, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const MentorDiscoveryPage = () => {
  // --- States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minRating, setMinRating] = useState(0);

  // --- Mock Data ---
  const categories = [
    { name: "All", icon: null },
    { name: "Development", icon: <Code size={16} /> },
    { name: "Design", icon: <Palette size={16} /> },
    { name: "Business", icon: <Briefcase size={16} /> },
    { name: "Music", icon: <Music size={16} /> },
  ];

  const mentors = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Senior UX Designer",
      company: "Google",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      category: "Design",
      rating: 4.9,
      reviews: 124,
      hourlyRate: 1220,
      skills: ["Figma", "User Research", "Prototyping"],
      verified: true,
      available: true
    },
    {
      id: 2,
      name: "David Chen",
      role: "Full Stack Developer",
      company: "Netflix",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      category: "Development",
      rating: 5.0,
      reviews: 89,
      hourlyRate: 1150,
      skills: ["React", "Node.js", "System Design"],
      verified: true,
      available: false
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Product Manager",
      company: "Spotify",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      category: "Business",
      rating: 4.7,
      reviews: 1256,
      hourlyRate: 95,
      skills: ["Strategy", "Agile", "Roadmapping"],
      verified: false,
      available: true
    },
    {
      id: 4,
      name: "Michael Ross",
      role: "Music Producer",
      company: "Sony Music",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      category: "Music",
      rating: 4.8,
      reviews: 210,
      hourlyRate: 2280,
      skills: ["Mixing", "Logic Pro", "Composition"],
      verified: true,
      available: true
    },
    {
      id: 5,
      name: "Jessica Kim",
      role: "Frontend Architect",
      company: "Vercel",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      category: "Development",
      rating: 4.9,
      reviews: 140,
      hourlyRate: 2235,
      skills: ["Next.js", "TypeScript", "Tailwind"],
      verified: true,
      available: true
    },
    {
      id: 6,
      name: "Robert Fox",
      role: "Marketing Director",
      company: "Airbnb",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
      category: "Business",
      rating: 4.6,
      reviews: 45,
      hourlyRate: 3110,
      skills: ["SEO", "Brand Strategy", "Growth"],
      verified: false,
      available: true
    },
  ];

  // --- Filtering Logic ---
  const filteredMentors = useMemo(() => {
    return mentors.filter(mentor => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            mentor.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || mentor.category === selectedCategory;
      const matchesRating = mentor.rating >= minRating;
      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [searchQuery, selectedCategory, minRating]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      
      {/* 1. Header & Search Section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            
            {/* Title */}
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Find a Mentor</h1>
              <p className="text-slate-500 text-sm mt-1">Master your craft with industry experts.</p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 sm:text-sm"
                placeholder="Search by name, role, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Mobile Filter Toggle (Visible only on small screens) */}
            <button className="md:hidden w-full flex items-center justify-center gap-2 bg-slate-100 p-3 rounded-xl font-bold text-slate-700">
              <SlidersHorizontal size={18} /> Filters
            </button>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-3 mt-6 pb-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.name
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
            
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
            
            <div className="flex items-center gap-2">
               <select 
                 className="appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-4 pr-10 rounded-full text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-slate-50"
                 onChange={(e) => setMinRating(Number(e.target.value))}
               >
                 <option value="0">Any Rating</option>
                 <option value="4.5">⭐ 4.5+</option>
                 <option value="4.8">⭐ 4.8+</option>
                 <option value="5">⭐ 5.0 Only</option>
               </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Results Count */}
        <p className="text-slate-500 font-bold text-sm mb-6">
          Showing <span className="text-slate-900">{filteredMentors.length}</span> mentors available
        </p>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredMentors.map((mentor) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                key={mentor.id}
                className="group bg-white rounded-[32px] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col"
              >
                
                {/* Card Header & Image */}
                <div className="p-6 pb-0 flex gap-4 items-start">
                  <div className="relative">
                    <img 
                      src={mentor.image} 
                      alt={mentor.name} 
                      className="w-16 h-16 rounded-[20px] object-cover ring-4 ring-slate-50 group-hover:ring-white transition-all shadow-sm"
                    />
                    {mentor.available && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-slate-900 truncate">{mentor.name}</h3>
                      {mentor.verified && <CheckCircle className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" stroke="white" />}
                    </div>
                    <p className="text-xs font-bold text-slate-500 truncate">{mentor.role}</p>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-1">{mentor.company}</p>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="px-6 mt-4">
                  <div className="inline-flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-lg border border-yellow-100">
                    <Star size={12} className="text-yellow-500" fill="currentColor" />
                    <span className="text-xs font-bold text-yellow-700">{mentor.rating}</span>
                    <span className="text-[10px] font-medium text-yellow-600/80">({mentor.reviews})</span>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="px-6 mt-4 flex flex-wrap gap-2">
                  {mentor.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Card Footer: Price & Action */}
                <div className="mt-auto p-6 pt-6">
                  <div className="flex items-center justify-between border-t border-slate-50 pt-4 gap-4">
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Rate</p>
                      <p className="text-lg font-black text-slate-900">&#8358;{Number(mentor.hourlyRate).toLocaleString()}<span className="text-xs font-medium text-slate-400">/hr</span></p>
                    </div>
                    <Link to={`${mentor.id}`}>
                    <button className="flex-1 bg-slate-900 text-white px-4 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200 transition-all flex items-center justify-center gap-2 group/btn">
                      Book <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No mentors found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {setSearchQuery(""); setSelectedCategory("All"); setMinRating(0);}}
              className="mt-6 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorDiscoveryPage;