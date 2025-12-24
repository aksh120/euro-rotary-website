"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Mail, Send, Loader2, Plus, Trash2, Calendar } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
  unsubscribed: boolean;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const supabase = createClient();

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from("newsletter_subscriptions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/admin/newsletter/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message: body }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert(`Successfully sent to ${data.count} subscribers.`);
      setIsComposeOpen(false);
      setSubject("");
      setBody("");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Newsletter
          </h1>
          <p className="text-luxury-silver/60">
            Manage subscribers and send global updates.
          </p>
        </div>
        <button
          onClick={() => setIsComposeOpen(true)}
          className="flex items-center gap-2 bg-luxury-gold text-black px-5 py-2.5 rounded-lg font-bold hover:bg-white transition-colors"
        >
          <Send size={18} />
          <span>Compose Email</span>
        </button>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
          <h3 className="text-luxury-silver/50 text-xs font-mono uppercase tracking-widest mb-2">
            Total Subscribers
          </h3>
          <p className="text-3xl font-display text-white">
            {subscribers.length}
          </p>
        </div>
        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
          <h3 className="text-luxury-silver/50 text-xs font-mono uppercase tracking-widest mb-2">
            Active
          </h3>
          <p className="text-3xl font-display text-green-500">
            {subscribers.filter((s) => !s.unsubscribed).length}
          </p>
        </div>
        <div className="bg-[#111] border border-white/5 p-6 rounded-2xl">
          <h3 className="text-luxury-silver/50 text-xs font-mono uppercase tracking-widest mb-2">
            Unsubscribed
          </h3>
          <p className="text-3xl font-display text-red-500">
            {subscribers.filter((s) => s.unsubscribed).length}
          </p>
        </div>
      </div>

      {}
      <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-luxury-silver/50 text-xs font-mono uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-luxury-silver">
              {loading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center">
                    <Loader2 className="animate-spin mx-auto text-luxury-gold" />
                  </td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-luxury-silver/40"
                  >
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {sub.email}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-luxury-gold/50" />
                        {new Date(sub.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${sub.unsubscribed ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}
                      >
                        {sub.unsubscribed ? "Unsubscribed" : "Active"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {}
      <Modal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        title="New Campaign"
      >
        <form onSubmit={handleSend} className="space-y-6">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-luxury-silver/50 mb-2">
              Subject Line
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. The Route Reveal..."
              className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/20 transition-all font-display tracking-wide"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-luxury-silver/50 mb-2">
              Message Body
            </label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your update here. Basic HTML is supported but plaintext looks great too."
              rows={8}
              className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-luxury-gold/50 focus:ring-1 focus:ring-luxury-gold/20 transition-all text-sm leading-relaxed"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setIsComposeOpen(false)}
              className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending}
              className="flex-[2] bg-luxury-gold hover:bg-white text-black font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {sending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <RefreshSendIcon />
              )}
              <span>{sending ? "Sending..." : "Send Broadcast"}</span>
            </button>
          </div>

          <p className="text-center text-xs text-luxury-silver/30">
            This will be sent to{" "}
            {subscribers.filter((s) => !s.unsubscribed).length} active
            subscribers immediately.
          </p>
        </form>
      </Modal>
    </div>
  );
}

function RefreshSendIcon() {
  return <Send size={18} />;
}
