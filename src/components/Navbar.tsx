"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setLastScrollY(latest);
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Event Details", href: "/#event" },
    { name: "Experience", href: "/#experience" },
    { name: "Schedule", href: "/#schedule" },
  ];

  const variants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "py-4 bg-luxury-black/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "py-6 bg-gradient-to-b from-black/80 to-transparent",
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between relative">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 bg-luxury-gold flex items-center justify-center rounded-sm group-hover:rotate-45 transition-transform duration-500">
              <span className="text-black font-bold font-display text-xl">
                E
              </span>
            </div>
            <span className="text-xl md:text-2xl font-bold font-display tracking-[0.15em] text-white group-hover:text-luxury-gold transition-colors duration-300">
              EURO<span className="font-light text-luxury-silver">ROTARY</span>
            </span>
          </Link>

          {}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center bg-white/5 px-8 py-2.5 rounded-full border border-white/5 backdrop-blur-md">
            <div className="flex items-center space-x-8">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-[11px] uppercase tracking-[0.2em] text-luxury-silver hover:text-white transition-colors duration-300 group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <Link href="/register">
              <Button
                variant="primary"
                size="sm"
                className="bg-luxury-gold text-black hover:bg-white border-none shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all"
              >
                Register
              </Button>
            </Link>
          </div>

          {}
          <button
            className="md:hidden text-luxury-gold p-2 hover:bg-white/5 rounded-full transition-colors active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-luxury-black/98 backdrop-blur-3xl md:hidden flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/5">
              <span className="text-xl font-display font-bold text-luxury-gold">
                Euro Rotary
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-luxury-silver hover:text-white bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-10">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="w-full text-center"
                >
                  <Link
                    href={item.href}
                    className="text-3xl font-display font-light uppercase tracking-widest text-white hover:text-luxury-gold transition-colors inline-block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8"
              >
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="primary" size="lg" className="w-64 text-lg">
                    Register Now
                  </Button>
                </Link>
              </motion.div>
            </div>

            <div className="p-8 text-center border-t border-white/5">
              <p className="text-luxury-silver/40 text-[10px] uppercase tracking-[0.3em]">
                Euro Rotary 2026 • Pune
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
