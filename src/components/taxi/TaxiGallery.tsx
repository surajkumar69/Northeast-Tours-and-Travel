'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface TaxiGalleryProps {
  mainImage: string;
  images: { id: string; url: string }[];
}

export function TaxiGallery({ mainImage, images }: TaxiGalleryProps) {
  const allImages = [mainImage, ...images.map(img => img.url)];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <div className="w-full">
      <div className="relative h-[400px] md:h-[600px] w-full mb-4 bg-stone-900/50 overflow-hidden cursor-pointer rounded-sm flex items-center justify-center p-4" onClick={() => setIsFullscreen(true)}>
        <Image 
          src={allImages[currentIndex]}
          alt="Taxi View"
          fill
          className="object-contain p-4 transition-transform duration-700 hover:scale-105"
        />
        
        {allImages.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white hover:bg-gold-500 hover:text-black transition-colors rounded-full backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white hover:bg-gold-500 hover:text-black transition-colors rounded-full backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {allImages.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {allImages.map((src, idx) => (
            <div 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-24 cursor-pointer overflow-hidden rounded-sm transition-all duration-300 ${currentIndex === idx ? 'ring-2 ring-gold-500 opacity-100' : 'opacity-60 hover:opacity-100'}`}
            >
              <Image src={src} alt="Thumbnail" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          >
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-8 right-8 p-2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[101]"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative w-full max-w-6xl h-[80vh]">
              <Image 
                src={allImages[currentIndex]}
                alt="Fullscreen View"
                fill
                className="object-contain"
              />
            </div>

            {allImages.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 text-white hover:bg-gold-500 hover:text-black transition-colors rounded-full backdrop-blur-md z-[101]"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-white/10 text-white hover:bg-gold-500 hover:text-black transition-colors rounded-full backdrop-blur-md z-[101]"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
