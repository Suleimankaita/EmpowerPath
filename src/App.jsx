// import React, { useState } from 'react';
// import { 
//   Upload, 
//   MessageSquare, 
//   TrendingUp, 
//   CheckCircle, 
//   Star, 
//   Menu, 
//   X, 
//   ArrowRight,
//   PlayCircle 
// } from 'lucide-react';

// // --- MOCK DATA ---
// const talents = [
//   { id: 1, name: "Alex Johnson", category: "Dance", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=800", type: "Contemporary" },
//   { id: 2, name: "Maria K.", category: "Music", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=800", type: "Guitarist" },
//   { id: 3, name: "David Lee", category: "Visual Arts", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800", type: "Oil Painting" },
//   { id: 4, name: "Sarah Connor", category: "Vocals", image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=800", type: "Jazz" },
//   { id: 5, name: "Marcus Chen", category: "Magic", image: "https://images.unsplash.com/photo-1596727147705-06a3db696163?auto=format&fit=crop&q=80&w=800", type: "Close-up" },
//   { id: 6, name: "Priya Patel", category: "Comedy", image: "https://images.unsplash.com/photo-1527269534026-c82f2642571c?auto=format&fit=crop&q=80&w=800", type: "Stand-up" },
// ];

// const mentors = [
//   { id: 1, name: "Dr. Sarah Lee", role: "Choreographer", bio: "15+ years experience. Former lead at NYC Ballet.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
//   { id: 2, name: "Mark Ehan", role: "Music Producer", bio: "Grammy-nominated producer helping indie artists.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
//   { id: 3, name: "Elena Rodriguez", role: "Art Director", bio: "Fine arts professor and gallery curator.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400" },
//   { id: 4, name: "James Wilson", role: "Performance Coach", bio: "Specialist in stage presence and public speaking.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
// ];

// const LandingPage = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
//       {/* 1. NAVIGATION */}
//       <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             {/* Logo */}
//             <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <Star className="text-white w-5 h-5" fill="currentColor" />
//               </div>
//               <span className="font-bold text-xl tracking-tight">TalentConnect</span>
//             </div>

//             {/* Desktop Links */}
//             <div className="hidden md:flex space-x-8 items-center">
//               <a href="#explore" className="text-gray-600 hover:text-blue-600 font-medium transition">Explore</a>
//               <a href="#mentors" className="text-gray-600 hover:text-blue-600 font-medium transition">Mentors</a>
//               <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition">How it Works</a>
//             </div>

//             {/* Auth Buttons */}
//             <div className="hidden md:flex items-center space-x-4">
//               <button className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2">Login</button>
//               <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium transition shadow-md hover:shadow-lg">
//                 Sign Up
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden flex items-center">
//               <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600">
//                 {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu Dropdown */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden bg-white border-b border-gray-100 absolute w-full">
//             <div className="px-4 pt-2 pb-6 space-y-2">
//               <a href="#explore" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Explore</a>
//               <a href="#mentors" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Mentors</a>
//               <a href="#how-it-works" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">How it Works</a>
//               <div className="pt-4 flex flex-col gap-3">
//                 <button className="w-full text-center py-3 border border-gray-200 rounded-lg font-semibold">Login</button>
//                 <button className="w-full text-center py-3 bg-blue-600 text-white rounded-lg font-semibold">Sign Up</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* 2. HERO SECTION */}
//       <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 relative overflow-hidden">
//         {/* Background blobs */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl z-[-1] opacity-50">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
//           <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
//           <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
//         </div>

//         <div className="max-w-4xl mx-auto text-center">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//             </span>
//             New Mentors Added This Week
//           </div>
//           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
//             Discover Your Talent. <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
//               Get Expert Guidance.
//             </span>
//           </h1>
//           <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
//             The ultimate platform to showcase your skills, connect with professional mentors, and take your craft to the next level.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2">
//               Get Started <ArrowRight size={20} />
//             </button>
//             <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2">
//               <PlayCircle size={20} className="text-gray-500" /> Explore Talents
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 3. HOW IT WORKS */}
//       <section id="how-it-works" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
//             <p className="text-lg text-gray-600">Three simple steps to elevate your journey.</p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-12 relative">
//             {/* Connecting Line (Desktop) */}
//             <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10"></div>

//             {/* Step 1 */}
//             <div className="flex flex-col items-center text-center group">
//               <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition duration-300">
//                 <Upload size={40} className="text-blue-600 group-hover:text-white transition duration-300" />
//               </div>
//               <h3 className="text-xl font-bold mb-3">1. Upload Your Talent</h3>
//               <p className="text-gray-600 leading-relaxed">Share your skills in video or image format to your profile portfolio.</p>
//             </div>

//             {/* Step 2 */}
//             <div className="flex flex-col items-center text-center group">
//               <div className="w-24 h-24 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition duration-300">
//                 <MessageSquare size={40} className="text-purple-600 group-hover:text-white transition duration-300" />
//               </div>
//               <h3 className="text-xl font-bold mb-3">2. Get Feedback</h3>
//               <p className="text-gray-600 leading-relaxed">Connect with mentors to receive constructive critique and tips.</p>
//             </div>

