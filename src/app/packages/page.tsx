import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import prisma from "@/lib/prisma";
import { Clock, MapPin } from "lucide-react";

export default async function PackagesPage() {
  const packages = await prisma.tourPackage.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: { destination: true }
  });

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-stone-200">
      <Header variant="light" />
      
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/tour_packages_ai.jpg"
            alt="Tour Packages"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-4">Curated Journeys</h1>
          <p className="text-stone-300 text-lg">Explore our thoughtfully crafted tour packages across Northeast India.</p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map(pkg => (
            <div key={pkg.id} className="border border-stone-800 bg-stone-900 rounded-sm overflow-hidden group flex flex-col">
              <div className="relative h-64 w-full">
                <Image 
                  src={pkg.coverImage || "/images/tour_packages_ai.jpg"}
                  alt={pkg.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs font-medium tracking-widest text-gold-400 uppercase mb-2">
                  {pkg.destination?.name || 'Northeast India'}
                </div>
                <h3 className="font-playfair text-2xl text-white mb-3">{pkg.title}</h3>
                <p className="text-stone-400 text-sm mb-6 flex-1">{pkg.shortDescription}</p>
                
                <div className="flex justify-between items-center mb-6 pt-4 border-t border-stone-800">
                  <div className="flex items-center text-stone-400 text-sm">
                    <Clock className="w-4 h-4 mr-2" /> {pkg.duration}
                  </div>
                  <div className="text-lg font-playfair text-gold-400">{pkg.price}</div>
                </div>
                
                <Link href={`/packages/${pkg.slug}`} className="block w-full text-center border border-gold-600/50 hover:bg-gold-500 hover:border-gold-500 text-white py-3 tracking-widest uppercase text-sm transition-colors mt-auto">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
