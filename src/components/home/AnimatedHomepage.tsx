'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, ShieldCheck, Compass, Users } from 'lucide-react';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';

import { Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export function AnimatedHomepage({
  destinations,
  packages,
  taxis,
  cultureImages
}: {
  destinations: any[];
  packages: any[];
  taxis: any[];
  cultureImages: string[];
}) {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-gold-500/30">
      <Header variant="light" />

      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/ai-generated/shillong_cover_1789536703141.jpg"
            alt="Cinematic Northeast India Landscape"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#06100c]/90" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="block text-gold-400 text-xs md:text-sm tracking-[0.3em] font-semibold uppercase mb-6"
          >
            THE SOUL OF INCREDIBLE NORTHEAST
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-8 drop-shadow-2xl"
          >
            Discover the <br className="hidden md:block" /> Majestic Northeast
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-stone-300 text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Explore breathtaking mountains, vibrant cultures, unforgettable journeys and the hidden beauty of Northeast India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/packages" className="w-full sm:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-400 text-[#06100c] text-xs uppercase tracking-widest font-bold rounded-sm transition-colors">
              EXPLORE TOURS
            </Link>
            <Link href="/contact" className="w-full sm:w-auto px-8 py-4 border border-white/30 hover:border-gold-400 text-white hover:text-gold-400 text-xs uppercase tracking-widest font-bold rounded-sm transition-all backdrop-blur-sm bg-black/20">
              PLAN YOUR JOURNEY
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US (Dark Green Accent Background) */}
      <section className="py-24 bg-[#0a1a14] text-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 text-center"
        >
          <motion.h2 variants={fadeUp} className="font-playfair text-3xl md:text-5xl mb-16 text-white">
            Why Journey With Us
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Compass, title: "Local Expertise", desc: "Unmatched knowledge of hidden trails and untouched destinations across the Northeast." },
              { icon: ShieldCheck, title: "Premium Comfort", desc: "Travel safely in our modern, well-maintained fleet with experienced professional drivers." },
              { icon: Users, title: "Tailored Experiences", desc: "Bespoke itineraries designed carefully to match your pace, interests, and comfort." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeUp} className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-full bg-[#0d221b] border border-gold-500/20 flex items-center justify-center mb-6 text-gold-500 group-hover:scale-110 group-hover:border-gold-500/50 transition-all duration-500">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-playfair mb-4 text-stone-100">{feature.title}</h3>
                <p className="text-stone-400 text-sm font-light leading-relaxed max-w-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. POPULAR DESTINATIONS */}
      <section className="py-24 md:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <span className="text-gold-600 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Where to Go</span>
              <h2 className="font-playfair text-4xl md:text-5xl text-[#0a1a14]">Popular Destinations</h2>
            </div>
            <Link href="/destinations" className="flex items-center text-[#0a1a14] hover:text-gold-600 text-sm tracking-widest uppercase font-semibold transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, i) => (
              <motion.div 
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <Link href={`/destinations/${dest.slug}`} className="group block relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg">
                  <Image 
                    src={dest.coverImage} 
                    alt={dest.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-playfair text-3xl text-white mb-2">{dest.name}</h3>
                    <p className="text-stone-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {dest.shortDescription}
                    </p>
                    <span className="inline-block border border-gold-500 text-gold-400 px-4 py-2 text-xs uppercase tracking-widest rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      Explore Destination
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED TOUR PACKAGES */}
      <section className="py-24 md:py-32 bg-[#06100c] text-stone-200 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-20"
          >
            <span className="text-gold-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Curated Itineraries</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-white">Featured Tour Packages</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map((pkg, i) => (
              <motion.div 
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="group bg-[#0a1a14] rounded-2xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-colors shadow-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={pkg.coverImage} 
                    alt={pkg.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-gold-500 text-[#06100c] text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm">
                    {pkg.duration}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-playfair text-2xl text-white mb-3 group-hover:text-gold-400 transition-colors">{pkg.title}</h3>
                  <div className="flex items-center text-stone-400 text-xs uppercase tracking-wider mb-4">
                    <MapPin className="w-3 h-3 mr-1 text-gold-500" /> {pkg.startingPoint || 'Northeast'}
                    <span className="mx-2">•</span>
                    <Clock className="w-3 h-3 mr-1 text-gold-500" /> {pkg.duration}
                  </div>
                  <p className="text-stone-400 text-sm line-clamp-3 mb-6 font-light">{pkg.shortDescription}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <div>
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest">Starting from</p>
                      <p className="text-lg font-bold text-white">{pkg.price}</p>
                    </div>
                    <Link href={`/packages/${pkg.slug}`} className="text-gold-400 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NORTHEAST CULTURE EXPERIENCE */}
      <section className="py-24 md:py-32 bg-stone-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            >
              <motion.span variants={fadeUp} className="text-gold-600 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Authentic Heritage</motion.span>
              <motion.h2 variants={fadeUp} className="font-playfair text-4xl md:text-5xl text-[#0a1a14] mb-6">Northeast Culture Experience</motion.h2>
              <motion.p variants={fadeUp} className="text-stone-600 text-lg font-light leading-relaxed mb-8">
                Immerse yourself in the rich tapestry of Northeast India. Witness traditional tribal life, intricate local handicrafts, colorful cultural festivals, and beautifully preserved ancient architecture. We ensure our cultural tours are respectful, authentic, and unforgettable.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="/experiences/tribal-culture-heritage" className="inline-flex items-center px-8 py-4 bg-[#0a1a14] hover:bg-[#11241a] text-white text-xs uppercase tracking-widest font-bold rounded-sm transition-colors">
                  Explore Culture <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {cultureImages.map((src, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className={`relative rounded-2xl overflow-hidden shadow-xl ${i === 1 || i === 2 ? 'h-[300px]' : 'h-[250px] mt-8'}`}
                >
                  <Image src={src} alt="Northeast Culture" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR FLEET */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-gold-600 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Travel in Comfort</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-[#0a1a14]">Our Premium Fleet</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {taxis.map((taxi, i) => (
              <motion.div 
                key={taxi.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={taxi.mainImage} alt={taxi.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="font-playfair text-2xl text-[#0a1a14] mb-3">{taxi.name}</h3>
                  <p className="text-stone-500 text-sm line-clamp-2 mb-6 font-light">{taxi.description}</p>
                  <Link href={`/taxis/${taxi.slug}`} className="inline-block border border-gold-600 text-gold-600 hover:bg-gold-600 hover:text-white px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-sm transition-colors">
                    Enquire Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="relative py-32 bg-[#06100c] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/ai-generated/himalayan_landscape_1_1789535411893.jpg" alt="Call to Action Background" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06100c] via-[#0a1a14]/80 to-[#06100c]" />
        </div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="font-playfair text-5xl md:text-6xl text-white mb-8">Ready for the Journey of a Lifetime?</h2>
          <p className="text-stone-300 text-lg md:text-xl font-light mb-12">
            Let Majestic Northeast Tours and Travel craft the perfect itinerary tailored exclusively for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-gold-500 hover:bg-gold-400 text-[#06100c] font-bold uppercase tracking-widest text-sm rounded-sm transition-all text-center">
              Start Planning
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
