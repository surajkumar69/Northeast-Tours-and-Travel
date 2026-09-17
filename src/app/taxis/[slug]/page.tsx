import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Header } from "@/components/ui/Header";
import { TaxiGallery } from "@/components/taxi/TaxiGallery";
import { TaxiBookingForm } from "@/components/taxi/TaxiBookingForm";
import { CheckCircle, Users, Snowflake, Briefcase, Info } from "lucide-react";

export async function generateStaticParams() {
  const taxis = await prisma.taxiVehicle.findMany();
  return taxis.map((t) => ({ slug: t.slug }));
}

export default async function TaxiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const taxi = await prisma.taxiVehicle.findUnique({
    where: { slug },
    include: { gallery: true }
  });

  if (!taxi) {
    notFound();
  }

  const features = taxi.features ? taxi.features.split(',') : [];
  const facilities = taxi.facilities ? taxi.facilities.split(',') : [];

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-stone-200">
      <Header variant="dark" />
      
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="inline-block bg-gold-500/20 text-gold-400 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-widest mb-4">
                {taxi.type}
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl text-white mb-4">{taxi.name}</h1>
              <p className="text-stone-400 text-lg leading-relaxed">{taxi.description}</p>
            </div>

            <TaxiGallery mainImage={taxi.mainImage} images={taxi.gallery} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-stone-800">
              <div className="flex flex-col items-center justify-center p-4 bg-stone-900 rounded-sm">
                <Users className="w-6 h-6 text-gold-500 mb-2" />
                <span className="text-sm font-medium text-white">{taxi.seatingCapacity} Seats</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-stone-900 rounded-sm">
                <Snowflake className="w-6 h-6 text-gold-500 mb-2" />
                <span className="text-sm font-medium text-white">{taxi.acAvailable ? 'Air Conditioned' : 'Non-AC'}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-stone-900 rounded-sm">
                <Briefcase className="w-6 h-6 text-gold-500 mb-2" />
                <span className="text-sm font-medium text-white">{taxi.luggageCapacity || 'Standard'} Luggage</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-stone-900 rounded-sm">
                <Info className="w-6 h-6 text-gold-500 mb-2" />
                <span className="text-sm font-medium text-white">Expert Driver</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-xl font-playfair text-gold-400 mb-6 uppercase tracking-wider">Key Features</h3>
                <ul className="space-y-4">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 text-gold-500 shrink-0" />
                      <span className="text-stone-300">{feature.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-playfair text-gold-400 mb-6 uppercase tracking-wider">Interior Facilities</h3>
                <ul className="space-y-4">
                  {facilities.map((facility, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 text-gold-500 shrink-0" />
                      <span className="text-stone-300">{facility.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-stone-900 p-8 rounded-sm">
              <h3 className="text-xl font-playfair text-gold-400 mb-6 uppercase tracking-wider">Rental Information & Rates</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Per Day Rate (Local)</span>
                  <span className="text-white font-medium">{taxi.pricePerDay || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Per Km Rate</span>
                  <span className="text-white font-medium">{taxi.pricePerKm || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Outstation/Hills Rate</span>
                  <span className="text-white font-medium">₹{taxi.outstationRate || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Airport Transfer</span>
                  <span className="text-white font-medium">₹{taxi.airportTransfer || 'N/A'}</span>
                </div>
              </div>
              <p className="text-xs text-stone-500 italic">
                * Rates are indicative and may vary based on season, route, and availability. Minimum km limits and driver allowances may apply for outstation trips.
              </p>
            </div>
          </div>

          <div className="lg:col-span-1" id="booking">
            <div className="sticky top-32 space-y-6">
              <a 
                href={`https://wa.me/917640076969?text=${encodeURIComponent(`Hello, I am interested in booking the ${taxi.name} for my Northeast trip. Please share availability and pricing.`)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white py-4 px-6 text-sm font-bold uppercase tracking-widest rounded-sm transition-colors shadow-lg"
              >
                Book via WhatsApp
              </a>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-dark-900 text-stone-500">OR ENQUIRE ONLINE</span>
                </div>
              </div>

              <TaxiBookingForm vehicleId={taxi.id} vehicleName={taxi.name} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
