'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Show the splash screen only while the initial website resources/data are loading
    const handleLoad = () => {
      // Add a small deliberate delay so the animation can be appreciated,
      // but don't keep users stuck unnecessarily.
      setTimeout(() => setIsLoading(false), 800); 
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Failsafe: if window load takes too long (e.g. non-critical image fails), hide anyway
      timeoutId = setTimeout(() => setIsLoading(false), 4000);
    }
    
    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a1510] overflow-hidden"
        >
          {/* Subtle blurred background elements for a premium dark-green travel backdrop */}
          <div className="absolute inset-0 z-0">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#06100c] via-[#0a1a14] to-[#040a08] opacity-90" />
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1b4332] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2d6a4f] rounded-full mix-blend-screen filter blur-[120px] opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Logo with fade-in and subtle scale/pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
              >
                {/* 
                  Using a standard img tag with object-contain to perfectly preserve 
                  logo proportions without distortion. Next.js Image also works but 
                  native img prevents some hydration layout shifts for pure logos.
                */}
                <Image
                  src="/logo.png"
                  alt="Majestic Northeast Tours and Travel Logo"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                  onError={(e) => {
                    // Fallback visually if logo isn't at /logo.png yet, to prevent broken image icon
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-playfair tracking-[0.25em] text-white font-bold mb-3">
                MAJESTIC NORTHEAST
              </h1>
              <h2 className="text-sm md:text-base font-sans tracking-[0.35em] text-gold-400 font-semibold mb-8">
                TOURS AND TRAVEL
              </h2>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="text-stone-300 font-light tracking-widest text-xs md:text-sm italic">
                The Soul of Incredible Northeast
              </p>
            </motion.div>

            {/* Loading Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-12 w-48 h-[2px] bg-stone-800 rounded-full overflow-hidden relative"
            >
              <motion.div
                className="absolute top-0 h-full bg-gold-500 rounded-full w-1/2"
                initial={{ left: "-50%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
