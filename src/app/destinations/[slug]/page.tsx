import { Header } from '@/components/ui/Header'
import { destinations } from '@/lib/data'
import { tourPackages } from '@/data/tourPackages'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { ImageSlider } from '@/components/ui/ImageSlider'

export function generateStaticParams() {
  return destinations.map((dest) => ({
    slug: dest.slug,
  }))
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const destination = destinations.find(d => d.slug === resolvedParams.slug)

  if (!destination) {
    notFound()
  }

  // Find packages that include this destination
  const relatedPackages = tourPackages.filter(pkg => 
    pkg.category.toLowerCase().includes(destination.name.toLowerCase()) || 
    pkg.destination.toLowerCase().includes(destination.name.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header variant="dark" />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-12 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-stone-100 px-3 py-1 text-xs tracking-wider uppercase text-stone-600 rounded-full flex items-center">
                  <MapPin className="w-3 h-3 mr-1" /> {destination.state}
                </span>
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-7xl text-stone-900 leading-tight">
                {destination.name}
              </h1>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <Link href="/contact" className="bg-stone-900 text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-stone-800 transition-colors">
                Enquire Now
              </Link>
            </div>
          </div>
          
          <div className="relative h-[50vh] md:h-[60vh] w-full rounded-2xl overflow-hidden shadow-sm">
            <ImageSlider images={destination.images} alt={destination.name} />
          </div>
        </div>
      </div>

      <main className="flex-1 py-12 px-6 md:px-12 max-w-7xl mx-auto w-full">
        
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h2 className="font-playfair text-3xl text-stone-900 mb-6">About {destination.name}</h2>
          <p className="text-stone-600 text-lg font-light leading-relaxed">
            {destination.description}
          </p>
        </div>

        {/* Related Packages */}
        <section className="border-t border-stone-200 pt-16">
          <div className="flex justify-between items-end mb-12">
            <h2 className="font-playfair text-4xl text-stone-900">Popular Packages</h2>
            <Link href="/packages" className="text-sm font-medium tracking-widest uppercase text-stone-500 hover:text-stone-900 flex items-center transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          {relatedPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPackages.map((pkg) => (
                <div key={pkg.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
                  <div className="relative h-64 w-full overflow-hidden">
                    <ImageSlider images={pkg.gallery} alt={pkg.title} />
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair text-xl text-stone-900 mb-2 line-clamp-2">{pkg.title}</h3>
                    <div className="flex items-center gap-2 mb-6 text-xs text-stone-500 uppercase tracking-widest">
                      <span><Clock className="inline w-3 h-3 mr-1" />{pkg.duration}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                      <div className="font-medium text-stone-900">{pkg.price}</div>
                      <Link href={`/packages/${pkg.slug}`} className="text-xs tracking-widest uppercase font-medium text-stone-900 hover:text-stone-500">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-500 font-light text-center py-12">More packages coming soon for {destination.name}.</p>
          )}
        </section>

      </main>
    </div>
  )
}
