import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Compass, 
  Sparkles, 
  Target, 
  Zap, 
  ArrowRight, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  Code2,
  Palette,
  Swords,
  Trophy,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- MOCK DATA FOR THE ENGINE ---
const QUESTIONS = [
  {
    id: 1,
    text: "When faced with a free afternoon, what are you most likely drawn to?",
    options: [
      { id: 'tech', label: "Building or tinkering with software/gadgets", icon: <Code2 className="w-6 h-6" />, points: { tech: 3, logic: 1 } },
      { id: 'art', label: "Sketching, designing, or creating music", icon: <Palette className="w-6 h-6" />, points: { art: 3, creative: 1 } },
      { id: 'lead', label: "Organizing an event or guiding a group", icon: <Swords className="w-6 h-6" />, points: { leadership: 3, social: 1 } },
      { id: 'sports', label: "Training, competing, or physical activities", icon: <Trophy className="w-6 h-6" />, points: { sports: 3, physical: 1 } }
    ]
  },
  {
    id: 2,
    text: "How do you prefer to solve a difficult problem?",
    options: [
      { id: 'tech2', label: "Analyze the data and find a logical solution", icon: <Brain className="w-6 h-6" />, points: { tech: 2, logic: 3 } },
      { id: 'art2', label: "Brainstorm out-of-the-box, unconventional ideas", icon: <Sparkles className="w-6 h-6" />, points: { art: 2, creative: 3 } },
      { id: 'lead2', label: "Delegate tasks to the best people for the job", icon: <Target className="w-6 h-6" />, points: { leadership: 3, social: 2 } },
      { id: 'sports2', label: "Tackle it head-on with persistence and energy", icon: <Zap className="w-6 h-6" />, points: { sports: 2, physical: 3 } }
    ]
  },
  {
    id: 3,
    text: "What type of feedback motivates you the most?",
    options: [
      { id: 'tech3', label: "Seeing my system work flawlessly", icon: <CheckCircle2 className="w-6 h-6" />, points: { tech: 3, logic: 2 } },
      { id: 'art3', label: "Having someone feel moved by my work", icon: <Palette className="w-6 h-6" />, points: { art: 3, creative: 2 } },
      { id: 'lead3', label: "Watching my team succeed together", icon: <Swords className="w-6 h-6" />, points: { leadership: 3, social: 3 } },
      { id: 'sports3', label: "Beating my previous personal best", icon: <Trophy className="w-6 h-6" />, points: { sports: 3, physical: 2 } }
    ]
  }
];

