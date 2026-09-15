import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/ui/Header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Header variant="light" />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=2574&auto=format&fit=crop"
            alt="Meghalaya Landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight leading-tight">
            THE NORTHEAST, <br/><span className="italic font-light">CURATED FOR YOU.</span>
          </h1>
          <p className="text-stone-200 text-lg md:text-xl font-light tracking-wide mb-10 max-w-2xl mx-auto">
            Discover the landscapes, cultures and journeys of Northeast India — thoughtfully planned, comfortably travelled.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/tours" 
              className="bg-white text-stone-900 px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-stone-100 transition-colors"
            >
              Explore Journeys
            </Link>
            <Link 
              href="/contact" 
              className="border border-white text-white px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-white/10 transition-colors"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-24">
          <h2 className="font-playfair text-4xl md:text-5xl text-stone-900 mb-6">Our Services</h2>
          <div className="h-px w-24 bg-stone-300 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Service 1 */}
          <div className="group cursor-pointer">
            <div className="relative h-[600px] w-full mb-6 overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1602162985390-e07ecbc7dbd2?q=80&w=2574&auto=format&fit=crop"
                alt="Curated Journeys"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <h3 className="font-playfair text-2xl mb-3">Tours & Packages</h3>
            <p className="text-stone-600 font-light mb-4">Premium curated journeys across Northeast India's most pristine landscapes.</p>
            <span className="flex items-center text-sm font-medium tracking-widest uppercase text-stone-900 group-hover:text-stone-500 transition-colors">
              Discover More <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </div>

          {/* Service 2 */}
          <div className="group cursor-pointer mt-0 md:mt-16">
            <div className="relative h-[600px] w-full mb-6 overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop"
                alt="Private Transportation"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <h3 className="font-playfair text-2xl mb-3">Private Travel</h3>
            <p className="text-stone-600 font-light mb-4">Private and comfortable transportation for individuals, couples and families.</p>
            <span className="flex items-center text-sm font-medium tracking-widest uppercase text-stone-900 group-hover:text-stone-500 transition-colors">
              View Vehicles <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </div>

          {/* Service 3 */}
          <div className="group cursor-pointer mt-0 md:mt-32">
            <div className="relative h-[600px] w-full mb-6 overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2671&auto=format&fit=crop"
                alt="Group Transportation"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <h3 className="font-playfair text-2xl mb-3">Group Journeys</h3>
            <p className="text-stone-600 font-light mb-4">Premium Tempo Travellers for larger parties seeking comfort on the road.</p>
            <span className="flex items-center text-sm font-medium tracking-widest uppercase text-stone-900 group-hover:text-stone-500 transition-colors">
              Explore Options <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
