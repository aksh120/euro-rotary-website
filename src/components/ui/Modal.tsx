"use client";
import { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {}
      <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden z-[101]">
        {}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <h3 className="text-lg font-display text-white tracking-wide">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-luxury-silver/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
