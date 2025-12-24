"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  Users,
  CreditCard,
  Calendar,
  BarChart3,
  Settings,
  Menu,
  X,
  Mail,
} from "lucide-react";

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  return (
    <>
      {}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
                fixed md:static inset-y-0 left-0 z-50
                w-64 bg-black/80 md:bg-black/40 border-r border-white/5 backdrop-blur-xl 
                flex flex-col
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
      >
        <div className="p-8 pb-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-luxury-gold flex items-center justify-center rounded-sm">
              <span className="text-black font-bold font-display text-lg">
                E
              </span>
            </div>
            <span className="text-xl font-bold font-display tracking-[0.1em] text-white">
              EURO<span className="font-light text-luxury-silver">ADMIN</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="md:hidden text-white/50 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="text-luxury-silver/30 text-[10px] uppercase tracking-widest font-mono mb-4">
            Main Menu
          </p>
          <nav className="space-y-1">
            {[
              { href: "/admin/dashboard", icon: BarChart3, label: "Overview" },
              {
                href: "/admin/dashboard/participants",
                icon: Users,
                label: "Participants",
              },
              {
                href: "/admin/dashboard/payments",
                icon: CreditCard,
                label: "Payments",
              },
              {
                href: "/admin/dashboard/newsletter",
                icon: Mail,
                label: "Newsletter",
              },
              {
                href: "/admin/dashboard/analytics",
                icon: BarChart3,
                label: "Analytics",
              },
            ].map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onClose()}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                    isActive
                      ? "bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                      : "text-luxury-silver/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon
                    size={18}
                    className={
                      isActive
                        ? "text-luxury-gold"
                        : "group-hover:text-white transition-colors"
                    }
                  />
                  <span className="text-sm font-medium tracking-wide">
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-luxury-gold blur-[1px]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/5">
          <button
            onClick={async () => {
              const { createClient } = await import("@/lib/supabase/client");
              const supabase = createClient();
              await supabase.auth.signOut();
              window.location.href = "/admin";
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-luxury-silver/40 hover:text-red-400 hover:bg-red-500/5 transition-colors group"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">System Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export function Header({
  title,
  onMenuClick,
}: {
  title: string;
  onMenuClick: () => void;
}) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4 md:py-5 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-white/70 hover:text-white p-1"
        >
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-xl md:text-2xl font-display text-white mb-1">
            {title}
          </h2>
          <p
            className="hidden md:block text-luxury-silver/40 text-xs font-mono uppercase tracking-wider"
            suppressHydrationWarning
          >
            System Operational • {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative group hidden md:block">
          <input
            type="text"
            placeholder="Search database..."
            className="bg-[#111] border border-white/10 rounded-full py-2.5 pl-5 pr-4 text-sm text-white placeholder:text-white/20 focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/20 outline-none w-72 transition-all"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-luxury-silver hover:text-white hover:bg-white/10 transition-colors"
          >
            <Settings size={18} />
          </button>
          {}
          {isNotifOpen && (
            <div className="absolute top-12 right-0 w-64 bg-[#111] border border-white/10 rounded-xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 z-50">
              <h4 className="text-white text-sm font-bold mb-3">
                Quick Settings
              </h4>
              <div className="space-y-2">
                <Link
                  href="/admin/dashboard/settings"
                  className="block text-luxury-silver hover:text-luxury-gold text-sm py-1"
                >
                  Full Settings
                </Link>
                <button className="block text-luxury-silver hover:text-luxury-gold text-sm py-1 w-full text-left">
                  Notifications: On
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-gold to-yellow-600 p-[1px]">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <span className="text-luxury-gold font-bold text-xs">AD</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] flex overflow-hidden font-sans relative">
      {}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 overflow-y-auto relative z-10 flex flex-col w-full">
        <Header title="Dashboard" onMenuClick={() => setIsSidebarOpen(true)} />
        {children}
      </main>
    </div>
  );
}
