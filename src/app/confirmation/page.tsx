'use client';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Suspense } from 'react';

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const bib = searchParams.get('bib') || '---';

    return (
        <div className="w-full max-w-lg bg-luxury-black/80 backdrop-blur-xl border border-luxury-gold/20 p-10 rounded-2xl text-center shadow-2xl relative overflow-hidden">
            {/* Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-luxury-gold/20 blur-3xl rounded-full" />

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
            >
                <CheckCircle className="text-green-500 w-10 h-10" />
            </motion.div>

            <h1 className="text-3xl font-display text-white mb-2 relative z-10">Registration Confirmed</h1>
            <p className="text-luxury-silver mb-8 relative z-10">Welcome to the elite.</p>

            <div className="bg-white/5 p-6 rounded-xl border border-white/5 mb-8 relative z-10">
                <p className="text-xs text-luxury-silver uppercase tracking-widest mb-2">Your Bib Number</p>
                <p className="text-5xl font-display font-bold text-luxury-gold">{bib}</p>
            </div>

            <p className="text-sm text-luxury-silver/60 mb-8 relative z-10">
                A confirmation email has been sent to your inbox with full event details.
            </p>

            <Link href="/" className="relative z-10">
                <Button variant="outline" className="w-full">Return Home</Button>
            </Link>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <main className="min-h-screen bg-luxury-black bg-[url('/hero-bg.png')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-0" />
            <div className="relative z-10 w-full min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 container mx-auto px-6 flex items-center justify-center">
                    <Suspense fallback={<div className="text-white">Loading...</div>}>
                        <ConfirmationContent />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
