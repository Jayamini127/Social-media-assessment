"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      {/* Modal Box */}
      <div className="bg-[var(--surface-card)] border border-[var(--border)] w-full max-w-sm rounded-2xl shadow-xl overflow-hidden transform transition-all p-5 space-y-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
          <h3 className="text-sm font-bold text-[var(--foreground)]">{title}</h3>
          <button onClick={onClose} className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="text-xs text-[var(--muted)] leading-relaxed">
          {children}
        </div>

      </div>
    </div>
  );
}