"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export type Slide = {
  id: string;
  title: string;
  location: string;
  description: string | null;
  image: string;
  ctaText: string | null;
  ctaLink: string | null;
};

export const HeroCarousel = ({ slides }: { slides: Slide[] }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play timer
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      prevSlide();
    } else if (info.offset.x < -50) {
      nextSlide();
    }
  };

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-black flex items-center justify-center">
        <div className="text-center z-20">
          <h1 className="font-playfair text-white text-4xl md:text-6xl font-bold leading-[1.05] mb-6 drop-shadow-2xl">
            Discover the Soul of Incredible Northeast
          </h1>
          <p className="text-stone-300 text-lg">Curated premium travel experiences.</p>
        </div>
      </div>
    );
  }

  const slide = slides[current];

  return (
    <div
      className="relative w-full h-[100vh] min-h-[700px] overflow-hidden bg-black flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images with Swipe Support */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover opacity-80 animate-slow-zoom"
            priority
          />
          {/* Strong cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content - LEFT SIDE */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-0 pointer-events-none">
        <div className="max-w-[520px] pointer-events-auto">
          {/* Eyebrow */}
          <motion.div
            key={`location-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px] bg-gold-400" />
            <span className="text-gold-400 tracking-[0.2em] text-xs md:text-sm font-semibold uppercase drop-shadow-md">
              {slide.location}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            key={`title-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1
              className="font-playfair text-white font-bold leading-[1.05] mb-6 drop-shadow-2xl whitespace-pre-line"
              style={{ fontSize: "clamp(52px, 6vw, 100px)" }}
            >
              {slide.title}
            </h1>
          </motion.div>

          {/* Description */}
          {slide.description && (
            <motion.p
              key={`desc-${current}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-stone-200 text-sm md:text-base lg:text-lg font-light leading-relaxed mb-10 max-w-[480px] drop-shadow-md"
            >
              {slide.description}
            </motion.p>
          )}

          {/* Buttons */}
          <motion.div
            key={`btn-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {slide.ctaLink && (
              <Link
                href={slide.ctaLink}
                className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-stone-950 text-xs tracking-widest font-bold uppercase transition-all rounded-sm text-center"
              >
                {slide.ctaText || "Discover Destination"}
              </Link>
            )}
            <Link
              href="/packages"
              className="px-8 py-4 bg-black/40 backdrop-blur-md border border-white/30 hover:bg-white/10 text-white text-xs tracking-widest font-bold uppercase transition-all rounded-sm text-center flex justify-center items-center"
            >
              Explore Packages <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* LOWER RIGHT - Destination Cards */}
      {slides.length > 1 && (
        <div className="absolute z-30 bottom-12 right-0 left-6 md:left-auto md:right-12 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          <div className="flex gap-4 min-w-max px-2">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => setCurrent(idx)}
                className={`relative cursor-pointer overflow-hidden rounded-[20px] transition-all duration-500 flex-shrink-0 group ${
                  current === idx
                    ? "w-[240px] h-[340px] md:w-[260px] md:h-[360px] ring-2 ring-gold-500 shadow-2xl shadow-black/60 transform -translate-y-2"
                    : "w-[200px] h-[300px] md:w-[220px] md:h-[320px] opacity-60 hover:opacity-100 hover:-translate-y-1"
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.location}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity" />

                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                  <span className="block text-gold-400 text-[10px] tracking-[0.2em] font-bold uppercase mb-2 drop-shadow-md">
                    {s.location}
                  </span>
                  <span className="block text-white text-2xl font-playfair drop-shadow-lg truncate">
                    {s.title.split('\n')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls & Progress - Top Right */}
      {slides.length > 1 && (
        <div className="absolute top-32 right-12 z-30 hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-3 text-white font-mono">
            <span className="text-xl font-light text-gold-400">0{current + 1}</span>
            <div className="w-16 h-[2px] bg-white/20 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gold-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                key={`progress-${current}`}
                transition={{ duration: 6, ease: "linear" }}
              />
            </div>
            <span className="text-white/40 text-sm">0{slides.length}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-black/40 border border-white/20 hover:bg-gold-500 hover:text-black transition-colors backdrop-blur-md text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-black/40 border border-white/20 hover:bg-gold-500 hover:text-black transition-colors backdrop-blur-md text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
