"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-[var(--surface-card)] border border-[var(--border)] rounded-2xl p-4 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}