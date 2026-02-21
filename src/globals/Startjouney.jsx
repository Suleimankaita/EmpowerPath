import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Rocket, Target, Sparkles, Shield, User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StartJourney = () => {
  const [step, setStep] = useState(0); // 0: Welcome, 1: Age, 2: Interests, 3: Goals, 4: Account
  const [formData, setFormData] = useState({
    ageGroup: '',
    interests: [],
    goal: '',
    name: '',
    email: '',
    password: '',
    parentEmail: ''
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const steps = [
    { title: "Welcome", progress: 0 },
    { title: "Age", progress: 25 },
    { title: "Interests", progress: 50 },
    { title: "Goal", progress: 75 },
    { title: "Account", progress: 100 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* 1. MINIMAL HEADER */}
      <header className="py-6 px-8 flex justify-between items-center bg-white border-b border-slate-100">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Rocket size={18} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tight">EmpowerPath</span>
        </div>
        
        <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {step + 1} of 5</span>
            <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / 4) * 100}%` }}
                    className="h-full bg-indigo-600"
                />
            </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            
            {/* STEP 0: WELCOME */}
            {step === 0 && (
              <motion.div 
                key="welcome"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                    <Sparkles size={40} />
                </div>
                <h1 className="text-5xl font-black mb-6 tracking-tight">Let’s Discover Your Path.</h1>
                <p className="text-xl text-slate-500 mb-10 leading-relaxed">
                    Personalize your experience in less than 2 minutes. We'll help you turn natural interest into structured growth.
                </p>
                <button 
                  onClick={nextStep}
                  className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center gap-3 mx-auto"
                >
                  Start <ChevronRight size={24} />
                </button>
              </motion.div>
            )}

            {/* STEP 1: AGE SELECTION */}
            {step === 1 && (
              <motion.div 
                key="age"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-black mb-2 text-center">Select your age group</h2>
                <p className="text-slate-500 text-center mb-10">This helps us tailor roadmap depth and UI complexity.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { range: '10–15', label: 'Discovery', desc: 'Lightweight, fun intro to skills.' },
                    { range: '16–18', label: 'Exploration', desc: 'Preparing for higher education & gigs.' },
                    { range: '19–21', label: 'Development', desc: 'Focusing on career & specialization.' },
                    { range: '22–25', label: 'Execution', desc: 'Monetizing and professional scaling.' }
                  ].map((age) => (
                    <button
                      key={age.range}
                      onClick={() => { setFormData({...formData, ageGroup: age.range}); nextStep(); }}
                      className={`p-6 rounded-[2rem] border-2 text-left transition-all ${
                        formData.ageGroup === age.range ? 'border-indigo-600 bg-indigo-50/50 shadow-lg' : 'border-slate-100 bg-white hover:border-indigo-200'
                      }`}
                    >
                      <div className="text-2xl font-black text-indigo-600 mb-1">{age.range}</div>
                      <div className="font-bold text-slate-900 mb-2">{age.label}</div>
                      <div className="text-sm text-slate-500 leading-snug">{age.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: INTERESTS */}
            {step === 2 && (
              <motion.div 
                key="interests"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-black mb-2 text-center">What areas interest you most?</h2>
                <p className="text-slate-500 text-center mb-10 text-sm">Select all that apply.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                  {['Technology', 'Creative Arts', 'Business', 'Sports', 'Communication', 'Leadership'].map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`p-4 rounded-2xl border-2 font-bold transition-all text-center ${
                        formData.interests.includes(item) ? 'border-indigo-600 bg-indigo-600 text-white shadow-md' : 'border-slate-100 bg-white text-slate-600'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                    <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600">
                        <ChevronLeft size={20} /> Back
                    </button>
                    <button 
                        disabled={formData.interests.length === 0}
                        onClick={nextStep} 
                        className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold disabled:opacity-50"
                    >
                        Continue
                    </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: GOALS */}
            {step === 3 && (
              <motion.div 
                key="goal"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-3xl font-black mb-8 text-center">What do you want most right now?</h2>
                <div className="space-y-4 mb-10">
                  {[
                    { id: 'self', label: 'Understand myself better', icon: <User size={20} /> },
                    { id: 'skills', label: 'Build real-world skills', icon: <Target size={20} /> },
                    { id: 'income', label: 'Start earning income', icon: <Rocket size={20} /> },
                    { id: 'mentor', label: 'Find a mentor', icon: <Shield size={20} /> }
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => { setFormData({...formData, goal: goal.id}); nextStep(); }}
                      className={`w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                        formData.goal === goal.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600 font-bold' : 'border-slate-100 bg-white text-slate-600'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${formData.goal === goal.id ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>
                        {goal.icon}
                      </div>
                      {goal.label}
                    </button>
                  ))}
                </div>
                <button onClick={prevStep} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600">
                    <ChevronLeft size={20} /> Back
                </button>
              </motion.div>
            )}

            {/* STEP 4: ACCOUNT CREATION */}
            {step === 4 && (
              <motion.div 
                key="account"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black mb-2">Create Your Account</h2>
                    <p className="text-slate-500">Save your progress and start your talent discovery.</p>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="password" placeholder="Create Password" className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  
                  {/* DYNAMIC PARENT EMAIL FOR UNDER 18 */}
                  {(formData.ageGroup === '10–15' || formData.ageGroup === '16–18') && (
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                        <div className="flex gap-2 items-center text-amber-800 font-bold text-sm mb-2">
                            <Shield size={16} /> Parent/Guardian Verification
                        </div>
                        <input type="email" placeholder="Parent Email" className="w-full px-4 py-3 rounded-lg border border-amber-200 outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                  )}
                </div>

                <button 
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
                  onClick={() => window.location.href = '/TalentDiscovery'}
                >
                  Begin Talent Discovery <CheckCircle2 size={24} />
                </button>
                <button onClick={prevStep} className="mt-6 flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 mx-auto">
                    <ChevronLeft size={20} /> Back
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* FOOTER INFO */}
      <footer className="py-8 px-6 text-center text-slate-400 text-sm">
        By continuing, you agree to the EmpowerPath Terms of Growth and Privacy Policy.
      </footer>
    </div>
  );
};

export default StartJourney;