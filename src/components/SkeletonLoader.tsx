"use client";

export default function SkeletonLoader() {
  return (
    <div className="w-full bg-[var(--surface-card)] border border-[var(--border)] rounded-2xl p-4 shadow-sm animate-pulse space-y-4">
      {/* User Header Info Block Row */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--muted-bg)]" />
        <div className="h-3.5 w-28 bg-[var(--muted-bg)] rounded-md" />
      </div>

      {/* Caption Line Placeholders */}
      <div className="space-y-2 pt-1">
        <div className="h-3 w-5/6 bg-[var(--muted-bg)] rounded-md" />
        <div className="h-3 w-1/2 bg-[var(--muted-bg)] rounded-md" />
      </div>

      {/* Mock Media Video Feed Box */}
      <div className="w-full h-48 bg-[var(--surface-elevated)] rounded-xl" />

      {/* Action Buttons Row */}
      <div className="flex items-center justify-between border-t border-[var(--border)] pt-3">
        <div className="h-4 w-12 bg-[var(--muted-bg)] rounded-md" />
        <div className="h-4 w-12 bg-[var(--muted-bg)] rounded-md" />
        <div className="h-4 w-12 bg-[var(--muted-bg)] rounded-md" />
        <div className="h-4 w-12 bg-[var(--muted-bg)] rounded-md" />
      </div>
    </div>
  );
}