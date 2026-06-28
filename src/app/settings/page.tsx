"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast"; // 1. Added import
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import ThemeToggle from "@/components/ThemeToggle";
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
  Check
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [isPrivate, setIsPrivate] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [activityStatus, setActivityStatus] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isLogoutAction, setIsLogoutAction] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");

  // Handlers with Toast Messages 

  const togglePrivate = () => {
    setIsPrivate(!isPrivate);
    toast.success(!isPrivate ? "Account is now private" : "Account is now public");
  };

  const toggleNotifications = () => {
    setPushNotifs(!pushNotifs);
    toast.success(pushNotifs ? "Push notifications disabled" : "Push notifications enabled");
  };

  const toggleActivity = () => {
    setActivityStatus(!activityStatus);
    toast.success(activityStatus ? "Activity status hidden" : "Activity status visible");
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setIsModalOpen(false);
    toast.success(`Language changed to ${lang}`);
  };

  // 

  const openModalFeature = (title: string, message: string, isLogout = false) => {
    setModalTitle(title);
    setModalContent(message);
    setIsLogoutAction(isLogout);
    setIsModalOpen(true);
  };

  const handleLogoutClick = () => {
    openModalFeature(
      "Log Out", 
      "Are you sure you want to log out? You will need to log back in to see your personal feed and saved items.",
      true
    );
  };

  const confirmModalAction = () => {
    setIsModalOpen(false);
    if (isLogoutAction) {
      toast("Logging out...", { icon: '👋' });
      router.push("/");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-4">
      {/* Header Row */}
      <div className="flex items-center gap-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm w-full transition-colors duration-200">
        <Sliders className="w-5 h-5 text-purple-500" />
        <h1 className="text-lg font-bold text-slate-900 dark:text-slate-50">Settings and privacy</h1>
      </div>

      <div className="space-y-4 w-full">
        {/* Display Mode */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pl-4">Display Mode</p>
          <Card>
            <div className="w-full flex items-center justify-between py-1 text-left">
              <div className="flex items-center gap-3">
                <Moon className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Interface Theme</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Switch between light settings and optimized dark contrasts.</p>
                </div>
              </div>
              <ThemeToggle /> 
            </div>
          </Card>
        </div>
        
        {/* Account Settings */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pl-4">Account</p>
          <Card>
            <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
              <button 
                onClick={() => openModalFeature("Manage Account", "This feature isn't available in this demo.", false)}
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
                <button 
                  onClick={togglePrivate}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${isPrivate ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isPrivate ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Content & Activity */}
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
                <button 
                  onClick={toggleNotifications}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${pushNotifs ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${pushNotifs ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="w-full flex items-center justify-between py-3 text-left pt-4">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">Activity status</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">When turned on, followers see when you are active.</p>
                  </div>
                </div>
                <button 
                  onClick={toggleActivity}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-200 ${activityStatus ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${activityStatus ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>

              <button 
                onClick={() => openModalFeature("App Language", "SELECT_LANGUAGE_LAYOUT_MARKER", false)}
                className="w-full flex items-center justify-between py-3 text-left pt-4 transition-colors hover:opacity-80"
              >
                <div className="flex items-center gap-3">
                  <Languages className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">App language</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{selectedLanguage}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </Card>
        </div>

        {/* Support & Logout */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 pl-4">Support</p>
          <Card>
            <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
              <button 
                onClick={() => openModalFeature("Help Center & Reporting", "...", false)}
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
                  <LogOut className="w-4 h-4 text-red-500" />
                  <p className="text-sm font-semibold text-red-500">Log out</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 dark:text-slate-700" />
              </button>
            </div>
          </Card>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle}>
        <div className="text-sm text-slate-600 dark:text-slate-300 pt-1">
          {modalContent === "SELECT_LANGUAGE_LAYOUT_MARKER" ? (
            <div className="space-y-1">
              {["English (US)", "Sinhala", "Tamil"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                >
                  <span className={`text-sm ${selectedLanguage === lang ? "text-purple-600 font-semibold" : "text-slate-700"}`}>
                    {lang}
                  </span>
                  {selectedLanguage === lang && <Check className="w-4 h-4 text-purple-600" />}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <p>{modalContent}</p>
              <div className="flex items-center justify-end gap-2 pt-2">
                {isLogoutAction && (
                  <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 transition-colors">
                    Cancel
                  </button>
                )}
                <button onClick={confirmModalAction} className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                  Ok
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}