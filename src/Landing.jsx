// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Upload, MessageSquare, TrendingUp, CheckCircle, Star, Menu, X, 
//   ArrowRight, PlayCircle, Search, Users, Award, Zap, Camera, 
//   Music, Palette, Mic, Video, Globe, Moon, Sun, Heart, Instagram, Twitter, Youtube
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// // --- HIGH QUALITY CURATED IMAGES ---
// const talents = [
//   { 
//     id: 1, name: "Julianne Rossi", category: "Dance", 
//     image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800", 
//     type: "Contemporary Ballet", rating: 4.9 
//   },
//   { 
//     id: 2, name: "Leo Haza", category: "Music", 
//     image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800", 
//     type: "Jazz Guitarist", rating: 4.8 
//   },
//   { 
//     id: 3, name: "Sienna Williams", category: "Visual Arts", 
//     image: "https://images.unsplash.com/photo-1547891319-184a778fc4f3?auto=format&fit=crop&q=80&w=800", 
//     type: "Digital Illustrator", rating: 5.0 
//   },
//   { 
//     id: 4, name: "Marcus Vibe", category: "Vocals", 
//     image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=800", 
//     type: "Soul/R&B", rating: 4.7 
//   },
//   { 
//     id: 5, name: "Elena Kosh", category: "Photography", 
//     image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=800", 
//     type: "Street Photography", rating: 4.9 
//   },
//   { 
//     id: 6, name: "The Alchemist", category: "Magic", 
//     image: "https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?auto=format&fit=crop&q=80&w=800", 
//     type: "Mentalism", rating: 4.6 
//   }
// ];

// const categories = [
//   { name: "All", icon: <Globe size={16} /> },
//   { name: "Dance", icon: <Video size={16} /> },
//   { name: "Music", icon: <Music size={16} /> },
//   { name: "Visual Arts", icon: <Palette size={16} /> },
//   { name: "Vocals", icon: <Mic size={16} /> },
//   { name: "Photography", icon: <Camera size={16} /> }
// ];

// const LandingPage = () => {
//   const [activeTab, setActiveTab] = useState("All");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Toggle body class for dark mode
//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [isDarkMode]);

//   const filteredTalents = talents.filter(t => 
//     (activeTab === "All" || t.category === activeTab) &&
//     t.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className={`min-h-screen transition-colors duration-500 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500/30 ${isDarkMode ? 'dark' : ''}`}>
      

//       {/* 2. DUAL-THEME HERO SECTION */}
//       <section className="relative pt-32 md:pt-44 pb-20 md:pb-32 px-4 sm:px-6 overflow-hidden">
//         {/* Background blobs for depth */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 dark:opacity-20 pointer-events-none">
//           <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-400 blur-[100px] md:blur-[120px] rounded-full" />
//           <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-400 blur-[100px] md:blur-[120px] rounded-full" />
//         </div>

//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
//           <motion.div 
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center lg:text-left"
//           >
//             <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mb-6">
//               🚀 Join 15,000+ Rising Creators
//             </span>
//             <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6 md:mb-8">
//               UNLEASH <br className="hidden sm:block" />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-purple-300">
//                 YOUR POTENTIAL.
//               </span>
//             </h1>
//             <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
//               The premier platform for artists, musicians, and performers to get professional critique and connect with industry leaders.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <button className="px-6 md:px-8 py-4 md:py-5 bg-indigo-600 text-white rounded-2xl font-black text-base md:text-lg shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
//                 Upload My Work <ArrowRight size={20} />
//               </button>
//               <button className="px-6 md:px-8 py-4 md:py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-base md:text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
//                 <PlayCircle size={20} className="text-indigo-600" /> Explore Talent
//               </button>
//             </div>
//           </motion.div>

