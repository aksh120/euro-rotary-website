"use client";

import { useState } from "react";
import { Send, Check, Loader2, AlertCircle } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Subscription failed");

      setStatus("success");
      setMessage(data.message || "Welcome to the inner circle.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={status === "loading" || status === "success"}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-luxury-gold/50 focus:bg-white/10 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="bg-luxury-gold text-black font-bold font-display uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
        >
          {status === "loading" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : status === "success" ? (
            <>
              <span>Joined</span>
              <Check size={16} />
            </>
          ) : (
            <>
              <span>Subscribe</span>
              <Send size={16} />
            </>
          )}
        </button>
      </form>

      {}
      {status !== "idle" && (status === "error" || status === "success") && (
        <div
          className={`mt-3 text-sm flex items-center gap-2 ${status === "error" ? "text-red-400" : "text-green-400"}`}
        >
          {status === "error" ? <AlertCircle size={14} /> : <Check size={14} />}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
