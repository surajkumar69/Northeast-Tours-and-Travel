import { Header } from '@/components/ui/Header'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

export default async function DestinationsPage() {
  const supabase = await createClient()
  
  const { data: destinations } = await supabase
    .from('destinations')
    .select('*')
    .eq('is_published', true)
    .order('name', { ascending: true })

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header variant="dark" />
      
      <main className="flex-1 pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-24">
          <h1 className="font-playfair text-5xl md:text-6xl text-stone-900 mb-6">Destinations</h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto font-light">
            Explore the diverse landscapes and rich cultural tapestry of our carefully selected destinations across the region.
          </p>
          <div className="h-px w-24 bg-stone-300 mx-auto mt-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {destinations && destinations.length > 0 ? (
            destinations.map((destination) => (
              <div key={destination.id} className="group cursor-pointer">
                <div className="relative h-[500px] w-full mb-8 overflow-hidden bg-stone-200">
                  {destination.main_image ? (
                    <Image 
                      src={destination.main_image}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 font-light">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="text-sm tracking-widest text-white/80 uppercase mb-2">{destination.state}</div>
                    <h3 className="font-playfair text-4xl text-white">{destination.name}</h3>
                  </div>
                </div>
                
                <div className="px-2">
                  <p className="text-stone-600 font-light mb-6 line-clamp-3">
                    {destination.description}
                  </p>
                  <span className="flex items-center text-sm font-medium tracking-widest uppercase text-stone-900 group-hover:text-stone-500 transition-colors">
                    Explore <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 text-stone-500 font-light">
              We are currently adding new destinations. Please check back soon.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
