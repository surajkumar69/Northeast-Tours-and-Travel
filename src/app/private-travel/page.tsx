import { Header } from '@/components/ui/Header'
import Image from 'next/image'
import { ArrowRight, Users } from 'lucide-react'

const MOCK_TAXIS = [
  {
    id: '1',
    name: 'Toyota Innova Crysta',
    vehicle_type: 'SUV',
    seating_capacity: 6,
    description: 'The standard for comfortable travel in the hills. Perfect for families offering great legroom and a smooth ride over challenging terrains.',
    features: ['AC/Heater', 'Comfortable captain seats', 'Experienced hill driver', 'Ample boot space'],
    price_per_day: 4500,
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Mahindra XUV700',
    vehicle_type: 'Premium SUV',
    seating_capacity: 6,
    description: 'Experience premium luxury and safety on your journey. Equipped with modern amenities and a panoramic sunroof for scenic views.',
    features: ['Panoramic Sunroof', 'Premium Audio', 'Advanced Safety Features', 'Plush Interiors'],
    price_per_day: 5500,
    main_image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2671&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Force Traveller (12 Seater)',
    vehicle_type: 'Tempo Traveller',
    seating_capacity: 12,
    description: 'The ideal choice for group tours. High ceiling, pushback seats, and large windows ensure everyone enjoys the beautiful landscapes together.',
    features: ['Pushback Seats', 'Individual AC Vents', 'Large Sightseeing Windows', 'Entertainment System'],
    price_per_day: 7500,
    main_image: 'https://images.unsplash.com/photo-1602162985390-e07ecbc7dbd2?q=80&w=2574&auto=format&fit=crop'
  }
];

export default function TaxisPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header variant="dark" />
      
      <main className="flex-1 pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 md:mb-24 px-4">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">Private Travel</h1>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Travel across the Northeast in complete comfort with our fleet of well-maintained private vehicles and experienced chauffeurs.
          </p>
          <div className="h-px w-24 bg-stone-300 mx-auto mt-10 md:mt-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {MOCK_TAXIS.map((taxi) => (
            <div key={taxi.id} className="group flex flex-col border border-stone-200 bg-white hover:shadow-xl transition-shadow duration-500 rounded-sm overflow-hidden">
              <div className="relative h-[250px] md:h-[300px] w-full overflow-hidden bg-stone-200">
                <Image 
                  src={taxi.main_image}
                  alt={taxi.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4 gap-2">
                  <div>
                    <div className="text-xs tracking-widest text-stone-500 uppercase mb-1 font-medium">{taxi.vehicle_type}</div>
                    <h3 className="font-playfair text-xl md:text-2xl text-stone-900 leading-snug">{taxi.name}</h3>
                  </div>
                  <div className="flex items-center text-stone-600 bg-stone-50 border border-stone-100 px-3 py-1.5 rounded-sm text-sm font-medium">
                    <Users className="w-4 h-4 mr-2 text-stone-400" />
                    {taxi.seating_capacity}
                  </div>
                </div>
                
                <p className="text-stone-600 font-light text-sm md:text-base mb-8 flex-1 line-clamp-4 leading-relaxed">
                  {taxi.description}
                </p>
                
                <div className="space-y-3 mb-8 bg-stone-50/50 p-4 rounded-sm border border-stone-100">
                  {taxi.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm font-light text-stone-600">
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mr-3 shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-end pt-6 border-t border-stone-100 mt-auto">
                  <div>
                    <div className="text-xs tracking-widest text-stone-500 uppercase mb-1">Starting From</div>
                    <div className="font-medium text-stone-900 text-xl">₹{taxi.price_per_day.toLocaleString('en-IN')} <span className="text-sm text-stone-500 font-light">/ day</span></div>
                  </div>
                  <span className="flex items-center text-sm font-medium tracking-widest uppercase text-stone-900 group-hover:text-stone-500 transition-colors cursor-pointer">
                    Enquire <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
