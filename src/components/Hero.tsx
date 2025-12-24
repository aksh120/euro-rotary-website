"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {}
      <div className="absolute inset-0 z-0">
        {}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-[#111]" />

        {}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-luxury-gold/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
            right: ["-5%", "0%", "-5%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[150px]"
        />

        {}
        <div
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] bg-center"
          style={{ backgroundSize: "50px 50px" }}
        />
      </div>

      {}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center pt-20">
        {}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-6 mb-8 text-xs md:text-sm font-mono tracking-[0.2em] text-luxury-silver/60 uppercase"
        >
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-luxury-gold" />
            Jan 26, 2026
          </span>
          <span className="w-1 h-1 bg-luxury-gold rounded-full" />
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-luxury-gold" />
            Pune, India
          </span>
        </motion.div>

        {}
        <div className="relative mb-6 md:mb-10">
          {}
          <div className="absolute -inset-10 bg-luxury-gold/10 blur-3xl rounded-full opacity-0 md:opacity-100 mix-blend-screen" />

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display font-black text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tighter text-white uppercase relative z-10"
          >
            <span className="block text-white drop-shadow-2xl">Fast</span>
            <span className="block relative">
              <span className="absolute -inset-2 bg-gradient-to-r from-luxury-gold/0 via-luxury-gold/10 to-luxury-gold/0 blur-xl"></span>
              <span className="text-luxury-gold">&</span> Furriest
            </span>
          </motion.h1>
        </div>

        {}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl text-base md:text-lg text-luxury-silver/80 leading-relaxed mb-10 md:mb-14 font-light"
        >
          Join the gathering of marathon enthusiasts for a weekend of{" "}
          <span className="text-white font-medium">passion</span>, and{" "}
          <span className="text-white font-medium">prestige</span>.
        </motion.p>

        {}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-5 items-center w-full md:w-auto"
        >
          <Link href="/register" className="w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-4 bg-luxury-gold text-black font-bold tracking-wide uppercase hover:bg-white transition-colors duration-300 clip-path-slant flex items-center justify-center gap-2 group">
              Secure Your Spot
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
          <Link href="#details" className="w-full md:w-auto">
            <button className="w-full md:w-auto px-8 py-4 border border-white/20 text-white font-medium tracking-wide uppercase hover:bg-white/5 transition-colors duration-300 backdrop-blur-sm">
              Explore The Event
            </button>
          </Link>
        </motion.div>
      </div>

      {}
      {}
      <motion.div
        style={{ opacity }}
        className="absolute right-8 bottom-12 hidden md:flex flex-col items-center gap-4 z-10 mix-blend-difference"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-luxury-silver/60 [writing-mode:vertical-rl] rotate-180">
          Scroll to Explore
        </span>
        <div className="w-[1px] h-16 bg-white/10 overflow-hidden relative">
          <motion.div
            animate={{ top: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1/2 bg-luxury-gold"
          />
        </div>
      </motion.div>

      {}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
