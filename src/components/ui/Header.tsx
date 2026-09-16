'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import Image from "next/image";

export function Header({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgClass = isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent";
  const textColor = isScrolled || variant === "dark" ? "text-stone-900" : "text-white";
  const hoverColor = isScrolled || variant === "dark" ? "hover:text-stone-500" : "hover:text-stone-300";

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-105">
            <Image src="/logo.png" alt="Majestic Northeast Tours and Travel Logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className={`text-sm md:text-lg font-playfair tracking-wider font-bold ${textColor} leading-tight`}>
              MAJESTIC NORTHEAST
            </span>
            <span className={`text-[8px] md:text-[10px] tracking-widest font-sans font-semibold text-gold-500 uppercase leading-tight`}>
              Tours and Travel
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-medium tracking-widest">
          <Link href="/packages" className={`${textColor} ${hoverColor} transition-colors uppercase`}>Tours & Packages</Link>
          <Link href="/destinations" className={`${textColor} ${hoverColor} transition-colors uppercase`}>Destinations</Link>
          <Link href="/taxis" className={`${textColor} ${hoverColor} transition-colors uppercase`}>Taxi</Link>
          
          {/* Tempo Dropdown */}
          <div className="relative group">
            <button className={`${textColor} ${hoverColor} transition-colors uppercase flex items-center`}>
              Tempo Travellers
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white border border-stone-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex flex-col py-2 z-50">
              <Link href="/tempo-traveller" className="px-4 py-2 text-stone-700 hover:bg-stone-50 hover:text-gold-500 uppercase tracking-widest text-[10px] font-bold">Vehicle Fleet</Link>
              <Link href="/tempo-traveller/tempo-traveller-13-seater" className="px-4 py-2 text-stone-700 hover:bg-stone-50 hover:text-gold-500 uppercase tracking-widest text-[10px] font-bold">Tempo Traveller</Link>
              <Link href="/tempo-traveller/force-urbania-13-seater" className="px-4 py-2 text-stone-700 hover:bg-stone-50 hover:text-gold-500 uppercase tracking-widest text-[10px] font-bold">Urbania</Link>
              <Link href="/tempo-traveller" className="px-4 py-2 text-stone-700 hover:bg-stone-50 hover:text-gold-500 uppercase tracking-widest text-[10px] font-bold">Booking</Link>
            </div>
          </div>
          <Link href="/contact" className={`${textColor} ${hoverColor} transition-colors uppercase`}>Contact</Link>
          <Link href="/contact" className="bg-stone-900 text-white px-6 py-3 hover:bg-stone-800 transition-colors uppercase">Book Now</Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`lg:hidden ${textColor}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-stone-100 flex flex-col py-6 px-6 space-y-6">
          <Link href="/packages" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-900 font-medium tracking-widest text-sm uppercase">Tours & Packages</Link>
          <Link href="/destinations" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-900 font-medium tracking-widest text-sm uppercase">Destinations</Link>
          <Link href="/taxis" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-900 font-medium tracking-widest text-sm uppercase">Taxi Booking</Link>
          <Link href="/tempo-traveller" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-900 font-medium tracking-widest text-sm uppercase">Tempo Travellers</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-900 font-medium tracking-widest text-sm uppercase">Contact</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-stone-900 text-white text-center px-6 py-4 font-medium tracking-widest text-sm uppercase">Book Now</Link>
        </div>
      )}
    </header>
  );
}
