import { RegistrationForm } from '@/components/RegistrationForm';
import { Navbar } from '@/components/Navbar';

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-luxury-black bg-[url('/hero-bg.png')] bg-cover bg-fixed relative">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0" />
            <div className="relative z-10 w-full min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 container mx-auto px-6 py-32 flex items-center justify-center">
                    <RegistrationForm />
                </div>
            </div>
        </main>
    );
}
