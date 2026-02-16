import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { 
  Star, CheckCircle, MapPin, Globe, Clock, 
  MessageCircle, Calendar, Shield, Share2, 
  ChevronRight, Award, Briefcase, Play, Video, 
  Terminal, Coffee, Zap, Heart, Send, X, Activity, TrendingUp
} from 'lucide-react';

const MentorProfile = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedSession, setSelectedSession] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});
  const [commentInput, setCommentInput] = useState("");

  // --- Mock Data ---
  const mentor = {
    name: "Alex Chen",
    role: "Senior Full-Stack Architect",
    company: "Vercel",
    location: "San Francisco, CA",
    rating: 4.9,
    reviewsCount: 124,
    students: 540,
    bio: "I specialize in scaling high-traffic React applications and architecting robust Node.js backends. Currently leading infrastructure at Vercel.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
  };

  const posts = [
    { id: 1, title: "Modern Architecture", likes: 1200, comments: 45, img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", content: "Deep dive into microservices with Next.js." },
    { id: 2, title: "Workspace Setup", likes: 3400, comments: 89, img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c", content: "Efficiency starts with your environment." },
    { id: 3, title: "React 19 Hooks", likes: 950, comments: 12, img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97", content: "Exploring the new use() hook." },
  ];

  const reviews = [
    { id: 1, name: "Sarah L.", text: "Alex is a genius. Helped me land my Google offer!", rating: 5 },
    { id: 2, name: "Marcus T.", text: "Incredible code review sessions. Very thorough.", rating: 5 },
  ];

  const heatmapValues = Array.from({ length: 90 }, (_, i) => ({
    date: new Date(new Date().setDate(new Date().getDate() - i)).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 5)
  }));

  // --- Handlers ---
  const toggleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      {/* 1. Cover Area */}
      <div className="h-56 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-200/60">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative">
                  <img src={mentor.image} alt={mentor.name} className="w-36 h-36 rounded-[35px] object-cover ring-8 ring-white shadow-2xl" />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full border-4 border-white">
                    <CheckCircle size={18} fill="currentColor" stroke="white" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h1 className="text-4xl font-black text-slate-900 tracking-tight">{mentor.name}</h1>
                      <p className="text-blue-600 font-bold text-lg">{mentor.role} @ {mentor.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all"><Share2 size={20} /></button>
                      <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:shadow-xl transition-all"><MessageCircle size={20} /> Message</button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-400">
                    <div className="flex items-center gap-1.5"><Star size={18} className="text-yellow-400" fill="currentColor" /> <span className="text-slate-900">{mentor.rating}</span> ({mentor.reviewsCount} reviews)</div>
                    <div className="flex items-center gap-1.5"><MapPin size={18} /> {mentor.location}</div>
                    <div className="flex items-center gap-1.5"><Globe size={18} /> English</div>
                  </div>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="flex gap-8 border-b border-slate-100 mt-12 overflow-x-auto no-scrollbar">
                {['Overview', 'Posts', 'Activity', 'Reviews'].map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-blue-600 border-b-4 border-blue-600' : 'text-slate-400 border-b-4 border-transparent'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Dynamic Content */}
              <div className="py-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'Overview' && (
                    <motion.div key="ov" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-4">Bio</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">{mentor.bio}</p>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[ ['Students', mentor.students], ['Sessions', '1.2K'], ['Rating', mentor.rating], ['Response', '2h'] ].map(([label, val]) => (
                          <div key={label} className="p-5 bg-slate-50/50 border border-slate-100 rounded-3xl">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                            <p className="text-2xl font-black text-slate-900">{val}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Posts' && (
                    <motion.div key="pts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {posts.map(post => (
                        <div key={post.id} onClick={() => setSelectedPost(post)} className="group cursor-pointer rounded-[32px] overflow-hidden border border-slate-100 bg-white hover:shadow-2xl transition-all">
                          <img src={post.img} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="p-6">
                            <h4 className="font-black text-slate-900 mb-2">{post.title}</h4>
                            <div className="flex gap-4 text-slate-400 font-bold text-xs">
                              <span className="flex items-center gap-1"><Heart size={14}/> {post.likes}</span>
                              <span className="flex items-center gap-1"><MessageCircle size={14}/> {post.comments}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'Activity' && (
                    <motion.div key="act" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                      <div className="p-8 bg-slate-900 rounded-[32px] text-white">
                        <h3 className="flex items-center gap-2 font-black mb-6"><Activity size={20} className="text-emerald-400"/> Mentorship Activity</h3>
                        <CalendarHeatmap values={heatmapValues} classForValue={(value) => !value ? 'fill-slate-800' : `fill-blue-${value.count * 200}`} />
                      </div>
                      <div className="p-6 border border-slate-100 rounded-3xl flex items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <div className="bg-blue-100 p-3 rounded-2xl text-blue-600"><TrendingUp /></div>
                          <div><p className="font-black text-slate-900">Growth Month</p><p className="text-sm text-slate-500">+12% more sessions than January</p></div>
                        </div>
                        <ChevronRight className="text-slate-300" />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Reviews' && (
                    <motion.div key="rev" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      {reviews.map(r => (
                        <div key={r.id} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                          <div className="flex gap-1 text-yellow-400 mb-2">
                            {[...Array(r.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                          </div>
                          <p className="text-slate-700 font-medium italic mb-4">"{r.text}"</p>
                          <p className="font-black text-slate-900 text-sm">— {r.name}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-200/60 sticky top-24">
              <h3 className="text-2xl font-black text-slate-900 mb-8">Book Session</h3>
              <div className="space-y-3">
                {['1:1 Strategy', 'Code Review', 'Mock Interview'].map((type, idx) => (
                  <button key={type} onClick={() => setSelectedSession(idx)} className={`w-full p-5 rounded-3xl border-2 transition-all flex justify-between items-center ${selectedSession === idx ? 'border-blue-600 bg-blue-50/50' : 'border-slate-50 hover:border-slate-200'}`}>
                    <span className="font-bold text-slate-900">{type}</span>
                    <span className="font-black text-blue-600">&#8358;{idx === 0 ? '80' : idx === 1 ? '150' : '200'}</span>
                  </button>
                ))}
              </div>
              <button className="w-full bg-blue-600 text-white mt-8 py-5 rounded-[24px] font-black text-lg shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all">Confirm Booking</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- POST MODAL --- */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md" onClick={() => setSelectedPost(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-5xl rounded-[40px] overflow-hidden flex flex-col md:flex-row h-[80vh]" onClick={e => e.stopPropagation()}>
              <div className="flex-1 bg-black flex items-center justify-center">
                <img src={selectedPost.img} className="max-h-full object-contain" />
              </div>
              <div className="w-full md:w-[400px] flex flex-col bg-white">
                <div className="p-6 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3"><img src={mentor.image} className="w-10 h-10 rounded-full" /><span className="font-black">alex_chen</span></div>
                  <button onClick={() => setSelectedPost(null)}><X /></button>
                </div>
                <div className="flex-1 p-6 overflow-y-auto">
                  <h2 className="text-xl font-black mb-4">{selectedPost.title}</h2>
                  <p className="text-slate-600 mb-8">{selectedPost.content}</p>
                </div>
                <div className="p-6 border-t bg-slate-50/50">
                  <div className="flex gap-4 mb-4">
                    <Heart size={28} onClick={() => toggleLike(selectedPost.id)} className={`cursor-pointer transition-all ${likedPosts[selectedPost.id] ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
                    <MessageCircle size={28} />
                  </div>
                  <p className="font-black mb-4">{selectedPost.likes + (likedPosts[selectedPost.id] ? 1 : 0)} likes</p>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Add comment..." className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2" />
                    <button className="text-blue-600 font-black"><Send size={20}/></button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .fill-slate-800 { fill: #1e293b; }
        .fill-blue-200 { fill: #60a5fa; }
        .fill-blue-400 { fill: #3b82f6; }
        .fill-blue-600 { fill: #2563eb; }
        .fill-blue-800 { fill: #1e40af; }
        svg rect { rx: 4; ry: 4; }
      `}</style>
    </div>
  );
};

export default MentorProfile;