'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PremiumImagePlaceholder } from './PremiumImagePlaceholder'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
  images: (string | null)[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length)
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className={`relative h-[200px] md:h-[250px] w-full cursor-pointer group overflow-hidden bg-stone-100 ${idx === 0 ? 'col-span-2 md:col-span-2 row-span-2 h-[416px] md:h-[516px]' : ''}`}
            onClick={() => setLightboxIndex(idx)}
          >
            {img ? (
              <Image 
                src={img} 
                alt={`${title} - Gallery Image ${idx + 1}`} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <PremiumImagePlaceholder title={title} className="h-full w-full" />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="w-8 h-8" strokeWidth={1} />
          </button>
          
          <button 
            className="absolute left-8 text-white/50 hover:text-white transition-colors p-2"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-10 h-10" strokeWidth={1} />
          </button>

          <div className="relative w-full max-w-5xl aspect-video mx-4" onClick={(e) => e.stopPropagation()}>
            {images[lightboxIndex] ? (
              <Image 
                src={images[lightboxIndex] as string} 
                alt={`${title} - Gallery Image ${lightboxIndex + 1}`} 
                fill 
                className="object-contain"
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-900 rounded-sm">
                 <PremiumImagePlaceholder title={title} className="bg-transparent text-stone-500" />
              </div>
            )}
          </div>

          <button 
            className="absolute right-8 text-white/50 hover:text-white transition-colors p-2"
            onClick={handleNext}
          >
            <ChevronRight className="w-10 h-10" strokeWidth={1} />
          </button>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-light tracking-widest text-sm">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
