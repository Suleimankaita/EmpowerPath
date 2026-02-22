import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Zap, Menu, X, Search, ArrowRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false); 
  const location = useLocation();

  // 🔄 Full list for Mobile view
  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Explore", path: "/ExploreTalents" },
    { name: "Mentors", path: "/MentorMatchingPage" },
    { name: "Projects", path: "/ProjectsPage" },
    { name: "Notifications", path: "/notifications" },
    { name: "Profile", path: "/UserProfilePage" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed w-full z-[100] top-0 left-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          
          {/* 1️⃣ LOGO */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="flex items-center gap-2 md:gap-2.5 z-[101] relative"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
              <Zap size={18} className="md:w-6 md:h-6 fill-current" />
            </div>
            <span className="font-black text-lg md:text-2xl tracking-tighter text-slate-900 dark:text-white">
              Empower<span className="text-indigo-600">Path</span>
            </span>
          </motion.div>

          {/* 2️⃣ DESKTOP NAVIGATION - Filtered to only "Explore" and "Search" */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks
              .filter(item => item.name === "Explore") // Only show Explore on desktop
              .map((item) => (
              <NavLink 
                key={item.name} 
                to={item.path} 
                className={({ isActive }) => `
                    text-[11px] font-bold uppercase tracking-widest transition-colors duration-200
                  ${isActive ? 'text-indigo-600' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600'}
                `}
              >
                {item.name}
              </NavLink>
            ))}
            
            {/* The second "Live" item: Search */}
            <NavLink 
              to="/search" 
              className={({ isActive }) => `
                flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all ml-2
                ${isActive 
                  ? 'border-indigo-600 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-indigo-400'}
              `}
            >
              <Search size={14} strokeWidth={2.5} />
              <span className="text-[11px] font-bold uppercase tracking-widest">Search</span>
            </NavLink>
          </div>

          {/* 3️⃣ ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-4 z-[101]">
            <div 
              onClick={toggleTheme}
              className="hidden xs:flex items-center cursor-pointer group p-2"
            >
              <div className="relative w-11 h-6 md:w-14 md:h-7 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center px-1 transition-colors border border-transparent">
                <motion.div 
                  layout
                  animate={{ x: isDark ? (window.innerWidth < 768 ? 20 : 28) : 0 }}
                  className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-sm z-10" 
                />
              </div>
            </div>

            <button className="hidden sm:block bg-slate-900 dark:bg-white text-white dark:text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black text-[10px] md:text-sm hover:scale-105 transition-transform shadow-xl">
              GET STARTED
            </button>

            <button 
              onClick={toggleMenu} 
              className="lg:hidden p-1.5 md:p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} className="md:w-7 md:h-7" /> : <Menu size={24} className="md:w-7 md:h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* 4️⃣ MOBILE MENU OVERLAY - Displays EVERYTHING */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-white dark:bg-slate-950 pt-24 px-6 lg:hidden flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col gap-5 mt-4">
              <NavLink 
                to="/search" 
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <Search size={18} className="text-indigo-600" />
                  <span className="font-bold text-sm text-slate-600 dark:text-slate-300 tracking-tight">Search platform...</span>
                </div>
                <ArrowRight size={16} className="text-slate-400" />
              </NavLink>

              <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-2" />

              {/* Mobile Nav Links - Shows all 6 items */}
              <div className="flex flex-col gap-2">
                {navLinks.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) => `
                      text-2xl font-black tracking-tight py-3 flex items-center justify-between group
                      ${isActive ? 'text-indigo-600' : 'text-slate-800 dark:text-slate-200'}
                    `}
                  >
                    {item.name}
                    <ArrowRight size={20} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto mb-10 space-y-6 pt-6">
                 <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-500/25">
                    Get Started Now
                 </button>
                 
                 <div className="flex items-center justify-center gap-6 pt-4">
                    <button onClick={toggleTheme} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                       {isDark ? <Sun size={14}/> : <Moon size={14}/>}
                       {isDark ? "Light" : "Dark"}
                    </button>
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Support</span>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;