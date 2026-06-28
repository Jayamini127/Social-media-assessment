"use client";

import { useState, useEffect } from "react";
import { mockNotifications, NotificationItem } from "../../data/notifications";
import Card from "@/components/Card";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Heart, MessageCircle, UserPlus, AtSign, Check, Bell } from "lucide-react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filters = ["All", "Likes", "Comments", "Follows", "Mentions"];

  // Filter notifications based on category selected by user
  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Likes") return notif.type === "like";
    if (activeFilter === "Comments") return notif.type === "comment";
    if (activeFilter === "Follows") return notif.type === "follow";
    if (activeFilter === "Mentions") return notif.type === "mention";
    return true;
  });

  // Updates local state to reflect read/unread status
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => 
      prev.map((notif) => ({ 
        ...notif, 
        isRead: true 
      }))
    );
  };

  // Maps notification types to appropriate Lucide icons and colors
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />;
      case "comment":
        return <MessageCircle className="w-3.5 h-3.5 fill-purple-500 text-purple-500" />;
      case "follow":
        return <UserPlus className="w-3.5 h-3.5 text-blue-500" />;
      case "mention":
        return <AtSign className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-4">
      
      {/* Header Panel */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm w-full">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Bell className="w-5 h-5 text-slate-800 dark:text-slate-200" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-50">Notifications</h1>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:opacity-80 transition-opacity"
          >
            <Check className="w-3.5 h-3.5" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Options */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 w-full scrollbar-none">
        {filters.map((filter) => {
          const isSelected = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full border whitespace-nowrap transition-all duration-150 ${
                isSelected
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Main List */}
      {isLoading ? (
        <div className="space-y-4 w-full">
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      ) : filteredNotifications.length > 0 ? (
        <div className="space-y-3 w-full">
          {filteredNotifications.map((notif) => (
            <div 
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              
              className={`w-full text-left transition-all duration-200 rounded-2xl overflow-hidden ${
                !notif.isRead 
                  ? "ring-1 ring-purple-500/30 dark:ring-purple-500/20 shadow-md shadow-purple-500/[0.04]" 
                  : "shadow-sm"
              }`}
            >
              <Card>
                
                {!notif.isRead && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-l-2xl" />
                )}

                <div className={`flex items-start gap-3 relative pr-6 ${!notif.isRead ? "pl-2" : ""}`}>
                  
                  <div className="relative flex-shrink-0">
                    <img src={notif.user.avatarUrl} alt={notif.user.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center shadow-sm">
                      {getNotificationIcon(notif.type)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">
                     
                      <span className={`font-bold mr-1 ${
                        notif.isRead 
                          ? "text-slate-700 dark:text-slate-300" 
                          : "text-slate-900 dark:text-slate-50"
                      }`}>
                        {notif.user.name}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500 text-xs">@{notif.user.username}</span>
                    </p>
                    
                   
                    <p className={`text-sm mt-0.5 break-words ${
                      notif.isRead 
                        ? "text-slate-500 dark:text-slate-400" 
                        : "text-slate-800 dark:text-slate-200"
                    }`}>
                      {notif.details}
                    </p>
                    
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-1">
                      {notif.timestamp}
                    </span>
                  </div>

                  
                  {!notif.isRead && (
                    <div className="absolute top-1/2 right-1 -translate-y-1/2 flex-shrink-0">
                      <div className="w-2 h-2 bg-purple-500 rounded-full shadow-sm shadow-purple-500/50" />
                    </div>
                  )}

                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6 w-full">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">No notifications found</h3>
        </div>
      )}
    </div>
  );
}