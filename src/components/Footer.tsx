'use client';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="group flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-luxury-gold flex items-center justify-center rounded-sm">
                                <span className="text-black font-bold font-display text-xl">E</span>
                            </div>
                            <span className="text-2xl font-bold font-display tracking-[0.15em] text-white">
                                EURO<span className="font-light text-luxury-silver">ROTARY</span>
                            </span>
                        </Link>
                        <p className="text-luxury-silver text-sm leading-relaxed max-w-sm font-light">
                            The premier gathering for rotary enthusiasts in Europe.
                            Celebrating engineering excellence against the backdrop of the French Riviera.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-display uppercase tracking-widest mb-6 text-sm">Navigation</h4>
                        <ul className="space-y-4 text-sm text-luxury-silver">
                            <li><Link href="/#event" className="hover:text-luxury-gold transition-colors">Event Details</Link></li>
                            <li><Link href="/#experience" className="hover:text-luxury-gold transition-colors">The Experience</Link></li>
                            <li><Link href="/#schedule" className="hover:text-luxury-gold transition-colors">Schedule</Link></li>
                            <li><Link href="/register" className="hover:text-luxury-gold transition-colors">Register Now</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-display uppercase tracking-widest mb-6 text-sm">Contact</h4>
                        <ul className="space-y-4 text-sm text-luxury-silver">
                            <li className="flex items-center gap-2">
                                <Mail size={14} className="text-luxury-gold" />
                                <a href="mailto:info@euro-rotary.com" className="hover:text-white transition-colors">info@euro-rotary.com</a>
                            </li>
                            <li>
                                <p>JW Marriott Hotel</p>
                                <p>Senapati Bapat Road</p>
                                <p>Pune, India 411053</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-luxury-silver/40 text-xs">
                        © 2025 Euro Rotary Event. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="text-luxury-silver/40 hover:text-luxury-gold transition-colors"><Instagram size={18} /></a>
                        <a href="#" className="text-luxury-silver/40 hover:text-luxury-gold transition-colors"><Twitter size={18} /></a>
                        <a href="#" className="text-luxury-silver/40 hover:text-luxury-gold transition-colors"><Facebook size={18} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
