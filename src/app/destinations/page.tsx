import { Header } from '@/components/ui/Header'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const MOCK_DESTINATIONS = [
  {
    id: '1',
    name: 'Meghalaya',
    state: 'Abode of Clouds',
    description: 'Home to the wettest places on earth, living root bridges, and mesmerizing waterfalls cascading through green hills.',
    main_image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Assam',
    state: 'Land of Red River',
    description: 'Famous for its sprawling tea gardens, the mighty Brahmaputra river, and the rare one-horned rhinoceros of Kaziranga.',
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Arunachal Pradesh',
    state: 'Land of Dawn-Lit Mountains',
    description: 'Explore ancient monasteries, high altitude passes, and pristine lakes in the easternmost part of India.',
    main_image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2671&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Sikkim',
    state: 'The Himalayan Kingdom',
    description: 'A botanical paradise boasting spectacular views of Kangchenjunga, serene glacial lakes, and vibrant Buddhist culture.',
    main_image: 'https://images.unsplash.com/photo-1602162985390-e07ecbc7dbd2?q=80&w=2574&auto=format&fit=crop'
  }
];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header variant="dark" />
      
      <main className="flex-1 pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 md:mb-24 px-4">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">Destinations</h1>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Explore the diverse landscapes and rich cultural tapestry of our carefully selected destinations across the region.
          </p>
          <div className="h-px w-24 bg-stone-300 mx-auto mt-10 md:mt-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {MOCK_DESTINATIONS.map((destination) => (
            <div key={destination.id} className="group cursor-pointer flex flex-col bg-white border border-stone-100 hover:shadow-xl transition-shadow duration-500 rounded-sm overflow-hidden">
              <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden bg-stone-200">
                <Image 
                  src={destination.main_image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                  <div className="text-xs md:text-sm tracking-widest text-white/80 uppercase mb-2 font-medium">{destination.state}</div>
                  <h3 className="font-playfair text-3xl md:text-4xl text-white group-hover:translate-x-2 transition-transform duration-500">{destination.name}</h3>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                <p className="text-stone-600 font-light text-sm md:text-base mb-8 line-clamp-3 leading-relaxed">
                  {destination.description}
                </p>
                <div className="flex items-center text-sm font-medium tracking-widest uppercase text-stone-900 group-hover:text-stone-500 transition-colors">
                  Explore <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
