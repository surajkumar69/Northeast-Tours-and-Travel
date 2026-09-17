import { Metadata } from 'next';
import { routePages } from '@/data/routePages';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Taxi Routes & Cab Services | Majestic Northeast Tours and Travel',
  description: 'Browse our complete list of premium taxi and cab routes across Northeast India including Guwahati, Shillong, Cherrapunji, Kaziranga, and Tawang.',
  alternates: {
    canonical: '/routes',
  }
};

export default function RoutesIndexPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-dark-900 border-b border-stone-800">
        <div className="absolute inset-0 overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-900/20 via-dark-900/0 to-dark-900/0"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-6 leading-tight">
            Popular Travel Routes
          </h1>
          <p className="text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Choose from our extensive network of premium taxi and cab services across Northeast India. We provide safe, comfortable, and reliable transportation for all major destinations.
          </p>
        </div>
      </section>

      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routePages.map((route, i) => (
              <Link key={i} href={`/routes/${route.slug}`} className="group block p-6 border border-stone-800 bg-stone-900 hover:bg-stone-800/80 transition-all rounded-sm hover:-translate-y-1">
                <h2 className="text-lg text-white font-medium mb-3 group-hover:text-gold-400 transition-colors">{route.h1}</h2>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-500">{route.distance}</span>
                  <span className="text-gold-600 font-medium tracking-widest uppercase text-xs">View Details &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
