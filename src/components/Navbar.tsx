"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { mockUsers } from "@/data/users";
import Modal from "@/components/Modal"; // Double check this path matches your folder structure
import {
  Home,
  Search,
  MessageSquare,
  Bell,
  Settings,
  Sun,
  Moon,
  Clock,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const searchRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Sync dark mode configuration settings
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") setIsDarkMode(false);
  }, []);

  // Safe window handler closing dropdown components on body clicks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setIsSearchFocused(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchFocused(false);
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    setIsProfileOpen(false);
    // Adjust route path if your signup/login page lives elsewhere (e.g., "/login")
    router.push("/"); 
  };

  // Filter logic checking username or display name matches
  const suggestions = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Notifications", href: "/notifications", icon: Bell },
  ];

  return (
    <>
      <nav className="bg-[var(--surface-card)] border-b border-[var(--border)] sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
          
          {/* Brand Logo & Wide Search Form Field */}
          <div className="flex items-center gap-6 flex-1 max-w-xl">
            <Link
              href="/"
              className="font-extrabold text-xl bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-transparent bg-clip-text shrink-0 tracking-tight"
            >
              SocialHub
            </Link>

            <div className="relative w-full hidden md:block" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-[var(--muted-bg)] text-[var(--foreground)] rounded-xl placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all border border-[var(--border)]"
                />
              </form>

              {/* Enhanced Search Popover Layer */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[var(--surface-card)] border border-[var(--border)] shadow-2xl rounded-xl overflow-hidden p-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase text-[var(--muted)]">
                    {searchQuery ? "Results" : "Recent Searches"}
                  </div>
                  
                  {suggestions.length > 0 ? (
                    <div className="space-y-0.5 mt-1">
                      {suggestions.slice(0, 4).map((user) => (
                        <button
                          key={user.id}
                          onMouseDown={() => {
                            setSearchQuery(""); // Clears the navbar text input immediately on search selection
                            setIsSearchFocused(false);
                            router.push(`/profile/${user.username}`);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--primary-light)] text-left transition-colors"
                        >
                          <img src={user.avatarUrl} className="w-8 h-8 rounded-full object-cover" alt="" />
                          <div>
                            <div className="text-xs font-semibold text-[var(--foreground)]">{user.name}</div>
                            <div className="text-[11px] text-[var(--muted)]">@{user.username}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    /* Clear Empty Feedback State Fix */
                    <div className="text-xs font-medium text-[var(--muted)] text-center py-6">
                      No results found for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Action Hub Link Collection */}
          <div className="flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-[var(--primary-light)] text-[var(--primary)]"
                      : "text-[var(--muted)] hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:inline">{item.name}</span>
                </Link>
              );
            })}

            <div className="h-4 w-px bg-[var(--border)] mx-1 hidden sm:block" />

            {/* Account Settings Dropdown Control Menu */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="flex items-center gap-1.5 p-1 rounded-xl hover:bg-[var(--muted-bg)] transition"
              >
                <img
                  src="/avatar1.jpeg"
                  alt="Account"
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-[var(--primary)]/30"
                />
                <ChevronDown className={`w-3.5 h-3.5 text-[var(--muted)] transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[var(--surface-card)] border border-[var(--border)] shadow-2xl rounded-xl overflow-hidden p-1 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4 text-[var(--muted)]" />
                    My Profile
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4 text-[var(--muted)]" />
                    Settings & Privacy
                  </Link>

                  <Link
                    href="/search"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--foreground)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)] rounded-lg transition-colors md:hidden"
                  >
                    <Search className="w-4 h-4 text-[var(--muted)]" />
                    Search
                  </Link>

                  <div className="h-px bg-[var(--border)] my-1" />

                  {/* Intercepts Logout redirection action directly with custom modal instead of dead page route */}
                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--danger)] hover:bg-[var(--danger)]/10 rounded-lg text-left transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>

            {/* Layout Palette Modifier Controls */}
            <button
              onClick={() => setIsDarkMode((prev) => !prev)}
              className="p-2 rounded-xl text-[var(--muted)] hover:bg-[var(--muted-bg)] transition"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[var(--accent)]" /> : <Moon className="w-4 h-4 text-[var(--primary)]" />}
            </button>

          </div>
        </div>
      </nav>

      {/* Embedded Action Confirmation Modal Overlay */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirm Logout"
      >
        <div className="space-y-4">
          <p className="text-[var(--muted)] text-xs leading-relaxed">
            Are you sure you want to sign out? 
          </p>
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--foreground)] bg-[var(--muted-bg)] hover:bg-[var(--border)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogoutConfirm}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--danger)] text-white hover:opacity-90 transition-opacity shadow-lg"
            >
              Log Out
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}