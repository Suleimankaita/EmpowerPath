import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, MessageSquare, TrendingUp, CheckCircle, Star, Menu, X, 
  ArrowRight, PlayCircle, Search, Users, Award, Zap, Camera, 
  Music, Palette, Mic, Video, Globe, Moon, Sun, Heart, Instagram, Twitter, Youtube
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- HIGH QUALITY CURATED IMAGES ---
const talents = [
  { 
    id: 1, name: "Julianne Rossi", category: "Dance", 
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800", 
    type: "Contemporary Ballet", rating: 4.9 
  },
  { 
    id: 2, name: "Leo Haza", category: "Music", 
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800", 
    type: "Jazz Guitarist", rating: 4.8 
  },
  { 
    id: 3, name: "Sienna Williams", category: "Visual Arts", 
    image: "https://images.unsplash.com/photo-1547891319-184a778fc4f3?auto=format&fit=crop&q=80&w=800", 
    type: "Digital Illustrator", rating: 5.0 
  },
  { 
    id: 4, name: "Marcus Vibe", category: "Vocals", 
    image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=800", 
    type: "Soul/R&B", rating: 4.7 
  },
  { 
    id: 5, name: "Elena Kosh", category: "Photography", 
    image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=800", 
    type: "Street Photography", rating: 4.9 
  },
  { 
    id: 6, name: "The Alchemist", category: "Magic", 
    image: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?auto=format&fit=crop&q=80&w=800", 
    type: "Mentalism", rating: 4.6 
  }
];

