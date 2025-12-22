'use client';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background */}
            <div
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
                    style={{ backgroundImage: "url('/hero-bg.png')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-luxury-black/40 to-luxury-black z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-luxury-black/80 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 text-center mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <motion.h2
                        initial={{ opacity: 0, letterSpacing: '0.1em' }}
                        animate={{ opacity: 1, letterSpacing: '0.3em' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="text-luxury-gold text-sm md:text-base uppercase font-medium mb-6"
                    >
                        May 15-17, 2025 • Monaco
                    </motion.h2>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-bold text-luxury-ivory mb-8 leading-tight tracking-tight">
                        THE PINNACLE <br />
                        <span className="relative inline-block">
                            OF
                            <motion.span
                                className="absolute top-1/2 left-0 w-full h-[1px] bg-luxury-gold"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 1 }}
                            />
                        </span>{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-yellow-200 to-luxury-bronze">
                            ENDURANCE
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-luxury-silver/80 text-lg md:text-xl mb-12 font-light leading-relaxed">
                        Join the elite gathering of rotary enthusiasts for a weekend of precision, passion, and prestige.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="/register">
                            <Button size="lg" variant="primary">
                                Secure Your Spot
                            </Button>
                        </Link>
                        <Link href="#experience">
                            <Button size="lg" variant="outline">
                                Explore The Event
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <span className="text-[10px] uppercase tracking-widest text-luxury-silver/50">Scroll</span>
                <motion.div
                    className="w-[1px] h-16 bg-gradient-to-b from-luxury-gold to-transparent"
                    animate={{ height: [0, 64, 0], y: [0, 0, 10] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
}
