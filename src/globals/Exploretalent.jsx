import React, { useState, useEffect } from 'react';
import { Search, ChevronRight, X, Star, TrendingUp, Users, Target, ArrowRight, Zap } from 'lucide-react';

const TALENTS_DATA = [
  {
    id: 1,
    category: 'Technology',
    name: 'Software Development',
    description: 'Build digital products, apps, and complex systems from scratch.',
    level: 'Beginner → Advanced',
    age: '14+',
    coreSkills: ['Logic', 'Problem Solving', 'Persistence'],
    roleModels: ['Mark Zuckerberg', 'Ada Lovelace'],
    incomeIdeas: ['Junior Dev ($70k+)', 'SaaS Founder', 'Freelance Architect'],
    roadmap: ['Logic & Syntax', 'Fullstack Integration', 'System Design']
  },
  {
    id: 2,
    category: 'Creative',
    name: 'Graphic Design',
    description: 'Master visual communication through typography, color, and layout.',
    level: 'Beginner → Pro',
    age: '12+',
    coreSkills: ['Visual Eye', 'Software Mastery', 'Empathy'],
    roleModels: ['Paula Scher', 'Saul Bass'],
    incomeIdeas: ['Brand Designer', 'Art Director', 'Asset Seller'],
    roadmap: ['Design Principles', 'Tool Proficiency', 'Brand Identity']
  },
  {
    id: 3,
    category: 'Communication',
    name: 'Public Speaking',
    description: 'Influence audiences and move people with the power of voice.',
    level: 'Intermediate',
    age: '10+',
    coreSkills: ['Storytelling', 'Body Language', 'Confidence'],
    roleModels: ['Simon Sinek', 'Michelle Obama'],
    incomeIdeas: ['Keynote Speaker', 'Corporate Trainer', 'Podcast Host'],
    roadmap: ['Voice Control', 'Narrative Arch', 'Stage Presence']
  },
  {
    id: 4,
    category: 'Leadership',
    name: 'Team Management',
    description: 'Coordinate people and resources to achieve high-level goals.',
    level: 'Advanced',
    age: '16+',
    coreSkills: ['Emotional Intelligence', 'Strategy', 'Delegation'],
    roleModels: ['Sheryl Sandberg', 'Phil Jackson'],
    incomeIdeas: ['Operations Manager', 'Project Lead', 'CEO'],
    roadmap: ['Active Listening', 'Conflict Resolution', 'Strategic Scaling']
  }
];

