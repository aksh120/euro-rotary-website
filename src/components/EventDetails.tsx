"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";

const stats = [
  {
    label: "Date",
    value: "January 26, 2026",
    icon: Calendar,
    description: "Three days of automotive excellence.",
  },
  {
    label: "Location",
    value: "Pune, India",
    icon: MapPin,
    description: "Somewhere in pune.",
  },
  {
    label: "Entry",
    value: "₹400.00",
    icon: Ticket,
    description: "Includes full access.",
  },
];

export function EventDetails() {
  return (
    <section id="event" className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
            <span className="text-luxury-silver text-[10px] uppercase tracking-[0.2em] font-medium">
              The Essentials
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-white mb-6 tracking-tight">
            Event{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-white">
              Details
            </span>
          </h2>
          <p className="text-luxury-silver/60 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
            Precision planning for an unforgettable automotive experience.
            Everything you need to know about the upcoming gathering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 hover:from-luxury-gold/50 hover:to-white/10 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-luxury-gold/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl" />

              <div className="relative h-full bg-[#121212] rounded-[22px] p-8 flex flex-col items-center text-center justify-between border border-white/5 overflow-hidden">
                {}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-luxury-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-luxury-gold/10 group-hover:border-luxury-gold/30 transition-all duration-500 group-hover:scale-110">
                    <stat.icon
                      size={28}
                      className="text-luxury-silver group-hover:text-luxury-gold transition-colors duration-500"
                    />
                  </div>
                  <h3 className="text-luxury-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
                    {stat.label}
                  </h3>
                  <p className="text-2xl md:text-3xl font-display text-white group-hover:text-white transition-colors duration-300">
                    {stat.value}
                  </p>
                </div>

                <div className="relative z-10 pt-6 border-t border-white/5 w-full">
                  <p className="text-sm text-luxury-silver/50 group-hover:text-luxury-silver/80 transition-colors duration-300">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
