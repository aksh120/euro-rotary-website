"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Users, CreditCard, BarChart3 } from "lucide-react";
import Link from "next/link";
import { ParticipantsTable } from "@/components/admin/ParticipantsTable";

export default function AdminDashboard() {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchParticipants = useCallback(() => {
    fetch("/api/admin/participants")
      .then((res) => res.json())
      .then((data) => {
        setParticipants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchParticipants();
  }, [fetchParticipants]);

  const totalRegistrations = participants.length;
  const confirmed = participants.filter((p) => p.status === "confirmed").length;
  const pending = participants.filter((p) => p.status === "pending").length;
  const revenue = confirmed * 15000;

  return (
    <div className="p-4 md:p-8">
      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="relative bg-[#111] border border-white/5 p-6 rounded-2xl overflow-hidden group hover:border-luxury-gold/30 transition-all duration-500">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={40} className="text-white" />
          </div>
          <p className="text-luxury-silver/50 text-xs font-mono uppercase tracking-widest mb-2">
            Total Corps
          </p>
          <p className="text-4xl font-display text-white mb-1">
            {loading ? "..." : totalRegistrations}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-green-400 text-xs font-mono bg-green-500/10 px-1.5 py-0.5 rounded">
              +12%
            </span>
            <span className="text-luxury-silver/30 text-xs">vs last week</span>
          </div>
        </div>

        <div className="relative bg-[#111] border border-white/5 p-6 rounded-2xl overflow-hidden group hover:border-luxury-gold/30 transition-all duration-500">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-luxury-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard size={40} className="text-luxury-gold" />
          </div>
          <div className="relative z-10">
            <p className="text-luxury-silver/50 text-xs font-mono uppercase tracking-widest mb-2">
              Est. Revenue
            </p>
            <p className="text-4xl font-display text-luxury-gold mb-1">
              ₹{loading ? "..." : revenue.toLocaleString("en-IN")}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-green-400 text-xs font-mono bg-green-500/10 px-1.5 py-0.5 rounded">
                +5%
              </span>
              <span className="text-luxury-silver/30 text-xs">
                vs last week
              </span>
            </div>
          </div>
        </div>

        <div className="relative bg-[#111] border border-white/5 p-6 rounded-2xl overflow-hidden group hover:border-luxury-gold/30 transition-all duration-500">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <BarChart3 size={40} className="text-white" />
          </div>
          <p className="text-luxury-silver/50 text-xs font-mono uppercase tracking-widest mb-2">
            Pending Approvals
          </p>
          <p className="text-4xl font-display text-white mb-1">
            {loading ? "..." : pending}
          </p>
          <div className="w-full bg-white/5 h-1 mt-6 rounded-full overflow-hidden">
            <div className="bg-luxury-gold/50 h-full w-[40%]" />
          </div>
        </div>
      </div>

      {}
      <div className="bg-[#111]/80 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center bg-white/[0.02] gap-4">
          <div>
            <h3 className="text-lg font-display text-white">
              Recent Participants
            </h3>
            <p className="text-luxury-silver/40 text-xs mt-1">
              Real-time registration data
            </p>
          </div>
          <Link href="/admin/dashboard/participants">
            <Button
              size="sm"
              variant="outline"
              className="border-white/10 hover:bg-white/5 hover:text-white text-luxury-silver w-full md:w-auto"
            >
              View All
            </Button>
          </Link>
        </div>

        <ParticipantsTable
          participants={participants}
          loading={loading}
          onRefresh={fetchParticipants}
          limit={5}
        />
      </div>
    </div>
  );
}
