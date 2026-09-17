import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import prisma from "@/lib/prisma";
import { Users, Briefcase, Snowflake, CheckCircle, MessageCircle } from "lucide-react";

export default async function TaxisPage() {
  const taxis = await prisma.taxiVehicle.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' }
  });

  const getWhatsAppLink = (vehicleName: string) => {
    const message = `Hello, I am interested in booking the ${vehicleName} for my Northeast trip. Please share availability and pricing.`;
    return `https://wa.me/917640076969?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-stone-200">
      <Header variant="light" />
      
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/book_taxi_ai.jpg"
            alt="Premium Taxi Booking"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-6 tracking-wide">Premium Taxi Rentals</h1>
          <p className="text-stone-300 text-lg md:text-xl font-light">
            Comfortable cabs and luxury SUVs for sightseeing, airport transfers, and outstation trips across the Northeast.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-playfair text-gold-400 mb-4 tracking-wider">OUR CAB FLEET</h2>
          <div className="h-px w-24 bg-gold-500/50 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {taxis.map(taxi => (
            <div key={taxi.id} className="group flex flex-col border border-stone-800 bg-stone-900/80 hover:bg-stone-800/80 hover:shadow-2xl hover:shadow-gold-900/10 transition-all duration-500 rounded-sm overflow-hidden">
              <div className="relative h-72 w-full overflow-hidden bg-stone-950/50 flex items-center justify-center p-2">
                <Image 
                  src={taxi.mainImage || "/images/swift_dzire_main.jpg"}
                  alt={taxi.name}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute top-4 right-4 bg-gold-500 text-stone-900 text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-sm shadow-lg">
                  {taxi.type}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-playfair text-2xl text-white mb-2">{taxi.name}</h3>
                
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-stone-400 font-medium">
                  <span className="flex items-center"><Users className="w-4 h-4 mr-2 text-gold-400" /> {taxi.seatingCapacity} Seats</span>
                  <span className="flex items-center"><Snowflake className="w-4 h-4 mr-2 text-gold-400" /> {taxi.acAvailable ? "AC" : "Non-AC"}</span>
                  {taxi.luggageCapacity && (
                    <span className="flex items-center"><Briefcase className="w-4 h-4 mr-2 text-gold-400" /> {taxi.luggageCapacity}</span>
                  )}
                </div>

                {taxi.shortDescription && (
                  <p className="text-stone-400 text-sm mb-6 line-clamp-2">
                    {taxi.shortDescription}
                  </p>
                )}

                <div className="space-y-2 mb-8 flex-1">
                  {taxi.features?.split(',').slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start text-sm text-stone-300">
                      <CheckCircle className="w-4 h-4 mr-2 text-gold-500 shrink-0 mt-0.5" />
                      <span>{feature.trim()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-stone-800 mt-auto flex items-end justify-between mb-6">
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Starting From</p>
                    <div className="text-2xl font-medium text-white">
                      {taxi.pricePerDay || 'On Request'}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Link href={`/taxis/${taxi.slug}`} className="block w-full text-center border border-stone-600 hover:border-gold-400 text-stone-300 hover:text-gold-400 py-3 tracking-widest uppercase text-xs font-semibold transition-colors">
                    View Details
                  </Link>
                  <a href={getWhatsAppLink(taxi.name)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full bg-green-600 hover:bg-green-500 text-white py-3 tracking-widest uppercase text-xs font-bold transition-colors">
                    <MessageCircle className="w-4 h-4 mr-2" /> Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
