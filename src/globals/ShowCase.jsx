import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- EXPANSIVE 20+ DATASET ---
const INITIAL_DATA = [
  {
    id: 1,
    name: "Aisha Bello",
    title: "Lead Animator",
    category: "Motion",
    likes: 1205,
    views: "12k",
    type: "Video",
    img: "https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=800",
    video: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
  },
  {
    id: 2,
    name: "Marcus Thorne",
    title: "3D Artist",
    category: "Design",
    likes: 890,
    views: "8k",
    type: "Video",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    video: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4"
  },
  {
    id: 3,
    name: "Sofia Mensah",
    title: "UX Strategist",
    category: "UX/UI",
    likes: 2500,
    views: "45k",
    type: "Video",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
    video: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4"
  },
  {
    id: 4,
    name: "David Chen",
    title: "Commercial Director",
    category: "Video",
    likes: 5400,
    views: "120k",
    type: "Video",
    img: "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=800",
    video: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4"
  },
  {
    id: 5,
    name: "Aria Knight",
    title: "Concept Artist",
    category: "Design",
    likes: 3100,
    views: "15k",
    type: "Video",
    img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=800",
    video: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4"
  },
  {
    id: 6,
    name: "Lucas Helm",
    title: "VFX Supervisor",
    category: "Motion",
    likes: 4200,
    views: "90k",
    type: "Video",
    img: "https://images.pexels.com/photos/2773498/pexels-photo-2773498.jpeg?auto=compress&cs=tinysrgb&w=800",
    video: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  { id: 7, name: "Elena Rossi", title: "Brand Identity", category: "Design", likes: 1100, views: "5k", type: "Image", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800" },
  { id: 8, name: "Kobe Bryant", title: "Action Videographer", category: "Video", likes: 9800, views: "300k", type: "Video", img: "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=800", video: "https://assets.mixkit.co/videos/preview/mixkit-surfer-riding-a-wave-in-the-ocean-15631-large.mp4" },
  { id: 9, name: "Mila Kunis", title: "Product Designer", category: "UX/UI", likes: 750, views: "3k", type: "Image", img: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800" },
  { id: 10, name: "Chris Evans", title: "Architectural 3D", category: "Design", likes: 1300, views: "20k", type: "Image", img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800" },
  { id: 11, name: "Zendaya", title: "Fashion Editor", category: "Video", likes: 12000, views: "1M", type: "Video", img: "https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg?auto=compress&cs=tinysrgb&w=800", video: "https://assets.mixkit.co/videos/preview/mixkit-stylish-girl-with-glasses-posing-40410-large.mp4" },
  { id: 12, name: "Tom Hardy", title: "Abstract Painter", category: "Design", likes: 400, views: "1k", type: "Image", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800" },
  { id: 13, name: "Rihanna", title: "Music Visualizer", category: "Motion", likes: 25000, views: "5M", type: "Video", img: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800", video: "https://assets.mixkit.co/videos/preview/mixkit-crowd-at-a-concert-with-lights-14119-large.mp4" },
  { id: 14, name: "Elon Musk", title: "Tech UI/UX", category: "UX/UI", likes: 15000, views: "2M", type: "Image", img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800" },
  { id: 15, name: "Scarlett J.", title: "Documentary Lead", category: "Video", likes: 3200, views: "50k", type: "Video", img: "https://images.pexels.com/photos/3039036/pexels-photo-3039036.jpeg?auto=compress&cs=tinysrgb&w=800", video: "https://assets.mixkit.co/videos/preview/mixkit-pov-of-a-person-walking-in-a-forest-34440-large.mp4" },
  { id: 16, name: "Will Smith", title: "Content Creator", category: "Video", likes: 45000, views: "10M", type: "Video", img: "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&w=800", video: "https://assets.mixkit.co/videos/preview/mixkit-fireworks-illuminating-the-night-sky-4155-large.mp4" },
  { id: 17, name: "Gal Gadot", title: "3D Modeler", category: "Design", likes: 2200, views: "18k", type: "Image", img: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800" },
  { id: 18, name: "Henry Cavill", title: "Game UI", category: "UX/UI", likes: 5000, views: "60k", type: "Image", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800" },
  { id: 19, name: "Dua Lipa", title: "Pop Visuals", category: "Motion", likes: 30000, views: "8M", type: "Video", img: "https://images.pexels.com/photos/1763071/pexels-photo-1763071.jpeg?auto=compress&cs=tinysrgb&w=800", video: "https://assets.mixkit.co/videos/preview/mixkit-lights-in-the-night-club-2673-large.mp4" },
  { id: 20, name: "Robert Downey", title: "VFX Artist", category: "Motion", likes: 18000, views: "1M", type: "Image", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800" },
];

const TalentQuantumWhite = () => {
  // State
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [media, setMedia] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [selected, setSelected] = useState(null);
  const [liked, setLiked] = useState(new Set());
  const [saved, setSaved] = useState(new Set());
  const [comments, setComments] = useState({}); // { id: [texts] }
  const [commentInput, setCommentInput] = useState("");
  const [notifs, setNotifs] = useState([]);

  // Toast System
  const addNotif = (text) => {
    const id = Date.now();
    setNotifs(prev => [...prev, { id, text }]);
    setTimeout(() => setNotifs(prev => prev.filter(n => n.id !== id)), 3000);
  };

  // Handlers
  const toggleLike = (e, id) => {
    e?.stopPropagation();
    const next = new Set(liked);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      addNotif("Added to your Liked projects! ❤️");
    }
    setLiked(next);
  };

  const toggleSave = (e, id) => {
    e?.stopPropagation();
    const next = new Set(saved);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      addNotif("Saved to your Collection! 🔖");
    }
    setSaved(next);
  };

  const submitComment = (id) => {
    if (!commentInput.trim()) return;
    setComments(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), commentInput]
    }));
    setCommentInput("");
    addNotif("Comment posted successfully! 💬");
  };

  const filtered = useMemo(() => {
    return INITIAL_DATA.filter(t => {
      const matchS = t.name.toLowerCase().includes(search.toLowerCase()) || t.title.toLowerCase().includes(search.toLowerCase());
      const matchC = cat === "All" || t.category === cat;
      const matchM = media === "All" || (media === "Videos" ? t.type === "Video" : t.type === "Image");
      return matchS && matchC && matchM;
    }).sort((a, b) => sort === "Most Liked" ? b.likes - a.likes : b.id - a.id);
  }, [search, cat, media, sort]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-indigo-100">
      
      {/* 1️⃣ NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-8 py-4">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200">Q</div>
            <h1 className="text-xl font-black tracking-tight uppercase">Quantum<span className="text-indigo-600">Studio</span></h1>
          </div>

          <div className="relative w-full md:w-[500px]">
            <input 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-100 border border-transparent rounded-2xl py-3 pl-12 pr-6 focus:bg-white focus:border-indigo-500/30 outline-none transition-all text-sm font-medium"
              placeholder="Search artists, skills, or projects..." 
            />
            <span className="absolute left-4 top-3 text-lg opacity-30">🔍</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            {['All', 'Motion', 'Design', 'Video'].map(c => (
              <button key={c} onClick={() => setCat(c)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${cat === c ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>{c}</button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-8 py-10">
        
        {/* 2️⃣ FILTERS */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-2xl font-black text-slate-800">Explore <span className="text-slate-400 font-medium">({filtered.length})</span></h2>
          <div className="flex items-center gap-4">
            <select onChange={(e) => setSort(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold outline-none cursor-pointer">
              <option>Latest</option>
              <option>Most Liked</option>
            </select>
            <div className="h-6 w-[1px] bg-slate-200" />
            <div className="flex gap-1">
              {['All', 'Videos', 'Images'].map(m => (
                <button key={m} onClick={() => setMedia(m)} className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${media === m ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}>{m}</button>
              ))}
            </div>
          </div>
        </div>

        {/* 3️⃣ GRID */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelected(item)}
                className="group bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                   <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                   <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                   
                   {/* Actions */}
                   <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                      <button onClick={(e) => toggleLike(e, item.id)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all">
                        {liked.has(item.id) ? '❤️' : '🤍'}
                      </button>
                      <button onClick={(e) => toggleSave(e, item.id)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all">
                        {saved.has(item.id) ? '🔖' : '📁'}
                      </button>
                   </div>

                   {item.type === 'Video' && (
                     <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                       <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" /> Play Video
                     </div>
                   )}
                </div>
                <div className="p-6">
                   <h3 className="font-black text-slate-800 tracking-tight text-lg mb-1">{item.name}</h3>
                   <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter mb-4">{item.title}</p>
                   <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                      <span className="text-[10px] font-black text-indigo-600 px-2 py-1 bg-indigo-50 rounded-md uppercase">{item.category}</span>
                      <div className="flex items-center gap-3 text-slate-300 text-[10px] font-bold">
                        <span>👁️ {item.views}</span>
                        <span>💬 {comments[item.id]?.length || 0}</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* 4️⃣ STUDIO MODAL */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full h-full max-w-[1500px] bg-white rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-[0_30px_100px_rgba(0,0,0,0.1)]"
            >
              
              <div className="flex-1 bg-slate-50 flex items-center justify-center relative">
                {selected.type === 'Video' ? (
                  <video src={selected.video} autoPlay controls className="w-full h-full object-contain" />
                ) : (
                  <img src={selected.img} className="w-full h-full object-contain" alt="" />
                )}
                <button onClick={() => setSelected(null)} className="absolute top-8 left-8 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center font-bold hover:scale-110 transition-transform">✕</button>
              </div>

              <div className="w-full lg:w-[450px] flex flex-col p-10">
                <div className="flex items-center gap-4 mb-10">
                   <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-black">
                     {selected.name[0]}
                   </div>
                   <div>
                      <h2 className="text-2xl font-black tracking-tight">{selected.name}</h2>
                      <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest">{selected.category} Expert</p>
                   </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar pr-2 mb-8">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Feed Discussion</h4>
                   <div className="space-y-4">
                      {(comments[selected.id] || []).map((c, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-black text-indigo-500 mb-1">@visitor_{i+1}</p>
                          <p className="text-sm text-slate-600 font-medium leading-relaxed">{c}</p>
                        </div>
                      ))}
                      {(!comments[selected.id] || comments[selected.id].length === 0) && (
                        <p className="text-center py-10 text-slate-400 italic text-sm">No comments yet. Start the conversation!</p>
                      )}
                   </div>
                </div>

                <div className="pt-8 border-t border-slate-100 space-y-4">
                   <div className="flex gap-3">
                      <button 
                        onClick={() => toggleLike(null, selected.id)}
                        className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase transition-all ${liked.has(selected.id) ? 'bg-rose-500 text-white shadow-lg shadow-rose-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                      >
                        {liked.has(selected.id) ? 'Liked ❤️' : 'Appreciate'}
                      </button>
                      <button 
                        onClick={() => toggleSave(null, selected.id)}
                        className={`w-16 flex items-center justify-center rounded-2xl border transition-all ${saved.has(selected.id) ? 'bg-indigo-600 border-transparent shadow-lg shadow-indigo-200' : 'bg-transparent border-slate-200 hover:border-indigo-300'}`}
                      >
                        {saved.has(selected.id) ? '🔖' : '📁'}
                      </button>
                   </div>
                   <div className="relative">
                      <input 
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Write a comment..." 
                        className="w-full bg-slate-100 rounded-2xl py-4 pl-6 pr-20 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 text-sm font-medium"
                      />
                      <button 
                        onClick={() => submitComment(selected.id)}
                        className="absolute right-3 top-2.5 bottom-2.5 bg-indigo-600 text-white text-[10px] font-black uppercase px-4 rounded-xl shadow-lg shadow-indigo-200"
                      >
                        Post
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5️⃣ NOTIFICATIONS (TOASTS) */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-3">
        <AnimatePresence>
          {notifs.map(n => (
            <motion.div 
              key={n.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-3 border border-white/10"
            >
               <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" /> {n.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default TalentQuantumWhite;