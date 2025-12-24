"use client";
import { motion } from "framer-motion";

const schedule = [
  {
    day: "Friday",
    date: "May 15",
    title: "Arrival & Welcome",
    events: [
      { time: "14:00", activity: "Check-in at Hotel de Paris" },
      { time: "19:00", activity: "Welcome Cocktail Reception" },
      { time: "21:00", activity: "VIP Networking Dinner" },
    ],
  },
  {
    day: "Saturday",
    date: "May 16",
    title: "The Grand Tour",
    events: [
      { time: "09:00", activity: "Rally Briefing" },
      { time: "10:00", activity: "Start Your Engines: Coastal Drive" },
      { time: "13:00", activity: "Lunch Stop: Villa Ephrussi" },
      { time: "20:00", activity: "Gala Dinner & Charity Auction" },
    ],
  },
  {
    day: "Sunday",
    date: "May 17",
    title: "Farewell",
    events: [
      { time: "10:00", activity: "Brunche & Awards Ceremony" },
      { time: "12:00", activity: "Official Event Close" },
    ],
  },
];

export function Schedule() {
  return (
    <section
      id="schedule"
      className="relative py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
            <span className="text-luxury-silver text-[10px] uppercase tracking-[0.2em] font-medium">
              Itinerary
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-medium text-white mb-6">
            Event{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold to-white">
              Schedule
            </span>
          </h2>
          <p className="text-luxury-silver/60 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            A meticulously planned itinerary designed to maximize driving
            pleasure and social connection.
          </p>
        </motion.div>

        <div className="relative">
          {}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-luxury-gold/50 to-transparent hidden lg:block shadow-[0_0_10px_rgba(212,175,55,0.2)]" />

          <div className="space-y-20 lg:space-y-32">
            {schedule.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 === 0 ? "" : "lg:flex-row-reverse"}`}
              >
                {}
                <div
                  className={`flex-1 text-center ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"} relative`}
                >
                  {}
                  <span
                    className={`text-[#1a1a1a] text-[180px] font-display font-bold leading-none absolute top-1/2 -translate-y-1/2 select-none pointer-events-none ${index % 2 === 0 ? "right-0 translate-x-16" : "left-0 -translate-x-16"}`}
                  >
                    0{index + 1}
                  </span>

                  <div className="relative z-10">
                    <div
                      className={`inline-block mb-2 px-3 py-1 rounded-full bg-luxury-gold/10 text-luxury-gold text-xs font-bold uppercase tracking-widest border border-luxury-gold/20`}
                    >
                      {day.date}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-display text-white mb-2">
                      {day.day}
                    </h3>
                    <p className="text-luxury-silver font-light text-xl tracking-wide">
                      {day.title}
                    </p>
                  </div>
                </div>

                {}
                <div className="relative z-20 flex-shrink-0 hidden lg:flex items-center justify-center w-12 h-12">
                  <div className="w-3 h-3 rounded-full bg-luxury-gold shadow-[0_0_15px_rgba(212,175,55,1)] z-10" />
                  <div className="absolute inset-0 rounded-full bg-luxury-gold/20 animate-ping" />
                  <div className="absolute inset-0 rounded-full bg-[#0a0a0a] m-1 border border-luxury-gold/50" />
                </div>

                {}
                <div className="flex-1 w-full max-w-lg lg:max-w-none">
                  <div className="group relative bg-[#111] border border-white/5 p-8 rounded-3xl hover:border-luxury-gold/30 transition-colors duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <ul className="relative z-10 space-y-6">
                      {day.events.map((event, i) => (
                        <li
                          key={i}
                          className="flex gap-6 items-start pb-6 border-b border-white/5 last:border-0 last:pb-0 group/item"
                        >
                          <span className="text-luxury-gold font-mono text-sm py-1 px-2 rounded bg-luxury-gold/5 border border-luxury-gold/10 min-w-[60px] text-center group-hover/item:bg-luxury-gold group-hover/item:text-black transition-all duration-300">
                            {event.time}
                          </span>
                          <div>
                            <span className="text-white font-medium text-lg block mb-1 group-hover/item:text-luxury-gold transition-colors duration-300">
                              {event.activity}
                            </span>
                            <span className="text-luxury-silver/40 text-xs uppercase tracking-wider">
                              Event Location
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
