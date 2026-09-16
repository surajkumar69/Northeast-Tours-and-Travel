'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  url: string;
  altText?: string | null;
}

interface LightboxGalleryProps {
  images: GalleryImage[];
}

export function LightboxGallery({ images }: LightboxGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowLeft') showPrevious();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Swipe handlers
  let touchStartX = 0;
  let touchEndX = 0;
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) showNext();
    if (touchEndX - touchStartX > 50) showPrevious();
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <motion.div
            key={img.id}
            className="relative h-72 md:h-80 w-full group overflow-hidden rounded-xl cursor-pointer shadow-lg border border-white/5"
            onClick={() => openLightbox(idx)}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={img.url}
              alt={img.altText || `Gallery image ${idx + 1}`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); showPrevious(); }}
                  className="absolute left-4 md:left-8 z-50 p-3 bg-white/5 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); showNext(); }}
                  className="absolute right-4 md:right-8 z-50 p-3 bg-white/5 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="relative w-full max-w-6xl h-[85vh] mx-4 md:mx-24 outline-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex flex-col items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={images[currentIndex].url}
                      alt={images[currentIndex].altText || `View image ${currentIndex + 1}`}
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                  {images[currentIndex].altText && (
                    <div className="absolute bottom-[-40px] left-0 w-full text-center text-stone-300 font-light tracking-wide">
                      {images[currentIndex].altText}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-400 text-sm tracking-widest font-mono">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
