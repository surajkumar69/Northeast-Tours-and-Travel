import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

export default async function ExperienceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const exp = await prisma.experience.findUnique({
    where: { slug: slug },
    include: { gallery: { orderBy: { sortOrder: 'asc' } } }
  });

  if (!exp || !exp.isActive) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-stone-200">
      <Header variant="light" />
      
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] w-full flex items-end pb-24">
        <div className="absolute inset-0 z-0">
          <Image 
            src={exp.coverImage}
            alt={exp.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full">
          <Link href="/experiences" className="inline-flex items-center text-gold-400 hover:text-white transition-colors mb-6 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Experiences
          </Link>
          {exp.category && (
            <div className="mb-4 text-gold-500 font-medium tracking-widest uppercase text-sm">
              {exp.category}
            </div>
          )}
          <h1 className="font-playfair text-4xl md:text-6xl text-white mb-6 leading-tight max-w-3xl">
            {exp.title}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto w-full py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-12">
          
          <div>
            <h2 className="font-playfair text-3xl text-gold-400 mb-6">About This Experience</h2>
            <p className="text-stone-300 leading-relaxed text-lg whitespace-pre-line">
              {exp.fullDescription || exp.shortDescription}
            </p>
          </div>

        </div>

        {/* Sidebar Sticky Booking CTA */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 border border-gold-600/30 bg-stone-900 p-8 rounded-sm">
            <h3 className="font-playfair text-2xl text-white mb-2">Interested?</h3>
            <p className="text-stone-400 mb-6 text-sm">Contact us to add {exp.title} to your itinerary.</p>
            
            <a 
              href={`https://wa.me/918787488801?text=Hello, I am interested in the ${exp.title} experience.`}
              target="_blank"
              rel="noreferrer"
              className="w-full block text-center bg-gold-600 hover:bg-gold-500 text-white font-medium tracking-widest uppercase py-4 transition-colors"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      {exp.gallery.length > 0 && (
        <section className="py-24 bg-black">
          <div className="px-6 md:px-12 max-w-7xl mx-auto w-full">
            <h2 className="font-playfair text-3xl text-gold-400 mb-12 text-center">Visual Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {exp.gallery.map((img, i) => (
                <div key={img.id} className="relative h-64 w-full group overflow-hidden">
                  <Image 
                    src={img.url}
                    alt={img.altText || `${exp.title} Gallery ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
