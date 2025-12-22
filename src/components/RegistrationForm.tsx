'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    gender: z.enum(['male', 'female', 'other'] as const, { message: 'Please select a gender' }),
    email: z.string().email('Please enter a valid email address'),
    terms: z.literal(true, { message: 'You must accept the terms' }),
});

type FormData = z.infer<typeof formSchema>;

export function RegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error || 'Registration failed');

            router.push(`/payment?id=${result.participantId}`);
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-10 bg-luxury-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-display text-luxury-gold mb-2">Registration</h2>
                <p className="text-luxury-silver text-sm">Secure your position in the race.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Full Name */}
                <div className="space-y-2 group">
                    <label className="text-xs uppercase tracking-widest text-luxury-silver group-focus-within:text-luxury-gold transition-colors">Full Name</label>
                    <input
                        {...register('fullName')}
                        className="w-full bg-transparent border-b border-white/20 focus:border-luxury-gold py-2 text-luxury-ivory focus:outline-none transition-colors"
                        placeholder="e.g. Alexander Hamilton"
                    />
                    {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Gender */}
                <div className="space-y-2 group">
                    <label className="text-xs uppercase tracking-widest text-luxury-silver group-focus-within:text-luxury-gold transition-colors">Gender</label>
                    <div className="relative">
                        <select
                            {...register('gender')}
                            className="w-full bg-transparent border-b border-white/20 focus:border-luxury-gold py-2 text-luxury-ivory focus:outline-none appearance-none"
                        >
                            <option value="" className="bg-luxury-black text-gray-500">Select Gender</option>
                            <option value="male" className="bg-luxury-black">Male</option>
                            <option value="female" className="bg-luxury-black">Female</option>
                            <option value="other" className="bg-luxury-black">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-luxury-silver">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2 group">
                    <label className="text-xs uppercase tracking-widest text-luxury-silver group-focus-within:text-luxury-gold transition-colors">Email Address</label>
                    <input
                        {...register('email')}
                        className="w-full bg-transparent border-b border-white/20 focus:border-luxury-gold py-2 text-luxury-ivory focus:outline-none transition-colors"
                        placeholder="e.g. contact@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Terms */}
                <div className="pt-4">
                    <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            {...register('terms')}
                            className="mt-1 w-4 h-4 accent-luxury-gold bg-transparent border-white/20 rounded cursor-pointer"
                        />
                        <span className="text-xs text-luxury-silver leading-relaxed">
                            I agree to the <Link href="/terms" className="text-luxury-gold underline hover:text-white transition-colors">Terms and General Conditions</Link> of the event. I understand that my registration is not confirmed until payment is processed.
                        </span>
                    </label>
                    {errors.terms && <p className="text-red-400 text-xs mt-2">{errors.terms.message}</p>}
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-8"
                    isLoading={isSubmitting}
                >
                    Proceed to Payment
                </Button>
            </form>
        </div>
    );
}