const ExploreTalents = () => {
  const [filter, setFilter] = useState('All');
  const [selectedTalent, setSelectedTalent] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedTalent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedTalent]);

  const categories = ['All', 'Creative', 'Technology', 'Leadership', 'Entrepreneurship', 'Communication'];
  const filteredTalents = filter === 'All' 
    ? TALENTS_DATA 
    : TALENTS_DATA.filter(t => t.category === filter);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100">
      
      {/* 1. PAGE HEADER */}
      <header className="relative pt-24 pb-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-6 animate-bounce">
          <Zap size={16} /> EmpowerPath Discovery
        </div>
        <h1 className="text-6xl font-black tracking-tight mb-6 text-slate-900 leading-[1.1]">
          Explore Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Natural Talents</span>
        </h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Don't leave your future to chance. Discover structured paths for real-world growth and sustainable income.
        </p>
        
        <div className="relative max-w-xl mx-auto group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="What are you naturally good at?" 
            className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-slate-100 bg-white shadow-xl shadow-slate-200/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-lg"
          />
        </div>
      </header>

      {/* 2. TALENT FILTER BAR */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-5">
        <div className="flex justify-center gap-3 overflow-x-auto px-6 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all duration-300 ${
                filter === cat 
                ? 'bg-slate-900 text-white shadow-lg scale-105' 
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* 3. TALENT GRID */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTalents.map((talent) => (
            <div 
              key={talent.id}
              className="group bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                  {talent.category}
                </div>
                <div className="flex gap-1">
                    {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-200" />)}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-indigo-600 transition-colors">
                {talent.name}
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed line-clamp-2">
                {talent.description}
              </p>
              
              <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <TrendingUp size={16} />
                  </div>
                  {talent.level}
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                    <Users size={16} />
                  </div>
                  Ages {talent.age}
                </div>
              </div>

              <button 
                onClick={() => setSelectedTalent(talent)}
                className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Roadmap Preview <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* 5. THE CENTERED MODAL */}
      {selectedTalent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setSelectedTalent(null)} 
          />
          
          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-300">
            
            {/* Header Sticky */}
            <div className="p-8 pb-4 flex justify-between items-start bg-white z-10">
              <div>
                <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">{selectedTalent.category}</span>
                <h2 className="text-4xl font-black mt-1">{selectedTalent.name}</h2>
              </div>
              <button 
                onClick={() => setSelectedTalent(null)}
                className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="px-8 pb-10 overflow-y-auto custom-scrollbar">
              <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                {selectedTalent.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h4 className="flex items-center gap-2 font-bold mb-4 text-slate-900">
                    <Target size={20} className="text-indigo-600" /> Core Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTalent.coreSkills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <h4 className="flex items-center gap-2 font-bold mb-4 text-slate-900">
                    <Users size={20} className="text-indigo-600" /> Role Models
                  </h4>
                  <p className="text-slate-600 font-medium italic">{selectedTalent.roleModels.join(' • ')}</p>
                </div>
              </div>

              {/* Roadmap Visual */}
              <div className="mb-10">
                <h4 className="font-black text-xl mb-6 flex items-center gap-2">
                    <TrendingUp size={22} className="text-indigo-600" /> Roadmap Preview
                </h4>
                <div className="relative space-y-4">
                  {selectedTalent.roadmap.map((step, i) => (
                    <div key={step} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                        {i + 1}
                      </div>
                      <span className="font-bold text-slate-800">{step}</span>
                    </div>
                  ))}
                  {/* Vertical Line Connector */}
                  <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-slate-100 -z-10" />
                </div>
              </div>

              {/* Income Section */}
              <div className="bg-indigo-600 p-8 rounded-[2rem] text-white">
                <h4 className="font-bold mb-4 text-indigo-100 uppercase tracking-widest text-xs">Monetization Paths</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedTalent.incomeIdeas.map(idea => (
                        <div key={idea} className="flex items-center gap-2 font-bold">
                            <Star size={16} className="text-yellow-400 fill-yellow-400" /> {idea}
                        </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-8 pt-4 border-t border-slate-100 bg-white">
              <button className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xl hover:bg-indigo-600 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]">
                Start This Journey
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. INCOME PREVIEW SECTION */}
      <section className="bg-slate-900 text-white py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-black mb-6">What Can Your Talent Become?</h2>
          <p className="text-slate-400 text-xl mb-20 max-w-2xl mx-auto">Transforming natural ability into professional authority.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { from: 'Coding', to: 'SaaS Founder', icon: '🚀', color: 'bg-blue-500' },
              { from: 'Design', to: 'Brand Architect', icon: '🎨', color: 'bg-rose-500' },
              { from: 'Speaking', to: 'Elite Coach', icon: '🎙️', color: 'bg-amber-500' }
            ].map((item) => (
              <div key={item.to} className="group p-10 rounded-[2.5rem] bg-slate-800/40 border border-slate-700 hover:border-indigo-500/50 transition-all">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg`}>
                    {item.icon}
                </div>
                <div className="text-slate-500 text-sm uppercase font-black tracking-widest mb-2">{item.from}</div>
                <div className="text-white text-2xl font-bold">→ {item.to}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto p-16 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-2xl shadow-indigo-200">
          <h2 className="text-5xl font-black mb-8 leading-tight">Your potential is a structure, not a mystery.</h2>
          <p className="text-indigo-100 mb-12 text-xl opacity-90">
            Join thousands of users who stopped guessing and started building.
          </p>
          <button className="px-12 py-6 bg-white text-indigo-600 rounded-full font-black text-2xl hover:scale-105 transition-all shadow-xl">
            Map Your Path Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default ExploreTalents;