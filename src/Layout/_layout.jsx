import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import Fotter from './fotter'; 
import { Outlet } from 'react-router-dom';

const _layout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar - Desktop Only */}
      <Sidebar isExpanded={isExpanded} setHover={setIsExpanded} />

      {/* The Main Wrapper 
          - On mobile: No margin
          - On desktop: Margin changes from 85px to 260px based on hover
      */}
      <motion.div 
        initial={false}
        animate={{ 
          marginLeft: isExpanded ? "260px" : "85px",
          width: isExpanded ? "calc(100% - 260px)" : "calc(100% - 85px)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 flex flex-col min-h-screen w-full transition-[margin] lg:ml-0" 
        /* The margin is controlled by Framer Motion on LG screens, set default ml-0 for mobile */
      >
        {/* We place Header inside the moving container so it shrinks too! */}
        <Header />
        
        <main className="flex-1 p-6 mt-20">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        <Fotter />
      </motion.div>

      {/* Responsive Fix: On mobile, remove the margin/width logic */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .flex-1 { margin-left: 0 !important; width: 100% !important; }
        }
      `}} />
    </div>
  );
};

export default _layout;