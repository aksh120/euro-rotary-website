'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';

const stats = [
    {
        label: "Date",
        value: "May 15-17, 2025",
        icon: Calendar,
        description: "Three days of automotive excellence."
    },
    {
        label: "Location",
        value: "Pune, India",
        icon: MapPin,
        description: "The Oxford of the East."
    },
    {
        label: "Limit",
        value: "50 Vehicles",
        icon: Users,
        description: "Strictly limited to ensure exclusivity."
    },
    {
        label: "Entry",
        value: "₹400.00",
        icon: Ticket,
        description: "Includes full access & gala dinner."
    },
];

export function EventDetails() {
    return (
        <section id="event" className="relative py-32 bg-luxury-black overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <span className="text-luxury-gold text-sm uppercase tracking-[0.3em] font-medium">The Essentials</span>
                    <h2 className="text-4xl md:text-5xl font-display text-white mt-4 mb-6">Event Details</h2>
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-luxury-gold to-transparent mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-500 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/0 to-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center mb-6 text-luxury-gold group-hover:scale-110 transition-transform duration-500">
                                    <stat.icon size={24} />
                                </div>

                                <h3 className="text-luxury-silver text-xs uppercase tracking-widest mb-2">{stat.label}</h3>
                                <p className="text-xl md:text-2xl font-display text-white mb-4">{stat.value}</p>
                                <p className="text-sm text-luxury-silver/60 leading-relaxed group-hover:text-luxury-silver/90 transition-colors">
                                    {stat.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
