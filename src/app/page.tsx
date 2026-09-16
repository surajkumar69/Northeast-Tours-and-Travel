import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, IndianRupee, Compass, Shield, Users, Star, Quote } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { HeroCarousel } from "@/components/ui/HeroCarousel";
import prisma from "@/lib/prisma";

export default async function Home() {
  const heroSlides = await prisma.heroSlide.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' }
  });
  const packages = await prisma.tourPackage.findMany({ 
    take: 3,
    include: { destination: true } 
  });
  
  const experiences = [
    { title: "Living Root Bridges", img: "/images/meghalaya_root_bridge_1789460307682.jpg" },
    { title: "Wildlife Safari", img: "/images/kaziranga_national_park.jpg" },
    { title: "Himalayan Landscapes", img: "https://images.unsplash.com/photo-1572005080922-b9e3831828f7?q=80&w=1000&auto=format&fit=crop" },
    { title: "Tribal Culture", img: "https://images.unsplash.com/photo-1596766487195-2cc021b2b800?q=80&w=1000&auto=format&fit=crop" },
    { title: "Ancient Monasteries", img: "/images/arunachal_monastery_1789460394921.jpg" },
    { title: "Majestic Waterfalls", img: "/images/meghalaya_waterfall_1789460321208.jpg" },
    { title: "Tea Estates", img: "/images/assam_tea_estate_1789460102115.jpg" },
    { title: "Alpine Lakes", img: "/images/arunachal_sela_pass_1789460408512.jpg" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-stone-200 overflow-x-hidden font-sans">
      <Header variant="light" />

      {/* 1. HOMEPAGE HERO */}
      <HeroCarousel slides={heroSlides} />

      {/* 2. EXPLORE NORTHEAST INDIA */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white mb-6">Explore Northeast India</h2>
          <p className="text-stone-400 text-lg md:text-xl font-light italic max-w-2xl mx-auto">
            "Seven states. Endless stories. One unforgettable journey."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {/* Asymmetric / Masonry-style Grid using standard cols but different heights */}
          <Link href="/destinations/meghalaya" className="group relative block h-[400px] rounded-2xl overflow-hidden">
            <Image src="/images/meghalaya_dawki_river_1789460337488.jpg" alt="Meghalaya" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-6 left-6">
              <h3 className="font-playfair text-2xl text-white">Meghalaya</h3>
              <p className="text-gold-400 text-xs tracking-widest uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Explore</p>
            </div>
          </Link>

          <Link href="/destinations/assam" className="group relative block h-[400px] rounded-2xl overflow-hidden lg:translate-y-8">
            <Image src="/images/assam_majuli_river_1789460244378.jpg" alt="Assam" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-6 left-6">
              <h3 className="font-playfair text-2xl text-white">Assam</h3>
              <p className="text-gold-400 text-xs tracking-widest uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Explore</p>
            </div>
          </Link>

          <Link href="/destinations/arunachal" className="group relative block h-[400px] rounded-2xl overflow-hidden">
            <Image src="/images/arunachal_sela_pass_1789460408512.jpg" alt="Arunachal Pradesh" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-6 left-6">
              <h3 className="font-playfair text-2xl text-white">Arunachal Pradesh</h3>
              <p className="text-gold-400 text-xs tracking-widest uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">Explore</p>
            </div>
          </Link>

          </div>
      </section>

      {/* 3. FEATURED TOUR PACKAGES */}
      <section className="py-24 md:py-32 bg-dark-950 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">Handpicked Itineraries</span>
              <h2 className="font-playfair text-4xl md:text-5xl text-white">Featured Packages</h2>
            </div>
            <Link href="/packages" className="px-8 py-3 border border-white/20 hover:border-gold-500 hover:text-gold-400 text-stone-300 rounded-sm text-xs font-bold uppercase tracking-widest transition-all">
              View All Packages
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="group flex flex-col bg-dark-900 rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all shadow-xl">
                <div className="relative h-[300px] w-full overflow-hidden">
                  <Image 
                    src={pkg.coverImage || '/images/tour_packages_ai.jpg'}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="inline-block px-3 py-1 bg-gold-500/20 backdrop-blur-md text-gold-400 border border-gold-500/50 text-[10px] font-bold uppercase tracking-widest rounded-sm mb-3">
                      {pkg.destination?.name || pkg.destinationId || 'Northeast India'}
                    </span>
                    <h3 className="font-playfair text-2xl text-white group-hover:text-gold-300 transition-colors leading-tight">{pkg.title}</h3>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-stone-400 text-sm mb-6 pb-6 border-b border-white/5">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gold-500" /> {pkg.duration}</span>
                    <span className="flex items-center text-white"><IndianRupee className="w-4 h-4 mr-1 text-gold-500" /> {pkg.price}</span>
                  </div>
                  
                  <p className="text-stone-400 text-sm leading-relaxed mb-8 flex-1">
                    {pkg.shortDescription}
                  </p>

                  <div className="flex flex-col gap-3 mt-auto">
                    <Link href={`/packages/${pkg.slug}`} className="w-full text-center border border-white/20 hover:border-gold-500 text-white hover:text-gold-400 py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition-all">
                      View Details
                    </Link>
                    <Link href={`/packages/${pkg.slug}#booking`} className="w-full text-center bg-gold-500 hover:bg-gold-400 text-stone-950 py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition-all">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY TRAVEL WITH US */}
      <section className="py-24 bg-dark-900 border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <h2 className="font-playfair text-3xl md:text-5xl text-white mb-16">Why Travel With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: "Local Expertise", desc: "Deep knowledge of hidden gems beyond tourist trails." },
              { title: "Personalized", desc: "Bespoke itineraries tailored exactly to your pace." },
              { title: "Premium Fleet", desc: "Comfortable and safe transfers in luxury vehicles." },
              { title: "24/7 Support", desc: "Dedicated travel support throughout your journey." }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-dark-950 border border-gold-500/30 flex items-center justify-center mb-6 text-gold-500 font-playfair text-2xl">
                  0{idx+1}
                </div>
                <h3 className="text-lg text-white font-medium mb-3">{feature.title}</h3>
                <p className="text-stone-400 text-sm font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NORTHEAST EXPERIENCES */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-gold-400 text-xs font-bold tracking-widest uppercase mb-4 block">Immersive Journeys</span>
          <h2 className="font-playfair text-4xl md:text-5xl text-white">Northeast Experiences</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="group relative h-[250px] md:h-[350px] rounded-xl overflow-hidden">
              <Image src={exp.img} alt={exp.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <h4 className="font-playfair text-xl md:text-2xl text-white drop-shadow-lg">{exp.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. POPULAR DESTINATIONS (Just visual breathing room) */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1544331189-980b1eeb36e6?q=80&w=2670&auto=format&fit=crop" alt="Himalayas" fill className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-dark-950/60" />
        <div className="relative z-10 text-center px-6">
          <Compass className="w-12 h-12 text-gold-400 mx-auto mb-6 opacity-80" />
          <h2 className="font-playfair text-3xl md:text-5xl text-white mb-6">Let the Mountains Move You</h2>
          <Link href="/destinations" className="inline-block border-b border-gold-400 text-gold-400 pb-1 text-sm tracking-widest uppercase hover:text-white hover:border-white transition-colors">
            View All Destinations
          </Link>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-24 bg-dark-900 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl text-white">Traveler Stories</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul S.", review: "An absolutely magical experience in Meghalaya. The team handled every detail perfectly from the Tempo Traveller to the local guides." },
              { name: "Priya M.", review: "Our Kaziranga safari was breathtaking. We saw rhinos up close and the resort they booked for us was pure luxury." },
              { name: "David L.", review: "Tawang is not an easy place to reach, but Majestic Northeast made the journey comfortable, safe, and truly unforgettable." }
            ].map((t, i) => (
              <div key={i} className="bg-dark-950 p-10 rounded-xl border border-white/5 relative">
                <Quote className="absolute top-6 left-6 w-12 h-12 text-white/5" />
                <div className="flex mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-gold-500 fill-gold-500" />)}
                </div>
                <p className="text-stone-300 font-light italic mb-8 relative z-10">"{t.review}"</p>
                <p className="text-gold-400 text-sm font-bold uppercase tracking-widest">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CINEMATIC PHOTO GALLERY */}
      <section className="py-24 px-4 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            "/images/assam_temple_1789460276376.jpg",
            "/images/meghalaya_hills_1789460353512.jpg",
            "/images/assam_culture_1789460260883.jpg"
          ].map((src, i) => (
            <div key={i} className="relative w-full md:w-[30%] h-[300px] rounded-xl overflow-hidden group">
              <Image src={src} alt="Gallery" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* 9. BOOK YOUR NORTHEAST JOURNEY CTA */}
      <section className="py-32 px-6 md:px-12 bg-dark-950 relative overflow-hidden border-t border-gold-500/20">
        <div className="absolute inset-0 z-0">
          <Image src="/images/kaziranga_national_park.jpg" alt="Kaziranga" fill className="object-cover opacity-10 blur-sm" />
          <div className="absolute inset-0 bg-dark-950/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-5xl md:text-7xl text-white mb-8">Ready to Explore?</h2>
          <p className="text-stone-400 text-lg md:text-xl font-light mb-12">
            Let our experts craft the perfect Northeast India itinerary tailored specifically for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/contact" className="w-full sm:w-auto px-10 py-4 bg-gold-500 hover:bg-gold-400 text-stone-950 font-bold uppercase tracking-widest text-sm rounded-sm transition-all text-center">
              Plan Your Trip
            </Link>
            <a href="tel:+918787488801" className="w-full sm:w-auto px-10 py-4 border border-white/30 text-white hover:bg-white/10 font-bold uppercase tracking-widest text-sm rounded-sm transition-all text-center">
              Call +91 87874 88801
            </a>
          </div>
        </div>
      </section>
      
    </div>
  );
}
