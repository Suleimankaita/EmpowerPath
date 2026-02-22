import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Calendar, Zap, Target, Award, 
  BarChart3, Brain, ArrowUpRight, Download, 
  Star, MessageSquare, ChevronDown, CheckCircle 
} from 'lucide-react';

// --- UTILS: DATA FILTERING LOGIC ---
const generateMockDataByDate = (days) => {
  // Simulates fetching different data volumes based on date range
  return {
    activityCount: Math.floor(days * 2.4),
    levelIncrease: Math.floor(days / 30),
    avgScore: 70 + Math.floor(Math.random() * 20),
    roadmapProgress: 40 + Math.floor((days / 365) * 40)
  };
};

const GrowthAnalyticsPage = () => {
  const [rangeLabel, setRangeLabel] = useState('Last 90 Days');
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // --- DYNAMIC STATE BASED ON DATE ---
  const daysMap = { 'Last 30 Days': 30, 'Last 90 Days': 90, 'Last 1 Year': 365 };
  const currentData = useMemo(() => generateMockDataByDate(daysMap[rangeLabel]), [rangeLabel]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-10 font-sans selection:bg-indigo-100">
      
      {/* EXPORT OVERLAY */}
      <AnimatePresence>
        {isExporting && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] text-center shadow-2xl border border-white/10">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Download className="text-indigo-600" />
                </motion.div>
              </div>
              <h2 className="text-xl font-black dark:text-white">Generating Report...</h2>
              <p className="text-sm text-slate-400 font-bold mt-1">Compiling your growth metrics for {rangeLabel}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. SMART HEADER & DATE PICKER */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Growth Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold mt-1">Filtering data for <span className="text-indigo-600">Alex Chen</span></p>
        </div>

        <div className="flex items-center gap-3">
          {/* Custom Date Range Picker Component */}
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 font-black text-xs uppercase tracking-widest hover:border-indigo-500 transition-all"
            >
              <Calendar size={16} className="text-indigo-600" />
              {rangeLabel}
              <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-2 z-[100]"
                >
                  {Object.keys(daysMap).map((label) => (
                    <button
                      key={label}
                      onClick={() => { setRangeLabel(label); setIsOpen(false); }}
                      className={`w-full text-left px-5 py-4 rounded-2xl text-xs font-black transition-colors ${rangeLabel === label ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={handleExport} className="p-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl hover:scale-105 transition-transform active:scale-95">
            <Download size={20}/>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* 2. DYNAMIC STAT CARDS */}
        {[
          { label: "Growth Lift", val: `+${currentData.levelIncrease}`, trend: "Lvl Evolution", icon: Award, color: "text-amber-500" },
          { label: "Avg. Velocity", val: `${currentData.roadmapProgress}%`, trend: "Phase Speed", icon: Target, color: "text-indigo-500" },
          { label: "Active Days", val: currentData.activityCount, trend: "Commit Streak", icon: Zap, color: "text-emerald-500" },
          { label: "Feedback Avg", val: currentData.avgScore, trend: "Skill Quality", icon: Star, color: "text-violet-500" },
        ].map((s, i) => (
          <motion.div 
            key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className={`p-3 w-fit rounded-2xl bg-slate-50 dark:bg-slate-800/50 mb-6 ${s.color}`}><s.icon size={24}/></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mt-1">{s.val}</h2>
            <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 w-fit rounded-lg">
              <TrendingUp size={12} className="text-emerald-500"/>
              <span className="text-[10px] font-black text-emerald-600 uppercase">{s.trend}</span>
            </div>
          </motion.div>
        ))}

        {/* 3. ROADMAP VELOCITY (Connected to Date Range) */}
        <section className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-start mb-10">
            <h3 className="text-xl font-black flex items-center gap-3"><BarChart3 className="text-indigo-500" /> Velocity Track</h3>
            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full uppercase tracking-tighter">Live Sync</span>
          </div>
          <div className="space-y-8">
            {['Discovery', 'Foundation', 'Build', 'Launch'].map((stage, i) => {
              const progress = i < 2 ? 100 : i === 2 ? currentData.roadmapProgress : 0;
              return (
                <div key={stage}>
                  <div className="flex justify-between text-[11px] font-black uppercase mb-3">
                    <span className={progress === 100 ? 'text-emerald-500' : 'text-slate-400'}>{stage}</span>
                    <span className="text-slate-900 dark:text-white">{progress}%</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className={`h-full rounded-2xl ${progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.4)]'}`} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. SKILL GROWTH RADAR */}
        <section className="lg:col-span-2 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute -top-10 -right-10 opacity-5 rotate-12"><Brain size={300}/></div>
          <h3 className="text-xl font-black mb-10 relative z-10">Skill Intelligence</h3>
          <div className="space-y-6 relative z-10">
            {[
              { n: "Technical Depth", s: currentData.avgScore + 5 },
              { n: "Problem Solving", s: currentData.avgScore - 10 },
              { n: "Communication", s: 95 },
              { n: "Consistency", s: 88 }
            ].map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2">
                  <span>{skill.n}</span>
                  <span className="text-indigo-400">{skill.s}%</span>
                </div>
                <div className="flex gap-1.5">
                  {Array.from({ length: 20 }).map((_, dot) => (
                    <motion.div 
                      key={dot}
                      initial={{ opacity: 0.1 }}
                      animate={{ opacity: dot < (skill.s / 5) ? 1 : 0.1 }}
                      className={`h-6 flex-1 rounded-sm ${dot < (skill.s / 5) ? 'bg-indigo-500' : 'bg-white/10'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. GROWTH MAP (Heatmap - Width based on range) */}
        <section className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-200 dark:border-slate-800">
           <div className="flex justify-between items-center mb-10">
             <div>
               <h3 className="text-2xl font-black tracking-tight">Consistency Heatmap</h3>
               <p className="text-sm font-bold text-slate-400 mt-1">Visualizing your "{rangeLabel}" effort.</p>
             </div>
             <div className="flex items-center gap-2">
               <span className="text-[10px] font-black text-slate-400">LESS</span>
               <div className="flex gap-1">
                 {[0,1,2,3].map(lvl => <div key={lvl} className={`w-3 h-3 rounded-sm ${['bg-slate-100 dark:bg-slate-800','bg-indigo-200','bg-indigo-400','bg-indigo-600'][lvl]}`} />)}
               </div>
               <span className="text-[10px] font-black text-slate-400">MORE</span>
             </div>
           </div>
           
           <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
              {Array.from({length: Math.ceil(daysMap[rangeLabel]/7)}).map((_, week) => (
                <div key={week} className="flex flex-col gap-2 flex-shrink-0">
                  {Array.from({length: 7}).map((_, day) => {
                    const level = Math.floor(Math.random() * 4);
                    return (
                      <motion.div 
                        key={day}
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ delay: (week * 0.02) }}
                        className={`w-5 h-5 rounded-md ${['bg-slate-50 dark:bg-slate-800/50','bg-indigo-200','bg-indigo-400','bg-indigo-600'][level]} hover:ring-2 ring-indigo-500 cursor-pointer`} 
                      />
                    );
                  })}
                </div>
              ))}
           </div>
        </section>

        {/* 8. AI INSIGHTS PANEL (Dynamic) */}
        <aside className="lg:col-span-4">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-500/40">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-white/20 backdrop-blur-xl rounded-[2rem] border border-white/20">
                <Brain size={40} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black">AI Growth Insight</h3>
                <p className="text-white/80 font-medium">Based on your {rangeLabel} activity, you're <span className="text-emerald-300 font-black">12% more efficient</span> than last month.</p>
              </div>
            </div>
            <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-colors">
              Optimize Roadmap
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default GrowthAnalyticsPage;