//           <motion.div 
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1 }}
//             className="relative hidden sm:block mt-10 lg:mt-0"
//           >
//             <div className="grid grid-cols-2 gap-3 md:gap-4">
//               <div className="space-y-3 md:space-y-4 pt-8 md:pt-12">
//                 <img src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=400" className="w-full h-40 md:h-64 object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl rotate-[-3deg]" alt="Dance" />
//                 <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=400" className="w-full h-32 md:h-48 object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl rotate-[2deg]" alt="Music" />
//               </div>
//               <div className="space-y-3 md:space-y-4">
//                 <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400" className="w-full h-32 md:h-48 object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl rotate-[3deg]" alt="Art" />
//                 <img src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=400" className="w-full h-40 md:h-64 object-cover rounded-[1.5rem] md:rounded-[2rem] shadow-2xl rotate-[-2deg]" alt="Photo" />
//               </div>
//             </div>
            
//             {/* Floating Review Card */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 w-56 md:w-64">
//               <div className="flex gap-1 mb-2">
//                 {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-yellow-400 fill-current md:w-3.5 md:h-3.5" />)}
//               </div>
//               <p className="text-xs md:text-sm font-bold dark:text-white">"The feedback from my mentor changed my career!"</p>
//               <p className="text-[9px] md:text-[10px] text-slate-400 uppercase font-black mt-2">— Sarah J., Vocalist</p>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* 3. HOW IT WORKS (NEW) */}
//       <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-900/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Your Path to Mastery</h2>
//             <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Three simple steps to elevate your craft and connect with industry professionals.</p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
//             {/* Connecting Line (Desktop only) */}
//             <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200 dark:from-indigo-900 dark:via-indigo-600 dark:to-indigo-900 z-0" />
            
//             {[
//               { icon: <Upload size={32} />, title: "1. Upload Your Best", desc: "Share your latest performance, artwork, or portfolio with our community." },
//               { icon: <MessageSquare size={32} />, title: "2. Get Mentored", desc: "Receive detailed, timestamped feedback from verified industry pros." },
//               { icon: <TrendingUp size={32} />, title: "3. Track Growth", desc: "Watch your stats soar as you apply feedback and level up your skills." }
//             ].map((step, index) => (
//               <div key={index} className="relative z-10 flex flex-col items-center text-center">
//                 <div className="w-20 h-20 md:w-24 md:h-24 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group hover:-translate-y-2 transition-transform duration-300">
//                   {step.icon}
//                 </div>
//                 <h3 className="text-xl md:text-2xl font-black mb-3">{step.title}</h3>
//                 <p className="text-slate-500 dark:text-slate-400 px-4">{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 4. SEARCH & CATEGORY FILTER */}
//       <section id="discover" className="py-20 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-12 md:mb-16">
//             <div className="w-full md:w-auto overflow-hidden">
//               <h2 className="text-3xl md:text-4xl font-black mb-4">Discover Rising Stars</h2>
//               <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
//                 {categories.map((cat) => (
//                   <button
//                     key={cat.name}
//                     onClick={() => setActiveTab(cat.name)}
//                     className={`flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-black text-xs md:text-sm whitespace-nowrap transition-all border-2 ${
//                       activeTab === cat.name 
//                       ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20" 
//                       : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
//                     }`}
//                   >
//                     {cat.icon} {cat.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             <div className="relative w-full md:w-full md:max-w-sm">
//               <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//               <input 
//                 type="text" 
//                 placeholder="Search by name..."
//                 className="w-full pl-12 md:pl-14 pr-4 md:pr-6 py-3.5 md:py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm md:text-base"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>

