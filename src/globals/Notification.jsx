import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCheck, Settings, MessageSquare, Map, 
  Briefcase, AlertCircle, ArrowLeft, Send, 
  Paperclip, Search, Bell
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_NOTIFICATIONS = [
  {
    _id: "notif_1",
    type: "mentor_message",
    title: "New Mentor Reply",
    message: "Your Portfolio App improved tremendously! I left some specific suggestions on your latest commit regarding the state management. Let's discuss it before moving to Phase 3.",
    isRead: false,
    isReplyable: true,
    createdAt: "10 mins ago",
    sender: { name: "Sarah Jenkins", role: "Mentor", avatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=indigo&color=fff" },
    relatedEntity: { type: "project", name: "Portfolio App Phase 2" }
  },
  {
    _id: "notif_2",
    type: "roadmap_unlock",
    title: "Build Stage Unlocked \uD83C\uDF89",
    message: "Incredible work completing the fundamental modules! You have now unlocked the 'Advanced React Patterns' stage in your roadmap.",
    isRead: false,
    isReplyable: false,
    createdAt: "2 hours ago",
    sender: { name: "System", role: "system" },
    relatedEntity: { type: "roadmap", name: "Advanced React Patterns" }
  },
  {
    _id: "notif_3",
    type: "project_feedback",
    title: "Feedback added to Portfolio App",
    message: "Code review completed by your peer group. 3 comments require your attention.",
    isRead: true,
    isReplyable: true,
    createdAt: "Yesterday",
    sender: { name: "Code Review Bot", role: "system" },
    relatedEntity: { type: "project", name: "Portfolio App" }
  },
  {
    _id: "notif_4",
    type: "system_alert",
    title: "Profile 80% Complete",
    message: "You're almost there! Add your GitHub link to complete your profile and increase your visibility to mentors.",
    isRead: true,
    isReplyable: false,
    createdAt: "Oct 12",
    sender: { name: "System", role: "system" }
  }
];

const TABS = ["All", "Unread", "Mentors", "System", "Projects", "Roadmap"];

export default function NotificationsEngine() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Derived state
  const selectedNotif = notifications.find(n => n._id === selectedId);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Handlers
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    // Auto-mark as read when opened
    setNotifications(notifications.map(n => 
      n._id === id ? { ...n, isRead: true } : n
    ));
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    console.log("Sending reply to:", selectedId, "Payload:", replyText);
    setReplyText("");
    // In production: trigger POST /api/notifications/reply and update UI optimism
  };

  // Filtering Logic
  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "All") return true;
    if (activeTab === "Unread") return !n.isRead;
    if (activeTab === "Mentors") return n.type === "mentor_message";
    if (activeTab === "System") return n.type === "system_alert" || n.type === "roadmap_unlock";
    if (activeTab === "Projects") return n.type === "project_feedback";
    if (activeTab === "Roadmap") return n.type === "roadmap_unlock";
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case "mentor_message": return <MessageSquare className="text-indigo-500" size={20} />;
      case "roadmap_unlock": return <Map className="text-emerald-500" size={20} />;
      case "project_feedback": return <Briefcase className="text-blue-500" size={20} />;
      case "system_alert": return <AlertCircle className="text-amber-500" size={20} />;
      default: return <Bell className="text-slate-500" size={20} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      
      {/* LEFT PANEL: INBOX LIST */}
      <div className={`w-full md:w-[400px] lg:w-[450px] flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 ${selectedId ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Header */}
        <div className="p-5 pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Inbox
              {unreadCount > 0 && (
                <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} new
                </span>
              )}
            </h1>
            <div className="flex gap-2">
              <button 
                onClick={handleMarkAllRead}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Mark all as read"
              >
                <CheckCheck size={20} />
              </button>
              <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400">
              <Bell size={40} className="mb-3 opacity-20" />
              <p>No notifications found.</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={notif._id}
                onClick={() => handleSelect(notif._id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  selectedId === notif._id 
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20 dark:border-indigo-500 shadow-sm' 
                    : notif.isRead 
                      ? 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50' 
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 p-2 rounded-full ${notif.isRead ? 'bg-slate-100 dark:bg-slate-800' : 'bg-indigo-100 dark:bg-indigo-900/30'}`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <p className={`text-sm truncate pr-2 ${notif.isRead ? 'font-semibold text-slate-700 dark:text-slate-300' : 'font-bold text-slate-900 dark:text-white'}`}>
                        {notif.title}
                      </p>
                      <span className="text-xs text-slate-400 whitespace-nowrap">{notif.createdAt}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.isRead && (
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                  )}
                </div>
              </motion.button>
            ))
          )}
        </div>
      </div>

      {/* RIGHT PANEL: DETAIL VIEW */}
      <div className={`flex-1 flex-col bg-slate-50 dark:bg-slate-950 ${selectedId ? 'flex' : 'hidden md:flex'}`}>
        {selectedNotif ? (
          <div className="flex flex-col h-full max-w-4xl mx-auto w-full shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900/50">
            
            {/* Detail Header */}
            <div className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center px-6 shrink-0 bg-white dark:bg-slate-900">
              <button 
                className="md:hidden mr-4 p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                onClick={() => setSelectedId(null)}
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full">
                  {selectedNotif.type.replace('_', ' ')}
                </span>
                <span className="text-sm text-slate-400">{selectedNotif.createdAt}</span>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                {selectedNotif.title}
              </h2>
              
              <div className="flex items-center gap-4 mb-8">
                {selectedNotif.sender.avatar ? (
                  <img src={selectedNotif.sender.avatar} alt="Avatar" className="w-12 h-12 rounded-full shadow-sm" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <AlertCircle className="text-slate-500" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedNotif.sender.name}</p>
                  <p className="text-sm text-slate-500 capitalize">{selectedNotif.sender.role}</p>
                </div>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none mb-8">
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  {selectedNotif.message}
                </p>
              </div>

              {/* Related Entity Card */}
              {selectedNotif.relatedEntity && (
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between group cursor-pointer hover:border-indigo-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                      {selectedNotif.relatedEntity.type === 'project' ? <Briefcase size={20} className="text-indigo-500"/> : <Map size={20} className="text-emerald-500"/>}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">{selectedNotif.relatedEntity.type}</p>
                      <p className="font-bold text-slate-900 dark:text-white">{selectedNotif.relatedEntity.name}</p>
                    </div>
                  </div>
                  <button className="text-sm font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                  </button>
                </div>
              )}
            </div>

            {/* Sticky Reply Box */}
            {selectedNotif.isReplyable && (
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0">
                <form onSubmit={handleSendReply} className="relative">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 pl-4 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-14 min-h-[56px] shadow-sm"
                    rows={1}
                  />
                  <div className="absolute right-2 top-2 flex items-center gap-1">
                    <button type="button" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                      <Paperclip size={18} />
                    </button>
                    <button 
                      type="submit"
                      disabled={!replyText.trim()}
                      className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors flex items-center justify-center"
                    >
                      <Send size={18} className="ml-0.5" />
                    </button>
                  </div>
                </form>
                <p className="text-xs text-center text-slate-400 mt-2">
                  Replies are monitored for safety and constructive feedback.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="text-center text-slate-400">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium text-slate-500">Select a notification to view details</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}