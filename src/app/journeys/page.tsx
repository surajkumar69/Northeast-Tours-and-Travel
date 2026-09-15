import { Header } from '@/components/ui/Header'
import Image from 'next/image'
import { ArrowRight, Clock, MapPin } from 'lucide-react'

const MOCK_TOURS = [
  {
    id: '1',
    title: 'Meghalaya Monsoon Magic',
    duration_days: 6,
    duration_nights: 5,
    short_description: 'Experience the living root bridges, crystal clear rivers, and the highest rainfall in the world.',
    starting_price: 24999,
    main_image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=2574&auto=format&fit=crop',
    location: 'Meghalaya'
  },
  {
    id: '2',
    title: 'Kaziranga Wildlife Safari',
    duration_days: 4,
    duration_nights: 3,
    short_description: 'Spot the majestic one-horned rhinoceros and diverse wildlife in this UNESCO World Heritage site.',
    starting_price: 18500,
    main_image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop',
    location: 'Assam'
  },
  {
    id: '3',
    title: 'Tawang Monastery Trail',
    duration_days: 8,
    duration_nights: 7,
    short_description: 'Journey through the high altitude passes of Arunachal to the largest monastery in India.',
    starting_price: 35000,
    main_image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2671&auto=format&fit=crop',
    location: 'Arunachal Pradesh'
  },
  {
    id: '4',
    title: 'Dzukou Valley Trek',
    duration_days: 5,
    duration_nights: 4,
    short_description: 'Trek through the rolling green hills and seasonal flowers of the border between Nagaland and Manipur.',
    starting_price: 15000,
    main_image: 'https://images.unsplash.com/photo-1602162985390-e07ecbc7dbd2?q=80&w=2574&auto=format&fit=crop',
    location: 'Nagaland'
  }
];

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header variant="dark" />
      
      <main className="flex-1 pt-32 md:pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 md:mb-24 px-4">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-stone-900 mb-6">Curated Journeys</h1>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover our meticulously planned itineraries, designed to showcase the authentic beauty and culture of Northeast India.
          </p>
          <div className="h-px w-24 bg-stone-300 mx-auto mt-10 md:mt-12" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {MOCK_TOURS.map((tour) => (
            <div key={tour.id} className="group cursor-pointer flex flex-col bg-white border border-stone-100 hover:shadow-xl transition-shadow duration-500 rounded-sm overflow-hidden">
              <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-stone-200">
                <Image 
                  src={tour.main_image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 flex items-center gap-1.5 text-xs font-medium tracking-widest text-stone-900">
                  <MapPin className="w-3 h-3" />
                  {tour.location}
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="font-playfair text-xl md:text-2xl text-stone-900 leading-snug">{tour.title}</h3>
                </div>
                
                <p className="text-stone-600 font-light text-sm md:text-base mb-6 flex-1 line-clamp-3 leading-relaxed">
                  {tour.short_description}
                </p>
                
                <div className="flex items-center text-xs tracking-widest text-stone-500 uppercase mb-6 gap-4">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {tour.duration_days}D / {tour.duration_nights}N</span>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-stone-100 mt-auto">
                  <div className="font-medium text-stone-900">
                    <span className="text-xs tracking-widest uppercase text-stone-500 mr-2">From</span>
                    <span className="text-lg">₹{tour.starting_price.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="flex items-center text-sm font-medium tracking-widest uppercase text-stone-900 group-hover:text-stone-500 transition-colors">
                    View <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
