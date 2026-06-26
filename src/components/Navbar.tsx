"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, MessageSquare, Bell, User, Settings, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  // 1. Theme State Control (Defaults to dark mode to match your settings default state)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // 2. Sync state changes directly to the DOM HTML element root
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // 3. Listen to external changes (e.g., if a user flips the theme inside the settings page view)
  useEffect(() => {
    const handleClassChange = () => {
      const hasDark = window.document.documentElement.classList.contains("dark");
      setIsDarkMode(hasDark);
    };

    // Use a MutationObserver to watch if another page changes the root element's class
    const observer = new MutationObserver(handleClassChange);
    observer.observe(window.document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Initial check on render
    handleClassChange();

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Branding Logo using Purple/Orange gradient */}
        <div className="font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500 shrink-0">
          SocialHub
        </div>

        {/* Dynamic Navigation Links + Integrated Theme Toggle */}
        <div className="flex items-center gap-1 md:gap-3 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? "bg-purple-50 dark:bg-slate-800 text-purple-600 dark:text-orange-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            );
          })}

          {/* 💡 THEME TOGGLE: Placed clean at the end of nav items list for full compliance */}
          <div className="pl-1 border-l border-slate-200 dark:border-slate-800 ml-1 flex items-center">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Theme Mode Selector"
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-orange-400 transition-transform duration-200 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-purple-500 transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}