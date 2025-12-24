"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const features = [
  {
    id: "01",
    title: "The Drive",
    subtitle: "Precision & Performance",
    description:
      "Navigate the legendary curves of the Grande Corniche. A curated route designed to test the limits of man and machine against the backdrop of the Mediterranean.",
    bgGradient: "from-orange-500/10 via-amber-500/5 to-transparent",
  },
  {
    id: "02",
    title: "The Gala",
    subtitle: "Culinary Excellence",
    description:
      "An evening of unbridled sophistication at the Salle Empire. Michelin-star dining accompanied by a private viewing of rare automotive horology.",
    bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent",
  },
  {
    id: "03",
    title: "The Network",
    subtitle: "Elite Connections",
    description:
      "Access to a closed circle of industry titans and collectors. Where alliances are forged over espresso and unleaded gasoline.",
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="relative py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {}
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
              <span className="text-luxury-silver text-[10px] uppercase tracking-[0.2em] font-medium">
                The Experience
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-display font-medium text-white leading-[0.9] tracking-tighter">
              Beyond the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-white/50 to-white/10">
                Tarmac.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex flex-col items-end gap-4"
          >
            <p className="text-right text-luxury-silver/50 text-sm max-w-xs leading-relaxed">
              Curated moments designed to elevate the standard of automotive
              lifestyle events.
            </p>
            <div className="w-px h-24 bg-gradient-to-b from-luxury-gold to-transparent" />
          </motion.div>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative min-h-[380px] flex flex-col justify-between p-8 md:p-10 rounded-3xl bg-[#111] hover:bg-[#151515] transition-all duration-700 overflow-hidden"
            >
              {}
              <div className="absolute inset-0 rounded-3xl border border-white/5 group-hover:border-white/10 transition-colors duration-500" />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5 group-hover:ring-white/10 transition-all duration-500" />

              {}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              {}
              <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

              {}
              <div className="relative z-10 flex justify-between items-start">
                <span className="text-7xl font-display text-white/5 group-hover:text-luxury-gold/10 transition-colors duration-500 font-bold select-none">
                  {feature.id}
                </span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-luxury-gold/50 group-hover:bg-luxury-gold group-hover:text-black transition-all duration-500">
                  <ArrowUpRight
                    className="text-luxury-silver group-hover:text-black transition-colors"
                    size={20}
                  />
                </div>
              </div>

              {}
              <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="overflow-hidden mb-2">
                  <p className="text-luxury-gold text-[10px] uppercase tracking-[0.2em] font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    {feature.subtitle}
                  </p>
                </div>

                <h3 className="text-3xl md:text-4xl font-display text-white mb-4 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-luxury-silver/50 text-sm leading-relaxed max-w-xs group-hover:text-luxury-silver transition-colors duration-500">
                  {feature.description}
                </p>
              </div>

              {}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-luxury-gold via-white to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
