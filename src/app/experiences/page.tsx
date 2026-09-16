import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import prisma from "@/lib/prisma";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

export default async function ExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" }
  });

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-dark-900 text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image 
            src="/images/kaziranga_national_park.jpg"
            alt="Experiences"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl mb-6">Signature Experiences</h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto">
            Discover the soul of the Northeast through our carefully curated cultural, wildlife, and adventure activities.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow">
        {experiences.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="font-playfair text-3xl text-stone-800 mb-4">More Experiences Coming Soon</h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              We are carefully curating premium experiences to show you the very best of Incredible Northeast. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white border border-stone-200 rounded-lg overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={exp.coverImage} 
                    alt={exp.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {exp.category && (
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-gold-400 text-xs tracking-widest uppercase px-3 py-1">
                      {exp.category}
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="font-playfair text-2xl text-stone-900 mb-3">{exp.title}</h3>
                  <p className="text-stone-600 mb-6 line-clamp-3">{exp.shortDescription}</p>
                  <Link href={`/experiences/${exp.slug}`} className="inline-flex items-center text-sm font-medium tracking-widest uppercase text-gold-600 hover:text-gold-500 transition-colors">
                    Explore Experience <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
