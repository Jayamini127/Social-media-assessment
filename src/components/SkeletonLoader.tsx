"use client";

export default function SkeletonLoader() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm animate-pulse space-y-4">
      {/* User Header Info Block Row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-3.5 w-28 bg-slate-200 dark:bg-slate-800 rounded-md" />
      </div>

      {/* Caption Line Placeholders */}
      <div className="space-y-2 pt-1">
        <div className="h-3 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md" />
      </div>

      {/* Mock Media Video Feed Box */}
      <div className="w-full h-48 bg-slate-100 dark:bg-slate-800/60 rounded-xl" />

      {/* Action Buttons Row */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3">
        <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-md" />
        <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-md" />
      </div>
    </div>
  );
}