const categories = [
  { name: "All", icon: <Globe size={16} /> },
  { name: "Dance", icon: <Video size={16} /> },
  { name: "Music", icon: <Music size={16} /> },
  { name: "Visual Arts", icon: <Palette size={16} /> },
  { name: "Vocals", icon: <Mic size={16} /> },
  { name: "Photography", icon: <Camera size={16} /> }
];

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle body class for dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const filteredTalents = talents.filter(t => 
    (activeTab === "All" || t.category === activeTab) &&
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30 ${isDarkMode ? 'dark' : ''}`}>
      

      {/* 2. DUAL-THEME HERO SECTION */}
      <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 px-4 sm:px-6 overflow-hidden">
        {/* Background blobs for depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-400 blur-[100px] md:blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-400 blur-[100px] md:blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mb-6">
              🚀 Join 15,000+ Rising Creators
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6 md:mb-8">
              UNLEASH <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-purple-300">
                YOUR POTENTIAL.
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              The premier platform for artists, musicians, and performers to get professional critique and connect with industry leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-6 md:px-8 py-4 md:py-5 bg-indigo-600 text-white rounded-2xl font-black text-base md:text-lg shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
                Upload My Work <ArrowRight size={20} />
              </button>
              <button className="px-6 md:px-8 py-4 md:py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-base md:text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                <PlayCircle size={20} className="text-indigo-600" /> Explore Talent
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden sm:block mt-10 lg:mt-0"
          >
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-3 md:space-y-4 pt-8 md:pt-12">
                <img src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=400" className="w-full h-40 md:h-64 object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl rotate-[-3deg]" alt="Dance" />
                <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=400" className="w-full h-32 md:h-48 object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl rotate-[2deg]" alt="Music" />
              </div>
              <div className="space-y-3 md:space-y-4">
                <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400" className="w-full h-32 md:h-48 object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl rotate-[3deg]" alt="Art" />
                <img src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=400" className="w-full h-40 md:h-64 object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl rotate-[-2deg]" alt="Photo" />
              </div>
            </div>
            
            {/* Floating Review Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 w-56 md:w-64">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-yellow-400 fill-current md:w-3.5 md:h-3.5" />)}
              </div>
              <p className="text-xs md:text-sm font-bold dark:text-white">"The feedback from my mentor changed my career!"</p>
              <p className="text-[9px] md:text-[10px] text-slate-400 uppercase font-black mt-2">— Sarah J., Vocalist</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (NEW) */}
      <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Your Path to Mastery</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Three simple steps to elevate your craft and connect with industry professionals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200 dark:from-indigo-900 dark:via-indigo-600 dark:to-indigo-900 z-0" />
            
            {[
              { icon: <Upload size={32} />, title: "1. Upload Your Best", desc: "Share your latest performance, artwork, or portfolio with our community." },
              { icon: <MessageSquare size={32} />, title: "2. Get Mentored", desc: "Receive detailed, timestamped feedback from verified industry pros." },
              { icon: <TrendingUp size={32} />, title: "3. Track Growth", desc: "Watch your stats soar as you apply feedback and level up your skills." }
            ].map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group hover:-translate-y-2 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-3">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SEARCH & CATEGORY FILTER */}
      <section id="discover" className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="w-full md:w-auto overflow-hidden">
              <h2 className="text-3xl md:text-4xl font-black mb-4">Discover Rising Stars</h2>
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveTab(cat.name)}
                    className={`flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black text-xs md:text-sm whitespace-nowrap transition-all border-2 ${
                      activeTab === cat.name 
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20" 
                      : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative w-full md:w-full md:max-w-sm">
              <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name..."
                className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-3.5 md:py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <AnimatePresence mode='popLayout'>
              {filteredTalents.map((talent) => (
                <motion.div
                  layout
                  key={talent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white dark:bg-slate-800 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
                >
                  <div className="relative h-64 md:h-80 overflow-hidden shrink-0">
                    <img src={talent.image} alt={talent.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6">
                       <span className="px-3 md:px-4 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                        {talent.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-black mb-1 group-hover:text-indigo-600 transition-colors">{talent.name}</h3>
                        <p className="text-slate-400 dark:text-slate-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">{talent.type}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded-lg shrink-0">
                        <Star size={12} className="text-yellow-500 md:w-3.5 md:h-3.5" fill="currentColor" />
                        <span className="text-xs font-black text-yellow-700 dark:text-yellow-500">{talent.rating}</span>
                      </div>
                    </div>
                    {/* Using a placeholder Link approach for now */}
                    <Link to={`/profile/${talent.id}`} className="block mt-auto">
                      <button className="w-full py-3.5 md:py-4 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl md:rounded-2xl font-black hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                        View Portfolio <ArrowRight size={18} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 5. FEATURES BENTO GRID */}
      <section id="features" className="py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-5xl font-black mb-12 md:mb-20 tracking-tighter uppercase">Why Empower<span className="text-indigo-600">Path</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            
            {/* Box 1 */}
            <div className="md:col-span-2 bg-slate-900 text-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 relative overflow-hidden group min-h-[300px] flex flex-col justify-center">
               <div className="relative z-10">
                 <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">World-Class <br />Mentorship</h3>
                 <p className="text-slate-400 max-w-sm mb-8 text-sm md:text-base">Get direct, frame-by-frame video reviews from artists who have actually made it in the industry.</p>
                 <button className="flex items-center gap-2 font-black text-indigo-400 hover:text-indigo-300 transition-colors text-sm md:text-base">
                   MEET THE MENTORS <ArrowRight size={18} />
                 </button>
               </div>
               <div className="absolute right-[-20px] md:right-[-40px] bottom-[-20px] md:bottom-[-40px] opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Award size={200} className="md:w-[300px] md:h-[300px]" />
               </div>
            </div>

            {/* Box 2 */}
            <div className="bg-indigo-600 text-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[250px]">
              <Users size={48} className="mb-4 md:mb-6 md:w-[60px] md:h-[60px]" />
              <h3 className="text-3xl md:text-4xl font-black mb-2">15,000+</h3>
              <p className="font-bold opacity-80 text-sm md:text-base">Active Creators</p>
            </div>

            {/* Box 3 */}
            <div className="bg-slate-100 dark:bg-slate-800 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between min-h-[250px]">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-sm mb-6 md:mb-0">
                <MessageSquare className="text-indigo-600 md:w-8 md:h-8" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black mb-2">Real-time Chat</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Network with other creators in your category and collaborate on projects.</p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="md:col-span-2 bg-indigo-50 dark:bg-indigo-500/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-12 border border-indigo-100 dark:border-indigo-500/10">
               <div className="w-20 h-20 md:w-32 md:h-32 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                  <TrendingUp className="text-white w-10 h-10 md:w-12 md:h-12" />
               </div>
               <div>
                 <h3 className="text-2xl md:text-3xl font-black mb-2 md:mb-3 text-indigo-950 dark:text-white">Growth Tracking</h3>
                 <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Visual progress reports that show how your skills have improved based on mentor scores over time.</p>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="py-12 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">Ready to join <br className="hidden sm:block" />the spotlight?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-indigo-600 rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:scale-105 transition-transform shadow-xl">
              Create Your Account
            </button>
            <p className="text-indigo-200 font-bold text-sm md:text-base mt-2 sm:mt-0">No credit card required</p>
          </div>
          
          <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-white/10 rounded-full -mr-20 -mt-20 md:-mr-32 md:-mt-32 blur-2xl md:blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 md:w-64 h-40 md:h-64 bg-black/10 rounded-full -ml-20 -mb-20 md:-ml-32 md:-mb-32 blur-2xl md:blur-3xl" />
        </div>
      </section>

      {/* 7. FOOTER (NEW) */}
      

    </div>
  );
};

export default LandingPage;