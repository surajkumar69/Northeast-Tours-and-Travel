import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routePages } from '@/data/routePages';
import Link from 'next/link';
import { Phone, MessageCircle, MapPin, Clock, Info } from 'lucide-react';

export async function generateStaticParams() {
  return routePages.map((route) => ({
    slug: route.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const route = routePages.find((r) => r.slug === resolvedParams.slug);
  
  if (!route) {
    return { title: 'Route Not Found' };
  }

  return {
    title: route.title,
    description: route.metaDescription,
    alternates: {
      canonical: `/routes/${route.slug}`,
    },
    openGraph: {
      title: route.title,
      description: route.metaDescription,
      url: `/routes/${route.slug}`,
      type: 'website',
    }
  };
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const route = routePages.find((r) => r.slug === resolvedParams.slug);

  if (!route) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'Majestic Northeast Tours and Travel',
      'telephone': '+917640076969',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'A2 Ground Floor, Royal Residency, SOS Village Road, Opp Terminal-2',
        'addressLocality': 'Guwahati',
        'postalCode': '781015',
        'addressRegion': 'Assam',
        'addressCountry': 'IN'
      }
    },
    'name': route.h1,
    'description': route.metaDescription,
    'areaServed': [
      { '@type': 'City', 'name': route.from },
      { '@type': 'City', 'name': route.to }
    ]
  };

  const whatsappMessage = `Hello Majestic Northeast Tours and Travel, I would like to enquire about your ${route.h1}.`;
  const whatsappUrl = `https://wa.me/917640076969?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-dark-900 border-b border-stone-800">
        <div className="absolute inset-0 overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-900/20 via-dark-900/0 to-dark-900/0"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-6 leading-tight">
              {route.h1}
            </h1>
            <p className="text-lg text-stone-400 mb-8 leading-relaxed">
              {route.intro}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+917640076969" className="inline-flex items-center gap-2 bg-gold-600 hover:bg-gold-500 text-white px-6 py-3 rounded-sm font-medium uppercase tracking-widest text-sm transition-colors">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-sm font-medium uppercase tracking-widest text-sm transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Route Info & Fleet Section */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Col */}
            <div className="lg:col-span-2 space-y-12">
              <div className="bg-stone-900/50 border border-stone-800 p-8 rounded-sm">
                <h2 className="text-2xl font-playfair text-white mb-6">Journey Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-gold-500 shrink-0" />
                    <div>
                      <h3 className="text-white font-medium mb-1">Distance</h3>
                      <p className="text-stone-400 text-sm">{route.distance} (approx)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-gold-500 shrink-0" />
                    <div>
                      <h3 className="text-white font-medium mb-1">Travel Time</h3>
                      <p className="text-stone-400 text-sm">{route.duration} (approx)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-playfair text-white mb-8">Available Fleet & Pricing</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { name: 'Swift Dzire', price: '₹3,500 onwards' },
                    { name: 'Vitara Brezza', price: '₹4,000 onwards' },
                    { name: 'Ertiga', price: '₹4,500 onwards' },
                    { name: 'Innova Crysta', price: '₹5,500 onwards' },
                    { name: '13/17 Seater Tempo', price: '₹7,500 onwards' },
                    { name: '12/16 Seater Urbania', price: '₹11,000 onwards' },
                  ].map((vehicle, i) => (
                    <div key={i} className="flex justify-between items-center p-4 border border-stone-800 bg-stone-900/30 rounded-sm">
                      <span className="text-stone-300 font-medium">{vehicle.name}</span>
                      <span className="text-gold-500 font-medium">{vehicle.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-stone-500 text-sm mt-4 italic">* Prices are approximate starting fares and may vary based on season and exact itinerary.</p>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-3xl font-playfair text-white mb-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {route.faqs.map((faq, i) => (
                    <div key={i} className="border border-stone-800 bg-stone-900/50 p-6 rounded-sm">
                      <h3 className="text-lg font-medium text-white mb-3 flex items-start gap-3">
                        <Info className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        {faq.q}
                      </h3>
                      <p className="text-stone-400 pl-8 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Booking Form */}
            <div>
              <div className="sticky top-32 border border-stone-800 bg-stone-900 p-8 rounded-sm">
                <h3 className="font-playfair text-2xl text-white mb-6">Book this Route</h3>
                <form id="booking-form" className="space-y-4">
                  <input type="text" placeholder="Full Name" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500" required />
                  <input type="tel" placeholder="Phone Number" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500" required />
                  <input type="text" defaultValue={route.h1} readOnly className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-500 focus:outline-none" />
                  <input type="date" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-400 focus:outline-none focus:border-gold-500" required />
                  <button type="submit" className="w-full bg-gold-600 hover:bg-gold-500 text-white font-medium tracking-widest uppercase py-4 transition-colors mt-4">
                    Send Enquiry
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Related Routes */}
      <section className="py-20 bg-dark-900 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-playfair text-white mb-4">Popular Routes</h2>
              <p className="text-stone-400 max-w-2xl">Explore our most frequently booked travel connections.</p>
            </div>
            <Link href="/routes" className="hidden md:inline-block text-gold-500 hover:text-gold-400 font-medium tracking-widest uppercase text-sm">
              View All Routes &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {routePages.slice(0, 4).map((r, i) => (
              <Link key={i} href={`/routes/${r.slug}`} className="group block p-6 border border-stone-800 bg-stone-900/30 hover:bg-stone-800/50 transition-colors rounded-sm">
                <h3 className="text-white font-medium mb-2 group-hover:text-gold-400 transition-colors">{r.h1}</h3>
                <span className="text-stone-500 text-sm group-hover:text-stone-400 transition-colors">Book Now &rarr;</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/routes" className="inline-block text-gold-500 hover:text-gold-400 font-medium tracking-widest uppercase text-sm">
              View All Routes &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
