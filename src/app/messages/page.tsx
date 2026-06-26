"use client";

import { useState, useRef, useEffect } from "react";
import { mockConversations, Conversation, Message } from "../../data/messages";
import Card from "@/components/Card";
import { Send, MessageSquare, Circle, ChevronLeft } from "lucide-react";

export default function MessagesPage() {
  // Main reactive state array managing chat threads locally
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  
  // Track currently active selected chat channel
  const [activeChatId, setActiveChatId] = useState<string>("chat_1");
  
  // Input tracking state field for current keystrokes
  const [inputMessage, setInputMessage] = useState("");

  // Reference hooks to automatically scroll the chat container smoothly
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = conversations.find((c) => c.id === activeChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  // Clears out target unread badge notifications immediately upon activating a thread selection trigger
  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  // Live dynamic context delivery action trigger injection
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatId) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: "1", // Hardcoded '1' represents you (Alex)
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            lastMessage: newMsg.text,
            messages: [...chat.messages, newMsg],
          };
        }
        return chat;
      })
    );

    setInputMessage("");
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] min-h-[500px] py-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-12 h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        
        {/* 1. LEFT COLUMN SIDEBAR: CONVERSATION THREAD INDEX SELECTOR LIST */}
        <div className={`col-span-1 md:col-span-4 border-r border-slate-200 dark:border-slate-800 flex flex-col ${activeChatId ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/60">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-500" />
              Messages
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800/40">
            {conversations.map((chat) => {
              const isSelected = chat.id === activeChatId;
              return (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${
                    isSelected 
                      ? "bg-purple-500/10 dark:bg-purple-500/5 border-l-4 border-purple-500" 
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/30 border-l-4 border-transparent"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img src={chat.user.avatarUrl} alt={chat.user.name} className="w-12 h-12 rounded-full object-cover" />
                    {chat.user.isOnline && (
                      <Circle className="w-3.5 h-3.5 fill-green-500 text-white dark:text-slate-900 absolute bottom-0 right-0" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">{chat.user.name}</span>
                      {chat.unreadCount > 0 && (
                        <span className="bg-purple-600 text-white text-[10px] px-1.5 py-0.5 font-bold rounded-full">{chat.unreadCount}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{chat.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. RIGHT COLUMN BOX: ACTIVE LIVE CHAT DIALOG FRAME VIEW */}
        <div className={`col-span-1 md:col-span-8 flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/20 ${!activeChatId ? "hidden md:flex" : "flex"}`}>
          {activeChat ? (
            <>
              {/* FIXED ENHANCEMENT 1: Active Chat Window Top Header Bar */}
              <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setActiveChatId("")} 
                    className="md:hidden p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="relative">
                    <img src={activeChat.user.avatarUrl} alt={activeChat.user.name} className="w-10 h-10 rounded-full object-cover" />
                    {activeChat.user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-slate-50">{activeChat.user.name}</h2>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400">@{activeChat.user.username}</span>
                      <span className="text-[10px] text-slate-300 dark:text-slate-700">•</span>
                      <span className={`text-[11px] font-medium ${activeChat.user.isOnline ? "text-green-500" : "text-slate-400"}`}>
                        {activeChat.user.isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Message History Body Frame Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeChat.messages.map((msg) => {
                  const isMe = msg.senderId === "1";
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        isMe 
                          ? "bg-purple-600 text-white rounded-br-none" 
                          : "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-100 dark:border-slate-800"
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <span className={`block text-[10px] text-right mt-1 ${isMe ? "text-purple-200" : "text-slate-400"}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* FIXED ENHANCEMENT 2: Real-time Message Input Panel Bar with Padding Separator */}
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a secure response message..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-slate-900 dark:text-slate-100 placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="p-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-xl transition-all active:scale-95 flex items-center justify-center shadow-md shadow-purple-500/10"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* Blank Context Fallback Screen */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                <MessageSquare className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Your Conversations</h3>
              <p className="text-sm text-slate-400 max-w-xs mt-1">Select an active context channel list thread sidebar item to begin sending responsive messaging content asset strings instantly.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}