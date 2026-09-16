import { destinations } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { ImageSlider } from "@/components/ui/ImageSlider";

export default function DestinationsPublicPage() {
  return (
    <div className="min-h-screen bg-stone-50 pt-32 px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-playfair text-5xl text-stone-900 mb-4">Destinations</h1>
        <p className="text-stone-600 mb-16 text-lg">Explore the breathtaking landscapes of Northeast India.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {destinations.map((dest) => (
            <div key={dest.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-80 w-full overflow-hidden">
                <ImageSlider images={dest.images} alt={dest.name} />
              </div>
              <div className="p-8">
                <h2 className="font-playfair text-3xl text-stone-900 mb-2">{dest.name}</h2>
                <p className="text-stone-600 mb-6">{dest.description}</p>
                <Link href={`/destinations/${dest.slug}`} className="block text-center border border-stone-900 text-stone-900 px-6 py-3 text-sm tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors w-full">
                  Explore {dest.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
