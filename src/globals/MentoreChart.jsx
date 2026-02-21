import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowLeft, Send, Paperclip, ShieldAlert, CheckCircle2, 
  Target, Rocket, Info, MoreVertical, Clock, Lock, 
  ExternalLink, ChevronRight, AlertCircle, Zap, X,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MentorChatPage = ({ isMinor = true, conversationId = "conv_123" }) => {
  // --- STATE MANAGEMENT ---
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [activeTask, setActiveTask] = useState("Phase 2: Database Schema");
  const [attachment, setAttachment] = useState(null);
  
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);

  // --- MOCK DATABASE / MESSAGE HISTORY ---
  const [messages, setMessages] = useState([
    { id: '1', role: 'system', content: 'Secure end-to-end encrypted session started.', type: 'timestamp' },
    { id: '2', role: 'mentor', content: "Hi! I saw you updated the ERD for the Eco-Tracker. Let's look at the indexing.", createdAt: '10:05 AM' },
  ]);

  // --- 1. SECURITY FILTER (MVP PROTECTIONS) ---
  const validateContent = (text) => {
    if (!isMinor) return { safe: true };
    
    // Regex to block emails and phone numbers (Safety Rule: No contact sharing)
    const contactRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)|(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;
    
    if (contactRegex.test(text)) {
      return { safe: false, error: "For safety, contact details cannot be shared in chat." };
    }
    return { safe: true };
  };

  // --- 2. REAL-TIME SIMULATION (SOCKET EMULATOR) ---
  const simulateMentorResponse = useCallback(() => {
    setTimeout(() => {
      const responses = [
        "That's a great question about the scaling strategy.",
        "I've just unlocked the 'Build Phase' milestone for you!",
        "Check your Roadmap, I added a note on Phase 3.",
      ];
      const randomMsg = responses[Math.floor(Math.random() * responses.length)];
      
      const mentorMsg = {
        id: Date.now().toString(),
        role: 'mentor',
        content: randomMsg,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, mentorMsg]);
      
      // Occasionally trigger a system milestone
      if (Math.random() > 0.7) {
        setMessages(prev => [...prev, {
          id: `sys-${Date.now()}`,
          role: 'system',
          content: 'Milestone Unlocked: Database Master',
          type: 'milestone',
          target: activeTask
        }]);
      }
    }, 2500);
  }, [activeTask]);

  // --- 3. FUNCTIONAL HANDLERS ---
  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!message.trim() && !attachment) return;

    const securityCheck = validateContent(message);
    if (!securityCheck.safe) {
      alert(securityCheck.error);
      return;
    }

    setIsSending(true);
    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      attachment: attachment ? attachment.name : null,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setAttachment(null);
    setIsSending(false);
    
    // Trigger simulated mentor reply
    simulateMentorResponse();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (isMinor && file.type.includes('link')) {
        alert("External link files are restricted.");
        return;
      }
      setAttachment(file);
    }
  };

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] font-sans antialiased overflow-hidden">
      
      {/* SAFETY BANNER */}
      {isMinor && (
        <div className="bg-slate-900 text-indigo-300 px-6 py-2.5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.15em]">
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} className="text-rose-500" />
            Protected Session: Parent Access Enabled
          </div>
          <div className="flex items-center gap-1 opacity-60">
            <Lock size={12} /> Encrypted
          </div>
        </div>
      )}

      {/* CHAT HEADER */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400">
            <ArrowLeft size={20} />
          </button>
          <div className="relative">
            <div className={`w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-black text-indigo-600 border border-indigo-200 overflow-hidden`}>
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" alt="Mentor" />
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-slate-300'}`} />
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight">Marcus Thorne</h1>
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Backend Architect</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase border border-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
            <Activity size={14} /> Analytics
          </button>
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl"><MoreVertical size={20} /></button>
        </div>
      </header>

      {/* CONVERSATION INFO BAR */}
      <div className="bg-white border-b border-slate-100 px-8 py-3 flex items-center gap-6 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 whitespace-nowrap">
          <Target size={14} className="text-indigo-500" />
          Roadmap: <span className="text-slate-900">{activeTask}</span>
        </div>
        <div className="h-4 w-px bg-slate-200 hidden md:block" />
        <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 whitespace-nowrap">
          <Rocket size={14} className="text-emerald-500" />
          Project: <span className="text-slate-900">Eco-Tracker API</span>
        </div>
      </div>

      {/* MESSAGE LIST */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            if (msg.role === 'system') {
              return (
                <div key={msg.id} className="flex flex-col items-center gap-3 my-6">
                  {msg.type === 'milestone' ? (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl flex items-center gap-4 shadow-xl shadow-indigo-100">
                      <Zap size={18} className="text-amber-300 fill-amber-300" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.1em]">{msg.content}</p>
                        <p className="text-[9px] font-bold opacity-70 uppercase">{msg.target}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-100/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200">
                      {msg.content}
                    </span>
                  )}
                </div>
              );
            }

            const isUser = msg.role === 'user';
            return (
              <motion.div key={msg.id} initial={{ opacity: 0, x: isUser ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] md:max-w-[65%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-2`}>
                  <div className={`px-5 py-4 rounded-[1.8rem] text-sm font-medium leading-relaxed shadow-sm ${isUser ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'}`}>
                    {msg.content}
                    {msg.attachment && (
                      <div className="mt-3 p-3 bg-black/10 rounded-xl flex items-center gap-2 text-xs border border-white/10">
                        <Paperclip size={14} /> {msg.attachment}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1.5 px-2">
                    {msg.createdAt} {isUser && <CheckCircle2 size={10} className="text-emerald-500" />}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </main>

      {/* INPUT BAR */}
      <footer className="bg-white border-t border-slate-200 p-6 space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0,0.02)]">
        
        {/* Attachment Preview */}
        {attachment && (
          <div className="max-w-4xl mx-auto flex items-center justify-between bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2">
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase">
              <Paperclip size={14} /> {attachment.name}
            </div>
            <button onClick={() => setAttachment(null)} className="text-indigo-400 hover:text-rose-500"><X size={16} /></button>
          </div>
        )}

        {/* Task Reference Panel */}
        <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-2">Link Task:</span>
           {["Database Schema", "Auth Flow", "API Docs"].map(task => (
             <button 
              key={task}
              onClick={() => setActiveTask(task)}
              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all whitespace-nowrap border ${activeTask === task ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400 hover:border-indigo-300'}`}
             >
               {task}
             </button>
           ))}
        </div>

        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
          />
          <button 
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100"
          >
            <Paperclip size={20} />
          </button>
          
          <div className="flex-1 relative flex items-center">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Discuss project progress..."
              className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] px-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          <button 
            disabled={(!message.trim() && !attachment) || isSending}
            className="p-4 bg-indigo-600 text-white rounded-[1.8rem] shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
          >
            {isSending ? <Clock className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </form>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MentorChatPage;