'use client';
import { motion } from 'framer-motion';

const schedule = [
    {
        day: "Friday",
        date: "May 15",
        title: "Arrival & Welcome",
        events: [
            { time: "14:00", activity: "Check-in at Hotel de Paris" },
            { time: "19:00", activity: "Welcome Cocktail Reception" },
            { time: "21:00", activity: "VIP Networking Dinner" }
        ]
    },
    {
        day: "Saturday",
        date: "May 16",
        title: "The Grand Tour",
        events: [
            { time: "09:00", activity: "Rally Briefing" },
            { time: "10:00", activity: "Start Your Engines: Coastal Drive" },
            { time: "13:00", activity: "Lunch Stop: Villa Ephrussi" },
            { time: "20:00", activity: "Gala Dinner & Charity Auction" }
        ]
    },
    {
        day: "Sunday",
        date: "May 17",
        title: "Farewell",
        events: [
            { time: "10:00", activity: "Brunche & Awards Ceremony" },
            { time: "12:00", activity: "Official Event Close" }
        ]
    }
];

export function Schedule() {
    return (
        <section id="schedule" className="relative py-32 bg-luxury-black">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Event Schedule</h2>
                    <p className="text-luxury-silver max-w-xl mx-auto font-light">
                        A meticulously planned itinerary designed to maximize driving pleasure and social connection.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line for Desktop */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-luxury-gold/30 to-transparent hidden lg:block" />

                    <div className="space-y-16 lg:space-y-24">
                        {schedule.map((day, index) => (
                            <motion.div
                                key={day.day}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}
                            >
                                {/* Date/Title Side */}
                                <div className={`flex-1 text-center ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                                    <span className="text-luxury-gold text-8xl font-display opacity-10 absolute -translate-y-12 select-none -translate-x-1/2 lg:translate-x-0">
                                        0{index + 1}
                                    </span>
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-display text-white mb-2">{day.day}</h3>
                                        <p className="text-luxury-gold text-sm tracking-widest uppercase mb-4">{day.date}</p>
                                        <p className="text-luxury-silver font-light text-lg">{day.title}</p>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="relative z-20 flex-shrink-0 w-4 h-4 rounded-full bg-luxury-black border-2 border-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.5)] hidden lg:block" />

                                {/* Events Side */}
                                <div className="flex-1 w-full max-w-md bg-white/5 border border-white/5 p-8 rounded-2xl backdrop-blur-sm lg:max-w-none">
                                    <ul className="space-y-6">
                                        {day.events.map((event, i) => (
                                            <li key={i} className="flex gap-6 border-b border-white/5 last:border-0 pb-4 last:pb-0">
                                                <span className="text-luxury-silver/60 font-mono text-sm min-w-[50px]">{event.time}</span>
                                                <span className="text-white font-medium">{event.activity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
