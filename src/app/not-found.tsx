"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden">
      {}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/5 blur-[100px] rounded-full pointer-events-none" />

      {}
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-display font-bold text-white/[0.02] leading-none select-none pointer-events-none tracking-tighter">
        404
      </h1>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.1)]"
        >
          <MapPinOff size={40} className="text-luxury-gold" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-6xl font-display text-white mb-4">
            Off{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-white">
              Track?
            </span>
          </h2>
          <p className="text-luxury-silver/60 text-lg md:text-xl max-w-md mx-auto mb-10 leading-relaxed font-light">
            It seems you've taken a detour. The finish line isn't down this
            road.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/">
            <Button size="lg" className="group">
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Return to Home
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 text-luxury-silver/20 text-xs uppercase tracking-[0.3em]"
        >
          Error Code: 404 • Destination Unknown
        </motion.div>
      </div>
    </div>
  );
}