//             {/* Step 3 */}
//             <div className="flex flex-col items-center text-center group">
//               <div className="w-24 h-24 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition duration-300">
//                 <TrendingUp size={40} className="text-green-600 group-hover:text-white transition duration-300" />
//               </div>
//               <h3 className="text-xl font-bold mb-3">3. Improve & Grow</h3>
//               <p className="text-gray-600 leading-relaxed">Refine your craft, build your audience, and reach new heights.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 4. FEATURED TALENTS */}
//       <section id="explore" className="py-20 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-end mb-12">
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Featured Talents</h2>
//               <p className="text-gray-600">Discover rising stars across various categories.</p>
//             </div>
//             <a href="#" className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-700">
//               View All <ArrowRight size={16} className="ml-1" />
//             </a>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {talents.map((talent) => (
//               <div key={talent.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group">
//                 <div className="relative h-64 overflow-hidden">
//                   <img 
//                     src={talent.image} 
//                     alt={talent.name} 
//                     className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                   />
//                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-gray-800">
//                     {talent.category}
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-2">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">{talent.name}</h3>
//                       <p className="text-sm text-gray-500">{talent.type}</p>
//                     </div>
//                   </div>
//                   <button className="w-full mt-4 py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
//                     View Profile
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 text-center md:hidden">
//             <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700">
//               View All Talents
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* 5. MENTOR SECTION */}
//       <section id="mentors" className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Learn From The Best</h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Our mentors are verified professionals ready to guide you through 1-on-1 sessions.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {mentors.map((mentor) => (
//               <div key={mentor.id} className="flex flex-col items-center p-6 rounded-2xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-lg transition text-center">
//                 <div className="relative mb-4">
//                   <img 
//                     src={mentor.image} 
//                     alt={mentor.name} 
//                     className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
//                   />
//                   <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
//                     <CheckCircle size={14} />
//                   </div>
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
//                 <p className="text-blue-600 text-sm font-medium mb-2">{mentor.role}</p>
//                 <p className="text-gray-500 text-sm mb-6 line-clamp-2">{mentor.bio}</p>
//                 <button className="w-full py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition">
//                   Book Session
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 6. CTA SECTION */}
//       <section className="py-20 bg-blue-600 relative overflow-hidden">
//         {/* Decorative Circles */}
//         <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
//         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
//           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
//             Ready to take your talent to the next level?
//           </h2>
//           <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
//             Join thousands of creators and mentors building the future of talent. Start your journey today.
//           </p>
//           <button className="px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-50 transition transform hover:scale-105">
//             Create Free Account
//           </button>
//           <p className="mt-4 text-blue-200 text-sm">No credit card required for signup</p>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div className="col-span-1 md:col-span-1">
//             <div className="flex items-center gap-2 mb-4 text-white">
//               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <Star className="text-white w-5 h-5" fill="currentColor" />
//               </div>
//               <span className="font-bold text-xl">TalentConnect</span>
//             </div>
//             <p className="text-sm">Empowering the world's hidden talents through connection and guidance.</p>
//           </div>
//           <div>
//             <h4 className="text-white font-bold mb-4">Platform</h4>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#" className="hover:text-white transition">Browse Talents</a></li>
//               <li><a href="#" className="hover:text-white transition">Find Mentors</a></li>
//               <li><a href="#" className="hover:text-white transition">Pricing</a></li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-white font-bold mb-4">Company</h4>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#" className="hover:text-white transition">About Us</a></li>
//               <li><a href="#" className="hover:text-white transition">Careers</a></li>
//               <li><a href="#" className="hover:text-white transition">Contact</a></li>
//             </ul>
//           </div>
//           <div>
//             <h4 className="text-white font-bold mb-4">Legal</h4>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
//               <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
//             </ul>
//           </div>
//         </div>
//         <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-sm">
//           &copy; {new Date().getFullYear()} TalentConnect. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

import React from 'react'
import LandingPage from './Landing'
import _layout from './Layout/_layout'
import { Route, Routes } from 'react-router-dom'
import ProfilePage from './globals/ProfilePage'
import MentorDiscoveryPage from './globals/mentors'
import MentorProfile from './globals/MentorProfile'
import TalentDiscoveryPage from './globals/ShowCase'
import Search from './globals/Search'
import ScrollToTop from './utils/Scroll'
import ExplorePage from './globals/Explore'
import TalentDiscovery from './globals/Discovery'
import RoadmapPage from './globals/rootmap'
import ProjectsPage from './globals/project'
import ExploreTalents from './globals/Exploretalent'
import StartJourney from './globals/Startjouney'
import PublicProfile from './UserProf/UserProfile'
import MentorMatchingPage from './globals/MentorMatching'
import MentorDashboard from './globals/mentorDash'
import MentorChatPage from './globals/MentoreChart'
import NotificationsEngine from './globals/Notification'
import UserProfilePage from './UserProf/profile'
const App = () => {
  return (
  <>
      <ScrollToTop/>
    <Routes>
      <Route path="/" element={<_layout />}>
        <Route index element={<LandingPage />} />
        <Route path='profile/:id' element={<ProfilePage />} />
      <Route path="/Mentors" >
      <Route index element={<MentorDiscoveryPage />} />
      <Route path=":id" element={<MentorProfile />} />
      </Route>
      <Route path="Showcase" element={<TalentDiscoveryPage />} />
      <Route path="ExploreTalents" element={<ExploreTalents />} />
      <Route path="Search" element={<Search />} />
      <Route path="StartJourney" element={<StartJourney />} />
      <Route path="TalentDiscovery" element={<TalentDiscovery />} />
      <Route path="PublicProfile" element={<PublicProfile />} />
      <Route path="MentorMatchingPage" >
      <Route index element={<MentorMatchingPage />} />
      <Route path=":id" element={<MentorDashboard />} />
      </Route>
      <Route path="Roadmap" element={<RoadmapPage />} />
      <Route path="MentorChatPage" element={<MentorChatPage />} />
      <Route path="ProjectsPage" element={<ProjectsPage />} />
      <Route path="Notifications" element={<NotificationsEngine />} />
      <Route path="UserProfilePage" element={<UserProfilePage />} />
      </Route>
    </Routes>
  </>
  )
}

export default App
