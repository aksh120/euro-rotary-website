"use client";
import { ToggleLeft } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-display text-white mb-8">
        System Configuration
      </h1>

      <div className="space-y-6">
        <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Registration Status</h3>
            <p className="text-luxury-silver/50 text-sm">
              Control public access to the registration portal.
            </p>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <span className="text-xs font-mono uppercase">Active</span>
            <ToggleLeft className="w-8 h-8 rotate-180" />
          </div>
        </div>

        <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Currency Display</h3>
            <p className="text-luxury-silver/50 text-sm">
              Set the primary currency for financial dashboards.
            </p>
          </div>
          <select className="bg-black/40 border border-white/10 text-white text-sm rounded px-3 py-1">
            <option>INR (₹)</option>
            <option>EUR (€)</option>
            <option>USD ($)</option>
          </select>
        </div>

        <div className="bg-[#111] border border-white/5 p-6 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-white font-medium">Admin Notifications</h3>
            <p className="text-luxury-silver/50 text-sm">
              Receive email alerts for new registrations.
            </p>
          </div>
          <div className="flex items-center gap-2 text-luxury-gold">
            <span className="text-xs font-mono uppercase">Enabled</span>
            <ToggleLeft className="w-8 h-8 rotate-180" />
          </div>
        </div>
      </div>
    </div>
  );
}
