"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

interface DestinationCardProps {
  title: string;
  subtitle: string;
  link: string;
  images: string[];
}

export function DestinationSlider({ title, subtitle, link, images }: DestinationCardProps) {
  const [current, setCurrent] = useState(0);
  
  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((prev) => (prev + 1) % images.length);
  };
  
  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Link href={link} className="group relative block w-full h-[500px] md:h-[700px] rounded-[32px] overflow-hidden cursor-pointer shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={title}
            fill
            className="object-cover transition-transform duration-[15s] ease-out group-hover:scale-110"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Gradients for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-5 h-5 text-gold-400" />
          <span className="text-gold-400 font-medium tracking-widest uppercase text-sm md:text-base">{subtitle}</span>
        </div>
        <h3 className="font-playfair text-4xl md:text-5xl text-white mb-6 group-hover:text-gold-200 transition-colors">{title}</h3>
        
        <div className="flex items-center gap-2 mb-2">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${current === idx ? 'w-10 bg-gold-400' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden group-hover:block">
            <button 
              onClick={prevSlide}
              className="p-4 bg-black/40 text-white hover:bg-gold-500 rounded-full backdrop-blur-md transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:hidden group-hover:block">
            <button 
              onClick={nextSlide}
              className="p-4 bg-black/40 text-white hover:bg-gold-500 rounded-full backdrop-blur-md transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </>
      )}
    </Link>
  );
}
