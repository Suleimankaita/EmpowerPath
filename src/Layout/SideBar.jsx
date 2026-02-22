import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Compass, Users, FolderKanban, Bell, User ,BarChart2
} from 'lucide-react';

const Sidebar = ({ isExpanded, setHover }) => {
  // const [isActive, setIsActive] = React.useState(false); // Removed unused state
  const navLinks = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Explore", path: "/ExploreTalents", icon: Compass },
    { name: "Mentors", path: "/MentorMatchingPage", icon: Users },
    { name: "Growth Analytics", path: "/GrowthAnalyticsPage", icon: BarChart2 },
    { name: "Projects", path: "/ProjectsPage", icon: FolderKanban },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Profile", path: "/UserProfilePage", icon: User },
  ];

  const [isActive ,setisActive ] = React.useState(false); // Unused state, consider removing if not needed
  return (
    <motion.aside
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={false}
      animate={{ width: isExpanded ? 260 : 85 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-[110] overflow-hidden"
    >
      {/* Profile / Header Area */}
      <div className="h-20 flex items-center px-6 shrink-0 mt-2">
        {/* Profile Image */}
        <img 
          src="https://ui-avatars.com/api/?name=Suleiman+Yusuf&background=4f46e5&color=fff" 
          alt="Suleiman Yusuf" 
          className="w-10 h-10 min-w-[40px] rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-700"
        />
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3 flex flex-col whitespace-nowrap"
            >
              <span className="font-bold text-base tracking-tight dark:text-white leading-none">
                Suleiman Yusuf
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Admin
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-2 px-3 mt-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                flex items-center h-12 rounded-xl font-bold text-sm transition-colors group
                ${isActive 
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600' 
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900'}
              `}
            >
              <div className="w-14 min-w-[56px] flex items-center justify-center">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="whitespace-nowrap"
                  >
                    {link.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;