//           <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
//             <AnimatePresence mode='popLayout'>
//               {filteredTalents.map((talent) => (
//                 <motion.div
//                   layout
//                   key={talent.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   className="group bg-white dark:bg-slate-800 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
//                 >
//                   <div className="relative h-64 md:h-80 overflow-hidden shrink-0">
//                     <img src={talent.image} alt={talent.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                     <div className="absolute top-4 left-4 md:top-6 md:left-6">
//                        <span className="px-3 md:px-4 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest">
//                         {talent.category}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
//                     <div className="flex justify-between items-start mb-6">
//                       <div>
//                         <h3 className="text-xl md:text-2xl font-black mb-1 group-hover:text-indigo-600 transition-colors">{talent.name}</h3>
//                         <p className="text-slate-400 dark:text-slate-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">{talent.type}</p>
//                       </div>
//                       <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded-lg shrink-0">
//                         <Star size={12} className="text-yellow-500 md:w-3.5 md:h-3.5" fill="currentColor" />
//                         <span className="text-xs font-black text-yellow-700 dark:text-yellow-500">{talent.rating}</span>
//                       </div>
//                     </div>
//                     {/* Using a placeholder Link approach for now */}
//                     <Link to={`/profile/${talent.id}`} className="block mt-auto">
//                       <button className="w-full py-3.5 md:py-4 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl md:rounded-2xl font-black hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 text-sm md:text-base">
//                         View Portfolio <ArrowRight size={18} />
//                       </button>
//                     </Link>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         </div>
//       </section>

//       {/* 5. FEATURES BENTO GRID */}
//       <section id="features" className="py-20 md:py-32 px-4 sm:px-6">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-center text-3xl md:text-5xl font-black mb-12 md:mb-20 tracking-tighter uppercase">Why Empower<span className="text-indigo-600">Path</span></h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            
//             {/* Box 1 */}
//             <div className="md:col-span-2 bg-slate-900 text-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 relative overflow-hidden group min-h-[300px] flex flex-col justify-center">
//                <div className="relative z-10">
//                  <h3 className="text-3xl md:text-4xl font-black mb-4 leading-tight">World-Class <br />Mentorship</h3>
//                  <p className="text-slate-400 max-w-sm mb-8 text-sm md:text-base">Get direct, frame-by-frame video reviews from artists who have actually made it in the industry.</p>
//                  <button className="flex items-center gap-2 font-black text-indigo-400 hover:text-indigo-300 transition-colors text-sm md:text-base">
//                    MEET THE MENTORS <ArrowRight size={18} />
//                  </button>
//                </div>
//                <div className="absolute right-[-20px] md:right-[-40px] bottom-[-20px] md:bottom-[-40px] opacity-10 group-hover:scale-110 transition-transform duration-700">
//                   <Award size={200} className="md:w-[300px] md:h-[300px]" />
//                </div>
//             </div>

//             {/* Box 2 */}
//             <div className="bg-indigo-600 text-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[250px]">
//               <Users size={48} className="mb-4 md:mb-6 md:w-[60px] md:h-[60px]" />
//               <h3 className="text-3xl md:text-4xl font-black mb-2">15,000+</h3>
//               <p className="font-bold opacity-80 text-sm md:text-base">Active Creators</p>
//             </div>

//             {/* Box 3 */}
//             <div className="bg-slate-100 dark:bg-slate-800 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between min-h-[250px]">
//               <div className="w-14 h-14 md:w-16 md:h-16 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center shadow-sm mb-6 md:mb-0">
//                 <MessageSquare className="text-indigo-600 md:w-8 md:h-8" />
//               </div>
//               <div>
//                 <h3 className="text-xl md:text-2xl font-black mb-2">Real-time Chat</h3>
//                 <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Network with other creators in your category and collaborate on projects.</p>
//               </div>
//             </div>

//             {/* Box 4 */}
//             <div className="md:col-span-2 bg-indigo-50 dark:bg-indigo-500/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-12 border border-indigo-100 dark:border-indigo-500/10">
//                <div className="w-20 h-20 md:w-32 md:h-32 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
//                   <TrendingUp className="text-white w-10 h-10 md:w-12 md:h-12" />
//                </div>
//                <div>
//                  <h3 className="text-2xl md:text-3xl font-black mb-2 md:mb-3 text-indigo-950 dark:text-white">Growth Tracking</h3>
//                  <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Visual progress reports that show how your skills have improved based on mentor scores over time.</p>
//                </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* 6. CTA SECTION */}
//       <section className="py-12 md:py-24 px-4 sm:px-6">
//         <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
//           <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-tight">Ready to join <br className="hidden sm:block" />the spotlight?</h2>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <button className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-indigo-600 rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:scale-105 transition-transform shadow-xl">
//               Create Your Account
//             </button>
//             <p className="text-indigo-200 font-bold text-sm md:text-base mt-2 sm:mt-0">No credit card required</p>
//           </div>
          
