"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-luxury-black relative">
      <div className="absolute inset-0 z-0 opacity-30 bg-[url('/hero-bg.png')] bg-cover" />
      <div className="relative z-10 w-full max-w-md p-8 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-display text-luxury-gold text-center mb-1">
          Admin Portal
        </h1>
        <p className="text-center text-luxury-silver text-xs uppercase tracking-widest mb-8">
          Restricted Access
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs text-center">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs uppercase text-luxury-silver tracking-wider">
              Email Credentials
            </label>
            <input
              type="email"
              className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-luxury-gold outline-none transition-colors"
              placeholder="admin@euro-rotary.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase text-luxury-silver tracking-wider">
              Password
            </label>
            <input
              type="password"
              className="w-full bg-black/40 border border-white/10 p-3 rounded text-white focus:border-luxury-gold outline-none transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button className="w-full mt-4" isLoading={loading}>
            Secure Login
          </Button>
        </form>
      </div>
    </div>
  );
}
