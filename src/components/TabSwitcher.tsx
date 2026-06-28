"use client";

interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabSwitcher({ tabs, activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="flex border-b border-[var(--border)] w-full mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 text-center py-3 text-sm font-semibold border-b-2 transition-all ${
            activeTab === tab
              ? "border-[var(--primary)] text-[var(--primary)] font-bold"
              : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}