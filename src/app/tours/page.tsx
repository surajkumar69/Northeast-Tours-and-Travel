import { Header } from '@/components/ui/Header'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const revalidate = 60

export default async function ToursPage() {
  const supabase = await createClient()
  
  const { data: tours } = await supabase
    .from('tours')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header variant="dark" />
      
      <main className="flex-1 pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-24">
          <h1 className="font-playfair text-5xl md:text-6xl text-stone-900 mb-6">Curated Journeys</h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto font-light">
            Discover our meticulously planned itineraries, designed to showcase the authentic beauty and culture of Northeast India.
          </p>
          <div className="h-px w-24 bg-stone-300 mx-auto mt-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {tours && tours.length > 0 ? (
            tours.map((tour) => (
              <div key={tour.id} className="group cursor-pointer flex flex-col">
                <div className="relative h-[400px] w-full mb-6 overflow-hidden bg-stone-200">
                  {tour.main_image ? (
                    <Image 
                      src={tour.main_image}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 font-light">No Image</div>
                  )}
                </div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-playfair text-2xl pr-4">{tour.title}</h3>
                  <div className="text-right whitespace-nowrap">
                    <div className="text-sm tracking-widest text-stone-500 uppercase">{tour.duration_days}D / {tour.duration_nights}N</div>
                  </div>
                </div>
                <p className="text-stone-600 font-light mb-6 flex-1 line-clamp-3">
                  {tour.short_description || tour.full_description?.substring(0, 150) + '...'}
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-stone-200">
                  <div className="font-medium text-stone-900">
                    <span className="text-xs tracking-widest uppercase text-stone-500 mr-2">From</span>
                    ₹{tour.starting_price}
                  </div>
                  <span className="flex items-center text-sm font-medium tracking-widest uppercase text-stone-900 group-hover:text-stone-500 transition-colors">
                    View <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 text-stone-500 font-light">
              We are currently curating new journeys. Please check back soon.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
