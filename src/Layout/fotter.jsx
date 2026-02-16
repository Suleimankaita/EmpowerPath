import { Camera, Globe, Heart, Instagram, Mic, Twitter, Youtube, Zap } from 'lucide-react'
import React from 'react'

const fotter = () => {
  return (
   <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 pt-16 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
               <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
                            <Zap size={18} className="md:w-6 md:h-6 fill-current" />
                          </div>
                          <span className="font-black text-sm md:text-xl tracking-tighter text-slate-900 dark:text-white">
                            Empower<span className="text-indigo-600">Path</span>
                          </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Elevating creators through community, mentorship, and opportunity.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Youtube size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-black mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Browse Talent</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Our Mentors</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Success Stories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Creator Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Video Guides</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500 font-medium flex flex-col md:flex-row justify-center items-center gap-2">
            <span>© {new Date().getFullYear()} TalentHub Inc. All rights reserved.</span>
            <span className="flex items-center gap-1">Made with <Heart size={14} className="text-red-500 fill-current" /> for creators.</span>
          </div>
        </div>
      </footer>
  )
}

export default fotter
