import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, MapPin, IndianRupee, CheckCircle2, XCircle, Info } from "lucide-react";
import prisma from "@/lib/prisma";
import { Header } from "@/components/ui/Header";

// Note: Ensure the db is seeded, otherwise we handle 404 cleanly.

export async function generateStaticParams() {
  const packages = await prisma.tourPackage.findMany({
    select: { slug: true },
  });
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export default async function PackageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = await prisma.tourPackage.findUnique({
    where: { slug: slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      itinerary: true,
      inclusions: true,
      exclusions: true,
      highlights: true,
      destination: true,
    }
  });

  if (!pkg || !pkg.isActive) {
    return (
      <div className="min-h-screen flex flex-col bg-dark-900 text-stone-200">
        <Header variant="light" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="font-playfair text-4xl text-gold-400 mb-4">Package Not Found</h1>
          <p className="text-stone-400 mb-8 max-w-md">We couldn't find the package you're looking for. It may have been removed or the link is incorrect.</p>
          <Link href="/packages" className="bg-gold-500 hover:bg-gold-400 text-white px-8 py-3 text-sm tracking-widest uppercase transition-colors">
            View All Packages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-stone-200">
      <Header variant="light" />
      
      {/* Cinematic Hero */}
      <section className="relative h-[70vh] w-full flex items-end pb-24">
        <div className="absolute inset-0 z-0">
          <Image 
            src={pkg.coverImage || "/images/tour_packages_ai.jpg"}
            alt={pkg.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <Link href="/packages" className="inline-flex items-center text-gold-400 hover:text-white transition-colors mb-6 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Packages
          </Link>
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-6 leading-tight max-w-3xl">
            {pkg.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-stone-300">
            <div className="flex items-center"><Clock className="w-5 h-5 mr-2 text-gold-400" /> {pkg.duration}</div>
            <div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-gold-400" /> {pkg.destination?.name || 'Northeast India'}</div>
            {pkg.startingPoint && <div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-gold-400" /> {pkg.startingPoint}</div>}
            <div className="flex items-center"><IndianRupee className="w-5 h-5 mr-2 text-gold-400" /> {pkg.price} {pkg.priceLabel}</div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto w-full py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          
          {/* Overview */}
          <div>
            <h2 className="font-playfair text-3xl text-gold-400 mb-6">Overview</h2>
            <p className="text-stone-300 leading-relaxed text-lg">{pkg.description || pkg.shortDescription}</p>
          </div>

          {/* Highlights */}
          {pkg.highlights.length > 0 && (
            <div>
              <h2 className="font-playfair text-3xl text-gold-400 mb-6">Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pkg.highlights.map(h => (
                  <li key={h.id} className="flex items-start text-stone-300">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-gold-500 shrink-0 mt-0.5" />
                    <span>{h.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Itinerary */}
          <div>
            <h2 className="font-playfair text-3xl text-gold-400 mb-6">Itinerary</h2>
            <div className="space-y-6">
              {pkg.itinerary.sort((a,b) => a.day - b.day).map((day) => (
                <div key={day.id} className="border border-stone-800 bg-stone-900/50 p-6 rounded-sm">
                  <h3 className="font-playfair text-xl text-white mb-3">Day {day.day}: {day.title}</h3>
                  <p className="text-stone-400 leading-relaxed">{day.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-playfair text-2xl text-gold-400 mb-6">Inclusions</h2>
              <ul className="space-y-3">
                {pkg.inclusions.map(inc => (
                  <li key={inc.id} className="flex items-start text-stone-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-3 text-green-500 shrink-0 mt-0.5" />
                    <span>{inc.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-playfair text-2xl text-gold-400 mb-6">Exclusions</h2>
              <ul className="space-y-3">
                {pkg.exclusions.map(exc => (
                  <li key={exc.id} className="flex items-start text-stone-300 text-sm">
                    <XCircle className="w-4 h-4 mr-3 text-red-500 shrink-0 mt-0.5" />
                    <span>{exc.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar Sticky Booking CTA */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 border border-gold-600/30 bg-stone-900 p-8 rounded-sm">
            <h3 className="font-playfair text-2xl text-white mb-2">Book This Journey</h3>
            <p className="text-stone-400 mb-6 text-sm">Secure your spot for {pkg.title}</p>
            
            <div className="text-3xl font-playfair text-gold-400 mb-8 pb-8 border-b border-stone-800">
              {pkg.price} <span className="text-sm font-sans text-stone-500">{pkg.priceLabel}</span>
            </div>

            <form className="space-y-4 mb-6">
              <input type="text" placeholder="Full Name" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500" required />
              <input type="email" placeholder="Email Address" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500" required />
              <input type="tel" placeholder="Phone Number" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500" required />
              <input type="date" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-400 focus:outline-none focus:border-gold-500" required />
              
              <button type="button" className="w-full bg-gold-500 hover:bg-gold-400 text-white font-medium tracking-widest uppercase py-4 transition-colors mt-4">
                Book Now
              </button>
            </form>
            
            <div className="text-center">
              <span className="text-stone-500 text-sm">Or</span>
            </div>
            
            <a 
              href={`https://wa.me/917640076969?text=Hello, I am interested in booking the ${pkg.title} package.`}
              target="_blank"
              rel="noreferrer"
              className="w-full block text-center border border-green-600/50 text-green-500 hover:bg-green-600/10 font-medium tracking-widest uppercase py-4 transition-colors mt-4"
            >
              Enquire via WhatsApp
            </a>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      {pkg.images.length > 0 && (
        <section className="py-24 bg-black">
          <div className="px-6 md:px-12 max-w-7xl mx-auto w-full">
            <h2 className="font-playfair text-3xl text-gold-400 mb-12 text-center">Visual Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {pkg.images.map((img, i) => (
                <div key={img.id} className="relative h-64 w-full group overflow-hidden">
                  <Image 
                    src={img.url}
                    alt={`${pkg.title} Gallery ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
