import React, { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { motion, AnimatePresence } from 'framer-motion';
import 'react-calendar-heatmap/dist/styles.css';
import { 
  MapPin, Users, MessageSquare, UserPlus, UserCheck, Star, 
  Activity, MessageCircle, Heart, X, Play, Send,
  Briefcase, Code, GraduationCap, ChevronRight, TrendingUp, Award
} from 'lucide-react';

const ProfilePage = () => {
  // --- States ---
  const [activeTab, setActiveTab] = useState('Posts');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likedPosts, setLikedPosts] = useState({}); 
  const [commentInput, setCommentInput] = useState("");
  const [postComments, setPostComments] = useState({
    1: [{ id: 101, user: 'dev_jake', text: 'This is super helpful, thanks!', time: '2h' }],
    2: [{ id: 102, user: 'coding_art', text: 'Love the setup! 🔥', time: '5h' }]
  });

  // --- Mock Data ---
  const today = new Date();
  const heatmapValues = Array.from({ length: 200 }, (_, i) => ({
    date: new Date(new Date().setDate(today.getDate() - i)).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 5),
  }));

  const stats = [
    { label: 'Total Posts', value: '250' },
    { label: 'Total Likes', value: '15.8K' },
    { label: 'Total Views', value: '300K' },
    { label: 'Sessions', value: '75', extra: 'Rating: 4.9/5' },
  ];

  const posts = [
    { id: 1, type: 'image', likes: 1500, commentsCount: 120, url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', title: "Deep Dive into React Server Components" },
    { id: 2, type: 'video', likes: 2400, commentsCount: 310, url: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4', thumb: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', title: "Daily Coding Routine" },
    { id: 3, type: 'image', likes: 2100, commentsCount: 230, url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', title: "Workspace Setup 2024" },
    { id: 4, type: 'image', likes: 1200, commentsCount: 88, url: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159', title: "TypeScript Mastery" },
    { id: 5, type: 'video', likes: 5400, commentsCount: 890, url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-keyboard-41133-large.mp4', thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f', title: "How to scale Node.js" },
    { id: 6, type: 'image', likes: 920, commentsCount: 62, url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea', title: "Clean Code Principles" },
  ];

  const experiences = [
    { role: "Senior Architect", company: "Vercel", period: "2022 - Present", desc: "Leading the Next.js infrastructure team." },
    { role: "Staff Engineer", company: "Netflix", period: "2019 - 2022", desc: "Optimized streaming algorithms for TV interfaces." }
  ];

  const reviews = [
    { id: 1, user: "Sarah Jenkins", role: "Junior Dev", rating: 5, text: "Alex's mentorship changed my career. I went from zero to hired in 6 months.", avatar: "S" },
    { id: 2, user: "Mike Ross", role: "Frontend Lead", rating: 5, text: "Best code reviews I've ever received. Brutally honest but incredibly helpful.", avatar: "M" },
    { id: 3, user: "Elena Wu", role: "Student", rating: 4, text: "Great content, but the advanced sessions are really tough! Learned a lot though.", avatar: "E" },
  ];

  const relatedMentors = [
    { name: "Sarah Drasner", role: "Engineering VP", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { name: "Kent C. Dodds", role: "React Educator", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    { name: "Dan Abramov", role: "UI Engineer", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100" },
  ];

  // --- Handlers ---
  const toggleLike = (postId) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComment = { id: Date.now(), user: 'You', text: commentInput, time: 'Just now' };
    setPostComments(prev => ({ ...prev, [selectedPost.id]: [newComment, ...(prev[selectedPost.id] || [])] }));
    setCommentInput("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-200/60 overflow-hidden">
          
          {/* 1. Profile Header */}
          <div className="p-8 sm:p-12 border-b border-slate-50">
            <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start text-center lg:text-left">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400" alt="Profile" className="w-40 h-40 sm:w-48 sm:h-48 rounded-[40px] object-cover ring-8 ring-slate-50 shadow-xl" />
              </motion.div>
              
              <div className="flex-1 space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Alex Chen</h1>
                      <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase">Mentor</span>
                    </div>
                    <p className="text-blue-600 font-semibold text-xl mt-1">@alex_chen_dev</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setIsFollowing(!isFollowing)} className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all shadow-lg ${isFollowing ? 'bg-slate-100 text-slate-600 shadow-none' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'}`}>
                      {isFollowing ? <><UserCheck size={20} /> Following</> : <><UserPlus size={20} /> Follow</>}
                    </button>
                    <button className="flex items-center gap-2 border border-slate-200 px-8 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                      <MessageSquare size={20} /> Message
                    </button>
                  </div>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto lg:mx-0">
                  Senior Full-Stack Architect & Open Source Contributor. Helping 500+ students master modern web tech. 🚀 Build. Scale. Mentor. Repeat.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-y-3 gap-x-8 text-slate-500 font-medium">
                  <div className="flex items-center gap-2"><MapPin size={18} className="text-slate-400"/> San Francisco, CA</div>
                  <div className="flex items-center gap-2"><Users size={18} className="text-slate-400"/> 12.4K <span className="text-slate-400 font-normal text-sm">Followers</span></div>
                  <div className="flex items-center gap-2">842 <span className="text-slate-400 font-normal text-sm">Following</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100 bg-slate-50/30">
            {stats.map((stat, i) => (
              <div key={i} className="p-8 text-center hover:bg-white transition-colors group cursor-default">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 group-hover:scale-110 transition-transform">{stat.value}</p>
                {stat.extra && <p className="text-xs text-blue-500 font-bold mt-2">{stat.extra}</p>}
              </div>
            ))}
          </div>

          {/* 3. Tabs Section */}
          <div className="px-8 sm:px-12 py-12">
            <div className="flex gap-10 border-b border-slate-100 mb-10 overflow-x-auto whitespace-nowrap">
              {['Posts', 'Activity', 'About', 'Reviews'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`pb-6 text-sm font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'text-blue-600 border-b-4 border-blue-600' : 'text-slate-400 hover:text-slate-600 border-b-4 border-transparent'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 4. Content Area */}
            <AnimatePresence mode="wait">
              {/* --- POSTS TAB --- */}
              {activeTab === 'Posts' && (
                <motion.div 
                  key="posts" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {posts.map((post) => (
                    <motion.div 
                      key={post.id} whileHover={{ y: -8 }} onClick={() => setSelectedPost(post)}
                      className="group relative aspect-square rounded-[32px] overflow-hidden bg-slate-100 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                      <img src={post.type === 'video' ? post.thumb : post.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.title} />
                      {post.type === 'video' && <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white"><Play fill="white" size={16} /></div>}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8 text-white">
                        <p className="font-bold text-lg mb-4 translate-y-4 group-hover:translate-y-0 transition-transform">{post.title}</p>
                        <div className="flex items-center gap-6 font-bold">
                          <div className="flex items-center gap-2"><Heart size={20} className={likedPosts[post.id] ? "text-pink-500" : ""} fill={likedPosts[post.id] ? "currentColor" : "none"}/> {post.likes + (likedPosts[post.id] ? 1 : 0)}</div>
                          <div className="flex items-center gap-2"><MessageCircle size={20} className="text-blue-400"/> {postComments[post.id]?.length || 0}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* --- ACTIVITY TAB --- */}
              {activeTab === 'Activity' && (
                <motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                   <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm mb-8">
                     <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 mb-6"><Activity className="text-emerald-500" /> Contribution Map</h3>
                     <div className="heatmap-container">
                      <CalendarHeatmap startDate={new Date(new Date().setDate(today.getDate() - 150))} endDate={today} values={heatmapValues} classForValue={(value) => (!value || value.count === 0 ? 'color-empty' : `color-scale-${value.count}`)} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2"><TrendingUp className="text-blue-500" /> Recent Timeline</h3>
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100"></div>
                          <div className="w-0.5 h-16 bg-slate-100 mt-2"></div>
                        </div>
                        <div className="pb-8">
                          <p className="text-slate-900 font-bold">Published a new tutorial</p>
                          <p className="text-slate-500 text-sm mt-1">"Advanced Patterns in Next.js 14" received 2.5k views in 2 hours.</p>
                          <span className="text-xs font-bold text-slate-400 uppercase mt-2 block">{item * 2} days ago</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* --- ABOUT TAB --- */}
              {activeTab === 'About' && (
                <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h4 className="flex items-center gap-2 font-black uppercase text-slate-400 text-xs tracking-widest mb-6"><Briefcase size={16}/> Work Experience</h4>
                      <div className="space-y-6">
                        {experiences.map((exp, i) => (
                          <div key={i} className="pl-4 border-l-2 border-slate-100">
                            <p className="text-slate-900 font-bold text-lg">{exp.role}</p>
                            <p className="text-blue-600 font-medium text-sm mb-2">{exp.company} • {exp.period}</p>
                            <p className="text-slate-500 text-sm leading-relaxed">{exp.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 font-black uppercase text-slate-400 text-xs tracking-widest mb-6"><GraduationCap size={16}/> Education</h4>
                      <div className="pl-4 border-l-2 border-slate-100">
                        <p className="text-slate-900 font-bold text-lg">BS Computer Science</p>
                        <p className="text-blue-600 font-medium text-sm">Stanford University • 2015 - 2019</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="flex items-center gap-2 font-black uppercase text-slate-400 text-xs tracking-widest mb-6"><Code size={16}/> Tech Stack</h4>
                    <div className="flex flex-wrap gap-3">
                      {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind', 'Rust', 'GraphQL', 'AWS', 'Docker', 'Figma'].map(tech => (
                        <span key={tech} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:shadow-md transition-all cursor-default">{tech}</span>
                      ))}
                    </div>
                    <div className="mt-10 p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl">
                      <h5 className="font-bold text-lg mb-2 flex items-center gap-2"><Award /> Achievements</h5>
                      <ul className="space-y-3 text-sm opacity-90">
                        <li className="flex gap-2">✨ GitHub Star (2k+ stars)</li>
                        <li className="flex gap-2">🎤 Speaker at React Conf 2024</li>
                        <li className="flex gap-2">📚 Author of "Modern Web"</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- REVIEWS TAB --- */}
              {activeTab === 'Reviews' && (
                <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid md:grid-cols-2 gap-6">
                  {reviews.map((r) => (
                    <div key={r.id} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">{r.avatar}</div>
                          <div>
                            <p className="font-bold text-slate-900">{r.user}</p>
                            <p className="text-xs text-slate-500 font-bold uppercase">{r.role}</p>
                          </div>
                        </div>
                        <div className="flex text-yellow-400 gap-0.5">
                          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} className={i >= r.rating ? "text-slate-300" : ""} />)}
                        </div>
                      </div>
                      <p className="text-slate-600 italic text-sm leading-relaxed">"{r.text}"</p>
                    </div>
                  ))}
                  <div className="p-6 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                     <MessageSquare className="text-slate-300 mb-2" size={32}/>
                     <p className="font-bold text-slate-400">Write a Review</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 5. Related Mentors Section */}
          <div className="bg-slate-50 border-t border-slate-200/60 p-8 sm:p-12">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black text-slate-900">Related Mentors to Guide</h3>
               <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">View All <ChevronRight size={16}/></button>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               {relatedMentors.map((mentor, i) => (
                 <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-lg transition-all cursor-pointer">
                   <img src={mentor.img} className="w-14 h-14 rounded-full object-cover" alt={mentor.name} />
                   <div>
                     <p className="font-bold text-slate-900">{mentor.name}</p>
                     <p className="text-xs font-bold text-blue-500 uppercase">{mentor.role}</p>
                   </div>
                   <button className="ml-auto p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-blue-600 hover:text-white transition-colors"><UserPlus size={18}/></button>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>

      {/* 6. Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-slate-900/90 backdrop-blur-xl" onClick={() => setSelectedPost(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="mt-20 bg-white w-full max-w-6xl rounded-[40px] overflow-hidden flex flex-col lg:flex-row shadow-2xl h-[85vh]" onClick={(e) => e.stopPropagation()}>
              <div className="flex-[1.4] bg-black flex items-center justify-center relative">
                {selectedPost.type === 'video' ? <video src={selectedPost.url} controls autoPlay className="h-full w-full object-contain" /> : <img src={selectedPost.url} className="w-full h-full object-cover" alt="Selected" />}
              </div>
              <div className="flex-1 flex flex-col bg-white">
                <div className="p-6 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3"><img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" className="w-10 h-10 rounded-full" alt="Avatar" /><span className="font-black text-slate-900">alex_chen_dev</span></div>
                  <button onClick={() => setSelectedPost(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                  <div className="pb-4"><h2 className="text-xl font-black text-slate-900 mb-2">{selectedPost.title}</h2><p className="text-slate-500 text-sm leading-relaxed">Full technical breakdown and discussion about this implementation...</p></div>
                  <div className="space-y-5">
                    {(postComments[selectedPost.id] || []).map((comment) => (
                      <div key={comment.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0">{comment.user[0]}</div>
                        <div><p className="text-sm"><span className="font-bold text-slate-900 mr-2">{comment.user}</span> {comment.text}</p><span className="text-[10px] text-slate-400 font-bold uppercase mt-1">{comment.time}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 border-t border-slate-100">
                  <div className="flex gap-4 mb-4"><motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike(selectedPost.id)}><Heart size={28} className={likedPosts[selectedPost.id] ? "text-pink-500" : "text-slate-700"} fill={likedPosts[selectedPost.id] ? "currentColor" : "none"} /></motion.button><MessageCircle size={28} className="text-slate-700" /></div>
                  <p className="font-black text-slate-900 text-lg mb-4">{selectedPost.likes + (likedPosts[selectedPost.id] ? 1 : 0)} likes</p>
                  <form onSubmit={handleAddComment} className="relative"><input type="text" placeholder="Add a comment..." className="w-full bg-slate-100 border-none rounded-2xl py-3 px-4 pr-12 focus:ring-2 focus:ring-blue-500 transition-all text-sm" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} /><button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 font-bold text-sm"><Send size={18} /></button></form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .react-calendar-heatmap .color-empty { fill: #f1f5f9; }
        .react-calendar-heatmap .color-scale-1 { fill: #d1fae5; }
        .react-calendar-heatmap .color-scale-2 { fill: #6ee7b7; }
        .react-calendar-heatmap .color-scale-3 { fill: #10b981; }
        .react-calendar-heatmap .color-scale-4 { fill: #047857; }
        .react-calendar-heatmap rect { rx: 4; ry: 4; }
        .heatmap-container svg { width: 100%; height: auto; display: block; }
      `}} />
    </div>
  );
};

export default ProfilePage;