//           <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-white/10 rounded-full -mr-20 -mt-20 md:-mr-32 md:-mt-32 blur-2xl md:blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-40 md:w-64 h-40 md:h-64 bg-black/10 rounded-full -ml-20 -mb-20 md:-ml-32 md:-mb-32 blur-2xl md:blur-3xl" />
//         </div>
//       </section>

//       {/* 7. FOOTER (NEW) */}
      

//     </div>
//   );
// };

// export default LandingPage;



import React from 'react';
import { 
  Lightbulb, 
  Map, 
  Wrench, 
  Rocket, 
  Banknote, 
  Palette, 
  Code2, 
  Swords, 
  Trophy, 
  Mic,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Star,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EmpowerPathLanding = () => {
  // Animation presets
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen -top-20 relative bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-200">
      
      {/* 1️⃣ HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-200/50 blur-[100px]" />
          <div className="absolute top-[20%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-blue-200/50 blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-medium text-sm mb-8">
              <Star className="w-4 h-4 fill-indigo-700" />
              <span>Discover the EmpowerPath MVP</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Your Wealth Is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Inside You.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl text-slate-600 mb-10 leading-relaxed">
              Discover your hidden talent. Follow a proven path from world-class role models. Build your skills and turn your passion into income.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
             <Link to={'/TalentDiscovery'}>
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </button>
             </Link>
              <Link to={'/ExploreTalents'}>
              <button className="flex items-center justify-center px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition-all duration-300">
                Explore Talents
              </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Floating Bento Style */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] hidden lg:block"
          >
            {/* Main Center Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/40 z-20">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                <Code2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="h-2 w-20 bg-slate-200 rounded-full mb-3" />
              <div className="h-2 w-32 bg-slate-100 rounded-full mb-6" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Progress</span>
                  <span className="text-xs font-bold text-indigo-600">75%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-indigo-600 rounded-full" />
                </div>
              </div>
            </div>

            {/* Floating Talent Cards */}
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-10 w-48 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-10">
              <div className="flex items-center gap-3"><Palette className="text-rose-500" /><span className="font-bold text-sm">Design Path</span></div>
            </motion.div>
            
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-20 right-0 w-52 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-30">
              <div className="flex items-center gap-3"><Trophy className="text-amber-500" /><span className="font-bold text-sm">Athletics Route</span></div>
            </motion.div>

            {/* Connection SVG */}
            <svg className="absolute inset-0 w-full h-full -z-10 text-indigo-200" viewBox="0 0 500 500">
              <path d="M 100 100 C 200 300, 400 100, 400 400" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 6" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* 2️⃣ HOW IT WORKS (Core Flow) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Blueprint to Success</h2>
            <p className="text-slate-500 text-lg">A clear, actionable framework designed to take you from discovery to your first paycheck.</p>
          </div>

          <div className="relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-indigo-100 via-indigo-500 to-indigo-100" />
            
            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8"
            >
              {[
                { icon: <Lightbulb />, title: "Discover", desc: "Find your hidden talent." },
                { icon: <Map />, title: "Follow", desc: "Select a proven role model." },
                { icon: <Wrench />, title: "Build", desc: "Develop core skills." },
                { icon: <Rocket />, title: "Create", desc: "Launch real projects." },
                { icon: <Banknote />, title: "Earn", desc: "Monetize your expertise." }
              ].map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-white border-4 border-[#F8FAFC] rounded-full shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {React.cloneElement(step.icon, { className: "w-8 h-8" })}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">{step.title}</h3>
                  <p className="text-slate-500 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3️⃣ AGE PATHWAYS & 4️⃣ CATEGORIES (Bento Grid) */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Age Pathways Column (Takes up 7 cols on large screens) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-2">Age-Specific Pathways</h2>
              <p className="text-slate-500 mb-8">Tailored roadmaps matching your exact stage in life.</p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { age: "10–15", phase: "Discovery", color: "from-emerald-400 to-teal-500", bg: "bg-emerald-50", text: "text-emerald-700" },
                  { age: "16–18", phase: "Exploration", color: "from-blue-400 to-indigo-500", bg: "bg-blue-50", text: "text-blue-700" },
                  { age: "19–21", phase: "Development", color: "from-purple-400 to-fuchsia-500", bg: "bg-purple-50", text: "text-purple-700" },
                  { age: "22–25", phase: "Execution", color: "from-orange-400 to-rose-500", bg: "bg-orange-50", text: "text-orange-700" },
                ].map((path, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }} className={`p-6 rounded-3xl border border-white bg-white shadow-sm hover:shadow-lg transition-all`}>
                    <div className={`inline-block px-3 py-1 rounded-full ${path.bg} ${path.text} text-sm font-bold mb-4`}>
                      Ages {path.age}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{path.phase}</h3>
                    <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${path.color}`} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Talent Categories Preview (Takes up 5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
              
              <h2 className="text-2xl font-bold mb-8 relative z-10">Explore Talents</h2>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {[
                  { icon: <Palette />, name: "Creative Arts" },
                  { icon: <Code2 />, name: "Technology" },
                  { icon: <Swords />, name: "Leadership" },
                  { icon: <Briefcase />, name: "Business" },
                  { icon: <Trophy />, name: "Sports" },
                  { icon: <Mic />, name: "Media" }
                ].map((cat, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors backdrop-blur-sm">
                    <div className="text-indigo-400 mb-3">{cat.icon}</div>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5️⃣ ROLE MODEL SYSTEM */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-6">Never Walk Blindly Again.</motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-slate-500 mb-8">
                Why guess the steps when someone has already paved the way? Select a role model who has achieved what you want, and follow their exact blueprint to success.
              </motion.p>
              
              <motion.ul variants={staggerContainer} className="space-y-4">
                {['Verified industry professionals', 'Step-by-step replicated roadmaps', 'Avoid common beginner mistakes'].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="text-emerald-500 w-6 h-6 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Mock UI Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="bg-[#F8FAFC] p-2 rounded-3xl border border-slate-200 shadow-2xl"
            >
              <div className="bg-white rounded-[1.25rem] p-8 border border-slate-100">
                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    TF
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Tech Founder Path</h4>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Users className="w-4 h-4" /> 12.4k following this path
                    </p>
                  </div>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-slate-100">
                  {['Learn Fundamentals', 'Build First Project', 'Publish Portfolio', 'Monetize Skill'].map((step, i) => (
                    <div key={i} className="flex items-center gap-6 relative z-10">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${i === 0 ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                      <span className={`font-semibold ${i === 0 ? 'text-indigo-600' : 'text-slate-500'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6️⃣ MENTORSHIP CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-indigo-600/20 blur-[100px] rounded-full" />
            
            <div className="relative z-10">
              <ShieldCheck className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Real Mentors. Safe Growth.</h2>
              <p className="text-indigo-100/80 text-lg max-w-2xl mx-auto mb-10">
                Get personalized progress feedback, safe and monitored communication, and a dedicated support system to ensure you never walk alone.
              </p>
              
              <button className="px-10 py-5 bg-indigo-500 hover:bg-indigo-400 text-white text-lg font-bold rounded-full shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.7)] transition-all duration-300 hover:-translate-y-1">
                Become a Mentor Today
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default EmpowerPathLanding;