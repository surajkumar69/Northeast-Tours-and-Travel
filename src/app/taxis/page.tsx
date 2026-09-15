import { Header } from '@/components/ui/Header'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { ArrowRight, Users } from 'lucide-react'

export const revalidate = 60

export default async function TaxisPage() {
  const supabase = await createClient()
  
  const { data: taxis } = await supabase
    .from('taxi_vehicles')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header variant="dark" />
      
      <main className="flex-1 pt-40 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-24">
          <h1 className="font-playfair text-5xl md:text-6xl text-stone-900 mb-6">Private Travel</h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto font-light">
            Travel across the Northeast in complete comfort with our fleet of well-maintained private vehicles and experienced chauffeurs.
          </p>
          <div className="h-px w-24 bg-stone-300 mx-auto mt-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {taxis && taxis.length > 0 ? (
            taxis.map((taxi) => (
              <div key={taxi.id} className="group flex flex-col border border-stone-200 bg-white">
                <div className="relative h-[250px] w-full overflow-hidden bg-stone-100">
                  {taxi.main_image ? (
                    <Image 
                      src={taxi.main_image}
                      alt={taxi.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 font-light">No Image</div>
                  )}
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-xs tracking-widest text-stone-500 uppercase mb-1">{taxi.vehicle_type}</div>
                      <h3 className="font-playfair text-2xl text-stone-900">{taxi.name}</h3>
                    </div>
                    <div className="flex items-center text-stone-600 bg-stone-100 px-3 py-1 rounded-full text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      {taxi.seating_capacity}
                    </div>
                  </div>
                  
                  <p className="text-stone-600 font-light mb-6 flex-1 line-clamp-3">
                    {taxi.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {taxi.features && taxi.features.slice(0, 3).map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center text-sm font-light text-stone-600">
                        <div className="w-1 h-1 bg-stone-400 rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-end pt-6 border-t border-stone-100 mt-auto">
                    <div>
                      <div className="text-xs tracking-widest text-stone-500 uppercase mb-1">Starting From</div>
                      <div className="font-medium text-stone-900 text-xl">₹{taxi.price_per_day} <span className="text-sm text-stone-500 font-light">/ day</span></div>
                    </div>
                    <span className="flex items-center text-sm font-medium tracking-widest uppercase text-stone-900 group-hover:text-stone-500 transition-colors cursor-pointer">
                      Enquire <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24 text-stone-500 font-light">
              We are currently updating our fleet. Please check back soon.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