const TalentDiscovery = () => {
  // --- STATE ARCHITECTURE ---
  const [assessmentStatus, setAssessmentStatus] = useState('idle'); // idle | active | processing | completed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [resultData, setResultData] = useState(null);

  const progressPercent = ((currentQuestionIndex) / QUESTIONS.length) * 100;

  // --- ENGINE LOGIC ---
  const handleSelectOption = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
    
    // Auto-advance after short delay for better UX
    setTimeout(() => {
      if (currentQuestionIndex < QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        processResults();
      }
    }, 400);
  };

  const processResults = () => {
    setAssessmentStatus('processing');
    
    // Simulate backend processing and score tallying
    setTimeout(() => {
      let scores = { tech: 0, art: 0, leadership: 0, sports: 0 };
      
      Object.values(answers).forEach(opt => {
        Object.entries(opt.points).forEach(([trait, val]) => {
          if (scores[trait] !== undefined) scores[trait] += val;
        });
      });

      // Sort talents by score
      const sortedTalents = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      
      // Calculate Confidence Score (Mock math: max possible score per trait is ~8)
      const maxPossible = 8; 
      const confidenceScore = Math.min(Math.round((sortedTalents[0][1] / maxPossible) * 100), 98);

      setResultData({
        primary: sortedTalents[0][0],
        confidence: confidenceScore,
        secondary: [sortedTalents[1][0]],
        strengths: ["Highly analytical thinking", "Strong focus under pressure", "Natural problem solver"],
        weaknesses: ["Can get lost in the details", "Sometimes forgets to ask for help"],
      });
      
      setAssessmentStatus('completed');
    }, 2500); // 2.5s fake loading
  };

  // --- ANIMATION VARIANTS ---
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  };

  // --- RENDER HELPERS ---
  const getTalentName = (key) => {
    const map = { tech: "Technology & Logic", art: "Creative Arts", leadership: "Leadership & Management", sports: "Athletics & Physical" };
    return map[key] || key;
  };

  const getTalentIcon = (key, className) => {
    const icons = { 
      tech: <Code2 className={className} />, 
      art: <Palette className={className} />, 
      leadership: <Swords className={className} />, 
      sports: <Trophy className={className} /> 
    };
    return icons[key];
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900 selection:bg-indigo-200">
      
      

      <main className="mt-20 flex-grow flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          
          {/* 1️⃣ INTRO SCREEN */}
          {assessmentStatus === 'idle' && (
            <motion.div key="intro" {...pageTransition} className="max-w-2xl w-full text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Brain className="w-10 h-10 text-indigo-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900">
                Discover Your True <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Talent Engine.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                This isn't a test. It's a mirror. Take 5 minutes to answer a few scenario-based questions honestly. We'll map your natural tendencies to a proven roadmap for success.
              </p>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col sm:flex-row justify-center gap-8 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-2 justify-center"><Zap className="w-5 h-5 text-amber-500" /> Takes 5-7 minutes</span>
                <span className="flex items-center gap-2 justify-center"><Target className="w-5 h-5 text-emerald-500" /> No right or wrong answers</span>
              </div>

              <button 
                onClick={() => setAssessmentStatus('active')}
                className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
              >
                Start Assessment <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* 2️⃣ QUESTION ENGINE */}
          {assessmentStatus === 'active' && (
            <motion.div key="engine" {...pageTransition} className="max-w-3xl w-full">
              {/* Progress Bar */}
              <div className="mb-10">
                <div className="flex justify-between text-sm font-bold text-slate-500 mb-3">
                  <span>Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
                  <span className="text-indigo-600">{Math.round(progressPercent)}% Completed</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-snug">
                  {QUESTIONS[currentQuestionIndex].text}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {QUESTIONS[currentQuestionIndex].options.map((option) => {
                    const isSelected = answers[QUESTIONS[currentQuestionIndex].id]?.id === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelectOption(QUESTIONS[currentQuestionIndex].id, option)}
                        className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col gap-4
                          ${isSelected 
                            ? 'border-indigo-600 bg-indigo-50 shadow-md scale-[1.02]' 
                            : 'border-slate-100 bg-white hover:border-indigo-200 hover:bg-slate-50'
                          }
                        `}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {option.icon}
                        </div>
                        <span className={`font-semibold text-lg ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                          {option.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-8 flex justify-between items-center px-4">
                <button 
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-2 font-medium transition-colors ${currentQuestionIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  <ChevronLeft className="w-5 h-5" /> Previous
                </button>
                <span className="text-sm text-slate-400 font-medium">Auto-saves locally</span>
              </div>
            </motion.div>
          )}

          {/* 3️⃣ PROCESSING SCREEN */}
          {assessmentStatus === 'processing' && (
            <motion.div key="processing" {...pageTransition} className="flex flex-col items-center justify-center text-center">
              <div className="relative w-32 h-32 mb-8">
                <div className="absolute inset-0 bg-indigo-200 rounded-full animate-ping opacity-50" />
                <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Synthesizing Your Profile...</h2>
              <p className="text-slate-500 font-medium animate-pulse">Mapping answers to 50+ career roadmaps.</p>
            </motion.div>
          )}

          {/* 4️⃣ RESULTS PAGE */}
          {assessmentStatus === 'completed' && resultData && (
            <motion.div key="results" {...pageTransition} className="max-w-4xl w-full">
              
              <div className="text-center mb-10">
                <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 font-bold rounded-full text-sm mb-4">
                  Analysis Complete
                </span>
                <h2 className="text-4xl font-extrabold text-slate-900">Your Talent Architecture</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                
                {/* Primary Talent (Spans 2 cols) */}
                <div className="md:col-span-2 bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl">
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/30 blur-[60px] rounded-full" />
                  
                  <div className="relative z-10">
                    <p className="text-indigo-300 font-semibold mb-2 uppercase tracking-wider text-sm">Primary Talent Dominance</p>
                    <h3 className="text-4xl font-extrabold mb-6 flex items-center gap-4">
                      {getTalentIcon(resultData.primary, "w-10 h-10 text-indigo-400")}
                      {getTalentName(resultData.primary)}
                    </h3>
                    <p className="text-slate-300 leading-relaxed max-w-lg mb-8">
                      You process the world through systems and logic. Your superpower lies in taking complex, messy problems and organizing them into working solutions.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                      <Target className="text-emerald-400 w-5 h-5" />
                      <span className="font-semibold text-emerald-400">{resultData.confidence}% Match Confidence</span>
                    </div>
                  </div>
                </div>

                {/* Secondary Talent */}
                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col justify-center">
                  <p className="text-slate-500 font-semibold mb-2 uppercase tracking-wider text-sm">Secondary Driver</p>
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                    {getTalentIcon(resultData.secondary[0], "w-8 h-8")}
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">{getTalentName(resultData.secondary[0])}</h4>
                  <p className="text-slate-500 text-sm">Supports your primary talent by adding creative problem-solving capabilities.</p>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                  <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
                    <Zap className="text-emerald-500" /> Core Strengths
                  </h4>
                  <ul className="space-y-4">
                    {resultData.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> {str}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                  <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
                    <Target className="text-rose-500" /> Growth Areas
                  </h4>
                  <ul className="space-y-4">
                    {resultData.weaknesses.map((weak, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" /> {weak}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
               <Link to={'/Roadmap'}>
                <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-indigo-200 hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-3">
                  View Your Custom Roadmap <ArrowRight className="w-6 h-6" />
                </button>
               </Link>
                <p className="mt-4 text-slate-500 text-sm font-medium">Includes curated role models based on your results.</p>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
};

export default TalentDiscovery;