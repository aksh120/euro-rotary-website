'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const features = [
    {
        id: "01",
        title: "The Drive",
        subtitle: "Precision & Performance",
        description: "Navigate the legendary curves of the Grande Corniche. A curated route designed to test the limits of man and machine against the backdrop of the Mediterranean.",
        bgGradient: "from-orange-500/10 via-amber-500/5 to-transparent"
    },
    {
        id: "02",
        title: "The Gala",
        subtitle: "Culinary Excellence",
        description: "An evening of unbridled sophistication at the Salle Empire. Michelin-star dining accompanied by a private viewing of rare automotive horology.",
        bgGradient: "from-purple-500/10 via-pink-500/5 to-transparent"
    },
    {
        id: "03",
        title: "The Network",
        subtitle: "Elite Connections",
        description: "Access to a closed circle of industry titans and collectors. Where alliances are forged over espresso and unleaded gasoline.",
        bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent"
    }
];

export function Experience() {
    return (
        <section id="experience" className="relative py-32 bg-[#121212] overflow-hidden">
            {/* Ambient Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-luxury-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">The Experience</span>
                        <h2 className="text-5xl md:text-7xl font-display font-medium text-white leading-[0.9]">
                            Beyond the <br />
                            <span className="text-white/20">Tarmac.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:block"
                    >
                        <div className="w-px h-24 bg-gradient-to-b from-luxury-gold to-transparent" />
                    </motion.div>
                </div>

                {/* Cards Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group relative min-h-[500px] flex flex-col justify-between p-8 md:p-12 border border-white/5 rounded-3xl bg-[#161616] hover:bg-[#1a1a1a] transition-all duration-700 overflow-hidden cursor-none"
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                            {/* Top Content */}
                            <div className="relative z-10 flex justify-between items-start">
                                <span className="text-6xl font-display text-white/10 group-hover:text-luxury-gold/20 transition-colors duration-500">
                                    {feature.id}
                                </span>
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-luxury-gold/50 group-hover:bg-luxury-gold/10 transition-all duration-500">
                                    <ArrowUpRight className="text-luxury-silver group-hover:text-luxury-gold transition-colors" size={18} />
                                </div>
                            </div>

                            {/* Bottom Content */}
                            <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="text-luxury-gold text-xs uppercase tracking-widest mb-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {feature.subtitle}
                                </p>
                                <h3 className="text-4xl font-display text-white mb-6 group-hover:text-luxury-ivory transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-luxury-silver/60 text-sm leading-relaxed max-w-xs group-hover:text-luxury-silver transition-colors">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Decorative Line animation */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-luxury-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
