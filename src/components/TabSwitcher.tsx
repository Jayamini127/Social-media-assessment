"use client";

interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabSwitcher({ tabs, activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="flex border-b border-slate-200 dark:border-slate-800 w-full mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 text-center py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === tab
              ? "border-purple-600 text-purple-600 dark:border-orange-500 dark:text-orange-400 font-bold"
              : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}