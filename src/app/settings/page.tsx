"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import { 
  User, 
  Bell, 
  Eye, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Sliders, 
  Smartphone, 
  Languages,
  Moon,
  Sun
} from "lucide-react";

export default function SettingsPage() {
  // Real-world interactive state switches
  const [isPrivate, setIsPrivate] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [activityStatus, setActivityStatus] = useState(true);
  
  // Track theme state (defaulting to dark mode)
  const [isDarkMode, setIsDarkMode] = useState(true); 

  // EFFECT HOOK: This actively updates Tailwind's html class list when the button is clicked!
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Reusable Component Modal UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  // Helper trigger to launch the reusable modal
  const openModalFeature = (title: string, message: string) => {
    setModalTitle(title);
    setModalContent(message);
    setIsModalOpen(true);
  };

  const handleLogoutClick = () => {
    openModalFeature(
      "Session Terminal", 
      "Are you sure you want to log out of your TikTok-UI session? In production environments, this action securely flushes localized cookies and authentication hashes."
    );
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-4">
      
      {/* 1. Header Row */}
      <div className="flex items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm w-full transition-colors duration-200">
        <Sliders className="w-5 h-5 text-purple-500" />
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-50">Settings and privacy</h1>
      </div>

      <div className="space-y-4 w-full">
        
        {/* SECTION 1: WORKING THEME & DISPLAY CONTROL */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pl-4">Display Mode</p>
          <Card>
            <div className="w-full flex items-center justify-between py-1 text-left">
              <div className="flex items-center gap-3">
                {isDarkMode ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-orange-400" />}
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Interface Theme</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Switch between light settings and optimized dark contrasts.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-all shadow-sm"
              >
                Switch to {isDarkMode ? "Light" : "Dark"} Mode
              </button>
            </div>
          </Card>
        </div>
        
        {/* SECTION 2: ACCOUNT CATEGORY */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pl-4">Account</p>
          <Card>
            <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
              
              <button 
                onClick={() => openModalFeature("Manage Account Details", "The account management interface enables direct database overrides for altering primary emails, recovery phone tokens, and regional security configurations.")}
                className="w-full flex items-center justify-between py-3 text-left transition-colors hover:opacity-80"
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Manage account</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Edit your login details, phone number, and email.</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <div className="w-full flex items-center justify-between py-3 text-left pt-4">
                <div className="flex items-center gap-3">
                  <Eye className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Private account</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">With a private account, only users you approve can follow you.</p>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={isPrivate}
                  onChange={() => setIsPrivate(!isPrivate)}
                  className="w-4 h-4 accent-purple-500 cursor-pointer rounded-md" 
                />
              </div>

            </div>
          </Card>
        </div>

        {/* SECTION 3: CONTENT & ACTIVITY CATEGORY */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pl-4">Content & Activity</p>
          <Card>
            <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
              
              <div className="w-full flex items-center justify-between py-3 text-left">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Push notifications</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Turn on/off immediate visual alerts for updates.</p>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={pushNotifs}
                  onChange={() => setPushNotifs(!pushNotifs)}
                  className="w-4 h-4 accent-purple-500 cursor-pointer rounded-md" 
                />
              </div>

              <div className="w-full flex items-center justify-between py-3 text-left pt-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Activity status</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">When turned on, followers see when you are active.</p>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={activityStatus}
                  onChange={() => setActivityStatus(!activityStatus)}
                  className="w-4 h-4 accent-purple-500 cursor-pointer rounded-md" 
                />
              </div>

              <button 
                onClick={() => openModalFeature("Language Translation Matrix", "Localization settings handle rendering resource content dictionaries. Supported defaults include English (US), Español, and custom locale keys.")}
                className="w-full flex items-center justify-between py-3 text-left pt-4 transition-colors hover:opacity-80"
              >
                <div className="flex items-center gap-3">
                  <Languages className="w-4 h-4 text-emerald-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">App language</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">English (US)</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

            </div>
          </Card>
        </div>

        {/* SECTION 4: SUPPORT & LOGOUT */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pl-4">Support</p>
          <Card>
            <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
              
              <button 
                onClick={() => openModalFeature("Help Desk & Guidelines", "Routes to the community reporting server. This platform manages analytics documentation, ticketing logs, and user security policies.")}
                className="w-full flex items-center justify-between py-3 text-left transition-colors hover:opacity-80"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Help Center & Reporting</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>

              <button 
                onClick={handleLogoutClick}
                className="w-full flex items-center justify-between py-3 text-left pt-4 transition-colors hover:opacity-80 group text-slate-400"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4 text-red-500 transition-transform group-hover:-translate-x-0.5" />
                  <p className="text-sm font-semibold text-red-500">Log out</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-700" />
              </button>

            </div>
          </Card>
        </div>

      </div>

      {/* REUSABLE PROTOTYPE MODAL INJECTION */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
      >
        <p>{modalContent}</p>
      </Modal>

    </div>
  );
}