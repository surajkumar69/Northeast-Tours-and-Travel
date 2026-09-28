import { notFound } from 'next/navigation';
import { seoPages } from '@/data/seoPages';
import { Header } from '@/components/ui/Header';
import { Phone, MessageCircle, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  return seoPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = seoPages.find((p) => p.slug === params.slug);
  if (!page) return {};
  
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `https://www.majestcnortheasttour.com/${page.slug}`,
    }
  };
}

export default function SeoLandingPage({ params }: { params: { slug: string } }) {
  const page = seoPages.find((p) => p.slug === params.slug);
  if (!page) notFound();

  const whatsappMessage = encodeURIComponent(`Hi Majestic Northeast Tours, I am interested in your services regarding: ${page.h1}`);
  const whatsappUrl = `https://wa.me/917640076969?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-dark-950">
      <Header variant="light" />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-dark-900 border-b border-stone-800">
        <div className="absolute inset-0 overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-900/20 via-dark-900/0 to-dark-900/0"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-6 leading-tight">
              {page.h1}
            </h1>
            <p className="text-lg text-stone-400 mb-8 leading-relaxed">
              {page.intro}
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

      {/* Content Section */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Col */}
            <div className="lg:col-span-2 space-y-12">
              <div className="bg-stone-900/50 border border-stone-800 p-8 rounded-sm prose prose-invert max-w-none">
                <h2 className="text-3xl font-playfair text-white mb-6">About Our Service</h2>
                <p className="text-stone-300 leading-relaxed text-lg">{page.content}</p>
                
                <div className="mt-8">
                  <h3 className="text-xl font-playfair text-white mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3 text-stone-400">
                    <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-gold-500 shrink-0" /> Experienced local drivers and guides</li>
                    <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-gold-500 shrink-0" /> Well-maintained, premium fleet of vehicles</li>
                    <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-gold-500 shrink-0" /> Transparent pricing with no hidden costs</li>
                    <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-gold-500 shrink-0" /> 24/7 customer support during your trip</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-playfair text-white mb-8">Related Links</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {page.links.map((link, i) => (
                    <Link key={i} href={link.url} className="group flex justify-between items-center p-6 border border-stone-800 bg-stone-900/30 hover:bg-stone-800/50 rounded-sm transition-colors">
                      <span className="text-stone-300 font-medium group-hover:text-gold-400 transition-colors">{link.text}</span>
                      <ArrowRight className="w-5 h-5 text-stone-500 group-hover:text-gold-500 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Booking Form */}
            <div>
              <div className="sticky top-32 border border-stone-800 bg-stone-900 p-8 rounded-sm">
                <h3 className="font-playfair text-2xl text-white mb-6">Book Now</h3>
                <form id="booking-form" className="space-y-4">
                  <input type="text" placeholder="Full Name" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500" required />
                  <input type="tel" placeholder="Phone Number" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-white focus:outline-none focus:border-gold-500" required />
                  <input type="text" defaultValue={page.h1} readOnly className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-500 focus:outline-none" />
                  <input type="date" className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-400 focus:outline-none focus:border-gold-500" required />
                  <button type="button" className="w-full bg-gold-600 hover:bg-gold-500 text-white font-medium tracking-widest uppercase py-4 transition-colors mt-4">
                    Send Enquiry
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
