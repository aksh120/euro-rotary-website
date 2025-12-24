"use client";
import { useState, useEffect, useCallback } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ParticipantsTable } from "@/components/admin/ParticipantsTable";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchParticipants = useCallback(() => {
    setLoading(true);
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
    fetchParticipants();
  }, [fetchParticipants]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display text-white mb-2">
            Participants Database
          </h1>
          <p className="text-luxury-silver/50 text-sm">
            Manage all registered entities.
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full md:w-auto border-luxury-gold/20 text-luxury-gold hover:bg-luxury-gold/10"
        >
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="bg-[#111]/80 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
        <ParticipantsTable
          participants={participants}
          loading={loading}
          onRefresh={fetchParticipants}
        />
      </div>
    </div>
  );
}
