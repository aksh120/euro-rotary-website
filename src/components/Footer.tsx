"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  ArrowUpRight,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="relative bg-[#050505] overflow-hidden">
      {}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />

      {}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <h1 className="text-[15vw] leading-none font-display font-bold text-white/[0.02] text-center whitespace-nowrap tracking-tighter translate-y-[20%]">
          EURO ROTARY
        </h1>
      </div>

      <div className="container mx-auto px-6 pt-24 pb-12 relative z-10">
        {}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-8 group"
            >
              <div className="w-10 h-10 bg-luxury-gold flex items-center justify-center rounded-sm group-hover:rotate-45 transition-transform duration-500">
                <span className="text-black font-bold font-display text-2xl">
                  E
                </span>
              </div>
              <span className="text-3xl font-bold font-display tracking-[0.15em] text-white">
                EURO
                <span className="font-light text-luxury-silver">ROTARY</span>
              </span>
            </Link>
            <p className="text-luxury-silver/60 text-lg leading-relaxed max-w-md font-light mb-8">
              The premier gathering for automotive purists. Where engineering
              excellence meets the Riviera lifestyle.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-luxury-gold hover:bg-luxury-gold/10 hover:border-luxury-gold/50 transition-all duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-luxury-gold hover:bg-luxury-gold/10 hover:border-luxury-gold/50 transition-all duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-luxury-gold hover:bg-luxury-gold/10 hover:border-luxury-gold/50 transition-all duration-300"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {}
          <div className="relative">
            <div className="absolute inset-0 bg-luxury-gold/20 blur-2xl opacity-20 rounded-3xl" />
            <div className="relative bg-[#111] border border-white/10 p-8 md:p-10 rounded-3xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <h3 className="text-2xl font-display text-white mb-2">
                Join the Inner Circle
              </h3>
              <p className="text-luxury-silver/50 text-sm mb-6">
                Receive exclusive updates, route reveals, and VIP invitations.
              </p>

              <NewsletterForm />
            </div>
          </div>
        </div>

        {}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-t border-white/5 pt-16">
          <div>
            <h4 className="text-white/40 font-mono text-xs uppercase tracking-widest mb-6">
              Sitemap
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#event"
                  className="text-luxury-silver/60 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <ArrowUpRight
                    size={14}
                    className="text-luxury-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                  <span className="-translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                    Event Details
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="text-luxury-silver/60 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <ArrowUpRight
                    size={14}
                    className="text-luxury-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                  <span className="-translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                    The Experience
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#schedule"
                  className="text-luxury-silver/60 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <ArrowUpRight
                    size={14}
                    className="text-luxury-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                  <span className="-translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                    Schedule
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-luxury-silver/60 hover:text-white transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <ArrowUpRight
                    size={14}
                    className="text-luxury-gold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                  <span className="-translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
                    Register
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white/40 font-mono text-xs uppercase tracking-widest mb-6">
              Legal
            </h4>
            <ul className="space-y-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-luxury-silver/60 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <h4 className="text-white/40 font-mono text-xs uppercase tracking-widest mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-luxury-gold" />
                <div>
                  <p className="text-white font-medium">JW Marriott Hotel</p>
                  <p className="text-luxury-silver/60 text-sm">
                    Senapati Bapat Road, Pune, India 411053
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-luxury-gold" />
                <a
                  href="mailto:vip@eurorotary.com"
                  className="text-luxury-silver/80 hover:text-white transition-colors"
                >
                  rotary@akimbolabs.site
                </a>
              </li>
            </ul>
          </div>
        </div>

        {}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-8">
          <p className="text-luxury-silver/30 text-xs font-mono uppercase tracking-wider">
            © 2026 Euro Rotary. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-luxury-silver/40 text-xs font-mono uppercase">
              System Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
