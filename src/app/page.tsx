import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { EventDetails } from "@/components/EventDetails";
import { Experience } from "@/components/Experience";
import { Schedule } from "@/components/Schedule";

export default function Home() {
  return (
    <main className="min-h-screen bg-luxury-black selection:bg-luxury-gold selection:text-black">
      <Navbar />
      <Hero />
      <EventDetails />
      <Experience />
      <Schedule />
    </main>
  );
}
