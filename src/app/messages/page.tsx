"use client";

import { useState, useRef, useEffect } from "react";
import { mockConversations, Conversation, Message } from "../../data/messages";
import Card from "@/components/Card";
import { Send, MessageSquare, Circle, ChevronLeft } from "lucide-react";

export default function MessagesPage() {
 
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
   
  const [activeChatId, setActiveChatId] = useState<string>("");
  
  const [inputMessage, setInputMessage] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate network latency for skeleton loader display
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const activeChat = conversations.find((c) => c.id === activeChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [activeChat?.messages, isLoading]);

  // Mark messages as read when a chat is opened
  useEffect(() => {
    if (activeChatId) {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeChatId ? { ...c, unreadCount: 0 } : c))
      );
    }
  }, [activeChatId]);

  // Clears out target unread badge notifications immediately 
  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
  };

  // Live dynamic context delivery action trigger injection
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatId) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: "1", // Hardcoded '1' represents you
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update conversation state with new message
    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            
            unreadCount: 0, 
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
      <div className="grid grid-cols-1 md:grid-cols-12 h-full bg-[var(--surface-card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
        
       {/* Sidebar: Conversation List */}
        <div className={`col-span-1 md:col-span-4 border-r border-[var(--border)] flex flex-col ${activeChatId ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-[var(--border)]">
            <h1 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[var(--primary)]" />
              Messages
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[var(--border)]">
            {isLoading ? (
                
              // Loading skeletons
              [1, 2, 3, 4].map((idx) => (
                <div key={idx} className="p-4 flex items-center gap-3 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-[var(--muted-bg)] flex-shrink-0" />
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="h-3.5 w-24 bg-[var(--muted-bg)] rounded" />
                    <div className="h-3 w-5/6 bg-[var(--muted-bg)] rounded" />
                  </div>
                </div>
              ))
            ) : (
              conversations.map((chat) => {
                const isSelected = chat.id === activeChatId;
                return (
                  <button
                    key={chat.id}
                    onClick={() => handleSelectChat(chat.id)}
                    className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${
                      isSelected 
                        ? "bg-[var(--primary-light)] border-l-4 border-[var(--primary)]" 
                        : "hover:bg-[var(--muted-bg)] border-l-4 border-transparent"
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
                        <span className="font-semibold text-sm text-[var(--foreground)] truncate">{chat.user.name}</span>
                        {chat.unreadCount > 0 && (
                          <span className="bg-[var(--primary)] text-white text-[10px] px-1.5 py-0.5 font-bold rounded-full">{chat.unreadCount}</span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--muted)] truncate mt-0.5">{chat.lastMessage}</p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* 2. RIGHT COLUMN BOX: ACTIVE LIVE CHAT DIALOG FRAME VIEW */}
        <div className={`col-span-1 md:col-span-8 flex flex-col h-full min-h-0 bg-[var(--muted-bg)]/30 ${!activeChatId ? "hidden md:flex" : "flex"}`}>
          {isLoading ? (
            /* Main Content Window Panel Dummy Placeholder Box */
            <div className="flex-1 flex flex-col p-4 space-y-4 animate-pulse">
              <div className="h-14 w-full bg-[var(--surface-card)] border border-[var(--border)] rounded-xl" />
              <div className="flex-1 bg-[var(--surface-card)]/40 rounded-xl" />
            </div>
          ) : activeChat ? (
            <>
              {/* Active Chat Window Top Header Bar  */}
              <div className="flex-shrink-0 p-4 bg-[var(--surface-card)] border-b border-[var(--border)] flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setActiveChatId("")} 
                    className="md:hidden p-1 rounded-lg hover:bg-[var(--muted-bg)] text-[var(--muted)]"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="relative">
                    <img src={activeChat.user.avatarUrl} alt={activeChat.user.name} className="w-10 h-10 rounded-full object-cover" />
                    {activeChat.user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--surface-card)]" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[var(--foreground)]">{activeChat.user.name}</h2>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[var(--muted)]">@{activeChat.user.username}</span>
                      <span className="text-[10px] text-[var(--muted)]">•</span>
                      <span className={`text-[11px] font-medium ${activeChat.user.isOnline ? "text-green-500" : "text-[var(--muted)]"}`}>
                        {activeChat.user.isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Message History Body Frame Area — only this scrolls */}
              <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-3">
                {activeChat.messages.map((msg) => {
                  const isMe = msg.senderId === "1";
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        isMe 
                          ? "bg-[var(--primary)] text-white rounded-br-none" 
                          : "bg-[var(--surface-card)] text-[var(--foreground)] rounded-bl-none border border-[var(--border)]"
                      }`}>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        <span className={`block text-[10px] text-right mt-1 ${isMe ? "text-white/60" : "text-[var(--muted)]"}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Real-time Message Input Panel Bar with Padding Separator — fixed at bottom */}
              <div className="flex-shrink-0 p-4 bg-[var(--surface-card)] border-t border-[var(--border)]">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type message..."
                    className="flex-1 px-4 py-2.5 bg-[var(--muted-bg)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 text-[var(--foreground)] placeholder:text-[var(--muted)]"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="p-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-40 text-white rounded-xl transition-all active:scale-95 flex items-center justify-center shadow-md shadow-[var(--primary)]/10"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* Blank Context Fallback Screen */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[var(--muted-bg)] flex items-center justify-center mb-3">
                <MessageSquare className="w-8 h-8 text-[var(--muted)]" />
              </div>
              <h3 className="font-bold text-[var(--foreground)]">Your Conversations</h3>
              <p className="text-sm text-[var(--muted)] max-w-xs mt-1">Select an active context channel list thread sidebar item to begin sending responsive messaging content asset strings instantly.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}